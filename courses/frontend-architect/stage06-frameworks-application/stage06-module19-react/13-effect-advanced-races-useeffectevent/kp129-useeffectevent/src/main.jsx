import { StrictMode, useEffect, useEffectEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';

function createConnection(roomId, onMessage) {
  let sequence = 0;
  let intervalId;

  return {
    connect() {
      console.log(`connect → ${roomId}`);
      intervalId = window.setInterval(() => {
        sequence += 1;
        onMessage(`${roomId} message #${sequence}`);
      }, 1600);
    },
    disconnect() {
      console.log(`disconnect → ${roomId}`);
      window.clearInterval(intervalId);
    },
  };
}

function ChatRoom() {
  const [roomId, setRoomId] = useState('general');
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([]);

  const onMessage = useEffectEvent(message => {
    setMessages(items => [...items.slice(-4), message]);

    if (!isMuted) {
      console.log('🔔 sound for:', message);
    }
  });

  useEffect(() => {
    const connection = createConnection(roomId, onMessage);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <main>
      <p>RE-KP129</p>
      <h1>useEffectEvent</h1>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
        </select>
      </label>
      <button type="button" onClick={() => setIsMuted(value => !value)}>
        {isMuted ? '取消静音' : '静音'}
      </button>
      <p>当前声音：{isMuted ? 'muted' : 'on'}</p>
      <ul>
        {messages.map(message => (
          <li key={message}>{message}</li>
        ))}
      </ul>
      <p>切换静音后观察 Console：连接不会重启，但下一条消息会读取最新静音状态。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatRoom />
  </StrictMode>,
);
