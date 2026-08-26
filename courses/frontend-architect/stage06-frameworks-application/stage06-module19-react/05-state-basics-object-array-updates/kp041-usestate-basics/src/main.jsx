import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <main>
      <h1>RE-KP041：useState 基础</h1>
      <p>当前计数：{count}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
