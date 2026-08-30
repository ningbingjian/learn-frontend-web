import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function PriceSummary({ price, quantity }) {
  console.log('[render] PriceSummary', { price, quantity });
  const total = price * quantity;
  return <p>Total: ${total}</p>;
}

function App() {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  console.log('[render] App');

  return (
    <main>
      <h1>RE-KP144：组件函数为什么可以重复执行</h1>
      <button onClick={() => setQuantity(value => value + 1)}>
        Quantity: {quantity}
      </button>
      <PriceSummary price={99} quantity={quantity} />
      <label>
        Unrelated note：
        <input value={note} onChange={event => setNote(event.target.value)} />
      </label>
      <p>打开 Console 观察 StrictMode 下的 Render 调用。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
