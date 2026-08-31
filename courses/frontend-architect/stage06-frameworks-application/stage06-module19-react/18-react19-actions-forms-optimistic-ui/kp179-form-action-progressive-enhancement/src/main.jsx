import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialQuery = new URLSearchParams(window.location.search).get('q') ?? '';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [message, setMessage] = useState('');

  async function subscribeAction(formData) {
    const email = String(formData.get('email') ?? '').trim();
    if (!email) return;

    await delay(500);
    setMessage(`已在客户端 Action 中订阅：${email}`);
  }

  return (
    <main>
      <h1>表单 Action 与渐进增强</h1>

      <section>
        <h2>1. Native URL Form</h2>
        <form action="" method="get">
          <input name="q" defaultValue={initialQuery} placeholder="搜索词" />
          <button type="submit">原生搜索</button>
        </form>
        <p>当前 q：{initialQuery || '空'}</p>
        <p>这条路径由浏览器原生提交，不依赖客户端 Action 函数。</p>
      </section>

      <section>
        <h2>2. Client Function Action</h2>
        <form action={subscribeAction}>
          <input name="email" type="email" placeholder="dev@example.com" />
          <button type="submit">客户端订阅</button>
        </form>
        {message && <p>{message}</p>}
        <p>这条路径需要当前 Vite 页面中的 JavaScript。</p>
      </section>

      <section>
        <h2>3. Server Function</h2>
        <p>真正的 function Action 渐进增强需要 RSC/Server Function 框架支持，本课不会在纯 Vite 中伪造服务端。</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
