function formatCount(count: number): string {
  return `count=${count.toFixed(0)}`;
}

console.log(formatCount(2));

const runtimeValue = JSON.parse('"2"');

try {
  console.log(formatCount(runtimeValue));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`runtime error: ${message}`);
}
