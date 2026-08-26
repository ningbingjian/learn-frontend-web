import { createRoot } from 'react-dom/client';

function Welcome({ name }) {
  return <h2 id="welcome-title">Hello, {name}</h2>;
}

const welcomeElement = <Welcome name="Ada" />;

console.log('Component:', Welcome);
console.log('React Element:', welcomeElement);
console.log('Element type:', welcomeElement.type);
console.log('Element props:', welcomeElement.props);

createRoot(document.getElementById('root')).render(
  <main>
    <h1>RE-KP014：Component / Element / DOM Node</h1>
    {welcomeElement}
    <ul>
      <li>Component：Welcome 函数</li>
      <li>React Element：type=Welcome，props.name=Ada</li>
      <li>DOM Node：React DOM 提交后出现的 H2</li>
    </ul>
  </main>
);

requestAnimationFrame(() => {
  const domNode = document.getElementById('welcome-title');
  console.log('DOM Node:', domNode);
  console.log('DOM nodeName:', domNode?.nodeName);
});
