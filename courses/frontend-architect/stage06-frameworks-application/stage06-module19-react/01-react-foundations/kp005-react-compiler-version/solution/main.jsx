import React from 'react';
import { createRoot } from 'react-dom/client';

const statements = [
  {
    text: 'React Compiler 1.0 仍然只是 Beta。',
    result: '错误',
    reason: 'React Compiler 1.0 已于 2025-10-07 发布为第一个稳定版本，并被官方描述为 production-ready。',
  },
  {
    text: 'React Compiler 工作在构建阶段。',
    result: '正确',
    reason: '它分析和转换源码，再把生成的 JavaScript 交给 React Runtime 执行。',
  },
  {
    text: 'React Compiler 会在浏览器里替代 React Runtime。',
    result: '错误',
    reason: 'Compiler 是构建期优化工具，不是新的浏览器运行时。',
  },
  {
    text: 'React Compiler 的核心方向之一是自动 memoization。',
    result: '正确',
    reason: 'Compiler 会在可安全分析的场景中自动生成 memoization 优化。',
  },
  {
    text: 'React Compiler 稳定以后，所有项目都应该立刻开启。',
    result: '需要补充条件',
    reason: 'Stable 表示可以正式采用，但实际项目仍应检查代码健康度、Rules of React、性能收益和渐进迁移风险。',
  },
  {
    text: 'React 17 / 18 完全不能使用 React Compiler。',
    result: '错误',
    reason: 'React Compiler 支持 React 17+；低于 React 19 时需要额外 target/runtime 等兼容配置。',
  },
];

function App() {
  return (
    <main>
      <h1>React Compiler 判断练习参考答案</h1>
      <ol>
        {statements.map((item) => (
          <li key={item.text}>
            <p>{item.text}</p>
            <p><strong>判断：</strong>{item.result}</p>
            <p><strong>理由：</strong>{item.reason}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
