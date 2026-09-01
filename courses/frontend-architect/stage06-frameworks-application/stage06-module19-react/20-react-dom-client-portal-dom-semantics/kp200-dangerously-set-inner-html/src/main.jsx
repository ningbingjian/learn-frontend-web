import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const TRUSTED_MARKUP = Object.freeze({
  __html: '<h2>课程公告</h2><p><strong>React</strong> 默认会转义普通文本。</p>',
});

function App() {
  const [userText, setUserText] = useState('<img src=x onerror="alert(1)">');

  return (
    <main>
      <p>RE-KP200</p>
      <h1>dangerouslySetInnerHTML：raw HTML 的安全边界</h1>

      <section>
        <h2>可信 HTML</h2>
        <div dangerouslySetInnerHTML={TRUSTED_MARKUP} />
      </section>

      <section>
        <h2>不可信用户输入：只按文本渲染</h2>
        <textarea
          rows="4"
          cols="56"
          value={userText}
          onChange={event => setUserText(event.target.value)}
        />
        <p>React children 输出：</p>
        <pre>{userText}</pre>
        <p>{userText}</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
