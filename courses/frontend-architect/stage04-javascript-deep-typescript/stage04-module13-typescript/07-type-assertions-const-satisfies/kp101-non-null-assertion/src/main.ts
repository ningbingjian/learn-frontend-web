type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Linus' }
];

const user = users.find((item) => item.id === 1)!;

console.log(user.name.toUpperCase());
console.log(user.id);
