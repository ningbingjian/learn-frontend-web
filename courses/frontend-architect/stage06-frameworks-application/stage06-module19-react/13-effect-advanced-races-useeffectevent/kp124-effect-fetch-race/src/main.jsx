import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function fetchBio(person) {
  const delay = person === 'Alice' ? 1200 : 300;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${person} 的资料请求完成（${delay}ms）`);
    }, delay);
  });
}

function ProfileRaceDemo() {
  const [person, setPerson] = useState('');
  const [bio, setBio] = useState('尚未请求');

  useEffect(() => {
    if (!person) {
      return;
    }

    setBio(`正在请求 ${person}…`);

    fetchBio(person).then(result => {
      setBio(result);
    });
  }, [person]);

  function runRace() {
    setPerson('Alice');

    setTimeout(() => {
      setPerson('Bob');
    }, 100);
  }

  return (
    <main>
      <h1>Effect 中的数据请求竞态</h1>
      <p>当前 person：{person || '未选择'}</p>
      <p>当前 bio：{bio}</p>
      <button onClick={runRace}>运行 Alice → Bob 竞态实验</button>
      <p>
        预期 Bug：当前 person 最终是 Bob，但 Alice 的慢响应会最后覆盖 bio。
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileRaceDemo />
  </StrictMode>,
);
