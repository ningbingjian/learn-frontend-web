# RE-KP097：useImperativeHandle

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `BUILD-LAB` |
| 学习深度 | Should |
| 本课主问题 | 父组件确实需要命令式控制时，怎样避免直接暴露子组件整个 DOM？ |
| Learning Artifact | raw DOM ref → custom imperative handle 重构 |

## 先观察风险
如果 `MyInput` 直接把 `<input>` DOM 暴露给父级，父级可以随意改 style/value/attributes，组件内部封装还有多强？

## 动手重构

### Step 0：接收 ref
React 19 可直接通过 ref Prop。

### Step 1：内部仍拥有 DOM Ref
```jsx
const inputRef = useRef(null);
```

### Step 2：暴露自定义 Handle
```jsx
useImperativeHandle(ref, () => ({
  focus() { inputRef.current?.focus(); }
}));
```

### Step 3：父级只能使用约定方法
组件实现仍可替换。

[查看最终源码](./src/main.jsx)

## 理论收束
`useImperativeHandle` 自定义通过 ref 暴露给父级的值。它不是把组件变成 OOP 对象，而是为少数命令式场景建立受控 API。

## Wrong Way
- 把所有内部 DOM 节点塞进 handle。
- 用 handle 替代正常 Props/state 数据流。
- 暴露 `setInternalState` 等内部实现。

## Production Boundary
Focus、scrollTo、open/close 第三方控件等命令式能力可以封装；业务状态仍通过声明式 API。

## 本课只记住 3 件事
1. Handle 限制父级能做什么。
2. 内部 DOM 可继续封装。
3. 命令式 API 应少而稳定。

## Challenge
再暴露 `selectAll()`，但不要暴露 DOM node。

## Mastery Check
- **Must**：会写最小 useImperativeHandle。
- **Should**：能设计受控命令式 API。
- **Expert**：能防止组件封装被 ref 穿透。
