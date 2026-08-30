function sumPrices(currency: string, ...prices: number[]): string {
  const total = prices.reduce((sum, price) => sum + price, 0);
  return `${currency} ${total.toFixed(2)}`;
}

console.log(sumPrices('CNY'));
console.log(sumPrices('CNY', 199, 299, 499));
