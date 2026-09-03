# Module 11.03：Props、Children、Composition 与 API Design

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：🚧 建设中，已交付 3 / 8  
> 前置 Module：[11.02 JSX、Element、Component 与 Render Output](../module11-02-jsx-element-component-render-output/README.md)

---

## 1. Module 要解决的问题

Module 11.02 已经建立：

```text
JSX Source
→ React Element
→ Component Invocation
→ Render Output
→ Host Commit
```

现在继续回答：

> 数据、行为和 UI 结构，应该怎样穿过组件边界，才能形成稳定、可组合、可演进的公共 API？

如果只会“看到什么就加什么 prop”，组件很快会出现：

```text
几十个互相关联的 props
大量 showXxx / enableXxx
调用方不知道哪些组合有效
子组件修改父组件对象
children 被当成数组解析
Shell 硬编码所有业务
Prop Spread 把内部细节泄漏到 DOM
```

本 Module 的核心链路：

```text
Data Input
→ Readonly Props Contract

Primary UI Structure
→ children

Multiple UI Regions
→ Named Slots

Behavior Request
→ Callback Intent

Valid Variants
→ Discriminated Props

Long-term Evolution
→ Explicit Compatibility Boundary
```

---

## 2. Owner Boundary

### 本 Module 完整负责

- JSX attributes 如何形成 Component Props。
- Props 作为只读输入的所有权边界。
- Required / Optional / Default Props。
- 参数解构、显式命名与谨慎 Prop Spread。
- 对象型 props 的 immutable contract。
- `children` 作为 UI 组合槽。
- `ReactNode`、`ReactElement` 与 children opaque structure。
- `Children` API 的有限用途与脆弱边界。
- Primary Slot 与 Named Slots。
- Callback Props 与 Intent-driven API。
- 组件公共 API 的命名、变化轴与职责边界。
- Boolean Explosion 与 Variant Modeling。
- Discriminated Props 表达有效组合。
- Prop Forwarding、Host Props 与兼容演进。
- Composition over hard-coded branching。
- Props / Slots / Callbacks 的 Failure Lab。
- 可复用审查组件 API 的 Module Project 与 Review。

### 本 Module 只预览、不深入

- `useState` 仅用于制造 props 变化；State Snapshot、Update Queue、Batching 归 11.04。
- React Event 对象、事件传播与 Form 归 11.05。
- List / Key / Identity 归 11.06。
- Context 与 Compound Component 状态协作归 11.09。
- Ref Forwarding 与 Imperative Handle 归 11.08。
- Styling / Token / Design System 归 11.17。
- React Library 发布与版本兼容归 11.24。

### 本 Module 不负责

- Router、Server State、Suspense、Effect。
- Fiber / Reconciliation 源码。
- 完整 TypeScript 类型系统；这里只使用 Stage 08 已学类型表达组件契约。

---

## 3. 学习目标

完成本 Module 后，应能够：

1. 解释 Props 是 Component Element 的输入描述。
2. 使用 TypeScript 定义 readonly component contract。
3. 区分 required、optional 与 default values。
4. 解释父组件和子组件的数据所有权。
5. 拒绝直接修改 props 与对象型输入。
6. 使用 children 建立通用视觉包装器。
7. 说明 children 为什么不是普通数组契约。
8. 正确、克制地使用 `Children` API。
9. 使用 Named Slots 表达多个 UI 区域。
10. 设计表达 intent 的 callback props。
11. 识别 Boolean Prop Explosion。
12. 使用 discriminated props 表达有效 variant。
13. 在 ReactNode Slot 与 structured data props 之间取舍。
14. 谨慎处理 prop spreading 与 Host prop forwarding。
15. 为组件 API 增加新能力而不破坏已有调用方。
16. 使用 React DevTools、Elements、TypeScript 和测试证据审查公共 API。

---

## 4. Lesson 规划

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1103-001 | Props 是只读输入契约 | Must | 父子组件的数据所有权怎样表达 | ✅ |
| RE-1103-002 | children 是组合槽，不是特殊数组 | Must | 嵌套 JSX 如何成为可组合 UI 输入 | ✅ |
| RE-1103-003 | Explicit Slots 与稳定布局 API | Must/Should | 一个 children 不够时怎样表达多个区域 | ✅ |
| RE-1103-004 | Callback Props 与 Intent-driven API | Must | 子组件怎样请求父组件改变数据 | ⏳ |
| RE-1103-005 | Variant Props、Boolean Explosion 与 Discriminated Union | Should | 怎样只允许有效的组件形态组合 | ⏳ |
| RE-1103-006 | API Evolution、Prop Forwarding 与兼容边界 | Should | 公共 API 怎样长期演进而不泄漏内部实现 | ⏳ |
| RE-1103-007 | Failure Lab：Prop Mutation、Slot Ambiguity 与 Hidden Coupling | Should | 错误 API 为什么难以 Debug 和演进 | ⏳ |
| RE-1103-008 | Module Project：Composable Release Review Kit | Must/Should | 交付可复用、可验证的组件 API | ⏳ |

---

## 5. 第一批学习链

```text
RE-1103-001
Props = Readonly Input Contract
        ↓
RE-1103-002
children = Primary Composition Slot
        ↓
RE-1103-003
Named ReactNode Props = Explicit UI Regions
```

完成前三课后，应能够写出：

```text
组件读取 Props
≠
组件拥有并修改 Props

children
≠
普通数组契约

Composition
≠
Shell 硬编码所有业务

Explicit Slots
≠
大量 showXxx 开关
```

---

## 6. 第一批实践对象

前三课共同围绕发布审查界面演进：

```text
ReleaseCard
→ Readonly data props

CompositionPanel
→ Caller fills children slot

ReviewShell
→ Caller fills summary / actions / aside / footer / children
```

这不是三个互不相关的 Demo，而是在逐步扩大组件边界：

```text
Data customization
→ Content composition
→ Layout composition
```

---

## 7. Module Project

### 名称

**Composable Release Review Kit**

### 目标

实现一套可复用审查组件：

```text
ReviewShell
ReviewHeader
ReviewSummary
ReviewBody
ReviewAside
ReviewActions
DecisionBanner
```

并为不同业务组合：

```text
发布审批
安全评审
容量评审
回滚评审
```

### 强制交付

- Readonly Props Contract。
- Required / Optional / Default Props。
- Primary children Slot。
- Named Slots。
- Callback Intent。
- Discriminated Variant Props。
- Controlled API 的清晰所有权说明。
- Host Props 白名单或受约束 forwarding。
- Prop Mutation / Slot Ambiguity Failure。
- React DevTools Props 证据。
- TypeScript Expected Error。
- 自动结构验证。
- API Design Report。
- Module Review。

---

## 8. 第一批验收

不看文档回答：

1. Props 与 State 的所有权差异是什么？
2. 为什么对象型 props 也不能修改？
3. optional prop 与 default value 有什么区别？
4. children 从哪里来？
5. ReactNode 与 ReactElement 有什么区别？
6. children 为什么不能默认调用 `.map()`？
7. `Children.count` 是否等于 DOM 节点数？
8. Primary Slot 是什么？
9. Named Slot 解决什么问题？
10. Boolean Props 一定错误吗？
11. 什么情况下 showXxx 开始形成 Explosion？
12. 为什么 Shell 应该只拥有布局而不是具体业务行为？

---

## 9. Definition of Done

- [x] Module Owner Boundary。
- [x] 8 课轻规划。
- [x] RE-1103-001 Props Readonly Input Contract。
- [x] RE-1103-002 children Composition Slot。
- [x] RE-1103-003 Explicit Named Slots。
- [x] 三课完整 README 与独立源码。
- [x] 三课自动 evidence verify。
- [x] Stage 11 CI TypeScript strict + Production Build。
- [ ] RE-1103-004 Callback Props。
- [ ] RE-1103-005 Variant Modeling。
- [ ] RE-1103-006 API Evolution / Prop Forwarding。
- [ ] RE-1103-007 Failure Lab。
- [ ] RE-1103-008 Module Project。
- [ ] API Design Report 与 Module Review。

下一批继续 RE-1103-004 ～ RE-1103-006。
