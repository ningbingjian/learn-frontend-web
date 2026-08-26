import React from 'react';
import { createRoot } from 'react-dom/client';

const craStatus = {
  deprecatedForNewApps: true,
  maintenanceMode: true,
  instantlyBroken: false,
};

const scenarios = [
  {
    name: 'New production app',
    recommendation: 'Evaluate a recommended React Framework first',
  },
  {
    name: 'React Core learning app',
    recommendation: 'Use a Build Tool such as Vite',
  },
  {
    name: 'Existing CRA app',
    recommendation: 'Keep it running, audit dependencies, plan migration',
  },
];

function App() {
  return (
    <main>
      <h1>Create React App 状态</h1>
      <p>Deprecated for new apps: {String(craStatus.deprecatedForNewApps)}</p>
      <p>Maintenance mode: {String(craStatus.maintenanceMode)}</p>
      <p>Instantly broken: {String(craStatus.instantlyBroken)}</p>

      <h2>不同项目的下一步</h2>
      <ul>
        {scenarios.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <p>{item.recommendation}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
