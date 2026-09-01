# Chapter 01：TypeScript 认知、安装与运行模型

> [返回 TypeScript 模块索引](../README.md)

本章不要求先背“TypeScript 是什么”。我们从编译错误、Emit 产物和真实运行时异常出发，逐步建立最重要的边界：**TypeScript 在开发阶段分析类型关系；真正执行程序的仍然是 JavaScript 运行时。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | TypeScript 到底在哪个阶段工作？它能阻止什么错误，又不能替运行时做什么？ |
| 主教学模式 | `BUILD-LAB` |
| 辅助教学模式 | `FAILURE-LAB` + 轻量 `SOURCE-LAB`（只观察 Emit，不进入 Compiler 源码） |
| 贯穿实验 | 商品 / 用户等小型数据案例，通过 `tsc` Diagnostic、Emit JavaScript、Node Console 建立边界模型 |
| Learning Artifact | `tsc --noEmit` 结果、真实编译错误、`dist/*.js`、Node 输出、受控运行时异常 |
| 源码主线 | 本章只观察 TypeScript 输入与 JavaScript 输出，不进入 Scanner / Parser / Checker 内部实现 |
| 故障 / Wrong Way | 把 TypeScript 当运行时、把类型当 Runtime Validation、认为 `number` 自动保证业务数值合法、Big Bang 迁移 |
| 安全边界 | 外部 JSON / API / Storage 数据不可信；本章只建立边界，完整 Runtime Validation 在后续章节系统学习 |
| 性能边界 | 本章不做编译性能优化；只建立 `check / build / run` 三阶段观察方法 |
| Chapter DoD | 能仅凭 `tsc`、Emit 与运行结果解释“静态类型信息”和“真实运行时值”的区别 |

### 本 Chapter 的观察方法

```text
先预测
  ↓
写 / 改一个最小 TypeScript 片段
  ↓
运行 tsc
  ↓
观察 Diagnostic 或 Emit
  ↓
必要时运行 JavaScript
  ↓
解释刚才的证据
  ↓
再给它专业术语
```

## 共享运行环境

TypeScript 模块共用根目录工具链。首次进入模块执行：

```bash
npm install
```

单个 KP 的 `tsconfig.json` 只负责当前实验的局部配置；TypeScript 版本和基础 strict 配置复用模块根目录。

## 课程索引

### Lesson 01.1：TypeScript 是什么

| 编号 | 知识点 | 文档与源码 | 教学状态 |
|---|---|---|---|
| TS-KP001 | TypeScript 与 JavaScript 的关系 | [文档](./kp001-typescript-javascript-relationship/README.md) · [源码](./kp001-typescript-javascript-relationship/src/main.ts) | 已重构 · v1.0 |
| TS-KP002 | 静态类型检查与 JavaScript 运行时的边界 | [文档](./kp002-static-type-checking-runtime-boundary/README.md) · [源码](./kp002-static-type-checking-runtime-boundary/src/main.ts) | 已重构 · v1.0 |
| TS-KP003 | TypeScript 的擦除型类型系统 | [文档](./kp003-erased-type-system/README.md) · [源码](./kp003-erased-type-system/src/main.ts) | 已重构 · v1.0 |
| TS-KP004 | 类型安全不是运行时数据校验 | [文档](./kp004-types-vs-runtime-validation/README.md) · [源码](./kp004-types-vs-runtime-validation/src/main.ts) | 已重构 · v1.0 |
| TS-KP005 | TypeScript 的设计目标与非目标 | [文档](./kp005-design-goals/README.md) · [源码](./kp005-design-goals/src/main.ts) | 已重构 · v1.0 |
| TS-KP006 | 渐进式类型系统与 JavaScript 迁移 | [文档](./kp006-gradual-typing-migration/README.md) · [源码](./kp006-gradual-typing-migration/src/main.ts) | 已重构 · v1.0 |
| TS-KP007 | 结构化类型系统基本直觉 | [文档](./kp007-structural-typing-intuition/README.md) · [源码](./kp007-structural-typing-intuition/src/main.ts) | 已重构 · v1.0 |
| TS-KP008 | 编译期错误与运行时错误的区别 | [文档](./kp008-compile-time-vs-runtime-errors/README.md) · [源码](./kp008-compile-time-vs-runtime-errors/src/main.ts) | 已重构 · v1.0 |

### Lesson 01.2：安装、编译与执行

| 编号 | 知识点 | 文档与源码 | 教学状态 |
|---|---|---|---|
| TS-KP009 | 安装 TypeScript 与版本管理 | [文档](./kp009-installation-version-management/README.md) · [源码](./kp009-installation-version-management/src/main.ts) | 已重构 · v1.0 |
| TS-KP010 | `tsc` 基本使用 | [文档](./kp010-tsc-basics/README.md) · [源码](./kp010-tsc-basics/src/main.ts) | 已重构 · v1.0 |
| TS-KP011 | `.ts`、`.tsx`、`.mts`、`.cts` 文件 | [文档](./kp011-typescript-file-extensions/README.md) · [源码](./kp011-typescript-file-extensions/src/) | 已重构 · v1.0 |
| TS-KP012 | 源码到 JavaScript 的 Emit 过程 | [文档](./kp012-emit-process/README.md) · [源码](./kp012-emit-process/src/main.ts) | 已重构 · v1.0 |
| TS-KP013 | `--noEmit` 与只类型检查 | [文档](./kp013-no-emit-type-checking/README.md) · [源码](./kp013-no-emit-type-checking/src/main.ts) | 已完成 · 待重构 |
| TS-KP014 | Watch Mode | [文档](./kp014-watch-mode/README.md) · [源码](./kp014-watch-mode/src/main.ts) | 已完成 · 待重构 |
| TS-KP015 | 直接运行 TypeScript 的现代方式与限制 | [文档](./kp015-direct-typescript-execution/README.md) · [源码](./kp015-direct-typescript-execution/src/main.ts) | 已完成 · 待重构 |
| TS-KP016 | 编辑器语言服务与语言服务体系概念 | [文档](./kp016-language-service/README.md) · [源码](./kp016-language-service/src/) | 已完成 · 待重构 |

### Lab 01：最小 TypeScript 工程综合实验

| 实验 | 内容 | 文档与源码 | 状态 |
|---|---|---|---|
| Lab 01 | 类型检查通过、错误仍 Emit、运行时输入边界 | [文档与源码](./lab01-minimal-typescript-project/README.md) | 已完成 · 待按新规范复核 |

## 当前进度

- 知识点完成度：**16 / 16，已完成**。
- 新教学规范重构：**12 / 16**。
- 下一重构批次：**TS-KP013～TS-KP018**（跨 Chapter 01 → Chapter 02）。
- Lab 01：已有内容保留，待完成 KP001～109 重构后统一复核。
