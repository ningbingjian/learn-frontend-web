import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

const element = createElement('h1', null, 'Renderer boundary');
const container = document.getElementById('root');
const root = createRoot(container);

root.render(element);
