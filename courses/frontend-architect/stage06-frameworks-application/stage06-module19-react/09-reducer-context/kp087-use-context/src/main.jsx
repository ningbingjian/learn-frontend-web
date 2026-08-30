import { StrictMode, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

const ThemeContext = createContext('light');

function SaveButton({ label }) {
  const theme = useContext(ThemeContext);

  return <button>{label}（{theme}）</button>;
}

function Toolbar() {
  return <SaveButton label="保存页面" />;
}

function Page() {
  return <Toolbar />;
}

function App() {
  return (
    <main>
      <h1>useContext</h1>
      <ThemeContext value="dark">
        <Page />
        <ThemeContext value="light">
          <SaveButton label="内层按钮" />
        </ThemeContext>
      </ThemeContext>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
