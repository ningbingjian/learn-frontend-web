import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [number, setNumber] = useState(0);

  function replaceThenUpdate() {
    setNumber(5);
    setNumber(n => n + 1);
  }

  function updateThenReplace() {
    setNumber(n => n + 1);
    setNumber(5);
  }

  return (
    <main>
      <h1>替换更新与函数更新混合</h1>
      <p>当前 number：{number}</p>
      <button onClick={replaceThenUpdate}>replace 5 → updater +1</button>{' '}
      <button onClick={updateThenReplace}>updater +1 → replace 5</button>{' '}
      <button onClick={() => setNumber(0)}>重置为 0</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
