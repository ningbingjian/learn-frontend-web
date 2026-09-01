import { createPortal, flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

const apiRows = [
  ['react-dom', 'createPortal', typeof createPortal],
  ['react-dom', 'flushSync', typeof flushSync],
  ['react-dom/client', 'createRoot', typeof createRoot],
];

function App() {
  return (
    <main>
      <h1>react-dom 与 react-dom/client</h1>
      <table>
        <thead>
          <tr>
            <th>入口</th>
            <th>API</th>
            <th>运行时类型</th>
          </tr>
        </thead>
        <tbody>
          {apiRows.map(([entry, api, type]) => (
            <tr key={api}>
              <td>{entry}</td>
              <td>{api}</td>
              <td>{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Root 初始化属于 react-dom/client；Portal、flushSync 属于 react-dom 的 Web DOM API。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
