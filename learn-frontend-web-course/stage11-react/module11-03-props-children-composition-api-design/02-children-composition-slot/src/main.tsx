import { Children, StrictMode, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface CompositionPanelProps {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}

function CompositionPanel({
  title,
  description,
  children,
}: CompositionPanelProps) {
  const countedNodes = Children.count(children);
  const flattenedVisibleNodes = Children.toArray(children).length;

  return (
    <article className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">children slot</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <dl className="child-metrics">
          <div>
            <dt>Children.count</dt>
            <dd>{countedNodes}</dd>
          </div>
          <div>
            <dt>toArray length</dt>
            <dd>{flattenedVisibleNodes}</dd>
          </div>
          <div>
            <dt>Array.isArray</dt>
            <dd>{String(Array.isArray(children))}</dd>
          </div>
        </dl>
      </header>

      <div className="panel__body">{children}</div>
    </article>
  );
}

function ReleaseFacts() {
  return (
    <dl className="facts">
      <div>
        <dt>发布单</dt>
        <dd>REL-2026-0903</dd>
      </div>
      <div>
        <dt>版本</dt>
        <dd>v3.8.0</dd>
      </div>
    </dl>
  );
}

function MoreChecks() {
  return (
    <>
      <li>容量基线已确认</li>
      <li>回滚包已上传</li>
    </>
  );
}

function App() {
  const [showOptionalNote, setShowOptionalNote] = useState(false);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1103-002 · Children Composition</p>
        <h1>children 是父组件填入的组合槽，不应被假设成普通数组</h1>
        <p>
          包装组件负责布局和语义，父组件负责决定槽里放什么。children 可以是文本、数字、Element、Fragment、数组或 Empty Node。
        </p>
      </header>

      <div className="toolbar">
        <label>
          <input
            type="checkbox"
            checked={showOptionalNote}
            onChange={(event) => {
              setShowOptionalNote(event.target.checked);
            }}
          />
          显示可选说明
        </label>
      </div>

      <section className="panel-stack" aria-label="children composition examples">
        <CompositionPanel
          title="单个 Component Element"
          description="children 不需要是数组；一个组件 Element 也可以直接填入槽位。"
        >
          <ReleaseFacts />
        </CompositionPanel>

        <CompositionPanel
          title="混合 React Node"
          description="字符串、数字、Element 与 Empty Node 可以共同成为 Render Output。"
        >
          发布风险数：{0}
          {showOptionalNote ? (
            <p className="optional-note">这是由父组件决定是否出现的说明。</p>
          ) : null}
          {false}
          {undefined}
        </CompositionPanel>

        <CompositionPanel
          title="Fragment 与内部组件输出"
          description="Children API 看到的是传入的描述，不会穿透 MoreChecks 去读取其最终返回的两个 li。"
        >
          <>
            <ul className="check-list">
              <li>审批人已确认</li>
              <MoreChecks />
            </ul>
            <p className="hint">
              React DevTools 可以看到 MoreChecks 组件边界；Children.count 不会把它的返回结果提前展开。
            </p>
          </>
        </CompositionPanel>
      </section>

      <section className="evidence-grid">
        <article>
          <p className="eyebrow">Lowercase children</p>
          <h2>children prop 值得鼓励</h2>
          <p>它让视觉包装器把内容决定权留给调用方。</p>
        </article>
        <article>
          <p className="eyebrow">Capital Children</p>
          <h2>Children API 要谨慎</h2>
          <p>只在确实需要计数、遍历或转换 opaque children 时使用。</p>
        </article>
        <article>
          <p className="eyebrow">Opaque structure</p>
          <h2>不要直接依赖数组形态</h2>
          <p>单个 child、多个 child 与 Fragment 的内部表示不是组件公共契约。</p>
        </article>
      </section>

      <aside className="note">
        观察每个面板的三个指标。它们描述的是 children 数据结构，不等价于最终 DOM 节点数，也不等价于业务项目数量。
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
