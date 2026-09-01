import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

function App({ label }) {
  return (
    <main>
      <p>RE-KP203</p>
      <h1>{label}</h1>
    </main>
  );
}

const root = document.getElementById('root');
const serverHtml = renderToString(<App label="Server snapshot" />);
document.getElementById('server-html').textContent = serverHtml;
root.innerHTML = serverHtml;

hydrateRoot(root, <App label="Client first render" />, {
  onRecoverableError(error) {
    document.getElementById('recoverable-error').textContent = error.message;
  },
});

setTimeout(() => {
  document.getElementById('client-dom').textContent = root.innerHTML;
}, 50);
