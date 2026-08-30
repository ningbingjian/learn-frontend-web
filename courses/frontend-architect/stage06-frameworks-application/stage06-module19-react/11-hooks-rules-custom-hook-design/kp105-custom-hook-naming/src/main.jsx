import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function formatStatus(on) {
  return on ? 'ON' : 'OFF';
}

function useToggle(initialValue = false) {
  const [on, setOn] = useState(initialValue);

  function toggle() {
    setOn(value => !value);
  }

  return { on, toggle };
}

function App() {
  const { on, toggle } = useToggle(true);

  return (
    <main>
      <h1>自定义 Hook 的命名规则</h1>
      <p>状态：{formatStatus(on)}</p>
      <button onClick={toggle}>Toggle</button>
      <p>`useToggle` 是 Hook；`formatStatus` 是普通 helper。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
