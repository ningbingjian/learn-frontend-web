import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('pending');

  function handleAdd() {
    setCount(count + 1);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  return (
    <main>
      <h1>事件中的 State 更新</h1>
      <p>购物车数量：{count}</p>
      <button type="button" onClick={handleAdd}>
        加入购物车
      </button>

      <label>
        订单状态
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="shipped">shipped</option>
        </select>
      </label>
      <p>当前状态：{status}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
