const productName: string = 'Mechanical Keyboard';
const category = 'Accessories';

function normalizeLabel(value: string): string {
  return value.trim().toUpperCase();
}

const label = `${normalizeLabel(productName)} / ${normalizeLabel(category)}`;

console.log(label);
console.log(typeof productName);
