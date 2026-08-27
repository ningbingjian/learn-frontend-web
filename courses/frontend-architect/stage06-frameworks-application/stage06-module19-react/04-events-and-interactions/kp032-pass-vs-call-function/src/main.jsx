import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  function handleSave() {
    console.log('save clicked');
  }

  function handleSelect(orderId) {
    console.log(`selected: ${orderId}`);
  }

  return (
    <main>
      <h1>传递函数 vs 调用函数</h1>
      <button type="button" onClick={handleSave}>
        保存
      </button>
      <button type="button" onClick={() => handleSelect('A1024')}>
        选择 A1024
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
