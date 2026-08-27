import { createRoot } from 'react-dom/client';

function fakeRequest(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('模拟请求失败'));
      } else {
        resolve('模拟请求成功');
      }
    }, 600);
  });
}

async function runTask(shouldFail) {
  console.log('1. task start');

  try {
    const result = await fakeRequest(shouldFail);
    console.log('2. success:', result);
  } catch (error) {
    console.error('2. failed:', error.message);
  } finally {
    console.log('3. task finish');
  }
}

function App() {
  return (
    <main>
      <h1>RE-KP040：异步事件处理</h1>
      <p>打开 Console，分别运行成功和失败任务。</p>
      <button onClick={() => runTask(false)}>运行成功任务</button>
      <button onClick={() => runTask(true)}>运行失败任务</button>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
