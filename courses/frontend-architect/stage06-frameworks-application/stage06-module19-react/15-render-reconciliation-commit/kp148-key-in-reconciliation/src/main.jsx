import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialItems = [
  { id: 'a', name: 'Alice' },
  { id: 'b', name: 'Bob' },
  { id: 'c', name: 'Carol' },
];

function Row({ item }) {
  const [note, setNote] = useState('');

  return (
    <li>
      <strong>{item.name}</strong>{' '}
      <input
        value={note}
        onChange={event => setNote(event.target.value)}
        placeholder={`${item.name} 的本地 note`}
      />
    </li>
  );
}

function ListCase({ title, stable }) {
  const [items, setItems] = useState(initialItems);

  function reverseItems() {
    setItems([...items].reverse());
  }

  return (
    <section>
      <h2>{title}</h2>
      <button type="button" onClick={reverseItems}>
        反转顺序
      </button>
      <ul>
        {items.map((item, index) => (
          <Row key={stable ? item.id : index} item={item} />
        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP148：Key 在 Reconciliation 中的作用</h1>
      <ListCase title="Stable Key：key={item.id}" stable />
      <ListCase title="对照实验：key={index}" stable={false} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
