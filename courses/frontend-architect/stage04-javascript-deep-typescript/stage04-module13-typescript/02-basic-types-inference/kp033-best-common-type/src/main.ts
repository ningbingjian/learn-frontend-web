const scores = [10, 20, 30];
const mixedValues = [10, '20', 30];

function describe(value: number | string): string {
  return typeof value === 'number'
    ? `number:${value.toFixed(1)}`
    : `string:${value.toUpperCase()}`;
}

console.log(scores.map((value) => value.toFixed(1)).join(', '));
console.log(mixedValues.map(describe).join(' | '));
