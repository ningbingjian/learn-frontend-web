import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Panel({ title, children, isActive, onShow }) {
  return (
    <section>
      <h2>{title}</h2>
      {isActive ? children : <button onClick={onShow}>显示</button>}
    </section>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main>
      <h1>RE-KP072：状态提升</h1>
      <Panel
        title="组件身份"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        <p>Position + Type + Key 决定组件身份。</p>
      </Panel>
      <Panel
        title="状态建模"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        <p>共享状态提升到最近公共父组件。</p>
      </Panel>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
