type PriceFormatter = (price: number, currency: string) => string;

const formatPrice: PriceFormatter = (price, currency) => {
  return `${currency} ${price.toFixed(2)}`;
};

function buildLabels(
  values: number[],
  formatter: (value: number, index: number) => string
): string[] {
  return values.map(formatter);
}

const labels = buildLabels([10, 20, 30], (value, index) => {
  return `${index}:${value.toFixed(1)}`;
});

console.log(formatPrice(499, 'CNY'));
console.log(labels.join(' | '));
