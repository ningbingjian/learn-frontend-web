import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function readOnlineStatus() {
  return navigator.onLine;
}

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(readOnlineStatus);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

function StatusPanel() {
  const isOnline = useOnlineStatus();

  return (
    <main>
      <h1>自定义 Hook 中的 Effect</h1>
      <p>当前网络状态：{isOnline ? '在线' : '离线'}</p>
      <p>可在 DevTools Network 中切换 Offline 观察变化。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StatusPanel />
  </StrictMode>,
);
