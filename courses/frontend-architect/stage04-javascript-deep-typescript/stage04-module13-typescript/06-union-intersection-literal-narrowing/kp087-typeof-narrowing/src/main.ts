function normalizeValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }

  return value.toFixed(2);
}

console.log(normalizeValue(' keyboard '));
console.log(normalizeValue(499));
