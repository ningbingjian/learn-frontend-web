import { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function MeasuredCard() {
  const [width, setWidth] = useState(280);
  const [text, setText] = useState(
    'React 可以在 DOM Commit 之后、浏览器 Paint 之前测量真实布局。',
  );
  const [height, setHeight] = useState(0);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const rect = cardRef.current.getBoundingClientRect();
    setHeight(Math.round(rect.height));
  }, [width, text]);

  return (
    <main>
      <p>RE-KP131</p>
      <h1>useLayoutEffect</h1>
      <label>
        卡片宽度：{width}px
        <input
          type="range"
          min="180"
          max="520"
          value={width}
          onChange={event => setWidth(Number(event.target.value))}
        />
      </label>
      <br />
      <label>
        内容：
        <textarea value={text} onChange={event => setText(event.target.value)} rows="4" />
      </label>
      <div
        ref={cardRef}
        style={{ width, padding: 16, border: '1px solid currentColor', marginTop: 16 }}
      >
        <strong>Measured Card</strong>
        <p>{text}</p>
      </div>
      <p>Measured height: {height}px</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MeasuredCard />
  </StrictMode>,
);
