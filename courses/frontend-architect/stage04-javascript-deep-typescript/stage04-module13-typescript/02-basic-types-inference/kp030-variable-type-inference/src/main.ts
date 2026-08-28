let retryCount = 0;
retryCount += 1;

let label = 'pending';
label = label.toUpperCase();

const enabled = true;
const config = {
  endpoint: '/api/products',
  timeoutMs: 3000
};

console.log(`${label}:${retryCount}:${enabled}`);
console.log(`${config.endpoint}:${config.timeoutMs}`);
