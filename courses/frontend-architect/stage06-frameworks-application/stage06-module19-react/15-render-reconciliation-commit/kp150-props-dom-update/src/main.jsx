import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function describeMutation(mutation) {
  if (mutation.type === 'attributes') {
    return `attribute: ${mutation.attributeName}`;
  }

  if (mutation.type === 'characterData') {
    return 'text content changed';
  }

  return `childList: +${mutation.addedNodes.length} / -${mutation.removedNodes.length}`;
}

function App() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [mutationLogs, setMutationLogs] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      setMutationLogs(logs => [
        ...mutations.map(describeMutation),
        ...logs,
      ].slice(0, 8));
    });

    observer.observe(cardRef.current, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <h1>RE-KP150：Props 更新与 DOM 更新</h1>
      <button type="button" onClick={() => setCount(count + 1)}>
        增加 count
      </button>{' '}
      <button type="button" onClick={() => setDisabled(!disabled)}>
        切换 disabled
      </button>

      <section ref={cardRef} data-count={count}>
        <p>Count: {count}</p>
        <button type="button" disabled={disabled}>
          Action
        </button>
      </section>

      <section>
        <h2>MutationObserver 观察日志</h2>
        <ul>
          {mutationLogs.map((log, index) => (
            <li key={`${log}-${index}`}>{log}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
