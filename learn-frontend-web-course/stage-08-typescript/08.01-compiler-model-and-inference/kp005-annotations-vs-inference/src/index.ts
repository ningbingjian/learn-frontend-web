export interface InvoiceLine {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

export interface InvoiceSummary {
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly labels: readonly string[];
}

export function calculateInvoice(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceSummary {
  const subtotals = lines.map((line) => line.quantity * line.unitPrice);
  const subtotal = subtotals.reduce((sum, value) => sum + value, 0);
  const tax = subtotal * taxRate;
  const labels = lines.map((line) => `${line.description} × ${line.quantity}`);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
    labels
  };
}

const lines: InvoiceLine[] = [
  { description: "Architecture review", quantity: 2, unitPrice: 300 },
  { description: "Type audit", quantity: 1, unitPrice: 150 }
];

const taxRate = 0.06;
const summary = calculateInvoice(lines, taxRate);
const formattedTotal = summary.total.toFixed(2);

console.log(`items=${summary.labels.length}; subtotal=${summary.subtotal}; tax=${summary.tax}; total=${formattedTotal}`);
