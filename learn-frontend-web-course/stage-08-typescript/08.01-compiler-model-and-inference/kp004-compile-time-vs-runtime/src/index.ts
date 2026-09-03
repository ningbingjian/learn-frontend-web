type DeliveryStatus = "queued" | "delivered" | "failed";

interface DeliveryEvent {
  readonly eventId: string;
  readonly status: DeliveryStatus;
  readonly attempts: number;
}

type ParseResult =
  | { readonly ok: true; readonly value: DeliveryEvent }
  | { readonly ok: false; readonly error: string };

function parseJson(text: string): unknown {
  return JSON.parse(text) as unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDeliveryStatus(value: unknown): value is DeliveryStatus {
  return value === "queued" || value === "delivered" || value === "failed";
}

function parseDeliveryEvent(text: string): ParseResult {
  let input: unknown;

  try {
    input = parseJson(text);
  } catch {
    return { ok: false, error: "payload is not valid JSON" };
  }

  if (!isRecord(input)) {
    return { ok: false, error: "payload must be an object" };
  }

  if (typeof input.eventId !== "string" || input.eventId.length === 0) {
    return { ok: false, error: "payload.eventId must be a non-empty string" };
  }

  if (!isDeliveryStatus(input.status)) {
    return { ok: false, error: "payload.status is invalid" };
  }

  if (
    typeof input.attempts !== "number" ||
    !Number.isFinite(input.attempts) ||
    input.attempts < 0
  ) {
    return { ok: false, error: "payload.attempts must be a finite number >= 0" };
  }

  return {
    ok: true,
    value: {
      eventId: input.eventId,
      status: input.status,
      attempts: input.attempts
    }
  };
}

function describe(result: ParseResult): string {
  if (!result.ok) {
    return `rejected:${result.error}`;
  }

  const event = result.value;
  return `accepted:event=${event.eventId},status=${event.status},attempts=${event.attempts}`;
}

const validPayload = '{"eventId":"evt-42","status":"delivered","attempts":2}';
const invalidPayload = '{"eventId":"evt-43","status":"delivered","attempts":"2"}';

console.log(describe(parseDeliveryEvent(validPayload)));
console.log(describe(parseDeliveryEvent(invalidPayload)));
