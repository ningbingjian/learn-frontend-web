import { createRoot } from 'react-dom/client';

const nativeButton = document.getElementById('native-button');

function handleNativeClick(event) {
  console.log('[native]', {
    eventClass: event.constructor.name,
    type: event.type,
    target: event.target.id,
    currentTarget: event.currentTarget.id,
  });
}

if (window.__kp039NativeHandler) {
  nativeButton.removeEventListener('click', window.__kp039NativeHandler);
}

nativeButton.addEventListener('click', handleNativeClick);
window.__kp039NativeHandler = handleNativeClick;

function App() {
  function handleReactClick(event) {
    console.log('[react]', {
      eventClass: event.constructor.name,
      type: event.type,
      nativeEventClass: event.nativeEvent.constructor.name,
    });
  }

  return (
    <main>
      <h1>RE-KP039：React 与原生 DOM 事件</h1>
      <p>分别点击 React root 外的按钮和下面的 React 按钮。</p>
      <button onClick={handleReactClick}>React 按钮</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
