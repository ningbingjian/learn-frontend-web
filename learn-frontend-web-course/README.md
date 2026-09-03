# Learn Frontend Web Course

> 一套从完全零基础一路学习到资深前端工程师、Staff / Principal Frontend Engineer 与前端架构师的系统化课程。  
> 版本：v1.0  
> 基线日期：2026-09-03  
> 教学规范：[FRONTEND_TEACHING_GUIDE.md](./FRONTEND_TEACHING_GUIDE.md)

---

# 1. 课程定位

这不是 HTML、CSS、JavaScript API 大全，不是 React / Vue 快速入门，也不是前端面试八股文合集。

整套课程最终要建立下面这条完整能力链：

```text
完全零基础
  ↓
能够独立制作网页
  ↓
初级前端工程师
  ↓
中级前端工程师
  ↓
高级前端工程师
  ↓
资深前端工程师
  ↓
Staff / Principal Frontend Engineer
  ↓
前端技术专家 / 前端架构师
```

学习者最终不仅要会“调用某个 API”或“使用某个框架”，还要能够回答：

- 浏览器为什么会这样解析、调度、渲染和缓存？
- JavaScript、TypeScript、React、Vue 的核心运行机制是什么？
- 一段代码的 CPU、内存、网络、渲染和交互成本在哪里？
- 一个页面为什么慢、卡、崩溃、白屏、内存泄漏或数据错乱？
- 一个前端系统在弱网、离线、重试、并发更新和部分失败时如何保持正确？
- 如何设计可访问、可国际化、可测试、可观测、可灰度和可回滚的产品？
- 如何选择 CSR、SSR、SSG、流式渲染、Edge、BFF、PWA、跨端或微前端？
- 如何建设 Design System、Monorepo、研发平台、质量平台与组织级技术治理？
- 当业务、团队、流量、代码量和终端数量扩大 10 倍、100 倍后，系统如何演进？
- 哪些复杂度是必要的，哪些技术应该拒绝、替换或删除？

最终形成：

```text
页面实现能力
+ 编程语言能力
+ 浏览器与网络原理能力
+ 框架与源码能力
+ UI Engineering 能力
+ 工程化与质量能力
+ 全栈前端与跨端能力
+ 性能、安全与可靠性能力
+ 系统设计与架构演进能力
+ 平台建设与技术治理能力
+ AI Native 产品与工程能力
```

---

# 2. 最重要的课程原则：一个主题，一次学透

课程不采用下面这种重复路线：

```text
JavaScript 基础
→ JavaScript 高级
→ JavaScript 原理
→ JavaScript 源码

React 基础
→ React 高级
→ React 性能
→ React 源码
```

而采用唯一 Owner Module：

```text
一个知识主题
  ↓
为什么存在
  ↓
基础使用与完整能力
  ↓
高级边界与错误用法
  ↓
Debug、测试与故障复现
  ↓
底层原理与关键源码
  ↓
性能、安全、A11Y 与生产约束
  ↓
替代方案、Trade-off 与架构决策
  ↓
模块实战和验收
```

一个 Module 学完以后，后续 Stage 只负责组合应用，不再建立同名“高级篇 / 原理篇 / 源码篇”补课。

每个正式 Module 后续拆分 Lesson 时，必须遵守 [统一教学与课程编写规范](./FRONTEND_TEACHING_GUIDE.md)。

---

# 3. 深度标准：Must / Should / Expert

- **Must**：正常前端开发必须掌握。能够正确实现、解释常见现象、处理常见错误。
- **Should**：高级与资深前端必须掌握。能够处理复杂场景、边界条件、性能问题和生产故障。
- **Expert**：Staff、Principal 与前端架构师必须掌握。能够解释底层机制、阅读关键源码、完成平台设计与组织级治理。

这三个标签不是三套重复课程。一个主题由唯一 Owner Module 从 Must 一直讲到 Expert。

---

# 4. 实践体系

整套课程采用六层实践结构：

```text
每课可复现实验
   ↓
Module Project
   ↓
Stage 综合项目
   ↓
故障注入与诊断实验
   ↓
贯穿式产品持续演进
   ↓
Principal 级毕业项目与架构答辩
```

## 4.1 每课实验

每个主要知识点必须有可以运行、观察、验证和破坏的最小实验，不能只给结论。

## 4.2 Module Project

每个 Owner Module 至少有一个能证明掌握程度的实践，例如：

- CSS Cascade 模块：构造并解释多层级联冲突。
- JavaScript Runtime 模块：实现任务调度器并验证微任务顺序。
- React Reconciler 模块：实现 Mini Reconciler 并追踪 Fiber 更新链路。
- Browser Rendering 模块：制造 Layout Thrashing 并通过 Performance 面板定位。
- Security 模块：构造 XSS / CSRF 漏洞，再完成系统化修复与验证。

## 4.3 Stage 综合项目

每个 Stage 都有独立完整项目，将本阶段多个模块组合起来。

## 4.4 故障实验

必须主动制造并诊断：白屏、Chunk 加载失败、请求竞态、Hydration Mismatch、内存泄漏、长任务、样式污染、缓存错误、权限绕过、弱网重试风暴等问题。

## 4.5 贯穿式项目

暂定贯穿项目名称：`Architect Workbench`。

它不是一次性写完，而是持续演进：

```text
静态内容站点
→ 原生 JavaScript 应用
→ TypeScript 模块化应用
→ React 企业控制台
→ Vue 版本与渐进迁移实验
→ Design System 与组件平台
→ Monorepo 与研发工具链
→ BFF、SSR、Streaming 与 Edge
→ PWA、Desktop、Mobile、TV/OTT
→ 实时协作与 Local-first
→ Schema-driven / Low-code / Plugin Platform
→ 多租户、微前端与组织级治理
→ 可观测、安全、高性能的全球化系统
→ AI Native 工作台
```

## 4.6 毕业项目

最终完成一个可部署、可压测、可观测、可恢复、可演进的生产级系统，并进行正式架构答辩。

---

# 5. 知识归属与去重边界

为避免课程反复讲同一主题，以下领域设置唯一主教学边界：

| 主题 | 基础铺垫 | 唯一完整 Owner | 后续 Stage 的职责 |
|---|---|---|---|
| HTTP 与 Web | Stage 02 | Stage 10 负责高级传输、API、实时与韧性 | 框架中只做集成 |
| JavaScript | Stage 05 | Stage 05 语言、Stage 06 Runtime/Engine 各自闭环 | 框架中只应用 |
| DOM 与 Browser | Stage 07 | Stage 09 负责浏览器内核与 Web Platform | 性能阶段只诊断优化 |
| TypeScript | Stage 08 | Stage 08 | React/Vue 中只讲框架特有类型 |
| A11Y | Stage 03/04 建立语义和视觉基础 | Stage 14 完整拥有 UI A11Y 工程 | 框架中验证集成 |
| 状态与数据一致性 | Stage 06/10 建立通用模型 | React/Vue 拥有框架实现，Stage 27 拥有系统级架构 | 不重复讲基础概念 |
| 测试 | 各 Stage 有局部验证 | Stage 17 完整拥有质量工程 | 后续只建设专项测试 |
| 性能 | 各 Stage 解释局部成本 | Stage 24 完整拥有性能工程与治理 | 后续只应用预算和门禁 |
| 安全 | 早期课程遵守基本安全约束 | Stage 25 完整拥有 Web 安全体系 | 后续只做领域威胁建模 |
| 可观测与交付 | 各项目保留基本日志 | Stage 26 完整拥有生产运行体系 | 架构阶段只做组织治理 |
| AI | Stage 00 只介绍辅助学习边界 | Stage 29 完整拥有 AI Native Frontend | 毕业项目综合应用 |

---

# 6. 总体学习路线

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
Stage 11  React 完整体系
Stage 12  Vue 完整体系
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

从完全没有开发经验，达到能够独立创建、运行、调试、版本管理和交付最小 Web 项目。

## 模块清单

- **00.01 程序与 Web 开发基本概念**：程序、源代码、文件、目录、进程、端口、客户端、服务端、浏览器、依赖、构建产物，以及代码从文件到页面的全过程。
- **00.02 开发环境与多版本工具链**：操作系统差异、Node.js、包管理器、版本管理器、环境变量、PATH、编辑器与终端之间的关系。
- **00.03 VS Code / IDE 与调试器**：工作区、插件边界、断点、调用栈、变量观察、条件断点、源码映射和浏览器联调。
- **00.04 Terminal、Shell 与自动化脚本**：文件操作、管道、重定向、环境变量、进程、文本处理、curl、脚本和日常排障命令。
- **00.05 Git 与 GitHub 完整工作流**：commit、branch、merge、rebase、cherry-pick、reset、revert、tag、PR、Code Review、冲突处理与 Git 对象模型。
- **00.06 Markdown、技术文档与图示表达**：README、变更记录、问题复现、Mermaid、流程图、时序图、架构图和可执行文档。
- **00.07 问题拆解、Debug 与验证习惯**：最小复现、假设、证据、二分定位、日志、断点、对照实验和根因分析。
- **00.08 AI 辅助开发的正确边界**：上下文提供、代码验证、幻觉识别、隐私与密钥保护、生成代码审查，以及不能把“不理解”外包给 AI。

## 阶段综合项目

**Frontend Developer Bootstrap**：完全从命令行创建静态 Web 项目，使用 Git 完成 Feature Branch、PR、冲突解决、Rebase、Tag 和版本发布全过程，并编写可复现 README。

## 阶段验收标准

- 不依赖 IDE 向导也能创建和运行项目。
- 能解释源码、依赖、进程、端口、构建产物的区别。
- 能独立处理常见 Git 分支与冲突问题。
- 能用断点和最小复现定位简单 Bug。

## 贯穿项目演进

创建 `Architect Workbench` 仓库骨架、文档模板和最小静态页面。

---

# Stage 01：计算机组成、操作系统、Linux 与网络底层基础

## 阶段目标

建立高级前端所需的计算机底层基础，使后续浏览器、Node.js、网络、性能和容器课程不再停留在术语层面。

## 模块清单

- **01.01 CPU、指令与内存层级**：寄存器、指令、时钟、流水线、分支预测、L1/L2/L3 Cache、Cache Line、内存与磁盘的成本差异。
- **01.02 Process、Thread 与调度**：进程、线程、用户态、内核态、系统调用、上下文切换、CPU 利用率、Load Average 与前后端运行时的关系。
- **01.03 虚拟内存与文件系统**：Page、Page Fault、Swap、mmap、File Descriptor、inode、Page Cache、fsync 及其对 Node.js 和浏览器的影响。
- **01.04 Linux 生产实践**：权限、用户、进程、信号、systemd、ulimit、/proc，以及 top、vmstat、iostat、pidstat、ss、lsof、strace、perf。
- **01.05 网络分层与数据传输**：Ethernet、MAC、ARP、IP、CIDR、Subnet、Gateway、Routing、NAT、ICMP、UDP。
- **01.06 TCP 完整机制**：握手、挥手、Sequence/ACK、滑动窗口、流控、拥塞控制、重传、RTT/RTO、KeepAlive、TIME_WAIT、CLOSE_WAIT。
- **01.07 Proxy、Load Balancer 与 CDN 基础**：正向代理、反向代理、四层/七层负载均衡、边缘节点、源站与故障域。
- **01.08 抓包与网络诊断**：ping、traceroute、dig、curl、openssl、ss、tcpdump、Wireshark，建立从现象到链路证据的诊断方法。
- **01.09 Container 与资源隔离基础**：namespace、cgroup、镜像、容器网络和资源限制，为后续云交付建立模型。

## 阶段综合项目

**OS & Network Lab**：部署一个最小 HTTP 服务，使用抓包分析连接生命周期；主动制造 CPU、内存、文件描述符和网络故障并完成诊断报告。

## 阶段验收标准

- 能从 CPU、内存、进程、文件和网络五个角度解释 Web 应用运行环境。
- 能阅读基础 TCP 抓包并解释连接状态。
- 能区分浏览器问题、操作系统问题和网络问题。
- 能使用 Linux 工具完成基础生产排障。

## 贯穿项目演进

让项目在 Linux 环境运行，增加启动脚本、端口检测和基础资源观察说明。

---

# Stage 02：Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型

## 阶段目标

从地址栏输入 URL 开始，完整理解一次 Web 访问如何经过解析、连接、安全握手、请求响应、缓存和浏览器导航。

## 模块清单

- **02.01 Internet、Web、Client 与 Server**：互联网和 Web 的区别，客户端/服务端、资源、超链接、请求响应与分布式系统基本模型。
- **02.02 URL、URI、Origin 与 Site**：scheme、host、port、path、query、fragment、编码、相对地址、Origin/Site 边界和 URL 解析陷阱。
- **02.03 DNS 完整解析链路**：递归/迭代查询、记录类型、缓存、TTL、权威服务器、Split DNS、污染与排障。
- **02.04 TCP、TLS 与 HTTPS**：连接建立、证书链、CA、SNI、ALPN、密钥协商、会话恢复、混合内容和常见证书故障。
- **02.05 HTTP/1.1 报文与语义**：请求行、状态行、Header、Body、持久连接、方法语义、状态码、内容长度与分块传输。
- **02.06 Content、MIME 与协商**：Content-Type、Accept、Charset、Language、Encoding、压缩、下载、嗅探和错误 MIME 的后果。
- **02.07 Cookie、Session 与基本身份状态**：Cookie 属性、会话标识、SameSite、安全标志、生命周期和浏览器发送规则。
- **02.08 HTTP Cache 基础**：Cache-Control、Expires、ETag、Last-Modified、强缓存、协商缓存、Vary 与缓存错误。
- **02.09 Same-Origin、CORS 与 Preflight**：简单请求、预检、凭据、响应头、浏览器拦截与“服务端其实已经收到请求”的区别。
- **02.10 浏览器导航与 DevTools 网络诊断**：重定向、下载、主文档、子资源、优先级、Waterfall、Timing、curl 对照和故障复现。

## 阶段综合项目

**From URL to Page Lab**：搭建 HTTP/HTTPS 站点，配置域名、证书、Cookie、缓存和 CORS；对完整导航过程抓包并输出时序图。

## 阶段验收标准

- 能逐步解释输入 URL 到页面出现的完整过程。
- 能读懂 HTTP 报文、缓存头和浏览器 Network Timing。
- 能定位 DNS、TLS、CORS、Cookie 和缓存问题。
- 能区分协议语义、浏览器安全策略和服务端业务错误。

## 贯穿项目演进

为 `Architect Workbench` 配置本地域名、HTTPS、基础缓存和 API Mock 服务。

---

# Stage 03：HTML、语义、表单、媒体、SEO 与可访问性

## 阶段目标

一次完整掌握 HTML 文档模型，让页面在没有 CSS 和 JavaScript 时仍然结构正确、可访问、可提交、可索引。

## 模块清单

- **03.01 HTML 文档、Tokenizer 与 Tree Construction**：DOCTYPE、元素、属性、字符引用、错误恢复、DOM 构建和浏览器容错为什么不能成为乱写的理由。
- **03.02 语义结构与内容模型**：header、nav、main、article、section、aside、footer、heading hierarchy 和正确元素选择。
- **03.03 文本、链接、列表、引用、代码与表格**：信息结构、链接语义、表格表头关联、复杂数据表边界和可访问输出。
- **03.04 Form 完整体系**：input 类型、label、fieldset、autocomplete、constraint validation、FormData、提交编码和错误反馈。
- **03.05 Image 与响应式媒体**：img、picture、srcset、sizes、loading、decoding、尺寸声明、格式选型和替代文本。
- **03.06 Audio、Video、Track 与媒体可访问性**：媒体资源、字幕、描述、控制、自动播放限制和加载策略。
- **03.07 iframe、embed 与嵌入边界**：sandbox、allow、referrer policy、第三方内容、隔离、通信和安全风险。
- **03.08 Head、Metadata、SEO 与社交分享**：title、description、canonical、robots、structured data、Open Graph、站点图与爬虫可见性。
- **03.09 HTML A11Y 基础**：Accessibility Tree、Name/Role/Value、键盘顺序、原生语义优先、ARIA 使用边界。
- **03.10 多语言文档与渐进增强**：lang、dir、双向文本、字符编码、无脚本场景、兼容降级和内容优先。

## 阶段综合项目

**Accessible Content Portal**：实现一个语义完整的内容网站和多步骤表单，在无 CSS、无 JavaScript、键盘和屏幕阅读器场景下完成验证。

## 阶段验收标准

- 能根据语义而不是视觉效果选择 HTML 元素。
- 能独立实现可提交、可验证、可访问的复杂表单。
- 能解释 DOM 与 Accessibility Tree 的关系。
- 能处理 SEO、媒体、嵌入和渐进增强边界。

## 贯穿项目演进

重构页面语义，加入登录、搜索和资料编辑表单，并建立 HTML/A11Y 基线。

---

# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

## 阶段目标

从零开始一次学透 CSS 语言、布局算法和大型样式系统，不把“能调出效果”误认为掌握 CSS。

## 模块清单

- **04.01 Cascade、Origin、Specificity、Inheritance 与 Layer**：声明冲突、级联来源、优先级、层、重要性、继承和计算值全过程。
- **04.02 Selector 与关系匹配**：基础/属性/组合/伪类/伪元素、结构选择、:is、:where、:has、选择器成本和可维护性。
- **04.03 Box Model 与 Sizing**：content/padding/border/margin、box-sizing、内在尺寸、min/max-content、fit-content、替换元素和溢出。
- **04.04 Normal Flow、Formatting Context 与 Positioning**：块/行内格式化、margin collapsing、containing block、float、position、stacking context 和 z-index。
- **04.05 Flexbox 完整布局算法**：主轴/交叉轴、flex basis、伸缩、收缩、换行、对齐、min-size 陷阱和真实布局计算。
- **04.06 Grid、Subgrid 与二维布局**：轨道、网格线、自动放置、minmax、auto-fit/fill、subgrid 和复杂响应式结构。
- **04.07 Responsive Design 与 Container Queries**：viewport、媒体查询、容器查询、流式排版、断点策略、组件级响应和内容驱动设计。
- **04.08 Unit、Function 与现代值系统**：px、em、rem、%、vw/vh、动态视口、clamp、calc、min/max、环境变量和逻辑属性。
- **04.09 Typography 与 Web Font**：字体栈、加载、FOIT/FOUT、可变字体、行高、字距、换行、国际文字和排版性能。
- **04.10 Color、Background、Gradient、Mask 与 Blend**：现代颜色空间、透明度、渐变、滤镜、混合、遮罩和视觉降级。
- **04.11 Transform、Transition、Animation 与 Scroll-driven UI**：合成属性、关键帧、时间函数、运动设计、滚动动画和 prefers-reduced-motion。
- **04.12 Custom Properties、Design Token 与 Theme**：变量作用域、回退、运行时主题、暗色模式、语义 Token 和设计系统映射。
- **04.13 样式架构与方案选型**：BEM、OOCSS、ITCSS、CSS Modules、CSS-in-JS、Utility CSS、Atomic CSS 的边界与 Trade-off。
- **04.14 CSS Debug、兼容、性能与治理**：DevTools、布局高亮、样式覆盖、浏览器差异、Progressive Enhancement、CSS 体积、污染和规则治理。

## 阶段综合项目

**Responsive UI System**：不依赖 UI 框架，完成响应式营销页与后台控制台；建立 Token、主题、布局、动画、打印和兼容方案，并进行 CSS 架构评审。

## 阶段验收标准

- 能解释布局结果，而不是靠反复试值碰运气。
- 能从 Cascade、Formatting Context 和 Sizing 算法定位问题。
- 能建立响应式、主题化、可访问的样式系统。
- 能比较不同 CSS 架构方案并控制长期复杂度。

## 贯穿项目演进

建立完整视觉层、Design Token、亮暗主题和响应式布局，形成第一版 UI 基线。

---

# Stage 05：JavaScript 语言、对象体系、集合、模块、元编程与设计抽象

## 阶段目标

一次完整掌握 JavaScript 语言本身，在进入框架前建立正确的值、对象、函数、模块和抽象模型。

## 模块清单

- **05.01 词法、语法、值与类型系统**：源码到执行、Primitive、Object、typeof、缺失值、BigInt、Symbol 和动态类型边界。
- **05.02 Coercion、Equality 与表达式语义**：ToPrimitive、ToNumber、Truthy/Falsy、==/===、运算符优先级、短路和常见隐式转换事故。
- **05.03 Control Flow、Function 与参数模型**：声明/表达式/箭头函数、默认值、Rest/Spread、调用、返回、递归和尾部思维。
- **05.04 Scope、Closure、Execution Context 与 this**：词法作用域、环境记录、闭包生命周期、调用方式、bind/call/apply 和 this 丢失。
- **05.05 Object、Prototype 与 Class**：属性查找、原型链、构造、继承、class 语法、私有字段、组合优先和对象模型设计。
- **05.06 Property Descriptor 与对象完整性**：writable、enumerable、configurable、getter/setter、freeze/seal 和不可变边界。
- **05.07 Array、TypedArray 与集合操作**：稀疏数组、变更/非变更方法、排序、拷贝、引用语义、二进制数据和性能边界。
- **05.08 Iterator、Generator、Map、Set 与 Weak Collection**：迭代协议、惰性序列、键语义、弱引用集合和适用场景。
- **05.09 Date、Temporal 思维、Intl 与 RegExp**：时区、日期陷阱、国际化格式化、文本匹配、回溯风险和输入验证边界。
- **05.10 Error 与异常设计**：Error 类型、throw、cause、错误分类、Result 思维、边界转换和可诊断错误信息。
- **05.11 ES Module 与模块边界**：import/export、live binding、循环依赖、动态导入、模块求值、CJS 差异和 API 设计。
- **05.12 Functional Programming 与数据变换**：纯函数、不可变、组合、高阶函数、柯里化、Functor 思维及不过度函数式化。
- **05.13 OOP、SOLID、Pattern 与业务抽象**：封装、职责、组合、策略、观察者、命令、适配器，以及 JavaScript 中的适用边界。
- **05.14 Symbol、Proxy、Reflect 与元编程**：语言钩子、拦截、反射、装饰思想、响应式基础和元编程的性能/可维护性成本。

## 阶段综合项目

**JavaScript Core Library**：实现模块化任务管理与通用工具库，包含不可变数据、插件机制、事件系统、序列化、错误体系和完整单元实验。

## 阶段验收标准

- 能精确解释类型转换、作用域、闭包、this 和原型链。
- 能设计稳定模块 API，而不是堆叠工具函数。
- 能选择对象式、函数式或组合式设计并说明取舍。
- 能识别元编程、隐式转换和共享可变状态带来的风险。

## 贯穿项目演进

使用原生 JavaScript 增加交互、数据模型、模块边界和错误处理。

---

# Stage 06：JavaScript Async、Runtime、Event Loop、Memory、Engine 与算法

## 阶段目标

理解 JavaScript 为什么能够异步运行、如何调度、如何分配回收内存，以及引擎何时优化或退化代码。

## 模块清单

- **06.01 Call Stack、Execution Context 与 Runtime Host**：调用栈、宿主环境、Web API、Job、Task 和语言规范与浏览器实现的边界。
- **06.02 Event Loop、Task 与 Microtask**：事件循环阶段、微任务检查点、渲染机会、饥饿、顺序推理和浏览器/Node 差异。
- **06.03 Promise 完整模型**：状态、Resolution Procedure、链式传播、组合、异常、Unhandled Rejection 和手写 Mini Promise。
- **06.04 async/await 与异步控制流**：语法转换、并行/串行、错误传播、资源清理、循环陷阱和结构化并发思想。
- **06.05 Cancellation、Timeout、Retry 与 Concurrency Control**：AbortSignal、超时、退避、抖动、限流、队列、去重和竞态控制。
- **06.06 Event、Observable 与 Reactive Stream**：Push/Pull、事件总线、Observable、背压思想、生命周期和泄漏风险。
- **06.07 Stream、Async Iterator 与增量处理**：Readable/Writable/Transform、流式解析、背压、管道和大文件/长响应处理。
- **06.08 Worker、Shared Memory 与 Atomics**：Web Worker、SharedArrayBuffer、消息传递、锁思想、数据复制和并行计算边界。
- **06.09 Heap、Reachability、GC 与 Memory Leak**：根、闭包、DOM 引用、WeakRef 思想、快照、分配时间线和泄漏定位。
- **06.10 JavaScript Engine Pipeline**：Parser、AST、Bytecode、Interpreter、Baseline/Optimizing Compiler、Inline Cache 和机器码。
- **06.11 Hidden Class、Optimization 与 Deoptimization**：对象形状、内联、逃逸、热代码、去优化、微基准陷阱和性能证据。
- **06.12 数据结构、算法与复杂度**：Array、List、Stack、Queue、Heap、Hash、Tree、Graph、排序、查找、动态规划及前端应用。

## 阶段综合项目

**Async Task Engine**：实现带优先级、并发限制、取消、超时、重试、流式进度和 Worker 计算的任务引擎；制造饥饿与泄漏并完成诊断。

## 阶段验收标准

- 能精确推导 Task/Microtask/Render 的执行顺序。
- 能设计可取消、可超时、可重试但不会形成请求风暴的异步流程。
- 能使用 Memory/Performance 工具定位泄漏和长任务。
- 能区分算法问题、Runtime 调度问题和 Engine 优化问题。

## 贯穿项目演进

加入异步任务中心、请求调度、取消/重试和 Worker 计算能力。

---

# Stage 07：DOM、Event、Form、History 与原生浏览器应用

## 阶段目标

不用框架构建完整浏览器应用，理解框架最终操作的真实平台对象与事件模型。

## 模块清单

- **07.01 DOM Tree、Node 与 Document**：节点类型、创建、插入、移动、克隆、DocumentFragment、Template 和 DOM API 成本。
- **07.02 Query、Traversal 与 Mutation**：选择、遍历、属性/Property 差异、批量更新、Live Collection 和 Mutation 边界。
- **07.03 Event Dispatch 完整模型**：捕获、目标、冒泡、composed path、委托、停止传播、被动监听和监听器生命周期。
- **07.04 Pointer、Mouse、Touch、Keyboard 与 Input**：统一输入模型、快捷键、组合输入、IME、手势、焦点和跨设备交互。
- **07.05 Form、Constraint Validation 与 FormData**：原生表单状态、校验、文件、多值字段、提交、渐进增强和异步提交。
- **07.06 Observer API**：MutationObserver、IntersectionObserver、ResizeObserver、PerformanceObserver 的调度与应用边界。
- **07.07 Location、History 与 Navigation**：URL 状态、pushState、popstate、路由匹配、滚动恢复、导航阻塞和深链接。
- **07.08 Fetch、Abort 与原生数据访问**：请求、响应、Header、流、错误分类、取消、上传下载和与 HTTP 语义对应。
- **07.09 Storage 与客户端持久化基础**：Cookie、localStorage、sessionStorage、IndexedDB 基本使用、容量与同步阻塞差异。
- **07.10 原生渲染、状态与更新循环**：字符串模板、DOM Patch、事件委托、状态归一化和最小渲染器。
- **07.11 Web Component 基础使用**：Custom Element、Shadow DOM、Template/Slot 的平台能力；完整工程归属 Stage 13。
- **07.12 原生 SPA 架构与故障诊断**：模块、路由、状态、数据、视图、错误边界、性能与可测试性。

## 阶段综合项目

**Vanilla SPA & Mini Renderer**：不使用框架实现路由、状态、表单、异步数据、错误页面和 DOM Patch，并完成事件与性能实验。

## 阶段验收标准

- 能解释 DOM、Attribute、Property、Event 与默认行为。
- 能独立实现原生路由、状态和渲染循环。
- 能避免事件、DOM 引用和同步 Storage 引发的常见问题。
- 能说明现代框架解决了原生应用的哪些复杂度。

## 贯穿项目演进

升级为原生 SPA，加入客户端路由、状态、数据请求和离线草稿。

---

# Stage 08：TypeScript 从基础到高级类型、Schema、SDK 与类型架构

## 阶段目标

从类型标注一路学习到大型代码库类型边界、运行时校验、契约生成和公共 SDK 设计。

## 模块清单

- **08.01 TypeScript 编译模型与类型推断**：类型擦除、静态检查、上下文类型、 widening/narrowing、编辑器语言服务和运行时边界。
- **08.02 基础类型、Object、Array、Tuple 与 Literal**：精确建模、只读、可选、索引签名和避免 any 扩散。
- **08.03 Function、Overload 与 Generic**：参数/返回、约束、默认泛型、推断位置、方差基础和可复用 API。
- **08.04 Union、Intersection 与 Control-flow Narrowing**：判别联合、穷尽检查、never、类型谓词和业务状态建模。
- **08.05 Interface、Class 与 Structural Typing**：结构类型、implements、抽象类、私有成员、品牌类型和名义化需求。
- **08.06 keyof、typeof、Indexed Access 与 Mapped Type**：从对象和常量派生类型，避免重复声明和保持同步。
- **08.07 Conditional、infer、Template Literal 与 Recursive Type**：高级类型计算、分发、递归、字符串 DSL 和复杂度控制。
- **08.08 Module、Declaration 与第三方类型**：模块解析、.d.ts、ambient declaration、类型发布、augmentation 和 DefinitelyTyped 认知。
- **08.09 tsconfig 与 Compiler Pipeline**：strict 系列、target、module、lib、paths、incremental、project reference 和构建边界。
- **08.10 Runtime Schema 与 Validation**：类型系统无法验证外部数据的原因，Schema、解析、错误报告、类型推导和边界防腐。
- **08.11 API Contract、OpenAPI、GraphQL 与代码生成**：契约优先、客户端生成、版本兼容、错误模型和生成代码治理。
- **08.12 Library、SDK 与公共类型设计**：稳定 API、泛型入口、配置类型、事件类型、插件扩展、向后兼容和类型测试。
- **08.13 JavaScript 到 TypeScript 渐进迁移**：allowJs、checkJs、边界封装、Any Budget、声明补齐、Codemod 和风险分批。
- **08.14 大型类型架构与性能治理**：Domain Type、DTO、ViewModel、Opaque Type、类型依赖方向、编译速度和类型体操边界。

## 阶段综合项目

**Typed API SDK**：为一个不可信 API 建立 Runtime Schema、错误体系、类型安全 SDK、生成流程和兼容测试，并将原生 SPA 渐进迁移到 strict TypeScript。

## 阶段验收标准

- 能区分编译期类型安全和运行时数据安全。
- 能设计判别联合与稳定公共类型 API。
- 能使用高级类型但控制可读性和编译成本。
- 能制定大型 JavaScript 项目的 TypeScript 迁移路线。

## 贯穿项目演进

全量迁移到 strict TypeScript，建立 Domain、DTO、Schema 与 SDK 分层。

---

# Stage 09：浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform

## 阶段目标

真正理解现代浏览器如何导航、隔离、调度、渲染和持久化，并能够使用 DevTools 验证推断。

## 模块清单

- **09.01 浏览器多进程架构与 Sandbox**：Browser、Renderer、GPU、Network、Utility Process，Site Isolation、IPC 与崩溃边界。
- **09.02 Navigation、Document Lifecycle 与 BFCache**：导航提交、DOMContentLoaded/load、Visibility、freeze、pagehide、恢复和缓存资格。
- **09.03 HTML Parser、CSSOM 与 Render Tree**：流式解析、预加载扫描、脚本阻塞、样式阻塞、DOM/CSSOM 合并和关键路径。
- **09.04 Style、Layout、Paint、Raster 与 Composite**：渲染流水线、Layout Tree、Paint Record、Layer、Tile、GPU 合成和无效化。
- **09.05 Frame、Rendering Opportunity 与 Scheduling**：vsync、rAF、input、task、microtask、idle、长任务和交互延迟。
- **09.06 Storage Platform 完整体系**：Cookie、Web Storage、IndexedDB、Cache Storage、OPFS、Quota、Eviction、Partitioning 和迁移。
- **09.07 Worker 与多上下文通信**：Dedicated/Shared/Service Worker、MessageChannel、BroadcastChannel、结构化克隆和 Transferable。
- **09.08 Browser Security Model**：SOP、Site、Origin、Sandbox、Permission、CSP 基础、跨源隔离与敏感能力授权。
- **09.09 Browser Cache、Preload 与 Resource Priority**：内存/磁盘缓存、preload/prefetch、优先级提示、连接预热和误用成本。
- **09.10 Input、Scrolling 与 Compositor Thread**：命中测试、滚动、被动监听、主线程阻塞、触摸响应和视觉稳定性。
- **09.11 DevTools Protocol、Automation 与源码定位**：Performance、Memory、Rendering、Network、Coverage、Protocol 和浏览器自动化基础。
- **09.12 Compatibility 与 Web Platform Evolution**：特性检测、Baseline 思维、Polyfill、Progressive Enhancement、浏览器 Bug 和能力降级。

## 阶段综合项目

**Browser Internals Lab**：系统制造解析阻塞、强制同步布局、合成层爆炸、主线程长任务、BFCache 失效和 Storage 配额问题，并提交证据报告。

## 阶段验收标准

- 能从导航到像素解释浏览器完整流水线。
- 能区分 Style、Layout、Paint、Composite 的触发与成本。
- 能选择正确 Storage/Worker，并处理生命周期和配额。
- 能通过 DevTools 证据定位而不是凭感觉优化。

## 贯穿项目演进

建立生命周期、持久化、Worker 和资源优先级策略，加入浏览器能力检测。

---

# Stage 10：HTTP/2/3、缓存、API、实时通信、流式、数据一致性与离线韧性

## 阶段目标

从“会发请求”升级为能够设计可靠的数据访问层和弱网、离线、并发更新下的正确交互系统。

## 模块清单

- **10.01 HTTP/2**：Binary Framing、Stream、Multiplexing、Flow Control、HPACK、Priority、连接合并与队头阻塞边界。
- **10.02 HTTP/3 与 QUIC**：UDP 上的可靠传输、Stream 独立、连接迁移、0-RTT、QPACK 和部署诊断。
- **10.03 企业缓存架构**：Browser、Service Worker、CDN、Reverse Proxy、API Cache，多层失效、Surrogate Key、stale 策略和一致性。
- **10.04 REST API 设计与演进**：Resource、Method、Status、Pagination、Filter、Version、Idempotency、Error Contract 和兼容性。
- **10.05 GraphQL**：Schema、Query/Mutation/Subscription、Cache Normalization、N+1、Persisted Query、权限和复杂度限制。
- **10.06 RPC、gRPC-Web 与类型安全调用**：IDL、序列化、浏览器限制、Gateway、Streaming 边界和与 REST/GraphQL 的取舍。
- **10.07 WebSocket、SSE 与长连接**：握手、心跳、重连、顺序、重复、背压、扩容和实时协议选型。
- **10.08 Fetch Stream 与流式 UI**：ReadableStream、增量解码、NDJSON、分块结果、取消、进度和错误恢复。
- **10.09 Upload、Download 与大文件传输**：Multipart、分片、断点续传、校验、并发、对象存储直传和安全边界。
- **10.10 Client Cache 与 Server State**：缓存键、去重、失效、预取、乐观更新、回滚、后台刷新和分页/无限列表。
- **10.11 Retry、Backoff、Rate Limit 与 Circuit Thinking**：幂等、Retry Budget、抖动、限流响应、熔断思想和重试风暴治理。
- **10.12 Offline Queue、Sync 与 Conflict**：离线写入、重放、版本、冲突、合并、用户反馈和最终一致性边界。
- **10.13 API 可观测、安全与混沌测试**：Correlation ID、Timing、错误分类、Mock、弱网、丢包、乱序、超时和降级验证。

## 阶段综合项目

**Resilient Data Client**：实现统一数据客户端，支持 REST/GraphQL、缓存、取消、重试、限流、流式结果、上传、实时连接、乐观更新和离线队列。

## 阶段验收标准

- 能根据语义选择 REST、GraphQL、RPC、SSE 或 WebSocket。
- 能设计不会因重试、缓存和乐观更新造成数据错误的客户端。
- 能处理弱网、离线、重复、乱序和部分失败。
- 能用协议与时间线证据定位数据访问问题。

## 贯穿项目演进

建立统一 SDK、Server State、实时通知、文件传输和离线队列。

---

# Stage 11：React 完整体系

## 阶段目标

React 只学这一次：从组件入门一路学习到并发渲染、服务端边界、Fiber、源码、性能、大型架构和迁移治理。

## 模块清单

- **11.01 React 的问题模型与声明式 UI**：从手工 DOM 同步问题进入组件、状态、渲染和单向数据流。
- **11.02 JSX、Element、Component 与 Render Output**：JSX 转换、元素对象、组件调用、纯渲染和渲染结果模型。
- **11.03 Props、Children、Composition 与 API Design**：数据传递、插槽式组合、受控/非受控、Compound Component 和公共 API。
- **11.04 State、Update Queue、Batching 与快照**：状态声明、函数更新、批处理、不可变更新、状态保留和重置规则。
- **11.05 Event、Form 与用户输入**：合成事件、受控表单、非受控表单、校验、提交、焦点与高频输入。
- **11.06 List、Key 与 Identity**：Reconciliation 身份、移动/插入/删除、错误 key 导致的状态错位和稳定标识。
- **11.07 Effect 与外部系统同步**：依赖、Cleanup、竞态、取消、Strict Mode、Layout Effect，以及什么时候不需要 Effect。
- **11.08 Ref、Imperative Handle 与 DOM Escape Hatch**：DOM 引用、可变容器、测量、焦点、第三方库集成和命令式边界。
- **11.09 Reducer、Context 与状态组合**：复杂更新、上下文传播、分层 Provider、状态/Dispatch 拆分和渲染影响。
- **11.10 Custom Hook 与逻辑复用**：Hook 规则、资源生命周期、参数稳定性、组合、测试和抽象泄漏。
- **11.11 State Architecture 与状态机**：Local/UI/Server/URL/Form State 分类，Reducer、Store、Actor/State Machine 的选型。
- **11.12 Router 与 Navigation Architecture**：嵌套路由、Loader/Action 思想、权限、错误边界、滚动、深链接和数据路由。
- **11.13 Server State 与数据访问**：缓存、去重、失效、乐观更新、Suspense 集成、错误恢复和数据层边界。
- **11.14 Suspense、Lazy、Error Boundary 与异步 UI**：资源等待、加载协调、代码分割、错误隔离、Reveal 策略和用户体验。
- **11.15 Concurrent Rendering、Transition 与 Deferred Value**：可中断渲染、优先级、过渡、陈旧内容和响应性设计。
- **11.16 React Form Architecture 与 Server Mutation**：复杂表单、Schema、异步校验、Action/Mutation 边界、幂等和渐进增强。
- **11.17 Styling、Asset 与 Design System Integration**：样式隔离、Token、主题、CSS 方案、组件库和服务端渲染兼容。
- **11.18 React A11Y 与国际化**：语义、焦点、Portal、动态内容、键盘、翻译边界和方向性。
- **11.19 React Testing**：组件行为、Hook、路由、数据、异步、错误、可访问性和不过度依赖实现细节。
- **11.20 React Performance Engineering**：Profiler、Render 原因、memo/useMemo/useCallback、Context、列表、代码分割和反优化。
- **11.21 SSR、Streaming、Hydration 与 Server Boundary**：服务端输出、选择性 Hydration、Mismatch、流式边界、客户端/服务端组件思想。
- **11.22 Fiber、Reconciler 与 Scheduler**：Fiber Node、双缓冲树、Render/Commit、Lane、工作循环、中断、恢复和优先级。
- **11.23 Hook、Effect 与 DOM Renderer 源码**：Dispatcher、Hook Linked List、Update Queue、Effect List、事件系统和 Host Config。
- **11.24 React Library 与 Headless Component 设计**：公共组件、Hook、Provider、插件、类型、Tree-shaking、版本兼容和发布。
- **11.25 大型 React 应用架构、迁移与治理**：Feature Boundary、依赖方向、遗留 Class、状态库迁移、微前端接入和技术债控制。
- **11.26 React 生产诊断与 Stage Project**：白屏、Chunk Error、Hydration、重复请求、渲染风暴、内存泄漏、灰度和回滚。

## 阶段综合项目

**React Enterprise Console**：实现多角色企业控制台，包含路由、复杂表单、Server State、实时数据、Design System、SSR/Streaming 实验、测试、性能预算和生产诊断。

## 阶段验收标准

- 能从 React 状态快照与 Reconciliation 解释页面行为。
- 能正确处理 Effect、异步竞态、状态边界和复杂表单。
- 能追踪 Fiber、Hook、Scheduler 和 DOM Renderer 关键源码链路。
- 能设计、压测、诊断和演进大型 React 应用。

## 贯穿项目演进

将核心控制台迁移到 React，形成第一个生产级应用壳与业务模块体系。

---

# Stage 12：Vue 完整体系

## 阶段目标

Vue 只学这一次：从模板与响应式入门一直学习到编译器、Runtime、SSR、性能、源码、大型架构和迁移。

## 模块清单

- **12.01 Vue 的问题模型与渐进式架构**：声明式渲染、组件、响应式、渐进采用和与原生平台的关系。
- **12.02 SFC、Template、Directive 与 Render Function**：单文件组件、模板语法、指令、JSX/Render Function 和编译边界。
- **12.03 ref、reactive、computed 与响应式心智模型**：代理、依赖、解包、只读、深浅响应和身份陷阱。
- **12.04 watch、watchEffect 与副作用生命周期**：依赖跟踪、Flush 时机、Cleanup、竞态、深度监听和错误使用。
- **12.05 Component、Props、Emit、Model 与 Attribute**：数据流、事件、双向绑定边界、透传和组件 API。
- **12.06 Slot、Provide/Inject 与组件组合**：默认/具名/作用域插槽、依赖注入、上下文边界和 Headless 模式。
- **12.07 Lifecycle、Template Ref 与 DOM 集成**：挂载更新卸载、nextTick、测量、第三方库和资源清理。
- **12.08 Form、Validation 与复杂交互**：v-model、动态表单、Schema、异步校验、错误状态和可访问反馈。
- **12.09 Composable 与逻辑复用**：组合式函数、响应式参数、Effect Scope、生命周期、测试和抽象设计。
- **12.10 Router 与导航架构**：嵌套、动态、守卫、权限、数据加载、错误、滚动、缓存和深链接。
- **12.11 Pinia、Server State 与状态架构**：本地/全局/服务端/URL 状态分类、Store 组合、缓存与乐观更新。
- **12.12 Built-in Component 与异步 UI**：KeepAlive、Teleport、Suspense、Transition、异步组件和错误/加载边界。
- **12.13 Vue A11Y、国际化、样式与 Design System**：语义、焦点、Portal、主题、Scoped CSS、Token 和组件平台集成。
- **12.14 Vue Testing**：组件、Composable、Router、Store、异步、可访问性与端到端行为测试。
- **12.15 Vue Performance**：更新粒度、computed 缓存、列表、虚拟化、异步组件、Bundle、DevTools 和反优化。
- **12.16 SSR、Streaming 与 Hydration**：服务端渲染、数据预取、Hydration、Mismatch、客户端边界和 Nuxt 集成。
- **12.17 Reactivity 源码**：Proxy Handler、track/trigger、ReactiveEffect、Dep、computed、watch 和调度关系。
- **12.18 Compiler 源码**：Parse、AST、Transform、Codegen、Patch Flag、Block Tree 和编译优化。
- **12.19 Runtime Core 与 Renderer 源码**：VNode、Patch、Diff、Component Instance、Scheduler、Host Operation 和自定义 Renderer。
- **12.20 Vue Library 与插件设计**：组件库、Directive、Plugin、Composable、类型、按需加载、版本和发布。
- **12.21 大型 Vue 应用架构与模块边界**：Feature、Domain、Store、Service、权限、配置和依赖治理。
- **12.22 Vue 2 / 遗留系统迁移**：兼容构建、Options→Composition、生态替换、渐进迁移、Codemod 和风险控制。
- **12.23 多框架共存、微前端与组织治理**：React/Vue 共享 Design System、通信、路由、依赖和团队边界。
- **12.24 Vue 生产诊断与 Stage Project**：响应式失效、更新风暴、Hydration、缓存、内存、Chunk 和部署故障。

## 阶段综合项目

**Vue Enterprise Workspace**：实现同等复杂度的企业工作台，并与 React 版本进行响应式模型、更新粒度、工程边界和迁移成本对照实验。

## 阶段验收标准

- 能精确解释 Vue 响应式、调度、编译优化和 Patch 行为。
- 能正确设计 Composable、Store、Router、表单和异步边界。
- 能追踪 Reactivity、Compiler 和 Runtime Core 关键源码。
- 能制定 Vue 大型项目架构和遗留迁移方案。

## 贯穿项目演进

选择独立业务域实现 Vue 版本，建立跨框架契约与渐进迁移实验场。

---

# Stage 13：多框架范式、Angular 企业认知、Web Components 与历史系统迁移

## 阶段目标

跳出“框架粉丝”视角，理解不同 UI 范式、企业框架、平台组件和历史系统迁移策略。

## 模块清单

- **13.01 UI Framework 范式比较**：Virtual DOM、Fine-grained Reactivity、Compiler-first、Resumability、Signals 与运行时/编译时取舍。
- **13.02 Angular 企业架构基础**：Component、Template、DI、Service、Module/Standalone、Signal/RxJS、Router 和表单。
- **13.03 Angular 工程、测试与大型团队边界**：HTTP、Interceptor、权限、状态、构建、测试、升级和规范化收益/成本。
- **13.04 Svelte 与 Compiler-first**：编译响应式、组件模型、运行时体积、生态边界和适用场景。
- **13.05 Solid 与 Fine-grained Reactivity**：Signal、Memo、Effect、Owner、精细更新和与 VDOM 的差异。
- **13.06 Resumability 与延迟 Hydration 思想**：序列化执行上下文、按需恢复、岛屿架构和复杂性边界。
- **13.07 Custom Element 完整体系**：生命周期、属性/Property、事件、表单关联、自定义状态和升级过程。
- **13.08 Shadow DOM、Slot 与 Style Encapsulation**：封装树、事件重定向、样式隔离、主题穿透和 A11Y 边界。
- **13.09 Web Components 与框架互操作**：React/Vue/Angular 消费、属性/事件/类型适配、SSR 和 Design System。
- **13.10 jQuery、Backbone、AMD 与历史前端认知**：旧范式为什么出现、遗留约束、全局状态、插件生态和维护风险。
- **13.11 Framework Evaluation Framework**：团队、业务、性能、生态、招聘、升级、供应链、长期成本和锁定风险。
- **13.12 Incremental Migration 与 Strangler Frontend**：共存、适配层、路由切分、页面/组件切分、数据契约、双写风险和退出策略。

## 阶段综合项目

**Framework Paradigm & Migration Lab**：用三种渲染范式实现同一交互；把一个遗留 jQuery 页面渐进迁移，并形成正式技术选型与迁移 RFC。

## 阶段验收标准

- 能从更新模型和架构约束比较框架，而不是比较语法偏好。
- 能阅读和维护 Angular/Web Components 基础系统。
- 能设计跨框架互操作层。
- 能制定可回滚、可度量的遗留迁移计划。

## 贯穿项目演进

加入 Web Component 共享层和遗留页面迁移样例，验证多框架共存边界。

---

# Stage 14：UI Engineering、复杂组件、Design System、A11Y、国际化与样式平台

## 阶段目标

从“写页面”升级为设计和建设跨产品、跨框架、可访问、可国际化的 UI 基础设施。

## 模块清单

- **14.01 UI Engineering 与视觉基础**：网格、层级、间距、色彩、排版、密度、反馈、状态和设计实现偏差。
- **14.02 Component API 与 Composition**：受控/非受控、状态提升、Compound、Headless、Polymorphic、Slot 和可扩展性。
- **14.03 Focus、Keyboard 与 Interaction Primitive**：焦点管理、Roving Tabindex、Focus Trap、快捷键、类型搜索和输入设备差异。
- **14.04 Overlay Infrastructure**：Dialog、Popover、Tooltip、Dropdown、Portal、定位、滚动锁、堆叠和模态边界。
- **14.05 Select、Combobox、Menu、Tree 与 Tabs**：复杂键盘交互、状态机、虚拟化、异步数据和 ARIA Pattern。
- **14.06 Data Table、Data Grid 与 Virtualization**：排序、筛选、固定列、编辑、选择、行列虚拟化、A11Y 和大数据性能。
- **14.07 Form Engine 与 Schema-driven Form**：字段注册、依赖、数组、联动、校验、异步、草稿、错误聚合和性能。
- **14.08 Drag、Drop、Resize 与 Spatial Interaction**：命中、传感器、键盘替代、碰撞、自动滚动、约束和可访问性。
- **14.09 Rich Text Editor 与 Document Model**：Selection、Range、IME、命令、Schema、Undo、粘贴、协作和插件。
- **14.10 Design Token、Theme 与 Style Platform**：Primitive/Semantic/Component Token、多品牌、暗色、高对比、生成和分发。
- **14.11 Component Library 工程**：包结构、类型、样式、文档、示例、测试、按需加载、SSR、版本和发布。
- **14.12 Design System Governance**：贡献模型、设计/代码同步、弃用、迁移、采用率、例外机制和跨团队决策。
- **14.13 A11Y 完整工程体系**：语义、Name/Role/Value、屏幕阅读器、动态内容、移动辅助、审计、修复优先级和治理。
- **14.14 I18N、L10N 与 Globalization**：ICU Message、复数、日期数字、时区、RTL、文本膨胀、翻译流程和伪本地化。
- **14.15 Visual、Interaction 与 Cross-browser Quality**：Story、视觉回归、交互快照、浏览器矩阵、主题矩阵和组件质量门禁。

## 阶段综合项目

**Enterprise Design System**：建设跨 React/Vue 的 Token、Headless Primitive、复杂组件、文档站、A11Y/Visual 测试、版本发布和治理流程。

## 阶段验收标准

- 能设计稳定、可组合、可访问的复杂组件 API。
- 能实现 Overlay、Grid、Form、Editor 等高难度基础设施。
- 能建设多主题、多品牌、多语言组件平台。
- 能把 Design System 作为产品长期运营，而不是组件仓库。

## 贯穿项目演进

所有产品界面迁移到统一 Design System，并建立组件使用、升级和例外治理机制。

---

# Stage 15：Node.js Runtime、CLI、Stream、Process 与前端服务工具

## 阶段目标

掌握前端工具链和 BFF 背后的 Node.js 运行时，能够编写可靠 CLI、构建服务和自动化程序。

## 模块清单

- **15.01 Node.js Architecture、V8 与 libuv**：运行时组成、Event Loop、Thread Pool、Binding、异步 IO 和浏览器差异。
- **15.02 ESM、CommonJS 与 Module Resolution**：加载、缓存、循环依赖、Interop、Package Type、条件导出和迁移。
- **15.03 Buffer、Encoding、File 与 Path**：二进制、字符集、文件句柄、目录、Watch、权限、原子写入和跨平台路径。
- **15.04 EventEmitter、Async Context 与错误传播**：监听器、资源生命周期、AsyncLocalStorage、上下文透传和错误边界。
- **15.05 Stream 与 Backpressure**：Readable/Writable/Duplex/Transform、pipeline、对象模式、错误和大数据处理。
- **15.06 Process、Signal 与配置**：argv、env、stdin/out、退出码、signal、graceful shutdown、配置分层和密钥边界。
- **15.07 Child Process、Worker Thread 与并行任务**：spawn/exec/fork、IPC、Worker、任务池和 CPU/IO 任务选型。
- **15.08 HTTP Server 与最小 BFF**：Request/Response、连接、KeepAlive、流、代理、超时、取消和资源清理。
- **15.09 CLI Design**：命令、参数、交互、配置、日志、进度、错误、可测试性、Shell Completion 和跨平台分发。
- **15.10 Package Authoring 与 Registry**：package metadata、exports、bin、发布、Provenance 思想、版本、弃用和私有源。
- **15.11 Node Security 与 Supply Chain**：输入、路径、命令注入、原型污染、依赖脚本、权限和沙箱边界。
- **15.12 Node Performance 与 Diagnostics**：CPU Profile、Heap、Event Loop Delay、Async Hook、Flame Graph、泄漏和阻塞定位。

## 阶段综合项目

**Frontend Tooling CLI**：实现脚手架、Codemod、项目检查、构建任务和开发服务器，支持插件、配置、日志、取消、测试与跨平台发布。

## 阶段验收标准

- 能解释 Node Event Loop、libuv Thread Pool 和 Stream 背压。
- 能编写可测试、可恢复、跨平台的 CLI。
- 能处理进程、信号、文件和子任务生命周期。
- 能定位 Node CPU、内存和事件循环问题。

## 贯穿项目演进

建立项目 CLI、代码生成、环境检查和本地开发服务。

---

# Stage 16：Compiler、AST、Bundler、Package、Monorepo 与 Developer Experience

## 阶段目标

从工具使用者升级为工具链设计者，理解代码如何解析、转换、打包、缓存、发布和在大型仓库中协同。

## 模块清单

- **16.01 Lexer、Parser、AST 与 Compiler Pipeline**：Token、Grammar、Parse、Transform、Optimize、Codegen、Source Location 和错误恢复。
- **16.02 TypeScript/Babel/SWC 类转换器原理**：Plugin、Visitor、Scope、Helper、语法降级、Polyfill 和语义保持。
- **16.03 Codemod 与大规模自动迁移**：AST Query、模式匹配、幂等、格式保留、验证、分批执行和回滚。
- **16.04 Bundler Module Graph**：Entry、Dependency Graph、Loader/Plugin、Chunk、Runtime、Asset Graph 和增量构建。
- **16.05 Webpack 完整机制**：Compiler/Compilation、Tapable、Loader、Plugin、Chunk Graph、Cache、HMR 和性能诊断。
- **16.06 Rollup、Vite、esbuild、Rspack 等范式比较**：Dev/Build 分离、Native ESM、预构建、Bundle 策略和选型边界。
- **16.07 Tree Shaking、Code Splitting 与 Runtime Loading**：静态分析、副作用、动态导入、共享 Chunk、加载失败和版本协调。
- **16.08 CSS、Asset、Worker 与 WASM Pipeline**：资源模块、URL 重写、提取、压缩、内联、哈希、Worker 和特殊资产。
- **16.09 HMR、Dev Server 与 Source Map**：模块热更新、状态保留、代理、Overlay、映射链、生产调试和源码泄露风险。
- **16.10 Package Manager、Lockfile 与 Dependency Resolution**：npm/pnpm/yarn 思想、Hoist、Peer、Workspace、Patch、离线和确定性安装。
- **16.11 Package Export、Condition 与 Library Build**：ESM/CJS、Browser/Node、Types、Side Effects、Dual Package Hazard 和兼容矩阵。
- **16.12 Monorepo 与 Workspace Architecture**：包边界、依赖约束、版本策略、所有权、共享配置和发布模型。
- **16.13 Task Graph、Remote Cache 与 Incremental CI**：输入输出哈希、受影响任务、分布式执行、缓存正确性和可观测性。
- **16.14 Release Engineering**：SemVer、Changeset、Canary、Changelog、Artifact、签名、回滚和依赖升级自动化。
- **16.15 Developer Experience 与工具平台**：脚手架、Golden Path、反馈速度、错误信息、Dev Container、指标和开发者认知成本。

## 阶段综合项目

**Mini Bundler & Monorepo Platform**：实现 AST 转换和最小 Bundler；再建设包含应用、组件库、SDK、CLI 的 Monorepo、缓存、发布与依赖门禁。

## 阶段验收标准

- 能解释 AST 转换、Module Graph、Chunk 和 HMR。
- 能定位构建慢、Bundle 大、依赖冲突和 Source Map 问题。
- 能设计可扩展 Monorepo 与包发布策略。
- 能用工具和指标改善开发者体验，而不是只增加规范。

## 贯穿项目演进

迁移到 Monorepo，拆分应用、Design System、SDK、CLI 和配置包，建立增量 CI。

---

# Stage 17：静态分析、Unit、Component、Integration、E2E、Visual 与质量工程

## 阶段目标

建立覆盖编码、构建、集成、浏览器和生产反馈的完整质量体系，而不是只追求测试覆盖率数字。

## 模块清单

- **17.01 Quality Model 与 Test Strategy**：风险、测试层级、反馈速度、置信度、成本、可测试性和不同系统的测试组合。
- **17.02 Static Analysis 与 Type Gate**：类型检查、Lint、格式、依赖规则、死代码、复杂度和架构约束。
- **17.03 自定义 Lint Rule 与 AST 规则**：Rule、Visitor、Scope、Fix、测试、版本发布和组织规范自动化。
- **17.04 Unit Test**：纯函数、领域逻辑、时间、随机、异常、边界、Table-driven 和可维护断言。
- **17.05 Component Test**：用户行为、状态、异步、表单、A11Y、浏览器组件测试和实现细节隔离。
- **17.06 Integration Test**：Router、Store、API、Storage、权限、多个组件和真实依赖边界。
- **17.07 E2E Test**：真实浏览器、关键旅程、选择器、等待、网络、并行、隔离、Trace 和失败证据。
- **17.08 Contract、API 与 Consumer-driven Test**：Schema、Mock Server、契约兼容、生成客户端和跨团队发布门禁。
- **17.09 Visual Regression**：截图、基线、像素/感知差异、字体、动画、主题、浏览器矩阵和审阅流程。
- **17.10 A11Y 与 Performance Automated Test**：规则扫描、键盘流程、辅助技术人工验证、性能预算和实验室门禁。
- **17.11 Property-based、Mutation 与 Fuzz Test**：不变量、输入空间、变异得分、Parser/Form/Security 场景和成本边界。
- **17.12 Mock、Fake、Fixture 与 Test Data**：网络、时间、Storage、Worker、第三方 SDK、数据工厂和环境一致性。
- **17.13 Flaky Test、Parallel 与 Test Infrastructure**：非确定性、重试误区、资源竞争、隔离、分片、缓存和诊断。
- **17.14 CI Quality Gate 与 Production Verification**：变更风险、必需检查、Preview、Synthetic、Canary、RUM 回归和质量看板。

## 阶段综合项目

**Frontend Quality Platform**：为贯穿项目建立静态规则、单元/组件/集成/E2E/视觉/A11Y/性能测试、测试数据服务和 CI 质量门禁。

## 阶段验收标准

- 能按风险设计测试组合而不是机械套用金字塔。
- 能写稳定、可诊断、不过度 Mock 的自动化测试。
- 能建设自定义静态规则和架构门禁。
- 能治理 Flaky、执行时长和质量反馈闭环。

## 贯穿项目演进

形成统一质量流水线、Preview 环境和回归看板。

---

# Stage 18：BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端

## 阶段目标

理解现代全栈前端的渲染和部署模型，能够根据业务约束选择 CSR、SSR、SSG、流式、Edge 与 BFF。

## 模块清单

- **18.01 Rendering Strategy 决策模型**：CSR、SSR、SSG、增量静态、Streaming、Island、Partial Hydration 的收益、成本和组合。
- **18.02 Hydration 与 Server/Client Boundary**：序列化、事件恢复、Mismatch、双执行、客户端边界和第三方库兼容。
- **18.03 Next.js Application Architecture**：文件路由、Layout、数据获取、缓存、Server/Client Component、Mutation 和部署边界。
- **18.04 Next Streaming、Error、Metadata 与 Production**：Suspense 流、错误隔离、SEO、图片字体、Bundle、Runtime 和故障诊断。
- **18.05 Nuxt Application Architecture**：页面/Layout、Composable、Server Route、数据、状态、Middleware、渲染和模块生态。
- **18.06 Nuxt Hydration、Nitro 与部署边界**：Universal Code、Payload、缓存、Server Engine、Edge/Node 和诊断。
- **18.07 BFF Architecture**：聚合、协议转换、鉴权、会话、缓存、超时、取消、降级和前后端团队边界。
- **18.08 Authentication、Session 与 Server Mutation**：Cookie Session、Token、CSRF、OAuth/OIDC 集成、权限和幂等。
- **18.09 Edge Runtime 与 CDN Compute**：低延迟、地域、冷启动、Runtime 限制、数据访问、一致性和厂商锁定。
- **18.10 Cache、Revalidation 与 Data Freshness**：页面/数据/片段缓存、Tag/Key 失效、stale 策略和发布一致性。
- **18.11 SEO、Metadata 与内容分发**：爬虫、Canonical、Structured Data、Sitemap、多语言、预览和社交卡片。
- **18.12 Multi-zone、Multi-app 与平台组合**：多个应用、域名、路由、共享资源、独立发布和组织边界。
- **18.13 Full-stack Testing、Observability 与 Security**：服务端日志、Trace、Source Map、请求关联、注入、数据泄漏和缓存投毒。
- **18.14 Deployment、Portability 与 Framework Lock-in**：Node/Container/Serverless/Edge、适配层、升级、退出成本和灾备。

## 阶段综合项目

**Hybrid SaaS Portal**：实现内容站、登录工作台和 BFF，分别验证静态、动态、流式和 Edge 路径；建立缓存、SEO、会话、观测和回滚方案。

## 阶段验收标准

- 能根据数据新鲜度、SEO、成本和交互选择渲染策略。
- 能正确划分 Server/Client/BFF 边界。
- 能定位 Hydration、缓存、会话和服务端运行故障。
- 能控制 Meta-framework 锁定并设计可迁移架构。

## 贯穿项目演进

加入 BFF、SSR/Streaming 内容入口、Edge 路由和完整身份会话。

---

# Stage 19：数据与平台集成——数据库、CMS、Search、Object Storage、Payment 与 Analytics

## 阶段目标

让前端架构师理解产品依赖的数据和外部平台，能够设计稳定、安全、可替换的集成边界。

## 模块清单

- **19.01 关系数据库与事务认知**：Table、Index、Join、Transaction、Isolation、Connection Pool 和前端可见的数据一致性现象。
- **19.02 Data Modeling 与 API View Model**：实体、关系、规范化、查询模型、DTO、分页、聚合和避免前端直接耦合存储模型。
- **19.03 BFF 数据访问、ORM 与 Query Boundary**：查询构造、N+1、事务、迁移、连接生命周期和 Serverless/Edge 限制。
- **19.04 Identity Provider 与企业目录集成**：SSO、OAuth/OIDC、SAML 认知、组织、用户、Group、Provisioning 和退出。
- **19.05 Headless CMS 与内容平台**：Content Model、Preview、Workflow、Localization、Webhook、缓存和迁移。
- **19.06 Search Platform**：倒排索引、Analyzer、Query、Facet、Highlight、Autocomplete、相关性、索引延迟和 UI 反馈。
- **19.07 Object Storage 与文件资产**：直传、签名 URL、Multipart、元数据、病毒扫描、转换、CDN 和生命周期。
- **19.08 Payment、Subscription 与 Billing UI**：Checkout、Webhook、幂等、状态机、失败恢复、税费、发票和合规边界。
- **19.09 Analytics、Event Taxonomy 与 Data Quality**：事件模型、命名、属性、身份、Session、去重、Schema、验证和数据治理。
- **19.10 Experiment、Feature Flag 与 Progressive Delivery**：分流、曝光、指标、污染、Flag 生命周期、权限和回滚。
- **19.11 Notification、Email 与消息中心**：模板、偏好、渠道、状态、重试、退订、实时更新和审计。
- **19.12 Third-party SDK Isolation**：Adapter、Sandbox、Lazy Load、Consent、故障隔离、性能预算、版本和替换。
- **19.13 Multi-tenant Integration Boundary**：Tenant Context、Quota、Brand、Region、数据隔离、配置和审计。

## 阶段综合项目

**Integrated SaaS Product**：接入身份、CMS、搜索、对象存储、支付、分析、实验和通知；每个外部平台都有 Adapter、Mock、降级与退出方案。

## 阶段验收标准

- 能理解数据库一致性如何表现到 UI。
- 能设计不泄漏底层存储和供应商细节的 BFF 契约。
- 能处理支付、文件、Webhook 和第三方 SDK 的失败路径。
- 能建立分析事件和实验数据质量体系。

## 贯穿项目演进

增加企业身份、内容、搜索、文件、订阅、分析和 Feature Flag 平台。

---

# Stage 20：PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程

## 阶段目标

建立跨终端产品架构能力，能够区分“共享代码”与“共享领域能力”，并控制平台差异和发布复杂度。

## 模块清单

- **20.01 Cross-platform Strategy**：Web、PWA、Hybrid、Native、Desktop、小程序、TV 的能力、分发、团队和成本模型。
- **20.02 PWA Manifest、Install 与应用生命周期**：安装、Display Mode、图标、启动、更新、导航和平台差异。
- **20.03 Service Worker、Offline 与 Background Capability**：Cache、Fetch、更新、离线、Background Sync、Push 和版本一致性。
- **20.04 WebView 与 Native Bridge**：JS Bridge、消息、权限、版本协商、导航、Cookie、调试和安全边界。
- **20.05 Hybrid Mobile**：Web 资产封装、原生插件、生命周期、键盘、安全区、性能和商店发布。
- **20.06 React Native 类跨端架构**：Renderer、Native Component、Bridge/JSI 思想、导航、状态、性能和共享边界。
- **20.07 Desktop：Electron 与轻量 WebView 容器**：Main/Renderer、IPC、窗口、文件、自动更新、签名、沙箱和包体。
- **20.08 小程序平台模型**：双线程/逻辑视图分离、组件、路由、分包、网络、权限、平台限制和多端编译。
- **20.09 TV/OTT 大屏交互**：遥控器焦点、空间导航、十英尺 UI、弱硬件、媒体、启动、日志和厂商差异。
- **20.10 Shared Domain、SDK 与 Design System**：领域核心、协议、Token、组件适配、平台 Service 和依赖倒置。
- **20.11 Navigation、State 与 Deep Link 跨端统一**：路由模型、恢复、外部链接、通知跳转和平台生命周期。
- **20.12 Cross-platform Performance**：启动、Bundle、内存、列表、图片、Bridge、离线和低端设备预算。
- **20.13 Release、OTA、Store 与 Compatibility**：多版本、灰度、强制升级、热更新边界、审核、回滚和版本矩阵。
- **20.14 Cross-platform Testing 与 Observability**：设备矩阵、模拟器/真机、自动化、Crash、日志、网络和远程诊断。

## 阶段综合项目

**Omnichannel Client**：将同一业务能力交付为 PWA、Desktop 和至少一种 Mobile/TV 客户端，明确共享核心、平台 Adapter、发布与观测体系。

## 阶段验收标准

- 能根据业务和组织约束选择跨端路线。
- 能设计共享领域层而不强行共享所有 UI。
- 能处理生命周期、Bridge、更新和多版本兼容。
- 能在低端设备和受限平台上完成性能诊断。

## 贯穿项目演进

增加 PWA 安装与离线、Desktop 壳和 TV/OTT 工作台实验版本。

---

# Stage 21：Realtime Collaboration、Local-first、离线同步、OT/CRDT 与多人系统

## 阶段目标

理解多人实时系统的传输、状态、冲突和一致性，不把 WebSocket 连接成功误认为完成协作架构。

## 模块清单

- **21.01 Realtime System Model**：连接、Session、Presence、Room、Event、Snapshot、Delta、顺序、重复和部分失败。
- **21.02 Reconnect、Resume 与消息可靠性**：心跳、退避、游标、补发、去重、Ack、断线恢复和连接风暴。
- **21.03 Presence、Awareness 与临时状态**：在线、光标、选择、正在输入、过期、采样、隐私和非持久状态。
- **21.04 Optimistic UI 与 Command Queue**：本地先行、Server Ack、回滚、临时 ID、依赖命令和用户可理解反馈。
- **21.05 Local Database 与 Local-first**：本地数据模型、索引、事务、同步边界、离线完整体验和服务端角色。
- **21.06 Sync Protocol 与 Change Log**：版本、Checkpoint、增量、Tombstone、压缩、快照和模式迁移。
- **21.07 Conflict Detection 与 Resolution**：Last-write、Version Vector、业务合并、冲突 UI 和不可自动合并场景。
- **21.08 Operational Transformation**：Operation、Transform、并发编辑、Server Revision、Undo 和复杂度边界。
- **21.09 CRDT**：Register、Counter、Set、Sequence、Merge、Tombstone、Metadata Cost 和适用边界。
- **21.10 Collaborative Editor/Canvas Architecture**：文档模型、Selection、Cursor、Undo、权限、评论和大文档性能。
- **21.11 Realtime Backend Integration**：Gateway、Pub/Sub、Partition、Sticky、Fan-out、限流、权限和多地域考虑。
- **21.12 Realtime Test、Chaos 与 Observability**：延迟、丢包、乱序、重复、分区、时钟、回放、指标和一致性验证。

## 阶段综合项目

**Collaborative Workspace**：实现多人文档或白板，支持 Presence、离线编辑、断线恢复、冲突处理、历史、权限和网络混沌测试。

## 阶段验收标准

- 能区分传输可靠性、数据一致性和协作体验。
- 能解释 OT、CRDT 和业务合并的取舍。
- 能设计离线命令、恢复和冲突 UI。
- 能通过事件回放和混沌测试验证多人系统。

## 贯穿项目演进

加入多人协作、离线编辑、历史和实时状态。

---

# Stage 22：SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化

## 阶段目标

覆盖普通 DOM UI 之外的图形、媒体和高性能计算平台，建立可视化系统的正确渲染与性能模型。

## 模块清单

- **22.01 图形数学与坐标系统**：向量、矩阵、变换、坐标空间、相机、投影、插值、颜色和数值精度。
- **22.02 SVG**：图形、Path、ViewBox、Transform、Style、Filter、事件、A11Y、DOM 成本和大型 SVG 优化。
- **22.03 Canvas 2D**：Immediate Mode、绘制状态、像素比、文本、图像、命中测试、脏矩形和 OffscreenCanvas。
- **22.04 Scene Graph 与可视化交互**：节点、层级、布局、命中、选择、缩放、平移、动画和状态同步。
- **22.05 WebGL Rendering Pipeline**：Buffer、Attribute、Shader、Texture、Framebuffer、Depth、Blend 和 Draw Call。
- **22.06 Shader 与 GPU Programming 基础**：Vertex/Fragment、坐标、采样、光照思想、并行限制和调试。
- **22.07 3D Engine Architecture**：Scene、Camera、Material、Geometry、Loader、Animation、Culling、LOD 和资源管理。
- **22.08 WebGPU**：Adapter/Device、Pipeline、Bind Group、Command、Compute、Buffer 和与 WebGL 的差异。
- **22.09 Data Visualization Architecture**：Scale、Axis、Layout、Interaction、Declarative/Imperative、图表语法和业务可读性。
- **22.10 Large-scale Visualization**：百万点、聚合、抽样、分块、虚拟化、LOD、Worker、GPU 和增量更新。
- **22.11 Web Audio 与音频处理**：Audio Graph、Source、Node、Worklet、可视化、延迟和浏览器策略。
- **22.12 Video、Media Source 与 WebRTC**：编解码认知、播放、MSE、字幕、实时媒体、信令、NAT 穿透和质量指标。
- **22.13 WebAssembly**：线性内存、模块、JS 边界、拷贝、线程、SIMD、适用任务和工具链。
- **22.14 WebXR、可访问替代与生产诊断**：沉浸式会话、输入、空间、性能预算、降级、眩晕风险和设备调试。

## 阶段综合项目

**High-performance Visualization Studio**：实现大规模实时数据可视化，组合 SVG/Canvas/GPU/Worker/WASM，提供交互、导出、A11Y 降级和性能报告。

## 阶段验收标准

- 能根据数据规模和交互选择 DOM、SVG、Canvas 或 GPU。
- 能解释 Draw Call、Buffer、Shader、Frame Budget 和内存成本。
- 能处理音视频实时链路与质量指标。
- 能为高性能图形提供可访问替代和降级路径。

## 贯穿项目演进

加入实时图表、可视化编辑和媒体能力，并建立 Worker/GPU 性能边界。

---

# Stage 23：Schema-driven UI、动态表单、低代码、Visual Editor 与插件式业务平台

## 阶段目标

学习大型可配置业务平台的核心机制，理解低代码不是“拖拽页面”，而是 Schema、Runtime、Editor、Extension 和 Governance 的组合。

## 模块清单

- **23.01 Schema-driven UI 基础**：Schema、Component Registry、Props、Data Binding、Action、Condition 和渲染 Runtime。
- **23.02 JSON Schema 与动态表单**：字段、约束、依赖、数组、OneOf、UI Schema、验证、错误和版本兼容。
- **23.03 Expression、Rule 与安全求值**：变量、函数、依赖、缓存、循环、权限、沙箱和不可执行任意代码。
- **23.04 Layout、Responsive 与 Theme Schema**：布局模型、断点、约束、Token、品牌和运行时覆盖。
- **23.05 Plugin Architecture**：扩展点、生命周期、能力声明、依赖、版本、权限、隔离和卸载。
- **23.06 Visual Editor Canvas**：选择、Hover、拖放、吸附、层级、辅助线、缩放、预览和 iframe 隔离。
- **23.07 Command、Undo/Redo 与 History**：命令模型、Transaction、Inverse、合并、Checkpoint 和持久化。
- **23.08 Document Model 与 Schema Migration**：节点身份、引用、规范化、版本、迁移、兼容和损坏恢复。
- **23.09 Runtime Renderer 与 Performance**：动态组件、依赖跟踪、局部更新、懒加载、错误隔离和缓存。
- **23.10 Workflow、Action 与 Integration**：事件、条件、异步、API、权限、补偿、审计和可视化调试。
- **23.11 Code Generation 与 Round-trip Boundary**：模板、AST、格式、生成物所有权、可编辑性和不可逆转换。
- **23.12 Multi-tenant、Permission 与 Marketplace**：租户、配额、扩展审核、签名、计费、隔离和供应链。
- **23.13 Low-code Governance 与 Escape Hatch**：平台边界、专业代码接入、可测试性、性能、安全、迁移和退出策略。

## 阶段综合项目

**Visual App Builder**：实现动态表单/仪表盘编辑器，包含 Schema、拖拽、撤销、预览、插件、规则、版本迁移、权限和运行时诊断。

## 阶段验收标准

- 能设计稳定、可迁移的 Schema 和 Document Model。
- 能实现编辑器命令、撤销、插件和安全表达式。
- 能区分 Editor、Runtime、Platform 与生成代码边界。
- 能识别低代码适用范围和长期锁定风险。

## 贯穿项目演进

加入 Schema-driven 页面、插件中心和可视化配置能力。

---

# Stage 24：前端性能工程、RUM、Core Web Vitals、Memory、Capacity 与规模治理

## 阶段目标

建立从用户体验、浏览器证据、真实用户数据到组织级预算和容量治理的完整性能工程体系。

## 模块清单

- **24.01 Performance Model 与业务指标**：响应时间、吞吐、资源、帧率、用户旅程、转化、分位数和性能目标。
- **24.02 Web 用户体验指标**：加载、视觉稳定、交互响应、长任务、自定义业务指标和指标局限。
- **24.03 Lab、Synthetic 与 RUM**：受控实验、真实用户、采样、设备/网络分群、数据清洗和因果边界。
- **24.04 Critical Rendering Path 与 Network Optimization**：连接、TLS、优先级、缓存、压缩、关键资源、第三方和 Waterfall。
- **24.05 JavaScript Execution Performance**：Parse/Compile/Execute、长任务、算法、序列化、事件风暴、Worker 和调度。
- **24.06 Rendering Performance**：Style/Layout/Paint/Composite、Thrashing、Layer、动画、滚动和 Frame Timeline。
- **24.07 Image、Font、Video 与 Asset Performance**：格式、尺寸、响应式、加载、解码、字体子集、媒体策略和 CDN。
- **24.08 Framework Performance**：React/Vue 更新、状态粒度、列表、Hydration、Streaming、Code Split 和数据请求瀑布。
- **24.09 Memory、Leak 与 Long-session Stability**：Heap、Detached DOM、Listener、Timer、Cache、Worker、Snapshot 和增长趋势。
- **24.10 Large Data、Virtualization 与 Incremental Work**：列表/表格/树、分块、窗口、调度、索引和交互一致性。
- **24.11 Bundle、Dependency 与 Third-party Budget**：体积归因、重复依赖、Polyfill、SDK、Tree Shaking 和加载策略。
- **24.12 Capacity、Traffic 与 Degradation**：并发用户、请求量、CDN 命中、实时连接、客户端资源、低端设备和降级。
- **24.13 Performance Budget、CI Gate 与 Regression Detection**：预算、基线、统计波动、变更归因、阻断和例外。
- **24.14 Performance Governance**：Owner、Dashboard、SLO、War Room、优化 ROI、文化和长期防回退机制。

## 阶段综合项目

**Frontend Performance War Room**：为一个故意退化的系统建立 Lab/RUM 基线，定位网络、执行、渲染、内存和框架瓶颈，完成优化、预算和回归门禁。

## 阶段验收标准

- 能用分位数和用户分群解释真实性能。
- 能通过 Trace、Profile、Heap 和 Waterfall 找到根因。
- 能证明优化收益并识别指标作弊。
- 能建立团队级性能预算和持续治理机制。

## 贯穿项目演进

建立 RUM、性能预算、低端设备基线、容量模型和自动回归检测。

---

# Stage 25：Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理

## 阶段目标

从漏洞修补升级为完整安全工程：理解浏览器安全模型、身份权限、供应链、隐私和组织级威胁治理。

## 模块清单

- **25.01 Threat Modeling 与 Trust Boundary**：Asset、Actor、Entry、Data Flow、STRIDE 思想、风险、缓解和验证。
- **25.02 Same-Origin、Site、CORS 与跨源隔离**：浏览器强制边界、凭据、Preflight、CORP/COEP/COOP 思想和配置风险。
- **25.03 XSS 完整体系**：Stored/Reflected/DOM、Contextual Encoding、Sanitization、DOM Sink、模板和框架逃生口。
- **25.04 CSP、Trusted Types 与脚本治理**：Policy、Nonce/Hash、Report、第三方脚本、迁移和绕过分析。
- **25.05 CSRF、Clickjacking、Open Redirect 与 XS-Leak**：攻击前提、SameSite、Token、Origin 检查、Frame 限制和侧信道。
- **25.06 Authentication：Session、OAuth、OIDC 与 PKCE**：登录、回调、State/Nonce、Token、刷新、退出、设备和攻击路径。
- **25.07 Authorization、RBAC/ABAC 与前端权限边界**：展示权限、服务端强制、策略、资源、租户、缓存和越权验证。
- **25.08 Token、Cookie 与 Secret Handling**：存储选择、HttpOnly、内存、刷新、泄漏、日志、环境配置和密钥不进入前端。
- **25.09 iframe、postMessage、WebView 与跨上下文安全**：Origin 验证、协议、能力限制、Sandbox、Bridge 和消息重放。
- **25.10 URL、Upload、Download 与内容安全**：路径、协议、文件类型、MIME、预览、公式注入、Blob 和对象 URL 生命周期。
- **25.11 Prototype Pollution、DOM Clobbering 与 JavaScript 风险**：对象合并、名称覆盖、依赖漏洞和安全编码。
- **25.12 Dependency、Build 与 Supply-chain Security**：Lockfile、恶意包、安装脚本、Typosquat、SBOM、签名、来源和最小依赖。
- **25.13 Privacy、Consent 与 Data Minimization**：个人数据、目的、保留、删除、追踪、第三方、地区差异和隐私设计。
- **25.14 Security Testing 与 Incident Response**：SAST、DAST、Dependency Scan、Fuzz、渗透协作、日志、隔离、修复和复盘。
- **25.15 Security Governance**：安全基线、Champion、Review、例外、培训、漏洞 SLA、资产清单和持续验证。

## 阶段综合项目

**Vulnerable Web Lab & Hardening**：构造身份、XSS、CSRF、权限、文件、iframe、依赖和隐私问题；完成 Threat Model、修复、自动验证和事件响应演练。

## 阶段验收标准

- 能从信任边界和攻击前提解释漏洞。
- 能正确设计企业登录、会话和权限，而不把前端校验当安全控制。
- 能治理第三方脚本、依赖和敏感数据。
- 能建立安全测试、例外和漏洞响应机制。

## 贯穿项目演进

完成全系统 Threat Model、认证授权加固、CSP、供应链和隐私治理。

---

# Stage 26：Observability、SLO、故障治理、CI/CD、Container、Kubernetes、GitOps 与云交付

## 阶段目标

让前端系统真正可运行、可观测、可灰度、可回滚、可恢复，并把浏览器故障连接到后端与发布链路。

## 模块清单

- **26.01 Frontend Observability Model**：User、Session、Page、Route、Release、Trace、Error、Performance 和业务上下文。
- **26.02 Structured Log 与隐私安全**：日志级别、字段、关联、采样、脱敏、Console 治理和客户端日志上传。
- **26.03 Error、Crash 与 Source Map**：错误边界、Unhandled、Promise、资源错误、Source Map、Release 对齐和聚合指纹。
- **26.04 Metrics、RUM 与 Dashboard**：计数、分布、分位数、维度、基数、漏斗、版本对比和异常检测。
- **26.05 Distributed Trace 与 Context Propagation**：Traceparent、前端 Span、BFF、后端、第三方和跨系统调用链。
- **26.06 SLI、SLO、Error Budget 与用户旅程**：可用性、正确性、延迟、关键旅程、预算、发布决策和局限。
- **26.07 Alert、On-call 与 Incident Command**：症状告警、降噪、升级、角色、沟通、止血、恢复和时间线。
- **26.08 Postmortem 与 Problem Management**：无责复盘、根因/促成因素、行动项、Owner、验证和知识沉淀。
- **26.09 CI Pipeline Architecture**：检查、构建、测试、Artifact、缓存、并行、权限、可信构建和失败诊断。
- **26.10 Preview、CD、Canary 与 Rollback**：临时环境、审批、分群、Feature Flag、渐进发布、自动停止和回滚。
- **26.11 Static Hosting、CDN 与 Edge Delivery**：对象存储、Cache、Purge、Header、重写、原子发布和旧 Chunk 兼容。
- **26.12 Container、Nginx 与 Runtime Config**：镜像、分层、非 Root、健康检查、配置注入、压缩、缓存和优雅停止。
- **26.13 Kubernetes 前端交付**：Deployment、Service、Ingress/Gateway、Config、Secret、Probe、Resource、HPA 和滚动升级。
- **26.14 GitOps、IaC 与环境治理**：声明式配置、变更审计、漂移、Promotion、Secret 管理和环境一致性。
- **26.15 Resilience、Chaos GameDay 与灾难恢复**：依赖失败、CDN 故障、错误发布、区域问题、备份、RTO/RPO 和演练。

## 阶段综合项目

**Production Delivery Platform**：建立从 Commit 到 Preview、Canary、Production、Rollback 的完整链路；打通 Error、RUM、Trace、SLO 和 Incident 演练。

## 阶段验收标准

- 能从用户错误追踪到具体 Release 和后端调用链。
- 能设计 SLO、告警、值班和复盘流程。
- 能完成容器/Kubernetes/CDN 多种前端交付。
- 能执行灰度、回滚和灾难恢复演练。

## 贯穿项目演进

完成全球 CDN、容器化 BFF、Kubernetes、GitOps、全链路观测与发布治理。

---

# Stage 27：DDD、模块化、Microfrontend、Plugin、Multitenancy 与大型前端架构

## 阶段目标

以业务边界和质量属性驱动大型前端架构，掌握模块化单体、微前端、插件、多租户和渐进演进，而不是为拆分而拆分。

## 模块清单

- **27.01 Architecture Driver 与 Quality Attribute**：业务目标、团队、性能、可用性、安全、交付、成本、约束和优先级。
- **27.02 Frontend Domain Modeling**：Domain、Subdomain、Bounded Context、Ubiquitous Language、Entity/Value、Use Case 和 UI Model。
- **27.03 Vertical Slice 与 Modular Frontend**：按业务组织、Public API、依赖规则、内部封装、共享内核和模块测试。
- **27.04 Clean/Hexagonal 思想在前端的应用**：Domain、Application、Adapter、Framework 边界和不过度分层。
- **27.05 State、Event 与 Workflow Architecture**：状态所有权、命令、事件、状态机、Saga UI、跨模块协调和可回放性。
- **27.06 API、Schema 与 Contract Boundary**：BFF、DTO、Anti-corruption Layer、版本、能力协商和跨团队契约。
- **27.07 Microfrontend 的问题、前提与反模式**：独立交付、团队自治、Distributed Monolith、重复成本和不该使用的场景。
- **27.08 Build-time、Runtime、iframe 与 Server Composition**：集成模式、隔离、性能、SEO、安全、部署和适用边界。
- **27.09 Module Federation 类运行时模块共享**：Remote、Host、Shared、版本协商、故障、缓存、回滚和供应链。
- **27.10 Routing、Shell 与页面组合**：App Shell、全局导航、嵌套路由、错误隔离、加载、认证和跨应用跳转。
- **27.11 Cross-app State、Event 与 Contract**：共享状态风险、事件协议、URL、服务、数据复制和调试。
- **27.12 Design System 与 Platform Contract**：Token、组件、版本、主题、A11Y、跨框架和团队自治边界。
- **27.13 Plugin Architecture 与 Extension Platform**：Manifest、Capability、Lifecycle、Sandbox、Permission、Marketplace 和兼容。
- **27.14 Multitenancy、White-label 与 Configuration Architecture**：租户上下文、品牌、功能、地区、配额、隔离和配置层级。
- **27.15 Architecture Test、Fitness Function 与 Governance**：依赖检查、Bundle/性能/安全预算、契约、自动规则和例外。
- **27.16 Strangler、Data Migration 与 Architecture Evolution**：阶段边界、双运行、切流、数据迁移、观测、回滚和拆除旧系统。

## 阶段综合项目

**Multi-team SaaS Architecture**：把模块化单体演进为可独立交付的多团队系统，加入 Shell、插件、多租户、契约、Fitness Function，并证明拆分收益大于成本。

## 阶段验收标准

- 能从业务和组织约束决定是否使用微前端。
- 能设计清晰模块、契约、状态和发布边界。
- 能处理多租户、插件、共享依赖和版本兼容。
- 能通过度量和渐进迁移安全演进架构。

## 贯穿项目演进

建立多租户产品壳、独立业务域、插件平台和组织级架构规则。

---

# Stage 28：Frontend Platform、迁移、技术债、Governance、成本、产品与 Staff/Principal 影响力

## 阶段目标

把影响范围从单个项目扩大到多个团队：将平台当产品，推动迁移、治理技术债、控制成本并建立长期技术方向。

## 模块清单

- **28.01 Senior、Staff、Principal 与 Architect 能力边界**：作用范围、模糊问题、技术判断、组织影响、责任和常见误区。
- **28.02 Platform as a Product**：用户、问题、价值、Roadmap、采用、支持、反馈、SLA 和不做什么。
- **28.03 Golden Path、Paved Road 与 Escape Hatch**：默认路径、模板、守护栏、扩展、例外和平台锁定风险。
- **28.04 Developer Portal、Template 与 Self-service**：项目创建、Owner、文档、环境、权限、资源和生命周期自动化。
- **28.05 Design System、Toolchain 与 Quality Platform 组合**：能力边界、团队模型、服务目录、集成和重复平台治理。
- **28.06 RFC、ADR 与 Architecture Review**：问题、选项、证据、决策、反对意见、复审条件和可追溯性。
- **28.07 Technology Radar 与选型机制**：评估、试点、采用、保留、淘汰、生态风险和版本策略。
- **28.08 Large-scale Migration Program**：资产盘点、依赖图、分批、Codemod、兼容层、培训、指标、回滚和旧栈下线。
- **28.09 Technical Debt Portfolio**：债务分类、利息、风险、价值、优先级、预算和与业务 Roadmap 协商。
- **28.10 Developer Experience Metrics**：反馈时间、构建、测试、发布、失败恢复、满意度、认知负担和指标副作用。
- **28.11 Frontend Cost Engineering**：CDN、流量、构建、CI、监控、第三方 SaaS、设备支持、人力和总拥有成本。
- **28.12 Team Topology、Ownership 与边界**：Platform/Stream-aligned/Enabling 思想、Code Owner、值班、依赖和协作接口。
- **28.13 Cross-team Influence 与技术沟通**：无权影响、利益相关者、提案、异议、冲突、谈判和决策落地。
- **28.14 Mentoring、Hiring、Review 与能力建设**：能力模型、面试、成长计划、设计评审、反馈和知识扩散。
- **28.15 Incident Leadership 与高风险变更**：风险评估、指挥、跨团队协作、止损、决策记录和复盘推动。
- **28.16 Strategy、Roadmap 与 Governance Operating Model**：技术战略、年度主题、季度目标、标准、例外、度量和持续调整。

## 阶段综合项目

**Frontend Platform Strategy**：以现有多应用组织为背景，完成平台用户研究、能力地图、三年演进路线、迁移计划、成本模型、RFC/ADR、治理和采用指标。

## 阶段验收标准

- 能把平台能力映射到真实开发者问题和业务价值。
- 能领导跨团队迁移并安全下线旧技术。
- 能用证据管理技术债、成本和选型。
- 能通过机制和影响力推动组织级改进。

## 贯穿项目演进

将贯穿项目沉淀为组织级模板、组件、SDK、质量、交付和可观测平台。

---

# Stage 29：AI-assisted Development、MCP、AI Native Frontend、Agent UX、安全与评估

## 阶段目标

掌握 AI 时代的前端开发流程与产品架构，能够构建可流式、可解释、可授权、可评估的 AI Native 用户体验。

## 模块清单

- **29.01 LLM、Token、Context 与生成模型基础**：输入输出、上下文窗口、概率、结构化输出、延迟、成本和能力边界。
- **29.02 AI-assisted Development Workflow**：需求、计划、代码生成、测试、Review、Diff、验证、回滚和团队规则。
- **29.03 Coding Agent 与 Repository Context**：文件检索、工具调用、沙箱、任务分解、权限、长期任务和人类审查。
- **29.04 MCP 与 Tool Protocol**：Client、Server、Tool、Resource、Prompt、Transport、Capability、认证和边界设计。
- **29.05 Chat、Streaming 与消息模型**：Message、Part、Delta、Reasoning 展示边界、取消、重试、恢复和历史。
- **29.06 Generative UI 与 Schema-driven Result**：结构化结果、动态组件、版本、未知类型、降级、可信渲染和交互回传。
- **29.07 Agent UX**：Plan、Tool Call、Progress、Approval、Result、Error、Undo、接管、等待感和不确定性表达。
- **29.08 Multimodal、File、Canvas 与 Artifact UX**：上传、预览、引用、编辑、版本、长任务结果和可下载产物。
- **29.09 RAG、Search 与 Citation UX**：检索状态、来源、片段、置信、冲突、引用、反馈和错误来源治理。
- **29.10 AI Streaming Protocol 与 BFF**：SSE、WebSocket、NDJSON、Backpressure、Abort、Resume、Usage 和 Provider Adapter。
- **29.11 Human-in-the-loop 与高风险操作**：确认、审批、权限升级、Dry-run、Diff、回滚和审计。
- **29.12 Prompt Injection、Tool Abuse 与 Data Exfiltration**：不可信内容、指令边界、最小权限、输出编码、网络和文件隔离。
- **29.13 AI Identity、Authorization 与 Audit**：用户、Agent、Service Account、Delegation、Scope、租户和操作记录。
- **29.14 Evals、Quality、Latency 与 Cost**：数据集、评分、人工评审、在线指标、回归、缓存、路由和预算。
- **29.15 AI Observability 与 Production Operations**：Trace、Prompt/Tool、模型版本、错误、Token、延迟、成本、隐私和事件响应。
- **29.16 AI Platform 与治理**：多模型网关、Provider、Policy、Template、Safety、发布、版本、团队复用和退出策略。

## 阶段综合项目

**AI Native Architect Workbench**：实现多模型聊天、流式输出、工具调用、MCP、文件与 Artifact、审批、引用、评估、审计、安全和成本看板。

## 阶段验收标准

- 能设计清晰可控的 Agent 交互，而不是只放一个聊天框。
- 能正确处理流式、取消、恢复、工具权限和高风险确认。
- 能针对 Prompt Injection、数据泄漏和工具滥用建立防线。
- 能用 Evals、Trace、延迟和成本证据运营 AI 功能。

## 贯穿项目演进

升级为多租户 AI Native 工作台，并接入统一模型、MCP、评估与治理平台。

---

# Stage 30：Principal 级综合毕业项目与正式架构答辩

## 阶段目标

把前面所有能力组合成一个能够真实运行、真实测量、真实失败、真实恢复和持续演进的大型系统。

## 项目建议

毕业项目建议建设：

> **Architect Cloud Workbench**：多租户、AI Native、实时协作、可配置、跨终端的企业工作平台。

它可以包含：

```text
公开内容与文档站
+ 企业控制台
+ Design System
+ 多应用 / 插件平台
+ BFF 与服务端渲染
+ 文件、搜索、通知、分析与计费
+ 实时协作与离线能力
+ Schema-driven / Visual Editor
+ PWA / Desktop / TV 终端
+ AI Chat / Agent / MCP / Artifact
+ 完整质量、性能、安全、可观测与交付体系
```

不是要求无理由堆叠所有技术。每项技术必须由业务目标、质量属性和约束证明其必要性。

## 模块清单

- **30.01 Problem Discovery 与业务约束**：用户、场景、价值、范围、关键流程、风险和不做什么。
- **30.02 Quality Attribute、SLO 与 Capacity**：性能、可用性、安全、一致性、可扩展、成本、流量和设备模型。
- **30.03 Architecture Option、ADR 与 Prototype**：候选方案、实验、证据、Trade-off、决策和复审条件。
- **30.04 Domain、Module、Contract 与 Team Boundary**：领域、模块、BFF、Schema、Owner、依赖和发布边界。
- **30.05 UX、Design System、A11Y 与 Globalization**：一致体验、复杂组件、多语言、多品牌、键盘和辅助技术。
- **30.06 Data、Realtime、Offline 与 Conflict**：服务端状态、本地状态、同步、恢复、幂等、重复、乱序和冲突。
- **30.07 Multitenancy、Plugin 与 Extension Security**：租户、权限、隔离、配额、扩展、沙箱、版本和 Marketplace。
- **30.08 Performance 与 Low-end/Weak-network Validation**：RUM、Profile、预算、低端设备、弱网和容量压测。
- **30.09 Security、Privacy 与 Supply Chain**：Threat Model、认证授权、CSP、依赖、数据、审计和响应。
- **30.10 Test、Release 与 Production Verification**：测试组合、质量门禁、Preview、Canary、Feature Flag、回滚和验证。
- **30.11 Observability、Incident、DR 与 Operations**：日志、指标、Trace、SLO、告警、值班、复盘、RTO/RPO 和演练。
- **30.12 Migration、Cost、Governance 与 Architecture Defense**：迁移路线、旧系统退出、成本模型、平台运营、技术战略和答辩。

## 强制交付物

- Product Requirement、用户旅程与范围说明。
- Quality Attribute Scenario 与非功能约束。
- C4 Context/Container/Component、Sequence、Data、Deployment 图。
- ADR、RFC、Threat Model 和 Data Flow Diagram。
- 可运行源码、环境和一键启动说明。
- Unit、Component、Integration、E2E、Visual、A11Y 与 Performance Test。
- Browser/Device/Network 兼容矩阵。
- Lab + RUM 性能基线和容量报告。
- Logs、Metrics、Traces、RUM、SLO 与 Dashboard。
- CI/CD、Preview、Canary、Rollback 和 Feature Flag 方案。
- Security、Privacy、Dependency 与 Supply-chain 报告。
- Chaos / Failure Injection / GameDay 报告。
- Backup、Restore、RTO/RPO 与灾难恢复演练。
- Cost Model、技术债清单、迁移计划和架构演进记录。
- Incident Timeline 与 Postmortem 示例。

## 最终答辩必须回答

1. 系统解决什么问题，最核心的业务价值是什么？
2. 哪些范围明确不做，为什么？
3. 最关键的质量属性是什么，它们如何冲突？
4. 峰值用户、请求、实时连接、资源体积和客户端容量如何估算？
5. 为什么选择当前框架、渲染模式、BFF、状态和通信方案？
6. 为什么不是另一种技术？
7. 哪些状态属于 URL、本地 UI、Server、Offline 或 Collaborative State？
8. 弱网、离线、重复、乱序和冲突时用户会看到什么？
9. 一个依赖超时、CDN 故障或错误发布如何传播？
10. 如何防止白屏、Chunk 不兼容、Hydration 错误和缓存污染？
11. 如何保证 A11Y、多语言、多品牌和低端设备体验？
12. 身份、权限、租户、插件和 AI Tool 的信任边界在哪里？
13. 如何检测 XSS、数据泄漏、供应链和 Prompt Injection？
14. 性能收益如何证明，真实用户是否受益？
15. 如何灰度、回滚、恢复数据并满足 RTO/RPO？
16. 多团队如何独立工作而不形成分布式前端单体？
17. 哪些复杂度是必要的，哪些应该立即删除？
18. 流量、团队和业务扩大 10 倍后如何演进？
19. 三年总拥有成本是多少，主要成本驱动是什么？
20. 五年后如何替换今天选择的框架或平台？

---

# 7. 贯穿项目完整演进路线

## V0：Repository Bootstrap

建立 Git、文档、静态页面、开发环境和发布基线。

## V1：Semantic & Responsive Web

形成语义 HTML、复杂表单、SEO、A11Y、响应式 CSS、主题和视觉规范。

## V2：Vanilla Application

加入原生 JavaScript/TypeScript、路由、状态、请求、错误、Storage 和 Worker。

## V3：Resilient Data Client

加入缓存、实时、流式、上传、取消、重试、离线队列和一致性策略。

## V4：React Enterprise Console

形成 React 主应用、复杂业务、路由、Server State、测试和性能基线。

## V5：Vue Domain & Migration Lab

实现 Vue 独立业务域，验证多框架契约、Web Components 和渐进迁移。

## V6：Enterprise Design System

统一 Token、主题、复杂组件、A11Y、国际化、文档、发布和治理。

## V7：Monorepo & Developer Platform

拆分应用、组件、SDK、CLI、配置和工具包，建立增量构建与质量门禁。

## V8：BFF & Hybrid Rendering

加入 BFF、身份、SSR/Streaming、SEO、Edge、缓存和全栈观测。

## V9：Platform Integration

接入 CMS、Search、Object Storage、Payment、Analytics、Experiment 和 Notification。

## V10：Omnichannel

交付 PWA、Desktop、Mobile/TV 版本，建立共享领域与平台 Adapter。

## V11：Realtime & Local-first

加入协作、Presence、离线编辑、同步、冲突和历史。

## V12：Visual & Low-code Platform

加入高性能可视化、Schema Runtime、Visual Editor、Workflow 和 Plugin。

## V13：Production Hardening

完成性能、安全、隐私、供应链、可观测、SLO、CI/CD、Kubernetes 与灾备。

## V14：Multi-team & Multitenant Architecture

形成多租户、多应用、微前端/模块化、插件和组织级 Architecture Fitness Function。

## V15：AI Native Workbench

接入多模型、流式 Chat、Agent、MCP、Artifact、Approval、Eval、Audit 和 Cost Governance。

---

# 8. 学习阶段与能力里程碑

## Milestone A：Web 页面开发者（Stage 00～04）

能够独立完成语义、响应式、可访问的内容页面和表单，并理解基本网络链路。

## Milestone B：扎实的前端工程师（Stage 05～10）

能够不用框架构建 TypeScript 浏览器应用，理解 Runtime、Browser、HTTP、缓存和数据韧性。

## Milestone C：高级应用前端（Stage 11～14）

能够深入使用并解释 React/Vue，建设复杂组件、Design System、A11Y 和国际化体系。

## Milestone D：资深全栈前端（Stage 15～19）

能够建设工具链、质量体系、Monorepo、BFF、SSR 与企业平台集成。

## Milestone E：专业领域技术专家（Stage 20～23）

具备跨端、实时协作、图形媒体、低代码或插件平台等高难领域能力。

## Milestone F：Staff / Principal Frontend Engineer（Stage 24～29）

能够承担性能、安全、可靠性、架构、平台、迁移、成本、治理与 AI Native 系统建设。

## Milestone G：前端架构师（Stage 30）

能够用业务、质量、证据、成本和组织约束设计并答辩一个长期演进的生产系统。

---

# 9. 每个 Module 的完成标准

一个 Module “看过”不等于“学会”。正式完成至少要做到：

```text
能解释为什么存在
+ 能从零实现最小案例
+ 能完成工程级使用
+ 能处理错误与边界
+ 能写测试验证
+ 能使用工具 Debug
+ 能读关键规范或源码
+ 能分析性能 / 安全 / A11Y 成本
+ 能制造并定位典型故障
+ 能说明适用和不适用场景
+ 能与替代方案做 Trade-off
+ 能完成 Module Project
```

---

# 10. Stage 验收统一要求

每个 Stage 完成时至少提交：

- 阶段知识图谱和关键心智模型。
- 所有 Lesson 可运行源码与验证记录。
- Module Project 与 Stage 综合项目。
- 单元/集成/端到端或适用的专项测试。
- Wrong Way、Failure、Debug 与故障复现报告。
- 性能、安全、A11Y 和兼容性检查（适用时）。
- 关键源码/规范阅读记录（适用时）。
- 技术选型与 Trade-off 文档。
- 贯穿项目本阶段演进记录。
- Stage Review 与 Definition of Done。

---

# 11. 推荐课程建设顺序

总体学习顺序按 Stage 00 → Stage 30，但正式课程落地不要求机械地一次写完整个 Stage 再开始下一阶段。

推荐优先形成可学习主干：

```text
第一批：Stage 00、02、03、04、05、06、07、08
第二批：Stage 09、10、11、14、17、18
第三批：Stage 12、15、16、19、24、25、26
第四批：Stage 13、20、21、22、23、27
第五批：Stage 28、29、30
```

每次建设仍然必须遵守：

```text
先确定 Owner Module 和边界
→ 再拆 Lesson / Knowledge Point
→ 再逐课编写可复刻 README 和完整源码
→ 完成 Module Project
→ 完成 Stage Project
→ 全局复审重复、依赖、粒度和知识上限
```

---

# 12. 目录约定

课程设计目录：

```text
learn-frontend-web-course/
├── README.md                       # 唯一总纲
├── FRONTEND_TEACHING_GUIDE.md      # 统一教学规范
└── stageXX-topic/                  # 后续 Stage 详细设计
    ├── README.md                   # Stage 目标、Module 索引与项目
    └── moduleXX-YY-topic/
        └── README.md               # Module 边界、Lesson 索引与验收
```

正式课程目录：

```text
courses/frontend-architect/
└── stageXX-topic/
    └── moduleXX-YY-topic/
        └── lesson-name/
            ├── README.md
            ├── src/ 或最小源码文件
            ├── tests/
            └── 运行所需配置
```

`README.md` 是唯一总纲。Stage 和 Module 文档只能细化总纲，不能创建平行路线或擅自改变 Owner 边界。

---

# 13. 最终能力模型

完成整套课程后，目标达到以下十层能力：

## Level 1：页面实现能力

能够实现语义正确、响应式、可访问、兼容的 Web 页面和交互。

## Level 2：编程语言能力

能够使用 JavaScript/TypeScript 建立可靠的数据、异步、模块和错误模型。

## Level 3：平台原理能力

能够理解网络、浏览器、渲染、调度、存储和 Worker 的关键机制。

## Level 4：框架与源码能力

能够深入使用 React/Vue，并追踪其响应式、调度、Reconciler、Compiler 和 Renderer 关键源码。

## Level 5：UI 与工程能力

能够建设 Design System、复杂组件、Monorepo、工具链、测试和发布体系。

## Level 6：全栈前端与专业领域能力

能够设计 BFF、SSR/Edge、平台集成、跨端、实时、图形媒体和低代码系统。

## Level 7：性能、安全与可靠性能力

能够通过证据处理性能、内存、安全、隐私、供应链、可观测和生产事故。

## Level 8：系统设计与架构演进能力

能够设计模块化、多租户、插件和多团队系统，并安全完成迁移和技术升级。

## Level 9：平台与组织治理能力

能够建设 Frontend Platform，制定标准、控制成本、治理技术债并推动跨团队采用。

## Level 10：Principal / Architect 影响力

能够在模糊、高风险、跨组织问题中建立方向，用实验和数据做决策，并对长期业务与技术结果负责。

---

# 14. 课程完成的真正标准

最终目标不是说：

> “我会 HTML、CSS、JavaScript、React、Vue、Next.js。”

而是能够说：

> “我能解释复杂 Web 系统为什么这样设计，能够用浏览器、网络、源码、指标和实验验证判断；我知道它会在哪里失败，如何保证性能、安全、可访问、可靠和可演进；也知道什么时候不应该引入框架、微前端、低代码、跨端或 AI 等额外复杂度。”

这才是本课程定义的 **资深前端工程师、Staff / Principal Frontend Engineer 与前端架构师**。