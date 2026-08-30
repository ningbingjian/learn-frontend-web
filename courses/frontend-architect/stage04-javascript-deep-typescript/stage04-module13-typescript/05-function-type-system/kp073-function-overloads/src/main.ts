function normalize(value: string): string;
function normalize(value: string[]): string[];
function normalize(value: string | string[]): string | string[] {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }

  return value.map((item) => item.trim().toUpperCase());
}

const single = normalize(' keyboard ');
const multiple = normalize([' mouse ', ' monitor ']);

console.log(single);
console.log(multiple.join(' | '));
