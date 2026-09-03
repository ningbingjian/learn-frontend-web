# KP017：Tuple、Named Tuple、Optional Element 与 Rest Element

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Must / Should |
| Pattern | BUILD-LAB + POSITIONAL-CONTRACT-LAB + FAILURE-LAB |
| 主问题 | 普通数组和 Tuple 在 Runtime 都是 Array，TypeScript 为什么要把它们建模成两种不同契约？ |
| 最终证据 | Named Tuple Declaration、长度错误、位置类型错误、Optional / Rest Runtime |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课会建立五种真实的“位置数据”模型：

```text
Coordinate
→ [longitude, latitude]

UserRow
→ [id, score, active]

ApiSuccess<T>
→ [status, data, requestId?]

CliCommand
→ [name, ...args]

LogRecord
→ [timestamp, level, message, ...tags]
```

你会同时验证：

- Tuple 可以约束长度和每个位置的类型；
- Named Tuple Element 改善声明文件和 IDE 可读性；
- Optional Element 可以省略末尾位置；
- Rest Element 表达“前缀固定、后续同类”的结构；
- readonly Tuple 禁止通过当前引用改变位置；
- Runtime 中 Tuple 仍然只是普通 JavaScript Array。

---

## 2. 核心结论

### 2.1 Array 表达同类元素集合

```ts
string[]
```

适合表达：

```text
0～N 个字符串
顺序可能重要
但每个索引没有不同的领域身份
```

### 2.2 Tuple 表达有限位置协议

```ts
readonly [id: string, score: number, active: boolean]
```

表达的是：

```text
位置 0 必须是 id
位置 1 必须是 score
位置 2 必须是 active
长度和顺序都是协议的一部分
```

Tuple 不是“更短的 Object”。它适合调用约定、解析结果、坐标、数据库行、命令参数等天然位置化的数据。

### 2.3 Named Tuple 只改善静态可读性

`longitude`、`latitude` 等标签会出现在 Hover 和 `.d.ts` 中，但不会生成 Runtime Property：

```ts
coordinate.longitude // 不存在
coordinate[0]        // Runtime 真实访问方式
```

若调用者需要按名称频繁访问，应优先使用 Object。

### 2.4 Optional Element 表达末尾位置可省略

```ts
readonly [status: 200, data: T, requestId?: string]
```

允许：

```ts
[200, data]
[200, data, "REQ-1"]
```

但不允许错误状态码、错误位置类型或额外第四项。

### 2.5 Rest Element 表达固定前缀和可变尾部

```ts
readonly [name: string, ...args: string[]]
```

它至少要求一个 `name`，之后可以跟任意数量的字符串参数。这比普通 `string[]` 多了“至少存在命令名”的证据。

---

## 3. 前置知识与课程边界

### 前置知识

- KP016：理解 Array、ReadonlyArray 和可变性。
- JavaScript Array、Destructuring 与 Rest Syntax。
- Type Alias、Literal Union 和 Generic 的基础阅读能力。

### 本课完整拥有

- Tuple 长度和位置类型。
- Named Tuple Element。
- readonly Tuple。
- Optional Tuple Element。
- Rest Tuple Element。
- Tuple Destructuring。
- Tuple 与普通 Array 的 Assignability。
- 何时选择 Tuple，何时选择 Object。

### 暂不展开

- Variadic Tuple 的高级类型变换：08.07。
- Generic Inference 深入：08.03。
- React Hook 返回 Tuple：Stage 11 只做框架组合应用。
- Database Driver 的完整类型设计：后续数据与架构 Stage。

---

## 4. 项目目录

```text
kp017-tuple-named-optional-rest/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs
└── src/
    ├── index.ts
    └── expected-errors.ts
```

---

## 5. 从零运行

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

| 命令 | 证据 |
| --- | --- |
| `check` | 长度、位置、Literal Status 和 readonly 错误仍被阻止 |
| `build` | Named / Optional / Rest Tuple 被写入 `.d.ts` |
| `start` | Tuple 在 Runtime 仍然是 Array，并执行解构逻辑 |
| `verify` | 自动检查 Runtime 与 Declaration Contract |

---

## 6. 实现步骤

### Step 1：建立 Named Coordinate

```ts
export type Coordinate = readonly [
  longitude: number,
  latitude: number
];
```

标签解决“第一个 number 到底是什么”的阅读问题，readonly 防止位置被交换。

### Step 2：建立异构 User Row

```ts
readonly [id: string, score: number, active: boolean]
```

这里三个位置类型不同，错误顺序会立刻产生 Diagnostic。

### Step 3：建立 Optional API Trace

```ts
readonly [status: 200, data: T, requestId?: string]
```

响应可以有或没有 Trace ID，但前两个位置始终存在。

### Step 4：建立 Rest Command

```ts
readonly [name: string, ...args: string[]]
```

比 `string[]` 更准确：空数组不再是合法命令。

### Step 5：解构而不是散落魔法索引

```ts
function formatUserRow([id, score, active]: UserRow) {}
```

在实现内部使用命名变量，减少 `row[0]`、`row[1]` 带来的位置认知成本。

### Step 6：证明 Runtime 本质

```ts
Array.isArray(shanghai) === true
```

Named Tuple 标签和长度限制都是静态证据，Emit 后没有新的 Tuple Runtime 类型。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export type Coordinate = readonly [longitude: number, latitude: number];

export type UserRow = readonly [
  id: string,
  score: number,
  active: boolean
];

export type ApiSuccess<T> = readonly [
  status: 200,
  data: T,
  requestId?: string
];

export type CliCommand = readonly [name: string, ...args: string[]];

export type LogRecord = readonly [
  timestamp: string,
  level: "info" | "warn" | "error",
  message: string,
  ...tags: string[]
];

export function formatCoordinate([longitude, latitude]: Coordinate): string {
  return `${longitude.toFixed(4)},${latitude.toFixed(4)}`;
}

export function formatUserRow([id, score, active]: UserRow): string {
  return `${id}:${score}:${active ? "active" : "disabled"}`;
}

export function unwrapSuccess<T>(response: ApiSuccess<T>): T {
  return response[1];
}

export function responseTrace<T>(response: ApiSuccess<T>): string {
  return response[2] ?? "NO_REQUEST_ID";
}

export function renderCommand([name, ...args]: CliCommand): string {
  return [name, ...args].join(" ");
}

export function formatLog([
  timestamp,
  level,
  message,
  ...tags
]: LogRecord): string {
  return `${timestamp} [${level}] ${message} tags=${tags.join(",") || "none"}`;
}

export const shanghai: Coordinate = [121.4737, 31.2304];
export const userRow: UserRow = ["USER-1", 98, true];
export const responseWithTrace: ApiSuccess<{ readonly id: string }> = [
  200,
  { id: "ORDER-1" },
  "REQ-2026"
];
export const responseWithoutTrace: ApiSuccess<string> = [200, "ok"];
export const deployCommand: CliCommand = [
  "deploy",
  "--env",
  "prod",
  "--dry-run"
];
export const logRecord: LogRecord = [
  "2026-09-03T12:00:00Z",
  "warn",
  "retry scheduled",
  "network",
  "gateway"
];

console.log("TUPLE_MODEL");
console.log(`coordinate=${formatCoordinate(shanghai)}`);
console.log(`user=${formatUserRow(userRow)}`);
console.log(`response=${unwrapSuccess(responseWithTrace).id}:${responseTrace(responseWithTrace)}`);
console.log(`responseWithoutTrace=${unwrapSuccess(responseWithoutTrace)}:${responseTrace(responseWithoutTrace)}`);
console.log(`command=${renderCommand(deployCommand)}`);
console.log(`log=${formatLog(logRecord)}`);
console.log(`runtimeIsArray=${Array.isArray(shanghai)};length=${shanghai.length}`);
```

### `src/expected-errors.ts`

```ts
import {
  deployCommand,
  type ApiSuccess,
  type Coordinate,
  type UserRow
} from "./index.js";

// @ts-expect-error -- Coordinate 必须包含两个位置。
const missingLatitude: Coordinate = [121.4737];
void missingLatitude;

// @ts-expect-error -- Tuple 的第一个位置必须是 string id。
const wrongOrder: UserRow = [98, "USER-1", true];
void wrongOrder;

// @ts-expect-error -- Optional requestId 之后不能再出现额外位置。
const tooMany: ApiSuccess<string> = [200, "ok", "REQ-1", "EXTRA"];
void tooMany;

// @ts-expect-error -- status 是字面量 200，不能写成 201。
const wrongStatus: ApiSuccess<string> = [201, "created"];
void wrongStatus;

// @ts-expect-error -- readonly tuple 没有 push。
deployCommand.push("--force");

const plainArray: string[] = ["deploy", "--env", "prod"];
// @ts-expect-error -- 普通数组不能证明至少存在 name 位置。
const commandTuple: readonly [name: string, ...args: string[]] = plainArray;
void commandTuple;
```

---

## 8. Failure Lab：把所有短数组都写成 Tuple

### 错误做法

看到一个数组只有三项，就立即写：

```ts
[typeA, typeB, typeC]
```

但真实业务其实会增加、删除、排序，且调用者只关心“元素集合”。这会把普通集合错误地绑定到固定位置。

### 另一个错误：所有位置都是相同类型却没有语义标签

```ts
[number, number, number]
```

若这三个数字经常按名称访问，Object 往往更安全：

```ts
{ min: number; max: number; average: number }
```

### 选择准则

```text
元素是同类集合，可增删排序
→ Array / ReadonlyArray

位置数量有限，每个位置有独立含义
→ Tuple

字段会独立演进、按名称访问、可选项较多
→ Object

固定前缀 + 可变尾部
→ Rest Tuple
```

---

## 9. 预期 Runtime 输出

```text
TUPLE_MODEL
coordinate=121.4737,31.2304
user=USER-1:98:active
response=ORDER-1:REQ-2026
responseWithoutTrace=ok:NO_REQUEST_ID
command=deploy --env prod --dry-run
log=2026-09-03T12:00:00Z [warn] retry scheduled tags=network,gateway
runtimeIsArray=true;length=2
```

最后一行证明：Tuple 不会创造新的 JavaScript Runtime 数据结构。

---

## 10. Optional 与 Rest 的边界

### Optional Element

适合“末尾的一项可以不存在”：

```ts
[status, data, requestId?]
```

若中间字段经常省略，Tuple 很快变得难读，应该重新考虑 Object。

### Rest Element

适合“固定前缀后面跟同类项”：

```ts
[name, ...args]
```

Rest 必须能够解释尾部每个元素的统一类型。若尾部结构仍有多种位置协议，则需要更明确的 Tuple Union 或 Object。

### Optional 不等于 `T | undefined`

在位置协议中：

```text
Optional Element
→ 整个末尾位置可以不存在

T | undefined
→ 位置存在，但值可能是 undefined
```

与对象 Optional 一样，建模时要先决定业务语义，而不是只为了消除红线。

---

## 11. 生产级规则

1. Tuple 必须能给每个位置写出清晰名称。
2. 公共 Tuple 默认使用 readonly，避免位置被 push、splice 或交换。
3. 超过 3～4 个位置且会独立演进时，优先评估 Object。
4. Optional 位置过多时改用 Object，避免调用者记忆占位顺序。
5. 在函数体入口立刻 Destructure，减少魔法索引。
6. API Response Tuple 必须有版本和兼容策略；在中间插入字段通常是 Breaking Change。
7. 普通 Array 不可通过断言伪装成“至少有一项”的 Rest Tuple，必须 Runtime 检查或在构造点证明。

---

## 12. 常见误区

1. **Named Tuple 会生成属性名**：标签只服务于类型系统和 IDE。
2. **Tuple 只是短数组**：关键是位置协议，不是长度短。
3. **`as const` 和 Tuple Annotation 完全相同**：前者从值推断精确 readonly Tuple，后者声明可接受的协议；KP018 会系统比较。
4. **Optional Element 可以出现在任意位置而不影响阅读**：位置缺口会增加调用复杂度。
5. **Rest Tuple 等于普通 Array**：它能证明固定前缀和最小长度。
6. **readonly Tuple 是 Runtime Freeze**：Emit 后仍然是 Array。

---

## 13. Mastery Check

不看源码，独立完成：

1. 建立 `[code, message, retryAfter?]` 错误 Tuple。
2. 建立 `[command, ...args]`，并让空数组无法赋值。
3. 保存错误状态码、位置颠倒、额外元素和 readonly push 的 Expected Error。
4. 在 `.d.ts` 中找到 Named、Optional 和 Rest 标签。
5. 通过 Runtime 证明 Tuple 是 Array。
6. 把一个不适合 Tuple 的五字段结构重构为 Object，并解释理由。

---

## 14. 兼容性思考

Tuple 的位置就是 API。把新字段插入中间、改变 Optional 为 Required、改变某个位置的 Literal，都会影响所有调用者的解构与索引访问。公共 Tuple 演进前必须运行 Consumer Type Test，而不能只看提供方项目是否通过。

排障时先把实际类型写出来：

```text
数组是否保证最小长度？
每个位置是否有不同领域含义？
错误来自长度、位置类型、readonly，还是 Literal？
```

再决定修正构造点、函数签名或数据结构。
