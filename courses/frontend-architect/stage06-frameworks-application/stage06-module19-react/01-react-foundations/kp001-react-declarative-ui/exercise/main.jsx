import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const order = {
  id: 'ORD-2026-0825',
  status: 'processing',
};

function OrderStatusCard() {
  // TODO 1：根据 order.status 计算 ready。
  const ready = false;

  return (
    <main className="page-shell">
      {/* TODO 2：让卡片 class 随 ready 切换。 */}
      <section className="order-card is-processing">
        <p className="eyebrow">Order {order.id}</p>

        {/* TODO 3：状态文字随 ready 切换。 */}
        <strong className="status-label">Processing</strong>

        {/* TODO 4：标题随 ready 切换。 */}
        <h1>Preparing order</h1>

        {/* TODO 5：说明文字随 ready 切换。 */}
        <p className="description">Warehouse is preparing the package.</p>

        {/* TODO 6：只有 ready 时按钮才可用。 */}
        <button type="button" disabled>
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
