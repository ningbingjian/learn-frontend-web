import React from 'react';
import { createRoot } from 'react-dom/client';

const order = {
  id: 'A1024',
  status: '待发货',
  customer: { name: 'Ada', level: 'Gold' },
  pricing: { subtotal: 499, shipping: 0 },
};

function OrderHeader({ id, status }) {
  return (
    <header>
      <h2>订单 {id}</h2>
      <p>状态：{status}</p>
    </header>
  );
}

function CustomerSummary({ customer }) {
  return (
    <section>
      <h3>客户</h3>
      <p>{customer.name} · {customer.level}</p>
    </section>
  );
}

function PriceSummary({ pricing }) {
  const total = pricing.subtotal + pricing.shipping;

  return (
    <section>
      <h3>金额</h3>
      <p>小计：¥{pricing.subtotal}</p>
      <p>运费：¥{pricing.shipping}</p>
      <strong>合计：¥{total}</strong>
    </section>
  );
}

function OrderCard({ order: currentOrder }) {
  return (
    <article>
      <OrderHeader id={currentOrder.id} status={currentOrder.status} />
      <CustomerSummary customer={currentOrder.customer} />
      <PriceSummary pricing={currentOrder.pricing} />
    </article>
  );
}

function App() {
  return (
    <main>
      <h1>Component Splitting Boundary</h1>
      <OrderCard order={order} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
