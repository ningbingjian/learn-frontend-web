# KP009：as、非空断言与双重断言如何制造假安全

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 |
| 深度 | Should / Expert |
| Pattern | SECURITY-LAB + FAILURE-LAB |
| 主问题 | 编译器红线消失后，数据真的被验证了吗？ |
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

> 编译器红线消失后，数据真的被验证了吗？

---

## 2. 核心结论

- `as T` 只改变编译器采用的静态解释，不会检查 Runtime 值。
- 非空断言 `value!` 不会生成 null/undefined 防护。
- `as unknown as T` 可以跨越几乎所有兼容检查，因此必须进入 Assertion Budget。
- 可信边界应采用 unknown、Runtime Guard、Parse Result 和可观测错误。

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
kp009-unsafe-assertions/
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

### Step 1：准备不可信输入

用错误类型的 Project Payload 和缺失 Token 模拟真实外部边界。

### Step 2：用断言制造假安全

双重断言和非空断言都能通过 Check，但在 Runtime 立即失败。

### Step 3：建立安全解析器

从 unknown 开始逐字段验证，返回 ok/value 或 ok/issues。

### Step 4：保存负向证据

直接访问 unknown、明显不兼容断言和未缩小的可空值都必须稳定报错。

### Step 5：制定 Assertion Budget

记录允许断言的位置、证据、Owner 和移除条件。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export interface Project {
  id: string;
  name: string;
  members: string[];
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function unsafeProjectName(input: string): string {
  const project = input as unknown as Project;
  return project.name.toUpperCase();
}

export function unsafeTokenLength(token: string | undefined): number {
  return token!.length;
}

export function parseProject(input: unknown): ParseResult<Project> {
  if (!isRecord(input)) {
    return { ok: false, issues: ["project must be an object"] };
  }

  const issues: string[] = [];
  if (typeof input.id !== "string") issues.push("id must be string");
  if (typeof input.name !== "string") issues.push("name must be string");
  if (!Array.isArray(input.members) || !input.members.every((item) => typeof item === "string")) {
    issues.push("members must be string[]");
  }

  if (issues.length > 0) return { ok: false, issues };

  return {
    ok: true,
    value: {
      id: input.id as string,
      name: input.name as string,
      members: input.members as string[]
    }
  };
}

function captureFailure(action: () => unknown): string {
  try {
    action();
    return "none";
  } catch (error: unknown) {
    return error instanceof TypeError ? "TypeError" : "Error";
  }
}

const brokenPayload: unknown = {
  id: "PROJECT-1",
  name: 42,
  members: "Ada"
};
const validPayload: unknown = {
  id: "PROJECT-2",
  name: "Runtime Firewall",
  members: ["Ada", "Lin"]
};

const broken = parseProject(brokenPayload);
const valid = parseProject(validPayload);

console.log("ASSERTION_FAILURE_LAB");
console.log(`doubleAssertion=${captureFailure(() => unsafeProjectName("not a project"))}`);
console.log(`nonNullAssertion=${captureFailure(() => unsafeTokenLength(undefined))}`);
console.log(`safeParse=${broken.ok ? "ok" : `error:${broken.issues.join(",")}`}`);
console.log(`validProject=${valid.ok ? `${valid.value.id}:${valid.value.name}` : "invalid"}`);
```

### `src/expected-errors.ts`

```ts
import type { Project } from "./index.js";

declare const externalInput: unknown;

// @ts-expect-error -- unknown 在缩小前不能直接访问属性。
externalInput.name;

// @ts-expect-error -- number 与 string 没有足够重叠，编译器拒绝单次断言。
const impossible = 42 as string;
void impossible;

declare const maybeToken: string | undefined;
// @ts-expect-error -- 可能为 undefined，必须先处理缺失状态。
maybeToken.length;

// 双重断言可以绕过上面的保护，因此这里只作为反例。
const forged = 42 as unknown as Project;
void forged;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

把 API 返回值直接写成 `payload as Project`，或为了消除报错写 `token!`。这不会增加任何 Runtime 证据，只会把错误推迟到更难排查的位置。

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
ASSERTION_FAILURE_LAB
doubleAssertion=TypeError
nonNullAssertion=TypeError
safeParse=error:name must be string,members must be string[]
validProject=PROJECT-2:Runtime Firewall
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

1. 外部输入默认是 unknown，验证成功后才进入 Domain。
2. 允许断言时必须能指出更强的外部证据，例如已完成 Runtime Check 或框架不完整声明。
3. 禁止把双重断言作为日常类型转换手段；团队应统计和评审断言数量。

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
