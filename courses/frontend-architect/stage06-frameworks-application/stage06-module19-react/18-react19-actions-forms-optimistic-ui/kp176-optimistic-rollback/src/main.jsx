import { StrictMode, useOptimistic, useState } from 'react';
import { createRoot } from 'react-dom/client';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: '欢迎来到 Actions 聊天室', pending: false },
  ]);
  const [error, setError] = useState('');

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, optimisticMessage) => [
      ...currentMessages,
      optimisticMessage,
    ],
  );

  async function sendAction(formData) {
    const text = String(formData.get('message') ?? '').trim();

    if (!text) {
      setError('请输入消息。');
      return;
    }

    setError('');
    addOptimisticMessage({
      id: `pending-${Date.now()}`,
      text,
      pending: true,
    });

    await delay(900);

    if (text.toLowerCase().includes('fail')) {
      setError('保存失败：乐观消息已自动回滚。');
      return;
    }

    setMessages(currentMessages => [
      ...currentMessages,
      { id: Date.now(), text, pending: false },
    ]);
  }

  return (
    <main>
      <h1>乐观更新与回滚</h1>
      <p>输入包含 fail 的消息，可以观察失败后的自动回滚。</p>

      <form action={sendAction}>
        <input name="message" placeholder="hello / fail message" />
        <button type="submit">发送</button>
      </form>

      {error && <p role="alert">{error}</p>}

      <ul>
        {optimisticMessages.map(message => (
          <li key={message.id}>
            {message.text} {message.pending && <em>（发送中…）</em>}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
