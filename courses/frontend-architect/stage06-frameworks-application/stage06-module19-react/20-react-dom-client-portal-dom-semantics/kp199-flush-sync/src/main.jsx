import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState('尚未实验');
  const countRef = useRef(null);

  function handleNormalUpdate() {
    const before = countRef.current.textContent;
    setCount(value => value + 1);
    const immediatelyAfter = countRef.current.textContent;
    setLog(`普通 setState：before=${before}；同一事件中立刻读取=${immediatelyAfter}`);
  }

  function handleFlushSyncUpdate() {
    const before = countRef.current.textContent;
    flushSync(() => {
      setCount(value => value + 1);
    });
    const immediatelyAfter = countRef.current.textContent;
    setLog(`flushSync：before=${before}；flushSync 返回后读取=${immediatelyAfter}`);
  }

  return (
    <main>
      <h1>flushSync</h1>
      <p ref={countRef}>Count：{count}</p>
      <button onClick={handleNormalUpdate}>普通更新后立刻读 DOM</button>{' '}
      <button onClick={handleFlushSyncUpdate}>flushSync 后立刻读 DOM</button>
      <p>{log}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
