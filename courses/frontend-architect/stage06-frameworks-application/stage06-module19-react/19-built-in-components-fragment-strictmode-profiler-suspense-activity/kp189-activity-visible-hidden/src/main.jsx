import { Activity, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function LivePanel() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    console.log('setup: start activity timer');
    const intervalId = setInterval(() => {
      setTicks(value => value + 1);
    }, 1000);

    return () => {
      console.log('cleanup: stop activity timer');
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section>
      <h2>Live Panel</h2>
      <p>Effect timer：{ticks} 秒</p>
    </section>
  );
}

function App() {
  const [mode, setMode] = useState('visible');

  return (
    <main>
      <h1>Activity visible / hidden</h1>
      <button onClick={() => setMode(value => (value === 'visible' ? 'hidden' : 'visible'))}>
        切换到 {mode === 'visible' ? 'hidden' : 'visible'}
      </button>
      <p>当前 mode：{mode}</p>
      <Activity mode={mode}>
        <LivePanel />
      </Activity>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
