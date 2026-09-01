# RE-KP066：列表 key 的稳定性要求

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP064 / 065：key 与 Identity |
| 本课主问题 | 列表反转后，怎样让某一行的局部 State 继续跟着“这个实体”，而不是跟着数组位置？ |
| Learning Artifact | Row 本地 clicks + stable id reorder 实验 |
| 暂时不用理解 | Reconciliation 算法复杂度 |

## 先预测

Beta 的本地 clicks 点到 3，然后把 `[A,B,C]` 反转成 `[C,B,A]`。如果 `key={item.id}`，Beta 的 3 会留在哪里？

## 动手实验：从 0 到 1

### Step 0：数据从一开始就有稳定 ID

```js
{ id: 'a', label: 'Alpha' }
{ id: 'b', label: 'Beta' }
{ id: 'c', label: 'Gamma' }
```

### Step 1：Row 拥有可观察的局部 State

```jsx
const [clicks, setClicks] = useState(0);
```

### Step 2：用业务 ID 建立 Identity

```jsx
{items.map(item => <Row key={item.id} item={item} />)}
```

### Step 3：反转数组

```jsx
setItems([...items].reverse());
```

**观察**：Beta 即使移动到别的位置，clicks 仍跟着 Beta。

**立即解释**：位置变化，但 stable key 仍是 `b`；React 能识别这是同一个业务项对应的组件身份在移动。

[查看最终源码](./src/main.jsx)

## 图解

```text
Before: a→Alpha   b→Beta(3)   c→Gamma
After : c→Gamma   b→Beta(3)   a→Alpha

key stays with entity → local State stays with entity
```

## 理论收束

列表 key 至少要满足两个工程要求：在 sibling 范围有区分能力，并且同一实体跨 Render 保持稳定。通常最好的来源是数据模型本身的持久 ID。

## Wrong Way

- Render 时生成 random key。
- 把 index 当业务身份。
- 为“唯一”牺牲“稳定”。

## Production Boundary

数据库 ID、客户端创建时持久保存的 UUID 都可以成为稳定 key。关键不是 ID 长什么样，而是同一实体生命周期内不要改变。

## 本课只记住 3 件事

1. key 必须稳定，不只是当前 Render 唯一。
2. reorder 只应移动 Identity，不应重新分配 State。
3. key 优先来自数据模型。

## Challenge

实现“把最后一项移动到最前面”，验证每行 State 仍跟随实体。

## Mastery Check

- **Must**：会使用 `item.id` 作为列表 key。
- **Should**：能解释 reorder 时 State 如何跟随 Identity。
- **Expert**：能为离线创建数据设计稳定 ID 生命周期。
