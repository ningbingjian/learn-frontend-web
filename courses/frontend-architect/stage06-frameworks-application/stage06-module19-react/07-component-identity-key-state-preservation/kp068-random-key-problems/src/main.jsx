import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function DraftEditor({ label }) {
  const [draft, setDraft] = useState('');

  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <strong>{label}</strong>
      <br />
      <input
        value={draft}
        onChange={event => setDraft(event.target.value)}
        placeholder="先输入一些文字"
      />
    </label>
  );
}

function App() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <main>
      <h1>RE-KP068：随机 key 的问题</h1>
      <p>父组件 Render 次数触发器：{parentCount}</p>
      <button onClick={() => setParentCount(parentCount + 1)}>
        让父组件重新 Render
      </button>

      <hr />
      <DraftEditor key={Math.random()} label="错误：随机 key" />
      <DraftEditor key="stable-editor" label="正确：稳定 key" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
