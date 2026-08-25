function shippingFee(weight: number, unitPrice: number): number {
  return weight * unitPrice;
}

console.log(shippingFee(3, 10));
console.log(shippingFee(-3, 10));

// 取消注释后应出现类型错误：
// shippingFee('3', 10);
