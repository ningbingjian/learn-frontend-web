import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function ControlledLoopDemo() {
  const [loopCount, setLoopCount] = useState(5);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (runId > 0 && loopCount < 5) {
      console.log('Effect updates loopCount:', loopCount, '→', loopCount + 1);
      setLoopCount(loopCount + 1);
    }
  }, [loopCount, runId]);

  function startDemo() {
    setLoopCount(0);
    setRunId(id => id + 1);
  }

  return (
    <section>
      <h2>受控复现：Effect → State → dependency</h2>
      <p>loopCount: {loopCount}</p>
      <button type="button" onClick={startDemo}>
        启动受控循环实验
      </button>
      <p>最多执行到 5，避免教学页面真的无限循环。</p>
    </section>
  );
}

function SafeCounter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>修复：明确用户动作留在 Event Handler</h2>
      <p>safe count: {count}</p>
      <button type="button" onClick={() => setCount(value => value + 1)}>
        +1
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <p>RE-KP130</p>
      <h1>无限 Effect 循环诊断</h1>
      <ControlledLoopDemo />
      <SafeCounter />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
