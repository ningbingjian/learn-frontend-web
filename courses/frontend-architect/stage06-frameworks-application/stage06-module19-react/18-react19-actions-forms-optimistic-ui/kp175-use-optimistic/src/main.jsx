import { StrictMode, useOptimistic, useState } from 'react';
import { createRoot } from 'react-dom/client';

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function App() {
  const [messages, setMessages] = useState([
    { id: 'welcome', text: '欢迎学习 useOptimistic', sending: false },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, message) => [
      ...currentMessages,
      { ...message, sending: true },
    ],
  );

  async function sendMessage(formData) {
    const text = String(formData.get('message') ?? '').trim();
    if (!text) return;

    const message = { id: crypto.randomUUID(), text };
    addOptimisticMessage(message);

    await wait(1200);
    setMessages(currentMessages => [
      ...currentMessages,
      { ...message, sending: false },
    ]);
  }

  return (
    <main>
      <h1>useOptimistic</h1>
      <form action={sendMessage}>
        <input name="message" placeholder="输入消息" />
        <button type="submit">发送</button>
      </form>
      <ul>
        {optimisticMessages.map(message => (
          <li key={message.id}>
            {message.text} {message.sending ? '（发送中…）' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
