# KP021：Freshness、Excess Property Check 与 satisfies

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 基础类型与数据建模 |
| 深度 | Should / Expert |
| Pattern | TYPE-MECHANISM-LAB + CONFIG-MODELING-LAB + FAILURE-LAB |
| 主问题 | 为什么直接对象字面量会检查多余字段，变量中转后却可能通过；`satisfies` 如何验证形状又保留精确推断？ |
| 前置课程 | [KP020：Index Signature、Record 与 noUncheckedIndexedAccess](../kp020-index-signature-record-no-unchecked-indexed-access/) |
| 下一课程 | KP022：Module Project——Typed Configuration Model |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课建立一个配置与 Route Registry 实验，比较四种写法：

```text
Type Annotation
Direct Object Literal Assignment
Variable Intermediate Assignment
satisfies
as const satisfies
```

最终保留以下证据：

- Fresh Object Literal 的 Excess Property Check；
- 变量中转后的 Structural Assignability；
- Type Annotation 带来的类型扩大；
- `satisfies` 的契约检查；
- `as const satisfies` 的精确 Literal 与 readonly Tuple；
- Runtime 额外字段仍然存在；
- `satisfies` 不是 Runtime Validation；
- `.d.ts` 的精确类型差异；
- Expected Error Regression。

---

## 2. 先复现最令人困惑的现象

### 2.1 直接赋值

```ts
interface AppConfig {
  environment: "dev" | "prod";
  retries: number;
}

const config: AppConfig = {
  environment: "prod",
  retries: 3,
  owner: "platform"
};
```

Fresh Object Literal 会触发 Excess Property Check：

```text
owner 不属于 AppConfig
```

### 2.2 变量中转

```ts
const source = {
  environment: "prod" as const,
  retries: 3,
  owner: "platform"
};

const config: AppConfig = source;
```

这时可能通过，因为 TypeScript 的基础兼容模型是 Structural Typing：

```text
Source 至少拥有 Target 需要的字段
```

额外字段没有在 Runtime 消失，只是 `config` 这个静态视图看不到它。

### 2.3 这不是编译器前后矛盾

Freshness / Excess Property Check 是专门用来发现对象字面量拼写错误和错误配置的附加检查。

它不把 TypeScript 变成 Exact Object Type System。

---

## 3. Annotation、Assertion 与 satisfies

### 3.1 Type Annotation

```ts
const config: AppConfig = {
  environment: "prod",
  retries: 3,
  features: []
};
```

优点：

```text
立即检查目标契约
Consumer 看到稳定 AppConfig
```

代价：

```text
表达式的更精确类型可能被扩大到 AppConfig
```

例如 `environment` 的公开类型变成完整 `Environment`，不再是当前精确值 `"prod"`。

### 3.2 Type Assertion

```ts
const config = value as AppConfig;
```

Assertion 的含义是：

```text
要求 Checker 按 AppConfig 看待 value
```

它不会：

```text
校验 Runtime
删除多余字段
补齐缺失字段
修正错误值
```

配置对象中不应把 Assertion 当 Validator。

### 3.3 satisfies

```ts
const config = {
  environment: "prod",
  retries: 3,
  features: ["audit"]
} satisfies AppConfig;
```

它同时做两件事：

```text
检查表达式是否满足 AppConfig
保留表达式自身更具体的推断
```

这正适合：

```text
配置常量
Route Registry
Permission Map
Event Definition
Theme Tokens
Plugin Manifest
```

### 3.4 as const satisfies

```ts
const config = {
  environment: "prod",
  retries: 3,
  features: ["audit", "metrics"]
} as const satisfies AppConfig;
```

形成：

```text
Contract Validation
+ Literal Preservation
+ readonly Properties
+ readonly Tuple
```

注意：

```text
as const
与
satisfies
都只提供编译期证据
```

它们都不执行 Runtime Schema Validation。

---

## 4. 项目目录

```text
kp021-freshness-excess-property-satisfies/
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

验收分为：

```text
Static Positive
Static Negative
Declaration Surface
Runtime Object
External Data Validation
```

---

## 6. 实现步骤

### Step 1：建立 AppConfig Contract

```ts
interface AppConfig {
  readonly environment: Environment;
  readonly retries: number;
  readonly features: readonly string[];
}
```

### Step 2：建立 Annotation 版本

观察 `.d.ts`：

```ts
export declare const annotatedConfig: AppConfig;
```

### Step 3：建立 as const satisfies 版本

观察 `.d.ts`：

```ts
export declare const preciseConfig: {
  readonly environment: "prod";
  readonly retries: 3;
  readonly features: readonly ["audit", "metrics"];
};
```

### Step 4：变量中转保留 Extra Runtime Field

`stagedWithExtra` 有 `owner`。

赋值给 `AppConfig` 后：

```text
Static View：没有 owner
Runtime Object：owner 仍存在
```

### Step 5：建立完整 Route Registry

```ts
as const satisfies Record<RouteName, RouteDefinition>
```

同时获得：

```text
Route Name 完整覆盖
Path Template 检查
secure Boolean 检查
精确 Route Literal
```

### Step 6：增加 Runtime Guard

故意从 JSON 读取：

```json
{
  "environment": "prod",
  "retries": "3",
  "features": ["audit"]
}
```

虽然字符串 `"3"` 看起来可转换，但它不满足 Runtime `number` Contract。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export type Environment = "dev" | "staging" | "prod";

export interface AppConfig {
  readonly environment: Environment;
  readonly retries: number;
  readonly features: readonly string[];
}

export const annotatedConfig: AppConfig = {
  environment: "prod",
  retries: 3,
  features: ["audit", "metrics"]
};

export const preciseConfig = {
  environment: "prod",
  retries: 3,
  features: ["audit", "metrics"]
} as const satisfies AppConfig;

// 变量中转后，结构赋值只检查目标所需字段；额外 owner 仍存在于 Runtime。
export const stagedWithExtra = {
  environment: "prod",
  retries: 3,
  features: ["audit"],
  owner: "platform"
} as const;

export const acceptedThroughVariable: AppConfig = stagedWithExtra;

export type RouteName = "home" | "jobs" | "settings";

export interface RouteDefinition {
  readonly path: `/${string}`;
  readonly secure: boolean;
}

export const ROUTES = {
  home: { path: "/", secure: false },
  jobs: { path: "/jobs", secure: true },
  settings: { path: "/settings", secure: true }
} as const satisfies Record<RouteName, RouteDefinition>;

export function isAppConfig(value: unknown): value is AppConfig {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.environment === "dev" ||
      candidate.environment === "staging" ||
      candidate.environment === "prod") &&
    typeof candidate.retries === "number" &&
    Array.isArray(candidate.features) &&
    candidate.features.every((item) => typeof item === "string")
  );
}

const invalidExternal: unknown = JSON.parse(
  '{"environment":"prod","retries":"3","features":["audit"]}'
);

console.log("SATISFIES");
console.log(`annotated=${annotatedConfig.environment}:${annotatedConfig.features.length}`);
console.log(`precise=${preciseConfig.environment}:${preciseConfig.features.join(",")}`);
console.log(`runtimeExtra=${"owner" in stagedWithExtra}:${stagedWithExtra.owner}`);
console.log(`staticView=${acceptedThroughVariable.environment}:${acceptedThroughVariable.features.length}`);
console.log(`route=${ROUTES.jobs.path}:${ROUTES.jobs.secure}`);
console.log(`runtimeValidated=${isAppConfig(invalidExternal)}`);
```

### `src/expected-errors.ts`

```ts
import {
  annotatedConfig,
  preciseConfig,
  type AppConfig,
  type RouteDefinition,
  type RouteName
} from "./index.js";

const directExtra: AppConfig = {
  environment: "prod",
  retries: 3,
  features: [],
  // @ts-expect-error -- Fresh Object Literal 会执行 Excess Property Check。
  owner: "platform"
};
void directExtra;

const wrongEnvironment = {
  // @ts-expect-error -- satisfies 验证值是否满足目标契约。
  environment: "production",
  retries: 3,
  features: []
} satisfies AppConfig;
void wrongEnvironment;

const missingRetries = {
  environment: "prod",
  features: []
  // @ts-expect-error -- satisfies 不会替缺失字段补默认值。
} satisfies AppConfig;
void missingRetries;

const extraWithSatisfies = {
  environment: "prod",
  retries: 3,
  features: [],
  // @ts-expect-error -- Fresh Literal + satisfies 同样检查多余字段。
  owner: "platform"
} satisfies AppConfig;
void extraWithSatisfies;

// 类型标注把 environment 暴露为完整 Environment，而不是当前值 "prod"。
// @ts-expect-error -- annotatedConfig.environment 已经被声明成 Environment。
const annotatedProdOnly: "prod" = annotatedConfig.environment;
void annotatedProdOnly;

// satisfies 保留原表达式的精确推断。
const preciseProdOnly: "prod" = preciseConfig.environment;
void preciseProdOnly;

const incompleteRoutes = {
  home: { path: "/", secure: false },
  jobs: { path: "/jobs", secure: true }
  // @ts-expect-error -- Known Key Record 必须覆盖 settings。
} satisfies Record<RouteName, RouteDefinition>;
void incompleteRoutes;
```

Expected Error 覆盖：

- Direct Fresh Literal 多余字段；
- `satisfies` 下的非法值；
- `satisfies` 不补齐缺失字段；
- Fresh Literal + `satisfies` 仍执行 Excess Property Check；
- Annotation 扩大后的 Literal 丢失；
- Route Registry 缺少有限键。

---

## 8. Freshness 的准确心智模型

### 8.1 Fresh Object Literal

直接出现在赋值、参数或 `satisfies` 位置的对象字面量，会获得额外的 Excess Property Check。

它主要发现：

```text
拼错字段名
复制了错误配置
把属于另一个对象的字段写进来
误解目标 Contract
```

### 8.2 Stale / Variable Value

值进入变量后，普通 Structural Assignability 主要关心：

```text
Target 要求的字段是否存在且兼容
```

额外字段可以保留。

### 8.3 它不提供 Exact Object Type

下面的目标并不成立：

```text
AppConfig 类型的 Runtime Object 永远只能有三个字段
```

TypeScript 类型会在 Emit 后擦除。

如果外部数据必须拒绝未知字段，需要 Runtime Schema 的 strict object 策略。

---

## 9. satisfies 保留什么

`satisfies` 不把变量改写成目标类型。

它保留：

```text
原表达式字段
更精确 Literal
readonly 信息
Tuple 信息
额外可访问字段（前提是目标允许）
```

同时检查：

```text
必需字段
字段值类型
Known Key Record 完整性
Fresh Literal 的多余字段
Template Literal Constraint
```

### 9.1 Annotation 与 satisfies 对照

```ts
const annotated: AppConfig = ...
```

公开类型：

```text
AppConfig
```

```ts
const precise = ... satisfies AppConfig;
```

公开类型：

```text
表达式推断出的具体类型
```

选择标准：

```text
需要稳定抽象边界
→ Annotation

需要验证配置并保留精确值
→ satisfies
```

---

## 10. as const satisfies 的常见应用

### Route Registry

```ts
const ROUTES = {
  home: { path: "/", secure: false },
  jobs: { path: "/jobs", secure: true }
} as const satisfies Record<RouteName, RouteDefinition>;
```

### Permission Policy

```ts
const PERMISSIONS = {
  read: ["viewer", "editor", "admin"],
  write: ["editor", "admin"]
} as const satisfies Record<Action, readonly Role[]>;
```

### Token Map

```ts
const TOKENS = {
  spacingSm: "4px",
  spacingMd: "8px"
} as const satisfies Record<TokenName, `${number}px`>;
```

### Event Registry

```ts
const EVENTS = {
  started: { durable: true },
  completed: { durable: true }
} as const satisfies Record<EventName, EventDefinition>;
```

共同目标是：

```text
Single Source of Truth
+ Complete Key Coverage
+ Precise Consumer Inference
```

---

## 11. Failure Lab

### Failure 1：以为变量中转会删除多余字段

```ts
const target: AppConfig = source;
```

只改变了静态视图，不改变对象身份和 Runtime 属性。

### Failure 2：用 Assertion 绕过配置错误

```ts
const config = malformed as AppConfig;
```

这会让错误更晚出现在 Runtime。

### Failure 3：把 satisfies 当类型标注

`satisfies` 不保证 Consumer 只看到 `AppConfig`。

如果你需要隐藏内部字段和稳定公共表面，仍然需要明确返回类型或适配层。

### Failure 4：以为 satisfies 会校验 JSON

它只检查当前 TypeScript 表达式。

`JSON.parse()` 的结果仍然需要：

```text
unknown
→ Guard / Schema
→ AppConfig
```

### Failure 5：忽略 Contextual Typing

`satisfies` 也会提供上下文约束。要通过 `.d.ts` 和 Type Probe 验证最终推断，不要凭感觉判断。

---

## 12. 预期 Runtime 输出

```text
SATISFIES
annotated=prod:2
precise=prod:audit,metrics
runtimeExtra=true:platform
staticView=prod:1
route=/jobs:true
runtimeValidated=false
```

它证明：

- Annotation 与 precise config 都可正常使用；
- `owner` 在变量中转后仍然存在；
- `acceptedThroughVariable` 只是较窄静态视图；
- Route Registry 保留精确值；
- `satisfies` 没有把错误 JSON 变成合法配置。

---

## 13. Declaration Evidence

`dist/index.d.ts` 应出现：

```ts
export declare const annotatedConfig: AppConfig;
```

以及：

```ts
export declare const preciseConfig: {
  readonly environment: "prod";
  readonly retries: 3;
  readonly features: readonly ["audit", "metrics"];
};
```

还应保留：

```ts
readonly owner: "platform";
```

这说明变量中转对象自己的类型没有失去 Extra Field。

---

## 14. 生产级规则

### Config Constant Policy

静态配置常量默认使用：

```ts
as const satisfies Contract
```

前提是确实需要精确 Literal Consumer Experience。

### Public Boundary Policy

公共函数、SDK 或 Package Export 如果只应暴露抽象 Contract，应显式声明返回类型：

```ts
function createConfig(): AppConfig
```

不要因为 `satisfies` 保留了内部字段，就把实现细节泄漏到公共 API。

### Assertion Policy

禁止使用：

```ts
value as Config
```

替代外部配置校验。

### Exactness Policy

TypeScript Excess Property Check 不是 Runtime Exact Object Validation。

需要拒绝未知字段时，使用 Runtime Schema。

### Registry Policy

有限键 Registry 使用：

```ts
as const satisfies Record<K, V>
```

并建立缺键、错值和多余键的负向类型测试。

---

## 15. 常见误区

1. **“多余字段检查是结构类型的通用规则”**：它主要针对 Fresh Object Literal。
2. **“变量中转是合法删除字段”**：Runtime 字段没有消失。
3. **“satisfies 会把变量类型变成接口”**：它保留原表达式类型。
4. **“Annotation 和 satisfies 完全等价”**：公开推断表面不同。
5. **“as const satisfies 会冻结对象”**：仍然只是 Static Readonly。
6. **“satisfies 能验证 API Response”**：不能，它不在 Runtime 执行。
7. **“多余字段通过就是安全”**：公共边界是否允许 Extra Field 是架构合同，不是偶然兼容结果。

---

## 16. Mastery Check

1. 复现 Direct Literal 报错、变量中转通过。
2. 在 Runtime 打印 Extra Field，证明它没有被裁剪。
3. 比较 Annotation 与 satisfies 的 `.d.ts`。
4. 建立一个 `as const satisfies Record<K, V>` Registry。
5. 制造缺 Key、错 Value 和多余 Key 三种错误。
6. 用 Runtime Guard 验证一段 JSON。
7. 设计一个公共函数，隐藏 `satisfies` 保留的内部字段。
8. 解释 Freshness 为什么不是 Exact Object Type。

---

## 17. 本课结论

```text
Fresh Literal
→ 额外执行 Excess Property Check

Variable Value
→ 回到 Structural Assignability

Annotation
→ 检查并暴露目标类型

satisfies
→ 检查目标契约，保留表达式推断

as const satisfies
→ 精确 Literal + readonly + Contract Check

Runtime JSON
→ 仍然需要 Guard / Schema
```

至此，Module 08.02 的普通知识课已经完成 11 / 12。

下一课进入综合项目：

```text
KP022：Typed Configuration Model
```

它会把 Nullability、Readonly、Collection Ownership、Tuple、Literal Constant、enum ADR、Dynamic Index、Excess Property 和 `satisfies` 组合进一个完整配置系统。
