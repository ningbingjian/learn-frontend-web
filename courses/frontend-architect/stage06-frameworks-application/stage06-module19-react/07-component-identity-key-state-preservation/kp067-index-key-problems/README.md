# RE-KP067：为什么不能滥用数组索引 key

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解数组 index 只能表示“当前位置”，不能稳定表达业务实体身份。
2. 理解插入、删除、排序时 index key 为什么容易把局部 State 对错实体。
3. 能复现“输入框草稿与数据项错位”的真实 Bug。
4. 知道没有显式 key 时，React 对列表位置的匹配本质上也缺乏稳定实体信息。
5. 能判断极少数静态列表什么时候 index key 风险较低，但不把它当默认方案。

> **本节核心代码**：故意使用 `key={index}`，然后反转列表观察 Row 本地输入 State 错位。
>
> **实验辅助代码**：本课故意保留错误写法用于教学；不要把 `key={index}` 当成最终推荐实现。

## 理论讲解

### 1. index 表示位置，不表示实体

数据：

```text
index 0 -> Alpha
index 1 -> Beta
index 2 -> Gamma
```

反转以后：

```text
index 0 -> Gamma
index 1 -> Beta
index 2 -> Alpha
```

如果 key 是 index，React 看到的仍然是：

```text
key 0
key 1
key 2
```

于是它更容易把“第 0 个位置上的旧组件身份”继续复用于现在的第 0 项。

### 2. 为什么会出现状态错位

假设 Row 内部有：

```jsx
const [draft, setDraft] = useState(item.label);
```

第一次：

```text
key=0 -> item Alpha -> draft Alpha
```

你把 draft 改成：

```text
Alpha edited
```

然后反转列表：

```text
key=0 -> item Gamma
```

因为 key=0 的组件身份还在，旧 draft 可能仍然是：

```text
Alpha edited
```

于是出现：

```text
业务数据：Gamma
本地 State：Alpha edited
```

这就是典型错位。

### 3. 稳定 ID 为什么能修复

如果使用：

```jsx
<Row key={item.id} item={item} />
```

反转只会改变位置，但：

```text
Alpha 始终 key=a
Gamma 始终 key=c
```

局部 State 就能继续和正确实体匹配。

### 4. index key 什么时候风险相对低

如果列表同时满足：

```text
不会重新排序
不会在中间插入
不会删除
项没有需要跟踪的局部身份状态
```

index 的风险会较低。

但工程上更稳妥的默认选择仍然是：

```text
使用数据中稳定 ID
```

## 动手编码：从 0 到 1

### 第 0 步：准备三项数据

```js
const initialItems = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];
```

### 第 1 步：Row 保存输入草稿

```jsx
const [draft, setDraft] = useState(item.label);
```

### 第 2 步：故意使用错误 index key

```jsx
{items.map((item, index) => (
  <Row key={index} item={item} />
))}
```

### 第 3 步：编辑第一行

把第一行输入框从 Alpha 改成：

```text
Alpha edited
```

### 第 4 步：反转列表

```jsx
setItems([...items].reverse());
```

此时第一行的业务实体已经变成 Gamma，但输入框可能仍显示旧草稿。

### 第 5 步：理解修复

把：

```jsx
key={index}
```

改成：

```jsx
key={item.id}
```

即可让局部 State 跟随稳定业务实体。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：故意使用 index key 复现身份错位。
- **实验辅助代码**：输入框草稿用于放大问题，最终业务应改为稳定 ID key。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp067-index-key-problems --config ./vite.config.js
```

## 效果验证

1. 修改 Alpha 的输入草稿。
2. 点击“反转列表”。
3. 观察第一行 label 已经变成 Gamma，但输入草稿仍可能保留 Alpha 的旧内容。
4. 能解释错位原因来自 index 表示位置而不是稳定实体。
5. 能说出正确修复方案：使用 `item.id`。

完成后继续 **RE-KP068：随机 key 的问题**。
