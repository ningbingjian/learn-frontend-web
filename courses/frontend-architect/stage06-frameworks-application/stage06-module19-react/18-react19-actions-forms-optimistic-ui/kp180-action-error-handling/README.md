# RE-KP180：Action 错误处理

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 区分“可预期业务错误”和“意外异常”。
2. 学会把已知错误作为 Action 结果返回给 `useActionState`。
3. 理解未知异常为什么应该 `throw`。
4. 理解 thrown Action error 会交给最近的 Error Boundary。
5. 知道 `useActionState` 抛错时 React 会取消其排队 Action。

## 理论讲解

### 1. 不是所有失败都应该 throw

库存不足、验证码错误、用户名占用，通常是业务允许发生的结果。

这类错误适合：

```jsx
return {
  kind: 'error',
  message: '库存不足',
};
```

页面可以继续保留 Form 并展示提示。

### 2. 意外异常应该抛出

例如程序 bug、不可恢复的服务异常：

```jsx
throw new Error('Unexpected failure');
```

React 会把它交给最近 Error Boundary。

### 3. 为什么要区分

如果所有失败都 throw，普通业务校验也会把整片 UI 切到错误页。

如果所有失败都 return，真正的编程异常又会被静默吞掉。

所以工程设计应该建立：

```text
Expected Error   -> return state
Unexpected Error -> throw
```

## 动手编码：从 0 到 1

### 第 1 步：创建 useActionState

```jsx
const [state, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    const code = String(formData.get('code') ?? '').trim();
    // ...
  },
  { kind: 'idle', message: '' },
);
```

### 第 2 步：返回已知业务错误

```jsx
if (!code) {
  return {
    kind: 'error',
    message: '请输入商品编码。',
  };
}
```

### 第 3 步：抛出未知异常

```jsx
if (code.toLowerCase() === 'crash') {
  throw new Error('模拟未知 Action 异常');
}
```

### 第 4 步：增加 Error Boundary

本课使用最小 Class Error Boundary 捕获 Action 抛错，并提供重新加载按钮。

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：`useActionState` 的 return-error 与 throw-error 两条路径。

**实验辅助代码**：`ActionErrorBoundary` 和 `crash` 特殊输入用于稳定观察 Boundary 行为。

## 运行案例

1. 空输入提交：看到表单内业务错误。
2. 输入 `A-100`：看到成功状态。
3. 输入 `crash`：最近 Error Boundary 接管 UI。

## 效果验证

- 普通业务错误不会摧毁整个 Form UI。
- 未知异常不会被 Action 静默吞掉。
- 错误责任边界清晰：state vs Error Boundary。
