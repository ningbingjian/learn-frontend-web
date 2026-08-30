# RE-KP108：自定义 Hook 返回值设计

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 把 Custom Hook 的返回值看成公共 API，而不是随手把内部 State setter 全部暴露出去。
2. 区分“读取接口”和“动作接口”。
3. 通过封装减少调用者破坏 Hook 内部不变量的机会。

## 理论讲解

### 1. 返回值是 Hook 的契约

调用者不需要知道 Hook 内部用了几个 `useState`。它只需要获得完成任务所需的值和动作。

### 2. 避免无条件暴露原始 setter

例如选择逻辑可以返回：

```jsx
{
  selectedId,
  select,
  clear,
  isSelected,
}
```

而不是把 `setSelectedId` 原样暴露出去。

这样 Hook 可以在动作内部继续增加校验、日志或状态规则，而不必修改所有调用点。

### 3. 读取和动作要有语义名称

- 读取：`selectedId`
- 判断：`isSelected(id)`
- 动作：`select(id)`、`clear()`

调用代码更接近业务语言。

## 动手编码：从 0 到 1

### 第 1 步：定义内部 State

```jsx
const [selectedId, setSelectedId] = useState(initialId);
```

### 第 2 步：封装动作

```jsx
function select(id) {
  setSelectedId(id);
}

function clear() {
  setSelectedId(null);
}
```

### 第 3 步：只返回必要能力

```jsx
return {
  selectedId,
  select,
  clear,
  isSelected: id => selectedId === id,
};
```

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：语义化 return contract。

实验辅助代码：用户列表只用于观察 `select/clear/isSelected`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp108-custom-hook-return-values/
```

## 效果验证

- 组件不直接操作 Hook 内部 setter。
- 返回值能清楚区分数据读取与业务动作。
- Hook 内部实现可以变化，而调用组件仍依赖稳定 API。
