export type Coordinate = readonly [longitude: number, latitude: number];

export type UserRow = readonly [
  id: string,
  score: number,
  active: boolean
];

export type ApiSuccess<T> = readonly [
  status: 200,
  data: T,
  requestId?: string
];

export type CliCommand = readonly [name: string, ...args: string[]];

export type LogRecord = readonly [
  timestamp: string,
  level: "info" | "warn" | "error",
  message: string,
  ...tags: string[]
];

export function formatCoordinate([longitude, latitude]: Coordinate): string {
  return `${longitude.toFixed(4)},${latitude.toFixed(4)}`;
}

export function formatUserRow([id, score, active]: UserRow): string {
  return `${id}:${score}:${active ? "active" : "disabled"}`;
}

export function unwrapSuccess<T>(response: ApiSuccess<T>): T {
  return response[1];
}

export function responseTrace<T>(response: ApiSuccess<T>): string {
  return response[2] ?? "NO_REQUEST_ID";
}

export function renderCommand([name, ...args]: CliCommand): string {
  return [name, ...args].join(" ");
}

export function formatLog([
  timestamp,
  level,
  message,
  ...tags
]: LogRecord): string {
  return `${timestamp} [${level}] ${message} tags=${tags.join(",") || "none"}`;
}

export const shanghai: Coordinate = [121.4737, 31.2304];
export const userRow: UserRow = ["USER-1", 98, true];
export const responseWithTrace: ApiSuccess<{ readonly id: string }> = [
  200,
  { id: "ORDER-1" },
  "REQ-2026"
];
export const responseWithoutTrace: ApiSuccess<string> = [200, "ok"];
export const deployCommand: CliCommand = [
  "deploy",
  "--env",
  "prod",
  "--dry-run"
];
export const logRecord: LogRecord = [
  "2026-09-03T12:00:00Z",
  "warn",
  "retry scheduled",
  "network",
  "gateway"
];

console.log("TUPLE_MODEL");
console.log(`coordinate=${formatCoordinate(shanghai)}`);
console.log(`user=${formatUserRow(userRow)}`);
console.log(`response=${unwrapSuccess(responseWithTrace).id}:${responseTrace(responseWithTrace)}`);
console.log(`responseWithoutTrace=${unwrapSuccess(responseWithoutTrace)}:${responseTrace(responseWithoutTrace)}`);
console.log(`command=${renderCommand(deployCommand)}`);
console.log(`log=${formatLog(logRecord)}`);
console.log(`runtimeIsArray=${Array.isArray(shanghai)};length=${shanghai.length}`);
