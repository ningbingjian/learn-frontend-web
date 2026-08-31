import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Header() {
  console.log('Header render：StrictMode 边界外');
  return <header>Header：不在本课 StrictMode 子树中</header>;
}

function CheckedArea() {
  console.log('CheckedArea render：StrictMode 边界内');
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Checked Area</h2>
      <p>count：{count}</p>
      <button type="button" onClick={() => setCount(value => value + 1)}>
        更新 StrictMode 子树
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>StrictMode 的作用范围</h1>
      <Header />
      <StrictMode>
        <CheckedArea />
      </StrictMode>
      <p>打开 Console，对比 Header 与 CheckedArea 的 render log。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
