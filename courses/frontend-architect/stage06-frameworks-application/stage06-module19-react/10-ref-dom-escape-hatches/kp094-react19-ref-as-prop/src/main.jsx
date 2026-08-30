import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';

function SearchInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

function App() {
  const searchRef = useRef(null);

  return (
    <main>
      <h1>React 19 ref as prop</h1>
      <SearchInput ref={searchRef} placeholder="搜索课程" />{' '}
      <button type="button" onClick={() => searchRef.current?.focus()}>
        Focus Search
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
