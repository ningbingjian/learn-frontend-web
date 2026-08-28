function unsafeNormalize(value: any): string {
  return value.trim().toUpperCase();
}

console.log(unsafeNormalize(' typescript '));

try {
  console.log(unsafeNormalize(42));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`runtime error: ${message}`);
}

const rawValue: any = { count: '3' };
const count: number = rawValue.count;

console.log(`count runtime type=${typeof count}`);
