# Stage 06 · Module 19：React 从核心心智模型到架构实践

> **目录标识**：`stage06-module19-react`  
> **目标**：从 React 核心语义、Hooks、渲染模型、React DOM、并发能力、React 19.x、SSR/RSC、React Compiler，一直学习到 Fiber/Scheduler、组件架构、库开发和版本迁移，建立能支撑中大型项目与架构设计的完整 React 能力。  
> **版本基线（2026-08）**：稳定主线以 React **19.2.x** 为基线；React 19.3 当前仍属于 Canary，不作为基础课程稳定 API。React Compiler **1.0** 已稳定并进入正式学习范围。  
> **边界**：本模块聚焦 React 本身。路由、Redux/Zustand、服务端状态、请求缓存、复杂表单等应用生态放在 Module 21；React + TypeScript 类型设计在 TypeScript 专项模块交叉学习；测试体系、工程化、安全等在后续阶段继续深化。

## 一、学习完成后应具备的能力

1. 能从 `JSX → React Element → Render → Reconciliation → Commit → DOM` 解释一次 React 更新。
2. 能正确设计 Props、State、Context、Reducer、Ref 与 Effect 的职责边界。
3. 能完整使用现代 Hooks，并知道哪些 Hook 是业务开发常用、哪些主要服务于库作者或底层集成。
4. 能解释 StrictMode、并发渲染、Transition、Suspense、Activity 等现代 React 能力的目的。
5. 能使用 React 19 Actions、`useActionState`、`useOptimistic`、`useFormStatus` 和 `use`。
6. 能理解 React DOM Client、Portal、Hydration、Streaming SSR、Static APIs 与 Partial Pre-rendering 的关系。
7. 能区分 Server Components、Server Functions、SSR 与客户端组件的职责。
8. 能使用 React DevTools、Profiler、Performance Tracks 定位真实性能问题。
9. 能理解 React Compiler 1.0 的自动 memoization、采用策略、lint 与调试方式。
10. 能阅读 Fiber、Scheduler、Lane 的高层实现模型，但不依赖非公开实现细节写业务代码。
11. 能维护 React 17/18 老项目并规划向 React 19 的渐进迁移。
12. 能设计可复用、可演进、可测试、SSR/RSC 友好的 React 组件与公共库 API。

## 二、课程边界与学习顺序

```text
JavaScript / TypeScript 基础
        ↓
React 核心组件与状态
        ↓
Hooks / Effect / Ref
        ↓
Render / Reconciliation / Commit
        ↓
Concurrent / Suspense / Actions
        ↓
React DOM / SSR / RSC
        ↓
Performance / Compiler
        ↓
Fiber / Scheduler / Architecture
```

> **不要把生态库提前混进 React 核心。** 先用 React 自身能力建立状态、渲染、副作用和组件 API 的心智模型，再进入 Module 21 学路由、状态库、请求缓存和复杂表单。

## 三、知识点编号约定

- `RE-KPxxx`：React 原子知识点。
- Chapter：知识领域。
- Lab：章节实验。
- Project：综合项目。

后续每个原子知识点独立落盘时，遵循仓库 `AGENTS.md`：

```text
README.md / 源码
学习目标 → 理论讲解 → 动手编码：从 0 到 1 → 完整源码讲解 → 运行案例 → 效果验证 → 课后练习
```

---

# Chapter 01：React 定位、版本与开发环境

- RE-KP001：React 解决的问题与声明式 UI
- RE-KP002：React、React DOM 与 Renderer 的职责边界
- RE-KP003：React Library 与 React Framework 的区别
- RE-KP004：React 19.2.x 稳定线与 Canary/Experimental 渠道
- RE-KP005：React Compiler 1.0 已稳定的版本认知
- RE-KP006：Create React App 已弃用及迁移方向
- RE-KP007：使用 Vite 建立最小 React 学习工程
- RE-KP008：开发模式与生产模式差异
- RE-KP009：React DevTools 安装与基础使用
- RE-KP010：Fast Refresh 的作用与状态保留边界

# Chapter 02：JSX、React Element 与组件模型

- RE-KP011：JSX 的定位与语法边界
- RE-KP012：JSX 转换与 jsx/jsxs 运行时直觉
- RE-KP013：React Element 的不可变描述对象
- RE-KP014：React Element、Component 与 DOM Node 的区别
- RE-KP015：函数组件的最小模型
- RE-KP016：组件名称与大写规则
- RE-KP017：返回单根节点与 Fragment
- RE-KP018：JSX 表达式插值
- RE-KP019：JSX 属性与 JavaScript 表达式
- RE-KP020：JSX children 的基本模型

# Chapter 03：Props、组合与组件 API

- RE-KP021：Props 作为只读输入
- RE-KP022：Props 解构与默认值
- RE-KP023：children 组合
- RE-KP024：通过 JSX 传递内容而不是配置对象
- RE-KP025：组件组合优于继承
- RE-KP026：插槽式组件 API
- RE-KP027：Render Prop 模式的历史与适用场景
- RE-KP028：组件拆分的职责边界
- RE-KP029：数据组件与展示组件的现代取舍
- RE-KP030：避免 Boolean Props 爆炸

# Chapter 04：事件系统与交互

- RE-KP031：React 事件处理器
- RE-KP032：传递函数与调用函数的区别
- RE-KP033：事件冒泡
- RE-KP034：事件捕获
- RE-KP035：stopPropagation 与 preventDefault
- RE-KP036：事件处理器中的状态更新
- RE-KP037：事件与 Effect 的职责区别
- RE-KP038：Synthetic Event 的现代认知
- RE-KP039：原生 DOM 事件与 React 事件的边界
- RE-KP040：事件处理中的异步逻辑

# Chapter 05：State 基础、对象与数组更新

- RE-KP041：useState 基础
- RE-KP042：State 是组件私有记忆
- RE-KP043：State 更新触发重新渲染
- RE-KP044：State 不可直接修改
- RE-KP045：对象状态不可变更新
- RE-KP046：数组状态不可变更新
- RE-KP047：嵌套状态更新与结构设计
- RE-KP048：函数式更新
- RE-KP049：惰性初始化
- RE-KP050：避免把可推导值存入 State

# Chapter 06：Render Snapshot、Batching 与更新队列

- RE-KP051：每次 Render 都得到状态快照
- RE-KP052：事件处理器闭包与快照
- RE-KP053：同一事件中的自动批处理
- RE-KP054：多次 setState 的结果
- RE-KP055：Updater Function 队列
- RE-KP056：替换更新与函数更新混合
- RE-KP057：React 18+ 自动批处理的范围
- RE-KP058：flushSync 打破批处理的适用边界
- RE-KP059：异步回调中的快照理解
- RE-KP060：Stale Closure 的根源

# Chapter 07：组件身份、Key 与状态保存

- RE-KP061：组件树中的位置决定身份
- RE-KP062：相同位置相同组件保留状态
- RE-KP063：组件类型变化导致状态重置
- RE-KP064：key 不只是列表警告
- RE-KP065：使用 key 主动重置状态
- RE-KP066：列表 key 的稳定性要求
- RE-KP067：为什么不能滥用数组索引 key
- RE-KP068：随机 key 的问题
- RE-KP069：嵌套组件定义导致状态意外重置
- RE-KP070：状态保留与条件渲染

# Chapter 08：状态建模、提升状态与受控设计

- RE-KP071：Single Source of Truth
- RE-KP072：状态提升
- RE-KP073：受控组件
- RE-KP074：非受控组件
- RE-KP075：受控与非受控的选择
- RE-KP076：Props Drilling 的识别
- RE-KP077：状态放置原则
- RE-KP078：状态生命周期设计
- RE-KP079：状态归属与组件边界
- RE-KP080：有限状态思维

# Chapter 09：Reducer 与 Context

- RE-KP081：useReducer 基础
- RE-KP082：Action 建模
- RE-KP083：Reducer 必须保持纯净
- RE-KP084：Reducer 与 useState 的选择
- RE-KP085：复杂状态迁移集中管理
- RE-KP086：createContext
- RE-KP087：useContext
- RE-KP088：Provider 的现代写法
- RE-KP089：Context 默认值
- RE-KP090：Context 更新与重新渲染

# Chapter 10：Ref、DOM 与 Escape Hatches

- RE-KP091：useRef 保存非渲染数据
- RE-KP092：Ref 与 State 的区别
- RE-KP093：DOM Ref
- RE-KP094：React 19 ref as prop
- RE-KP095：Ref Callback
- RE-KP096：React 19 Ref Cleanup
- RE-KP097：useImperativeHandle
- RE-KP098：Imperative Handle 最小化
- RE-KP099：测量 DOM
- RE-KP100：管理焦点

# Chapter 11：Hooks 规则与自定义 Hook 设计

- RE-KP101：Hooks 只能在组件或自定义 Hook 顶层调用
- RE-KP102：Hooks 不能放在普通条件和循环中
- RE-KP103：use 是规则中的特殊例外
- RE-KP104：eslint-plugin-react-hooks
- RE-KP105：自定义 Hook 的命名规则
- RE-KP106：自定义 Hook 复用状态逻辑而非状态本身
- RE-KP107：自定义 Hook 参数设计
- RE-KP108：自定义 Hook 返回值设计
- RE-KP109：对象返回与 Tuple 返回的选择
- RE-KP110：自定义 Hook 中的 Effect

# Chapter 12：Effect 基础心智模型

- RE-KP111：useEffect 的真正用途：同步外部系统
- RE-KP112：Effect 与 Render 的区别
- RE-KP113：Effect 与 Event 的区别
- RE-KP114：Effect 依赖数组
- RE-KP115：Reactive Value
- RE-KP116：Cleanup Function
- RE-KP117：Effect 生命周期
- RE-KP118：挂载、依赖变化与卸载
- RE-KP119：StrictMode 下 Effect 重新执行
- RE-KP120：为什么开发环境看起来执行两次

# Chapter 13：Effect 高阶、竞态与 useEffectEvent

- RE-KP121：You Might Not Need an Effect
- RE-KP122：在 Render 中计算派生值
- RE-KP123：在事件中处理用户动作
- RE-KP124：Effect 中的数据请求竞态
- RE-KP125：Ignore Flag 与请求取消
- RE-KP126：AbortController 与 Effect
- RE-KP127：对象依赖导致重复执行
- RE-KP128：函数依赖导致重复执行
- RE-KP129：useEffectEvent
- RE-KP130：无限 Effect 循环诊断

# Chapter 14：Hooks 完整 API 与底层集成

- RE-KP131：useLayoutEffect
- RE-KP132：useEffect 与 useLayoutEffect 的选择
- RE-KP133：useInsertionEffect 的库作者场景
- RE-KP134：useId
- RE-KP135：useId 与 SSR 一致性
- RE-KP136：useSyncExternalStore
- RE-KP137：subscribe/getSnapshot 契约
- RE-KP138：getServerSnapshot 与 SSR
- RE-KP139：useDebugValue
- RE-KP140：外部 Store 集成原则

# Chapter 15：Render、Reconciliation 与 Commit

- RE-KP141：Render Phase
- RE-KP142：Commit Phase
- RE-KP143：Render 不等于 DOM 已更新
- RE-KP144：组件函数为什么可以重复执行
- RE-KP145：Pure Render
- RE-KP146：Reconciliation 基本目标
- RE-KP147：Element Type 与身份比较
- RE-KP148：Key 在 Reconciliation 中的作用
- RE-KP149：DOM 节点复用与替换
- RE-KP150：Props 更新与 DOM 更新

# Chapter 16：并发渲染、Transition 与 Deferred Value

- RE-KP151：Concurrent Rendering 的目标
- RE-KP152：Urgent Update 与 Non-urgent Update
- RE-KP153：startTransition
- RE-KP154：useTransition
- RE-KP155：isPending
- RE-KP156：Transition 中的异步更新
- RE-KP157：Action 与 Transition 的关系
- RE-KP158：useDeferredValue
- RE-KP159：延迟值与防抖的区别
- RE-KP160：输入框与昂贵列表的分离

# Chapter 17：Suspense、Lazy、use 与资源读取

- RE-KP161：Suspense Boundary
- RE-KP162：fallback
- RE-KP163：嵌套 Suspense
- RE-KP164：Reveal 顺序与 UX
- RE-KP165：lazy
- RE-KP166：组件级代码分割
- RE-KP167：Suspense 与路由框架的关系
- RE-KP168：use 读取 Promise
- RE-KP169：use 读取 Context
- RE-KP170：use 可以条件调用的特殊规则

# Chapter 18：React 19 Actions、Forms 与乐观 UI

- RE-KP171：React 19 Actions 模型
- RE-KP172：异步 Transition 与 Action
- RE-KP173：useActionState
- RE-KP174：pending 状态
- RE-KP175：useOptimistic
- RE-KP176：乐观更新与回滚
- RE-KP177：react-dom useFormStatus
- RE-KP178：form action 函数
- RE-KP179：表单 Action 与渐进增强
- RE-KP180：Action 错误处理

# Chapter 19：内置组件：Fragment、StrictMode、Profiler、Suspense、Activity

- RE-KP181：Fragment
- RE-KP182：带 key 的 Fragment
- RE-KP183：StrictMode
- RE-KP184：StrictMode 的双 Render 检查
- RE-KP185：StrictMode 的 Effect 检查
- RE-KP186：Profiler
- RE-KP187：Profiler 回调指标
- RE-KP188：Activity
- RE-KP189：Activity visible/hidden 模式
- RE-KP190：Activity 与状态保留

# Chapter 20：React DOM Client、Portal 与 DOM 语义

- RE-KP191：react-dom 与 react-dom/client
- RE-KP192：createRoot
- RE-KP193：root.render
- RE-KP194：root.unmount
- RE-KP195：hydrateRoot
- RE-KP196：createPortal
- RE-KP197：Portal 的 DOM 位置与 React 树位置
- RE-KP198：Portal 中事件冒泡
- RE-KP199：flushSync
- RE-KP200：dangerouslySetInnerHTML

# Chapter 21：SSR、Hydration、Streaming 与 Static APIs

- RE-KP201：CSR 与 SSR 的差异
- RE-KP202：Hydration
- RE-KP203：Hydration Mismatch
- RE-KP204：服务端与客户端输出一致性
- RE-KP205：renderToPipeableStream
- RE-KP206：renderToReadableStream
- RE-KP207：Streaming SSR
- RE-KP208：renderToString 的限制
- RE-KP209：prerender
- RE-KP210：React 19.2 Partial Pre-rendering 基本模型
- RE-KP211：prerenderToNodeStream
- RE-KP212：resume / resumeToPipeableStream
- RE-KP213：resumeAndPrerender / resumeAndPrerenderToNodeStream

# Chapter 22：Server Components、Server Functions 与服务端缓存

- RE-KP214：React Server Components 的目标
- RE-KP215：Server Component 与 Client Component 概念边界
- RE-KP216：RSC 依赖框架和 Bundler 集成
- RE-KP217：'use client' 指令
- RE-KP218：'use server' 指令
- RE-KP219：Server Function
- RE-KP220：可序列化 Props 边界
- RE-KP221：cache
- RE-KP222：cacheSignal
- RE-KP223：RSC 与 SSR 的区别

# Chapter 23：资源加载、Metadata、Styles 与 Scripts

- RE-KP224：React 19 Document Metadata
- RE-KP225：title/meta/link 的提升
- RE-KP226：样式表 precedence
- RE-KP227：Async Script 支持
- RE-KP228：preconnect
- RE-KP229：preload
- RE-KP230：preloadModule
- RE-KP231：preinit
- RE-KP232：preinitModule
- RE-KP233：React DOM 静态资源 API 的适用场景

# Chapter 24：错误边界、恢复与错误模型

- RE-KP234：Render Error 与 Event Error 的区别
- RE-KP235：Error Boundary 的职责
- RE-KP236：Class Error Boundary 最小实现
- RE-KP237：错误边界的粒度
- RE-KP238：Suspense 与 Error Boundary 配合
- RE-KP239：Hydration 错误
- RE-KP240：Root Error Callbacks
- RE-KP241：onCaughtError
- RE-KP242：onUncaughtError
- RE-KP243：onRecoverableError

# Chapter 25：性能分析、Memoization 与 React Compiler

- RE-KP244：先测量再优化
- RE-KP245：React DevTools Profiler
- RE-KP246：React Performance Tracks
- RE-KP247：memo
- RE-KP248：useMemo
- RE-KP249：useCallback
- RE-KP250：React Compiler 1.0 定位
- RE-KP251：Compiler 自动 Memoization
- RE-KP252：eslint-plugin-react-hooks Compiler Rules
- RE-KP253：'use no memo' 指令
- RE-KP254：Compiler 安装与 Vite 集成
- RE-KP255：Compiler 增量采用
- RE-KP256：Compiler Bailout 与调试
- RE-KP257：'use memo' 指令

# Chapter 26：组件架构与可维护性

- RE-KP258：组件边界按变化原因拆分
- RE-KP259：Locality of Behavior
- RE-KP260：状态靠近使用位置
- RE-KP261：组合优于配置爆炸
- RE-KP262：Headless Component 思想
- RE-KP263：Controlled/Uncontrolled 双 API 设计
- RE-KP264：Compound Component 设计
- RE-KP265：Context 作为实现细节
- RE-KP266：Custom Hook 作为能力边界
- RE-KP267：Presentational/Container 模式的现代使用

# Chapter 27：可访问性、表单语义与国际化边界

- RE-KP268：React 不改变 HTML 可访问性基础
- RE-KP269：语义 HTML 优先
- RE-KP270：label 与表单控件关联
- RE-KP271：useId 构建稳定关联
- RE-KP272：键盘交互
- RE-KP273：焦点管理
- RE-KP274：Portal/Dialog 的焦点责任
- RE-KP275：ARIA 属性在 JSX 中的写法
- RE-KP276：错误提示与 aria-describedby
- RE-KP277：动态状态播报

# Chapter 28：调试、DevTools 与开发期诊断

- RE-KP278：React DevTools Components 面板
- RE-KP279：Props/State/Hooks 检查
- RE-KP280：组件树搜索
- RE-KP281：Highlight Updates 的正确理解
- RE-KP282：Profiler Flamegraph
- RE-KP283：Profiler Ranked 视图
- RE-KP284：React Performance Tracks
- RE-KP285：StrictMode 诊断
- RE-KP286：Hooks Lint
- RE-KP287：Compiler Lint

# Chapter 29：React 测试接口与可测试设计

- RE-KP288：React act
- RE-KP289：act 的目的
- RE-KP290：用户行为驱动测试的原则
- RE-KP291：避免测试实现细节
- RE-KP292：组件输入输出契约
- RE-KP293：异步状态更新测试
- RE-KP294：Suspense 场景测试
- RE-KP295：Error Boundary 场景测试
- RE-KP296：Transition 场景测试
- RE-KP297：Form Action 场景测试

# Chapter 30：Legacy React、版本升级与迁移

- RE-KP298：Class Component 阅读能力
- RE-KP299：this.state 与 setState
- RE-KP300：componentDidMount
- RE-KP301：componentDidUpdate
- RE-KP302：componentWillUnmount
- RE-KP303：Class Error Boundary
- RE-KP304：forwardRef 的历史用途
- RE-KP305：ReactDOM.render 到 createRoot
- RE-KP306：ReactDOM.hydrate 到 hydrateRoot
- RE-KP307：Create React App 迁移
- RE-KP308：React 17 → 18 的关键迁移
- RE-KP309：React 18 → 19 的关键迁移
- RE-KP310：React 19.1 / 19.2 重要变化

# Chapter 31：React 安全边界

- RE-KP311：React 默认文本转义
- RE-KP312：dangerouslySetInnerHTML 风险
- RE-KP313：富文本 Sanitization 边界
- RE-KP314：前端环境变量不是秘密
- RE-KP315：Client Component 不可持有服务端密钥
- RE-KP316：Server Function 不是自动安全边界
- RE-KP317：Server Action 必须重新鉴权
- RE-KP318：RSC 可序列化数据泄漏风险
- RE-KP319：CSP 与 React 应用
- RE-KP320：React Server Components 安全公告跟踪习惯

# Chapter 32：React 内部原理：Fiber、Scheduler 与 Lane

- RE-KP321：为什么需要 Fiber 架构
- RE-KP322：Fiber Node 的概念
- RE-KP323：Fiber Tree
- RE-KP324：Current Tree 与 Work-in-Progress Tree
- RE-KP325：Render/Reconciliation Work Loop 直觉
- RE-KP326：Scheduler 的目标
- RE-KP327：Priority 的概念
- RE-KP328：Lane 模型的直觉
- RE-KP329：可中断工作
- RE-KP330：实现细节不属于稳定公共 API

# Chapter 33：React 库、组件包与跨应用复用

- RE-KP331：应用组件与公共库组件的差异
- RE-KP332：Peer Dependency 中的 React
- RE-KP333：避免打包两份 React
- RE-KP334：Invalid Hook Call 与多 React 实例
- RE-KP335：Library API 的 React 版本边界
- RE-KP336：React Compiler 编译库
- RE-KP337：ESM 与类型声明边界
- RE-KP338：SSR 安全组件设计
- RE-KP339：RSC 兼容性声明
- RE-KP340：SemVer 与组件行为兼容

# Chapter 34：综合应用边界与架构验收

- RE-KP341：React Core 与 Router 的职责边界
- RE-KP342：React Core 与客户端状态库的职责边界
- RE-KP343：React Core 与服务端状态库的职责边界
- RE-KP344：React Core 与表单库的职责边界
- RE-KP345：React Core 与 Framework 的职责边界
- RE-KP346：React Core 与 TypeScript 的职责边界
- RE-KP347：Effect 使用审计
- RE-KP348：性能优化证据化
- RE-KP349：SSR/RSC 是否必要的架构判断
- RE-KP350：React 升级 Checklist

---

# 四、重点实验 Labs

## Lab 01：Render Snapshot 与 Update Queue

用同一个计数器验证状态快照、批处理、连续更新与函数式更新，逐步解释每次输出为什么不同。

## Lab 02：Effect 故障实验室

主动制造无限 Effect、竞态请求、忘记清理、对象依赖和 stale closure，再逐个修复，并说明哪些逻辑其实不需要 Effect。

## Lab 03：组件 Identity 与 Key

通过表单、Tab、列表重排和条件渲染验证状态何时保留、何时重置，禁止只背“key 用来优化列表”。

## Lab 04：Concurrent UX

构造高开销筛选页面，对比普通更新、`startTransition`、`useTransition` 与 `useDeferredValue` 的交互差异。

## Lab 05：Suspense 与 use

建立可 Suspense 的资源读取实验，验证 `use(Promise)`、嵌套 Boundary、错误边界和 Loading Reveal。

## Lab 06：React 19 Actions

实现保存表单，包含 pending、服务端错误、乐观更新、回滚、`useActionState`、`useOptimistic` 和 `useFormStatus`。

## Lab 07：Activity

实现带草稿状态的可隐藏工作区，比较条件卸载与 `<Activity mode="hidden">` 在状态和 Effect 行为上的差异。

## Lab 08：Hydration 故障实验室

制造时间、随机数、浏览器 API 和非法嵌套造成的 Hydration Mismatch，并分别修复。

## Lab 09：Profiler + Compiler

先用 Profiler 找到性能瓶颈，再比较手工 memoization 与 React Compiler 的优化结果，记录收益与代价。

## Lab 10：Fiber 心智模型

不修改 React 源码，只通过调试与最小示例把 Element、Fiber、Render、Commit、Transition 和 Lane 概念画成执行图。

---

# 五、综合项目

## Project 01：React Core Workbench

只使用 React/React DOM 构建一个中型后台模块，覆盖组件组合、状态建模、Reducer、Context、Ref、Effect、Portal、错误边界和性能诊断，不引入 Redux/TanStack Query 等生态库。

## Project 02：Concurrent Search Console

构建大数据筛选控制台，加入 Transition、Deferred Value、Suspense、Lazy、错误恢复与 Activity，对比优化前后的交互体验。

## Project 03：React 19 Action Center

构建提交、审批、撤销和乐观状态更新流程，使用 Actions、Form Actions、`useActionState`、`useOptimistic`、`useFormStatus`。

## Project 04：SSR / Hydration Laboratory

建立最小服务端渲染应用，覆盖 Streaming、Suspense、Hydration、错误恢复、静态预渲染与 Partial Pre-rendering 的概念验证。

## Project 05：RSC Boundary Demo

在支持 RSC 的框架环境中验证 Server/Client Component 边界、序列化、Server Function、`cache`/`cacheSignal` 与安全边界；重点理解 React 机制，不把框架约定当 React 本体。

## Project 06：React Component Library

发布一组可复用组件，处理 peerDependencies、Portal、SSR、RSC/Client-only 声明、React Compiler、API 兼容和 SemVer。

## Project 07：Legacy Migration

把一个 React 17/18 风格项目渐进迁移到 React 19：`createRoot`、StrictMode、Ref、新 Actions 能力、Compiler 评估和回归报告。

---

# 六、与其他模块的分工

| 内容 | 本模块 | 后续/其他模块 |
|---|---|---|
| React 核心、Hooks、Effect、Ref、渲染模型 | 深入 | — |
| React DOM、SSR、Hydration、RSC、Compiler | 深入 | 框架专项再次应用 |
| React + TypeScript | 只做接口边界提示 | TypeScript Module 13 深入 |
| React Router / Router Framework | 只解释 React 边界 | Module 21 深入 |
| Redux Toolkit / Zustand | 只解释何时需要外部 Store | Module 21 深入 |
| TanStack Query / SWR 等服务端状态 | 只解释职责边界 | Module 21 深入 |
| React Hook Form 等表单库 | 只解释 React 表单原语 | Module 21 深入 |
| 测试体系 | 覆盖 React `act` 与可测试设计 | 测试阶段深入 |
| 可访问性与 Web 安全 | 覆盖 React 特有边界 | HTML/安全阶段深入 |
| 组件库与设计系统 | 覆盖 React API/发布边界 | 设计系统阶段深入 |

---

# 七、阶段验收标准

1. 能够解释 JSX、React Element、Component、Fiber、DOM Node 之间的关系。
2. 能够不依赖 Effect 完成所有本应在 Render 或 Event 中完成的逻辑。
3. 能够解释状态快照、自动批处理、Update Queue、组件 Identity 与 Key。
4. 能够完整使用常用 Hooks，并说明 `useLayoutEffect`、`useInsertionEffect`、`useSyncExternalStore` 等特殊 Hook 的适用边界。
5. 能够用 React 19 Actions 与乐观 UI 完成真实提交流程。
6. 能够解释 Suspense、Transition、Activity 解决的分别是什么问题。
7. 能够解释 CSR、SSR、Hydration、Streaming、RSC、Partial Pre-rendering 的差异和组合关系。
8. 能够使用 DevTools/Profiler/Performance Tracks 用证据定位性能问题。
9. 能够解释 React Compiler 1.0 与 `memo` / `useMemo` / `useCallback` 的新关系。
10. 能够设计 Context、Custom Hook、Compound Component、Controlled/Uncontrolled API，而不是堆全局状态。
11. 能够阅读和迁移 Class Component、旧 ReactDOM API、`forwardRef` 等遗留代码。
12. 能够说清 Fiber、Scheduler、Lane 的高层机制，并明确它们不是稳定业务 API。
13. 能够为一个中大型 React 应用给出状态分类、组件边界、副作用治理、性能预算和升级策略。

---

# 八、施工进度

当前状态：**React 课程地图 v1 已建立，共 350 个原子知识点；详细课程文件和源码待生成。**

| 范围 | 状态 |
|---|---|
| Chapter 01-34 | 已规划 |
| RE-KP001 ~ RE-KP350 | 已规划 |
| Labs 01-10 | 已规划 |
| Projects 01-07 | 已规划 |
| 原子知识点 README | 待生成 |
| 可运行源码 | 待生成 |
| 练习与参考答案 | 待生成 |

默认施工顺序：先完成 Chapter 01-18 的 React 核心与现代 API，再进入 React DOM/SSR/RSC/Compiler，最后学习内部原理、迁移和架构治理。