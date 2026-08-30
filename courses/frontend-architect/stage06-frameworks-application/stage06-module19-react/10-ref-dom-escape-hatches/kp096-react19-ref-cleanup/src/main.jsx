import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [showInput, setShowInput] = useState(true);

  function attachInput(node) {
    console.log('ref setup:', node);
    node.dataset.refStatus = 'attached';

    return () => {
      console.log('ref cleanup:', node);
      delete node.dataset.refStatus;
    };
  }

  return (
    <main>
      <h1>React 19 Ref Cleanup</h1>
      {showInput && <input ref={attachInput} defaultValue="观察 Console" />}
      <p>
        <button type="button" onClick={() => setShowInput(show => !show)}>
          {showInput ? 'Hide Input' : 'Show Input'}
        </button>
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
