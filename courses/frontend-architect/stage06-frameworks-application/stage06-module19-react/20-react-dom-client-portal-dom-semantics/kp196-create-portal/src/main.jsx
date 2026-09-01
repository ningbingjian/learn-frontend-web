import { useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const portalTarget = document.getElementById('portal-root');

function Modal({ onClose }) {
  return (
    <div style={{ border: '2px solid currentColor', padding: 16, margin: 8 }}>
      <strong>我是通过 Portal 渲染的 Modal</strong>
      <p>我的 DOM 位于 #portal-root，而不是 #root 内。</p>
      <button onClick={onClose}>关闭</button>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1>createPortal</h1>
      <p>这个 App 的普通 DOM 都位于 #root。</p>
      <button onClick={() => setOpen(true)}>打开 Portal</button>
      {open && createPortal(<Modal onClose={() => setOpen(false)} />, portalTarget)}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
