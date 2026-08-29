type Address = {
  city: string;
  street: string;
};

type Customer = {
  id: number;
  name: string;
  address: Address;
};

type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  customer: Customer;
  items: OrderItem[];
};

function calculateTotal(order: Order): number {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}

const order: Order = {
  id: 1001,
  customer: {
    id: 1,
    name: 'Ada',
    address: {
      city: 'Shanghai',
      street: 'Century Avenue'
    }
  },
  items: [
    { sku: 'keyboard', quantity: 1, price: 499 },
    { sku: 'mouse', quantity: 2, price: 199 }
  ]
};

console.log(`${order.customer.name}@${order.customer.address.city}`);
console.log(calculateTotal(order).toFixed(2));
