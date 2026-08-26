# RE-KP018：JSX 表达式插值

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 JSX 中 `{}` 是“进入 JavaScript 表达式”的位置。
2. 会插入变量、属性访问、函数调用、算术、模板字符串与条件表达式。
3. 区分 expression 与 statement，知道普通 `if` 语句不能直接塞进 JSX 花括号。
4. 知道 `null`、`undefined`、`false` 等空节点通常不会渲染可见文本。
5. 知道普通对象不能直接作为 React child 渲染，应选择属性或先转换为可渲染值。

> **本节核心代码**：`{name}`、`{person.name}`、`{formatScore(score)}`、条件表达式。
>
> **实验辅助代码**：示例用户和分数只用于覆盖不同表达式类型。

## 理论讲解

### 1. JSX 花括号是“进入 JavaScript”的窗口

静态文本：

```jsx
<h1>Hello</h1>
```

动态变量：

```jsx
<h1>Hello, {name}</h1>
```

这里 `{name}` 会读取当前 JavaScript 变量。

### 2. 可以放 JavaScript expression

例如：

```jsx
{person.name}
{score + 10}
{formatScore(score)}
{online ? 'Online' : 'Offline'}
{`User: ${person.name}`}
```

它们都有共同点：每个表达式都能计算出一个值。

### 3. 不能直接放普通 statement

下面不是合法 JSX 插值：

```jsx
<h1>{
  if (online) {
    return 'Online';
  }
}</h1>
```

`if` 是语句，不是一个可以直接作为 `{...}` 值的 expression。

可以在 JSX 外先计算：

```jsx
let statusText;

if (online) {
  statusText = 'Online';
} else {
  statusText = 'Offline';
}

return <h1>{statusText}</h1>;
```

简单二选一时也可以使用条件表达式：

```jsx
<h1>{online ? 'Online' : 'Offline'}</h1>
```

### 4. 字符串和数字可以直接显示

例如 `<p>{name}</p>` 和 `<p>{score}</p>`，字符串与数字会成为可见文本节点。

### 5. `null`、`undefined`、`false` 常被当作空节点

```jsx
<p>{null}</p>
<p>{undefined}</p>
<p>{false}</p>
```

它们不会像字符串 `"null"`、`"undefined"`、`"false"` 那样显示文字。

这也是很多条件渲染写法的基础。

### 6. 对象不能直接作为普通 child

错误思路：

```jsx
const person = { name: 'Ada' };
return <p>{person}</p>;
```

普通对象不是一个可直接显示的 React child。

应该明确选择属性：

```jsx
<p>{person.name}</p>
```

或者调试时先转换为字符串：

```jsx
<pre>{JSON.stringify(person, null, 2)}</pre>
```

### 7. JSX 花括号和 JavaScript 代码块花括号不是一回事

函数体 `{}` 是代码块；JSX `<h1>{name}</h1>` 中的 `{}` 是嵌入 JavaScript expression 的边界。

### 8. 两个 `{` 连在一起只是“表达式里放对象”

例如：

```jsx
<div style={{ color: 'tomato' }} />
```

外层是 JSX expression，内层是 JavaScript object literal，并不存在神秘的“双花括号 React 语法”。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

在一个页面中覆盖变量、对象属性、函数调用、算术、模板字符串、条件表达式和空节点。

### 第 1 步：准备普通变量

创建 `src/main.jsx`：

```jsx
const person = {
  name: 'Ada',
  role: 'Engineer'
};

const score = 92;
const online = true;
```

### 第 2 步：先插入变量和对象属性

组件里写：

```jsx
<h1>{person.name}</h1>
<p>{person.role}</p>
<p>{score}</p>
```

运行后应显示对应文本和数字。

### 第 3 步：加入函数调用表达式

定义：

```jsx
function formatScore(value) {
  return `${value}/100`;
}
```

然后使用 `<p>{formatScore(score)}</p>`。

### 第 4 步：加入算术和模板字符串

```jsx
<p>Bonus: {score + 5}</p>
<p>{`Profile: ${person.name}`}</p>
```

两种写法都产生可渲染值。

### 第 5 步：加入条件表达式

```jsx
<strong>{online ? 'Online' : 'Offline'}</strong>
```

这里使用的是 JavaScript 条件表达式，不是 `if` statement。

### 第 6 步：观察空节点

加入：

```jsx
<div>{null}</div>
<div>{undefined}</div>
<div>{false}</div>
```

页面不会出现对应名字面文字。

### 第 7 步：不要直接渲染普通对象

不要写 `<p>{person}</p>`。最终案例改为：

```jsx
<pre>{JSON.stringify(person, null, 2)}</pre>
```

这样先把对象转换成字符串。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **核心代码**：各种 `{expression}`。
- **实验辅助代码**：测试数据和 JSON 调试展示。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./02-jsx-react-element-component-model/kp018-jsx-expression-interpolation --config ./vite.config.js
```

构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp018-jsx-expression-interpolation --config ./vite.config.js
```

## 效果验证

请确认：

1. `{person.name}` 能读取对象属性。
2. `{score + 5}` 能执行算术表达式。
3. `{formatScore(score)}` 能执行函数调用。
4. `{online ? ... : ...}` 能作为条件表达式。
5. `null/undefined/false` 不会显示为同名字面文字。
6. 知道普通对象不能直接作为 React child。
7. 能解释为什么 `if` statement 通常要放在 JSX 外部。

完成后继续学习 **RE-KP019：JSX 属性与 JavaScript 表达式**。
