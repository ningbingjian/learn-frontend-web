# RE-KP150：Props 更新与 DOM 更新

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解同一个 DOM Element Type 匹配后，React 会把新的 Props 反映到真实 DOM。
2. 理解 Commit 阶段只需要应用前后 Render 真正不同的 DOM 变化。
3. 区分 attribute/property/text 等不同 DOM 更新表现。
4. 使用 MutationObserver 辅助观察浏览器实际发生了哪些 mutation。
5. 理解 MutationObserver 是实验工具，不是 React 更新 DOM 的必需机制。

> **本节核心代码**：通过 State 改变 `data-count`、文本和 `disabled` Prop，React 在 Commit 中把对应差异应用到已有 DOM。  
> **实验辅助代码**：`MutationObserver` 只用于记录浏览器 mutation，React 本身并不依赖它完成更新。

## 理论讲解

### 1. Render 先计算新的 Props

例如：

```jsx
<button disabled={disabled}>
  Action
</button>
```

State 变化后，下一次 Render 可能得到：

```text
disabled: false → true
```

### 2. 同 Type 不需要替换整个节点

前后仍是：

```text
button
```

React 可以继续复用这个 DOM 节点，只把 `disabled` 的变化提交进去。

### 3. Text 也属于需要同步的输出

例如：

```jsx
<p>Count: {count}</p>
```

`count` 改变后，页面文本也要更新。

但同一个 section 中完全没变的其它节点不需要因为 count 变化而重建。

### 4. Minimal DOM Change 是 Commit 的重要特征

可以建立这样的模型：

```text
Previous Render Output
        ↓ compare
Next Render Output
        ↓
Commit necessary DOM mutations
```

这不要求你手工写 DOM diff。

### 5. MutationObserver 只是观察器

浏览器提供：

```js
new MutationObserver(callback)
```

可以观察：

- attributes；
- childList；
- characterData。

本课用它验证真实 DOM mutation，但它不是 React Reconciliation 的实现方式。

## 动手编码：从 0 到 1

### 第 0 步：创建可变化的 Props

**目标**：准备两个独立变化维度。

```jsx
const [count, setCount] = useState(0);
const [disabled, setDisabled] = useState(false);
```

**为什么这样写**：分别观察文字/data attribute 和 disabled attribute。

**观察**：两个 State 可以独立更新。

### 第 1 步：把 State 映射为 DOM Props

**目标**：让 Render 输出真实变化。

```jsx
<section ref={cardRef} data-count={count}>
  <p>Count: {count}</p>
  <button disabled={disabled}>Action</button>
</section>
```

**为什么这样写**：同一个 Host tree 中包含 attribute、text 和 property/attribute 变化。

**观察**：页面值会随 State 改变。

### 第 2 步：增加 count

**目标**：只改变 count 相关输出。

```jsx
setCount(count + 1);
```

**为什么这样写**：`disabled` 没变，不应该因为 count 更新而被反复切换。

**观察**：Count 文本与 `data-count` 更新。

### 第 3 步：切换 disabled

**目标**：独立观察 button Prop 更新。

```jsx
setDisabled(!disabled);
```

**为什么这样写**：与 count 无关。

**观察**：button 可用状态改变，Count 不变。

### 第 4 步：加入 MutationObserver

**目标**：把浏览器 mutation 记录出来。

```jsx
const observer = new MutationObserver(mutations => {
  // 把 mutation type / attributeName 转成展示文本
});
```

观察目标：

```jsx
observer.observe(cardRef.current, {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
});
```

**为什么这样写**：直接从浏览器观察 Commit 之后的真实 DOM mutation。

**观察**：不同按钮触发的 mutation 类型不同。

### 第 5 步：确保 observer cleanup

**目标**：正确管理外部系统订阅。

```jsx
return () => observer.disconnect();
```

**为什么这样写**：MutationObserver 是外部浏览器 API，需要对称清理。

**观察**：组件卸载时不留下 observer。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React Props/children 变化映射到已有 DOM 的必要更新。
- **实验辅助代码**：MutationObserver 和 mutation 日志列表。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp150-props-dom-update --config ./vite.config.js
```

## 效果验证

1. 点击“增加 count”，观察 Count 与 `data-count` 对应变化。
2. 日志出现 count 相关 DOM mutation。
3. 点击“切换 disabled”，button 可用状态变化。
4. 日志出现 disabled attribute 相关 mutation。
5. 能解释同一个 Host Type 不需要为了 Props 变化整体替换节点。
6. 能说明 MutationObserver 只是本课观察工具，不参与 React 自身 Reconciliation。

完成后 Chapter 15 收官，继续 **RE-KP151：Concurrent Rendering 的目标**。
