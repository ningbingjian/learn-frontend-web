import { StrictMode, startTransition, useState } from 'react';
import { createRoot } from 'react-dom/client';

const products = Array.from({ length: 1500 }, (_, index) => ({
  id: index + 1,
  name: `Product ${String(index + 1).padStart(4, '0')}`,
}));

function expensiveIncludes(text, query) {
  let checksum = 0;
  for (let index = 0; index < 1200; index += 1) {
    checksum += (index * 17) % 13;
  }
  return checksum >= 0 && text.toLowerCase().includes(query.toLowerCase());
}

function SlowProductList({ query }) {
  const visibleProducts = products
    .filter(product => expensiveIncludes(product.name, query))
    .slice(0, 30);

  return (
    <ul>
      {visibleProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [listQuery, setListQuery] = useState('');

  function handleChange(event) {
    const nextValue = event.target.value;
    setInputValue(nextValue);

    startTransition(() => {
      setListQuery(nextValue);
    });
  }

  return (
    <main>
      <h1>startTransition</h1>
      <label>
        搜索：
        <input value={inputValue} onChange={handleChange} />
      </label>
      <p>立即输入值：{inputValue || '空'}</p>
      <p>后台列表查询：{listQuery || '空'}</p>
      <SlowProductList query={listQuery} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
