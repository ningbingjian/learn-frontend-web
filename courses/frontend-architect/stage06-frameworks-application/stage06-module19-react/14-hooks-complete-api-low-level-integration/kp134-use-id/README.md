# RE-KP134：useId

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useId` 用于为组件实例生成适合无障碍属性关联的唯一 ID。
2. 会用一个 `useId()` 作为前缀，为同一组件中的多个关联元素生成 ID。
3. 理解多个相同组件实例各自调用 `useId` 时不会发生 ID 冲突。
4. 知道 `useId` 不能用于列表 `key`，列表 key 应来自业务数据。
5. 知道 `useId` 仍然遵守 Hooks 顶层调用规则。

> **本节核心代码**：一个 `useId()` 前缀同时关联 `label → input` 和 `input → aria-describedby`。  
> **实验辅助代码**：页面同时渲染两个 `ContactField` 实例，帮助检查实例级 ID 不冲突。

## 理论讲解

### 1. useId 解决什么问题

HTML 可访问性经常需要通过 ID 建立元素关系：

```html
<label for="email">邮箱</label>
<input id="email" aria-describedby="email-hint" />
<p id="email-hint">我们只用于发送通知。</p>
```

如果一个可复用组件写死 `id="email"`，页面渲染两次后就会出现重复 ID。

React 提供：

```jsx
const id = useId();
```

它返回与当前组件实例中的这次 `useId` 调用关联的唯一字符串。

### 2. 一个 ID 前缀可以派生多个相关 ID

不需要为每个元素都调用一次 `useId`：

```jsx
const id = useId();
const inputId = `${id}-email`;
const hintId = `${id}-hint`;
```

这样可以表达一组元素属于同一个组件实例。

### 3. 最典型用途是 accessibility

```jsx
<label htmlFor={inputId}>邮箱</label>
<input id={inputId} aria-describedby={hintId} />
<p id={hintId}>提示文字</p>
```

这让浏览器和辅助技术能建立明确的语义关系。

### 4. 不要用 useId 生成列表 key

错误：

```jsx
items.map(item => <Row key={useId()} item={item} />)
```

这里同时违反：

- Hook 不能在循环中调用；
- key 应描述业务实体身份，而不是组件渲染时临时生成的 ID。

正确方式：

```jsx
items.map(item => <Row key={item.id} item={item} />)
```

### 5. useId 仍然是普通 Hook

必须在组件或自定义 Hook 顶层调用：

```jsx
function Field() {
  const id = useId();
  // ...
}
```

不能放在普通条件、循环和事件处理器中。

## 动手编码：从 0 到 1

### 第 0 步：准备一个可复用字段组件

```jsx
function ContactField({ title }) {
  return <section>{title}</section>;
}
```

### 第 1 步：生成实例级前缀

```jsx
const id = useId();
```

### 第 2 步：派生 input 和 hint ID

```jsx
const inputId = `${id}-email`;
const hintId = `${id}-hint`;
```

### 第 3 步：建立 label / input 关系

```jsx
<label htmlFor={inputId}>邮箱</label>
<input id={inputId} />
```

### 第 4 步：建立 aria-describedby 关系

```jsx
<input aria-describedby={hintId} />
<p id={hintId}>...</p>
```

### 第 5 步：同时渲染两个实例

```jsx
<ContactField title="主联系人" />
<ContactField title="备用联系人" />
```

检查 DOM，可以看到两组 ID 不相同。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useId` 与 accessibility attribute 的关联。
- **实验辅助代码**：双实例只用于验证唯一性，不是 `useId` 的额外业务要求。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp134-use-id --config ./vite.config.js
```

## 效果验证

1. 页面同时出现主联系人与备用联系人两个字段。
2. 点击每个 label 都会聚焦它自己的 input。
3. 两个组件实例的 input ID 不相同。
4. 每个 input 的 `aria-describedby` 都指向自己实例中的 hint。
5. 能解释为什么列表 key 必须来自业务数据，而不是 `useId`。

完成后继续 **RE-KP135：useId 与 SSR 一致性**。
