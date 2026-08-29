type NamedEntry = {
  name: string;
};

type ProductEntry = {
  id: number;
  name: string;
};

type ProductDirectory = {
  [key: string]: NamedEntry;
  [index: number]: ProductEntry;
};

const keyboard: ProductEntry = { id: 101, name: 'Keyboard' };
const mouse: ProductEntry = { id: 102, name: 'Mouse' };

const directory: ProductDirectory = {
  0: keyboard,
  1: mouse,
  fallback: { name: 'Unknown' }
};

console.log(directory[0].id);
console.log(directory['fallback'].name.toUpperCase());
console.log(directory[0] === directory['0']);
