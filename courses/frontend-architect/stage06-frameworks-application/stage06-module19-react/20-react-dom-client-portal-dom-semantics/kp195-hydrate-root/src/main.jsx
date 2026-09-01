import { useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>hydrateRoot</h1>
      <p>Count：{count}</p>
      <button onClick={() => setCount(value => value + 1)}>+1</button>
    </main>
  );
}

const container = document.getElementById('root');
const status = document.getElementById('status');

const serverHtml = renderToString(<Counter />);
container.innerHTML = serverHtml;
const serverButton = container.querySelector('button');

hydrateRoot(container, <Counter />);

const hydratedButton = container.querySelector('button');
status.textContent = serverButton === hydratedButton
  ? 'Hydration 复用了现有 DOM：按钮节点身份保持不变。'
  : 'DOM 节点发生了替换。';
