# KP015：Optional、Readonly 与 exactOptionalPropertyTypes

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.02 |
| 深度 | Must / Should |
| Pattern | FAILURE-LAB + DOMAIN-MODELING-LAB |
| 主问题 | 属性缺失、显式 undefined、只读引用和深度不可变为什么是四个不同问题？ |
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

> 属性缺失、显式 undefined、只读引用和深度不可变为什么是四个不同问题？

---

## 2. 核心结论

- Optional 表达属性可以不存在；`T | undefined` 表达属性存在但值可为 undefined。
- exactOptionalPropertyTypes 让写入侧严格区分缺失和显式 undefined。
- readonly 默认只约束当前属性赋值，是浅层静态约束。
- 深层不可变需要嵌套 readonly、ReadonlyArray 或专门数据结构，并不由一个 readonly 自动完成。

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
kp015-optional-readonly-exact-optional/
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

### Step 1：建模偏好设置

theme 缺失表示继承系统主题，locale 和 tags 是必需状态。

### Step 2：实现 Patch

只应用实际存在的键，不用 undefined 伪装“清除”。

### Step 3：设计 Clear Command

通过判别命令显式删除 theme，避免 Optional 语义含糊。

### Step 4：观察浅层 readonly

id 和 preferences 引用不可替换，但 preferences 内部字段仍可修改。

### Step 5：建立深度只读视图

对嵌套字段和数组分别加 readonly，并保存非法修改的 Expected Error。

---

## 7. 完整核心源码

### `src/index.ts`

```ts
export type Theme = "light" | "dark";

export interface Preferences {
  theme?: Theme;
  locale: string;
  tags: string[];
}

export interface Account {
  readonly id: string;
  readonly preferences: Preferences;
}

export interface PreferencePatch {
  theme?: Theme;
  locale?: string;
  tags?: string[];
}

export type PreferenceCommand =
  | { type: "patch"; patch: PreferencePatch }
  | { type: "clear-theme" };

export interface ImmutablePreferences {
  readonly theme?: Theme;
  readonly locale: string;
  readonly tags: readonly string[];
}

export interface ImmutableAccount {
  readonly id: string;
  readonly preferences: ImmutablePreferences;
}

export function applyPatch(
  preferences: Preferences,
  patch: PreferencePatch
): Preferences {
  return {
    ...preferences,
    ...(patch.theme === undefined ? {} : { theme: patch.theme }),
    ...(patch.locale === undefined ? {} : { locale: patch.locale }),
    ...(patch.tags === undefined ? {} : { tags: [...patch.tags] })
  };
}

export function applyCommand(
  preferences: Preferences,
  command: PreferenceCommand
): Preferences {
  if (command.type === "patch") return applyPatch(preferences, command.patch);
  const { theme: _removedTheme, ...withoutTheme } = preferences;
  return withoutTheme;
}

export const account: Account = {
  id: "ACCOUNT-1",
  preferences: {
    theme: "dark",
    locale: "en-US",
    tags: ["stable"]
  }
};

const patched = applyCommand(account.preferences, {
  type: "patch",
  patch: {
    theme: "light",
    locale: "zh-CN",
    tags: ["stable", "beta"]
  }
});
const cleared = applyCommand(patched, { type: "clear-theme" });

// readonly preferences 只保护引用本身，嵌套对象仍然可变。
account.preferences.locale = "ja-JP";
account.preferences.tags.push("mutable");

console.log("OPTIONAL_READONLY");
console.log("initial=dark:en-US:stable");
console.log(`patched=${patched.theme ?? "system"}:${patched.locale}:${patched.tags.join(",")}`);
console.log(`cleared=${cleared.theme ?? "system"}:${cleared.locale}`);
console.log(`shallowMutation=${account.preferences.locale}:${account.preferences.tags.length}`);
```

### `src/expected-errors.ts`

```ts
import {
  account,
  type ImmutableAccount,
  type PreferencePatch,
  type Preferences
} from "./index.js";

// @ts-expect-error -- readonly id 不允许重新赋值。
account.id = "ACCOUNT-2";

// exactOptionalPropertyTypes 下，缺失和显式 undefined 不相同。
// @ts-expect-error -- theme?: Theme 不接受显式 undefined。
const invalidPreferences: Preferences = {
  locale: "en-US",
  tags: [],
  theme: undefined
};
void invalidPreferences;

// @ts-expect-error -- Patch 中的 Optional theme 同样不能写 undefined。
const invalidPatch: PreferencePatch = { theme: undefined };
void invalidPatch;

declare const immutable: ImmutableAccount;
// @ts-expect-error -- 深层 readonly locale 不可修改。
immutable.preferences.locale = "zh-CN";
// @ts-expect-error -- readonly string[] 没有 push。
immutable.preferences.tags.push("beta");
```

这些代码同时存在的原因是：正常主线证明“应该允许什么”，Expected Error 证明“必须阻止什么”。只保留其中一侧，类型契约都不完整。

## 8. Failure Lab

认为 `readonly preferences` 会冻结内部对象，或通过 `{ theme: undefined }` 表示删除主题。前者只是浅层静态约束，后者混淆了缺失与值。

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
OPTIONAL_READONLY
initial=dark:en-US:stable
patched=light:zh-CN:stable,beta
cleared=system:zh-CN
shallowMutation=ja-JP:2
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

1. Optional 字段必须在接口文档中说明“缺失”的业务语义。
2. 清除字段使用显式 Command、删除操作或独立状态，不用 undefined 猜测意图。
3. 公共不可变 API 对嵌套对象和集合逐层使用 readonly，并用 Runtime 策略补充需要的冻结。

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
