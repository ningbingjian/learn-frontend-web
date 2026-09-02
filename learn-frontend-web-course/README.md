# Learn Frontend Web Course

> 一套从完全零基础一路学习到极其资深前端工程师 / Staff / Principal / 前端架构师的系统化课程总纲。
>
> 版本：v1.1-draft  
> 基线日期：2026-09-02  
> 课程编写规范：[`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md)

---

# 1. 课程目标

这不是 HTML/CSS/JavaScript API 大全，不是 React/Vue 快速入门，也不是面试八股合集。

整套课程最终希望建立下面这条能力链：

```text
完全零基础
  ↓
能够独立完成静态 Web 页面
  ↓
能够使用 JavaScript / TypeScript 构建真实 Web 应用
  ↓
能够使用 React / Vue 构建企业级前端应用
  ↓
能够负责工程化、测试、全栈渲染与多端交付
  ↓
能够定位浏览器、网络、内存、性能、安全和线上故障
  ↓
能够设计大型前端应用、组件平台与开发基础设施
  ↓
能够负责多团队前端平台、迁移、治理与技术战略
  ↓
Staff / Principal / 极其资深前端架构师
```

最终不仅要会“使用某项技术”，还必须能够回答：

- 它为什么存在，解决什么问题？
- 从空项目开始怎样一步一步使用？
- 浏览器、JavaScript Runtime、框架和工具链为什么这样工作？
- 核心数据结构、调度、协议、编译、缓存和运行模型是什么？
- 关键源码在哪里，怎样通过断点、Profiler、Trace、Network、Heap 等证据验证？
- 性能成本在哪里，CPU、内存、网络、DOM、Bundle 和服务器成本如何衡量？
- 会出现哪些真实故障，怎样稳定复现、定位、修复并防止回归？
- 安全、隐私、A11Y、国际化和兼容边界是什么？
- 什么场景应该使用，什么场景不应该使用？替代方案和 Trade-off 是什么？
- 系统从一个页面增长为大型产品、从 5 人团队增长到 100 人团队后怎样演进？
- 如何建设标准、平台、Golden Path、质量门禁和组织治理机制？

最终形成：

```text
实现能力
+ Web / 浏览器原理能力
+ JavaScript / TypeScript 深度
+ React / Vue 框架能力
+ 工程能力
+ 源码能力
+ 性能能力
+ 安全与可靠性能力
+ 故障诊断能力
+ 全栈与云交付能力
+ 架构设计与演进能力
+ 平台建设能力
+ 技术治理与组织影响能力
+ AI 原生前端能力
```

---

# 2. Stage 与 Module 的边界

本课程参考 `learn-java-course` 的课程组织思想：

> **Stage 表示一个较完整的技术 / 能力领域；Module 表示这个领域中的一个独立知识主题。**

因此不再按照下面这种方式拆 Stage：

```text
React 基础 Stage
→ React 高级 Stage
→ React SSR Stage
→ React 源码 Stage
```

而是：

```text
Stage：React 完整体系
  ↓
Module：State
Module：Effect
Module：Router
Module：Suspense
Module：SSR
Module：RSC
Module：Fiber
Module：Migration
...
```

React 只学习一次，但这一次从零一路学到源码、性能、服务端、生产架构和治理。

Vue 同理。

## 2.1 一个 Module，一次学透

同一个知识主题只能有一个 Owner Module。

一个核心 Module 原则上必须覆盖：

1. 背景与问题；
2. 基础概念；
3. 从零实践；
4. 完整能力；
5. 工程实践；
6. 高级特性与复杂边界；
7. Wrong Way；
8. 故障模式；
9. Debug / 诊断；
10. 底层原理；
11. 关键源码（适用时）；
12. 性能；
13. 安全 / A11Y / 兼容（适用时）；
14. 测试验证；
15. Production Boundary；
16. 替代方案与 Trade-off；
17. 综合实践。

禁止以后再通过：

```text
XXX 高级篇
XXX 深入篇
XXX 原理篇
XXX 源码篇
```

补前面没有讲透的内容。

复杂 Module 可以拆成很多 Lesson，但它仍属于同一个 Module。

---

# 3. 项目与实验如何进入正常学习路径

项目、Failure Lab、Performance Lab、Source Lab 不是另一条学习支线。

它们直接出现在正常学习顺序中：

```text
Module
↓
Module
↓
知识已经足够组合
↓
综合实践
↓
继续 Module
↓
Failure / Performance / Source 实验
↓
继续 Module
↓
阶段综合项目
↓
进入下一 Stage
```

项目规模随着学习内容自然增长，不机械规定每个 Module 都必须有 Small / Medium / Large 三类项目。

## 3.1 Knowledge Ceiling

任何综合实践使用的核心技术必须满足：

```text
项目使用的核心知识 ⊆ 截至当前位置已经正式教授的知识
```

禁止为了项目方便突然引入尚未学习的框架、状态库、请求库、构建工具或后端能力，然后告诉学习者“先复制，后面再讲”。

如果必须使用尚未学习的教学辅助设施，例如 HTTP 课程需要一个简单 Mock Server，必须明确：

- 它只是教学辅助设施；
- 当前不要求理解内部实现；
- 提供完整启动方式和预期结果；
- 对应知识会在哪个 Stage 正式学习。

---

# 4. 每一课都必须可复刻

需要代码、命令或实验的 Lesson 只有两种合法起点。

### A. 从零状态开始

```text
空目录 / 最小空项目
→ README 手把手创建
→ 得到当前 Lesson 完整最终源码
```

### B. 明确从上一课最终项目演进

必须先提供：

```text
Step 0：准备本课起始项目
```

并写清：

1. 上一课最终源码在哪里；
2. 复制哪个目录；
3. 复制到当前课什么位置；
4. 当前目录树是什么；
5. 是否重新安装依赖；
6. 在哪个目录执行什么命令；
7. 复制后的基线应该看到什么；
8. 本课会新增、修改、删除哪些文件。

每一课最终源码必须是一份可以独立安装、运行、测试和验证的完整工程。

课程不能因为“上一课讲过了”“这个很简单”“这是常识”“IDE 会提示”“读者应该懂”而省略当前课程需要的操作。

所有关键修改必须尽量明确：

```text
在哪个目录
→ 哪个文件
→ 创建 / 修改 / 删除
→ 找到哪段代码
→ 在哪里增加 / 替换
→ 写什么
→ 为什么这样写
→ 现在能不能运行
→ 怎么运行
→ 应该看到什么
→ 为什么出现
→ 理论上叫什么
```

详细要求以 [`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md) 为准。

---

# 5. 总体学习路线

```text
Stage 00  开发环境、命令行、Git 与工程师基本功
Stage 01  计算机组成、操作系统、Linux 与网络底层基础
Stage 02  Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型
Stage 03  HTML、语义、表单、媒体、SEO 与可访问性
Stage 04  CSS、布局、响应式、现代 CSS、动画、Token 与样式架构
Stage 05  JavaScript 语言、对象体系、集合、模块、元编程与设计抽象
Stage 06  JavaScript Async、Runtime、Event Loop、Memory、Engine 与算法
Stage 07  DOM、Event、Form、History 与原生浏览器应用
Stage 08  TypeScript 从基础到高级类型、Schema、SDK 与类型架构
Stage 09  浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform
Stage 10  HTTP/2/3、缓存、API、实时通信、流式、数据一致性与离线韧性
Stage 11  React 完整体系：从项目启动到 RSC、Fiber、源码、迁移与大型架构
Stage 12  Vue 完整体系：从 SFC 到响应式、Renderer、Compiler、SSR、源码与架构
Stage 13  多框架范式、Angular 企业认知、Web Components 与历史系统迁移
Stage 14  UI Engineering、复杂组件、Design System、A11Y、国际化与样式平台
Stage 15  Node.js Runtime、CLI、Stream、Process 与前端服务工具
Stage 16  Compiler、AST、Bundler、Package、Monorepo 与 Developer Experience
Stage 17  静态分析、Unit、Component、Integration、E2E、Visual 与质量工程
Stage 18  BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端
Stage 19  数据与平台集成：数据库认知、CMS、Search、Object Storage、Payment、Analytics
Stage 20  PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程
Stage 21  Realtime Collaboration、Local-first、离线同步、OT/CRDT 与多人系统
Stage 22  SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化
Stage 23  Schema-driven UI、动态表单、低代码、Visual Editor 与插件式业务平台
Stage 24  前端性能工程、RUM、Core Web Vitals、Memory、Capacity 与规模治理
Stage 25  Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理
Stage 26  Observability、SLO、故障治理、CI/CD、Container、Kubernetes、GitOps 与云交付
Stage 27  DDD、模块化、Microfrontend、Plugin、Multitenancy 与大型前端架构
Stage 28  Frontend Platform、迁移、技术债、Governance、成本、产品与 Staff/Principal 影响力
Stage 29  AI-assisted Development、MCP、AI Native Frontend、Agent UX、安全与评估
Stage 30  Principal 级综合毕业项目与正式架构答辩
```

---

# Stage 00：开发环境、命令行、Git 与工程师基本功

## 阶段目标

从完全没有开发经验，达到能够独立创建目录、编辑代码、运行本地服务、定位基本错误、使用 Git 管理学习过程。

## Module 00.01：程序、代码与运行环境

程序、源代码、编译/解释、CPU、内存、磁盘、进程、线程、端口、客户端/服务端、依赖、构建产物，以及浏览器与 Node.js 分别是什么运行环境。

## Module 00.02：文件系统、Terminal 与 Shell

路径、绝对/相对目录、权限、环境变量、PATH、管道、重定向、退出码，以及 `pwd/ls/cd/cp/mv/rm/cat/grep/find/curl/lsof/ps/kill` 等开发排障命令。

## Module 00.03：编辑器、Language Server 与 Debug 基础

工作区、搜索、格式化、重构、Language Server、断点、变量、Call Stack、Console、Terminal 与浏览器 DevTools 的职责。

## Module 00.04：Git 与 GitHub

工作区、暂存区、Commit、Blob/Tree/Ref/HEAD、Branch、Merge、Rebase、Conflict、Revert、Remote、PR、Review、Tag、Release 和安全提交习惯。

### 综合实践：Frontend Developer Bootstrap

从空目录创建最小 HTML 页面，启动本地 HTTP 服务，使用 Git 完成分支、Commit、冲突解决、PR 和 Tag。

### 阶段验收

能够在不依赖“已有脚手架”的情况下创建工作目录、运行程序、定位端口问题，并解释 Git 中一次修改从工作区到 Commit 的全过程。

---

# Stage 01：计算机组成、操作系统、Linux 与网络底层基础

## Module 01.01：CPU、Memory Hierarchy 与前端性能直觉

CPU、寄存器、指令、Cache、Cache Line、内存层级、分支预测和这些机制如何影响 JavaScript、浏览器、Node、WASM 性能。

## Module 01.02：Process、Thread、Scheduling 与系统调用

Process/Thread、Kernel/User Mode、Context Switch、Scheduler、Signal、System Call、CPU Utilization 和 Load Average。

## Module 01.03：Virtual Memory、File System 与 IO

Page、Page Fault、Swap、mmap、File Descriptor、inode、Page Cache、fsync、Buffer 与 IO 成本。

## Module 01.04：Linux 生产诊断

`top/vmstat/iostat/pidstat/ss/lsof/tcpdump/strace/perf`、`/proc`、ulimit、cgroup、namespace 的基础认知。

## Module 01.05：Ethernet、IP、Routing、NAT 与 UDP

MAC、ARP、IPv4/IPv6、CIDR、Subnet、Gateway、Routing、ICMP、NAT、UDP。

### 综合实验：Linux & Network Lab

启动本地 HTTP/TCP 服务，使用系统工具观察 Process、Port、Socket、CPU、Memory、File Descriptor 和 Packet。

---

# Stage 02：Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型

## Module 02.01：Internet 与 URL

Internet、ISP、AS、Data Center、Cloud、Origin、Proxy、CDN；URL Scheme/Host/Port/Path/Query/Fragment。

## Module 02.02：DNS

Recursive/Authoritative、A/AAAA/CNAME、TTL、Cache、DNS Failure 和诊断。

## Module 02.03：TCP 深入

Handshake、Sequence/ACK、Window、Congestion、Retransmission、RTT/RTO、TIME_WAIT、CLOSE_WAIT、KeepAlive。

## Module 02.04：TLS / HTTPS

Certificate、CA、Handshake、Key Exchange、Cipher、SNI、ALPN、证书错误、HTTPS 安全边界。

## Module 02.05：HTTP 请求响应模型

Method、Status、Header、Body、Content Type、Compression、Cookie、Redirect、Idempotency。

## Module 02.06：Browser → CDN → Gateway → Application 全链路

Static Site、MPA、SPA、SSR、SSG、BFF、API、DB、Object Storage、CDN 的整体角色。

### 综合实验：从 URL 到页面

使用 `curl`、DevTools Network、DNS 工具与抓包，解释一次真实请求从地址栏到服务器响应的完整路径。

---

# Stage 03：HTML、语义、表单、媒体、SEO 与可访问性

## Module 03.01：HTML Document 与 Parsing

DOCTYPE、html/head/body、Meta、Charset、Viewport、Tokenizer、Tree Builder、DOM、错误恢复。

## Module 03.02：Semantic Content

Heading、Paragraph、List、Link、Article、Section、Nav、Main、Aside、Footer、Time、Code、Quote。

### 综合实践：语义化个人 / 产品介绍页

只使用已经学习的 HTML 与基础浏览器能力完成结构正确的内容页面。

## Module 03.03：Image、Responsive Image 与 Media

img、alt、picture、srcset、sizes、figure、audio/video、track、lazy loading。

## Module 03.04：Form

Form/Input/Select/Textarea/Button、Label、Fieldset、Validation、Autocomplete、Multipart、File Upload 语义。

## Module 03.05：Table 与复杂内容结构

Caption、thead/tbody、th/scope、复杂表头与数据表语义。

## Module 03.06：A11Y 基础

Keyboard、Focus、Accessibility Tree、Accessible Name、原生语义优先、ARIA 使用边界。

## Module 03.07：SEO 与 Progressive Enhancement

Title/Meta、Canonical、Robots、Sitemap、Structured Data 基础、无 JavaScript 场景和渐进增强。

### 阶段综合项目：企业内容网站

完成多页面产品站 / 帮助中心，包含导航、内容、表单、媒体、表格、SEO 和键盘可访问性。

---

# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

## Module 04.01：CSS Syntax、Selector 与 Cascade

Selector、Specificity、Inheritance、Origin、Importance、Cascade Layer、Scope、Computed Style。

## Module 04.02：Box Model 与 Formatting Context

Content/Padding/Border/Margin、box-sizing、Normal Flow、BFC/IFC、Containing Block。

## Module 04.03：Position、Stacking Context 与 Overflow

relative/absolute/fixed/sticky、z-index、Stacking Context、Scroll Container、Overflow。

## Module 04.04：Flexbox

Axis、Basis、Grow/Shrink、Alignment、Wrapping、Min Size Trap 和典型布局。

### 综合实践：后台管理布局

使用 HTML + CSS 完成导航、侧栏、内容区、卡片流和复杂表单布局。

## Module 04.05：Grid

Track、Line、Area、fr、minmax、Auto Placement、Subgrid、复杂 Dashboard。

## Module 04.06：Responsive Design

Mobile First、Media Query、Container Query、Fluid Layout、Viewport、Safe Area。

## Module 04.07：Typography、Color、Image 与 Theme

Web Font、Fallback、FOIT/FOUT、现代颜色空间、Dark Mode、High Contrast、SVG/Icon。

## Module 04.08：Modern CSS

`:has()`、`:is()`、`:where()`、Logical Properties、Intrinsic Sizing、Aspect Ratio、Scroll Snap、Baseline/Feature Detection。

## Module 04.09：Animation 与 Rendering Cost

Transition、Keyframe、Transform、View Transition 基础、Scroll-driven Animation、Reduced Motion、Layout/Paint/Composite。

## Module 04.10：Design Token 与 CSS Architecture

BEM/OOCSS/ITCSS/Utility/CSS Modules/CSS-in-JS 比较、Token、Theme、Layer、Stylelint、Migration。

### 阶段综合项目：响应式产品官网 / Dashboard

在 Stage 03 项目基础上升级响应式、主题、现代布局、动画和 Token；提交多视口和性能证据。

---

# Stage 05：JavaScript 语言、对象体系、集合、模块、元编程与设计抽象

## Module 05.01：Value、Type、Expression 与 Conversion

Undefined/Null/Boolean/Number/BigInt/String/Symbol/Object、Truthy/Falsy、Equality、Conversion。

## Module 05.02：Variable、Scope 与 Control Flow

let/const/var、Lexical Scope、Hoisting、TDZ、Condition、Loop、Early Return。

## Module 05.03：Function、Closure 与 this

Function Form、Parameter、Rest、Higher-order Function、Closure、this Binding、Pure Function、副作用。

### 综合实践：价格 / 订单规则计算器

使用函数、数组、对象和控制流完成可测试的业务计算程序。

## Module 05.04：Object、Array 与 Collection

Object、Descriptor、Array、Map、Set、WeakMap、WeakSet、Date、Intl、RegExp、URL。

## Module 05.05：Prototype、Class 与 Object Model

Prototype Chain、new、Constructor、Class、Private Field、Inheritance、Composition。

## Module 05.06：Iterator、Generator、Symbol 与 Protocol

Iterable、Iterator、Async Iterator 前置、Generator、Well-known Symbol。

## Module 05.07：Proxy、Reflect 与 Meta Programming

Trap、Invariant、Virtual Object、Validation、Reactivity 前置。

## Module 05.08：ES Module

Import/Export、Live Binding、Circular Dependency、Dynamic Import、Native ESM。

## Module 05.09：Error 与 Defensive Programming

Error、Cause、Try/Catch/Finally、Custom Error、Boundary、Don't Swallow Error。

## Module 05.10：Programming Paradigm 与 Design Pattern

Functional/OOP、Composition、Observer、Command、Strategy、Adapter、Facade、Factory、State、Middleware、Plugin。

### 阶段综合项目：模块化 JavaScript 业务应用核心

构建不依赖 DOM 的业务核心库，包含领域模型、事件、错误、模块边界、测试和插件式扩展。

---

# Stage 06：JavaScript Async、Runtime、Event Loop、Memory、Engine 与算法

## Module 06.01：Promise 一次学透

State、Then Chain、Resolution、Error Propagation、Finally、all/allSettled/race/any。

## Module 06.02：Async/Await 与 Concurrency Control

Serial/Parallel、Dependency Task、Concurrency Limit、Timeout、Abort、Retry、Backoff、Jitter。

### Failure Lab：Race、Timeout 与重复任务

制造乱序响应、超时、重复调用和部分失败，使用日志和测试证明修复。

## Module 06.03：Browser Event Loop

Call Stack、Task、Microtask、Rendering Opportunity、rAF、Idle、Scheduler、Observer Callback Timing。

## Module 06.04：Node.js Event Loop 差异

Timer、I/O Callback、Immediate、Microtask 与浏览器差异。

## Module 06.05：Memory Model 与 Garbage Collection

Reachability、Heap、Closure Retention、Generational/Incremental/Concurrent GC 高层模型。

## Module 06.06：Memory Leak Debug

Global、Timer、Listener、Detached DOM、Cache、Closure、Heap Snapshot、Retainer Path。

## Module 06.07：JavaScript Engine

Parse、AST、Bytecode、Interpreter、JIT、Shape/Hidden Class、Inline Cache、Optimization/Deoptimization 与性能误区。

## Module 06.08：Data Structure 与 Algorithm

Stack、Queue、Hash、Tree、Trie、Graph、Heap、LRU、Complexity、前端树遍历/搜索/调度/缓存场景。

### 阶段综合项目：JavaScript Runtime & Performance Lab

实现并发任务队列、LRU、树形数据处理；制造 Long Task、内存泄漏和 Deopt 观察实验。

---

# Stage 07：DOM、Event、Form、History 与原生浏览器应用

## Module 07.01：DOM Tree 与 Node API

Document/Element/Text/Attribute、Query、Traversal、Create/Insert/Replace/Delete、Template/Fragment。

## Module 07.02：DOM Event System

Capture/Target/Bubble、Delegation、Default、Passive、Once、Custom Event、Shadow Retargeting 前置。

## Module 07.03：Form DOM 与 Input Events

FormData、Constraint Validation、beforeinput/input/composition、Selection、IME、异步校验。

### 综合实践：动态数据表格 + 表单编辑器

使用 DOM/Event/Form 完成增删改查、过滤、校验和焦点管理。

## Module 07.04：History、Location 与 Client-side Routing

push/replace/back/forward、Deep Link、404、Scroll Restore、Navigation API 认知。

## Module 07.05：Fetch 与 Browser Network API

Request/Response、Header、Body、Stream、Abort、HTTP Error vs Network Error、CORS 前置。

## Module 07.06：Browser Storage 基础

Cookie、LocalStorage、SessionStorage、Storage Event、序列化、版本与过期。

## Module 07.07：原生 SPA Architecture

View/State/Service/Repository/Router/Infrastructure、Client/Server/URL/Persistent State、Error/Loading/Cache。

### 阶段综合项目：Vanilla JavaScript SPA

完成路由、查询、编辑、持久化、错误处理、取消请求和测试，不依赖前端框架。

---

# Stage 08：TypeScript 从基础到高级类型、Schema、SDK 与类型架构

## Module 08.01：TypeScript Compile Model 与 Strict Basics

Type Erasure、Compiler/Language Service、Primitive/Union/Intersection/Unknown/Never、Strict Config。

## Module 08.02：Interface、Type、Function 与 Narrowing

Structural Typing、Excess Property、Overload、Type Guard、Assertion Function。

## Module 08.03：Generic、keyof、Indexed Access

Constraint、Default、Generic API、输入输出关系保持。

## Module 08.04：Mapped、Conditional、infer、Template Literal Type

Mapped Modifier、Key Remapping、Conditional Distribution、infer、Recursive Type、Route/Token String Protocol。

### 综合实践：类型安全 Router / Event Bus

使用高级类型实现路由参数推导、事件名与 payload 关联、错误结果模型。

## Module 08.05：Discriminated Union 与 State Modeling

Exhaustiveness、Impossible State、State Machine、Brand/Opaque Type。

## Module 08.06：Declaration、Module Resolution 与 Package Types

.d.ts、Ambient、Augmentation、Exports/Imports、ESM/CJS、Dual Package Hazard。

## Module 08.07：Runtime Schema Validation

TypeScript 不验证外部数据；Schema/Parser/Decoder、Zod 类方案、JSON Schema、Error Aggregation。

## Module 08.08：OpenAPI / GraphQL Codegen 与 Contract

Shared Type vs Generated Client、Schema Evolution、Backward Compatibility。

## Module 08.09：Large-scale Type Architecture

Project Reference、Incremental、Monorepo、Public API、SemVer、Type Test、Compile Performance、Migration Governance。

### 阶段综合项目：Type-safe API SDK

把原生 SPA 的数据访问抽成独立 SDK，包含 runtime validation、声明输出、类型测试、版本和消费示例。

---

# Stage 09：浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform

## Module 09.01：Browser Multi-process Architecture

Browser/Renderer/Network/GPU Process、Site Isolation、OOPIF、Sandbox、IPC、Navigation Commit。

## Module 09.02：HTML/CSS Parse 与 Rendering Pipeline

Tokenizer、Tree Builder、Preload Scanner、DOM/CSSOM、Style、Layout、Paint、Raster、Composite、Layer。

### Browser Lab：从导航到首屏 Trace

录制真实 Performance Trace，逐段解释 Network、Parse、Script、Style、Layout、Paint、Composite。

## Module 09.03：Rendering Performance Mechanism

Forced Layout、Layout Thrashing、Layout Shift、DOM Size、Layer Explosion、Long Animation Frame。

## Module 09.04：Page Lifecycle、BFCache、Focus 与 Selection

DOMContentLoaded/Load、Visibility、pagehide/pageshow、Freeze、BFCache、Focus、Selection。

## Module 09.05：IndexedDB、Cache Storage、OPFS

Transaction、Schema Version、Migration、Quota、Recovery、Private Mode、多标签一致性。

## Module 09.06：Worker Family

Dedicated/Shared/Service Worker、Worklet、Structured Clone、Transferable、MessageChannel、BroadcastChannel、Web Locks。

## Module 09.07：PWA 与 Offline

App Shell、Precache、Runtime Cache、Background Sync、Offline Queue、Service Worker Update/Failure。

## Module 09.08：Web Platform Capability

Clipboard、File System Access、Notification、Geolocation、Share、Permission、Feature Detection、Baseline、Progressive Enhancement。

### 阶段综合项目：Offline-capable Browser App

基于 TypeScript 应用加入 IndexedDB、Worker、Service Worker、离线读取、待同步队列和多标签协调。

---

# Stage 10：HTTP/2/3、缓存、API、实时通信、流式、数据一致性与离线韧性

## Module 10.01：HTTP/1.1 Deep Dive、HTTP/2、HTTP/3

Persistent Connection、HOL、Multiplex、HPACK/QPACK 高层、QUIC、0-RTT、Connection Migration。

## Module 10.02：Browser/CDN/Origin Multi-layer Cache

Cache-Control、ETag、Vary、Immutable、Stale、Cache Key、Purge、Shield、Negative Cache、Tenant Cache Isolation。

### Network Lab：Browser → CDN → Origin Cache

验证 200/304、Age、Cache Status、Hash Asset、错误 Cache Key 与失效策略。

## Module 10.03：REST、GraphQL、RPC 与 API Contract

Resource、Method、Cursor Pagination、OpenAPI、GraphQL、gRPC-Web/Connect/tRPC 认知、Evolution。

## Module 10.04：Write Consistency

Idempotency Key、Optimistic Concurrency、Version/ETag、Duplicate Submit、Partial Success、Compensation。

## Module 10.05：Realtime Transport

Polling/Long Polling/SSE/WebSocket/WebRTC Data/WebTransport、Heartbeat、Reconnect、Auth Refresh、Backpressure。

## Module 10.06：Message Protocol 与 Streaming

Envelope、Version、Sequence、Ack、Dedup、Ordering、Replay、ReadableStream、Incremental Parsing。

## Module 10.07：Upload 与 Object Storage Transfer

Multipart、Signed URL、Chunk、Resume、Checksum、Cancel、Concurrency。

## Module 10.08：Offline Write、Outbox 与 Conflict

Pending Queue、Operation Log、Retry、Conflict、LWW、Manual Merge、OT/CRDT 前置。

### 阶段综合项目：Realtime + Offline Data App

完成实时通知、断线重连、流式数据、分片上传、离线写入和冲突提示，并进行弱网/乱序/重复消息测试。

---

# Stage 11：React 完整体系

> React 只设置这一个 Stage。所有 React Owner Module 从零开始一路进入企业开发、并发、SSR/RSC、源码、性能、Library、迁移和架构，不再拆“React 基础 / 高级 / 源码 Stage”。

## Module 11.01：React Problem Domain 与 Project Bootstrap

从空目录建立 React + TypeScript 项目；理解 package、Vite、index.html、main.tsx、createRoot、Root、render、App、React Tree 与 DOM Tree。

## Module 11.02：JSX、React Element、React Node 与 Component

JSX Transform、Expression/Attribute/Children/Fragment、Element Object、`App`/`App()`/`<App />`、Component Identity、Pure Render、Rules of React、StrictMode。

## Module 11.03：Props、Children、Composition 与 One-way Data Flow

Props、Function Prop、children、Immutable Input、Component Composition、TypeScript Props、基础 API Design。

## Module 11.04：Conditional Rendering、List、Key 与 Identity

Stable Key、错误 index key、Reorder/Insert/Delete、State Preservation 前置。

### 综合实践：React Product Catalog

使用 Component/Props/Conditional/List/Key 构建商品目录；主动制造错误 Key 导致的 UI/State 问题。

## Module 11.05：State 与 useState 一次学透

State Why、Lazy Init、Setter、Object/Array Update、Immutable、Same-value、Hook Storage 前置。

## Module 11.06：Render Snapshot、Update Queue 与 Batching

Closure、Functional Updater、Replace Update、Batch、一次 Update 从 Event 到 Render 的完整行为模型与源码入口。

## Module 11.07：React Event System

Synthetic Event、Capture/Bubble、Target/currentTarget、Default Action、Keyboard/Pointer/Input/Composition、Event Priority。

## Module 11.08：Form、Controlled / Uncontrolled

Input/Select/Textarea/Checkbox/Radio/File、Selection/IME、Validation、大表单基础、A11Y。

### 综合实践：React Order Editor v1

使用 Component、Props、State、Event、List/Key、Form 构建订单编辑流程；处理重复提交和状态问题。

## Module 11.09：State Modeling 与 Ownership

Minimal/Derived/Redundant/Duplicate/Impossible State、Lift State、Controlled State、URL/Server/Client State 分类。

## Module 11.10：useReducer 与 State Machine Thinking

Reducer/Action/Dispatch、Pure Reducer、Undo/Redo、State Machine、Reducer Test、内部 Dispatch 连接点。

## Module 11.11：Context 一次学透

Provider、Nearest Value、Update Propagation、Value Identity、Splitting、Dependency Injection、Context + Reducer、Performance、Misuse。

### 综合实践：Multi-step Order Workflow

把订单编辑器演进成多步骤流程，使用 State Modeling、Reducer、Context、Undo/Redo 和显式状态边界。

## Module 11.12：Ref、DOM Ref 与 Imperative Escape Hatch

useRef、Callback Ref、Focus、Scroll、Measurement、Timer、Third-party Widget、useImperativeHandle。

## Module 11.13：Effect 一次学透

External Synchronization、Setup/Cleanup、Dependency、StrictMode、Stale Closure、Race、Abort、Subscription、Timer、Infinite Effect、Passive Effect 内部模型。

## Module 11.14：Removing Effects 与 useEffectEvent

Derived State、Event Logic、Key Reset、External Store、Server State、Reactive/Non-reactive Logic、Effect-heavy Architecture Review。

### Failure Lab：Effect Hell

制造 Infinite Effect、重复 Subscription、Stale Closure、Race、Unmount 后任务和 Dependency Identity 问题，逐个定位。

## Module 11.15：Custom Hook 与 Hook API Design

Logic Reuse、Lifecycle、Parameter/Return API、Error、SSR、Testability、useDebugValue、Library Hook。

## Module 11.16：Router 与 URL State

Route Tree、Nested Layout、Params/Search Params、Deep Link、Lazy Route、Error Route、Scroll、Auth Boundary。

## Module 11.17：Server State 与 Query Cache

Client vs Server State、Query Key、Stale、GC、Dedup、Retry、Invalidation、Mutation、Pagination、Infinite、Prefetch、Offline；使用 TanStack Query 类方案验证。

## Module 11.18：API Client、Runtime Validation 与 Data Boundary

Fetch Adapter、Abort、Auth、Error Model、Schema、DTO/Domain Model、Trace ID、OpenAPI Client。

### 综合实践：React Enterprise Workbench v2

加入 Router、Server State、Query Cache、Error Route、多角色 UI 和 API Contract。

## Module 11.19：Actions、useActionState、Form Action 与 Optimistic UI

Action、Pending、useActionState、useOptimistic、Rollback、Concurrent Mutation、Server Validation、Idempotency。

## Module 11.20：Concurrent Rendering Mental Model

Urgent/Non-urgent、Interruptible Render、Restart、Commit Atomicity、Concurrency ≠ Parallelism、Purity、Lane 前置。

## Module 11.21：Transition 与 Deferred Value

startTransition/useTransition、Pending、Interrupt、Ordering、Deferred UI、Search/Chart、Transition vs Debounce。

## Module 11.22：Suspense 一次学透

Boundary、Fallback、Nested Reveal、Retry、Lazy、Resource、Router、Transition、Waterfall、Internal Retry Model。

## Module 11.23：use() 与 Resource Reading

Promise/Context Resource、Suspense、Error Boundary、Conditional use、Server Promise → Client Read。

## Module 11.24：Activity 与 Hidden UI

State Preservation、Effect Lifecycle、Background Priority、Pre-render probable UI、Tabs/Navigation、Cost。

### Performance Lab：Concurrent React

通过 CPU Throttling、Profiler、Performance Track 比较阻塞 Render、Transition、Deferred、Suspense、Activity。

## Module 11.25：React Performance Measurement

React DevTools Profiler、Commit/Render、Flame/Ranked、Why Render、Browser Performance、React Performance Track。

## Module 11.26：Render Optimization

State Locality、Props Identity、Context Diffusion、Selector、memo/useMemo/useCallback 的真实边界、Virtualization。

## Module 11.27：React Compiler

Automatic Memoization、Rules of React、Diagnostics、Bailout、Incremental Adoption、Library Compilation、Manual Memo Compatibility、Benchmark。

## Module 11.28：React DOM、Portal 与 Browser Integration

DOM Props、Controlled Element、SVG、Custom Element、Portal、React Tree vs DOM Tree、Focus/Overlay/Stacking。

## Module 11.29：Resource Loading 与 Metadata

preload/preinit/preconnect、Script/Font/Stylesheet、Metadata、SEO、Streaming Coordination。

## Module 11.30：React A11Y、i18n 与 Styling Architecture

Semantic/Keyboard/Focus/ARIA、Locale/Timezone/RTL、CSS Module/Utility/CSS-in-JS/Token/Theme、SSR Compatibility。

### 综合实践：Production React UI

把 Workbench 补齐 A11Y、国际化、Theme、性能预算、错误/空/慢网状态。

## Module 11.31：Error Boundary、Failure Model 与 Observability

Render/Async/Event/Chunk/Hydration Error、Boundary Scope、Reset、Source Map、Component Stack、Release/Trace/Metric。

## Module 11.32：React Security

Escaping、dangerouslySetInnerHTML、Markdown/Rich Text、URL、CSP、Trusted Types、Client Permission vs Authorization、SSR/RSC Data Leak。

## Module 11.33：React Testing Strategy

Reducer/Hook/Component/Integration/E2E/Visual/A11Y/Performance、Testing Library、Playwright、Suspense/Router/Query Testing。

## Module 11.34：SSR 一次学透

react-dom/server、renderToPipeableStream/renderToReadableStream、Shell、Stream、Abort、Error、SEO、TTFB。

## Module 11.35：Hydration 一次学透

hydrateRoot、Server HTML Identity、Mismatch、Recoverable Error、Date/Random/Locale、useId、Performance、Debug。

## Module 11.36：Streaming SSR、Static Rendering 与 Resume/PPR

Suspense Stream、prerender、Static HTML、CDN、Partial Prerender/Resume 的版本化研究和生产边界。

### 综合实践：React SSR Application

不依赖 Next.js 黑盒，从 React Server API 建立 Streaming SSR + Hydration + Error/Abort 实验。

## Module 11.37：React Server Components

Server Component、Client Component、SSR vs RSC、Build/Request Time、Async Server Component、Bundle/Data Boundary。

## Module 11.38：Server / Client Boundary 与 Server Functions

`use client`、Serialization、Server Reference、`use server`、Authorization、Validation、Mutation、Error。

## Module 11.39：RSC + Suspense + Cache Architecture

Promise Passing、use()、Streaming、Waterfall、Direct Data Access、Cache/Invalidation、Tenant/Auth/Data Leak。

### 综合实践：Full-stack React Boundary Lab

设计 Server/Client Component 边界、Server Function、Suspense、Cache 和权限；输出运行位置图。

## Module 11.40：React Source Research Method

固定 React Version/Commit、Build/Test、Minimal Reproduction、Breakpoint、Call Stack、Object Snapshot、Hypothesis。

## Module 11.41：Fiber 一次学透

Fiber Node、child/sibling/return/alternate、flags、lanes、memoizedProps/state、updateQueue、current/workInProgress。

## Module 11.42：Reconciler

Element → Fiber、beginWork、completeWork、Child Reconciler、Key、Placement/Delete/Reuse/Bailout。

## Module 11.43：Render / Commit Pipeline

Schedule → Render → Complete → Commit；Before Mutation/Mutation/Layout/Passive、Ref/Effect。

## Module 11.44：Hooks Internals

Dispatcher、Hook Linked List、mount/update、useState/useReducer Queue、Effect、Dependency、Rules。

## Module 11.45：Lane、Scheduler 与 Suspense Internals

Priority/Lane、Pending/Suspended/Ping/Entangle、Interruption/Starvation、Promise Suspend/Retry、Hidden Tree。

## Module 11.46：Server Renderer、Hydration 与 RSC Internals

Segment/Boundary/Stream、Hydration/Event Replay、RSC Payload、Client/Server Reference、Bundler Integration。

### Source Lab：一次 State Update 到 DOM Commit

从事件触发 State Update，跨过 Update Queue、Lane、Reconciler、Commit，使用源码断点记录完整调用路径。

## Module 11.47：React Library Authoring

Package Exports、ESM、Types、Peer React、Tree Shaking、SSR/RSC/Compiler Compatibility、Release。

## Module 11.48：Headless UI 与 Design System

State/Behavior/DOM/A11Y/Style 分离、Controlled API、Compound/Headless、Token、Docs、Visual Test、Adoption。

## Module 11.49：Large-scale React Architecture

Feature/Domain/Layer、Public API、DTO/Domain/ViewModel、State/Route/Async/Error Ownership、Architecture Fitness Function。

## Module 11.50：React Microfrontend 与 Cross-framework

Multiple Root、Module Federation、Web Components、Iframe、Shared React Singleton、Context/Router/Style Boundary、Independent Deployment。

## Module 11.51：Legacy React 与 Migration

React 15～18、Class、Lifecycle、Legacy Context、HOC/Render Props、Old Redux/Router、CRA/Legacy Webpack；Class→Function、Old Root→createRoot、Old SSR→Streaming、18→19、SPA→SSR/RSC。

## Module 11.52：Upgrade Governance 与 Architecture Review

Stable/Canary/Experimental、Security Advisory、Compatibility Matrix、Pilot、Canary、Rollback、State/Effect/Cache/Boundary/Performance/Security/Testing Review。

### React 阶段综合项目：React Enterprise Platform

综合 React 全阶段能力完成一个企业级应用：Router、Form、Query、Actions、Optimistic、Suspense、Concurrency、SSR/RSC、Design System、A11Y、i18n、Performance、Security、Testing、Observability，并提交至少一份 React 源码 Debug 报告和迁移方案。

---

# Stage 12：Vue 完整体系

> Vue 同样只设置一个完整 Stage，不再拆“基础 Vue”和“Vue 源码 Stage”。

## Module 12.01：Vue Problem Domain、createApp 与 SFC Bootstrap

从空目录建立 Vue + TypeScript 项目，理解 createApp、Application、Root、Mount、SFC、Vite Plugin、Template Compile。

## Module 12.02：Template、Directive、Binding、Event、List 与 Key

Interpolation、v-bind/v-on/v-if/v-for、Key、Class/Style、Template vs JSX。

## Module 12.03：Component、Props、Emit、Slot、Model 与 Attribute

Component Instance、Props/Emit、v-model、Slot、Fallthrough、Composition。

### 综合实践：Vue Product Catalog

使用 Template/Component/Props/Emit/List/Key 完成商品目录和交互。

## Module 12.04：Ref、Reactive、Computed 与响应式基础

ref/reactive、Unwrap、Computed、Readonly/Shallow、Identity、Destructure Trap。

## Module 12.05：Watch / WatchEffect 一次学透

Dependency、Flush Timing、Cleanup、Deep Watch、Wrong Way、Performance。

## Module 12.06：Composition API 与 Composable Design

Logic Reuse、Lifecycle、Effect Scope、Parameter/Return API、Testability。

## Module 12.07：Provide/Inject、Pinia 与 State Architecture

Dependency Injection、Store、Getter/Action、Plugin、Persistence、SSR、State Boundary。

## Module 12.08：Vue Router 与 Application Architecture

Nested/Dynamic Route、Guard、Lazy、Scroll、Data、Permission、URL State。

### 综合实践：Vue Operations Console

完成路由、状态、复杂表单、Pinia、Composable 和权限 UI。

## Module 12.09：Teleport、KeepAlive、Suspense、Transition、Async Component

Built-in Advanced Capability、Lifecycle、State Preservation、Error/Loading。

## Module 12.10：Vue Performance、A11Y、i18n 与 UI Engineering

Render Scope、Computed/Watch Cost、Virtualization、Bundle、Focus/ARIA、Locale/RTL、Design System Integration。

## Module 12.11：Vue Reactivity Internals

Proxy、Track、Trigger、Dep、Effect、Cleanup、Batch、Scheduler。

## Module 12.12：Renderer 与 VNode

VNode、Patch、Component Update、Keyed Diff、Block Tree、Patch Flag、Static Hoist。

## Module 12.13：Compiler

Parse、AST、Transform、Codegen、Render Function、Compile-time Optimization。

## Module 12.14：Scheduler 与 Update Queue

Job Queue、Pre/Post Flush、nextTick、Dedup、Update Ordering。

## Module 12.15：SSR、Hydration 与 Server Renderer

Server Render、Streaming、State Serialization、Hydration Mismatch、Cross-request Pollution。

## Module 12.16：Nuxt Connection Point

File Routing、Data Fetch、Payload、Plugin/Middleware、Nitro、Layer、Hybrid Render；这里只建立 Vue→Nuxt 连接，Nuxt 完整全栈能力在 Stage 18 学习。

### Source Lab：Ref Update → DOM Patch

固定 Vue 版本，调试一次 Ref 更新经过 Effect/Scheduler/Renderer/Patch 到 DOM。

## Module 12.17：Vue Library、Design System 与 Plugin

Composable/Component Library、Plugin API、Package、SSR、Versioning、Cross-framework Token。

## Module 12.18：Large-scale Vue Architecture、Legacy 与 Migration

Feature/Domain Boundary、Vue 2→3、Options→Composition、Vuex→Pinia、Build Migration、Codemod、Governance。

### Vue 阶段综合项目：Vue Enterprise Operations Platform

综合 Vue State、Router、Form、SSR、Source Debug、Design System、Performance、Testing 和 Migration 能力完成企业运营平台。

---

# Stage 13：多框架范式、Angular 企业认知、Web Components 与历史系统迁移

## Module 13.01：Framework Paradigm

Virtual DOM、Fine-grained Reactivity、Compiler-first、Template、JSX、Signal、Resumability、Server-first。

## Module 13.02：React / Vue / Angular / Svelte / Solid / Qwik 选型模型

团队、生态、性能、SSR、约束、招聘、升级、退出成本。

## Module 13.03：Angular Enterprise Mental Model

DI、Component、Template、Signal、RxJS、Router、Form、Change Detection、SSR、Workspace、Migration；目标是架构选型和遗留维护，不要求与 React/Vue 同等源码深度。

## Module 13.04：Web Components

Custom Element、Shadow DOM、Slot、Attribute/Property、Event、Form-associated Element、Style Isolation。

## Module 13.05：Cross-framework Interop

React/Vue 包装 Custom Element、Event/Object Prop、SSR/Hydration、Design System Interop。

## Module 13.06：Legacy Web Stack

jQuery、AMD/CMD、RequireJS、Backbone、AngularJS、Vue2、Class React、Old Build Chain。

## Module 13.07：Migration Pattern

Strangler、Route-by-route、Island、Adapter、Dual Run、Feature Flag、Codemod、Rollback。

### 阶段综合项目：Legacy Frontend Modernization

为一个旧系统设计 React/Vue 渐进迁移，包含 Web Component 互操作、Codemod、兼容层、回滚和退出策略。

---

# Stage 14：UI Engineering、复杂组件、Design System、A11Y、国际化与样式平台

## Module 14.01：Interaction State 与 UX State Model

Initial/Loading/Empty/Partial/Error/Offline/Permission/Success/Undo、Keyboard/Touch/Shortcut。

## Module 14.02：WCAG、Accessibility Tree 与 Screen Reader

WCAG 2.2、Name/Role/State、Keyboard、Focus、Live Region、Zoom、Contrast、Reduced Motion。

## Module 14.03：Complex Accessible Component

Dialog、Combobox、Tabs、Tree、Grid、Date Picker、Drag/Drop、Virtual List、Rich Text。

### 综合实践：Headless Dialog + Combobox

分别用 React/Vue Adapter 消费同一行为模型。

## Module 14.04：Component API Architecture

Controlled/Uncontrolled、Compound、Slot、Render Prop、Headless、Polymorphic、State Machine、Public API、Backward Compatibility。

## Module 14.05：Design Token Pipeline

Primitive/Alias/Semantic/Component Token、JSON/Codegen、CSS Variable、Native Output、Validation。

## Module 14.06：Design System Architecture

Foundation、Primitive、Component、Pattern、Template、Docs、Version、Canary、Codemod、Contribution、Adoption。

## Module 14.07：Globalization Engineering

Unicode、Code Point/Grapheme、Normalization、CLDR/ICU、MessageFormat、Locale Fallback、Timezone、RTL/CJK、Pseudo-localization。

## Module 14.08：Styling Platform

CSS Module/Utility/CSS-in-JS/Zero-runtime、Theme、Brand/Tenant、Critical CSS、SSR、Style Quality、Migration。

### 阶段综合项目：Cross-framework Design System

发布 Token + Headless + React/Vue Adapter，覆盖 A11Y、Theme、RTL、Visual Regression、Version Upgrade 和 Adoption Metrics。

---

# Stage 15：Node.js Runtime、CLI、Stream、Process 与前端服务工具

## Module 15.01：Node Runtime 与 Browser 差异

Global、Module、Event Loop、libuv、Thread Pool、Process、Signal、I/O。

## Module 15.02：FS、Path、URL、Buffer、Crypto、HTTP

核心标准库、Async API、Handle、Error Close。

## Module 15.03：Stream 与 Backpressure

Readable/Writable/Transform/Pipeline、Backpressure、Memory、Error。

## Module 15.04：Process、Child Process、Worker Thread

spawn/exec、IPC、Signal、Graceful Shutdown、Parallel Task。

## Module 15.05：CLI Design

Arg/Option、Help、Exit Code、TTY、Progress、Log、CI Mode、Idempotency。

## Module 15.06：Node Debug、CPU/Heap/Profile

Inspector、CPU Profile、Heap、Async Stack、Trace、Unhandled Error。

### 阶段综合项目：Frontend Engineering CLI

实现课程目录生成 / Codemod / Build Orchestrator 类 CLI，具备日志、并发限制、错误码、测试和失败回滚。

---

# Stage 16：Compiler、AST、Bundler、Package、Monorepo 与 Developer Experience

## Module 16.01：ESM/CJS 与 Package Resolution

type/main/module/exports/imports、Conditional Export、Browser ESM、Import Map、Dual Package Hazard。

## Module 16.02：Compiler Pipeline 与 AST

Token/AST/Transform/Codegen、Scope/Binding、Babel/SWC/esbuild/TypeScript Compiler 职责。

## Module 16.03：Source Map 与 Codemod

Mapping、Production Upload、Source Leak、AST Migration、Dry Run、Idempotency。

### 综合实践：API Migration Codemod

实现 API 重命名/组件 Props 迁移工具并生成变更统计。

## Module 16.04：Vite / Rolldown / Rollup

Dev Server、Native ESM、Prebundle、HMR、Plugin Hook、Build、Library/SSR Mode。

## Module 16.05：Webpack / Rspack 与 Bundler Architecture

Module/Chunk Graph、Loader/Plugin、Persistent Cache、Federation、Migration。

## Module 16.06：Tree Shaking、Code Split 与 Bundle Analysis

Side Effect、Dynamic Import、Chunk Strategy、Duplicate Dependency、Bundle Budget。

## Module 16.07：Package Engineering

Library Boundary、Exports、Types、ESM/CJS、Peer、SemVer、Changeset、Provenance、Tree Shaking、Consumer Migration。

## Module 16.08：Monorepo

Workspace、pnpm/yarn/npm、Nx/Turbo、Task Graph、Affected、Remote Cache、Dependency Boundary、CODEOWNERS。

## Module 16.09：Developer Experience / Golden Path

Scaffold、Shared Config、Local Environment、Dev Container、Mock、Dependency Governance、Setup/Build/Test/PR Lead Time。

### 阶段综合项目：Frontend Monorepo Platform

包含 Web App、Component Package、SDK、CLI、Shared Config、Affected CI、Remote Cache 和 Package Release。

---

# Stage 17：静态分析、Unit、Component、Integration、E2E、Visual 与质量工程

## Module 17.01：Static Analysis

ESLint AST Rule、Type-aware Lint、Import Boundary、Dead Code、Complexity、Custom Rule。

## Module 17.02：Unit Test 与 Testable Design

AAA、Boundary、Fake/Stub/Mock/Spy、Time/Random、Async、Dependency Injection、Coverage Risk。

## Module 17.03：Component Test

Real DOM、Accessible Query、Interaction、Provider、Router、Network Mock、Async UI。

## Module 17.04：Integration Test

Route/State/Form/Query/Error/Suspense 多模块协作。

## Module 17.05：E2E / Playwright

Browser Context、Locator、Auto-wait、Fixture、Auth、Data Seed、Trace/Video/Screenshot、Network Failure。

## Module 17.06：Visual / A11Y Regression

Visual Diff、Responsive、Theme、Font、Animation Stabilization、axe 类自动化 + Manual Audit。

## Module 17.07：Contract / Property / Mutation Test

OpenAPI Contract、Property-based、Mutation Testing、State Machine Testing。

## Module 17.08：Performance / Security Test

Bundle Budget、Page Metric、Memory、Security Header、CSP、Dependency/Secret Scan。

## Module 17.09：Flaky、Test Data 与 Quality Gate

Quarantine、Owner、Retry Policy、Factory/Seed、PR/Nightly Matrix、Risk-based Gate、Quality Metric。

### 阶段综合项目：Frontend Quality Platform

把 Stage 16 Monorepo 接入 Static/Unit/Component/E2E/Visual/A11Y/Contract/Performance/Security 门禁，治理一个 Flaky Case。

---

# Stage 18：BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端

## Module 18.01：BFF Architecture

Aggregation、Trim、Session、SSR Data、Feature Flag、Timeout/Retry/Circuit、Trace、Boundary with Core Backend。

## Module 18.02：Session、OAuth/OIDC 与 Authorization 基础

Cookie/Session、Authorization Code + PKCE、RBAC/ABAC/ReBAC 前置、CSRF、Rotation、Logout。

## Module 18.03：Next.js Full-stack Architecture

App Router、Layout/Page/Loading/Error、RSC/Client Boundary、Data/Action、Cache/Revalidation、Streaming、PPR、Instrumentation。

## Module 18.04：Nuxt / Nitro Full-stack Architecture

Page/Layout/Middleware/Plugin、useFetch/useAsyncData、Payload、Nitro、Hybrid Render、Route Rule、Layer。

### 综合实践：同一业务的 Next / Nuxt Vertical Slice

用同一业务需求比较 React/Vue Full-stack Runtime、Cache、Deploy、DX 和 Migration Cost。

## Module 18.05：SSR/SSG/ISR/Streaming Strategy

Build-time/Request-time/Edge/Client、Static/Dynamic/Hybrid、Cache、SEO、Failure。

## Module 18.06：CDN / Edge / Serverless

DNS/CDN/WAF/Edge/SSR/BFF Topology、Cold Start、Runtime Limit、Cache、Secret、Vendor Lock-in。

## Module 18.07：Multi-region、Traffic 与 Rollout

Region、Data Residency、Session、Failover、Canary/Blue-Green/Weighted/Tenant Rollout。

## Module 18.08：Cost Model

Request、Bandwidth、Function Time、Image、Log、Cache Hit、Third-party Cost。

### 阶段综合项目：Production Full-stack Web Product

包含 BFF、Session、SSR/Streaming、Cache、Edge/CDN、Trace、Canary、Rollback 和 Cost Estimate。

---

# Stage 19：数据与平台集成：数据库认知、CMS、Search、Object Storage、Payment、Analytics

## Module 19.01：Frontend-facing Database & Transaction Mental Model

Relation/SQL、Index、Transaction、Isolation、Optimistic/Pessimistic Lock、Pagination Consistency、为什么影响前端交互。

## Module 19.02：Data Consistency、Queue 与 Outbox/CDC 认知

Cache Consistency、Message Queue、Idempotency、Eventual Consistency、Outbox、CDC、Ordering。

## Module 19.03：Object Storage

Signed URL、Direct Upload、Multipart、Metadata、ACL、Lifecycle、Virus Scan、Thumbnail。

## Module 19.04：Search

Query/Filter/Facet/Highlight/Autocomplete、Index Delay、Cursor、No-result UX、Adapter。

## Module 19.05：CMS / Content Platform / SEO Architecture

Content Model、Draft/Publish、Preview、Workflow、Canonical、Hreflang、Structured Data、Large-scale URL Migration。

## Module 19.06：Payment / Order Integration

Tokenization、3DS、Redirect、Webhook、Idempotency、Final State、Reconciliation Mental Model。

## Module 19.07：Analytics / Experimentation

Event Taxonomy、Identity、Consent、Session、Exposure、Funnel/Cohort、A/B、Guardrail、SRM Awareness、Data Quality。

## Module 19.08：Third-party Adapter & Exit Strategy

SDK Isolation、CSP/Sandbox、Quota、SLA、Cost、Fallback、Vendor Switch。

### 阶段综合项目：Commerce / Content Integration App

集成 Upload、Search、CMS/Content、Analytics，并模拟供应商超时、Index Delay、重复 Webhook 和配额问题。

---

# Stage 20：PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程

## Module 20.01：Cross-platform Runtime Model

WebView、Native Widget、JS Runtime、Bridge、Shell、共享 Domain/Schema/SDK/Token 的边界。

## Module 20.02：PWA Production

Install、Manifest、Service Worker、Offline、Update、Push、Background、Platform Limit。

## Module 20.03：Electron

Main/Renderer/Preload、IPC、Context Isolation、Auto Update、Signing、Crash、Security。

## Module 20.04：Tauri / Lightweight Desktop

Rust/Native Boundary 高层、IPC、Permission、Bundle/Memory、安全和适用场景。

## Module 20.05：React Native / Hybrid

Native Component、Layout、Navigation、Bridge/New Architecture 认知、Native Module、Capacitor/PWA 比较。

## Module 20.06：Miniapp

Runtime Constraint、Component Mapping、Package Size、Subpackage、Permission、Platform API、Review。

## Module 20.07：TV/OTT

Remote Focus、10-foot UI、Low-end Device、Video、Resolution、Long-running Stability、Memory。

## Module 20.08：Release / Update / Security

Store Review、Code Push Boundary、Desktop Update、Crash、Version Compatibility、Bridge Least Privilege。

### 阶段综合项目：Multi-platform Client

选择 Desktop/Mobile/TV 中至少两个目标，复用 Domain/SDK/Token，同时记录不能共享的 UI/Navigation/Platform Boundary。

---

# Stage 21：Realtime Collaboration、Local-first、离线同步、OT/CRDT 与多人系统

## Module 21.01：Collaboration State

Document、Presence、Cursor、Selection、Typing、Awareness、Persistent vs Ephemeral。

## Module 21.02：Sync Protocol

Snapshot、Operation、Sequence、Ack、Version Vector、Reconnect、Replay、Compaction。

## Module 21.03：Conflict Strategy

Lock、Optimistic Concurrency、LWW、Field Merge、OT、CRDT 原理和适用边界。

## Module 21.04：Local-first Architecture

Local DB、Operation Log、Pending、Offline Queue、Background Sync、Eventual Consistency。

## Module 21.05：Scale / Room / Fan-out / Backpressure

Room、Shard、Sticky、Fan-out、Heartbeat、Presence Expiration、Large Document。

## Module 21.06：Collaboration UX / Security

Offline/Pending/Conflict/History/Undo、Room Auth、Replay、Spam、Audit。

### 阶段综合项目：Collaborative Workspace

实现 Presence、离线编辑、Reconnect、冲突、版本历史，并进行乱序、重复、断网和旧客户端测试。

---

# Stage 22：SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化

## Module 22.01：SVG

Coordinate/ViewBox/Path/Group/Transform/Filter、DOM/Interaction/A11Y Cost。

## Module 22.02：Canvas 2D

Drawing State、HiDPI、Hit Test、OffscreenCanvas、Export、Worker。

## Module 22.03：WebGL / GPU Pipeline

Buffer、Shader、Texture、Coordinate、Batch、Resource Lifecycle。

## Module 22.04：WebGPU

Render/Compute Pipeline、Binding、Async Error、Device Lost、Compatibility、Fallback。

## Module 22.05：Visualization Engineering

Scale/Axis/Layout/Interaction、Sampling/Aggregation、Progressive/LOD、Virtualization、Accessibility。

## Module 22.06：Audio / Video / Streaming Media

HTML Media、MSE、EME、Web Audio、WebCodecs、Subtitle、ABR、Low-latency Live。

## Module 22.07：WebAssembly

Linear Memory、Module/Instance、JS Bridge、Copy Cost、Thread/SIMD、WASI/Component Model 认知。

## Module 22.08：WebXR / Device API Research

XR、Bluetooth/USB/Serial/HID 等 Capability、Permission、Secure Context、Research/Adoption Framework。

### 阶段综合项目：High-performance Visualization / Media App

完成大数据可视化或媒体处理项目，包含 Worker/GPU、帧率、内存、释放资源和 A11Y 替代。

---

# Stage 23：Schema-driven UI、动态表单、低代码、Visual Editor 与插件式业务平台

## Module 23.01：Schema-driven UI

JSON/UI Schema、Renderer Registry、Component Mapping、Validation、Default/Override、Version。

## Module 23.02：Dynamic Form Engine

Field Schema、Dependency Rule、Conditional、Async Option、Validation、Layout、Permission。

## Module 23.03：Rule / Expression Engine

Safe Expression、AST/Interpreter、Sandbox、Dependency Graph、Evaluation、Security。

## Module 23.04：Visual Editor

Canvas/Outline/Property Panel、Selection、Drag/Drop、Command、Undo/Redo、Clipboard、History。

## Module 23.05：Plugin / Extension Model

Manifest、Capability、Permission、Lifecycle、Version、Dependency、Isolation、Crash Containment。

## Module 23.06：Schema Migration / Compatibility

Old Page、Schema Version、Migration、Compatibility Layer、Rollback、Audit。

## Module 23.07：Collaboration / Preview / Publish

Draft、Preview、Publish、Multi-user Edit、Conflict、Environment、Rollout。

### 阶段综合项目：Low-code Business Builder

实现动态表单 + 页面 Schema + 属性面板 + Undo/Redo + Plugin + Version Migration 的最小平台。

---

# Stage 24：前端性能工程、RUM、Core Web Vitals、Memory、Capacity 与规模治理

## Module 24.01：Performance Metric & Experiment

TTFB/FCP/LCP/INP/CLS、Long Task/LoAF、自定义业务指标、P50/P75/P95/P99、Lab vs Field。

## Module 24.02：RUM

PerformanceObserver、Navigation/Resource/Event Timing、Sampling、Version/Region/Device Dimension、Data Quality。

## Module 24.03：Loading Performance

Critical Request Chain、DNS/TLS、Preload/Priority、Image/Font、Third-party、Cache。

## Module 24.04：Render / Interaction Performance

Style/Layout/Paint/Composite、Long Task、Scheduler、Input Handler、Framework Render、Virtualization。

## Module 24.05：Memory / Long-running Stability

Heap、Detached DOM、Listener/Timer/Cache、GPU/Media、TV/Long Session。

### Performance Lab：LCP + INP + Memory

分别完成一次加载、交互、内存优化，必须提交前后 Trace/Profiler/Heap 数据。

## Module 24.06：Bundle / Build Performance

Parse/Compile/Evaluate、Chunk、Tree Shaking、Duplicate、Polyfill/Locale、Build/CI Time。

## Module 24.07：Capacity Model

User/Concurrency/Request/Message/Data Row/DOM/Memory/CPU/Bandwidth/Third-party Quota。

## Module 24.08：Performance Governance

Budget、CI Gate、RUM Regression、Owner/SLA、Release Annotation、Bisect/Rollback、Performance Champion。

### 阶段综合项目：Performance Governance System

为一个复杂页面建立 Lab/RUM 基线、预算、容量模型、自动回归和发布阻断策略。

---

# Stage 25：Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理

## Module 25.01：Browser Security Model / Trust Boundary

Origin、Site、Cookie、Storage、Iframe、Sandbox、Third-party、Extension、SSR Input。

## Module 25.02：XSS / DOM XSS / HTML Context

Reflected/Stored/DOM、HTML/Attribute/URL/Script/CSS Context、Sanitize、Safe DOM API。

## Module 25.03：CSRF、CORS、Clickjacking、Open Redirect

SameSite/Token/Origin、Preflight/Credential、frame-ancestors、URL Allowlist。

## Module 25.04：Prototype Pollution / DOM Clobbering / File & Rich Content

Object Merge、Named Property、SVG/Office/PDF/Upload、MIME、Download/Preview Security。

## Module 25.05：OAuth 2.0 / OIDC / Session / Passkey

Authorization Code + PKCE、State/Nonce、Cookie/Token、Rotation/Revocation、WebAuthn/Passkey、Step-up。

## Module 25.06：Enterprise Identity

SAML、SCIM、SSO、JIT Provisioning、Domain Verification、Entitlement、Join/Leave Lifecycle、Multi-org、Audit。

## Module 25.07：Authorization

RBAC/ABAC/ReBAC、Policy/Resource/Action/Tenant/Row-level、UI vs Server Enforcement。

## Module 25.08：CSP、Trusted Types、Cross-origin Isolation

Nonce/Hash/strict-dynamic、Report-only、Trusted Types、Iframe/postMessage、COOP/COEP/CORP。

## Module 25.09：Supply Chain

SCA、Typosquatting、Dependency Confusion、Lock/Registry/Integrity/Provenance/SBOM/Signing/Build Isolation。

## Module 25.10：Privacy Engineering

Data Minimization、Purpose、Retention、Consent、Export/Delete、Log Masking、Replay、Data Residency。

## Module 25.11：Threat Modeling / Security Test / Incident

STRIDE、Attack Tree、Abuse Case、SAST/SCA/DAST/Secret/Header/Pentest、Severity/Owner/SLA/Patch/Rollback。

### 阶段综合项目：Secure Enterprise SaaS Frontend

实现企业 SSO/权限前端体验、CSP/Trusted Types、Privacy Data Map、SBOM、安全门禁，并完成 Threat Model 和攻击/修复实验。

---

# Stage 26：Observability、SLO、故障治理、CI/CD、Container、Kubernetes、GitOps 与云交付

## Module 26.01：Frontend Observability

Log/Metric/Trace/Profile/RUM/Replay、Error/Unhandled/Resource/Chunk、Source Map、Context/Breadcrumb。

## Module 26.02：Distributed Trace

Browser Span、Trace Context、Fetch/BFF/Service、Sampling、Cross-origin、Business Transaction。

## Module 26.03：SLO / Error Budget

Critical Journey、Availability/Latency/Freshness、SLI/SLO、Burn Rate、Release Guard。

## Module 26.04：Incident / Runbook / Chaos

Detection、Triage、Timeline、Incident Command、Rollback、Postmortem、Action Verification、Failure Drill。

## Module 26.05：CI/CD

Install/Lint/Type/Test/Scan/Build/Package/Deploy/Verify/Promote、Artifact、Provenance、Environment。

## Module 26.06：Static / SSR Deployment

Atomic Asset、HTML/Hash Asset Order、CDN Purge、Old Asset Retention、Rollback、Graceful Shutdown。

## Module 26.07：Container

Multi-stage、Non-root、Minimal Image、Nginx/Node、Health、Signal、Config。

## Module 26.08：Kubernetes

Deployment/Service/Gateway/Config/Secret/Probe/Resource/Autoscaling/Rolling Update。

## Module 26.09：GitOps / IaC / Policy as Code

Declarative Environment、Drift、Promotion、Policy、Secret Lifecycle、Audit、Resource/Cost Guardrail。

## Module 26.10：DR / Multi-region Delivery

DNS/CDN/Certificate/Artifact/Config Backup、Region Failure、Recovery Drill。

### 阶段综合项目：Production Delivery Platform

从 PR Preview 到生产 Canary，打通 Trace/SLO/Alert/Auto Rollback、Container/K8s/GitOps，并完成故障演练。

---

# Stage 27：DDD、模块化、Microfrontend、Plugin、Multitenancy 与大型前端架构

## Module 27.01：Architecture Driver / Quality Attribute

Business/User/Team/Deploy/Compliance/Performance/Reliability/Cost/Evolution。

## Module 27.02：DDD for Frontend

Subdomain、Bounded Context、Ubiquitous Language、Entity/Value/Policy/Event、DTO/Domain/ViewModel。

## Module 27.03：Modular Monolith / Dependency Architecture

Feature/Domain/Shared/Infrastructure、Public API、ACL、Port/Adapter、Import Rule、Fitness Function。

### 综合实践：拆分一个大型前端单体

为真实后台建立 Bounded Context、依赖规则、Public API 和 Architecture Test。

## Module 27.04：State Machine / Workflow / CQRS Mental Model

State/Event/Guard/Action、Command/Query/Read Model、Optimistic UI 适用边界。

## Module 27.05：Microfrontend

Adoption Condition、Package/Federation/Web Component/Iframe/Route/Server Composition、Shell、Contract、Shared Dependency、Failure、SLO。

## Module 27.06：Plugin Architecture

Extension Point、Manifest、Lifecycle、Capability/Permission、Sandbox/Worker/Iframe、Quota/Timeout/Crash Containment。

## Module 27.07：Multitenancy / White-label

Tenant Context、Theme/Locale/Feature/Data/Permission/Quota/Region、Brand/Domain/Content/Legal、Runtime Config。

## Module 27.08：Configuration / Feature Platform

Schema/Default/Override/Inheritance、Validation、Rollout/Audit、Emergency Disable、Flag Lifecycle。

## Module 27.09：Architecture Decision / RFC / ADR

Problem/Constraint/Option/Trade-off/Decision/Consequence、C4/Sequence/Data Flow/Capacity/Failure Model。

### 阶段综合项目：Extensible Multi-tenant Frontend Platform

实现 Modular Architecture + Microfrontend/Plugin 二选一或组合 + 多租户 + Architecture Fitness Function，并模拟 Remote/Plugin/Tenant Failure。

---

# Stage 28：Frontend Platform、迁移、技术债、Governance、成本、产品与 Staff/Principal 影响力

## Module 28.01：Internal Frontend Platform

Platform User、Capability Map、Template/CLI/Design System/Test/Observability/Delivery/Security、Product Thinking。

## Module 28.02：Golden Path / Developer Portal

Service Catalog、Owner、Docs、Dependency、Environment、Metric/SLO/Runbook、自助创建/发布/回滚。

## Module 28.03：Platform API / Plugin / Self-service Permission

Provider、Template Version、Backward Compatibility、Approval、Audit、Platform SLO/DR。

### 综合实践：Frontend Developer Portal

接入两个不同类型项目，展示创建→开发→测试→发布→监控→回滚的自助路径。

## Module 28.04：Legacy Inventory / Technical Debt

Business Value、Traffic、Owner、Dependency、Build/Test/Deploy/Incident/Vulnerability/Cost；Code/Arch/Dependency/Test/Data/Ops/Knowledge Debt。

## Module 28.05：Migration Architecture

Strangler、Branch by Abstraction、Route/Feature、Dual Run、Shadow、Adapter/Compatibility、Data/URL/Storage/Telemetry Migration。

## Module 28.06：Automated Migration

Codemod、Lint Rule、API Report、Visual Diff、Batch PR、Progress Dashboard、Canary/Rollback。

## Module 28.07：Technology Governance

RFC/ADR/Architecture Review/Fitness Function/Dependency Policy/Exception/Expiry/Tech Radar。

## Module 28.08：Product / Business / Experiment / Cost

User Journey、North Star/Funnel/Cohort、Experiment、Build vs Buy、CDN/SSR/Log/Test/Third-party/Engineering Cost、Opportunity Cost。

## Module 28.09：Staff / Principal Technical Leadership

Technical Strategy、Cross-team Influence、Pilot/Champion/Office Hour、Risk Communication、Review、Mentoring、Ownership、Incident Leadership。

## Module 28.10：Organization Capability

Career Ladder、Hiring/Rubric、Knowledge System、Bus Factor、On-call、Sustainable Engineering Culture、Conflict Resolution。

### 阶段综合项目：Organization-wide Frontend Modernization Program

为一个多团队旧系统制定 6～12 个月迁移与平台化方案，包含 Pilot、Codemod、Golden Path、Budget、Adoption、Risk、Stop Condition、Metrics。

---

# Stage 29：AI-assisted Development、MCP、AI Native Frontend、Agent UX、安全与评估

## Module 29.01：AI-assisted Frontend Development

Model Capability/Limit、Context Engineering、Spec-driven Development、Coding Agent、Repo Rule、Diff Review、Test/Validation、Cost/Failure Dataset。

## Module 29.02：MCP / Tool Integration

Tool Schema、Permission、File/GitHub/Browser/DB Tool Boundary、Prompt Injection、Tool Poisoning、Confused Deputy、Audit/Approval。

## Module 29.03：AI Native Interaction Model

Chat/Copilot/Command/Inline Suggestion/Workflow/Autonomous Agent/Human-in-the-loop；什么时候不该做聊天框。

## Module 29.04：Streaming UI Protocol

Message/Token/Tool Call/Tool Result/Artifact/Citation/Usage/Error/Retry/Resume、SSE/Stream、Backpressure、Reconnect。

### 综合实践：Streaming AI Assistant

实现流式消息、停止、重试、引用、Markdown/Code 安全渲染和基础 Tool Call 展示。

## Module 29.05：Agent UX

Idle/Planning/Running Tool/Awaiting Approval/Paused/Completed/Failed/Cancelled、Progress、Permission、Approve/Reject/Edit/Undo/Checkpoint/Branch。

## Module 29.06：RAG / Multimodal / Artifact UX

Citation、Freshness/Permission/Conflict、Image/Document/Audio/Video、Artifact Preview/Edit/Diff、Large Context、A11Y。

## Module 29.07：AI Security

Prompt/Tool Injection、Data Exfiltration、Model Output XSS、Untrusted Attachment、Artifact Sandbox、Tool Authorization Lifecycle、Replay/Audit。

## Module 29.08：Structured Output / Generative UI

Schema Validation、Tool Result Contract、Dynamic Component/Generative UI、Untrusted Model Data、Fallback。

## Module 29.09：AI Evaluation / Observability / Cost

Task Success、Groundedness、Tool Success、Approval Rate、Latency/First Token、Cost、Abandonment、Safety Incident、Eval Dataset/Regression。

### 阶段综合项目：Agent Workbench

基于 React/Full-stack/Observability/Security 能力构建带 Tool、Approval、Resume、Artifact、Citation、Evals、Audit 和 Cost Control 的 AI Agent 工作台。

---

# Stage 30：Principal 级综合毕业项目与正式架构答辩

## Module 30.01：Graduation Requirement & Architecture Scope

选择真实业务问题，定义 User/Value/Non-goal/Constraint/Success Metric、Architecture Driver、Quality Attribute。

## Module 30.02：System Design

Context/Container/Component/Sequence/Data Flow/Deployment、State/Data Contract、Cache、Auth、Failure、Capacity、Cost。

## Module 30.03：Implementation & Delivery

使用已学知识完成可运行系统；不得为了“显得高级”强行堆所有技术。

## Module 30.04：Quality Evidence

Performance、Security、A11Y、i18n、Reliability、Testing、Observability、SLO、Release/Canary/Rollback。

## Module 30.05：Evolution / Migration / Exit

至少 10 ADR、2 RFC、Build/Buy、Migration/Exit Plan、Compatibility、Cost、Three-year Replaceability。

## Module 30.06：Failure Drill

至少进行三类真实故障演练，例如依赖故障、错误发布、Cache、Network、Region、Security、Data Consistency。

## Module 30.07：Platform / Organization Impact

Owner、Contribution、Support、Upgrade/Deprecation、Adoption、Budget、Roadmap、Governance。

## Module 30.08：AI Requirement

AI-assisted Development 或 AI Native Feature 至少一种，必须包含 Eval、Permission、Security、Audit、Cost。

### Principal Capstone

毕业项目不是功能数量竞赛，而是证明在复杂约束下仍然能够做出可解释、可验证、可运行、可迁移、可治理的架构。

最终至少提交：

- 可运行源码和自动化测试；
- Context/Container/Component/Sequence/Data Flow/Deployment 图；
- Performance Baseline / RUM / Capacity Model；
- Threat Model / Privacy / Supply-chain Evidence；
- SLO / Alert / Runbook / Failure Drill / Postmortem；
- ADR / RFC / Build-Buy / Migration / Exit Plan；
- Cost Model；
- AI Eval / Security / Tool Audit（适用）；
- 正式架构答辩记录。

### 最终架构答辩

必须能够回答：

- 为什么采用当前架构，而不是更简单的方案？
- 哪三个关键假设最可能错误，如何提前验证？
- 系统在什么规模、故障或组织变化下首先失效？
- 如何在不中断业务的情况下迁移？
- 如何灰度、回滚和保证数据/协议兼容？
- 哪些能力应该 Build，哪些应该 Buy？
- 性能、安全、可靠性和成本证据在哪里？
- 团队扩大三倍或缩小一半时架构怎么变化？
- AI 工具和 Agent 操作如何授权、验证、审计和撤销？
- 三年后哪些实现可以替换，哪些契约必须稳定？

---

# 6. 后续 Stage → Module → Lesson 拆分方式

这份 README 是整个 `learn-frontend-web-course` 的**唯一总纲**。

后续不再为 React、Vue、Browser、Performance、Project 等建立平行专项大纲。

正式课程目录直接按照总纲落地：

```text
courses/frontend-architect/
└── stageXX-xxx/
    ├── README.md
    ├── moduleXX-xxx/
    │   ├── README.md
    │   ├── kp001-xxx/
    │   ├── kp002-xxx/
    │   ├── failure-xxx/   # 当学习顺序需要时自然出现
    │   ├── source-xxx/    # 当学习顺序需要时自然出现
    │   └── project-xxx/   # 当知识已经足够组合时自然出现
    └── project-xxx/       # Stage 综合项目需要时自然出现
```

目录只是组织文件；学习顺序必须始终是一条自然路径。

---

# 7. 总纲评审标准

每个 Stage / Module 都必须回答：

1. 为什么它应该出现在这里？
2. 它是一个真正独立的领域/主题，还是把同一技术人为拆成基础/高级/源码？
3. 前置知识是什么？
4. 是否和前面 Module 重复教学？
5. 是否从使用深入到原理、故障、源码和生产边界？
6. 是否有可以运行、测量、Debug 的真实证据？
7. 学到什么位置时知识已经足够自然形成综合实践？
8. 项目是否只使用截至当前位置已经学过的知识？
9. 当前项目是否真正提高理解，而不是为了“有项目”增加业务噪音？
10. 该能力在真实前端工程/架构岗位中解决什么问题？
11. 如果不学习，会在哪类交付、故障、性能、安全或架构场景中出现能力断层？

总纲最终追求：

> **广度覆盖现代前端与前端架构师真实工作边界；深度从零使用一直进入原理、源码、故障、性能和架构；Stage 不按“基础/高级/源码”人为拆技术；项目随着知识自然出现；每一课都能够被学生完整复刻。**
