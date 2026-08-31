import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const impureStories = [
  { id: 'a', label: 'Learn Render' },
  { id: 'b', label: 'Learn Commit' },
];

const pureStories = [
  { id: 'a', label: 'Learn Render' },
  { id: 'b', label: 'Learn Commit' },
];

function ImpureStoryTray() {
  console.log('ImpureStoryTray render');
  const items = impureStories;
  items.push({ id: `create-${items.length}`, label: 'Create Story' });

  return <ul>{items.map(item => <li key={item.id}>{item.label}</li>)}</ul>;
}

function PureStoryTray() {
  console.log('PureStoryTray render');
  const items = pureStories.slice();
  items.push({ id: 'create', label: 'Create Story' });

  return <ul>{items.map(item => <li key={item.id}>{item.label}</li>)}</ul>;
}

function App() {
  const [tick, setTick] = useState(0);

  return (
    <main>
      <h1>StrictMode：用重复调用暴露不纯 Render</h1>
      <button type="button" onClick={() => setTick(value => value + 1)}>
        再触发一次 Render（{tick}）
      </button>
      <section>
        <h2>不纯：修改 Render 前已存在的数组</h2>
        <ImpureStoryTray />
      </section>
      <section>
        <h2>纯：先复制，再做 Local Mutation</h2>
        <PureStoryTray />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
