import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function useStepper({ initialStep = 1, min = 1, max = 5, step = 1 } = {}) {
  const safeInitial = Math.min(max, Math.max(min, initialStep));
  const [value, setValue] = useState(safeInitial);

  return {
    value,
    increment() {
      setValue(current => Math.min(max, current + step));
    },
    decrement() {
      setValue(current => Math.max(min, current - step));
    },
    reset() {
      setValue(safeInitial);
    },
  };
}

function App() {
  const stepper = useStepper({ initialStep: 2, min: 1, max: 5, step: 1 });

  return (
    <main>
      <h1>自定义 Hook 参数设计</h1>
      <p>Step: {stepper.value}</p>
      <button onClick={stepper.decrement}>-1</button>{' '}
      <button onClick={stepper.increment}>+1</button>{' '}
      <button onClick={stepper.reset}>Reset</button>
      <p>有效范围：1 ～ 5</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
