function box<T>(value: T): { value: T } {
  return { value };
}

const productBox = box({
  id: 101,
  name: 'Keyboard'
});

console.log(productBox.value.id);
console.log(productBox.value.name.toUpperCase());
