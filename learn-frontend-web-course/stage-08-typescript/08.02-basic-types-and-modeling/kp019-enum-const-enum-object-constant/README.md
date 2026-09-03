# KP019：enum、const enum、对象常量与 Literal Union 选型

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Should / Expert |
| Pattern | ARCHITECTURE-LAB + EMIT-LAB + FAILURE-LAB |
| 主问题 | 同样是“有限值集合”，Literal Union、对象常量、enum 与 const enum 为什么会产生完全不同的 Runtime、Emit 和公共 API？ |
| 前置课程 | [KP018：Literal Union、常量派生与 as const](../kp018-literal-union-as-const/) |
| 下一课程 | [KP020：Index Signature、Record 与 noUncheckedIndexedAccess](../kp020-index-signature-record-no-unchecked-indexed-access/) |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课不是罗列四种写法，而是建立一套可以用于真实项目评审的有限值选型实验。

最终项目同时保留：

```text
Literal Union
+ as const Object Constant
+ String enum
+ Numeric enum
+ const enum
+ 两套不同 Emit 配置
+ Expected Error
+ Runtime Output
+ Declaration Surface
+ Architecture Decision Matrix
```

完成后，你必须能够回答：

1. 哪些方案只存在于 Type Space？
2. 哪些方案会生成 Runtime Object？
3. 哪些方案可以直接枚举所有值？
4. 哪些方案会改变 JavaScript 产物？
5. 哪些方案容易给 SDK Consumer 制造版本风险？
6. 为什么 `const enum` 的行为依赖编译配置和构建工具？
7. 为什么外部字符串即使“看起来属于 Union”，仍然需要 Runtime Guard？

---

## 2. 先建立统一问题模型

假设系统里存在四个工作流状态：

```text
draft
queued
running
completed
```

我们希望同时获得：

```text
编译期限制
Runtime 值列表
Label Map
外部字符串校验
SDK 声明
稳定 Emit
```

四种方案并不提供相同能力。

### 2.1 Literal Union

```ts
type WorkflowStatus =
  | "draft"
  | "queued"
  | "running"
  | "completed";
```

它的特点：

```text
Static Type：有
Runtime Object：无
Runtime 枚举值：无
额外 JavaScript：无
```

如果只写 Union，Runtime 并不知道所有合法值是什么。

### 2.2 Object Constant + Derived Union

```ts
const WORKFLOW_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;

type WorkflowStatus =
  (typeof WORKFLOW_STATUS)[keyof typeof WORKFLOW_STATUS];
```

它提供：

```text
Runtime Object
+ 精确 Literal
+ Derived Union
+ Object.values()
+ Label / Guard 的单一事实来源
```

这是前端配置、事件名、状态名和 SDK 常量最常用的默认方案之一。

### 2.3 enum

```ts
enum ApiMode {
  Sandbox = "sandbox",
  Live = "live"
}
```

`enum` 同时创建类型和值，并生成 JavaScript Runtime Object。

String enum 不会产生数字反向映射；Numeric enum 通常会产生：

```text
0 → "Draft"
"Draft" → 0
```

这意味着 Numeric enum 的 Runtime Object 不只是你写下的三个名称。

### 2.4 const enum

```ts
const enum RetryBudget {
  Low = 1,
  Normal = 3,
  High = 5
}
```

`const enum` 的目标是允许编译器把成员引用内联成常量，但这不是一个可以脱离配置讨论的结论。

本项目保留两条构建路线：

```text
课程主配置
verbatimModuleSyntax / isolated compilation compatible
→ 保留 const enum Runtime Object

显式 inline 配置
preserveConstEnums = false
→ 内联成员值并移除独立对象
```

因此，架构结论不能写成：

```text
const enum 永远没有 Runtime Object
```

正确结论是：

```text
const enum 的 Emit 与工具链、isolated compilation 和 preserveConstEnums 策略绑定。
```

---

## 3. 四种方案的决策矩阵

| 需求 | Literal Union | Object Constant + Union | enum | const enum |
| --- | --- | --- | --- | --- |
| 只需要 Static 限制 | 很适合 | 可以 | 可以 | 可以 |
| Runtime 需要列出全部值 | 自己维护第二份数据 | 很适合 | 可以 | 配置相关 |
| 不希望增加 Runtime JavaScript | 最少 | 会保留对象 | 会生成对象 | 可能内联 |
| 希望值和类型单一事实来源 | 单独 Union 不够 | 很适合 | enum 自身可承担 | 依赖构建策略 |
| JSON / HTTP 字符串互操作 | 很自然 | 很自然 | String enum 需要显式成员 | 数值更容易失去语义 |
| 发布公共 SDK | 清晰 | 清晰 | 可用但形成 enum API | 风险最高 |
| Tree-shaking 可预测性 | 高 | 通常较好 | 取决于 Emit / Bundler | 取决于配置 |
| Numeric Reverse Mapping | 无 | 无 | Numeric enum 有 | 配置相关 |
| 跨 Babel / SWC / isolatedModules | 简单 | 简单 | 通常可处理 | 需要特别审查 |

默认优先级：

```text
Literal Union
或
as const Constant + Derived Union
```

只有在确实需要 enum namespace、生成器互操作或既有公共协议时，才把 `enum` 当作显式架构选择。

`const enum` 默认限制在：

```text
单仓库内部
+ 编译链完全受控
+ 不发布 ambient const enum
+ 有 Emit Regression
```

---

## 4. 项目目录

```text
kp019-enum-const-enum-object-constant/
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.inline.json
├── verify.mjs
└── src/
    ├── index.ts
    └── expected-errors.ts
```

这里比普通 Lesson 多一个：

```text
tsconfig.inline.json
```

它不是为了“多一个配置文件”，而是为了保存 `const enum` 的配置敏感证据。

---

## 5. 从零运行

```bash
npm install
npm run check
npm run build
npm run build:inline
npm start
npm run verify
```

命令职责：

| 命令 | 作用 |
| --- | --- |
| `npm run check` | 检查正常代码与 Expected Error |
| `npm run build` | 按课程主配置生成 `dist/` |
| `npm run build:inline` | 按显式内联配置生成 `dist-inline/` |
| `npm start` | 执行课程主配置产物 |
| `npm run verify` | 比较 Runtime、`.d.ts` 与两套 JavaScript Emit |

---

## 6. 实现步骤

### Step 1：建立 Runtime Object Constant

先定义：

```ts
export const WORKFLOW_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;
```

然后派生：

```ts
export type WorkflowStatus =
  (typeof WORKFLOW_STATUS)[keyof typeof WORKFLOW_STATUS];
```

Runtime 与 Static Type 来自同一份定义。

### Step 2：增加 String enum

String enum 适合与字符串协议对齐，但 Consumer 不能把普通 `"live"` 直接当成 `ApiMode.Live`。

这是一种 API 身份选择，不只是另一种 Union 语法。

### Step 3：观察 Numeric enum

Numeric enum 的 JavaScript Emit 会建立正向与反向映射。

在协议中使用数字时，必须明确：

```text
数字值是否稳定
是否允许插入新成员
是否需要反向名称
日志里看到 1 是否可理解
```

### Step 4：增加 const enum

使用 `RetryBudget.Normal` 观察不同配置下的 Emit。

### Step 5：建立 Runtime Guard

外部字符串必须经过：

```text
string
→ Object.values(WORKFLOW_STATUS)
→ isWorkflowStatus
→ WorkflowStatus
```

类型声明不会自动校验 HTTP、Storage 或 JSON 输入。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export const WORKFLOW_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;

export type WorkflowStatus =
  (typeof WORKFLOW_STATUS)[keyof typeof WORKFLOW_STATUS];

export enum ApiMode {
  Sandbox = "sandbox",
  Live = "live"
}

export enum NumericPhase {
  Draft,
  Ready,
  Done
}

export const enum RetryBudget {
  Low = 1,
  Normal = 3,
  High = 5
}

export const STATUS_LABEL: Record<WorkflowStatus, string> = {
  draft: "草稿",
  queued: "排队中",
  running: "执行中",
  completed: "已完成"
};

export function describeStatus(status: WorkflowStatus): string {
  return `${status}:${STATUS_LABEL[status]}`;
}

export function isWorkflowStatus(value: string): value is WorkflowStatus {
  return (Object.values(WORKFLOW_STATUS) as readonly string[]).includes(value);
}

export function canRetry(
  budget: RetryBudget,
  attempts: number
): boolean {
  return attempts < budget;
}

const parsed = ["queued", "paused"].map((value) =>
  isWorkflowStatus(value) ? describeStatus(value) : `invalid:${value}`
);

console.log("ENUM_DECISION");
console.log(`objectValues=${Object.values(WORKFLOW_STATUS).join(",")}`);
console.log(`stringEnum=${ApiMode.Live}:${Object.keys(ApiMode).length}`);
console.log(`numericEnum=${NumericPhase.Ready}:${NumericPhase[NumericPhase.Ready]}`);
console.log(`constEnum=${RetryBudget.Normal}:${canRetry(RetryBudget.Normal, 2)}`);
console.log(`parsed=${parsed.join("|")}`);
```

### `src/expected-errors.ts`

```ts
import {
  ApiMode,
  WORKFLOW_STATUS,
  type RetryBudget,
  type WorkflowStatus
} from "./index.js";

// @ts-expect-error -- Literal Union 只接受已声明的工作流状态。
const invalidStatus: WorkflowStatus = "paused";
void invalidStatus;

// String enum 不是普通字符串联合，原始字符串不能直接赋给 enum。
// @ts-expect-error -- "live" 不是 ApiMode 成员值的类型身份。
const rawMode: ApiMode = "live";
void rawMode;

// @ts-expect-error -- as const 对象常量的属性是 readonly。
WORKFLOW_STATUS.Queued = "waiting";

// @ts-expect-error -- RetryBudget 只允许 1、3、5 三个成员值。
const invalidBudget: RetryBudget = 2;
void invalidBudget;

function acceptMode(mode: ApiMode): ApiMode {
  return mode;
}

// @ts-expect-error -- Consumer 必须显式使用 ApiMode.Live。
acceptMode("live");
```

Expected Error 分别保护：

```text
非法 Literal
原始字符串冒充 String enum
修改 readonly Object Constant
非法 const enum Member Value
公共函数绕过 enum 身份
```

---

## 8. 两套 tsconfig 为什么都要保留

### 8.1 课程主配置

课程统一开启：

```json
{
  "verbatimModuleSyntax": true,
  "strict": true,
  "declaration": true
}
```

现代工程常常还需要 isolated-file transpilation 兼容。此时 `const enum` 可能被保留为 Runtime Object。

### 8.2 Inline 对照配置

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "verbatimModuleSyntax": false,
    "isolatedModules": false,
    "preserveConstEnums": false,
    "outDir": "dist-inline"
  },
  "include": [
    "src/index.ts"
  ],
  "exclude": [
    "dist",
    "dist-inline"
  ]
}
```

这条路线显式关闭：

```text
verbatimModuleSyntax
isolatedModules
preserveConstEnums
```

使编译器能够执行整体程序级内联。

### 8.3 为什么不能只看 TypeScript 源码

同一段：

```ts
RetryBudget.Normal
```

可能变成：

```js
RetryBudget.Normal
```

也可能变成：

```js
3
```

这会影响：

```text
Runtime Object
Debugging
Bundler
Consumer Build
Version Drift
Declaration Publish
```

所以 `const enum` 选型必须审查产物，不只审查 `.ts`。

---

## 9. Failure Lab

### Failure 1：把 enum 当普通 String Union

错误假设：

```ts
const mode: ApiMode = "live";
```

String enum 引入的是显式 enum Member 身份。调用者通常需要：

```ts
ApiMode.Live
```

这可能是优点，也可能让 JSON / Form / URL 字符串互操作更啰嗦。

### Failure 2：忽略 Numeric enum 的反向映射

下面的 Runtime Object 同时包含数字键和名称键。

因此：

```ts
Object.keys(NumericPhase)
```

并不只返回三个成员名。

### Failure 3：假设 const enum 永远内联

构建工具链变化后，如果 `const enum` 被保留：

```text
产物大小
Runtime API
Tree-shaking
Consumer 行为
```

都可能变化。

### Failure 4：把有限值 Type 当 Runtime Validation

```ts
type Status = "queued" | "running";
```

不会让 `"paused"` 在 Runtime 自动失败。

必须有 Guard 或 Schema。

### Failure 5：发布 ambient const enum

公共 `.d.ts` 中的 const enum 会让 Consumer 在自己的构建阶段内联值。

如果库升级后 Member Value 变化，而 Consumer 没有完整重编译，可能出现版本漂移。

---

## 10. 预期 Runtime 输出

```text
ENUM_DECISION
objectValues=draft,queued,running,completed
stringEnum=live:2
numericEnum=1:Ready
constEnum=3:true
parsed=queued:排队中|invalid:paused
```

这组输出证明：

- Object Constant 可被 Runtime 枚举；
- String enum 是 Runtime Object；
- Numeric enum 存在反向映射；
- `RetryBudget.Normal` 的业务值是 3；
- 外部 `"paused"` 没有被 Static Type 自动接纳。

---

## 11. Declaration 与 Emit Evidence

`dist/index.d.ts` 应包含：

```ts
export declare const WORKFLOW_STATUS: {
  readonly Draft: "draft";
  readonly Queued: "queued";
  readonly Running: "running";
  readonly Completed: "completed";
};

export declare enum ApiMode { ... }
export declare enum NumericPhase { ... }
export declare const enum RetryBudget { ... }
```

`verify.mjs` 还会比较：

```text
dist/index.js
dist-inline/index.js
```

验收条件包括：

- 普通 enum 在两条路线中都有 Runtime 表达；
- 主配置保留 `RetryBudget`；
- inline 配置不生成独立 `export var RetryBudget`；
- Literal Constant 的 `.d.ts` 保留 readonly 精确值。

---

## 12. 生产级选型规则

### Rule 1：有限字符串默认使用 Union 或常量派生 Union

适合：

```text
状态
主题
事件名
权限名
渠道名
Feature Flag
Route Name
```

### Rule 2：Runtime 需要列表时，优先 Object / Array Constant

不要维护：

```text
一份 Union
+ 一份 Options
+ 一份 Validator
```

让它们从同一常量派生。

### Rule 3：enum 必须说明为什么需要 Runtime Namespace

PR 说明至少回答：

```text
为什么 Union 不够？
为什么 Object Constant 不够？
Consumer 是否需要 enum Member Identity？
Emit 是否已检查？
```

### Rule 4：避免 Numeric enum 作为未经版本治理的公共协议

如果数字已经进入数据库、消息队列或网络协议，Member Value 就是兼容性合同。

### Rule 5：const enum 默认不进入公共 SDK

除非：

```text
Consumer 编译链受控
版本同步受控
声明处理受控
有跨版本测试
```

### Rule 6：外部输入仍然走 Runtime Boundary

```text
unknown / string
→ Guard / Schema
→ Domain Literal Union
```

---

## 13. 常见误区

1. **“enum 比 Union 更高级”**：它们的 Runtime 和 API 语义不同，不是级别关系。
2. **“String enum 就是字符串”**：值相同不代表赋值模型相同。
3. **“Numeric enum 更省空间”**：还要考虑反向映射与可读性。
4. **“const enum 一定没有产物”**：它依赖配置和工具链。
5. **“as const 可以替代 enum 的一切”**：是否需要 namespace、nominal-like Member Identity 和生成器互操作仍需判断。
6. **“类型合法就不用校验接口数据”**：Static Type 不执行 Runtime Validation。

---

## 14. Mastery Check

不看本课源码，独立完成：

1. 用自己的业务状态分别实现 Union、Object Constant 和 enum。
2. 查看三者的 `.d.ts` 与 `.js`。
3. 为 Numeric enum 证明反向映射。
4. 为 const enum 建立两套 Emit 配置。
5. 写一个从 Runtime Constant 派生的 Type Guard。
6. 写一份不超过一页的选型 ADR。
7. 解释为什么公共 SDK 应慎用 const enum。
8. 给出一个 enum 比 Literal Union 更合适的真实场景。

---

## 15. 本课结论

```text
有限值选型
不是语法偏好

它同时决定：
Static Type
Runtime Object
JavaScript Emit
Consumer Experience
Tree-shaking
Debugging
Version Compatibility
```

下一课进入动态键问题：

> 当键空间是开放的、有限的或部分存在时，Index Signature、Record 和 `noUncheckedIndexedAccess` 应该怎样组合？
