import { createRoot } from 'react-dom/client';

function Notice({ severity, icon, children, actions }) {
  return (
    <section data-severity={severity}>
      <div>{icon}</div>
      <div>{children}</div>
      <div>{actions}</div>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>RE-KP024：通过 JSX 传递内容</h1>
      <Notice
        severity="warning"
        icon={<span aria-hidden="true">⚠️</span>}
        actions={<button type="button">Retry</button>}
      >
        <h2>Connection failed</h2>
        <p>The billing service did not respond.</p>
      </Notice>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
