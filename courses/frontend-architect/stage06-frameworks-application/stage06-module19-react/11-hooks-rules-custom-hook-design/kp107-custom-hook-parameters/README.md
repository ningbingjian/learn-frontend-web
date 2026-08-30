# RE-KP107：自定义 Hook 参数设计

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 能为 Custom Hook 设计清晰、稳定的输入契约。
2. 理解什么时候单参数足够，什么时候应该升级为 Options Object。
3. 避免让 Hook 参数变成一串难记的 positional booleans/numbers。

## 理论讲解

### 1. 参数应该描述 Hook 的业务输入

一个好的 Hook 调用应该接近声明式配置：

```jsx
useStepper({ initialStep: 2, min: 1, max: 5, step: 1 })
```

调用者能直接看懂每个参数含义。

### 2. 参数少而稳定时可以保持简单

例如 `useToggle(false)` 只有一个明确参数，没有必要强行包对象。

### 3. 参数变多时优先 Options Object

Options Object 的好处：

- 参数顺序不敏感
- 调用点自解释
- 未来增加可选项更容易
- 可以给字段设置默认值

### 4. 参数应是业务事实，不是内部实现细节

调用者应该告诉 Hook “我要最小值 1、最大值 5”，而不是告诉它“内部请用三个 State”。

## 动手编码：从 0 到 1

### 第 1 步：定义 Options Object

```jsx
function useStepper({
  initialStep = 1,
  min = 1,
  max = 5,
  step = 1,
} = {}) {
  // ...
}
```

### 第 2 步：在 Hook 内维护边界

```jsx
setValue(current => Math.min(max, current + step));
```

边界规则由 Hook 封装，组件不重复实现。

### 第 3 步：调用点只传业务配置

```jsx
const stepper = useStepper({ initialStep: 2, min: 1, max: 5 });
```

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：`useStepper(options)` 的参数契约。

实验辅助代码：页面按钮用于验证 min/max 边界。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp107-custom-hook-parameters/
```

## 效果验证

- 调用点能直接看懂参数含义。
- Hook 内统一处理边界。
- 新增配置时不需要改变现有参数顺序。
