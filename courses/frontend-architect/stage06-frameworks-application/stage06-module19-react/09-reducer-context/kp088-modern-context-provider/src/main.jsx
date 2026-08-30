import { StrictMode, createContext, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

const LocaleContext = createContext('zh-CN');

function LocaleBadge({ label }) {
  const locale = useContext(LocaleContext);

  return <p>{label}：{locale}</p>;
}

function App() {
  const [locale, setLocale] = useState('zh-CN');

  function toggleLocale() {
    setLocale(current => (current === 'zh-CN' ? 'ja-JP' : 'zh-CN'));
  }

  return (
    <main>
      <h1>React 19 Context Provider</h1>
      <button onClick={toggleLocale}>切换主语言</button>
      <LocaleContext value={locale}>
        <LocaleBadge label="主应用" />
        <LocaleContext value="en-US">
          <LocaleBadge label="固定英语区域" />
        </LocaleContext>
      </LocaleContext>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
