import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const MAX_APPROVALS = 5;

function DuplicateStateLab() {
  const [approvedCount, setApprovedCount] = useState(2);
  const [remaining, setRemaining] = useState(3);
  const [progress, setProgress] = useState(40);
  const [diagnostic, setDiagnostic] = useState('尚未检查。');

  function approveWithBug() {
    const nextCount = Math.min(approvedCount + 1, MAX_APPROVALS);

    setApprovedCount(nextCount);
    setProgress(Math.round((nextCount / MAX_APPROVALS) * 100));

    // 故意遗漏 setRemaining，用于复现重复 State 漂移。
  }

  function checkConsistency() {
    const expectedRemaining = MAX_APPROVALS - approvedCount;
    const expectedProgress = Math.round((approvedCount / MAX_APPROVALS) * 100);
    const problems: string[] = [];

    if (remaining !== expectedRemaining) {
      problems.push(`remaining 应为 ${expectedRemaining}，实际为 ${remaining}`);
    }

    if (progress !== expectedProgress) {
      problems.push(`progress 应为 ${expectedProgress}，实际为 ${progress}`);
    }

    setDiagnostic(
      problems.length === 0
        ? '检查通过：重复 State 暂时一致。'
        : `发现 ${problems.length} 个漂移：${problems.join('；')}`,
    );
  }

  function repairDuplicateState() {
    setRemaining(MAX_APPROVALS - approvedCount);
    setProgress(Math.round((approvedCount / MAX_APPROVALS) * 100));
    setDiagnostic('已经根据 approvedCount 重新同步重复 State。');
  }

  return (
    <section className="lab-card lab-card--danger" aria-labelledby="duplicate-title">
      <p className="section-label">Failure A · Duplicate State</p>
      <h2 id="duplicate-title">同一事实保存了三份</h2>
      <div className="metrics">
        <span>approvedCount：{approvedCount}</span>
        <span>remaining State：{remaining}</span>
        <span>progress State：{progress}%</span>
      </div>
      <p>
        点击一次“带漏洞审批”，再执行检查。审批数量和进度会变化，但 remaining
        会保留旧值。
      </p>
      <div className="actions">
        <button type="button" onClick={approveWithBug}>
          带漏洞审批
        </button>
        <button type="button" className="secondary" onClick={checkConsistency}>
          检查重复 State
        </button>
        <button type="button" className="secondary" onClick={repairDuplicateState}>
          临时重新同步
        </button>
      </div>
      <p className="diagnostic" aria-live="polite">
        {diagnostic}
      </p>
    </section>
  );
}

function DerivedStateReference() {
  const [approvedCount, setApprovedCount] = useState(2);
  const remaining = MAX_APPROVALS - approvedCount;
  const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);

  return (
    <section className="lab-card lab-card--success" aria-labelledby="derived-title">
      <p className="section-label">Reference · Derived Values</p>
      <h2 id="derived-title">只保存最小源状态</h2>
      <div className="metrics">
        <span>approvedCount：{approvedCount}</span>
        <span>remaining（计算）：{remaining}</span>
        <span>progress（计算）：{progress}%</span>
      </div>
      <button
        type="button"
        onClick={() =>
          setApprovedCount((count) => Math.min(count + 1, MAX_APPROVALS))
        }
        disabled={approvedCount >= MAX_APPROVALS}
      >
        正确审批
      </button>
    </section>
  );
}

function DomEscapeLab() {
  const [serviceOnline, setServiceOnline] = useState(true);
  const [unrelatedRenderCount, setUnrelatedRenderCount] = useState(0);
  const [diagnostic, setDiagnostic] = useState('尚未越权修改。');

  const expectedLabel = serviceOnline ? 'React 认为服务在线' : 'React 认为服务离线';

  function mutateManagedDom() {
    const label = document.querySelector('[data-role="react-owned-label"]');

    if (!(label instanceof HTMLElement)) {
      throw new Error('找不到 React 管理的状态标签。');
    }

    label.textContent = '外部代码已越权篡改这段 DOM';
    setDiagnostic('DOM 已被直接改写。现在点击“无关 Render”，观察它是否自动修复。');
  }

  function checkManagedDom() {
    const label = document.querySelector('[data-role="react-owned-label"]');
    const actual = label?.textContent?.trim() ?? '(missing)';

    setDiagnostic(
      actual === expectedLabel
        ? '检查通过：DOM 与当前 React 输出一致。'
        : `所有权冲突：React 期望“${expectedLabel}”，DOM 实际为“${actual}”。`,
    );
  }

  return (
    <section className="lab-card lab-card--danger" aria-labelledby="dom-title">
      <p className="section-label">Failure B · DOM Ownership Escape</p>
      <h2 id="dom-title">外部代码直接修改 React 管理的 DOM</h2>

      <p className="owned-label" data-role="react-owned-label">
        {expectedLabel}
      </p>
      <p>无关 Render 次数：{unrelatedRenderCount}</p>

      <div className="actions">
        <button type="button" onClick={mutateManagedDom}>
          越权修改 DOM
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setUnrelatedRenderCount((count) => count + 1)}
        >
          触发无关 Render
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setServiceOnline((online) => !online)}
        >
          改变真实状态
        </button>
        <button type="button" className="secondary" onClick={checkManagedDom}>
          检查 DOM 所有权
        </button>
      </div>

      <p className="diagnostic" aria-live="polite">
        {diagnostic}
      </p>
    </section>
  );
}

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1101-007 · Failure Lab</p>
        <h1>页面能动，不代表状态模型正确</h1>
        <p className="lead">
          本课主动制造两类故障：重复保存派生状态，以及绕过 React
          直接修改它拥有的 DOM。
        </p>
      </header>

      <section className="grid" aria-label="重复状态对照">
        <DuplicateStateLab />
        <DerivedStateReference />
      </section>

      <DomEscapeLab />

      <aside className="lesson-note">
        <strong>正确边界：</strong>
        保存最小源状态；派生值在 Render 中计算；React Root 内 DOM
        由 React 管理，命令式集成必须走明确的 Escape Hatch。
      </aside>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
