interface UserToken {
  value: string;
}

interface OrderToken {
  value: string;
}

function readOrderToken(token: OrderToken): string {
  return token.value;
}

const userToken: UserToken = { value: 'token-001' };
console.log(`structural=${readOrderToken(userToken)}`);

class UserId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}

class OrderId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}

const userId = new UserId(101);
const orderId = new OrderId(101);

console.log(`same-value=${userId.value === orderId.value}`);
console.log(`classes=${userId.constructor.name}/${orderId.constructor.name}`);

// const invalidOrderId: OrderId = userId;
