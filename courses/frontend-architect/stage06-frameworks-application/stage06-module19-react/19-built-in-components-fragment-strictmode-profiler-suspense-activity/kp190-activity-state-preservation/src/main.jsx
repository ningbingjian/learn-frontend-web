import { Activity, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Editor({ title }) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>{title}</h2>
      <input value={text} onChange={event => setText(event.target.value)} placeholder="输入草稿" />
      <button onClick={() => setCount(value => value + 1)}>count + 1</button>
      <p>草稿：{text || '（空）'}</p>
      <p>count：{count}</p>
    </section>
  );
}

function App() {
  const [show, setShow] = useState(true);

  return (
    <main>
      <h1>Activity 与条件卸载</h1>
      <button onClick={() => setShow(value => !value)}>{show ? '同时隐藏' : '同时显示'}</button>

      <Activity mode={show ? 'visible' : 'hidden'}>
        <Editor title="Activity Editor（保留 State）" />
      </Activity>

      {show && <Editor title="Conditional Editor（卸载后重置）" />}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
