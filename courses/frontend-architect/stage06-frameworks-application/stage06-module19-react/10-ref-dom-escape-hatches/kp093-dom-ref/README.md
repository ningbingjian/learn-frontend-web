# RE-KP093：DOM Ref

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | React 管理 DOM 时，业务代码什么时候、怎样安全拿到真实 DOM 节点？ |
| Learning Artifact | input DOM Ref + focus 实验 |

## 先预测

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
```
首次 Render 期间 `inputRef.current` 已经是 input 吗？

## 动手实验

### Step 0：创建空 Ref
`useRef(null)`，此时没有 DOM。

### Step 1：绑定 Host Element
```jsx
<input ref={inputRef} />
```
React Commit 后把真实节点写入 `current`。

### Step 2：事件中使用 DOM API
```jsx
inputRef.current?.focus();
```
点击按钮，观察焦点进入输入框。

[查看最终源码](./src/main.jsx)

## 心智模型
```text
Render describes <input ref=...>
        ↓ Commit
React creates/updates DOM
        ↓
ref.current = DOM node
        ↓ event/effect
imperative DOM API
```

## Wrong Way
- Render 中调用 `focus()`。
- 能用 Props/State 表达的 UI 仍手动改 DOM。
- 不处理节点暂时为 null 的生命周期。

## Production Boundary
Focus、scroll、selection、媒体控制、测量和第三方 DOM 库是典型 Ref 场景。

## 本课只记住 3 件事
1. DOM Ref 在 Commit 后可用。
2. Ref 是必要的命令式桥梁。
3. 默认仍优先声明式 Props/State。

## Challenge
加入按钮调用 `select()`，观察 input selection。

## Mastery Check
- **Must**：会获取和使用 DOM Ref。
- **Should**：知道 Ref 可用时机。
- **Expert**：能限制直接 DOM 操作边界。
