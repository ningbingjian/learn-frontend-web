import React from 'react';
import { createRoot } from 'react-dom/client';

const scenarios = [
  {
    name: '需要 SSR、路由、数据加载和服务端能力的新业务应用',
    recommendation: '',
    reason: '',
  },
  {
    name: '为了学习 React Core 的最小组件实验项目',
    recommendation: '',
    reason: '',
  },
  {
    name: '仍能正常发布的 5 年 CRA 后台系统',
    recommendation: '',
    reason: '',
  },
  {
    name: '只需要客户端交互的小型嵌入式 React 页面',
    recommendation: '',
    reason: '',
  },
  {
    name: '准备迁移但尚未盘点工程约束的 CRA 项目',
    recommendation: '',
    reason: '',
  },
];

function App() {
  return (
    <main>
      <h1>CRA 迁移方向练习</h1>
      <ol>
        {scenarios.map((item) => (
          <li key={item.name}>
            <p>{item.name}</p>
            <p>方向：{item.recommendation || 'TODO'}</p>
            <p>理由：{item.reason || 'TODO'}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
