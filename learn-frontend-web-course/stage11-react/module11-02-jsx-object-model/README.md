# Module 11.02：JSX 与 React Object Model

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-01-react-foundation/README.md)  > · [下一个 Module](../module11-03-component-props-composition/README.md)

JSX 不作为“HTML 写进 JS”简单带过，而是一直学习到 JSX Transform、Element Object、类型检查和常见错误边界。

### Lesson RE-JSX-001：JSX 为什么存在

先用函数调用/对象描述 UI，再引入 JSX，理解 JSX 解决的是 UI 描述可读性问题，而不是浏览器新语法。

### Lesson RE-JSX-002：JSX 与 HTML 到底有哪些不同

系统理解 className、htmlFor、camelCase、boolean attribute、style object、事件属性等差异，以及差异背后的 JavaScript/DOM 属性模型。

### Lesson RE-JSX-003：在 JSX 中嵌入 JavaScript Expression

掌握 `{}` 的真正语义，区分 Expression 与 Statement，解释为什么某些 JavaScript 不能直接写进 JSX children。

### Lesson RE-JSX-004：JSX Attribute 与 Props 如何连接

从 JSX Attribute 跟踪到 React Element props，对字符串、表达式、boolean、对象和 spread 的结果逐个观察。

### Lesson RE-JSX-005：JSX Children 到底是什么

覆盖文本、Element、数组、null、boolean、Fragment、Component Children，并观察最终 React Node 结构。

### Lesson RE-JSX-006：Fragment 为什么存在

比较额外 DOM Wrapper、Fragment 和数组返回，理解 React Tree 组织与真实 DOM 结构的差异。

### Lesson RE-JSX-007：Spread Props 为什么方便又危险

学习 `{...props}` 的覆盖顺序、未知属性传播和 API 边界污染问题，建立组件公共 API 的早期规范意识。

### Lesson RE-JSX-008：JSX Transform 到底把代码变成什么

查看 Vite/Babel/SWC 转换结果，理解 `jsx/jsxs` 调用以及为什么现代 JSX 不再要求每个文件显式 `import React`。

### Lesson RE-JSX-009：React Element Object 长什么样

在开发环境打印 JSX 结果，观察 type、props、key 等信息，强调它只是描述对象而不是 DOM Node。

### Lesson RE-JSX-010：为什么不能把任意对象直接渲染成 Child

主动制造 invalid React child 错误，理解 React Node 可接受值范围和数据到 UI 的显式转换责任。

### Lesson RE-JSX-011：JSX 与 TypeScript 如何协作

理解 TSX、Intrinsic Elements、Component Props 类型检查和常见类型报错，为后续组件 API 奠定基础。

### Lesson RE-JSX-012：从 JSX 源码到浏览器 DOM 的完整链路

从 `.tsx` 源码一路观察 Transform、React Element、Render、DOM，要求能解释每一层对象发生了什么。

---

本 Module 专门消除 React 初学和进阶阶段最常见的概念混淆，并为 Fiber 源码学习建立统一词汇。

### Lesson RE-MODEL-001：Function 与 Component Definition 有什么区别

理解不是所有函数都是 React Component，Component Definition 需要满足什么调用约定和返回约束。

### Lesson RE-MODEL-002：`App`、`App()`、`<App />` 分别是什么

通过类型、返回值、调用方式和 Hooks 行为比较三者，解释为什么业务代码不应该把 Function Component 当普通函数直接调用。

### Lesson RE-MODEL-003：React Element 到底是什么

创建多个 Element，观察 element 的不可变描述属性，理解“Element 是 UI 描述，不是组件实例”。

### Lesson RE-MODEL-004：React Node 的范围比 React Element 大在哪里

系统整理 string、number、Element、Fragment、Portal、array、null 等可渲染节点，解决 children API 设计时的类型困惑。

### Lesson RE-MODEL-005：Component Tree 与 Element Tree 如何形成

从函数组件返回值递归展开，理解组件层级与 Element 描述之间不是简单的一对一 DOM 映射。

### Lesson RE-MODEL-006：DOM Node 是什么时候才真正出现的

在 Render 前后观察浏览器 DOM，理解 React 描述阶段与 Host DOM Mutation 阶段的分离。

### Lesson RE-MODEL-007：Fiber 现在先认识到什么程度

只建立 Fiber 是 React 内部工作单元/运行时节点的概念，明确 Fiber ≠ Element ≠ Component ≠ DOM；源码细节留到后续 Fiber Module。

### Lesson RE-MODEL-008：画出一次最小 React 页面中的全部对象关系

对一个三组件页面输出 Function、Element、Tree、Fiber（概念级）、DOM 的关系图，作为后续所有 React 机制讨论的统一语言。

---
