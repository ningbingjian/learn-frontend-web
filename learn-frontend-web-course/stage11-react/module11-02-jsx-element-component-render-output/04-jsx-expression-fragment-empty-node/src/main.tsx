import { createRoot } from 'react-dom/client';
import './styles.css';

const environment = 'staging';
const completed = 3;
const total = 5;
const remaining = total - completed;
const serviceOnline = true;
const hasRisk = remaining > 0;
const queuedWarnings = 0;

function formatProgress(done: number, all: number) {
  return `${Math.round((done / all) * 100)}%`;
}

function ReleaseFacts() {
  return (
    <>
      <dt>环境</dt>
      <dd>{environment}</dd>
      <dt>审批进度</dt>
      <dd>
        {completed} / {total}
      </dd>
    </>
  );
}

function EmptyNodeExamples() {
  return (
    <section className="card">
      <h2>Empty Node</h2>
      <p>
        null：<span className="output">{null}</span>
      </p>
      <p>
        false：<span className="output">{false}</span>
      </p>
      <p>
        undefined：<span className="output">{undefined}</span>
      </p>
      <p>
        String(false)：<span className="output">{String(false)}</span>
      </p>
    </section>
  );
}

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-004 · JSX Expression</p>
        <h1>JavaScript 值怎样进入 Render Output</h1>
        <p>
          JSX 大括号接收 Expression 的结果；不同 JavaScript 值进入 React Render Output 后，会产生不同可见结果。
        </p>
      </header>

      <section className="grid">
        <section className="card">
          <h2>Expression</h2>
          <p>环境：{environment}</p>
          <p>完成：{completed + 0}</p>
          <p>剩余：{remaining}</p>
          <p>进度：{formatProgress(completed, total)}</p>
        </section>

        <section className="card">
          <h2>Conditional</h2>
          <p>
            服务：{' '}
            {serviceOnline ? (
              <strong className="status status--ok">在线</strong>
            ) : (
              <strong className="status status--danger">离线</strong>
            )}
          </p>
          {hasRisk && <p className="warning">仍有 {remaining} 项审批未完成。</p>}
          <p className="pitfall">
            错误写法结果：{queuedWarnings && <strong>有告警</strong>}
          </p>
          <p>
            修正后：{queuedWarnings > 0 && <strong>有告警</strong>}
          </p>
        </section>

        <section className="card">
          <h2>Fragment</h2>
          <dl className="facts">
            <ReleaseFacts />
          </dl>
          <p className="hint">打开 Elements：dt / dd 之间没有额外 wrapper。</p>
        </section>

        <EmptyNodeExamples />
      </section>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('缺少 #root 容器。');
}

createRoot(container).render(<App />);
