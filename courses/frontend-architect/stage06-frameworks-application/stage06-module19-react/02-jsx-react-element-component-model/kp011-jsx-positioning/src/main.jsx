import { createRoot } from 'react-dom/client';

const courseName = 'React';
const lesson = 11;

function App() {
  return (
    <>
      <main className="lesson-card">
        <p>RE-KP{lesson}</p>
        <h1>JSX 是 JavaScript 的语法扩展</h1>
        <p>{courseName} 常用 JSX 描述界面，但 JSX 本身不等于 HTML。</p>
        <img
          alt="JSX syntax marker"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40'%3E%3Crect width='80' height='40' rx='8' fill='%23eee'/%3E%3Ctext x='40' y='25' text-anchor='middle' font-size='16'%3EJSX%3C/text%3E%3C/svg%3E"
        />
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
