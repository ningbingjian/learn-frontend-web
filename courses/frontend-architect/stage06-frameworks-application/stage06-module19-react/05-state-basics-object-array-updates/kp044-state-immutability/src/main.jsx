import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [profile, setProfile] = useState({
    name: 'Ada',
    score: 10
  });
  const [refreshCount, setRefreshCount] = useState(0);

  function mutateWrongly() {
    profile.score += 1;
    console.log('错误示范：对象里的 score 已变成', profile.score);
  }

  function updateCorrectly() {
    setProfile({
      ...profile,
      score: profile.score + 1
    });
  }

  return (
    <main>
      <h1>State 不可直接修改</h1>
      <p>用户：{profile.name}</p>
      <p>分数：{profile.score}</p>
      <p>无关 Render 次数：{refreshCount}</p>

      <button onClick={mutateWrongly}>错误：直接修改对象</button>{' '}
      <button onClick={updateCorrectly}>正确：通过 setter 替换</button>{' '}
      <button onClick={() => setRefreshCount(refreshCount + 1)}>
        触发一次无关 Render
      </button>

      <p>先点错误按钮，再点无关 Render，并观察 Console 与页面差异。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
