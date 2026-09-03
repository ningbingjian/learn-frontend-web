export type Command =
  | { type: "start"; jobId: string }
  | { type: "stop"; jobId: string }
  | { type: "status"; jobId: string };

export type CommandParseResult =
  | { ok: true; command: Command }
  | { ok: false; issue: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function unsafeUpperCase(input: any): string {
  return input.label.toUpperCase();
}

export function safeUpperCase(input: unknown): string {
  if (!isRecord(input) || typeof input.label !== "string") return "invalid";
  return input.label.toUpperCase();
}

export function parseCommand(input: unknown): CommandParseResult {
  if (!isRecord(input)) return { ok: false, issue: "command must be object" };
  if (typeof input.jobId !== "string") return { ok: false, issue: "jobId must be string" };
  if (input.type !== "start" && input.type !== "stop" && input.type !== "status") {
    return { ok: false, issue: "unknown command type" };
  }
  return { ok: true, command: { type: input.type, jobId: input.jobId } };
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled command: ${JSON.stringify(value)}`);
}

export function executeCommand(command: Command): string {
  switch (command.type) {
    case "start":
      return `start:${command.jobId}`;
    case "stop":
      return `stop:${command.jobId}`;
    case "status":
      return `status:${command.jobId}`;
    default:
      return assertNever(command);
  }
}

export type LogSink = (message: string) => void;

export function emitMessages(sink: LogSink): void {
  ["alpha", "beta"].forEach((message) => sink(message));
}

function captureAnyFailure(): string {
  try {
    unsafeUpperCase({ label: 42 });
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

const parsed = parseCommand({ type: "start", jobId: "JOB-7" });
const messages: string[] = [];
const voidReturn = emitMessages((message) => messages.push(message));

console.log("SPECIAL_TYPES");
console.log(`anyFailure=${captureAnyFailure()}`);
console.log(`unknownResult=${safeUpperCase({ label: 42 })}`);
console.log(`command=${parsed.ok ? executeCommand(parsed.command) : parsed.issue}`);
console.log(`voidReturn=${String(voidReturn)}`);
console.log(`messages=${messages.join(",")}`);
