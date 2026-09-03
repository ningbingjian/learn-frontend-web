import { isValidElement } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface ReleaseCardProps {
  title: string;
  status: 'ready' | 'blocked';
}

let releaseCardCallCount = 0;

function ReleaseCard({ title, status }: ReleaseCardProps) {
  releaseCardCallCount += 1;
  console.log(`[Component Call] ReleaseCard #${releaseCardCallCount}`, { title, status });

  return (
    <article className="card">
      <span className="label">ReleaseCard Render Output</span>
      <h2>{title}</h2>
      <p>当前状态：<strong>{status === 'ready' ? '可以发布' : '阻塞中'}</strong></p>
    </article>
  );
}

function TextOutput() {
  console.log('[Component Call] TextOutput');
  return '组件可以返回字符串 React Node';
}

function NumberOutput() {
  console.log('[Component Call] NumberOutput');
  return 42;
}

function EmptyOutput() {
  console.log('[Component Call] EmptyOutput');
  return null;
}

function ArrayOutput() {
  console.log('[Component Call] ArrayOutput');
  return [
    <span className="badge" key="first">A</span>,
    ' + ',
    <span className="badge" key="second">B</span>,
  ];
}

const describedCard = <ReleaseCard title="支付服务发布" status="blocked" />;

console.log('[Element Creation] describedCard created');
console.log('[Element Creation] isValidElement =', isValidElement(describedCard));
console.log('[Element Creation] ReleaseCard calls before root.render =', releaseCardCallCount);

function App() {
  console.log('[Component Call] App');

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-003 · Component Invocation</p>
        <h1>创建 Component Element，不等于手工调用 Component Function</h1>
        <p className="lead">
          模块加载时先创建 describedCard。此时 ReleaseCard 尚未执行。React
          在处理这个 Element 的 type 时，才会在 Render 工作中调用组件并继续读取它返回的结果。
        </p>
      </header>

      <section className="grid">
        {describedCard}

        <article className="card">
          <span className="label">Timeline</span>
          <pre>{`module evaluation
→ create <ReleaseCard />
→ React Element exists
→ root.render(<App />)
→ React calls App
→ React reaches describedCard
→ React calls ReleaseCard
→ gets host render output
→ later commit DOM`}</pre>
        </article>

        <article className="card card--wide">
          <span className="label">Valid Render Output Samples</span>
          <div className="stack">
            <div className="output-row"><strong>String：</strong> <TextOutput /></div>
            <div className="output-row"><strong>Number：</strong> <NumberOutput /></div>
            <div className="output-row"><strong>Array：</strong> <ArrayOutput /></div>
            <div className="output-row"><strong>Null：</strong> EmptyOutput 返回 null，因此这里没有可见子内容：<EmptyOutput /></div>
          </div>
        </article>
      </section>

      <p className="note">
        Console 中先出现 Element Creation 日志，且调用次数为 0；进入 React Render
        后才出现 App / ReleaseCard 等 Component Call 日志。开发环境与 Strict Mode
        可能额外调用组件，因此不要把调用次数等同于 DOM Commit 次数。
      </p>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
