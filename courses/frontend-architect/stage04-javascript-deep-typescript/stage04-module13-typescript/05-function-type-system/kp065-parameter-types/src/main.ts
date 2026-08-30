function formatOrderLine(sku: string, quantity: number) {
  return `${sku.toUpperCase()} x ${quantity.toFixed(0)}`;
}

console.log(formatOrderLine('kb-001', 2));
