import { StrictMode, createContext, memo, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

const SettingsContext = createContext({ theme: 'light' });

const ThemeBadge = memo(function ThemeBadge() {
  const settings = useContext(SettingsContext);
  console.log('ThemeBadge render:', settings.theme);

  return <p>Consumer 当前主题：{settings.theme}</p>;
});

function App() {
  const [theme, setTheme] = useState('light');
  const [parentCount, setParentCount] = useState(0);

  return (
    <main>
      <h1>Context 更新与重新渲染</h1>
      <p>父组件无关计数：{parentCount}</p>
      <button onClick={() => setTheme(current => (current === 'light' ? 'dark' : 'light'))}>
        切换主题
      </button>{' '}
      <button onClick={() => setParentCount(count => count + 1)}>
        父级无关更新
      </button>

      <SettingsContext value={{ theme }}>
        <ThemeBadge />
      </SettingsContext>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
