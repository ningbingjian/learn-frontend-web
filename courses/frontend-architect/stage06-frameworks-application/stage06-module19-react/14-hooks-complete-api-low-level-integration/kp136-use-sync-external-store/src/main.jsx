import { StrictMode, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';

let currentSnapshot = Object.freeze({ count: 0 });
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentSnapshot;
}

function publish(nextCount) {
  currentSnapshot = Object.freeze({ count: nextCount });
  listeners.forEach(listener => listener());
}

const counterStore = {
  subscribe,
  getSnapshot,
  increment() {
    publish(currentSnapshot.count + 1);
  },
  reset() {
    publish(0);
  },
};

function CounterConsumer({ label }) {
  const snapshot = useSyncExternalStore(counterStore.subscribe, counterStore.getSnapshot);

  return (
    <section>
      <h2>{label}</h2>
      <p>external count: {snapshot.count}</p>
    </section>
  );
}

function App() {
  return (
    <main>
      <p>RE-KP136</p>
      <h1>useSyncExternalStore</h1>
      <button type="button" onClick={() => counterStore.increment()}>
        external store +1
      </button>
      <button type="button" onClick={() => counterStore.reset()}>
        reset
      </button>
      <CounterConsumer label="Consumer A" />
      <CounterConsumer label="Consumer B" />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
