import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  function handleSelect() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <main>
      <h1>DOM Ref</h1>
      <input ref={inputRef} defaultValue="React Ref" />
      <p>
        <button type="button" onClick={handleFocus}>Focus Input</button>{' '}
        <button type="button" onClick={handleSelect}>Select All</button>
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
