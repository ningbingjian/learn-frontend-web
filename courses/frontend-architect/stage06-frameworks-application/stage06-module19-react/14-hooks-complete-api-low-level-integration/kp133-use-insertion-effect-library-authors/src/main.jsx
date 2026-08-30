import { StrictMode, useInsertionEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const styleMap = {
  success: {
    className: 're-kp133-success',
    cssText:
      '.re-kp133-success { padding: 16px; border: 2px solid currentColor; border-radius: 8px; font-weight: 700; }',
  },
  warning: {
    className: 're-kp133-warning',
    cssText:
      '.re-kp133-warning { padding: 16px; border: 2px dashed currentColor; border-radius: 16px; font-style: italic; }',
  },
};

function useRuntimeClass(tone) {
  const definition = styleMap[tone];

  useInsertionEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.dataset.reKp133 = definition.className;
    styleElement.textContent = definition.cssText;
    document.head.appendChild(styleElement);

    return () => {
      styleElement.remove();
    };
  }, [definition.className, definition.cssText]);

  return definition.className;
}

function LibraryConsumer({ tone }) {
  const className = useRuntimeClass(tone);

  return (
    <div className={className}>
      业务组件只消费 className；样式插入时序由 library Hook 封装。
    </div>
  );
}

function App() {
  const [tone, setTone] = useState('success');

  return (
    <main>
      <p>RE-KP133</p>
      <h1>useInsertionEffect 的库作者场景</h1>
      <button
        type="button"
        onClick={() => setTone(value => (value === 'success' ? 'warning' : 'success'))}
      >
        切换 tone
      </button>
      <p>当前 tone: {tone}</p>
      <LibraryConsumer tone={tone} />
      <p>本课用于理解 CSS-in-JS 库内部时序，不建议普通业务组件自行运行时注入 CSS。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
