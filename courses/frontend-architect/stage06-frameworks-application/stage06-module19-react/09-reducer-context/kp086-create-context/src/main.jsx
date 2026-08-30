import { StrictMode, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

const CurrencyContext = createContext('CNY');

function CurrencyLabel() {
  const currency = useContext(CurrencyContext);

  return <p>当前货币：{currency}</p>;
}

function App() {
  return (
    <main>
      <h1>createContext</h1>
      <p>当前没有提供 CurrencyContext Provider，因此读取默认 fallback。</p>
      <CurrencyLabel />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
