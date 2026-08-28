import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [number, setNumber] = useState(0);

  function handleIncrease() {
    console.log('Handler 开始时捕获的 number：', number);

    const nextNumber = number + 1;
    setNumber(nextNumber);

    console.log('调用 setter 后，闭包里的 number：', number);
    console.log('本次 Handler 计算出的 nextNumber：', nextNumber);
  }

  return (
    <main>
      <h1>事件处理器闭包与快照</h1>
      <p>当前页面 State：{number}</p>
      <button onClick={handleIncrease}>增加并观察 Handler 闭包</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
