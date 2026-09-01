import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const ThemeContext = createContext('default');
const portalTarget = document.getElementById('portal-root');

function PortalCard() {
  const theme = useContext(ThemeContext);
  return <section id="portal-card"><strong>Portal Card</strong><p>读取到 Context：{theme}</p></section>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState('尚未打开 Portal');

  useEffect(() => {
    if (!open) return;
    const card = document.getElementById('portal-card');
    const rootContainer = document.getElementById('root');
    setReport(`#root.contains(card) = ${rootContainer.contains(card)}；#portal-root.contains(card) = ${portalTarget.contains(card)}`);
  }, [open]);

  return (
    <ThemeContext value="ocean">
      <main>
        <h1>Portal：DOM 位置 vs React Tree 位置</h1>
        <button onClick={() => setOpen(value => !value)}>{open ? '关闭' : '打开'} Portal</button>
        <p>{report}</p>
        {open && createPortal(<PortalCard />, portalTarget)}
      </main>
    </ThemeContext>
  );
}

createRoot(document.getElementById('root')).render(<App />);
