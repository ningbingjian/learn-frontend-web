# RE-KP066：列表 key 的稳定性要求

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解列表 key 必须在兄弟项之间唯一且稳定。
2. 理解稳定 key 如何帮助 React 在插入、删除、排序时继续识别同一个数据项。
3. 会优先使用数据模型中的持久 ID 作为 key。
4. 能通过本地 Row State 验证“State 跟着实体身份移动，而不是跟着数组位置移动”。
5. 知道 key 不应该在 Render 时临时随机生成。

> **本节核心代码**：`items.map(item => <Row key={item.id} item={item} />)`。
>
> **实验辅助代码**：反转数组与 Row 本地点击次数用于验证身份跟踪。

## 理论讲解

### 1. React 为什么需要稳定 key

列表第一次：

```text
A B C
```

排序后：

```text
C B A
```

如果每项都有稳定 ID：

```text
A -> id=a
B -> id=b
C -> id=c
```

React 可以知道：

```text
C 只是移动到了前面
它并不是一个全新的 C
```

### 2. key 应该来自数据

推荐：

```jsx
<Row key={item.id} item={item} />
```

这里的 `item.id` 在数据生命周期中保持稳定。

不推荐在 Render 时：

```jsx
<Row key={Math.random()} item={item} />
```

因为每次 Render 都会变成新的 key。

随机 key 的具体问题会在 RE-KP068 单独学习。

### 3. 稳定 key 能保护局部 State 与实体的对应关系

假设每个 Row 自己有：

```jsx
const [clicks, setClicks] = useState(0);
```

如果给 B 点到 3 次，然后列表反转，稳定 key 能让 B 对应的 Row 身份继续被识别。

因此：

```text
B 的 clicks 仍然是 3
```

即使 B 在数组中的 index 已经变化。

## 动手编码：从 0 到 1

### 第 0 步：准备稳定 ID 数据

```js
const initialItems = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];
```

### 第 1 步：Row 增加局部 State

```jsx
function Row({ item }) {
  const [clicks, setClicks] = useState(0);
  // ...
}
```

### 第 2 步：以 id 作为 key

```jsx
{items.map(item => (
  <Row key={item.id} item={item} />
))}
```

### 第 3 步：加入反转功能

```jsx
setItems([...items].reverse());
```

### 第 4 步：验证身份跟着实体

1. 给 Beta 点几次。
2. 反转列表。
3. Beta 移动到新位置。
4. Beta 的点击次数仍然跟着 Beta。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：稳定数据 ID 作为 key。
- **实验辅助代码**：局部 `clicks` 用来观察组件身份是否跟随实体。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp066-list-key-stability --config ./vite.config.js
```

## 效果验证

- 给任意 Row 增加本地点击次数。
- 反转列表后次数仍跟随对应 item。
- 能解释 key 需要“稳定”，而不仅仅是“当前 Render 里唯一”。
- 能说明数据库 ID / 本地持久 ID 为什么通常比数组位置更合适。

完成后继续 **RE-KP067：为什么不能滥用数组索引 key**。
