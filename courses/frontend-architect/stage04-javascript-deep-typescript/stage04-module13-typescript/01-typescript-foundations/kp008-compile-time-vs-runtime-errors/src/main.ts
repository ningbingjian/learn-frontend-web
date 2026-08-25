function average(total: number, count: number): number {
  return total / count;
}

console.log('正常平均值:', average(100, 4));
console.log('除以零:', average(100, 0));

const brokenJson = '{"name": }';

try {
  JSON.parse(brokenJson);
} catch (error) {
  if (error instanceof Error) {
    console.log('运行时异常:', error.name);
  }
}
