export interface QuoteRequest {
  readonly units: number;
  readonly unitPrice: number;
  readonly discountRate?: number;
}

export interface QuoteResult {
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
}

export function calculateQuote(request: QuoteRequest): QuoteResult {
  const discountRate = request.discountRate ?? 0;
  const subtotal = request.units * request.unitPrice;
  const discount = subtotal * discountRate;

  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
}
