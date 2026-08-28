function parseProfile(text: string): unknown {
  return JSON.parse(text);
}

function printProfileName(value: unknown): void {
  if (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string'
  ) {
    console.log(value.name.toUpperCase());
    return;
  }

  console.log('invalid profile');
}

printProfileName(parseProfile('{"name":"Ada"}'));
printProfileName(parseProfile('42'));
