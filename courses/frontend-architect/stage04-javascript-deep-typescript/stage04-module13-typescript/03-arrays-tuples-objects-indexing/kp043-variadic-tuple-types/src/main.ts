function prepend<Head, Tail extends unknown[]>(
  head: Head,
  ...tail: Tail
): [Head, ...Tail] {
  return [head, ...tail];
}

function concat<Left extends unknown[], Right extends unknown[]>(
  left: [...Left],
  right: [...Right]
): [...Left, ...Right] {
  return [...left, ...right];
}

const order = prepend('order', 1001, true);
const combined = concat(
  ['product', 499] as [string, number],
  [false] as [boolean]
);

const [, orderId, paid] = order;
const [kind, price, featured] = combined;

console.log(`${orderId.toFixed(0)}:${paid ? 'paid' : 'unpaid'}`);
console.log(`${kind}:${price.toFixed(2)}:${featured}`);
