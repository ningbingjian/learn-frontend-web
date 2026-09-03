export interface Project {
  id: string;
  name: string;
  members: string[];
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function unsafeProjectName(input: string): string {
  const project = input as unknown as Project;
  return project.name.toUpperCase();
}

export function unsafeTokenLength(token: string | undefined): number {
  return token!.length;
}

export function parseProject(input: unknown): ParseResult<Project> {
  if (!isRecord(input)) {
    return { ok: false, issues: ["project must be an object"] };
  }

  const issues: string[] = [];
  if (typeof input.id !== "string") issues.push("id must be string");
  if (typeof input.name !== "string") issues.push("name must be string");
  if (!Array.isArray(input.members) || !input.members.every((item) => typeof item === "string")) {
    issues.push("members must be string[]");
  }

  if (issues.length > 0) return { ok: false, issues };

  return {
    ok: true,
    value: {
      id: input.id as string,
      name: input.name as string,
      members: input.members as string[]
    }
  };
}

function captureFailure(action: () => unknown): string {
  try {
    action();
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

const brokenPayload: unknown = {
  id: "PROJECT-1",
  name: 42,
  members: "Ada"
};
const validPayload: unknown = {
  id: "PROJECT-2",
  name: "Runtime Firewall",
  members: ["Ada", "Lin"]
};

const broken = parseProject(brokenPayload);
const valid = parseProject(validPayload);

console.log("ASSERTION_FAILURE_LAB");
console.log(`doubleAssertion=${captureFailure(() => unsafeProjectName("not a project"))}`);
console.log(`nonNullAssertion=${captureFailure(() => unsafeTokenLength(undefined))}`);
console.log(`safeParse=${broken.ok ? "ok" : `error:${broken.issues.join(",")}`}`);
console.log(`validProject=${valid.ok ? `${valid.value.id}:${valid.value.name}` : "invalid"}`);
