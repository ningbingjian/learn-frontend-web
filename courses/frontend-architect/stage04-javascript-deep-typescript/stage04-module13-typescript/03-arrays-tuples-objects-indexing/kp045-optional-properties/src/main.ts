function describeUser(user: { id: number; name: string; nickname?: string }): string {
  const displayName = user.nickname?.trim() || user.name;
  return `${user.id}:${displayName}`;
}

console.log(describeUser({ id: 1, name: 'Ada' }));
console.log(describeUser({ id: 2, name: 'Lin', nickname: 'L' }));
