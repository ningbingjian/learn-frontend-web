import { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [identityResult, setIdentityResult] = useState('尚未检查');
  const inputRef = useRef(null);
  const firstInputNodeRef = useRef(null);

  useLayoutEffect(() => {
    if (firstInputNodeRef.current === null) {
      firstInputNodeRef.current = inputRef.current;
    }
  }, []);

  function handleInspect() {
    const reused = inputRef.current === firstInputNodeRef.current;
    setIdentityResult(reused ? '仍是同一个 DOM 节点' : 'DOM 节点已经被替换');
  }

  return (
    <main>
      <h1>RE-KP146：Reconciliation 基本目标</h1>
      <p>Count：{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        增加 count
      </button>

      <section>
        <h2>与 count 无关的 DOM</h2>
        <input ref={inputRef} defaultValue="在这里输入一些内容" />
        <button type="button" onClick={handleInspect}>
          检查 DOM 节点身份
        </button>
        <p>{identityResult}</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
