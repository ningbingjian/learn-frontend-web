import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

let badConnections = 0;
let goodConnections = 0;

function BadConnection() {
  const outputRef = useRef(null);

  useEffect(() => {
    badConnections += 1;
    outputRef.current.textContent = String(badConnections);
  }, []);

  return <p>缺 cleanup 的有效连接数：<output ref={outputRef}>0</output></p>;
}

function GoodConnection() {
  const outputRef = useRef(null);

  useEffect(() => {
    goodConnections += 1;
    outputRef.current.textContent = String(goodConnections);

    return () => {
      goodConnections -= 1;
      if (outputRef.current) {
        outputRef.current.textContent = String(goodConnections);
      }
    };
  }, []);

  return <p>有 cleanup 的有效连接数：<output ref={outputRef}>0</output></p>;
}

function App() {
  return (
    <main>
      <h1>StrictMode 的 Effect 压力测试</h1>
      <BadConnection />
      <GoodConnection />
      <p>开发环境会额外执行 setup/cleanup 检查；正确 cleanup 不应让有效资源持续累积。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
