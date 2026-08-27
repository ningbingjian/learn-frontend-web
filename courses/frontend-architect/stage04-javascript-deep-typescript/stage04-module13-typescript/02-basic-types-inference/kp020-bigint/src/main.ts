const requestCount: bigint = 9_007_199_254_740_993n;
const retryCount = 7n;

function addCounts(left: bigint, right: bigint): bigint {
  return left + right;
}

const total = addCounts(requestCount, retryCount);

console.log(total.toString());
console.log(typeof total);
