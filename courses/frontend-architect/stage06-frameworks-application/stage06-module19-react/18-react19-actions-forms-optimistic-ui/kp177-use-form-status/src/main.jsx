import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useFormStatus } from 'react-dom';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveProfile(formData) {
  await delay(1000);
  console.log('saved profile:', formData.get('displayName'));
}

function SubmitStatus() {
  const { pending, data, method } = useFormStatus();
  const submittedName = data?.get('displayName');

  return (
    <section aria-live="polite">
      <button disabled={pending} type="submit">
        {pending ? '保存中…' : '保存资料'}
      </button>
      {pending && <p>正在提交：{submittedName}</p>}
      <p>Method: {method.toUpperCase()}</p>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>react-dom useFormStatus</h1>
      <form action={saveProfile}>
        <label>
          显示名称：
          <input name="displayName" defaultValue="Ada" />
        </label>
        <SubmitStatus />
      </form>
      <p>SubmitStatus 是 form 的子组件，因此可以读取最近父 Form 的状态。</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
