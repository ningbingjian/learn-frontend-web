import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';

const responsibilities = [
  ['react', '创建 React Element，提供组件与 Hooks 等核心编程模型'],
  ['react-dom/client', '把 React 树连接到浏览器 DOM 容器'],
  ['Renderer', '把 React 更新映射到具体宿主平台'],
];

const listItems = responsibilities.map(([name, responsibility]) =>
  createElement(
    'li',
    { key: name },
    createElement('strong', null, name),
    `：${responsibility}`,
  ),
);

const element = createElement(
  'main',
  null,
  createElement('p', null, `当前 React 版本：${React.version}`),
  createElement('h1', null, 'React 描述 UI，React DOM 连接 Web DOM'),
  createElement('ul', null, ...listItems),
  createElement(
    'p',
    null,
    '这个 React Element 在 createRoot 调用之前就已经存在，但还没有挂载到真实 DOM。',
  ),
);

console.log('React Element before render:', element);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(element);
