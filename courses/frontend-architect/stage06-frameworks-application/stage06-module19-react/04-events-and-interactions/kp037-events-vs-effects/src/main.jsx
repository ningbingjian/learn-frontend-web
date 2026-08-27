import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [product, setProduct] = useState('Keyboard');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `当前商品：${product}`;

    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  function handleProductChange(event) {
    setProduct(event.target.value);
  }

  function handleBuy() {
    console.log(`buy requested: ${product}`);
  }

  return (
    <main>
      <h1>Event vs Effect</h1>
      <label>
        当前商品
        <select value={product} onChange={handleProductChange}>
          <option value="Keyboard">Keyboard</option>
          <option value="Monitor">Monitor</option>
          <option value="Mouse">Mouse</option>
        </select>
      </label>
      <p>页面标题会和 {product} 保持同步。</p>
      <button type="button" onClick={handleBuy}>
        购买 {product}
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
