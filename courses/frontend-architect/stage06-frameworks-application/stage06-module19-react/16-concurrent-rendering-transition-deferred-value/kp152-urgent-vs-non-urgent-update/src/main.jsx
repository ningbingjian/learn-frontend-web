import { StrictMode, useState } from 'react';
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
    setListQuery(nextValue);
  }

  return (
    <main>
      <h1>Urgent Update 与 Non-urgent Update</h1>
      <label>
        搜索：
        <input value={inputValue} onChange={handleChange} />
      </label>
      <p>输入值（Urgent）：{inputValue || '空'}</p>
      <p>列表查询（可视为 Non-urgent）：{listQuery || '空'}</p>
      <p>当前基线：两类更新仍然同步执行，输入会被昂贵列表 Render 拖慢。</p>
      <SlowProductList query={listQuery} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
