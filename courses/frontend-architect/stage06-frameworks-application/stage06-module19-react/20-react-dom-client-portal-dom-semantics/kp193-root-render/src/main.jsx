import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
let rootVersion = 1;

function App({ version, onRenderAgain }) {
  const [draft, setDraft] = useState('');

  return (
    <main>
      <h1>root.render</h1>
      <p>Root render version：{version}</p>
      <label>
        组件本地 State：
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="输入后再 root.render" />
      </label>
      <p>当前草稿：{draft || '（空）'}</p>
      <button onClick={onRenderAgain}>再次 root.render</button>
    </main>
  );
}

function handleRenderAgain() {
  rootVersion += 1;
  renderApp();
}

function renderApp() {
  root.render(<App version={rootVersion} onRenderAgain={handleRenderAgain} />);
}

renderApp();
