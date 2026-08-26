# RE-KP011：JSX 的定位与语法边界

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 准确说出 JSX 是 JavaScript 的语法扩展，而不是一种浏览器原生 HTML 模板语言。
2. 区分 JSX、React、HTML 三个概念。
3. 知道 JSX 最终需要被工具链转换成普通 JavaScript。
4. 认识 JSX 比 HTML 更严格的几个基础规则：标签闭合、单一返回值、属性命名差异。
5. 知道 `{}` 用来进入 JavaScript 表达式，但表达式细节会在 RE-KP018 深入学习。
6. 能手写一个最小 JSX 页面并运行。

> **本节核心代码**：`function App() { return ( ...JSX... ); }` 中的 JSX 结构，以及 `className`、自闭合标签和 `{}` 表达式入口。
>
> **实验辅助代码**：`createRoot`、data URI 图片和示例变量只用于让 JSX 真实运行；React DOM Root 已在前面学过，本节不重复展开。

## 理论讲解

### 1. JSX 到底是什么

React 官方把 JSX 描述为：

> 一种 JavaScript 语法扩展，让你可以在 JavaScript 文件中书写类似 HTML 的标记。

关键是两个词：

```text
JavaScript
语法扩展
```

所以：

```text
JSX ≠ HTML 文件
JSX ≠ React 本身
JSX ≠ 浏览器原生语法
```

JSX 经常与 React 一起使用，但两者是不同概念。React 是 UI Library；JSX 是描述 UI 时常用的语法形式。

### 2. 为什么 React 把标记和逻辑放到同一个组件里

传统页面经常按文件类型分开：

```text
HTML
CSS
JavaScript
```

React 组件更强调按“一个 UI 单元的职责”组织：

```text
按钮的结构
按钮需要的数据
按钮的交互逻辑
```

这些内容往往强相关，所以 JSX 允许组件把标记和渲染逻辑放在同一个 JavaScript 上下文中。

这不代表 CSS、数据请求或所有逻辑都必须写在同一个文件；核心只是：

> 与同一个组件渲染直接相关的标记和逻辑可以自然地一起表达。

### 3. JSX 看起来像 HTML，但不是直接复制 HTML

例如 HTML 常写：

```html
<div class="card">
  <img src="logo.png">
</div>
```

JSX 中通常写成：

```jsx
<div className="card">
  <img src="logo.png" />
</div>
```

这里出现两个重要差异：

```text
class → className
<img> → <img />
```

原因是 JSX 最终进入 JavaScript 对象/调用表达式世界，它有自己的语法与 DOM 属性映射规则。

### 4. JSX 要求标签正确闭合

JSX 比浏览器 HTML 容错解析更严格。

例如：

```jsx
<img src="logo.png" />
```

以及：

```jsx
<li>React</li>
```

都应该明确闭合。

不要依赖浏览器 HTML Parser 帮你自动补标签，因为 JSX 在进入浏览器 DOM 之前就已经要被 JavaScript 工具链解析。

### 5. 为什么组件通常返回一个根值

JavaScript 函数一次 `return` 一个值。

下面是两个并列 JSX 值：

```jsx
return (
  <h1>Title</h1>
  <p>Content</p>
);
```

它们没有被组合成一个单一值，因此语法不成立。

可以包一层 DOM：

```jsx
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

也可以使用 Fragment：

```jsx
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

Fragment 会在 RE-KP017 专门深入。本节只先知道它能把多个 JSX 节点组合成一个返回值。

### 6. `{}` 是回到 JavaScript 表达式的入口

JSX 标记中可以写：

```jsx
<h1>{courseName}</h1>
```

这里：

```text
<h1>...</h1>
JSX 标记上下文

{courseName}
JavaScript 表达式上下文
```

但 `{}` 里面并不是随便塞任何 JavaScript statement。表达式、条件、对象、函数调用等细节会在 RE-KP018 深入。

### 7. JSX 不会直接创建 DOM

写下：

```jsx
<h1>Hello</h1>
```

并不等于浏览器此刻立刻执行：

```js
document.createElement('h1')
```

JSX 会先被转换为 JavaScript 中的 React Element 创建逻辑，再由 React / Renderer 决定如何处理真实宿主界面。

下一节 RE-KP012 就专门看这个转换过程。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们不追求复杂页面，只验证：

```text
JSX 标记
+ JavaScript 表达式
+ JSX 严格语法
```

能组成一个正常运行的 React 组件。

### 第 1 步：创建 HTML Root

创建 `index.html`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 2 步：准备普通 JavaScript 数据

在 `src/main.jsx` 先写：

```jsx
const courseName = 'React';
const lesson = 11;
```

这些只是普通 JavaScript 变量。

### 第 3 步：创建函数组件并返回 JSX

加入：

```jsx
function App() {
  return (
    <main>
      <h1>JSX 是 JavaScript 的语法扩展</h1>
    </main>
  );
}
```

这里先建立最小结构：

```text
JavaScript function
      ↓
return JSX value
```

函数组件本身会在 RE-KP015 深入，本节只把它当 JSX 容器。

### 第 4 步：加入 JavaScript 表达式

增加：

```jsx
<p>RE-KP{lesson}</p>
<p>{courseName} 常用 JSX 描述界面。</p>
```

运行后应显示变量实际值，而不是字面量 `{lesson}`。

### 第 5 步：使用 JSX 属性名

给 `main` 加：

```jsx
className="lesson-card"
```

重点记住不是：

```jsx
class="lesson-card"
```

属性规则会在 RE-KP019 深入。

### 第 6 步：加入必须闭合的图片标签

加入：

```jsx
<img alt="JSX syntax marker" src="..." />
```

故意把 `/>` 去掉一次，观察 JSX Parser 给出的错误；然后恢复正确代码。

### 第 7 步：用 Fragment 包住根结构

最终源码外层使用：

```jsx
<>
  <main>...</main>
</>
```

当前它不是必需的，但可以提前看到 Fragment 的外观。RE-KP017 会解释为什么它不产生额外 DOM 节点。

### 第 8 步：运行案例

```bash
npm run dev -- ./02-jsx-react-element-component-model/kp011-jsx-positioning --config ./vite.config.js
```

### 第 9 步：对照最终源码

最终源码见 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：JSX 标记、`className`、闭合标签、Fragment 外观和 `{}` 表达式入口。
- **实验辅助代码**：Root 挂载、示例变量和 data URI 图片用于让语法规则可运行、可观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./02-jsx-react-element-component-model/kp011-jsx-positioning --config ./vite.config.js
```

## 效果验证

你应该能够：

1. 用一句话说明 JSX 与 React 的区别。
2. 用一句话说明 JSX 与 HTML 的区别。
3. 把 HTML 的 `class` 正确改成 JSX 的 `className`。
4. 知道 JSX 标签需要正确闭合。
5. 知道多个并列 JSX 节点需要被组合成一个返回值。
6. 知道 `{}` 是进入 JavaScript 表达式的入口。
7. 知道浏览器不会直接执行 JSX，下一步还需要 JSX Transform。
