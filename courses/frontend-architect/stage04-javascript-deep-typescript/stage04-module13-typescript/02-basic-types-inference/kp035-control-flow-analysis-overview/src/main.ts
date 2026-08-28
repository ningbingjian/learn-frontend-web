type Input = string | number | null;

function normalize(input: Input): string {
  if (input === null) {
    return 'empty';
  }

  if (typeof input === 'number') {
    return `number:${input.toFixed(1)}`;
  }

  return `string:${input.trim().toUpperCase()}`;
}

function inspect(value: string | number): string {
  if (typeof value === 'string') {
    value = value.length;
  }

  return `length-or-number:${value.toFixed(1)}`;
}

console.log(normalize(' keyboard '));
console.log(normalize(42));
console.log(normalize(null));
console.log(inspect('hello'));
console.log(inspect(7));
