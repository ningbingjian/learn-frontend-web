import { StrictMode, createContext, use, useState } from 'react';
import { createRoot } from 'react-dom/client';

const ThemeContext = createContext('light');

function ThemePreview({ visible }) {
  if (!visible) {
    return <p>主题预览已隐藏</p>;
  }

  const theme = use(ThemeContext);
  return <p>当前主题：{theme}</p>;
}

function App() {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext value={theme}>
      <main>
        <h1>use 是规则中的特殊例外</h1>
        <button onClick={() => setVisible(value => !value)}>切换预览</button>{' '}
        <button onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}>
          切换主题
        </button>
        <ThemePreview visible={visible} />
      </main>
    </ThemeContext>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
