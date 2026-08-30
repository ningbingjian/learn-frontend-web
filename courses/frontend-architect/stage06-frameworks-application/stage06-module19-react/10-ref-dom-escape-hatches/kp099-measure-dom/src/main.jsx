import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const cardRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [wide, setWide] = useState(false);

  function measureCard() {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setWidth(Math.round(rect.width));
    }
  }

  return (
    <main>
      <h1>测量 DOM</h1>
      <section
        ref={cardRef}
        style={{ width: wide ? 420 : 240, border: '1px solid', padding: 16 }}
      >
        这是待测量区域
      </section>
      <p>最近一次测量宽度：{width === null ? '尚未测量' : `${width}px`}</p>
      <button onClick={() => setWide(value => !value)}>切换区域宽度</button>{' '}
      <button onClick={measureCard}>读取当前 DOM 宽度</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
