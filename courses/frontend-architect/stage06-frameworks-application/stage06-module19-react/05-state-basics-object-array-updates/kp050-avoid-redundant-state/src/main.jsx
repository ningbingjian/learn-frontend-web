import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [firstName, setFirstName] = useState('Han');
  const [lastName, setLastName] = useState('Li');

  const fullName = `${firstName} ${lastName}`.trim();
  const characterCount = fullName.replaceAll(' ', '').length;
  const upperName = fullName.toUpperCase();

  return (
    <main>
      <h1>避免把可推导值存入 State</h1>

      <label>
        名：
        <input
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
      </label>

      <br />

      <label>
        姓：
        <input
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </label>

      <p>完整姓名：{fullName || '未填写'}</p>
      <p>去空格字符数：{characterCount}</p>
      <p>大写视图：{upperName || '—'}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
