export const REGION_CODES = [
  "us-west",
  "us-east",
  "eu-central"
] as const;

export type RegionCode = (typeof REGION_CODES)[number];

export interface OpenCounterMap {
  readonly [metric: string]: number;
}

export type CompleteRegionCapacity = Record<RegionCode, number>;
export type PartialRegionCapacity = Partial<Record<RegionCode, number>>;

export const counters: OpenCounterMap = {
  requests: 128,
  timeouts: 3
};

export const completeCapacity: CompleteRegionCapacity = {
  "us-west": 120,
  "us-east": 95,
  "eu-central": 80
};

export const partialCapacity: PartialRegionCapacity = {
  "us-west": 120,
  "eu-central": 75
};

export function readCounter(
  source: OpenCounterMap,
  metric: string
): number | undefined {
  return source[metric];
}

export function requireCounter(
  source: OpenCounterMap,
  metric: string
): number {
  const value = source[metric];
  if (value === undefined) {
    throw new Error(`Missing counter: ${metric}`);
  }
  return value;
}

export function totalCapacity(
  source: CompleteRegionCapacity
): number {
  return REGION_CODES.reduce((total, region) => total + source[region], 0);
}

export function describePartialCapacity(
  source: PartialRegionCapacity
): string {
  return REGION_CODES
    .map((region) => `${region}=${source[region] ?? "missing"}`)
    .join("|");
}

let missingMessage = "not-thrown";
try {
  requireCounter(counters, "retries");
} catch (error: unknown) {
  missingMessage = error instanceof Error ? error.message : "unknown-error";
}

console.log("INDEX_SAFETY");
console.log(`knownTotal=${totalCapacity(completeCapacity)}`);
console.log(`counter=${readCounter(counters, "requests")}`);
console.log(`missing=${String(readCounter(counters, "retries"))}`);
console.log(`requiredError=${missingMessage}`);
console.log(`partial=${describePartialCapacity(partialCapacity)}`);
