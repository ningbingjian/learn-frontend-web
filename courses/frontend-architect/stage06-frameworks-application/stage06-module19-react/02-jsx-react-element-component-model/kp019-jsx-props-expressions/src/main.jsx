import { createRoot } from 'react-dom/client';

const name = 'Ada';
const avatarSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <rect width="96" height="96" rx="18" fill="#e5e7eb" />
    <text x="48" y="58" text-anchor="middle" font-size="38">A</text>
  </svg>
`;
const avatarUrl = `data:image/svg+xml,${encodeURIComponent(avatarSvg)}`;

const imageProps = {
  width: 96,
  height: 96
};

const canSubmit = false;

function App() {
  return (
    <main>
      <h1>RE-KP019：JSX 属性与表达式</h1>
      <section
        style={{
          padding: 16,
          border: '1px solid #ccc',
          borderRadius: 12
        }}
      >
        <img
          className="avatar"
          src={avatarUrl}
          alt={`${name} avatar`}
          {...imageProps}
        />
        <p>{name}</p>
        <label htmlFor="newsletter">Subscribe</label>
        <input id="newsletter" type="checkbox" />
        <button type="button" disabled={!canSubmit}>Save</button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
