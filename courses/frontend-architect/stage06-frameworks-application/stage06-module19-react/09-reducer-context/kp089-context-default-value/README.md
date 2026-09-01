# RE-KP089：Context 默认值

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | `createContext(defaultValue)` 的默认值什么时候会出现？它是不是一个会自动变化的全局初始 State？ |
| Learning Artifact | 有 Provider / 无 Provider 两棵子树对照 |

## 先预测

```jsx
const ThemeContext = createContext('light');
```
如果 Consumer 上方没有任何 Provider，它读什么？如果 Provider 明确 `value="dark"` 呢？

## 动手实验

### Step 0：无 Provider Consumer
观察读取 `light`。

### Step 1：加入 Provider
```jsx
<ThemeContext value="dark"><Consumer /></ThemeContext>
```
观察读取 `dark`。

### Step 2：修改默认变量的错误想象
默认值不是 Provider 的可变 State，也不是“Provider value 未定义时自动回退”的普通配置逻辑。

[查看最终源码](./src/main.jsx)

## 理论收束
`defaultValue` 是没有匹配 Provider 时的静态 fallback。它适合有意义的独立默认行为，也可用 `null` 并在自定义 Hook 中检查“Provider 是否缺失”。

## Wrong Way
- 把 defaultValue 当全局 Store。
- 依赖默认值掩盖本应存在的 Provider。
- 默认放一个伪造对象，导致缺 Provider 时静默使用错误数据。

## Production Boundary
组件库可提供安全默认主题；认证/业务 Store 常更适合 `null` + 明确报错，避免漏 Provider 被隐藏。

## 本课只记住 3 件事
1. 默认值只在无 Provider 时使用。
2. 它不是动态 State。
3. 是否允许 fallback 是 API 设计决策。

## Challenge
把默认值设为 `null`，写一个 `useTheme()` 在缺 Provider 时抛出清晰错误。

## Mastery Check
- **Must**：能解释 defaultValue。
- **Should**：会选择安全 fallback 策略。
- **Expert**：能设计“可选 Provider / 必需 Provider”API。
