import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

let nextConnectionId = 1;

function createConnection() {
  const id = nextConnectionId++;

  return {
    connect() {
      console.log(`connect #${id}`);
    },
    disconnect() {
      console.log(`disconnect #${id}`);
    },
  };
}

function Demo() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <main>
      <h1>为什么开发环境看起来执行两次</h1>
      <p>打开 Console，观察 StrictMode 的开发期 setup / cleanup 压力测试。</p>
      <p>不要用 didRun Ref 跳过第二次 setup；要让 cleanup 真正对称。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
