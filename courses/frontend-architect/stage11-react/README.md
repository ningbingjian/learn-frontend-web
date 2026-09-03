# Stage 11：React 完整体系——正式课程

> 详细设计：[../../../learn-frontend-web-course/stage11-react/README.md](../../../learn-frontend-web-course/stage11-react/README.md)  
> 状态：🚧 正式建设中

---

## Stage 目标

从 React 的问题模型开始，逐步建立组件、状态、Effect、异步 UI、服务端边界、源码、性能、测试和大型架构能力。

课程不采用“先堆 API、以后再补原理”的方式。每个 Owner Module 都会在自己的范围内完成：

```text
问题背景
→ 最小使用
→ 完整能力
→ 错误方式与故障
→ Debug 与验证
→ 底层机制和关键源码
→ 性能、生产边界与 Trade-off
→ Module Project
```

---

## 当前进度

| Module | 状态 | 正式课程 |
|---|---|---|
| 11.01 React 的问题模型与声明式 UI | ✅ 8 / 8 完成，Module Project 与 Review 已交付 | [进入](./module11-01-react-problem-model/README.md) |
| 11.02 JSX、Element、Component 与 Render Output | 下一批：轻规划并开始制作 | — |
| 11.03 Props、Children、Composition 与 API Design | 待建设 | — |
| 11.04 State、Update Queue、Batching 与快照 | 待建设 | — |
| 11.05 Event、Form 与用户输入 | 待建设 | — |
| 11.06 List、Key 与 Identity | 待建设 | — |
| 11.07～11.26 | 边界已在 Stage 总纲确定，暂不创建空目录 | — |

完整 26 个 Module 请查看 [Stage 11 详细设计](../../../learn-frontend-web-course/stage11-react/README.md)。

---

## 已完成的第一条学习链

```text
手工 DOM 同步问题
→ React Root
→ State 声明 UI
→ Component Tree 与 State Owner
→ 整体 / 局部 Root 边界
→ Strict Mode Debug
→ 重复 State / DOM Ownership Failure Lab
→ Release Console Migration
```

Module 11.01 最终项目同时保留 Legacy 与 React 版本，用可复现故障、状态所有权、组件树、更新时序和自动检查证明迁移结果。

---

## 技术基线

当前正式课程使用：

- React 19.2.x。
- TypeScript strict mode。
- Vite 8.x。
- Node.js 22.12+。
- npm。

每个 Lesson 的精确依赖范围以自己目录中的 `package.json` 为准。

---

## 运行约定

React Lesson 通常使用：

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Module Project 还提供：

```bash
npm run verify
```

命令必须在当前 Lesson 目录执行。不要在 Stage 或 Module 根目录安装依赖。

---

## 当前学习入口

从这里开始并按顺序完成八课：

- [Module 11.01：React 的问题模型与声明式 UI](./module11-01-react-problem-model/README.md)

完成 Module 11.01 后，下一步进入 Module 11.02 的轻规划与首批正式课程。
