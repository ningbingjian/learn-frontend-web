import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function UncontrolledPanel({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <h2>{title}</h2>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
      </button>
      {open && <p>这个 Panel 自己保存 open State。</p>}
    </section>
  );
}

function ControlledPanel({ title, open, onOpenChange }) {
  return (
    <section>
      <h2>{title}</h2>
      <button type="button" onClick={() => onOpenChange(!open)}>
        {open ? '关闭' : '打开'}
      </button>
      {open && <p>这个 Panel 的 open 由父组件控制。</p>}
    </section>
  );
}

function App() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <main>
      <h1>RE-KP075：受控与非受控的选择</h1>
      <button type="button" onClick={() => setControlledOpen(true)}>
        父级强制打开受控 Panel
      </button>{' '}
      <button type="button" onClick={() => setControlledOpen(false)}>
        父级强制关闭受控 Panel
      </button>

      <UncontrolledPanel title="非受控 Panel" />
      <ControlledPanel
        title="受控 Panel"
        open={controlledOpen}
        onOpenChange={setControlledOpen}
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
