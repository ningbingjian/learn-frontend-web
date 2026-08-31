import { StrictMode, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';

function createResource(value, delay) {
  let status = 'pending';
  let result;

  const promise = new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  }).then(value => {
    status = 'success';
    result = value;
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

function createSession() {
  return {
    biography: createResource('人物简介已完成', 900),
    albums: createResource('专辑列表已完成', 2400),
  };
}

function Biography({ resource }) {
  const text = resource.read();
  return <p>Biography：{text}</p>;
}

function Albums({ resource }) {
  const text = resource.read();
  return <p>Albums：{text}</p>;
}

function App() {
  const [session, setSession] = useState(createSession);

  return (
    <main>
      <h1>Reveal 顺序与 UX</h1>
      <button type="button" onClick={() => setSession(createSession())}>
        Restart Demo
      </button>

      <section>
        <h2>方案 A：Reveal Together</h2>
        <Suspense fallback={<p>整个详情区域一起等待中…</p>}>
          <Biography resource={session.biography} />
          <Albums resource={session.albums} />
        </Suspense>
      </section>

      <section>
        <h2>方案 B：Progressive Reveal</h2>
        <Suspense fallback={<p>人物简介加载中…</p>}>
          <Biography resource={session.biography} />
          <Suspense fallback={<p>专辑列表仍在加载…</p>}>
            <Albums resource={session.albums} />
          </Suspense>
        </Suspense>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
