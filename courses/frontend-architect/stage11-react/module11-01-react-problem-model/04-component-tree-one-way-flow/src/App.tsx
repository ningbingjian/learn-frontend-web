import { useState } from 'react';

const MAX_APPROVALS = 5;

interface ReleaseHeaderProps {
  ready: boolean;
}

function ReleaseHeader({ ready }: ReleaseHeaderProps) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">RE-1101-004 · Component Tree</p>
        <h1>组件树中的状态应该住在哪里？</h1>
        <p className="lead">
          状态由共同父组件持有，数据通过 Props 向下流动，用户意图通过回调返回状态所有者。
        </p>
      </div>
      <span className={ready ? 'hero-status hero-status--ready' : 'hero-status'}>
        {ready ? '可以发布' : '尚未就绪'}
      </span>
    </header>
  );
}

interface ApprovalPanelProps {
  approvedCount: number;
  remaining: number;
  onApprove: () => void;
  onReset: () => void;
}

function ApprovalPanel({
  approvedCount,
  remaining,
  onApprove,
  onReset,
}: ApprovalPanelProps) {
  return (
    <section className="panel" aria-labelledby="approval-title">
      <p className="section-label">Child Component A</p>
      <h2 id="approval-title">审批进度</h2>
      <div className="metric-row">
        <strong>{approvedCount}</strong>
        <span>/ {MAX_APPROVALS} 已完成</span>
      </div>
      <p>还剩 {remaining} 项审批。</p>
      <div className="actions">
        <button
          type="button"
          onClick={onApprove}
          disabled={approvedCount >= MAX_APPROVALS}
        >
          通过下一项
        </button>
        <button type="button" className="secondary" onClick={onReset}>
          重置审批
        </button>
      </div>
    </section>
  );
}

interface ServicePanelProps {
  online: boolean;
  onToggle: () => void;
}

function ServicePanel({ online, onToggle }: ServicePanelProps) {
  return (
    <section className="panel" aria-labelledby="service-title">
      <p className="section-label">Child Component B</p>
      <h2 id="service-title">发布服务</h2>
      <p className={online ? 'service-state service-state--online' : 'service-state'}>
        {online ? '服务在线' : '服务离线'}
      </p>
      <button type="button" className="secondary" onClick={onToggle}>
        切换服务状态
      </button>
    </section>
  );
}

interface ReleaseSummaryProps {
  approvedCount: number;
  serviceOnline: boolean;
  ready: boolean;
  lastAction: string;
}

function ReleaseSummary({
  approvedCount,
  serviceOnline,
  ready,
  lastAction,
}: ReleaseSummaryProps) {
  const summary = ready
    ? '审批已经完成且服务在线，可以开始发布。'
    : `当前完成 ${approvedCount} 项审批，服务${serviceOnline ? '在线' : '离线'}。`;

  return (
    <section className="summary-card" aria-labelledby="summary-title">
      <p className="section-label">Child Component C</p>
      <h2 id="summary-title">统一决策摘要</h2>
      <p aria-live="polite">{summary}</p>
      <p className="last-action">最近操作：{lastAction}</p>
      <button type="button" className="release" disabled={!ready}>
        {ready ? '开始发布' : '发布条件未满足'}
      </button>
    </section>
  );
}

function ComponentTreeMap() {
  return (
    <aside className="tree-map" aria-label="组件树与数据流示意">
      <h2>当前组件树</h2>
      <pre>{`App（State Owner）
├── ReleaseHeader        ← ready
├── ApprovalPanel        ← approvedCount / remaining / callbacks
├── ServicePanel         ← serviceOnline / callback
├── ReleaseSummary       ← current snapshot
└── ComponentTreeMap

用户操作 ↑ callback intent
状态更新发生在 App
新数据   ↓ props`}</pre>
    </aside>
  );
}

export function App() {
  const [approvedCount, setApprovedCount] = useState(2);
  const [serviceOnline, setServiceOnline] = useState(true);
  const [lastAction, setLastAction] = useState('载入初始状态');

  const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
  const ready = serviceOnline && remaining === 0;

  function approveNext() {
    setApprovedCount((current) => Math.min(current + 1, MAX_APPROVALS));
    setLastAction('ApprovalPanel 请求通过下一项审批');
  }

  function resetApprovals() {
    setApprovedCount(0);
    setLastAction('ApprovalPanel 请求重置审批');
  }

  function toggleService() {
    setServiceOnline((online) => !online);
    setLastAction('ServicePanel 请求切换服务状态');
  }

  return (
    <main className="page-shell">
      <ReleaseHeader ready={ready} />

      <section className="workspace" aria-label="发布控制台">
        <ApprovalPanel
          approvedCount={approvedCount}
          remaining={remaining}
          onApprove={approveNext}
          onReset={resetApprovals}
        />
        <ServicePanel online={serviceOnline} onToggle={toggleService} />
      </section>

      <ReleaseSummary
        approvedCount={approvedCount}
        serviceOnline={serviceOnline}
        ready={ready}
        lastAction={lastAction}
      />

      <ComponentTreeMap />
    </main>
  );
}
