import { createRoot } from 'react-dom/client';
import { App } from './App';
import { mountLegacyConsole } from './legacy';
import './styles.css';

const legacyContainer = document.querySelector('#legacy-console');
const reactContainer = document.querySelector('#root');

if (!(legacyContainer instanceof HTMLElement)) {
  throw new Error('页面缺少 #legacy-console 容器。');
}

if (!(reactContainer instanceof HTMLElement)) {
  throw new Error('页面缺少 #root 容器。');
}

mountLegacyConsole(legacyContainer);
createRoot(reactContainer).render(<App />);
