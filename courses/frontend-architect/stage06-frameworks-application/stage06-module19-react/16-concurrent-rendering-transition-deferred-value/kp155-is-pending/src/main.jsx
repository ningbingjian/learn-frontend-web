import { StrictMode, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function App() {
  const [reportVersion, setReportVersion] = useState(1);
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    startTransition(async () => {
      await wait(900);

      startTransition(() => {
        setReportVersion(version => version + 1);
      });
    });
  }

  return (
    <main aria-busy={isPending}>
      <h1>isPending</h1>
      <button onClick={handleRefresh} disabled={isPending}>
        {isPending ? '正在刷新报告…' : '刷新报告'}
      </button>
      <p>Transition pending：{String(isPending)}</p>
      <section style={{ opacity: isPending ? 0.6 : 1 }}>
        <h2>销售报告 v{reportVersion}</h2>
        <p>旧内容在新结果准备期间仍然可见。</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
