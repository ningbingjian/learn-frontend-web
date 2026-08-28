# RE-KP077：状态放置原则

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“谁需要读/写这份 State”判断 State owner。
2. 理解共享 State 应放到需要它的最近公共父组件。
3. 理解只影响局部 UI 的 State 应尽量留在局部组件。
4. 避免为了“统一管理”把所有 State 都提升到根组件。
5. 能通过组件树解释 State locality 为什么能降低耦合。

> **本节核心代码**：`query` 放在 `ProductExplorer`，`expandedId` 留在 `ProductResults`。  
> **实验辅助代码**：静态商品数组和筛选结果用于观察不同 State 的消费范围。

## 理论讲解

### 1. State 放置的第一问：谁需要它

对于每份 State，先列消费者：

```text
query
├─ SearchBox：读取 + 修改
└─ ProductResults：读取
```

它们最近的公共父组件是 `ProductExplorer`，因此 `query` 放在那里自然。

而：

```text
expandedId
└─ ProductResults 内部列表：读取 + 修改
```

如果外部完全不关心，就没有理由提升到 `ProductExplorer`。

### 2. “越高越好”是错误直觉

State 放得越高：

- 需要接触它的组件越多；
- Props 传递范围越大；
- 父组件职责越重；
- 无关组件更容易和它产生耦合。

所以目标不是：

```text
所有 State → App
```

而是：

```text
State → 能覆盖真实消费者的最低合理 owner
```

### 3. 共享 State 为什么要提升

如果 `SearchBox` 自己保存 query，而 `ProductResults` 也保存一份 query：

```text
SearchBox.query
ProductResults.query
```

你会制造两个事实来源。

更好的结构：

```text
ProductExplorer.query
      ↓ props
SearchBox + ProductResults
```

### 4. 局部 State 为什么应保留局部

例如某个结果行的展开状态只影响结果区域。

让 `ProductExplorer` 维护：

```text
expandedId
```

并不是一定错误，但会把父组件拖进它不需要关心的交互细节。

局部性越强，组件边界通常越清晰。

### 5. 判断流程

可以按这个顺序问：

```text
1. 这份 State 的真实事实是什么？
2. 哪些组件需要读它？
3. 哪些组件需要修改它？
4. 它们最近的公共祖先是谁？
5. 有没有更局部的 State 不需要被提升？
```

## 动手编码：从 0 到 1

### 第 0 步：建立搜索输入

```jsx
function SearchBox({ query, onQueryChange }) {
  return <input value={query} onChange={...} />;
}
```

**本步目标**：让 SearchBox 成为 query 的消费者，而不是 owner。  
**为什么这样写**：后面结果列表也需要同一份 query。  
**运行后观察**：输入值完全来自 Props。

### 第 1 步：建立结果列表

```jsx
function ProductResults({ products, query }) {
  const filtered = products.filter(...);
  // ...
}
```

**本步目标**：让第二个组件消费 query。  
**为什么这样写**：现在可以明确 query 是共享事实。  
**运行后观察**：输入变化会过滤结果。

### 第 2 步：把 query 放在最近公共父级

```jsx
function ProductExplorer() {
  const [query, setQuery] = useState('');
}
```

**本步目标**：建立 query 的唯一 owner。  
**为什么这样写**：SearchBox 和 ProductResults 都在它下面。  
**运行后观察**：两个子组件始终看到同一 query。

### 第 3 步：给 ProductResults 加局部展开状态

```jsx
const [expandedId, setExpandedId] = useState(null);
```

**本步目标**：保留真正局部的 State。  
**为什么这样写**：展开哪一行只影响结果区域，父级无需知道。  
**运行后观察**：展开/收起不会改变父级 query State。

### 第 4 步：画出最终 owner 图

```text
ProductExplorer
├─ query
├─ SearchBox
└─ ProductResults
   └─ expandedId
```

**本步目标**：把 State 放置和组件树联系起来。  
**为什么这样写**：owner 选择应该可以被结构解释。  
**运行后观察**：共享的向上，局部的向下。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`query` 与 `expandedId` 的不同 owner。
- **实验辅助代码**：商品数据与字符串过滤逻辑。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp077-state-placement-principles --config ./vite.config.js
```

## 效果验证

1. 搜索输入和结果列表共享同一 query。
2. query 只存在一份。
3. expandedId 留在 ProductResults 内部。
4. 能解释为什么 expandedId 不需要提升。
5. 能用“最近公共 owner + State locality”分析新场景。

完成后继续 **RE-KP078：状态生命周期设计**。
