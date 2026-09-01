# RE-KP203：Hydration Mismatch

> [返回 Chapter 21](../README.md)

## 学习目标

1. 理解 Hydration 要求服务端 HTML 与客户端首次 Render 输出匹配。
2. 用确定性的 server/client 文本差异制造 Hydration Mismatch。
3. 学会把 mismatch 当作 Bug 定位，而不是习惯性使用 warning suppression。

## 理论讲解

Hydration 的前提是：用户先看到的 Server HTML，应该和客户端 React 第一次计算得到的 UI 相同。

常见 mismatch 来源包括：

- 服务端和客户端使用不同数据；
- Render 中直接读取 `window`、`localStorage` 等浏览器专属信息；
- 时间、随机数、Locale 结果在两端不一致；
- DOM 结构本身不合法或存在额外空白/节点差异。

React 可以对部分 mismatch 做恢复，但这不是正确业务逻辑的替代品。

## 动手编码：从 0 到 1

### 第 1 步：让同一个 App 接收 label

```jsx
function App({ label }) {
  return <h1>{label}</h1>;
}
```

### 第 2 步：服务端输出固定为 Server snapshot

```jsx
const serverHtml = renderToString(<App label="Server snapshot" />);
```

### 第 3 步：客户端故意使用不同 label

```jsx
hydrateRoot(root, <App label="Client first render" />, options);
```

### 第 4 步：通过 onRecoverableError 观察恢复错误

```js
onRecoverableError(error) {
  output.textContent = error.message;
}
```

预期：React 报告 hydration 恢复问题，并可能重新生成不匹配的子树。

## 运行案例

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## 效果验证

1. `Server HTML` 中能看到 `Server snapshot`。
2. 客户端首次树却要求 `Client first render`。
3. 页面会展示 `onRecoverableError` 捕获到的恢复信息。
4. 打开 Console 也可能看到开发环境下更完整的 mismatch 诊断。

## 本节核心代码

- Hydration Mismatch 本质是两端“第一次 UI 计算”不一致。
- `onRecoverableError` 是可观测入口，不是修复方案。
- 优先修复数据和 Render 逻辑，使两端首次输出一致。

## 实验辅助代码

- 本课的 mismatch 是故意制造的教学 Bug。
- 不使用 `suppressHydrationWarning`，因为这里的差异完全可以修复。

[查看最终源码](./src/main.jsx)
