import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const container = document.querySelector('#root');
const hostLogNode = document.querySelector('#host-log');

if (!(container instanceof HTMLElement)) {
  throw new Error('缺少 #root 容器。');
}

if (!(hostLogNode instanceof HTMLElement)) {
  throw new Error('缺少 #host-log 容器。');
}

const hostLogElement = hostLogNode;

function appendHostLine(message: string) {
  const line = document.createElement('p');
  line.textContent = message;
  hostLogElement.prepend(line);
}

function describeMutation(record: MutationRecord) {
  if (record.type === 'characterData') {
    return `characterData: ${record.target.textContent ?? ''}`;
  }

  if (record.type === 'attributes') {
    return `attributes: ${(record.target as Element).tagName.toLowerCase()}[${record.attributeName ?? ''}]`;
  }

  return `childList: +${record.addedNodes.length} / -${record.removedNodes.length}`;
}

const observer = new MutationObserver((records) => {
  for (const record of records) {
    appendHostLine(`[Commit evidence] ${describeMutation(record)}`);
  }
});

observer.observe(container, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
});

function App() {
  const [renderTick, setRenderTick] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  console.log(
    `[Render] App renderTick=${renderTick}, visibleCount=${visibleCount}`,
  );

  function requestRenderOnly() {
    console.log('[Event] request render-only update');
    appendHostLine('[Event] render-only：预期有 Render，但没有对应可见 DOM mutation');
    setRenderTick((value) => value + 1);
  }

  function requestVisibleUpdate() {
    console.log('[Event] request visible update');
    appendHostLine('[Event] visible update：预期 Render 后出现 DOM mutation');
    setVisibleCount((value) => value + 1);
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1102-006 · Render vs Commit</p>
        <h1>组件执行了，DOM 仍然可能完全不变</h1>
        <p>
          Console 观察 Render；右侧 Host Log 用 MutationObserver 观察 Root 内真实 DOM mutation。
        </p>
      </header>

      <section className="card">
        <p className="label">可见输出</p>
        <strong className="count">{visibleCount}</strong>
        <p>renderTick 故意不进入 JSX，所以它只用于触发和记录 Render。</p>

        <div className="actions">
          <button type="button" onClick={requestRenderOnly}>
            只请求 Render
          </button>
          <button type="button" onClick={requestVisibleUpdate}>
            改变可见输出
          </button>
        </div>
      </section>

      <aside className="note">
        操作顺序：先清空/观察 Console，再看页面右侧 Host Log。不要用 Render 日志数量直接推导 DOM mutation 数量。
      </aside>
    </main>
  );
}

createRoot(container).render(<App />);
