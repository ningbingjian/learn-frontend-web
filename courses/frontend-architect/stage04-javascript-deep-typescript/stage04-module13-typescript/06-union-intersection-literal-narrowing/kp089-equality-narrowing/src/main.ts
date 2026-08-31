function compareValues(
  left: string | number,
  right: string | boolean
): string {
  if (left === right) {
    return `same:${left.toUpperCase()}`;
  }

  return `different:${String(left)}:${String(right)}`;
}

function normalizeLabel(value: string | null | undefined): string {
  if (value == null) {
    return 'MISSING';
  }

  return value.toUpperCase();
}

console.log(compareValues('ready', 'ready'));
console.log(compareValues(200, false));
console.log(normalizeLabel(undefined));
console.log(normalizeLabel('Keyboard'));
