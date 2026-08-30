import { StrictMode, useReducer } from 'react';
import { createRoot } from 'react-dom/client';

const initialOrder = {
  status: 'editing',
  quantity: 1,
  shipping: 'standard',
  coupon: null,
  error: '',
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'quantity_changed': {
      if (state.status !== 'editing') return state;
      const quantity = Math.max(1, Math.min(5, action.quantity));
      return { ...state, quantity };
    }
    case 'shipping_selected': {
      if (state.status !== 'editing') return state;
      return { ...state, shipping: action.shipping };
    }
    case 'coupon_applied': {
      if (state.status !== 'editing') return state;
      if (action.code === 'SAVE10') {
        return { ...state, coupon: 'SAVE10', error: '' };
      }
      return { ...state, coupon: null, error: '优惠码无效' };
    }
    case 'submitted':
      if (state.status !== 'editing') return state;
      return { ...state, status: 'submitted', error: '' };
    case 'edit_again':
      return { ...state, status: 'editing' };
    case 'reset':
      return initialOrder;
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function OrderApp() {
  const [order, dispatch] = useReducer(orderReducer, initialOrder);
  const locked = order.status !== 'editing';
  const shippingFee = order.shipping === 'express' ? 30 : 10;
  const subtotal = order.quantity * 99 + shippingFee;
  const total = order.coupon === 'SAVE10' ? Math.round(subtotal * 0.9) : subtotal;

  return (
    <main>
      <h1>复杂状态迁移集中管理</h1>
      <p>状态：{order.status}</p>
      <p>
        数量：{order.quantity}{' '}
        <button
          disabled={locked}
          onClick={() => dispatch({ type: 'quantity_changed', quantity: order.quantity - 1 })}
        >
          -1
        </button>{' '}
        <button
          disabled={locked}
          onClick={() => dispatch({ type: 'quantity_changed', quantity: order.quantity + 1 })}
        >
          +1
        </button>
      </p>
      <p>
        配送：
        <select
          disabled={locked}
          value={order.shipping}
          onChange={event =>
            dispatch({ type: 'shipping_selected', shipping: event.target.value })
          }
        >
          <option value="standard">标准</option>
          <option value="express">加急</option>
        </select>
      </p>
      <p>
        优惠码：{order.coupon ?? '无'}{' '}
        <button
          disabled={locked}
          onClick={() => dispatch({ type: 'coupon_applied', code: 'SAVE10' })}
        >
          应用 SAVE10
        </button>{' '}
        <button
          disabled={locked}
          onClick={() => dispatch({ type: 'coupon_applied', code: 'BADCODE' })}
        >
          测试无效码
        </button>
      </p>
      {order.error && <p role="alert">{order.error}</p>}
      <p>总价：¥{total}</p>
      {locked ? (
        <button onClick={() => dispatch({ type: 'edit_again' })}>继续编辑</button>
      ) : (
        <button onClick={() => dispatch({ type: 'submitted' })}>提交订单</button>
      )}{' '}
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderApp />
  </StrictMode>,
);
