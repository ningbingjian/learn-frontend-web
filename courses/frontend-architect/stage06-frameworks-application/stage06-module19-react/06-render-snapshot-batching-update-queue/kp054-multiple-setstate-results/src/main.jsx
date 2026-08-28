import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [number, setNumber] = useState(0);

  function handlePlusOne() {
    setNumber(number + 1);
  }

  function handlePlusThree() {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }

  return (
    <main>
      <h1>多次 setState 的结果</h1>
      <p>当前 number：{number}</p>
      <button onClick={handlePlusOne}>普通 +1</button>{' '}
      <button onClick={handlePlusThree}>连续三次 setNumber(number + 1)</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
