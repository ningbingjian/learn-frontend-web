import React from 'react';
import { createRoot } from 'react-dom/client';

function ActionButton({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
}) {
  return (
    <button
      type="button"
      className={`button button-${variant} button-${size}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function App() {
  return (
    <main>
      <h1>Avoid Boolean Props Explosion</h1>
      <p>用语义维度表达组件状态，而不是堆叠互斥 Boolean。</p>

      <div>
        <ActionButton>保存</ActionButton>
        <ActionButton variant="danger">删除</ActionButton>
        <ActionButton variant="success" size="small">已完成</ActionButton>
        <ActionButton disabled>处理中</ActionButton>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
