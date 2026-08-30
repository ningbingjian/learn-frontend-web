import { StrictMode, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';

let snapshot = {
  theme: 'light',
  compact: false,
};

const listeners = new Set();

const preferencesStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return snapshot;
  },
  setTheme(theme) {
    snapshot = { ...snapshot, theme };
    listeners.forEach(listener => listener());
  },
  toggleCompact() {
    snapshot = { ...snapshot, compact: !snapshot.compact };
    listeners.forEach(listener => listener());
  },
};

function usePreferences() {
  return useSyncExternalStore(
    preferencesStore.subscribe,
    preferencesStore.getSnapshot,
  );
}

function PreferencesPanel() {
  const preferences = usePreferences();

  return (
    <section>
      <h2>External Store</h2>
      <button
        onClick={() => preferencesStore.setTheme(
          preferences.theme === 'light' ? 'dark' : 'light',
        )}
      >
        Theme: {preferences.theme}
      </button>{' '}
      <button onClick={() => preferencesStore.toggleCompact()}>
        Compact: {preferences.compact ? 'ON' : 'OFF'}
      </button>
    </section>
  );
}

function PreferencesSummary() {
  const preferences = usePreferences();
  return <p>Summary: {preferences.theme} / {preferences.compact ? 'compact' : 'comfortable'}</p>;
}

function App() {
  const [draftName, setDraftName] = useState('Ada');

  return (
    <main>
      <h1>RE-KP140：外部 Store 集成原则</h1>
      <label>
        Local draft：
        <input value={draftName} onChange={event => setDraftName(event.target.value)} />
      </label>
      <p>本地草稿：{draftName}</p>
      <PreferencesPanel />
      <PreferencesSummary />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
