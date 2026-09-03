# KP006：Literal Widening 为什么会丢失精确信息

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must / Should |
| Pattern | TYPE-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 明明写的是 `"draft"`，为什么 TypeScript 有时得到字面量类型，有时却只得到 `string`？ |
| 最终证据 | Runtime `typeof`、Expected Error、Declaration Emit 类型对照 |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

你会建立五组具有相同或相近 Runtime 值、但 Static Type 不同的声明：

```ts
let mutableStatus = "draft";
const fixedStatus = "draft";

const mutableJob = {
  status: "draft",
  channel: "email"
};

const annotatedJob: {
  status: JobStatus;
  channel: "email" | "sms";
} = {
  status: "draft",
  channel: "email"
};

const frozenJob = {
  status: "queued",
  channel: "email",
  retries: [1, 2]
} as const;
```

然后通过 `dist/index.d.ts` 直接观察推断结果：

```text
let mutableStatus
→ string

const fixedStatus
→ "draft"

mutableJob.status
→ string

annotatedJob.status
→ JobStatus

frozenJob.status
→ readonly "queued"

frozenJob.retries
→ readonly [1, 2]
```

Runtime 还会告诉你：

```text
mutableStatus 的 typeof 是 string
fixedStatus 的 typeof 也是 string
```

这证明 Literal Type 与 Widening 是静态模型，不会创造新的 JavaScript Primitive Runtime Kind。

---

## 2. 本课解决什么问题

真实项目经常出现这样的错误：

```ts
type JobStatus = "draft" | "queued" | "running" | "completed";

function acceptStatus(status: JobStatus) {}

const job = {
  status: "draft"
};

acceptStatus(job.status);
```

很多学习者会问：

> `job.status` 明明就是 `"draft"`，为什么不能传给 JobStatus？

因为 TypeScript 不只看“当前值”，还会看这个位置是否允许以后变化。

对象虽然用 `const` 绑定：

```ts
const job = { status: "draft" };
```

但对象属性仍然可写：

```ts
job.status = "anything";
```

为了允许这种合法 JavaScript 赋值，Compiler 通常把属性从：

```ts
"draft"
```

扩大为：

```ts
string
```

这个过程叫 Literal Widening。

---

## 3. 前置知识与本课边界

### 已经需要知道

- KP005：类型信息可以来自 Annotation 或 Inference。
- `let`、`const`、Object、Array 的 JavaScript 可变性差异。
- Literal Union 的基础写法。

### 本课完整学习

- String / Number / Boolean Literal Type 的基本概念。
- Widening 为什么与可变位置有关。
- `let` 与 Primitive `const` 的推断差异。
- 为什么 `const object` 的属性仍然 Widen。
- Annotation 如何保留领域联合，但允许合法状态变化。
- `as const` 如何保留 Literal 并递归生成 Readonly View。
- Declaration Emit 如何成为推断结果的可观察证据。

### 本课暂不展开

- `satisfies` 的完整对象契约：Module 08.02。
- `const` Type Parameter：Module 08.03。
- Deep Readonly 的边界：Module 08.06。
- Immutable Architecture：Stage 27。

---

## 4. 本课项目介绍

领域状态：

```ts
export type JobStatus =
  | "draft"
  | "queued"
  | "running"
  | "completed";
```

我们需要同时解决两个不同需求。

### 需求 A：状态会变化，但只能在合法集合内变化

```text
draft → queued → running → completed
```

适合：

```ts
status: JobStatus
```

### 需求 B：配置是固定常量，希望保留每个精确字面量

```text
status 永远 queued
channel 永远 email
retries 永远 [1, 2]
```

适合：

```ts
as const
```

不能因为都涉及 Literal 就把它们混为同一种设计目标。

---

## 5. 起始状态

本课从独立空目录开始：

```bash
mkdir kp006-literal-widening
cd kp006-literal-widening
mkdir src
```

这里需要一个专门的 Declaration Emit 对照项目，所以不复制 KP005 发票业务。

---

## 6. 最终会有哪些文件

```text
kp006-literal-widening/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs                # 自动读取 d.ts 断言推断结果
└── src/
    ├── index.ts              # 五组 Widening 对照
    └── expected-errors.ts    # 错误调用和 readonly 修改证据
```

最重要的生成证据：

```text
dist/index.d.ts
```

因为它会把 Compiler 最终决定的 Public Type 写出来。

---

## 7. Step 0：建立项目

创建 `package.json`：

```json
{
  "name": "@learn-frontend-web/ts-kp006-literal-widening",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "clean": "node --input-type=module -e \"import { rmSync } from 'node:fs'; rmSync('dist', { recursive: true, force: true })\"",
    "check": "tsc --noEmit",
    "build": "npm run clean && tsc -p tsconfig.json",
    "start": "node dist/index.js",
    "verify": "npm run check && npm run build && node verify.mjs"
  },
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": [
      "ES2022",
      "DOM"
    ],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "dist"
  ]
}
```

安装：

```bash
npm install
```

---

## 8. Step 1：创建完整对照源码

创建：

```text
src/index.ts
```

写入：

```ts
export type JobStatus = "draft" | "queued" | "running" | "completed";

export let mutableStatus = "draft";
export const fixedStatus = "draft";

export const mutableJob = {
  status: "draft",
  channel: "email"
};

export const annotatedJob: { status: JobStatus; channel: "email" | "sms" } = {
  status: "draft",
  channel: "email"
};

export const frozenJob = {
  status: "queued",
  channel: "email",
  retries: [1, 2]
} as const;

export function acceptStatus(status: JobStatus): string {
  return `accepted:${status}`;
}

console.log(`mutable=${mutableStatus}; typeof=${typeof mutableStatus}`);
console.log(`fixed=${fixedStatus}; typeof=${typeof fixedStatus}`);
console.log(acceptStatus(annotatedJob.status));
console.log(`${frozenJob.status}/${frozenJob.channel}/retries=${frozenJob.retries.join(",")}`);
```

现在不要只看 Runtime 输出。接下来逐个预测每个 Export 的 Static Type，最后用 `.d.ts` 验证。

---

## 9. Step 2：观察 `let` Primitive 的 Widening

```ts
export let mutableStatus = "draft";
```

`let` 表示绑定可以重新赋值：

```ts
mutableStatus = "queued";
mutableStatus = "custom-text";
```

因此 Compiler 默认把初始字面量：

```ts
"draft"
```

扩大为：

```ts
string
```

这不是说当前值不是 `"draft"`，而是说变量位置允许未来承载其他 string。

### 数字与布尔也有类似概念

```ts
let retryCount = 0;       // 通常 number
let enabled = true;       // 通常 boolean
```

Literal Type 不是字符串专属能力。

---

## 10. Step 3：观察 Primitive `const` 保留字面量

```ts
export const fixedStatus = "draft";
```

这个绑定不能重新指向另一个值：

```ts
fixedStatus = "queued"; // JavaScript/TypeScript 都不允许
```

所以 Compiler 可以安全保留更精确的类型：

```ts
"draft"
```

它天然可赋值给：

```ts
JobStatus
```

因为 `"draft"` 是联合成员之一。

### Runtime 仍然只是 string

执行时：

```js
typeof fixedStatus === "string"
```

JavaScript Runtime 不存在名为 `"draft" type` 的额外对象。

---

## 11. Step 4：为什么 `const` Object 的属性仍然扩大

```ts
export const mutableJob = {
  status: "draft",
  channel: "email"
};
```

`const` 只阻止重新绑定变量：

```ts
mutableJob = anotherObject; // 不允许
```

它没有自动冻结对象：

```ts
mutableJob.status = "running"; // Runtime 合法
mutableJob.channel = "sms";    // Runtime 合法
```

因此属性被推断为：

```ts
{
  status: string;
  channel: string;
}
```

而不是：

```ts
{
  status: "draft";
  channel: "email";
}
```

这解释了为什么：

```ts
acceptStatus(mutableJob.status)
```

会报错。`string` 的集合太大，其中包含大量不属于 JobStatus 的值。

---

## 12. Step 5：用 Annotation 表达“可变但受限”

```ts
export const annotatedJob: {
  status: JobStatus;
  channel: "email" | "sms";
} = {
  status: "draft",
  channel: "email"
};
```

此时属性仍可变，但只能在合同范围内变化：

```ts
annotatedJob.status = "queued";   // 合法
annotatedJob.status = "running";  // 合法
annotatedJob.status = "deleted";  // 非法
```

这与 `as const` 的目的不同：

```text
Annotation
→ 允许变化
→ 但变化必须属于领域集合

as const
→ 当前对象被视为精确只读常量
```

对于状态机 Current State，通常需要 `JobStatus` Annotation；对于固定路由表、事件表、配置表，常需要 `as const` 或 `satisfies`。

---

## 13. Step 6：用 `as const` 保留嵌套字面量

```ts
export const frozenJob = {
  status: "queued",
  channel: "email",
  retries: [1, 2]
} as const;
```

Compiler 得到类似：

```ts
{
  readonly status: "queued";
  readonly channel: "email";
  readonly retries: readonly [1, 2];
}
```

三个效果：

```text
Property 变 readonly
Primitive Value 保留 Literal
Array 变成 readonly Tuple
```

### `as const` 不等于 Runtime Deep Freeze

生成 JavaScript 中不会自动出现：

```js
Object.freeze(...)
```

如果绕过 TypeScript 或由其他 JavaScript 代码持有引用，Runtime Object 仍可能被修改。

所以：

```text
as const
→ Static Readonly View

Object.freeze
→ Runtime Shallow Freeze

真正 Deep Immutable
→ 还需要更完整的 Runtime / Architecture 约束
```

---

## 14. Step 7：建立 Expected Error 对照

创建：

```text
src/expected-errors.ts
```

写入：

```ts
import {
  acceptStatus,
  fixedStatus,
  frozenJob,
  mutableJob,
  mutableStatus
} from "./index.js";

acceptStatus(fixedStatus);

// let 绑定需要允许后续赋入其他字符串，因此初始字面量被扩大为 string。
// @ts-expect-error -- string 不能保证属于 JobStatus
acceptStatus(mutableStatus);

// 对象属性默认可变，所以 mutableJob.status 也扩大为 string。
// @ts-expect-error -- mutableJob.status 的类型是 string
acceptStatus(mutableJob.status);

// as const 同时保留字面量并把属性设为 readonly。
// @ts-expect-error -- frozenJob.status 是只读属性
frozenJob.status = "running";

// @ts-expect-error -- readonly tuple 不能 push
frozenJob.retries.push(3);
```

### `fixedStatus` 可以通过

```ts
acceptStatus(fixedStatus);
```

因为类型是精确的 `"draft"`。

### `mutableStatus` 不能通过

```ts
acceptStatus(mutableStatus);
```

因为 `mutableStatus` 已扩大为 `string`。

### `mutableJob.status` 不能通过

对象属性允许任意字符串写入，因此不能保证属于 `JobStatus`。

### `frozenJob` 不能修改

```ts
frozenJob.status = "running";
frozenJob.retries.push(3);
```

都违反 `as const` 产生的 Readonly Contract。

执行：

```bash
npm run check
```

预期退出码 0，证明每个非法操作仍然被 Expected Error 精确保护。

---

## 15. Step 8：先运行，证明 Runtime 类型相同

执行：

```bash
npm run build
npm start
```

预期：

```text
mutable=draft; typeof=string
fixed=draft; typeof=string
accepted:draft
queued/email/retries=1,2
```

最重要的是前两行：

```text
Static Type: string       → Runtime typeof: string
Static Type: "draft"     → Runtime typeof: string
```

Literal Type 的精度只存在于 TypeScript Static Model 中。

---

## 16. Step 9：打开 Declaration，观察真实推断结果

打开：

```text
dist/index.d.ts
```

你应该看到：

```ts
export declare let mutableStatus: string;
export declare const fixedStatus = "draft";
```

继续：

```ts
export declare const mutableJob: {
  status: string;
  channel: string;
};
```

Annotation：

```ts
export declare const annotatedJob: {
  status: JobStatus;
  channel: "email" | "sms";
};
```

Const Assertion：

```ts
export declare const frozenJob: {
  readonly status: "queued";
  readonly channel: "email";
  readonly retries: readonly [1, 2];
};
```

这份文件就是本课最直接的 Learning Artifact。

不要仅依赖鼠标悬停截图，因为 `.d.ts` 能进入自动化测试和 Code Review。

---

## 17. Step 10：创建 Declaration 自动断言

创建：

```text
verify.mjs
```

写入：

```js
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === [
    "mutable=draft; typeof=string",
    "fixed=draft; typeof=string",
    "accepted:draft",
    "queued/email/retries=1,2"
  ].join("\n"),
  `输出不符合预期：${runtime.stdout}`
);

const declaration = readFileSync("dist/index.d.ts", "utf8");
assert(declaration.includes("mutableStatus: string"), "let 字面量应扩大为 string");
assert(declaration.includes('fixedStatus = "draft"'), "const 基础字面量应保留 draft");
assert(
  declaration.includes("status: string") && declaration.includes("channel: string"),
  "可变对象属性应扩大为 string"
);
assert(declaration.includes('readonly status: \"queued\"'), "as const 应保留 readonly queued");
assert(declaration.includes("readonly retries: readonly [1, 2]"), "as const 应生成 readonly tuple");

console.log("✓ KP006 验证通过：Declaration Emit 清楚展示了 widening、annotation 与 as const 的差异。" );
```

它读取 `dist/index.d.ts`，要求以下文本存在：

```text
mutableStatus: string
fixedStatus = "draft"
mutableJob.status: string
readonly status: "queued"
readonly retries: readonly [1, 2]
```

这把“Compiler 应怎样推断”从人工观察升级为可执行合同。

执行：

```bash
npm run verify
```

预期末行：

```text
✓ KP006 验证通过：Declaration Emit 清楚展示了 widening、annotation 与 as const 的差异。
```

---

## 18. Widening Decision Table

| 声明 | 是否可重新赋值 / 修改 | 常见推断 |
| --- | --- | --- |
| `let x = "draft"` | 绑定可重新赋值 | `string` |
| `const x = "draft"` | Primitive 绑定不可变 | `"draft"` |
| `const obj = { status: "draft" }` | 绑定不变，属性可变 | `{ status: string }` |
| `const obj: { status: JobStatus } = ...` | 属性可变但受联合约束 | `{ status: JobStatus }` |
| `const obj = {...} as const` | Static Readonly | 精确 Readonly Literal |
| Function Parameter `status: JobStatus` | 由边界合同决定 | `JobStatus` |

选择依据不是“哪一种最窄最好”，而是实际可变性和 API 意图。

---

## 19. Fresh Literal 与使用上下文

对象字面量刚创建时，Compiler 会结合它的使用位置判断类型。

例如直接传参：

```ts
acceptJob({ status: "draft" });
```

参数上下文可能帮助 `status` 按目标类型检查。

但先存入没有 Annotation 的可变对象：

```ts
const job = { status: "draft" };
acceptJob(job);
```

信息可能已经在变量推断时扩大。

所以排查 Literal 丢失时，要看完整信息流：

```text
Literal 在哪里创建？
是否先进入可变位置？
是否有 Contextual Type？
是否经过 Generic / Array / Object？
是否需要 Annotation、as const 或 const Type Parameter？
```

不要只盯最后报错的函数调用。

---

## 20. Annotation、`as const` 与 `satisfies` 的角色预览

### Annotation

```ts
const job: JobConfig = { ... };
```

目标：让 Value 受指定合同约束；变量通常以目标类型被观察。

### `as const`

```ts
const job = { ... } as const;
```

目标：保留最精确 Literal，并建立 Static Readonly。

### `satisfies`

```ts
const job = { ... } satisfies JobConfig;
```

目标：检查对象满足合同，同时尽量保留表达式自身推断信息。

`satisfies`、Excess Property Check 和精确对象建模在 08.02 完整学习。本课只先知道三者不是互相替代的语法装饰。

---

## 21. Wrong Way 与故障排查

### Wrong Way 1：遇到 Widening 就全部 `as const`

业务状态本来需要变化时，强行只读会迫使后续到处复制和断言。应该用领域 Union Annotation 表达“可变但受限”。

### Wrong Way 2：把 `as const` 当 Runtime Freeze

Static Check 之外的 JavaScript、反射或共享引用不会因为类型语法自动被冻结。

### Wrong Way 3：直接断言回窄

```ts
acceptStatus(mutableJob.status as JobStatus);
```

这没有阻止 `mutableJob.status = "deleted"`。正确修复通常是在对象创建边界建立 Contract。

### Wrong Way 4：把 `const object` 理解为深度不可变

`const` 只约束变量绑定。Object Property 和 Nested Array 默认仍可变。

### Wrong Way 5：追求最窄类型而忽略消费者需求

一个 Public Config 如果被推成过于具体的 Tuple / Literal，可能让合法扩展困难。精度服务业务，而不是类型体操。

### Wrong Way 6：只看 IDE Hover，不保存类型回归

关键 Public Inference 可以通过：

```text
.d.ts Snapshot
Type-level Test
@ts-expect-error
API Extractor Report
```

进入持续验证。

---

## 22. 更深原理

Widening 是 Compiler 在“当前精确值”和“未来可变能力”之间做出的建模决策。

可以把它理解为：

```text
Fresh Literal Information
        │
        ├── 进入不可变位置
        │      → 保留 Literal
        │
        ├── 进入可变位置
        │      → 扩大到 Primitive / Wider Type
        │
        └── 进入有 Context 的位置
               → 按目标合同检查和推断
```

这个模型会继续影响：

```text
Array Element
Object Property
Function Return
Generic Inference
Conditional Type
Discriminated Union
```

因此 Literal Widening 不是一个孤立小语法点，而是理解类型信息如何流动的入口。

---

## 23. API 设计中的影响

考虑一个配置 API：

```ts
register({
  event: "user.created",
  handler: (payload) => {}
});
```

如果 `event` 过早扩大为 `string`，后续就难以根据事件名推断 Payload。

类型设计常需要通过：

```text
Contextual Type
Generic Constraint
const Type Parameter
as const
satisfies
```

保留调用点 Literal 信息。

但这些工具会增加 API 类型复杂度。设计者要同时评估：

```text
调用者是否得到更好补全
错误是否可读
Declaration 是否稳定
Checker 性能是否可接受
```

Module 08.03 和 08.07 会继续深入。

---

## 24. Production Boundary

生产项目中的推荐策略：

```text
可变业务状态
→ 命名 Union / State Model

固定配置表
→ as const + satisfies（按需）

公共 API 输入
→ Contextual Contract

外部 string
→ Runtime Validation 后再变为 Union

关键推断
→ Declaration / Type Test 回归
```

不建议：

```text
所有字符串都换成 Enum
所有对象都 as const
所有报错都 as JobStatus
```

技术选择必须对应真实可变性、Runtime 边界和消费者体验。

---

## 25. 本课只记住 3 件事

1. Literal Widening 会在可变位置把 `"draft"` 扩大为 `string`；它描述未来可承载值，不是否认当前值。
2. `const` Primitive 常保留 Literal，但 `const object` 的属性默认仍可变，因此通常会扩大。
3. “可变但受限”使用领域 Annotation；“固定精确常量”使用 `as const`，并记住它不是 Runtime Freeze。

---

## 26. Challenge

新增事件注册表：

```ts
const eventDefinitions = {
  created: { topic: "user.created", retry: 3 },
  deleted: { topic: "user.deleted", retry: 0 }
};
```

要求：

1. 先观察普通推断的 `.d.ts`。
2. 使用 `as const` 保留 topic 和 retry Literal。
3. Expected Error 证明 topic 不能被修改。
4. 写出从常量派生的：

```ts
type Topic = typeof eventDefinitions[keyof typeof eventDefinitions]["topic"];
```

5. `Topic` 必须只接受两个合法事件名。
6. `verify.mjs` 自动检查 Declaration。
7. 说明为什么这里适合固定常量，而 `annotatedJob.status` 适合可变 Union。

验收：

```bash
npm run verify
```

---

## 27. Mastery Check

请用当前代码回答：

1. `let mutableStatus = "draft"` 为什么推成 string？
2. `const fixedStatus` 为什么保留 `"draft"`？
3. `const mutableJob` 已经是 const，属性为什么仍扩大？
4. `annotatedJob` 与 `frozenJob` 分别表达什么可变性？
5. `as const` 对 Nested Array 做了什么静态转换？
6. Runtime `typeof` 为什么无法区分 string 与 string literal type？
7. 为什么直接 `as JobStatus` 通常不是正确修复？
8. Declaration Emit 怎样成为推断回归证据？
9. `satisfies` 与 `as const` 的目标有什么不同？
10. Literal 信息对 Typed Event API 有什么价值？

能够从可变性和信息流解释，才算掌握。

---

## 28. 最终源码与实验说明

Widening 对照：

```text
src/index.ts
```

负向类型证据：

```text
src/expected-errors.ts
```

关键观察产物：

```text
dist/index.d.ts
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Handbook：Literal Types
- TypeScript Handbook：Type Inference
- TypeScript 3.4 Release Notes：Const Assertions
- Module 08.02 / 08.03 课程规划
