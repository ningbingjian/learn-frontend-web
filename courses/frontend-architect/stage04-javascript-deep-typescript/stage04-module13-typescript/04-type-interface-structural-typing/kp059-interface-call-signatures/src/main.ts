interface PriceFormatter {
  (price: number, currency: string): string;
  readonly locale: string;
}

const formatPrice: PriceFormatter = Object.assign(
  (price: number, currency: string) => `${currency} ${price.toFixed(2)}`,
  { locale: 'zh-CN' }
);

console.log(formatPrice(499, 'CNY'));
console.log(formatPrice.locale);
