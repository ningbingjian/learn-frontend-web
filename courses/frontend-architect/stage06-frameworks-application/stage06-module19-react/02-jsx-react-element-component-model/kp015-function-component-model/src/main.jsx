import { createRoot } from 'react-dom/client';

function Greeting({ name }) {
  console.log(`Greeting rendered with name=${name}`);
  return <h2>Hello, {name}</h2>;
}

function App() {
  return (
    <main>
      <h1>RE-KP015：函数组件的最小模型</h1>
      <Greeting name="Ada" />
      <Greeting name="Lin" />
      <p>同一个组件类型，可以接收不同 props。</p>
    </main>
  );
}

console.log('typeof Greeting:', typeof Greeting);
createRoot(document.getElementById('root')).render(<App />);
