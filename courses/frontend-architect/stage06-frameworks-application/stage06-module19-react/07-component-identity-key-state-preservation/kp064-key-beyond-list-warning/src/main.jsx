import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const people = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
];

function IdentityCard(props) {
  const [visits, setVisits] = useState(0);
  const { person } = props;

  return (
    <section>
      <h2>{person.name}</h2>
      <p>visits: {visits}</p>
      <p>组件收到的普通 Props：{Object.keys(props).join(', ')}</p>
      <button type="button" onClick={() => setVisits(visits + 1)}>
        visits + 1
      </button>
    </section>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const person = people[index];

  return (
    <main>
      <p>RE-KP064</p>
      <h1>key 不只是列表警告</h1>
      <IdentityCard key={person.id} person={person} />
      <button type="button" onClick={() => setIndex(index === 0 ? 1 : 0)}>
        切换人物
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
