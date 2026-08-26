import { createElement, isValidElement } from 'react';
import { createRoot } from 'react-dom/client';

const jsxElement = <strong title="jsx element">JSX Element</strong>;
const manualElement = createElement('em', { title: 'manual element' }, 'createElement Element');

const facts = [
  ['JSX result is React Element', String(isValidElement(jsxElement))],
  ['createElement result is React Element', String(isValidElement(manualElement))],
  ['Current Vite DEV', String(import.meta.env.DEV)],
  ['JSX Element frozen', String(Object.isFrozen(jsxElement))],
  ['JSX Element props frozen', String(Object.isFrozen(jsxElement.props))],
];

function App() {
  return (
    <main>
      <p>RE-KP013</p>
      <h1>React Element 是不可变 UI 描述</h1>
      <p>{jsxElement}</p>
      <p>{manualElement}</p>
      <ul>
        {facts.map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
