# RE-KP013：React Element 的不可变描述对象

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 React Element 是描述 UI 的轻量级值，而不是 DOM Node。
2. 知道 JSX 标签和 `createElement()` 都会产生 React Element。
3. 知道创建 React Element 本身不会执行 DOM 挂载。
4. 理解 Element 的 `type`、`props` 等信息是“下一步怎么渲染”的描述。
5. 理解 React Element 与它的 Props 应按不可变值对待。
6. 知道 React 在开发环境会浅层冻结 Element 和 Props，用于帮助发现错误修改。
7. 会使用 `isValidElement()` 做一个最小 Element 身份实验。

> **本节核心代码**：`const element = <strong ... />`、`createElement(...)`、`isValidElement(...)`、`Object.isFrozen(...)`。
>
> **实验辅助代码**：把 Element 属性显示到页面、读取 Vite DEV 状态，只用于验证“Element 是描述对象且开发环境被冻结”。

## 理论讲解

### 1. React Element 不是浏览器 DOM Element

这是 React 最重要的名词区分之一。

写下：

```jsx
const element = <h1>Hello</h1>;
```

这里得到的是 **React Element**。

它不是：

```js
document.createElement('h1')
```

返回的真实 DOM Node。

更合适的第一层直觉是：

```text
React Element
一份“希望 UI 是什么”的轻量描述
```

而不是：

```text
React Element
浏览器页面中的真实节点
```

### 2. JSX 和 `createElement` 都可以产生 Element

下面 JSX：

```jsx
<strong title="hello">React</strong>
```

和下面公开 API：

```js
createElement('strong', { title: 'hello' }, 'React')
```

都会得到 React Element。

官方文档也明确说明：JSX tag 和 `createElement()` 返回的对象都属于 React Element。

### 3. Element 描述里有什么

可以先用极度简化的模型理解：

```js
{
  type: 'strong',
  props: {
    title: 'hello',
    children: 'React'
  }
}
```

真实 React Element 还有框架内部需要的信息，不要依赖所有内部字段写业务代码。

真正需要掌握的是两个核心字段概念：

```text
type
要渲染什么类型

props
这个类型收到什么输入/children
```

### 4. 创建 Element 不等于已经渲染

执行：

```js
const element = createElement('h1', null, 'Hello');
```

只创建了描述。

只有后面把它交给 React Root：

```js
root.render(element);
```

React 才会根据当前树、Renderer 和更新过程处理真实宿主 UI。

因此链路是：

```text
Element 创建
  ≠
DOM 创建完成
```

### 5. 为什么 Element 要视为不可变

React Element 代表某一次渲染描述。

如果创建后再去手工改：

```js
element.props.title = 'new title';
```

会破坏 React 对渲染值的基本假设。

正确思路是：

```text
状态/Props 发生变化
      ↓
组件重新计算
      ↓
创建新的 React Element 描述
      ↓
React 比较并更新
```

而不是：

```text
拿到旧 Element 对象
直接修改里面的字段
```

### 6. React 开发环境会浅层 freeze

React 官方 `createElement` 文档明确要求：

> React Element 与它的 Props 必须被当作不可变值。

为了帮助开发者遵守这一点，React 在开发环境会对返回的 Element 和 `element.props` 做浅层冻结。

因此本课开发服务器中：

```js
Object.isFrozen(element)
Object.isFrozen(element.props)
```

通常会得到：

```text
true
```

注意：

```text
开发期 freeze
是帮助发现错误修改的保护

不可变设计原则
才是你真正应该遵守的规则
```

不能因为生产构建不一定保留同样的冻结检查，就认为生产代码可以修改 Element。

### 7. Element 是值，Component 是产生 UI 的逻辑

本节先只点到为止：

```text
React Element
描述值

Component
可以产生 React Node/Element 的组件逻辑

DOM Node
浏览器宿主对象
```

这三个概念会在下一课 RE-KP014 正式对比。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们创建两种 Element：

```text
JSX Element
createElement Element
```

然后验证：

```text
它们都是 React Element
开发模式下 Element / props被冻结
```

### 第 1 步：创建 JSX Element

在 `src/main.jsx`：

```jsx
const jsxElement = <strong title="jsx element">JSX Element</strong>;
```

不要先 render，先把它当成一个 JavaScript 值。

### 第 2 步：使用 `isValidElement`

导入：

```js
import { isValidElement } from 'react';
```

然后：

```js
isValidElement(jsxElement)
```

应该得到：

```text
true
```

### 第 3 步：用 `createElement` 再创建一个

加入：

```js
const manualElement = createElement(
  'em',
  { title: 'manual element' },
  'createElement Element',
);
```

再验证：

```js
isValidElement(manualElement)
```

也应是 `true`。

### 第 4 步：观察开发期冻结

加入：

```js
Object.isFrozen(jsxElement)
Object.isFrozen(jsxElement.props)
```

通过开发服务器运行时，页面会显示冻结状态。

不要为了验证而真的修改 Element；`isFrozen` 已经足够证明开发期保护存在。

### 第 5 步：最后才把 Element 交给 React 渲染

在 `App` 中写：

```jsx
<p>{jsxElement}</p>
<p>{manualElement}</p>
```

这一步让你清楚看到时间顺序：

```text
先创建 Element 值
      ↓
后把 Element 当作 React Node 交给组件输出
      ↓
Root render 后用户才看到 UI
```

### 第 6 步：运行开发模式

```bash
npm run dev -- ./02-jsx-react-element-component-model/kp013-react-element-immutable --config ./vite.config.js
```

观察：

```text
isValidElement = true
DEV = true
Element frozen = true
props frozen = true
```

### 第 7 步：可选生产对照

执行：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp013-react-element-immutable --config ./vite.config.js
npm run preview -- ./02-jsx-react-element-component-model/kp013-react-element-immutable --config ./vite.config.js
```

重点不要死记 production 下 `Object.isFrozen` 的某个值，而是记住：

> React Element 的不可变约定永远成立；development freeze 只是额外帮助。

### 第 8 步：对照最终源码

最终源码见 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Element 创建、`isValidElement`、开发期 `Object.isFrozen` 验证。
- **实验辅助代码**：页面事实列表和 `import.meta.env.DEV` 只用于把 Element 特征展示出来。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./02-jsx-react-element-component-model/kp013-react-element-immutable --config ./vite.config.js
```

## 效果验证

你应该能够：

1. 解释 React Element 为什么不是 DOM Node。
2. 知道 JSX 与 `createElement()` 都能产生 React Element。
3. 用 `isValidElement()` 验证一个值是不是 React Element。
4. 解释创建 Element 为什么不会直接创建 DOM。
5. 解释为什么 Element / Props 创建后不能直接修改。
6. 知道 development freeze 是帮助发现错误修改的保护，而不是不可变原则本身的来源。
7. 为下一课画出三个框：`Element / Component / DOM Node`，并知道它们不是同一概念。
