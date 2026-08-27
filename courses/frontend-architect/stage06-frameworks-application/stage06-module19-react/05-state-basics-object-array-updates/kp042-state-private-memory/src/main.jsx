import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter({ label }) {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP042：State 是组件私有记忆</h1>
      <Counter label="Counter A" />
      <Counter label="Counter B" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
