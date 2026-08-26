import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';

function Toolbar() {
  return (
    <>
      <h1>RE-KP017：Fragment</h1>
      <p>这三个节点会直接成为 #root 的 DOM children。</p>
      <button type="button">Save</button>
    </>
  );
}

const keyedFragment = (
  <Fragment key="toolbar-group">
    <span>A</span>
    <span>B</span>
  </Fragment>
);

console.log('explicit Fragment key:', keyedFragment.key);
createRoot(document.getElementById('root')).render(<Toolbar />);

requestAnimationFrame(() => {
  const root = document.getElementById('root');
  console.log('root child count:', root.children.length);
  console.log('root child tags:', [...root.children].map((node) => node.tagName));
});
