type Currency = 'CNY' | 'USD' | 'EUR';

function formatMoney(value: number, currency: Currency): string {
  return `${currency} ${value.toFixed(2)}`;
}

const primary: Currency = 'CNY';
const backup: Currency = 'USD';

console.log(formatMoney(499, primary));
console.log(formatMoney(499, backup));
