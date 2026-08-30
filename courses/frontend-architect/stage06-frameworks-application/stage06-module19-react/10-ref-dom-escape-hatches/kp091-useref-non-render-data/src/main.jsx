import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function handleStart() {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds(value => value + 1);
    }, 1000);
  }

  function handleStop() {
    if (intervalRef.current === null) return;

    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function handleReset() {
    setSeconds(0);
  }

  return (
    <main>
      <h1>useRef 保存非渲染数据</h1>
      <p>已运行：{seconds} 秒</p>
      <button onClick={handleStart}>开始</button>{' '}
      <button onClick={handleStop}>停止</button>{' '}
      <button onClick={handleReset}>重置显示</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Stopwatch />
  </StrictMode>,
);
