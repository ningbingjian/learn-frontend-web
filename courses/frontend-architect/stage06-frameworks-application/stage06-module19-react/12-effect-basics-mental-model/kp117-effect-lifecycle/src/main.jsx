import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function createConnection(roomId) {
  return {
    connect() {
      console.log(`connect: ${roomId}`);
    },
    disconnect() {
      console.log(`disconnect: ${roomId}`);
    },
  };
}

function ChatRoom() {
  const [roomId, setRoomId] = useState('general');

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]);

  return (
    <main>
      <h1>Effect 生命周期</h1>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
          <option value="travel">travel</option>
        </select>
      </label>
      <p>当前房间：{roomId}</p>
      <p>打开 Console，切换房间观察 disconnect → connect。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatRoom />
  </StrictMode>,
);
