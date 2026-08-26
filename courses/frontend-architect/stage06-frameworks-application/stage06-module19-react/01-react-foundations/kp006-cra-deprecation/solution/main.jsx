import React from 'react';
import { createRoot } from 'react-dom/client';

const scenarios = [
  {
    name: '需要 SSR、路由、数据加载和服务端能力的新业务应用',
    recommendation: 'Framework first',
    reason: '需求已经超出纯 UI Library 和 Build Tool 的职责，应该先评估 React 推荐 Framework。',
  },
  {
    name: '为了学习 React Core 的最小组件实验项目',
    recommendation: 'Build Tool first',
    reason: '目标是看清 React Core，本课程使用 Vite 保持工程结构透明。',
  },
  {
    name: '仍能正常发布的 5 年 CRA 后台系统',
    recommendation: 'Keep + audit + plan migration',
    reason: 'Deprecated 不等于立即损坏，应先保证业务稳定，再盘点依赖和迁移成本。',
  },
  {
    name: '只需要客户端交互的小型嵌入式 React 页面',
    recommendation: 'Build Tool first',
    reason: '没有明确需要完整 Framework 的能力，可以用较轻的 Build Tool 方案。',
  },
  {
    name: '准备迁移但尚未盘点工程约束的 CRA 项目',
    recommendation: 'Keep + audit + plan migration',
    reason: '先检查环境变量、代理、测试、部署和 react-scripts 等约束，再决定目标方案。',
  },
];

function App() {
  return (
    <main>
      <h1>CRA 迁移方向参考答案</h1>
      <ol>
        {scenarios.map((item) => (
          <li key={item.name}>
            <p>{item.name}</p>
            <p><strong>方向：</strong>{item.recommendation}</p>
            <p><strong>理由：</strong>{item.reason}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
