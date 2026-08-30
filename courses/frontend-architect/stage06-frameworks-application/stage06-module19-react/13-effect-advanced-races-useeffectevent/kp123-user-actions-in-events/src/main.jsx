import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function submitPurchase(orderId, amount) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ orderId, amount });
    }, 700);
  });
}

function PurchasePanel() {
  const orderId = 'ORDER-2026-001';
  const amount = 499;
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('尚未提交');

  async function handlePurchase() {
    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setMessage('正在提交购买请求…');

    const result = await submitPurchase(orderId, amount);

    setStatus('success');
    setMessage(`购买成功：${result.orderId}，金额 ¥${result.amount}`);
  }

  return (
    <main>
      <h1>在事件中处理用户动作</h1>
      <p>订单：{orderId}</p>
      <p>金额：¥{amount}</p>

      <label>
        备注：
        <input
          value={note}
          onChange={event => setNote(event.target.value)}
          placeholder="输入备注只会触发 Render"
        />
      </label>

      <p>当前备注：{note || '无'}</p>
      <button disabled={status === 'submitting'} onClick={handlePurchase}>
        {status === 'submitting' ? '提交中…' : '确认购买'}
      </button>
      <p>{message}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PurchasePanel />
  </StrictMode>,
);
