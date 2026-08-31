import { lazy, StrictMode, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';

function delayForDemo(promise) {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, 900)),
  ]).then(([module]) => module);
}

const MarkdownPreview = lazy(() =>
  delayForDemo(import('./MarkdownPreview.jsx')),
);

function App() {
  const [text, setText] = useState('Hello lazy component');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <main>
      <h1>lazy</h1>
      <textarea
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <p>
        <button type="button" onClick={() => setShowPreview(show => !show)}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </p>

      {showPreview && (
        <Suspense fallback={<p>Preview code loading…</p>}>
          <MarkdownPreview text={text} />
        </Suspense>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
