# RE-KP050：避免把可推导值存入 State

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 判断一个值是“真正需要记忆的 State”，还是可以从 Props / 现有 State 直接推导的值。
2. 理解冗余 State 为什么会制造同步问题。
3. 建立 Single Source of Truth 的第一层直觉。
4. 会在 Render 期间直接计算 `fullName`、数量、总价等派生值。
5. 知道“计算出来的值”不等于“必须再存一份 State”。
6. 知道本节不需要用 Effect 去同步派生值。

> **本节核心代码**：只保存 `firstName` 和 `lastName`，在 Render 中直接计算 `fullName`。
>
> **实验辅助代码**：字符数、大小写展示与提示文本只用于增加可观察性，不是本节核心。

## 理论讲解

### 1. 什么叫可推导值

假设组件已经有：

```jsx
const [firstName, setFirstName] = useState('Han');
const [lastName, setLastName] = useState('Li');
```

那么：

```jsx
const fullName = `${firstName} ${lastName}`;
```

可以在每次 Render 时直接算出来。

这类值称为：

```text
Derived Value
派生值 / 可推导值
```

它依赖现有输入，但自己没有独立的事实来源。

### 2. 为什么不应该再存一份 `fullName` State

下面的结构有三个 State：

```jsx
const [firstName, setFirstName] = useState('Han');
const [lastName, setLastName] = useState('Li');
const [fullName, setFullName] = useState('Han Li');
```

问题不是“语法不能运行”，而是现在同一事实被保存了两遍：

```text
firstName + lastName
        ↓
     fullName
```

如果修改 `firstName` 时忘记同步 `fullName`，状态就可能互相矛盾。

### 3. 冗余 State 会增加同步责任

如果保存 `fullName`，每个相关入口都要记得：

```jsx
setFirstName(nextFirstName);
setFullName(`${nextFirstName} ${lastName}`);
```

修改姓氏又要：

```jsx
setLastName(nextLastName);
setFullName(`${firstName} ${nextLastName}`);
```

组件越复杂，越容易出现：

```text
源数据已更新
派生 State 忘记更新
UI 出现旧值
```

### 4. 更简单的结构：只保存源数据

推荐：

```jsx
const [firstName, setFirstName] = useState('Han');
const [lastName, setLastName] = useState('Li');

const fullName = `${firstName} ${lastName}`;
```

这样每次 React 调用组件函数时，都会基于本次 Render 的 State 重新计算 `fullName`。

不需要：

```text
setFullName
同步 Effect
额外的初始化逻辑
```

### 5. Single Source of Truth 的第一层理解

这里真正需要“记住”的只有：

```text
firstName
lastName
```

`fullName` 只是它们的一个视图。

因此数据关系是：

```text
State
  ↓
Derived Value
  ↓
JSX
```

而不是：

```text
State A
  ↓ 手动同步
State B
  ↓
JSX
```

### 6. 常见可推导值

例如：

```jsx
const total = price * quantity;
const completedCount = tasks.filter(task => task.done).length;
const visibleItems = items.filter(item => item.name.includes(query));
const fullName = `${firstName} ${lastName}`;
```

如果这些值可以从当前 Props / State 在 Render 中得到，通常不需要额外 State。

### 7. “计算成本高”是另一个问题

不要因为某个值来自计算，就自动把它放进 State。

如果计算真的昂贵，后续可以讨论缓存 / memoization；但：

```text
性能优化
≠
把派生值复制进 State
```

本节先建立正确数据模型，不提前学习 `useMemo`。

### 8. 不要用 Effect 修补冗余 State

一种常见反模式是：

```jsx
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

这里 Effect 只是为了同步本可以直接计算的值。

更简单的是：

```jsx
const fullName = `${firstName} ${lastName}`;
```

这样没有额外一次同步过程，也不会出现两个事实来源。

## 动手编码：从 0 到 1

### 第 0 步：准备两个真正需要记忆的输入

```jsx
const [firstName, setFirstName] = useState('Han');
const [lastName, setLastName] = useState('Li');
```

本步目标：明确源数据只有姓名的两部分。

### 第 1 步：先不要创建 `fullName` State

不要写：

```jsx
const [fullName, setFullName] = useState('Han Li');
```

因为它可以从现有 State 得到。

### 第 2 步：在组件函数中直接计算

```jsx
const fullName = `${firstName} ${lastName}`.trim();
```

每次 Render 都会得到与当前 State 一致的结果。

### 第 3 步：把两个输入接到 State

```jsx
<input
  value={firstName}
  onChange={event => setFirstName(event.target.value)}
/>
```

姓氏同理。

### 第 4 步：在 JSX 中使用派生值

```jsx
<p>完整姓名：{fullName || '未填写'}</p>
```

你只更新源数据，`fullName` 自动随 Render 重新计算。

### 第 5 步：再增加两个派生展示

```jsx
const characterCount = fullName.replaceAll(' ', '').length;
const upperName = fullName.toUpperCase();
```

它们同样不需要 State。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：只保存源 State，在 Render 中计算 `fullName`。
- **实验辅助代码**：字符数与大写展示只用于证明一个 State 可以派生多个视图。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./05-state-basics-object-array-updates/kp050-avoid-redundant-state --config ./vite.config.js
```

## 效果验证

1. 修改名字时，完整姓名立即跟随更新。
2. 修改姓氏时，不需要额外调用 `setFullName`。
3. 页面没有 `fullName` State，也没有同步 Effect。
4. 能解释为什么保存一份冗余 `fullName` 会增加同步风险。
5. 能说出“真正 State”和“Derived Value”的区别。
6. 能判断总价、筛选数量、完整姓名这类值是否应直接计算。

完成后进入 **Chapter 06 / RE-KP051：每次 Render 都得到状态快照**。
