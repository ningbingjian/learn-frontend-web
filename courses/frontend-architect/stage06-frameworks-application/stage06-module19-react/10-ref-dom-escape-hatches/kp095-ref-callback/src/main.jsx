import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const courses = [
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'html', name: 'HTML' },
];

function App() {
  const itemRefs = useRef(new Map());

  function focusCourse(id) {
    itemRefs.current.get(id)?.focus();
  }

  return (
    <main>
      <h1>Ref Callback</h1>
      <div>
        {courses.map(course => (
          <button
            key={course.id}
            type="button"
            ref={node => {
              if (node) {
                itemRefs.current.set(course.id, node);
              } else {
                itemRefs.current.delete(course.id);
              }
            }}
          >
            {course.name}
          </button>
        ))}
      </div>
      <p>
        {courses.map(course => (
          <button key={course.id} type="button" onClick={() => focusCourse(course.id)}>
            Focus {course.name}
          </button>
        ))}
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
