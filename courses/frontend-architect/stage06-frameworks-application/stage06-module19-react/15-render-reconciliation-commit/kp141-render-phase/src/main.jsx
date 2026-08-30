import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Summary({ count }) {
  console.log('[render] Summary count =', count);
  return <p>Summary count: {count}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('');

  console.log('[render] App', { count, note });

  return (
    <main>
      <h1>RE-KP141：Render Phase</h1>
      <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>
      <p>
        <label>
          Unrelated note：
          <input value={note} onChange={event => setNote(event.target.value)} />
        </label>
      </p>
      <Summary count={count} />
      <p>打开 Console 观察每次组件函数被调用。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
