import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const serverUrl = 'https://chat.example.test';

function createConnection(label, options) {
  return {
    connect() {
      console.log(`[${label}] connect`, options);
    },
    disconnect() {
      console.log(`[${label}] disconnect`, options);
    },
  };
}

function BadChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return { serverUrl, roomId };
  }

  useEffect(() => {
    const connection = createConnection('bad', createOptions());
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]);

  return (
    <section>
      <h2>Bad：依赖每次 Render 都新建的函数</h2>
      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="输入文字并观察 Console"
      />
    </section>
  );
}

function GoodChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return { serverUrl, roomId };
    }

    const connection = createConnection('good', createOptions());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <section>
      <h2>Good：函数移入 Effect，只依赖 roomId</h2>
      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="输入文字不会重连"
      />
    </section>
  );
}

function App() {
  const [roomId, setRoomId] = useState('general');

  return (
    <main>
      <p>RE-KP128</p>
      <h1>函数依赖导致重复执行</h1>
      <label>
        房间：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
        </select>
      </label>
      <BadChatRoom roomId={roomId} />
      <GoodChatRoom roomId={roomId} />
      <p>打开 Console，对比输入文字时 bad / good 的 connect 日志。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
