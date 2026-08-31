let currency = 'CNY' as const;
const externalTags = ['stable'];

const config = {
  mode: 'production',
  retries: [1, 2],
  tags: externalTags
} as const;

externalTags.push('web');

console.log(currency);
console.log(config.mode);
console.log(config.retries.join(','));
console.log(config.tags.join('|'));
