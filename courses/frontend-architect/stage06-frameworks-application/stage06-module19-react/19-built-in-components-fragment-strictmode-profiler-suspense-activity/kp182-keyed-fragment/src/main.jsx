import { Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';

const sections = [
  { id: 'render', title: 'Render', note: '纯计算下一版 UI' },
  { id: 'commit', title: 'Commit', note: '应用必要 DOM 变化' },
  { id: 'effect', title: 'Effect', note: '同步外部系统' },
];

function App() {
  const [reversed, setReversed] = useState(false);
  const visibleSections = reversed ? [...sections].reverse() : sections;

  return (
    <main>
      <h1>带 key 的 Fragment</h1>
      <button type="button" onClick={() => setReversed(value => !value)}>
        {reversed ? '恢复正序' : '反转顺序'}
      </button>

      <dl>
        {visibleSections.map(section => (
          <Fragment key={section.id}>
            <dt><strong>{section.title}</strong></dt>
            <dd>
              <p>{section.note}</p>
              <label>
                本地备注：
                <input defaultValue={`${section.title} note`} />
              </label>
            </dd>
          </Fragment>
        ))}
      </dl>

      <p>先修改任意输入框，再反转顺序；稳定 key 让整组 sibling 跟随业务实体移动。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
