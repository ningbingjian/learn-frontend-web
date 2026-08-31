import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

function createTeachingResource(value, delay) {
  let status = 'pending';
  let result;

  const promise = new Promise(resolve => {
    window.setTimeout(() => {
      status = 'success';
      result = value;
      resolve();
    }, delay);
  });

  return {
    read() {
      if (status === 'pending') {
        throw promise;
      }
      return result;
    },
  };
}

const profileResource = createTeachingResource('高级前端架构师学习者', 1500);

function Profile() {
  const profile = profileResource.read();
  return <section><h2>资料已就绪</h2><p>{profile}</p></section>;
}

function App() {
  return (
    <main>
      <h1>Suspense Boundary</h1>
      <p>这行在 Boundary 外，始终可以显示。</p>
      <Suspense fallback={<p>资料加载中…</p>}>
        <Profile />
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
