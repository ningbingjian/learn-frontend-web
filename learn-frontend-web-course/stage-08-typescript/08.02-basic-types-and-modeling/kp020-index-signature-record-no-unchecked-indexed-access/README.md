# KP020：Index Signature、Record 与 noUncheckedIndexedAccess

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Must / Should |
| Pattern | FAILURE-LAB + INDEX-SAFETY-LAB |
| 主问题 | 动态键读取为什么天然可能缺失，开放字典、有限键 Record 和 Partial Record 应该怎样建模？ |
| 前置课程 | [KP019：enum、const enum、对象常量与联合类型选型](../kp019-enum-const-enum-object-constant/) |
| 下一课程 | [KP021：Freshness、Excess Property Check 与 satisfies](../kp021-freshness-excess-property-satisfies/) |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

我们将实现一个区域容量与指标字典实验，完整区分：

```text
Open Key Space
Closed Key Space
Complete Key Set
Partial Key Set
Known Property Access
Dynamic Index Access
Missing Value
Required Value
```

项目最后同时提供：

- `Index Signature` 开放字典；
- `Record<K, V>` 完整有限键集合；
- `Partial<Record<K, V>>` 部分有限键集合；
- `noUncheckedIndexedAccess` 下的 `V | undefined`；
- 安全读取与必需读取两种 API；
- Expected Error；
- Runtime 缺失键；
- Declaration Evidence。

---

## 2. 先看最常见的错误模型

很多代码会写：

```ts
interface Metrics {
  [key: string]: number;
}

const metrics: Metrics = {
  requests: 128
};

const retries: number = metrics["retries"];
```

JavaScript 的真实行为是：

```text
metrics["retries"]
→ undefined
```

但如果没有足够严格的索引配置，类型系统可能把它看成 `number`。

这会造成：

```text
Static：一定存在
Runtime：可能缺失
```

本课的目标就是消除这类虚假确定性。

---

## 3. 三种 Key Space

### 3.1 开放键空间：Index Signature

```ts
interface OpenCounterMap {
  readonly [metric: string]: number;
}
```

含义不是“所有字符串键都真的存在”，而是：

```text
如果一个字符串属性存在
它的值必须是 number
```

读取任意动态键时，Runtime 仍然可能得到 `undefined`。

### 3.2 完整有限键：Record

```ts
type RegionCode =
  | "us-west"
  | "us-east"
  | "eu-central";

type CompleteRegionCapacity =
  Record<RegionCode, number>;
```

这里 Key Space 是关闭的，并且要求三个键全部存在。

它适合：

```text
所有 Region 必须有值
所有 Permission 必须有处理器
所有 Status 必须有 Label
所有 Event 必须有 Handler
```

### 3.3 部分有限键：Partial Record

```ts
type PartialRegionCapacity =
  Partial<Record<RegionCode, number>>;
```

Key Space 仍然是关闭的，但每个键可以缺失。

适合：

```text
只覆盖部分区域
可选 Feature Override
稀疏缓存
逐步加载结果
```

---

## 4. noUncheckedIndexedAccess 的作用

开启：

```json
{
  "noUncheckedIndexedAccess": true
}
```

之后：

```ts
declare const map: OpenCounterMap;
declare const key: string;

const value = map[key];
// number | undefined
```

这不是“编译器变麻烦”，而是让 Static Type 与 JavaScript Runtime 对齐。

### 4.1 它不会让所有读取都变成 Optional

对于完整 Record 的已知键：

```ts
completeCapacity["us-west"]
```

类型仍然可以是：

```ts
number
```

因为 Key 和完整性都已知。

### 4.2 动态键必须处理缺失

安全方式：

```ts
const value = map[key];

if (value === undefined) {
  // missing branch
}
```

或者明确设计：

```text
readCounter
→ 返回 number | undefined

requireCounter
→ 缺失时 throw
```

不要用：

```ts
map[key]!
```

把真实缺失状态静默删除。

---

## 5. 项目目录

```text
kp020-index-signature-record-no-unchecked-indexed-access/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs
└── src/
    ├── index.ts
    └── expected-errors.ts
```

---

## 6. 从零运行

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

每个命令保存不同证据：

| 命令 | Evidence |
| --- | --- |
| `check` | 索引读取和 Record 完整性错误 |
| `build` | JavaScript 与 `.d.ts` |
| `start` | 缺失键的真实 Runtime 行为 |
| `verify` | 输出、声明和返回类型断言 |

---

## 7. 实现步骤

### Step 1：从 Runtime 常量派生 RegionCode

```ts
const REGION_CODES = [
  "us-west",
  "us-east",
  "eu-central"
] as const;
```

然后：

```ts
type RegionCode = (typeof REGION_CODES)[number];
```

这样 Runtime 遍历和 Static Key Union 来自同一来源。

### Step 2：建立开放指标字典

```ts
interface OpenCounterMap {
  readonly [metric: string]: number;
}
```

### Step 3：建立 Complete Record

```ts
type CompleteRegionCapacity =
  Record<RegionCode, number>;
```

### Step 4：建立 Partial Record

```ts
type PartialRegionCapacity =
  Partial<Record<RegionCode, number>>;
```

### Step 5：设计 Optional 与 Required Read API

```text
readCounter
→ caller 处理 undefined

requireCounter
→ helper 处理 missing 并抛出明确错误
```

---

## 8. 完整核心源码

### `src/index.ts`

```ts
export const REGION_CODES = [
  "us-west",
  "us-east",
  "eu-central"
] as const;

export type RegionCode = (typeof REGION_CODES)[number];

export interface OpenCounterMap {
  readonly [metric: string]: number;
}

export type CompleteRegionCapacity = Record<RegionCode, number>;
export type PartialRegionCapacity = Partial<Record<RegionCode, number>>;

export const counters: OpenCounterMap = {
  requests: 128,
  timeouts: 3
};

export const completeCapacity: CompleteRegionCapacity = {
  "us-west": 120,
  "us-east": 95,
  "eu-central": 80
};

export const partialCapacity: PartialRegionCapacity = {
  "us-west": 120,
  "eu-central": 75
};

export function readCounter(
  source: OpenCounterMap,
  metric: string
): number | undefined {
  return source[metric];
}

export function requireCounter(
  source: OpenCounterMap,
  metric: string
): number {
  const value = source[metric];
  if (value === undefined) {
    throw new Error(`Missing counter: ${metric}`);
  }
  return value;
}

export function totalCapacity(
  source: CompleteRegionCapacity
): number {
  return REGION_CODES.reduce((total, region) => total + source[region], 0);
}

export function describePartialCapacity(
  source: PartialRegionCapacity
): string {
  return REGION_CODES
    .map((region) => `${region}=${source[region] ?? "missing"}`)
    .join("|");
}

let missingMessage = "not-thrown";
try {
  requireCounter(counters, "retries");
} catch (error: unknown) {
  missingMessage = error instanceof Error ? error.message : "unknown-error";
}

console.log("INDEX_SAFETY");
console.log(`knownTotal=${totalCapacity(completeCapacity)}`);
console.log(`counter=${readCounter(counters, "requests")}`);
console.log(`missing=${String(readCounter(counters, "retries"))}`);
console.log(`requiredError=${missingMessage}`);
console.log(`partial=${describePartialCapacity(partialCapacity)}`);
```

### `src/expected-errors.ts`

```ts
import {
  counters,
  partialCapacity,
  type CompleteRegionCapacity,
  type OpenCounterMap
} from "./index.js";

// noUncheckedIndexedAccess 让动态索引读取成为 number | undefined。
// @ts-expect-error -- 未知键不能直接当成一定存在的 number。
const unsafeCounter: number = counters["missing"];
void unsafeCounter;

// @ts-expect-error -- Complete Record 必须覆盖所有 RegionCode。
const incompleteCapacity: CompleteRegionCapacity = {
  "us-west": 100,
  "us-east": 90
};
void incompleteCapacity;

const extraCapacity: CompleteRegionCapacity = {
  "us-west": 100,
  "us-east": 90,
  "eu-central": 80,
  // @ts-expect-error -- Known Key Record 不接受集合外的区域。
  "ap-south": 70
};
void extraCapacity;

// @ts-expect-error -- Partial Record 的成员读取仍可能缺失。
const unsafePartial: number = partialCapacity["us-east"];
void unsafePartial;

interface InvalidMixedDictionary {
  readonly [key: string]: number;
  // @ts-expect-error -- 显式属性也必须兼容 Index Signature 的值类型。
  readonly name: string;
}
void (0 as unknown as InvalidMixedDictionary);

const knownShape = {
  requests: 1,
  errors: 2
};
declare const dynamicKey: string;
// @ts-expect-error -- 没有 Index Signature 的已知对象不能用任意 string 索引。
knownShape[dynamicKey];

const openMap: OpenCounterMap = {};
// @ts-expect-error -- 即使值类型是 number，动态读取仍可能是 undefined。
const mustExist: number = openMap["anything"];
void mustExist;
```

这些负向测试保护：

- 动态键不能被当成必然存在；
- Complete Record 不能缺键；
- Closed Key Set 不能多出未知键；
- Partial Record 成员仍可能缺失；
- 显式属性必须兼容 Index Signature；
- 普通已知对象不能被任意 string 索引。

---

## 9. Index Signature 的隐含规则

### 9.1 显式属性必须兼容值类型

```ts
interface Dictionary {
  [key: string]: number;
  count: number; // OK
  name: string;  // Error
}
```

因为 `"name"` 同样是一个 string key。

如果允许混合元数据与动态数据，更清晰的结构通常是：

```ts
interface MetricEnvelope {
  readonly name: string;
  readonly values: Readonly<Record<string, number>>;
}
```

不要把所有东西塞进同一 Index Signature。

### 9.2 Index Signature 不表示数据真的完整

```ts
const empty: OpenCounterMap = {};
```

完全合法。

所以它描述的是：

```text
Value Constraint
```

不是：

```text
Existence Guarantee
```

### 9.3 number index 与 string index

JavaScript 对象的数字属性最终也会转成字符串键。

复杂的 string/number 双 Index Signature 容易制造兼容约束；业务代码优先考虑：

```text
Array
Map
Record<FiniteKey, Value>
```

---

## 10. Record 的强项与边界

### 10.1 强项：穷尽覆盖

```ts
Record<WorkflowStatus, Handler>
```

新增一个 `WorkflowStatus` 后，所有缺失 Handler 的位置会立即报错。

### 10.2 边界：Record<string, V> 不是“所有值都存在”

```ts
Record<string, number>
```

在 Runtime 仍然只是普通 JavaScript Object。

如果键是任意 string，读取仍需考虑缺失。`noUncheckedIndexedAccess` 会保留这条事实。

### 10.3 大型动态字典是否应使用 Map

当需求包含：

```text
非字符串键
频繁新增删除
明确 size
迭代顺序
对象原型污染隔离
```

应评估：

```ts
Map<Key, Value>
```

`Map#get` 同样返回 `V | undefined`，缺失语义更直接。

---

## 11. Failure Lab

### Failure 1：把动态读取当成必然存在

```ts
const value: number = counters[key];
```

修复不是加 `!`，而是确定 API 语义：

```text
缺失是正常状态
→ 返回 Optional

缺失是合同违规
→ throw / Result Error
```

### Failure 2：用 `Record<string, V>` 假装完整

开放 Key Space 无法证明“所有未来字符串键都存在”。

### Failure 3：用 Partial Record 却不处理 undefined

`Partial` 改变的是存在性合同，不是只让初始化更方便。

### Failure 4：把固定字段混进 Index Signature

如果 metadata 的类型与动态值不同，拆成嵌套对象。

### Failure 5：任意 string 索引普通对象

```ts
const object = { requests: 1 };
declare const key: string;
object[key];
```

TypeScript 拒绝它，是因为 `key` 可能是 `"missing"`。

---

## 12. 预期 Runtime 输出

```text
INDEX_SAFETY
knownTotal=295
counter=128
missing=undefined
requiredError=Missing counter: retries
partial=us-west=120|us-east=missing|eu-central=75
```

这组输出证明：

- Complete Record 可以无缺失地汇总；
- 开放字典的已有键正常返回；
- 未知键真实返回 `undefined`；
- Required API 能把缺失转成明确错误；
- Partial Record 必须显式表现 missing。

---

## 13. Declaration Evidence

`dist/index.d.ts` 应包含：

```ts
export interface OpenCounterMap {
  readonly [metric: string]: number;
}

export type CompleteRegionCapacity =
  Record<RegionCode, number>;

export type PartialRegionCapacity =
  Partial<Record<RegionCode, number>>;

export declare function readCounter(
  source: OpenCounterMap,
  metric: string
): number | undefined;
```

最重要的证据是：

```text
number | undefined
```

它说明缺失状态没有被断言吞掉。

---

## 14. 生产级建模规则

### Open Dictionary Policy

开放字典必须说明：

```text
允许哪些 key 来源
值是否可能缺失
是否允许未知 key
是否需要 prototype-free object / Map
```

### Closed Key Policy

Key 来自有限集合时，优先：

```ts
Record<K, V>
```

而不是：

```ts
{ [key: string]: V }
```

### Partial Policy

只有业务确实允许缺失时才用：

```ts
Partial<Record<K, V>>
```

不能为了“少写初始化代码”随意 Partial。

### Index Read Policy

动态索引读取必须保留：

```text
V | undefined
```

除非当前函数已经用 Guard、`in`、Own Property Check 或 Required Helper 证明存在。

### Strict Config Policy

Stage 08 默认开启：

```text
strict
noUncheckedIndexedAccess
exactOptionalPropertyTypes
```

不通过关闭配置解决建模问题。

---

## 15. 常见误区

1. **Index Signature = 所有键存在**：它只限制存在属性的值类型。
2. **Record<string, V> = 完整表**：开放 string 集合无法穷尽。
3. **Partial 只是初始化技巧**：它改变了所有 Consumer 的缺失语义。
4. **用非空断言结束错误**：Runtime 缺失仍然存在。
5. **对象与 Map 完全等价**：键类型、原型、API 和缺失语义不同。
6. **Known Key 与 Dynamic Key 没区别**：编译器可证明的信息完全不同。

---

## 16. Mastery Check

1. 建立一个 `Record<Permission, Handler>`，证明缺少 Permission 会报错。
2. 把它改成 `Partial<Record<Permission, Handler>>`，处理缺失 Handler。
3. 建立开放 Metric Dictionary，开启 `noUncheckedIndexedAccess`。
4. 实现 `getOptional` 与 `getRequired` 两套 API。
5. 证明未知键在 Runtime 返回 `undefined`。
6. 用 `Map` 重写一个动态字典并比较 API。
7. 解释 Index Signature 的显式属性兼容规则。
8. 写一条团队 Dynamic Key Policy。

---

## 17. 本课结论

```text
Key Space 决定类型模型：

开放键
→ Index Signature / Map

有限且完整
→ Record<K, V>

有限但可缺失
→ Partial<Record<K, V>>

动态读取
→ V | undefined
```

下一课继续解决对象形状校验：

> 为什么直接写对象字面量会检查多余字段，而先放进变量后又可能通过？`satisfies` 到底检查什么、保留什么？
