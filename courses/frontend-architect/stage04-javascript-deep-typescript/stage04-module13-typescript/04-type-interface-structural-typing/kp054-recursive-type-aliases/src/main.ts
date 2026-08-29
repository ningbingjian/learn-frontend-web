type Category = {
  name: string;
  children: Category[];
};

function countCategories(category: Category): number {
  return 1 + category.children.reduce(
    (count, child) => count + countCategories(child),
    0
  );
}

function flattenNames(category: Category): string[] {
  return [
    category.name,
    ...category.children.flatMap(flattenNames)
  ];
}

const root: Category = {
  name: 'frontend',
  children: [
    {
      name: 'language',
      children: [
        { name: 'javascript', children: [] },
        { name: 'typescript', children: [] }
      ]
    }
  ]
};

console.log(countCategories(root));
console.log(flattenNames(root).join(' > '));
