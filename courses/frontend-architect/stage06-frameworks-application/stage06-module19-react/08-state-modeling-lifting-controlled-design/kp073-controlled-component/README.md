# RE-KP073：受控组件

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解广义的 Controlled Component：关键状态由父组件通过 Props 驱动。
2. 知道“受控”不只指 `<input value={...}>`。
3. 会设计 `value + onChange`、`open + onOpenChange`、`isActive + onShow` 这类受控 API。
4. 理解受控组件通常更容易被父级协调。
5. 知道受控组件不是“没有交互逻辑”，而是“不拥有那份关键状态”。
6. 能区分 State owner 与交互 UI 的职责。

> **本节核心代码**：`Toggle({ checked, onCheckedChange })` 完全由父组件 State 驱动，子组件只渲染值并报告用户意图。  
> **实验辅助代码**：父组件提供“全部开启 / 全部关闭”按钮，用来证明受控子组件可以被外部统一协调。

## 理论讲解

### 1. 什么是受控组件

在组件层面，可以先记：

```text
组件的重要信息由 Props 决定
用户交互通过 callback 报告给 owner
```

例如：

```jsx
<Toggle
  checked={notificationsEnabled}
  onCheckedChange={setNotificationsEnabled}
/>
```

`Toggle` 不自己决定最终 `checked`。

它只做：

```text
显示 checked
用户点击后调用 onCheckedChange(nextValue)
```

### 2. 受控并不只用于表单 input

你经常会看到：

```jsx
<input value={name} onChange={...} />
```

这是经典受控表单控件。

但组件 API 同样可以受控：

```jsx
<Dialog open={open} onOpenChange={setOpen} />
<Tabs value={tab} onValueChange={setTab} />
<Accordion activeId={id} onActiveIdChange={setId} />
```

本质都一样：

```text
值由外部 owner 提供
变化意图通过事件回调上报
```

### 3. 受控组件的数据流

```text
Parent State
    ↓ checked
Toggle
    ↓ 用户点击
onCheckedChange(next)
    ↓
Parent setState
    ↓
Parent Render
    ↓ checked
Toggle 更新
```

注意：

```text
Toggle 点击按钮
```

并不代表 Toggle 自己拥有 State。

### 4. 为什么受控组件容易协调

如果两个 Toggle 都由父组件管理：

```jsx
const [emailEnabled, setEmailEnabled] = useState(true);
const [smsEnabled, setSmsEnabled] = useState(false);
```

父组件可以轻易提供：

```jsx
function enableAll() {
  setEmailEnabled(true);
  setSmsEnabled(true);
}
```

如果 State 完全藏在两个子组件里，父组件就很难直接统一控制。

### 5. 受控 API 的命名应该表达语义

常见模式：

```text
value / onChange
checked / onCheckedChange
open / onOpenChange
selectedId / onSelectedIdChange
```

不要机械要求所有组件都必须叫 `value`。

更重要的是：

```text
当前值是什么
谁拥有它
用户请求变化时回调叫什么
```

### 6. 受控组件仍然可以有其他局部 State

一个受控 `Dialog` 的 `open` 来自父组件，不代表它内部绝对不能有任何 State。

它仍可能有：

```text
临时 hover
内部动画阶段
局部搜索草稿
```

“受控/非受控”通常描述的是某一个重要维度，而不是整个组件的绝对分类。

### 7. 什么时候适合受控

适合父组件必须：

- 协调多个兄弟组件。
- 从外部强制改变值。
- 根据其他业务状态计算当前值。
- 记录、校验或同步这份状态。

但它的代价是 Props 和 callback 增加。

下一节会学习非受控组件，再比较两者。

## 动手编码：从 0 到 1

### 第 0 步：写一个没有本地 State 的 Toggle

```jsx
function Toggle({ label, checked, onCheckedChange }) {
  return (
    <button onClick={() => onCheckedChange(!checked)}>
      {label}: {checked ? 'ON' : 'OFF'}
    </button>
  );
}
```

注意：没有 `useState`。

### 第 1 步：父组件成为 owner

```jsx
const [emailEnabled, setEmailEnabled] = useState(true);
const [smsEnabled, setSmsEnabled] = useState(false);
```

### 第 2 步：下发受控值和回调

```jsx
<Toggle
  label="Email"
  checked={emailEnabled}
  onCheckedChange={setEmailEnabled}
/>
```

另一个同理。

### 第 3 步：验证子组件仍然可交互

用户点击 Toggle：

```text
Toggle 计算 !checked
→ 调 callback
→ Parent 更新 State
→ 新 checked 传回
```

### 第 4 步：父组件增加统一控制

```jsx
<button onClick={() => {
  setEmailEnabled(true);
  setSmsEnabled(true);
}}>
  全部开启
</button>
```

再加入全部关闭。

### 第 5 步：理解受控的真正价值

子组件不需要知道：

```text
为什么父组件突然把我打开？
```

它只接受最新 `checked`。

这让父级可以做跨组件协调。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`checked + onCheckedChange` 受控 API。
- **实验辅助代码**：全部开启/关闭按钮用于展示外部协调能力。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp073-controlled-component --config ./vite.config.js
```

## 效果验证

1. Email / SMS Toggle 都能独立点击。
2. Toggle 组件源码内部没有管理 `checked` 的 `useState`。
3. 点击“全部开启”，两个 Toggle 同时 ON。
4. 点击“全部关闭”，两个 Toggle 同时 OFF。
5. 能画出 Parent State → Props → Child → Callback → Parent 的单向数据流。
6. 能解释“受控”是某个重要状态维度由外部 owner 驱动，而不是组件绝对不能有任何局部 State。

完成后继续 **RE-KP074：非受控组件**。
