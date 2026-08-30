import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!nameRef.current?.value.trim()) {
      setMessage('请输入姓名');
      nameRef.current?.focus();
      return;
    }

    if (!emailRef.current?.value.trim()) {
      setMessage('请输入邮箱');
      emailRef.current?.focus();
      return;
    }

    setMessage('校验通过');
  }

  return (
    <main>
      <h1>管理焦点</h1>
      <form onSubmit={handleSubmit}>
        <label>
          姓名
          <input ref={nameRef} name="name" />
        </label>
        <br />
        <label>
          邮箱
          <input ref={emailRef} name="email" type="email" />
        </label>
        <br />
        <button type="submit">提交</button>
      </form>
      <p role="status" aria-live="polite">{message}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
