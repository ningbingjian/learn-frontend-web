import { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('');
  const valueRef = useRef(null);

  console.log('[render] count =', count, 'note =', note);

  useLayoutEffect(() => {
    console.log('[commit] DOM text =', valueRef.current.textContent);
  });

  return (
    <main>
      <h1>RE-KP142：Commit Phase</h1>
      <h2 ref={valueRef}>Count: {count}</h2>
      <button onClick={() => setCount(value => value + 1)}>增加 Count</button>
      <p>
        <label>
          Unrelated note：
          <input value={note} onChange={event => setNote(event.target.value)} />
        </label>
      </p>
      <p>打开 Console，对比 [render] 与 [commit]。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
