type UserCard = {
  name: string;
};

function printCard(card: UserCard): string {
  return card.name.toUpperCase();
}

const candidate = {
  name: 'Ada',
  role: 'admin'
};

console.log(printCard(candidate));
console.log(candidate.role);
