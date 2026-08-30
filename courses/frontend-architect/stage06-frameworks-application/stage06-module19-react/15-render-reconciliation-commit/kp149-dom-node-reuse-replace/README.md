# RE-KP149：DOM 节点复用与替换

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分“同一个 Host Element Type 更新 Props”和“Host Element Type 发生变化”。
2. 理解同 Type 匹配时 React 可以继续复用真实 DOM 节点。
3. 理解不同 Host Type 时旧 DOM 节点会被替换成新节点。
4. 会通过 Ref 引用比较验证真实 DOM 对象是否被复用。
5. 理解 DOM 节点身份与组件重新 Render 是两个不同概念。

> **本节核心代码**：`button → button` 只更新内容时继续复用节点；`button → a` 时 Host Type 改变，真实 DOM 对象被替换。  
> **实验辅助代码**：`firstNodeRef`、`handleInspect` 与身份提示只用于观察 DOM 引用。

## 理论讲解

### 1. Host Element 是什么

React JSX 中：

```jsx
<button />
<a />
<div />
```

最终对应浏览器真实 DOM 节点。

本节把它们称作 Host Element。

### 2. 同 Type 时可以复用

例如：

```jsx
<button>保存</button>
```

变成：

```jsx
<button>提交</button>
```

前后 Host Type 都是：

```text
button
```

React 没有必要为了修改文字就删除旧 `<button>` 再创建新 `<button>`。

### 3. 不同 Type 时需要替换

如果：

```jsx
<button>打开</button>
```

变成：

```jsx
<a href="#demo">打开</a>
```

Host Type 从：

```text
button
```

变为：

```text
a
```

这时真实 DOM 节点身份也会变化。

### 4. “组件函数重新执行”不等于“DOM 节点替换”

一次 State 更新可以触发：

```text
Function Component 再次执行
```

但 Commit 阶段可能只需要：

```text
更新某个 text node
```

甚至某些 DOM 节点完全不需要修改。

### 5. DOM identity 可以用引用直接比较

浏览器 DOM 对象是普通对象引用：

```js
currentNode === previousNode
```

结果为 `true`，说明仍是同一个真实 DOM 对象。

## 动手编码：从 0 到 1

### 第 0 步：渲染固定 button

**目标**：准备一个 Host DOM 节点。

```jsx
<button ref={hostRef}>保存</button>
```

**为什么这样写**：`hostRef.current` 会拿到真实 `HTMLButtonElement`。

**观察**：页面出现按钮。

### 第 1 步：保存首次 DOM 节点

**目标**：准备 identity 比较基准。

```jsx
const firstNodeRef = useRef(null);

useLayoutEffect(() => {
  if (firstNodeRef.current === null) {
    firstNodeRef.current = hostRef.current;
  }
}, []);
```

**为什么这样写**：首次 Commit 后保存真实节点。

**观察**：后续可以和当前 Ref 比较。

### 第 2 步：只修改 label

**目标**：验证同 Type 更新 Props/children 不需要替换节点。

```jsx
setLabel(label === '保存' ? '提交' : '保存');
```

渲染仍是：

```jsx
<button ref={hostRef}>{label}</button>
```

**为什么这样写**：Host Type 始终是 `button`。

**观察**：label 变化，但节点身份保持。

### 第 3 步：切换 Host Type

**目标**：验证不同 Type 会换成新的 DOM 对象。

```jsx
{kind === 'button' ? (
  <button ref={hostRef}>{label}</button>
) : (
  <a ref={hostRef} href="#demo">{label}</a>
)}
```

**为什么这样写**：前后 Type 明确从 `button` 切成 `a`。

**观察**：切换后当前节点与首次 button 引用不再相同。

### 第 4 步：加入手动检查

**目标**：把引用比较结果直接显示到页面。

```jsx
const sameNode = hostRef.current === firstNodeRef.current;
```

**为什么这样写**：引用比较比“肉眼看起来一样”更可靠。

**观察**：只换 label 时为同一个节点；切换为 link 后变为不同节点。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同 Host Type 的 DOM 复用与不同 Host Type 的 DOM 替换。
- **实验辅助代码**：首次节点缓存和身份提示。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp149-dom-node-reuse-replace --config ./vite.config.js
```

## 效果验证

1. 首次页面渲染 button。
2. 点击“切换 label”，再检查节点身份，仍是首次 DOM 节点。
3. 点击“切换 Host Type”，button 变为 a。
4. 再检查节点身份，当前 DOM 已不是首次 button。
5. 能解释 Function Component 重跑和真实 DOM 节点被替换不是一回事。
6. 能解释 Host Type 变化为什么会影响 DOM identity。

完成后继续 **RE-KP150：Props 更新与 DOM 更新**。
