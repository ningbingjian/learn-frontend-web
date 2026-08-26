import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const roles = [
  ['index.html', 'HTML entry'],
  ['main.jsx', 'React entry'],
  ['vite.config.js', 'Build tool integration'],
];

function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">RE-KP007 Exercise</p>
        <h1>My First Vite React Exercise</h1>
        <ul>
          {roles.map(([file, role]) => (
            <li key={file}>
              <code>{file}</code> → {role}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
