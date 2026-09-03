# KP012：null、undefined 与 strictNullChecks

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 |
| 深度 | Must |
| Pattern | FAILURE-LAB + DOMAIN-MODELING-LAB |
| 主问题 | 缺失字段、显式空值和空字符串应不应该使用同一种类型？ |
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

> 缺失字段、显式空值和空字符串应不应该使用同一种类型？

---

## 2. 核心结论

- undefined 通常表示缺失或尚未提供，null 常表示外部协议显式返回“没有值”。
- strictNullChecks 让 null/undefined 不再静默流入普通 string。
- Optional Property 与 `T | undefined` 在写入语义上不同。
- `??` 只处理 nullish；`||` 还会把空字符串、0 和 false 当成缺失。

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
kp012-null-undefined-strict-null-checks/
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

### Step 1：定义 Raw DTO

保留外部协议中的 null、Optional 和字符串时间。

### Step 2：定义 Domain Profile

把内部缺失统一成 Optional，并把时间转换为 Date。

### Step 3：实现 Normalize

使用条件 Spread，避免给 exact Optional 属性写显式 undefined。

### Step 4：比较 ?? 与 ||

用空字符串证明二者的业务含义不同。

### Step 5：保存 Nullability 故障

覆盖可空成员访问、null 赋值和 Optional 写入。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export interface RawProfileDto {
  id: string;
  displayName: string | null;
  nickname?: string | null;
  avatarUrl: string | null;
  lastLoginAt?: string | null;
}

export interface Profile {
  id: string;
  displayName: string;
  nickname?: string;
  avatarUrl?: string;
  lastLoginAt?: Date;
}

function presentString(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizeProfile(dto: RawProfileDto): Profile {
  const nickname = presentString(dto.nickname);
  const avatarUrl = presentString(dto.avatarUrl);
  const lastLoginAt = dto.lastLoginAt == null ? undefined : new Date(dto.lastLoginAt);

  return {
    id: dto.id,
    displayName: presentString(dto.displayName) ?? `用户-${dto.id}`,
    ...(nickname === undefined ? {} : { nickname }),
    ...(avatarUrl === undefined ? {} : { avatarUrl }),
    ...(lastLoginAt === undefined ? {} : { lastLoginAt })
  };
}

export function displayLabel(profile: Profile): string {
  return profile.nickname ?? profile.displayName;
}

export function fallbackWithNullish(value: string | null | undefined): string {
  return value ?? "fallback";
}

export function fallbackWithOr(value: string | null | undefined): string {
  return value || "fallback";
}

const profile = normalizeProfile({
  id: "USER-1",
  displayName: null,
  nickname: null,
  avatarUrl: null,
  lastLoginAt: "2026-09-01T10:00:00.000Z"
});

console.log("NULLABILITY");
console.log(`profile=${profile.id}:${displayLabel(profile)}`);
console.log(`avatar=${profile.avatarUrl ?? "missing"}`);
console.log(`nullishEmpty=${fallbackWithNullish("")}`);
console.log(`orEmpty=${fallbackWithOr("")}`);
console.log(`lastLogin=${profile.lastLoginAt?.toISOString().slice(0, 10) ?? "missing"}`);
```

### `src/expected-errors.ts`

```ts
import type { Profile, RawProfileDto } from "./index.js";

const dto: RawProfileDto = {
  id: "USER-2",
  displayName: null,
  avatarUrl: null
};

// @ts-expect-error -- displayName 可能为 null，必须先缩小或标准化。
dto.displayName.toUpperCase();

// @ts-expect-error -- strictNullChecks 阻止 null 流入普通 string。
const name: string = null;
void name;

// exactOptionalPropertyTypes 下，缺失与显式 undefined 不相同。
// @ts-expect-error -- nickname?: string 不接受显式 undefined 写入。
const profile: Profile = {
  id: "USER-3",
  displayName: "Ada",
  nickname: undefined
};
void profile;
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

把 `nickname?: string` 理解成“可以随时写 nickname: undefined”，或用 `||` 错误覆盖合法空字符串。应先定义协议语义，再选择 Optional、null 或显式 union。

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
NULLABILITY
profile=USER-1:用户-USER-1
avatar=missing
nullishEmpty=
orEmpty=fallback
lastLogin=2026-09-01
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

1. 在 DTO 层忠实表达外部 nullability，在 Adapter 层统一转换为 Domain 语义。
2. 开启 strictNullChecks 与 exactOptionalPropertyTypes，不通过断言隐藏缺失。
3. 只有真正把空字符串视为缺失时才使用 `||`；普通默认值优先审查 `??`。

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
