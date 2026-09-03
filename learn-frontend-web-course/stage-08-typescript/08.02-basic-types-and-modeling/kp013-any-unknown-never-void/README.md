# KP013：any、unknown、never 与 void 的职责边界

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 |
| 深度 | Must / Should |
| Pattern | FAILURE-LAB + CONTROL-FLOW-LAB |
| 主问题 | 四个看起来都像“特殊类型”的关键字，分别是在放弃检查、延迟判断、表示不可能，还是忽略返回值？ |
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

> 四个看起来都像“特殊类型”的关键字，分别是在放弃检查、延迟判断、表示不可能，还是忽略返回值？

---

## 2. 核心结论

- any 会同时关闭读写两侧的检查并向下游传播，应被视为类型系统逃生舱。
- unknown 可以接收任意输入，但使用前必须 Narrow，适合不可信边界。
- never 表示控制流不可能到达，可用于穷尽检查和永不返回函数。
- void 表示调用者不依赖返回值；回调实现仍可能返回一个会被忽略的值。

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
kp013-any-unknown-never-void/
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

### Step 1：复现 any 污染

让错误 label 类型通过 Check 并在 Runtime 调用 toUpperCase 时失败。

### Step 2：用 unknown 修复边界

先检查对象和字段，再执行字符串操作。

### Step 3：建立 Command Parser

把 unknown 转换成判别联合，并返回结构化错误。

### Step 4：使用 never 做穷尽检查

switch 处理所有 Command 分支，新增分支时让编译器阻止遗漏。

### Step 5：观察 void 回调

允许 Array.push 的 number 返回值被 LogSink 忽略，并验证函数本身返回 undefined。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export type Command =
  | { type: "start"; jobId: string }
  | { type: "stop"; jobId: string }
  | { type: "status"; jobId: string };

export type CommandParseResult =
  | { ok: true; command: Command }
  | { ok: false; issue: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function unsafeUpperCase(input: any): string {
  return input.label.toUpperCase();
}

export function safeUpperCase(input: unknown): string {
  if (!isRecord(input) || typeof input.label !== "string") return "invalid";
  return input.label.toUpperCase();
}

export function parseCommand(input: unknown): CommandParseResult {
  if (!isRecord(input)) return { ok: false, issue: "command must be object" };
  if (typeof input.jobId !== "string") return { ok: false, issue: "jobId must be string" };
  if (input.type !== "start" && input.type !== "stop" && input.type !== "status") {
    return { ok: false, issue: "unknown command type" };
  }
  return { ok: true, command: { type: input.type, jobId: input.jobId } };
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled command: ${JSON.stringify(value)}`);
}

export function executeCommand(command: Command): string {
  switch (command.type) {
    case "start":
      return `start:${command.jobId}`;
    case "stop":
      return `stop:${command.jobId}`;
    case "status":
      return `status:${command.jobId}`;
    default:
      return assertNever(command);
  }
}

export type LogSink = (message: string) => void;

export function emitMessages(sink: LogSink): void {
  ["alpha", "beta"].forEach((message) => sink(message));
}

function captureAnyFailure(): string {
  try {
    unsafeUpperCase({ label: 42 });
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

const parsed = parseCommand({ type: "start", jobId: "JOB-7" });
const messages: string[] = [];
const voidReturn = emitMessages((message) => messages.push(message));

console.log("SPECIAL_TYPES");
console.log(`anyFailure=${captureAnyFailure()}`);
console.log(`unknownResult=${safeUpperCase({ label: 42 })}`);
console.log(`command=${parsed.ok ? executeCommand(parsed.command) : parsed.issue}`);
console.log(`voidReturn=${String(voidReturn)}`);
console.log(`messages=${messages.join(",")}`);
```

### `src/expected-errors.ts`

```ts
import {
  assertNever,
  emitMessages,
  type Command
} from "./index.js";

declare const external: unknown;
// @ts-expect-error -- unknown 必须先缩小后才能读取属性。
external.label;

const result = emitMessages(() => 1);
// @ts-expect-error -- void 结果不能作为 number 使用。
const count: number = result;
void count;

// @ts-expect-error -- 普通字符串不能赋给 never。
const impossible: never = "reachable";
void impossible;

type ExtendedCommand = Command | { type: "pause"; jobId: string };

function incomplete(command: ExtendedCommand): string {
  switch (command.type) {
    case "start":
    case "stop":
    case "status":
      return command.type;
  }

  // @ts-expect-error -- pause 尚未处理，因此 command 不是 never。
  return assertNever(command);
}

void incomplete;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

把 API、JSON.parse 或第三方回调标成 any，导致错误字段一路传播到业务深处。边界改为 unknown，并在唯一入口完成 Narrow/Parse。

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
SPECIAL_TYPES
anyFailure=TypeError
unknownResult=invalid
command=start:JOB-7
voidReturn=undefined
messages=alpha,beta
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

1. 业务代码的 any 预算默认为 0；确需兼容旧声明时必须隔离并登记。
2. 外部数据使用 unknown，解析后返回明确 Domain 或 Result。
3. 判别联合的 default 使用 assertNever，让新增分支变成可见变更。

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
