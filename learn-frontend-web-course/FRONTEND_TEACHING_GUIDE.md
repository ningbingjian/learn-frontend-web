# Learn Frontend Web 统一教学规范

> 版本：v1.0  
> 适用范围：`learn-frontend-web` 全部 Stage、Module、Knowledge Point、Lab、Project。  
> 定位：本文件同时承担**教学规范**与**课程内容落地规范**，是仓库课程建设的唯一规范来源。  
> 目标：让学习者从零基础开始，通过“边做、边看、边解释、再抽象”的方式，一路深入到浏览器机制、框架原理、源码、测试、性能、安全、稳定性、工程化和前端架构设计。

---

# 1. 为什么需要这份规范

`learn-frontend-web` 的目标不是只教会 HTML、CSS、JavaScript 或某个框架 API，而是建立一条从零基础到前端架构师的长期能力链。

前端知识类型差异很大：

- HTML / CSS 更依赖 DOM、布局、可访问性和浏览器行为。
- JavaScript 更依赖运行时、Event Loop、内存与语言机制。
- React / Vue 更依赖状态、Render、Effect、Reconciliation、框架调度和工程集成。
- 网络、安全、性能需要 DevTools、抓包、指标和故障实验。
- 工程化、架构与治理需要构建产物、ADR、迁移方案和 Trade-off，而不一定需要“一个 Demo 项目”。

因此，本仓库不强制所有课程采用同一种模板，但所有课程必须遵守同一种学习逻辑。

最终采用三级体系：

```text
Frontend Teaching Standard
│
├── Level 1：Universal Rules
│      所有课程强制遵守
│
├── Level 2：Frontend Lesson Patterns
│      根据知识类型选择教学模式
│
└── Level 3：Module Teaching Contract
       每个 Module 定义自己的实验、工具、项目、源码、故障、性能与验收方式
```

---

# 2. 核心教学思想

统一原则：

> **问题驱动学习，现象建立直觉，动手推动理解；每完成一个关键变化，立即解释对应理论，再逐步深入原理、源码和生产边界。**

更短地说：

> **边做、边看、边解释、再抽象。**

课程不是下面这种结构：

```text
先讲完整理论
↓
展示完整最终源码
↓
学习者照着复制
```

也不是：

```text
一直写代码
↓
课程最后才统一解释为什么
```

而应该形成反复出现的小循环：

```text
当前问题
    ↓
写 / 改一个最小步骤
    ↓
运行 / 操作
    ↓
观察现象
    ↓
用一句人话解释
    ↓
给现象命名
    ↓
解释当前所需理论 / 原理
    ↓
继续下一步
```

这个循环是所有 BUILD、MECHANISM、FAILURE、PERFORMANCE 类课程的核心。

---

# 3. Level 1：所有课程强制遵守的统一原则

## 3.1 一课只解决一个主问题

每个 Knowledge Point 必须有一个唯一主问题。

例如：

```text
为什么 Effect 需要 cleanup？
```

而不是：

```text
useEffect + cleanup + race condition + AbortController + StrictMode + useEffectEvent
```

每课原则上：

```text
1 个核心问题
+
最多 2～3 个必要辅助概念
```

如果一次必须引入过多新术语，应继续拆分 KP。

---

## 3.2 “从 0 到 1”是课程主骨架，不是课后练习

BUILD 类课程必须从空文件或最小可运行状态开始。

禁止 README 只展示 Final Version。

推荐循环：

```text
Step 0：最小状态
Step 1：加入一个能力
Step 2：运行并观察
Step 3：发现问题
Step 4：只修改一个关键点
Step 5：再次验证
Step 6：给变化命名
Step 7：解释当前所需理论 / 原理
Step 8：继续下一轮
```

每个关键 Step 尽量只修改 1～3 个关键点。

复杂改动优先展示 Diff，例如：

```diff
- setCount(count + 1);
+ setCount(current => current + 1);
```

并明确说明：

> 这一步只改变了一件事：更新不再依赖当前 Render 快照中的 `count`，而是让 React 根据队列中的最新状态计算下一值。

---

## 3.3 理论不再固定放在编码之前

旧的固定顺序：

```text
学习目标
→ 理论讲解
→ 动手编码
→ 运行案例
→ 效果验证
```

不再作为强制模板。

理论应尽量由刚刚发生的行为自然引出：

```text
行为 / 代码
    ↓
观察结果
    ↓
一句人话
    ↓
专业术语
    ↓
严谨定义
    ↓
必要原理
```

课程最后可以设置“理论收束”，把各 Step 中已经经历过的现象整理为完整心智模型，但不能依赖“先把全部理论背完”才能开始实验。

---

## 3.4 新概念第一次出现必须解释职责

第一次出现任何新的：

- API
- Hook
- 组件
- 浏览器对象
- 命令
- 配置
- 构建概念
- 协议字段
- DevTools 面板
- 框架内部对象

必须回答：

1. 它是什么。
2. 为什么现在需要它。
3. 谁创建 / 调用 / 管理它。
4. 它和已经学过的东西是什么关系。
5. 本课暂时不需要理解它的哪些高级部分。

例如第一次出现：

```js
hydrateRoot(container, <App />)
```

不能只给代码，而应先说明：

```text
页面里已经有 React 在服务端生成的 HTML。
现在客户端要接管已有 DOM，而不是从空容器重新创建。
hydrateRoot 就是完成这个工作的客户端 Root API。
本课暂时不需要理解 Streaming SSR。
```

---

## 3.5 专业术语统一采用“三层解释法”

### 第一层：一句人话

例如：

> Hydration 可以先理解成：React 给已经存在的服务端 HTML 接上客户端 State、事件和更新能力。

### 第二层：图 / 代码 / 可观察证据

```text
Server HTML
    ↓
页面已经可见
    ↓
hydrateRoot
    ↓
React 接管已有 DOM
    ↓
State / Event / Update 可用
```

### 第三层：准确技术定义

最后再给 React、浏览器、ECMAScript、HTTP 或工具语境中的严谨定义。

禁止用一个陌生抽象概念解释另一个陌生抽象概念。

---

## 3.6 每个抽象概念必须有可观察模型

根据课程类型，至少提供一种真实证据：

```text
DOM Tree
CSSOM
Render Tree
Accessibility Tree
React Tree
Fiber / Component Tree
Call Stack
Task Queue
Microtask Queue
Event Propagation Path
Network Waterfall
Request / Response Headers
HTTP Timing
Performance Timeline
React Profiler
Memory Heap / Snapshot
Bundle Graph
Source Map
Layout / Paint
Hydration Timeline
Server Stream Chunk
Console Warning / Error
测试结果
Benchmark / Web Vitals
```

图和实验必须解释真实关系，例如：

```text
谁创建谁
谁调用谁
谁依赖谁
数据往哪里流
事件怎么走
DOM 在哪里
React Tree 在哪里
状态在哪里保留
浏览器在哪个阶段工作
网络在哪一步发生
```

禁止只放装饰性架构图。

---

## 3.7 每个关键变化必须映射到理论

README 应尽量明确：

| 代码 / 行为变化 | 对应理论 |
| --- | --- |
| `setCount(count + 1)` 改为 updater | State Update Queue |
| 普通更新改为 `startTransition` | Non-urgent Update |
| Effect 增加 cleanup | External Synchronization Lifecycle |
| `createRoot` 改为 `hydrateRoot` | Hydration |
| 普通 children 改为 Portal | React Tree vs DOM Tree |
| 条件卸载改为 `Activity mode="hidden"` | State Preservation |

学习者必须知道：

> “我刚才改的这一步，在理论上叫什么？”

---

## 3.8 每课必须有可验证的 Learning Artifact

不强制每个知识点都创建一个独立“大项目”，但每课必须有验证载体。

前端常见 Learning Artifact：

```text
可运行 HTML / CSS / JavaScript
React / Vue Demo
单元测试
组件测试
E2E 测试
DOM Snapshot
Accessibility Tree
Console 输出
Network 请求 / Header / Waterfall
Performance Record
React Profiler 结果
Memory Snapshot
Bundle Report
Lighthouse / Web Vitals 数据
Hydration Warning
故障复现
安全实验
源码 Debug 记录
架构图
ADR
设计重构
部署配置
```

统一要求：

> **重要理论结论必须能够被某种证据验证，而不是只靠文字相信。**

---

## 3.9 错误用法必须主动展示

课程不能只给最佳实践。

重要模块必须尽量主动展示：

```text
能运行但设计差的写法
常见误区
边界条件
浏览器兼容问题
真实 Warning / Error
性能退化
安全问题
错误优化
生产故障
```

并回答：

```text
为什么它能工作？
为什么仍然有问题？
什么时候暴露？
如何观察 / 证明？
怎么修？
```

---

## 3.10 源码永远不能先于行为模型

SOURCE 类课程统一遵循：

```text
先会使用
↓
理解外部现象
↓
自己猜内部可能怎么实现
↓
画出假想流程
↓
设置断点
↓
Debug
↓
观察核心对象 / 队列 / 状态
↓
整理真实源码模型
↓
讨论设计 Trade-off
```

禁止一上来背 React Fiber、Vue Renderer、Vite、Webpack、TypeScript Compiler 的内部调用链。

---

## 3.11 每课必须明确学习深度

统一使用：

```text
Must
Should
Expert
```

- **Must**：正常前端开发必须掌握。
- **Should**：高级 / 资深前端应该掌握。
- **Expert**：技术专家 / 前端架构师需要掌握。

例如：

```text
useState → Must
Effect Cleanup → Must
useTransition → Should
useSyncExternalStore → Should
renderToPipeableStream → Expert
resumeAndPrerenderToNodeStream → Expert
```

避免所有 KP 看起来权重完全相同。

---

## 3.12 安全课程不得为了“效果”制造无意义危险示例

安全相关课程必须能解释漏洞机制，但实验要控制边界。

例如 `dangerouslySetInnerHTML`：

- 可以展示可信 HTML 与普通文本渲染的差异。
- 必须解释 XSS 风险。
- 不应为了“可视化效果”默认提供直接执行任意不可信 payload 的按钮。
- 需要攻击实验时，应使用明确、隔离、无外部影响的教学场景。

---

# 4. Level 2：Frontend Lesson Patterns

一课选择一个主模式，可以组合 1～2 个辅助模式。

## 4.1 BUILD-LAB：从 0 构建型

适用：

- HTML
- CSS
- JavaScript / TypeScript
- React / Vue
- 表单
- 组件
- Router
- 状态管理
- Node.js / BFF
- 工程 API

标准流程：

```text
小需求
↓
最小实现
↓
增加一个能力
↓
出现问题
↓
只修改关键点
↓
运行 / 验证
↓
理论命名
```

---

## 4.2 BROWSER-MECHANISM-LAB：浏览器机制实验型

适用：

- Event Loop
- DOM / CSSOM
- Render Tree
- Layout / Paint
- Event Propagation
- Storage
- History
- Browser Cache

标准流程：

```text
制造现象
↓
先预测
↓
运行
↓
记录结果
↓
修改一个变量
↓
重新实验
↓
根据结果推导机制
↓
最后形成完整模型
```

---

## 4.3 NETWORK-LAB：网络实验型

适用：

- HTTP
- Cache
- Cookie
- CORS
- SSE
- WebSocket
- Streaming
- HTTP/2 / HTTP/3

证据优先使用：

```text
DevTools Network
curl
Request Header
Response Header
Timing
Waterfall
Cache Status
```

---

## 4.4 FAILURE-LAB：故障驱动型

适用：

- Infinite Render
- Infinite Effect
- Stale Closure
- Race Condition
- Hydration Mismatch
- Memory Leak
- Chunk Load Error
- CORS Error
- 白屏
- Unhandled Promise
- Error Boundary
- 构建 / 发布故障

标准流程：

```text
正常系统
↓
主动制造故障
↓
记录症状
↓
提出可能原因
↓
使用 DevTools / 日志 / Debug 定位
↓
找到根因
↓
修复
↓
再次验证
↓
补防护 / 监控（适用时）
```

---

## 4.5 PERFORMANCE-LAB：性能工程型

适用：

- LCP / INP / CLS / FCP / TTFB
- Long Task
- React Render
- Bundle Size
- Memory
- Network
- Animation
- Large List
- SSR / Streaming 性能

标准流程：

```text
定义指标
↓
建立 Baseline
↓
记录数据
↓
只修改一个变量
↓
再次测试
↓
比较
↓
解释原因
↓
判断是否值得优化
```

所有性能结论尽量使用数据证明。

---

## 4.6 SOURCE-LAB：源码 Debug 型

适用：

- React
- Vue
- Redux
- React Router
- TanStack Query
- Vite
- Webpack
- TypeScript Compiler
- 重要工具链源码

流程：

```text
先会使用
↓
理解表面行为
↓
猜内部实现
↓
设计断点
↓
Debug
↓
记录关键状态
↓
整理调用模型
↓
分析设计 Trade-off
```

禁止机械逐行抄源码。

---

## 4.7 SECURITY-LAB：Web 安全实验型

适用：

- XSS
- CSRF
- CSP
- CORS
- Cookie Security
- DOM XSS
- Prototype Pollution
- Supply Chain Security

重点是：

```text
安全边界
↓
可控实验
↓
真实证据
↓
修复
↓
防御模型
```

---

## 4.8 A11Y-LAB：可访问性实验型

适用：

- HTML Semantics
- Keyboard
- Focus
- ARIA
- Screen Reader
- Contrast
- Accessibility Tree

典型流程：

```text
div onClick
↓
Tab 无法聚焦
↓
Keyboard 无法激活
↓
Accessibility Tree 语义错误
↓
改为 button
↓
再次验证
↓
形成原生语义优先原则
```

---

## 4.9 ARCHITECTURE-LAB：架构 / Trade-off 型

适用：

- 状态架构
- 组件库 / 设计系统
- Monorepo
- 微前端
- SSR 架构
- BFF
- 跨端
- 缓存策略
- 模块边界
- 大型应用演进
- 技术治理

Learning Artifact 可以是：

```text
ADR
架构图
Trade-off 表
迁移方案
重构前后代码
容量模型
故障模型
```

不强制为了“有代码”创建无意义 Demo。

---

## 4.10 PROJECT-LAB：综合项目型

适用：Module / Stage 综合项目。

流程：

```text
需求
↓
约束
↓
架构方案
↓
Milestone 1
↓
功能验证
↓
Milestone 2
↓
测试 / 性能 / 安全 / A11y / 可观测增强
↓
架构演进
↓
最终验收
```

综合项目不能只是“大号 Todo / CRUD”。

---

# 5. 推荐 Lesson / KP README 结构

不是所有课程都必须机械出现全部章节，但默认应尽量覆盖以下顺序。

## 0. 文档目录

知识点 README 必须有可导航目录；短课也至少列出主要章节。

## 1. 课程元信息

推荐包含：

```text
课程类型：BUILD-LAB / FAILURE-LAB / ...
学习深度：Must / Should / Expert
前置课程：上一课或必要知识
本课主问题：一句话
Learning Artifact：代码 / DOM / Network / Profiler / 测试 / ADR ...
本课暂时不用理解：容易干扰当前学习的高级内容
```

## 2. 这节课只需要搞懂什么

最多 3 条，控制认知负担。

## 3. 前置状态

说明：

- 上一课做到哪里。
- 当前代码 / 页面 / 系统是什么状态。
- 本课依赖哪些已学知识。
- 如果是独立实验，明确说明不延续上一课业务代码。

## 4. 本课主问题

问题必须尽量来自：

- 真实需求
- 当前代码缺陷
- 浏览器现象
- 性能现象
- 故障
- 安全边界
- 工程限制
- 架构约束

## 5. 先预测

揭晓答案前，让学习者判断：

```text
你觉得会发生什么？
为什么？
```

## 6. 动手编码 / 实验：从 0 到 1

使用 Step 0、Step 1、Step 2……

每个关键 Step 至少回答：

```text
① 当前状态
② 当前问题
③ 本步目标
④ 修改 / 操作什么
⑤ 为什么这样改
⑥ 代码 / Diff / 命令
⑦ 怎么运行 / 操作
⑧ 应该观察什么
⑨ 实际结果说明
⑩ 对应理论 / 当前所需原理
```

课程的核心节奏应反复体现：

```text
写一点 → 跑一下 → 看现象 → 解释一点 → 再写一点
```

## 7. 图解 / 心智模型

把刚才亲手做过的实验抽象成：

- 关系图
- 时序图
- 数据流图
- DOM / React Tree 图
- Event Loop 图
- Network Waterfall
- Rendering Pipeline
- Bundle / Module Graph
- 架构图

## 8. 理论收束

此时再把各 Step 中已经经历的现象整理为完整定义和模型。

模块索引中该知识点“包含内容”的每一项，都必须在 README 的 Step、图解或理论收束中得到覆盖，不能漏项。

## 9. Wrong Way / 边界

主动展示错误方案、误区、异常条件或不适用场景（适用时）。

## 10. 更深原理

解释为什么刚才的行为会这样，但不要一次跳到学习者尚未建立直觉的高级内部实现。

## 11. Source Dive（仅需要时）

进入源码前必须已经建立行为模型。

## 12. Production Boundary

回答：

```text
生产环境什么时候应该用？
什么时候不该用？
常见故障是什么？
性能 / 安全 / 兼容边界是什么？
有什么替代方案？
```

## 13. 本课只记住 3 件事

最多保留 3 个真正核心结论。

## 14. Challenge

让学习者自己修改 / 测量 / Debug / 设计一个东西，而不是复制答案。

## 15. Mastery Check

按：

```text
Must
Should
Expert
```

进行验收。

## 16. 最终源码与实验说明

README 末尾必须链接实际最终源码，并简要区分：

```text
本节核心代码
实验辅助代码
```

不得再创建“完整源码讲解”章节重复粘贴整份 Final Source。

---

# 6. Step 级教学规范

BUILD / MECHANISM / FAILURE / PERFORMANCE / PROJECT 类课程中的关键 Step 推荐采用：

```text
Step N：标题

① 当前状态
② 当前问题
③ 先预测
④ 这一步只改什么
⑤ 前后 Diff / 代码 / 操作
⑥ 对应理论
⑦ 运行 / 测量 / 观察
⑧ 结果说明
⑨ 下一步为什么继续
```

## 6.1 代码量控制

- 第一次出现的新代码尽量控制在 20～30 行以内。
- 单个 Step 尽量只改 1～3 个关键点。
- 一次需要出现大量代码时，优先拆 Step 或展示关键 Diff。
- 不要为了“步骤多”人为拆碎一个本来不可分割的简单动作。

## 6.2 最终源码与阶段代码

默认不为每课创建独立 `exercise/`、`solution/`。

复杂课程如果最终源码过大、阶段变化本身就是学习重点，可以保留阶段文件 / 阶段目录，但必须由 Module Teaching Contract 明确，并避免无意义复制。

例如：

```text
kpxxx-example/
├── README.md
├── src/
│   ├── step01/
│   ├── step02/
│   └── final/
└── ...
```

简单课程继续只保留实际最终源码，README 通过 Step 和 Diff 表达演进过程。

---

# 7. 核心代码与实验辅助代码

必须明确区分：

```text
本节核心代码：
真正证明当前知识点的实现。

实验辅助代码：
为了展示日志、计时、按钮、状态面板、模拟数据、故障开关而存在。
```

学习者不能把观察工具误认为知识点本身。

例如：

- `useEffect` cleanup 是核心代码。
- 为了显示连接数而更新 `<output>` 是实验辅助代码。

---

# 8. Learning Artifact 领域建议

| 课程领域 | 推荐 Learning Artifact |
| --- | --- |
| HTML | DOM、语义结构、Validator、Accessibility Tree、Keyboard |
| CSS | Computed Style、Box Model、Layout、Paint、视觉对照 |
| JavaScript | Console、断点、Call Stack、Task/Microtask、Memory |
| TypeScript | 编译错误、类型推导、tsc 输出、类型测试 |
| Browser | DevTools、DOM/CSSOM、Performance、Memory、Application |
| HTTP / Network | Network、curl、Header、Waterfall、Cache 状态 |
| React / Vue | 可运行 Demo、DevTools、Profiler、测试、Render 日志 |
| SSR / Hydration | Server HTML、Hydration DOM identity、Mismatch Warning、Stream Chunk |
| Testing | Unit/Component/E2E 测试、失败案例、覆盖关键行为 |
| Performance | Web Vitals、Performance Record、Profiler、Bundle Report |
| Security | 受控漏洞实验、Header、CSP、修复前后证据 |
| A11y | Keyboard、Focus、Accessibility Tree、Screen Reader 记录 |
| Engineering | Build Output、Bundle Graph、CI 结果、发布产物 |
| Architecture | ADR、架构图、Trade-off、迁移计划、重构前后代码 |

---

# 9. Level 3：Module Teaching Contract

每个 Module 开始建设，或已有 Module 继续大规模扩展时，必须在 Module README 中增加“教学契约 / Teaching Contract”。

Module README 的职责统一为：

```text
模块定位
学习顺序 / KP 索引
每个 KP 的“包含内容”
完成状态
Module Teaching Contract
模块项目 / Definition of Done
```

至少回答：

```text
1. 模块主线问题是什么？
2. 采用哪些 Lesson Pattern？
3. 使用哪些观察 / 调试 / 测量工具？
4. 是否维护持续演进案例？
5. 每类课程的 Learning Artifact 是什么？
6. 哪些课程进入源码？
7. 哪些课程制造故障？
8. 哪些课程做性能实验？
9. 哪些课程涉及安全 / A11y？
10. 模块综合项目是什么？
11. Module Definition of Done 是什么？
```

例如 React Module：

```text
主模式：BUILD-LAB
辅助模式：
BROWSER-MECHANISM-LAB
FAILURE-LAB
PERFORMANCE-LAB
SOURCE-LAB
ARCHITECTURE-LAB

主要观察工具：
Console
DOM
React DevTools
Profiler
Network
Performance
Node SSR

典型故障：
Infinite Render
Infinite Effect
Stale Closure
Race Condition
Hydration Mismatch

性能主线：
Expensive Render
Profiler
Transition
Bundle / SSR / Streaming

高级主线：
Suspense
SSR
Streaming
RSC
Framework Integration
```

---

# 10. Lesson Definition of Done

一课只有满足适用项才算完成：

```text
□ 有唯一主问题
□ 明确前置状态
□ 不默认学习者已经理解 Final Source
□ 新 API / 新概念第一次出现有职责解释
□ 有从 0 到 1 或对应实验过程
□ 每个关键 Step 说明为什么改
□ 每个关键 Step 有运行 / 操作 / 测量方法
□ 每个关键 Step 有预期观察和结果解释
□ 理论与刚刚发生的现象有对应关系
□ 关键修改映射对应理论
□ 有 Learning Artifact
□ 抽象概念有可观察模型
□ 有 Wrong Way / 边界案例（适用时）
□ 故障课有真实故障证据（适用时）
□ 性能结论有数据（适用时）
□ 安全课明确攻击面和防护边界（适用时）
□ Source Dive 前已经建立行为模型
□ 有 Production Boundary（适用时）
□ 有“本课只记住 3 件事”
□ 有 Challenge
□ 有 Must / Should / Expert Mastery Check
□ README、实际源码、文件路径、运行命令、预期结果保持一致
□ 模块索引“包含内容”没有遗漏
```

最重要的验收条件：

> **学习者不需要先阅读 Final Source，也可以只按 README / Lab 指引一步一步自己完成并理解本课。**

---

# 11. Module Definition of Done

一个 Module 不以“所有 KP 文件都存在”为唯一完成标准。

完整模块应尽量形成：

```text
为什么存在
↓
基础使用
↓
完整能力
↓
机制 / 原理
↓
错误 / 故障
↓
Debug / 诊断
↓
性能
↓
生产边界
↓
架构 Trade-off
↓
综合项目
```

并能够回答：

1. 为什么需要它？
2. 怎么一步一步使用 / 构建？
3. 底层为什么这样工作？
4. 怎么出错？
5. 怎么定位？
6. 性能边界在哪里？
7. 安全 / 兼容 / A11y 边界是什么？
8. 什么时候不该用？
9. 替代方案是什么？
10. 生产环境怎么设计和演进？

---

# 12. Stage Definition of Done

一个 Stage 不以“所有 README 写完”为完成标准，至少应满足：

```text
□ 所有计划 Module 完成
□ 每个新增 / 深度扩展 Module 有 Teaching Contract
□ 每个 Module 有明确验收闭环
□ Stage 综合项目完成
□ 能把本 Stage 多个 Module 串联
□ 有功能验收
□ 有机制 / 原理验收
□ 有测试 / 工程验收
□ 有故障诊断验收（适用时）
□ 有性能 / 安全 / A11y 验收（适用时）
```

Stage 综合项目不能只是“大号 CRUD”。

---

# 13. 仓库内容生成与目录规范

本节是本仓库所有课程内容的强制落地约束。

## 13.1 KP 与 Module

- 每个基础知识点独立一个目录。
- 知识点目录使用 `kp001-standard-declaration` 形式命名；编号遵循各 Module 已定义前缀，例如 React 使用 `RE-KPxxx`。
- 知识点目录必须包含 `README.md`。
- Module README 必须维护目录、学习顺序、包含内容、完成状态，并在新建或深度扩展时维护 Teaching Contract。
- Module 索引中的“包含内容”必须在知识点 README 中被完整覆盖。

## 13.2 README 与源码一致性

- README 中的代码片段、文件路径、命令、运行方式和预期结果必须与实际源码一致。
- 不能写“应该可以运行”却没有对应源码。
- 不能把实验辅助代码描述成 API / 理论本体。
- README 最后必须链接实际 Final Source。
- 不得设置“完整源码讲解”章节再次复制整份最终源码。

## 13.3 目录与文件

- 源码文件结构由课程需要决定，不限制固定文件数量。
- 目录统一使用小写英文和连字符命名。
- 知识点目录默认不创建独立 `exercise/`、`solution/`。
- 复杂课程是否保留 `step01/step02/final` 等阶段版本，由 Module Teaching Contract 决定。

## 13.4 综合项目

- Module 综合项目统一放在模块的 `projects/` 目录下。
- 项目目录使用 `c01-city-news` 形式命名。
- 项目编号使用 `C01`、`C02`……，不占用 KP 编号。
- 综合项目必须整合多个知识点，并有约束、验收和复盘，不能只是把多个 API 堆在一个 Demo 中。

## 13.5 新增依赖与工具链

- 不因为单个课程方便就随意修改整个 Module 的 React / Vue / Vite / TypeScript / ESLint / Test 工具链。
- 确需新增依赖时，README 必须解释为什么需要、它属于核心能力还是实验工具。
- 能用现有依赖完成的实验优先复用现有工具链。
- Node-only、Browser-only、Framework-only API 必须尊重运行时边界，不能为了统一形式强行塞进错误环境。

---

# 14. 课程作者 / AI 生成课程时的禁止项

以下行为视为不符合规范：

```text
❌ 一上来展示最终源码
❌ 先堆完整理论，再让学习者照着抄
❌ 用抽象概念解释另一个陌生抽象概念
❌ 连续堆叠大量新术语
❌ 默认学习者已经知道新 API / 新工具的职责
❌ README 只解释 Final Version
❌ 代码变化和理论没有映射
❌ API 列表式教学
❌ 每个 Step 一次改太多关键点
❌ 写完很多代码后才统一解释前面所有原因
❌ 源码调用链直接给答案，没有行为模型和 Debug 过程
❌ 只讲正确用法，不展示关键 Wrong Way / 边界
❌ 性能结论没有数据
❌ 故障课程没有真实症状
❌ 安全课程为了效果默认执行不可信输入
❌ 测试只追覆盖率，没有证明课程结论
❌ 架构课为了“有代码”强行创建无意义 Demo
❌ README、源码、命令、预期结果互相不一致
❌ 每课随意切换完全不同业务背景，增加无关认知成本
```

---

# 15. 对已有课程的处理原则

本规范从 v1.0 开始作为所有新增课程和继续建设课程的默认标准。

已有课程**不要求一次性全部推倒重写**。

但以下情况必须逐步升级：

1. Module 后续继续扩展。
2. 课程被确认“理论先行、过于抽象”。
3. README 默认学习者已经理解 Final Source。
4. 机制课缺少可观察实验。
5. 故障课没有真实故障现象。
6. 性能课没有数据。
7. 高级源码课程缺少前置行为模型。
8. README 与实际源码、路径或运行方式明显不一致。

优先升级对后续学习影响最大的领域：

```text
JavaScript Async / Event Loop
React State / Effect
Concurrent Rendering
Suspense
SSR / Hydration / Streaming
Browser Rendering
Network / Cache
Web Security
Performance
```

---

# 16. 最终能力目标

这套课程的目标不是：

```text
看完很多 README
背下很多 API
记住很多框架名称
```

而是让学习者形成：

```text
我知道这个问题为什么出现
        ↓
我亲手制造 / 观察过它
        ↓
我能一步一步把它实现 / 修复 / 验证出来
        ↓
我知道每一步为什么改
        ↓
我知道刚才的行为在理论上叫什么
        ↓
我知道浏览器 / 运行时 / 框架为什么这样工作
        ↓
我能读关键源码
        ↓
我能制造和定位生产问题
        ↓
我能做性能、安全、稳定性分析
        ↓
我知道生产边界和替代方案
        ↓
我能做技术选型与架构演进
```

任何 Lesson、Module、Stage、Project 的设计，都应该服务于这条能力链。

---

# 17. 最终执行原则

当课程设计出现冲突时，按下面优先级判断：

```text
学习者能否一步一步理解并亲手验证
        >
是否符合固定文档模板
        >
是否形式统一
```

因此：

> **不再强制“先理论、后编码”。强制的是：问题清楚、步骤足够小、每一步可观察、每一步及时解释、理论能由证据推出、最终源码和文档完全一致。**

这就是 `learn-frontend-web` 后续课程建设的统一标准。
