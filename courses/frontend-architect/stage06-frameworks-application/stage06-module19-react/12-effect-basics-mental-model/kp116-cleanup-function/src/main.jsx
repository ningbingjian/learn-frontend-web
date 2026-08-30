import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('setup: start interval');

    const intervalId = setInterval(() => {
      setSeconds(value => value + 1);
    }, 1000);

    return () => {
      console.log('cleanup: clear interval');
      clearInterval(intervalId);
    };
  }, []);

  return <p>Timer：{seconds} 秒</p>;
}

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <main>
      <h1>Cleanup Function</h1>
      <button onClick={() => setShowTimer(value => !value)}>
        {showTimer ? '隐藏 Timer' : '显示 Timer'}
      </button>
      {showTimer && <Timer />}
      <p>打开 Console 观察 setup / cleanup。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
