type User = {
  id: number;
  name: string;
};

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.name === 'string';
}

const unsafePayload: unknown = { id: '101', name: 'Ada' };
const asserted = unsafePayload as User;

console.log(typeof asserted.id);
console.log(isUser(unsafePayload));

const validPayload: unknown = { id: 101, name: 'Ada' };

if (isUser(validPayload)) {
  console.log(validPayload.name.toUpperCase());
}
