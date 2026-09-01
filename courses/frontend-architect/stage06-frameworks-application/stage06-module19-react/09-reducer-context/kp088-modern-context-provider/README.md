# RE-KP088：现代 Context Provider

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | React 19 为什么可以直接把 Context 对象作为 Provider 渲染？ |
| Learning Artifact | `<Context.Provider>` 与 React 19 `<Context>` 写法对照 |

## 先观察旧写法
```jsx
<ThemeContext.Provider value={theme}>...</ThemeContext.Provider>
```

React 19 可以写：
```jsx
<ThemeContext value={theme}>...</ThemeContext>
```

## 动手对照

### Step 0：保留同一 Context / Consumer
确保变量只有 Provider 语法变化。

### Step 1：切到现代 Provider
运行并验证深层 Consumer 得到同样值。

### Step 2：确认职责没有变化
语法更短，但 Provider 仍定义“这棵子树从这里开始使用哪个 value”。

[查看最终源码](./src/main.jsx)

## 理论收束
React 19 支持将 Context 本身渲染为 Provider；旧 `.Provider` 在兼容旧代码时仍常见。教学重点是 Provider 边界，而不是把语法变化误解为 Context 机制重写。

## Wrong Way
- 为追新语法无意义改动旧稳定库。
- 同一代码库混用后声称语义不同。
- 忽略项目 React 版本。

## Production Boundary
新 React 19 项目可优先现代写法；库代码需考虑支持的 React 版本范围。

## 本课只记住 3 件事
1. React 19 可直接 `<Context value>`。
2. Provider 语义没变。
3. 版本兼容决定库代码写法。

## Challenge
在同一示例里用新旧写法分别包两棵子树，对比 Consumer。

## Mastery Check
- **Must**：认识 React 19 Provider 语法。
- **Should**：能解释版本边界。
- **Expert**：能为库制定兼容策略。
