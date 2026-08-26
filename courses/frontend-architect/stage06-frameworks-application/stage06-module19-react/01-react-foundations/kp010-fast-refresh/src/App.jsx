import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <p>RE-KP010</p>
      <h1>Fast Refresh 状态保留实验</h1>
      <p>先把计数加到 3，再修改这个组件里的标题文字并保存。</p>
      <p>当前 count: {count}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        count + 1
      </button>
    </main>
  );
}
