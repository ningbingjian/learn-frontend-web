import { createRoot } from 'react-dom/client';

const capabilities = [
  { name: '组件组合', owner: '', reason: '' },
  { name: '本地状态', owner: '', reason: '' },
  { name: 'URL 路由', owner: '', reason: '' },
  { name: 'SSR / SSG 集成', owner: '', reason: '' },
  { name: '开发服务器与构建', owner: '', reason: '' },
  { name: '部署约定', owner: '', reason: '' },
];

function App() {
  return (
    <main>
      <h1>职责分类练习</h1>
      <ul>
        {capabilities.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>：{item.owner || 'TODO'}
            {item.reason ? ` —— ${item.reason}` : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
