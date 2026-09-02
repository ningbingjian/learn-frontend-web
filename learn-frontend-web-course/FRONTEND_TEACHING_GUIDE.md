# Learn Frontend Web 统一教学与课程编写规范

> 版本：v2.0  
> 基线日期：2026-09-02  
> 适用范围：`learn-frontend-web` 全部 Stage、Module、Knowledge Point / Lesson、Lab、Project。  
> 定位：本文件是正式课程内容的**统一教学规范与课程编写规范**，是后续课程建设的强制规则来源。

---

# 1. 最终目标

`learn-frontend-web` 不是 API 笔记、框架速成教程或面试八股合集。

目标是让学习者从零基础一路成长到极其资深的前端工程师 / 前端架构师，并真正形成下面的能力链：

```text
会跟着做
    ↓
能独立复刻
    ↓
能解释现象
    ↓
能处理边界和故障
    ↓
能 Debug 和测量
    ↓
能理解底层机制
    ↓
能阅读关键源码
    ↓
能做性能 / 安全 / 可靠性分析
    ↓
能做技术选型和架构演进
    ↓
能建设平台、标准和治理机制
```

整个教学过程必须做到：

> **像老师坐在学习者旁边一样，明确告诉他现在做什么、在哪个目录做、操作哪个文件、代码写在哪里、为什么这样写、什么时候运行、应该看到什么，以及这个现象在理论上叫什么。**

---

# 2. 五条最高优先级规则

这五条高于文档形式、篇幅、目录整齐度和作者个人习惯。

## 2.1 一个 Module，一次学透

一个知识主题只能有一个主教学 Module。

该 Module 必须在计划范围内从基础一路讲到资深 / 专家深度，形成完整闭环：

```text
为什么存在
    ↓
基础概念
    ↓
最小可运行使用
    ↓
完整能力
    ↓
工程实践
    ↓
高级特性与边界
    ↓
Wrong Way / Failure
    ↓
Debug / 诊断
    ↓
底层机制 / 原理
    ↓
核心源码（适用时）
    ↓
性能 / 安全 / 兼容 / A11Y（适用时）
    ↓
Production Boundary
    ↓
替代方案 / Trade-off / 架构
    ↓
Module Project / Review
```

禁止：

```text
先讲 React State 基础
以后再建 React State 高级篇
再以后建 React State 原理篇
最后再建 React State 源码篇
```

复杂 Module 可以拆很多 Lesson / KP，但必须在同一个 Module 内把主题一次讲透。

后续课程只能使用、引用或组合应用该能力，不能靠同名“高级篇 / 源码篇 / 性能篇”补前面的缺口。

## 2.2 每一课必须可复刻

任何需要代码、命令、浏览器操作或实验的 Lesson，只允许两种起点：

### A. 当前课从零状态建立

```text
空目录 / 最小空项目
    ↓
README 从头创建
    ↓
得到本课完整最终源码
```

### B. 明确复制上一课源码继续演进

确实需要连续上下文时，必须有：

```text
Step 0：准备本课起始项目
```

至少写清：

1. 来源 Lesson 名称和路径。
2. 复制哪个完整目录。
3. 复制到当前课的哪个目录。
4. 复制后的目录结构。
5. 是否重新安装依赖。
6. 在哪个目录执行什么命令。
7. 复制后的基线页面 / Console / Network 应该是什么。
8. 本课预计新增、修改、删除哪些文件。

禁止只写：

> “在上一课基础上继续。”

然后直接开始改代码。

## 2.3 每一课最终源码必须独立运行

即使当前课来源于上一课复制，当前 Lesson 最终也必须保存一份完整可运行源码。

学习者进入当前 Lesson 后，可以根据 README 独立完成：

```text
安装依赖
启动
构建
测试
验证
```

禁止运行时依赖上一课源码路径、上一课 Dev Server 或作者本地特殊环境。

## 2.4 禁止默认学生懂了

以下理由都不能用于省略当前课程真正需要的信息：

```text
“上一课讲过”
“这个很简单”
“属于常识”
“前端应该都知道”
“IDE 会提示”
“照 Final Source 看就懂”
“这个命令大家都会”
```

课程作者统一假设学习者：

```text
第一次接触当前知识点
第一次打开当前课程项目
不记得上一课源码的具体细节
不会主动猜作者省略的操作
```

允许声明已经学过的理论前置，但**当前项目中的准备工作、文件关系和实际操作不能省略**。

## 2.5 所有关键操作必须精确到文件与位置

教学步骤必须尽量写清：

```text
完整文件路径
→ 创建 / 修改 / 删除
→ 找到哪个函数 / 组件 / 配置块 / CSS 规则
→ 在上面 / 下面 / 内部增加什么
→ 或替换哪个完整代码片段
→ 增加哪些 import / dependency / script
→ 为什么修改这里
→ 修改后当前状态
```

高级课程同样保留这条规则。

独立思考通过 `Challenge / Project / Architecture Exercise` 训练，而不是通过 README 故意缺步骤训练。

---

# 3. 核心教学思想：范围做减法，解释做加法

## 3.1 最小充分项目

> **用能够完整证明当前知识点的最小项目教学。**

增加任何组件、页面、Store、Route、Mock、依赖、配置和辅助工具前都先问：

```text
如果删除它，
当前知识点还能不能被完整实现、观察、解释和验证？
```

如果可以，默认删除。

深度不能通过以下指标证明：

```text
README 行数
代码行数
组件数量
目录数量
依赖数量
Step 数量
框架数量
API 数量
```

## 3.2 核心知识必须解释完整

项目可以小，但本课声明的主问题必须形成闭环：

```text
为什么需要
↓
是什么
↓
当前项目哪里需要
↓
具体在哪里写
↓
为什么这样写
↓
什么时候运行
↓
运行看到什么
↓
为什么出现
↓
理论上叫什么
↓
与其他对象是什么关系
```

适合深入时继续：

```text
错误使用会怎样
边界在哪里
底层机制是什么
源码如何体现
性能成本是什么
生产如何治理
```

统一记忆：

> **范围做减法，解释做加法。**

---

# 4. Must / Should / Expert 深度标签

每个 Module / Lesson 可以标记：

- **Must**：正常前端开发必须掌握。要求会正确使用、理解基础心智模型、处理最常见错误。
- **Should**：高级 / 资深前端应该掌握。要求能处理复杂场景、边界、故障、调试、性能和工程问题。
- **Expert**：技术专家 / 前端架构师需要掌握。要求理解底层机制、关键源码、系统级性能 / 安全 / 架构取舍和治理。

例如 React Effect：

```text
Must
→ 依赖、cleanup、取消请求、什么时候不需要 Effect

Should
→ stale closure、race condition、StrictMode、Layout Effect、外部系统同步边界

Expert
→ Render/Commit、Passive Effect、Fiber Effect 模型、源码 Debug、Effect-heavy Architecture 治理
```

重要约束：

> **Must / Should / Expert 不是“讲 / 不讲”的开关。**

对于本课程中被定义为完整主教学 Module 的主题，最终计划范围内的三层深度都必须完成。

标签的作用只是帮助学习者知道当前所处深度。

---

# 5. 课程基本单位

## 5.1 Lesson / Knowledge Point

一个 Lesson 解决一个可以单独提出、单独操作、单独验证的主问题。

例如：

```text
React 列表为什么不能随便使用 index 作为 key？
```

原则上：

```text
1 个主问题
+
为解决它必须出现的少量辅助概念
```

## 5.2 Module

Module 是“一个知识主题一次学透”的单位。

Module README 至少负责：

```text
模块为什么存在
模块边界
学习顺序
Lesson / KP 索引
Must / Should / Expert 分布
机制 / 故障 / 性能 / 源码分布
Module Project
Definition of Done
```

## 5.3 Stage

Stage 组合多个已经形成闭环的 Module，完成一个更大的能力阶段和综合项目。

Stage 不是把大量无关高级名词塞在一起的容器。

## 5.4 Project

Project 用来组合能力，不替代知识教学。

大型项目可以不给逐行答案，但必须明确：

- 需求；
- 约束；
- 起始状态；
- Milestone；
- 运行方式；
- 验收标准；
- 故障和非功能要求。

---

# 6. Lesson 起始状态规范

每个 Lesson README 必须有明确的“起始状态”章节。

## 6.1 独立 Lesson

写清：

```text
本课不继承上一课业务源码。
本课从一个新的最小项目开始。
```

然后从创建目录和必要文件开始。

## 6.2 连续演进 Lesson

必须首先执行：

```text
Step 0：复制并验证上一课基线
```

推荐结构：

```text
来源课程：RE-KP006
来源目录：...
当前课程目录：...

复制方式：...

复制完成后的目录树：...

进入目录：...
安装依赖：...
启动：...

你现在应该看到：...

这个基线说明：...

本课将在这个基线上：
- 修改 ...
- 新增 ...
- 删除 ...
```

如果仓库中的当前 Lesson 已经包含最终源码，README 仍然必须从复制起点讲解，不能要求学习者直接阅读最终源码倒推过程。

---

# 7. Step Contract：每一步怎么写

一个 Step 只建立一个新的主要因果关系。

正确例子：

```text
加入 state，让按钮点击后数字发生变化
加入错误 key，观察组件状态错位
增加 AbortController，取消上一轮请求
加入 Suspense Boundary，观察 fallback 显示
```

错误例子：

```text
Step 3：完成 Redux + Router + Query + Form + 权限
```

也不要拆成纯语法碎片：

```text
Step 1：增加 import
Step 2：增加一个 const
Step 3：增加一个分号
```

一个合格 Step 应产生一个学习者能够说清楚的新状态或新因果关系。

## 7.1 每个关键 Step 至少包含

### ① 当前状态

现在项目是什么状态，已经能做什么。

### ② 当前问题

为什么需要继续改。

### ③ 本步目标

这一步只解决什么。

### ④ 操作对象

必须写完整路径，并写清创建 / 修改 / 删除。

### ⑤ 精确定位

修改已有文件时写清：

```text
找到哪个函数 / JSX / CSS Rule / 配置块
在它的什么位置修改
替换哪一段
```

### ⑥ 本步骤代码 / Diff

本步骤必须输入的关键代码不能使用 `...` 省略。

### ⑦ 为什么这样写

解释职责和因果关系，不机械解释每个标点。

### ⑧ 当前能否运行

明确：

```text
现在可以运行
```

或者：

```text
现在暂时不能运行，因为还缺少 ...；下一步完成后第一次运行。
```

### ⑨ 到可运行状态立即运行

写清：

```text
在哪个目录
执行什么命令
打开哪个 URL / DevTools 面板
做什么操作
```

### ⑩ 预期观察

例如：

```text
页面显示什么
Console 输出什么
Network 出现什么请求
DOM 发生什么变化
Profiler / Trace 出现什么
测试应该通过还是失败
```

### ⑪ 结果解释

说明：

```text
为什么发生
证明了什么
理论上叫什么
```

### ⑫ 下一步为什么继续

让学习链保持因果连续。

---

# 8. 到可运行状态立即运行

课程不能长时间堆代码，到最后才第一次运行。

推荐节奏：

```text
最小可运行状态
↓
运行
↓
增加一个关系
↓
再运行
↓
观察变化
↓
解释
↓
继续
```

Failure Lab：

```text
正常基线
↓
只改变一个故障条件
↓
运行
↓
记录症状
↓
定位
↓
修复
↓
回归
```

Performance Lab：

```text
定义指标
↓
建立基线
↓
只改变一个变量
↓
重新测量
↓
比较
↓
解释
```

---

# 9. 新概念第一次出现必须讲职责

第一次出现任何新的：

- API；
- Hook；
- Component；
- Browser Object；
- Command；
- Config；
- Build Concept；
- Protocol Field；
- DevTools Panel；
- Framework Internal Object；
- Architecture Term；

至少回答：

1. 它是什么。
2. 为什么当前步骤需要它。
3. 谁创建 / 调用 / 管理它。
4. 它与已经出现的对象什么关系。
5. 当前先理解到哪里。

禁止只贴：

```tsx
hydrateRoot(container, <App />)
```

而不解释 `hydrateRoot` 为什么此时出现。

---

# 10. 理论解释规范

统一顺序：

```text
代码 / 操作
↓
真实现象
↓
一句人话
↓
专业术语
↓
准确定义
↓
当前必要原理
↓
更深机制 / 源码（适用时）
```

## 10.1 三层解释法

### 第一层：人话

先让第一次接触的人知道“它到底在干什么”。

### 第二层：当前项目的可观察关系

通过代码、DOM、Network、Profiler、Trace、测试、调用栈等说明真实关系。

### 第三层：准确技术定义

最后进入规范、运行时、框架、协议或源码语境。

禁止用一个陌生抽象概念解释另一个陌生抽象概念。

## 10.2 即时理论 + 末尾收束

Step 内及时解释当前刚刚发生的现象；课程末尾再整理完整心智模型。

不允许一直编码几十分钟，最后一次性补解释。

---

# 11. Learning Artifact 与证据优先

重要结论必须有可观察证据。

前端常见证据：

```text
DOM Tree
Accessibility Tree
Computed Style
Layout / Paint
Console
断点 / Call Stack
Task / Microtask 顺序
Network Request / Response / Header / Timing
HAR
Application Storage
Service Worker 状态
Performance Trace
Memory Heap Snapshot
React Profiler
Vue Devtools
Bundle / Module Graph
Source Map
Hydration Warning
测试结果
Benchmark
Web Vitals
CSP Report
架构图 / ADR / RFC
```

文字不能代替证据。

证据也不能为了“显得专业”无限增加辅助设施；证据必须服务当前主问题。

---

# 12. 不同 Lesson Pattern

所有模式都遵循：

```text
最小充分范围
+
手把手可复刻
+
真实证据
+
及时理论
```

## 12.1 BUILD-LAB

适用 HTML/CSS/JS/TS/React/Vue/组件/表单/Router/Node/BFF 等。

```text
准备最小项目
↓
增加一个能力
↓
运行
↓
观察
↓
解释
↓
继续
```

## 12.2 BROWSER-MECHANISM-LAB

适用 DOM、CSSOM、Render、Event Loop、Storage、History、Worker 等。

```text
建立最小实验
↓
预测
↓
运行
↓
记录
↓
只改变一个变量
↓
再次运行
↓
推导机制
```

## 12.3 NETWORK-LAB

首选：

```text
DevTools Network
curl
Header
Timing
Waterfall
Cache 状态
```

## 12.4 FAILURE-LAB

```text
正常基线
↓
一个故障条件
↓
症状
↓
假设
↓
证据
↓
根因
↓
修复
↓
回归
↓
防护 / 监控
```

## 12.5 PERFORMANCE-LAB

至少包含：

```text
环境
指标
基线
单变量修改
多轮数据
Profiler / Trace / RUM 等证据
结论边界
```

## 12.6 SOURCE-LAB

源码课必须先有最小、独立、可运行触发项目。

流程：

```text
先会用
↓
观察外部行为
↓
提出内部实现假设
↓
确定源码版本 / Commit
↓
设计断点
↓
运行触发项目
↓
观察关键对象 / 变量 / 调用栈
↓
得到真实调用模型
↓
分析 Trade-off
```

源码课至少写清：

- 源码仓库和版本 / Commit；
- 触发入口；
- 断点类 / 文件 / 函数；
- 关键变量；
- 调用栈；
- 下一断点；
- 最终验证结论。

禁止机械逐行抄源码。

## 12.7 SECURITY-LAB

受控环境中完成：

```text
信任边界
↓
漏洞 / 风险现象
↓
证据
↓
修复
↓
防御模型
↓
自动验证
```

## 12.8 A11Y-LAB

至少关注：

```text
Keyboard
Focus
Semantic
ARIA
Accessibility Tree
Screen Reader（适用时）
```

## 12.9 ARCHITECTURE-LAB

通过最小但足够真实的案例完成：

```text
问题
约束
选项
Trade-off
决策
验证
失败模型
迁移 / 退出策略
```

产物可以是 ADR、RFC、C4、时序图、容量模型、迁移方案，不为了“有代码”强行制造无意义 Demo。

## 12.10 PROJECT-LAB

项目比单课更大，但仍必须从自己的零状态或明确基线介绍：

```text
需求
约束
起始结构
Milestone
每阶段运行
测试
性能 / 安全 / A11Y / 可靠性
最终验收
复盘
```

---

# 13. Lesson README 默认结构

```text
0. 课程信息
1. 本课最终要做出什么
2. 本课解决什么问题
3. 前置知识与本课边界
4. 本课项目 / 实验介绍
5. 起始状态
6. 最终会有哪些文件
7. Step 0：从零创建或复制上一课基线
8. Step 1～N：手把手搭建 / 实验
9. 完整运行与验收
10. 图解 / 执行流程 / 心智模型
11. 理论收束
12. Wrong Way / 故障与排查
13. 更深原理
14. Source Dive（适用时）
15. Performance / Security / A11Y（适用时）
16. Production Boundary
17. 本课只记住 3 件事
18. Challenge
19. Mastery Check
20. 最终源码与实验说明
```

不是每课机械填满所有章节，但本课需要的教学闭环不能缺失。

---

# 14. “最终会有哪些文件”规范

正式编码前，应先预览最终会创建的核心文件和职责，例如：

```text
src/
├── App.tsx              # 页面入口
├── components/
│   └── UserList.tsx     # 当前知识点主要发生位置
└── api/
    └── users.ts         # 实验用数据访问
```

目录树只是预览。

后续 Step 仍必须逐个告诉学习者如何创建 / 修改，不能因为前面展示了目录树就省略实际操作。

---

# 15. 核心代码与实验辅助代码

README 必须区分：

```text
本课核心代码
→ 直接证明当前知识点

实验辅助代码
→ 为了日志、计时、模拟数据、故障开关、状态面板、测试存在
```

辅助代码不能盖过知识点本体。

---

# 16. Challenge 与教学步骤的边界

## 16.1 正式 Lesson

必须手把手、可复刻，不让学生猜作者省略的信息。

## 16.2 Challenge

用于训练独立能力，可以只给：

```text
需求
限制
验收
```

不给逐步答案。

## 16.3 Stage / Architecture Project

随着能力提高，可以减少实现答案，但仍必须提供完整需求、上下文、运行环境、接口、约束和验收。

> **教学清楚和挑战独立是两个不同目标，不能通过把教学文档写得含糊来训练独立能力。**

---

# 17. Module Teaching Contract

每个 Module 建设前必须定义 Teaching Contract，至少回答：

1. 这个 Module 的唯一主题是什么？
2. 为什么它必须现在学？
3. 它与其他 Module 的边界在哪里？
4. 哪些内容是 Must？
5. 哪些内容是 Should？
6. 哪些内容是 Expert？
7. 如何保证这个 Module 一次学透，不需要未来同名补课？
8. Lesson 哪些从零开始？
9. 哪些 Lesson 需要复制上一课演进？
10. 连续 Lesson 的复制链如何设计？
11. 使用哪些 DevTools / 测量 / Debug 工具？
12. 哪些课制造故障？
13. 哪些课做性能实验？
14. 哪些课进入源码？
15. 哪些课涉及安全 / A11Y / 兼容？
16. Module Project 是什么？
17. Module 完成后以后课程只会怎样引用它？
18. Module Definition of Done 是什么？

---

# 18. Lesson Definition of Done

一课完成至少满足适用项：

```text
□ 有唯一主问题
□ 明确 Must / Should / Expert 深度位置
□ 明确当前 Lesson 是零状态还是复制上一课演进
□ 如果演进，写清来源路径、复制方法和基线验证
□ 当前 Lesson 最终源码独立可运行
□ 不运行时依赖上一课源码或 Dev Server
□ 第一次打开当前课也能理解当前项目
□ 新 API / 新概念第一次出现有职责解释
□ 展示最终会创建哪些核心文件及职责
□ 每个新文件写明完整路径
□ 修改已有文件写明精确位置
□ 本步骤必须输入的代码不使用 ... 省略
□ 每个关键代码块解释为什么这样写
□ Step 小而完整，每次主要建立一个因果关系
□ 每一步明确当前能否运行
□ 到可运行状态立即运行
□ 每个运行点写清目录、命令、操作和 URL / 面板
□ 每个运行点有预期观察
□ 每个结果解释为什么出现、证明什么
□ 理论紧跟刚刚发生的现象
□ 抽象概念有真实可观察模型
□ 有 Wrong Way / 边界案例（适用时）
□ 故障课有正常基线、症状、根因、修复和回归
□ 性能课有基线、单变量、数据和结论边界
□ 安全课有受控边界和修复验证
□ Source Dive 前有行为模型和明确源码版本
□ 有 Production Boundary（适用时）
□ 有“本课只记住 3 件事”
□ 有 Challenge
□ 有 Mastery Check
□ README、源码、路径、命令、预期结果一致
□ 最终源码可以从干净环境安装、运行和测试
```

最高标准：

> **一名第一次打开当前 Lesson、没有阅读 Final Source、也不记得上一课具体代码的学习者，只阅读当前 README，就能准备正确起始项目、完成全部修改、独立运行和验证，并理解每一步为什么这么做。**

---

# 19. Module Definition of Done

一个 Module 不以“Lesson 文件都存在”为完成标准。

必须形成：

```text
为什么存在
↓
基础使用
↓
完整能力
↓
高级场景
↓
机制 / 原理
↓
Wrong Way / Failure
↓
Debug
↓
性能 / 安全 / A11Y / 兼容（适用时）
↓
源码（适用时）
↓
Production Boundary
↓
Trade-off / 架构
↓
综合实战
```

并能回答：

1. 为什么需要？
2. 怎么从零完成？
3. 完整能力是什么？
4. 底层为什么这样工作？
5. 怎么出错？
6. 怎么定位？
7. 性能 / 安全边界在哪里？
8. 什么时候不应该用？
9. 替代方案是什么？
10. 生产环境怎么设计和演进？
11. 是否已经完整到未来不再需要同名高级 / 源码补课？

---

# 20. Stage Definition of Done

Stage 至少满足：

```text
□ 所有计划 Module 达到自己的 Definition of Done
□ 每个知识主题有明确 Owner Module
□ 没有把高级 / 源码知识拆到未来同名模块
□ Stage Project 可以独立从其起点复刻
□ 项目能组合多个 Module
□ 有功能验收
□ 有机制 / 原理验收
□ 有故障诊断验收
□ 有测试 / 工程验收
□ 有性能 / 安全 / A11Y / 可靠性验收（适用时）
□ 有设计 / 复盘 / 答辩
```

Stage 数量和 Module 数量不为了形式整齐强行固定。

---

# 21. 提交前必须执行三重审查

## 21.1 Scope Review：做减法

逐项检查：

```text
这个组件能删吗？
这个业务类能删吗？
这个依赖能删吗？
这个配置能删吗？
这个 Step 能删吗？
这个辅助场景能删吗？
```

删除后仍能完整证明主问题，则删除。

## 21.2 Depth Review：做加法

逐项检查本课核心知识：

```text
为什么需要？
是什么？
在哪里写？
为什么写这里？
谁创建 / 调用 / 管理？
为什么产生这个结果？
专业上叫什么？
边界是什么？
错误会怎样？
当前深度是否足够？
```

有一项无法回答，就补讲解。

## 21.3 Evidence Review：查证据

逐项检查：

```text
核心结论在哪里被运行 / DevTools / 测试 / Trace / 源码证明？
```

没有证据的关键结论不能仅靠文字宣称。

---

# 22. 从空目录重新跟做

课程提交前，作者 / AI 必须：

1. 不先阅读最终源码。
2. 按 README 从空目录开始，或严格执行 README 声明的上一课复制步骤。
3. 逐步创建和修改。
4. 执行所有声明的运行点。
5. 核对页面、Console、Network、测试和其他证据。
6. 确保 README 中没有依赖作者脑中“默认知识”的跳步。

---

# 23. 课程内容禁止项

```text
❌ 一上来展示 Final Source 要学生自己看懂
❌ 默认上一课代码学生记得很清楚
❌ 只写“基于上一课继续”却不给复制和基线步骤
❌ 当前 Lesson 最终源码必须引用上一课目录
❌ 因为操作简单就不告诉文件路径和位置
❌ 因为是高级课就故意省略关键施工步骤
❌ 用“这是常识”省略当前必须操作
❌ 连续堆大量新术语
❌ API 列表式教学
❌ 一个 Step 改多个不相关机制
❌ Step 拆成没有新因果关系的语法碎片
❌ 一直写到最后才第一次运行
❌ 写完大量代码后才统一解释原因
❌ 新 API 第一次出现不解释职责
❌ 只讲正确用法，不展示关键 Wrong Way / Failure
❌ 性能结论没有基线和数据
❌ 故障课没有真实症状和回归
❌ Source Dive 没有最小触发项目和明确源码版本
❌ 架构课只有图，没有约束、取舍、失败和退出策略
❌ 以后再开同名“高级篇 / 原理篇 / 源码篇”弥补 Module 没讲透
❌ README、源码、路径、命令和预期结果不一致
```

---

# 24. 课程目录原则

知识点目录可以使用稳定编号，例如：

```text
kp001-...
kp002-...
```

每个需要源码的 Lesson 目录必须保存当前 Lesson 的完整最终成果。

连续课程可以在生成当前 Lesson 时从上一课复制，但**提交到仓库后，当前 Lesson 必须自己完整存在**。

简单课默认不需要同时维护 `exercise/`、`solution/` 两套重复源码。

README 是施工教程；课程目录中的源码是最终核对、测试和排障成果。

---

# 25. 不同领域的首选证据

| 领域 | 首选证据 |
| --- | --- |
| HTML | DOM、Validator、Accessibility Tree、Keyboard |
| CSS | Computed、Box Model、Layout、Paint、视觉对照 |
| JavaScript | Console、断点、Call Stack、Task/Microtask、Memory |
| TypeScript | 编译错误、类型推导、tsc、类型测试 |
| Browser | Performance、Memory、Application、Rendering、Process/Trace（适用时） |
| Network | curl、Network、Header、Waterfall、Cache、HAR |
| React / Vue | 可运行 Demo、DevTools、Profiler、测试、源码断点 |
| SSR / Hydration | Server HTML、Stream、Hydration Warning、DOM identity |
| Testing | Unit / Component / E2E、Trace、失败样本 |
| Performance | Web Vitals、Trace、Profiler、Bundle、RUM |
| Security | 受控漏洞实验、Header、CSP Report、修复验证 |
| A11Y | Keyboard、Focus、Accessibility Tree、Screen Reader |
| Engineering | Build Output、Module Graph、CI、Artifact |
| Architecture | ADR、RFC、C4、时序、容量、故障、迁移 |
| Platform | 用户路径、采用率、升级率、SLO、支持成本 |
| AI | Tool Trace、Evals、Approval、成本、时延、安全测试 |

---

# 26. 最终执行公式

```text
确定 Module 唯一主题
↓
规划 Must / Should / Expert 完整闭环
↓
拆成一个个独立主问题
↓
每课先决定：零状态 or 复制上一课
↓
删到最小充分项目
↓
明确文件、位置和操作
↓
一次建立一个主要因果关系
↓
到可运行状态立即运行
↓
观察真实证据
↓
及时解释为什么
↓
给现象准确命名
↓
适用时制造故障 / Debug / 性能 / 源码实验
↓
完成 Production Boundary 和 Trade-off
↓
保证当前课源码独立可运行
↓
完成 Module 后不再开同名补课
↓
Scope / Depth / Evidence 三重审查
↓
从空目录或复制基线重新跟做
```

最终追求的不是“写得多”，而是：

```text
范围足够准
项目足够小
步骤足够清楚
文件位置足够明确
解释足够深
证据足够真
源码能够独立运行
Module 真正一次学透
```
