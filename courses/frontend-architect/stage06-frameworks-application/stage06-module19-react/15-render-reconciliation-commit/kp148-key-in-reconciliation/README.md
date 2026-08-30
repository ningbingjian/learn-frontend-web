# RE-KP148：Key 在 Reconciliation 中的作用

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 从 Reconciliation 角度解释 key 是 sibling identity 的提示。
2. 理解 key 的作用不仅是“消除列表 warning”。
3. 理解稳定 key 可以让 React 在 reorder 后继续把 State 匹配到正确业务实体。
4. 理解 index key 在顺序变化时为什么容易把 State 错配给当前位置。
5. 能说明 key 只需要在同一组 siblings 中稳定且唯一。

> **本节核心代码**：稳定版本使用 `key={item.id}`，对照版本使用 `key={index}`；反转列表后观察 Row 的本地 note 跟业务实体还是跟位置走。  
> **实验辅助代码**：两个并排列表仅用于对照观察，业务项目通常不应保留 index-key 错误实现。

## 理论讲解

### 1. 同一父节点下需要匹配 siblings

假设上一版是：

```text
A
B
C
```

下一版变成：

```text
C
B
A
```

React 需要知道：

```text
这是三个旧 sibling 移动了位置？
还是三个完全不同的新 sibling？
```

### 2. Stable Key 提供业务身份

推荐：

```jsx
items.map(item => <Row key={item.id} item={item} />)
```

如果 `item.id` 不变，列表 reorder 后 React 仍可以把：

```text
key = a
```

理解为原来的那个业务实体。

### 3. Index Key 描述的是位置

如果：

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

反转后 key 仍然是：

```text
0
1
2
```

但是每个位置代表的业务 item 已经变了。

于是本地 State 可能继续保留在“位置 0”，却被展示到另一个 item 上。

### 4. Key 是局部身份，不是全局数据库 ID 注册中心

key 的匹配范围主要是同一父节点下的 siblings。

因此：

```text
稳定
唯一（在当前 siblings 中）
来自业务数据
```

通常比“全局永不重复”更重要。

### 5. Key 不应该在 Render 时随机生成

错误：

```jsx
<Row key={Math.random()} />
```

每次 Render key 都不同，相当于持续告诉 React：

```text
这不是旧 Row
这是一个新 Row
```

会破坏正常复用和 State 保留。

## 动手编码：从 0 到 1

### 第 0 步：创建带稳定 id 的数据

**目标**：让每个业务实体拥有自己的 identity。

```jsx
const initialItems = [
  { id: 'a', name: 'Alice' },
  { id: 'b', name: 'Bob' },
  { id: 'c', name: 'Carol' },
];
```

**为什么这样写**：`id` 不依赖显示位置。

**观察**：即使数组 reorder，id 仍跟着 item。

### 第 1 步：让 Row 拥有本地 State

**目标**：制造一个能观察身份匹配结果的 State。

```jsx
function Row({ item }) {
  const [note, setNote] = useState('');
  // ...
}
```

**为什么这样写**：如果身份匹配正确，note 应该跟着 item。

**观察**：每行可以输入不同 note。

### 第 2 步：创建 stable-key 版本

**目标**：使用业务 id 匹配 sibling。

```jsx
<Row key={item.id} item={item} />
```

**为什么这样写**：key 直接表达业务实体身份。

**观察**：反转后 note 仍跟对应姓名走。

### 第 3 步：创建 index-key 对照版本

**目标**：观察位置身份带来的错配。

```jsx
<Row key={index} item={item} />
```

**为什么这样写**：这是故意保留的错误对照实验。

**观察**：反转后 note 更可能继续留在原位置，而不是原业务实体。

### 第 4 步：加入 reorder

**目标**：真正触发 sibling 位置变化。

```jsx
setItems([...items].reverse());
```

**为什么这样写**：创建新数组，同时反转顺序。

**观察**：两个列表的本地 State 行为出现差异。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`key={item.id}` 与 `key={index}` 的 Reconciliation 对照。
- **实验辅助代码**：双列表布局和 reorder 按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp148-key-in-reconciliation --config ./vite.config.js
```

## 效果验证

1. 在 Stable Key 列表的 Alice 行输入 `alice-note`。
2. 在 Index Key 列表的 Alice 行也输入 `alice-note`。
3. 分别点击两个列表的“反转顺序”。
4. Stable Key 版本中 note 继续跟 Alice 走。
5. Index Key 对照版中 note 会更偏向留在旧位置，表现出业务实体错配。
6. 能解释 key 是 sibling identity，而不是单纯 warning 修复字段。

完成后继续 **RE-KP149：DOM 节点复用与替换**。
