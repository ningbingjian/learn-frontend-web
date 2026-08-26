import React from 'react';
import { createRoot } from 'react-dom/client';

function Panel({ header, actions, children, footer }) {
  return (
    <section>
      <header>
        <div>{header}</div>
        <div>{actions}</div>
      </header>
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

function OrderSummary() {
  return (
    <dl>
      <div><dt>金额</dt><dd>¥499</dd></div>
      <div><dt>状态</dt><dd>待发货</dd></div>
    </dl>
  );
}

function App() {
  return (
    <main>
      <h1>Slot-style Component API</h1>
      <Panel
        header={<h2>订单 #A1024</h2>}
        actions={<button type="button">导出订单</button>}
        footer={<small>数据更新时间：10:30</small>}
      >
        <OrderSummary />
      </Panel>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
