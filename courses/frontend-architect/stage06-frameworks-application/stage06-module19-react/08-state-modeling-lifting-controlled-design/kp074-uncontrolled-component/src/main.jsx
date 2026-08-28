import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Disclosure({ title, initiallyOpen = false, children }) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <section>
      <h2>{title}</h2>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? '收起' : '展开'}
      </button>
      {open && <div>{children}</div>}
    </section>
  );
}

function App() {
  const [preferredInitialOpen, setPreferredInitialOpen] = useState(true);
  const [parentRenderCount, setParentRenderCount] = useState(0);

  return (
    <main>
      <h1>RE-KP074：非受控组件</h1>
      <p>父级 Render 计数：{parentRenderCount}</p>
      <p>父级当前传入 initiallyOpen：{String(preferredInitialOpen)}</p>

      <button
        type="button"
        onClick={() => setPreferredInitialOpen(!preferredInitialOpen)}
      >
        切换 initiallyOpen Prop
      </button>{' '}
      <button
        type="button"
        onClick={() => setParentRenderCount(parentRenderCount + 1)}
      >
        触发父级无关重渲染
      </button>

      <Disclosure title="订单详情" initiallyOpen={preferredInitialOpen}>
        <p>订单 #A1024，状态：待发货</p>
      </Disclosure>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
