import React from 'react';
import { createRoot } from 'react-dom/client';

const statements = [
  { text: 'React Compiler 1.0 仍然只是 Beta。', result: '', reason: '' },
  { text: 'React Compiler 工作在构建阶段。', result: '', reason: '' },
  { text: 'React Compiler 会在浏览器里替代 React Runtime。', result: '', reason: '' },
  { text: 'React Compiler 的核心方向之一是自动 memoization。', result: '', reason: '' },
  { text: 'React Compiler 稳定以后，所有项目都应该立刻开启。', result: '', reason: '' },
  { text: 'React 17 / 18 完全不能使用 React Compiler。', result: '', reason: '' },
];

function App() {
  return (
    <main>
      <h1>React Compiler 判断练习</h1>
      <ol>
        {statements.map((item) => (
          <li key={item.text}>
            <p>{item.text}</p>
            <p>判断：{item.result || 'TODO'}</p>
            <p>理由：{item.reason || 'TODO'}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
