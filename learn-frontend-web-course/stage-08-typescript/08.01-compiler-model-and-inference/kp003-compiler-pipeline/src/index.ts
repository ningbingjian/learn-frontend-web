import { calculateQuote } from "./pricing.js";
import type { QuoteRequest } from "./pricing.js";

const request: QuoteRequest = {
  units: 4,
  unitPrice: 25,
  discountRate: 0.1
};

const quote = calculateQuote(request);

console.log(
  `subtotal=${quote.subtotal.toFixed(2)}; discount=${quote.discount.toFixed(2)}; total=${quote.total.toFixed(2)}`
);
