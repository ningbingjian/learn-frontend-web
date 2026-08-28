function describeObject(value: object): string {
  if (Array.isArray(value)) {
    return `array length=${value.length}`;
  }

  if (typeof value === 'function') {
    return 'function object';
  }

  return `object keys=${Object.keys(value).length}`;
}

console.log(describeObject({ name: 'Ada', role: 'admin' }));
console.log(describeObject([1, 2, 3]));
console.log(describeObject(() => 'ok'));
