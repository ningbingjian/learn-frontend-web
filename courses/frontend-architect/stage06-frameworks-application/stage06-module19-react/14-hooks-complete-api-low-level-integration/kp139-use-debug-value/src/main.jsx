import { StrictMode, useDebugValue, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';

let connectionStatus = 'online';
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return connectionStatus;
}

function toggleConnection() {
  connectionStatus = connectionStatus === 'online' ? 'offline' : 'online';
  listeners.forEach(listener => listener());
}

function useConnectionStatus() {
  const status = useSyncExternalStore(subscribe, getSnapshot);

  useDebugValue(status, value => `Connection: ${value}`);

  return status;
}

function ConnectionPanel() {
  const status = useConnectionStatus();

  return (
    <main>
      <p>RE-KP139</p>
      <h1>useDebugValue</h1>
      <p>页面业务值：{status}</p>
      <button type="button" onClick={toggleConnection}>
        toggle external connection
      </button>
      <p>打开 React DevTools 检查 ConnectionPanel，观察 ConnectionStatus Hook 的 debug value。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectionPanel />
  </StrictMode>,
);
