# Stage 11：React 完整体系

> 版本：v1.2-draft  
> 基线日期：2026-09-02  
> React 基线：React 19.2.x Stable；正式课程编写时使用当时最新稳定补丁并重新核验官方文档、安全公告和生态兼容性。  
> 上级总纲：[`../README.md`](../README.md)  
> 教学规范：[`../FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md)

---

# 1. 阶段定位

Stage 11 是课程中唯一完整的 React Stage。

React 不再拆成“基础 / 高级 / SSR / 源码”等多个 Stage，而是在这一 Stage 中，从第一次理解 React、第一次创建项目，一路学习到企业应用、并发、服务端 React、性能、Compiler、Fiber 源码、Library、Legacy、迁移和大型架构。

完整能力链：

```text
第一次接触 React
↓
从空目录建立 React 项目
↓
理解 JSX / Element / Component / Props
↓
掌握 Event / State / Form / Render
↓
掌握 State Architecture / Reducer / Context
↓
掌握 Ref / Effect / Custom Hook
↓
掌握 Router / Server State / API Boundary
↓
掌握 Actions / Optimistic / Suspense / Concurrency / Activity
↓
掌握 Profiler / Performance / Compiler
↓
掌握 React DOM / Error / A11Y / Security
↓
掌握 SSR / Hydration / Streaming / Static Rendering
↓
掌握 RSC / Server Functions / Cache Boundary
↓
调试 Fiber / Reconciler / Hooks / Lane / Scheduler 源码
↓
建设 React Library / Headless UI / 大型应用架构
↓
维护 Legacy React / Migration / Upgrade Governance
↓
能够长期负责大型 React 技术体系
```

---

# 2. Stage 11 固定结构

Stage 11 后续只使用三级课程结构：

```text
Stage
└── Module
    └── Lesson
```

不再额外创建 Failure Lab、Source Lab、Performance Lab、Module Review 等课程层级。

故障复现、性能分析、源码 Debug、综合项目、架构复盘都直接设计成普通 Lesson，并按正常学习顺序放进对应 Module。

每个 Module 必须一次学透。Lesson 拆分遵循：

1. 一个 Lesson 只解决一个主要问题或建立一个主要因果关系。
2. Lesson 可以是基础使用、机制实验、故障复现、源码调试、性能分析或综合项目，但结构上全部统一叫 Lesson。
3. 每个 Lesson 只能从零状态开始，或明确复制上一课最终源码继续演进。
4. 每个 Lesson 最终源码必须可以独立安装、运行、测试和验证。
5. 当前 Lesson 用到的核心知识必须已经学过，禁止偷用未来 Module 技术。
6. Module 的 Must / Should / Expert 深度通过多个 Lesson 在本 Module 内一次闭环，不能未来再补“高级篇 / 源码篇”。
7. Lesson ID 使用稳定语义 ID；即使后续调整 Module 顺序，引用关系也尽量不被破坏。

当前已经把 `Module 11.01 ～ 11.18` 拆到 Lesson 粒度；后续继续保持完全相同的规则向 11.78 推进。

---

# 3. Module / Lesson 学习顺序

# Module 11.01：React 是什么、为什么需要 React

本 Module 不急着写 Hook，而是先建立 React 的问题域。完成后必须知道 React 为什么存在、它负责什么、不负责什么，以及它与浏览器 DOM 的关系。

### Lesson RE-INTRO-001：网页交互为什么会越来越难维护

从一个最小原生 DOM 交互开始，观察“状态、事件、DOM 修改”如何逐渐形成多处手工同步，理解 UI 状态复杂度真正从哪里产生。

### Lesson RE-INTRO-002：命令式 UI 与声明式 UI 到底差在哪里

用同一个 Counter / Filter UI 分别实现命令式 DOM 版本和声明式描述版本，建立“告诉浏览器怎么改”和“描述当前 UI 应该是什么”的差异。

### Lesson RE-INTRO-003：UI = f(State) 是什么意思

从输入状态映射到 UI 输出，理解相同 State 为什么应该产生相同 UI，以及这个思想为什么要求 Render 保持纯净。

### Lesson RE-INTRO-004：React 到底负责什么、不负责什么

区分 React Core、React DOM、Router、Server State、Build Tool、Full-stack Framework，避免把整个 React 生态误认为一个库。

### Lesson RE-INTRO-005：React Tree 与 DOM Tree 为什么不是一回事

通过一个最小组件树比较 React Component Tree、React Element Tree 和最终 DOM Tree，为后续 Portal、Fiber、SSR、RSC 做概念准备。

### Lesson RE-INTRO-006：React Library 与 React Framework 的边界

理解 React 为什么被称为 UI Library，Next.js / React Router Framework 等为什么承担更多路由、数据、构建和服务端职责。

### Lesson RE-INTRO-007：Client Rendering、SSR、RSC 先建立全局地图

只建立运行位置和数据流概念，不提前学习具体 API：浏览器执行什么、服务器执行什么、HTML 从哪里来、RSC 为什么不是 SSR 的别名。

### Lesson RE-INTRO-008：React 与 Vue / Angular / Svelte 的范式差异初识

从状态更新、模板/JSX、响应式方式、编译与运行时职责做高层比较，目的不是现在做技术选型，而是知道 React 的设计取舍。

### Lesson RE-INTRO-009：综合实现——同一个交互页面的 DOM 与 React 两种思路

完成一个小型筛选列表的双版本实现，只比较状态与 UI 同步方式；不提前使用 State Manager、Router、Query 等未来知识。

---

# Module 11.02：从空目录建立 React + TypeScript 项目

本 Module 必须从空目录开始，不允许直接 `create-vite` 一条命令把所有文件生成完以后再解释。目标是亲手建立一个 React 项目的最小运行链路，再逐步引入 Vite 和 TypeScript。

### Lesson RE-BOOT-001：React 项目启动前到底需要哪些东西

检查 Node.js、pnpm、浏览器和编辑器，解释 Node 为什么只是在开发/构建阶段运行，React 页面最终为什么仍然在浏览器中执行。

### Lesson RE-BOOT-002：从空目录创建 package.json

手工创建最小 `package.json`，理解 package、依赖、脚本、版本范围和项目元数据，不依赖脚手架隐藏这些概念。

### Lesson RE-BOOT-003：安装 react 与 react-dom

区分 `react` 与 `react-dom` 的职责，并通过 `node_modules`、lockfile 和 package.json 的变化理解依赖真正安装到了哪里。

### Lesson RE-BOOT-004：第一次创建 index.html

手工创建最小 HTML 容器，理解 `<div id="root">` 只是普通 DOM 节点，此时页面中还没有 React。

### Lesson RE-BOOT-005：第一次创建 JavaScript 入口文件

创建浏览器模块入口，理解 `<script type="module">`、ES Module、浏览器加载入口文件的过程。

### Lesson RE-BOOT-006：第一次调用 createRoot

在入口文件中导入 React DOM Client，找到 `#root` DOM Container，创建 React Root，并解释 DOM Container 与 React Root 的区别。

### Lesson RE-BOOT-007：第一次调用 root.render

把最小 React Element 渲染到 Root，验证 React 已经真正接管指定 DOM 容器，并观察最终生成的 DOM。

### Lesson RE-BOOT-008：第一次创建 App Component

把 UI 从入口文件拆成 `App` Function Component，建立入口文件、Root Component 和普通 Component 的职责边界。

### Lesson RE-BOOT-009：为什么项目需要 JSX 转换

故意让浏览器直接面对 JSX，观察为什么原生浏览器不能直接执行 JSX，再引出 Build Transform 的必要性。

### Lesson RE-BOOT-010：手工加入 Vite

安装并配置 Vite，理解 Dev Server、入口 HTML、模块转换和开发服务器之间的关系，而不是把 Vite 当成“React 自带工具”。

### Lesson RE-BOOT-011：理解 dev / build / preview scripts

亲手配置并运行 scripts，明确开发服务器、生产构建、生产产物预览三种运行模式的区别。

### Lesson RE-BOOT-012：把项目升级为 TypeScript

加入 TypeScript、React 类型声明、`tsconfig` 和 `.tsx` 文件，理解 TypeScript 在构建链中的位置以及类型为什么不会进入浏览器运行时。

### Lesson RE-BOOT-013：理解 tsconfig 中与 React 直接相关的关键配置

聚焦 JSX、module、target、strict、moduleResolution 等真正会影响 React 项目的配置，不把 tsconfig 变成参数背诵课。

### Lesson RE-BOOT-014：第一次体验 HMR

修改组件并观察页面局部刷新，区分普通浏览器刷新、Vite HMR 和 React Fast Refresh 的职责。

### Lesson RE-BOOT-015：第一次 production build

执行生产构建，查看 dist、HTML、JS/CSS 产物和资源引用，理解源码和生产资源之间发生了什么变化。

### Lesson RE-BOOT-016：理解 Source Map 的作用

在开发工具中从生产/转换后代码映射回 TSX 源码，为以后 React 源码 Debug、线上错误定位建立基础。

### Lesson RE-BOOT-017：完整追踪 React 项目启动链路

从浏览器请求 URL 开始，逐步解释 `index.html → module script → main.tsx → createRoot → root.render → App → React Tree → DOM`，要求能够脱离脚手架完整复述。

### Lesson RE-BOOT-018：从零重新搭一次最小 React 项目

删除项目后重新创建一遍，不看最终源码完成依赖、HTML、入口、Root、Component、Vite、TypeScript、build，作为本 Module 的综合验证。

---

# Module 11.03：React Root 与应用启动生命周期

本 Module 把 Root 从“照着文档写 createRoot”提升到完整运行边界：一个 Root 管什么、什么时候创建、什么时候销毁、多个 Root 如何共存，以及 Hydration Root 与 Client Root 为什么不同。

### Lesson RE-ROOT-001：DOM Container 与 React Root 是两个什么对象

通过运行时打印和 DevTools 观察，明确 DOM Element、React Root 和 Component Tree 三者的关系。

### Lesson RE-ROOT-002：createRoot 创建了什么运行边界

理解 Root 不是单纯的 render 函数包装器，而是 React 调度、错误处理、标识和后续更新的根边界。

### Lesson RE-ROOT-003：重复 root.render 会发生什么

在同一个 Root 上连续 render 不同 Element Tree，观察 DOM 如何复用、Component State 如何保留或重置，为 Reconciliation 建立前置直觉。

### Lesson RE-ROOT-004：root.unmount 为什么不是删除 innerHTML

比较 React unmount 和手工清空 DOM，观察 Effect/Ref/组件生命周期清理的差异，为后续资源释放做准备。

### Lesson RE-ROOT-005：一个页面可以有多个 React Root 吗

在传统 HTML 页面中挂载两个独立 Root，理解多个 React Island、共享状态困难和嵌入 Legacy Page 的实际使用场景。

### Lesson RE-ROOT-006：React 如何逐步嵌入历史系统

以已有 HTML / jQuery 风格页面为背景，只让 React 接管一个区域，理解渐进迁移而不是“一次性重写”的工程边界。

### Lesson RE-ROOT-007：createRoot 与 hydrateRoot 为什么不能混用

通过已有 Server HTML 的最小例子建立 Client Render 与 Hydration 的区别；此处只建立 Root 级概念，完整 Hydration 在后续 Module 深入。

### Lesson RE-ROOT-008：identifierPrefix 为什么存在

用多个 Root + `useId` 场景解释 ID 冲突问题，为 SSR、多 Root 和可访问性建立前置知识。

### Lesson RE-ROOT-009：Root Error Callback 能观察哪些错误

认识 `onCaughtError`、`onUncaughtError`、`onRecoverableError` 等 Root 级错误观察入口及其生产可观测价值，不在这里展开完整 Error Boundary。

### Lesson RE-ROOT-010：Root 创建、更新、卸载的完整生命周期

用时间线把 Container、Root、首次 Render、后续 Render、Unmount 串起来，并输出一张 Root 生命周期图。

---

# Module 11.04：JSX 一次学透

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

# Module 11.05：React Element、React Node、Component、DOM Node

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

# Module 11.06：Function Component、Pure Render 与 StrictMode

本 Module 从“会写函数组件”深入到 React 正确性规则。后续 State、Effect、Concurrency、Compiler 和 Fiber 都依赖这里建立的纯 Render 模型。

### Lesson RE-COMP-001：第一个真正可复用的 Function Component

从单文件 App 拆出独立组件，明确组件命名、文件职责、参数和返回 UI 描述的基本形式。

### Lesson RE-COMP-002：Component Function 什么时候会重新执行

通过父组件更新、Props 更新和 State 更新观察函数重新调用，纠正“组件对象被修改”的错误心智模型。

### Lesson RE-COMP-003：Render 到底是什么意思

区分 Component Render、React Render Phase 和浏览器 Paint，避免把“React render”简单理解为“屏幕刷新”。

### Lesson RE-COMP-004：Pure Render 为什么是 React 的硬规则

通过相同输入产生不同结果的故障示例，解释纯函数、幂等、可重试 Render 与 Concurrent Rendering 的关系。

### Lesson RE-COMP-005：在 Render 中修改外部变量会发生什么

主动制造全局变量累加、DOM 修改等副作用，观察重复 Render 后错误行为，并解释副作用为什么必须离开 Render。

### Lesson RE-COMP-006：为什么不能在 Render 中直接调用会变化的随机/时间数据

使用 Date、Math.random 制造不稳定 UI，为 Hydration Mismatch、Memoization 和 Compiler 规则建立前置理解。

### Lesson RE-COMP-007：StrictMode 到底在验证什么

观察开发环境中的额外 Render / Effect 检查，理解 StrictMode 是发现不纯逻辑和清理缺失的工具，不是“React 的 Bug”。

### Lesson RE-COMP-008：Nested Component Definition 为什么会导致状态重置

在组件内部定义另一个组件并触发父更新，观察 Component Type Identity 变化，为后续 State Preservation 深入做准备。

### Lesson RE-COMP-009：Mutation 为什么经常让 React 推理失效

从 Props/Object Mutation 的小例子观察不可预测行为，引出不可变数据和 Compiler/Concurrent React 对正确代码结构的要求。

### Lesson RE-COMP-010：Rules of React 的统一心智模型

把 Pure Render、Hook Rules、不可变输入、Effect 边界等规则放在同一张图里解释“React 为什么需要这些约束”。

---

# Module 11.07：Props、Children 与单向数据流

本 Module 不止讲“父传子”，还覆盖组件 API 设计、Composition、回调、不可变输入、TypeScript Props 和常见 API 失控问题。

### Lesson RE-PROPS-001：第一个 Props

从硬编码组件演进为可配置组件，理解 Component Definition 与每次 Element 创建时传入的 Props 数据。

### Lesson RE-PROPS-002：Props Destructuring、Default Value 与 Optional Props

学习默认值真正发生的位置、undefined 与缺省值行为，并用 TypeScript 明确 required / optional 合同。

### Lesson RE-PROPS-003：Object / Array Props 为什么仍然是引用

观察父组件每次创建新对象对 Props Identity 的影响，为后续 Memoization 和 Render Performance 建立前置知识。

### Lesson RE-PROPS-004：Function Props 如何让 Child 请求 Parent 执行动作

理解 Callback Props 不是“子改父”，而是父组件把能力通过函数传给子组件；建立事件上行的正确数据流模型。

### Lesson RE-PROPS-005：Children 到底是不是一个特殊 Props

比较显式 `children` 与普通 Props，理解文本、Element、多个 Children 和嵌套结构。

### Lesson RE-PROPS-006：Composition 为什么通常优于大量配置 Props

从一个布尔 Props 爆炸组件重构为 Composition，学习 slots-like composition、wrapper、layout 和 content injection。

### Lesson RE-PROPS-007：Props 是只读的意味着什么

主动修改 Props / nested object，讨论 JavaScript 引用可变性与 React 单向数据流之间的边界。

### Lesson RE-PROPS-008：TypeScript 如何设计可靠 Props API

覆盖 union、discriminated union、children 类型、event callback、generic props 的基础设计，重点避免 impossible props combination。

### Lesson RE-PROPS-009：Controlled API 的概念从哪里来

通过“父拥有值 + 子接收 value/onChange”建立 Controlled Component 前置模型，为 Form、Headless Component 做准备。

### Lesson RE-PROPS-010：Prop Drilling 是问题本身还是架构信号

通过多层传递例子分析何时保持显式 Props 更好、何时应 Composition、Context 或重新划分 Ownership，不提前直接把 Context 当答案。

### Lesson RE-PROPS-011：组件公共 API 如何避免不断膨胀

从 ProductCard 的真实需求演进中分析 boolean prop、mode prop、render prop、children composition 的取舍，为大型组件 API 设计建立早期经验。

### Lesson RE-PROPS-012：综合重构——从硬编码卡片到可组合组件族

把多个重复卡片重构为 ProductCard / ProductImage / ProductMeta / Action Area 等可组合结构，仅使用已经学过的 JSX、Component、Props 和 Children。

---

# Module 11.08：Conditional Rendering、List、Key 与 Identity

本 Module 从条件显示和列表渲染一路进入 Key、Identity、Reconciliation 前置模型，并在末尾自然完成第一个 React 综合项目。

### Lesson RE-LIST-001：条件 UI 的第一种写法——if 与提前 return

学习基于数据决定完整 UI 分支，理解 return null 和不渲染之间的关系。

### Lesson RE-LIST-002：三元表达式适合什么条件 UI

比较 if 与 ternary 的可读性边界，避免为了“短”把复杂业务逻辑塞进 JSX。

### Lesson RE-LIST-003：`&&` 条件渲染有哪些陷阱

主动制造 `0 && <Component />` 等问题，理解 JavaScript 表达式结果和 React Node 渲染规则之间的关系。

### Lesson RE-LIST-004：数组为什么可以直接成为 React Children

从数组 of Elements 到 JSX 列表，理解 React 如何接收一组 sibling children。

### Lesson RE-LIST-005：使用 map 从数据得到 Element 列表

建立“数据集合 → UI 描述集合”的声明式模型，并保持数据转换和 JSX 表达清晰。

### Lesson RE-LIST-006：为什么 React 要求 Key

从没有 Key 的警告入手，不先背规则，而是通过更新列表观察 React 为什么需要 sibling identity。

### Lesson RE-LIST-007：什么才是 Stable Key

比较 database id、业务 id、index、random key，理解稳定性、唯一范围和可预测 identity。

### Lesson RE-LIST-008：Index Key 在什么情况下真的会出问题

制造插入、删除、排序场景，并在行内加入可观察状态，看到状态为什么会对应错数据。

### Lesson RE-LIST-009：Random Key 为什么会让组件每次都重新开始

每次 Render 生成新 Key，观察 DOM/Component State 被重新创建，理解 Key 不只是消除 warning。

### Lesson RE-LIST-010：Key 与 Component Identity / State Preservation 的连接

把 Key 放到组件级切换场景，提前建立“type + position + key”决定 identity 的模型，完整机制留到 Module 11.13。

### Lesson RE-LIST-011：列表删除、插入、重排时 React 在比较什么

在不进入 Fiber 源码的前提下建立 Child Reconciliation 的高层模型，为后续 Reconciler Module 埋下清晰连接点。

### Lesson RE-LIST-012：复杂条件与列表代码应该放在 JSX 里还是外面

从可读性、可测试性和重复计算角度重构一个复杂商品列表，学习派生变量和渲染表达式的边界。

### Lesson RE-LIST-013：综合项目——React Product Catalog 需求与知识边界

确定商品目录需求、页面结构和验收标准，并明确项目只允许使用当前已经学习的 Component、JSX、Props、Children、Conditional、List、Key、CSS。

### Lesson RE-LIST-014：综合项目——设计 Product Catalog 的 Component Tree

从业务页面反推 ProductCatalog、CategorySection、ProductCard 等组件职责，画 Component Tree 和 Props Flow，不提前引入 State Manager、Router、Query、Effect。

### Lesson RE-LIST-015：综合项目——实现分类、缺货状态和商品列表

完成真实静态数据驱动的目录 UI，综合使用 Props、Composition、条件渲染和 List。

### Lesson RE-LIST-016：综合项目——主动制造错误 Key Bug

把正确 Key 改成 index/random，制造排序/重建问题，记录实际 UI / DOM 行为并解释根因。

### Lesson RE-LIST-017：综合项目——重构组件 API 与数据模型

检查 Props 是否过度、Component 边界是否合理、是否存在重复派生数据，完成第一次 React 组件设计重构。

### Lesson RE-LIST-018：综合项目——从源码到生产构建完整验收

从空目录重新复刻关键链路，运行开发模式和 production build，检查 Console、DOM、构建结果，并完整解释当前项目中 React 从数据到 DOM 的路径。

---

# Module 11.09：React Event System

本 Module 从最基础的点击事件一路学习到 SyntheticEvent、传播模型、默认行为、键盘/指针/输入事件、IME、事件委托、TypeScript 事件类型和 React Event Priority 前置模型。目标不是背 `onClick`，而是能够解释浏览器事件如何进入 React，再如何驱动状态更新。

### Lesson RE-EVENT-001：React 事件处理器和普通函数调用有什么区别

从 `onClick={handleClick}`、`onClick={handleClick()}` 和内联箭头函数对比开始，理解“传递函数”与“立即调用函数”的区别，以及为什么初学者经常在 Render 阶段误触发事件逻辑。

### Lesson RE-EVENT-002：第一个 Click Event 到底经历了什么

从用户点击 DOM 开始，观察浏览器 Native Event、React Event Handler、Component 代码之间的调用链，建立浏览器事件进入 React 的第一张时序图。

### Lesson RE-EVENT-003：SyntheticEvent 是什么，为什么 React 不直接把所有细节暴露成原生事件

查看 SyntheticEvent 常用字段、`nativeEvent` 和跨浏览器抽象，理解 React 事件对象与 DOM Event 的关系以及哪些场景需要回到原生事件。

### Lesson RE-EVENT-004：target 与 currentTarget 为什么经常被混淆

通过嵌套按钮/列表点击实验观察 `target` 与 `currentTarget`，建立事件真正发生位置和当前处理器挂载位置的区别。

### Lesson RE-EVENT-005：Capture、Target、Bubble 三个阶段如何工作

先回顾浏览器传播模型，再在 React 中分别注册 Capture / Bubble Handler，通过日志验证事件传播顺序。

### Lesson RE-EVENT-006：stopPropagation 到底停止了什么

主动加入父子事件处理器，比较不停止、停止传播以及错误滥用 `stopPropagation` 的行为，理解它为何可能破坏组件组合和全局交互。

### Lesson RE-EVENT-007：preventDefault 与“阻止事件传播”完全不是一回事

使用 Link、Form、Checkbox 等默认行为案例区分 Default Action 与 Event Propagation，并观察 `defaultPrevented`。

### Lesson RE-EVENT-008：React 为什么常常不需要手工做 Event Delegation

通过大列表点击场景理解 React DOM 的事件委托高层模型，同时学习什么时候业务层自己的 delegation 仍然有价值。

### Lesson RE-EVENT-009：Keyboard Event 如何设计可用交互

覆盖 key/code、Enter、Escape、Arrow、Modifier，结合按钮/菜单/快捷键场景讨论重复按键、输入焦点和 A11Y 边界。

### Lesson RE-EVENT-010：Mouse、Pointer、Touch 应该怎么选

比较 MouseEvent、PointerEvent、Touch 兼容模型，理解 Pointer Capture、pressure、pointerId，并避免为桌面和触屏维护两套交互逻辑。

### Lesson RE-EVENT-011：Input、Change、BeforeInput 到底有什么差异

通过文本输入、删除、粘贴实验观察浏览器输入事件和 React `onChange` 的行为，为 Form Module 建立正确前置知识。

### Lesson RE-EVENT-012：中文输入法为什么会让“实时搜索”出 Bug

使用 CompositionStart / CompositionUpdate / CompositionEnd 复现中文/日文 IME 场景，理解不能把每一次 input 都当成最终用户输入。

### Lesson RE-EVENT-013：事件处理器里的异步代码会遇到什么状态问题

在事件处理器中加入 Promise / setTimeout，先观察事件参数、闭包和未来 State 的关系，为 Render Snapshot / Stale State Module 建立前置问题。

### Lesson RE-EVENT-014：React Event Priority 先建立什么心智模型

通过点击、输入与 Transition 的高层比较认识离散/连续事件的优先级概念，只建立“不同交互更新紧急程度不同”的模型，源码细节留到 Lane / Scheduler Module。

### Lesson RE-EVENT-015：TypeScript 如何正确标注 React Event

系统练习 MouseEvent、KeyboardEvent、ChangeEvent、FormEvent、PointerEvent，以及从 handler 参数推导类型，避免到处写 `any`。

### Lesson RE-EVENT-016：事件 API 设计——组件到底应该暴露 onClick 还是业务动作

从 Button、Dialog、ProductCard 等案例比较 DOM-oriented API 与 domain-oriented callback，学习组件公共 API 的语义边界。

### Lesson RE-EVENT-017：事件故障综合——重复触发、冒泡冲突、默认行为与 IME

组合制造四类常见事件 Bug，用 DevTools、日志和最小复现逐个解释根因并修复。

### Lesson RE-EVENT-018：综合实现——给 Product Catalog 加入第一批真实交互

在不使用 State Manager、Router、Query、Effect 的前提下，为当前项目加入可由 Props/Callback 驱动的操作和键盘交互，为下一 Module 的 State 做自然过渡。

---

# Module 11.10：State 与 useState 一次学透

本 Module 负责建立 React State 的基本存储与更新模型：为什么普通变量不够、State 属于谁、`useState` 返回什么、Setter 为什么不是赋值、初始化与重置如何工作。复杂队列/Batching 在下一 Module，Object/Array 不可变更新在 11.12 深入。

### Lesson RE-STATE-001：普通局部变量为什么不能驱动 React UI

先做一个普通 `let count` Counter，观察变量确实变化但 UI 不更新；再解释 Render、局部变量生命周期和“触发下一次 Render”是三个不同问题。

### Lesson RE-STATE-002：第一个 useState

从 `[count, setCount] = useState(0)` 开始，逐个解释 Hook 调用、当前 State 值、Setter 和初始值，而不是把数组解构当成模板代码。

### Lesson RE-STATE-003：State 到底存在哪里

通过 Component Function 每次重新执行但 State 仍保留的现象，建立“State 不存在局部变量里，而由 React 按组件身份管理”的核心模型。

### Lesson RE-STATE-004：Setter 为什么不是普通赋值语句

比较 `count = 1` 与 `setCount(1)`，理解 Setter 的职责是请求 React 安排一次更新，而不是修改当前 Render 中的变量。

### Lesson RE-STATE-005：一次 State Update 如何触发下一次 Render

用 Console、React DevTools 观察事件 → Setter → 下一次 Component Function 执行 → 新 UI 的过程，先建立不涉及源码的完整行为链。

### Lesson RE-STATE-006：Initial State 为什么只在初始化时生效

修改 Props / 变量后再次经过 `useState(initialValue)`，观察初始值不会每次覆盖已有 State，理解 mount 与 update 的差异。

### Lesson RE-STATE-007：Lazy Initialization 解决什么问题

把昂贵初始化函数分别写成 `useState(expensive())` 和 `useState(expensive)`，通过调用次数证明 Lazy Init 的真实价值。

### Lesson RE-STATE-008：Same-value Update 为什么可能不产生可见更新

使用重复 `setCount(count)` / `setCount(0)`，理解 React 对相同 State 的处理以及 `Object.is` 在状态比较中的意义。

### Lesson RE-STATE-009：一个组件里可以有多少份 State

比较一个对象 State 与多个独立 State，讨论状态关联性、更新频率和可维护性，但把复杂 State Shape 决策留到 State Modeling Module。

### Lesson RE-STATE-010：State 是私有的吗

渲染两个相同 Counter，观察它们拥有独立 State；再由父组件保存共享值，建立 Local State 与 Shared State 的第一层直觉。

### Lesson RE-STATE-011：Props 改变为什么不会自动重新初始化 State

复现“从 Props 初始化 State 后 Props 更新但 State 不跟着变”的常见 Bug，引出 Derived / Duplicate State 问题，完整处理留到 11.14。

### Lesson RE-STATE-012：State Hook 的调用顺序为什么必须稳定

通过条件调用 `useState` 制造 Hook Rule 错误，先从行为层解释 React 依赖调用顺序识别 Hook State，源码细节留到 Hooks Internals。

### Lesson RE-STATE-013：什么时候应该用 State，什么时候普通变量或 Ref 更合适

用 UI 可见数据、临时计算、跨 Render 非 UI 数据三个场景建立第一版选择规则，Ref 在后续 Module 完整学习。

### Lesson RE-STATE-014：综合实现——可编辑数量与选择状态

把上一 Module 的交互升级为真正可保存的 UI State，实现选择、数量和开关，并明确每一份 State 为什么存在。

---

# Module 11.11：Render Snapshot、Update Queue 与 Batching

本 Module 解释 React State 最核心的时间模型：每次 Render 都看到自己的 Snapshot，Setter 把 Update 放入 Queue，React 再按规则处理队列和 Batching。完成后必须能解释“为什么代码按这个顺序写，结果却不是普通变量直觉”。

### Lesson RE-SNAPSHOT-001：什么叫一次 Render 的 State Snapshot

在事件处理器和 JSX 中同时打印 State，观察一次 Render 内读取到的是固定值，建立 Snapshot 概念。

### Lesson RE-SNAPSHOT-002：为什么 setState 后马上 console.log 还是旧值

通过最小实验解释 Setter 安排未来 Render，而当前函数闭包仍然属于当前 Snapshot。

### Lesson RE-SNAPSHOT-003：事件处理器为什么“记住”它创建时的 State

保存旧 Render 的 handler 并延迟调用，观察 Closure 与 Render Snapshot 的组合行为。

### Lesson RE-SNAPSHOT-004：连续三次 setCount(count + 1) 为什么不是 +3

逐次记录三个 Update 的输入值，解释它们都基于同一 Snapshot 计算 replacement value。

### Lesson RE-SNAPSHOT-005：Functional Updater 为什么能解决连续累加

使用 `setCount(c => c + 1)`，把 Updater 看作“等待 React 处理的计算步骤”，而不是特殊语法。

### Lesson RE-SNAPSHOT-006：Replace Update 与 Updater Function 可以混在一起吗

组合 `setNumber(number + 5)`、`setNumber(n => n + 1)` 等实验，手工推演最终结果。

### Lesson RE-SNAPSHOT-007：Update Queue 到底保存了什么

在不进入 React 源码的前提下建立 Queue 项、replacement/updater、处理顺序和 next state 的行为模型。

### Lesson RE-SNAPSHOT-008：Batching 是什么，为什么 React 要批量处理更新

在一次 Click Handler 中触发多个 Setter，观察 Render 次数与最终值，理解批处理对一致性和性能的意义。

### Lesson RE-SNAPSHOT-009：React 18+ 的 Automatic Batching 扩展到了哪些异步边界

比较事件、Promise、setTimeout 等场景，观察现代 React 自动批处理行为，并认识与旧版本 React 的历史差异。

### Lesson RE-SNAPSHOT-010：什么时候会需要 flushSync，为什么它应该很少用

只建立紧急 DOM 同步场景和性能代价的概念，完整 `flushSync` 边界在 React DOM Integration Module 再深入。

### Lesson RE-SNAPSHOT-011：Async Callback 为什么容易读到旧 Snapshot

使用 Timer / Promise 复现“延迟逻辑读取旧 State”，区分逻辑真正需要旧值还是最新值。

### Lesson RE-SNAPSHOT-012：Stale State 与 Stale Closure 是同一个问题吗

比较“计算 next state 用旧值”和“异步闭包捕获旧 Render”两个问题，为 Effect 中 Stale Closure 做准确术语准备。

### Lesson RE-SNAPSHOT-013：跨多个 State 的更新如何保持业务一致性

用订单数量 + 总价的错误示例讨论独立 Setter、派生值和 Reducer 前置，不提前教授 Reducer API。

### Lesson RE-SNAPSHOT-014：使用测试验证 Update Queue 与 Batching 行为

把几个“看起来反直觉”的 State 更新写成可重复测试，让理论结论由运行证据固定下来。

### Lesson RE-SNAPSHOT-015：从行为模型连接到未来的 Fiber Update Queue

画出 `setState → Update → Queue → Render` 的高层图，只标记未来源码 Module 将继续验证的位置。

### Lesson RE-SNAPSHOT-016：综合推演——十组 State Update 最终结果

给出 replacement、functional updater、async callback、multiple state 的混合案例，要求先手工预测再运行验证，真正形成 Snapshot/Queue 心智模型。

---

# Module 11.12：Object / Array State 与不可变更新

本 Module 解决复杂 State 的引用、Mutation 与结构更新问题。完成后不仅会 spread，还要理解为什么 React、Memoization、Concurrent Render 和未来 Compiler 都依赖可预测的不可变更新习惯。

### Lesson RE-IMMUTABLE-001：Primitive State 与 Reference State 有什么本质差异

比较 Number/String 与 Object/Array 的值和引用，理解 React State 中存的是引用值这一事实。

### Lesson RE-IMMUTABLE-002：直接修改对象以后为什么 UI 可能不更新

复现 `state.user.name = ...; setState(state)`，观察引用未变化带来的问题，并联系 Same-value Update。

### Lesson RE-IMMUTABLE-003：Shallow Copy 到底复制了什么

用展开运算符复制对象并比较 nested reference，理解 shallow copy 不等于 deep clone。

### Lesson RE-IMMUTABLE-004：正确更新一层 Object State

实践 property replace、multiple fields、dynamic key，并保持旧对象不变。

### Lesson RE-IMMUTABLE-005：Nested Object State 应该怎么更新

手工逐层 copy，观察代码复杂度并为 State Shape / Normalization 做铺垫。

### Lesson RE-IMMUTABLE-006：Array append / prepend / remove / replace 的不可变写法

使用 spread、filter、map 等已有 JavaScript 能力完成常见更新。

### Lesson RE-IMMUTABLE-007：Array sort / reverse 为什么特别容易误改 State

复现原地 sort/reverse 造成的 Mutation，并使用 copy-before-mutate 修复。

### Lesson RE-IMMUTABLE-008：数组中的对象怎么更新

处理 `Array<Object>` 中单条记录修改、删除、批量标记，避免同时修改数组和内部对象。

### Lesson RE-IMMUTABLE-009：为什么“深拷贝一切”不是正确答案

比较 deep clone 的性能、Prototype/Date/Map 丢失风险和无意义 identity 变化，理解只复制改变路径的原则。

### Lesson RE-IMMUTABLE-010：Immer 的 Draft 为什么看起来可以直接修改

引入 Immer 类方案，理解 Proxy/Draft/Structural Sharing 高层模型以及它解决的是可读性而不是取消不可变约束。

### Lesson RE-IMMUTABLE-011：什么时候值得使用 Immer，什么时候普通更新更清晰

用简单表单和深层编辑器两个案例比较依赖成本、Debug、Bundle、团队认知和代码复杂度。

### Lesson RE-IMMUTABLE-012：Structural Sharing 与 Render Performance 有什么关系

建立 unchanged reference / changed reference 对 Memoization、Selector、Context 的前置意义。

### Lesson RE-IMMUTABLE-013：Mutation Bug 为什么在复杂 React 中更难排查

用共享引用导致“修改 A 却影响 B”的案例，结合 Object Freeze / DevTools / Test 定位。

### Lesson RE-IMMUTABLE-014：State Shape 不合理会让不可变更新变得多痛苦

观察深层嵌套数据更新，提出 flatten / normalize 的问题，但完整 State Modeling 留到 11.14。

### Lesson RE-IMMUTABLE-015：综合实现——可编辑订单行的不可变更新

在订单数据中完成增删改、批量标记、排序与撤销前置数据结构，所有修改都通过运行测试验证原对象没有被污染。

---

# Module 11.13：Component Identity 与 State Preservation

本 Module 完整回答“React 为什么有时保留 State、有时重置 State”。这是 Key、条件渲染、Tabs、Form Reset、Activity、Reconciliation 甚至 Bug 定位的关键基础。

### Lesson RE-IDENTITY-001：State 为什么必须绑定到某个组件身份

从两个 Counter 独立 State 重新解释 React 如何把 State 与 Tree 中的位置关联。

### Lesson RE-IDENTITY-002：相同位置 + 相同 Component Type 会发生什么

切换 Props 但保持 Tree Position / Type，观察 State 被保留。

### Lesson RE-IDENTITY-003：相同位置换成不同 Component Type 会发生什么

在 Counter 与 Paragraph / Different Component 间切换，观察 State 被销毁并重建。

### Lesson RE-IDENTITY-004：JSX 代码位置和 Tree Position 是一回事吗

用条件分支看起来写了两份 JSX、实际仍落在同一 Tree Position 的例子纠正常见误解。

### Lesson RE-IDENTITY-005：Key 如何主动改变组件身份

在非列表场景用 Key 重置 Chat / Profile / Form，理解 Key 是 identity hint 而不只是列表属性。

### Lesson RE-IDENTITY-006：为什么把 Component Definition 写在另一个 Component 内部会重置 State

连接 Module 11.06 的 Nested Definition，从 Component Type 每次变新的角度完整解释。

### Lesson RE-IDENTITY-007：表单什么时候应该保留，什么时候应该重置

用编辑不同用户资料的场景比较 preserve state、key reset、手工清空 state 三种策略。

### Lesson RE-IDENTITY-008：Tabs 切换为什么默认可能丢失隐藏页面 State

比较 conditional unmount、CSS hide、保留组件树三种策略，为 Activity 做前置。

### Lesson RE-IDENTITY-009：Modal / Drawer 关闭后 State 应不应该消失

从业务语义而不是技术偏好决定 unmount / preserve，并讨论 Draft、Privacy、Memory 取舍。

### Lesson RE-IDENTITY-010：State Preservation 与 DOM Preservation 是一回事吗

观察组件 State、Fiber 身份和真实 DOM 节点复用可能不完全等价，建立更准确的分层模型。

### Lesson RE-IDENTITY-011：如何用 React DevTools 判断组件到底被更新还是重新挂载

通过 Profiler / mount log / Effect 前置观察区分 update 与 remount，形成实际 Debug 手段。

### Lesson RE-IDENTITY-012：Identity Bug 综合——错误 Key、Nested Component、条件树

一次复现三种导致意外重置/串 State 的问题，并根据 Type + Position + Key 模型定位。

### Lesson RE-IDENTITY-013：从 Identity 高层模型连接到 Reconciler

画出 Element Type / Key → Child Reconciliation → Fiber reuse/reset 的连接图，源码验证留到 Reconciler Module。

---

# Module 11.14：State Modeling 与 Ownership

本 Module 从“会维护 State”升级到“会设计 State”。目标是让学习者能决定哪些数据应该是 State、State 应该放在哪里、哪些 State 应被删除，以及 Client / URL / Server / Persistent State 各自的职责。

### Lesson RE-MODELING-001：什么数据才有资格成为 State

建立 State 的最小判定：是否随时间变化、是否影响 Render、能否由现有输入计算得到。

### Lesson RE-MODELING-002：Derived State 为什么通常不应该再存一份

用 items + total、firstName + fullName 等案例制造同步 Bug，改为 Render 期间计算。

### Lesson RE-MODELING-003：Duplicate State 为什么最终一定会产生冲突

把同一实体同时存在多个 State 中，制造更新不一致并学习 Single Source of Truth。

### Lesson RE-MODELING-004：Redundant State 与 Cache 有什么区别

区分“为了方便重复保存”和“有明确成本模型的 memo/cache”，避免用性能借口破坏数据一致性。

### Lesson RE-MODELING-005：Impossible State 是怎么被设计出来的

用 `isLoading/isSuccess/isError` 多 boolean 产生非法组合，引出 Discriminated Union / State Machine 的建模方式。

### Lesson RE-MODELING-006：State Shape 应该按 UI 结构还是业务关系设计

比较 deeply nested UI-shaped state 与 domain-shaped state，讨论更新、复用和测试成本。

### Lesson RE-MODELING-007：什么时候应该 Normalize State

处理实体被多个位置引用、列表和详情共享对象的场景，理解 id map / order list 等结构。

### Lesson RE-MODELING-008：State Ownership 到底是什么意思

通过两个 sibling 需要同一数据的场景，找出最近共同 Owner，而不是机械“状态提升到 App”。

### Lesson RE-MODELING-009：Lifting State Up 的代价是什么

观察状态提升后 Props 传递和 Render 范围扩大，理解“共享”与“全局化”不是一回事。

### Lesson RE-MODELING-010：Controlled 与 Uncontrolled State 应该怎么选

从 Input、Accordion、Dialog 等组件比较内部 ownership 和外部 ownership，建立可复用组件设计模式。

### Lesson RE-MODELING-011：Local State、Shared State、Global State 不是三个库

用生命周期和消费范围定义三者，而不是根据“组件层级深”直接选 Redux/Zustand。

### Lesson RE-MODELING-012：URL State 为什么不能随便复制到 useState

用 search/filter/page 参数展示 Refresh、Deep Link、Back/Forward 的需求，建立 URL 作为状态所有者的概念。

### Lesson RE-MODELING-013：Server State 为什么不是普通 Global State

只建立远程所有权、缓存、Stale、Refetch 的概念，完整 Query 模型留到 11.29。

### Lesson RE-MODELING-014：Persistent State 为什么有独立生命周期

比较 React State 与 LocalStorage/IndexedDB 数据，理解初始化、同步、版本和多标签问题。

### Lesson RE-MODELING-015：Transient UI State 应该离业务数据多远

讨论 hover、open、selection、draft、server entity 的不同生命周期，减少“大一统 Store”。

### Lesson RE-MODELING-016：State Colocation 为什么通常是默认好策略

通过把 State 从顶层移回真正消费位置，观察 Props、Render 和模块边界的改善。

### Lesson RE-MODELING-017：State Modeling Code Review——删掉一半 State

给出一个故意过度状态化的业务页面，逐项判断 derived / duplicate / URL / server / local 并重构。

### Lesson RE-MODELING-018：输出一张真实应用 State Ownership Map

对后续 Order Editor 标注每份 State 的 Owner、生命周期、来源和消费者，为复杂表单项目做设计准备。

---

# Module 11.15：React Form 完整体系

本 Module 不把表单简化成 `value + onChange`。从原生 Form 行为、Controlled/Uncontrolled 一路覆盖多控件、IME、Validation、异步校验、动态字段、Draft、Autosave、性能、A11Y，并将 Order Editor 综合项目直接拆成连续 Lesson。

### Lesson RE-FORM-001：先理解浏览器原生 Form，再谈 React Form

回顾 form、name、submit、FormData、默认提交和浏览器 Validation，明确 React 没有发明表单本身。

### Lesson RE-FORM-002：Controlled Input 的最小模型

从 `value + onChange + State` 建立 React 控制输入值的闭环，并观察忘记 onChange / value 为 undefined 等典型问题。

### Lesson RE-FORM-003：Uncontrolled Input 到底是什么

使用 `defaultValue`、DOM 自己保存当前值和提交时读取，比较它与 Controlled 的状态所有权差异。

### Lesson RE-FORM-004：Controlled 与 Uncontrolled 应该怎么选

从即时联动、复杂 Validation、超大表单、第三方组件和原生能力比较两种策略，不做教条结论。

### Lesson RE-FORM-005：Input、Textarea、Select 的 React 行为差异

系统实现文本、多行、单选 select、多选 select，并理解 value 类型和选项同步。

### Lesson RE-FORM-006：Checkbox 与 Radio 为什么不能照搬 text input

学习 checked/value、group semantics、boolean vs selected value，以及受控状态设计。

### Lesson RE-FORM-007：File Input 为什么天然更偏 Uncontrolled

理解浏览器安全限制、FileList、清空方式、Preview URL 生命周期，为上传 Module 前置。

### Lesson RE-FORM-008：一个 onChange Handler 如何管理多个字段

使用 name / computed property 更新对象，同时讨论“所有表单都塞一个大 Object State”何时开始失控。

### Lesson RE-FORM-009：IME / Composition 对 React Form 有什么影响

把 Event Module 的输入法知识真正放进搜索、字符限制、实时校验场景。

### Lesson RE-FORM-010：同步 Validation 应该在什么时候发生

比较 onChange、onBlur、onSubmit、Render-derived validation，避免每个规则都写 Effect。

### Lesson RE-FORM-011：Touched、Dirty、Visited、Submitted 分别是什么

建立表单 UX 状态模型，解释这些状态为什么不能和字段值混为一个概念。

### Lesson RE-FORM-012：异步 Validation 如何避免 Race Condition

模拟 username availability 请求，加入请求序号/取消前置，完整 Abort/Effect 方案在后续 Effect Module 再深入。

### Lesson RE-FORM-013：Server Error 应该如何映射回字段和表单

设计 field error、form error、global error，并处理服务器返回错误后用户继续编辑的生命周期。

### Lesson RE-FORM-014：Dynamic Field 与 Field Array 如何建模

实现可增删订单行，正确处理 Stable Key、字段 State 和 Validation。

### Lesson RE-FORM-015：Draft 与 Reset 的语义怎么设计

区分初始值、已保存值、当前编辑值、Reset、Cancel、Switch Entity，连接 Component Identity / Key Reset。

### Lesson RE-FORM-016：Autosave 为什么不是简单 setInterval

先从 dirty detection、debounce、pending、last saved、failure、conflict 的状态模型分析需求，避免过早引入 Effect。

### Lesson RE-FORM-017：大型 Controlled Form 为什么可能变慢

用数十/数百字段观察 Render 范围、State Colocation、Component Split，性能工具完整使用留到 Performance Module。

### Lesson RE-FORM-018：Form A11Y 的 React-specific 连接点

覆盖 label/id、aria-describedby、error announcement、focus invalid field、dynamic errors 和 `useId` 前置。

### Lesson RE-FORM-019：TypeScript 如何描述复杂 Form State

使用 discriminated union、field model、error type 和 domain value，避免 stringly-typed form。

### Lesson RE-FORM-020：什么时候值得引入 React Hook Form 等表单库

从注册模型、uncontrolled strategy、validation ecosystem、bundle、team complexity 讨论选型；这里只建立边界，不把第三方库变成课程主线。

### Lesson RE-FORM-021：综合项目——Order Editor 需求、数据模型和知识边界

设计订单头、订单行、价格、数量、校验、Dirty/Reset 等需求，列出当前允许使用的 React 能力和明确禁止的未来 Router/Query/Effect 技术。

### Lesson RE-FORM-022：综合项目——设计 Order Editor 的 Component Tree 与 State Ownership

把 State Modeling Map 落到 OrderEditor、OrderHeader、LineList、LineEditor、Summary 等组件，明确每份状态放置位置。

### Lesson RE-FORM-023：综合项目——实现订单行增删改与金额派生

综合 Event、State、Immutable Update、List/Key、Derived State，禁止存冗余 total。

### Lesson RE-FORM-024：综合项目——实现 Validation、Dirty、Reset 与错误展示

完成字段/表单级校验和完整 UX 状态，不引入未来表单库隐藏机制。

### Lesson RE-FORM-025：综合项目——主动制造 Form State Bug

制造 duplicate state、wrong key、props-to-state sync、mutation 等问题，用当前已学模型逐个定位。

### Lesson RE-FORM-026：综合项目——大型表单 Render 重构

使用 State Colocation、Component Boundary 和数据建模降低无意义 Render，并记录 before/after 行为。

### Lesson RE-FORM-027：综合项目——从空目录复刻 Order Editor

不查看最终源码重新搭建核心功能，证明不是只会在上一课 Diff 上继续修改。

### Lesson RE-FORM-028：综合项目——Order Editor 完整验收

运行测试、键盘操作、IME、Validation、生产构建，输出 Component Tree、State Ownership Map 和已知限制。

---

# Module 11.16：useReducer 与复杂状态

本 Module 从“多个 Setter 难以表达一次业务变化”出发，完整学习 Reducer、Action、Dispatch、Initializer、测试、Undo/Redo 和 State Machine 前置。重点是业务状态转换，而不是把 useReducer 当 Redux 的简化版。

### Lesson RE-REDUCER-001：什么时候多个 useState 开始不够表达问题

用复杂订单编辑状态观察“一个用户动作触发多处 Setter”的维护问题，引出把状态转换集中表达的需要。

### Lesson RE-REDUCER-002：Reducer 的最小模型

实现 `(state, action) => nextState`，先脱离 React 写纯函数，再接入 `useReducer`。

### Lesson RE-REDUCER-003：Action 应该描述“怎么改”还是“发生了什么”

比较 `SET_FIELD`、`INCREMENT` 与 `ITEM_ADDED/ORDER_SUBMITTED` 的语义，建立 Action Modeling。

### Lesson RE-REDUCER-004：Dispatch 到底做了什么

从 event handler dispatch action 到 React 调用 reducer 产生 next state，建立完整行为链。

### Lesson RE-REDUCER-005：Reducer 为什么必须是 Pure Function

主动在 reducer 中请求网络、读时间或修改外部对象，观察可测试性和 StrictMode 问题。

### Lesson RE-REDUCER-006：Initializer 什么时候比直接 initialState 更好

学习第三参数初始化、Props 输入和昂贵初始化，并比较重置状态策略。

### Lesson RE-REDUCER-007：复杂 Reducer 如何避免一个巨大 switch

讨论 action grouping、domain function、sub-reducer、state machine，而不是机械拆文件。

### Lesson RE-REDUCER-008：Reducer 与 Immutable Update 如何结合

处理 nested order state，并比较手工 structural sharing 与 Immer reducer。

### Lesson RE-REDUCER-009：Reducer Test 为什么特别有价值

不渲染 React，直接对 action sequence 测试 state transition，建立业务规则可验证性。

### Lesson RE-REDUCER-010：Undo / Redo 的本质是什么

通过 past/present/future 或 command history 实现可撤销编辑，理解历史 State 与普通业务 State 的区别。

### Lesson RE-REDUCER-011：Reducer 如何表达 Impossible State

把多个 boolean 重构为 discriminated state/action，使非法状态更难产生。

### Lesson RE-REDUCER-012：Reducer 与 State Machine 有什么关系

比较 reducer 的任意 transition 与显式 state/event transition table，为后续复杂流程架构建立前置。

### Lesson RE-REDUCER-013：什么时候不应该使用 useReducer

比较简单 toggle、独立 fields、Server State 和 URL State，避免“复杂项目一律 reducer”。

### Lesson RE-REDUCER-014：把 Order Editor 的核心编辑逻辑重构为 Reducer

保留 UI 行为不变，把多处业务 Setter 收敛为可测试 Action / Reducer，并用测试证明行为一致。

### Lesson RE-REDUCER-015：Reducer Source Connection——Dispatch/Queue 先看到哪里

只建立 `dispatch → update queue → next render` 的源码入口地图，完整 Hooks Internals 后续验证。

---

# Module 11.17：Context 一次学透

本 Module 解决跨层级依赖传递，但必须同时讲清 Context 的更新传播、Value Identity、性能和滥用边界。目标不是“不会传 Props 就上 Context”。

### Lesson RE-CONTEXT-001：Prop Drilling 什么时候真的成为问题

从多层组件传递 theme/current user/order actions 的例子判断哪些只是正常显式依赖，哪些适合 Context。

### Lesson RE-CONTEXT-002：第一个 createContext / Provider / useContext

建立 Provider 提供值、后代消费最近值的最小模型。

### Lesson RE-CONTEXT-003：Default Value 到底什么时候会生效

移除 Provider、传 undefined/null，观察 default value 行为，避免把它误认为运行时 fallback。

### Lesson RE-CONTEXT-004：Nested Provider 为什么是作用域而不是全局变量

使用嵌套 Theme / Locale Provider 观察最近 Provider 覆盖，建立 scope 模型。

### Lesson RE-CONTEXT-005：Context Value 更新时哪些 Consumer 会重新 Render

通过多个 consumer 记录 Render，理解 Context update propagation 的高层行为。

### Lesson RE-CONTEXT-006：Value Identity 为什么会造成无意义传播

把 Provider value 写成每次新对象，观察 Consumer Render，为 Memoization/Context Split 建立前置。

### Lesson RE-CONTEXT-007：把 State 与 Dispatch 放在一个 Context 还是拆开

比较单 Context 与 State/Dispatch 分离，分析读取频率、API 和 Render 范围。

### Lesson RE-CONTEXT-008：Context + Reducer 如何形成局部业务 Store

把 Order Reducer 放入 Context，让深层组件消费 state/dispatch，同时保持明确 Provider Boundary。

### Lesson RE-CONTEXT-009：Context 适合 Dependency Injection 吗

用 API client、feature flag、runtime config 等稳定依赖讨论 Context 作为 dependency boundary 的价值。

### Lesson RE-CONTEXT-010：Context 为什么不是完整 State Manager

讨论 selector、middleware、devtools、persistence、server state 等需求，认识 Context 的能力边界。

### Lesson RE-CONTEXT-011：Context Selector / External Store 为什么会出现

从“大 Context 任意字段变化导致所有 consumer 受影响”的问题，引出 selector/store 方案，但不提前深入第三方库。

### Lesson RE-CONTEXT-012：Provider 放太高会带来什么架构问题

观察全 App Provider Stack、隐式依赖、测试困难，学习将 Provider 收敛到 Feature/Route Boundary。

### Lesson RE-CONTEXT-013：如何测试依赖 Context 的组件

建立 wrapper/provider、default dependency 和 test helper 的最小方式，不展开完整 Testing Stage。

### Lesson RE-CONTEXT-014：Context 故障综合——缺 Provider、Value 抖动、巨大 Context

主动制造三类实际问题并用 DevTools / Render Log 诊断。

### Lesson RE-CONTEXT-015：把 Multi-step Order Workflow 的共享依赖迁入 Context

只迁移真正跨层级共享的 workflow state/dispatch/config，保留应当局部化的 UI State。

---

# Module 11.18：React State Architecture

本 Module 是前面 State / Modeling / Reducer / Context 的第一次架构收束。它不把 Redux Toolkit、Zustand、Jotai 教成 API 大全，而是通过同一组真实问题比较 State Ownership、生命周期、订阅粒度、DevTools、Persistence、Server State 和 URL State，形成技术选型能力，并完成 Multi-step Order Workflow 综合项目。

### Lesson RE-STATEARCH-001：先建立 React 应用中的 State Taxonomy

把真实应用状态分类为 Local UI、Shared Client、URL、Server、Persistent、External Mutable、Workflow State，明确分类依据是 ownership/lifecycle 而不是“全局/局部”两个词。

### Lesson RE-STATEARCH-002：useState 适合解决哪一类 State

总结 colocation、简单生命周期、组件私有状态的优势和边界。

### Lesson RE-STATEARCH-003：useReducer 适合解决哪一类 State

总结 complex transition、action log、testability、workflow 的优势与成本。

### Lesson RE-STATEARCH-004：Context 适合解决哪一类依赖

区分 value distribution 与 state management，明确 Provider Scope 和更新传播成本。

### Lesson RE-STATEARCH-005：URL State 为什么应该交给 Router / URL

用 filter/sort/page/tab 案例验证 refresh、share、back/forward 和 deep link，不再复制一份 React State。

### Lesson RE-STATEARCH-006：Server State 为什么应该交给 Query Cache

从 remote ownership、stale、dedup、retry、invalidation 解释为什么 Redux/Context 直接存 API response 常常是在重造缓存；具体 TanStack Query 后续再学。

### Lesson RE-STATEARCH-007：External Mutable Store 解决什么 React 自身没有解决的问题

从 subscribe/getSnapshot、fine-grained subscription、React 外部读写认识 external store，并连接未来 `useSyncExternalStore`。

### Lesson RE-STATEARCH-008：Redux Toolkit 的核心价值到底是什么

从 predictable reducer、selector、middleware、devtools、large-team convention、RTK Query 边界做架构级认识，不陷入老 Redux boilerplate。

### Lesson RE-STATEARCH-009：Zustand 的核心取舍是什么

从 external store、selector、low ceremony、imperative access、middleware/persist 分析适用与滥用场景。

### Lesson RE-STATEARCH-010：Jotai / Atomic State 的核心取舍是什么

从 atom dependency graph、derived atom、fine-grained subscription 比较 centralized store 思路。

### Lesson RE-STATEARCH-011：State Machine / XState 类方案什么时候值得引入

从 explicit state/event/guard/effect model 讨论复杂流程、支付/审批/长流程与普通 reducer 的边界。

### Lesson RE-STATEARCH-012：一个应用可以同时使用多种 State 方案吗

设计 Local State + URL + Query Cache + Feature Store + Workflow Machine 的合理组合，反对“一库统治所有状态”。

### Lesson RE-STATEARCH-013：如何避免 Global Store 变成业务垃圾桶

学习 ownership、feature boundary、public API、selector、write authority 和 state lifecycle review。

### Lesson RE-STATEARCH-014：状态架构如何影响 Render Performance

比较 context broadcast、selector subscription、atom dependency、local state，建立性能模型但把实测留到 Performance Module。

### Lesson RE-STATEARCH-015：状态持久化要解决哪些额外问题

讨论 storage version、migration、rehydration、partial persistence、sensitive data、multi-tab，而不是简单 `persist: true`。

### Lesson RE-STATEARCH-016：状态调试与可观测应该记录什么

比较 action log、state snapshot、query devtools、URL、trace correlation，建立生产诊断意识。

### Lesson RE-STATEARCH-017：状态方案选型矩阵怎么做

用规模、数据来源、生命周期、更新频率、团队、调试、SSR、并发兼容、迁移成本形成实际 Trade-off 表。

### Lesson RE-STATEARCH-018：综合项目——Multi-step Order Workflow 需求与 State 分类

增加步骤导航、草稿、权限、Undo/Redo、提交状态等需求，先把每份数据分类再决定存放方案。

### Lesson RE-STATEARCH-019：综合项目——设计 Workflow State Machine / Reducer

明确 step、event、guard、transition 和 impossible state，保持业务转换可测试。

### Lesson RE-STATEARCH-020：综合项目——划分 Local State、Context、URL 与未来 Server State 边界

只使用目前已经学过的能力实现可实现部分，同时给未来 Router/Query Module 留明确接口而不偷用它们。

### Lesson RE-STATEARCH-021：综合项目——实现多步骤导航、草稿与 Undo/Redo

完成主要交互并验证切换、回退和当前数据生命周期边界。

### Lesson RE-STATEARCH-022：综合项目——制造状态架构反模式再重构

故意做巨大 Context、duplicate derived state、过度 lifting、single giant reducer，再依据 taxonomy 重构。

### Lesson RE-STATEARCH-023：综合项目——比较两种 State Architecture

为同一核心场景实现“Context + Reducer”和一种 External Store PoC，比较代码、订阅、Debug 和迁移成本；第三方库仅用于架构对照，不替代后续正式 Module。

### Lesson RE-STATEARCH-024：综合项目——输出 State Architecture ADR

记录问题、候选方案、Decision、Trade-off、Rejected Alternatives、Migration Boundary 和未来 Router/Query 接入位置。

### Lesson RE-STATEARCH-025：综合项目——完整验收 Multi-step Order Workflow

从用户流程、State Ownership、Impossible State、Render 行为、可测试性和生产构建六个维度验收，要求能解释每份 State 为什么在那里。

---

# Module 11.19：Ref 一次学透

学习 useRef、ref.current、State vs Ref、DOM Ref、Callback Ref、Timer、Previous Value、Focus、Measurement、Scroll、Selection、Third-party Widget 和 Ref Lifecycle。

---

# Module 11.20：Imperative API 与 useImperativeHandle

学习 Imperative Escape Hatch、Ref Exposure、Minimal Imperative API、Modal、Editor、Video、Canvas、Chart、Map，以及什么情况下不应该暴露 Imperative API。

---

# Module 11.21：useEffect 一次学透

完整学习 Effect 为什么存在、External Synchronization、setup/cleanup、dependency、Object.is、StrictMode、Subscription、Timer、WebSocket、Third-party Library、Network Request、AbortController、Stale Closure、Race、Infinite Effect、Object/Function Dependency、Unmount、Passive Effect、Render/Commit 与 Fiber Effect 模型。

---

# Module 11.22：Removing Effects

学习 Derived State、Calculate During Render、Event Logic、Reset with Key、External Store、Query Cache、State Machine 和 Effect Anti-pattern，形成“看到 Effect 先问能否删除”的判断习惯。

---

# Module 11.23：useEffectEvent

学习 Reactive Logic、Non-reactive Logic、Latest Props/State、Effect 内事件、Timer、Connection、Listener、Dependency Semantics，以及为什么不能用它逃避合法依赖。

---

# Module 11.24：useLayoutEffect / useInsertionEffect

学习 Commit Timing、Browser Layout、Paint、DOM Measurement、Visual Flicker、Tooltip、Synchronous Update、CSS-in-JS 和 Performance Cost。

---

# Module 11.25：Custom Hook 一次学透

学习 Logic Reuse、Naming、Hook Composition、State Isolation、Lifecycle、Dependency、Return API、Tuple vs Object、Error、SSR、Testability、useDebugValue、Library Hook 和 Versioning。

---

# Module 11.26：useSyncExternalStore

学习 External Mutable Store、subscribe、getSnapshot、getServerSnapshot、Tearing、Concurrency、SSR、Browser Online State、LocalStorage Store 和第三方状态库契约。

---

# Module 11.27：Router 完整体系

以 React Router 为代表学习 URL、History、Route Tree、Layout、Nested Route、Dynamic Params、Search Params、Navigation、Deep Link、Error Route、Lazy Route、Scroll Restore、Permission Route 和 URL State。

---

# Module 11.28：Data Router 与 Route Architecture

学习 Loader、Action、Pending、Redirect、Error、Revalidation、Route Data、Nested Loading、Mutation、Route-level Code Split 和 Auth Boundary。

---

# Module 11.29：Server State 完整模型

严格区分 Client State 与 Server State，学习 Cache、Stale、GC、Query Key、Dedup、Retry、Refetch、Invalidation、Mutation、Pagination、Infinite Data、Prefetch、Offline 和 Optimistic Update。

---

# Module 11.30：TanStack Query 生产级使用

学习 Query Key Design、staleTime、GC、Query Function、Cancellation、Mutation、Invalidation、Optimistic、Prefetch、SSR、Hydration、Persistence、Offline、DevTools 和 Architecture Boundary。

---

# Module 11.31：API Client 与 React 数据边界

学习 Fetch Abstraction、Abort、Runtime Validation、DTO、Domain Model、Error Model、Trace ID、Authentication、Retry、Pagination、Schema 和 OpenAPI Client。

---

# Module 11.32：React Actions

学习 Action、form action、Async Action、Pending、Validation、Error、Transition Integration 和 Progressive Enhancement。

---

# Module 11.33：useActionState / useFormStatus

学习 Action State、Previous State、Pending、Form Context、Server Error、Queued Action 和 Form UX。

---

# Module 11.34：useOptimistic

学习 Optimistic State、Pending、Commit、Rollback、Server Reject、Concurrent Optimistic Operations、Ordering、Duplicate Submission 和 Idempotency。

---

# Module 11.35：Concurrent Rendering Mental Model

彻底理解 Concurrency ≠ Parallelism、Interruptible Rendering、Restart、Urgent/Non-urgent、Commit Atomicity、Background Rendering、Purity、Scheduler 和 Lane 前置模型。

---

# Module 11.36：Transition

学习 startTransition、useTransition、Pending、Interruption、Actions、Async Transition、Navigation、Ordering、Input Restriction 和 Fallback Control。

---

# Module 11.37：useDeferredValue

学习 Deferred Render、Stale UI、Search、Expensive Tree、Suspense、Transition vs Deferred、Debounce vs Deferred 和 Performance Measurement。

---

# Module 11.38：Suspense 一次学透

学习 Suspend、Boundary、Fallback、Nested Boundary、Reveal、Error、Retry、Lazy、Data、Router、Streaming、Transition、Waterfall 和 Boundary Architecture。

---

# Module 11.39：use()

学习 Promise、Context Resource、Suspense、Rejection、Error Boundary、Conditional use 和 Server-created Promise → Client Consumption。

---

# Module 11.40：Activity

学习 visible/hidden、State Preservation、Effect Lifecycle、Background Priority、Prerender、Tabs、Likely Navigation、Suspense Integration 和 Performance Cost。

---

# Module 11.41：React DevTools Profiler 与 Performance Track

学习 Render、Commit、Flamegraph、Ranked、Render Cause、React Performance Track、Browser Performance、CPU Throttle 和 User Timing。

---

# Module 11.42：React Render Performance

学习 Render Propagation、State Locality、Props Identity、Context Diffusion、Selector、Virtualization、Component Split、Expensive Computation、Long Task 和 INP。

---

# Module 11.43：Memoization

学习 memo、useMemo、useCallback、Equality、Dependency、Wrong Optimization、Memo Cost 和什么时候不该 Memoize。

---

# Module 11.44：React Compiler

学习 Compiler 为什么存在、Automatic Memoization、Rules of React、Build Integration、Compilation Result、Diagnostics、Bailout、`"use memo"`、`"use no memo"`、Incremental Adoption、Library Compilation、Manual Memo Compatibility、Migration 和 Benchmark。

---

# Module 11.45：React DOM Integration

学习 DOM Props、Attribute/Property、HTML/SVG、Controlled Native Element、Custom Element、Browser API Boundary 和 flushSync 的风险与使用边界。

---

# Module 11.46：Portal

学习 React Tree ≠ DOM Tree，覆盖 Modal、Overlay、Tooltip、Context、Event Bubble、Focus、Stacking Context 和 A11Y。

---

# Module 11.47：Resource Loading / Metadata

学习 preconnect、preload、preinit、Module Preload、Stylesheet、Script、Font、Title、Meta 与 SSR/Streaming 的关系。

---

# Module 11.48：React Error Model

学习 Render Error、Event Error、Async Error、Resource Error、Error Boundary、Nested Boundary、Reset、Root Error Callback、Suspense Interaction 和 Production Error UI。

---

# Module 11.49：React-specific Accessibility

聚焦 React 特有的 Focus Management、Portal、Modal、Suspense Loading、Route Navigation、Dynamic Content、Live Region、Virtual List、useId 和 SSR ID Consistency。

---

# Module 11.50：React-specific Security

聚焦 React Escaping、XSS、dangerouslySetInnerHTML、Sanitizer、Markdown、Rich Text、URL Security、SSR Injection、Hydration Payload、RSC Data Leak、Server Function Authorization 和 Client Permission ≠ Authorization。

---

# Module 11.51：React Debugging & Failure Model

把 Wrong Key、Infinite Render、Infinite Effect、Stale Closure、Race、Context Storm、Chunk Load Failure、Hydration Mismatch、Suspense Waterfall、Memory Leak 和 Server Function Failure 分别设计成正常 Lesson，形成完整 React 故障诊断能力。

---

# Module 11.52：React Testing Integration

只学习 React-specific 测试整合：Component Behavior、User-centric Test、Hook Boundary、Context、Router、Query、Suspense、Error Boundary、Async UI 和 Fake Timer；完整质量体系归后续 Testing Stage 统一深化。

---

# Module 11.53：SSR Mental Model

不依赖 Next.js 黑盒，学习 react-dom/server、Server Render、HTML、Node/Web Stream、Shell、Error、Abort、SEO 和 TTFB。

---

# Module 11.54：Hydration 一次学透

学习 Existing HTML、hydrateRoot、DOM Identity、Event Attachment、Client State、Mismatch、Date/Random、Locale、Browser-only API、useId、Recoverable Error 和 Performance Debug。

---

# Module 11.55：Streaming SSR

学习 Suspense Boundary、Shell、Chunk、Reveal、Bootstrap、Backpressure、Abort、Proxy Buffering、Crawler 和 Failure。

---

# Module 11.56：Static Rendering / Prerender / Resume

学习 prerender、Static HTML、Hydration、CDN、Partial Prerender、Postponed State、Resume、Cache 和 Deployment Boundary。

---

# Module 11.57：RSC Mental Model

彻底区分 Client Component、Server Component、SSR、RSC 和 Server Function，理解 Server Component 的运行位置、Bundle/Data Boundary、Build-time 与 Request-time 行为。

---

# Module 11.58：Server / Client Boundary

学习 `"use client"`、Module Graph、Serialization、Props Boundary、Browser API、Context、Event、Bundle 和 Boundary Placement。

---

# Module 11.59：Server Functions

学习 `"use server"`、Client Reference、Server Execution、Arguments、Result、Action、Validation、Authorization、Error 和 Mutation。

---

# Module 11.60：RSC + Suspense + use()

建立 Server → Promise/Data → RSC Stream → Client → use() → Suspense 的完整模型。

---

# Module 11.61：RSC Data / Cache Architecture

学习 DB Access、Service Layer、Cache、Auth、Tenant、Invalidation、N+1、Waterfall、Serialization、Data Leak 和 Observability。

---

# Module 11.62：React 源码研究方法

学习固定 React Version/Commit、Build、Test、Fixture、Minimal Reproduction、Source Map、Breakpoint、Call Stack、Object Snapshot、Hypothesis 和 Verification。

---

# Module 11.63：Fiber 一次学透

学习 Fiber 存在原因、Fiber Node、child/sibling/return/alternate、flags、lanes、memoizedProps、memoizedState、updateQueue、current 和 workInProgress。

---

# Module 11.64：Reconciler

学习 Element → Fiber、beginWork、completeWork、Child Reconciliation、Key、Placement、Delete、Reuse、Bailout 和 Diff。

---

# Module 11.65：Render / Commit Pipeline

深入 Schedule → Render → beginWork → completeWork → Commit，并继续拆 Mutation、Layout、Ref 和 Passive Effect。

---

# Module 11.66：Hooks Internals

学习 Hook Linked List、Dispatcher、Mount/Update、useState、useReducer、Queue、Pending、Base State、Effect、Dependency 和 Rules Enforcement。

---

# Module 11.67：Update Queue

从 setState → Update → Queue → Lane → Render 跑通状态更新源码路径。

---

# Module 11.68：Lane 与 Scheduler

学习 Priority、Lane、Pending、Suspended、Ping、Entangle、Transition Lane、Sync、Interrupt、Starvation 和 Scheduler。

---

# Module 11.69：Suspense / Activity Internals

学习 Suspension、Boundary、Retry、Ping、Fallback、Hidden Tree、Activity 和 Transition 的内部连接关系。

---

# Module 11.70：Server Renderer / Hydration / RSC Internals

专家级学习 Segment、Boundary、Stream、Hydration、Event Replay、RSC Payload、Client/Server Reference 和 Framework/Bundler Integration。

---

# Module 11.71：React Library Authoring

学习 Public API、Entry、Exports、Types、ESM、Peer Dependency、React Singleton、Tree Shaking、SSR、RSC、Compiler、Source Map、Package Testing 和 Versioning。

---

# Module 11.72：React Headless Component Architecture

学习 State、Behavior、DOM、A11Y、Style Separation、Controlled API、Composition、Portal、Focus 和 Adapter；Design System 的组织级治理留到 UI Engineering Stage 深化。

---

# Module 11.73：Large-scale React Application Architecture

学习 Feature、Domain、Layer、Module、Public API、Dependency、DTO、Domain Model、ViewModel、Infrastructure、Route Owner、State Owner、Async Boundary、Error Boundary 和 Architecture Fitness Function。

---

# Module 11.74：React 在 Microfrontend 中的边界

只学习 React-specific 问题：Multiple Roots、Shared React、Singleton、Context Boundary、Router Boundary、React Version Conflict 和 Error Isolation；完整 Microfrontend Architecture 在后续架构 Stage 统一学习。

---

# Module 11.75：Legacy React

必须能够维护 React 15/16/17/18、Class Component、Lifecycle、Legacy Context、HOC、Render Props、Old Redux、Old Router、CRA、Legacy Webpack 和 Enzyme。

---

# Module 11.76：React Migration

学习 Class→Function、Legacy Context→Context、Old Root→createRoot、Old Hydrate→hydrateRoot、Old SSR→Streaming、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Feature Flag、Canary 和 Rollback。

---

# Module 11.77：React Upgrade Governance

学习 Stable/Canary/Experimental、SemVer、Security Advisory、Dependency Compatibility、Compiler Compatibility、Framework Compatibility、Pilot、Upgrade Matrix、Rollback 和 Exception。

---

# Module 11.78：React Architecture Review 与最终综合项目

本 Module 最终把整个 Stage 11 串起来，并把 React Enterprise Platform 拆成正常 Lesson；不再单独创建“项目层级”。

后续拆 Lesson 时至少覆盖：大型 React 系统的 State / Effect / Component API / Context / Router / Server State / Suspense Boundary / Transition / SSR/RSC Boundary / Server Function Authorization / Render / Bundle / Memory / Compiler / Error Isolation / Migration Strategy 评审；以及 React Enterprise Platform 的需求、架构、分阶段实现、故障制造、性能证据、源码 Debug、迁移方案和最终答辩。

最终项目至少综合：React 19.2.x + TypeScript、Complex State、Router、Complex Form、Server State、Actions、Optimistic UI、Suspense、Transition、Deferred Value、Activity、Error Boundary、React-specific A11Y、Profiler、Compiler、SSR、Streaming、Hydration、RSC、Server Functions、React Library、Observability Integration、Security Boundary 和 Legacy/Migration Plan。

---

# 4. Stage 11 阶段验收

完成 Stage 11 后，学习者必须能够：

1. 从空目录建立 React + TypeScript 项目并解释完整启动链路；
2. 不混淆 JSX、React Element、React Node、Component、React Tree、Fiber 和 DOM Node；
3. 解释 State、Snapshot、Update Queue、Batching、Identity 和 Reconciliation；
4. 设计复杂 State / Form / Router / Server State 边界；
5. 判断 Effect 是否真正必要，并复现、定位和修复 Effect 常见故障；
6. 使用 Suspense、Transition、Activity、Actions 和 Optimistic UI 构建高交互应用；
7. 使用 Profiler、Browser Performance、Heap 等证据分析 React 性能；
8. 配置并验证 React Compiler；
9. 不依赖 Next.js 黑盒解释 SSR、Hydration、Streaming、Static Rendering；
10. 准确解释 RSC、Client Component、Server Function 和序列化/安全边界；
11. 用源码断点跟踪一次 State Update 到 DOM Commit；
12. 解释 Fiber、Reconciler、Hooks、Lane、Scheduler、Suspense 的核心内部模型；
13. 发布或设计可消费 React Library / Headless Component；
14. 维护 Legacy React，并设计 React 18→19 或 SPA→SSR/RSC 的迁移方案；
15. 对大型 React 系统进行状态、性能、安全、服务端边界和升级治理评审。

---

# 5. 当前拆分进度

当前已完整拆分：

```text
Module 11.01 → Lesson
Module 11.02 → Lesson
Module 11.03 → Lesson
Module 11.04 → Lesson
Module 11.05 → Lesson
Module 11.06 → Lesson
Module 11.07 → Lesson
Module 11.08 → Lesson
Module 11.09 → Lesson
Module 11.10 → Lesson
Module 11.11 → Lesson
Module 11.12 → Lesson
Module 11.13 → Lesson
Module 11.14 → Lesson
Module 11.15 → Lesson（包含 Order Editor 综合项目）
Module 11.16 → Lesson
Module 11.17 → Lesson
Module 11.18 → Lesson（包含 Multi-step Order Workflow 综合项目）
```

后续从 `Module 11.19：Ref 一次学透` 继续按照完全相同的广度、深度和粒度向下拆。
