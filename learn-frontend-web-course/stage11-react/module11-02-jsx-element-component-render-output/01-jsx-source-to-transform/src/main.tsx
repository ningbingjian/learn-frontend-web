import { createRoot } from 'react-dom/client';
import './styles.css';

const environment = 'staging';
const releaseTitle = '生产发布窗口';
const checks = ['变更单已审批', '回滚方案已确认', '监控面板已打开'];

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-001 · JSX Source → Transform</p>
        <h1>JSX 不是 HTML，它是 JavaScript 源码中的语法扩展</h1>
        <p className="lead">
          浏览器不会直接执行这段 TSX。构建工具会先把 JSX 转换为创建 React
          Element 的 JavaScript 调用，然后 React 才能继续处理这些描述。
        </p>
      </header>

      <section className="grid" aria-label="JSX 转换观察">
        <article className="card">
          <span className="label">JSX Source</span>
          <h2>{releaseTitle}</h2>
          <p>环境：{environment}</p>
          <ul>
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <span className="label">Mental Model</span>
          <pre>{`TSX source
↓ TypeScript / Vite transform
react/jsx-runtime calls
↓
React Element descriptions
↓
React render work
↓
DOM commit`}</pre>
        </article>

        <article className="card card--wide">
          <span className="label">Important Boundary</span>
          <div className="stack">
            <div className="output-row">JSX 写在 JavaScript / TypeScript 表达式位置。</div>
            <div className="output-row">JSX 的花括号重新进入 JavaScript 表达式。</div>
            <div className="output-row">JSX 转换发生在浏览器执行最终模块之前。</div>
            <div className="output-row">React 19 课程使用 automatic JSX runtime，不要求每个文件显式 import React。</div>
          </div>
        </article>
      </section>

      <p className="note">
        在当前 Lesson 目录执行 npm run inspect:jsx，可以直接观察 TypeScript
        使用 react-jsx 模式生成的 JavaScript。具体辅助函数名称可能随编译器实现变化，
        但“JSX 先转换，再由 React 处理 Element 描述”的模型不变。
      </p>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
