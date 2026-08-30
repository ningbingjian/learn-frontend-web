import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialItems = [
  { id: 1, name: 'Keyboard', price: 299, quantity: 1 },
  { id: 2, name: 'Mouse', price: 159, quantity: 2 },
];

function CartSummary() {
  const [items, setItems] = useState(initialItems);
  const [discountRate, setDiscountRate] = useState(0.1);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  function changeQuantity(id, delta) {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item,
      ),
    );
  }

  return (
    <main>
      <h1>在 Render 中计算派生值</h1>

      {items.map(item => (
        <section key={item.id}>
          <strong>{item.name}</strong>：¥{item.price} × {item.quantity}{' '}
          <button onClick={() => changeQuantity(item.id, -1)}>-1</button>{' '}
          <button onClick={() => changeQuantity(item.id, 1)}>+1</button>
        </section>
      ))}

      <p>
        折扣：{discountRate * 100}%{' '}
        <button onClick={() => setDiscountRate(0.1)}>10%</button>{' '}
        <button onClick={() => setDiscountRate(0.2)}>20%</button>
      </p>

      <hr />
      <p>商品总数量：{itemCount}</p>
      <p>小计：¥{subtotal.toFixed(2)}</p>
      <p>优惠：-¥{discount.toFixed(2)}</p>
      <p>最终金额：¥{total.toFixed(2)}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartSummary />
  </StrictMode>,
);
