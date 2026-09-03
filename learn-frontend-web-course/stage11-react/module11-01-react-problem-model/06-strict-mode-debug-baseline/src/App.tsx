import { useEffect, useState } from 'react';

interface DebugProbeProps {
  count: number;
}

function DebugProbe({ count }: DebugProbeProps) {
  console.log(`[Render] DebugProbe 读取 count=${count}`);

  useEffect(() => {
    console.log('[Effect setup] DebugProbe 连接外部资源（演示）');

    return () => {
      console.log('[Effect cleanup] DebugProbe 断开外部资源（演示）');
    };
  }, []);

  return (
    <section className="probe" aria-labelledby="probe-title">
      <p className="section-label">DebugProbe Component</p>
      <h2 id="probe-title">当前计数：{count}</h2>
      <p>
        打开 Console 后刷新页面，观察 Render、Effect setup 和 Effect cleanup
        的开发模式日志。
      </p>
    </section>
  );
}

export function App() {
  const [count, setCount] = useState(0);
  const [showProbe, setShowProbe] = useState(true);

  console.log(`[Render] App 读取 count=${count}, showProbe=${showProbe}`);

  function increment() {
    console.log('[Event] 用户请求 count + 1');
    setCount((current) => current + 1);
  }

  function toggleProbe() {
    console.log('[Event] 用户请求挂载或卸载 DebugProbe');
    setShowProbe((visible) => !visible);
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">RE-1101-006 · Strict Mode</p>
        <h1>看到两次日志，不等于生产执行了两次</h1>
        <p className="lead">
          Strict Mode 在开发环境增加检查，帮助暴露不纯渲染和资源清理问题。不要通过删除
          StrictMode 来掩盖缺陷。
        </p>
      </header>

      <section className="control-card">
        <div>
          <p className="section-label">State Owner</p>
          <h2>调试控制台</h2>
          <p>App State：count={count}，DebugProbe={showProbe ? '已挂载' : '已卸载'}</p>
        </div>
        <div className="actions">
          <button type="button" onClick={increment}>
            count + 1
          </button>
          <button type="button" className="secondary" onClick={toggleProbe}>
            {showProbe ? '卸载 DebugProbe' : '重新挂载 DebugProbe'}
          </button>
        </div>
      </section>

      {showProbe ? (
        <DebugProbe count={count} />
      ) : (
        <section className="empty-state" aria-live="polite">
          DebugProbe 已卸载。Console 中应该出现真实的 Effect cleanup 日志。
        </section>
      )}

      <section className="checklist" aria-labelledby="checklist-title">
        <h2 id="checklist-title">第一套 Debug 基线</h2>
        <ol>
          <li>Console：区分 Event、Render、Effect setup 与 cleanup。</li>
          <li>React DevTools Components：查看 App 与 DebugProbe 的 Props/State。</li>
          <li>开启 “Highlight updates”：观察提交到页面的组件区域。</li>
          <li>执行生产预览：比较开发检查与生产运行差异。</li>
        </ol>
      </section>
    </main>
  );
}
