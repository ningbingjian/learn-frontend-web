import {
  orderForTriage,
  scenarios,
  type DiagnosticKind
} from "./scenarios.js";

export type BuildEvent =
  | { kind: "diagnostic"; code: number; message: string }
  | { kind: "runtime"; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseBuildEvent(input: unknown): BuildEvent | null {
  if (!isRecord(input) || typeof input.kind !== "string") return null;

  if (
    input.kind === "diagnostic" &&
    typeof input.code === "number" &&
    typeof input.message === "string"
  ) {
    return { kind: "diagnostic", code: input.code, message: input.message };
  }

  if (input.kind === "runtime" && typeof input.message === "string") {
    return { kind: "runtime", message: input.message };
  }

  return null;
}

export function summarizeEvent(event: BuildEvent): string {
  switch (event.kind) {
    case "diagnostic":
      return `TS${event.code}:${event.message}`;
    case "runtime":
      return `runtime:${event.message}`;
    default:
      return assertNever(event);
  }
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

export function kindLabel(kind: DiagnosticKind): string {
  return kind.toUpperCase();
}

const ordered = orderForTriage(scenarios);
const cascadeTotal = scenarios.reduce((sum, item) => sum + item.cascadeCount, 0);
const event = parseBuildEvent({
  kind: "diagnostic",
  code: 2322,
  message: "type mismatch"
});

console.log("TYPE_ERROR_OBSERVATORY");
console.log(`scenarios=${scenarios.length}`);
console.log(`first=${ordered[0]?.id ?? "none"}:${ordered[0]?.kind ?? "none"}`);
console.log(`cascadeTotal=${cascadeTotal}`);
console.log(`event=${event ? summarizeEvent(event) : "invalid"}`);
