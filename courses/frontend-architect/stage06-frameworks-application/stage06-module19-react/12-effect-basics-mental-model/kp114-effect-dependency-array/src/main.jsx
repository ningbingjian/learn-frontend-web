import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [roomId, setRoomId] = useState('general');
  const [serverUrl, setServerUrl] = useState('https://chat.example.com');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    document.title = `${serverUrl} / ${roomId}`;
  }, [roomId, serverUrl]);

  return (
    <main>
      <h1>Effect 依赖数组</h1>
      <label>
        Server URL：
        <input value={serverUrl} onChange={event => setServerUrl(event.target.value)} />
      </label>
      <br />
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
        </select>
      </label>
      <br />
      <label>
        无关草稿：
        <input value={draft} onChange={event => setDraft(event.target.value)} />
      </label>
      <p>Effect 读取 roomId 和 serverUrl，所以依赖为 [roomId, serverUrl]。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
