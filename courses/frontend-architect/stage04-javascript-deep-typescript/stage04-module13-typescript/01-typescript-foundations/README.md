# Chapter 01：TypeScript 认知、安装与运行模型

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

本章先建立 TypeScript 的基本运行直觉，再进入安装、编译和工具链。重点不是背配置，而是先理解：TypeScript 在开发阶段提供类型分析能力，程序运行时仍然遵循 JavaScript 语义。

## 共享运行环境

本 TypeScript 模块默认共用一套工具链，避免每个知识点重复维护 `package.json`、TypeScript 版本和 `node_modules`。

模块根目录提供：

```text
stage04-module13-typescript/
├── package.json
├── tsconfig.base.json
├── .gitignore
└── 01-typescript-foundations/
```

首次学习 TypeScript 模块时，在模块根目录执行一次：

```bash
npm install
```

之后普通知识点优先复用这套 TypeScript 依赖和基础编译配置。

### 知识点自己的配置什么时候保留？

如果某个知识点需要独立控制 `include`、`rootDir`、`outDir` 或专门演示某个编译选项，可以在知识点目录保留一个很小的 `tsconfig.json`，并继承模块根目录：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

真正讲 `tsconfig`、模块系统、NodeNext、Project References、Decorators、JSX 或库发布时，可以根据教学目标使用独立配置，不强行套统一模板。

> 教学结构统一，不代表每个知识点必须拥有完全相同的文件结构。

## 学习顺序

### Lesson 01.1：TypeScript 是什么

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP001 | TypeScript 与 JavaScript 的关系 | [文档](./kp001-typescript-javascript-relationship/README.md) · [源码](./kp001-typescript-javascript-relationship/src/main.ts) · [练习](./kp001-typescript-javascript-relationship/exercise/README.md) | 已完成 |
| TS-KP002 | 静态类型检查与 JavaScript 运行时的边界 | [文档](./kp002-static-type-checking-runtime-boundary/README.md) · [源码](./kp002-static-type-checking-runtime-boundary/src/main.ts) · [练习](./kp002-static-type-checking-runtime-boundary/exercise/README.md) | 已完成 |
| TS-KP003 | TypeScript 的擦除型类型系统 | [文档](./kp003-erased-type-system/README.md) · [源码](./kp003-erased-type-system/src/main.ts) · [练习](./kp003-erased-type-system/exercise/README.md) | 已完成 |
| TS-KP004 | 类型安全不是运行时数据校验 | [文档](./kp004-types-vs-runtime-validation/README.md) · [源码](./kp004-types-vs-runtime-validation/src/main.ts) · [练习](./kp004-types-vs-runtime-validation/exercise/README.md) | 已完成 |
| TS-KP005 | TypeScript 的设计目标与非目标 | [文档](./kp005-design-goals/README.md) · [源码](./kp005-design-goals/src/main.ts) · [练习](./kp005-design-goals/exercise/README.md) | 已完成 |
| TS-KP006 | 渐进式类型系统与 JavaScript 迁移 | [文档](./kp006-gradual-typing-migration/README.md) · [源码](./kp006-gradual-typing-migration/src/main.ts) · [练习](./kp006-gradual-typing-migration/exercise/README.md) | 已完成 |
| TS-KP007 | 结构化类型系统基本直觉 | [文档](./kp007-structural-typing-intuition/README.md) · [源码](./kp007-structural-typing-intuition/src/main.ts) · [练习](./kp007-structural-typing-intuition/exercise/README.md) | 已完成 |
| TS-KP008 | 编译期错误与运行时错误的区别 | [文档](./kp008-compile-time-vs-runtime-errors/README.md) · [源码](./kp008-compile-time-vs-runtime-errors/src/main.ts) · [练习](./kp008-compile-time-vs-runtime-errors/exercise/README.md) | 已完成 |

### Lesson 01.2：安装、编译与执行

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP009 | 安装 TypeScript 与版本管理 | [文档](./kp009-installation-version-management/README.md) · [源码](./kp009-installation-version-management/src/main.ts) · [练习](./kp009-installation-version-management/exercise/README.md) | 已完成 |
| TS-KP010 | `tsc` 基本使用 | [文档](./kp010-tsc-basics/README.md) · [源码](./kp010-tsc-basics/src/main.ts) · [练习](./kp010-tsc-basics/exercise/README.md) | 已完成 |
| TS-KP011 | `.ts`、`.tsx`、`.mts`、`.cts` 文件 | [文档](./kp011-typescript-file-extensions/README.md) · [源码](./kp011-typescript-file-extensions/src/) · [练习](./kp011-typescript-file-extensions/exercise/README.md) | 已完成 |
| TS-KP012 | 源码到 JavaScript 的 Emit 过程 | [文档](./kp012-emit-process/README.md) · [源码](./kp012-emit-process/src/main.ts) · [练习](./kp012-emit-process/exercise/README.md) | 已完成 |
| TS-KP013 | `--noEmit` 与只类型检查 | `kp013-no-emit-type-checking/` | 待生成 |
| TS-KP014 | Watch Mode | `kp014-watch-mode/` | 待生成 |
| TS-KP015 | 直接运行 TypeScript 的现代方式与限制 | `kp015-direct-typescript-execution/` | 待生成 |
| TS-KP016 | 编辑器语言服务与语言服务体系概念 | `kp016-language-service/` | 待生成 |

## 完成标准

一个知识点只有同时满足下面条件才标记为“已完成”：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. “从 0 到 1”能够从空文件或最小可运行状态逐步得到最终案例。
3. README 明确区分本节核心代码和实验辅助代码。
4. README 中的代码、路径、命令和预期结果与仓库真实文件一致。
5. 最终源码可以按文档给出的方式运行或检查。

## 当前进度

- Lesson 01.1：8/8 已完成。
- Lesson 01.2：4/8 已完成。
- Chapter 01：12/16 已完成。
- 下一知识点：TS-KP013「`--noEmit` 与只类型检查」。
