import { createRoot } from 'react-dom/client';

function Button() {
  return <button type="button">Component Button</button>;
}

const hostElement = <button type="button">Host Button</button>;
const componentElement = <Button />;

console.log('hostElement.type:', hostElement.type);
console.log('componentElement.type:', componentElement.type);
console.log('componentElement.type === Button:', componentElement.type === Button);

function App() {
  return (
    <main>
      <h1>RE-KP016：组件名称与大写规则</h1>
      <p>{'<button>'} → type = "button"</p>
      <p>{'<Button>'} → type = Button function</p>
      {hostElement}
      {componentElement}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
