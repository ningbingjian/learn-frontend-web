import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function StatusBadge({ status }) {
  return <strong>{status}</strong>;
}

function ProfileCard({ name, role }) {
  const [visits, setVisits] = useState(0);

  return (
    <section>
      <StatusBadge status="Active" />
      <h2>{name}</h2>
      <p>{role}</p>
      <p>本地 State visits: {visits}</p>
      <button type="button" onClick={() => setVisits((value) => value + 1)}>
        visits + 1
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <p>RE-KP009</p>
      <h1>React DevTools 检查目标</h1>
      <ProfileCard name="Ada" role="Frontend Engineer" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
