# RE-KP064：key 不只是列表警告

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP063：Type Change 与 Identity |
| 本课主问题 | `key` 为什么能改变普通非列表组件的身份，而且组件里却读不到 `props.key`？ |
| Learning Artifact | IdentityCard key 切换 + Props inspection |
| 暂时不用理解 | 列表 Diff 算法细节 |

## 先预测

```jsx
<IdentityCard key={person.id} person={person} />
```

切换 `person.id` 后，局部 visits 会不会保留？`props.key` 能不能读到？

## 动手实验：从 0 到 1

### Step 0：准备两个业务实体

```js
{ id: 'alice', name: 'Alice' }
{ id: 'bob', name: 'Bob' }
```

### Step 1：IdentityCard 保存局部 visits

```jsx
const [visits, setVisits] = useState(0);
```

### Step 2：加入业务身份 key

```jsx
<IdentityCard key={person.id} person={person} />
```

把 Alice visits 点高，再切 Bob。

**观察**：visits 重置。

**立即解释**：`key` 参与 siblings 中的 Identity 匹配；`alice → bob` 表示这里出现了另一个组件身份。

### Step 3：检查普通 Props

```jsx
Object.keys(props)
```

你会看到 `person`，不会自动收到 `key`。业务确实需要 ID 时要显式传 `personId`。

[查看最终源码](./src/main.jsx)

## 图解

```text
same position + same type
key=alice → Identity A
key=bob   → Identity B

key: React identity hint
personId: business prop (if you need it)
```

## 理论收束

`key` 不只是消除列表 Warning。它让 React 在同一组 siblings 中更准确地识别“谁是谁”。Key 只需在兄弟项范围内有区分意义，不要求整个应用全局唯一。

## Wrong Way

- 把 key 当普通 Prop 使用。
- 只要 Console 没 Warning 就认为 key 正确。
- 用没有业务语义的 key 强制重建组件。

## Production Boundary

`key` 应表达稳定 UI/业务 Identity；下一课会把这种能力用于“切换实体时表单草稿应该重置”的真实需求。

## 本课只记住 3 件事

1. key 是 Identity Hint，不只是列表 Warning 工具。
2. key 可以用于普通组件。
3. key 不会作为普通 `props.key` 传入组件。

## Challenge

额外传 `personId={person.id}`，对比 React key 与业务 Prop 的职责。

## Mastery Check

- **Must**：能解释 key 改变为何会重置 State。
- **Should**：能说明 key 的 sibling scope。
- **Expert**：能区分 React Identity 与业务数据字段。
