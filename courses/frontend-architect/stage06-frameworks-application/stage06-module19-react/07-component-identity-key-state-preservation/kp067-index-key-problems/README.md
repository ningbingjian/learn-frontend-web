# RE-KP067：为什么不能滥用数组索引 key

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP066：稳定 key |
| 本课主问题 | 为什么反转列表后，Gamma 行里可能出现 Alpha 的输入草稿？ |
| Learning Artifact | `key={index}` + Row draft 错位故障复现 |
| 暂时不用理解 | React Diff 内部实现 |

## 先制造故障

```jsx
{items.map((item, index) => (
  <Row key={index} item={item} />
))}
```

第一行 Alpha 草稿改成 `Alpha edited`，然后反转列表。你预测第一行草稿会跟 Alpha 走还是留在 index 0？

## 动手实验：从 0 到 1

### Step 0：Row 保存本地 draft

```jsx
const [draft, setDraft] = useState(item.label);
```

### Step 1：故意使用 index key

```jsx
<Row key={index} item={item} />
```

### Step 2：编辑第一行再反转

**观察**：index 0 的业务实体变成 Gamma，但旧组件身份仍是 key 0，于是本地 draft 可能还是 `Alpha edited`。

### Step 3：把 key 改成业务 ID

```diff
- <Row key={index} item={item} />
+ <Row key={item.id} item={item} />
```

重新实验后，草稿跟着正确实体移动。

[查看最终源码](./src/main.jsx)

## 图解

```text
index key
key=0: Alpha draft
reorder
key=0: Gamma + old Alpha draft  ❌

stable id
key=a: Alpha draft
reorder
key=a still belongs to Alpha   ✅
```

## 理论收束

Index 表达的是“当前位置”，不是实体身份。只要列表会插入、删除、排序，index 与业务实体的对应关系就可能改变，本地 State 随之错位。

## Wrong Way

- “React 没 Warning，所以 index 一定安全。”
- 只看文本列表，没有用本地 State/DOM 复现真实错位。
- 把 index 当默认方案，等业务后来加排序再出问题。

## Production Boundary

真正完全静态、永不重排、永不增删的展示列表风险较低；工程默认仍优先稳定 ID，减少未来需求变化带来的隐患。

## 本课只记住 3 件事

1. index 是位置，不是实体 Identity。
2. reorder 会让 index 与业务实体重新配对。
3. 有本地 State 时错位尤其危险。

## Challenge

把“反转”换成“在顶部插入新项”，观察所有旧行的 identity/state 如何错位。

## Mastery Check

- **Must**：能复现并解释 index key 错位。
- **Should**：能判断静态列表何时风险较低。
- **Expert**：能在 Code Review 中用 Identity 模型而不是“规则背诵”解释 key 选择。
