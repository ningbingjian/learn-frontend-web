# RE-KP094：React 19 ref as prop

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | Should |
| 本课主问题 | React 19 中函数组件为什么可以直接接收 `ref` Prop，不再必须先套 `forwardRef`？ |
| Learning Artifact | Parent ref → Custom Input → DOM node 链路 |

## 先对照
旧代码常见 `forwardRef`。React 19 新函数组件可：
```jsx
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

## 动手实验

### Step 0：父组件创建 Ref
```jsx
const inputRef = useRef(null);
```

### Step 1：把 ref 传给自定义组件
```jsx
<MyInput ref={inputRef} />
```

### Step 2：组件把 ref 继续交给 DOM
运行 focus 实验，验证链路工作。

### Step 3：理解版本边界
React 19 的 ref-as-prop 是现代能力；维护旧版本兼容库时仍可能看到 `forwardRef`。

[查看最终源码](./src/main.jsx)

## 理论收束
Ref 仍然是一种特殊的 React 能力，但 React 19 简化了函数组件接收 ref 的形式。语法简化不等于应该随意暴露内部 DOM。

## Wrong Way
- 因为能传 ref 就把所有内部节点暴露给父级。
- 不看 React 版本直接删除库里的 forwardRef。
- 把 ref 当普通业务数据流替代 Props。

## Production Boundary
新 React 19 应用可采用 ref-as-prop；公共组件应结合支持版本和 API 封装策略。

## 本课只记住 3 件事
1. React 19 函数组件可接收 ref Prop。
2. Ref 仍用于命令式边界。
3. 兼容旧 React 时关注 forwardRef。

## Challenge
把 ref 传到自定义 TextArea 并从父级 focus。

## Mastery Check
- **Must**：认识 ref-as-prop。
- **Should**：能迁移简单 forwardRef。
- **Expert**：能设计版本兼容组件 API。
