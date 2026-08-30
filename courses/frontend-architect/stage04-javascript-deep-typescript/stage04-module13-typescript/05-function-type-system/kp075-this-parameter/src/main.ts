type PricingContext = {
  currency: string;
  discountRate: number;
};

function formatTotal(this: PricingContext, subtotal: number): string {
  const total = subtotal * (1 - this.discountRate);
  return `${this.currency} ${total.toFixed(2)}`;
}

const context: PricingContext = {
  currency: 'CNY',
  discountRate: 0.1
};

console.log(formatTotal.call(context, 1000));

const boundFormatter = formatTotal.bind(context);
console.log(boundFormatter(499));
