class FixedDiscount {
  constructor(public readonly amount: number) {}
}

class RateDiscount {
  constructor(public readonly rate: number) {}
}

type Discount = FixedDiscount | RateDiscount;

function describeDiscount(discount: Discount): string {
  if (discount instanceof FixedDiscount) {
    return `money:${discount.amount.toFixed(2)}`;
  }

  return `percentage:${(discount.rate * 100).toFixed(0)}%`;
}

console.log(describeDiscount(new FixedDiscount(50)));
console.log(describeDiscount(new RateDiscount(0.1)));
