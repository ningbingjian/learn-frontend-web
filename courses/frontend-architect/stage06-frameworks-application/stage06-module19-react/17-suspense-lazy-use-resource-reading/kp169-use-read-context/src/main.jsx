import { createContext, StrictMode, use, useState } from 'react';
import { createRoot } from 'react-dom/client';

const ThemeContext = createContext('light');

function ThemeBadge({ enabled, label }) {
  if (!enabled) {
    return <p>{label}：Theme read disabled</p>;
  }

  const theme = use(ThemeContext);
  return <p>{label}：{theme}</p>;
}

function App() {
  const [enabled, setEnabled] = useState(true);

  return (
    <main>
      <h1>use 读取 Context</h1>
      <button type="button" onClick={() => setEnabled(value => !value)}>
        {enabled ? 'Disable Context Read' : 'Enable Context Read'}
      </button>

      <section>
        <h2>No Provider</h2>
        <ThemeBadge enabled={enabled} label="Default" />
      </section>

      <ThemeContext value="dark">
        <section>
          <h2>Dark Provider</h2>
          <ThemeBadge enabled={enabled} label="Parent" />

          <ThemeContext value="contrast">
            <ThemeBadge enabled={enabled} label="Nested" />
          </ThemeContext>
        </section>
      </ThemeContext>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
