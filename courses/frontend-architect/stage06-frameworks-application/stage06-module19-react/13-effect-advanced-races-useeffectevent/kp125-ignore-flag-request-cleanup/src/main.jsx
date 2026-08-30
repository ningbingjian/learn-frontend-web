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

function ProfileRaceFixed() {
  const [person, setPerson] = useState('');
  const [bio, setBio] = useState('尚未请求');

  useEffect(() => {
    if (!person) {
      return;
    }

    let ignore = false;
    setBio(`正在请求 ${person}…`);

    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      } else {
        console.log(`忽略过期结果：${result}`);
      }
    });

    return () => {
      ignore = true;
    };
  }, [person]);

  function runRace() {
    setPerson('Alice');

    setTimeout(() => {
      setPerson('Bob');
    }, 100);
  }

  return (
    <main>
      <h1>Ignore Flag 修复请求竞态</h1>
      <p>当前 person：{person || '未选择'}</p>
      <p>当前 bio：{bio}</p>
      <button onClick={runRace}>运行修复后的竞态实验</button>
      <p>打开 Console 可以看到 Alice 的旧响应仍完成，但会被忽略。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileRaceFixed />
  </StrictMode>,
);
