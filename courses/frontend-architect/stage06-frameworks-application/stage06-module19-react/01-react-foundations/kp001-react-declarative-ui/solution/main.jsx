import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const order = {
  id: 'ORD-2026-0825',
  status: 'processing',
};

function OrderStatusCard() {
  const ready = order.status === 'ready';

  return (
    <main className="page-shell">
      <section className={`order-card ${ready ? 'is-ready' : 'is-processing'}`}>
        <p className="eyebrow">Order {order.id}</p>
        <strong className="status-label">
          {ready ? 'Ready' : 'Processing'}
        </strong>
        <h1>{ready ? 'Ready to ship' : 'Preparing order'}</h1>
        <p className="description">
          {ready
            ? 'The package is complete and can leave the warehouse.'
            : 'Warehouse is preparing the package.'}
        </p>
        <button type="button" disabled={!ready}>
          Ship now
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderStatusCard />
  </StrictMode>,
);
