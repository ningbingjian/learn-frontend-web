import { createElement, isValidElement, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface BadgeProps {
  level: 'low' | 'medium' | 'high';
}

function RiskBadge({ level }: BadgeProps) {
  return <span className="badge">风险：{level}</span>;
}

const hostElement = (
  <section className="card" data-environment="staging">
    <h2>Host Element Description</h2>
    <p>这个 JSX tag 的 type 是字符串 section。</p>
  </section>
);

const componentElement = <RiskBadge level="medium" />;

const createElementVersion = createElement(
  'section',
  { className: 'card', 'data-source': 'createElement' },
  createElement('h2', null, 'createElement Version'),
  createElement('p', null, '它同样产生 React Element。'),
);

function typeLabel(element: ReactElement) {
  if (typeof element.type === 'string') {
    return `Host type: "${element.type}"`;
  }

  if (typeof element.type === 'function') {
    return `Component type: ${(element.type as Function).name || '(anonymous)'}`;
  }

  return `Special React type: ${String(element.type)}`;
}

function ElementFacts({
  title,
  element,
}: {
  title: string;
  element: ReactElement;
}) {
  const propKeys = Object.keys(element.props as Record<string, unknown>);

  return (
    <article className="card">
      <span className="label">{title}</span>
      <ul className="metric-list">
        <li><span>isValidElement</span><strong>{String(isValidElement(element))}</strong></li>
        <li><span>type</span><strong>{typeLabel(element)}</strong></li>
        <li><span>key</span><strong>{element.key ?? 'null'}</strong></li>
        <li><span>props keys</span><strong>{propKeys.join(', ') || '(none)'}</strong></li>
        <li><span>element frozen (dev)</span><strong>{String(Object.isFrozen(element))}</strong></li>
        <li><span>props frozen (dev)</span><strong>{String(Object.isFrozen(element.props))}</strong></li>
      </ul>
    </article>
  );
}

function App() {
  const nodeSamples = [
    ['React Element', isValidElement(<strong>hello</strong>)],
    ['number 42', isValidElement(42)],
    ['string', isValidElement('hello')],
    ['array', isValidElement([<span key="a">A</span>, <span key="b">B</span>])],
    ['null', isValidElement(null)],
  ] as const;

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-002 · React Element</p>
        <h1>React Element 是 UI 描述对象，不是浏览器 DOM Element</h1>
        <p className="lead">
          JSX tag 会产生 React Element。Element 可以描述一个 Host tag，也可以描述一个
          Component type；React 之后才根据这份描述继续工作。
        </p>
      </header>

      <section className="grid">
        <ElementFacts title="Host JSX Element" element={hostElement} />
        <ElementFacts title="Component JSX Element" element={componentElement} />
        <ElementFacts title="createElement Result" element={createElementVersion} />

        <article className="card">
          <span className="label">React Node ≠ React Element</span>
          <ul className="metric-list">
            {nodeSamples.map(([name, valid]) => (
              <li key={name}><span>{name}</span><strong>isValidElement = {String(valid)}</strong></li>
            ))}
          </ul>
        </article>

        <article className="card card--wide">
          <span className="label">Actual Rendered Values</span>
          <div className="grid">
            {hostElement}
            {createElementVersion}
            <section className="card">
              <h2>Component Element</h2>
              {componentElement}
            </section>
          </div>
        </article>
      </section>

      <p className="note">
        React Element 可以在 JavaScript 中被读取和传递，但业务代码应把它视为创建后不可变的描述。
        Development build 可能浅冻结 Element 与 props 来帮助暴露错误修改；不要依赖冻结作为业务安全机制。
      </p>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
