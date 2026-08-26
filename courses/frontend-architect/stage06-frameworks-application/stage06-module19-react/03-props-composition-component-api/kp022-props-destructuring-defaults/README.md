# RE-KP022：Props 解构与默认值

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用函数参数解构直接读取 Props。
2. 使用 JavaScript 默认参数为缺失 Props 提供默认值。
3. 知道默认值在 Prop 缺失或值为 `undefined` 时生效。
4. 知道显式传入 `null` 不会触发 JavaScript 默认参数。
5. 避免为了读取简单 Props 而重复写 `props.xxx`。

> **本节核心代码**：`function Avatar({ name, size = 64, tone = 'neutral' })`。
>
> **实验辅助代码**：三次 `Avatar` 调用用于对比默认值生效条件。

## 理论讲解

### 1. Props 本质上是函数参数输入

完整写法：

```jsx
function Avatar(props) {
  return <p>{props.name}</p>;
}
```

解构写法：

```jsx
function Avatar({ name }) {
  return <p>{name}</p>;
}
```

它使用的是普通 JavaScript 对象解构，不是 React 独有语法。

### 2. 可以直接在参数位置设置默认值

```jsx
function Avatar({ name, size = 64 }) {
  // ...
}
```

如果调用：

```jsx
<Avatar name="Ada" />
```

`size` 使用 `64`。

### 3. `undefined` 会触发默认值

这两种效果一致：

```jsx
<Avatar name="Ada" />
<Avatar name="Ada" size={undefined} />
```

因为 JavaScript 默认参数在值为 `undefined` 时生效。

### 4. `null` 不会触发默认值

下面不同：

```jsx
<Avatar name="Ada" size={null} />
```

此时 `size` 的真实值就是 `null`。

因此不要把：

```text
缺失
undefined
null
```

全部当成同一种输入状态。

### 5. 默认值应该表达“合理缺省行为”

适合默认：

```text
头像尺寸
展示密度
普通视觉 variant
可选标题
```

不适合随便默认：

```text
关键业务 ID
权限
支付金额
必须明确选择的业务状态
```

默认值是 API 设计的一部分，不只是少写几行代码。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们创建一个 `Avatar`，分别观察：

```text
不传 size
显式传 size
传 undefined
```

### 第 1 步：先写普通 props 对象

```jsx
function Avatar(props) {
  return <p>{props.name}</p>;
}
```

**本步目标**：先确认组件确实收到一个 Props 对象。

### 第 2 步：改成参数解构

```jsx
function Avatar({ name, size }) {
  return <p>{name}: {size}</p>;
}
```

**为什么这样写？**

组件只依赖两个字段，参数签名直接表达依赖更清楚。

### 第 3 步：加入默认值

改成：

```jsx
function Avatar({ name, size = 64, tone = 'neutral' }) {
  // ...
}
```

### 第 4 步：不传 size

```jsx
<Avatar name="Ada" />
```

**预期**：页面显示 `size=64`。

### 第 5 步：显式传入 size

```jsx
<Avatar name="Lin" size={96} tone="large" />
```

**预期**：使用 `96`，不会使用默认值。

### 第 6 步：传入 undefined

```jsx
<Avatar name="Grace" size={undefined} />
```

**预期**：再次得到 `64`。

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：参数解构和 JavaScript 默认值。
- **实验辅助代码**：三组调用只是为了验证“缺失 / 显式 / undefined”的差异。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./03-props-composition-component-api/kp022-props-destructuring-defaults --config ./vite.config.js
```

## 效果验证

你应该能够确认：

1. `Ada` 使用默认 `64`。
2. `Lin` 使用显式 `96`。
3. `Grace` 的 `undefined` 再次触发默认值。
4. 你能解释为什么 `null` 与 `undefined` 不同。
5. 你能判断哪些业务 Props 不应该随便给默认值。
