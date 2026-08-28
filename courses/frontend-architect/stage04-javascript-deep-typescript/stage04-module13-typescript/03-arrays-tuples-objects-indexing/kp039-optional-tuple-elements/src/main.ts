type SearchResult = [string, number, string?];

const firstPage: SearchResult = ['keyboard', 42];
const nextPage: SearchResult = ['keyboard', 42, 'cursor-2'];

function describeResult(result: SearchResult): string {
  const [query, count, cursor] = result;
  return `${query}:${count}:${cursor ?? 'none'}`;
}

console.log(describeResult(firstPage));
console.log(describeResult(nextPage));
