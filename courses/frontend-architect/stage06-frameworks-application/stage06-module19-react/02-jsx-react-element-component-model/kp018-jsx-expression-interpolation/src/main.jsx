import { createRoot } from 'react-dom/client';

const person = {
  name: 'Ada',
  role: 'Engineer'
};

const score = 92;
const online = true;

function formatScore(value) {
  return `${value}/100`;
}

function App() {
  return (
    <main>
      <h1>{person.name}</h1>
      <p>Role: {person.role}</p>
      <p>Score: {score}</p>
      <p>Formatted: {formatScore(score)}</p>
      <p>Bonus: {score + 5}</p>
      <p>{`Profile: ${person.name}`}</p>
      <strong>{online ? 'Online' : 'Offline'}</strong>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{false}</div>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
