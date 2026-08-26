import React from 'react';
import { createRoot } from 'react-dom/client';

const dashboardData = {
  account_name: 'Acme',
  total_orders: 128,
  pending_orders: 7,
};

function toDashboardViewModel(data) {
  return {
    title: `${data.account_name} Dashboard`,
    metrics: [
      { label: '总订单', value: data.total_orders },
      { label: '待处理', value: data.pending_orders },
    ],
  };
}

function DashboardView({ title, metrics }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {metrics.map((metric) => (
          <li key={metric.label}>
            {metric.label}: {metric.value}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DashboardPage({ data }) {
  const viewModel = toDashboardViewModel(data);
  return <DashboardView {...viewModel} />;
}

function App() {
  return (
    <main>
      <h1>Data / Presentational Boundary</h1>
      <DashboardPage data={dashboardData} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
