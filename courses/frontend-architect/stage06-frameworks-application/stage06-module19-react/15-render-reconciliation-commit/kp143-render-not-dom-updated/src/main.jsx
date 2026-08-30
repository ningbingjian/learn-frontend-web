import { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const [lastImmediateRead, setLastImmediateRead] = useState('尚未点击');
  const valueRef = useRef(null);

  useLayoutEffect(() => {
    console.log('[after commit]', valueRef.current.textContent);
  }, [count]);

  function handleClick() {
    setCount(value => value + 1);
    const immediateText = valueRef.current.textContent;
    console.log('[inside event, before commit]', immediateText);
    setLastImmediateRead(immediateText);
  }

  return (
    <main>
      <h1>RE-KP143：Render 不等于 DOM 已更新</h1>
      <h2 ref={valueRef}>Count: {count}</h2>
      <button onClick={handleClick}>请求 +1，然后立即读 DOM</button>
      <p>事件处理器立即读到：{lastImmediateRead}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
