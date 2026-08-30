import { useSyncExternalStore } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

const SERVER_SNAPSHOT = Object.freeze({
  status: 'ssr-bootstrap',
  version: 0,
});

let clientSnapshot = Object.freeze({
  status: 'client-live',
  version: 1,
});
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return clientSnapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function updateClientStore() {
  clientSnapshot = Object.freeze({
    status: clientSnapshot.status === 'client-live' ? 'client-updated' : 'client-live',
    version: clientSnapshot.version + 1,
  });
  listeners.forEach(listener => listener());
}

function StatusPanel() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <main>
      <p>RE-KP138</p>
      <h1>getServerSnapshot 与 SSR</h1>
      <p>status: {snapshot.status}</p>
      <p>version: {snapshot.version}</p>
      <button type="button" onClick={updateClientStore}>
        update external store
      </button>
      <p>服务端与 hydration 初始值来自同一个 getServerSnapshot。</p>
    </main>
  );
}

const root = document.getElementById('root');
const serverHtml = renderToString(<StatusPanel />);

document.getElementById('server-html').textContent = serverHtml;
root.innerHTML = serverHtml;
hydrateRoot(root, <StatusPanel />);
