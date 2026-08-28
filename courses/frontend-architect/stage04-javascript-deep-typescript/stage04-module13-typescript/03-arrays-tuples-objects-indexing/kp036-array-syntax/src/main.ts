const productIds: number[] = [101, 102, 103];
const productNames: Array<string> = ['Keyboard', 'Mouse'];

const idsAsGeneric: Array<number> = productIds;
const namesAsBrackets: string[] = productNames;

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function normalize(values: Array<string>): string[] {
  return values.map((value) => value.toUpperCase());
}

console.log(sum(idsAsGeneric));
console.log(normalize(namesAsBrackets).join(' | '));
