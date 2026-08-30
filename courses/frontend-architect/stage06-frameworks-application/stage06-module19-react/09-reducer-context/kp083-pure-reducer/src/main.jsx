import { StrictMode, useReducer } from 'react';
import { createRoot } from 'react-dom/client';

let nextId = 1;

function cartReducer(cart, action) {
  switch (action.type) {
    case 'item_added':
      return [
        ...cart,
        { id: action.id, name: action.name, quantity: 1 },
      ];
    case 'quantity_incremented':
      return cart.map(item =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case 'cart_cleared':
      return [];
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function CartApp() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  function handleAdd(name) {
    dispatch({ type: 'item_added', id: nextId++, name });
  }

  return (
    <main>
      <h1>Pure Reducer</h1>
      <button onClick={() => handleAdd('Keyboard')}>添加 Keyboard</button>{' '}
      <button onClick={() => handleAdd('Mouse')}>添加 Mouse</button>{' '}
      <button onClick={() => dispatch({ type: 'cart_cleared' })}>清空</button>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} × {item.quantity}{' '}
            <button
              onClick={() => dispatch({ type: 'quantity_incremented', id: item.id })}
            >
              +1
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartApp />
  </StrictMode>,
);
