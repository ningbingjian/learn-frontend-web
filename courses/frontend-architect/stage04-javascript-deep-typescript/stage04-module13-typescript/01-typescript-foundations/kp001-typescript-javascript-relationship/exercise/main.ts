function formatOrderTotal(price, quantity) {
  const total = price * quantity;
  return `¥${total.toFixed(2)}`;
}

console.log(formatOrderTotal(199, 2));

// 完成类型标注后，取消下一行注释并执行类型检查。
// console.log(formatOrderTotal(199, '2'));
