# Module 11.01：React 的问题模型与声明式 UI——正式课程

> 详细设计：[../../../../learn-frontend-web-course/stage11-react/module11-01-react-problem-model/README.md](../../../../learn-frontend-web-course/stage11-react/module11-01-react-problem-model/README.md)  
> 所属 Stage：[Stage 11：React 完整体系](../README.md)

---

## 为什么从这里开始

在学习 JSX、State 和 Hook 之前，先回答：

> 浏览器已经可以使用 JavaScript 修改 DOM，React 到底解决了什么问题？

本 Module 先制造一个真实的 DOM 同步错误，再建立 React Root 和组件的关系，最后用同一份状态声明多个 UI 区域。

---

## 第一批课程

| 顺序 | 编号 | 课程 | 核心产出 | 状态 |
|---|---|---|---|---|
| 1 | RE-1101-001 | [手工 DOM 同步为什么会失控](./01-manual-dom-sync-problem/README.md) | 复现状态与 DOM 不一致，并用集中渲染修复 | ✅ |
| 2 | RE-1101-002 | [创建第一个 React 应用](./02-first-react-application/README.md) | 建立 DOM Container、React Root、Component 的关系 | ✅ |
| 3 | RE-1101-003 | [让状态声明 UI](./03-state-declares-ui/README.md) | 使用一份状态驱动计数、进度、状态和按钮 | ✅ |

后续课程将在前三课验收通过后继续交付，不提前创建空目录。

---

## 建议学习顺序

严格按 1 → 2 → 3 学习。

第一课可以直接看到“为什么需要新的 UI 组织模型”；第二课负责把 React 放进浏览器；第三课才使用最小 State 体验声明式更新。

---

## 第一批验收

完成三课后，应能够不看文档回答：

1. 业务状态与 DOM 状态有什么区别？
2. 为什么多个 DOM 同步点容易产生不一致？
3. `index.html` 中的 `#root` 是 React 组件吗？
4. `createRoot` 创建了什么边界？
5. `App()` 的返回值为什么不是最终 DOM 节点？
6. 状态更新后，为什么计数、进度条和按钮可以一起变化？
7. 哪些值应该从 State 派生，而不应该再保存成另一份 State？
8. React 解决了 UI 同步问题后，哪些业务问题仍然需要开发者自己设计？
