# RE-KP091：useRef 保存非渲染数据

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | 一个值需要跨 Render 保存，但改变它又不应该刷新 UI，放哪里？ |
| Learning Artifact | interval/request ID Ref + Render 计数对照 |

## 先预测

计时器 ID 改变时页面需要重渲染吗？如果不需要，把它放 State 会带来什么额外工作？

## 动手实验

### Step 0：创建 Ref
```jsx
const intervalRef = useRef(null);
```

### Step 1：写入 current
```jsx
intervalRef.current = setInterval(...);
```

### Step 2：稍后读取并清理
```jsx
clearInterval(intervalRef.current);
```

**观察**：`.current` 跨 Render 保留，但修改它不会请求新 Render。

[查看最终源码](./src/main.jsx)

## 理论收束
Ref 是一个稳定对象 `{ current }`。它适合保存不用于当前 JSX 输出、但需要跨 Render 持久存在的命令式信息。

## Wrong Way
- 把显示在页面上的 count 只存在 Ref。
- Render 期间依赖 `ref.current` 决定主要 UI。
- 用全局变量替代组件实例自己的 Ref。

## Production Boundary
Timer ID、AbortController、第三方实例、上一次测量值等常适合 Ref；真正驱动 UI 的事实应使用 State。

## 本课只记住 3 件事
1. Ref 跨 Render 保留。
2. 改 current 不触发 Render。
3. Ref 用于非渲染数据。

## Challenge
用 Ref 保存“点击次数但不显示”，再用另一个按钮读取它到 Console。

## Mastery Check
- **Must**：会读写 ref.current。
- **Should**：能识别非渲染数据。
- **Expert**：能避免 Ref 破坏声明式数据流。
