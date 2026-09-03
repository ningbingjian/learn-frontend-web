import {
  StrictMode,
  createElement,
  isValidElement,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type ResultTone = 'idle' | 'warning' | 'success' | 'danger';

type LabResult = {
  tone: ResultTone;
  title: string;
  detail: string;
};

const initialResult: LabResult = {
  tone: 'idle',
  title: '尚未运行',
  detail: '点击按钮后记录真实运行证据。',
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function describeElementType(value: unknown) {
  if (!isValidElement(value)) {
    return 'not a React Element';
  }

  if (typeof value.type === 'string') {
    return `Host type = "${value.type}"`;
  }

  if (typeof value.type === 'function') {
    return `Component type = ${value.type.name || '(anonymous)'}`;
  }

  return `special type = ${String(value.type)}`;
}

function ReleaseBadge({ label }: { label: string }) {
  console.log(`[Render] ReleaseBadge label=${label}`);
  return <span className="release-badge">{label}</span>;
}

function HookedReleaseBadge({ label }: { label: string }) {
  const [inspectionCount] = useState(1);

  return (
    <span className="release-badge release-badge--hooked">
      {label} · hook state {inspectionCount}
    </span>
  );
}

function ResultPanel({ result }: { result: LabResult }) {
  return (
    <div className={`result result--${result.tone}`} aria-live="polite">
      <strong>{result.title}</strong>
      <p>{result.detail}</p>
    </div>
  );
}

function App() {
  const [mutationResult, setMutationResult] =
    useState<LabResult>(initialResult);
  const [plainCallResult, setPlainCallResult] =
    useState<LabResult>(initialResult);
  const [hookCallResult, setHookCallResult] =
    useState<LabResult>(initialResult);

  const wrongHostDescriptor = createElement(
    'releasebadge',
    {
      className: 'unknown-host-tag',
      'data-failure': 'lowercase-host-tag',
    },
    '这只是一个陌生 Host Element',
  );

  const properComponentDescriptor = (
    <ReleaseBadge label="正确的 Component Boundary" />
  );

  function runMutationLab() {
    const descriptor = <ReleaseBadge label="original label" />;
    const mutableView = descriptor as unknown as {
      props: { label: string };
    };
    const before = mutableView.props.label;
    const elementFrozen = Object.isFrozen(descriptor);
    const propsFrozen = Object.isFrozen(descriptor.props);

    try {
      mutableView.props.label = 'tampered label';
      const after = mutableView.props.label;

      setMutationResult({
        tone: 'warning',
        title: '当前构建没有阻止写入，但契约仍已被破坏',
        detail: `before=${before}; after=${after}; elementFrozen=${elementFrozen}; propsFrozen=${propsFrozen}。正确做法是创建新的 Element。`,
      });
    } catch (error) {
      setMutationResult({
        tone: 'success',
        title: 'Development Freeze 捕获了 Element Mutation',
        detail: `${errorMessage(error)}；elementFrozen=${elementFrozen}; propsFrozen=${propsFrozen}; label 仍为 ${mutableView.props.label}。`,
      });
    }
  }

  function runPlainManualCall() {
    const output = ReleaseBadge({ label: 'manual plain call' });

    setPlainCallResult({
      tone: 'warning',
      title: '手工调用暂时返回了 Element，但组件边界已经消失',
      detail: `${describeElementType(output)}。返回值已经是 Host Element Description；React 没有获得 ReleaseBadge Component Element。`,
    });
  }

  function runHookManualCall() {
    try {
      const output = HookedReleaseBadge({ label: 'manual hook call' });

      setHookCallResult({
        tone: 'danger',
        title: '环境没有立即抛错，但该调用仍然绕过 React',
        detail: `${describeElementType(output)}。不要依赖这一结果；组件调用权属于 React。`,
      });
    } catch (error) {
      setHookCallResult({
        tone: 'success',
        title: 'Invalid Hook Call 已被稳定捕获',
        detail: errorMessage(error),
      });
    }
  }

  function resetLab() {
    setMutationResult(initialResult);
    setPlainCallResult(initialResult);
    setHookCallResult(initialResult);
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">RE-1102-007 · Integrated Failure Lab</p>
          <h1>错误代码为什么有时看起来还能工作？</h1>
          <p className="hero-copy">
            通过 Element Type、Freeze、Invalid Hook Call、Elements 与 React
            DevTools，把 JSX、Element、Component 和 DOM 的边界重新校准。
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={resetLab}>
          重置实验结果
        </button>
      </header>

      <section className="lab-card">
        <div className="lab-heading">
          <span className="step">01</span>
          <div>
            <h2>错误标签：Host Tag 不是 Component</h2>
            <p>比较字符串 `type` 与函数 `type`。</p>
          </div>
        </div>

        <div className="comparison-grid">
          <article className="comparison-panel comparison-panel--danger">
            <p className="panel-label">错误：字符串 Host Type</p>
            <div className="preview-box">{wrongHostDescriptor}</div>
            <code>{describeElementType(wrongHostDescriptor)}</code>
          </article>

          <article className="comparison-panel comparison-panel--success">
            <p className="panel-label">正确：函数 Component Type</p>
            <div className="preview-box">{properComponentDescriptor}</div>
            <code>{describeElementType(properComponentDescriptor)}</code>
          </article>
        </div>

        <p className="evidence-note">
          在 Elements 中查找 `releasebadge`；再在 React DevTools 中查找
          `ReleaseBadge`。两种证据观察的是不同层级。
        </p>
      </section>

      <section className="lab-card">
        <div className="lab-heading">
          <span className="step">02</span>
          <div>
            <h2>Element Mutation：Description 不是可变 View Model</h2>
            <p>创建 Element 后尝试直接写入 `props.label`。</p>
          </div>
        </div>

        <button type="button" onClick={runMutationLab}>
          运行 Element Mutation 实验
        </button>
        <ResultPanel result={mutationResult} />
      </section>

      <section className="lab-card">
        <div className="lab-heading">
          <span className="step">03</span>
          <div>
            <h2>手工调用组件：JavaScript 能调用，不代表 React 允许</h2>
            <p>先观察无 Hook 组件的隐蔽失败，再触发 Hook Dispatcher 错误。</p>
          </div>
        </div>

        <div className="action-grid">
          <div>
            <button type="button" onClick={runPlainManualCall}>
              手工调用无 Hook 组件
            </button>
            <ResultPanel result={plainCallResult} />
          </div>

          <div>
            <button type="button" onClick={runHookManualCall}>
              手工调用带 Hook 组件
            </button>
            <ResultPanel result={hookCallResult} />
          </div>
        </div>
      </section>

      <section className="diagnostic-card">
        <h2>诊断顺序</h2>
        <ol>
          <li>检查 JSX 标签大小写。</li>
          <li>打印 `element.type`，区分 string 与 function。</li>
          <li>在 React DevTools 中确认组件边界。</li>
          <li>在 Elements 中确认最终 Host DOM。</li>
          <li>搜索 `ComponentName(props)` 与 Element mutation。</li>
        </ol>
      </section>
    </main>
  );
}

const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 RE-1102-007：缺少 #root 容器。');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
