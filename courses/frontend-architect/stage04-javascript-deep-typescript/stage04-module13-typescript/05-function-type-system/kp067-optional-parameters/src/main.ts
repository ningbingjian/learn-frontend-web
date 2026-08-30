function formatUser(name: string, title?: string): string {
  if (title === undefined) {
    return name;
  }

  return `${name} (${title})`;
}

console.log(formatUser('Ada'));
console.log(formatUser('Ada', 'Admin'));
console.log(formatUser('Ada', undefined));
