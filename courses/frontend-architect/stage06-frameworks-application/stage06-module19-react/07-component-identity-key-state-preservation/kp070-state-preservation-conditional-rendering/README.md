# RE-KP070：状态保留与条件渲染

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | `if` / 三元表达式看起来换了分支，为什么 State 有时保留、有时重置？ |
| Learning Artifact | Conditional Render Tree 对照实验 |

## 先预测

不要看“JSX 写在左分支还是右分支”，先画最终 Render Tree：前后对应位置的 Type / key 有没有变化？

## 动手实验

### Step 0：同位置同类型

```jsx
{mode === 'a' ? <Counter label="A" /> : <Counter label="B" />}
```

把 Counter State 改大再切 mode。

**观察**：State 保留。

### Step 1：同位置不同类型

把一个分支替换成另一种 Component Type。

**观察**：旧 State 重置。

### Step 2：同类型但不同 key

给不同业务实体不同 key。

**观察**：即使 Type 相同，key 改变也会切换 Identity。

[查看最终源码](./src/main.jsx)

## 图解：条件语法不是身份规则

```text
JS if / ternary
      ↓ 只负责决定生成什么 React Tree
React Identity
      ↓ 看对应 Position + Type + key
Preserve / Reset State
```

## 理论收束

条件渲染本身不会规定 State 是否保留。真正决定因素是条件前后 React Tree 的身份匹配结果。

## Wrong Way

- “两个 JSX 分支就是两个组件，所以一定重置。”
- “函数名相同就一定保留。”
- 为了修复意外 State 行为堆更多条件，而不画 Render Tree。

## Production Boundary

复杂流程 UI 先画状态/树结构，再决定条件渲染和 key；这比在 Bug 出现后猜 React 行为更可靠。

## 本课只记住 3 件事

1. 条件语法不等于组件 Identity。
2. 看 Position + Type + key。
3. State Preserve/Reset 是树匹配结果。

## Challenge

设计三个切换按钮：只改 Prop、改 Type、改 key；不运行先预测三种 State 行为。

## Mastery Check

- **Must**：能从 Tree 预测条件渲染的 State 行为。
- **Should**：能把前 9 节 Identity 规则统一起来。
- **Expert**：能用 Identity 模型设计复杂表单/步骤流。
