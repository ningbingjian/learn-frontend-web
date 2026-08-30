import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function fetchBio(person, { signal }) {
  const delay = person === 'Alice' ? 1200 : 300;

  return new Promise((resolve, reject) => {
    function handleAbort() {
      clearTimeout(timerId);
      reject(new DOMException(`已取消 ${person} 请求`, 'AbortError'));
    }

    if (signal.aborted) {
      reject(new DOMException(`已取消 ${person} 请求`, 'AbortError'));
      return;
    }

    const timerId = setTimeout(() => {
      signal.removeEventListener('abort', handleAbort);
      resolve(`${person} 的资料请求完成（${delay}ms）`);
    }, delay);

    signal.addEventListener('abort', handleAbort, { once: true });
  });
}

function AbortableProfileDemo() {
  const [person, setPerson] = useState('');
  const [bio, setBio] = useState('尚未请求');

  useEffect(() => {
    if (!person) {
      return;
    }

    const controller = new AbortController();
    setBio(`正在请求 ${person}…`);

    fetchBio(person, { signal: controller.signal })
      .then(result => {
        setBio(result);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log(error.message);
          return;
        }

        setBio(`请求失败：${error.message}`);
      });

    return () => {
      controller.abort();
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
      <h1>AbortController 与 Effect</h1>
      <p>当前 person：{person || '未选择'}</p>
      <p>当前 bio：{bio}</p>
      <button onClick={runRace}>运行 AbortController 实验</button>
      <p>打开 Console 观察 Alice 请求在切换 Bob 时被主动取消。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AbortableProfileDemo />
  </StrictMode>,
);
