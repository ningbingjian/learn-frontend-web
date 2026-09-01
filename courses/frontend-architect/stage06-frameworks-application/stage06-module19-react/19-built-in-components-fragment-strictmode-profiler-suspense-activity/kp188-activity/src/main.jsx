import { Activity, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function DraftPanel() {
  const [draft, setDraft] = useState('Activity keeps me');

  return (
    <section>
      <h2>后台草稿面板</h2>
      <label>
        草稿：
        <input value={draft} onChange={event => setDraft(event.target.value)} />
      </label>
      <p>当前草稿：{draft}</p>
    </section>
  );
}

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main>
      <h1>Activity</h1>
      <button onClick={() => setIsVisible(value => !value)}>
        {isVisible ? '隐藏 Activity' : '显示 Activity'}
      </button>
      <p>当前 mode：{isVisible ? 'visible' : 'hidden'}</p>

      <Activity mode={isVisible ? 'visible' : 'hidden'}>
        <DraftPanel />
      </Activity>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
