function formatInput(value: string | number | null): string {
  if (value === null) {
    return 'MISSING';
  }

  if (typeof value === 'number') {
    return value.toFixed(2);
  }

  return value.trim().toUpperCase();
}

console.log(formatInput(null));
console.log(formatInput(499));
console.log(formatInput('  Keyboard  '));
