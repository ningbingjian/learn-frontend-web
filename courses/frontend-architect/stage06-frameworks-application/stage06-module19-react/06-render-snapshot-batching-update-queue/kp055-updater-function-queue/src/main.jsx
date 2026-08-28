import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [number, setNumber] = useState(0);

  function handleReplacementPlusThree() {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }

  function handleUpdaterPlusThree() {
    setNumber(n => n + 1);
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  }

  return (
    <main>
      <h1>Updater Function 队列</h1>
      <p>当前 number：{number}</p>
      <button onClick={handleReplacementPlusThree}>replacement × 3</button>{' '}
      <button onClick={handleUpdaterPlusThree}>updater × 3</button>{' '}
      <button onClick={() => setNumber(0)}>重置为 0</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
