import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [profile, setProfile] = useState({
    name: 'Ada',
    address: {
      city: 'London',
      country: 'UK'
    }
  });

  function handleNameChange(event) {
    setProfile({
      ...profile,
      name: event.target.value
    });
  }

  function handleCityChange(event) {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        city: event.target.value
      }
    });
  }

  function handleCountryChange(event) {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        country: event.target.value
      }
    });
  }

  return (
    <main>
      <h1>嵌套 State 更新</h1>
      <label>
        Name
        <input value={profile.name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        City
        <input value={profile.address.city} onChange={handleCityChange} />
      </label>
      <br />
      <label>
        Country
        <input value={profile.address.country} onChange={handleCountryChange} />
      </label>

      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
