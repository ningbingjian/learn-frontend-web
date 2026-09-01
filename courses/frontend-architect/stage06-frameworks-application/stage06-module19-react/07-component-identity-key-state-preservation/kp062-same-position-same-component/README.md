# RE-KP062：相同位置相同组件保留状态

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP061：组件树中的位置决定身份 |
| 本课主问题 | 父组件重新 Render、Prop 和样式都变了，为什么子组件内部 score 还能保留？ |
| Learning Artifact | Fancy / Plain Prop 切换 + Counter State Preserve Demo |
| 暂时不用理解 | Type Change、`key`、Reconciliation 源码 |

## 这节课只需要搞懂什么

1. “相同位置 + 相同组件类型”通常会延续身份。
2. 父组件重新 Render 和 Props 变化不等于子组件重建。
3. Position 是 Render Tree 结构，不是源码行号。

## 先预测

先把 Counter score 点到 3，再把：

```jsx
<Counter fancy={false} />
```

切成：

```jsx
<Counter fancy={true} />
```

score 会不会归零？

## 动手实验：从 0 到 1

### Step 0：创建最小 Counter

```jsx
function Counter() {
  const [score, setScore] = useState(0);
  // ...
}
```

### Step 1：让 Props 真正发生变化

```jsx
function Counter({ fancy }) {
  return <section className={fancy ? 'fancy' : 'plain'}>...</section>;
}
```

### Step 2：父组件切 fancy

```jsx
const [isFancy, setIsFancy] = useState(false);
<Counter fancy={isFancy} />
```

### Step 3：先积累内部 State

把 score 点到 3，再切 Fancy / Plain。

**现象**：样式改变，score 保留。

**立即解释**：React 的匹配对象仍然是父节点同一位置上的同一个 `Counter` 类型；Props 是这次 Render 的输入，不是组件身份本身。

### Step 4：连续切换多次

State 继续延续。由此可以排除“只有第一次 Prop 改变才特殊”的错误猜测。

[查看最终源码](./src/main.jsx)

## 图解

```text
Before
App
└─ Counter @ same position
   type=Counter
   fancy=false
   score=3

After
App
└─ Counter @ same position
   type=Counter
   fancy=true
   score=3

Identity matched → State preserved
```

## 理论收束

React 会在重新 Render 时匹配前后树。如果父级对应位置仍然是同一种组件类型，它通常延续组件身份和 State，然后把新 Props 交给下一次组件函数调用。下一课会只改变一个变量：**组件类型**。

## Wrong Way

- 认为“父组件 Render 了，所以所有子组件 State 重新初始化”。
- 认为 `useState(0)` 每次执行都必然把已有 State 设回 0。
- 把 CSS class 改变误认为 DOM / Component identity 一定重建。

## Production Boundary

主题、样式、筛选条件、展示模式等 Props 经常变化，但业务通常希望编辑中的本地 State 保留。不要为了“刷新 UI”随意改变 `key` 或组件类型。

## 本课只记住 3 件事

1. 父组件重渲染不等于子组件重建。
2. 同位置 + 同类型通常保留 State。
3. Props 可以变，Identity 可以不变。

## Challenge

再增加一个 `label` Prop，与 `fancy` 同时变化；先预测 score，然后验证。

## Mastery Check

- **Must**：能解释为什么 Fancy 切换不重置 score。
- **Should**：能区分 Props Change 与 Identity Change。
- **Expert**：能在组件 API 设计中避免把普通展示变化误建模成组件重挂载。
