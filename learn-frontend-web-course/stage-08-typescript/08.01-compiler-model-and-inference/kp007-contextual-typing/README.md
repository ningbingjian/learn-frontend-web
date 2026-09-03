# KP007：Contextual Typing 如何从使用位置反向推断

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 |
| 深度 | Must / Should |
| Pattern | BUILD-LAB + FAILURE-LAB |
| 主问题 | 箭头函数参数没有写类型时，TypeScript 为什么有时知道它是什么，有时却得到隐式 any？ |
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

> 箭头函数参数没有写类型时，TypeScript 为什么有时知道它是什么，有时却得到隐式 any？

---

## 2. 核心结论

- 普通推断从表达式获得信息；Contextual Typing 从目标位置向表达式提供信息。
- 变量目标类型、函数实参位置、数组回调和对象属性都可以成为上下文。
- 函数一旦脱离使用位置，参数类型来源可能消失；这时应在稳定边界补最小标注。
- 上游若被 any 污染，下游回调即使有“上下文”，得到的也可能仍是 any。

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
kp007-contextual-typing/
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

### Step 1：建立任务领域模型

定义 Task、TaskFormatter、TaskPredicate，让函数的输入和输出先有稳定契约。

### Step 2：观察赋值位置的反向推断

把箭头函数赋给 TaskFormatter，检查 task 与 index 无需重复标注仍获得精确类型。

### Step 3：观察调用位置的回调推断

让 filter、map 和命令处理器注册表分别向回调提供参数类型。

### Step 4：抽离回调并制造故障

在 expected-errors.ts 中保存隐式 any、错误返回值和不存在属性三类负向证据。

### Step 5：运行与回归

通过 Declaration Emit 和 Runtime 输出确认静态推断没有改变 JavaScript 行为。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export interface Task {
  id: string;
  projectId: string;
  title: string;
  done: boolean;
  priority: "low" | "high";
}

export type TaskFormatter = (task: Task, index: number) => string;
export type TaskPredicate = (task: Task) => boolean;

export const tasks: readonly Task[] = [
  {
    id: "TASK-001",
    projectId: "PAY",
    title: "修复支付回调",
    done: false,
    priority: "high"
  },
  {
    id: "TASK-002",
    projectId: "OPS",
    title: "清理历史日志",
    done: true,
    priority: "low"
  },
  {
    id: "TASK-004",
    projectId: "PAY",
    title: "补充告警指标",
    done: false,
    priority: "high"
  }
];

export const contextualFormatter: TaskFormatter = (task, index) =>
  `${index + 1}. [${task.priority}] ${task.id} ${task.title}`;

export const openTaskLabels = tasks
  .filter((task) => !task.done)
  .map((task, index) => contextualFormatter(task, index));

export function createProjectPredicate(projectId: string): TaskPredicate {
  return (task) => task.projectId === projectId;
}

export interface CreateCommand {
  id: string;
  title: string;
}

export type CommandHandler = (command: CreateCommand) => string;
export type CommandHandlerMap = {
  create: CommandHandler;
  preview: CommandHandler;
};

export const commandHandlers: CommandHandlerMap = {
  create: (command) => `${command.id}:${command.title}`,
  preview: (command) => `[preview] ${command.title}`
};

const paymentTasks = tasks.filter(createProjectPredicate("PAY"));
const created = commandHandlers.create({
  id: "TASK-003",
  title: "补充回归测试"
});

console.log("CONTEXTUAL_TYPING");
console.log(`open=${openTaskLabels.length}`);
console.log(`first=${openTaskLabels[0] ?? "none"}`);
console.log(`created=${created}`);

export const paymentTaskCount = paymentTasks.length;
```

### `src/expected-errors.ts`

```ts
import type { Task, TaskFormatter } from "./index.js";

// @ts-expect-error -- 脱离任何目标位置后，参数 task 没有类型来源。
const detachedTitle = (task) => task.title;
void detachedTitle;

// @ts-expect-error -- Contextual return type 要求 string，不能返回 number。
const wrongReturn: TaskFormatter = (task) => task.title.length;
void wrongReturn;

// @ts-expect-error -- Task 中不存在 missing 属性。
const wrongMember: TaskFormatter = (task) => task.missing;
void wrongMember;

// 提取后的函数在稳定边界显式声明最小输入类型。
const repairedTitle = (task: Task): string => task.title;
void repairedTitle;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

把 `(task) => task.title` 从数组方法或目标类型中抽离后，参数失去类型来源。不要用 any 补洞，应给提取后的函数声明 Task 或复用 TaskFormatter。

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
CONTEXTUAL_TYPING
open=2
first=1. [high] TASK-001 修复支付回调
created=TASK-003:补充回归测试
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

1. 局部回调优先利用可靠上下文，避免机械重复标注。
2. 提取为可复用函数、跨模块导出或形成公共 API 时，显式声明稳定边界。
3. 发现回调参数是 any 时向上游追踪第一个 any 来源，而不是只修当前行。

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
