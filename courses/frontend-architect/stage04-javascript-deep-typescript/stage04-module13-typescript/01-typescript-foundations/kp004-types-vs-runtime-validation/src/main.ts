type User = {
  id: number;
  name: string;
};

const rawJson = '{"id":"not-a-number","name":"Ada"}';

const unsafeUser: User = JSON.parse(rawJson);

try {
  console.log(unsafeUser.id.toFixed(0));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`unsafe runtime error: ${message}`);
}

const candidate: unknown = JSON.parse(rawJson);

if (
  typeof candidate === 'object' &&
  candidate !== null &&
  'id' in candidate &&
  'name' in candidate &&
  typeof candidate.id === 'number' &&
  typeof candidate.name === 'string'
) {
  console.log(`safe user id=${candidate.id.toFixed(0)}, name=${candidate.name}`);
} else {
  console.log('runtime validation rejected invalid user');
}
