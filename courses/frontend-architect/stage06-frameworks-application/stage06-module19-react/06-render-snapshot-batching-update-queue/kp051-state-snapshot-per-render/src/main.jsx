import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [number, setNumber] = useState(0);

  function handleIncrease() {
    const nextNumber = number + 1;

    console.log('setter 前的 number：', number);
    setNumber(nextNumber);
    console.log('setter 后的 number：', number);
    console.log('本次计算出的 nextNumber：', nextNumber);
  }

  return (
    <main>
      <h1>每次 Render 都得到状态快照</h1>
      <p>当前 number：{number}</p>
      <button onClick={handleIncrease}>增加 1 并观察 Console</button>
      <p>打开 DevTools Console，比较 setter 前后的 number。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
