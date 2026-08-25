function formatOrderTotal(price: number, quantity: number): string {
  const total = price * quantity;
  return `¥${total.toFixed(2)}`;
}

console.log(formatOrderTotal(199, 2));

// 错误示例：取消注释后，TypeScript 应在类型检查阶段报告错误。
// console.log(formatOrderTotal(199, '2'));
