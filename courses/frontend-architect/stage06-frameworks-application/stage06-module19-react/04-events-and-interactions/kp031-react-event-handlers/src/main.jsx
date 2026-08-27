import React from 'react';
import { createRoot } from 'react-dom/client';

function ActionButton({ onAction, children }) {
  return (
    <button type="button" onClick={onAction}>
      {children}
    </button>
  );
}

function App() {
  function handleClick(event) {
    console.log('event type:', event.type);
    console.log('current target:', event.currentTarget);
    alert('操作已确认');
  }

  function handleExport() {
    alert('开始导出订单');
  }

  return (
    <main>
      <h1>React Event Handlers</h1>
      <button type="button" onClick={handleClick}>
        确认操作
      </button>
      <ActionButton onAction={handleExport}>
        导出订单
      </ActionButton>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
