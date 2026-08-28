import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('选择一个延迟更新实验');

  function scheduleStaleIncrement() {
    const capturedCount = count;
    setMessage(`已安排 stale +1，捕获 count=${capturedCount}`);

    setTimeout(() => {
      setCount(capturedCount + 1);
      setMessage(`stale callback 使用旧值 ${capturedCount} 计算完成`);
    }, 2000);
  }

  function scheduleUpdaterIncrement() {
    setMessage('已安排 updater +1');

    setTimeout(() => {
      setCount(current => current + 1);
      setMessage('updater callback 基于执行时的 pending state +1');
    }, 2000);
  }

  return (
    <main>
      <h1>Stale Closure 根源实验</h1>
      <p>当前 count：{count}</p>
      <button onClick={scheduleStaleIncrement}>2 秒后 stale +1</button>{' '}
      <button onClick={scheduleUpdaterIncrement}>2 秒后 updater +1</button>{' '}
      <button onClick={() => setCount(current => current + 10)}>立即 +10</button>{' '}
      <button onClick={() => setCount(0)}>重置为 0</button>
      <p>{message}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
