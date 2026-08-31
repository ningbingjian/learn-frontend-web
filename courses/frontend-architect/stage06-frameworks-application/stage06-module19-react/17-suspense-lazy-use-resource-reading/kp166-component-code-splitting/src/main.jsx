import { lazy, StrictMode, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';

function delayImport(promise, milliseconds) {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, milliseconds)),
  ]).then(([module]) => module);
}

const AnalyticsPanel = lazy(() =>
  delayImport(import('./panels/AnalyticsPanel.jsx'), 900),
);

const SettingsPanel = lazy(() =>
  delayImport(import('./panels/SettingsPanel.jsx'), 1300),
);

function App() {
  const [tab, setTab] = useState('analytics');

  return (
    <main>
      <h1>组件级代码分割</h1>
      <p>
        <button type="button" onClick={() => setTab('analytics')}>
          Analytics
        </button>{' '}
        <button type="button" onClick={() => setTab('settings')}>
          Settings
        </button>
      </p>

      <Suspense fallback={<p>{tab} panel chunk loading…</p>}>
        {tab === 'analytics' ? <AnalyticsPanel /> : <SettingsPanel />}
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
