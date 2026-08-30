# RE-KP124：Effect 中的数据请求竞态

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解异步请求的“发出顺序”不保证等于“返回顺序”。
2. 识别旧请求晚返回并覆盖新数据的 Race Condition。
3. 理解 Effect 的每次执行都对应一轮独立的异步工作。
4. 能通过确定性的延迟实验复现 stale response 覆盖问题。
5. 为下一课的 ignore flag cleanup 建立问题背景。

> **本节核心代码**：Effect 根据 `person` 发请求，但暂时没有 cleanup，因此旧响应仍可写入 State。  
> **实验辅助代码**：`fetchBio()` 使用 Alice 慢、Bob 快的固定延迟，专门用于稳定复现竞态。

> 注意：本节最终源码**故意保留竞态 Bug**，这是受控实验。RE-KP125 会在相同实验上加入 cleanup 修复。

## 理论讲解

### 1. 请求顺序不等于响应顺序

假设用户快速切换：

```text
请求 A：Alice，耗时 1200ms
请求 B：Bob，耗时 300ms
```

发送顺序是：

```text
Alice → Bob
```

但响应顺序可能是：

```text
Bob → Alice
```

如果两个响应都无条件执行：

```jsx
setBio(result);
```

最终界面可能显示 Alice 的旧数据，即使当前选择已经是 Bob。

### 2. 为什么这叫竞态

最终结果取决于多个异步任务“谁最后完成”，而不是只取决于当前 React State。

也就是说：

```text
当前 person = Bob
```

却可能得到：

```text
bio = Alice 的旧响应
```

这就是典型 stale response。

### 3. Effect 本身不会自动取消旧异步工作

代码：

```jsx
useEffect(() => {
  fetchBio(person).then(result => {
    setBio(result);
  });
}, [person]);
```

当 `person` 从 Alice 变成 Bob 时：

1. React 会启动新的 Bob Effect。
2. 旧 Alice Promise 并不会因为新 Effect 出现就自动消失。
3. Alice Promise 仍然可能稍后 resolve。
4. 如果没有防护，它仍然可以调用 `setBio`。

### 4. “最后返回”不等于“最新请求”

异步 UI 最重要的判断不是：

> 谁最后返回？

而是：

> 这个返回结果对于当前这一轮同步是否仍然有效？

下一课会用 cleanup 给每轮 Effect 一个局部 `ignore` 标记。

### 5. 真实工程中的常见场景

类似问题会出现在：

- 搜索框联想请求。
- 用户切换账号或 Profile。
- 路由参数快速变化。
- 联动下拉框。
- 分页 / 筛选条件快速切换。
- 打开不同聊天会话。

## 动手编码：从 0 到 1

### 第 0 步：准备 person State

```jsx
const [person, setPerson] = useState('');
const [bio, setBio] = useState('尚未请求');
```

空字符串表示当前没有请求目标。

### 第 1 步：写确定性延迟请求

```jsx
function fetchBio(person) {
  const delay = person === 'Alice' ? 1200 : 300;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${person} 的资料请求完成`);
    }, delay);
  });
}
```

Alice 固定更慢，Bob 固定更快。

### 第 2 步：在 Effect 中发请求

```jsx
useEffect(() => {
  if (!person) return;

  setBio(`正在请求 ${person}…`);

  fetchBio(person).then(result => {
    setBio(result);
  });
}, [person]);
```

当前故意没有 cleanup。

### 第 3 步：自动制造 Alice → Bob 的快速切换

```jsx
function runRace() {
  setPerson('Alice');

  setTimeout(() => {
    setPerson('Bob');
  }, 100);
}
```

这会确保：

```text
Alice 请求先开始
Bob 请求后开始但先完成
Alice 最后完成
```

### 第 4 步：观察错误结果

运行后会先看到：

```text
Bob 的资料请求完成
```

随后又变成：

```text
Alice 的资料请求完成
```

但此时页面上的当前 person 已经是 Bob。

### 第 5 步：确认问题不是 React State 本身

`person` State 是正确的 Bob。

真正错误的是：旧 Alice 异步任务仍然有权限更新 `bio`。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：没有 cleanup 的异步 Effect，稳定复现 stale response 覆盖。
- **实验辅助代码**：固定请求延迟和 `runRace()` 自动切换，只用于制造可观察竞态。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp124-effect-fetch-race --config ./vite.config.js
```

## 效果验证

1. 点击“运行竞态实验”。
2. 当前 person 最终是 Bob。
3. Bob 的 300ms 响应会先完成。
4. Alice 的 1200ms 响应随后完成，并错误覆盖 Bob 的资料。
5. 能解释为什么“请求先发出”并不代表“响应先回来”。
6. 能指出修复点必须阻止已经过期的 Effect 继续写入 State。

完成后继续 **RE-KP125：Ignore Flag 与请求取消**。
