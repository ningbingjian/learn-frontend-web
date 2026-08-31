import { Component, StrictMode, useActionState } from 'react';
import { createRoot } from 'react-dom/client';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ActionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <section role="alert">
          <h2>Unexpected Action Error</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()}>重新加载实验</button>
        </section>
      );
    }

    return this.props.children;
  }
}

function PurchaseForm() {
  const [state, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const code = String(formData.get('code') ?? '').trim();
      await delay(600);

      if (!code) {
        return { kind: 'error', message: '请输入商品编码。' };
      }

      if (code.toLowerCase() === 'crash') {
        throw new Error('模拟未知 Action 异常');
      }

      return {
        kind: 'success',
        message: `商品 ${code} 已加入订单。`,
      };
    },
    { kind: 'idle', message: '' },
  );

  return (
    <form action={submitAction}>
      <label>
        商品编码：
        <input name="code" placeholder="A-100 / crash" />
      </label>
      <button disabled={isPending} type="submit">
        {isPending ? '提交中…' : '提交订单'}
      </button>
      {state.message && (
        <p role={state.kind === 'error' ? 'alert' : 'status'}>{state.message}</p>
      )}
    </form>
  );
}

function App() {
  return (
    <main>
      <h1>Action 错误处理</h1>
      <ActionErrorBoundary>
        <PurchaseForm />
      </ActionErrorBoundary>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
