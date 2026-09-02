# Stage 11：React 完整体系

> 版本：v2.1-draft  
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

当前 Stage 11 已收敛为 `Module 11.01 ～ 11.35`；原有 Lesson、综合项目、源码、性能、故障、迁移与治理内容全部保留，仅合并过碎 Module 边界。正式课程编写前只继续做全局依赖、重复、粒度与 Knowledge Ceiling 复审。

---

# 3. Module / Lesson 学习顺序

# Module 11.01：React Problem Domain、Project Bootstrap 与 Root Lifecycle

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

# Module 11.02：JSX 与 React Object Model

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

# Module 11.03：Component、Pure Render、Props 与 Composition

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

# Module 11.04：Conditional Rendering、List、Key 与 Identity

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

# Module 11.05：React Event System

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

# Module 11.06：State Fundamentals、Render Snapshot、Update Queue 与 Batching

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

# Module 11.07：Immutable State 与 Component Identity

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

# Module 11.08：State Modeling 与 Ownership

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

# Module 11.09：React Form 完整体系

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

# Module 11.10：Reducer、Context 与 State Architecture

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

# Module 11.11：Ref 与 Imperative Escape Hatches

本 Module 负责 React 的可变容器和 DOM Escape Hatch。完成后必须能区分 State 与 Ref、声明式与命令式边界，并正确处理 DOM、Timer、第三方实例和生命周期。

### Lesson RE-REF-001：为什么 React 需要 Ref 这种“不会触发 Render 的容器”

从跨 Render 保存 Timer ID / DOM Handle 的需求出发，理解 Ref 解决的问题与 State 完全不同。

### Lesson RE-REF-002：第一个 useRef 与 ref.current

创建 Ref、读写 current，并证明修改 current 不会触发 Component Render。

### Lesson RE-REF-003：Ref Object 为什么可以跨多次 Render 保持同一身份

比较普通对象与 useRef 返回对象，建立 Stable Container 的心智模型。

### Lesson RE-REF-004：State 与 Ref 应该怎么选

用“是否影响可见 UI”“是否需要触发 Render”“是否只保存外部句柄”建立可执行判断规则。

### Lesson RE-REF-005：第一个 DOM Ref——拿到真实 DOM Node

把 Ref 绑定到 Input / Div，观察 Commit 后 current 指向真实 DOM，并明确 Render 阶段不能可靠读取它。

### Lesson RE-REF-006：使用 Ref 管理 Focus、Scroll 与 Selection

实现聚焦、滚动、文本选择，理解这些操作为何天然属于命令式浏览器能力。

### Lesson RE-REF-007：Callback Ref 什么时候比 Object Ref 更合适

观察 attach/detach 时机，并用于动态节点和可观测节点生命周期。

### Lesson RE-REF-008：如何管理一组动态列表 DOM Ref

为可变列表建立 Map/Callback Ref 方案，避免按 index 保存导致身份错乱。

### Lesson RE-REF-009：Ref 如何保存 Timer、Animation、Observer、Socket 等外部句柄

比较 number/object handle 的生命周期，并明确谁负责 cleanup。

### Lesson RE-REF-010：Ref 能用来保存“最新值”吗，风险是什么

实现 latest-value pattern，同时说明它绕开 React 响应式数据流的代价，为 useEffectEvent 做前置。

### Lesson RE-REF-011：DOM Measurement 应该在什么时候读取

比较事件后读取、Effect、LayoutEffect 的时机，先建立测量与浏览器 Layout 的联系。

### Lesson RE-REF-012：Ref 在挂载、更新、卸载时如何变成 Node / null

通过日志观察 Ref 生命周期，理解卸载后引用失效和资源释放。

### Lesson RE-REF-013：StrictMode 下 Callback Ref 为什么可能重复 attach/detach

用开发模式验证 StrictMode 的额外检查，找出不对称清理逻辑。

### Lesson RE-REF-014：Ref 滥用如何造成隐藏状态和内存问题

制造“所有业务状态都塞进 Ref”的反模式，并用 Heap/Retainer 高层思路分析长生命周期引用。

### Lesson RE-REF-015：综合实现——可聚焦、可滚动、可测量的 List Navigator

组合 DOM Ref、Callback Ref、动态节点映射和键盘事件，完成一个不依赖未来 Effect 能力的导航组件。

---

本 Module 讨论组件对外暴露命令式能力的正确边界。目标不是“会调用 useImperativeHandle”，而是学会只在声明式 Props 不足以表达的场景暴露最小 API。

### Lesson RE-IMP-001：什么叫 Imperative Escape Hatch

用 focus/open/play/scroll 等动作区分“描述状态”与“直接命令对象执行动作”。

### Lesson RE-IMP-002：React 19 的 ref-as-prop 与 forwardRef 历史兼容怎么理解

建立现代 React ref 传递模型，并认识维护旧代码时仍会遇到的 forwardRef。

### Lesson RE-IMP-003：第一个 useImperativeHandle

让父组件拿到自定义 Handle，而不是直接拿到整个内部 DOM Node。

### Lesson RE-IMP-004：Imperative Handle 为什么应该只暴露最小能力

比较暴露完整 DOM、暴露内部 State、只暴露 focus/reset 三种 API 的耦合差异。

### Lesson RE-IMP-005：为 Modal 设计 open/close 还是 controlled open Props

比较 Controlled API 与 Imperative API，明确业务状态通常优先声明式表达。

### Lesson RE-IMP-006：Editor / Canvas / Media 为什么更常需要 Imperative API

处理 selection、undo、play、seek、export 等天然命令式能力。

### Lesson RE-IMP-007：第三方 Chart / Map 实例应该如何包进 React Component

建立 Wrapper、Ref、实例生命周期和最小外部 Handle 的边界。

### Lesson RE-IMP-008：多个 Ref 如何组合和转发

处理内部需要 DOM Ref、外部又需要 Handle 的场景，并避免 Ref ownership 混乱。

### Lesson RE-IMP-009：Imperative API 如何做 TypeScript 类型设计

为 Handle、nullable lifecycle、generic element 设计明确类型合同。

### Lesson RE-IMP-010：如何测试 Imperative Component

从用户行为和必要 Handle 两个层面验证，不把实现细节变成测试合同。

### Lesson RE-IMP-011：Imperative API 反模式——父组件遥控子组件内部实现

制造大量 `doX/doY/setInternalFoo` 方法，分析它如何破坏封装和状态所有权。

### Lesson RE-IMP-012：综合重构——把命令式组件 API 收敛到最小边界

对 Modal / Editor Wrapper 做一次 API Review，在 Props、Callback、Ref Handle 之间重新分配职责。

---

# Module 11.12：Effect 与 External Synchronization

Effect 是 React 最容易被误用的能力之一。本 Module 从“与外部系统同步”一路进入 Dependency、Cleanup、StrictMode、Race、Stale Closure、Abort、Passive Effect、SSR 和源码连接，确保后续不需要再开 Effect 高级篇。

### Lesson RE-EFFECT-001：Effect 真正解决的唯一核心问题是什么

从“React State 已变化，但外部系统还不知道”建立 External Synchronization 定义。

### Lesson RE-EFFECT-002：第一个 Effect——把 React 状态同步到外部系统

用 document.title / 外部 Widget 作为最小例子，而不是一上来把数据请求等同于 Effect。

### Lesson RE-EFFECT-003：Render、Commit、Effect 三个阶段是什么关系

通过日志建立 Render 描述 UI、Commit 修改宿主环境、Effect 之后同步外部系统的顺序。

### Lesson RE-EFFECT-004：Dependency Array 到底表达什么

理解依赖不是“我想什么时候运行”，而是 Effect 使用了哪些 Reactive Value。

### Lesson RE-EFFECT-005：React 如何比较 Dependency

用 Primitive、Object、Function 验证 Object.is 语义以及 identity 变化的影响。

### Lesson RE-EFFECT-006：eslint exhaustive-deps 为什么不是烦人的警告

主动删依赖制造 stale behavior，理解 Linter 在维护同步声明正确性上的作用。

### Lesson RE-EFFECT-007：Cleanup 为什么和 Setup 必须对称

用订阅/连接实验观察旧 Effect 清理后再建立新同步关系的必要性。

### Lesson RE-EFFECT-008：StrictMode 为什么会额外执行 Setup → Cleanup → Setup

利用重复连接暴露 cleanup 缺失，理解开发模式压力测试的意义。

### Lesson RE-EFFECT-009：Subscription Effect 如何正确设计

实现事件监听、subscribe/unsubscribe，并处理 dependency 变化和卸载。

### Lesson RE-EFFECT-010：Timer Effect 如何避免重复计时器

制造 interval 泄漏和 stale callback，再根据同步对象生命周期修复。

### Lesson RE-EFFECT-011：第三方 Widget Effect 如何围绕实例生命周期组织

初始化、更新、销毁地图/播放器类实例，并区分可直接在事件中执行的动作。

### Lesson RE-EFFECT-012：在 Effect 中 Fetch 数据为什么容易产生额外复杂度

观察 loading/error/race/cache/waterfall，理解它可用但不是应用级 Server State 的默认终点。

### Lesson RE-EFFECT-013：AbortController 如何真正取消 Effect 中的请求

把 Cleanup 与请求 Abort 连接起来，并区分取消网络工作和“忽略旧结果”。

### Lesson RE-EFFECT-014：Race Condition 是怎么形成的

制造 A 请求后发先到、B 请求先发后到等乱序响应，用时间线证明错误数据覆盖。

### Lesson RE-EFFECT-015：Stale Closure 为什么会让 Effect 读到旧值

通过 Timer / Subscription 复现旧 Render 闭包，区分依赖缺失与业务真正想读取最新值。

### Lesson RE-EFFECT-016：Object Dependency 为什么让 Effect 重复执行

比较 render 中创建对象、对象字段依赖、Effect 内创建对象等修复策略。

### Lesson RE-EFFECT-017：Function Dependency 为什么经常不停变化

比较内联函数、移动逻辑、useCallback 和 Effect 内定义，避免为了静态 identity 机械 memoize。

### Lesson RE-EFFECT-018：Infinite Effect 的两个必要条件是什么

建立“Effect 更新 State + 更新导致依赖改变”的循环模型，并用 DevTools/日志定位。

### Lesson RE-EFFECT-019：多个 Effect 的 Cleanup / Setup 顺序应该怎么推理

通过多个同步对象观察重新 Render 与 Unmount 时的执行顺序，避免依赖隐式顺序设计业务。

### Lesson RE-EFFECT-020：Effect Error 应该如何处理

区分同步 setup 错误、异步 Promise 错误、外部连接错误，以及它们和 Error Boundary 的边界。

### Lesson RE-EFFECT-021：Effect 在 Server Rendering 时会运行吗

用最小 SSR 实验建立 Effect 只在 Client Commit 后运行的模型，为 Hydration 做前置。

### Lesson RE-EFFECT-022：Passive Effect 为什么叫 Passive

从浏览器 Paint 与 React Commit 时机建立高层模型，并与 LayoutEffect 对比。

### Lesson RE-EFFECT-023：从 useEffect 连接到 Fiber Effect 数据结构

只画出 Hook Effect、Fiber flags、Passive Queue 的入口地图，后续 Hooks Internals / Commit 源码再断点验证。

### Lesson RE-EFFECT-024：综合故障——Effect Hell

在一个页面中主动制造重复订阅、无限循环、Race、Stale Closure、对象依赖和未清理请求，再逐项修复。

### Lesson RE-EFFECT-025：Effect Architecture Review——每个 Effect 的外部系统是谁

对真实页面逐个 Effect 做审计：没有明确外部系统的 Effect 必须证明其必要性，否则进入 Removing Effects 重构。

---

本 Module 负责把“不需要 Effect 的逻辑”重新放回正确位置，建立 React 数据流优先于同步补丁的设计习惯。

### Lesson RE-REMOVE-001：Derived Data 为什么应该在 Render 中直接计算

把 fullName / filteredItems 从 Effect + State 重构为普通计算，消除一次额外 Render 和同步风险。

### Lesson RE-REMOVE-002：用户事件为什么应该留在 Event Handler

把“点击以后发送请求/显示通知”从 Effect 重构回真正触发动作的位置。

### Lesson RE-REMOVE-003：切换实体时重置 State 为什么优先考虑 Key

比较 Effect reset 与 Component Identity reset，减少手工同步。

### Lesson RE-REMOVE-004：Props 改变时“调整 State”应该怎么处理

区分 Derived、Key Reset、条件 Render 内调整与真正需要保留部分 State 的特殊情况。

### Lesson RE-REMOVE-005：通知 Parent 某个 State 改变为什么可能不需要 Effect

比较在 setter/event 中同步通知和 Effect 事后通知，减少两阶段更新。

### Lesson RE-REMOVE-006：应用级一次性初始化为什么不一定属于 Effect

区分 module initialization、root bootstrap、用户会话启动与组件挂载。

### Lesson RE-REMOVE-007：订阅外部 Store 为什么更适合 useSyncExternalStore

从 tearing / SSR / subscription contract 解释专用 Hook 比手工 Effect 更可靠。

### Lesson RE-REMOVE-008：Server State 为什么更适合 Query Cache

把 fetch Effect 的缓存、去重、重试和失效需求列出来，连接后续 TanStack Query。

### Lesson RE-REMOVE-009：Chained Effects 为什么会形成脆弱状态机

制造 Effect A 更新 State → Effect B 再更新 State 的链式流程，改为事件内一次计算或 reducer transition。

### Lesson RE-REMOVE-010：昂贵计算应该用 Effect + State 还是 useMemo

区分“同步外部系统”与“缓存纯计算”的职责。

### Lesson RE-REMOVE-011：复杂表单派生状态如何删掉大量 Effect

重构 errors/total/canSubmit/dirty 等可计算状态。

### Lesson RE-REMOVE-012：Effect Audit——对一个 Effect-heavy 页面做系统重构

逐个标注 Event Logic、Derived Data、External Sync、Server State、Store Subscription，并删除不必要 Effect。

---

本 Module 解决 Effect 内“同步关系是 Reactive，但某段回调逻辑只想读取最新值”的场景，并明确它不能成为逃避 Dependency 的工具。

### Lesson RE-EFFECTEVENT-001：Reactive Logic 与 Non-reactive Logic 怎么区分

用聊天室连接 + theme 通知例子区分“需要重新连接的值”和“只需要读取最新值的逻辑”。

### Lesson RE-EFFECTEVENT-002：第一个 useEffectEvent

把非响应式回调从 Effect 中抽出，同时保持读取最新 Props/State。

### Lesson RE-EFFECTEVENT-003：useEffectEvent 为什么能缓解 Stale Closure

通过延迟回调比较普通闭包与 Effect Event 的读取行为。

### Lesson RE-EFFECTEVENT-004：为什么 useEffectEvent 不能用来隐藏真正的 Dependency

故意把 roomId 等同步条件塞进去，观察逻辑语义被破坏。

### Lesson RE-EFFECTEVENT-005：Timer / Listener 中什么逻辑适合 Effect Event

处理稳定订阅 + 最新业务回调组合。

### Lesson RE-EFFECTEVENT-006：Effect Event 与 Ref latest-value pattern 怎么比较

从语义、Linter、可读性和 React 数据流角度比较两者。

### Lesson RE-EFFECTEVENT-007：Effect Event API 应该如何测试

验证外部订阅不重复建立，同时回调能看到最新 State。

### Lesson RE-EFFECTEVENT-008：综合重构——把聊天室 Effect 拆成同步关系与最新事件逻辑

在真实连接场景中验证 dependency、reconnect 次数和最新 UI 配置。

---

本 Module 专门处理 Commit 与浏览器 Layout/Paint 之间的时机问题，并解释同步阻塞的性能代价。

### Lesson RE-LAYOUT-001：浏览器 Layout / Paint 与 React Commit 的关系

复习渲染流水线，并定位普通 Effect 与 LayoutEffect 的时机差异。

### Lesson RE-LAYOUT-002：为什么 Tooltip Measurement 可能需要 useLayoutEffect

先用 useEffect 制造闪烁，再在 Paint 前测量并同步调整位置。

### Lesson RE-LAYOUT-003：useLayoutEffect 为什么会阻塞 Paint

用昂贵同步工作制造卡顿，理解它的成本和使用边界。

### Lesson RE-LAYOUT-004：DOM Read / Write 如何制造 Layout Thrashing

在 LayoutEffect 中交错读写尺寸，连接浏览器性能知识。

### Lesson RE-LAYOUT-005：什么时候普通 Event Handler 就能完成 DOM Measurement

避免把所有 DOM 操作都升级为 LayoutEffect。

### Lesson RE-LAYOUT-006：SSR 中 useLayoutEffect 为什么有特殊边界

理解服务器没有 Layout，设计仅客户端执行的组件边界。

### Lesson RE-LAYOUT-007：useInsertionEffect 解决的是什么库作者问题

认识 CSS-in-JS 样式注入时机、DOM Mutation 前插入和普通业务代码不应滥用的原因。

### Lesson RE-LAYOUT-008：LayoutEffect、Effect、Ref Callback 如何选择

用 measurement、subscription、attach node 三类需求建立决策表。

### Lesson RE-LAYOUT-009：性能故障——同步 LayoutEffect 把交互拖慢

用 Performance Trace 观察阻塞 Commit/Paint，并完成重构。

### Lesson RE-LAYOUT-010：综合实现——无闪烁自适应 Popover

结合 Ref、LayoutEffect、ResizeObserver 前置和 Portal 前置设计定位流程。

---

# Module 11.13：Custom Hook 与 External Store Integration

本 Module 从逻辑复用进入 Hook API、生命周期、依赖、SSR、测试、Debug 和 Library 设计，避免“看到三行重复就抽 Hook”。

### Lesson RE-HOOK-001：Custom Hook 复用的到底是什么

区分逻辑复用与 State 实例共享，证明两个 Hook 调用拥有独立 State。

### Lesson RE-HOOK-002：第一个 Custom Hook

把可复用状态逻辑从 Component 提取，并保持 Hook 命名和调用规则。

### Lesson RE-HOOK-003：Hook 参数应该接受值、配置还是 Callback

比较 API 稳定性、Dependency 和调用体验。

### Lesson RE-HOOK-004：Hook 返回 Tuple 还是 Object

从字段数量、重命名、向后兼容和类型推断选择返回形态。

### Lesson RE-HOOK-005：Custom Hook 如何组合其他 Hook

建立 Hook Composition 和内部生命周期模型。

### Lesson RE-HOOK-006：Hook 内 Effect Dependency 如何设计

避免通过 API 设计把不稳定对象/函数强迫给使用者。

### Lesson RE-HOOK-007：Hook 如何暴露错误、Pending 与取消能力

设计异步 Hook 的完整状态合同，不吞异常。

### Lesson RE-HOOK-008：Hook 与 SSR / Hydration 边界

识别 window/document、server snapshot 和 client-only 初始化问题。

### Lesson RE-HOOK-009：useDebugValue 什么时候有价值

为复杂 Library Hook 提供 DevTools 可读状态，而不是所有 Hook 都加标签。

### Lesson RE-HOOK-010：如何测试 Custom Hook

优先通过消费组件行为验证，再讨论独立 Hook harness 的适用场景。

### Lesson RE-HOOK-011：Custom Hook 为什么不是 Service Layer

区分 React 生命周期逻辑、纯 Domain Function、API Client 和 Repository。

### Lesson RE-HOOK-012：Hook API Versioning 怎么避免破坏大量调用方

讨论返回结构、option object、deprecated field 和迁移策略。

### Lesson RE-HOOK-013：综合实现——useOnlineStatus / useMediaQuery / useDebouncedValue 的边界比较

分别识别 External Store、Browser Subscription、纯时间逻辑的不同实现策略。

---

本 Module 建立 React 与外部可变 Store 的正式订阅合同，并深入 tearing、snapshot identity、SSR 与自定义 Store 设计。

### Lesson RE-STORE-001：什么叫 External Mutable Store

用浏览器 online 状态和自定义 store 区分 React-owned State 与外部数据源。

### Lesson RE-STORE-002：为什么手工 useEffect + setState 订阅可能不够可靠

从并发 Render、订阅时序和 SSR 建立问题背景。

### Lesson RE-STORE-003：第一个 useSyncExternalStore

实现 subscribe + getSnapshot，并观察外部值变化触发 React 更新。

### Lesson RE-STORE-004：getSnapshot 为什么必须返回可缓存的稳定 Snapshot

制造每次返回新对象导致的循环/无意义更新问题。

### Lesson RE-STORE-005：subscribe 函数 Identity 为什么重要

比较模块级 subscribe 和 Render 内新函数，观察重复订阅。

### Lesson RE-STORE-006：Tearing 是什么

通过概念与可控实验理解同一次 UI Render 读取到不一致外部数据的风险。

### Lesson RE-STORE-007：getServerSnapshot 为什么存在

为 SSR 提供服务器值，并保持 Hydration 首次 Snapshot 一致。

### Lesson RE-STORE-008：用 useSyncExternalStore 封装 Browser Online State

完成浏览器事件订阅、SSR fallback 和测试。

### Lesson RE-STORE-009：用 useSyncExternalStore 封装 LocalStorage Store

处理 storage event、多 Tab、parse/version 和 local write 通知。

### Lesson RE-STORE-010：Selector 为什么是 External Store 性能的下一步问题

理解细粒度订阅和 Snapshot 切片，但不在这里重教 Zustand/Redux。

### Lesson RE-STORE-011：设计一个最小 External Store Contract

实现 getState/setState/subscribe 与 React Adapter，观察 React 之外也可以读写。

### Lesson RE-STORE-012：综合比较——Context、External Store、Server State 各自负责什么

通过同一页面把三类数据放回正确 Owner。

---

# Module 11.14：Router 与 Route Data Architecture

本 Module 从 URL/History 出发，以 React Router 为代表完整覆盖 Route Tree、Nested Layout、Params、Search Params、Navigation、Deep Link、Error/Lazy Route、Scroll、Auth 与 URL State。

### Lesson RE-ROUTER-001：为什么 SPA 仍然需要 URL

建立可分享、刷新、Back/Forward、书签和外部入口的 Web 基本合同。

### Lesson RE-ROUTER-002：React Router 与浏览器 History 的关系

观察 push/replace/popstate 与 Router 状态更新，不把 Router 当魔法。

### Lesson RE-ROUTER-003：第一个 Route Tree

从 `/`、`/products`、`/orders` 建立路径到 UI 的匹配模型。

### Lesson RE-ROUTER-004：Nested Route 与 Layout Route 如何组织页面骨架

设计父 Layout、Outlet、子页面和共享导航。

### Lesson RE-ROUTER-005：Dynamic Params 如何成为页面输入

处理 `/orders/:orderId`、类型转换、非法参数和不存在资源。

### Lesson RE-ROUTER-006：Search Params 为什么应该成为真正的 URL State

实现 filter/sort/page 并验证刷新、分享、Back/Forward。

### Lesson RE-ROUTER-007：Navigate、Link、Redirect 各自解决什么问题

区分用户导航、命令式业务跳转和声明式重定向。

### Lesson RE-ROUTER-008：Index Route、Relative Route 与 Path Resolution

解决大型嵌套路由中相对链接和路径维护问题。

### Lesson RE-ROUTER-009：Deep Link 为什么在开发环境正常、生产刷新却可能 404

理解 SPA fallback、静态服务器和 CDN 路由配置边界。

### Lesson RE-ROUTER-010：Route-level Lazy Loading 如何工作

把代码分割与导航加载连接起来，并观察 Network Chunk。

### Lesson RE-ROUTER-011：Error Route 与普通 Error Boundary 有什么关系

区分路由加载/Action 错误、Render 错误和嵌套错误边界。

### Lesson RE-ROUTER-012：Scroll Restoration 是谁的责任

处理列表→详情→返回、hash anchor、手工 scroll 和浏览器默认行为。

### Lesson RE-ROUTER-013：Route Transition Pending UI 应该放在哪里

为未来 Data Router / Suspense 建立导航状态边界。

### Lesson RE-ROUTER-014：Auth Route 为什么不能只做前端“拦截”

区分 UI 路由可见性与服务器真正授权。

### Lesson RE-ROUTER-015：Route Tree 如何映射 Feature / Domain Boundary

避免一个巨大 routes 文件，建立 route ownership 与 module public API。

### Lesson RE-ROUTER-016：综合实现——把 Multi-step Workflow 接入真实 URL

把 step/orderId/filter 等适合 URL 的状态迁出 React State，并验证 Deep Link 与 Back/Forward。

---

本 Module 在 Router 基础上加入 Loader、Action、Pending、Redirect、Error、Revalidation 与 Route Data，建立“导航就是数据生命周期的一部分”的模型。

### Lesson RE-DATAROUTER-001：为什么 Route Match 之后还需要 Data Lifecycle

从页面进入、刷新、切换参数分析数据加载与路由的一致性问题。

### Lesson RE-DATAROUTER-002：第一个 Loader

让 Route 自己声明所需数据，并观察导航和加载的关系。

### Lesson RE-DATAROUTER-003：Loader Params / Request 如何成为数据输入

处理 route params、search params、request header 和 abort signal。

### Lesson RE-DATAROUTER-004：Loader 的 Cancellation 为什么重要

快速导航制造旧请求未完成场景，验证 abort。

### Lesson RE-DATAROUTER-005：Pending Navigation UI 如何设计

区分当前页面保留、全局 loading、局部 skeleton 和 optimistic navigation。

### Lesson RE-DATAROUTER-006：Route Action 如何处理写操作

用 Form/Mutation 建立提交→结果→后续数据更新流程。

### Lesson RE-DATAROUTER-007：Redirect 应该在什么层发生

比较 UI effect redirect、loader/action redirect 和服务器 redirect。

### Lesson RE-DATAROUTER-008：Revalidation 是什么

理解写操作以后哪些 loader 需要重新取数以及何时避免全量刷新。

### Lesson RE-DATAROUTER-009：Nested Route Data 如何组合

父子 Layout 各自拥有数据，避免一个顶层 Loader 包办所有资源。

### Lesson RE-DATAROUTER-010：Deferred / Streaming Route Data 与 Suspense 的连接

建立部分数据先显示、慢数据后揭示的前置模型。

### Lesson RE-DATAROUTER-011：Route Error Boundary 如何隔离局部失败

制造父/子 loader failure 并观察错误冒泡边界。

### Lesson RE-DATAROUTER-012：Data Router 与 Query Cache 会不会重复

比较 navigation lifecycle 与 server-state cache，明确互补/重叠的选择边界。

### Lesson RE-DATAROUTER-013：Route Architecture 如何处理 Auth / Tenant / Feature Flag

把运行上下文放在明确的 route/layout boundary。

### Lesson RE-DATAROUTER-014：综合实现——带 Loader/Action/Error/Revalidation 的订单路由

将订单工作流升级为真正的路由数据应用，并保持 Knowledge Ceiling。

---

# Module 11.15：Server State、TanStack Query 与 API Boundary

本 Module 不从某个库 API 开始，而是先完整建立 Server State 的所有权、缓存、Stale、去重、重试、失效、分页、乐观更新和离线模型。

### Lesson RE-SERVERSTATE-001：Server State 为什么不属于浏览器

建立 Remote Ownership 与 Client Cache 的根本区别。

### Lesson RE-SERVERSTATE-002：Cache Entry 需要哪些最小信息

理解 key、data、status、updatedAt、observers、stale/expiry 等概念。

### Lesson RE-SERVERSTATE-003：Fresh、Stale、Expired 分别意味着什么

区分“还能展示”和“是否应该后台刷新”。

### Lesson RE-SERVERSTATE-004：Query Key 为什么决定缓存正确性

制造 key 缺参数导致跨筛选/租户数据串用的 Bug。

### Lesson RE-SERVERSTATE-005：Request Deduplication 解决什么问题

多个组件同时需要同一数据时复用 in-flight 请求。

### Lesson RE-SERVERSTATE-006：Retry 为什么不能无脑重试

区分网络错误、429、5xx、4xx、幂等性和 Backoff。

### Lesson RE-SERVERSTATE-007：Refetch Trigger 如何选择

讨论 mount、focus、reconnect、interval、manual invalidation。

### Lesson RE-SERVERSTATE-008：Invalidation 与直接改 Cache 有什么区别

区分“标记过期”“重新取数”“本地补丁”。

### Lesson RE-SERVERSTATE-009：Mutation 为什么需要独立生命周期

建立 pending/success/error、variables、retry 和 side effect model。

### Lesson RE-SERVERSTATE-010：Optimistic Update 需要哪些前提

理解 snapshot、temporary state、rollback、server reconciliation。

### Lesson RE-SERVERSTATE-011：Pagination 与 Infinite Query 的 Cache Shape 有什么不同

比较 page keyed cache、cursor pages、append/prepend 和去重。

### Lesson RE-SERVERSTATE-012：Prefetch 为什么是性能与数据策略问题

分析 hover/navigation prefetch、浪费请求和 stale 策略。

### Lesson RE-SERVERSTATE-013：Offline Server State 应该怎么理解

区分“读缓存”与“离线写队列”，后者完整能力留给更后面的 Local-first Stage。

### Lesson RE-SERVERSTATE-014：Server State Architecture Review——哪些 API Response 不应该塞进 Redux/Context

对真实应用做一次缓存所有权重构。

---

本 Module 用 TanStack Query 验证上一 Module 的 Server State 模型，并覆盖 Query Key、staleTime、GC、取消、Mutation、Optimistic、Prefetch、Persistence、SSR/Hydration、DevTools 和生产边界。

### Lesson RE-QUERY-001：从零接入 QueryClient / Provider

理解 QueryClient 是缓存与协调器，不是“请求函数替代品”。

### Lesson RE-QUERY-002：第一个 useQuery

拆解 queryKey、queryFn、status、fetchStatus 和 data 生命周期。

### Lesson RE-QUERY-003：如何设计可演进的 Query Key Factory

把 entity、params、tenant、scope 编码进稳定 key。

### Lesson RE-QUERY-004：staleTime 到底控制什么

通过 focus/remount 实验观察 freshness 与 refetch。

### Lesson RE-QUERY-005：GC Time 与 Stale Time 为什么不是同一个值

观察无 observer cache entry 的保留与删除。

### Lesson RE-QUERY-006：Query Function 如何接收 AbortSignal

快速切换参数验证请求取消。

### Lesson RE-QUERY-007：enabled / dependent query 应该如何使用

处理依赖参数和串行数据，不用 Effect 手工触发。

### Lesson RE-QUERY-008：Retry / Retry Delay 如何按错误类型配置

把 HTTP/业务错误模型接入 retry policy。

### Lesson RE-QUERY-009：select 如何派生 Cache 数据

区分缓存原始数据、消费视图和 expensive select。

### Lesson RE-QUERY-010：placeholderData / initialData 应该怎么选

理解来源、freshness 和 UX 语义差异。

### Lesson RE-QUERY-011：Prefetch Query 如何配合 Router

在导航前预热缓存并验证实际 Network 行为。

### Lesson RE-QUERY-012：第一个 Mutation

理解 mutationFn、variables、pending、error、success 生命周期。

### Lesson RE-QUERY-013：Mutation 成功后为什么要 Invalidate

根据资源关系选择精确失效，不做“全部 invalidate”。

### Lesson RE-QUERY-014：直接 setQueryData 什么时候更好

服务器已返回完整新实体时避免无意义 refetch。

### Lesson RE-QUERY-015：Optimistic Mutation 完整闭环

实现 onMutate snapshot、cancel queries、optimistic write、rollback 和 settle。

### Lesson RE-QUERY-016：Concurrent Optimistic Mutation 为什么难

制造多次并发修改和乱序响应，设计 reconciliation。

### Lesson RE-QUERY-017：Pagination / Infinite Query 如何设计

处理 cursor、next page、去重、刷新和页面级错误。

### Lesson RE-QUERY-018：Query Cache Persistence 有哪些风险

讨论版本、过期、敏感数据、容量和恢复策略。

### Lesson RE-QUERY-019：SSR Dehydrate / Hydrate 的高层模型

建立服务器预取、序列化、客户端重建 Cache 的边界，为 SSR Module 前置。

### Lesson RE-QUERY-020：TanStack Query DevTools 如何用于真实诊断

观察 observers、stale、fetch、cache entry 和 invalidation。

### Lesson RE-QUERY-021：Query Anti-pattern——把 Query data 再复制进 Local State

制造双份数据不同步并重构。

### Lesson RE-QUERY-022：生产级 Query Policy 怎么制定

为 retry、staleTime、error、logging、auth、tenant、prefetch 建立统一团队策略。

---

本 Module 把 React UI 与 HTTP/Schema/DTO/Auth/Error/Trace 隔离开，形成稳定的数据访问边界，并在末尾把 Router、Form、Query、API Client 组合成 React Enterprise SPA。

### Lesson RE-API-001：为什么 Component 不应该到处直接拼 fetch

识别 base URL、auth、error、schema、trace、cancel 重复逻辑。

### Lesson RE-API-002：设计最小 Fetch Wrapper

明确 Request/Response、signal、headers、method、body 和返回值合同。

### Lesson RE-API-003：HTTP Error、Network Error、Abort Error、Business Error 如何统一建模

让 UI 能做准确错误决策，而不是只 catch Error message。

### Lesson RE-API-004：Runtime Validation 为什么 TypeScript 替代不了

对外部 JSON 做 schema parse，拒绝“类型声明即数据可信”。

### Lesson RE-API-005：DTO、Domain Model、ViewModel 应该怎么分

把服务器字段和 UI/业务模型解耦，并明确转换位置。

### Lesson RE-API-006：Auth Token 应该在哪里注入

讨论 Cookie、Header、refresh、401 和重放边界，不把安全责任塞进每个组件。

### Lesson RE-API-007：Request Cancellation 如何贯穿 Router / Query / Client

让 AbortSignal 从调用方传到底层，而不是 Client 私自创建不可控请求。

### Lesson RE-API-008：Retry 应该在 API Client 还是 Query Layer

根据 transport、idempotency、cache lifecycle 决定责任边界。

### Lesson RE-API-009：Pagination / Cursor 类型如何设计

建立请求参数、page info、next cursor 和 generic page result。

### Lesson RE-API-010：Trace ID / Correlation ID 如何进入前端诊断

从 Response Header / Error Model 连接到日志和用户报错。

### Lesson RE-API-011：OpenAPI Codegen 应该生成到什么边界

比较 generated DTO/client 与手写 domain adapter，避免 generated code 扩散整个 UI。

### Lesson RE-API-012：Multi-tenant API Client 如何防止上下文串用

明确 tenant scope、cache key、header 和 client instance 生命周期。

### Lesson RE-API-013：Mock API / Contract Test 如何服务 React 开发

让前端在后端不稳定时仍能验证 schema 和错误路径。

### Lesson RE-API-014：综合项目——React Enterprise SPA 需求与边界设计

确定 Router、Form、Query、API、Permission UI、URL State 和错误模型，禁止偷用未来 Suspense/RSC。

### Lesson RE-API-015：综合项目——实现 Route + Query + Form 的读写闭环

完成列表、详情、编辑、提交、缓存更新和路由跳转。

### Lesson RE-API-016：综合项目——加入 Auth、Tenant、Runtime Validation 与 Trace ID

把非 UI 责任收敛到数据边界。

### Lesson RE-API-017：综合项目——制造 401、Schema Drift、Timeout、Abort、409 冲突

验证错误模型和恢复 UX。

### Lesson RE-API-018：综合项目——Enterprise SPA 完整验收

输出 Route Tree、State Map、Query Key Map、API Boundary 和 Failure Matrix，并执行 production build。

---

# Module 11.16：Actions 与 Optimistic Mutations

本 Module 学习 React 19 Action 心智模型、Form Action、Pending、错误、Transition 连接与渐进增强边界。

### Lesson RE-ACTION-001：React 中 Action 这个词到底指什么

从“异步状态转换”理解 Action 与普通 Event Handler 的差异。

### Lesson RE-ACTION-002：第一个 `<form action={fn}>`

观察 FormData、调用时机和提交生命周期。

### Lesson RE-ACTION-003：Async Action 如何管理 Pending

把提交中的 UI 反馈和重复提交控制连接起来。

### Lesson RE-ACTION-004：Action Error 与 Validation Error 应该怎么区分

建立字段错误、业务拒绝和系统异常的不同返回/抛出策略。

### Lesson RE-ACTION-005：Action 与 Transition 的关系

理解 Action 执行中的非紧急更新和 async transition 高层模型。

### Lesson RE-ACTION-006：多个 Action 并发会发生什么

制造重复提交和乱序结果，连接 Idempotency / Optimistic UI。

### Lesson RE-ACTION-007：Form Action 与传统 onSubmit 怎么选

从渐进增强、表单语义、客户端-only 交互比较两者。

### Lesson RE-ACTION-008：Action 如何与 Router / Server Function 连接

建立 client action、route action、server action/function 的边界，不混淆名称。

### Lesson RE-ACTION-009：综合实现——把 Enterprise SPA 的一个 Mutation 重构为 Action Flow

比较重构前后的 pending/error/validation 代码路径。

---

本 Module 聚焦 Action 状态累积和 Form 子树 Pending Context。

### Lesson RE-ACTIONSTATE-001：useActionState 解决什么重复模式

从 action result + pending + previous state 建立问题背景。

### Lesson RE-ACTIONSTATE-002：第一个 useActionState

拆解 action function、initial state、returned state、dispatch/action 和 pending。

### Lesson RE-ACTIONSTATE-003：Previous State 什么时候有价值

实现计数/表单服务器错误累积，并避免把它当普通 reducer。

### Lesson RE-ACTIONSTATE-004：Validation Error 如何通过 Action State 返回

设计 typed field errors 与 form message。

### Lesson RE-ACTIONSTATE-005：useFormStatus 为什么必须在 Form 子树中使用

理解 Form Context 与提交状态传播。

### Lesson RE-ACTIONSTATE-006：一个页面多个 Form 时 Pending 状态如何隔离

验证最近 Form 边界和按钮行为。

### Lesson RE-ACTIONSTATE-007：Action State 与 Server Function 如何连接

建立 client UX state 与 server mutation result 的合同。

### Lesson RE-ACTIONSTATE-008：Action State Failure——重复提交、旧错误、字段改变

设计错误清理和按钮状态。

### Lesson RE-ACTIONSTATE-009：综合实现——带字段错误和 Pending UX 的订单提交表单

完成可访问错误提示、提交状态和恢复。

---

本 Module 从用户感知延迟出发完整学习乐观状态、提交、回滚、并发操作、排序和服务器校准。

### Lesson RE-OPT-001：什么叫 Optimistic UI

区分“先显示预测结果”和“服务器已经成功”。

### Lesson RE-OPT-002：第一个 useOptimistic

建立 base state、optimistic state、optimistic update function。

### Lesson RE-OPT-003：Optimistic State 在 Action 完成后如何回到真实数据

观察 pending optimistic layer 与 base state 更新。

### Lesson RE-OPT-004：失败时如何 Rollback

制造服务器拒绝并恢复 UI，同时保留错误反馈。

### Lesson RE-OPT-005：临时 ID 如何与服务器真实 ID 对齐

处理新增 Comment/Item 的 identity reconciliation。

### Lesson RE-OPT-006：多个并发 Optimistic Update 如何组合

制造快速连续操作并观察 optimistic queue。

### Lesson RE-OPT-007：乱序服务器响应怎么避免旧结果覆盖新意图

连接 mutation ordering 和 version/idempotency。

### Lesson RE-OPT-008：Optimistic Delete 为什么风险更高

设计撤销、恢复和不可逆操作边界。

### Lesson RE-OPT-009：Optimistic UI 与 Query Cache Optimistic Update 如何分工

比较 React UI 层 optimistic state 与 server cache patch。

### Lesson RE-OPT-010：什么时候不应该乐观更新

讨论支付、权限变更、高失败率和不可预测服务器规则。

### Lesson RE-OPT-011：综合实现——订单备注/状态的 Optimistic Mutation

实现成功、失败、并发和 rollback 全路径。

---

# Module 11.17：Concurrent React：Transition、Suspense、use 与 Activity

本 Module 不从 API 开始，而是先建立 Concurrent React 的可中断 Render、优先级、重启和原子 Commit 心智模型。

### Lesson RE-CONCURRENT-001：Concurrency 为什么不等于 Parallelism

明确 React 可以交错/暂停工作，不代表 JavaScript Component 同时多线程执行。

### Lesson RE-CONCURRENT-002：为什么 Render 必须可重试

把 Pure Render 与可中断/重启工作连接起来。

### Lesson RE-CONCURRENT-003：Urgent 与 Non-urgent Update 有什么差异

用输入框和大列表过滤建立交互优先级直觉。

### Lesson RE-CONCURRENT-004：Interruptible Render 是什么

用概念时间线理解低优先级 Render 被新输入打断后重新开始。

### Lesson RE-CONCURRENT-005：Commit 为什么仍然必须保持原子性

区分可中断 Render 与不可露出半成品 DOM。

### Lesson RE-CONCURRENT-006：Background Rendering 与 Hidden UI 有什么关系

为 Transition、Suspense、Activity 做统一前置。

### Lesson RE-CONCURRENT-007：State Snapshot 在 Concurrent Render 下为什么更重要

连接每个 Render 独立 Snapshot 和 closure。

### Lesson RE-CONCURRENT-008：External Store 为什么会遇到 Tearing

回看 useSyncExternalStore 的并发一致性价值。

### Lesson RE-CONCURRENT-009：Lane / Scheduler 现在只需要理解到什么程度

建立更新带优先级标签、调度选择工作的高层图，源码后续验证。

### Lesson RE-CONCURRENT-010：综合实验——高成本列表在持续输入下的响应性问题

先制造卡顿，再为 Transition / DeferredValue 留出明确问题。

---

本 Module 完整学习 startTransition/useTransition、Pending、Interrupt、Async Action、Navigation、错误顺序和使用禁区。

### Lesson RE-TRANSITION-001：什么更新适合标记为 Transition

用搜索结果、Tab 内容、路由内容与输入值比较紧急性。

### Lesson RE-TRANSITION-002：第一个 startTransition

把昂贵结果更新标记为非紧急，保持输入响应。

### Lesson RE-TRANSITION-003：useTransition 多给了什么能力

使用 isPending 为用户展示过渡状态。

### Lesson RE-TRANSITION-004：为什么不能用 Transition 控制 Text Input value

解释输入的紧急受控更新约束。

### Lesson RE-TRANSITION-005：Transition Render 被打断时会发生什么

持续输入观察旧工作被丢弃、最新结果最终 Commit。

### Lesson RE-TRANSITION-006：Transition 与 Suspense Fallback 如何互动

观察已显示内容是否被立即替换成 fallback。

### Lesson RE-TRANSITION-007：Async Transition / Action 中 await 后更新怎么处理

理解异步边界和重新标记 transition 的版本相关行为。

### Lesson RE-TRANSITION-008：多个并发 Transition 的状态如何理解

制造两个非紧急更新，观察 pending 与结果顺序。

### Lesson RE-TRANSITION-009：Transition 与 Router Navigation 的关系

把页面导航作为非紧急 UI 切换理解。

### Lesson RE-TRANSITION-010：Transition 故障——把所有更新都包起来为什么更糟

分析错误优先级、复杂 pending 和 UX 退化。

### Lesson RE-TRANSITION-011：综合实现——响应式搜索 + 慢结果面板

用 CPU throttle 验证输入响应性改善，并记录 Trace。

---

本 Module 学习“消费方读取一个滞后的值”，并与 Transition、Debounce、Throttle 做清晰区分。

### Lesson RE-DEFER-001：Deferred Value 与 Transition 的方向差异

Transition 控制 update，DeferredValue 控制消费到的 value。

### Lesson RE-DEFER-002：第一个 useDeferredValue

让搜索输入保持最新、结果树暂时使用旧 query。

### Lesson RE-DEFER-003：Stale UI 应该如何向用户表达

通过 opacity/progress 表示结果仍基于旧值。

### Lesson RE-DEFER-004：DeferredValue 与 Suspense 如何协作

避免每次输入都闪 fallback。

### Lesson RE-DEFER-005：DeferredValue 为什么不是 Debounce

比较请求次数、时间延迟、调度优先级和 CPU 工作。

### Lesson RE-DEFER-006：什么时候应 Debounce Network，而 Deferred Render UI

组合两者解决不同层成本。

### Lesson RE-DEFER-007：DeferredValue 是否真的提升性能必须怎么测

用 Profiler / Performance 观察响应性而非只看“感觉”。

### Lesson RE-DEFER-008：综合实现——搜索、图表、列表多消费者的 Deferred UI

为不同高成本消费组件共享最新输入和延迟视图。

---

本 Module 从“Render 暂时无法完成”完整学习 Boundary、Fallback、Nested Reveal、Lazy、Data、Retry、Error、Transition、Streaming、Waterfall 和架构设计。

### Lesson RE-SUSPENSE-001：Suspense 解决的根问题是什么

建立某个子树暂时不能完成 Render、由上层 Boundary 接住的模型。

### Lesson RE-SUSPENSE-002：第一个 Suspense + lazy

用代码分割组件观察 fallback 与模块加载。

### Lesson RE-SUSPENSE-003：Boundary 放在哪里决定了什么 UX

比较整页 fallback、区域 fallback 和过度碎片化 boundary。

### Lesson RE-SUSPENSE-004：Nested Suspense 如何控制 Reveal Sequence

设计页面骨架先出、慢区域后出的加载体验。

### Lesson RE-SUSPENSE-005：Suspense 与 Error Boundary 如何分工

Promise pending 与真正 Error 分别由不同边界处理。

### Lesson RE-SUSPENSE-006：Retry 是怎么发生的

理解资源完成后 React 再次尝试 Render 的高层模型。

### Lesson RE-SUSPENSE-007：Suspense Data Source 为什么必须被框架/缓存正确集成

避免把任意 Effect fetch 误认为 Suspense data fetching。

### Lesson RE-SUSPENSE-008：Suspense Waterfall 是怎么形成的

父资源完成后才发现子资源，制造串行等待并测量。

### Lesson RE-SUSPENSE-009：Parallel Data Fetch 如何减少 Waterfall

提前启动资源/路由 loader/query prefetch。

### Lesson RE-SUSPENSE-010：Suspense 与 Transition 如何避免已显示内容闪回 fallback

比较普通更新和 transition update。

### Lesson RE-SUSPENSE-011：Suspense 与 DeferredValue 如何保持旧结果

把搜索结果 UX 做成 stale-while-revalidate 风格。

### Lesson RE-SUSPENSE-012：Suspense Boundary 与 Route Boundary 怎么组合

设计 route shell、page data、widget data 三层异步边界。

### Lesson RE-SUSPENSE-013：Suspense 与 Streaming SSR 为什么天然关联

建立服务器可以按 Boundary 逐段发送 HTML 的前置模型。

### Lesson RE-SUSPENSE-014：Fallback 本身为什么也可能导致 Layout Shift / A11Y 问题

设计稳定尺寸、live region 和焦点策略。

### Lesson RE-SUSPENSE-015：Suspense Debugging——到底是谁 Suspend 了

使用 React DevTools / Network / 资源日志定位 pending source。

### Lesson RE-SUSPENSE-016：综合实现——多层异步 Dashboard

组合 Lazy、Query/Resource、Nested Boundary、Error Boundary、Transition，并主动制造 Waterfall。

---

本 Module 学习 React 的 Resource Reading 模型：Promise / Context 如何在 Render 中读取、Suspense/Error Boundary 如何承接，以及 Server-created Promise 如何交给 Client。

### Lesson RE-USE-001：use() 与普通 Hook 有什么不同

理解它可以读取 Promise/Context，并具有不同的条件调用规则。

### Lesson RE-USE-002：用 use() 读取 Promise 时发生什么

Promise pending 触发 Suspense、fulfilled 返回值、rejected 进入错误路径。

### Lesson RE-USE-003：为什么 Promise Identity 必须稳定

Render 中不断创建新 Promise 会造成重复 suspend/工作浪费。

### Lesson RE-USE-004：use() 与 Error Boundary 如何连接

制造 Promise rejection 并设计恢复 UI。

### Lesson RE-USE-005：条件调用 use() 为什么与其他 Hook 规则不同

建立它的 API 语义但仍遵循只在 Component/Hook 中调用的边界。

### Lesson RE-USE-006：用 use() 读取 Context 与 useContext 有什么差异

理解条件读取场景和可读性取舍。

### Lesson RE-USE-007：Server-created Promise → Client use() 的完整链路前置

为 RSC Module 建立 Promise 传递与 Suspense 消费模型。

---

本 Module 学习 React 19.2 的 Activity：在隐藏 UI 保留 State、处理 Effect 生命周期、后台优先级和预渲染候选页面，并完成高交互 Workbench。

### Lesson RE-ACTIVITY-001：隐藏 UI 的三种策略——Unmount、CSS Hide、Activity

比较 State、DOM、Effect、CPU 和内存行为。

### Lesson RE-ACTIVITY-002：第一个 Activity visible/hidden

切换 Tab 并观察 State Preservation。

### Lesson RE-ACTIVITY-003：Activity Hidden 时 Effect 会发生什么

验证外部同步生命周期和重新 visible 时的行为。

### Lesson RE-ACTIVITY-004：Activity 与 Component Identity 有什么关系

连接 11.13 的 State Preservation 模型。

### Lesson RE-ACTIVITY-005：Activity 如何用于后台预渲染可能访问的 UI

设计 likely navigation / tab content 的预备渲染。

### Lesson RE-ACTIVITY-006：Background Priority 为什么重要

理解隐藏树工作不能抢占当前输入/可见页面。

### Lesson RE-ACTIVITY-007：Activity 与 Suspense 如何组合

隐藏内容预先 suspend/加载，在 visible 时减少等待。

### Lesson RE-ACTIVITY-008：Activity 的内存与资源成本怎么评估

讨论保留大量树、DOM、State 与隐藏资源的 trade-off。

### Lesson RE-ACTIVITY-009：什么时候不应该使用 Activity

短生命周期 Modal、敏感 State、巨大隐藏树等场景选型。

### Lesson RE-ACTIVITY-010：综合项目——High-interaction Data Workbench 需求设计

组合搜索、Query、Optimistic、Suspense、Transition、DeferredValue、Activity，明确 Knowledge Ceiling。

### Lesson RE-ACTIVITY-011：综合项目——实现可响应搜索与延迟结果

验证输入优先级和 stale result UX。

### Lesson RE-ACTIVITY-012：综合项目——实现 Optimistic Mutation 与错误恢复

加入并发修改、rollback 和 server reconciliation。

### Lesson RE-ACTIVITY-013：综合项目——实现 Activity Tab 预渲染

比较 unmount / CSS / Activity 的用户体验和资源开销。

### Lesson RE-ACTIVITY-014：综合项目——制造 Suspense Waterfall 与长 Render

记录问题，为下一性能段建立 baseline。

### Lesson RE-ACTIVITY-015：综合项目——完整验收 High-interaction Workbench

输出异步边界图、State/Cache Map、用户交互 Trace 和已知性能问题。

---

# Module 11.18：Profiling、Render Performance、Memoization 与 React Compiler

本 Module 建立证据驱动的 React 性能诊断方法，而不是先背 memo/useMemo。

### Lesson RE-PROF-001：React 性能优化为什么必须先测量

区分 Render 次数、Render 成本、Commit 成本和用户体验指标。

### Lesson RE-PROF-002：React DevTools Components 面板如何读

观察 Props、State、Hooks、Context 和 Component Tree。

### Lesson RE-PROF-003：Profiler Flamegraph 怎么看

识别 commit 中哪些 Component Render 以及耗时分布。

### Lesson RE-PROF-004：Ranked View 适合回答什么问题

快速定位单次 Commit 最昂贵组件。

### Lesson RE-PROF-005：为什么组件会 Render

使用 render reason / props/state/context 变化定位传播根因。

### Lesson RE-PROF-006：Mount 与 Update 性能应该分开看

首次渲染和交互更新通常有不同瓶颈。

### Lesson RE-PROF-007：React Performance Tracks 与 Browser Performance 怎么对齐

把 React 工作与 Main Thread、Long Task、Paint、INP 时间线连接。

### Lesson RE-PROF-008：CPU Throttling 为什么能更早暴露问题

在低端设备近似环境验证交互响应性。

### Lesson RE-PROF-009：User Timing / Performance Mark 如何标注业务动作

把“保存订单”“切换大 Tab”与性能 Trace 对齐。

### Lesson RE-PROF-010：Profiler 本身的开销和测量误区

避免用开发模式数字直接代表生产真实性能。

### Lesson RE-PROF-011：建立一份 React Performance Baseline

为 Workbench 记录交互、commit、INP、long task、memory 基线。

### Lesson RE-PROF-012：从一次慢交互生成可复现性能报告

固定步骤、数据规模、设备条件和 before/after 证据。

---

本 Module 系统分析 Render Propagation、State Locality、Props/Context Identity、Selector、Virtualization、List、Expensive Computation、Memory 与 Bundle 的 React-specific 连接。

### Lesson RE-PERF-001：父组件 Render 为什么通常会让子树重新计算

建立 Render Propagation 高层模型，不把它误解为 DOM 全量重建。

### Lesson RE-PERF-002：Render 多不一定慢，Render 少也不一定快

比较廉价大量 render 与单个昂贵 component。

### Lesson RE-PERF-003：State Colocation 如何缩小更新传播范围

把顶层 State 下沉到真正 owner，并用 Profiler 验证。

### Lesson RE-PERF-004：Component Boundary 如何隔离昂贵子树

在组件拆分和数据 ownership 之间找性能/可维护性平衡。

### Lesson RE-PERF-005：Props Identity 为什么影响 Memoized Child

观察新对象、新函数和 primitive prop。

### Lesson RE-PERF-006：Context Broadcast 如何形成 Render Storm

用巨大 Provider value 制造全树更新，并比较 Context Split / selector/store。

### Lesson RE-PERF-007：Derived Calculation 什么时候真的昂贵

先测量，再决定是否 memoize/预计算/worker。

### Lesson RE-PERF-008：Large List 为什么不能只靠 memo

理解 DOM 数量、Layout/Paint 和 virtualization。

### Lesson RE-PERF-009：Virtualization 的核心 trade-off

处理 dynamic height、scroll restoration、A11Y、search/find 和 overscan。

### Lesson RE-PERF-010：图片/图表/Canvas 组件如何避免 React 主线程压力

区分 React Render 成本与浏览器绘制/第三方库成本。

### Lesson RE-PERF-011：Long Task 与 React Render 如何连接

在 Performance Trace 定位 JS work、render phase、commit。

### Lesson RE-PERF-012：INP 慢一定是 React 的问题吗

区分 event handler、React render、layout、network 和 browser work。

### Lesson RE-PERF-013：Memory Retention 与“Render 性能”有什么不同

建立 detached DOM、cache、closure、third-party instance 的内存诊断边界。

### Lesson RE-PERF-014：Code Splitting 对 React 性能解决什么问题

区分 startup/download/parse 与交互 render。

### Lesson RE-PERF-015：性能优化如何避免改变业务正确性

为 memo/cache/virtualization 建回归测试和性能预算。

### Lesson RE-PERF-016：综合重构——修复 Workbench 的 Context Storm、Large List 与 Long Task

提交 Profiler/Trace before-after，而不是只提交“优化后代码”。

---

本 Module 一次讲透 memo、useMemo、useCallback 的语义、成本、依赖和错误优化，并为 React Compiler 做迁移前置。

### Lesson RE-MEMO-001：Memoization 到底缓存什么

区分 component result reuse、calculation result reuse、function identity reuse。

### Lesson RE-MEMO-002：第一个 React.memo

验证 Props 相同情况下跳过子 Component Render。

### Lesson RE-MEMO-003：memo 的浅比较意味着什么

制造 object/function prop 每次新 identity 导致 memo 失效。

### Lesson RE-MEMO-004：useMemo 什么时候真正有价值

缓存昂贵纯计算或稳定对象，而不是为了“看起来高级”。

### Lesson RE-MEMO-005：useCallback 并不会让函数执行更快

理解它只缓存 function identity。

### Lesson RE-MEMO-006：Dependency 写错为什么会缓存错误结果

制造 stale memo / stale callback 并由 Linter/测试发现。

### Lesson RE-MEMO-007：Memoization 本身有什么 CPU / Memory / Complexity 成本

建立“缓存也要付钱”的模型。

### Lesson RE-MEMO-008：什么时候移动 State / 拆 Component 比 memo 更好

优先结构优化而不是到处加缓存。

### Lesson RE-MEMO-009：自定义 arePropsEqual 为什么危险

讨论深比较、函数闭包和漏字段正确性风险。

### Lesson RE-MEMO-010：综合实验——Bad Memo Optimization

制造 memo 更多但更慢/更难维护的页面，再恢复到证据驱动策略。

---

本 Module 完整覆盖 Compiler 目标、自动 Memoization、Rules of React、Build Integration、Diagnostics、Bailout、Directive、Library、渐进迁移和 Benchmark，并完成性能段综合项目。

### Lesson RE-COMPILER-001：React Compiler 为什么存在

从手工 memoization 的认知成本和编译期分析能力理解目标。

### Lesson RE-COMPILER-002：Compiler 自动优化的心智模型

认识它如何利用代码规则推断可复用计算/组件，而不是把它理解成“自动加 useMemo”。

### Lesson RE-COMPILER-003：为什么 Rules of React 对 Compiler 更重要

把 pure render、immutability、hook rules 与静态分析连接起来。

### Lesson RE-COMPILER-004：在 Vite React 项目中启用 Compiler

完成正式 build integration，并验证产物/诊断。

### Lesson RE-COMPILER-005：如何确认某个组件真的被 Compiler 优化

使用 DevTools/编译输出/Profiler 建立验证方法。

### Lesson RE-COMPILER-006：Compiler Bailout 是什么

故意写不满足规则的代码，观察诊断和 fallback 行为。

### Lesson RE-COMPILER-007：eslint-plugin-react-hooks 如何帮助 Compiler-ready Code

把规则问题提前变成开发反馈。

### Lesson RE-COMPILER-008：`"use memo"` Directive 应该什么时候用

理解 opt-in/调试/边界场景，而不是全文件滥加。

### Lesson RE-COMPILER-009：`"use no memo"` Directive 应该什么时候用

用于兼容/定位问题，并明确不是永久逃避代码质量。

### Lesson RE-COMPILER-010：Manual memo 与 Compiler 如何共存

比较保留、删除和渐进迁移策略。

### Lesson RE-COMPILER-011：第三方 Library 与 Compiler Compatibility

理解 library precompilation、published output 和消费方版本边界。

### Lesson RE-COMPILER-012：Compiler 对 Mutation / Dynamic Pattern 有什么限制

用实际诊断连接到前面 pure/immutable 课程。

### Lesson RE-COMPILER-013：Compiler 优化是否一定让应用更快

用真实 workload 测量 CPU、memory、bundle 和 interaction，不以启用成功为验收。

### Lesson RE-COMPILER-014：大型旧项目如何渐进启用 Compiler

设计目录/feature pilot、metrics、exception 和 rollback。

### Lesson RE-COMPILER-015：Compiler 回归如何 Debug

固定 case、比较 compiled/uncompiled、最小复现和版本锁定。

### Lesson RE-COMPILER-016：综合项目——建立 Workbench Compiler Baseline

记录启用前后的 Profiler、INP、render count 和 bundle。

### Lesson RE-COMPILER-017：综合项目——删除无价值 Manual Memo

基于 Compiler 与测量逐个删/留 memo/useMemo/useCallback。

### Lesson RE-COMPILER-018：综合项目——性能段完整验收

提交 Context Storm、Large List、Long Task、Memo、Compiler 的 before-after 证据与决策说明。

---

# Module 11.19：React DOM 与 Portal

本 Module 聚焦 React 与真实 HTML/SVG/Custom Element/DOM API 的边界，并一次讲清 flushSync 等宿主整合能力。

### Lesson RE-DOM-001：React DOM Props 如何映射到 Attribute / Property

比较 value、checked、className、data-*、aria-* 等行为。

### Lesson RE-DOM-002：React 中原生 HTML Element 的受控行为有哪些特殊点

连接 Input/Form/Select 的宿主属性同步。

### Lesson RE-DOM-003：Style Prop 与 CSS 字符串有什么差异

理解 object、单位、vendor field 和动态 style 的性能/可维护性。

### Lesson RE-DOM-004：SVG 在 React 中有什么宿主差异

处理属性命名、namespace 和常用图形元素。

### Lesson RE-DOM-005：Custom Element / Web Component 如何与 React 互操作

比较 property、attribute、custom event、ref 和 shadow DOM。

### Lesson RE-DOM-006：dangerouslySetInnerHTML 为什么是特殊 DOM Escape Hatch

只建立 DOM API 语义，完整安全在 Security Module。

### Lesson RE-DOM-007：React 什么时候直接保留、什么时候更新真实 DOM

通过 DevTools Mutation 观察 Reconciliation 结果而非全量替换。

### Lesson RE-DOM-008：flushSync 到底强制了什么

在需要 DOM 立即更新的第三方浏览器 API 场景验证同步 Commit。

### Lesson RE-DOM-009：flushSync 为什么会破坏性能与并发收益

用连续强制同步更新制造主线程问题。

### Lesson RE-DOM-010：综合实现——React 与 Custom Element / DOM API 混合页面

明确哪些边界由 Props、Ref、Event、flushSync 负责。

---

本 Module 用 Portal 深化“React Tree ≠ DOM Tree”，覆盖事件、Context、Focus、Stacking Context、Modal/Overlay 和 A11Y。

### Lesson RE-PORTAL-001：为什么有些 UI 需要脱离父 DOM 层级

从 overflow/stacking/modal overlay 建立问题背景。

### Lesson RE-PORTAL-002：第一个 createPortal

把 Child DOM 渲染到外部 container，同时仍属于原 React Tree。

### Lesson RE-PORTAL-003：Portal 中 Context 为什么仍然可用

证明 Context 沿 React Tree 而不是 DOM Tree 传播。

### Lesson RE-PORTAL-004：Portal Event 为什么会冒泡到 React Parent

比较 DOM parent 与 React parent 的事件路径。

### Lesson RE-PORTAL-005：Modal Focus Trap 应该怎么设计

处理初始焦点、Tab 循环、关闭后恢复焦点。

### Lesson RE-PORTAL-006：Escape / Outside Click 如何正确关闭 Overlay

处理传播、pointer event 和 nested overlay。

### Lesson RE-PORTAL-007：Stacking Context 与 z-index 为什么不是 Portal 自动解决一切

连接 CSS stacking/positioning。

### Lesson RE-PORTAL-008：SSR / Hydration 中 Portal 有什么边界

讨论目标 container 存在时机和 client-only overlay。

### Lesson RE-PORTAL-009：Portal A11Y 需要哪些语义

覆盖 dialog role、aria-modal、label、background inert 等。

### Lesson RE-PORTAL-010：综合实现——可访问 Modal / Tooltip / Toast Portal Layer

建立统一 overlay root、focus、event 和 cleanup 策略。

---

# Module 11.20：Resource Loading 与 Metadata

本 Module 学习 React DOM 的资源提示与 Metadata 能力，并连接 SSR/Streaming/性能，而不是把它们孤立成 API 背诵。

### Lesson RE-RESOURCE-001：浏览器为什么需要 Resource Hint

复习 connection setup、discovery time、critical resource。

### Lesson RE-RESOURCE-002：preconnect 什么时候有价值

为跨域 API/font/CDN 提前建立连接，并测量连接时序。

### Lesson RE-RESOURCE-003：preload 适合什么资源

处理 font/image/script/style 的优先发现与错误用法。

### Lesson RE-RESOURCE-004：preinit 与 preload 有什么区别

理解“只下载”与“准备执行/应用”的高层语义。

### Lesson RE-RESOURCE-005：Module Preload 如何影响 ESM Chunk

连接 Vite split chunk / route lazy。

### Lesson RE-RESOURCE-006：React 资源 API 如何去重

多个组件声明同一资源时观察最终 DOM。

### Lesson RE-RESOURCE-007：Title / Meta 如何由 React Component 声明

建立 Metadata 与页面树/路由/SSR 的关系。

### Lesson RE-RESOURCE-008：Nested Metadata 冲突应该怎么处理

讨论 route/page ownership 和重复 tag。

### Lesson RE-RESOURCE-009：Resource Hint 不是越多越好

观察带宽竞争、错误优先级和无效预加载。

### Lesson RE-RESOURCE-010：综合实现——为 React 页面建立 Metadata + Critical Resource Strategy

用 Network waterfall 验证实际收益。

---

# Module 11.21：React Error Model

本 Module 系统区分 Render、Event、Async、Resource、Route、Root、Server 错误，并设计 Error Boundary、Reset、Fallback 和 Production Reporting。

### Lesson RE-ERROR-001：React 应用中到底有哪些错误来源

建立 Render/Event/Async/Network/Resource/Server/Chunk 分类表。

### Lesson RE-ERROR-002：Error Boundary 能捕获什么

用 Render Error 建立最小 Boundary。

### Lesson RE-ERROR-003：Error Boundary 捕获不了什么

验证 Event Handler、任意异步 callback 等边界。

### Lesson RE-ERROR-004：Nested Error Boundary 如何隔离局部页面

比较 App-level、Route-level、Widget-level fallback。

### Lesson RE-ERROR-005：Error Fallback 应该如何提供 Recovery

设计 retry/reset/back/reload/report，而不是只显示“出错了”。

### Lesson RE-ERROR-006：Reset Error Boundary 与 State Identity 怎么连接

用 key / state reset 重新创建失败子树。

### Lesson RE-ERROR-007：Suspense 与 Error Boundary 如何组合

同一 Resource pending/rejected 的两条路径。

### Lesson RE-ERROR-008：Chunk Load Failure 应该怎么恢复

模拟 lazy chunk 加载失败、版本发布和 reload/update UX。

### Lesson RE-ERROR-009：Root Error Callback 适合做什么 Observability

把 caught/uncaught/recoverable error 连接日志、trace、release 信息。

### Lesson RE-ERROR-010：错误日志中不能遗漏哪些上下文

Route、user-safe id、tenant、release、trace、feature flag、component stack。

### Lesson RE-ERROR-011：错误报告如何避免泄漏敏感数据

在 React-specific context 中建立 redaction 原则。

### Lesson RE-ERROR-012：综合实现——多层 Error Recovery Architecture

为 Enterprise SPA 配置 root/route/widget boundary 和统一报告合同。

---

# Module 11.22：React-specific Accessibility、Security 与 Debugging

本 Module 不重教完整 Web A11Y，而是聚焦 React 动态 UI、Portal、Route、Suspense、Virtualization、useId 与 Focus 管理的框架连接点。

### Lesson RE-A11Y-001：动态 React UI 为什么更容易破坏 Focus

观察条件 Render、Remount、Route 切换导致焦点丢失。

### Lesson RE-A11Y-002：useId 解决什么问题

为 label/input/aria relationship 生成稳定 ID，并连接 SSR hydration consistency。

### Lesson RE-A11Y-003：Modal / Portal 的 Focus Lifecycle

处理打开、trap、关闭恢复和 background inert。

### Lesson RE-A11Y-004：Route Navigation 后焦点应该去哪里

为 SPA 页面切换提供可感知的 heading/focus 策略。

### Lesson RE-A11Y-005：Suspense Loading 如何让 Screen Reader 感知

设计 loading semantics、live region、避免焦点突然消失。

### Lesson RE-A11Y-006：Error Boundary Fallback 如何保持可访问

提供焦点、错误说明和恢复动作。

### Lesson RE-A11Y-007：Dynamic Validation Error 如何宣布

连接 Form 的 aria-describedby / live region。

### Lesson RE-A11Y-008：Keyboard-first Component 如何测试

对 menu/dialog/listbox 等复合交互验证 Tab/Arrow/Escape。

### Lesson RE-A11Y-009：Virtualized List 有什么 A11Y 风险

讨论 DOM 缺项、screen reader navigation、focus offscreen 和 item count。

### Lesson RE-A11Y-010：Activity / Hidden UI 的可访问树如何处理

确保不可见区域不会错误参与交互。

### Lesson RE-A11Y-011：React Component API 如何内建 A11Y Guardrail

设计 label required、role/aria props、headless behavior contract。

### Lesson RE-A11Y-012：综合验收——对 Enterprise SPA 做 React-specific A11Y Audit

结合键盘、axe 类工具和手工 screen-reader-friendly 检查记录问题。

---

本 Module 聚焦 React 渲染、HTML、URL、Markdown、SSR/Hydration、RSC、Server Function 与权限 UI 的安全边界。

### Lesson RE-SEC-001：React 默认 Escaping 能防什么 XSS

用字符串插值验证文本被转义，并明确它不是完整安全系统。

### Lesson RE-SEC-002：dangerouslySetInnerHTML 为什么危险

注入恶意 HTML 并建立 Trusted Sanitization 的必要性。

### Lesson RE-SEC-003：Markdown / Rich Text 为什么必须按“不可信 HTML”处理

比较 parser、sanitizer、allowlist 和 plugin 风险。

### Lesson RE-SEC-004：URL / href / src 也可能成为攻击输入

处理 javascript/data scheme、open redirect 和 external link。

### Lesson RE-SEC-005：React Component Props 也能形成 Injection Boundary

审查 style、HTML、URL、event-like config 等高风险 Props API。

### Lesson RE-SEC-006：CSP / Trusted Types 与 React 如何配合

建立浏览器安全策略对 DOM sink 的保护层。

### Lesson RE-SEC-007：Client Permission UI 为什么不是 Authorization

隐藏按钮不能阻止直接请求，权限必须在 server mutation 验证。

### Lesson RE-SEC-008：SSR HTML Injection 风险在哪里

处理用户内容、metadata、script data serialization。

### Lesson RE-SEC-009：Hydration Payload 如何避免闭合 script / 数据注入

建立安全序列化与 escaping 边界。

### Lesson RE-SEC-010：RSC 为什么可能泄漏 Server-only Data

分析 Server Component props/serialization/client boundary。

### Lesson RE-SEC-011：Server Function 为什么每次都必须重新授权

把它当公开网络入口而不是“只能被自己组件调用”。

### Lesson RE-SEC-012：CSRF / Cookie Auth 与 Form/Server Action 的连接点

理解浏览器凭证自动携带带来的保护需求。

### Lesson RE-SEC-013：Sensitive Data 不应该进入哪些 React State / DevTools / Log

建立最小数据暴露原则。

### Lesson RE-SEC-014：综合 Threat Review——React 页面从 Input 到 Server Mutation

画出 trust boundary、验证点、渲染 sink 和授权点。

---

本 Module 不重复教授每个 Bug 的机制，而是建立跨 React 问题的系统诊断方法：症状分类、最小复现、DevTools、Profiler、Network、Heap、Source Map、Release/Trace 关联。

### Lesson RE-DEBUG-001：React Bug 应该先按哪几类症状分类

区分错误 UI、状态错位、重复 Render、卡顿、泄漏、异步乱序、Hydration、Chunk/Network。

### Lesson RE-DEBUG-002：如何制作最小 React Reproduction

删除业务噪音、固定数据和时间，保留导致问题的最小因果链。

### Lesson RE-DEBUG-003：Wrong Key Bug 的标准诊断路径

用 Component identity / mount log / DevTools 证明状态错位。

### Lesson RE-DEBUG-004：Infinite Render 与 Infinite Effect 怎么快速区分

根据调用栈、错误信息和 render/effect log 定位循环来源。

### Lesson RE-DEBUG-005：Stale Closure / Race 应该如何画时间线

让异步 Bug 从“偶现”变成可重复顺序问题。

### Lesson RE-DEBUG-006：Context Render Storm 如何用 Profiler 证明

定位 provider value 与 consumer 范围。

### Lesson RE-DEBUG-007：Chunk Load Failure 如何关联一次发布

结合 Network、asset hash、release、cache/CDN 信息定位。

### Lesson RE-DEBUG-008：Hydration Mismatch 应该从哪三份证据对比

比较 server HTML、client first render input、browser-modified DOM。

### Lesson RE-DEBUG-009：Suspense Waterfall 如何从 Network / Trace 看出来

识别串行资源启动。

### Lesson RE-DEBUG-010：Memory Leak 如何使用 Heap Snapshot / Retainer Path

定位 retained component data、DOM、listener、third-party instance。

### Lesson RE-DEBUG-011：Source Map 如何帮助线上 React Stack

把 minified stack 映射回源码和 release。

### Lesson RE-DEBUG-012：为什么“加 console.log”有时会误导并发问题

建立时间戳、render id、structured log 和 Profiler 证据优先。

### Lesson RE-DEBUG-013：Bug 修复以后如何防止回归

为每类问题选择 Unit/Integration/E2E/Performance regression evidence。

### Lesson RE-DEBUG-014：综合演练——随机抽取五类 React 故障完成定位报告

每个报告必须包含复现、证据、根因、修复、回归验证。

---

# Module 11.23：React Testing Integration

本 Module 只覆盖 React-specific 测试方法，把 Component 行为、用户交互、Hook、Context、Router、Query、Suspense、Error Boundary、Timer 和 Hydration 的可验证性串起来。

### Lesson RE-TEST-001：React 测试应该验证实现还是用户行为

建立用户可观察输出优先原则。

### Lesson RE-TEST-002：第一个 Component Render Test

查询文本/role/label，而不是依赖 className/内部 State。

### Lesson RE-TEST-003：User Event 如何验证真实交互链

覆盖 click/type/keyboard/tab 与异步 UI。

### Lesson RE-TEST-004：如何测试 Controlled Form 与 Validation

验证用户输入、错误、submit、focus。

### Lesson RE-TEST-005：如何测试 Reducer / Pure State Logic

把纯业务转换脱离 React 快速验证。

### Lesson RE-TEST-006：如何测试 Context Consumer

通过最小 Provider wrapper 注入 dependency。

### Lesson RE-TEST-007：Custom Hook 什么时候值得单独测试

区分可通过组件行为覆盖与 library hook contract。

### Lesson RE-TEST-008：Router 测试如何建立 Memory History / Initial Entry

验证 route match、params、navigation、404/error。

### Lesson RE-TEST-009：Query 测试如何隔离 QueryClient

避免 cache 泄漏跨测试，并控制 retry/time。

### Lesson RE-TEST-010：Suspense 测试如何等待 fallback 与 reveal

验证 pending→content/error 路径。

### Lesson RE-TEST-011：Error Boundary 如何测试捕获与恢复

注入会失败的 child 并验证 retry/reset。

### Lesson RE-TEST-012：Fake Timer 什么时候适合，什么时候破坏真实调度

处理 debounce/timer，不把 React Scheduler 全部假掉。

### Lesson RE-TEST-013：Hydration / SSR React-specific Test 验证什么

比较 server markup、hydrate、recoverable warning。

### Lesson RE-TEST-014：建立 React Test Matrix

为 state/form/router/query/suspense/error/SSR 各定义最小必要测试层，完整质量工程后续 Stage 再扩展。

---

# Module 11.24：SSR、Hydration、Streaming 与 Prerender

本 Module 不依赖 Next.js 黑盒，从 React Server Renderer 开始建立 Request → React Tree → HTML/Stream → Browser 的完整模型。

### Lesson RE-SSR-001：为什么 CSR 之外还需要 Server Rendering

从首屏、SEO、弱设备、数据位置和成本讨论动机与 trade-off。

### Lesson RE-SSR-002：SSR 并不意味着 React 在浏览器消失

区分服务器生成 HTML 与客户端交互接管。

### Lesson RE-SSR-003：第一个 React Server Render

在 Node 环境把 React Tree 转成 HTML。

### Lesson RE-SSR-004：Server Component Function 与 Client Component Function 在 SSR 时怎么理解

先只讨论传统 SSR 中服务器执行 render，不提前混入 RSC。

### Lesson RE-SSR-005：Server Render 能访问哪些环境，不能访问哪些浏览器 API

处理 window/document/localStorage 边界。

### Lesson RE-SSR-006：Request-specific Data 如何进入 React Tree

避免全局变量导致跨请求/租户数据泄漏。

### Lesson RE-SSR-007：renderToPipeableStream / renderToReadableStream 高层区别

认识 Node Stream 与 Web Stream 部署环境。

### Lesson RE-SSR-008：Shell 是什么

理解可以先发送可完成的页面骨架。

### Lesson RE-SSR-009：SSR Error 应该在哪个阶段处理

区分 shell 前失败、stream 中失败、client hydrate 错误。

### Lesson RE-SSR-010：Abort SSR Request 为什么重要

处理客户端断开、超时和慢资源。

### Lesson RE-SSR-011：SSR 对 TTFB / HTML Size / CPU 有什么成本

建立服务端容量与前端体验 trade-off。

### Lesson RE-SSR-012：SSR 与 SEO 的真实关系

区分 HTML 可见、metadata、crawler、JS execution 和内容质量。

### Lesson RE-SSR-013：SSR 与 Cache/CDN 如何连接

建立 public/private HTML、Vary、tenant/user personalized boundary。

### Lesson RE-SSR-014：输出一次 React SSR Request 的运行位置图

标出 server-only、shared、client-only code 和数据。

---

本 Module 完整学习 hydrateRoot、HTML Identity、Event、Mismatch、Date/Random/Locale、useId、Browser Extension/DOM Mutation、Recoverable Error 和性能。

### Lesson RE-HYDRATE-001：Hydration 到底“复用”了什么

已有 DOM 不重新从空创建，而由 React 将客户端树与服务器 HTML 对齐并接管。

### Lesson RE-HYDRATE-002：第一个 hydrateRoot

从 server HTML 到 client interactive 完成最小链路。

### Lesson RE-HYDRATE-003：Hydration 与 createRoot 为什么不能互换

在同一 server markup 上比较行为和 DOM 重建风险。

### Lesson RE-HYDRATE-004：Hydration Mismatch 的根条件是什么

服务器输出与客户端首次 Render 结果不一致。

### Lesson RE-HYDRATE-005：Date / Math.random 为什么会制造 Mismatch

用非确定 Render 实验连接 Pure Render。

### Lesson RE-HYDRATE-006：Locale / Timezone 为什么是更隐蔽的 Mismatch 来源

比较服务器和浏览器地区格式化结果。

### Lesson RE-HYDRATE-007：Browser-only API 如何安全进入 SSR App

区分首 Render、Effect/client boundary 和 server-safe fallback。

### Lesson RE-HYDRATE-008：useId 如何保证 Server/Client ID 一致

连接 Root identifierPrefix 和多 Root 场景。

### Lesson RE-HYDRATE-009：Hydration 时 Event 如何恢复交互

建立事件注册/接管高层模型。

### Lesson RE-HYDRATE-010：Browser Extension / CDN Rewrite 也可能制造 Mismatch

学习从 server raw HTML 与浏览器实际 DOM 比较外部修改。

### Lesson RE-HYDRATE-011：suppressHydrationWarning 为什么只能是最后手段

明确可预期不可避免差异和隐藏真实 Bug 的风险。

### Lesson RE-HYDRATE-012：onRecoverableError 如何进入生产诊断

记录 mismatch/recovery 与 route/release context。

### Lesson RE-HYDRATE-013：Hydration Performance 应该测什么

观察 HTML 可见时间、JS 下载、main-thread hydrate、可交互时间。

### Lesson RE-HYDRATE-014：综合故障——系统定位五类 Hydration Mismatch

从 server input、client input、DOM、locale、random 五条线排查。

---

本 Module 学习 React 如何利用 Suspense Boundary 把 Server HTML 分段输出，并覆盖 Shell、Chunk、Backpressure、Abort、Proxy Buffering、Crawler 和失败恢复。

### Lesson RE-STREAMSSR-001：为什么一次等完整 HTML 再发送会产生 Waterfall

建立服务端数据等待与 TTFB 问题。

### Lesson RE-STREAMSSR-002：Suspense Boundary 如何成为 Streaming Segment

慢子树 pending 时先输出 fallback/shell。

### Lesson RE-STREAMSSR-003：Shell Ready 与 All Ready 分别代表什么

决定何时开始向普通用户和特殊消费者发送。

### Lesson RE-STREAMSSR-004：后续 HTML Chunk 如何替换/揭示 Boundary

观察真实响应流和浏览器 DOM 更新。

### Lesson RE-STREAMSSR-005：Bootstrap Script / Client Bundle 如何接入 Stream

建立 server HTML 与 client hydration 的连接。

### Lesson RE-STREAMSSR-006：Backpressure 为什么是生产 Stream 必须考虑的问题

理解消费者慢、网络慢和服务端写入节奏。

### Lesson RE-STREAMSSR-007：Abort 慢 Boundary 如何保证页面仍然可用

超时后让客户端接管剩余内容。

### Lesson RE-STREAMSSR-008：Stream 中错误发生在 Shell 前后有何区别

设计 status code、fallback、logging。

### Lesson RE-STREAMSSR-009：Reverse Proxy Buffering 为什么可能让“流式”失效

通过代理配置观察 chunk 被缓存后一次性返回。

### Lesson RE-STREAMSSR-010：Crawler / Bot 是否总应该走完整等待

讨论 SEO、TTFB、资源预算和策略。

### Lesson RE-STREAMSSR-011：Streaming SSR Waterfall 如何诊断

从 server trace、data start time、boundary reveal 定位串行资源。

### Lesson RE-STREAMSSR-012：综合实现——三层 Suspense Streaming Page

主动加入快/中/慢数据并验证 Shell、Reveal、Abort、Error。

---

本 Module 学习 React 静态预渲染能力、Hydration、CDN、PPR/Resume 等版本敏感能力的设计边界，并完成从零 React SSR App 综合项目。

### Lesson RE-STATIC-001：Static Rendering 与 Request-time SSR 有什么区别

比较构建时、请求时、数据 freshness 和部署成本。

### Lesson RE-STATIC-002：第一个 prerender

把可完成的 React Tree 生成静态 HTML/预加载信息。

### Lesson RE-STATIC-003：Static HTML 最终为什么仍可能需要 Hydration

区分纯静态内容和客户端交互。

### Lesson RE-STATIC-004：静态页面如何安全缓存到 CDN

讨论 content hash、revalidation、personalization boundary。

### Lesson RE-STATIC-005：Partial Prerendering 解决什么问题

建立静态 shell + 动态区域的架构动机。

### Lesson RE-STATIC-006：Postponed State / Resume 的高层模型

理解预渲染暂停点与后续请求继续工作；底层 API 按正式写课时稳定版本锁定。

### Lesson RE-STATIC-007：PPR / Resume 为什么必须严格锁 React / Framework 版本

认识版本敏感底层集成与生产风险。

### Lesson RE-STATIC-008：Static / SSR / CSR / RSC 应该怎么选

从 personalization、freshness、SEO、server cost、interaction 做矩阵。

### Lesson RE-STATIC-009：综合项目——从空目录搭 React SSR Runtime

不用 Next.js，建立 server entry、client entry、HTML shell 和 build。

### Lesson RE-STATIC-010：综合项目——接入 hydrateRoot 与交互

验证 Server HTML → Browser Visible → Client 接管。

### Lesson RE-STATIC-011：综合项目——加入 Suspense Streaming

观察真实 Response Chunk 和 boundary reveal。

### Lesson RE-STATIC-012：综合项目——制造 Hydration Mismatch 与 Abort

完成证据化定位和恢复。

### Lesson RE-STATIC-013：综合项目——加入可静态预渲染页面

比较 Static 与 Request SSR 的产物/运行成本。

### Lesson RE-STATIC-014：综合项目——React SSR App 完整验收

输出运行位置图、stream timeline、hydration evidence、cache policy 和 failure report。

---

# Module 11.25：RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture

本 Module 一次建立 Server Component、Client Component、SSR、RSC Payload、Build/Request-time、Bundle/Data Boundary，并坚决避免把 RSC 等同于 SSR。

### Lesson RE-RSC-001：RSC 为什么出现

从 server-only data/code、client bundle、component composition 的问题域理解设计目标。

### Lesson RE-RSC-002：Server Component 与 SSR Component 是同一个概念吗

用运行阶段和输出物区分 RSC 与 HTML Rendering。

### Lesson RE-RSC-003：Client Component 真正意味着什么

理解它进入 Client Module Graph、可用 State/Event/Browser API，不意味着只在浏览器第一次执行。

### Lesson RE-RSC-004：Server Component 可以直接访问什么

DB、filesystem、secret-bearing server service 的边界与安全责任。

### Lesson RE-RSC-005：Server Component 为什么不能使用 useState / Event Handler

从运行环境和序列化/交互需求解释，而不是背禁用列表。

### Lesson RE-RSC-006：RSC Payload 是什么高层结构

认识它描述 Server Tree、Client Reference 和数据，而不是 HTML。

### Lesson RE-RSC-007：RSC 与 HTML SSR 如何串起来

建立 Server Component Tree → RSC Result → Server Renderer → HTML 的可能框架流程。

### Lesson RE-RSC-008：Async Server Component 为什么自然

直接 await data 并把异步边界交给 server rendering / Suspense。

### Lesson RE-RSC-009：Build-time 与 Request-time Server Component 有什么区别

比较静态数据和请求上下文。

### Lesson RE-RSC-010：Server Component 如何减少 Client Bundle

把 server-only dependency 留在服务器，并用 bundle report 验证。

### Lesson RE-RSC-011：Server Component 不是“自动更快”

讨论 server latency、serialization、waterfall、cache 和 deployment。

### Lesson RE-RSC-012：RSC 与 SEO 没有直接一一对应关系

区分最终 HTML 是否由 SSR 输出。

### Lesson RE-RSC-013：RSC Error / Suspense Boundary 如何理解

建立 server execution failure 与 client-visible boundary 的关系。

### Lesson RE-RSC-014：RSC Debugging 首先要知道代码到底在哪运行

设计 server/client log 标识和运行位置图。

### Lesson RE-RSC-015：RSC 底层 Bundler API 为什么是框架作者边界

正式课程固定具体 React 版本研究，不把内部协议当业务稳定 API。

### Lesson RE-RSC-016：画出一棵混合 Server/Client Component Tree

标注 module graph、data flow、bundle inclusion 和 HTML/RSC 输出。

---

本 Module 深入 `"use client"`、Module Graph、Serialization、Props、Browser API、Context、Bundle 与 Boundary Placement。

### Lesson RE-BOUNDARY-001：`"use client"` 标记的是 Component 还是 Module Boundary

理解入口模块及其依赖进入 Client Graph。

### Lesson RE-BOUNDARY-002：为什么 Boundary 位置会影响 Client Bundle

移动 directive 并比较依赖图。

### Lesson RE-BOUNDARY-003：Server → Client Props 为什么必须可序列化

制造 Function/Class/复杂对象传递错误并解释边界。

### Lesson RE-BOUNDARY-004：Event Handler 为什么只能存在 Client side 交互子树

从 function 不能跨序列化边界理解。

### Lesson RE-BOUNDARY-005：Context Provider 应该放在哪一侧

处理 theme/session-like client context 与 server data。

### Lesson RE-BOUNDARY-006：Browser-only Library 如何隔离

把 editor/chart/map 放进小 Client island，而不是整页 client 化。

### Lesson RE-BOUNDARY-007：Server-only Library 如何防止被 Client import

建立 module boundary / build guard / secret safety。

### Lesson RE-BOUNDARY-008：Client Component 能不能包含 Server Component

通过 children/composition 理解“import”与“由 server 传入 element”的区别。

### Lesson RE-BOUNDARY-009：Boundary Placement 如何平衡交互与 Bundle

用 Dashboard 逐步下沉 client boundary。

### Lesson RE-BOUNDARY-010：Boundary 过多有什么代价

讨论 serialization、mental model、loading、module graph complexity。

### Lesson RE-BOUNDARY-011：Boundary Security Review 应检查什么

Server secret、serialized props、auth context、tenant data。

### Lesson RE-BOUNDARY-012：综合重构——把一个全 Client Page 拆成 Server-first + Client Islands

用 bundle/data flow 证据证明边界变化。

---

本 Module 完整学习 `"use server"`、Server Reference、调用/序列化、Validation、Authorization、Mutation、错误、幂等、审计和安全边界。

### Lesson RE-SERVERFN-001：Server Function 解决什么问题

让 Client 通过框架协议触发 Server-side async function，同时保留安全网络边界意识。

### Lesson RE-SERVERFN-002：`"use server"` 到底声明什么

区分 module/function directive 与普通 server-only helper。

### Lesson RE-SERVERFN-003：Client 拿到的不是普通跨网络 Function Object

建立 Server Reference / framework transport 高层模型。

### Lesson RE-SERVERFN-004：参数和返回值为什么必须可序列化

验证复杂参数边界并设计 DTO。

### Lesson RE-SERVERFN-005：Server Function 必须重新做 Validation

客户端 TypeScript / Form 校验不能替代服务器校验。

### Lesson RE-SERVERFN-006：Server Function 必须重新做 Authorization

直接构造调用验证隐藏按钮完全不构成权限保护。

### Lesson RE-SERVERFN-007：Tenant Context 如何安全解析

禁止信任客户端随意传 tenantId 而跳过 membership 校验。

### Lesson RE-SERVERFN-008：Mutation 事务边界怎么设计

处理多步写入、失败和部分成功。

### Lesson RE-SERVERFN-009：Idempotency 如何处理重复提交

对高风险 mutation 设计 idempotency key / unique constraint。

### Lesson RE-SERVERFN-010：Server Function Error 如何返回 Client UX

区分 validation result、expected business error、unexpected exception。

### Lesson RE-SERVERFN-011：Server Function 与 useActionState / Form Action 如何组合

完成完整提交状态链。

### Lesson RE-SERVERFN-012：Server Function 与 Cache Invalidation 如何连接

写后刷新/失效对应资源。

### Lesson RE-SERVERFN-013：Server Function Observability 应记录什么

trace、actor、tenant、operation、result、latency，不记录 secret payload。

### Lesson RE-SERVERFN-014：综合攻击实验——Unauthorized / Duplicate / Invalid Mutation

主动绕过 UI、重复请求、伪造参数，验证服务器防线。

---

本 Module 把 Server Async、Promise 传递、RSC Stream、Client use()、Suspense/Error Boundary 串成完整异步数据路径。

### Lesson RE-RSCUSE-001：Server 直接 await 与把 Promise 传给 Client 有何区别

比较阻塞 server subtree 与让 client boundary 使用 use() suspend。

### Lesson RE-RSCUSE-002：稳定 Promise 如何跨 Boundary 传递

建立 Promise ownership 和 serialization/framework transport 模型。

### Lesson RE-RSCUSE-003：Client use(Promise) 如何进入 Suspense

观察 pending、fulfilled、rejected 三条路径。

### Lesson RE-RSCUSE-004：多个 Promise 如何并行启动避免 Waterfall

先创建资源再组合 tree。

### Lesson RE-RSCUSE-005：Nested Boundary 如何设计 reveal

按用户感知依赖划分，而不是按 API 个数划分。

### Lesson RE-RSCUSE-006：Server Error 与 Client Error Boundary 如何连接

验证 rejected resource 的呈现和恢复。

### Lesson RE-RSCUSE-007：Transition 导航到新 RSC Tree 时用户看到什么

建立旧 UI、pending tree、新 payload 的高层模型。

### Lesson RE-RSCUSE-008：RSC Streaming 如何与 HTML Streaming 区分

明确两种不同流内容和消费者。

### Lesson RE-RSCUSE-009：综合实现——Server Promise → Client use() → Suspense Dashboard

验证并行、错误、nested reveal 和 boundary placement。

### Lesson RE-RSCUSE-010：异步边界图验收

为一次请求标出 Promise 创建、RSC、HTML、Client Hydration 和 use() 的位置。

---

本 Module 负责 Server Component 数据访问、Service Layer、Cache、Invalidation、Auth/Tenant、N+1、Waterfall、Serialization、Observability，并完成 Full-stack React Runtime 综合项目。

### Lesson RE-RSCDATA-001：Server Component 应该直接查 DB 还是走 Service Layer

从复用、授权、事务、测试和架构边界比较。

### Lesson RE-RSCDATA-002：Request Memoization 与跨请求 Cache 是同一个东西吗

区分单请求去重和共享缓存生命周期。

### Lesson RE-RSCDATA-003：Cache Key 必须包含哪些 Security Context

处理 tenant/user/permission/locale 避免数据串用。

### Lesson RE-RSCDATA-004：RSC N+1 是怎么产生的

列表子组件逐个读取数据制造查询放大。

### Lesson RE-RSCDATA-005：DataLoader / Batch / Join / Prefetch 如何解决 N+1

根据数据源选择聚合策略。

### Lesson RE-RSCDATA-006：RSC Waterfall 与 Component Composition 的关系

嵌套 async component 串行发现数据时测量延迟。

### Lesson RE-RSCDATA-007：Cache Invalidation 为什么比 Cache Read 更难

建立 mutation→affected key/tag→refresh 的关系。

### Lesson RE-RSCDATA-008：Authorization 应该在 Component 还是 Service

强调 UI component 可以决定呈现，但 server data/mutation 必须在可复用安全边界验证。

### Lesson RE-RSCDATA-009：Serialization Cost 如何影响 RSC Payload

避免把巨大对象/重复字段无脑传 Client。

### Lesson RE-RSCDATA-010：Secret / Internal Object 如何保证不跨 Client Boundary

做 Data Leak Review。

### Lesson RE-RSCDATA-011：RSC Observability 如何串联 DB / Cache / Render / Stream

设计 trace span 和 boundary timing。

### Lesson RE-RSCDATA-012：综合项目——Full-stack React Runtime 运行时骨架

从零连接 SSR、RSC、Client Component、Server Function，不使用 Next.js 黑盒。

### Lesson RE-RSCDATA-013：综合项目——加入 Auth/Tenant/Cache/Data Boundary

验证 Server-only data 和 client serialization。

### Lesson RE-RSCDATA-014：综合项目——加入 Suspense/Streaming/use()

观察 RSC/HTML 两类流和异步 reveal。

### Lesson RE-RSCDATA-015：综合项目——制造 N+1、Waterfall、Unauthorized Mutation、Data Leak Risk

完成证据化定位和修复。

### Lesson RE-RSCDATA-016：综合项目——Full-stack React Runtime 完整验收

输出 Server/Client Boundary 图、RSC Payload 分析、Cache Map、Threat Notes 和 Trace。

---

# Module 11.26：React Source Research 与 Fiber Model

本 Module 先建立可重复源码研究方法，再进入 Fiber。目标是避免“搜索源码名词然后背结论”。

### Lesson RE-SOURCE-001：为什么源码学习必须固定 React Version / Commit

保证文件、调用链和实验结果可重复。

### Lesson RE-SOURCE-002：React 仓库 Packages 大地图怎么看

认识 react、react-dom、reconciler、scheduler、server 等主要边界。

### Lesson RE-SOURCE-003：如何构建可 Debug 的 React 本地版本

建立开发 build、fixture/test 和 Source Map。

### Lesson RE-SOURCE-004：如何让自己的最小 Demo 使用本地 React Build

避免 Debug 到 npm 压缩/不同版本代码。

### Lesson RE-SOURCE-005：源码问题必须先写 Hypothesis

例如“setState 后 Update 存在哪里”，先提出可验证猜测。

### Lesson RE-SOURCE-006：如何选择第一个断点而不是到处单步

从公开 API / dispatch / schedule / commit 入口逐层缩小。

### Lesson RE-SOURCE-007：Call Stack、Object Snapshot、Conditional Breakpoint 怎么配合

记录关键对象而不是只截图代码行。

### Lesson RE-SOURCE-008：如何使用 Git Blame / Commit 历史理解代码意图

把当前实现与设计演进连接，但不把历史当稳定 API。

### Lesson RE-SOURCE-009：源码结论如何通过第二个实验反证

改变 key、priority、hook type 等输入验证机制不是偶然。

### Lesson RE-SOURCE-010：建立统一 React Source Debug Report 模板

包含版本、问题、复现、断点、调用链、对象、结论、边界和未验证项。

---

本 Module 从 Fiber 为什么存在一路深入 Node 字段、树链接、current/workInProgress、alternate、flags、lanes、memoized state/props、updateQueue 和调试观察。

### Lesson RE-FIBER-001：Stack Reconciler 的限制为什么催生 Fiber

从可中断工作和优先级调度理解设计动机。

### Lesson RE-FIBER-002：Fiber Node 是什么对象

在源码和运行快照中定位 Fiber 基本字段。

### Lesson RE-FIBER-003：child / sibling / return 如何表示树

把普通多叉树映射为 Fiber 链接结构。

### Lesson RE-FIBER-004：Fiber 为什么没有简单 parent.children 数组

从遍历/工作单元结构理解链接设计。

### Lesson RE-FIBER-005：tag / elementType / type 分别表达什么

比较 Host、Function Component 等 Fiber 类型信息。

### Lesson RE-FIBER-006：pendingProps 与 memoizedProps 有何差异

观察当前输入和已完成输入。

### Lesson RE-FIBER-007：memoizedState 为什么不只表示 useState

认识 Function Hook 链、Class/HostRoot 等不同含义。

### Lesson RE-FIBER-008：updateQueue 在不同 Fiber 上承担什么

先建立 HostRoot/Function Effect/State Update 的多种队列概念。

### Lesson RE-FIBER-009：flags / subtreeFlags 解决什么 Commit 问题

理解 Render 阶段标记副作用、Commit 阶段快速遍历。

### Lesson RE-FIBER-010：lanes 字段为什么属于 Fiber

记录该节点/子树待处理优先级工作。

### Lesson RE-FIBER-011：current 与 workInProgress 为什么需要两棵树

建立双缓冲树与原子 Commit 模型。

### Lesson RE-FIBER-012：alternate 如何连接两棵 Fiber

通过更新前后快照观察对应关系。

### Lesson RE-FIBER-013：Fiber 与 React Element 为什么不是一回事

Element 是本次 UI 描述，Fiber 是跨 Render 保存运行工作/状态的节点。

### Lesson RE-FIBER-014：Fiber 与 DOM Node 如何连接

观察 stateNode 等宿主关联。

### Lesson RE-FIBER-015：一个 Function Component 的 Hook State 在 Fiber 哪里

连接 memoizedState 到 Hook linked list，详细结构留 11.66。

### Lesson RE-FIBER-016：综合源码观察——打印一棵最小 App Fiber Tree

记录 type/tag/child/sibling/return/alternate/flags/lanes，并与 Element/DOM Tree 对照。

---

# Module 11.27：Reconciler 与 Render / Commit Pipeline

本 Module 一次学习 Element → Fiber、beginWork、completeWork、Child Reconciliation、Key、Placement/Delete/Reuse、Bailout 和 Diff，并用源码验证前面 Key/Identity 结论。

### Lesson RE-RECON-001：Reconciliation 真正比较的输入和输出是什么

当前 Fiber Tree + 新 Element 描述 → workInProgress Tree / effects。

### Lesson RE-RECON-002：beginWork 的职责是什么

根据 Fiber 类型和新输入决定子工作。

### Lesson RE-RECON-003：Function Component 在 beginWork 中如何被调用

跟踪 renderWithHooks 等入口高层路径。

### Lesson RE-RECON-004：reconcileChildren 在 mount/update 有何区别

观察是否追踪 Placement/Delete effects。

### Lesson RE-RECON-005：单个 Child Element 如何复用旧 Fiber

比较 type/key 条件。

### Lesson RE-RECON-006：Array Children 为什么需要 Key

直接断点验证 key 对 old fiber 匹配的影响。

### Lesson RE-RECON-007：Index Key Bug 在源码中如何出现

让数据重排后旧 Fiber 按位置被复用。

### Lesson RE-RECON-008：Random Key 为什么导致 Remount

观察旧 Fiber delete + 新 Fiber placement。

### Lesson RE-RECON-009：Placement Flag 什么时候被标记

区分新建、移动、保留。

### Lesson RE-RECON-010：Deletion 如何收集和提交

跟踪被移除 subtree 的 effect。

### Lesson RE-RECON-011：completeWork 的职责是什么

处理 Host instance、bubble flags/lanes 等完成工作。

### Lesson RE-RECON-012：Bailout 什么时候可以跳过子树

理解 props/lanes/context 等条件的高层逻辑。

### Lesson RE-RECON-013：React Diff 为什么不是“全树 O(n³) 最优算法”

理解基于 type/key 的工程启发式和约束。

### Lesson RE-RECON-014：Component Identity / State Preservation 在 Reconciler 哪验证

把 11.13 的行为模型对应到 fiber reuse/reset。

### Lesson RE-RECON-015：综合源码调试——列表插入/删除/重排三条路径

分别记录 reuse/placement/deletion 的 Fiber 变化。

### Lesson RE-RECON-016：输出 Reconciliation Decision Table

以 type/key/position/lanes 为输入总结可验证结果和边界。

---

本 Module 跑通 Schedule → Render → beginWork → completeWork → Commit，并深入 Mutation、Layout、Ref、Passive Effect 和 Error/Interrupted Render 边界。

### Lesson RE-PIPE-001：一次 Update 从什么时候进入 Render Pipeline

从 schedule/update root 高层入口开始。

### Lesson RE-PIPE-002：Render Phase 为什么允许被中断

连接 work loop、priority 和 pure render。

### Lesson RE-PIPE-003：Sync Render 与 Concurrent Render Loop 有何区别

比较工作循环选择。

### Lesson RE-PIPE-004：beginWork / completeWork 为什么形成“下行 + 上行”遍历

在 Fiber Tree 上画完整 DFS 工作路径。

### Lesson RE-PIPE-005：Render Phase 会直接修改可见 DOM 吗

用断点证明 Host mutation 留到 Commit。

### Lesson RE-PIPE-006：完成的 workInProgress Tree 什么时候成为 current

理解 root finishedWork 与 commit swap。

### Lesson RE-PIPE-007：Commit Mutation Phase 做什么

跟踪 Placement/Update/Deletion 到真实 DOM。

### Lesson RE-PIPE-008：Ref attach/detach 在 Commit 什么时候发生

连接 Ref Module 的生命周期行为。

### Lesson RE-PIPE-009：Layout Effect 为什么在 DOM Mutation 后、Paint 前

用源码路径对应 useLayoutEffect 行为。

### Lesson RE-PIPE-010：Passive Effect 为什么延后处理

跟踪 passive flags/queue 到后续 flush。

### Lesson RE-PIPE-011：Commit 为什么不能像 Render 一样随便中断

避免用户看到半提交 UI。

### Lesson RE-PIPE-012：Render 抛 Error / Suspend 时 Pipeline 怎么变化

建立 unwind/retry/boundary 的高层连接。

### Lesson RE-PIPE-013：Interrupted Render 的 workInProgress 会怎样

理解丢弃/重启而 current 保持稳定。

### Lesson RE-PIPE-014：Profiler Commit 与源码 Commit 如何对齐

把工具时间线映射到内部阶段。

### Lesson RE-PIPE-015：综合源码调试——一次 Button setState 到 DOM Text 更新

记录 schedule、render、complete、commit mutation 全调用链。

### Lesson RE-PIPE-016：输出 React Render/Commit 时序图

把 Event、Update Queue、Lane、Fiber Work、DOM、Layout/Passive Effect 串在同一图中。

---

# Module 11.28：Hooks 与 Update Queue Internals

本 Module 一次进入 Dispatcher、Hook Linked List、mount/update、useState/useReducer Queue、Effect、Memo/Ref 和 Hook Rules 的内部实现。

### Lesson RE-HOOKSRC-001：Function Component 的 Hook State 为什么需要 Linked List

从调用顺序映射到 hook node 顺序理解设计。

### Lesson RE-HOOKSRC-002：Dispatcher 是什么

观察 mount/update/rerender 不同 dispatcher 如何让同一个 useState API 走不同实现。

### Lesson RE-HOOKSRC-003：mountWorkInProgressHook 如何创建 Hook Node

记录 memoizedState/baseState/queue/next。

### Lesson RE-HOOKSRC-004：updateWorkInProgressHook 如何复用对应 Hook

连接 current hook 与 workInProgress hook。

### Lesson RE-HOOKSRC-005：为什么条件调用 Hook 会错位

直接从 linked list 顺序解释 Rules of Hooks。

### Lesson RE-HOOKSRC-006：mountState 如何初始化 State 与 Queue

跟踪 lazy initializer、dispatch binding。

### Lesson RE-HOOKSRC-007：dispatchSetState 从哪里开始

找到 Fiber、Queue、Action、Lane 的入口。

### Lesson RE-HOOKSRC-008：updateState / basicStateReducer 如何处理 replacement/updater

源码验证 Snapshot/Updater Module。

### Lesson RE-HOOKSRC-009：useReducer 与 useState 内部有什么共性

比较 reducer/queue 复用。

### Lesson RE-HOOKSRC-010：useRef 内部为什么只是稳定对象

源码验证 current mutation 不触发 queue。

### Lesson RE-HOOKSRC-011：useMemo / useCallback 如何保存 value + deps

观察 dependency compare 与 cached value/function。

### Lesson RE-HOOKSRC-012：Effect Hook 在 Hook Node 中保存什么

认识 Effect object、deps、create/destroy/tag。

### Lesson RE-HOOKSRC-013：Effect List / Fiber Flag 如何让 Commit 找到 Effect

连接 Hooks Render 与 Commit passive/layout。

### Lesson RE-HOOKSRC-014：Render-phase Update 为什么特殊

观察 render 中 setState 的限制/重新 Render 路径。

### Lesson RE-HOOKSRC-015：Hook 错误信息如何由 Dev Dispatcher / Rules 检测产生

理解开发诊断而非只看错误文本。

### Lesson RE-HOOKSRC-016：综合源码调试——同一组件 useState/useRef/useMemo/useEffect 的 Hook 链

记录 mount/update 两次 Render 的 linked list 和字段变化。

---

本 Module 专门把 setState → Update → Queue → Lane → Render → Base State 跑透，验证前面所有 Update Queue 行为模型。

### Lesson RE-QUEUE-001：一次 setState 会创建什么 Update

找到 action、lane 等关键字段。

### Lesson RE-QUEUE-002：Queue 的 pending Ring / Linked Structure 如何组织多个 Update

观察连续 Setter 入队。

### Lesson RE-QUEUE-003：为什么 Functional Updater 可以按顺序串起来

源码验证 reducer 对 action function 的处理。

### Lesson RE-QUEUE-004：Replacement Value 在 Queue 中本质是什么

验证 direct value 与 updater 进入统一模型。

### Lesson RE-QUEUE-005：Base State / Base Queue 为什么在并发优先级下需要存在

建立跳过低优先级 update 后未来重放的动机。

### Lesson RE-QUEUE-006：Lane 如何决定某次 Render 处理哪些 Update

制造 transition + urgent update 并观察 queue skip。

### Lesson RE-QUEUE-007：Eager State Optimization 解决什么

观察某些相同值 update 可能提前判定无变化的高层路径。

### Lesson RE-QUEUE-008：Batching 与 Queue 入队是同一件事吗

区分多个 update 收集和何时 schedule/render。

### Lesson RE-QUEUE-009：Interrupted Render 后 Queue 如何保持正确性

理解 current/workInProgress/base queue 协作。

### Lesson RE-QUEUE-010：Reducer Queue 与 State Queue 有哪些共同字段

对比 useReducer。

### Lesson RE-QUEUE-011：综合源码调试——十组 Update Queue Case

把前面 Snapshot Module 的预测逐一对应到源码对象。

### Lesson RE-QUEUE-012：输出 Update Queue 状态机图

标出 enqueue、merge、process、skip、commit、rebase。

---

# Module 11.29：Lane、Scheduler 与 Suspense / Activity Internals

本 Module 完整学习 Update Priority、Lane、Pending/Suspended/Pinged/Entangled、Transition、Root Scheduling、Scheduler、Yield、Starvation 和 Expiration。

### Lesson RE-LANE-001：React 为什么不用一个简单 priority number

从多组可组合 pending work 理解 Lane bitmask 模型。

### Lesson RE-LANE-002：一次用户 Event 如何得到 Update Priority

连接 Event Priority 与 Lane Selection。

### Lesson RE-LANE-003：Sync Lane / Transition Lane 高层差异

通过 urgent + transition update 观察。

### Lesson RE-LANE-004：Root pendingLanes 表达什么

记录整个 Root 还欠哪些优先级工作。

### Lesson RE-LANE-005：suspendedLanes / pingedLanes 为什么存在

连接 Suspense resource pending/resolve。

### Lesson RE-LANE-006：Entangled Lanes 解决什么一致性问题

理解某些 transition updates 需要一起处理。

### Lesson RE-LANE-007：getNextLanes 如何选择下一批工作

通过断点观察优先级选择而不是背源码分支。

### Lesson RE-LANE-008：Scheduler Task 与 React Lane 是同一个东西吗

区分 React 更新优先级表示和 scheduler callback。

### Lesson RE-LANE-009：Concurrent Work Loop 什么时候 Yield

观察 shouldYield / time slicing 高层行为。

### Lesson RE-LANE-010：浏览器主线程被占满时 Scheduler 能做什么、不能做什么

明确 React 不是抢占式 OS scheduler。

### Lesson RE-LANE-011：Starvation 为什么需要 Expiration

低优先级工作不能永远得不到执行。

### Lesson RE-LANE-012：Transition 如何得到并传播 Lane

跟踪 startTransition 到 update lane。

### Lesson RE-LANE-013：Suspense Retry 为什么会安排新工作

Promise ping 后重新选择 lanes。

### Lesson RE-LANE-014：Lane 如何影响 Update Queue Rebase

连接被跳过 update 与未来 render。

### Lesson RE-LANE-015：综合源码实验——持续输入打断大列表 Transition

记录 event priority、lane、yield、restart、commit。

### Lesson RE-LANE-016：输出 Lane/Scheduler 决策图

把 Event → Lane → Root → Scheduler → Work Loop → Commit 串起来。

---

本 Module 从 Promise Suspend、Boundary Capture、Retry/Ping、Fallback、Offscreen/Hidden Tree、Transition 与 Activity 内部连接验证用户层行为。

### Lesson RE-SUSPENSESRC-001：Component “Suspend” 时源码里发生了什么

跟踪 thrown thenable / suspension signal 到 boundary 查找。

### Lesson RE-SUSPENSESRC-002：React 如何找到最近 Suspense Boundary

观察 boundary capture / flags 高层路径。

### Lesson RE-SUSPENSESRC-003：Fallback Fiber Tree 如何被构建

比较 primary / fallback subtree。

### Lesson RE-SUSPENSESRC-004：Promise Resolve 后 Ping 如何触发 Retry

跟踪 ping listener、pinged lane 和重新 schedule。

### Lesson RE-SUSPENSESRC-005：Nested Suspense 为什么能独立 Reveal

用 Fiber boundary/lanes 解释。

### Lesson RE-SUSPENSESRC-006：Transition 为什么可能保留旧 UI 而不马上 fallback

连接 lane priority 与 suspense handling。

### Lesson RE-SUSPENSESRC-007：Hidden / Offscreen Tree 内部需要保存什么

认识可见性、pending work、effect lifecycle 高层结构。

### Lesson RE-SUSPENSESRC-008：Activity 与 Hidden Tree 的内部连接怎么理解

按固定版本源码验证 visible/hidden 行为。

### Lesson RE-SUSPENSESRC-009：隐藏树 Effect 为什么需要特殊处理

连接用户层 Activity Effect Lifecycle。

### Lesson RE-SUSPENSESRC-010：Suspense Retry Storm 如何形成

制造频繁 promise identity/资源重建并看 schedule。

### Lesson RE-SUSPENSESRC-011：综合源码调试——一个 Lazy Component 从 Suspend 到 Reveal

记录 boundary、fallback、ping、retry、commit。

### Lesson RE-SUSPENSESRC-012：综合源码调试——Activity Hide/Show 的 Fiber/Effect 变化

对照用户层 State Preservation 与内部树行为。

---

# Module 11.30：Server Renderer、Hydration 与 RSC Internals

本 Module 是 React Server Runtime 的专家级源码段，覆盖 Segment/Boundary/Stream、Server Task、Hydration、Event Replay、RSC Payload、Client/Server Reference、Bundler Integration，并用一次完整 Source Debug 串起 State Update 到 DOM Commit。

### Lesson RE-SERVERSRC-001：Server Renderer 的核心工作单元是什么

按固定版本识别 request/task/segment/boundary 等关键结构。

### Lesson RE-SERVERSRC-002：React Server Renderer 如何遍历 Element Tree

比较与 Client Reconciler 的目标差异。

### Lesson RE-SERVERSRC-003：Suspense Boundary 如何生成 Server Segment

观察 pending task 与 fallback/primary output。

### Lesson RE-SERVERSRC-004：Stream Chunk 如何被排队和 Flush

连接 renderToPipeableStream / ReadableStream 行为。

### Lesson RE-SERVERSRC-005：Abort 如何传播到 Server Task / Boundary

验证用户层 abort 行为的内部路径。

### Lesson RE-SERVERSRC-006：Hydration Fiber 如何与现有 DOM 对齐

认识 hydratable instance 查找与匹配高层路径。

### Lesson RE-SERVERSRC-007：Hydration Mismatch 在源码哪里被检测

制造 text/element mismatch 并观察 recoverable path。

### Lesson RE-SERVERSRC-008：Event Replay 为什么与未完成 Hydration 有关

建立 selective hydration / blocked event 高层模型。

### Lesson RE-SERVERSRC-009：RSC Server Renderer 与 HTML Server Renderer 有何根本区别

比较输出协议、client reference、host HTML。

### Lesson RE-SERVERSRC-010：Client Reference 如何进入 RSC Payload

观察 `"use client"` module reference 的序列化表示。

### Lesson RE-SERVERSRC-011：Server Reference / Server Function 如何编码

建立框架 transport 的内部概念，不把格式当公共稳定协议。

### Lesson RE-SERVERSRC-012：RSC String / Row / Chunk 消费高层路径

理解客户端如何逐步重建 model。

### Lesson RE-SERVERSRC-013：Bundler Integration 为什么是版本敏感内部边界

记录 manifest/module id/client reference resolution。

### Lesson RE-SERVERSRC-014：Source Debug 综合项目——State Update 到 DOM Commit 入口

从 Button Event 断点进入 dispatchSetState。

### Lesson RE-SERVERSRC-015：Source Debug 综合项目——记录 Update Queue 与 Lane

保存 update/queue/fiber/root 关键对象快照。

### Lesson RE-SERVERSRC-016：Source Debug 综合项目——跟踪 Schedule → Render → Reconcile

记录 beginWork/completeWork/child reuse。

### Lesson RE-SERVERSRC-017：Source Debug 综合项目——跟踪 Commit → DOM Mutation

定位最终文本/属性更新。

### Lesson RE-SERVERSRC-018：Source Debug 综合项目——加入 Effect 再走一次完整 Pipeline

对比 mutation/layout/passive 时机。

### Lesson RE-SERVERSRC-019：Source Debug 综合项目——提交完整调用链报告

包括 React commit SHA、断点、stack、Fiber/Queue/Lane 对象和结论。

### Lesson RE-SERVERSRC-020：React Client / Server Internal 总图验收

把 Reconciler、Scheduler、Server Renderer、Hydration、RSC 五条核心链画在统一架构图中。

---

# Module 11.31：React Library 与 Headless Component Architecture

本 Module 从公共 API、Package Entry、Exports、Types、ESM、Peer React、Tree Shaking、SSR/RSC/Compiler Compatibility、Testing、Release 和版本治理建设可消费 React Library。

### Lesson RE-LIB-001：应用代码与 Library 代码的约束为什么不同

Library 无法控制消费者 bundler、React version、SSR 环境和 TS config。

### Lesson RE-LIB-002：设计 Library Public API Surface

只暴露稳定入口，避免消费者 deep import 内部文件。

### Lesson RE-LIB-003：package.json exports 如何设计

处理 root/subpath、types、import 条件和内部隐藏。

### Lesson RE-LIB-004：为什么 React 必须通常放 peerDependencies

避免 Library 打包第二份 React 造成 Hook/Context 问题。

### Lesson RE-LIB-005：ESM-first Library 如何构建

设计 source → dist、module format、target 和 source map。

### Lesson RE-LIB-006：Type Declaration 如何发布

生成 .d.ts、public type、generic props 和 API contract。

### Lesson RE-LIB-007：Tree Shaking 需要 Library 配合什么

处理 sideEffects、barrel、top-level side effect。

### Lesson RE-LIB-008：CSS / Asset 应该如何跟 React Library 一起发布

比较 CSS file、CSS-in-JS、token、consumer bundling。

### Lesson RE-LIB-009：React 19 ref / Actions / Compiler Compatibility 如何声明

根据实际使用 API 设计 minimum peer version。

### Lesson RE-LIB-010：SSR-safe Library 必须避免什么

顶层 window/document、random first render、layout-only assumption。

### Lesson RE-LIB-011：RSC-compatible Library 如何区分 Server/Client Entry

避免无意把整个包标成 client-only。

### Lesson RE-LIB-012：Compiler-precompiled Library 的消费边界

按正式版本验证发布产物和 fallback。

### Lesson RE-LIB-013：Library Test Matrix 应覆盖什么

React versions、TS types、browser behavior、SSR、bundle consumer。

### Lesson RE-LIB-014：SemVer 对 Component Props/API 意味着什么

识别 rename/default behavior/DOM output 等 breaking change。

### Lesson RE-LIB-015：如何做 Changeset / Release / Canary

建立 package version、changelog、pre-release 和 rollback。

### Lesson RE-LIB-016：综合项目——发布一个 React Utility + Component Package

由两个独立消费项目安装、SSR/Client 使用、升级和验证 tree shaking/types。

---

本 Module 负责 React-specific Headless Component：State/Behavior/DOM/A11Y/Style 分离、Controlled API、Composition、Compound Pattern、Portal/Focus、Positioning、Adapter 和版本合同。

### Lesson RE-HEADLESS-001：Headless UI 到底“无头”在哪里

分离行为/状态/A11Y 与视觉样式。

### Lesson RE-HEADLESS-002：先从一个 Toggle 的 State Machine 开始

定义状态、事件、keyboard、ARIA，不绑定具体 CSS。

### Lesson RE-HEADLESS-003：Controlled / Uncontrolled 双模式怎么设计

处理 value/defaultValue/onChange 和 ownership。

### Lesson RE-HEADLESS-004：Compound Component 如何共享行为上下文

设计 Root/Trigger/Content/Item API。

### Lesson RE-HEADLESS-005：Render Prop / Function-as-child 什么时候仍有价值

比较 Composition 和 DOM control flexibility。

### Lesson RE-HEADLESS-006：Polymorphic `as` API 有哪些类型/A11Y 风险

避免随意换元素破坏语义和 ref 类型。

### Lesson RE-HEADLESS-007：Focus Management 应该属于行为层

实现 roving tabindex / focus restore。

### Lesson RE-HEADLESS-008：Portal / Overlay / Positioning 如何进入 Headless Architecture

把 DOM placement 与视觉样式分离。

### Lesson RE-HEADLESS-009：Keyboard Interaction 如何按 WAI-ARIA Pattern 实现

为 Menu/Listbox/Dialog 等建立行为合同。

### Lesson RE-HEADLESS-010：Headless API 如何支持 React Server/Client Boundary

把交互组件 client 化但保持 server-renderable composition。

### Lesson RE-HEADLESS-011：Headless Component 如何做 Stable Public API

控制 props、context、imperative handle 和 data attribute。

### Lesson RE-HEADLESS-012：Headless Component 如何测试

覆盖行为、键盘、ARIA、controlled/uncontrolled，不依赖样式。

### Lesson RE-HEADLESS-013：综合项目——实现 Headless Select / Dialog

覆盖状态机、keyboard、portal、focus 和 typed API。

### Lesson RE-HEADLESS-014：Design System Adapter 如何消费 Headless Primitive

只做 React adapter 连接，组织级 Design System 治理留后续 Owner Stage。

---

# Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary

本 Module 从 Feature/Domain/Layer/Public API、DTO/Domain/ViewModel、State/Route/Async/Error Ownership、Dependency Rule、Architecture Test、Code Split 和多团队 Ownership 设计大型 React 应用。

### Lesson RE-ARCH-001：大型 React 项目为什么不能只按 components/hooks/pages 分目录

观察技术分类在业务增长后的耦合扩散。

### Lesson RE-ARCH-002：Feature / Domain Boundary 如何识别

从业务变化原因和 ownership 拆模块。

### Lesson RE-ARCH-003：一个 Module 的 Public API 应该是什么

用 index/export boundary 禁止任意 deep import。

### Lesson RE-ARCH-004：Dependency Direction 如何避免循环依赖

定义 app/feature/entity/shared/infrastructure 或自定义层级规则。

### Lesson RE-ARCH-005：DTO / Domain Model / ViewModel 为什么值得分开

避免 API shape 直接污染整个 UI。

### Lesson RE-ARCH-006：State Owner 应该和 Domain Owner 一致吗

讨论 local/server/url/workflow data 的不同 owner。

### Lesson RE-ARCH-007：Route Owner 如何定义

让业务 feature 拥有 route config/data boundary，而不是中央路由巨石。

### Lesson RE-ARCH-008：Async Boundary 如何成为架构元素

统一 Query/Suspense/Transition/Error 的边界设计。

### Lesson RE-ARCH-009：Error Boundary 应该按技术层还是业务隔离半径划分

设计 widget/feature/page/app failure domain。

### Lesson RE-ARCH-010：Context/Provider 应该放在什么边界

避免 Global Provider Pyramid。

### Lesson RE-ARCH-011：Cross-feature Communication 应该怎么做

比较 direct import、shared state、domain event、URL、server state。

### Lesson RE-ARCH-012：Feature Flag 如何不污染每个 Component

建立 boundary / config adapter 和生命周期清理。

### Lesson RE-ARCH-013：大型 React App 的 Code Splitting 应跟什么边界走

Route/feature/heavy capability 而非随机文件大小。

### Lesson RE-ARCH-014：Architecture Fitness Function 如何自动阻止越层依赖

用 ESLint/import rule/graph test 建门禁。

### Lesson RE-ARCH-015：多人团队 Ownership 如何映射 CODEOWNERS / Module

让架构边界与责任边界一致。

### Lesson RE-ARCH-016：React App ADR 应该记录哪些决策

State、Router、Data、SSR/RSC、Error、Compiler、Library Boundary。

### Lesson RE-ARCH-017：综合重构——把 Enterprise SPA 从技术目录改成 Domain Module

保持功能不变，减少跨域 import 并生成 dependency graph。

### Lesson RE-ARCH-018：Large-scale React Architecture Review

对 module boundary、state ownership、async/error boundary、build split 做系统评审。

---

本 Module只学习 React-specific Microfrontend 问题：Multiple Roots、React Singleton、Context/Router Boundary、Version Conflict、Shared Component、Error Isolation；完整微前端体系归后续架构 Stage。

### Lesson RE-MFE-001：一个页面多个 React Root 与真正 Microfrontend 有什么区别

区分技术挂载和独立团队/部署边界。

### Lesson RE-MFE-002：为什么两份 React 可能造成 Hook/Context 问题

理解 singleton/peer dependency/shared runtime。

### Lesson RE-MFE-003：Module Federation Shared React 如何配置和验证

只聚焦 React runtime compatibility。

### Lesson RE-MFE-004：Context 能不能自动跨 Microfrontend Root

验证 root boundary，并设计显式 dependency bridge。

### Lesson RE-MFE-005：Router Ownership 冲突怎么发生

比较 shell router、sub-route ownership、history coordination。

### Lesson RE-MFE-006：Design System Component 跨不同 React Version 如何治理

讨论 package peer range 和 compatibility matrix。

### Lesson RE-MFE-007：Error Boundary 能隔离到什么程度

区分 React subtree error 与 script/runtime/global CSS failure。

### Lesson RE-MFE-008：SSR/RSC 下 Microfrontend React Boundary 更复杂在哪里

只建立版本、stream、module graph 风险地图。

### Lesson RE-MFE-009：React Microfrontend Migration 如何避免 Big Bang

用 route/feature strangler 渐进接管。

### Lesson RE-MFE-010：综合评审——什么时候根本不值得上 Microfrontend

从团队独立性、部署、运行时成本和复杂度做决策。

---

# Module 11.33：Legacy React 与 Migration

本 Module 让学习者能维护 React 15～18、Class、Lifecycle、Legacy Context、HOC/Render Props、Old Redux/Router、CRA/Webpack、Enzyme，并理解这些模式与现代 React 的映射。

### Lesson RE-LEGACY-001：为什么资深 React 必须看得懂 Class Component

真实遗留系统不会因为新课程只讲 Hook 就消失。

### Lesson RE-LEGACY-002：Class Component State / setState 模型

比较 object merge、functional setState 与现代 Hook State。

### Lesson RE-LEGACY-003：Lifecycle Methods 完整映射

理解 mount/update/unmount、render、didMount/didUpdate/willUnmount。

### Lesson RE-LEGACY-004：Derived State Lifecycle 为什么危险

认识 getDerivedStateFromProps 等常见同步问题。

### Lesson RE-LEGACY-005：Error Boundary 为什么长期仍依赖 Class 实现形态

读取现有 error boundary code。

### Lesson RE-LEGACY-006：Legacy Context 与现代 Context 有什么差异

理解维护迁移而不是新项目使用。

### Lesson RE-LEGACY-007：HOC 解决了什么问题

分析 wrapper composition、prop collision、debug tree。

### Lesson RE-LEGACY-008：Render Props 解决了什么问题

理解逻辑复用与 JSX nesting。

### Lesson RE-LEGACY-009：HOC / Render Props 如何迁到 Custom Hook

识别哪些逻辑可直接迁、哪些 wrapper semantics 要保留。

### Lesson RE-LEGACY-010：旧 Redux connect / mapStateToProps 怎么读

理解 subscription/selector/dispatch mapping。

### Lesson RE-LEGACY-011：旧 React Router 常见模式怎么读

Switch/Route/history 等历史 API 到现代模型映射。

### Lesson RE-LEGACY-012：ReactDOM.render / hydrate 为什么需要迁移

连接 legacy root 与 modern root/concurrency。

### Lesson RE-LEGACY-013：Create React App 项目结构和隐式配置怎么理解

认识 react-scripts、eject、webpack/babel hidden config。

### Lesson RE-LEGACY-014：Enzyme 测试为什么迁移困难

识别 shallow implementation tests 与 modern behavior tests 差异。

### Lesson RE-LEGACY-015：React 17/18 行为差异中哪些会影响升级

关注 root、batching、StrictMode、concurrent foundation 等真实边界。

### Lesson RE-LEGACY-016：综合阅读——一套旧 React 管理后台从入口到状态/路由/测试

输出 Legacy Architecture Map 和迁移风险清单。

---

本 Module 系统学习 Class→Function、Legacy Context、Old Root、Old SSR、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Compatibility Layer、Feature Flag、Canary、Rollback。

### Lesson RE-MIGRATE-001：迁移前为什么必须先建立行为基线

用 E2E/Visual/metrics 固定当前系统合同。

### Lesson RE-MIGRATE-002：如何给 Legacy React 建 Dependency / Compatibility Inventory

记录 React、Router、State、UI Library、Build、Test、Browser。

### Lesson RE-MIGRATE-003：Class→Function 应该逐组件还是按 Feature

比较依赖、测试和回滚半径。

### Lesson RE-MIGRATE-004：Lifecycle→Effect 不能机械一一翻译

重新按 External Synchronization / Event / Derived Data 设计。

### Lesson RE-MIGRATE-005：Legacy Context→Modern Context 如何过渡

用 adapter/dual provider 控制迁移窗口。

### Lesson RE-MIGRATE-006：Old Root→createRoot 如何验证行为变化

关注 batching、strict/concurrent readiness 和 third-party integration。

### Lesson RE-MIGRATE-007：Old hydrate→hydrateRoot 如何处理 Mismatch / ID

建立 SSR upgrade checklist。

### Lesson RE-MIGRATE-008：React 18→19 升级如何做兼容矩阵

检查 library、types、framework、compiler、actions/ref changes。

### Lesson RE-MIGRATE-009：Manual Memo→Compiler 不能一键删除

先 pilot、profile、再按 evidence 清理。

### Lesson RE-MIGRATE-010：SPA→SSR 应该从哪些 Route 开始

按 SEO/TTFB/business value 选择 pilot。

### Lesson RE-MIGRATE-011：SPA→RSC 应该先拆 Server/Client Boundary

避免把现有全部 Component 直接 server 化。

### Lesson RE-MIGRATE-012：Codemod 能做什么，不能做什么

机械语法迁移与语义/architecture decision 分开。

### Lesson RE-MIGRATE-013：Compatibility Layer 如何降低 Big Bang 风险

建立 adapter/facade/bridge，但明确退出计划。

### Lesson RE-MIGRATE-014：Feature Flag / Dual Run 如何支持灰度

新旧实现并存、对比 metrics、快速 rollback。

### Lesson RE-MIGRATE-015：迁移过程中如何管理 Cache / URL / State Compatibility

避免新旧客户端数据协议不一致。

### Lesson RE-MIGRATE-016：综合项目——为 Legacy Admin 设计 6 个月 React Migration Plan

输出阶段、风险、测试、metrics、rollback 和 decommission plan。

---

# Module 11.34：React Upgrade Governance

本 Module 将一次升级变成长期治理能力：Stable/Canary/Experimental、SemVer、安全公告、依赖兼容、Compiler/Framework、Pilot、Canary、Rollback、Exception 和组织流程。

### Lesson RE-UPGRADE-001：Stable / Canary / Experimental 分别意味着什么

建立生产使用和研究 track 的不同门槛。

### Lesson RE-UPGRADE-002：React SemVer 能保护哪些边界，保护不了哪些内部集成

特别区分公开 API 与 RSC/bundler 底层版本敏感能力。

### Lesson RE-UPGRADE-003：如何持续跟踪 React Release / Security Advisory

把 release watch 变成工程职责而非临时搜索。

### Lesson RE-UPGRADE-004：Dependency Compatibility Matrix 怎么维护

React、react-dom、types、router、query、UI library、framework、compiler。

### Lesson RE-UPGRADE-005：Upgrade Pilot 应该选什么应用/Feature

既有代表性又有可回滚性。

### Lesson RE-UPGRADE-006：Canary Release 如何验证真实用户指标

错误率、performance、hydration、bundle、interaction。

### Lesson RE-UPGRADE-007：升级前后必须跑哪些 Test / Benchmark

Unit/Integration/E2E/Visual/SSR/Performance/Bundle。

### Lesson RE-UPGRADE-008：Rollback 为什么必须在升级前设计

依赖 lock、build artifact、data/cache compatibility。

### Lesson RE-UPGRADE-009：Temporary Exception 如何防止变成永久技术债

记录 owner、reason、expiry、remediation。

### Lesson RE-UPGRADE-010：多应用 Monorepo 如何分批升级 React

处理 shared package/peer range 和一致性。

### Lesson RE-UPGRADE-011：如何写 React Upgrade RFC

背景、breaking risk、compatibility、pilot、metrics、rollback、timeline。

### Lesson RE-UPGRADE-012：综合演练——模拟一次 React Major Upgrade Review

面对一个有 SSR、Library、Legacy、Compiler 的组织级仓库给出 rollout 决策。

---

# Module 11.35：React Architecture Review 与最终综合项目

本 Module 是 Stage 11 的最终收束。所有架构评审、最终 React Enterprise Platform、故障制造、性能证据、源码 Debug、迁移方案和答辩全部继续作为普通 Lesson，不创建新的项目层级。

### Lesson RE-FINAL-001：大型 React Architecture Review 应先问哪些驱动力

明确业务规模、用户体验、团队、SEO、实时性、合规、成本和迁移约束。

### Lesson RE-FINAL-002：Review Component / Module Boundary

检查 feature/domain ownership、public API、cross-import 和 reusable component 边界。

### Lesson RE-FINAL-003：Review State Architecture

逐份检查 local/url/server/persistent/workflow state 是否放在正确 owner。

### Lesson RE-FINAL-004：Review Effect Architecture

要求每个 Effect 明确外部系统，并删除 derived/event/server-cache 等错误 Effect。

### Lesson RE-FINAL-005：Review Router / URL Architecture

检查 deep link、nested ownership、error、lazy、data lifecycle。

### Lesson RE-FINAL-006：Review Server State / Query Architecture

检查 query key、stale policy、mutation、invalidation、optimistic、tenant isolation。

### Lesson RE-FINAL-007：Review Async / Suspense / Transition Boundary

检查 loading reveal、waterfall、urgent/non-urgent、error recovery。

### Lesson RE-FINAL-008：Review SSR / Hydration Architecture

检查 server/client deterministic render、stream、cache、hydration evidence。

### Lesson RE-FINAL-009：Review RSC / Server Function Boundary

检查 client bundle、serialization、auth、tenant、cache、data leak。

### Lesson RE-FINAL-010：Review Performance Architecture

检查 profiler baseline、INP、long task、large list、context storm、compiler evidence。

### Lesson RE-FINAL-011：Review React-specific Security / A11Y

检查 HTML/URL sink、server authorization、focus、dynamic content 和 SSR ID。

### Lesson RE-FINAL-012：Review Error / Observability Architecture

检查 boundary、release/trace context、recoverability 和 privacy。

### Lesson RE-FINAL-013：Review Library / Headless API

检查 peer React、types、SSR/RSC/Compiler、semver 和 accessibility contract。

### Lesson RE-FINAL-014：Review Legacy / Migration / Upgrade Strategy

检查 compatibility layer、feature flag、codemod、pilot、rollback 和退出计划。

### Lesson RE-FINAL-015：最终项目——React Enterprise Platform 需求与 Success Metrics

定义真实业务问题、用户流程、性能/可靠性/安全目标，而不是先堆技术。

### Lesson RE-FINAL-016：最终项目——设计 Domain / Route / State / Data Architecture

提交 Component/Module Tree、Route Tree、State Map、Query Map、API Boundary。

### Lesson RE-FINAL-017：最终项目——实现复杂 Form / Workflow / Permission UI

使用 State Modeling、Reducer/Context 或明确选择的 Store，保持 authorization 在 server。

### Lesson RE-FINAL-018：最终项目——实现 Query / Mutation / Optimistic / Error Recovery

覆盖缓存、并发 mutation、rollback 和 server conflict。

### Lesson RE-FINAL-019：最终项目——实现 Suspense / Transition / DeferredValue / Activity

构建高交互区域并记录用户响应性证据。

### Lesson RE-FINAL-020：最终项目——启用 Profiler / Performance Budget / React Compiler

建立 before-after baseline 和回归门槛。

### Lesson RE-FINAL-021：最终项目——实现 SSR / Streaming / Hydration

从可访问 HTML 到客户端接管并制造 mismatch/abort failure。

### Lesson RE-FINAL-022：最终项目——实现 RSC / Client Boundary / Server Functions

固定 React 版本，完成 serialization、auth、cache 和 streaming 边界。

### Lesson RE-FINAL-023：最终项目——发布一个 React Library / Headless Primitive

让平台主应用和第二消费项目共同使用并验证版本合同。

### Lesson RE-FINAL-024：最终项目——制造 Wrong Key / Stale Closure / Infinite Effect / Race

提交四类故障的复现、根因、修复和回归证据。

### Lesson RE-FINAL-025：最终项目——制造 Context Storm / Slow Render / Memory Leak

提交 Profiler、Performance Trace、Heap Snapshot 与优化证据。

### Lesson RE-FINAL-026：最终项目——制造 Chunk Failure / Hydration Mismatch / Suspense Waterfall

完成 Network、SSR、Suspense 三类故障诊断。

### Lesson RE-FINAL-027：最终项目——攻击 Unauthorized Server Function / RSC Data Leak Risk

验证 server authorization、serialization boundary 和 threat mitigation。

### Lesson RE-FINAL-028：最终项目——完成一次 Fiber Source Debug

从 State Update 断点跟踪 Queue、Lane、Render、Reconcile、Commit 到 DOM。

### Lesson RE-FINAL-029：最终项目——编写 React Migration / Upgrade Plan

假设当前平台需要从旧 React/CSR 向 React 19 + Compiler + SSR/RSC 演进，设计可回滚路线。

### Lesson RE-FINAL-030：最终项目——最终架构答辩

必须用运行证据回答为什么采用当前 State、Router、Query、Suspense、SSR/RSC、Compiler、Library 和 Migration 方案，以及什么时候应该换掉它们。

---

# 4. Stage 11 阶段验收

完成 Stage 11 后，学习者必须能够：

1. 从空目录建立 React + TypeScript 项目并解释完整启动链路；
2. 不混淆 JSX、React Element、React Node、Component、React Tree、Fiber 和 DOM Node；
3. 解释 State、Snapshot、Update Queue、Batching、Identity 和 Reconciliation；
4. 设计复杂 State / Form / Router / Server State 边界；
5. 判断 Effect 是否真正必要，并复现、定位和修复 Effect 常见故障；
6. 使用 Actions、Optimistic UI、Suspense、Transition、DeferredValue、Activity 构建高交互应用；
7. 使用 React DevTools、Profiler、Browser Performance、Network、Heap 等证据分析问题；
8. 正确评估并配置 React Compiler，而不是机械删除/添加 Memoization；
9. 不依赖 Next.js 黑盒解释 SSR、Hydration、Streaming、Static Rendering / Prerender；
10. 准确解释 RSC、Client Component、Server Function、Cache、Serialization 和安全边界；
11. 用源码断点跟踪一次 State Update 到 DOM Commit；
12. 解释 Fiber、Reconciler、Hooks、Update Queue、Lane、Scheduler、Suspense、Hydration、RSC 的关键内部模型；
13. 发布可消费 React Library / Headless Component，并处理 SSR/RSC/Compiler/Peer React 兼容；
14. 维护 Legacy React，并设计 React 18→19、Manual Memo→Compiler、SPA→SSR/RSC 的迁移方案；
15. 对大型 React 系统完成状态、数据、性能、安全、A11Y、服务端边界、故障和升级治理评审；
16. 完成 React Enterprise Platform，并提交源码、测试、Profiler、Trace、Heap、架构图、ADR、Threat Notes、Migration Plan 和源码 Debug 报告。

---

# 5. Lesson 拆分完成状态

`Module 11.01 ～ Module 11.35` 已全部拆到 Lesson 粒度；这是在不删除任何 Lesson 内容的前提下，由原 78 个过碎 Module 收敛而来。

```text
Stage 11：React 完整体系
└── Module 11.01 ～ 11.35
    └── Lesson（基础 / 机制 / 故障 / Debug / 源码 / 性能 / 项目 / 架构均统一为 Lesson）
```

后续不再继续增加“高级篇 / 源码篇 / Lab / Review”等平行层级。正式编写课程前只进行四类复审：

1. **Dependency Review**：是否偷用了未来 Lesson / Module；
2. **Duplication Review**：是否有两个 Lesson 在重复完整教授同一主题；
3. **Granularity Review**：一个 Lesson 是否只解决一个主要问题；
4. **Knowledge Ceiling Review**：综合项目是否只使用截至当前位置已经正式学过的核心能力。

完成复审后，才从第一个 Lesson 开始创建 `courses/frontend-architect` 下的正式 README 与独立可运行源码。
