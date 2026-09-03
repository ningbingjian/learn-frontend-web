import { useState } from 'react';

const MAX_APPROVALS = 5;

function createSummary(approvedCount: number, serviceOnline: boolean) {
  const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);

  if (!serviceOnline) {
    return `服务离线，当前还有 ${remaining} 项审批未完成。`;
  }

  if (remaining === 0) {
    return '服务在线且全部审批完成，可以开始发布。';
  }

  return `服务在线，仍有 ${remaining} 项审批未完成。`;
}

export function App() {
  const [approvedCount, setApprovedCount] = useState(2);
  const [serviceOnline, setServiceOnline] = useState(true);

  const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
  const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);
  const ready = serviceOnline && remaining === 0;
  const summary = createSummary(approvedCount, serviceOnline);

  function approveNext() {
    setApprovedCount((currentCount) =>
      Math.min(currentCount + 1, MAX_APPROVALS),
    );
  }

  function toggleService() {
    setServiceOnline((currentOnline) => !currentOnline);
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Architect Workbench · Release Readiness</p>
          <h1>一份状态，声明整个发布面板。</h1>
        </div>
        <span className="react-badge">React State</span>
      </header>

      <section className="console-card" data-online={serviceOnline}>
        <div className="console-card__heading">
          <div>
            <p className="section-label">Production Release</p>
            <h2>广告投放服务 v2.8.0</h2>
          </div>
          <span className="service-status" aria-label={`服务当前${serviceOnline ? '在线' : '离线'}`}>
            <span className="service-status__dot" aria-hidden="true" />
            {serviceOnline ? '服务在线' : '服务离线'}
          </span>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span>已完成审批</span>
            <strong>{approvedCount}</strong>
            <small>总计 {MAX_APPROVALS} 项</small>
          </article>
          <article className="metric-card">
            <span>剩余审批</span>
            <strong>{remaining}</strong>
            <small>由审批数量直接计算</small>
          </article>
          <article className="metric-card">
            <span>发布准备度</span>
            <strong>{progress}%</strong>
            <small>由当前进度直接计算</small>
          </article>
        </div>

        <section className="progress-section" aria-label={`发布准备度 ${progress}%`}>
          <div className="progress-section__labels">
            <span>Readiness</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <p className="summary" aria-live="polite">
          {summary}
        </p>

        <div className="action-grid">
          <button
            type="button"
            onClick={approveNext}
            disabled={approvedCount >= MAX_APPROVALS}
          >
            {approvedCount >= MAX_APPROVALS ? '审批已全部完成' : '通过下一项审批'}
          </button>
          <button type="button" className="button--secondary" onClick={toggleService}>
            {serviceOnline ? '模拟服务离线' : '恢复服务在线'}
          </button>
        </div>

        <button type="button" className="release-button" disabled={!ready}>
          {ready ? '开始生产发布' : '暂不可发布'}
        </button>
      </section>

      <aside className="state-model">
        <div>
          <p>Source State</p>
          <code>approvedCount + serviceOnline</code>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <p>Derived View</p>
          <code>remaining + progress + ready + summary</code>
        </div>
      </aside>
    </main>
  );
}
