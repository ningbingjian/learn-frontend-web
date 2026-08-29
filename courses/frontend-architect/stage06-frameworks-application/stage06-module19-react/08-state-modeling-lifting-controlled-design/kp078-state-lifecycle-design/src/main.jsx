import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const documents = {
  a: { id: 'a', title: 'Architecture Notes', text: 'Initial architecture draft' },
  b: { id: 'b', title: 'Release Notes', text: 'Initial release draft' },
};

function DraftEditor({ document }) {
  const [draft, setDraft] = useState(document.text);

  return (
    <section>
      <h2>{document.title}</h2>
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <p>当前草稿：{draft}</p>
    </section>
  );
}

function App() {
  const [documentId, setDocumentId] = useState('a');
  const [showEditor, setShowEditor] = useState(true);
  const [parentTick, setParentTick] = useState(0);
  const document = documents[documentId];

  return (
    <main>
      <h1>RE-KP078：状态生命周期设计</h1>
      <p>父级无关计数：{parentTick}</p>

      <button type="button" onClick={() => setDocumentId('a')}>
        文档 A
      </button>{' '}
      <button type="button" onClick={() => setDocumentId('b')}>
        文档 B
      </button>{' '}
      <button type="button" onClick={() => setParentTick(parentTick + 1)}>
        父级无关 Render
      </button>{' '}
      <button type="button" onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? '隐藏 Editor' : '显示 Editor'}
      </button>

      {showEditor && <DraftEditor key={document.id} document={document} />}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
