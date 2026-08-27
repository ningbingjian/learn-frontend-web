import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  function incrementOnce() {
    setCount(count + 1);
  }

  function incrementThree() {
    setCount(previousCount => previousCount + 1);
    setCount(previousCount => previousCount + 1);
    setCount(previousCount => previousCount + 1);
  }

  return (
    <main>
      <h1>函数式 State 更新</h1>
      <p>当前计数：{count}</p>
      <button onClick={incrementOnce}>+1</button>{' '}
      <button onClick={incrementThree}>+3（updater）</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
