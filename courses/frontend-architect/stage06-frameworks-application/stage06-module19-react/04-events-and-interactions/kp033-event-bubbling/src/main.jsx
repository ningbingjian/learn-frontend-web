import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  function handleButtonClick(event) {
    console.log('1. button handler');
    console.log('button target:', event.target.tagName);
  }

  function handlePanelClick(event) {
    console.log('2. panel handler');
    console.log('panel target:', event.target.tagName);
    console.log('panel currentTarget:', event.currentTarget.tagName);
  }

  return (
    <main>
      <h1>事件冒泡</h1>
      <div onClick={handlePanelClick} style={{ padding: 24, border: '1px solid' }}>
        父级面板
        <br />
        <button type="button" onClick={handleButtonClick}>
          导出报表
        </button>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
