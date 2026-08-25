type UserId = string;

interface User {
  id: UserId;
  name: string;
}

function formatUser(user: User): string {
  return `${user.id}: ${user.name}`;
}

const user: User = {
  id: 'u-001',
  name: 'Ada'
};

console.log(formatUser(user));
