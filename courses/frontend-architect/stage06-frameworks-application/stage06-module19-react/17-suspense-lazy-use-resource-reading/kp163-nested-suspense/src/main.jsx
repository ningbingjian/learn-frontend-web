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
      if (status === 'pending') throw promise;
      return result;
    },
  };
}

const biographyResource = createTeachingResource('Ada 专注于构建可靠的前端系统。', 900);
const albumsResource = createTeachingResource(['Concurrency', 'Suspense', 'Server UI'], 2400);

function Biography() {
  return <p>{biographyResource.read()}</p>;
}

function Albums() {
  const albums = albumsResource.read();
  return <ul>{albums.map(album => <li key={album}>{album}</li>)}</ul>;
}

function App() {
  return (
    <main>
      <h1>嵌套 Suspense</h1>
      <Suspense fallback={<p>人物主资料加载中…</p>}>
        <Biography />
        <Suspense fallback={<p>作品列表继续加载中…</p>}>
          <Albums />
        </Suspense>
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
