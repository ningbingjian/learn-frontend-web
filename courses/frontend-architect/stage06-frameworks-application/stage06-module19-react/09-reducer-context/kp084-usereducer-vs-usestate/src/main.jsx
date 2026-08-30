import { StrictMode, useReducer, useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialOrder = {
  quantity: 1,
  shipping: 'standard',
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'quantity_incremented':
      return { ...state, quantity: state.quantity + 1 };
    case 'quantity_decremented':
      return { ...state, quantity: Math.max(1, state.quantity - 1) };
    case 'shipping_selected':
      return { ...state, shipping: action.shipping };
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function SimplePanel() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <h2>简单局部值：useState</h2>
      <button onClick={() => setOpen(current => !current)}>
        {open ? '收起' : '展开'}
      </button>
      {open && <p>这里只有一个独立 Boolean。</p>}
    </section>
  );
}

function OrderEditor() {
  const [order, dispatch] = useReducer(orderReducer, initialOrder);
  const shippingFee = order.shipping === 'express' ? 30 : 10;
  const total = order.quantity * 99 + shippingFee;

  return (
    <section>
      <h2>关联状态迁移：useReducer</h2>
      <p>数量：{order.quantity}</p>
      <button onClick={() => dispatch({ type: 'quantity_decremented' })}>-1</button>{' '}
      <button onClick={() => dispatch({ type: 'quantity_incremented' })}>+1</button>
      <p>
        配送：
        <select
          value={order.shipping}
          onChange={event =>
            dispatch({ type: 'shipping_selected', shipping: event.target.value })
          }
        >
          <option value="standard">标准</option>
          <option value="express">加急</option>
        </select>
      </p>
      <strong>总价：¥{total}</strong>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>useState vs useReducer</h1>
      <SimplePanel />
      <OrderEditor />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
