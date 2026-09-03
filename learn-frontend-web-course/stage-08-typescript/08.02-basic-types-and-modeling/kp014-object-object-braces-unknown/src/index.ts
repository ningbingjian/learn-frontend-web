export function describeObject(value: object): string {
  if (Array.isArray(value)) return `array:${value.length}`;
  if (typeof value === "function") return "function";
  return "object";
}

export function describeNonNullish(value: {}): string {
  return `${typeof value}:${String(value)}`;
}

export function describeUnknown(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return `array:${value.length}`;
  return typeof value;
}

export function isRecord(
  value: unknown
): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readLabel(input: unknown): string | undefined {
  if (!isRecord(input)) return undefined;
  const label = input["label"];
  return typeof label === "string" ? label : undefined;
}

const sampleFunction = () => "done";

console.log("OBJECT_BOUNDARIES");
console.log(`objectArray=${describeObject([1, 2])}`);
console.log(`objectFunction=${describeObject(sampleFunction)}`);
console.log(`nonNullishNumber=${describeNonNullish(42)}`);
console.log(`unknownNull=${describeUnknown(null)}`);
console.log(`label=${readLabel({ label: "architect" }) ?? "missing"}`);
console.log(`arrayIsRecord=${isRecord([1, 2])}`);
