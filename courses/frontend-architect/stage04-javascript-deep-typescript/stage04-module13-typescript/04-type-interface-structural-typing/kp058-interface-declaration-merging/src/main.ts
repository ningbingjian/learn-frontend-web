interface Account {
  id: number;
  name: string;
}

interface Account {
  email: string;
}

const account: Account = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};

console.log(`${account.id}:${account.name}:${account.email}`);
console.log(Object.keys(account).join(','));
