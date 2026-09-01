# TS-KP016：编辑器语言服务与语言服务体系概念

> [返回 Chapter 01](../README.md) · [源码目录](./src)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `SOURCE-LAB`（行为优先） + `ENGINEERING` |
| 学习深度 | **Should** |
| 本课主问题 | 为什么代码还没运行、甚至没手工执行 `tsc`，编辑器已经知道补全、错误、跳转和重命名？ |
| Learning Artifact | IDE Hover / Completion / Go to Definition / Rename / Diagnostic |
| 暂不理解 | Language Service API、Project Service 内部结构、Native Compiler 架构 |

## 这节课只需要搞懂什么

1. 编辑器通过 TypeScript Language Service 持续理解项目语义。
2. Hover、Completion、Rename 等功能不是 Node Runtime 提供的。
3. Language Service 与 CLI `tsc` 共享类型系统语义，但服务场景不同。

## 前置状态

本课有两个文件：`main.ts` 导入 `Product` 和 `formatProduct()`，`product.ts` 定义它们。

## 本课主问题与先预测

不运行应用，先在编辑器里：

```text
Hover product
Ctrl/Cmd+Click formatProduct
Rename Product.name
```

这些操作为什么能跨文件理解类型关系？

## 动手实验

### Step 0：Hover

把鼠标放到 `product`、`formatProduct`、`Product` 上，记录编辑器显示的类型签名。

### Step 1：Go to Definition

从 `main.ts` 跳到 `product.ts`。观察工具知道 Import 与定义的关联。

### Step 2：制造错误

临时把 `price: 499` 改成 `price: '499'`，保存但不运行 Node。观察编辑器 Diagnostic 立即出现。

### Step 3：Rename

对一个局部安全符号做 Rename，先预览受影响位置再取消/应用。重点观察它是语义重构，不是简单文本替换。

### Step 4：CLI 做最终对照

恢复源码后运行 `npm run check -- .../tsconfig.json`，确认编辑器与 CLI 对项目类型关系给出一致方向的判断。

## 心智模型

```text
Editor
  ↓ request
TypeScript Language Service
  ↓ Project / Type Information
Hover / Completion / Definition / Rename / Diagnostic

Node Runtime ← 不负责这些开发期能力
```

## Wrong Way 与 Production Boundary

- 不要把“编辑器没红线”当成 CI 已通过；编辑器项目配置、缓存和 CI 环境仍可能不同。
- 源码 Dive 前先理解这些外部行为；Compiler/Language Service 内部对象留到后续高级章节。

## 本课只记住 3 件事

1. **Language Service 驱动 IDE 的类型智能。**
2. **它是开发期服务，不是 Runtime。**
3. **IDE 反馈需要最终由项目级 CI typecheck 兜底。**

## Challenge

在 `Product` 新增一个必填字段，只观察编辑器列出哪些地方受影响；先不要修，预测 `tsc` 结果，再验证。

## Mastery Check

### Must
能指出 Hover/Completion/Diagnostic 的提供者。
### Should
会用 Go to Definition / Rename 观察跨文件类型关系。
### Expert
能解释 IDE Language Service 与 CI Compiler 为什么需要共享配置但不能互相替代。

## 最终源码与代码边界

- **核心 Artifact**：IDE 语义操作与 Diagnostic。
- **辅助源码**：`main.ts` / `product.ts` 提供跨文件关系。
- **最终源码**：[`src/`](./src)
