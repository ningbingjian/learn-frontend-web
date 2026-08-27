import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  function handleCapture() {
    console.log('1. parent capture');
  }

  function handleButtonClick() {
    console.log('2. button click');
  }

  function handleBubble() {
    console.log('3. parent bubble');
  }

  return (
    <main>
      <h1>事件捕获</h1>
      <section onClickCapture={handleCapture} onClick={handleBubble}>
        <button type="button" onClick={handleButtonClick}>
          执行任务
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
