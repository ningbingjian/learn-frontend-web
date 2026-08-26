import { createRoot } from 'react-dom/client';

function Frame({ title, children, footer }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
      <footer>{footer}</footer>
    </section>
  );
}

function AdminPanel() {
  return (
    <Frame title="Admin" footer="Admin workspace">
      <button type="button">Manage users</button>
    </Frame>
  );
}

function CustomerPanel() {
  return (
    <Frame title="Customer" footer="Customer workspace">
      <p>Recent order: #1024</p>
    </Frame>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP025：组件组合优于继承</h1>
      <AdminPanel />
      <CustomerPanel />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
