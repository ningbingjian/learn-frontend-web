type CurrencyFormatter = {
  (value: number): string;
  readonly currency: string;
};

const formatCny: CurrencyFormatter = Object.assign(
  (value: number) => `¥${value.toFixed(2)}`,
  { currency: 'CNY' }
);

console.log(formatCny(499));
console.log(formatCny.currency);
