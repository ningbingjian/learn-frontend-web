import { StrictMode, Suspense, use, useState } from 'react';
import { createRoot } from 'react-dom/client';

const PROFILES = {
  ada: { name: 'Ada Lovelace', role: 'Programmer' },
  grace: { name: 'Grace Hopper', role: 'Computer Scientist' },
};

const profileCache = new Map();

function loadProfile(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(PROFILES[id]), 1000);
  });
}

function getProfilePromise(id) {
  if (!profileCache.has(id)) {
    profileCache.set(id, loadProfile(id));
  }
  return profileCache.get(id);
}

function Profile({ profilePromise }) {
  const profile = use(profilePromise);

  return (
    <section>
      <h2>{profile.name}</h2>
      <p>{profile.role}</p>
    </section>
  );
}

function App() {
  const [userId, setUserId] = useState('ada');
  const profilePromise = getProfilePromise(userId);

  return (
    <main>
      <h1>use 读取 Promise</h1>
      <p>
        <button type="button" onClick={() => setUserId('ada')}>Ada</button>{' '}
        <button type="button" onClick={() => setUserId('grace')}>Grace</button>
      </p>

      <Suspense fallback={<p>Profile loading…</p>}>
        <Profile profilePromise={profilePromise} />
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
