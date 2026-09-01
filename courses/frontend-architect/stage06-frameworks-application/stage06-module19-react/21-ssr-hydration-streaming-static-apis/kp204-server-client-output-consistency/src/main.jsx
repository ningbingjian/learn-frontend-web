import { useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

const serverData = Object.freeze({
  productName: 'React 19.2 课程',
  inventory: 7,
});

function ProductPanel({ data }) {
  const [clicks, setClicks] = useState(0);

  return (
    <main>
      <p>RE-KP204</p>
      <h1>服务端与客户端输出一致性</h1>
      <p>product: {data.productName}</p>
      <p>inventory: {data.inventory}</p>
      <button type="button" onClick={() => setClicks(value => value + 1)}>
        hydrated clicks: {clicks}
      </button>
    </main>
  );
}

const root = document.getElementById('root');
const bootstrapDataElement = document.getElementById('bootstrap-data');
const serverHtml = renderToString(<ProductPanel data={serverData} />);

document.getElementById('server-data').textContent = JSON.stringify(serverData, null, 2);
bootstrapDataElement.textContent = JSON.stringify(serverData);
root.innerHTML = serverHtml;

const clientInitialData = JSON.parse(bootstrapDataElement.textContent);
document.getElementById('client-data').textContent = JSON.stringify(clientInitialData, null, 2);

hydrateRoot(root, <ProductPanel data={clientInitialData} />, {
  onRecoverableError(error) {
    document.getElementById('hydration-error').textContent =
      `Recoverable hydration error: ${error.message}`;
  },
});
