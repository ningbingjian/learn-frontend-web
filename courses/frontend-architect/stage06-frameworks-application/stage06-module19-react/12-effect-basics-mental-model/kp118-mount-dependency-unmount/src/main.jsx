import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function ChatRoom() {
  const [roomId, setRoomId] = useState('general');

  useEffect(() => {
    console.log(`setup room: ${roomId}`);
    return () => {
      console.log(`cleanup room: ${roomId}`);
    };
  }, [roomId]);

  return (
    <section>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
        </select>
      </label>
      <p>当前：{roomId}</p>
    </section>
  );
}

function App() {
  const [showChat, setShowChat] = useState(true);

  return (
    <main>
      <h1>挂载、依赖变化与卸载</h1>
      <button onClick={() => setShowChat(value => !value)}>
        {showChat ? '卸载 ChatRoom' : '挂载 ChatRoom'}
      </button>
      {showChat && <ChatRoom />}
      <p>打开 Console 观察完整时间线。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
