import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [form, setForm] = useState({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com'
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  return (
    <main>
      <h1>对象 State 更新</h1>

      <label>
        First name
        <input name="firstName" value={form.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last name
        <input name="lastName" value={form.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>

      <h2>当前完整对象</h2>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
