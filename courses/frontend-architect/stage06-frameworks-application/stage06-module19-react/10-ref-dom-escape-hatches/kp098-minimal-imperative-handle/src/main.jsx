import { StrictMode, useImperativeHandle, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function EditableCard({ ref, highlighted }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusEditor() {
      inputRef.current?.focus();
    },
  }), []);

  return (
    <section aria-label="可编辑卡片">
      <p>高亮状态：{highlighted ? '开启' : '关闭'}</p>
      <input ref={inputRef} defaultValue="React Escape Hatch" />
    </section>
  );
}

function App() {
  const cardRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);

  return (
    <main>
      <h1>Imperative Handle 最小化</h1>
      <EditableCard ref={cardRef} highlighted={highlighted} />
      <button onClick={() => cardRef.current?.focusEditor()}>聚焦编辑框</button>{' '}
      <button onClick={() => setHighlighted(value => !value)}>
        用 Prop 切换高亮
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
