import React from 'react';
import { createRoot } from 'react-dom/client';

function detectChannel(version) {
  if (version.includes('experimental')) {
    return 'Experimental';
  }

  if (version.includes('canary')) {
    return 'Canary';
  }

  return 'Latest / Stable';
}

const samples = [
  React.version,
  '19.2.8',
  '19.3.0-canary-example-20260801',
  '0.0.0-experimental-example-20260801',
];

function App() {
  return (
    <main>
      <h1>React 发布渠道分类参考答案</h1>
      <ul>
        {samples.map((version, index) => (
          <li key={`${version}-${index}`}>
            {version} → {detectChannel(version)}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
