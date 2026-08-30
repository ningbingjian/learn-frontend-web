import { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [kind, setKind] = useState('button');
  const [label, setLabel] = useState('保存');
  const [identityResult, setIdentityResult] = useState('尚未检查');
  const hostRef = useRef(null);
  const firstNodeRef = useRef(null);

  useLayoutEffect(() => {
    if (firstNodeRef.current === null) {
      firstNodeRef.current = hostRef.current;
    }
  }, []);

  function handleInspect() {
    const sameNode = hostRef.current === firstNodeRef.current;
    setIdentityResult(sameNode ? '仍是首次 DOM 节点' : '已经换成新的 DOM 节点');
  }

  return (
    <main>
      <h1>RE-KP149：DOM 节点复用与替换</h1>
      <button
        type="button"
        onClick={() => setLabel(label === '保存' ? '提交' : '保存')}
      >
        切换 label
      </button>{' '}
      <button
        type="button"
        onClick={() => setKind(kind === 'button' ? 'link' : 'button')}
      >
        切换 Host Type
      </button>{' '}
      <button type="button" onClick={handleInspect}>
        检查 DOM identity
      </button>

      <section>
        {kind === 'button' ? (
          <button ref={hostRef} type="button">{label}</button>
        ) : (
          <a ref={hostRef} href="#demo">{label}</a>
        )}
      </section>

      <p>{identityResult}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
