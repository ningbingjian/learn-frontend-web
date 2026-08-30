import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const users = [
  { id: 'ada', name: 'Ada' },
  { id: 'grace', name: 'Grace' },
  { id: 'linus', name: 'Linus' },
];

function useSelection(initialId = null) {
  const [selectedId, setSelectedId] = useState(initialId);

  return {
    selectedId,
    select(id) {
      setSelectedId(id);
    },
    clear() {
      setSelectedId(null);
    },
    isSelected(id) {
      return selectedId === id;
    },
  };
}

function App() {
  const selection = useSelection('ada');

  return (
    <main>
      <h1>自定义 Hook 返回值设计</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <button onClick={() => selection.select(user.id)}>
              {selection.isSelected(user.id) ? '✅' : '⬜'} {user.name}
            </button>
          </li>
        ))}
      </ul>
      <p>Selected ID: {selection.selectedId ?? 'none'}</p>
      <button onClick={selection.clear}>Clear</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
