import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const MAX_APPROVALS = 5;

function App() {
  const [approvedCount, setApprovedCount] = useState(2);
  const [serviceOnline, setServiceOnline] = useState(true);

  const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
  const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);
  const ready = serviceOnline && remaining === 0;

  const summary = serviceOnline
    ? remaining === 0
      ? '全部审批完成，可以开始发布。'
      : `服务在线，仍有 ${remaining} 项审批未完成。`
    : `服务离线，当前还有 ${remaining} 项审批未完成。`;

  function approveNext() {
    setApprovedCount((current) => Math.min(current + 1, MAX_APPROVALS));
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1101-003 · State declares UI</p>
        <h1>声明式发布控制台</h1>
        <p className="lead">
          事件只表达状态变化；计数、剩余项、进度、摘要和按钮状态都由当前 Render
          看到的同一份 State 计算。
        </p>
      </header>

      <section className="console" data-online={serviceOnline}>
        <div className="console__heading">
          <div>
            <p className="section-label">Release Readiness</p>
            <h2>发布准备度</h2>
          </div>
          <span className="status">{serviceOnline ? '服务在线' : '服务离线'}</span>
        </div>

        <div className="metrics">
          <section className="metric">
            <span>已完成审批</span>
            <strong>{approvedCount}</strong>
            <small>/ {MAX_APPROVALS}</small>
          </section>
          <section className="metric">
            <span>剩余审批</span>
            <strong>{remaining}</strong>
            <small>项</small>
          </section>
        </div>

        <div className="progress-block">
          <div className="progress-labels">
            <span>整体进度</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="发布准备度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="summary" aria-live="polite">
          {summary}
        </p>

        <div className="actions">
          <button
            type="button"
            onClick={approveNext}
            disabled={approvedCount >= MAX_APPROVALS}
          >
            通过下一项审批
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => setServiceOnline((online) => !online)}
          >
            切换服务状态
          </button>
        </div>

        <button type="button" className="release" disabled={!ready}>
          {ready ? '开始发布' : '尚未满足发布条件'}
        </button>
      </section>

      <aside className="mental-model">
        <strong>唯一可信来源：</strong>
        <span>approvedCount + serviceOnline → 所有派生 UI</span>
      </aside>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
