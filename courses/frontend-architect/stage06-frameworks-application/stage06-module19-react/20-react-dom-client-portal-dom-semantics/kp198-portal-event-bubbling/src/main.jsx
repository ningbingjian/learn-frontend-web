import { useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const portalTarget = document.getElementById('portal-root');

function App() {
  const [parentClicks, setParentClicks] = useState(0);
  const [portalClicks, setPortalClicks] = useState(0);
  const [stopBubble, setStopBubble] = useState(false);

  function handlePortalClick(event) {
    setPortalClicks(value => value + 1);
    if (stopBubble) event.stopPropagation();
  }

  return (
    <main>
      <h1>Portal 中事件冒泡</h1>
      <label><input type="checkbox" checked={stopBubble} onChange={event => setStopBubble(event.target.checked)} /> Portal 内 stopPropagation</label>
      <section onClick={() => setParentClicks(value => value + 1)} style={{ border: '2px solid currentColor', padding: 12, marginTop: 12 }}>
        <p>React Parent onClick 次数：{parentClicks}</p>
        <p>Portal Button 自身点击次数：{portalClicks}</p>
        {createPortal(<button onClick={handlePortalClick}>点击 Portal Button</button>, portalTarget)}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
