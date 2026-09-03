const concepts = [
  {
    step: '01',
    title: 'DOM Container',
    description: 'index.html 提供真实的 #root 元素，它是 React 接管页面的宿主边界。',
    code: '<div id="root"></div>',
  },
  {
    step: '02',
    title: 'React Root',
    description: 'createRoot 把一个真实 DOM Container 连接到 React 客户端运行时。',
    code: 'createRoot(container)',
  },
  {
    step: '03',
    title: 'Component',
    description: 'App 组件声明当前界面结构；组件函数本身不是最终 DOM 节点。',
    code: '<App />',
  },
] as const;

export function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">Architect Workbench · React Bootstrap</p>
        <span className="status-pill">React 19.2</span>
        <h1>React 已经接管这个 DOM 子树。</h1>
        <p className="hero__lead">
          当前页面没有 State、Effect、Router 或数据请求。我们只保留最小结构，用来观察浏览器宿主节点、React Root
          和组件之间的关系。
        </p>
      </header>

      <section className="concept-grid" aria-label="React 最小运行链路">
        {concepts.map((concept) => (
          <article className="concept-card" key={concept.title}>
            <span className="concept-card__step">{concept.step}</span>
            <h2>{concept.title}</h2>
            <p>{concept.description}</p>
            <code>{concept.code}</code>
          </article>
        ))}
      </section>

      <aside className="callout">
        <div>
          <p className="callout__label">当前心智模型</p>
          <strong>DOM Container → React Root → Component → Render Output</strong>
        </div>
        <p>下一课会加入 State，观察 React 如何让多处 UI 保持一致。</p>
      </aside>
    </main>
  );
}
