import { createRoot } from 'react-dom/client';

function SingleChildExample() {
  return <p>一个子节点的 JSX</p>;
}

function MultipleChildrenExample() {
  return (
    <section>
      <h2>多个子节点</h2>
      <p>现代 JSX 工具链会把 JSX 转成 JavaScript Runtime 调用。</p>
    </section>
  );
}

function App() {
  return (
    <main>
      <p>RE-KP012</p>
      <h1>JSX 需要先被转换</h1>
      <SingleChildExample />
      <MultipleChildrenExample />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
