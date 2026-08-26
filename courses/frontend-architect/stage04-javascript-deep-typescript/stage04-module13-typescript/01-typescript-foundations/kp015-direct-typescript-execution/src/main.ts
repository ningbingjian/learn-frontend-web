type User = {
  id: number;
  name: string;
};

function label(user: User): string {
  return `${user.id}:${user.name}`;
}

const user: User = {
  id: 1,
  name: 'Ada'
};

console.log(label(user));
