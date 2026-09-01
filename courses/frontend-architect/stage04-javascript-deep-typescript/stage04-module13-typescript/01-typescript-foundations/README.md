# Chapter 01：TypeScript 认知、安装与运行模型

> [返回 TypeScript 模块索引](../README.md)

本章通过 Diagnostic、Emit、Node Runtime、Watch 和编辑器语言服务建立 TypeScript 最基础的工作模型：**静态分析发生在开发工具链里，运行时仍遵循 JavaScript。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | TypeScript 在哪个阶段工作？检查、Emit、Runtime、IDE 各自负责什么？ |
| 主教学模式 | `BUILD-LAB` |
| 辅助教学模式 | `FAILURE-LAB` + `ENGINEERING` + 轻量 `SOURCE-LAB` |
| Learning Artifact | `tsc` Diagnostic、Emit JS、Node 输出、Watch 增量结果、IDE Hover/Completion/Rename |
| Wrong Way | 把 TS 当 Runtime、把 Type 当 Validator、依赖全局 tsc、混淆 check/build/run |
| Chapter DoD | 能用真实工具证据解释 TypeScript Compiler、Language Service 与 JavaScript Runtime 的职责边界 |

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
| TS-KP013 | `--noEmit` 与只类型检查 | [文档](./kp013-no-emit-type-checking/README.md) · [源码](./kp013-no-emit-type-checking/src/main.ts) | 已重构 · v1.0 |
| TS-KP014 | Watch Mode | [文档](./kp014-watch-mode/README.md) · [源码](./kp014-watch-mode/src/main.ts) | 已重构 · v1.0 |
| TS-KP015 | 直接运行 TypeScript 的现代方式与限制 | [文档](./kp015-direct-typescript-execution/README.md) · [源码](./kp015-direct-typescript-execution/src/main.ts) | 已重构 · v1.0 |
| TS-KP016 | 编辑器语言服务与语言服务体系概念 | [文档](./kp016-language-service/README.md) · [源码](./kp016-language-service/src/) | 已重构 · v1.0 |

## 当前进度

- 知识点完成度：**16/16**。
- 新教学规范重构：**16/16，Chapter 01 完成**。
- 下一重构范围：Chapter 02 / TS-KP017～。
- Lab 01 保留，待 KP001～109 完成后统一复核综合实验。
