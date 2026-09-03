import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('React 根容器 #root 不存在，请检查 index.html。');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
