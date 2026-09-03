import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const baselineChecks = ['Schema validated', 'Traffic budget checked'];
const sharedMutableChecks = ['Schema validated', 'Traffic budget checked'];

function buildSummary(completed: number, total: number) {
  const remaining = total - completed;
  return {
    remaining,
    ready: remaining === 0,
  };
}

function PurePreview() {
  console.log('[Render] PurePreview');
  const visibleChecks = [...baselineChecks, 'Render preview'];

  return (
    <section className="card card--good">
      <p className="eyebrow">Pure</p>
      <h2>不修改外部数据</h2>
      <p>
        baseline 长度：<strong>{baselineChecks.length}</strong>
      </p>
      <p>
        当前派生视图长度：<strong>{visibleChecks.length}</strong>
      </p>
    </section>
  );
}

function ImpurePreview() {
  console.log('[Render] ImpurePreview BEFORE', sharedMutableChecks.length);
  sharedMutableChecks.push(`Render write ${sharedMutableChecks.length + 1}`);
  console.log('[Render] ImpurePreview AFTER', sharedMutableChecks.length);

  return (
    <section className="card card--bad">
      <p className="eyebrow">Impure Failure</p>
      <h2>Render 中修改模块级数组</h2>
      <p>
        sharedMutableChecks 长度：<strong>{sharedMutableChecks.length}</strong>
      </p>
      <p className="warning">每一次组件执行都会继续污染同一数组。</p>
    </section>
  );
}

function App() {
  const [renderTick, setRenderTick] = useState(0);
  console.log(`[Render] App tick=${renderTick}`);

  const first = buildSummary(3, 5);
  const second = buildSummary(3, 5);
  const deterministic = JSON.stringify(first) === JSON.stringify(second);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-005 · Pure Render</p>
        <h1>Render 可以重算，外部世界不应该被偷偷污染</h1>
        <p>
          点击按钮请求父组件再次 Render，并对比纯计算与 render-time mutation。
        </p>
        <button type="button" onClick={() => setRenderTick((value) => value + 1)}>
          请求父组件再 Render（当前 {renderTick}）
        </button>
      </header>

      <section className="evidence">
        <strong>纯函数重复调用结果一致：</strong>{' '}
        {deterministic ? '是' : '否'}
      </section>

      <section className="grid">
        <PurePreview />
        <ImpurePreview />
      </section>

      <aside className="note">
        打开 Console。开发模式 + Strict Mode 会让不纯 Render 更快暴露，但 Strict Mode 不是问题根源。
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
