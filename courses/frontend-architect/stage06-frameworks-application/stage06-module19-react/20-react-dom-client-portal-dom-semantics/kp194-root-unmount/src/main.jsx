import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const status = document.getElementById('status');
const firstRoot = createRoot(container);
let replacementRoot = null;

function Demo({ label }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log(`[${label}] setup timer`);
    const timerId = setInterval(() => setSeconds(value => value + 1), 1000);

    return () => {
      clearInterval(timerId);
      console.log(`[${label}] cleanup timer`);
    };
  }, [label]);

  return (
    <main>
      <h1>root.unmount</h1>
      <p>当前 Root：{label}</p>
      <p>组件已运行：{seconds}s</p>
    </main>
  );
}

firstRoot.render(<Demo label="first root" />);

document.getElementById('unmount-root').addEventListener('click', () => {
  firstRoot.unmount();
  status.textContent = 'firstRoot 已 unmount；观察 Console 中的 cleanup。';
});

document.getElementById('try-render').addEventListener('click', () => {
  try {
    firstRoot.render(<Demo label="illegal reuse" />);
  } catch (error) {
    status.textContent = `再次 render 失败：${error.message}`;
  }
});

document.getElementById('create-new-root').addEventListener('click', () => {
  if (replacementRoot) return;
  replacementRoot = createRoot(container);
  replacementRoot.render(<Demo label="replacement root" />);
  status.textContent = '同一 DOM 容器可以创建一个全新的 Root。';
});
