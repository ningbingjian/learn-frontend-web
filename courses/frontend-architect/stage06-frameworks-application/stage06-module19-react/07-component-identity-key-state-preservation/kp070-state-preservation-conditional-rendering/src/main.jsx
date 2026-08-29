import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter({ label }) {
  const [score, setScore] = useState(0);
  return (
    <section>
      <h3>{label}</h3>
      <button onClick={() => setScore(score + 1)}>Score: {score}</button>
    </section>
  );
}

function App() {
  const [compact, setCompact] = useState(false);
  const [showCounter, setShowCounter] = useState(true);

  return (
    <main>
      <h1>RE-KP070：状态保留与条件渲染</h1>

      <h2>同位置 + 同类型：保留 State</h2>
      <button onClick={() => setCompact(!compact)}>切换显示模式</button>
      {compact ? (
        <Counter label="Compact mode" />
      ) : (
        <Counter label="Comfortable mode" />
      )}

      <hr />

      <h2>组件离开树：重新出现时重置</h2>
      <button onClick={() => setShowCounter(!showCounter)}>
        {showCounter ? '隐藏 Counter' : '显示 Counter'}
      </button>
      {showCounter ? (
        <Counter label="Removable counter" />
      ) : (
        <p>Counter 已从渲染树中移除</p>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
