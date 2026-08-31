import { StrictMode, startTransition, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

function savePreference(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value.trim().toUpperCase()), 900);
  });
}

function App() {
  const [draft, setDraft] = useState('compact');
  const [saved, setSaved] = useState('COMPACT');
  const [isPending, startAction] = useTransition();

  function handleSave() {
    const nextValue = draft;

    startAction(async () => {
      const savedValue = await savePreference(nextValue);
      startTransition(() => {
        setSaved(savedValue);
      });
    });
  }

  return (
    <main>
      <h1>React 19 Actions 模型</h1>
      <label>
        偏好值
        <input value={draft} onChange={event => setDraft(event.target.value)} />
      </label>
      <button onClick={handleSave} disabled={isPending || !draft.trim()}>
        {isPending ? '保存中…' : '保存'}
      </button>
      <p>已保存：{saved}</p>
      <p>输入仍然是 Urgent Update，保存流程由 Action 协调。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
