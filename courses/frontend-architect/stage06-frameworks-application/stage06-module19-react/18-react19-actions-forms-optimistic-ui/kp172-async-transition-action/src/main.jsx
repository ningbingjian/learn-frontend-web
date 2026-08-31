import { StrictMode, startTransition, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function ActionButton({ action, children }) {
  const [isPending, startAction] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startAction(async () => {
          await action();
        });
      }}
    >
      {isPending ? '处理中…' : children}
    </button>
  );
}

function App() {
  const [status, setStatus] = useState('idle');

  async function saveAction() {
    await wait(900);
    startTransition(() => setStatus('saved'));
  }

  function resetAction() {
    setStatus('idle');
  }

  return (
    <main>
      <h1>异步 Transition 与 Action</h1>
      <p>状态：{status}</p>
      <ActionButton action={saveAction}>异步保存</ActionButton>{' '}
      <ActionButton action={resetAction}>同步重置</ActionButton>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
