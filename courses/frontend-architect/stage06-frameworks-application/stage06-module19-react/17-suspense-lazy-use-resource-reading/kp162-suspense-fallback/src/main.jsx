import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

function createTeachingResource(value, delay) {
  let ready = false;
  const promise = new Promise(resolve => {
    window.setTimeout(() => {
      ready = true;
      resolve();
    }, delay);
  });

  return {
    read() {
      if (!ready) throw promise;
      return value;
    },
  };
}

const accountResource = createTeachingResource(
  { name: 'Ada', role: 'Frontend Architect' },
  1800,
);

function AccountCard() {
  const account = accountResource.read();
  return <article><h2>{account.name}</h2><p>{account.role}</p></article>;
}

function AccountSkeleton() {
  return (
    <div role="status" aria-live="polite">
      <p>████████</p>
      <p>██████████████</p>
      <span>账户资料加载中…</span>
    </div>
  );
}

function App() {
  return (
    <main>
      <header><h1>fallback 是 Boundary 的备用 UI</h1><p>导航和标题在边界外。</p></header>
      <Suspense fallback={<AccountSkeleton />}>
        <AccountCard />
      </Suspense>
      <footer>页脚也不需要等待账户资料。</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
