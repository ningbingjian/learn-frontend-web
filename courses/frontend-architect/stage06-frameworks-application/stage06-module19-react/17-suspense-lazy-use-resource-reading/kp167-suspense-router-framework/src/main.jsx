import { StrictMode, Suspense, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

let artistResource;

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

function getArtistResource() {
  if (!artistResource) {
    artistResource = createResource('The Suspense Artist', 1600);
  }
  return artistResource;
}

function HomePage() {
  return <h2>Home Page</h2>;
}

function ArtistPage() {
  const artist = getArtistResource().read();
  return <h2>Artist Page：{artist}</h2>;
}

function RouterDemo() {
  const [page, setPage] = useState('home');
  const [isPending, startTransition] = useTransition();

  function navigate(nextPage) {
    startTransition(() => {
      setPage(nextPage);
    });
  }

  return (
    <main>
      <h1>Suspense 与路由框架</h1>
      <nav>
        <button type="button" onClick={() => navigate('home')}>Home</button>{' '}
        <button type="button" onClick={() => navigate('artist')}>Artist</button>
      </nav>
      <p>{isPending ? 'Navigation pending…' : 'Navigation idle'}</p>

      <Suspense fallback={<p>Route loading…</p>}>
        {page === 'home' ? <HomePage /> : <ArtistPage />}
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterDemo />
  </StrictMode>,
);
