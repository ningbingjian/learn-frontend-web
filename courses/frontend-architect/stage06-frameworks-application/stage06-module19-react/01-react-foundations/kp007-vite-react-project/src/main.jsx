import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">RE-KP007</p>
        <h1>Vite + React 最小工程已运行</h1>
        <p className="lead">
          这个页面证明了 index.html、React 入口、Vite React 插件和共享工具链已经连通。
        </p>

        <ul className="file-list">
          <li><code>index.html</code>：页面与模块入口</li>
          <li><code>src/main.jsx</code>：React 入口</li>
          <li><code>vite.config.js</code>：React 插件配置</li>
          <li><code>package.json</code>：dev / build / preview</li>
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
