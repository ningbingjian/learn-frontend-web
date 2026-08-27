function resolveCoupon(code: string): string | null {
  if (code === 'VIP') {
    return '20% OFF';
  }

  return null;
}

const coupon = resolveCoupon('GUEST');

if (coupon === null) {
  console.log('coupon=none');
} else {
  console.log(coupon.toUpperCase());
}

console.log(typeof coupon);
