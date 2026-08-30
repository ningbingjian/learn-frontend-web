type ProductSummary = {
  name: string;
};

type ProductDetails = {
  name: string;
  price: number;
};

type SummaryFactory = () => ProductSummary;

const createDetails = (): ProductDetails => ({
  name: 'Keyboard',
  price: 499
});

const createSummary: SummaryFactory = createDetails;
const summary = createSummary();

console.log(summary.name);
console.log('price' in summary);
console.log(createDetails().price.toFixed(2));
