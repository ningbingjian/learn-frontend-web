type Currency = 'CNY';

function formatCurrency(currency: Currency, amount: number): string {
  return `${currency} ${amount.toFixed(2)}`;
}

const currency: Currency = 'CNY';

console.log(formatCurrency(currency, 499));
console.log(currency === 'CNY');
