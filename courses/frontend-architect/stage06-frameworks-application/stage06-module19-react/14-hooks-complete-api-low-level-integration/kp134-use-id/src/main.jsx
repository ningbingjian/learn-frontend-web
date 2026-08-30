import { StrictMode, useId } from 'react';
import { createRoot } from 'react-dom/client';

function ContactField({ title }) {
  const id = useId();
  const inputId = `${id}-email`;
  const hintId = `${id}-hint`;

  return (
    <section>
      <h2>{title}</h2>
      <label htmlFor={inputId}>邮箱：</label>
      <input id={inputId} type="email" aria-describedby={hintId} />
      <p id={hintId}>这个地址只用于发送课程通知。</p>
      <small>input id: {inputId}</small>
    </section>
  );
}

function App() {
  return (
    <main>
      <p>RE-KP134</p>
      <h1>useId：为可访问性关系生成唯一 ID</h1>
      <ContactField title="主联系人" />
      <ContactField title="备用联系人" />
      <p>两个组件实例调用同一个 ContactField，但生成的 ID 不会互相冲突。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
