import { StrictMode, useActionState } from 'react';
import { createRoot } from 'react-dom/client';

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function submitOrder(previousState, formData) {
  const product = String(formData.get('product') ?? '').trim();
  await wait(1200);
  return { count: previousState.count + 1, product };
}

function App() {
  const [state, submitAction, isPending] = useActionState(
    submitOrder,
    { count: 0, product: '' },
  );

  return (
    <main>
      <h1>Action pending 状态</h1>
      <form action={submitAction} aria-busy={isPending}>
        <label>
          商品
          <input name="product" defaultValue="React Book" disabled={isPending} />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? '提交中…' : '提交订单'}
        </button>
      </form>
      <p role="status">
        {isPending ? 'Action 正在执行' : `已完成 ${state.count} 次提交`}
      </p>
      <p>最近商品：{state.product || '暂无'}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
