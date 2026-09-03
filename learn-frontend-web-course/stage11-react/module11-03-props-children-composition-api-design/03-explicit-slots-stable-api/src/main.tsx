import { StrictMode, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface ReviewShellProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly summary?: ReactNode;
  readonly children: ReactNode;
  readonly actions: ReactNode;
  readonly aside?: ReactNode;
  readonly footer?: ReactNode;
}

function ReviewShell({
  eyebrow = 'Release review',
  title,
  summary,
  children,
  actions,
  aside,
  footer,
}: ReviewShellProps) {
  return (
    <article className="review-shell">
      <header className="review-shell__header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {summary ? <div className="summary-slot">{summary}</div> : null}
        </div>
        <div className="actions-slot" aria-label="Review actions">
          {actions}
        </div>
      </header>

      <div className="review-shell__layout">
        <section className="body-slot">{children}</section>
        {aside ? <aside className="aside-slot">{aside}</aside> : null}
      </div>

      {footer ? <footer className="footer-slot">{footer}</footer> : null}
    </article>
  );
}

function ApprovalChecklist() {
  return (
    <ul className="check-list">
      <li>业务审批完成</li>
      <li>容量基线完成</li>
      <li>回滚演练完成</li>
    </ul>
  );
}

function RiskSummary() {
  return (
    <dl className="risk-summary">
      <div>
        <dt>未关闭风险</dt>
        <dd>1</dd>
      </div>
      <div>
        <dt>发布窗口</dt>
        <dd>22:30</dd>
      </div>
    </dl>
  );
}

function App() {
  const [decision, setDecision] = useState<'pending' | 'approved' | 'blocked'>(
    'pending',
  );

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1103-003 · Explicit Slots</p>
        <h1>一个 children 不够表达布局语义时，使用显式命名槽</h1>
        <p>
          Shell 组件负责稳定布局，调用方把 summary、actions、aside、footer 和主要 children 作为 ReactNode 填入对应区域。
        </p>
      </header>

      <section className="stack" aria-label="explicit slot examples">
        <ReviewShell
          eyebrow="Production gate"
          title="REL-2026-0903 · v3.8.0"
          summary={
            <p>
              当前决定：<strong>{decision}</strong>
            </p>
          }
          actions={
            <>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => {
                  setDecision('blocked');
                }}
              >
                阻断
              </button>
              <button
                type="button"
                className="button"
                onClick={() => {
                  setDecision('approved');
                }}
              >
                通过
              </button>
            </>
          }
          aside={<RiskSummary />}
          footer={
            <p>
              布局组件不知道按钮如何工作，也不知道 RiskSummary 内部结构；它只负责安放调用方提供的内容。
            </p>
          }
        >
          <ApprovalChecklist />
        </ReviewShell>

        <ReviewShell
          title="轻量只读审查"
          summary={<p>同一个 Shell API 可以省略 aside 与 footer。</p>}
          actions={<a href="#details">查看详情</a>}
        >
          <p id="details">
            主内容仍通过 children 提供；可选命名槽没有内容时，对应 Host 区域不会被创建。
          </p>
        </ReviewShell>
      </section>

      <section className="comparison">
        <article className="comparison__bad">
          <p className="eyebrow">Boolean explosion</p>
          <h2>不要把内容需求都变成开关</h2>
          <pre>
{`<ReviewShell
  showSummary
  showActions
  showAside
  showFooter
  compactActions
/>`}
          </pre>
          <p>布尔组合越多，调用方越难知道哪些组合有效、内容从哪里来。</p>
        </article>

        <article className="comparison__good">
          <p className="eyebrow">Explicit content contract</p>
          <h2>让调用方直接提供内容</h2>
          <pre>
{`<ReviewShell
  summary={<Summary />}
  actions={<Actions />}
  aside={<RiskPanel />}
>
  <Checklist />
</ReviewShell>`}
          </pre>
          <p>API 描述业务区域，而不是暴露大量内部布局开关。</p>
        </article>
      </section>

      <aside className="note">
        在 React DevTools 中选择 ReviewShell：检查 summary、actions、aside、footer 与 children。再到 Elements 中确认省略槽位时没有多余空容器。
      </aside>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('缺少 #root 容器。');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
