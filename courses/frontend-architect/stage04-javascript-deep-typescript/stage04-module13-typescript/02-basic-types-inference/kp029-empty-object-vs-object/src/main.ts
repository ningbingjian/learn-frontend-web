function acceptsEmptyObject(value: {}): string {
  return `{}:${typeof value}`;
}

function acceptsUpperObject(value: Object): string {
  return `Object:${value.toString()}`;
}

function acceptsNonPrimitive(value: object): string {
  return Array.isArray(value)
    ? `object:array(${value.length})`
    : `object:${typeof value}`;
}

console.log(acceptsEmptyObject('text'));
console.log(acceptsEmptyObject(42));
console.log(acceptsUpperObject('text'));
console.log(acceptsUpperObject(42));
console.log(acceptsNonPrimitive({ id: 1 }));
console.log(acceptsNonPrimitive([1, 2, 3]));
