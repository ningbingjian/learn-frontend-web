import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  function handleCardClick() {
    console.log('parent card click');
  }

  function handleDelete(event) {
    event.stopPropagation();
    console.log('delete button click');
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('form submit: default prevented');
  }

  return (
    <main>
      <h1>传播与默认行为</h1>

      <section onClick={handleCardClick} style={{ padding: 16, border: '1px solid' }}>
        父级卡片
        <button type="button" onClick={handleDelete}>
          删除
        </button>
      </section>

      <div onSubmit={() => console.log('parent observed submit')}>
        <form onSubmit={handleSubmit}>
          <label>
            项目名
            <input name="projectName" defaultValue="React Course" />
          </label>
          <button type="submit">提交但不刷新</button>
        </form>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
