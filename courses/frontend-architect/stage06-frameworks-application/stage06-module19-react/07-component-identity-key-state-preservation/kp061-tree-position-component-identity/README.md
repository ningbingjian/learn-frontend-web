# RE-KP061：组件树中的位置决定身份

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 前置课程 | Chapter 06：State Snapshot |
| 本课主问题 | 为什么把 Taylor 切成 Sarah 后名字变了，Counter 的 score 却没有归零？ |
| Learning Artifact | 同一 Render Tree 位置切换 Props 的 Counter Demo + Tree 图 |
| 暂时不用理解 | `key`、Reconciler / Fiber 源码 |

## 这节课只需要搞懂什么

1. State 由 React 保存，并关联到 Render Tree 中的组件身份。
2. 同一个组件函数在不同树位置可以有不同 State。
3. Props 改变不等于组件身份改变。

## 先预测

```jsx
{isTaylor ? (
  <Counter person="Taylor" />
) : (
  <Counter person="Sarah" />
)}
```

先把 Taylor 的 score 点到 3，再切 Sarah。你预测 score 是 0 还是 3？为什么？

## 动手实验：从 0 到 1

### Step 0：写一个有本地 State 的 Counter

```jsx
function Counter({ person }) {
  const [score, setScore] = useState(0);
  // ...
}
```

### Step 1：父组件只切换 person

```jsx
const [isTaylor, setIsTaylor] = useState(true);
```

### Step 2：让两个分支占据同一个子位置

```jsx
{isTaylor ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
```

### Step 3：制造可观察状态

Taylor score 点到 3，再切到 Sarah。

**现象**：名字变成 Sarah，但 score 仍然是 3。

**立即解释**：React 看到的是“父节点的同一个位置仍然是 `Counter`”。这是同一身份的下一次 Render，只是 Props 变了。

### Step 4：切回 Taylor

score 继续保留。不要把它解释成“Taylor 和 Sarah 共享 State”；更准确是：当前 Render Tree 中从未创建第二个组件身份。

[查看最终源码](./src/main.jsx)

## 图解：看树位置，不看 JSX 分支文字

```text
Render A
App
└─ Counter (position #1, type=Counter)
   person=Taylor
   score=3

Render B
App
└─ Counter (position #1, type=Counter)
   person=Sarah
   score=3
```

如果同时渲染两个 Counter：

```text
App
├─ Counter position #1 → State A
└─ Counter position #2 → State B
```

## 理论收束

组件函数每次 Render 会重新调用，但 State 不存在某个持久的函数局部变量里。React 根据树中的组件身份关联 State。Position 是身份模型的第一层；后续还会加入 Component Type 和 `key`。

## Wrong Way

- 把 Position 理解成 `main.jsx` 第几行。
- 认为“Props 改变就会重置组件”。
- 看到 State 保留就说两个业务实体“共享 State”，忽略其实 React 只识别到一个组件身份。

## Production Boundary

联系人编辑器、详情面板等场景要先明确：切换业务实体时，你希望沿用同一 UI 身份，还是明确重置本地 State？这会直接决定后续是否应该使用 `key`。

## 本课只记住 3 件事

1. React 保存 State，并把它关联到 Render Tree 身份。
2. 同位置、同类型通常延续同一个组件身份。
3. Props 改变本身不会重置 State。

## Challenge

同时渲染 Taylor 和 Sarah 两个 Counter，分别点不同 score；解释为什么这时两份 State 完全独立。

## Mastery Check

- **Must**：能预测同位置 Counter 切 Props 后 State 是否保留。
- **Should**：能画 Render Tree 而不是按 JSX 分支文本推理。
- **Expert**：能把“UI identity”和“business entity identity”区分开，为 `key` 设计做准备。
