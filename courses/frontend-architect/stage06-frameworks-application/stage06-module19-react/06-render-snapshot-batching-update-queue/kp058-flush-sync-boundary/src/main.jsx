import { StrictMode, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [lastRead, setLastRead] = useState('尚未读取 DOM');

  function updateNormally() {
    setCount(count + 1);
    const text = document.getElementById('count-value').textContent;
    setLastRead(`普通更新后立即读取：${text}`);
  }

  function updateWithFlushSync() {
    flushSync(() => {
      setCount(count + 1);
    });

    const text = document.getElementById('count-value').textContent;
    setLastRead(`flushSync 后立即读取：${text}`);
  }

  return (
    <main>
      <h1>flushSync 的适用边界</h1>
      <p id="count-value">当前 count：{count}</p>
      <button onClick={updateNormally}>普通更新并立即读 DOM</button>{' '}
      <button onClick={updateWithFlushSync}>flushSync 更新并立即读 DOM</button>
      <p>{lastRead}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
