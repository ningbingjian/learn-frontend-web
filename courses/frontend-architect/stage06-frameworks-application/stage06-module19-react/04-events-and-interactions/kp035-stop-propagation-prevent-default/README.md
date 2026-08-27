# RE-KP035：`stopPropagation` 与 `preventDefault`

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 准确区分 `event.stopPropagation()` 与 `event.preventDefault()`。
2. 知道 `stopPropagation()` 解决“事件还要不要继续传播”。
3. 知道 `preventDefault()` 解决“浏览器默认行为还要不要执行”。
4. 会在嵌套按钮与表单提交场景中分别使用它们。
5. 理解两者互不替代：阻止默认行为不会自动停止传播，停止传播也不会自动取消浏览器默认行为。

> **本节核心代码**：`event.stopPropagation()` 与 `event.preventDefault()` 的职责对照。  
> **实验辅助代码**：父级日志和表单输入只用于观察传播与默认行为。

## 理论讲解

### 1. 两个 API 解决不同问题

先记一张表：

| API | 解决的问题 |
|---|---|
| `stopPropagation()` | 阻止事件继续向祖先传播 |
| `preventDefault()` | 阻止浏览器对该事件执行默认行为 |

它们名字相近，但职责完全不同。

### 2. `stopPropagation()`：停止传播

结构：

```jsx
<div onClick={handleCardClick}>
  <button onClick={handleDelete}>删除</button>
</div>
```

如果删除按钮不希望同时触发卡片点击：

```jsx
function handleDelete(event) {
  event.stopPropagation();
  console.log('delete');
}
```

此时点击按钮：

```text
button handler
   ↓
停止继续冒泡
   ↓
parent onClick 不执行
```

### 3. `preventDefault()`：取消浏览器默认行为

表单提交有浏览器默认行为。

React SPA 常见写法：

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log('submit with JavaScript');
}
```

这里我们没有说“别传播”，而是说：

> 不要按浏览器默认表单导航/刷新行为处理，我自己在 JavaScript 中接管提交逻辑。

### 4. `preventDefault()` 不等于 `stopPropagation()`

如果一个表单的父级也监听 `onSubmit`：

```jsx
<div onSubmit={() => console.log('parent submit')}>
  <form onSubmit={handleSubmit}>...</form>
</div>
```

即使 `handleSubmit` 调用了：

```js
event.preventDefault();
```

事件仍然可以继续传播到父级。

这正说明：

```text
默认行为
和
传播路径
```

是两个维度。

### 5. `stopPropagation()` 也不会自动取消默认行为

例如点击链接时只写：

```js
event.stopPropagation();
```

只是阻止它继续冒泡，并不代表链接导航一定被取消。

如果真的要取消默认导航，需要考虑：

```js
event.preventDefault();
```

是否符合你的交互目标。

### 6. 不要习惯性同时调用两个

看到事件问题就写：

```js
event.stopPropagation();
event.preventDefault();
```

不是好习惯。

应该先判断：

```text
我是在解决父级 Handler 被触发？
→ stopPropagation

我是在接管浏览器默认行为？
→ preventDefault
```

只有两件事都真的需要时才同时使用。

## 动手编码：从 0 到 1

### 第 0 步：准备两个独立实验

页面包含：

1. 嵌套按钮传播实验。
2. 表单默认行为实验。

### 第 1 步：创建父级点击 Handler

```jsx
function handleCardClick() {
  console.log('parent card click');
}
```

### 第 2 步：按钮停止冒泡

```jsx
function handleDelete(event) {
  event.stopPropagation();
  console.log('delete button click');
}
```

绑定：

```jsx
<div onClick={handleCardClick}>
  <button onClick={handleDelete}>删除</button>
</div>
```

点击删除后，父级日志不应出现。

### 第 3 步：创建表单提交 Handler

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log('form submit: default prevented');
}
```

### 第 4 步：让父层也观察 submit 传播

```jsx
<div onSubmit={() => console.log('parent observed submit')}>
  <form onSubmit={handleSubmit}>...</form>
</div>
```

提交后页面不会按默认方式刷新/导航，但父层仍然能观察到传播过来的 submit。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：两个事件对象 API 的职责差异。
- **实验辅助代码**：Console 和表单字段只用于验证结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp035-stop-propagation-prevent-default --config ./vite.config.js
```

## 效果验证

1. 点击“删除”不会触发父卡片点击日志。
2. 提交表单不会执行浏览器默认提交行为。
3. 表单父层仍可收到传播的 submit，证明 `preventDefault()` 没有停止传播。
4. 能解释 `stopPropagation()` 为什么不是“取消默认行为”。
5. 不再把两个 API 当成固定成对使用的模板。

完成后继续 **RE-KP036：事件处理器中的状态更新**。
