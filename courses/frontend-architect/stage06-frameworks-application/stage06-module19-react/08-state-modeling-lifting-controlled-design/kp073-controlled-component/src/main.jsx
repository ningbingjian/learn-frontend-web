import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Toggle({ label, checked, onCheckedChange }) {
  return (
    <button onClick={() => onCheckedChange(!checked)}>
      {label}: {checked ? 'ON' : 'OFF'}
    </button>
  );
}

function App() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  function enableAll() {
    setEmailEnabled(true);
    setSmsEnabled(true);
  }

  function disableAll() {
    setEmailEnabled(false);
    setSmsEnabled(false);
  }

  return (
    <main>
      <h1>RE-KP073：受控组件</h1>
      <div>
        <Toggle
          label="Email"
          checked={emailEnabled}
          onCheckedChange={setEmailEnabled}
        />
        <Toggle
          label="SMS"
          checked={smsEnabled}
          onCheckedChange={setSmsEnabled}
        />
      </div>
      <p>
        <button onClick={enableAll}>全部开启</button>{' '}
        <button onClick={disableAll}>全部关闭</button>
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
