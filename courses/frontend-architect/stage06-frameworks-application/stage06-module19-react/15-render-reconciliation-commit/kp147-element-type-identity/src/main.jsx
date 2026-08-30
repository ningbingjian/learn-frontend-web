import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Editor({ tone }) {
  const [draft, setDraft] = useState('');

  return (
    <section>
      <h2>Editor</h2>
      <p>当前 tone：{tone}</p>
      <input
        value={draft}
        onChange={event => setDraft(event.target.value)}
        placeholder="输入草稿"
      />
      <p>当前草稿：{draft || '（空）'}</p>
    </section>
  );
}

function Preview() {
  return (
    <section>
      <h2>Preview</h2>
      <strong>这里只是预览模式。</strong>
    </section>
  );
}

function App() {
  const [mode, setMode] = useState('editor');
  const [tone, setTone] = useState('normal');

  return (
    <main>
      <h1>RE-KP147：Element Type 与身份比较</h1>
      <button
        type="button"
        onClick={() => setTone(tone === 'normal' ? 'strong' : 'normal')}
      >
        切换 tone
      </button>{' '}
      <button
        type="button"
        onClick={() => setMode(mode === 'editor' ? 'preview' : 'editor')}
      >
        {mode === 'editor' ? '切到 Preview' : '切回 Editor'}
      </button>

      {mode === 'editor' ? <Editor tone={tone} /> : <Preview />}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
