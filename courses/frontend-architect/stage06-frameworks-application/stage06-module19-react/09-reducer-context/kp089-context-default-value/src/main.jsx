import { StrictMode, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

const AccountContext = createContext('anonymous');

function AccountLabel({ label }) {
  const account = useContext(AccountContext);

  return <p>{label}：{String(account)}</p>;
}

function App() {
  return (
    <main>
      <h1>Context 默认值</h1>
      <AccountLabel label="无 Provider" />

      <AccountContext value={null}>
        <AccountLabel label="Provider value=null" />
      </AccountContext>

      <AccountContext value={undefined}>
        <AccountLabel label="Provider value=undefined" />
      </AccountContext>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
