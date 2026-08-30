# Chapter 12：Effect 基础心智模型

> [返回 React 模块索引](../README.md)

本 Chapter 建立 `useEffect` 的正确心智模型：Effect 不是“Render 结束后随便执行代码”的容器，而是让 React 与外部系统保持同步的 Escape Hatch。学习顺序从 Render / Event / Effect 的职责边界开始，再进入依赖、Reactive Value、Cleanup、Effect 生命周期以及 StrictMode 的开发期压力测试。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP111 | useEffect 的真正用途：同步外部系统 | 1. External System 2. Synchronization 3. Commit 后执行 | [文档](./kp111-useeffect-sync-external-system/README.md) · [源码](./kp111-useeffect-sync-external-system/src/main.jsx) | 已完成 |
| RE-KP112 | Effect 与 Render 的区别 | 1. Pure Render 2. Derived Data 3. External Side Effect | [文档](./kp112-effect-vs-render/README.md) · [源码](./kp112-effect-vs-render/src/main.jsx) | 已完成 |
| RE-KP113 | Effect 与 Event 的区别 | 1. Interaction 2. Reactive Sync 3. Trigger Semantics | [文档](./kp113-effect-vs-event/README.md) · [源码](./kp113-effect-vs-event/src/main.jsx) | 已完成 |
| RE-KP114 | Effect 依赖数组 | 1. Dependencies 2. Object.is 3. Actual Reads | [文档](./kp114-effect-dependency-array/README.md) · [源码](./kp114-effect-dependency-array/src/main.jsx) | 已完成 |
| RE-KP115 | Reactive Value | 1. Props 2. State 3. Render Scope 4. Stable Values | [文档](./kp115-reactive-value/README.md) · [源码](./kp115-reactive-value/src/main.jsx) | 已完成 |
| RE-KP116 | Cleanup Function | 1. Teardown 2. 对称清理 3. 外部资源释放 | [文档](./kp116-cleanup-function/README.md) · [源码](./kp116-cleanup-function/src/main.jsx) | 已完成 |
| RE-KP117 | Effect 生命周期 | 1. Start Sync 2. Stop Sync 3. Dependency Change | [文档](./kp117-effect-lifecycle/README.md) · [源码](./kp117-effect-lifecycle/src/main.jsx) | 已完成 |
| RE-KP118 | 挂载、依赖变化与卸载 | 1. Mount 2. Dependency Change 3. Unmount | [文档](./kp118-mount-dependency-unmount/README.md) · [源码](./kp118-mount-dependency-unmount/src/main.jsx) | 已完成 |
| RE-KP119 | StrictMode 下 Effect 重新执行 | 1. Development 2. Extra Setup/Cleanup 3. Stress Test | [文档](./kp119-strictmode-effect-rerun/README.md) · [源码](./kp119-strictmode-effect-rerun/src/main.jsx) | 已完成 |
| RE-KP120 | 为什么开发环境看起来执行两次 | 1. Dev-only 2. Remount Resilience 3. Cleanup Correctness | [文档](./kp120-why-effect-runs-twice-in-dev/README.md) · [源码](./kp120-why-effect-runs-twice-in-dev/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 12：**10 / 10，已完成**
- 下一 Chapter：**Chapter 13：Effect 高阶、竞态与 useEffectEvent**
- 下一知识点：**RE-KP121：You Might Not Need an Effect**
