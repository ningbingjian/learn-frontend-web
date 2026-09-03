# KP005：什么时候显式标注，什么时候依赖类型推断

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must / Should |
| Pattern | BUILD-LAB + API-DESIGN-LAB |
| 主问题 | 所有变量都写类型太啰嗦，什么都不写又可能丢失契约，边界在哪里？ |
| 最终证据 | Source、Declaration Emit、Expected Error、Runtime 输出 |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

你会实现一个发票计算模块：

```text
InvoiceLine[]
→ 计算每行小计
→ 汇总 subtotal
→ 计算 tax
→ 生成 labels
→ 返回 InvoiceSummary
```

项目会同时展示两种代码风格。

### 在系统边界显式标注

```ts
export function calculateInvoice(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceSummary
```

### 在明显局部值上依赖推断

```ts
const subtotal = subtotals.reduce((sum, value) => sum + value, 0);
const tax = subtotal * taxRate;
const formattedTotal = summary.total.toFixed(2);
```

最终目标不是形成“能不写类型就不写”或“所有地方都写类型”的教条，而是建立一个决策模型：

```text
边界与意图需要稳定契约
局部与派生值优先让 Compiler 推断
歧义位置主动标注
重复信息不机械标注
```

---

## 2. 本课解决什么问题

下面两种极端都很常见。

### 极端一：把 TypeScript 写成重复声明语言

```ts
const quantity: number = 2;
const unitPrice: number = 300;
const subtotal: number = quantity * unitPrice;
const label: string = "Review";
```

这些类型从右侧一眼可知，重复标注增加噪声，却没有增加领域信息。

### 极端二：所有边界都交给偶然实现推断

```ts
export function calculateInvoice(lines, taxRate) {
  // ...
}
```

在 Strict 下参数会直接报隐式 `any`；即使某些场景能推断，公共契约也可能被实现细节意外改变。

真正需要判断的是：

```text
这个位置是实现细节，还是模块契约？
类型是否明显，还是有多个合理含义？
未来重构时，希望错误出现在调用者，还是函数内部？
这个类型是否应该进入 .d.ts？
```

---

## 3. 前置知识与本课边界

### 已经需要知道

- KP002：Strict 项目和 Declaration Emit。
- JavaScript Array、`map`、`reduce`、Function Parameter。
- Interface 与基础类型标注。

### 本课完整学习

- Type Annotation 与 Type Inference 的职责差异。
- Local Inference、Return Inference、Contextual Typing 的基本关系。
- 为什么公共函数输入和关键返回类型应有显式契约。
- 为什么空容器、递归、跨模块边界常需要标注。
- 过度标注怎样降低可读性并制造错误同步成本。
- Declaration Emit 如何显示真正的 Public Type Surface。

### 本课暂不展开

- Contextual Typing 的完整机制：KP007。
- Generic Inference：Module 08.03。
- Literal Widening：KP006。
- `satisfies` 与对象精确性：Module 08.02。
- Library 公共 API 兼容性：Module 08.12。

---

## 4. 本课项目介绍

输入：

```ts
[
  { description: "Architecture review", quantity: 2, unitPrice: 300 },
  { description: "Type audit", quantity: 1, unitPrice: 150 }
]
```

计算：

```text
Architecture review：2 × 300 = 600
Type audit：1 × 150 = 150
subtotal = 750
tax = 750 × 0.06 = 45
total = 795
```

输出：

```text
items=2; subtotal=750; tax=45; total=795.00
```

这个例子能同时观察：

- Public Interface；
- Function Parameter 与 Return Contract；
- Array Callback 的 Contextual Typing；
- 局部数字表达式推断；
- Declaration 只暴露公共信息。

---

## 5. 起始状态

本课从独立空目录开始：

```bash
mkdir kp005-annotations-vs-inference
cd kp005-annotations-vs-inference
mkdir src
```

不复制 KP004 的原因：

```text
KP004 的核心是信任边界
KP005 的核心是类型信息应该由谁提供
```

通过独立项目能避免 Runtime Validation 辅助代码干扰推断观察。

---

## 6. 最终会有哪些文件

```text
kp005-annotations-vs-inference/
├── README.md
├── package.json
├── tsconfig.json
├── verify.mjs
└── src/
    ├── index.ts              # Annotation 与 Inference 对照主线
    └── expected-errors.ts    # 推断和显式契约的负向证据
```

构建后重点观察：

```text
dist/index.js
→ Runtime 实现

dist/index.d.ts
→ Public Type Surface
```

---

## 7. Step 0：建立最小项目

创建 `package.json`：

```json
{
  "name": "@learn-frontend-web/ts-kp005-annotations-vs-inference",
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

本课继续使用统一命令：

```bash
npm run check
npm run build
npm start
npm run verify
```

---

## 8. Step 1：先定义领域边界

创建：

```text
src/index.ts
```

最终完整源码如下，先不要急着把每个局部变量都加类型：

```ts
export interface InvoiceLine {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

export interface InvoiceSummary {
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly labels: readonly string[];
}

export function calculateInvoice(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceSummary {
  const subtotals = lines.map((line) => line.quantity * line.unitPrice);
  const subtotal = subtotals.reduce((sum, value) => sum + value, 0);
  const tax = subtotal * taxRate;
  const labels = lines.map((line) => `${line.description} × ${line.quantity}`);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
    labels
  };
}

const lines: InvoiceLine[] = [
  { description: "Architecture review", quantity: 2, unitPrice: 300 },
  { description: "Type audit", quantity: 1, unitPrice: 150 }
];

const taxRate = 0.06;
const summary = calculateInvoice(lines, taxRate);
const formattedTotal = summary.total.toFixed(2);

console.log(`items=${summary.labels.length}; subtotal=${summary.subtotal}; tax=${summary.tax}; total=${formattedTotal}`);
```

首先看两份 Public Interface：

```ts
export interface InvoiceLine {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
}
```

```ts
export interface InvoiceSummary {
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly labels: readonly string[];
}
```

这些类型值得显式定义，因为它们代表模块边界中的领域语言：

```text
InvoiceLine
InvoiceSummary
```

它们不仅告诉 Compiler 字段类型，也告诉阅读者“这些字段共同构成什么概念”。

---

## 9. Step 2：为公共函数输入与返回建立契约

```ts
export function calculateInvoice(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceSummary {
```

这里三个标注都有明确目的。

### `lines: readonly InvoiceLine[]`

调用者可以传入 InvoiceLine 列表；函数承诺不通过这个引用增删或替换数组元素。

### `taxRate: number`

税率来自调用者，仅靠函数体无法从使用位置稳定推断，所以参数必须有类型。

### `: InvoiceSummary`

显式返回类型让实现必须满足公共输出契约。

如果重构时误写：

```ts
return total;
```

错误会定位在函数实现处，而不是等到多个调用者出现不一致推断。

### 是否所有函数都必须显式返回类型

不是。

建议优先显式标注：

```text
exported public function
跨 Package API
递归函数
复杂分支函数
安全 / 金额 / 权限等关键契约
希望防止返回形状意外扩大或缩小的函数
```

简单私有 Helper 可以依赖 Return Inference。

---

## 10. Step 3：让局部派生值由 Compiler 推断

函数内部：

```ts
const subtotals = lines.map((line) => line.quantity * line.unitPrice);
```

Compiler 可以沿信息流推断：

```text
lines
→ readonly InvoiceLine[]

line
→ InvoiceLine

line.quantity * line.unitPrice
→ number

subtotals
→ number[]
```

所以不需要写：

```ts
const subtotals: number[] = lines.map(
  (line: InvoiceLine): number => line.quantity * line.unitPrice
);
```

后者没有提供新信息，反而让核心表达式更难阅读。

继续：

```ts
const subtotal = subtotals.reduce((sum, value) => sum + value, 0);
const tax = subtotal * taxRate;
```

信息链：

```text
subtotals 是 number[]
→ sum 是 number
→ value 是 number
→ subtotal 是 number
→ taxRate 是 number
→ tax 是 number
```

这就是 Local Type Inference。

---

## 11. Step 4：观察 Contextual Typing

```ts
const labels = lines.map((line) => `${line.description} × ${line.quantity}`);
```

回调参数 `line` 没有直接标注，但它所在的使用位置：

```text
readonly InvoiceLine[].map(callback)
```

为 callback 提供了上下文，所以 `line` 被推断为 `InvoiceLine`。

这叫 Contextual Typing：

```text
不是只从表达式自身向外推断
还会从“这个表达式被放在哪里使用”反向提供类型
```

KP007 会专门比较：

```text
具名函数
内联回调
对象方法
事件处理器
Overload Context
```

本课只先观察最常见的 Array Callback。

---

## 12. Step 5：返回值如何接受契约检查

```ts
return {
  subtotal,
  tax,
  total: subtotal + tax,
  labels
};
```

每个局部属性都由表达式推断，但整个对象必须可赋值给：

```ts
InvoiceSummary
```

这形成很好的组合：

```text
局部实现
→ 少写重复类型

函数边界
→ 显式检查最终契约
```

如果少写 `total`、把 `labels` 改为 number，或返回额外不符合设计的结构，Checker 会在返回位置给出证据。

---

## 13. Step 6：调用端何时需要标注

```ts
const lines: InvoiceLine[] = [
  { description: "Architecture review", quantity: 2, unitPrice: 300 },
  { description: "Type audit", quantity: 1, unitPrice: 150 }
];
```

这里显式写 `InvoiceLine[]` 有价值，因为数组是一个将被继续使用和可能扩展的业务集合。

它让每个元素立即接受领域契约检查。

而：

```ts
const taxRate = 0.06;
const summary = calculateInvoice(lines, taxRate);
const formattedTotal = summary.total.toFixed(2);
```

都不需要重复标注：

```text
taxRate → 从 0.06 得到 number/literal context
summary → 从函数返回契约得到 InvoiceSummary
formattedTotal → 从 toFixed 得到 string
```

---

## 14. Step 7：建立负向类型证据

创建：

```text
src/expected-errors.ts
```

写入：

```ts
interface InvoiceLine {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

let inferredCount = 0;
// 推断已经把 inferredCount 建模成 number。
// @ts-expect-error -- 不能再赋 string
inferredCount = "one";

const lines: InvoiceLine[] = [];

// 空数组若没有上下文，常常无法表达真正的领域意图；边界应显式标注。
// @ts-expect-error -- quantity 必须是 number
lines.push({ description: "Review", quantity: "2", unitPrice: 300 });

function withExplicitReturn(value: number): string {
  // 显式返回类型帮助编译器在函数内部定位契约漂移。
  // @ts-expect-error -- 约定返回 string，实际返回 number
  return value;
}

const names = ["Ada", "Lin"];
// map 的回调参数由数组元素提供 Contextual Typing，无需重复写 name: string。
const lengths = names.map((name) => name.length);

void inferredCount;
void withExplicitReturn;
void lengths;
```

### 14.1 推断不是“没有类型”

```ts
let inferredCount = 0;
```

即使没有 `: number`，Compiler 也已经建立 number 模型，所以：

```ts
inferredCount = "one";
```

必须报错。

### 14.2 空集合需要意图

```ts
const lines: InvoiceLine[] = [];
```

空数组本身没有元素可供推断。此时显式标注表达未来允许进入什么元素。

真实项目中也可以通过函数参数、`satisfies` 或 Factory 提供上下文；原则是让意图来自可靠边界，而不是让空容器演化成 `any[]` 或不合适的窄类型。

### 14.3 显式返回类型让契约漂移就地报错

```ts
function withExplicitReturn(value: number): string {
  return value;
}
```

错误发生在函数内部，说明实现没有兑现 Contract。

### 14.4 回调参数不必重复标注

```ts
const lengths = names.map((name) => name.length);
```

`name` 从 `string[]` 的 `map` Signature 得到 Contextual Type。

执行：

```bash
npm run check
```

预期退出码 0，说明所有负向错误都仍然存在并被精确保护。

---

## 15. Step 8：构建并运行

执行：

```bash
npm run build
npm start
```

预期：

```text
items=2; subtotal=750; tax=45; total=795.00
```

验证计算：

```text
2 × 300 = 600
1 × 150 = 150
subtotal = 750
tax = 45
total = 795.00
```

类型不能证明业务公式一定正确，所以 Runtime 输出仍需要断言。

---

## 16. Step 9：观察 Declaration Emit

打开：

```text
dist/index.d.ts
```

你应该看到类似：

```ts
export interface InvoiceLine { ... }
export interface InvoiceSummary { ... }
export declare function calculateInvoice(
  lines: readonly InvoiceLine[],
  taxRate: number
): InvoiceSummary;
```

不会看到局部：

```text
subtotals
subtotal
tax
formattedTotal
```

`.d.ts` 很直观地展示了边界：

```text
公共契约进入 Declaration
局部实现留在 JavaScript Function 内部
```

因此设计标注时可以问：

> 这个类型应该成为消费者需要依赖的公共 Surface，还是仅仅是当前实现可以推断的细节？

---

## 17. Step 10：创建自动验收

创建 `verify.mjs`：

```js
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === "items=2; subtotal=750; tax=45; total=795.00",
  `输出不符合预期：${runtime.stdout}`
);

const source = readFileSync("src/index.ts", "utf8");
const declaration = readFileSync("dist/index.d.ts", "utf8");

assert(
  source.includes("export function calculateInvoice(") && source.includes("): InvoiceSummary"),
  "公共函数必须显式表达输入与返回契约"
);
assert(source.includes("const taxRate = 0.06"), "明显的局部值应保留推断示例");
assert(source.includes("lines.map((line) =>"), "回调参数应展示上下文类型推断");
assert(declaration.includes("export declare function calculateInvoice"), "声明文件必须暴露公共契约");
assert(!declaration.includes("taxRate = 0.06"), "局部实现细节不应泄漏到公共声明");

console.log("✓ KP005 验证通过：边界有显式契约，局部实现充分利用类型推断。" );
```

它验证：

```text
Runtime 结果正确
公共函数有显式输入和返回契约
明显局部值保留推断
Array Callback 使用 Contextual Typing
Declaration 暴露 calculateInvoice
局部实现不泄漏到 Declaration
```

执行：

```bash
npm run verify
```

预期末行：

```text
✓ KP005 验证通过：边界有显式契约，局部实现充分利用类型推断。
```

---

## 18. Annotation Decision Matrix

| 位置 | 默认策略 | 原因 |
| --- | --- | --- |
| Public Function Parameter | 标注 | 调用契约不能从函数体猜 |
| Public Function Return | 通常标注 | 稳定 API，防止实现漂移 |
| 明显 Local `const` | 推断 | 右值已提供完整信息 |
| Array Callback Parameter | 推断 | 使用位置提供 Contextual Type |
| 空数组 / 空 Map | 标注或提供上下文 | 初始值缺乏领域信息 |
| 递归函数 Return | 标注 | 推断可能循环或不清楚 |
| 复杂 Union State | 标注 | 表达合法状态集合 |
| 外部 JSON | `unknown` + Runtime Validation | 不能信任静态断言 |
| Generic API 边界 | 设计 Type Parameter | 保留调用者信息 |
| 临时中间表达式 | 推断 | 避免重复与噪声 |

这张表不是语言限制，而是维护性默认值。实际决策还要考虑 API 稳定性、可读性、错误位置和团队规范。

---

## 19. 三种推断方向

### 19.1 从初始化表达式推断

```ts
const taxRate = 0.06;
```

右侧向左侧提供信息。

### 19.2 从调用返回值推断

```ts
const summary = calculateInvoice(lines, taxRate);
```

Function Signature 向变量提供类型。

### 19.3 从使用位置反向提供 Context

```ts
lines.map((line) => line.quantity * line.unitPrice)
```

`map` 的 Callback Signature 向 `line` 提供类型。

理解方向后，遇到推断失败时可以问：

```text
信息源在哪里？
中间哪一步把信息扩大或丢失了？
这个表达式是否脱离了原来的上下文？
是否需要在边界补一个 Annotation？
```

---

## 20. Wrong Way 与故障排查

### Wrong Way 1：每个局部变量都标注

```ts
const subtotal: number = ...;
```

如果右侧已经明显是 number，这只是重复信息。

### Wrong Way 2：Public API 完全依赖实现推断

内部一次无意修改可能改变消费者看到的 `.d.ts`，形成未经审查的 Breaking Change。

### Wrong Way 3：用 Annotation 修复错误，而不是模型

```ts
const value: any = wrongValue;
```

这不是补充意图，而是关闭信息。

### Wrong Way 4：把 Type Assertion 当 Annotation

```ts
const line = payload as InvoiceLine;
```

Annotation 要求实际值可赋值给目标类型；Assertion 可能强行改变 Checker 视角。二者信任级别不同。

### Wrong Way 5：复制一份与真实模型会漂移的匿名类型

```ts
function calculateInvoice(lines: { description: string; quantity: number; unitPrice: number }[]) {}
```

若这是共享领域概念，应复用 `InvoiceLine`，避免多个匿名结构各自演化。

### Wrong Way 6：为了“少写类型”牺牲可读性

推断结果虽然正确，但若表达式过于复杂或领域意图不明显，可以拆分或标注。目标是可维护，不是追求最少字符。

---

## 21. 更深原理

Type Inference 通常基于局部表达式、上下文位置和 Type Relation 计算。

它不是全程序形式化证明，也不会永远得到开发者心中“最精确”的业务类型。

例如：

```ts
const job = { status: "draft" };
```

对象属性可能被后续修改，所以 Compiler 可能把 `status` 扩大为 `string`，而不是永远保留字面量 `"draft"`。这就是下一课的 Literal Widening。

另一方面，显式标注也不是越具体越好。错误或过度狭窄的 Annotation 会限制有效调用，增加类型转换和断言。

成熟 Type Design 要平衡：

```text
精确性
稳定性
可推断性
错误可读性
维护成本
消费者体验
```

---

## 22. Performance 与工具体验

合理依赖推断通常能减少源码噪声，但非常复杂的泛型与条件类型推断也可能增加 Checker 和 IDE 成本。

不要把本课结论误解为：

```text
让 Compiler 推得越复杂越好
```

公共 API 如果需要多层递归条件类型才能推断，应该评估：

```text
是否能用更清晰的显式模型
诊断是否对调用者友好
编辑器响应是否变慢
Declaration 是否可读
```

Module 08.07 和 08.14 会建立 Type Complexity Budget。

---

## 23. Production Boundary

团队级 Type Policy 可以采用：

```text
Public / Exported API 明确契约
领域模型有命名
局部 obvious value 使用推断
外部数据使用 unknown
禁止无理由 any
Assertion 需要原因或隔离层
Negative Type Test 保护非法调用
Declaration Diff 进入发布 Review
```

不建议把规则简化成：

```text
所有函数都必须写返回类型
所有变量都禁止写类型
```

架构规则应说明目的和例外，而不是只统计语法形式。

---

## 24. 本课只记住 3 件事

1. 在公共边界、歧义位置和领域契约上显式标注；明显局部派生值优先使用推断。
2. 推断不是“没有类型”，Callback 参数、Return 和 Local Value 都可以拥有精确静态模型。
3. 判断标注价值时，看它是否增加了意图、稳定了 API 或改善了错误位置，而不是看代码是否显得“更 TypeScript”。

---

## 25. Challenge

给发票增加折扣：

```ts
export interface Discount {
  readonly code: string;
  readonly rate: number;
}
```

要求：

1. `calculateInvoice` 新增可选 Discount 输入。
2. Public Parameter 和 Return Contract 显式。
3. 折扣金额、中间小计等局部值依赖推断。
4. Expected Error 证明 `rate: "0.1"` 非法。
5. Declaration 中出现 Discount，不出现局部变量。
6. Runtime 验证折扣后的总额。
7. 不使用 `any` 或双重 Assertion。

验收：

```bash
npm run verify
```

---

## 26. Mastery Check

请独立回答：

1. `const subtotal = ...` 没写类型，为什么仍然是 number？
2. `map` 回调中的 `line` 从哪里获得 InvoiceLine？
3. 为什么 Public Function Return 通常值得显式标注？
4. 空数组为什么经常需要上下文或 Annotation？
5. Annotation 和 Assertion 的信任语义有何差异？
6. 为什么过度标注可能降低可读性？
7. `.d.ts` 如何帮助识别 Public Surface？
8. 哪些场景应该接受推断，哪些场景应该主动稳定契约？
9. 推断越复杂是否一定越好？

能用当前 Source、Declaration 与 Expected Error 解释，才算掌握。

---

## 27. 最终源码与实验说明

Annotation / Inference 正常主线：

```text
src/index.ts
```

负向证据：

```text
src/expected-errors.ts
```

Public Surface 证据：

```text
dist/index.d.ts
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Handbook：Type Inference
- TypeScript Handbook：Everyday Types
- TypeScript Handbook：More on Functions
- Module 08.12 Public SDK 规划
