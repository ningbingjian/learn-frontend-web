import { createRoot } from 'react-dom/client';

const capabilities = [
  {
    name: '组件组合与本地状态',
    owner: 'React Core',
    reason: 'React 自身直接提供组件、State、Hooks 等 UI 编程模型。',
  },
  {
    name: 'URL 路由',
    owner: 'Framework / Ecosystem',
    reason: 'React Core 不规定 URL 如何映射到完整页面和数据加载流程。',
  },
  {
    name: 'SSR / SSG / RSC 集成',
    owner: 'Framework',
    reason: '这些能力需要 React API 与路由、构建、服务端运行时等共同集成。',
  },
  {
    name: '开发服务器与生产构建',
    owner: 'Toolchain',
    reason: '当前课程由 Vite 提供开发服务器和构建能力，这不是 React Core API。',
  },
  {
    name: '部署约定',
    owner: 'Framework / Platform',
    reason: 'React 本身不决定应用部署到 Node、容器、CDN 还是其他平台。',
  },
];

function App() {
  return (
    <main>
      <p>React Core / Framework / Toolchain</p>
      <h1>React 是 UI Library，不是完整应用 Framework</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>能力</th>
            <th>主要责任层</th>
            <th>原因</th>
          </tr>
        </thead>
        <tbody>
          {capabilities.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.owner}</td>
              <td>{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        当前页面由 React 渲染、Vite 启动，但它没有因此自动获得完整路由、SSR 或部署架构。
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
