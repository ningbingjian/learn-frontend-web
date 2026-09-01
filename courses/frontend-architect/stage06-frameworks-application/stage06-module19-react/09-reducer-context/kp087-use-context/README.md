# RE-KP087：useContext

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | 深层组件怎样读取离自己最近的 Context Provider，而不经过每一层 Props？ |
| Learning Artifact | 深层 Consumer + 嵌套 Provider 读取实验 |

## 先预测

同一个 `ThemeContext` 外层值是 `light`，内层 Provider 值是 `dark`。内层 Button 调用 `useContext(ThemeContext)` 会读哪个？

## 动手实验

### Step 0：准备 Context
```jsx
const ThemeContext = createContext('light');
```

### Step 1：Provider 提供值
```jsx
<ThemeContext value="dark"><Toolbar /></ThemeContext>
```

### Step 2：深层组件直接读取
```jsx
const theme = useContext(ThemeContext);
```

**观察**：无需中间组件转发，Consumer 读取树上方最近的匹配 Provider。

### Step 3：嵌套第二层 Provider
验证 nearest Provider 规则，而不是“第一次创建 Context 时的值永远有效”。

[查看最终源码](./src/main.jsx)

## 理论收束
`useContext` 订阅并读取指定 Context。读取依据是 React Tree，不是 DOM 距离；Provider 改变时 Consumer 会获得新值。

## Wrong Way
- 在条件分支里调用 Hook。
- 以为 useContext 会跨任意 React Root 自动共享。
- 中间层继续重复传同一份 Context 值。

## Production Boundary
Context 适合子树横切信息；组件 API 若只需要一两层显式数据，Props 往往更简单。

## 本课只记住 3 件事
1. useContext 读取 nearest Provider。
2. 读取沿 React Tree。
3. Consumer 会响应 Provider value 变化。

## Challenge
嵌套两个 Provider，分别在三层组件中打印读取值。

## Mastery Check
- **Must**：会读取 Context。
- **Should**：能解释 nearest Provider。
- **Expert**：能设计 Context 边界避免隐式依赖扩散。
