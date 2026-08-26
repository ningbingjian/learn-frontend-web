import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const modeFacts = [
  ['MODE', import.meta.env.MODE],
  ['DEV', String(import.meta.env.DEV)],
  ['PROD', String(import.meta.env.PROD)],
];

function App() {
  return (
    <main>
      <p>RE-KP008</p>
      <h1>开发模式与生产模式</h1>
      <ul>
        {modeFacts.map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>

      {import.meta.env.DEV ? (
        <p data-mode="development">当前是开发环境：保留快速反馈与开发期检查。</p>
      ) : (
        <p data-mode="production">当前是生产构建：开发专用分支可被静态消除。</p>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
