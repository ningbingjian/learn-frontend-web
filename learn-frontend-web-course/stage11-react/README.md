# Stage 11：React 完整体系

> 版本：v2.2-draft  
> 基线日期：2026-09-02  
> React 基线：React 19.2.x Stable；正式课程编写时使用当时最新稳定补丁并重新核验官方文档、安全公告和生态兼容性。  
> 上级总纲：[`../README.md`](../README.md)  
> 教学规范：[`../FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md)

---

---

<!-- NAVIGATION:START -->
## 导航目录

- [返回前端课程总纲](../README.md)
- [统一教学与课程编写规范](../FRONTEND_TEACHING_GUIDE.md)
- [1. 阶段定位](#section-1)
- [2. Stage 11 固定结构](#section-2)
- [3. Module 总纲](#section-3)
  - [Module 11.01：React Problem Domain、Project Bootstrap 与 Root Lifecycle](./module11-01-react-foundation/README.md)
  - [Module 11.02：JSX 与 React Object Model](./module11-02-jsx-object-model/README.md)
  - [Module 11.03：Component、Pure Render、Props 与 Composition](./module11-03-component-props-composition/README.md)
  - [Module 11.04：Conditional Rendering、List、Key 与 Identity](./module11-04-conditional-list-key-identity/README.md)
  - [Module 11.05：React Event System](./module11-05-event-system/README.md)
  - [Module 11.06：State Fundamentals、Render Snapshot、Update Queue 与 Batching](./module11-06-state-snapshot-queue-batching/README.md)
  - [Module 11.07：Immutable State 与 Component Identity](./module11-07-immutable-state-identity/README.md)
  - [Module 11.08：State Modeling 与 Ownership](./module11-08-state-modeling-ownership/README.md)
  - [Module 11.09：React Form 完整体系](./module11-09-form/README.md)
  - [Module 11.10：Reducer、Context 与 State Architecture](./module11-10-reducer-context-state-architecture/README.md)
  - [Module 11.11：Ref 与 Imperative Escape Hatches](./module11-11-ref-imperative/README.md)
  - [Module 11.12：Effect 与 External Synchronization](./module11-12-effect-external-sync/README.md)
  - [Module 11.13：Custom Hook 与 External Store Integration](./module11-13-custom-hook-external-store/README.md)
  - [Module 11.14：Router 与 Route Data Architecture](./module11-14-router-route-data/README.md)
  - [Module 11.15：Server State、TanStack Query 与 API Boundary](./module11-15-server-state-query-api/README.md)
  - [Module 11.16：Actions 与 Optimistic Mutations](./module11-16-actions-optimistic/README.md)
  - [Module 11.17：Concurrent React：Transition、Suspense、use 与 Activity](./module11-17-concurrent-suspense-activity/README.md)
  - [Module 11.18：Profiling、Render Performance、Memoization 与 React Compiler](./module11-18-performance-compiler/README.md)
  - [Module 11.19：React DOM 与 Portal](./module11-19-react-dom-portal/README.md)
  - [Module 11.20：Resource Loading 与 Metadata](./module11-20-resource-metadata/README.md)
  - [Module 11.21：React Error Model](./module11-21-error-model/README.md)
  - [Module 11.22：React-specific Accessibility、Security 与 Debugging](./module11-22-a11y-security-debugging/README.md)
  - [Module 11.23：React Testing Integration](./module11-23-testing/README.md)
  - [Module 11.24：SSR、Hydration、Streaming 与 Prerender](./module11-24-ssr-hydration-streaming/README.md)
  - [Module 11.25：RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture](./module11-25-rsc-server-functions-data/README.md)
  - [Module 11.26：React Source Research 与 Fiber Model](./module11-26-source-fiber/README.md)
  - [Module 11.27：Reconciler 与 Render / Commit Pipeline](./module11-27-reconciler-render-commit/README.md)
  - [Module 11.28：Hooks 与 Update Queue Internals](./module11-28-hooks-update-queue-internals/README.md)
  - [Module 11.29：Lane、Scheduler 与 Suspense / Activity Internals](./module11-29-lane-scheduler-suspense-internals/README.md)
  - [Module 11.30：Server Renderer、Hydration 与 RSC Internals](./module11-30-server-renderer-hydration-rsc-internals/README.md)
  - [Module 11.31：React Library 与 Headless Component Architecture](./module11-31-library-headless/README.md)
  - [Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary](./module11-32-large-scale-microfrontend/README.md)
  - [Module 11.33：Legacy React 与 Migration](./module11-33-legacy-migration/README.md)
  - [Module 11.34：React Upgrade Governance](./module11-34-upgrade-governance/README.md)
  - [Module 11.35：React Architecture Review 与最终综合项目](./module11-35-architecture-final/README.md)
- [4. Stage 11 阶段验收](#section-4)
- [5. 文件拆分状态](#section-5)
<!-- NAVIGATION:END -->

---

<a id="section-1"></a>
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

<a id="section-2"></a>
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

---

<a id="section-3"></a>
# 3. Module 总纲

> Stage 11 的详细 Lesson 已按 Module 拆分到独立目录。这里仅保留学习总览；点击 Module 名称进入该 Module 的完整 Lesson 大纲。

| Module | 主题 | Lesson 数 |
| --- | --- | ---: |
| [11.01](./module11-01-react-foundation/README.md) | [React Problem Domain、Project Bootstrap 与 Root Lifecycle](./module11-01-react-foundation/README.md) | 37 |
| [11.02](./module11-02-jsx-object-model/README.md) | [JSX 与 React Object Model](./module11-02-jsx-object-model/README.md) | 20 |
| [11.03](./module11-03-component-props-composition/README.md) | [Component、Pure Render、Props 与 Composition](./module11-03-component-props-composition/README.md) | 22 |
| [11.04](./module11-04-conditional-list-key-identity/README.md) | [Conditional Rendering、List、Key 与 Identity](./module11-04-conditional-list-key-identity/README.md) | 18 |
| [11.05](./module11-05-event-system/README.md) | [React Event System](./module11-05-event-system/README.md) | 18 |
| [11.06](./module11-06-state-snapshot-queue-batching/README.md) | [State Fundamentals、Render Snapshot、Update Queue 与 Batching](./module11-06-state-snapshot-queue-batching/README.md) | 30 |
| [11.07](./module11-07-immutable-state-identity/README.md) | [Immutable State 与 Component Identity](./module11-07-immutable-state-identity/README.md) | 28 |
| [11.08](./module11-08-state-modeling-ownership/README.md) | [State Modeling 与 Ownership](./module11-08-state-modeling-ownership/README.md) | 18 |
| [11.09](./module11-09-form/README.md) | [React Form 完整体系](./module11-09-form/README.md) | 28 |
| [11.10](./module11-10-reducer-context-state-architecture/README.md) | [Reducer、Context 与 State Architecture](./module11-10-reducer-context-state-architecture/README.md) | 55 |
| [11.11](./module11-11-ref-imperative/README.md) | [Ref 与 Imperative Escape Hatches](./module11-11-ref-imperative/README.md) | 27 |
| [11.12](./module11-12-effect-external-sync/README.md) | [Effect 与 External Synchronization](./module11-12-effect-external-sync/README.md) | 55 |
| [11.13](./module11-13-custom-hook-external-store/README.md) | [Custom Hook 与 External Store Integration](./module11-13-custom-hook-external-store/README.md) | 25 |
| [11.14](./module11-14-router-route-data/README.md) | [Router 与 Route Data Architecture](./module11-14-router-route-data/README.md) | 30 |
| [11.15](./module11-15-server-state-query-api/README.md) | [Server State、TanStack Query 与 API Boundary](./module11-15-server-state-query-api/README.md) | 54 |
| [11.16](./module11-16-actions-optimistic/README.md) | [Actions 与 Optimistic Mutations](./module11-16-actions-optimistic/README.md) | 29 |
| [11.17](./module11-17-concurrent-suspense-activity/README.md) | [Concurrent React：Transition、Suspense、use 与 Activity](./module11-17-concurrent-suspense-activity/README.md) | 67 |
| [11.18](./module11-18-performance-compiler/README.md) | [Profiling、Render Performance、Memoization 与 React Compiler](./module11-18-performance-compiler/README.md) | 56 |
| [11.19](./module11-19-react-dom-portal/README.md) | [React DOM 与 Portal](./module11-19-react-dom-portal/README.md) | 20 |
| [11.20](./module11-20-resource-metadata/README.md) | [Resource Loading 与 Metadata](./module11-20-resource-metadata/README.md) | 10 |
| [11.21](./module11-21-error-model/README.md) | [React Error Model](./module11-21-error-model/README.md) | 12 |
| [11.22](./module11-22-a11y-security-debugging/README.md) | [React-specific Accessibility、Security 与 Debugging](./module11-22-a11y-security-debugging/README.md) | 40 |
| [11.23](./module11-23-testing/README.md) | [React Testing Integration](./module11-23-testing/README.md) | 14 |
| [11.24](./module11-24-ssr-hydration-streaming/README.md) | [SSR、Hydration、Streaming 与 Prerender](./module11-24-ssr-hydration-streaming/README.md) | 54 |
| [11.25](./module11-25-rsc-server-functions-data/README.md) | [RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture](./module11-25-rsc-server-functions-data/README.md) | 68 |
| [11.26](./module11-26-source-fiber/README.md) | [React Source Research 与 Fiber Model](./module11-26-source-fiber/README.md) | 26 |
| [11.27](./module11-27-reconciler-render-commit/README.md) | [Reconciler 与 Render / Commit Pipeline](./module11-27-reconciler-render-commit/README.md) | 32 |
| [11.28](./module11-28-hooks-update-queue-internals/README.md) | [Hooks 与 Update Queue Internals](./module11-28-hooks-update-queue-internals/README.md) | 28 |
| [11.29](./module11-29-lane-scheduler-suspense-internals/README.md) | [Lane、Scheduler 与 Suspense / Activity Internals](./module11-29-lane-scheduler-suspense-internals/README.md) | 28 |
| [11.30](./module11-30-server-renderer-hydration-rsc-internals/README.md) | [Server Renderer、Hydration 与 RSC Internals](./module11-30-server-renderer-hydration-rsc-internals/README.md) | 20 |
| [11.31](./module11-31-library-headless/README.md) | [React Library 与 Headless Component Architecture](./module11-31-library-headless/README.md) | 30 |
| [11.32](./module11-32-large-scale-microfrontend/README.md) | [Large-scale React Architecture 与 Microfrontend Boundary](./module11-32-large-scale-microfrontend/README.md) | 28 |
| [11.33](./module11-33-legacy-migration/README.md) | [Legacy React 与 Migration](./module11-33-legacy-migration/README.md) | 32 |
| [11.34](./module11-34-upgrade-governance/README.md) | [React Upgrade Governance](./module11-34-upgrade-governance/README.md) | 12 |
| [11.35](./module11-35-architecture-final/README.md) | [React Architecture Review 与最终综合项目](./module11-35-architecture-final/README.md) | 30 |

---

<a id="section-4"></a>
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

<a id="section-5"></a>
# 5. 文件拆分状态

Stage 11 当前保持三层课程语义：

```text
Stage 11
└── Module 11.01 ～ 11.35
    └── Lesson
```

文件组织调整为：

```text
stage11-react/
├── README.md                       # Stage 总纲 / Module 导航 / 阶段验收
├── module11-01-*/README.md         # Module 11.01 的全部 Lesson
├── module11-02-*/README.md
├── ...
└── module11-35-*/README.md         # Module 11.35 的全部 Lesson
```

这只是文件级拆分，不增加新的课程层级；原有 Lesson、综合项目、源码、性能、故障、迁移与治理内容全部保留。
