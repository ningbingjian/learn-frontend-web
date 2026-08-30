import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    console.log('setup resize listener');
    window.addEventListener('resize', handleResize);

    return () => {
      console.log('cleanup resize listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <p>窗口宽度：{width}px</p>;
}

function App() {
  return (
    <main>
      <h1>StrictMode 下 Effect 重新执行</h1>
      <WindowWidth />
      <p>开发模式打开 Console，观察额外 setup + cleanup 检查。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
