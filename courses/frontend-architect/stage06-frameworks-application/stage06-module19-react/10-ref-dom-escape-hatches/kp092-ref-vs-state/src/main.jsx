import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [visibleCount, setVisibleCount] = useState(0);
  const silentCountRef = useRef(0);

  function handleSilentIncrement() {
    silentCountRef.current += 1;
    console.log('silent ref:', silentCountRef.current);
  }

  return (
    <main>
      <h1>Ref 与 State 的区别</h1>
      <p>UI Count：{visibleCount}</p>
      <button type="button" onClick={() => setVisibleCount(count => count + 1)}>
        State +1
      </button>{' '}
      <button type="button" onClick={handleSilentIncrement}>
        Ref +1（看 Console）
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
