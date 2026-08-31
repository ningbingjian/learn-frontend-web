import { StrictMode, useActionState } from 'react';
import { createRoot } from 'react-dom/client';

const initialState = { message: '尚未提交', submittedName: '' };

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function saveName(previousState, formData) {
  const name = String(formData.get('name') ?? '').trim();

  if (!name) {
    return { ...previousState, message: '请输入姓名' };
  }

  await wait(800);
  return { message: '保存成功', submittedName: name };
}

function App() {
  const [state, submitAction] = useActionState(saveName, initialState);

  return (
    <main>
      <h1>useActionState</h1>
      <form action={submitAction}>
        <label>
          姓名
          <input name="name" />
        </label>
        <button type="submit">保存</button>
      </form>
      <p role="status">{state.message}</p>
      <p>最近保存：{state.submittedName || '暂无'}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
