import { Profiler, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function ExpensivePanel({ count }) {
  let checksum = 0;
  for (let index = 0; index < 350000; index += 1) {
    checksum = (checksum + index * (count + 1)) % 1009;
  }

  return <p>count：{count} · checksum：{checksum}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  const metricsRef = useRef(null);

  function handleRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    if (!metricsRef.current) {
      return;
    }

    metricsRef.current.innerHTML = `
      <tr><th>id</th><td>${id}</td></tr>
      <tr><th>phase</th><td>${phase}</td></tr>
      <tr><th>actualDuration</th><td>${actualDuration.toFixed(2)} ms</td></tr>
      <tr><th>baseDuration</th><td>${baseDuration.toFixed(2)} ms</td></tr>
      <tr><th>startTime</th><td>${startTime.toFixed(2)}</td></tr>
      <tr><th>commitTime</th><td>${commitTime.toFixed(2)}</td></tr>
    `;
  }

  return (
    <main>
      <h1>Profiler onRender 指标</h1>
      <button type="button" onClick={() => setCount(value => value + 1)}>
        更新被测子树
      </button>
      <Profiler id="ExpensivePanel" onRender={handleRender}>
        <ExpensivePanel count={count} />
      </Profiler>
      <table>
        <tbody ref={metricsRef}>
          <tr><th>状态</th><td>等待 Profiler commit...</td></tr>
        </tbody>
      </table>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
