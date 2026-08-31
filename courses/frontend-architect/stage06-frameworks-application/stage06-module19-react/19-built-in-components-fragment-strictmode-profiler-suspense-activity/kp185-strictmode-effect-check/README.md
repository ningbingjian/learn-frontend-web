# RE-KP185：StrictMode 的 Effect 检查

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 StrictMode 开发期为什么额外执行 Effect setup/cleanup 周期。
2. 识别“建立外部连接但没有 cleanup”的资源泄漏。
3. 用 setup/cleanup 对称性修复问题。
4. 区分开发期压力测试与依赖变化导致的正常重新同步。

## 理论讲解

### 1. Setup

Effect 可以建立订阅、连接、事件监听等外部资源。setup 创建了什么，通常就需要 cleanup 撤销什么。

### 2. Cleanup

正确模式：

```jsx
useEffect(() => {
  connect();
  return () => disconnect();
}, []);
```

### 3. Re-run

在 root StrictMode 的开发环境中，React 会额外执行一次 setup + cleanup 周期，再进行实际 setup。这是一种压力测试：如果 cleanup 正确，用户不应该因为 `setup → cleanup → setup` 而看到资源持续泄漏。

本课并排放两个 probe：

- BadConnection：setup 只增加连接，没有 cleanup。
- GoodConnection：setup 增加，cleanup 对称减少。

## 动手编码：从 0 到 1

### 第 1 步：定义外部连接计数

模块级 `badConnections/goodConnections` 模拟 React 外部资源。

### 第 2 步：写缺 cleanup 的 Effect

BadConnection 每次 setup 都让计数 +1。

**预期**：StrictMode 开发检查后连接数会大于真实需要。

### 第 3 步：写对称 cleanup

GoodConnection setup +1，cleanup -1。

**预期**：开发检查完成后最终仍只有一个有效连接。

### 第 4 步：用 output ref 展示结果

直接更新 `<output>` 只是为了观察外部系统计数，不是本节核心业务模式。

### 第 5 步：最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：Effect setup/cleanup 对称性。
- **实验辅助代码**：模块级计数与 output ref。

## 运行案例

```bash
npm run dev
```

## 效果验证

- BadConnection 暴露重复有效连接。
- GoodConnection 在额外检查后仍保持正确有效连接数。
- 不要通过删除 StrictMode 来“修复”问题。
- production 中 Effect 仍会在真实依赖变化或卸载时执行必要 cleanup/setup。
