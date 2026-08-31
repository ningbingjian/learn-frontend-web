import { StrictMode, createContext, use, useState } from 'react';
import { createRoot } from 'react-dom/client';

const ThemeContext = createContext('light');

function ThemeReport({ showTheme, sections }) {
  let conditionalResult = '条件分支没有读取 Context';

  if (showTheme) {
    const theme = use(ThemeContext);
    conditionalResult = `条件读取：${theme}`;
  }

  const loopResults = [];
  for (const section of sections) {
    if (section.enabled) {
      const theme = use(ThemeContext);
      loopResults.push(`${section.name} → ${theme}`);
    }
  }

  return (
    <section>
      <p>{conditionalResult}</p>
      <ul>
        {loopResults.map(item => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function App() {
  const [showTheme, setShowTheme] = useState(true);
  const [theme, setTheme] = useState('dark');
  const sections = [
    { name: '导航', enabled: true },
    { name: '侧栏', enabled: false },
    { name: '正文', enabled: true },
  ];

  return (
    <ThemeContext value={theme}>
      <main>
        <h1>use 的特殊调用规则</h1>
        <button onClick={() => setShowTheme(value => !value)}>切换条件读取</button>{' '}
        <button onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}>
          切换主题
        </button>
        <ThemeReport showTheme={showTheme} sections={sections} />
      </main>
    </ThemeContext>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
