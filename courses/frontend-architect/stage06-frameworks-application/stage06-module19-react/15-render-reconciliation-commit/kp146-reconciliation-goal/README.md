# RE-KP146：Reconciliation 基本目标

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“Previous Tree → Next Tree → Minimal Work”解释 Reconciliation 的基本目标。
2. 理解重新 Render 不等于重建整棵 DOM。
3. 理解 React 会先计算下一版 UI，再在 Commit 阶段应用必要变化。
4. 通过 DOM 节点身份和非受控输入内容观察“匹配节点被复用”。
5. 避免把 Reconciliation 误解成必须背诵 Fiber 内部实现细节。

> **本节核心代码**：更新 `count` 后，React 重新计算 UI，但与计数无关的 `<input>` 继续复用原来的 DOM 节点。  
> **实验辅助代码**：`firstInputNodeRef` 与“检查 DOM 节点身份”按钮只用于观察节点是否被复用。

## 理论讲解

### 1. Previous Tree

React 已经有一版提交到页面上的 UI。

可以把它抽象理解为：

```text
Previous Tree
```

这不是让你手工操作真实 DOM 树，而是建立“上一版渲染结果”的心智模型。

### 2. Next Tree

当 State 或 Props 变化后，React 会再次调用组件，计算下一版 JSX：

```text
State / Props change
        ↓
Render
        ↓
Next Tree
```

### 3. Minimal Work

React 的目标不是“只要 Render 就删除旧 DOM 再重建”。

更合理的模型是：

```text
Previous Tree
      +
Next Tree
      ↓
匹配哪些部分仍是同一身份
      ↓
Commit 必要变化
```

例如：

```jsx
<p>Count: {count}</p>
<input defaultValue="draft" />
```

只有 `count` 变化时，`input` 没有必要被替换。

### 4. Reconciliation 与 Commit 不要混成一件事

可以先记住：

```text
Render / Reconciliation：决定下一版 UI 应该是什么、哪些部分匹配
Commit：把必要变化真正应用到 DOM
```

本章只建立公开行为层面的稳定模型，不依赖具体内部数据结构名称。

### 5. 为什么“同一个 DOM 节点”很重要

如果 React 能继续复用同一个 `<input>` DOM 节点，那么浏览器节点本身保存的状态也可以继续存在，例如：

- 当前焦点；
- 光标位置；
- 非受控 input 的当前 value；
- 浏览器维护的部分 DOM 状态。

这也是为什么“匹配身份”会直接影响真实用户体验。

## 动手编码：从 0 到 1

### 第 0 步：建立最小计数器

**目标**：先制造一次正常的重新 Render。

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**为什么这样写**：`setCount` 会触发下一次 Render。

**观察**：点击后计数变化。

### 第 1 步：加入一个与 count 无关的 input

**目标**：准备一个理论上无需替换的 DOM 节点。

```jsx
<input defaultValue="在这里输入一些内容" />
```

**为什么这样写**：使用非受控 input，可以直接观察浏览器节点自己的当前 value 是否保留。

**观察**：输入文字后再点击计数按钮，文字仍然存在。

### 第 2 步：拿到真实 DOM 节点

**目标**：验证不是“看起来一样”，而是真的复用了同一个 DOM 对象。

```jsx
const inputRef = useRef(null);
const firstInputNodeRef = useRef(null);
```

然后：

```jsx
<input ref={inputRef} defaultValue="在这里输入一些内容" />
```

**为什么这样写**：Ref 可以保存 DOM 节点引用。

**观察**：`inputRef.current` 指向真实 input DOM。

### 第 3 步：保存首次 Commit 后的节点

**目标**：建立后续比较基准。

```jsx
useLayoutEffect(() => {
  if (firstInputNodeRef.current === null) {
    firstInputNodeRef.current = inputRef.current;
  }
}, []);
```

**为什么这样写**：Layout Effect 运行时 DOM 已经提交，可以安全读取节点。

**观察**：首次节点被保存下来。

### 第 4 步：比较当前节点和首次节点

**目标**：直接验证节点身份。

```jsx
function handleInspect() {
  const reused = inputRef.current === firstInputNodeRef.current;
  setIdentityResult(reused ? '仍是同一个 DOM 节点' : 'DOM 节点已经被替换');
}
```

**为什么这样写**：DOM 对象可以直接使用 `===` 比较引用身份。

**观察**：多次增加 count 后检查，结果仍显示同一个节点。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：State 更新触发新 Render，但匹配的 input DOM 节点继续复用。
- **实验辅助代码**：DOM 引用比较、结果提示文本。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp146-reconciliation-goal --config ./vite.config.js
```

## 效果验证

1. 在输入框中输入一段自定义文字。
2. 多次点击“增加 count”。
3. 输入框文字没有因为父组件重新 Render 而丢失。
4. 点击“检查 DOM 节点身份”，结果仍为同一个 DOM 节点。
5. 能解释 Reconciliation 的目标不是“每次都重建”，而是让前后渲染结果正确匹配并只提交必要变化。
6. 能区分 Reconciliation 心智模型与 Commit 真正修改 DOM 的阶段。

完成后继续 **RE-KP147：Element Type 与身份比较**。
