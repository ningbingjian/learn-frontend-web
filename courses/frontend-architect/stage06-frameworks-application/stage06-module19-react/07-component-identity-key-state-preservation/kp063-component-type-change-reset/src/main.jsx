import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter() {
  const [score, setScore] = useState(0);

  return (
    <section>
      <p>Counter score: {score}</p>
      <button type="button" onClick={() => setScore(score + 1)}>
        score + 1
      </button>
    </section>
  );
}

function Message() {
  return <p>这里现在渲染的是 Message 组件。</p>;
}

function App() {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <main>
      <p>RE-KP063</p>
      <h1>组件类型变化会重置 State</h1>
      {showCounter ? <Counter /> : <Message />}
      <button type="button" onClick={() => setShowCounter(!showCounter)}>
        切换组件类型
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
