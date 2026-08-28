import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter({ fancy }) {
  const [score, setScore] = useState(0);

  return (
    <section data-style={fancy ? 'fancy' : 'plain'}>
      <h2>{fancy ? 'Fancy Counter' : 'Plain Counter'}</h2>
      <p>score: {score}</p>
      <button type="button" onClick={() => setScore(score + 1)}>
        score + 1
      </button>
    </section>
  );
}

function App() {
  const [isFancy, setIsFancy] = useState(false);

  return (
    <main>
      <p>RE-KP062</p>
      <h1>相同位置 + 相同组件类型会保留 State</h1>
      <Counter fancy={isFancy} />
      <button type="button" onClick={() => setIsFancy(!isFancy)}>
        切换为 {isFancy ? 'Plain' : 'Fancy'}
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
