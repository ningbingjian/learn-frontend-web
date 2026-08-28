# RE-KP064：key 不只是列表警告

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 `key` 是 React 用于识别兄弟节点身份的重要提示。
2. 知道 `key` 不只服务于“消除列表 warning”。
3. 理解 `key` 可以参与普通非列表组件的身份判断。
4. 知道 `key` 不会作为普通 Prop 自动传给组件。
5. 为下一课“使用 key 主动重置 State”做好准备。

> **本节核心代码**：`<IdentityCard key={person.id} person={person} />`。
>
> **实验辅助代码**：组件内部显示 `Object.keys(props)`，只用于验证 `key` 不在普通 Props 中。

## 理论讲解

### 1. 很多人第一次见 key 是因为列表 warning

例如：

```jsx
items.map(item => <li>{item.name}</li>)
```

React 会要求每个兄弟项拥有稳定 key。

但如果只把 key 理解成：

```text
“为了不让 Console 报警”
```

就漏掉了真正的身份语义。

### 2. key 是 React 身份匹配的一部分

默认情况下，React 会结合父节点下的位置来匹配组件。

`key` 让你可以进一步告诉 React：

```text
这不是“这个位置上的任意组件”
而是“这个具体身份的组件”
```

因此 key 可以用于普通条件组件，而不只是 `map()`。

### 3. key 的作用域是兄弟节点之间

key 不要求全应用唯一。

你需要的是：

```text
同一组 siblings 中能够稳定区分彼此
```

不同列表完全可以使用相同的 key 值。

### 4. key 不是普通 Prop

例如：

```jsx
<IdentityCard key="alice" person={alice} />
```

组件正常接收到：

```text
person
```

但不会自动收到一个普通的：

```text
props.key
```

如果业务代码需要 ID，需要显式再传：

```jsx
<IdentityCard key={person.id} personId={person.id} />
```

## 动手编码：从 0 到 1

### 第 0 步：准备两个人物数据

```js
const people = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
];
```

### 第 1 步：创建有本地 State 的组件

```jsx
function IdentityCard(props) {
  const [visits, setVisits] = useState(0);
  // ...
}
```

### 第 2 步：用 person.id 作为 key

```jsx
<IdentityCard key={person.id} person={person} />
```

### 第 3 步：展示普通 Prop 名称

```jsx
Object.keys(props)
```

你会看到 `person`，但不会把 `key` 当普通 prop 收到。

### 第 4 步：切换 person

切换后 key 改变，组件身份也会改变，因此本地 visits 会重新初始化。

本节重点是理解 key 的身份意义；下一课会把这种能力用于真实的“表单重置”场景。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：非列表组件同样可以使用 key 参与身份判断。
- **实验辅助代码**：Props key 列表只用于证明 key 不是业务 Prop。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp064-key-beyond-list-warning --config ./vite.config.js
```

## 效果验证

- 增加当前人物 visits。
- 切换人物后 visits 重新开始。
- 页面显示收到的普通 Prop 只有 `person`。
- 能解释 key 的真正作用是身份匹配，而不仅是消除 warning。

完成后继续 **RE-KP065：使用 key 主动重置状态**。
