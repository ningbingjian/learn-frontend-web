import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');
  const isSending = status === 'sending';

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    setStatus('sending');
    await wait(800);
    setStatus('sent');
  }

  function handleReset() {
    setText('');
    setStatus('typing');
  }

  if (status === 'sent') {
    return (
      <main>
        <h1>有限状态思维</h1>
        <p>发送成功：{text}</p>
        <button type="button" onClick={handleReset}>再写一条</button>
      </main>
    );
  }

  return (
    <main>
      <h1>有限状态思维</h1>
      <p>当前状态：{status}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          disabled={isSending}
          onChange={event => setText(event.target.value)}
          placeholder="写下反馈"
        />
        <br />
        <button type="submit" disabled={isSending || !text.trim()}>
          {isSending ? '发送中…' : '发送'}
        </button>
      </form>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeedbackForm />
  </StrictMode>,
);
