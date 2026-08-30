import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Room({ roomId }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `聊天室：${roomId}`;

    return () => {
      document.title = previousTitle;
    };
  }, [roomId]);

  return <h2>当前房间：{roomId}</h2>;
}

function App() {
  const [roomId, setRoomId] = useState('general');

  return (
    <main>
      <h1>useEffect：同步外部系统</h1>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
          <option value="travel">travel</option>
        </select>
      </label>
      <Room roomId={roomId} />
      <p>切换房间，同时观察浏览器标签页标题。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
