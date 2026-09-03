# KP018：Literal Union、常量派生与 `as const`

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Must / Should |
| Pattern | BUILD-LAB + TYPE-DERIVATION-LAB + FAILURE-LAB |
| 主问题 | 如何让 Runtime 常量数据和 Static Literal Union 来自同一个事实来源，同时避免 Widening 和伪不可变？ |
| 最终证据 | readonly Tuple、Object Literal 派生、Widening Error、Runtime Freeze 对照 |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课会建立两份 Runtime 可用的常量：

```ts
DELIVERY_CHANNELS
→ ["email", "sms", "push"]

JOB_STATUS
→ { Draft: "draft", Queued: "queued", ... }
```

再从它们派生类型：

```ts
type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number];

type JobStatus =
  (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
```

这样 Runtime 与 Static Type 共用一份事实来源：

```text
Runtime 列表 / 遍历 / 校验
            ↑
       同一份常量
            ↓
Static Literal Union / IDE Completion / Type Check
```

同时，你会验证三个容易混淆的边界：

1. 普通可变对象属性为什么从 `"email"` Widen 成 `string`。
2. `as const` 为什么会产生 readonly 属性和 readonly Tuple。
3. `as const` 为什么不是 Runtime Freeze，也无法冻结通过变量引用进来的可变数组。

---

## 2. 核心结论

### 2.1 Literal Type 表示精确值

```ts
type DeliveryChannel = "email" | "sms" | "push";
```

它让非法值在调用前被发现，并让编辑器提供精确补全。

### 2.2 手写 Union 和 Runtime 常量容易漂移

若分别维护：

```ts
type Channel = "email" | "sms";
const channels = ["email", "sms", "push"];
```

新增 `push` 后，Runtime 已经接受，但 TypeScript 仍然拒绝，或者反过来。两份事实来源会产生契约漂移。

### 2.3 `as const` 保留字面量信息

```ts
const channels = ["email", "sms", "push"] as const;
```

TypeScript 得到：

```ts
readonly ["email", "sms", "push"]
```

然后通过 Indexed Access 提取：

```ts
(typeof channels)[number]
```

得到三个元素 Literal 的 Union。

### 2.4 `as const` 同时增加 readonly 约束

对对象字面量：

```ts
const policy = { defaultChannel: "email" } as const;
```

推断结果是：

```ts
{ readonly defaultChannel: "email" }
```

对数组字面量则得到 readonly Tuple。需要可变副本时应显式复制，而不是断言去掉 readonly。

### 2.5 `as const` 不执行 Runtime Freeze

```ts
Object.isFrozen(CHANNEL_POLICY) === false
```

因为 `as const` 是类型系统操作，Emit 后不会生成冻结代码。

---

## 3. 前置知识与课程边界

### 前置知识

- KP006：Literal Widening。
- KP016：ReadonlyArray 与共享引用。
- KP017：Tuple 和 readonly Tuple。
- `typeof`、`keyof`、Indexed Access 的基础阅读；08.06 会系统深入。

### 本课完整拥有

- String / Number / Boolean Literal 的使用目标。
- Literal Union。
- Array Constant → Union 派生。
- Object Constant → Value Union 派生。
- `as const` 对 Primitive、Object 和 Array Literal 的效果。
- Widening 与精确常量的对照。
- readonly Tuple 到 mutable Tuple 的复制。
- `as const` 与 Runtime Freeze / Shared Reference 的边界。
- Runtime Guard 使用常量列表。

### 暂不展开

- `satisfies`：KP021。
- const Type Parameter：08.03。
- Mapped / Conditional Type：08.06～08.07。
- enum / const enum 与发布选型：KP019。
- Runtime Schema：08.10。

---

## 4. 项目目录

```text
kp018-literal-union-as-const/
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
| `check` | 非法 Literal、Widening、readonly 修改和错误 const assertion 被阻止 |
| `build` | readonly Tuple、Literal Object 和派生 Type 写入 `.d.ts` |
| `start` | 运行常量列表、Guard、复制和 Freeze 对照 |
| `verify` | 自动验证 Runtime 和 Declaration Contract |

---

## 6. 实现步骤

### Step 1：把 Runtime 列表声明为精确常量

```ts
const DELIVERY_CHANNELS = ["email", "sms", "push"] as const;
```

不写 `as const` 时，数组通常推断为 `string[]`，元素精确信息会丢失。

### Step 2：从数组元素派生 Union

```ts
type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number];
```

推导链：

```text
typeof DELIVERY_CHANNELS
→ readonly ["email", "sms", "push"]

[number]
→ "email" | "sms" | "push"
```

### Step 3：从对象 Value 派生 Union

```ts
type JobStatus =
  (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
```

`keyof` 得到对象 Key Union，再用 Indexed Access 得到所有 Value 的 Union。

### Step 4：用同一常量实现 Runtime Guard

```ts
function isDeliveryChannel(value: string): value is DeliveryChannel {
  return (DELIVERY_CHANNELS as readonly string[]).includes(value);
}
```

类型系统不能验证外部字符串，因此 Runtime 仍要执行 membership check。

### Step 5：对照 Widening

```ts
const looseConfig = { channel: "email" };
```

因为属性可写，`channel` 通常被推断为 `string`，不能直接传给要求 `DeliveryChannel` 的函数。

精确配置：

```ts
const precise = { channel: "email" } as const;
```

得到 `readonly channel: "email"`。

### Step 6：需要可变数据时复制

```ts
window: [...preciseSchedule.window]
```

这明确创建了可变 Tuple 副本，比把 readonly Tuple 断言成 mutable 更安全。

### Step 7：证明 `as const` 不是 Freeze

```ts
Object.isFrozen(CHANNEL_POLICY) // false
```

并把一个可变数组通过变量引用放进 const asserted object，再从原别名 `push()`，观察对象中的数组也发生变化。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export const DELIVERY_CHANNELS = ["email", "sms", "push"] as const;
export type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number];

export const JOB_STATUS = {
  Draft: "draft",
  Queued: "queued",
  Running: "running",
  Completed: "completed"
} as const;
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

export const CHANNEL_POLICY = {
  defaultChannel: "email",
  fallback: ["sms", "push"],
  retryWindows: [5, 15, 30]
} as const;

export const sharedFallback: string[] = ["sms", "push"];
export const POLICY_WITH_SHARED_REFERENCE = {
  defaultChannel: "email",
  fallback: sharedFallback
} as const;

export interface MutableSchedule {
  channel: DeliveryChannel;
  status: JobStatus;
  window: [startHour: number, endHour: number];
}

export function scheduleLabel(
  channel: DeliveryChannel,
  status: JobStatus
): string {
  return `${channel}:${status}`;
}

export function isDeliveryChannel(value: string): value is DeliveryChannel {
  return (DELIVERY_CHANNELS as readonly string[]).includes(value);
}

export function parseChannel(value: string): DeliveryChannel | undefined {
  return isDeliveryChannel(value) ? value : undefined;
}

export const preciseSchedule = {
  channel: "email",
  status: JOB_STATUS.Queued,
  window: [9, 18]
} as const;

export const mutableSchedule: MutableSchedule = {
  channel: preciseSchedule.channel,
  status: preciseSchedule.status,
  window: [...preciseSchedule.window]
};

// as const 不能冻结通过变量引用进来的数组；别名修改仍然可见。
sharedFallback.push("email");

console.log("LITERAL_AS_CONST");
console.log(`channels=${DELIVERY_CHANNELS.join(",")}`);
console.log(`status=${Object.values(JOB_STATUS).join(",")}`);
console.log(`label=${scheduleLabel(preciseSchedule.channel, preciseSchedule.status)}`);
console.log(`parsed=${parseChannel("sms") ?? "invalid"}:${parseChannel("fax") ?? "invalid"}`);
console.log(`window=${mutableSchedule.window.join("-")}`);
console.log(`policyFrozen=${Object.isFrozen(CHANNEL_POLICY)}`);
console.log(`sharedFallback=${POLICY_WITH_SHARED_REFERENCE.fallback.join(",")}`);
```

### `src/expected-errors.ts`

```ts
import {
  CHANNEL_POLICY,
  DELIVERY_CHANNELS,
  JOB_STATUS,
  preciseSchedule,
  scheduleLabel,
  type DeliveryChannel,
  type MutableSchedule
} from "./index.js";

// @ts-expect-error -- fax 不属于由常量数据派生的 DeliveryChannel。
const invalidChannel: DeliveryChannel = "fax";
void invalidChannel;

// @ts-expect-error -- as const 让数组成为 readonly tuple。
DELIVERY_CHANNELS.push("fax");

// @ts-expect-error -- as const 让对象属性保持 readonly literal。
CHANNEL_POLICY.defaultChannel = "sms";

// @ts-expect-error -- 嵌套数组字面量被推断为 readonly tuple。
CHANNEL_POLICY.fallback[0] = "email";

const looseConfig = { channel: "email" };
// @ts-expect-error -- 可变对象属性发生 widening，looseConfig.channel 是 string。
scheduleLabel(looseConfig.channel, JOB_STATUS.Draft);

const invalidSchedule: MutableSchedule = {
  channel: preciseSchedule.channel,
  status: preciseSchedule.status,
  // @ts-expect-error -- readonly tuple 不能直接赋给要求可变 tuple 的字段。
  window: preciseSchedule.window
};
void invalidSchedule;

let dynamicChannel = "email";
// @ts-expect-error -- const assertion 只能直接作用于受支持的字面量表达式。
const invalidConstAssertion = dynamicChannel as const;
void invalidConstAssertion;
```

---

## 8. Failure Lab：常量、类型和校验各维护一份

### 损坏设计

```text
UI 下拉列表：一份 Channel 数组
TypeScript：一份 Channel Union
Runtime Validator：一份 switch
文档：又一份允许值
```

增加新渠道时，需要同时修改四处。任何遗漏都会造成：

- UI 能选但类型拒绝；
- 类型允许但 Runtime Validator 拒绝；
- 后端已支持但文档缺失；
- 默认值被 Widen 成 string，调用处开始断言。

### 改进设计

```text
一份 Runtime Constant
→ 派生 Static Union
→ Runtime Guard 复用 Constant
→ UI Option 复用 Constant
```

本课只完成 TypeScript 语言层闭环；Schema 和 API Contract 会在 08.10～08.11 继续扩展。

---

## 9. 预期 Runtime 输出

```text
LITERAL_AS_CONST
channels=email,sms,push
status=draft,queued,running,completed
label=email:queued
parsed=sms:invalid
window=9-18
policyFrozen=false
sharedFallback=sms,push,email
```

最后两行分别证明：

```text
as const 没有调用 Object.freeze
通过变量引用进入对象的可变数组仍可被原别名修改
```

---

## 10. `const` 声明与 `as const` 的区别

### `const` 变量

```ts
const status = "draft";
```

变量不能重新绑定，Primitive Literal 通常能保留精确类型。

但：

```ts
const job = { status: "draft" };
```

对象本身仍可修改 `job.status`，所以属性通常 Widen 为 `string`。

### `as const`

```ts
const job = { status: "draft" } as const;
```

它告诉 TypeScript：

- 不 Widen Literal；
- 对象字面量属性视为 readonly；
- 数组字面量视为 readonly Tuple。

它不会改变 Runtime Object Identity，也不会验证值来自可信来源。

---

## 11. 生产级规则

1. 有 Runtime 列表需求的有限值集合，优先从 `as const` 常量派生 Union。
2. 常量必须有明确 Owner，避免多个模块复制相同列表。
3. 外部 string 进入 Domain 前仍需 Runtime Guard / Schema，不能只写断言。
4. `as const` 适合常量定义，不应无差别覆盖所有业务对象。
5. API 需要可变对象时，显式复制 readonly 常量，不用双重断言。
6. 文档必须说明静态 readonly 与 Runtime Freeze 的差异。
7. 大型公共 API 修改常量值时，要同时评估 Runtime、Type Union、消费者 Exhaustiveness 和 SemVer。

---

## 12. 常见误区

1. **`const object` 的属性都是 Literal**：可变属性通常会 Widen。
2. **`as const` 会深度冻结 Runtime**：不会生成任何 Freeze 代码。
3. **`as const` 会验证外部输入**：断言不是 Runtime Validation。
4. **只手写 Union，不需要 Runtime Constant**：UI、Validator 和遍历仍然需要值。
5. **readonly Tuple 可以直接交给 mutable API**：需要复制或重新设计 API 输入。
6. **所有配置都 `as const`**：过度精确和 readonly 可能让需要演进的对象难以使用。
7. **引用进来的数组也自动深度 readonly**：const assertion 对已有引用不会创造新的 Runtime Ownership。

---

## 13. Mastery Check

不看源码，独立完成：

1. 从 `SUPPORTED_LOCALES` 数组派生 Locale Union。
2. 从对象常量派生 Permission Value Union。
3. 让非法值通过 Expected Error 被阻止。
4. 建立普通对象属性 Widening 和 `as const` 的对照。
5. 把 readonly Tuple 安全复制到可变 Tuple。
6. 用 `Object.isFrozen()` 证明类型 readonly 不等于 Runtime Freeze。
7. 用共享数组别名证明 const asserted object 仍可能观察到外部修改。
8. 写出常量值变更时的兼容性清单。

---

## 14. 与后续课程的连接

KP019 会比较 Literal Union、对象常量、`enum` 和 `const enum` 的 Runtime、Emit、声明发布与兼容性；KP021 会加入 `satisfies`，解决“验证对象形状但不丢失精确推断”的需求。

本课结论会直接成为后续唯一事实来源模式：

```text
Runtime Constant
→ typeof / keyof / Indexed Access
→ Static Type
→ Runtime Guard / Schema
→ UI / SDK / Contract Consumer
```
