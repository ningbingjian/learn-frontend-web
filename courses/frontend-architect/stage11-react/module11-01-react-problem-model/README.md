# Module 11.01：React 的问题模型与声明式 UI——正式课程

> 详细设计：[../../../../learn-frontend-web-course/stage11-react/module11-01-react-problem-model/README.md](../../../../learn-frontend-web-course/stage11-react/module11-01-react-problem-model/README.md)  
> 所属 Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：✅ 8 / 8 已完成

---

## 为什么从这里开始

在学习 JSX、State 和 Hook 之前，先回答：

> 浏览器已经可以使用 JavaScript 修改 DOM，React 到底解决了什么问题？

本 Module 从真实 DOM 同步故障开始，逐步建立 React Root、State 声明 UI、Component Tree、状态所有权、局部接入、Strict Mode 调试和迁移方法。

---

## 完整课程

| 顺序 | 编号 | 课程 | 核心产出 | 状态 |
|---|---|---|---|---|
| 1 | RE-1101-001 | [手工 DOM 同步为什么会失控](./01-manual-dom-sync-problem/README.md) | 复现状态与 DOM 不一致，并用集中渲染建立第一版模型 | ✅ |
| 2 | RE-1101-002 | [创建第一个 React 应用](./02-first-react-application/README.md) | 建立 DOM Container、React Root、Component 的关系 | ✅ |
| 3 | RE-1101-003 | [让状态声明 UI](./03-state-declares-ui/README.md) | 使用最小源 State 驱动多个界面区域 | ✅ |
| 4 | RE-1101-004 | [Component Tree 与单向更新流](./04-component-tree-one-way-flow/README.md) | 建立 State Owner、Props Down 与 Callback Intent | ✅ |
| 5 | RE-1101-005 | [整体应用与局部接入边界](./05-whole-app-vs-partial-roots/README.md) | 在遗留宿主页中挂载、隔离和卸载多个 Root | ✅ |
| 6 | RE-1101-006 | [Strict Mode 与第一套 Debug 基线](./06-strict-mode-debug-baseline/README.md) | 区分 Event、Render、Effect、cleanup 与生产运行 | ✅ |
| 7 | RE-1101-007 | [Failure Lab：重复状态与 DOM 逃生](./07-failure-lab-duplicate-state-dom-escape/README.md) | 复现 Derived State Drift 与 DOM 所有权冲突 | ✅ |
| 8 | RE-1101-008 | [Module Project：Release Console Migration](./08-module-project-release-console-migration/README.md) | 完成命令式控制台到 React 的渐进迁移与架构复盘 | ✅ |

---

## 学习顺序

严格按 1 → 8 学习：

```text
制造 DOM 同步故障
→ 建立 React Root
→ 让 State 声明 UI
→ 建立 Component Tree
→ 定义 Root 接入边界
→ 建立 Debug 证据链
→ 主动制造状态与 DOM 所有权故障
→ 完成迁移项目与模块答辩
```

每节课都保存完整独立源码，可以单独安装、运行、调试和构建。

---

## Module 完成标准

完成八课后，应能够不看文档解释：

1. 业务状态、派生值与 DOM 输出有什么区别？
2. React Root 与 DOM Container 的所有权边界在哪里？
3. Component Tree 与 DOM Tree 为什么不是同一个对象？
4. State Owner 如何决定，Callback 为什么没有破坏单向数据流？
5. 多 Root 适合什么迁移场景，有哪些治理成本？
6. Strict Mode 的开发检查与真实用户事件如何区分？
7. 为什么重复 State 和直接改 DOM 会产生一致性故障？
8. 如何用 Before / After、断言、组件树和更新时序证明迁移收益？
9. React 解决了哪些 UI 组织问题，又没有自动解决哪些生产问题？

最终项目入口：

- [RE-1101-008：Release Console Migration](./08-module-project-release-console-migration/README.md)
- [迁移报告](./08-module-project-release-console-migration/MIGRATION_REPORT.md)

---

## 下一 Module

Module 11.02 将深入：

```text
JSX
→ React Element
→ Component 调用
→ Render Output
→ 纯渲染
→ Render / Commit 边界
```

进入下一阶段前，先完成本 Module 的八课验收和迁移项目复盘。
