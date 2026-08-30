import { useId, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

function HydratedForm() {
  const id = useId();
  const inputId = `${id}-name`;
  const hintId = `${id}-hint`;
  const [submits, setSubmits] = useState(0);

  return (
    <main>
      <p>RE-KP135</p>
      <h1>useId 与 SSR 一致性</h1>
      <label htmlFor={inputId}>姓名：</label>
      <input id={inputId} aria-describedby={hintId} />
      <p id={hintId}>当前 ID 前缀由 server / client 同步配置。</p>
      <button type="button" onClick={() => setSubmits(value => value + 1)}>
        提交计数 +1
      </button>
      <p>Hydration 后交互计数：{submits}</p>
      <small>input id: {inputId}</small>
    </main>
  );
}

const root = document.getElementById('root');
const serverHtml = renderToString(<HydratedForm />, {
  identifierPrefix: 'kp135-',
});

document.getElementById('server-html').textContent = serverHtml;
root.innerHTML = serverHtml;

hydrateRoot(root, <HydratedForm />, {
  identifierPrefix: 'kp135-',
});
