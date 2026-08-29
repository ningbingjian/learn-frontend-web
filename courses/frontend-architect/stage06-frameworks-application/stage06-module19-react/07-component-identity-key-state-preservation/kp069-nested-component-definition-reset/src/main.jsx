import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function StableTextField() {
  const [text, setText] = useState('');
  return (
    <label>
      顶层定义：
      <input value={text} onChange={event => setText(event.target.value)} />
    </label>
  );
}

function App() {
  const [count, setCount] = useState(0);

  function NestedTextField() {
    const [text, setText] = useState('');
    return (
      <label>
        嵌套定义：
        <input value={text} onChange={event => setText(event.target.value)} />
      </label>
    );
  }

  return (
    <main>
      <h1>RE-KP069：嵌套组件定义导致状态意外重置</h1>
      <button onClick={() => setCount(count + 1)}>父组件计数：{count}</button>
      <p>两个输入框都输入文字，再点击上面的按钮。</p>
      <div style={{ display: 'grid', gap: 12 }}>
        <NestedTextField />
        <StableTextField />
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
