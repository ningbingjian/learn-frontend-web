function convert(value: string): string;
function convert(value: number): number;
function convert(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }

  return Math.round(value);
}

const text = convert(' keyboard ');
const count = convert(3.6);

console.log(`${text}:${typeof text}`);
console.log(`${count}:${typeof count}`);
