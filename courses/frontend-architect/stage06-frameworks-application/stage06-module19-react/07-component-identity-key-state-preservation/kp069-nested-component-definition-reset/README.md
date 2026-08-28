# RE-KP069：嵌套组件定义导致状态意外重置

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解为什么不应该在组件函数内部再定义新的组件函数。
2. 知道父组件每次 Render 都会重新执行函数体，从而创建新的嵌套组件函数对象。
3. 能解释 React 为什么会把新的函数对象视为新的组件类型。
4. 理解组件类型变化会导致对应子树 State 被重置。
5. 会把组件定义提升到模块顶层来修复问题。
6. 区分“嵌套 JSX”与“嵌套定义组件函数”，避免误解。

> **本节核心代码**：父组件内部定义 `NestedTextField` 的错误写法，与模块顶层 `StableTextField` 的正确写法。  
> **实验辅助代码**：父组件计数器只用于触发父级 Render，观察两个输入框 State 是否保留。

## 理论讲解

### 1. 问题写法长什么样

```jsx
function Parent() {
  function Child() {
    const [text, setText] = useState('');
    return <input value={text} onChange={...} />;
  }

  return <Child />;
}
```

它看起来只是“把相关组件放在一起”。

但这里隐藏了一个身份问题。

### 2. 父组件每次 Render 都会重新执行

当 `Parent` Render：

```text
调用 Parent()
  ↓
执行 function Child() { ... }
  ↓
创建一个新的函数对象
```

下一次 Parent Render：

```text
再次调用 Parent()
  ↓
再次创建新的 Child 函数对象
```

虽然源码里函数名都叫：

```text
Child
```

但 JavaScript 函数引用不同：

```text
Child(render 1) !== Child(render 2)
```

### 3. React 组件类型由函数对象本身决定

对于：

```jsx
<Child />
```

React Element 的 `type` 是：

```js
Child
```

如果下一次 Render 的 `Child` 是一个新函数对象，React 看到的组件类型也发生了变化。

于是：

```text
旧 Child type
    ↓ 变成
新 Child type
```

对应子树会被重置。

### 4. 为什么输入内容会突然消失

假设 Child 内有：

```jsx
const [text, setText] = useState('');
```

用户先输入：

```text
hello
```

然后父组件因为自己的计数器更新而 Render。

由于嵌套 Child 类型变化：

```text
旧 Child 被移除
新 Child 被创建
新 Child 执行 useState('')
```

于是输入内容消失。

### 5. 正确方式：组件定义放在顶层

```jsx
function Child() {
  const [text, setText] = useState('');
  return ...;
}

function Parent() {
  return <Child />;
}
```

模块加载后，顶层 `Child` 函数引用保持稳定。

父组件重新 Render 不会重新定义 Child 类型。

### 6. 嵌套 JSX 完全没问题

错误的是：

```jsx
function Parent() {
  function Child() {}
}
```

不是：

```jsx
function Parent() {
  return (
    <section>
      <Child />
    </section>
  );
}
```

JSX 当然可以任意嵌套。

### 7. 不要通过 `useMemo` 去“修复”组件定义

看到组件函数身份变化后，不要走向：

```text
那我把组件函数 useMemo 一下？
```

更简单、正确、可读的设计是：

```text
组件定义放模块顶层
数据通过 Props 传入
```

这也是 React 官方明确推荐的方式。

## 动手编码：从 0 到 1

### 第 0 步：准备一个顶层稳定输入组件

```jsx
function StableTextField() {
  const [text, setText] = useState('');
  return <input value={text} onChange={...} />;
}
```

### 第 1 步：在 App 内错误定义另一个组件

```jsx
function App() {
  function NestedTextField() {
    const [text, setText] = useState('');
    return ...;
  }
}
```

### 第 2 步：给 App 自己增加 State

```jsx
const [count, setCount] = useState(0);
```

点击：

```jsx
<button onClick={() => setCount(count + 1)}>
  Parent count: {count}
</button>
```

### 第 3 步：两个输入框都输入草稿

```jsx
<NestedTextField />
<StableTextField />
```

分别输入不同内容。

### 第 4 步：触发父组件 Render

点击父组件计数按钮。

预期：

```text
NestedTextField -> 内容丢失
StableTextField -> 内容保留
```

### 第 5 步：解释差异

顶层组件：

```text
StableTextField type 始终是同一个函数对象
```

嵌套组件：

```text
父组件每次执行都会创建新的 NestedTextField 函数对象
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：嵌套定义 vs 顶层定义的组件类型身份差异。
- **实验辅助代码**：父级计数器用于制造无关重渲染。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp069-nested-component-definition-reset --config ./vite.config.js
```

## 效果验证

1. 两个输入框分别输入内容。
2. 点击父组件计数按钮。
3. 嵌套定义输入框清空。
4. 顶层定义输入框仍保留内容。
5. 能解释“名字相同”不代表“组件 type 函数对象相同”。
6. 能给出修复原则：组件定义放在模块顶层，变化的数据通过 Props 传递。

完成后继续 **RE-KP070：状态保留与条件渲染**。
