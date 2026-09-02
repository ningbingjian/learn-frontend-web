# Learn Frontend Web Course

> 一套从完全零基础一路学习到极其资深前端工程师 / 前端架构师的系统化课程总纲。
>
> 版本：v1.0-draft  
> 基线日期：2026-09-02  
> 课程编写规范：[`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md)

---

# 1. 课程目标

这不是 HTML/CSS/JavaScript API 大全，不是 React/Vue 快速入门，也不是面试八股合集。

整套课程希望建立下面这条完整能力链：

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
能够设计大型前端应用、组件平台和基础设施
  ↓
能够负责多团队前端平台、迁移、治理和技术战略
  ↓
Staff / Principal / 极其资深前端架构师
```

最终不仅要会“用某项技术”，还要能够回答：

- 它为什么存在，真正解决什么问题？
- 从空项目开始应该怎样一步一步使用？
- 浏览器、JavaScript Runtime、框架和工具链底层为什么这样工作？
- 核心数据结构、调度、协议、编译、缓存和运行模型是什么？
- 关键源码在哪里，怎样通过断点和运行证据验证？
- 性能成本在哪里，CPU、内存、网络、DOM、Bundle 和服务器成本如何衡量？
- 会出现哪些真实故障，怎样稳定复现、定位、修复和防止回归？
- 安全、隐私、A11Y、国际化和兼容边界是什么？
- 什么场景应该使用，什么场景不应该使用？
- 替代方案是什么，Trade-off 是什么？
- 系统从 1 个页面增长到大型产品，从 5 人团队增长到 100 人团队后如何演进？
- 如何建设标准、平台、Golden Path、质量门禁和组织治理机制？

最终形成：

```text
实现能力
+ Web / 浏览器原理能力
+ JavaScript / TypeScript 深度
+ 框架能力
+ 工程能力
+ 源码能力
+ 性能能力
+ 安全与可靠性能力
+ 故障诊断能力
+ 全栈与云交付能力
+ 架构设计能力
+ 架构演进能力
+ 平台建设能力
+ 技术治理与组织影响能力
+ AI 原生前端能力
```

---

# 2. 最重要的课程原则：一个模块，一次学透

本课程不采用：

```text
先学“基础篇”
→ 几个月以后再学“高级篇”
→ 再以后补“原理篇”
→ 最后再单独开“源码篇”
```

而采用：

```text
一个知识主题
  ↓
一个 Owner Module
  ↓
从入门一直学习到完整能力、复杂边界、原理、源码、性能和生产实践
  ↓
模块闭环
```

例如 React State 学完以后，后续不会再创建：

```text
React State 高级篇
React State 深入篇
React State 源码篇
```

而是在第一次学习 React State 所属 Module 时，就按课程依赖允许的深度把它完整学透。

## 2.1 每个 Module 的统一深度

真正拆 Lesson 时，一个核心 Module 原则上都要覆盖：

1. **背景与问题**：为什么需要它。
2. **基础概念**：术语、对象和关系。
3. **从零实践**：最小可运行使用。
4. **完整能力**：重要 API、配置和特性。
5. **工程实践**：真实项目如何使用。
6. **高级特性**：复杂场景和边界。
7. **Wrong Way**：能运行但有问题的常见写法。
8. **故障模式**：真实 Bug 和生产问题。
9. **调试诊断**：DevTools、日志、Network、Profiler、Trace、Heap、断点等。
10. **底层原理**：算法、调度、协议、存储、编译、渲染或线程模型。
11. **关键源码**：适用时进入源码，不机械逐行抄代码。
12. **性能**：时间、空间、CPU、内存、DOM、网络、Bundle、服务端成本。
13. **安全 / A11Y / 兼容**：适用时必须覆盖。
14. **测试验证**：Unit、Component、E2E、Contract、Performance、Failure Injection 等。
15. **Production Boundary**：生产环境怎么设计、监控、发布和演进。
16. **技术选型**：什么时候用，什么时候不用，替代方案和 Trade-off。
17. **综合实践**：用截至当前已经正式学习过的知识证明掌握。

> 深度不通过 README 行数、技术名词数量、代码量或依赖数量证明，而通过“能否解释、复现、Debug、验证、设计和演进”证明。

---

# 3. 项目与实验如何进入课程

项目、Failure Lab、Performance Lab、Source Lab **不是另一条学习支线**。

它们直接出现在正常学习顺序中：

```text
Module
↓
Module
↓
知识已经能够组成完整成果
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

项目规模随知识自然增长，不强制机械标记 Small / Medium / Large。

例如：

```text
只学 HTML
→ 做语义化内容页

HTML + CSS
→ 做响应式产品网站

JavaScript + DOM + Async
→ 做原生 JavaScript 应用

TypeScript
→ 把数据层和公共 SDK 类型化

React
→ 做完整 React 企业应用

全栈渲染 + BFF
→ 做生产级全栈 Web 产品

性能 + 安全 + SRE + 架构
→ 做可观测、可灰度、可回滚的企业平台
```

## 3.1 Knowledge Ceiling：项目不得偷用未来知识

任何综合实践使用的核心技术必须满足：

```text
项目使用的核心知识 ⊆ 截至当前位置已经正式教授的知识
```

禁止为了项目方便突然引入尚未学习的框架、状态库、请求库、构建工具或后端能力，然后告诉学习者“先复制，后面再讲”。

如果必须使用尚未学习的辅助设施，例如为了 HTTP 课程启动一个简单 Mock Server，必须明确：

- 它只是教学辅助设施；
- 当前不要求理解内部实现；
- 提供完整启动方式和预期结果；
- 它对应的正式知识会在哪个 Stage 学习。

---

# 4. 每一课都必须可复刻

需要代码、命令或实验的 Lesson 只有两种合法起点：

### 方式 A：从零状态开始

```text
空目录 / 最小空项目
→ README 手把手创建
→ 得到当前 Lesson 完整最终源码
```

### 方式 B：明确从上一课最终项目演进

必须先写：

```text
Step 0：准备本课起始项目
```

并明确：

1. 上一课最终源码在哪里；
2. 复制哪个目录；
3. 复制到当前课什么位置；
4. 当前目录树是什么；
5. 是否重新安装依赖；
6. 在哪个目录执行什么命令；
7. 复制后的基线应该看到什么；
8. 当前课会新增、修改、删除哪些文件。

每一课最终源码都必须是一份**可以独立安装、运行、测试和验证的完整工程**。

课程不能因为：

```text
“上一课讲过了”
“这个很简单”
“这个是常识”
“IDE 会提示”
“读者应该懂”
```

就省略当前课程真正需要的操作。

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
→ 为什么出现这个结果
→ 理论上叫什么
```

完整要求继续以 [`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md) 为准。

---

# 5. 总体学习路线

```text
Stage 00  开发环境、命令行、Git 与工程师基本功
Stage 01  计算机组成、操作系统、Linux 与网络底层基础
Stage 02  Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型
Stage 03  HTML、语义、表单、媒体、SEO 与基础可访问性
Stage 04  CSS 语法、层叠、盒模型、布局与响应式
Stage 05  现代 CSS、动画、Token、主题与大型 CSS 架构
Stage 06  JavaScript 语言基础、数据类型、控制流与函数
Stage 07  JavaScript 对象、集合、模块、错误、元编程与设计抽象
Stage 08  DOM、事件、表单、History 与原生浏览器应用
Stage 09  Promise、Async/Await、Fetch、Stream 与异步并发控制
Stage 10  JavaScript Runtime、原型、Event Loop、内存、引擎与算法
Stage 11  TypeScript 从基础到高级类型、Schema、SDK 与类型架构
Stage 12  浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform
Stage 13  HTTP/2/3、缓存、API、实时通信、数据一致性与离线韧性
Stage 14  React 启动、JSX、Component、Props、State、Event 与 Form
Stage 15  React 状态架构、Reducer、Context、Ref、Effect、Hook 与 Router
Stage 16  React Server State、Suspense、Concurrency、Actions、Activity、性能与 Compiler
Stage 17  React SSR、Hydration、RSC、Server Functions、Fiber、Reconciler 与源码架构
Stage 18  Vue 启动、模板、SFC、Composition API、状态、路由与企业应用
Stage 19  Vue 响应式、Renderer、Compiler、SSR、Nuxt 连接点与源码
Stage 20  多框架范式、Angular 企业认知、Web Components 与历史系统迁移
Stage 21  UI 工程、复杂组件、Design System、A11Y、国际化与样式平台
Stage 22  Node.js Runtime、CLI、脚本、Stream、进程与前端服务工具
Stage 23  编译、AST、Vite/Rolldown、Webpack/Rspack、Package、Monorepo 与 DX
Stage 24  静态分析、Unit、Component、Integration、E2E、Visual 与质量工程
Stage 25  BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端
Stage 26  数据库与一致性认知、企业身份、CMS、搜索、对象存储、支付与分析集成
Stage 27  PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程
Stage 28  实时协作、Local-first、离线同步、OT/CRDT 与多人系统
Stage 29  SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化
Stage 30  Schema-driven UI、动态表单、低代码、编辑器与插件式业务平台
Stage 31  前端性能工程、RUM、Core Web Vitals、容量模型与规模化治理
Stage 32  Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理
Stage 33  可观测、SLO、故障治理、CI/CD、容器、Kubernetes、GitOps 与云交付
Stage 34  DDD、模块化、微前端、插件、多租户、前端平台、迁移、治理与技术战略
Stage 35  AI 辅助研发、AI 原生前端、Agent UX 与 Principal 级毕业项目
```

---

# Stage 00：开发环境、命令行、Git 与工程师基本功

## 阶段目标

从完全没有开发经验，达到能够独立创建目录、编辑代码、运行本地服务、定位基本错误、使用 Git 管理学习过程。

## Module 00.01：程序、代码与运行环境

完整学习程序、源代码、编译/解释、CPU、内存、磁盘、进程、线程、端口、客户端/服务端、依赖、构建产物，以及浏览器和 Node.js 分别是什么运行环境。

## Module 00.02：文件系统、Terminal 与 Shell

完整学习路径、绝对/相对目录、权限、环境变量、PATH、管道、重定向、退出码，以及 `pwd/ls/cd/cp/mv/rm/cat/grep/find/curl/lsof/ps/kill` 等开发排障常用命令。

## Module 00.03：编辑器与 Debug 基础

学习工作区、文件树、搜索、重构、格式化、Language Server、断点、变量、Call Stack、Console、Terminal 与浏览器 DevTools 的职责区别。

## Module 00.04：Node.js 与包管理器最小工具认知

只学习前端课程启动所需的 Node 版本、npm/pnpm、`package.json`、dependency、script、lockfile 和执行命令，不在这里提前深入 Node Runtime。

## Module 00.05：Git 与 GitHub

从 `init/add/commit/status/log/diff` 一直到 branch、merge、rebase、conflict、revert、remote、PR、Review、Tag，并建立 Blob/Tree/Commit/HEAD 的基本对象模型。

### 综合实践：Frontend Developer Bootstrap

从空目录建立第一个学习仓库，创建 HTML 页面、启动本地 HTTP 服务、使用 DevTools 查看页面，完成 feature branch、冲突解决、PR、合并和 Tag。

### 阶段验收

能在不知道当前目录状态的情况下自行定位项目、运行服务、识别端口问题、查看错误、提交 Git 历史并说明修改来源。

---

# Stage 01：计算机组成、操作系统、Linux 与网络底层基础

## 阶段目标

建立后续理解 JavaScript Engine、浏览器、多进程、性能、网络、Node.js、Docker/Kubernetes 所需要的底层直觉。

## Module 01.01：CPU、内存层级与计算机运行模型

CPU、寄存器、指令、时钟、Cache、Cache Line、主内存、磁盘、总线、分支预测、NUMA 的高层模型，以及它们如何影响 JavaScript 与浏览器性能。

## Module 01.02：进程、线程、调度与系统调用

Process、Thread、Kernel/User Mode、Context Switch、Scheduler、System Call、Signal、CPU Usage、Load Average，以及浏览器多进程和 Worker 的前置模型。

## Module 01.03：虚拟内存、文件与 IO

Virtual Memory、Page、Page Fault、Swap、File Descriptor、Page Cache、mmap、同步/异步 IO 的基本模型。

## Module 01.04：Linux 开发与生产诊断

`top/htop/vmstat/iostat/pidstat/ss/lsof/tcpdump/strace` 等工具的用途，理解 CPU 高、内存增长、端口占用、FD 耗尽和网络连接问题。

## Module 01.05：Ethernet、IP、路由、UDP 与 TCP 基础

MAC、ARP、IPv4/IPv6、CIDR、Subnet、Gateway、Routing、NAT、ICMP、UDP、TCP 的职责与关系。

### 综合实验：Local System & Network Lab

启动本地前端服务器，观察进程、端口、TCP 连接、文件读取和资源请求；制造端口冲突、进程退出和连接失败并使用系统工具定位。

---

# Stage 02：Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型

## Module 02.01：Internet 与 URL

浏览器、路由器、ISP、自治系统、数据中心、源站、代理、CDN；URL 的 scheme/host/port/path/query/fragment 和编码规则。

## Module 02.02：DNS

递归解析、权威 DNS、A/AAAA/CNAME、TTL、缓存、DNS 故障和浏览器/操作系统 DNS 路径。

## Module 02.03：TCP 深入与 QUIC 直觉

握手、关闭、Sequence/ACK、重传、窗口、拥塞、RTT/RTO、TIME_WAIT/CLOSE_WAIT，以及为什么 HTTP/3 选择 QUIC。

## Module 02.04：TLS 与 HTTPS

证书、CA、域名校验、密钥协商、加密、TLS 握手、证书错误、安全上下文以及 HTTPS 对现代 Web API 的影响。

## Module 02.05：HTTP/1.1 基础到完整报文

Method、Status、Header、Body、Content-Type、Content-Encoding、Cookie、Redirect、Conditional Request、Range、Connection 等。

### 综合实践：一次 URL 请求全链路实验

从输入 URL 开始，使用 `dig/curl/DevTools/tcpdump` 观察 DNS、TCP/TLS、HTTP、HTML 和静态资源请求，画出真实时序图。

## Module 02.06：Web 应用形态与系统边界

Static Site、MPA、SPA、SSR、SSG、Hybrid Rendering、BFF、API、CDN、Object Storage、Database、Search、Queue 的位置；先建立全景，后续分别深入。

---

# Stage 03：HTML、语义、表单、媒体、SEO 与基础可访问性

## Module 03.01：HTML 文档、解析与 DOM

DOCTYPE、html/head/body、metadata、字符集、Viewport、Token、Tree Builder、DOM、浏览器容错和错误嵌套修复。

## Module 03.02：语义内容与页面结构

Heading、Paragraph、List、Link、article/section/nav/main/header/footer/aside、figure、time、code 等语义和内容模型。

### 综合实践：语义化个人/产品介绍页

只使用截至当前已学习的 HTML 与基础开发工具完成结构正确、链接可用、没有 CSS 依赖的内容页。

## Module 03.03：表单与原生校验

form、input、select、textarea、label、fieldset、autocomplete、Validity API、GET/POST、multipart、文件上传和移动端输入模式。

## Module 03.04：表格、图片、音视频与嵌入内容

Data Table、picture/srcset/sizes、audio/video、track、iframe、lazy loading、媒体语义和嵌入安全基础。

## Module 03.05：HTML Accessibility

Native Semantics、Keyboard、Focus、Accessible Name、Accessibility Tree、ARIA 的适用边界、Screen Reader 基础。

## Module 03.06：SEO 与渐进增强基础

Title/Meta、Semantic Content、Robots/Sitemap 初识、结构化数据概念、无 JavaScript/弱网环境和 Progressive Enhancement。

### 阶段综合项目：企业内容网站

完成首页、产品介绍、帮助中心、复杂联系表单、数据表格、媒体页面和基础 SEO/A11Y；用 Validator、Keyboard 和 Accessibility Tree 验收。

---

# Stage 04：CSS 语法、层叠、盒模型、布局与响应式

## Module 04.01：CSS 语法、选择器与 Cascade

Selector、Specificity、Inheritance、Initial/Computed/Used Value、Cascade Origin、Importance、Source Order、Cascade Layer。

## Module 04.02：Box Model 与尺寸

Content/Padding/Border/Margin、box-sizing、Margin Collapse、Intrinsic Size、单位、calc/min/max/clamp。

## Module 04.03：Normal Flow、Formatting Context 与 Position

Block/Inline/BFC、Containing Block、static/relative/absolute/fixed/sticky、z-index、Stacking Context、Overflow 和 Scroll Container。

## Module 04.04：Flexbox

主轴、交叉轴、Basis/Grow/Shrink、Auto Minimum Size、Alignment、Wrap 和常见布局陷阱。

### 综合实践：后台页面骨架

仅使用已经学习的 HTML/CSS 实现 Header、Sidebar、Main、Card List、Toolbar 等布局，并用 DevTools 解释布局行为。

## Module 04.05：CSS Grid

Track、Line、Area、fr、minmax、auto-placement、explicit/implicit grid、二维布局和复杂 Dashboard。

## Module 04.06：Responsive Design

Mobile First、Content-driven Breakpoint、Media Query、Responsive Image、Viewport、Touch、布局重排。

## Module 04.07：Typography、Color 与视觉还原

字体、Web Font、Line Height、Fallback、FOIT/FOUT、现代颜色空间、对比度、Icon/SVG、Spacing/Type Scale。

### 阶段综合项目：响应式产品官网

把 Stage 03 的内容能力和本阶段 CSS 能力组合为手机/平板/桌面可用的完整产品网站，不引入 JavaScript 框架。

---

# Stage 05：现代 CSS、动画、Token、主题与大型 CSS 架构

## Module 05.01：Modern CSS Layout

Container Query、Subgrid、Intrinsic Sizing、Logical Properties、Writing Mode、Aspect Ratio、Safe Area、Dynamic Viewport。

## Module 05.02：Transition、Animation 与 Motion

Transition、Keyframes、Transform、Compositor、View Transition Web API、Scroll-driven Animation、Reduced Motion 和性能边界。

## Module 05.03：CSS Variables、Design Token 与 Theme

Primitive/Semantic/Component Token、CSS Custom Properties、Light/Dark/High Contrast、Brand/Tenant Theme 和运行时切换。

### 综合实践：多主题组件页面

在现有产品网站中加入 Token、暗色、高对比度和品牌主题，验证主题切换、RTL 和文本膨胀。

## Module 05.04：CSS Architecture

BEM/OOCSS/ITCSS、Utility First、CSS Modules、CSS-in-JS、Zero-runtime、Cascade Layer、Scope、第三方样式隔离与方案 Trade-off。

## Module 05.05：CSS Quality & Performance

Stylelint、Unused CSS、Critical CSS、字体/样式加载、Layout/Paint/Composite 成本、视觉回归和兼容治理。

### 阶段综合项目：可主题化响应式应用壳

构建一套可复用页面壳、Token、主题和基础组件样式，为后续 JavaScript/框架课程提供真实 UI 基础。

---

# Stage 06：JavaScript 语言基础、数据类型、控制流与函数

## Module 06.01：JavaScript 运行入口、变量与类型

Script/Module、Strict Mode、let/const/var、Primitive/Object、Number/BigInt/String/Boolean/Symbol/null/undefined。

## Module 06.02：表达式、转换、比较与控制流

Operator、Truthy/Falsy、显式/隐式转换、==/===/Object.is、条件、循环、异常入口和边界值。

## Module 06.03：函数与参数

Declaration/Expression/Arrow、参数、默认值、Rest、返回值、Callback、Higher-order Function、Pure Function 基础。

### 综合实践：价格与订单规则计算器

只使用截至当前的 JavaScript 语言能力实现商品、折扣、税费、订单统计和错误输入处理，不使用 DOM。

## Module 06.04：Scope、Closure 与 this

Lexical Scope、Hoisting、TDZ、Closure、生命周期、this 调用规则、bind/call/apply、箭头函数差异。

## Module 06.05：Debug 与错误定位基础

Breakpoint、Watch、Call Stack、Exception、Console、Source Map 初识，用真实错误训练代码定位。

---

# Stage 07：JavaScript 对象、集合、模块、错误、元编程与设计抽象

## Module 07.01：Object、Array 与不可变更新

Property、Descriptor 初识、Destructuring、Spread、Clone 边界、Array map/filter/reduce/sort/group、数据转换。

## Module 07.02：Map、Set、Weak Collection 与常用内建对象

Map/Set/WeakMap/WeakSet、Date、Intl、RegExp、URL、URLSearchParams、JSON、序列化边界。

## Module 07.03：模块系统

ESM import/export、Named/Default、Live Binding、Dynamic Import、循环依赖、浏览器 Native Module 和模块边界设计。

### 综合实践：模块化数据处理工具库

将 Stage 06 的业务逻辑拆成可测试、可组合、错误边界清晰的 ES Module 工具库。

## Module 07.04：原型、Class 与对象模型

[[Prototype]]、Prototype Chain、new、constructor、class、private field、继承、组合与真实对象关系。

## Module 07.05：Iterator、Generator、Symbol、Proxy 与 Reflect

Iteration Protocol、Generator、Async Iterator 前置、Proxy/Reflect、不变量、响应式系统前置直觉。

## Module 07.06：错误模型与 API Design

Error/Cause、Custom Error、Result Pattern、不要吞错、业务错误/系统错误、输入边界和公共 API。

## Module 07.07：设计模式与前端抽象

Observer、Pub/Sub、Command、Strategy、Adapter、Facade、Factory、State、Middleware、Plugin；强调问题驱动而不是套模式。

---

# Stage 08：DOM、事件、表单、History 与原生浏览器应用

## Module 08.01：DOM Tree、查询与更新

Document/Element/Node/Text、Selector、Traversal、Create/Insert/Replace/Delete、Template、Fragment、Live/Static Collection。

## Module 08.02：安全 DOM 更新

textContent、innerHTML、Attribute/URL/CSS Context、Sanitization 前置、用户内容和 DOM XSS 基础。

## Module 08.03：Event System

Capture/Target/Bubble、Default Action、Delegation、Passive/Once、Keyboard/Pointer/Input/Composition、Custom Event。

### 综合实践：动态商品/任务列表

把 Stage 06～08 的语言、模块、DOM、Event 能力组合成支持新增、编辑、删除、筛选和键盘操作的页面。

## Module 08.04：浏览器表单脚本

FormData、Constraint Validation、异步校验前置、File Input、Selection、IME、Focus 和用户输入状态。

## Module 08.05：History、Location 与原生 Routing

URL State、pushState/replaceState、popstate、Deep Link、404、刷新、滚动恢复和 Router 的最小模型。

## Module 08.06：浏览器 Storage 基础

Cookie、localStorage、sessionStorage 的用途、生命周期、安全和多标签同步初识。

### 阶段综合项目：原生 JavaScript 单页工作台 v1

不依赖 React/Vue，实现路由、列表、表单、本地状态、持久化、错误提示和基础测试结构。

---

# Stage 09：Promise、Async/Await、Fetch、Stream 与异步并发控制

## Module 09.01：异步来源与 Promise

Event/Timer/Network、Promise State、then chain、rejection propagation、finally、Promise resolution 和错误传播。

## Module 09.02：Async/Await 与任务组合

Serial/Parallel/Dependency Task、all/allSettled/race/any、错误边界、Partial Failure。

## Module 09.03：Fetch 与 HTTP Client

Request/Response、Header/Body、JSON/Form/Binary、HTTP Error vs Network Error、AbortController、Timeout。

### 综合实践：搜索与远程数据页面

在原生工作台中加入真实/模拟 API、Loading、Error、取消、空状态、搜索建议和请求竞态处理。

## Module 09.04：并发控制与网络韧性基础

Concurrency Limit、Queue、Deduplication、Retry、Exponential Backoff、Jitter、Stale Response、Race Condition。

## Module 09.05：Streams 与 Backpressure

Readable/Writable/Transform Stream、Chunk、Streaming Parse、Backpressure、增量 UI 和大文件处理直觉。

## Module 09.06：Timer、Animation Frame、Idle 与任务调度

setTimeout/setInterval、requestAnimationFrame、Idle、Scheduler API 认知以及什么时候不能用轮询。

### 阶段综合项目：原生 JavaScript 单页工作台 v2

加入远程 API、请求缓存、超时取消、重试、流式数据显示和弱网错误恢复。

---

# Stage 10：JavaScript Runtime、原型、Event Loop、内存、引擎与算法

## Module 10.01：执行上下文、Call Stack 与词法环境

Parsing、Execution Context、Lexical Environment、Closure Retention、Call Stack、Exception Unwind。

## Module 10.02：Browser Event Loop

Task、Microtask、Rendering Opportunity、Animation Frame、Observer Callback、事件顺序和饥饿问题。

## Module 10.03：内存、GC 与泄漏

Heap/Stack 实用模型、Reachability、Mark-Sweep、Generational/Incremental GC、Detached DOM、Listener/Timer/Cache/Closure 泄漏。

### 故障实验：Long Task + Memory Leak Lab

主动制造主线程阻塞、Detached DOM、无限缓存和重复监听器，用 Performance、Memory、Heap Snapshot、Retainer Path 定位并修复。

## Module 10.04：JavaScript Engine 与 JIT

源码到 AST/Bytecode/JIT 的高层路径、Hidden Class/Shape、Inline Cache、Optimization/Deoptimization、热点代码和性能迷思。

## Module 10.05：数据结构、复杂度与前端算法

Array/List/Stack/Queue/Hash/Tree/Trie/Graph/Heap/LRU，时间空间复杂度，以及权限树、路由匹配、虚拟列表、缓存淘汰等前端场景。

## Module 10.06：自制 Runtime 实验

实现最小 Event Emitter、Task Scheduler、LRU、Reactive Core 或 Virtual List 核心，用实现反推抽象。

---

# Stage 11：TypeScript 从基础到高级类型、Schema、SDK 与类型架构

## Module 11.01：TypeScript 编译模型与基础类型

类型擦除、tsc、Language Service、Primitive/Array/Tuple/Object/Function、Union/Intersection、unknown/never/any、strict。

## Module 11.02：Narrowing、Interface、Type 与函数类型

Control Flow Analysis、Type Guard、Assertion Function、Structural Typing、Excess Property、Overload。

## Module 11.03：Generic、keyof、Indexed Access 与类型推导

Generic Constraint/Default、Utility Type、API 输入输出关系和可复用类型设计。

### 综合实践：把原生工作台数据层迁移到 TypeScript

逐步从 JavaScript 迁移，建立 API DTO、Domain Model、状态和错误类型；禁止用 any 掩盖问题。

## Module 11.04：Mapped、Conditional、infer、Template Literal Type

高级类型计算、Discriminated Union、State Machine、类型级路径/事件/Token，以及可读性与复杂度边界。

## Module 11.05：Runtime Validation 与 Schema

TypeScript 不验证外部数据；Schema Parser/Decoder、JSON Schema、OpenAPI、GraphQL Codegen、Error Aggregation。

## Module 11.06：Declaration、Package Types 与公共 API

.d.ts、Module Augmentation、Exports/Imports、ESM/CJS 类型差异、Library Declaration、API Compatibility。

## Module 11.07：大型 TypeScript 工程

Project Reference、Incremental、Build Mode、Monorepo Type Boundary、类型检查性能、Strict Migration 和 any 债务治理。

### 阶段综合项目：Type-safe Frontend SDK

发布一套可被两个独立项目消费的 SDK：Runtime Validation、声明输出、类型测试、版本策略、错误模型和迁移说明完整。

---

# Stage 12：浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform

## Module 12.01：Navigation 与浏览器多进程架构

Browser/Renderer/Network/GPU Process、Site Isolation、Frame/OOPIF、Sandbox、IPC、Navigation Commit 和安全边界。

## Module 12.02：HTML/CSS Parsing 与 Rendering Pipeline

Tokenizer/Tree Builder、Preload Scanner、DOM/CSSOM、Style、Layout、Paint、Raster、Composite、Layer 和 GPU 边界。

## Module 12.03：Rendering Performance Mechanism

Forced Layout、Layout Thrashing、Long Animation Frame、Layout Shift、DOM Size、Paint/Composite 成本和 Trace 证据。

### 浏览器机制实验：从导航到首屏 Trace

录制真实 Performance Trace，逐段解释网络、Parse、Script、Style、Layout、Paint 和 Composite。

## Module 12.04：事件、Focus、Selection 与页面生命周期

Event Path、Shadow Retargeting、DOMContentLoaded/Load、Visibility、pagehide/pageshow、BFCache、Focus/Selection、Navigation API。

## Module 12.05：IndexedDB、Cache Storage、OPFS 与数据生命周期

数据模型、Transaction、Version/Migration、Quota、损坏恢复、Private Mode 和多标签一致性。

## Module 12.06：Worker 家族

Dedicated/Shared/Service Worker、Worklet、Structured Clone、Transferable、MessageChannel、BroadcastChannel、Web Locks。

## Module 12.07：PWA 与 Offline 基础

App Shell、Precache、Runtime Cache、Background Sync、Offline Queue、更新生命周期和旧 Service Worker 故障。

## Module 12.08：Web Platform Capability & Permission

Clipboard、File System Access、Notification、Geolocation、Share、Permission、Feature Detection、Baseline、渐进增强。

### 阶段综合项目：Offline-capable Browser App

基于原生/TypeScript 应用加入 IndexedDB、Worker、Service Worker、离线读取、待同步队列和多标签协调。

---

# Stage 13：HTTP/2/3、缓存、API、实时通信、数据一致性与离线韧性

## Module 13.01：HTTP/1.1 深入、HTTP/2 与 HTTP/3

Persistent Connection、Head-of-line Blocking、Multiplex、HPACK/QPACK 高层、QUIC、0-RTT、连接迁移和部署边界。

## Module 13.02：Browser/CDN/Origin 多级缓存

Cache-Control、ETag、Vary、Immutable、Stale、Cache Key、Purge、Shield、Negative Cache、租户串缓存风险。

### 网络实验：Browser → CDN → Origin Cache Lab

通过本地反向代理/教学环境验证 200、304、Age、Cache Status、资源 Hash 和错误 Cache Key。

## Module 13.03：REST、GraphQL、RPC 与契约设计

Resource/Method/Status、Cursor Pagination、OpenAPI、GraphQL Schema、gRPC-Web/Connect/tRPC 认知、兼容演进和选型。

## Module 13.04：写操作与一致性

Idempotency Key、Optimistic Concurrency、Version/ETag、重复提交、部分成功、Compensation、最终一致性前置。

## Module 13.05：Realtime Transport

Polling/Long Polling/SSE/WebSocket/WebRTC Data/WebTransport、连接生命周期、Heartbeat、Reconnect、Auth Refresh、Backpressure。

## Module 13.06：消息协议与流式 UI

Envelope、Version、Sequence、Ack、Dedup、Ordering、Replay、ReadableStream、增量 JSON/文本解析。

## Module 13.07：Upload 与对象存储传输模型

Multipart、Signed URL、分片、断点续传、Checksum、取消、并发、Resume 和安全边界。

## Module 13.08：Offline Write、Outbox 与冲突

Pending Queue、Operation Log、Retry、Conflict、Last-write-wins、Manual Merge、OT/CRDT 前置。

### 阶段综合项目：实时 + 离线数据应用

完成实时通知、断线重连、流式数据、分片上传、离线写入和冲突提示，全部带弱网/乱序/重复消息测试。

---

# Stage 14：React 启动、JSX、Component、Props、State、Event 与 Form

> React 使用课程编写时当前稳定版。React 所有 Owner Module 一次学透，不另建“React 高级篇”。

## Module 14.01：React 的问题域与项目启动链路

从空目录建立 React + TypeScript 项目；完整理解 package、Vite、index.html、main.tsx、createRoot、Root、render、App、React Tree 与 DOM Tree。

## Module 14.02：JSX、React Element、React Node 与 Component

JSX Transform、Expression/Attribute/Children/Fragment、Element Object、Component Definition、`App`/`App()`/`<App />`、Component Identity。

## Module 14.03：Props、Composition 与单向数据流

Props/children、Function Props、Immutable Input、Component Composition、TypeScript Props、API 初步设计。

### 综合实践：React 商品目录

基于 Component/Props/Conditional/List/Key 构建商品目录；不提前使用 State Manager、Router、Query 等未来能力。

## Module 14.04：Conditional Rendering、List、Key 与 Identity

列表更新、Stable Key、错误 index key、State Preservation 的前置机制和 Failure Lab。

## Module 14.05：State 与 useState

State 为什么存在、普通变量为何不工作、Lazy Init、Setter、Object/Array Update、Immutable、Same-value Update。

## Module 14.06：Render Snapshot、Update Queue 与 Batching

闭包、Render Snapshot、Functional Updater、Replace Update、Batching 和一次更新从事件到下一次 Render 的完整行为模型。

## Module 14.07：Event System

Synthetic Event、Capture/Bubble、Target/currentTarget、Default Action、Keyboard/Pointer/Input/Composition、Event Priority 前置。

## Module 14.08：Form、Controlled / Uncontrolled

Input/Select/Textarea/Checkbox/Radio/File、value/defaultValue、Selection/IME、Validation、Large Form 基础和 A11Y。

### 阶段综合项目：React 订单编辑器 v1

使用截至当前的 Component、Props、State、Event、List/Key、Form 构建订单编辑流程，并主动制造错误 Key、重复提交和表单状态问题。

---

# Stage 15：React 状态架构、Reducer、Context、Ref、Effect、Hook 与 Router

## Module 15.01：State Modeling 与 Ownership

Minimal/Derived/Redundant/Duplicate/Impossible State、Lift State、Controlled State、State Ownership、URL/Server/Client State 分类。

## Module 15.02：useReducer 与状态机思想

Reducer/Action/Dispatch、Pure Reducer、复杂 State、Undo/Redo、State Machine、Reducer Test 和 React 内部 Dispatch 连接点。

## Module 15.03：Context 一次学透

Provider、Nearest Value、Update Propagation、Value Identity、Context Splitting、Dependency Injection、Context + Reducer、性能与滥用边界。

### 综合实践：多步骤订单工作流

把 Stage 14 的订单编辑器演进为多步骤流程，使用 State Modeling、Reducer、Context，加入 Undo/Redo 和状态机式边界。

## Module 15.04：Ref 与 Imperative Escape Hatch

useRef、DOM Ref、Callback Ref、Measurement、Focus、Scroll、Timer、Third-party Widget、useImperativeHandle 和 API Boundary。

## Module 15.05：Effect 一次学透

External Synchronization、Setup/Cleanup、Dependency、StrictMode、Stale Closure、Race、Abort、Subscription、Timer、Infinite Effect、Passive Effect 内部模型和架构治理。

## Module 15.06：Removing Effects 与 useEffectEvent

Derived State、Event Logic、Key Reset、External Store、Server State Library、Reactive/Non-reactive Logic，以及什么时候应删除 Effect。

### Failure Lab：Effect Hell

主动制造 Infinite Effect、重复 Subscription、Stale Closure、Race Condition、卸载后任务和依赖对象导致的重复执行，逐个用证据定位。

## Module 15.07：Custom Hook 与 Hook API Design

Logic Reuse、生命周期、参数/返回 API、错误边界、SSR、Testability、useDebugValue、Library Hook 设计。

## Module 15.08：Router 与 URL State

Route Tree、Nested Layout、Params/Search Params、Deep Link、Lazy Route、Error Route、Scroll、Auth Boundary、URL State。

### 阶段综合项目：React 企业工作台 v2

加入多路由、多角色 UI、复杂表单、Context/Reducer、Effect 外部同步、Custom Hook 和错误路由；每个 Effect 必须能说明外部系统是谁。

---

# Stage 16：React Server State、Suspense、Concurrency、Actions、Activity、性能与 Compiler

## Module 16.01：Server State 与 Query Cache

Client State vs Server State、Query Key、Stale、GC、Dedup、Retry、Invalidation、Mutation、Pagination、Infinite Query、Prefetch、Offline；以 TanStack Query 等方案验证模型。

## Module 16.02：Optimistic UI 与 React Actions

Action、Pending、useActionState、useOptimistic、Form Action、Rollback、Concurrent Mutation、Server Validation、Idempotency。

### 综合实践：带 Server State 的订单系统

引入 Query Cache、Mutation、Optimistic Update、Error Recovery，不再把远程数据塞入普通全局 State。

## Module 16.03：Concurrent Rendering Mental Model

Urgent/Non-urgent、Interruptible Render、Restart、Commit Atomicity、Concurrency ≠ Parallelism、Purity 与 Lane 前置。

## Module 16.04：Transition 与 Deferred Value

startTransition/useTransition、Pending、Ordering、Navigation、useDeferredValue、Stale UI、Debounce/Throttle 区别和性能验证。

## Module 16.05：Suspense 一次学透

Boundary、Fallback、Nested Reveal、Retry、Lazy、Data Resource、Error Boundary、Transition、Waterfall、Architecture 和内部重试模型。

## Module 16.06：use() 与 Activity

Promise/Context Resource、Conditional use、Suspense 协作、Activity hidden/visible、State Preservation、Effect Cleanup、后台优先级和适用场景。

### Performance Lab：Slow Render / Suspense Waterfall

制造大列表、阻塞输入、错误 Suspense Boundary 和数据瀑布，用 Profiler + Browser Performance 分析并修复。

## Module 16.07：React Performance Engineering

Profiler、Render Propagation、State Locality、memo/useMemo/useCallback、Selector、Virtualization、Bundle、Memory、React Performance Track 和什么时候不优化。

## Module 16.08：React Compiler

Compiler 目标、Rules of React、自动 Memoization、Build Integration、Diagnostics、Bailout、渐进采用、Library Compatibility 和前后 Benchmark。

### 阶段综合项目：高交互 React 数据工作台

包含复杂 Query、Optimistic UI、Transition、Suspense、Activity、大列表与 Compiler；提交 Profiler 和 Performance Trace 证据。

---

# Stage 17：React SSR、Hydration、RSC、Server Functions、Fiber、Reconciler 与源码架构

## Module 17.01：React DOM、Portal 与资源 API

DOM Property、Controlled Native Element、Portal、React Tree vs DOM Tree、Metadata、Preload/Preinit/Preconnect、资源加载与 Browser Boundary。

## Module 17.02：Server Rendering

react-dom/server、renderToPipeableStream/renderToReadableStream、Shell、Bootstrap、Abort、Error、Streaming HTML、SEO 和服务器资源边界。

## Module 17.03：Hydration 一次学透

hydrateRoot、DOM Identity、Event Attachment、Mismatch、Date/Random/Locale、useId、Recoverable Error、Hydration Performance 和 Debug。

### 综合实验：手写最小 React SSR 应用

不依赖 Next.js，建立 Node Server + React Server Renderer + Browser Hydration，制造 Hydration Mismatch 并修复。

## Module 17.04：Static Rendering、Prerender、Resume / Partial Prerender

Static HTML、Prerender API、Streaming、Postponed State/Resume 的版本相关能力和生产选型；正式编课时按稳定 API 核验。

## Module 17.05：React Server Components

Server Component、Client Component、SSR vs RSC、Build/Request Runtime、Serialization、Client Boundary、Bundle Impact、Data Access 和 Security。

## Module 17.06：Server Functions

"use server"、Client Reference、Argument/Result Serialization、Authorization、Validation、Mutation、Error、Audit 和安全边界。

### 综合实践：RSC 数据页面

构建最小 Server/Client Boundary、Suspense Streaming、Server Function 写操作，证明哪些代码进入浏览器、哪些不进入。

## Module 17.07：React Source Research Method

固定 React 版本/Commit、Build Source、Minimal Reproduction、Breakpoint、Call Stack、Object Snapshot、Test 和结论验证方法。

## Module 17.08：Fiber、Reconciler 与 Render/Commit

Fiber Node、current/workInProgress、child/sibling/return/alternate、beginWork/completeWork、Child Reconcile、Flags、Mutation/Layout/Passive Commit。

## Module 17.09：Hooks Internals、Update Queue、Lane 与 Scheduler

Hook Linked List、Dispatcher、mount/update、Queue、Base State、Lane、Priority、Transition、Suspended/Ping/Entangle、调度和中断。

## Module 17.10：Suspense、Hydration 与 Server Renderer Internals

Throw Promise、Retry/Ping、Boundary、Hidden Tree、Hydration Replay、Server Segment、Stream、RSC Transport 的关键源码路径。

### 阶段综合项目：React Architecture & Source Review

对企业 React 应用进行一次源码级架构答辩：State Update 如何走到 Commit、Transition/Suspense 如何调度、SSR/RSC 边界在哪里、故障和性能证据是什么。

---

# Stage 18：Vue 启动、模板、SFC、Composition API、状态、路由与企业应用

## Module 18.01：Vue 启动链路与 SFC

createApp、Root、Mount、SFC template/script setup/style、编译前后、Application/Component Instance/DOM。

## Module 18.02：Template、Directive、Props、Emit、Slots

Interpolation、Binding、Event、Conditional/List/Key、Props/Emit/model/Slots、Fallthrough Attribute 和组件 API。

## Module 18.03：ref/reactive/computed 基础到完整使用

Reactive State、Automatic Unwrap、Identity、Readonly/Shallow、解构边界、Computed Cache。

### 综合实践：Vue 商品与订单页面

用 Vue 基础组件、响应式、Props/Emit/Slots 实现与 React 阶段可比较的业务流程。

## Module 18.04：Composition API 与 Composable

Setup、Lifecycle、Template Ref、Composable、Effect Scope、Logic Reuse、API Design、Testability。

## Module 18.05：watch/watchEffect 与副作用

Dependency、Flush Timing、Cleanup、Deep Watch、Async、错误滥用，与 React Effect 进行模型比较。

## Module 18.06：Pinia 与 Vue State Architecture

Store/Getter/Action、Plugin、Persistence、SSR、Store Boundary、Server State 区分。

## Module 18.07：Vue Router

Nested/Dynamic Route、Guard、Lazy、Scroll、Data Fetch、Permission、Error 和 Route Architecture。

## Module 18.08：Teleport、Suspense、KeepAlive、Transition、Async Component

复杂 UI、State Preservation、Overlay、Async、Error Capture 和性能/生命周期边界。

### 阶段综合项目：Vue 企业运营后台

构建带复杂表单、Router、Pinia、权限、主题和异步数据的企业应用，并记录与 React 的关键设计差异。

---

# Stage 19：Vue 响应式、Renderer、Compiler、SSR、Nuxt 连接点与源码

## Module 19.01：Vue Reactivity Internals

Proxy、Track、Trigger、Dep、Reactive Effect、Scheduler、Batch、Cleanup，实现 Mini Reactivity 并源码 Debug。

## Module 19.02：VNode、Renderer 与 Patch

VNode、Component Update、Patch、Keyed Diff、Block Tree、Patch Flag、Static Hoist 和 Renderer Architecture。

## Module 19.03：Template Compiler

Parse、AST、Transform、Codegen、Render Function、Compiler Optimization，从模板观察生成代码。

### Source Lab：一次 ref 更新如何到达 DOM

断点观察 Track/Trigger → Scheduler → Component Update → Patch 的完整链路。

## Module 19.04：Vue SSR 与 Hydration

Server Render、State Serialization、Async Data、Streaming、Hydration、Mismatch、Cross-request Pollution。

## Module 19.05：Nuxt 连接模型

File Routing、Auto Import、Server Route、Plugin/Middleware、Payload、Data Fetch、Nitro、Module/Layer，仅建立 Vue 全栈框架连接；Stage 25 再完整学习全栈架构。

## Module 19.06：Vue Performance、Testing 与 Production Boundary

Reactive Granularity、Watch Cost、Component Render、Bundle、Devtools、SSR、Error、Migration 和升级边界。

### 阶段综合项目：Vue SSR + Source Architecture Review

实现最小 Vue SSR/Hydration，并提交 React/Vue 响应式、调度和渲染机制对比报告。

---

# Stage 20：多框架范式、Angular 企业认知、Web Components 与历史系统迁移

## Module 20.01：UI Framework Paradigms

Virtual DOM、Fine-grained Reactivity、Signal、Compiler-first、Template/JSX、Server-first、Resumability 的思想与成本。

## Module 20.02：Angular 企业级认知

Component、DI、RxJS、Signal、Router、Forms、Change Detection、SSR、Workspace、约束式大型项目和 AngularJS→Angular 迁移。

## Module 20.03：Svelte、Solid、Qwik 等架构认知

不是追逐 API，而是用统一业务实验理解 Compiler/Fine-grained/Resumability 等不同路线。

## Module 20.04：Web Components

Custom Element、Shadow DOM、Slot、Property/Attribute、Event、Form-associated Element、Style Isolation、SSR 边界。

### 综合实践：跨 React/Vue 的 Web Component

实现同一组件在 React/Vue 中消费，处理 Event、Object Property、Theme 和 A11Y。

## Module 20.05：Framework Selection

团队能力、招聘、生态、性能、长期支持、SSR、合规、迁移、Vendor Risk 和 Exit Strategy。

## Module 20.06：Legacy Frontend Migration

jQuery、AMD/CMD/RequireJS、AngularJS、Vue2、Class React、旧构建链；Strangler、Adapter、Route-by-route、Dual Run、Codemod。

### 阶段综合项目：历史系统迁移 RFC + Vertical Slice

给一个旧前端系统制定分阶段迁移路线，并真正迁移一个垂直功能，要求业务不中断且可回滚。

---

# Stage 21：UI 工程、复杂组件、Design System、A11Y、国际化与样式平台

## Module 21.01：Component Architecture

Primitive、Headless、Domain/Business Component、Controlled/Uncontrolled、Compound、Render Prop、Provider、Polymorphic、Public API。

## Module 21.02：复杂组件工程

Dialog、Select、Combobox、Menu、Tree、Data Grid、Date Picker、Upload、Virtual List、Rich Text 的状态、DOM、Focus、Keyboard 和 Performance。

### 综合实践：Headless Dialog + Combobox

分别提供 React/Vue Adapter，行为和 A11Y 契约一致，样式可替换。

## Module 21.03：WCAG 2.2 与复杂 Accessibility

Perceivable/Operable/Understandable/Robust、Focus、Live Region、Grid/Tree、Drag & Drop、虚拟化、Screen Reader、自动+人工审计。

## Module 21.04：Internationalization / Globalization

Unicode、Code Point/Grapheme、Normalization、CLDR/ICU/MessageFormat、Plural、Date/Number/Currency/Timezone、RTL、CJK、字体、Pseudo-localization。

## Module 21.05：Design Token Pipeline

Source/Alias/Semantic/Component Token、Codegen、CSS Variable、Native Output、Theme、Brand/Tenant、Validation。

## Module 21.06：Design System Platform

Foundation/Primitive/Component/Pattern、Docs/Playground、Visual/A11Y Test、SemVer、Changeset、Canary、Codemod、Contribution、Adoption Metric。

### 阶段综合项目：跨框架 Design System

发布 React/Vue 可消费的 Token + 组件包、文档站、主题、A11Y/Visual 测试，并执行一次 Breaking Change 迁移。

---

# Stage 22：Node.js Runtime、CLI、脚本、Stream、进程与前端服务工具

## Module 22.01：Node Runtime 与 Event Loop

Browser vs Node、Global、Process、libuv 高层、Event Loop Phase、Thread Pool、Signal、Exit、Unhandled Error。

## Module 22.02：File、Path、URL、Buffer、Crypto、HTTP

核心标准库、Async IO、File Handle、Binary、Hash、HTTP Server 和安全文件处理。

## Module 22.03：Stream 与 Backpressure

Readable/Writable/Transform/Pipeline、Error/Close、Backpressure、大文件和网络代理。

## Module 22.04：Child Process、Worker Thread 与并行任务

spawn/exec、IPC、Worker Thread、任务并发、CPU-bound、Graceful Shutdown。

### 综合实践：Frontend Automation CLI

实现课程目录/代码生成/资源处理 CLI，要求参数、Help、Exit Code、日志、错误、幂等、Signal、测试完整。

## Module 22.05：配置与环境

Environment、Config Precedence、Secret Boundary、Development/Test/Production、.env 风险和 Schema Validation。

## Module 22.06：Node Performance & Debug

Inspector、CPU Profile、Heap、Async Stack、Trace、Process Leak 和 CLI/BFF 性能诊断。

---

# Stage 23：编译、AST、Vite/Rolldown、Webpack/Rspack、Package、Monorepo 与 DX

## Module 23.01：Module Resolution 与 ESM/CJS

Node/Browser Resolution、package exports/imports、Conditional Export、Dual Package Hazard、Import Map、循环依赖。

## Module 23.02：Compiler & AST

Token/AST/Transform/Codegen、Scope/Binding、TypeScript/Babel/SWC/esbuild 的职责、Polyfill 与 Target。

### 综合实践：AST Codemod

实现一次 API Rename/Migration Codemod，支持 Dry Run、统计、幂等和失败样本。

## Module 23.03：Bundler 原理

Module Graph、Chunk Graph、Resolve/Load/Transform、Tree Shaking、Side Effect、Code Splitting、Asset Pipeline、Source Map。

## Module 23.04：Vite / Rolldown

Dev Server、Native ESM、Prebundle、HMR、Plugin Hook、Production Build、SSR/Library Mode、迁移和性能。

## Module 23.05：Webpack / Rspack

Loader/Plugin、Runtime/Chunk、Cache、Federation、生态、Legacy Build 和迁移边界。

## Module 23.06：Package Engineering

Entry/Exports、ESM/CJS/Types/CSS、Tree Shaking、Peer Dependency、SemVer、Provenance、Registry、Release、Consumer Migration。

### 综合实践：发布一个真实前端 Package

至少两个独立消费项目安装、Tree Shake、升级，并模拟一次 Breaking Change。

## Module 23.07：Monorepo

Workspace、Hoist/Strict Dependency、Task Graph、Turborepo/Nx、Affected、Remote Cache、Boundary、CODEOWNERS。

## Module 23.08：Developer Experience / Golden Path

Scaffold、Shared Config、Dev Container、Mock、One-command Start、Dependency Governance、Build/Test Time、PR Lead Time 和平台产品思维。

### 阶段综合项目：Frontend Monorepo Platform

包含 React/Vue App、Design System、SDK、CLI、共享配置和构建缓存；所有依赖方向和发布流程自动检查。

---

# Stage 24：静态分析、Unit、Component、Integration、E2E、Visual 与质量工程

## Module 24.01：Static Analysis

ESLint AST/Type-aware Rule、Import Boundary、Dead Code、Duplicate、Complexity、Custom Rule、Format、Type Check。

## Module 24.02：Unit Testing

Behavior、Boundary、Table-driven、Stub/Fake/Spy/Mock、Time/Random、Async、Coverage 和可测试设计。

## Module 24.03：Component & Integration Testing

真实 DOM、Accessible Query、User Event、Router/Store/Query/Form、Request Mock、Error/Suspense Boundary。

### 综合实践：为现有 React/Vue 关键流程补质量网

从失败用例开始补 Unit + Component + Integration，证明测试能够发现真实缺陷。

## Module 24.04：E2E with Playwright

Context/Isolation、Fixture、Locator、Auto-wait、Auth、Seed/Cleanup、Network Control、Trace/Video/Screenshot、多角色。

## Module 24.05：Visual / A11Y Regression

Screenshot Baseline、Theme/Viewport Matrix、A11Y Automation、人工验证和 Flaky 处理。

## Module 24.06：Contract / Property / Mutation / Performance Test

Schema Contract、Property-based、Mutation、Bundle/Page Performance Budget 和适用成本。

## Module 24.07：Quality Platform & Governance

PR/Main/Nightly Matrix、Risk-based Gate、Quarantine、Flaky Rate、Defect Escape、Change Failure、Owner 和豁免机制。

### 阶段综合项目：CI Quality Pipeline

让 Monorepo 建立从 Type/Lint 到 Unit/Component/E2E/Visual/A11Y/Contract/Performance/Security 的分层质量门禁。

---

# Stage 25：BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端

## Module 25.01：BFF Architecture

Router/Controller/Application/Client、API Aggregation、Session、Feature Flag、Trace、Timeout/Retry/Partial Response、职责边界。

## Module 25.02：Session、OAuth/OIDC 与 BFF Authorization

Cookie、Session Rotation、OAuth 2.0/OIDC + PKCE、RBAC/ABAC、CSRF、前端显示 vs 服务端授权。

### 综合实践：带登录与聚合的 BFF

建立 Session、权限、聚合、Trace ID、下游超时/降级，为全栈框架提供真实后端边界。

## Module 25.03：Next.js

App Router、Layout/Page/Error/Loading、Server/Client Component、RSC、Action、Cache/Revalidation、Streaming、Metadata、Runtime、Instrumentation 和安全升级。

## Module 25.04：Nuxt

Pages/Layouts/Middleware/Plugins、useFetch/useAsyncData、Nitro、Route Rule、SSR/Prerender/SWR/ISR、Pinia SSR、Module/Layer。

## Module 25.05：Rendering Strategy

CSR/SSR/SSG/ISR/Streaming/Partial/Edge，按路由选择，SEO、Cache、Freshness、Personalization 和成本 Trade-off。

## Module 25.06：Edge / CDN / Serverless

DNS/CDN/WAF/Edge/SSR/BFF/Origin 拓扑、Cold Start、Runtime Limit、Multi-region、Data Residency、Cache、Vendor Lock-in。

## Module 25.07：Release Topology & Cost

Static Asset/HTML Rollback、Canary/Blue-Green/Weighted/Tenant Cohort、Function/Request/Bandwidth/Image/Log 成本。

### 阶段综合项目：Production Full-stack Web Product

使用 React/Next 或 Vue/Nuxt 主线之一完成登录、多租户上下文、SSR/Streaming、缓存、BFF、Edge/CDN、灰度和回滚；另一框架完成对照实现/架构实验。

---

# Stage 26：数据库与一致性认知、企业身份、CMS、搜索、对象存储、支付与分析集成

> 前端架构师不需要变成 DBA，但不能把数据和企业平台永远当黑盒。

## Module 26.01：SQL、关系模型、Index 与 Transaction 认知

Table/Row/Relation、SQL CRUD/Join、Index、Transaction、Isolation、Optimistic/Pessimistic Lock、Pagination Consistency 及其对前端交互的影响。

## Module 26.02：Cache、MQ、Eventual Consistency、Outbox/CDC 认知

为什么 UI 会看到旧数据、重复事件、乱序和最终一致；如何设计 Pending/Retry/Status UX。

## Module 26.03：Enterprise Identity

OIDC 之外的 SAML、SCIM、SSO、JIT Provisioning、Domain Verification、Entitlement、User Lifecycle、Audit、多组织切换。

### 综合实践：企业组织与成员管理流程

实现登录、组织、Role/Permission、成员邀请、模拟 Provisioning、审计展示和多组织切换 UI，后端辅助能力有清晰边界。

## Module 26.04：Object Storage & File Platform

Signed URL、Multipart、Lifecycle、ACL、Metadata、Preview/Thumbnail、Virus Scan、Retention 和供应商抽象。

## Module 26.05：Search

Query/Filter/Facet/Highlight/Autocomplete、Index Delay、Cursor、No-result UX、Search Analytics 和 API Boundary。

## Module 26.06：CMS、Content Model 与 SEO Platform

Headless CMS、Draft/Preview/Publish、Workflow、Canonical、Hreflang、Structured Data、Sitemap、URL Migration 和缓存。

## Module 26.07：Payment / Map / Analytics / Experiment

Tokenization/3DS/Webhook 最终状态、Map Quota/Privacy、Event Schema、Identity/Consent、Exposure、Funnel、A/B Guardrail、数据质量。

### 阶段综合项目：Enterprise SaaS Product Surface

组合组织身份、文件、搜索、内容和分析中的多项能力，所有第三方 SDK 通过 Adapter 隔离，并设计降级、SLA、费用和退出路径。

---

# Stage 27：PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程

## Module 27.01：Cross-platform Runtime Model

WebView、Native UI、JS Runtime、Bridge、Shell、Shared Domain/SDK/Token、Platform Adapter，以及什么不应该共享。

## Module 27.02：PWA 深入

Install、Manifest、Service Worker、Offline、Push、Update、Background、平台限制和应用商店边界。

## Module 27.03：Desktop

Electron Multi-process、Main/Renderer/Preload、IPC、Context Isolation、File/System、Auto Update、Signing；Tauri 等轻量方案比较。

## Module 27.04：Mobile

React Native、Hybrid/Capacitor、WebView、Navigation、Gesture、Native Module、Offline、Performance、Release。

## Module 27.05：Miniapp / Embedded Platform

运行时约束、组件映射、Package/分包、Bridge、权限、审核、平台 API、多端编译边界。

## Module 27.06：TV/OTT / Large Screen

遥控器/键盘 Focus、10-foot UI、低性能 SoC、视频、长时间运行、分辨率、内存和无鼠标交互。

### 阶段综合项目：同一业务的 Web + 一个第二终端

从 Desktop/Mobile/Miniapp/TV 中选择一个，把已有业务移植，明确共享与平台专用代码，提交性能、安全和发布 Trade-off。

---

# Stage 28：实时协作、Local-first、离线同步、OT/CRDT 与多人系统

## Module 28.01：Realtime Collaboration State

Document、Presence、Cursor、Selection、Typing、Awareness，Transient vs Persistent State。

## Module 28.02：Sync Protocol

Snapshot、Operation、Sequence、Ack、Version Vector、Reconnect、Replay、Compaction、Schema Version。

## Module 28.03：Conflict Strategy

Lock、Optimistic Concurrency、LWW、Field Merge、Operational Transformation、CRDT 的原理和适用边界。

## Module 28.04：Local-first Architecture

Local DB、Operation Log、Pending、Background Sync、Offline Queue、最终一致和用户可见同步状态。

### 综合实践：离线优先任务板

断网时继续编辑，恢复后自动同步；支持 Pending、Retry、Conflict 和历史版本。

## Module 28.05：Collaboration Scale

Room/Shard/Sticky、Fan-out、Presence Expiration、Backpressure、Large Document、旧客户端和服务器扩展认知。

## Module 28.06：Collaboration Security & Testing

Room Authorization、Message Validation、Replay、Abuse、Audit，以及断网/乱序/重复/并发编辑/时钟差故障注入。

### 阶段综合项目：多人协作工作台

实现 Presence、多人更新、断线恢复、离线编辑、冲突/合并 UI，并输出协议时序和一致性设计。

---

# Stage 29：SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化

## Module 29.01：SVG

Coordinate/ViewBox/Path/Transform/Filter/Event/A11Y、DOM Cost 和图表封装。

## Module 29.02：Canvas 2D / OffscreenCanvas

Drawing State、Pixel、Text、HiDPI、Hit Test、Worker Offscreen、Export 和性能。

## Module 29.03：WebGL / WebGPU

Render Pipeline、Buffer、Shader、Texture、Resource Lifetime、Compute、Device Lost、Fallback 和库封装边界。

### 综合实践：大数据实时图表

根据数据规模在 SVG/Canvas/GPU 中选型，加入 Worker、Progressive Rendering、Sampling、LOD，并测量 FPS/Memory。

## Module 29.04：Web Audio、Video、MSE、EME、WebCodecs

播放、Buffer、Adaptive Streaming、DRM 概念、字幕、Live Latency、Audio Graph、Decode 和资源释放。

## Module 29.05：WebAssembly

Linear Memory、Module/Instance、JS Bridge、Copy Cost、Thread/SIMD、适用图像/媒体/解析/计算场景和性能比较。

## Module 29.06：WebXR 与 Device APIs

XR Session/Input/Frame、Bluetooth/USB/Serial/HID/MIDI 等 Permission/Secure Context/Feature Detection 和安全。

### 阶段综合项目：High-performance Web Experience

选择可视化、媒体或 WASM 场景完成 Research-to-Production Spike，提交兼容矩阵、性能基线、Fallback 和采用 ADR。

---

# Stage 30：Schema-driven UI、动态表单、低代码、编辑器与插件式业务平台

## Module 30.01：Schema-driven UI

JSON Schema/UI Schema、Component Registry、Renderer、Data/Validation Schema、Conditional Rendering、Version。

## Module 30.02：Dynamic Form Engine

Field Registry、Dependency、Rule、Validation、Layout、Async Option、Permissions、Draft 和 Schema Migration。

### 综合实践：Schema 驱动表单平台

从配置生成复杂表单，支持条件字段、权限、校验、版本和预览。

## Module 30.03：Visual Editor Architecture

Canvas/Tree/Property Panel、Selection、Drag/Drop、Command、Undo/Redo、History、Clipboard、Keyboard、Preview。

## Module 30.04：Rule / Expression Engine

安全表达式、Dependency Graph、Evaluation、Sandbox、Timeout、Capability、Debug 和风险。

## Module 30.05：Plugin / Extension Model

Manifest、Extension Point、Permission、Version、Sandbox、Lifecycle、Registry、Compatibility 和 Third-party Trust。

## Module 30.06：Low-code Runtime & Governance

Schema Version、Migration、Publish、Rollback、Multi-user Edit、Audit、Tenant、Performance、Security 和产品边界。

### 阶段综合项目：Low-code Page Builder

构建最小页面/表单设计器，支持组件拖拽、属性配置、规则、预览、Undo/Redo、Schema Version 和插件扩展。

---

# Stage 31：前端性能工程、RUM、Core Web Vitals、容量模型与规模化治理

## Module 31.01：Performance Metrics & Measurement

TTFB/FCP/LCP/INP/CLS、Long Task/Long Animation Frame、业务指标、P50/P75/P95/P99、Lab vs Field、Experiment Design。

## Module 31.02：RUM

PerformanceObserver、Navigation/Resource/Event Timing、Sampling、Context、Release、Device/Network/Region 分析和数据质量。

### 综合实践：给现有企业应用建立 Performance Baseline

定义技术+业务指标、RUM 上报和 Dashboard，先有数据再优化。

## Module 31.03：Loading Performance

Critical Request Chain、DNS/TLS/TTFB、Resource Priority、Image/Font、Code Split、Third-party、Cache、Preload/Prefetch。

## Module 31.04：Runtime / Rendering / Framework Performance

JS Parse/Eval、Long Task、Scheduler/Worker、Style/Layout/Paint、React/Vue Render、Hydration、Virtualization、Memory。

## Module 31.05：Memory / Energy / Long-running App

Heap、Detached DOM、Listener/Timer/Cache、GPU/Media、Polling、Battery/Thermal、TV 长运行。

## Module 31.06：Capacity Model

Users/Concurrency/Request/Message/Data Row/DOM/Memory/CPU/Bandwidth/Third-party Quota，找到系统第一个失效点。

## Module 31.07：Performance Budget & Governance

CI Budget、RUM Regression、Owner、SLA、Bisect、Rollback、Exception、Performance Champion、成本/体验 Trade-off。

### 阶段综合项目：Performance Engineering Review

完成至少 LCP、INP、Bundle、Memory 四类优化；每项必须提交前后 Trace/Profiler/RUM 数据和回归保护。

---

# Stage 32：Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理

## Module 32.01：Browser Security Model

Origin/Site、Same-origin Policy、Sandbox、CORS、Cookie、Storage、Iframe、Cross-origin Isolation 和 Trust Boundary。

## Module 32.02：XSS / DOM Clobbering / Prototype Pollution / URL Security

HTML/Attribute/URL/JS/CSS Context、Encoding、Sanitization、Safe DOM API、Trusted Types、富文本/Markdown/第三方组件。

## Module 32.03：CSRF、Clickjacking、CORS Misconfiguration

Cookie 自动携带、SameSite/Token/Origin、frame-ancestors、Credential、Preflight 和攻击/修复实验。

### Security Lab：受控 Web 攻防

在隔离教学环境复现 XSS/CSRF/CORS/Clickjacking，然后逐项修复并用 Header/Browser Evidence 验证。

## Module 32.04：OAuth/OIDC、Session、Passkey、SAML、SCIM

认证、会话、强认证、企业 SSO、Provisioning/Deprovisioning 和恢复流程。

## Module 32.05：Authorization & Multi-tenant Security

RBAC/ABAC/ReBAC、Resource/Action/Tenant、Row-level、前端显示 vs 服务端强制、越权测试。

## Module 32.06：CSP、Trusted Types、Sandbox、COOP/COEP

从 Report-only 到 Enforce、Nonce/Hash/Strict-dynamic、Violation、Third-party Script、postMessage Protocol。

## Module 32.07：Supply Chain

Malicious Package、Typosquatting、Dependency Confusion、Lockfile、Registry、Integrity、Provenance、SBOM、Secret、Build Isolation。

## Module 32.08：Privacy Engineering

Data Minimization、Purpose、Retention、Consent、Cookie/Tracking、Export/Delete、Log/Replay Mask、Cross-border Awareness。

## Module 32.09：Threat Modeling & Security Governance

Asset/Actor/Entry/Boundary、STRIDE、Abuse Case、Risk、SAST/SCA/DAST、Owner/SLA、Incident Response。

### 阶段综合项目：Secure Multi-tenant SaaS Review

为现有全栈产品完成 Threat Model、CSP/Trusted Types、身份/权限矩阵、SBOM、隐私数据地图和高危依赖响应演练。

---

# Stage 33：可观测、SLO、故障治理、CI/CD、容器、Kubernetes、GitOps 与云交付

## Module 33.01：Frontend Observability

Error/Unhandled Rejection/Resource/Chunk/Network、Source Map、Release、User/Tenant/Route/Feature Flag、Breadcrumb、Session Replay Privacy。

## Module 33.02：Metric、Trace 与 Browser→BFF→Service 链路

Web Vital/Business Metric、Trace Context、Span、Sampling、Server Timing、Cross-origin、Cost。

### 综合实践：从一条用户投诉定位到具体发布

要求能够从 User/Time/Version/Route/Error/Request/Trace 定位问题，而不是只看截图。

## Module 33.03：SLO / Error Budget / Alert

Critical Journey、SLI/SLO、Availability/Latency/Correctness、Burn Rate、Alert、Runbook、Risk Prioritization。

## Module 33.04：Failure Engineering & Incident

Chunk 404、CDN、Downstream Timeout、Cache Poison、Wrong Config、Certificate、Network Slow、Incident Timeline、Blameless Review。

## Module 33.05：CI/CD & Reproducible Build

Install/Lint/Test/Scan/Build/Artifact/Deploy/Verify/Promote、Lock、Runtime、Provenance、Environment、Preview。

## Module 33.06：Container & Kubernetes

Multi-stage Image、Non-root、Health/Signal、Deployment/Service/Ingress/Gateway、Config/Secret、Probe、Resource、Autoscaling、Rolling。

## Module 33.07：GitOps / IaC / Policy as Code

Declarative Environment、Drift、Promotion、Approval、Policy、Secret Lifecycle、Audit 和平台权限。

## Module 33.08：Release & Disaster Recovery

Canary/Blue-Green/Cohort、RUM Guard、Auto Rollback、Roll-forward、Artifact Retention、DNS/CDN/Cert/Region Recovery。

### 阶段综合项目：Production Delivery Platform

从 PR Preview 到 Production Canary，全链路接入 Observability/SLO/Alert/Auto Rollback；运行至少三种故障演练并复盘。

---

# Stage 34：DDD、模块化、微前端、插件、多租户、前端平台、迁移、治理与技术战略

## Module 34.01：Architecture Drivers & Quality Attributes

Business Goal、User、Scale、Team Boundary、Deployment、Compliance、Performance、Security、Reliability、Cost、Changeability；架构先从约束开始。

## Module 34.02：DDD 与模块化前端

Subdomain、Bounded Context、Ubiquitous Language、DTO/Domain/ViewModel、Feature/Domain/Shared/Infrastructure、Port/Adapter、Architecture Test。

### 综合实践：把大型前端重构成模块化单体

从依赖图和业务变化出发划分边界，加入 Public API、Import Rule、Anti-corruption Layer 和 Fitness Function。

## Module 34.03：Microfrontend

采用条件、Build-time Package、Module Federation、Web Components、Iframe、Route/Server Composition、Shell、Contract、Shared Dependency、Failure/Version Governance。

## Module 34.04：Plugin Architecture

Extension Point、Manifest、Capability/Permission、Version、Lifecycle、Sandbox、Quota、Crash Containment、Marketplace/Review。

## Module 34.05：Multi-tenancy & White-label

Tenant Context、Domain、Theme、Locale、Feature/Data/Permission/Quota/Region、Config Inheritance、Brand/Legal/SEO 和测试矩阵。

## Module 34.06：Frontend Platform / Developer Portal

Golden Path、Template/CLI/Design System/Test/Observability/CI/Security、Service Catalog、Owner、Self-service、Platform API/Plugin、SLO、Adoption。

### 综合实践：Frontend Developer Platform

让两个不同前端项目通过自助方式创建/接入、构建、测试、发布、监控、回滚，记录 Adoption/Upgrade/Lead Time/Failure Rate。

## Module 34.07：Legacy Migration & Technical Debt

System Inventory、Debt Classification、Strangler/Branch by Abstraction/Dual Run、Codemod、Compatibility、Canary、Budget、Stop Condition、Value Metric。

## Module 34.08：Architecture Governance

RFC、ADR、C4/Sequence/Data Flow、Review、Fitness Function、Dependency Policy、Exception/Expiration、Technology Radar。

## Module 34.09：Staff / Principal Technical Leadership

跨团队影响、RFC Facilitation、Mentoring、Hiring Rubric、Ownership、On-call、Incident Leadership、Knowledge System、冲突处理。

## Module 34.10：Product、Business、Cost & Portfolio

Product Discovery、North Star/Funnel/Experiment、Build vs Buy、TCO、Vendor Risk、Roadmap、Opportunity Cost、Executive Communication。

### 阶段综合项目：Enterprise Frontend Architecture Review

为“多团队、多产品、多租户、历史系统并存”的企业前端提出 12～24 个月架构路线，包含平台、迁移、成本、风险、Owner、度量和退出策略。

---

# Stage 35：AI 辅助研发、AI 原生前端、Agent UX 与 Principal 级毕业项目

## Module 35.01：AI-assisted Frontend Development

模型能力边界、Context Engineering、Spec-driven Development、Coding Agent、Repo Rule、Diff Review、Test/Validation、成本和失败样本。

## Module 35.02：MCP / Tool Integration

Tool Schema、Permission、File/GitHub/Browser/DB 等工具边界、Prompt Injection、Tool Poisoning、Confused Deputy、Audit 和 Approval。

## Module 35.03：AI Native Interaction Model

Chat、Copilot、Command、Inline Suggestion、Workflow、Autonomous Agent、Human-in-the-loop，以及什么时候不应该做聊天框。

## Module 35.04：Streaming UI Protocol

Message/Token/Tool Call/Tool Result/Artifact/Citation/Usage/Error/Retry/Resume、SSE/Stream、Backpressure、状态机和断线恢复。

### 综合实践：Streaming AI Assistant

实现流式消息、停止、重试、引用、Markdown/Code 安全渲染和基础 Tool Call 展示。

## Module 35.05：Agent UX

Idle/Planning/Running Tool/Awaiting Approval/Paused/Completed/Failed/Cancelled、Progress、Permission、Approve/Reject/Edit/Undo/Checkpoint/Branch。

## Module 35.06：RAG / Multimodal / Artifact UX

Citation、Freshness/Permission/Conflict、Image/Document/Audio/Video Input、Artifact Preview/Edit/Diff、Large Context 和可访问性。

## Module 35.07：AI Security & Evaluation

Prompt/Tool Injection、Data Exfiltration、Model Output XSS、Untrusted Attachment、Structured Output Validation、Task Success/Groundedness/Tool Success/Safety/Latency/Cost Evals。

### 综合实践：Agent Workbench

基于已经学习的 React/全栈/可观测/安全能力构建带 Tool、Approval、Resume、Artifact、Citation、Evals、Audit 和成本控制的 AI Agent 工作台。

## Module 35.08：Principal Capstone Architecture

最终项目不要求“功能最多”，而要求在真实复杂约束下可解释、可运行、可验证、可迁移、可治理。

毕业项目至少要求综合：

- 一个真实业务问题和成功指标；
- React 或 Vue 主应用，以及另一框架的互操作/迁移能力；
- SSR/BFF/缓存/Edge 中的合理组合；
- 复杂权限、多租户、实时/离线/上传/搜索/协作中的至少三项；
- Design System / Package / CLI / Platform 能力中的至少两项；
- Performance、Security、A11Y、i18n、Reliability、Cost 的明确目标与证据；
- CI/CD、Preview、Canary、Feature Flag、Observability、SLO、Alert、Rollback；
- 至少 10 份 ADR、2 份完整 RFC、Threat Model、Capacity Model、Failure Model、Migration/Exit Plan；
- 至少三次故障演练；
- AI 辅助研发或 AI Native 用户能力，并有 Eval/Security/Cost。

### 最终毕业答辩

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

# 6. Stage / Module / Lesson 的后续拆分方式

这份 README 是**唯一总纲**。

后续正式建设课程时，不再回到“每个技术单独创建一份平铺大纲”的方式。

总纲先确定：

```text
Stage
→ Module
→ 在合适学习位置出现的综合实践 / Lab / 项目
```

再在正式课程目录中拆 Lesson：

```text
courses/frontend-architect/
└── stageXX-xxx/
    ├── README.md
    ├── moduleXX-xxx/
    │   ├── README.md
    │   ├── kp001-xxx/
    │   ├── kp002-xxx/
    │   ├── failure-xxx/        # 在学习顺序中需要时出现
    │   ├── source-xxx/         # 在学习顺序中需要时出现
    │   └── project-xxx/        # 在知识足够组合时自然出现
    └── project-xxx/            # Stage 综合项目需要时出现
```

目录只是为了组织文件；**学习顺序必须是一条自然路径**，不能让学生自己在 lessons/labs/projects 三套平行目录里来回猜。

---

# 7. 总纲评审标准

后续继续调整总纲时，每个 Stage / Module 必须回答：

1. 为什么它应该出现在这里？
2. 前置知识是什么？
3. 是否和前面 Module 重复教学？
4. 是否真正从使用深入到原理、故障、源码和生产边界？
5. 是否有可以运行/测量/Debug 的真实证据？
6. 学到什么位置时知识已经足够自然形成综合项目？
7. 项目是否只使用截至当前已经学过的知识？
8. 当前项目是否确实提高了理解，而不是为了“有项目”增加业务噪音？
9. 这个能力在真实前端工程/架构岗位中解决什么问题？
10. 如果不学习它，会在哪种交付、故障、性能、安全或架构场景中遇到能力断层？

总纲追求的不是阶段数量最多、技术名词最多，而是：

> **广度足够覆盖现代前端与架构师真实工作边界；深度足够从零使用一路进入原理、源码、故障、性能和架构；学习顺序自然；项目随着知识成长自然出现；每一课最终都能被学生完整复刻。**
