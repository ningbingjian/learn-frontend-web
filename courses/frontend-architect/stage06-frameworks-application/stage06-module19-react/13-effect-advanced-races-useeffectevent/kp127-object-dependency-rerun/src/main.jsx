import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

let nextConnectionId = 1;

function createConnection(label, options) {
  const id = nextConnectionId++;

  return {
    connect() {
      console.log(
        `[${label}] connect #${id}: ${options.serverUrl}/${options.roomId}`,
      );
    },
    disconnect() {
      console.log(`[${label}] disconnect #${id}`);
    },
  };
}

function UnstableChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  const options = {
    serverUrl: 'https://localhost:1234',
    roomId,
  };

  useEffect(() => {
    const connection = createConnection('unstable', options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return (
    <section>
      <h2>不稳定对象依赖</h2>
      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="逐字输入并观察 Console"
      />
    </section>
  );
}

function FixedChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: 'https://localhost:1234',
      roomId,
    };

    const connection = createConnection('fixed', options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <section>
      <h2>固定为原始 Reactive Value</h2>
      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="逐字输入并观察 Console"
      />
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>对象依赖导致重复执行</h1>
      <p>打开 Console，对比两个输入框导致的 connect/disconnect 日志。</p>
      <UnstableChatRoom roomId="general" />
      <FixedChatRoom roomId="general" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
