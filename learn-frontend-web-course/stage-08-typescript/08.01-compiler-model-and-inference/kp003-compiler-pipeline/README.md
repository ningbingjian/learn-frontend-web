# KP003：源文件如何经过 Parse、Bind、Check 与 Emit

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must / Should |
| Pattern | COMPILER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | `.ts` 文件怎样成为诊断、JavaScript、声明文件和 Source Map？ |
| 最终证据 | Syntax Error、Type Error、`.js`、`.d.ts`、`.map`、`--showConfig`、`--listFiles` |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

本课会建立一个最小报价模块：

```text
src/pricing.ts
→ 声明 QuoteRequest / QuoteResult
→ 实现 calculateQuote

src/index.ts
→ 以 ESM 方式导入函数和类型
→ 调用并输出报价
```

然后从四类证据观察编译过程：

```text
源代码
→ Syntax Tree 可被建立
→ Symbol 被绑定
→ 类型关系被检查
→ JavaScript / Declaration / Source Map 被生成
```

最终你会直接比较：

```text
src/pricing.ts
    有 interface、参数类型、返回类型

dist/pricing.js
    只保留 Runtime 需要的函数与表达式

dist/pricing.d.ts
    保留给其他 TypeScript 消费者读取的公共类型

dist/pricing.js.map
    建立生成代码与源代码的位置映射
```

本课的目标不是要求你实现一个 Compiler，而是建立今后排查 TypeScript 问题必须具备的 Pipeline 心智模型。

---

## 2. 本课解决什么问题

当终端出现 TypeScript 错误时，初学者常把所有问题都称为“编译失败”。

但下面几类问题并不相同：

```text
缺少右花括号
→ Parser 无法建立正确语法结构

找到了变量名，但传入了错误类型
→ Checker 判断赋值关系不成立

类型检查通过，但没有生成 dist
→ 可能使用了 --noEmit，或 Emit 配置阻止写出

JavaScript 能运行，但 .d.ts 不正确
→ Declaration Emit 或公共类型设计有问题

运行时找不到 ./pricing.js
→ Module Resolution / Runtime Package 语义问题
```

如果没有阶段模型，排障只能不断修改配置；有了阶段模型，就能先判断错误属于哪一层。

---

## 3. 前置知识与本课边界

### 已经需要知道

- KP001：TypeScript 可以在 Runtime 之前报告一部分错误。
- KP002：能够建立 Strict Project，并区分 `check`、`build` 与 `start`。
- JavaScript Function、Object、ES Module 的基础使用。

### 本课完整学习

- Source File、Program、Import Graph 的基础关系。
- Parse、Bind、Check、Transform / Emit 各自解决什么问题。
- Syntax Error 与 Semantic Type Error 的差异。
- JavaScript、Declaration、Source Map 三类产物。
- Type-only Import 为什么不进入 Runtime JavaScript。
- `--showConfig`、`--listFiles` 和产物对比的诊断价值。

### 本课暂不展开

- TypeScript Compiler API、AST Visitor、Transformer：Stage 16。
- Project Reference 与多线程构建：Module 08.09。
- `.d.ts` 的完整作者规范：Module 08.08。
- Package `exports` 和 Library 发布：Module 08.12。

---

## 4. 本课项目介绍

业务输入：

```ts
{
  units: 4,
  unitPrice: 25,
  discountRate: 0.1
}
```

计算关系：

```text
subtotal = units × unitPrice
         = 4 × 25
         = 100

discount = subtotal × discountRate
         = 100 × 0.1
         = 10

total    = subtotal - discount
         = 90
```

最终输出：

```text
subtotal=100.00; discount=10.00; total=90.00
```

这个业务足够小，能把注意力放在 Compiler Pipeline，而不是复杂业务上。

---

## 5. 起始状态

本课不继承 KP002 业务源码。

创建：

```bash
mkdir kp003-compiler-pipeline
cd kp003-compiler-pipeline
mkdir -p src experiments
```

为什么重新从零开始：

```text
KP002 证明 Project 配置
KP003 证明一个多文件 Program 怎样被建立和生成
```

两个实验目的不同，所以本课保存独立最小源码。

---

## 6. 最终会有哪些文件

```text
kp003-compiler-pipeline/
├── README.md
├── package.json
├── tsconfig.json
├── inspect-emit.mjs              # 对比源码、JavaScript 与 Declaration
├── verify.mjs                    # 自动验收 Pipeline 产物
├── experiments/
│   └── syntax-error.ts.txt       # 不进入正常 Project 的 Parser 故障样本
└── src/
    ├── pricing.ts                # 类型与 Runtime 实现
    ├── index.ts                  # 程序入口
    └── expected-errors.ts        # Checker 故障样本
```

构建后生成：

```text
dist/
├── pricing.js
├── pricing.js.map
├── pricing.d.ts
├── pricing.d.ts.map
├── index.js
├── index.js.map
├── index.d.ts
├── index.d.ts.map
└── expected-errors.*
```

---

## 7. Step 0：创建工具与命令契约

创建：

```text
package.json
```

写入：

```json
{
  "name": "@learn-frontend-web/ts-kp003-compiler-pipeline",
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
    "inspect:config": "tsc --showConfig",
    "inspect:files": "tsc --noEmit --listFiles",
    "inspect:emit": "node inspect-emit.mjs"
  },
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

本课新增三个观察命令：

```text
npm run inspect:config
→ 输出 tsc 实际解析后的配置

npm run inspect:files
→ 输出本次 Program 纳入的文件

npm run inspect:emit
→ 比较 .ts、.js 与 .d.ts 中是否存在 Interface
```

安装：

```bash
npm install
```

现在还不能检查，因为配置和源码尚未创建。

---

## 8. Step 1：建立显式 Compiler 配置

创建：

```text
tsconfig.json
```

写入：

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

本课特别关注：

```json
"declaration": true,
"declarationMap": true,
"sourceMap": true
```

它们分别要求 Emit：

```text
.d.ts
→ 描述对外静态类型

.d.ts.map
→ 让声明位置能映射回源文件

.js.map
→ 让调试器把生成 JavaScript 映射回 TypeScript
```

先观察解析后的完整配置：

```bash
npm run inspect:config
```

你会看到 TypeScript 将相对路径解析为绝对路径，并展开复合选项。以后怀疑“到底用了哪份配置”时，`--showConfig` 比猜测更可靠。

现在仍不能运行主程序，因为源码还没有创建。

---

## 9. Step 2：创建可复用报价模块

创建：

```text
src/pricing.ts
```

写入：

```ts
export interface QuoteRequest {
  readonly units: number;
  readonly unitPrice: number;
  readonly discountRate?: number;
}

export interface QuoteResult {
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
}

export function calculateQuote(request: QuoteRequest): QuoteResult {
  const discountRate = request.discountRate ?? 0;
  const subtotal = request.units * request.unitPrice;
  const discount = subtotal * discountRate;

  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
}
```

这个文件同时包含两类信息。

### 9.1 只服务静态检查的信息

```ts
export interface QuoteRequest { ... }
export interface QuoteResult { ... }
```

Interface 描述输入和输出形状。它们不会成为 Runtime Constructor，也不会自动验证外部对象。

### 9.2 Runtime 必须保留的信息

```ts
export function calculateQuote(...) { ... }
```

函数体包含真正要在 Node.js 中执行的乘法、减法和对象创建，所以 Emit 后必须保留。

### 9.3 `readonly` 的当前含义

`readonly` 让 TypeScript 阻止调用者通过这些属性位置重新赋值。它仍是静态约束，不会自动对 Runtime Object 执行 `Object.freeze`。

Runtime 不变性会在后续课程结合 `as const`、Immutable Data 与 Freeze 深入。

---

## 10. Step 3：创建入口并区分 Value Import 与 Type Import

创建：

```text
src/index.ts
```

写入：

```ts
import { calculateQuote } from "./pricing.js";
import type { QuoteRequest } from "./pricing.js";

const request: QuoteRequest = {
  units: 4,
  unitPrice: 25,
  discountRate: 0.1
};

const quote = calculateQuote(request);

console.log(
  `subtotal=${quote.subtotal.toFixed(2)}; discount=${quote.discount.toFixed(2)}; total=${quote.total.toFixed(2)}`
);
```

观察两条 Import：

```ts
import { calculateQuote } from "./pricing.js";
import type { QuoteRequest } from "./pricing.js";
```

### Value Import

```ts
calculateQuote
```

Runtime 真的要调用这个函数，因此生成 JavaScript 中必须保留它的 Import。

### Type-only Import

```ts
QuoteRequest
```

它只用于 Checker。生成 JavaScript 时没有 Runtime Value，因此 Import 会被删除。

### 为什么 TypeScript 源码里写 `.js`

当前项目使用 NodeNext ESM。Node.js Runtime 最终加载的是：

```text
./pricing.js
```

TypeScript 在源码检查阶段能够把这个 Specifier 对应回：

```text
src/pricing.ts
```

这是 Node ESM 下非常重要的 Source Specifier 与 Emit 产物对应关系。完整模块解析留到 08.08。

现在第一次运行：

```bash
npm run check
```

预期退出码 0，并且不生成 `dist`。

---

## 11. Step 4：观察 Program 纳入了哪些文件

执行：

```bash
npm run inspect:files
```

输出会包含：

```text
TypeScript 标准 Library Declaration
src/pricing.ts
src/index.ts
src/expected-errors.ts（创建后）
```

### Program 不是“只检查当前打开的文件”

TypeScript Project 会从根文件和 Import Graph 建立 Program：

```text
tsconfig include
    │
    ├── src/index.ts
    │      └── import ./pricing.js
    │               └── src/pricing.ts
    │
    └── src/expected-errors.ts
```

编辑器中单独打开一个文件时，也需要判断它属于哪个 Project；否则可能进入 Inferred Project，得到与 CLI 不同的配置体验。

---

## 12. Step 5：制造 Checker 错误，而不是 Parser 错误

创建：

```text
src/expected-errors.ts
```

写入：

```ts
import { calculateQuote } from "./pricing.js";
import type { QuoteRequest } from "./pricing.js";

// Checker 阶段：字段类型不兼容。
// @ts-expect-error -- units 必须是 number
const invalidRequest: QuoteRequest = { units: "4", unitPrice: 25 };

// Checker 阶段：对象缺少必填字段 unitPrice。
// @ts-expect-error -- unitPrice 是必填字段
calculateQuote({ units: 4 });

void invalidRequest;
```

这两个例子语法都合法：

```ts
const invalidRequest: QuoteRequest = { units: "4", unitPrice: 25 };
calculateQuote({ units: 4 });
```

Parser 可以建立 Syntax Tree，也能识别变量声明、对象字面量和调用表达式。

错误发生在 Checker 判断关系时：

```text
"4" 是否可赋值给 number？
→ 否

{ units: number } 是否满足 QuoteRequest？
→ 否，缺少 unitPrice
```

由于每条错误前有精确的 `@ts-expect-error`，正常 Check 应继续通过：

```bash
npm run check
```

---

## 13. Step 6：制造 Parser 错误并隔离故障样本

创建：

```text
experiments/syntax-error.ts.txt
```

写入：

```ts
// 把扩展名改成 .ts 并纳入 include 后，Parser 会首先报告语法错误。
const broken = {
  units: 4,
  unitPrice: 25
// 故意缺少右花括号
```

它使用 `.txt` 后缀，是为了把故障样本保存在仓库中，但不让正常 Project 永远失败。

实验步骤：

```bash
cp experiments/syntax-error.ts.txt src/syntax-error.ts
npm run check
```

预期出现 Parser 类诊断，例如：

```text
'}' expected.
```

这类错误发生得更早：Compiler 连完整语法结构都无法建立。

实验结束后必须删除：

```bash
rm src/syntax-error.ts
npm run check
```

预期恢复退出码 0。

### Syntax Error 与 Type Error 对照

| 问题 | Parser 是否能建立结构 | Checker 是否有机会完成语义判断 |
| --- | --- | --- |
| 缺 `}` | 否或只能恢复性解析 | 通常会伴随早期语法诊断 |
| `units: "4"` | 是 | 是，并报告 string → number 不兼容 |
| 缺 `unitPrice` | 是 | 是，并报告 Property Missing |

TypeScript Parser 具有一定错误恢复能力，所以一次语法错误后可能仍出现后续诊断；但第一个根因仍应优先修复。

---

## 14. Step 7：构建并观察三类产物

执行：

```bash
npm run build
```

然后分别打开：

```text
src/pricing.ts
dist/pricing.js
dist/pricing.d.ts
```

### 14.1 TypeScript Source

同时包含：

```text
Runtime Implementation
+ Static Type Model
```

### 14.2 JavaScript Emit

`dist/pricing.js` 应接近：

```js
export function calculateQuote(request) {
  const discountRate = request.discountRate ?? 0;
  const subtotal = request.units * request.unitPrice;
  const discount = subtotal * discountRate;
  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
}
```

你不会看到：

```text
interface QuoteRequest
interface QuoteResult
: QuoteRequest
: QuoteResult
readonly
```

### 14.3 Declaration Emit

`dist/pricing.d.ts` 会保留公共静态契约，但没有函数实现细节。

它的消费者可以知道：

```text
calculateQuote 接受什么
calculateQuote 返回什么
```

却不需要知道折扣具体怎样计算。

---

## 15. Step 8：用脚本直接对比类型擦除

创建：

```text
inspect-emit.mjs
```

写入：

```js
import { readFileSync } from "node:fs";

const source = readFileSync("src/pricing.ts", "utf8");
const emittedJavaScript = readFileSync("dist/pricing.js", "utf8");
const declaration = readFileSync("dist/pricing.d.ts", "utf8");

console.log("=== TypeScript source contains interface ===");
console.log(source.includes("interface QuoteRequest"));
console.log("=== emitted JavaScript contains interface ===");
console.log(emittedJavaScript.includes("interface QuoteRequest"));
console.log("=== declaration file contains interface ===");
console.log(declaration.includes("interface QuoteRequest"));
```

执行：

```bash
npm run inspect:emit
```

预期：

```text
=== TypeScript source contains interface ===
true
=== emitted JavaScript contains interface ===
false
=== declaration file contains interface ===
true
```

这一组对照比只背“类型会被擦除”更可靠，因为你已经看到三个真实文件承担不同职责。

---

## 16. Step 9：运行 JavaScript 产物

执行：

```bash
npm start
```

预期：

```text
subtotal=100.00; discount=10.00; total=90.00
```

运行链路：

```text
Node.js
→ 加载 dist/index.js
→ Runtime Import dist/pricing.js
→ 调用 calculateQuote
→ 输出结果
```

Node.js 不读取 `dist/pricing.d.ts`。声明文件是给 TypeScript Tooling 和消费者的静态信息，不是 Runtime Module。

---

## 17. Step 10：创建完整 Pipeline 验收

创建：

```text
verify.mjs
```

写入：

```js
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const file of [
  "dist/index.js",
  "dist/pricing.js",
  "dist/pricing.d.ts",
  "dist/pricing.js.map",
  "dist/pricing.d.ts.map"
]) {
  assert(existsSync(file), `缺少构建产物：${file}`);
}

const source = readFileSync("src/pricing.ts", "utf8");
const emitted = readFileSync("dist/pricing.js", "utf8");
const declaration = readFileSync("dist/pricing.d.ts", "utf8");

assert(source.includes("interface QuoteRequest"), "源码必须包含 QuoteRequest 接口");
assert(!emitted.includes("interface QuoteRequest"), "JavaScript 产物中不应保留 interface");
assert(declaration.includes("interface QuoteRequest"), "声明产物必须保留公共类型");
assert(emitted.includes("export function calculateQuote"), "运行时代码必须保留函数实现");

const runtime = spawnSync(process.execPath, ["dist/index.js"], { encoding: "utf8" });
assert(runtime.status === 0, `运行失败：${runtime.stderr}`);
assert(
  runtime.stdout.trim() === "subtotal=100.00; discount=10.00; total=90.00",
  `输出不符合预期：${runtime.stdout}`
);

console.log("✓ KP003 验证通过：Parse/Check/Emit 的产物边界清晰，类型只进入声明文件。" );
```

它验证：

1. `.js`、`.d.ts`、`.map` 都存在。
2. Source 中有 Interface。
3. JavaScript 中没有 Interface。
4. Declaration 中仍有 Interface。
5. JavaScript 中保留 Runtime Function。
6. 最终输出精确匹配。

执行：

```bash
npm run verify
```

预期末行：

```text
✓ KP003 验证通过：Parse/Check/Emit 的产物边界清晰，类型只进入声明文件。
```

---

## 18. 图解：TypeScript Compiler Pipeline

教学级模型：

```text
.ts / .d.ts / config
        │
        ▼
┌──────────────────────┐
│ 1. Parse             │
│ Text → Syntax Tree   │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 2. Bind              │
│ Declaration → Symbol │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 3. Check             │
│ Type Relation        │
│ Diagnostic           │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 4. Transform / Emit  │
│ JS / d.ts / Map      │
└──────────────────────┘
```

### Parse

负责把字符序列识别为语言结构，例如：

```text
VariableDeclaration
ObjectLiteralExpression
FunctionDeclaration
ImportDeclaration
```

### Bind

把声明与名称连接成 Symbol，并建立作用域关系。它回答：

```text
这个名称在哪里声明？
同名声明是否允许合并？
当前作用域能否看见它？
```

### Check

根据 Syntax、Symbol 和类型规则判断：

```text
值是否可赋值
属性是否存在
调用参数是否匹配
控制流缩窄是否成立
```

### Emit

把需要的 Runtime 结构转换并写成目标 JavaScript，也可生成声明和映射。

这是教学简化模型。真实实现存在按需计算、缓存、增量、并行等机制；Module 08.09 再深入。

---

## 19. Diagnostics 如何定位

诊断通常包含：

```text
文件路径
行列位置
诊断码
主消息
相关信息
```

建议排查顺序：

```text
1. 先修最早的 Syntax Error
2. 再修 Module Resolution
3. 再看根因型 Type Error
4. 不要被同一根因产生的级联诊断淹没
5. Check 通过后再排查 Emit 与 Runtime
```

不要用：

```text
删除整个 tsconfig
加 skipLibCheck 解决所有问题
全局写 any
把模块改来改去碰运气
```

代替分层诊断。

---

## 20. Wrong Way 与故障排查

### Wrong Way 1：把所有错误都称为“语法错误”

`string` 不能赋给 `number` 是 Type Relation 问题，不是 JavaScript 语法无法解析。

### Wrong Way 2：认为 `.d.ts` 会在 Runtime 执行

声明文件不会提供真实函数实现。只有 `.d.ts` 而没有 `.js` 的 Package，Runtime 调用时仍会失败。

### Wrong Way 3：认为 JavaScript 中没有类型就等于 TypeScript 没价值

TypeScript 的检查价值发生在开发与构建阶段；它不需要把 Interface 作为 Runtime Object 保留下来。

### Wrong Way 4：用旧 dist 掩盖构建失败

始终先清理或使用可靠构建系统，避免旧文件存在导致 `npm start` 仍“看起来能运行”。

### Wrong Way 5：忽略 Type-only Import

在严格 ESM 与 `verbatimModuleSyntax` 下，类型和值的空间必须区分清楚。错误 Import 可能导致不必要 Runtime Import 或直接诊断失败。

### Wrong Way 6：只看 `tsc` 输出，不确认用了哪些文件

使用：

```bash
npm run inspect:config
npm run inspect:files
```

确认实际 Project，而不是根据目录直觉猜测。

---

## 21. 更深原理

### 21.1 Type Erasure 不等于删除所有 TypeScript 语法后的文本替换

Compiler 需要先理解 Syntax 和类型相关结构，才能正确生成目标 JavaScript。某些语言特性可能需要 Transform，而不是简单删除冒号。

### 21.2 Declaration Emit 是另一种输出目标

生成 `.d.ts` 时，Compiler 要计算哪些声明对外可见，以及如何用类型语法表达公共 Surface。复杂类型无法命名、私有类型泄漏、循环引用等都可能让 Declaration 设计变得困难。

### 21.3 Source Map 是 Debug 证据

Runtime Stack 指向生成 JavaScript；Source Map 让调试器尽可能映射回 `.ts` 的源位置。Map 不会修复错误，但能改善定位体验。

### 21.4 Language Service 复用相同语言能力

IDE 的补全、跳转、重命名和即时诊断建立在 Parser、Program、Checker 等能力之上，只是以长期驻留、增量更新的方式提供交互体验。

---

## 22. Production Boundary

生产级 Compiler Pipeline 还要考虑：

```text
增量缓存是否可信
Project Reference 边界
并行 Checker 的 CPU / Memory Trade-off
Declaration Build 是否独立
Bundler 是否负责 Emit
Type Check 与 Transpile 是否分离
Source Map 是否上传及如何保护源码
生成产物是否可复现
编辑器版本与 CI 版本是否一致
```

本课只建立最小稳定判断：

```text
Syntax 问题
≠ Type Relation 问题
≠ Emit 问题
≠ Runtime 问题
```

---

## 23. 本课只记住 3 件事

1. TypeScript 源文件会经过 Parse、Bind、Check，再根据配置 Emit；不同阶段有不同故障证据。
2. `.js` 服务 Runtime，`.d.ts` 服务静态消费者，Source Map 服务调试映射，三者职责不同。
3. 遇到问题先判断属于 Syntax、Type、Module、Emit 还是 Runtime，不要把所有失败混成“编译失败”。

---

## 24. Challenge

增加：

```ts
currency: "CNY" | "USD";
```

要求：

1. `QuoteRequest` 与 `QuoteResult` 都表达 Currency。
2. Runtime 输出增加 `currency=USD`。
3. `"EUR"` 被保存为 Expected Error。
4. `dist/pricing.js` 中不能出现 Type Alias 声明。
5. `dist/pricing.d.ts` 中必须出现 Currency 公共契约。
6. `verify.mjs` 增加对应断言。

完整验收：

```bash
npm run verify
```

---

## 25. Mastery Check

请用当前实验回答：

1. 缺少 `}` 与把 `"4"` 赋给 `number` 分别在哪个阶段暴露？
2. Binder 主要把什么连接起来？
3. 为什么 `QuoteRequest` 不在 `dist/pricing.js` 中？
4. 为什么它又会出现在 `dist/pricing.d.ts` 中？
5. `import type` 为什么不会形成 Runtime Import？
6. `--noEmit` 是否意味着 Compiler 没有 Parse 和 Check？
7. `--listFiles` 能帮助排查什么？
8. `.js.map` 与 `.d.ts.map` 的消费者分别是谁？
9. 为什么 Node.js 只加载 `.js`，不读取 `.d.ts`？

能够指向文件、命令和输出回答，才算真正掌握。

---

## 26. 最终源码与实验说明

正常 Runtime 实现：

```text
src/pricing.ts
src/index.ts
```

Checker 故障证据：

```text
src/expected-errors.ts
```

Parser 故障样本：

```text
experiments/syntax-error.ts.txt
```

产物观察：

```bash
npm run build
npm run inspect:emit
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Wiki：Architectural Overview
- TypeScript Handbook：Modules
- TypeScript TSConfig Reference
- TypeScript 7.0 官方发布说明
