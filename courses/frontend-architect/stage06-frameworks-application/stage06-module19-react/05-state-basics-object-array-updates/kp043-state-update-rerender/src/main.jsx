import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  console.log('[render] count =', count);

  return (
    <main>
      <h1>RE-KP043：State 更新触发重新渲染</h1>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
