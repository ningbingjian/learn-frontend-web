import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const contacts = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
];

function ContactEditor({ contact }) {
  const [draft, setDraft] = useState(contact.name);

  return (
    <section>
      <h2>编辑 {contact.name}</h2>
      <label>
        草稿姓名：
        <input value={draft} onChange={(event) => setDraft(event.target.value)} />
      </label>
    </section>
  );
}

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contact = contacts[selectedIndex];

  return (
    <main>
      <p>RE-KP065</p>
      <h1>使用 key 主动重置 State</h1>
      <ContactEditor key={contact.id} contact={contact} />
      <button type="button" onClick={() => setSelectedIndex(selectedIndex === 0 ? 1 : 0)}>
        切换联系人
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
