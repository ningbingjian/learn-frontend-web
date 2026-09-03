# KP004：编译期类型安全为什么不等于运行时安全

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must / Should |
| Pattern | FAILURE-LAB + SECURITY-LAB |
| 主问题 | TypeScript 已经通过检查，为什么外部 JSON 仍然可能让程序崩溃或产生脏数据？ |
| 最终证据 | 不安全 Runtime 崩溃、`unknown` 诊断、Runtime Guard、合法/非法载荷对照 |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

你会构建两条完全不同的数据入口。

### 不安全入口

```text
JSON.parse
→ 得到未经验证的值
→ 直接访问字段和调用方法
→ 错误字段类型在 Runtime 触发 TypeError
```

### 安全入口

```text
JSON Text
→ parseJson(): unknown
→ isRecord
→ 检查 eventId
→ 检查 status
→ 检查 attempts
→ 构造可信 DeliveryEvent
→ 业务代码使用
```

最终程序会同时处理一份合法数据和一份非法数据：

```text
accepted:event=evt-42,status=delivered,attempts=2
rejected:payload.attempts must be a finite number >= 0
```

自动验收还会证明：

```text
Interface 在 JavaScript 中已经消失
Runtime Guard 的 typeof / Number.isFinite 仍然存在
```

这就是本课最核心的边界：

> 静态类型只检查编译器能够看到并信任的程序关系；来自网络、存储、用户和第三方系统的真实值，必须在 Runtime 建立证据。

---

## 2. 本课解决什么问题

假设后端契约写的是：

```ts
interface DeliveryEvent {
  eventId: string;
  status: "queued" | "delivered" | "failed";
  attempts: number;
}
```

这段声明不会自动改变 HTTP Response，也不会在 Runtime 生成验证器。

真实响应可能是：

```json
{
  "eventId": 42,
  "status": "delivered",
  "attempts": "2"
}
```

如果开发者直接断言：

```ts
const event = JSON.parse(text) as DeliveryEvent;
```

Checker 会相信这个声明，但 Runtime 值没有发生任何转换：

```text
42 仍然是 number
"2" 仍然是 string
```

于是项目得到的是“类型看起来安全，值实际上不可信”的假安全状态。

---

## 3. 信任边界

TypeScript 项目里最重要的架构问题之一不是“这个变量写什么类型”，而是：

> 这个值来自哪里？我们凭什么相信它？

常见不可信边界：

```text
HTTP / GraphQL Response
WebSocket / SSE Message
localStorage / IndexedDB
URL Query / Route Param
postMessage
Environment Variable
用户导入的 JSON / CSV
第三方 SDK Callback
旧版本持久化数据
跨服务消息队列
```

这些值即使在 TypeScript 文件中被接收，也不会因为文件扩展名是 `.ts` 自动变得正确。

---

## 4. 前置知识与本课边界

### 已经需要知道

- KP001：类型检查发生在 Runtime 之前。
- KP003：Interface 会从 JavaScript Emit 中消失。
- JavaScript `JSON.parse`、`typeof`、Object 和 Exception 基础。

### 本课完整学习

- Static Type Safety 与 Runtime Data Safety 的边界。
- `any` 为什么会穿透安全网。
- `unknown` 为什么适合系统边界。
- Type Guard 如何把 Runtime 证据反馈给 Checker。
- Discriminated Result 如何让成功与失败显式化。
- Validation、Transformation、Assertion 三者的差异。

### 本课暂不展开

- Zod、JSON Schema、复杂错误路径：Module 08.10。
- OpenAPI Contract 与生成客户端：Module 08.11。
- 完整判别联合与控制流缩窄：Module 08.04。
- 服务端权限与业务安全：Stage 25。

---

## 5. 本课项目介绍

目标数据模型：

```text
eventId：非空 string
status：queued / delivered / failed
attempts：有限 number，且 >= 0
```

注意：

```ts
attempts: number
```

只描述静态类型，仍没有表达：

```text
必须有限
不能是 NaN
不能小于 0
```

所以 Runtime Validation 会补充业务不变量。

本课使用手写 Guard，是为了看清最底层机制；后续 Schema Library 只是把同样的验证、错误收集和类型推断系统化。

---

## 6. 起始状态

本课从新的空目录开始，不复制 KP003。

```bash
mkdir kp004-compile-time-vs-runtime
cd kp004-compile-time-vs-runtime
mkdir src
```

原因：本课需要同时保存一个纯 JavaScript 故障基线和一个安全 TypeScript 入口，独立项目最容易观察信任边界。

---

## 7. 最终会有哪些文件

```text
kp004-compile-time-vs-runtime/
├── README.md
├── package.json
├── tsconfig.json
├── unsafe-boundary.mjs       # 故意信任 JSON 的 Runtime 崩溃基线
├── verify.mjs                # 同时验证失败路径和安全路径
└── src/
    ├── index.ts              # unknown + Runtime Guard 主线
    └── expected-errors.ts    # unknown 不能直接使用的负向类型证据
```

---

## 8. Step 0：建立命令契约

创建 `package.json`：

```json
{
  "name": "@learn-frontend-web/ts-kp004-compile-time-vs-runtime",
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
    "verify": "npm run check && npm run build && node verify.mjs",
    "start:unsafe": "node unsafe-boundary.mjs"
  },
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

本课比普通项目多一个命令：

```bash
npm run start:unsafe
```

它运行故意损坏的边界，用于观察真实 Runtime Failure。

安装：

```bash
npm install
```

---

## 9. Step 1：建立 Strict 配置

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

本课最关键的配置关系是：

```json
"strict": true,
"useUnknownInCatchVariables": true
```

但是请注意：配置只能约束 TypeScript 对程序的分析，不能替代对真实 JSON 的 Runtime 检查。

---

## 10. Step 2：先制造不安全 Runtime 基线

创建：

```text
unsafe-boundary.mjs
```

写入：

```js
const payload = JSON.parse('{"eventId":42,"status":"delivered","attempts":"2"}');

console.log(`event=${payload.eventId.toUpperCase()}`);
```

运行：

```bash
npm run start:unsafe
```

预期抛出类似：

```text
TypeError: payload.eventId.toUpperCase is not a function
```

### 为什么发生

载荷中：

```json
"eventId": 42
```

真实值是 `number`。读取不存在的方法：

```js
payload.eventId.toUpperCase
```

得到 `undefined`；继续调用便抛出 TypeError。

### 为什么 JSON.parse 没有阻止它

`JSON.parse` 只负责：

```text
JSON Text → JavaScript Value
```

它不知道你的领域契约，也不会检查 `eventId` 是否应该是 string。

---

## 11. Step 3：先把外部值降为 unknown

创建：

```text
src/index.ts
```

最终完整内容如下，后面逐段解释：

```ts
type DeliveryStatus = "queued" | "delivered" | "failed";

interface DeliveryEvent {
  readonly eventId: string;
  readonly status: DeliveryStatus;
  readonly attempts: number;
}

type ParseResult =
  | { readonly ok: true; readonly value: DeliveryEvent }
  | { readonly ok: false; readonly error: string };

function parseJson(text: string): unknown {
  return JSON.parse(text) as unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDeliveryStatus(value: unknown): value is DeliveryStatus {
  return value === "queued" || value === "delivered" || value === "failed";
}

function parseDeliveryEvent(text: string): ParseResult {
  let input: unknown;

  try {
    input = parseJson(text);
  } catch {
    return { ok: false, error: "payload is not valid JSON" };
  }

  if (!isRecord(input)) {
    return { ok: false, error: "payload must be an object" };
  }

  if (typeof input.eventId !== "string" || input.eventId.length === 0) {
    return { ok: false, error: "payload.eventId must be a non-empty string" };
  }

  if (!isDeliveryStatus(input.status)) {
    return { ok: false, error: "payload.status is invalid" };
  }

  if (
    typeof input.attempts !== "number" ||
    !Number.isFinite(input.attempts) ||
    input.attempts < 0
  ) {
    return { ok: false, error: "payload.attempts must be a finite number >= 0" };
  }

  return {
    ok: true,
    value: {
      eventId: input.eventId,
      status: input.status,
      attempts: input.attempts
    }
  };
}

function describe(result: ParseResult): string {
  if (!result.ok) {
    return `rejected:${result.error}`;
  }

  const event = result.value;
  return `accepted:event=${event.eventId},status=${event.status},attempts=${event.attempts}`;
}

const validPayload = '{"eventId":"evt-42","status":"delivered","attempts":2}';
const invalidPayload = '{"eventId":"evt-43","status":"delivered","attempts":"2"}';

console.log(describe(parseDeliveryEvent(validPayload)));
console.log(describe(parseDeliveryEvent(invalidPayload)));
```

最先关注：

```ts
function parseJson(text: string): unknown {
  return JSON.parse(text) as unknown;
}
```

标准 Library 中 `JSON.parse` 的结果历史上允许以宽松方式流入程序。我们在系统边界主动把它收窄为：

```ts
unknown
```

`unknown` 的人话含义：

> 当前确实有一个值，但在建立证据之前，不允许假装知道它的结构。

### unknown 与 any 的区别

```text
any
→ 关闭后续检查
→ 可以访问任意属性、任意调用

unknown
→ 保留未知事实
→ 必须经过缩窄后才能使用
```

外部数据入口优先使用 `unknown`，不是因为它“更高级”，而是因为它迫使验证发生。

---

## 12. Step 4：证明 unknown 不能直接进入业务

创建：

```text
src/expected-errors.ts
```

写入：

```ts
interface DeliveryEvent {
  readonly eventId: string;
  readonly attempts: number;
}

const payload: unknown = JSON.parse('{"eventId":"evt-1","attempts":1}') as unknown;

// unknown 必须先缩窄，不能直接访问属性。
// @ts-expect-error -- payload 的运行时形状尚未被证明
payload.eventId;

// 静态类型不能把 unknown 自动当成业务对象。
// @ts-expect-error -- 需要 Runtime Validation
const event: DeliveryEvent = payload;

void event;
```

执行：

```bash
npm run check
```

预期退出码 0，因为两条非法操作都由 `@ts-expect-error` 保护。

它们证明：

```text
unknown.eventId
→ 不允许，因为对象性与属性都未证明

const event: DeliveryEvent = payload
→ 不允许，因为 unknown 不能自动满足领域对象
```

这不是 TypeScript “太严格”，而是信任边界正在正常工作。

---

## 13. Step 5：先证明值是非空对象

在 `src/index.ts` 中：

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

### 为什么不能只判断 `typeof value === "object"`

JavaScript 中：

```js
typeof null === "object"
```

所以还必须排除 `null`。

### `value is Record<string, unknown>` 是什么

这是 User-defined Type Predicate。

它告诉 Checker：

```text
当函数返回 true
→ value 可被缩窄为一个可按字符串 key 读取的对象
→ 每个属性值仍然是 unknown
```

Guard 本身是 Runtime Function，会保留在 JavaScript 中；Predicate 语法属于静态信息，会被擦除。

---

## 14. Step 6：验证有限状态字段

```ts
function isDeliveryStatus(value: unknown): value is DeliveryStatus {
  return value === "queued" || value === "delivered" || value === "failed";
}
```

Runtime 真正执行的是三次 Equality Check。

当它返回 true，Checker 才把 value 视为：

```ts
"queued" | "delivered" | "failed"
```

不要写成：

```ts
return true;
```

Type Predicate 是开发者向 Checker 提供的证明接口。如果实现说谎，TypeScript 不会自动验证证明函数本身的逻辑正确性。

---

## 15. Step 7：逐字段建立 Runtime 证据

`parseDeliveryEvent` 的验证顺序是：

```text
1. JSON 是否能解析
2. 顶层是否是非空对象
3. eventId 是否是非空 string
4. status 是否属于合法集合
5. attempts 是否是有限 number 且 >= 0
```

对应代码：

```ts
if (typeof input.eventId !== "string" || input.eventId.length === 0) {
  return { ok: false, error: "payload.eventId must be a non-empty string" };
}
```

```ts
if (!isDeliveryStatus(input.status)) {
  return { ok: false, error: "payload.status is invalid" };
}
```

```ts
if (
  typeof input.attempts !== "number" ||
  !Number.isFinite(input.attempts) ||
  input.attempts < 0
) {
  return { ok: false, error: "payload.attempts must be a finite number >= 0" };
}
```

只有所有证据成立后，才构造：

```ts
{
  eventId: input.eventId,
  status: input.status,
  attempts: input.attempts
}
```

这一步很重要：不要直接把原始 Input Object 断言成 Domain Object。通过重新构造，可以只允许已验证字段进入可信区域。

---

## 16. Step 8：用 Result 显式表达成功和失败

```ts
type ParseResult =
  | { readonly ok: true; readonly value: DeliveryEvent }
  | { readonly ok: false; readonly error: string };
```

这是一个判别联合的初步使用。

调用者必须先判断：

```ts
if (!result.ok) {
  return `rejected:${result.error}`;
}
```

之后才能访问：

```ts
result.value
```

这比以下模式更清楚：

```text
返回 DeliveryEvent | null
→ 失败原因丢失

验证失败时随处 throw
→ 普通数据错误变成隐式控制流

返回一个带大量可选字段的对象
→ 合法与非法组合太多
```

Module 08.04 会完整学习 Union State Modeling。本课只用它承载 Validation 结果。

---

## 17. Step 9：运行合法与非法载荷

执行：

```bash
npm run check
npm run build
npm start
```

预期：

```text
accepted:event=evt-42,status=delivered,attempts=2
rejected:payload.attempts must be a finite number >= 0
```

### 第一行证明

```text
合法 JSON
→ 每个字段都有 Runtime 证据
→ 转换为 DeliveryEvent
→ 业务逻辑正常使用
```

### 第二行证明

```text
attempts 是 "2"
→ JSON 语法合法
→ 但领域类型错误
→ Runtime Validator 明确拒绝
→ 没有进入业务区
```

注意：“非法数据被拒绝”也是正确结果，不应只测试 Happy Path。

---

## 18. Step 10：检查 Emit 后什么仍然存在

构建后打开：

```text
dist/index.js
```

你不会看到：

```text
interface DeliveryEvent
value is DeliveryStatus
: ParseResult
```

但会看到：

```js
typeof input.eventId !== "string"
Number.isFinite(input.attempts)
input.attempts < 0
```

关系是：

```text
Type Model
→ 用于 Compile-time
→ Emit 后擦除

Validation Expression
→ 用于 Runtime
→ Emit 后保留
```

这也是判断一段代码是否真正验证数据的快速方法：

> 它在生成 JavaScript 后是否仍有可执行检查？

---

## 19. Step 11：建立双路径自动验收

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

const safe = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(safe.status === 0, `安全主线运行失败：${safe.stderr}`);
const lines = safe.stdout.trim().split(/\r?\n/);
assert(
  lines[0] === "accepted:event=evt-42,status=delivered,attempts=2",
  `合法数据结果错误：${lines[0]}`
);
assert(
  lines[1] === "rejected:payload.attempts must be a finite number >= 0",
  `非法数据没有被拒绝：${lines[1]}`
);

const unsafe = spawnSync(process.execPath, ["unsafe-boundary.mjs"], { encoding: "utf8" });
assert(unsafe.status !== 0, "不安全基线应当在运行时失败");
assert(unsafe.stderr.includes("toUpperCase"), "应当观察到错误字段导致的 TypeError");

const emitted = readFileSync("dist/index.js", "utf8");
assert(!emitted.includes("interface DeliveryEvent"), "interface 不应存在于运行时代码");
assert(emitted.includes("typeof input.eventId"), "Runtime Guard 必须保留在 JavaScript 中");

console.log("✓ KP004 验证通过：静态类型已擦除，Runtime Guard 才能验证外部数据。" );
```

这个脚本故意同时执行：

```text
安全主线
→ 必须退出 0
→ 合法数据 accepted
→ 非法数据 rejected

不安全基线
→ 必须非 0 退出
→ stderr 中出现 toUpperCase TypeError 线索
```

还读取 Emit JavaScript，验证：

```text
Interface 已擦除
Runtime Guard 仍存在
```

执行：

```bash
npm run verify
```

预期末行：

```text
✓ KP004 验证通过：静态类型已擦除，Runtime Guard 才能验证外部数据。
```

---

## 20. 图解：从 Untrusted 到 Trusted

```text
Outside World
HTTP / Storage / User / Message
             │
             ▼
       string / bytes
             │
             ▼
          JSON.parse
             │
             ▼
           unknown
             │
     ┌───────┴────────┐
     │ Runtime checks │
     │ shape + value  │
     └───────┬────────┘
         fail│pass
             │
      ┌──────┴─────────┐
      ▼                ▼
Parse Error      Validated DTO
                       │
                       ▼
                 Domain Model
                       │
                       ▼
                 Business Logic
```

关键规则：

```text
越过信任边界
必须有 Runtime Evidence
```

---

## 21. Assertion、Validation 与 Transformation

### Assertion

```ts
const event = payload as DeliveryEvent;
```

它只改变 Checker 的看法，不检查、不转换真实值。

### Validation

```ts
typeof input.eventId === "string"
```

它在 Runtime 检查约束，并产生可观察分支。

### Transformation

```ts
const attempts = Number(input.attempts);
```

它把输入转换为另一个值，但转换后仍应验证：

```ts
Number.isFinite(attempts)
```

不能把 Coercion 当作天然正确。例如：

```js
Number("") === 0
```

是否允许空字符串变 0，是业务决策，不是 JavaScript 自动替你做出的正确结论。

---

## 22. Wrong Way 与故障排查

### Wrong Way 1：`as DeliveryEvent`

```ts
const event = JSON.parse(text) as DeliveryEvent;
```

这会产生静态假象，没有 Runtime Evidence。

### Wrong Way 2：边界使用 any

```ts
const event: any = JSON.parse(text);
```

`any` 会继续污染调用链，让属性、方法和赋值都失去检查。

### Wrong Way 3：Guard 只检查对象，不检查字段

```ts
if (typeof value === "object") {
  return value as DeliveryEvent;
}
```

只证明“可能是对象”，没有证明字段及不变量。

### Wrong Way 4：Type Predicate 实现说谎

```ts
function isDeliveryEvent(value: unknown): value is DeliveryEvent {
  return true;
}
```

Predicate 是信任接口；它必须有 Runtime Test 覆盖。

### Wrong Way 5：验证后仍传递原始大对象

重新构造最小可信 DTO，可以防止多余、未验证字段进入 Domain。

### Wrong Way 6：只测试合法数据

Validator 的主要价值在 Reject Path。至少测试：

```text
非 JSON
null
array
字段缺失
字段类型错误
非法枚举
NaN / Infinity
边界值
```

---

## 23. Security 与可靠性边界

Runtime Validation 能减少：

```text
类型混淆
脏数据传播
意外崩溃
不可解释的下游错误
契约漂移静默通过
```

但它不等于完整安全机制。

它不能替代：

```text
Authentication
Authorization
Rate Limit
Output Encoding
CSRF / XSS 防护
业务权限校验
数字范围与资源消耗限制
服务端最终约束
```

例如客户端验证 `attempts >= 0`，服务端仍必须自行验证，不能信任客户端。

---

## 24. 更深原理

### 24.1 静态系统分析的是模型，不是未来的网络值

Compiler 可以分析源码中可见表达式、声明和控制流；它不能在构建时知道明天某个 API 会返回什么字节。

### 24.2 Narrowing 把 Runtime 分支反馈给 Static Model

当代码执行：

```ts
if (typeof input.eventId !== "string") return ...;
```

在后续控制流中，Checker 能把：

```ts
input.eventId
```

缩窄为 `string`。这是 Runtime Check 与 Static Analysis 协作，而不是二选一。

### 24.3 Parse Result 是 Anti-corruption Boundary

外部数据模型与内部领域模型不应直接等同。Validator / Adapter 层负责：

```text
拒绝非法数据
转换兼容格式
丢弃不需要字段
生成内部稳定模型
记录错误路径和版本
```

这会在 08.10、08.11、08.14 继续演进。

---

## 25. Production Boundary

生产项目通常不为每个复杂对象手写大量 `typeof`，而会建立：

```text
Schema Definition
→ Runtime Parser
→ Static Inference
→ Structured Error
→ Test Fixture
→ Contract Version
→ Observability
```

例如：

```text
Zod / Valibot / ArkType 等 Schema Library
JSON Schema
OpenAPI
GraphQL Typed Document
Protobuf / RPC Schema
```

技术选型必须评估：

```text
Bundle Size
Parse Performance
Error Quality
Transformation Capability
Code Generation
Server / Client Sharing
Version Compatibility
Tree Shaking
```

但底层原则不会改变：外部值先是 `unknown`，验证成功后才成为可信业务对象。

---

## 26. 本课只记住 3 件事

1. TypeScript Interface 不会在 Runtime 自动验证 JSON；`as` 只改变静态视角，不改变真实值。
2. 不可信边界应先进入 `unknown`，通过 Runtime Check 后再构造可信 DTO / Domain Model。
3. 真正的 Validator 在 Emit 后仍然有可执行代码，并且必须测试 Reject Path。

---

## 27. Challenge

给 `DeliveryEvent` 增加：

```ts
metadata?: {
  source: "api" | "retry-worker";
};
```

要求：

1. `metadata` 可缺失。
2. 存在时必须是非空对象。
3. `source` 只能是两个合法值。
4. 非法 source 返回精确错误。
5. 验证成功后重新构造内部对象。
6. `verify.mjs` 增加合法、缺失、非法三种 Fixture。
7. 禁止使用 `as DeliveryEvent` 绕过验证。

验收：

```bash
npm run verify
```

---

## 28. Mastery Check

请用当前代码和输出回答：

1. 为什么 `JSON.parse` 成功不等于业务数据合法？
2. `unknown` 与 `any` 对后续属性访问有何不同？
3. `isRecord` 为什么必须排除 `null`？
4. Type Predicate 的 Runtime 部分和静态部分分别是什么？
5. 为什么验证成功后要重新构造 `DeliveryEvent`？
6. `as DeliveryEvent` 为什么不算 Validation？
7. 哪些检查会保留在 `dist/index.js`？
8. 为什么客户端 Validation 不能替代服务端校验？
9. Validator 应该重点测试 Happy Path 还是 Reject Path？为什么？

能够从信任边界解释，而不只是背“unknown 更安全”，才算掌握。

---

## 29. 最终源码与实验说明

不安全故障入口：

```text
unsafe-boundary.mjs
```

安全验证入口：

```text
src/index.ts
```

Static Boundary 负向证据：

```text
src/expected-errors.ts
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Handbook：The `unknown` Type
- TypeScript Handbook：Narrowing
- OWASP：Input Validation Cheat Sheet
- Module 08.10 Runtime Schema 课程规划
