import { createRoot } from 'react-dom/client';

const capabilities = [
  {
    name: '组件组合',
    owner: 'React Core',
    reason: 'React 直接提供组件模型。',
  },
  {
    name: '本地状态',
    owner: 'React Core',
    reason: 'React 直接提供 State 与 Hooks。',
  },
  {
    name: 'URL 路由',
    owner: 'Framework / Ecosystem',
    reason: 'React Core 不规定 URL 到页面的完整映射方案。',
  },
  {
    name: 'SSR / SSG 集成',
    owner: 'Framework / Ecosystem',
    reason: '需要 React 与路由、构建和服务端运行时共同集成。',
  },
  {
    name: '开发服务器与构建',
    owner: 'Toolchain',
    reason: '本课程由 Vite 提供这些工程能力。',
  },
  {
    name: '部署约定',
    owner: 'Framework / Platform',
    reason: 'React 本身不决定最终部署平台和运行形态。',
  },
];

function App() {
  return (
    <main>
      <h1>职责分类参考答案</h1>
      <ul>
        {capabilities.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>：{item.owner} —— {item.reason}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
