# RE-KP040：事件处理中的异步逻辑

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 在 React 事件处理器中使用 `async/await`。
2. 知道事件 Handler 可以发起 Promise 工作，但 React 不会自动替普通事件 Handler 管理 loading/error UI。
3. 会在异步 Handler 内使用 `try/catch/finally` 处理成功、失败和收尾逻辑。
4. 理解“点击时发起请求”属于事件逻辑，而不是因为异步就自动变成 Effect。
5. 知道后续可以使用 State、Actions 等能力把 pending/error 状态反映到 UI。

> **本节核心代码**：`async function handleTask()` + `await` + `try/catch/finally`。  
> **实验辅助代码**：`setTimeout` 模拟 Promise 请求，只用于稳定制造成功和失败结果。

## 理论讲解

### 1. Event Handler 可以是 async 函数

普通 Handler：

```jsx
function handleClick() {
  console.log('clicked');
}
```

也可以：

```jsx
async function handleClick() {
  const result = await saveOrder();
  console.log(result);
}
```

用户点击仍然是事件触发源，只是 Handler 内部有异步工作。

### 2. 异步不等于 Effect

如果逻辑的原因是：

```text
用户点击“提交”
      ↓
才应该发请求
```

它仍然属于事件逻辑。

不要因为出现 `await` 就把代码搬进 Effect。

### 3. 普通 async Handler 的返回 Promise 不会自动生成 UI 状态

写：

```jsx
async function handleClick() {
  await saveOrder();
}
```

并不会自动得到：

```text
loading spinner
禁用按钮
错误提示
成功提示
```

这些 UI 状态仍然需要你显式建模。

下一章开始学习 State 后，就能把这些状态真正显示到页面。

### 4. 错误必须主动处理

推荐第一层结构：

```js
try {
  const result = await task();
  console.log(result);
} catch (error) {
  console.error(error);
} finally {
  console.log('finish');
}
```

不要只考虑成功路径。

### 5. 避免无意的并发重复提交

如果用户连续点击按钮，普通 async Handler 可能启动多个 Promise。

完整业务里通常要考虑：

```text
pending 状态
按钮禁用
请求取消
竞态
幂等
```

这些会随着 State、Effect 与数据请求课程逐步展开。

## 动手编码：从 0 到 1

### 第 0 步：写一个 Promise 模拟器

```js
function fakeRequest(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('模拟请求失败'));
      else resolve('模拟请求成功');
    }, 600);
  });
}
```

### 第 1 步：创建 async Handler

```js
async function runTask(shouldFail) {
  console.log('1. task start');
  // ...
}
```

### 第 2 步：加入 `await`

```js
const result = await fakeRequest(shouldFail);
console.log('2. success:', result);
```

### 第 3 步：加入错误处理

完整为：

```js
try {
  const result = await fakeRequest(shouldFail);
  console.log('2. success:', result);
} catch (error) {
  console.error('2. failed:', error.message);
} finally {
  console.log('3. task finish');
}
```

### 第 4 步：准备成功和失败两个按钮

```jsx
<button onClick={() => runTask(false)}>运行成功任务</button>
<button onClick={() => runTask(true)}>运行失败任务</button>
```

点击后观察 Console 中开始 → 成功/失败 → finish 的顺序。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：async Event Handler 的 Promise 与错误处理。
- **实验辅助代码**：`fakeRequest` 只用于模拟服务端延迟。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp040-async-event-handlers --config ./vite.config.js
```

## 效果验证

1. 成功按钮依次打印 start、success、finish。
2. 失败按钮依次打印 start、failed、finish。
3. 能解释为什么 async Handler 仍然属于事件逻辑。
4. 能解释为什么普通 async Handler 不会自动帮你生成 loading/error UI。
5. 知道下一章要用 State 把交互结果真正保存并显示到页面。

完成后进入 **Chapter 05 / RE-KP041：useState 基础**。
