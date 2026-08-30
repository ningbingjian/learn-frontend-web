type PriceCalculator = (unitPrice: number, quantity: number) => number;

const calculateTotal: PriceCalculator = (price, count) => {
  return price * count;
};

function runCalculation(
  calculator: PriceCalculator,
  price: number,
  quantity: number
): number {
  return calculator(price, quantity);
}

console.log(runCalculation(calculateTotal, 199.5, 2).toFixed(2));
