import { createRoot } from 'react-dom/client';

function Panel({ children }) {
  return (
    <section>
      <h2>Children playground</h2>
      <div>{children}</div>
    </section>
  );
}

function App() {
  const topics = ['text', 'element', 'array'];
  const showTip = false;

  return (
    <main>
      <h1>RE-KP020：JSX children 的基本模型</h1>
      <Panel>
        Plain text {' | '}
        {42} {' | '}
        {0} {' | '}
        <strong>React Element child</strong>
        <div>
          {topics.map((topic) => (
            <span key={topic}>[{topic}] </span>
          ))}
        </div>
        {showTip && <em>Visible only when true</em>}
        {null}
        {undefined}
      </Panel>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
