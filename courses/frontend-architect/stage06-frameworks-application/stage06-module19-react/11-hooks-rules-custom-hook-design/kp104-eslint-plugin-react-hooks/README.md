# RE-KP104：eslint-plugin-react-hooks

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 说明为什么 Hooks 规则需要静态检查，而不能只依赖运行时经验。
2. 区分 `rules-of-hooks` 与 `exhaustive-deps` 的职责。
3. 理解当前 `eslint-plugin-react-hooks` 还会承接 React Compiler 相关诊断。
4. 知道 lint 报错的目标是帮助修正代码结构，而不是机械关闭规则。

## 理论讲解

### 1. Lint 是 Hooks 规则的自动防线

Hooks 调用顺序必须稳定。很多错误在小页面里可能暂时“看起来能跑”，但重构、条件变化或组件复杂后才暴露。`eslint-plugin-react-hooks` 可以在构建或编辑阶段提前发现这些问题。

### 2. 两条最基础规则

- `rules-of-hooks`：检查 Hook 是否只在合法位置调用。
- `exhaustive-deps`：检查 Effect、Memo 等依赖列表是否覆盖所使用的 reactive values。

它们解决的是不同问题：前者关注“在哪里调用”，后者关注“依赖是否完整”。

### 3. 现代插件范围更广

当前 React 官方文档说明，推荐规则不再只包含两条经典规则，还包括 purity、immutability、refs、set-state-in-render、static-components 等诊断，并可承接 React Compiler 的静态诊断。

这意味着：即使项目暂时没有启用 Compiler，lint 仍可帮助提前发现不利于正确性和优化的模式。

### 4. 不要把关闭规则当成修复

遇到 lint 报告时，优先问：

- Hook 是否放错位置？
- Effect 是否真的需要？
- 依赖是否可以通过重构变得更清晰？

而不是第一时间写 disable comment。

## 动手编码：从 0 到 1

### 第 1 步：写一个最小组件

目标：先保证 Hook 在组件顶层调用。

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

为什么这样写：`useState` 的调用位置固定，不依赖任何分支。

运行后应观察：点击按钮计数正常递增。

### 第 2 步：理解 lint 会拒绝什么

下面只作为错误示例，不写入最终源码：

```jsx
if (enabled) {
  const [count, setCount] = useState(0);
}
```

问题不是“if 不能出现”，而是 Hook 的调用顺序会随 Render 条件变化。

### 第 3 步：把条件放到 Hook 之后

```jsx
function Counter({ enabled }) {
  const [count, setCount] = useState(0);
  if (!enabled) return <p>Disabled</p>;
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

为什么这样写：Hook 仍然每次以相同顺序执行，条件只影响后续 JSX。

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：合法的顶层 Hook 调用结构。

实验辅助代码：页面中的 enable/disable 切换用于验证组件行为，不代表 lint 配置本身。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp104-eslint-plugin-react-hooks/
```

## 效果验证

- Hook 始终位于 Function Component 顶层。
- 条件渲染不会改变 Hook 调用顺序。
- 能解释 `rules-of-hooks` 与 `exhaustive-deps` 的差别。
- 能理解本课程没有为了本知识点擅自修改整个模块的 ESLint 依赖；这里学习的是规则模型与正确代码结构。
