import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

function Article({ origin }) {
  return (
    <main>
      <p>RE-KP201</p>
      <h1>CSR 与 SSR 的差异</h1>
      <h2>{origin}</h2>
      <p>这段内容由同一个 React Component 描述。</p>
    </main>
  );
}

const csrRoot = document.getElementById('root');
document.getElementById('csr-before').textContent = csrRoot.innerHTML || '(empty)';

const serverHtml = renderToString(<Article origin="SSR snapshot" />);
document.getElementById('ssr-html').textContent = serverHtml;

createRoot(csrRoot).render(<Article origin="CSR after JavaScript" />);
