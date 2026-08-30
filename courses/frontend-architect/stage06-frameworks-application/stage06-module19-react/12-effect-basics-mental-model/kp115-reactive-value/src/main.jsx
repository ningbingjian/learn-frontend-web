import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const protocol = 'wss';
const hostByRegion = {
  'us-east': 'us.chat.example.com',
  'eu-west': 'eu.chat.example.com',
};

function ConnectionPreview({ roomId }) {
  const [region, setRegion] = useState('us-east');
  const serverHost = hostByRegion[region];

  useEffect(() => {
    const connectionUrl = `${protocol}://${serverHost}/${roomId}`;
    document.title = connectionUrl;
  }, [roomId, serverHost]);

  return (
    <section>
      <label>
        Region：
        <select value={region} onChange={event => setRegion(event.target.value)}>
          <option value="us-east">us-east</option>
          <option value="eu-west">eu-west</option>
        </select>
      </label>
      <p>Server：{serverHost}</p>
      <p>Room：{roomId}</p>
    </section>
  );
}

function App() {
  const [roomId, setRoomId] = useState('general');

  return (
    <main>
      <h1>Reactive Value</h1>
      <label>
        Room：
        <select value={roomId} onChange={event => setRoomId(event.target.value)}>
          <option value="general">general</option>
          <option value="music">music</option>
        </select>
      </label>
      <ConnectionPreview roomId={roomId} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
