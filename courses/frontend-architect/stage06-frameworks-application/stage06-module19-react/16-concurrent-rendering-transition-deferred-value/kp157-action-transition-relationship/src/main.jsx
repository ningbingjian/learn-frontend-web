import { StrictMode, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

function saveDisplayName(name) {
  return new Promise(resolve => {
    setTimeout(() => resolve(name), 700);
  });
}

function App() {
  const [draftName, setDraftName] = useState('Ada');
  const [savedName, setSavedName] = useState('Ada');
  const [isPending, startTransition] = useTransition();

  async function submitAction() {
    const submittedName = draftName.trim();
    if (!submittedName) return;

    const serverName = await saveDisplayName(submittedName);

    startTransition(() => {
      setSavedName(serverName);
    });
  }

  return (
    <main>
      <h1>Action 与 Transition 的关系</h1>
      <label>
        昵称草稿：
        <input
          value={draftName}
          onChange={event => setDraftName(event.target.value)}
        />
      </label>{' '}
      <button onClick={() => startTransition(submitAction)} disabled={isPending}>
        {isPending ? '提交 Action 中…' : '提交'}
      </button>
      <p>已保存昵称：{savedName}</p>
      <p>submitAction 是 Action；startTransition 启动 Transition。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
