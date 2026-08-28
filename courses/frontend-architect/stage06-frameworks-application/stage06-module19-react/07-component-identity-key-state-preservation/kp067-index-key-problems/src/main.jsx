import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialItems = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];

function Row({ item }) {
  const [draft, setDraft] = useState(item.label);

  return (
    <li>
      <strong>当前业务实体：{item.label}</strong>{' '}
      <input value={draft} onChange={(event) => setDraft(event.target.value)} />
    </li>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <main>
      <p>RE-KP067</p>
      <h1>index key 会让局部 State 容易和实体错位</h1>
      <ul>
        {items.map((item, index) => (
          <Row key={index} item={item} />
        ))}
      </ul>
      <button type="button" onClick={() => setItems([...items].reverse())}>
        反转列表
      </button>
      <p>本课故意使用 index key 复现问题；推荐修复为 key={'{item.id}'}。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
