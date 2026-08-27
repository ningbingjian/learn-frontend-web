import { createRoot } from 'react-dom/client';

function App() {
  function handleClick(event) {
    console.table({
      reactType: event.type,
      target: event.target.tagName,
      currentTarget: event.currentTarget.tagName,
      nativeType: event.nativeEvent.type,
      defaultPrevented: event.defaultPrevented,
    });

    console.log('persist type:', typeof event.persist);
  }

  return (
    <main>
      <h1>RE-KP038：Synthetic Event</h1>
      <p>打开 Console，点击按钮内部的加粗文字。</p>
      <button onClick={handleClick}>
        点击 <strong>内部文字</strong>
      </button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
