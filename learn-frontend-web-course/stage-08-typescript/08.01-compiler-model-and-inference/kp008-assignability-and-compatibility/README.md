# KP008：Assignability、Compatibility 与类型相等

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 |
| 深度 | Should |
| Pattern | TYPE-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 两个类型能互相赋值，是否就代表它们完全相等？赋值后多余字段为什么仍然存在？ |
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

> 两个类型能互相赋值，是否就代表它们完全相等？赋值后多余字段为什么仍然存在？

---

## 2. 核心结论

- Assignability 是有方向的：Source 是否能放进 Target，而不是两个名字是否相同。
- TypeScript 主要采用 Structural Typing；结构满足目标要求即可赋值。
- 兼容只改变当前静态视图，不会在 Runtime 裁剪对象的额外字段。
- 双向可赋值也不应被草率当作所有语境下的严格类型相等。

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
kp008-assignability-and-compatibility/
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

### Step 1：建立 Summary 与 Detail

让 TaskDetail 比 TaskSummary 多出 description 和 owner，形成清晰的 Source/Target 关系。

### Step 2：验证单向兼容

把 Detail 赋给 Summary，反方向则由 Expected Error 阻止。

### Step 3：观察 Runtime 真实对象

通过 Object.keys 证明 summaryView 仍引用完整 Detail 对象。

### Step 4：建立类型相等探针

用 Equal 与 Assert 保存“结构相同”和“结构不同”的编译期证据。

### Step 5：形成 API 决策

区分参数最小需求、返回值承诺和公共类型稳定性。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export interface TaskSummary {
  id: string;
  title: string;
}

export interface TaskDetail extends TaskSummary {
  description: string;
  owner: string;
}

export const detailedTask: TaskDetail = {
  id: "TASK-101",
  title: "完成类型课程",
  description: "补齐静态证据、运行时证据和回归脚本",
  owner: "Ada"
};

export const summaryView: TaskSummary = detailedTask;

export function acceptSummary(task: TaskSummary): string {
  return `${task.id}:${task.title}`;
}

export type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2)
    ? (<T>() => T extends Right ? 1 : 2) extends
      (<T>() => T extends Left ? 1 : 2)
      ? true
      : false
    : false;

export type Assert<Condition extends true> = Condition;
export type SummaryMatchesObject = Assert<
  Equal<TaskSummary, { id: string; title: string }>
>;
export type DetailEqualsSummary = Equal<TaskDetail, TaskSummary>;

const accepted = acceptSummary(detailedTask);
const runtimeKeys = Object.keys(summaryView).join(",");

console.log("ASSIGNABILITY");
console.log(`accepted=${accepted}`);
console.log(`runtimeKeys=${runtimeKeys}`);
console.log(`sameReference=${summaryView === detailedTask}`);
```

### `src/expected-errors.ts`

```ts
import type {
  Assert,
  Equal,
  TaskDetail,
  TaskSummary
} from "./index.js";

const summaryOnly: TaskSummary = {
  id: "TASK-201",
  title: "只有摘要"
};

// @ts-expect-error -- Summary 缺少 Detail 要求的 description 和 owner。
const detailFromSummary: TaskDetail = summaryOnly;
void detailFromSummary;

// @ts-expect-error -- 字符串宽类型不能赋给更窄的字面量类型。
const completed: "completed" = "draft";
void completed;

// @ts-expect-error -- 这两个类型并不相等。
type MustBeEqual = Assert<Equal<TaskSummary, TaskDetail>>;

// 新鲜对象字面量仍会检查多余字段。
// @ts-expect-error -- extra 不属于 TaskSummary。
const freshObject: TaskSummary = { id: "1", title: "x", extra: true };
void freshObject;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

误以为 `const summary: TaskSummary = detail` 会删除 detail 的额外字段，随后把静态视图当成数据清洗。类型标注不是 Runtime 转换；需要裁剪时必须显式构造新对象。

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
ASSIGNABILITY
accepted=TASK-101:完成类型课程
runtimeKeys=id,title,description,owner
sameReference=true
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

1. 函数参数声明调用真正需要的最小结构，提升可复用性。
2. 不要把类型赋值当成序列化、白名单或安全裁剪。
3. 公共 API 的兼容判断同时检查输入方向、输出方向、推断变化与 Runtime 行为。

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
