# KP011：Primitive、Wrapper、bigint 与 unique symbol

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 |
| 深度 | Must |
| Pattern | BUILD-LAB + TYPE-MECHANISM-LAB |
| 主问题 | string 与 String、number 与 bigint、symbol 与 unique symbol 到底有什么边界？ |
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

> string 与 String、number 与 bigint、symbol 与 unique symbol 到底有什么边界？

---

## 2. 核心结论

- 业务字段使用小写 Primitive 类型；Wrapper Object 是另一种 Runtime 对象。
- number 与 bigint 不能直接混算，序列化策略也不同。
- 普通 symbol 在 Runtime 唯一；unique symbol 还能在静态层成为唯一键。
- unique symbol 适合构建类型安全的 Token、注册表和协议键。

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
kp011-primitives-wrappers-bigint-symbol/
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

### Step 1：比较 Primitive 与 Wrapper

同时打印 string 和 new String 的 typeof，并验证 Wrapper 不能作为普通字符串字段。

### Step 2：建立 bigint 账本

使用 bigint 保存整数预算，复现直接 JSON 序列化失败并实现显式转换。

### Step 3：定义 unique symbol Token

建立 CONFIG_TOKEN 和 LOGGER_TOKEN 及其 ServiceMap。

### Step 4：实现类型安全 Registry

公开 set/get 让 Token 自动约束对应服务类型。

### Step 5：保存错误矩阵

覆盖 Wrapper、混合算术、错误服务和伪造唯一 Token。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export const CONFIG_TOKEN: unique symbol = Symbol("app-config");
export const LOGGER_TOKEN: unique symbol = Symbol("logger");

export interface AppConfig {
  environment: "development" | "production";
}

export interface Logger {
  log(message: string): string;
}

export type ServiceMap = {
  [CONFIG_TOKEN]: AppConfig;
  [LOGGER_TOKEN]: Logger;
};

export class ServiceRegistry {
  private readonly services = new Map<symbol, unknown>();

  set<Token extends keyof ServiceMap>(
    token: Token,
    service: ServiceMap[Token]
  ): void {
    this.services.set(token, service);
  }

  get<Token extends keyof ServiceMap>(token: Token): ServiceMap[Token] {
    const service = this.services.get(token);
    if (service === undefined) {
      throw new Error(`Missing service: ${String(token)}`);
    }
    return service as ServiceMap[Token];
  }
}

export const primitiveText: string = "hello";
export const wrapperText: String = new String("hello");
export const exactBudget = 900719925474099312345n;

function captureBigIntJsonFailure(): string {
  try {
    JSON.stringify({ budget: exactBudget });
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

export const bigintJson = JSON.stringify(
  { budget: exactBudget },
  (_key, value: unknown) => typeof value === "bigint" ? value.toString() : value
);

const registry = new ServiceRegistry();
registry.set(CONFIG_TOKEN, { environment: "production" });
registry.set(LOGGER_TOKEN, { log: (message) => `registry-${message}` });

const config = registry.get(CONFIG_TOKEN);
const logger = registry.get(LOGGER_TOKEN);

console.log("PRIMITIVES");
console.log(`primitiveType=${typeof primitiveText}`);
console.log(`wrapperType=${typeof wrapperText}`);
console.log(`bigintJsonFailure=${captureBigIntJsonFailure()}`);
console.log(`bigintJson=${bigintJson}`);
console.log(`service=${config.environment}:${logger.log("ready")}`);
```

### `src/expected-errors.ts`

```ts
import {
  CONFIG_TOKEN,
  ServiceRegistry,
  type AppConfig
} from "./index.js";

const boxed: String = new String("x");

// @ts-expect-error -- Wrapper Object String 不能赋给 Primitive string。
const primitive: string = boxed;
void primitive;

// @ts-expect-error -- bigint 与 number 不能直接混合运算。
const mixed = 1n + 1;
void mixed;

const registry = new ServiceRegistry();
// @ts-expect-error -- CONFIG_TOKEN 只能绑定 AppConfig。
registry.set(CONFIG_TOKEN, { log: () => "wrong service" });

const arbitrary = Symbol("app-config");
// @ts-expect-error -- 普通 symbol 不能伪装成 CONFIG_TOKEN 的 unique symbol 类型。
const forgedToken: typeof CONFIG_TOKEN = arbitrary;
void forgedToken;

const valid: AppConfig = { environment: "development" };
registry.set(CONFIG_TOKEN, valid);
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

把 `String` 当作 `string`、把 bigint 与 number 混算，或认为描述相同的两个 Symbol 就是同一 Token。应使用 Primitive、显式单位/转换和导出的唯一 Token。

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
PRIMITIVES
primitiveType=string
wrapperType=object
bigintJsonFailure=TypeError
bigintJson={"budget":"900719925474099312345"}
service=production:registry-ready
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

1. DTO、Domain 和公共 API 默认使用 string/number/boolean 等小写 Primitive。
2. 涉及超大整数时同时设计运算、JSON、数据库和跨语言契约。
3. Token 必须从单一模块导出；不要在消费者侧用相同描述重新创建 Symbol。

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
