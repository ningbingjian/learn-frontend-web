type Order = {
  id: number;
  customer: {
    name: string;
    contact: {
      email: string;
      phone?: string;
    };
  };
  shipping: {
    city: string;
    address: string;
  };
  items: Array<{
    sku: string;
    quantity: number;
    price: number;
  }>;
};

function summarizeOrder(order: Order): string {
  return `order=${order.id} customer=${order.customer.name} city=${order.shipping.city}`;
}

function calculateTotal(order: Order): number {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}

const order: Order = {
  id: 1001,
  customer: {
    name: 'Ada',
    contact: {
      email: 'ada@example.com'
    }
  },
  shipping: {
    city: 'Shanghai',
    address: 'Pudong'
  },
  items: [
    { sku: 'keyboard', quantity: 2, price: 499 },
    { sku: 'mouse', quantity: 1, price: 200 }
  ]
};

console.log(summarizeOrder(order));
console.log(calculateTotal(order).toFixed(2));
