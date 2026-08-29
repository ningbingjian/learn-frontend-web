const tags: string[] = ['typescript', 'frontend'];
const readonlyTags: readonly string[] = tags;

function formatTags(values: ReadonlyArray<string>): string {
  return values.map((value) => value.toUpperCase()).join(' | ');
}

const products: ReadonlyArray<{ name: string }> = [{ name: 'Keyboard' }];
products[0].name = 'Mechanical Keyboard';

console.log(formatTags(readonlyTags));
console.log(products[0].name);
