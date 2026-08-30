type SuccessStatus = 200;
type FeatureEnabled = true;
type RetryLimit = 3;

function summarize(status: SuccessStatus, enabled: FeatureEnabled): string {
  return `${status}:${enabled ? 'enabled' : 'disabled'}`;
}

const retryLimit: RetryLimit = 3;

console.log(summarize(200, true));
console.log(`retry=${retryLimit}`);
