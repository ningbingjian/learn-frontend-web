import { createRoot } from 'react-dom/client';

function Card({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP023：children 组合</h1>

      <Card title="Order #1024">
        <p>Mechanical Keyboard</p>
        <strong>¥499</strong>
      </Card>

      <Card title="Service status">
        <p>Billing API is temporarily unavailable.</p>
        <button type="button">Retry</button>
      </Card>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
