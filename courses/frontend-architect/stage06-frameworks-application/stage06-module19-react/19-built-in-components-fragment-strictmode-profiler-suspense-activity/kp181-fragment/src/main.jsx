import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

function ProfileSummary() {
  return (
    <>
      <h2>Ada Lovelace</h2>
      <p>数学家与早期计算思想先驱。</p>
    </>
  );
}

function App() {
  const hostRef = useRef(null);
  const [childTags, setChildTags] = useState('尚未检查');

  function inspectDomChildren() {
    const tags = Array.from(hostRef.current.children)
      .map(element => element.tagName)
      .join(' → ');
    setChildTags(tags);
  }

  return (
    <main>
      <h1>Fragment</h1>
      <section ref={hostRef}>
        <ProfileSummary />
      </section>

      <button onClick={inspectDomChildren}>检查真实 DOM children</button>
      <p>Section 直接子节点：{childTags}</p>
      <p>预期：H2 → P。Fragment 本身不会生成额外 DOM 节点。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
