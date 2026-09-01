# RE-KP090：Context 更新与重新渲染

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `PERFORMANCE-LAB` |
| 学习深度 | Should |
| 本课主问题 | Provider value 改变后，哪些 Consumer 会看到新值？为什么 Context 也会成为性能边界？ |
| Learning Artifact | Provider value toggle + Consumer render/log 观察 |

## 先预测

Theme Provider 从 `light` 改 `dark`，深层 Consumer 即使没有收到普通 Props，是否会重新得到新值？

## 动手实验

### Step 0：Consumer 读取 theme
加入 render 日志，只用于实验观察。

### Step 1：Provider State 更新
```jsx
const [theme, setTheme] = useState('light');
<ThemeContext value={theme}>...</ThemeContext>
```

### Step 2：切换 theme
**观察**：订阅该 Context 的 Consumer 会读到新值并更新 UI。

### Step 3：扩大 Provider value
如果 value 是每次 Render 新建的大对象，考虑它是否把不相关变化也放进同一更新边界；先用 Profiler/实际数据判断，不机械 `useMemo`。

[查看最终源码](./src/main.jsx)

## 理论收束
Context 是数据依赖，不只是“省 Props”。Provider value 变化会传播给读取该 Context 的 Consumer。因此 Context 粒度、value 设计和 Provider 位置都会影响更新范围。

## Wrong Way
- 把所有页面 State 打包进单个巨型 Context。
- 一看到对象 value 就无条件 useMemo。
- 认为 `memo` 能让 Consumer 忽略它实际读取的 Context 更新。

## Production Boundary
低频横切配置非常适合 Context；高频、大对象、不同变化频率的数据应考虑拆 Context 或其它 Store/selector 方案，并以 Profiler 为证据。

## 本课只记住 3 件事
1. Consumer 订阅 Provider value。
2. Context 也是更新边界。
3. 优化先看粒度和证据。

## Challenge
把一个 `{theme,user}` Context 拆成两个，观察只改 theme 时哪些 Consumer 需要更新。

## Mastery Check
- **Must**：知道 Provider 更新会传播。
- **Should**：能分析 Context 粒度。
- **Expert**：能用 Profiler 评估 Context 架构。
