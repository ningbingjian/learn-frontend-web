import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter({ person }) {
  const [score, setScore] = useState(0);

  return (
    <section>
      <h2>{person}</h2>
      <p>score：{score}</p>
      <button onClick={() => setScore(current => current + 1)}>score + 1</button>
    </section>
  );
}

function App() {
  const [isTaylor, setIsTaylor] = useState(true);

  return (
    <main>
      <h1>组件树中的位置决定身份</h1>
      {isTaylor ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => setIsTaylor(current => !current)}>
        切换到 {isTaylor ? 'Sarah' : 'Taylor'}
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
