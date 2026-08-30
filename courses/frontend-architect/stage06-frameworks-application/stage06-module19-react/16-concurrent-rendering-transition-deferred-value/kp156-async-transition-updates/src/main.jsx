import { StrictMode, useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

function savePrice(price) {
  return new Promise(resolve => {
    setTimeout(() => resolve(price), 800);
  });
}

function App() {
  const [draftPrice, setDraftPrice] = useState('99');
  const [savedPrice, setSavedPrice] = useState(99);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    const nextPrice = Number(draftPrice);
    if (!Number.isFinite(nextPrice) || nextPrice < 0) return;

    startTransition(async () => {
      const serverPrice = await savePrice(nextPrice);

      startTransition(() => {
        setSavedPrice(serverPrice);
      });
    });
  }

  return (
    <main>
      <h1>Transition 中的异步更新</h1>
      <label>
        草稿价格：
        <input
          value={draftPrice}
          onChange={event => setDraftPrice(event.target.value)}
        />
      </label>{' '}
      <button onClick={handleSave} disabled={isPending}>
        {isPending ? '保存中…' : '保存'}
      </button>
      <p>已保存价格：¥{savedPrice}</p>
      <p>草稿输入仍是普通 Urgent Update。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
