# KP010：Module Project：Type Error Observatory 与诊断工作流

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 |
| 深度 | Must / Should / Expert |
| Pattern | PROJECT-LAB + DIAGNOSTIC-LAB |
| 主问题 | 面对成批 TypeScript 错误时，如何找到第一条根错误，而不是被连锁诊断牵着走？ |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课不是只看几段语法，而是建立一个可以重复执行的最小实验。你会同时保留：

```text
正常 TypeScript 源码
+ Expected Error 负向类型测试
+ Declaration Emit 静态证据
+ Runtime 输出
+ verify.mjs 自动验收
```

完成后，应能回答：

> 面对成批 TypeScript 错误时，如何找到第一条根错误，而不是被连锁诊断牵着走？

---

## 2. 核心结论

- 先把问题分类为 Syntax、Type、Module、Configuration 或 Runtime，再选择证据。
- 诊断数量不等于根因数量；一个错误声明可能制造多条级联错误。
- 最小复现、第一证据和回归矩阵是可复制诊断流程的核心。
- CLI、LSP、Emit 与 Runtime 各自回答不同问题，不能相互替代。

这几条结论必须分别有 Compiler 与 Runtime 证据，不能只凭“编辑器看起来没报错”。

---

## 3. 前置知识与课程边界

### 前置知识

- 已完成前一课并理解 strict、Expected Error 和 Declaration Emit。
- 能运行 npm script，并能区分 Check、Build 与 Runtime。
- 理解 JavaScript 的基础值、对象、函数和控制流。

### 本课完整拥有

本课完整解释标题中的类型机制、Failure、修复方式与生产决策；后续课程可以直接引用，不再另设同名“高级篇”。

### 暂不展开

- Runtime Schema 库与 OpenAPI：08.10～08.11。
- 框架特有类型：React/Vue Stage。
- Compiler API 与 AST 编程：Stage 16。

---

## 4. 项目目录

```text
kp010-type-error-observatory/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs
└── src/
    ├── index.ts
    └── expected-errors.ts
```

部分项目会增加报告或辅助源码，但仍可独立安装、检查、构建和运行。

---

## 5. 从零运行

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

命令职责：

| 命令 | 证据 |
| --- | --- |
| `npm run check` | 正常源码通过，`@ts-expect-error` 对应的错误仍然存在 |
| `npm run build` | 生成 JavaScript、`.d.ts`、Declaration Map 与 Source Map |
| `npm start` | 执行真实 JavaScript Runtime |
| `npm run verify` | 自动检查输出、声明和课程专属不变量 |

课程显式开启 `strict`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes` 与 `verbatimModuleSyntax`，避免依赖机器或编辑器默认值。

---

## 6. 实现步骤

### Step 1：建立故障目录

为九个典型场景记录 kind、rootCause、firstEvidence、priority 和 cascadeCount。

### Step 2：实现 Triage 排序

优先处理配置、模块和高级联根因，再处理局部类型错误。

### Step 3：接入未知 Build Event

用 Runtime Guard 把外部事件转换为可诊断模型。

### Step 4：保存 Runbook 与 Report

把分类、命令、停止条件和断言预算写入可审查文档。

### Step 5：自动回归

验证 Runtime 排序、Declaration、Expected Error 和两份文档同时存在。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
import {
  orderForTriage,
  scenarios,
  type DiagnosticKind
} from "./scenarios.js";

export type BuildEvent =
  | { kind: "diagnostic"; code: number; message: string }
  | { kind: "runtime"; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseBuildEvent(input: unknown): BuildEvent | null {
  if (!isRecord(input) || typeof input.kind !== "string") return null;

  if (
    input.kind === "diagnostic" &&
    typeof input.code === "number" &&
    typeof input.message === "string"
  ) {
    return { kind: "diagnostic", code: input.code, message: input.message };
  }

  if (input.kind === "runtime" && typeof input.message === "string") {
    return { kind: "runtime", message: input.message };
  }

  return null;
}

export function summarizeEvent(event: BuildEvent): string {
  switch (event.kind) {
    case "diagnostic":
      return `TS${event.code}:${event.message}`;
    case "runtime":
      return `runtime:${event.message}`;
    default:
      return assertNever(event);
  }
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

export function kindLabel(kind: DiagnosticKind): string {
  return kind.toUpperCase();
}

const ordered = orderForTriage(scenarios);
const cascadeTotal = scenarios.reduce((sum, item) => sum + item.cascadeCount, 0);
const event = parseBuildEvent({
  kind: "diagnostic",
  code: 2322,
  message: "type mismatch"
});

console.log("TYPE_ERROR_OBSERVATORY");
console.log(`scenarios=${scenarios.length}`);
console.log(`first=${ordered[0]?.id ?? "none"}:${ordered[0]?.kind ?? "none"}`);
console.log(`cascadeTotal=${cascadeTotal}`);
console.log(`event=${event ? summarizeEvent(event) : "invalid"}`);
```

### `src/expected-errors.ts`

```ts
import {
  assertNever,
  type BuildEvent
} from "./index.js";

// 新增分支后，旧 switch 不再穷尽。
type ExtendedBuildEvent = BuildEvent | { kind: "configuration"; option: string };

function incompleteSummary(event: ExtendedBuildEvent): string {
  switch (event.kind) {
    case "diagnostic":
      return `TS${event.code}`;
    case "runtime":
      return event.message;
  }

  // @ts-expect-error -- configuration 分支尚未处理，因此 event 不是 never。
  return assertNever(event);
}

void incompleteSummary;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

从错误列表最后一条开始逐个加断言，可能暂时减少红线，却让根因继续扩散。正确顺序是分类、定位最早根因、建立最小复现、修正模型、最后执行正向与负向回归。

统一排障顺序：

```text
先复现
→ 找第一条根错误
→ 获取最小静态/Runtime 证据
→ 修正模型或边界
→ 正向 Check
→ Expected Error
→ Runtime 回归
```

不能通过增加无边界 `any`、双重断言或关闭 strict 来结束实验。

---

## 9. 预期 Runtime 输出

```text
TYPE_ERROR_OBSERVATORY
scenarios=9
first=CFG-001:configuration
cascadeTotal=20
event=TS2322:type mismatch
```

输出用于证明真实 JavaScript 行为；类型信息仍通过 `.d.ts` 和负向测试单独证明。

---

## 10. 如何阅读源码

### `src/index.ts`

这是可以通过 strict Check 并在 Runtime 执行的主线实现。阅读时先标出：

```text
输入边界
→ 静态类型
→ Narrow / 赋值 / 控制流
→ 输出边界
→ Runtime 可观察结果
```

### `src/expected-errors.ts`

这里不是“坏代码仓库”，而是负向契约。每条 `@ts-expect-error` 都要解释为什么该错误必须存在。未来若错误意外消失，TypeScript 会反向报告未使用的指令，从而提醒类型保护被削弱。

### `verify.mjs`

脚本不替代 TypeScript Checker，而是补充验证 Runtime 输出、Declaration Emit 和课程文档。三类证据共同构成验收。

---

## 11. 生产级规则

1. 一次只改变一个主要变量，保持最小复现可解释。
2. 修复后同时运行正向 Check、Expected Error、Build 与 Runtime。
3. 建立团队级 Triage Runbook；禁止用关闭 strict 或批量 as 作为默认修复。

---

## 12. 常见误区

1. **只看 Hover，不保存可重复证据**：Hover 会受项目配置和编辑器版本影响，关键结论应写成类型测试或 Declaration 检查。
2. **把通过编译当成 Runtime 正确**：外部输入、JSON 和缺失值仍需要运行时处理。
3. **用断言消除症状**：断言不会修复错误模型，只会改变 Checker 的看法。
4. **一个 Lesson 改太多变量**：应先建立最小复现，再把结论迁移回真实项目。

---

## 13. Mastery Check

不看源码，独立完成：

1. 用自己的业务对象复现本课核心机制。
2. 至少制造一个应被 TypeScript 阻止的错误，并用 `@ts-expect-error` 保存。
3. 解释静态类型在 Emit 后是否仍然存在。
4. 给出一个不使用 any/双重断言的修复。
5. 写出一条团队规则，并说明它保护了什么边界。

全部完成后再进入下一课。
