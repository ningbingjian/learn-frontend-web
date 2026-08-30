import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function TimingChoiceDemo() {
  const [width, setWidth] = useState(320);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    document.title = `Panel ${width}px`;
  }, [width]);

  useLayoutEffect(() => {
    const rect = panelRef.current.getBoundingClientRect();
    setMeasuredWidth(Math.round(rect.width));
  }, [width]);

  return (
    <main>
      <p>RE-KP132</p>
      <h1>useEffect 与 useLayoutEffect 的选择</h1>
      <label>
        CSS width: {width}px
        <input
          type="range"
          min="200"
          max="560"
          value={width}
          onChange={event => setWidth(Number(event.target.value))}
        />
      </label>
      <div
        ref={panelRef}
        style={{ width, padding: 16, border: '1px solid currentColor', marginTop: 16 }}
      >
        <strong>Layout-sensitive panel</strong>
        <p>Paint 前需要的真实布局数据由 useLayoutEffect 测量。</p>
      </div>
      <p>Measured width: {measuredWidth}px</p>
      <p>非布局关键的 document.title 使用普通 useEffect 同步。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimingChoiceDemo />
  </StrictMode>,
);
