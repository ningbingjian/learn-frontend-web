import { useEffect, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

let serverButton = null;

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const hydratedButton = document.querySelector('[data-role="counter"]');
    document.getElementById('hydration-result').textContent =
      `same button DOM node: ${String(Object.is(serverButton, hydratedButton))}`;
  }, []);

  return (
    <main>
      <p>RE-KP202</p>
      <h1>Hydration：复用 HTML 并连接 React</h1>
      <button data-role="counter" type="button" onClick={() => setCount(value => value + 1)}>
        count: {count}
      </button>
    </main>
  );
}

const root = document.getElementById('root');
const serverHtml = renderToString(<App />);
document.getElementById('server-html').textContent = serverHtml;
root.innerHTML = serverHtml;
serverButton = root.querySelector('[data-role="counter"]');

hydrateRoot(root, <App />);
