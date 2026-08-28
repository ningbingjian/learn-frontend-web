import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [saveCount, setSaveCount] = useState(0);
  const [status, setStatus] = useState('未保存');

  function handleSave() {
    console.log('1. Handler 开始');

    setSaveCount(saveCount + 1);
    setStatus('已保存');

    console.log('2. Handler 结束');
  }

  return (
    <main>
      <h1>同一事件中的自动批处理</h1>
      <p>保存次数：{saveCount}</p>
      <p>状态：{status}</p>
      <button onClick={handleSave}>保存</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
