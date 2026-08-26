interface ServiceConfig {
  endpoint: string;
  timeoutMs: number;
}

const config: ServiceConfig = {
  endpoint: '/api/products',
  timeoutMs: 3000
};

function describeConfig(value: ServiceConfig): string {
  return `${value.endpoint} (${value.timeoutMs}ms)`;
}

console.log(describeConfig(config));
