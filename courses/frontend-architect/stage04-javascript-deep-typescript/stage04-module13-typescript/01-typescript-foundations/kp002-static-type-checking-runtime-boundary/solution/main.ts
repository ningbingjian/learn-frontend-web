function uppercase(value: string): string {
  return value.toUpperCase();
}

console.log(uppercase('hello'));

const runtimeValue = JSON.parse('123');
console.log(uppercase(runtimeValue));
