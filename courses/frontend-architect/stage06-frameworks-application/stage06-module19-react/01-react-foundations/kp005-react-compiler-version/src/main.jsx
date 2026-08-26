import React from 'react';
import { createRoot } from 'react-dom/client';

const compilerFacts = [
  ['Release', 'React Compiler 1.0'],
  ['Status', 'Stable / Production-ready'],
  ['Stage', 'Build time'],
  ['Goal', 'Automatic memoization'],
];

const pipeline = [
  'React Source',
  'React Compiler',
  'Optimized JavaScript',
  'React Runtime',
];

function App() {
  return (
    <main>
      <h1>React Compiler 1.0</h1>
      <p>Stable build-time optimizer</p>

      <h2>四个核心事实</h2>
      <ul>
        {compilerFacts.map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>

      <h2>它位于哪里</h2>
      <ol>
        {pipeline.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>

      <p>
        本课只建立版本和职责认知；安装、Vite 集成、lint、调试将在 React Compiler 专章学习。
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
