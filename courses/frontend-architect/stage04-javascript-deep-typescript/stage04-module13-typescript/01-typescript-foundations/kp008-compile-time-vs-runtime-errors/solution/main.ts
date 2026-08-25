function repeatText(text: string, times: number): string {
  return text.repeat(times);
}

const configText = '{"port": }';

console.log(repeatText('hi', 2));

// 取消注释后应产生编译期类型错误：
// repeatText(2, 'hi');

try {
  JSON.parse(configText);
} catch (error) {
  if (error instanceof Error) {
    console.log('运行时异常:', error.name);
  }
}

// repeatText('hi', -1) 的参数类型是正确的，
// 但运行时会因 String.prototype.repeat 的规则抛出 RangeError。
