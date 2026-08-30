import { StrictMode, useImperativeHandle, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function SearchField({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    selectAll() {
      inputRef.current?.focus();
      inputRef.current?.select();
    },
  }), []);

  return <input ref={inputRef} defaultValue="React Imperative Handle" />;
}

function App() {
  const searchFieldRef = useRef(null);

  return (
    <main>
      <h1>useImperativeHandle</h1>
      <SearchField ref={searchFieldRef} />
      <p>
        <button type="button" onClick={() => searchFieldRef.current?.focus()}>
          Focus
        </button>{' '}
        <button type="button" onClick={() => searchFieldRef.current?.selectAll()}>
          Select All
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
