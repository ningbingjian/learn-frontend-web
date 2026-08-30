import { StrictMode, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';

let snapshot = Object.freeze({
  version: 0,
  items: Object.freeze(['React']),
});
const listeners = new Set();

function subscribe(listener) {
  console.log('subscribe');
  listeners.add(listener);
  return () => {
    console.log('unsubscribe');
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function addItem(label) {
  snapshot = Object.freeze({
    version: snapshot.version + 1,
    items: Object.freeze([...snapshot.items, label]),
  });
  listeners.forEach(listener => listener());
}

function StoreViewer() {
  const current = useSyncExternalStore(subscribe, getSnapshot);
  const [renderTick, setRenderTick] = useState(0);

  return (
    <main>
      <p>RE-KP137</p>
      <h1>subscribe / getSnapshot 契约</h1>
      <p>snapshot version: {current.version}</p>
      <p>unrelated render tick: {renderTick}</p>
      <p>same reference now: {String(Object.is(getSnapshot(), getSnapshot()))}</p>
      <button type="button" onClick={() => setRenderTick(value => value + 1)}>
        unrelated render
      </button>
      <button type="button" onClick={() => addItem(`Item-${current.version + 1}`)}>
        external store add item
      </button>
      <ul>
        {current.items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>打开 Console 也可以观察 StrictMode 下的 subscribe / unsubscribe 检查。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreViewer />
  </StrictMode>,
);
