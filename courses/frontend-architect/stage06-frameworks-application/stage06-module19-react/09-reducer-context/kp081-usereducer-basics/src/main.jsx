import { StrictMode, useReducer } from 'react';
import { createRoot } from 'react-dom/client';

const initialState = {
  count: 0,
};

function counterReducer(state, action) {
  switch (action.type) {
    case 'incremented':
      return { count: state.count + 1 };
    case 'decremented':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <main>
      <h1>useReducer 基础</h1>
      <p>当前计数：{state.count}</p>
      <button onClick={() => dispatch({ type: 'decremented' })}>-1</button>{' '}
      <button onClick={() => dispatch({ type: 'incremented' })}>+1</button>{' '}
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Counter />
  </StrictMode>,
);
