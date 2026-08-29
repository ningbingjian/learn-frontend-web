import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function QuantityEditor({ value, onChange }) {
  return (
    <label>
      数量：{' '}
      <input
        type="number"
        min="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ShippingSelector({ value, onChange }) {
  return (
    <label>
      配送：{' '}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="standard">标准配送</option>
        <option value="express">加急配送</option>
      </select>
    </label>
  );
}

function OrderSummary({ order, total }) {
  return (
    <section>
      <h2>订单摘要</h2>
      <p>数量：{order.quantity}</p>
      <p>配送：{order.shippingMethod}</p>
      <strong>总价：¥{total}</strong>
    </section>
  );
}

function OrderWorkspace() {
  const unitPrice = 99;
  const [order, setOrder] = useState({
    quantity: 1,
    shippingMethod: 'standard',
  });

  function handleQuantityChange(nextQuantity) {
    const safeQuantity = Number.isFinite(nextQuantity)
      ? Math.max(1, nextQuantity)
      : 1;

    setOrder({
      ...order,
      quantity: safeQuantity,
    });
  }

  function handleShippingChange(shippingMethod) {
    setOrder({
      ...order,
      shippingMethod,
    });
  }

  const shippingPrice = order.shippingMethod === 'express' ? 30 : 0;
  const total = unitPrice * order.quantity + shippingPrice;

  return (
    <section>
      <QuantityEditor value={order.quantity} onChange={handleQuantityChange} />
      <br />
      <ShippingSelector
        value={order.shippingMethod}
        onChange={handleShippingChange}
      />
      <OrderSummary order={order} total={total} />
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP079：状态归属与组件边界</h1>
      <OrderWorkspace />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
