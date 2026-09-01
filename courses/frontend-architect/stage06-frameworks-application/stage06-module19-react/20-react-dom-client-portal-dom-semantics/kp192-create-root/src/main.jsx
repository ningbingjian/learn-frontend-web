import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const htmlBeforeCreateRoot = container.innerHTML;
const root = createRoot(container);

function App({ before }) {
  return (
    <main>
      <h1>createRoot</h1>
      <p>React 已经接管 #root 容器。</p>
      <p>createRoot 前记录到的 HTML：</p>
      <pre>{before}</pre>
      <p>现在检查 DOM：原来的 data-static-placeholder 已被本次 React Render 替换。</p>
    </main>
  );
}

root.render(<App before={htmlBeforeCreateRoot} />);
