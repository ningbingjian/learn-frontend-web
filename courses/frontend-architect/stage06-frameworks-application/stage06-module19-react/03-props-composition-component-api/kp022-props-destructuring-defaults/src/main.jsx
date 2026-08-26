import { createRoot } from 'react-dom/client';

function Avatar({ name, size = 64, tone = 'neutral' }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>size={String(size)}</p>
      <p>tone={tone}</p>
    </article>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP022：Props 解构与默认值</h1>
      <Avatar name="Ada" />
      <Avatar name="Lin" size={96} tone="large" />
      <Avatar name="Grace" size={undefined} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
