# KP014：object、Object、{} 与 unknown 为什么不同

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 |
| 深度 | Should |
| Pattern | TYPE-MECHANISM-LAB + BOUNDARY-LAB |
| 主问题 | 想表达“一个对象”时，为什么 object、Object、{} 和 unknown 不能随便替换？ |
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

> 想表达“一个对象”时，为什么 object、Object、{} 和 unknown 不能随便替换？

---

## 2. 核心结论

- `object` 表示非 Primitive，但仍包括数组和函数，并不等于普通键值对象。
- `Object` 与 `{}` 基本接受所有非 nullish 值，连 string/number 也可以进入。
- `unknown` 接受所有值，包括 null/undefined，但使用前必须 Narrow。
- 真正的字典边界通常需要 Runtime Guard 后得到 Record<PropertyKey, unknown>。

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
kp014-object-object-braces-unknown/
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

### Step 1：建立四类函数边界

分别接收 object、{} 和 unknown，观察可传入值与可用操作。

### Step 2：验证数组与函数

证明二者都属于 object，却不是普通 Record。

### Step 3：构建 isRecord

排除 null、Array 和 Function，得到可以安全按键读取的字典。

### Step 4：读取未知 label

先 Narrow 为 Record，再检查字段类型。

### Step 5：保存负向测试

阻止 Primitive 进入 object、null 进入 {}，以及未缩小的属性访问。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export function describeObject(value: object): string {
  if (Array.isArray(value)) return `array:${value.length}`;
  if (typeof value === "function") return "function";
  return "object";
}

export function describeNonNullish(value: {}): string {
  return `${typeof value}:${String(value)}`;
}

export function describeUnknown(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return `array:${value.length}`;
  return typeof value;
}

export function isRecord(
  value: unknown
): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readLabel(input: unknown): string | undefined {
  if (!isRecord(input)) return undefined;
  const label = input["label"];
  return typeof label === "string" ? label : undefined;
}

const sampleFunction = () => "done";

console.log("OBJECT_BOUNDARIES");
console.log(`objectArray=${describeObject([1, 2])}`);
console.log(`objectFunction=${describeObject(sampleFunction)}`);
console.log(`nonNullishNumber=${describeNonNullish(42)}`);
console.log(`unknownNull=${describeUnknown(null)}`);
console.log(`label=${readLabel({ label: "architect" }) ?? "missing"}`);
console.log(`arrayIsRecord=${isRecord([1, 2])}`);
```

### `src/expected-errors.ts`

```ts
import {
  describeNonNullish,
  describeObject
} from "./index.js";

// @ts-expect-error -- object 排除 Primitive string。
describeObject("text");

// @ts-expect-error -- {} 排除 null 和 undefined。
describeNonNullish(null);

declare const unknownValue: unknown;
// @ts-expect-error -- unknown 缩小前不能访问属性。
unknownValue.label;

declare const objectValue: object;
// @ts-expect-error -- object 只说明非 Primitive，没有声明 name 属性。
objectValue.name;

// 下面两行说明 {} 过宽：Primitive 非 nullish 值也能进入。
const broadNumber: {} = 42;
const broadString: Object = "hello";
void broadNumber;
void broadString;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

用 `object` 表示“JSON 对象”会意外接受数组和函数；用 `{}` 或 `Object` 又会接受数字与字符串。边界应先使用 unknown，再通过 isRecord 建立真实证据。

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
OBJECT_BOUNDARIES
objectArray=array:2
objectFunction=function
nonNullishNumber=number:42
unknownNull=null
label=architect
arrayIsRecord=false
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

1. 外部输入使用 unknown，而不是 {}、Object 或过宽 object。
2. 普通 JSON 字典通过专用 isRecord Guard 得到 Record<PropertyKey, unknown>。
3. API 类型名应表达业务结构，不要用 object 掩盖未知字段。

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
