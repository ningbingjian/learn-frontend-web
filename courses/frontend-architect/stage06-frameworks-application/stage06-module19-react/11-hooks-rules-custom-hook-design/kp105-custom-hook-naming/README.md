# RE-KP105：自定义 Hook 的命名规则

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 掌握 Custom Hook 必须以 `use` 开头并紧跟大写字母的命名约定。
2. 理解命名不仅是风格问题，还影响开发者与 linter 对 Hook 调用约束的识别。
3. 能区分普通 helper 与 Custom Hook。

## 理论讲解

### 1. Hook 名称必须表达“这里可能调用其他 Hook”

典型命名：

- `useToggle`
- `useOnlineStatus`
- `useChatRoom`

看到 `useXxx()`，调用者就知道它必须遵守 Hooks 规则。

### 2. 普通函数不要滥用 `use` 前缀

如果函数只是纯计算，不调用任何 Hook，也不计划未来引入 Hook，应该保持普通函数名称，例如 `formatStatus()`、`getSortedItems()`。

这样普通 helper 可以自由地在条件、循环等位置调用，而不会被误解为 Hook。

### 3. 命名是一种 API 契约

`use` 前缀向团队声明：

- 这是 React stateful logic 的封装。
- 调用位置受 Rules of Hooks 限制。
- 内部可能包含 State、Context、Effect 等 React 能力。

## 动手编码：从 0 到 1

### 第 1 步：写普通 helper

```jsx
function formatStatus(on) {
  return on ? 'ON' : 'OFF';
}
```

它不调用 Hook，所以不应该命名为 `useStatusText`。

### 第 2 步：提取 `useToggle`

```jsx
function useToggle(initialValue = false) {
  const [on, setOn] = useState(initialValue);
  function toggle() {
    setOn(value => !value);
  }
  return { on, toggle };
}
```

### 第 3 步：在组件顶层调用

```jsx
const { on, toggle } = useToggle(true);
```

为什么这样写：Custom Hook 的调用位置也必须稳定。

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：`useToggle` 与 `formatStatus` 的命名对比。

实验辅助代码：按钮与状态文字只是为了观察 Hook 返回结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp105-custom-hook-naming/
```

## 效果验证

- Custom Hook 名称为 `use` + 大写字母开头的语义名称。
- 普通 helper 不滥用 `use` 前缀。
- Custom Hook 在组件顶层调用。
