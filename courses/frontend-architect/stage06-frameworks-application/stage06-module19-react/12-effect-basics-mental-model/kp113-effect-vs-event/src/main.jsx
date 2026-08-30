import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [roomId, setRoomId] = useState('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('尚未发送');

  useEffect(() => {
    document.title = `房间：${roomId}`;
  }, [roomId]);

  function handleSubmit(event) {
    event.preventDefault();
    const text = message.trim();

    if (!text) {
      return;
    }

    window.localStorage.setItem('lastSentMessage', `${roomId}:${text}`);
    setStatus(`已向 ${roomId} 发送：${text}`);
    setMessage('');
  }

  return (
    <main>
      <h1>Effect 与 Event 的区别</h1>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
          <option value="travel">travel</option>
        </select>
      </label>
      <form onSubmit={handleSubmit}>
        <label>
          消息：
          <input value={message} onChange={event => setMessage(event.target.value)} />
        </label>{' '}
        <button type="submit">发送</button>
      </form>
      <p>{status}</p>
      <p>切换房间会自动同步标题；发送只发生在提交事件中。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
