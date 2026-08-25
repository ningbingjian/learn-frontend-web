import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function ServiceStatusCard() {
  const [online, setOnline] = useState(true);

  return (
    <main className="page-shell">
      <section
        className={`status-card ${online ? 'is-online' : 'is-offline'}`}
        aria-live="polite"
      >
        <p className="eyebrow">Payment API</p>

        <div className="status-row">
          <span className="status-dot" aria-hidden="true" />
          <strong>{online ? 'Online' : 'Offline'}</strong>
        </div>

        <h1>
          {online
            ? 'Service is accepting requests'
            : 'Service is unavailable'}
        </h1>

        <p className="description">
          {online
            ? 'Orders can continue to submit payment requests.'
            : 'New payment requests should be paused until recovery.'}
        </p>

        <button
          type="button"
          onClick={() => setOnline((current) => !current)}
        >
          Switch to {online ? 'offline' : 'online'}
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServiceStatusCard />
  </StrictMode>,
);
