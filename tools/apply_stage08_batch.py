from __future__ import annotations

import base64
import hashlib
import io
import shutil
import tarfile
from pathlib import Path

EXPECTED_SHA256 = "5e51ec6f11a4ad3f9bb053ea0c8ca4723e02b9a37fcc1a62a20e7e5c0fd81aff"


def main() -> None:
    root = Path.cwd().resolve()
    payload_dir = Path("tools/stage08_payload")
    encoded = "".join(path.read_text(encoding="utf-8") for path in sorted(payload_dir.glob("part-*.txt")))
    raw = base64.b64decode(encoded)
    digest = hashlib.sha256(raw).hexdigest()
    if digest != EXPECTED_SHA256:
        raise RuntimeError(f"archive checksum mismatch: {digest}")

    with tarfile.open(fileobj=io.BytesIO(raw), mode="r:gz") as archive:
        members = archive.getmembers()
        for member in members:
            target = (root / member.name).resolve()
            if root not in target.parents and target != root:
                raise RuntimeError(f"unsafe archive member: {member.name}")
        archive.extractall(root)

    shutil.rmtree(payload_dir)
    Path("tools/apply_stage08_batch.py").unlink(missing_ok=True)
    Path(".github/workflows/apply-stage08-batch.yml").unlink(missing_ok=True)
    print(f"Applied Stage 08 batch with {len(members)} archive entries")


if __name__ == "__main__":
    main()
