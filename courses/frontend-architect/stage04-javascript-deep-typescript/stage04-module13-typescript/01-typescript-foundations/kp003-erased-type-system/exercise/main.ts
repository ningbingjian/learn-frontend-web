function formatUser(user) {
  return `${user.id}: ${user.name}`;
}

const user = {
  id: 'u-001',
  name: 'Ada'
};

console.log(formatUser(user));
