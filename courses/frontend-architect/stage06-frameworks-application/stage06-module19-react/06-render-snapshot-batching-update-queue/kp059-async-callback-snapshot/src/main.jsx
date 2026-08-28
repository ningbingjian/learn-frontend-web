import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('还没有异步回调结果');

  function readLater() {
    const scheduledCount = count;

    setTimeout(() => {
      setMessage(`这个回调安排时看到的 count：${scheduledCount}`);
    }, 2000);
  }

  return (
    <main>
      <h1>异步回调中的 State Snapshot</h1>
      <p>当前 count：{count}</p>
      <button onClick={() => setCount(current => current + 1)}>count + 1</button>{' '}
      <button onClick={readLater}>2 秒后读取当前 Snapshot</button>
      <p>{message}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
