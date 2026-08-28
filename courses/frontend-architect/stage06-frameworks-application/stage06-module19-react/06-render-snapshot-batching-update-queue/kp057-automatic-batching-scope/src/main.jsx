import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);

  console.count('App render');

  function updateInTimeout() {
    setTimeout(() => {
      setCount(current => current + 1);
      setEnabled(current => !current);
    }, 300);
  }

  function updateInPromise() {
    Promise.resolve().then(() => {
      setCount(current => current + 1);
      setEnabled(current => !current);
    });
  }

  return (
    <main>
      <h1>React 18+ 自动批处理范围</h1>
      <p>count：{count}</p>
      <p>enabled：{String(enabled)}</p>
      <button onClick={updateInTimeout}>在 setTimeout 中更新两个 State</button>{' '}
      <button onClick={updateInPromise}>在 Promise 中更新两个 State</button>
      <p>请打开 Console 观察 App render 次数。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
