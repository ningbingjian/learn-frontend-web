# Render Model Inspector — Project Report

## 1. 项目结论

本项目通过一组公开 React API 与浏览器证据，把以下链路落地为可操作系统：

```text
JSX Source
→ Course-level Transform
→ React Element Descriptor
→ Component Invocation
→ Render Output
→ Host Commit
→ Browser DOM
```

项目不试图展示 React 私有 Fiber 字段，也不把开发工具输出伪装成稳定生产 API。

---

## 2. 架构

```text
index.html
├── #root                         React 管理边界
└── #commit-evidence              Host Evidence，不由 React 管理

main.tsx
├── 校验 DOM Container
├── 注册 MutationObserver
├── 提供清理 Commit Log 的 Host Callback
└── createRoot(...).render(...)

App.tsx
├── Scenario Selection State
├── Visible Revision State
├── Render-only Request State
├── Element Inspector
├── Source / Transform Viewer
└── Render Output Preview

model.tsx
├── Scenario Catalog
├── Host / Component / Fragment / Empty Descriptors
├── ReleaseCard / EmptyDecision Components
└── inspectElement(...)
```

---

## 3. 状态模型

项目只保存三类必要 UI State：

```text
scenarioId
revision
renderRequest
```

其中：

- `scenarioId` 决定当前实验场景。
- `revision` 进入可见 Render Output，用于制造 Commit。
- `renderRequest` 不进入 JSX，用于制造 Render-only 对照。

Element Inspection 全部由当前 Scenario 与 Descriptor 派生，不重复保存：

```text
typeKind
typeName
key
propKeys
childrenKind
frozen
```

---

## 4. 场景覆盖

| 场景 | Element Type | Component Call | Render Output | Host DOM |
|---|---|---|---|---|
| Host | string | 无自定义组件调用 | Host Element | section |
| Component | function | ReleaseCard | article Element | article |
| Fragment | Fragment special type | 无业务组件调用 | 多个 sibling | 无额外 wrapper |
| Empty | function | EmptyDecision | null 或 p Element | 条件存在 |

---

## 5. 证据设计

### 5.1 Source / Transform

回答：

```text
源码大致如何成为 Element Factory Call？
```

边界：只是课程级模型，不宣称覆盖具体 Compiler 所有实现细节。

### 5.2 Element Inspector

回答：

```text
当前值是不是 Element？
Element 指向 Host 还是 Component？
它携带哪些 Props / Key / Children？
```

### 5.3 Console

回答：

```text
Component Function 是否参与 Render？
```

边界：不能证明 DOM 一定修改。

### 5.4 React DevTools

回答：

```text
Component Boundary 与当前树结构是什么？
```

### 5.5 Elements

回答：

```text
浏览器最终拥有哪些 Host Node？
```

### 5.6 MutationObserver

回答：

```text
React Root 内是否出现真实 DOM mutation？
```

边界：观察浏览器 mutation，不解释 Fiber、Lane 或 Host Config 内部算法。

---

## 6. Pure Render Review

Component Render 中没有：

- 修改模块级业务集合。
- 修改 React Root 外 DOM。
- 注册 MutationObserver。
- 发请求。
- 设置 State。

`console.log` 仅用于教学观察。生产业务不应依赖日志副作用维持正确性。

MutationObserver 在 `main.tsx` 的 Host 启动边界注册，回调只修改 React Root 外的 Evidence Panel，因此不会与 React 争夺同一节点所有权。

---

## 7. Render-only 实验

操作：

```text
点击“只请求 Render”
```

状态变化：

```text
renderRequest + 1
```

该值不进入 React Output。

预期证据：

```text
Console：出现新的 App / Scenario Render 日志
Commit Evidence：无对应可见 mutation
```

这证明：

```text
Component Execution ≠ Host Mutation
```

---

## 8. Visible Commit 实验

操作：

```text
点击“改变可见 Revision”
```

状态变化：

```text
revision + 1
```

该值进入 Props 或 Host Output。

预期证据：

```text
Console：Render Evidence
MutationObserver：characterData / attributes / childList Evidence
Elements：最终 Host DOM 更新
```

---

## 9. Failure Containment

项目刻意不实现以下错误：

- 在 Inspector 中修改 Element Props。
- 手工调用 Scenario Component 获取输出。
- 读取 `_owner` 等私有字段。
- 在 Render 中把日志 push 到共享数组。
- 用定时器猜测 Commit 完成时间。
- 用 React 同时管理外部 Commit Log。

这些错误已经在 RE-1102-007 作为 Failure Lab 独立复现，最终项目只保留正确实现。

---

## 10. 已知限制

### 10.1 不是 Fiber Inspector

项目无法回答：

- Fiber 节点如何创建和复用。
- Lane 如何选择优先级。
- Work Loop 如何中断。
- Reconciliation 如何构造 Effect Flags。

这些属于 Module 11.22。

### 10.2 不是 DOM Renderer 源码实验

项目无法回答：

- Host Config 如何创建实例。
- `commitUpdate` 如何写属性。
- React Event System 如何委托事件。

这些属于 Module 11.23。

### 10.3 MutationObserver 不是 React Commit Hook

MutationObserver 从浏览器 DOM 层观察结果；它不暴露 React 内部 Commit 子阶段。

### 10.4 Transform 文本是教学模型

不同工具和模式可能输出 `jsx`、`jsxs`、`jsxDEV` 或其他实现形式。

---

## 11. 生产意义

Render Model 清晰后，可以更快定位：

- 组件为什么没有出现在 DevTools。
- 小写标签为什么变成陌生 DOM。
- 为什么组件函数执行多次但页面不闪动。
- 为什么 Fragment 没有对应 DOM Wrapper。
- 为什么组件返回 null 但仍然执行。
- 为什么 Element mutation 与手工调用组件不可维护。
- 为什么性能分析不能只数 Render 日志。

---

## 12. 验收结果

项目完成以下交付：

```text
[完成] 4 个 Scenario
[完成] Source / Transform Viewer
[完成] Element Inspector
[完成] Render Console Evidence
[完成] Root 外 Commit Evidence
[完成] Render-only / Visible Commit 对照
[完成] Strict TypeScript
[完成] Production Build
[完成] 自动结构验证
[完成] Module Review
```
