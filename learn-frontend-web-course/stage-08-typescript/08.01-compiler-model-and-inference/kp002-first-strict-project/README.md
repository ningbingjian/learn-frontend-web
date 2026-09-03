# KP002：从零建立第一个 Strict TypeScript 7 项目

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must |
| Pattern | BUILD-LAB + CONFIGURATION-LAB + FAILURE-LAB |
| 主问题 | 一个可维护的 TypeScript 项目，最小但完整的严格配置应该是什么？ |
| 最终证据 | `tsc --noEmit`、Build 产物、Runtime 输出、配置自动断言 |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

你将从空目录建立一个可以独立完成以下动作的 TypeScript 项目：

```text
安装固定版本依赖
→ 检查类型但不生成文件
→ 清理旧产物并重新构建
→ 执行生成后的 JavaScript
→ 自动验证配置、产物和运行结果
```

最终命令是：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

项目会实现一个“用户偏好摘要”程序，并通过负向类型测试证明这些严格规则真的生效：

```text
strictNullChecks
noImplicitAny
noUncheckedIndexedAccess
exactOptionalPropertyTypes
Literal Union
```

本课结束时，你不仅能复制一份 `tsconfig.json`，还必须能解释：

- 谁读取 `tsconfig.json`；
- `check`、`build` 与 `start` 为什么必须分开；
- `rootDir`、`outDir`、`include`、`exclude` 分别控制什么；
- 为什么课程显式写出关键选项，而不依赖 TypeScript 当前默认值；
- 为什么严格配置应当在项目第一天建立，而不是代码失控后再补。

---

## 2. 本课解决什么问题

很多人第一次建立 TypeScript 项目，只做了两件事：

```bash
npm install typescript
npx tsc --init
```

然后立刻开始写业务代码。

这样虽然“能跑”，却没有回答下面这些工程问题：

```text
检查命令会不会顺便污染 dist？
旧构建文件会不会残留？
源码和产物的边界在哪里？
Node.js 到底按 ESM 还是 CommonJS 加载？
数组和动态对象索引是否可能返回 undefined？
可选字段是否允许显式写 undefined？
编辑器和 CI 是否使用同一份配置？
升级 TypeScript 后默认值改变会不会悄悄改变项目行为？
```

一个成熟 TypeScript 项目的第一步，不是“多写几个类型”，而是建立**可审查、可重复、可自动验证的编译契约**。

---

## 3. 前置知识与本课边界

### 已经需要知道

- 已完成 KP001，理解 TypeScript 会在运行前检查一部分值关系。
- 会创建目录、文件并执行 npm Script。
- 知道 `src` 通常保存源码，`dist` 通常保存构建产物。

### 本课完整学习

- 本地固定 TypeScript 版本。
- `package.json` 中 Check、Build、Start、Verify 的职责分离。
- 第一份显式 Strict 配置。
- 常用安全选项的可观察效果。
- Expected Error 如何验证“应当失败”的示例。
- 构建产物与 Runtime 的基本边界。

### 本课暂不展开

- Parse、Bind、Check、Emit 的内部阶段：KP003。
- 外部数据的 Runtime Validation：KP004。
- 每个 `tsconfig` 选项的完整兼容与性能边界：Module 08.09。
- ESM、CommonJS、`exports` 与包发布：Module 08.08、08.12。

---

## 4. 本课项目介绍

项目输入是一份用户偏好：

```text
displayName：显示名
theme：只能是 light 或 dark
locale：可缺失；存在时必须是 string
shortcuts：动态快捷键映射
```

正常输出：

```text
Hello Ada · theme=dark · locale=zh-CN · palette=Ctrl+K
```

这里故意选择了可选字段和动态索引，因为它们能让严格配置产生真实价值：

```text
preferences.locale
→ 属性可能缺失
→ 使用 ?? 提供默认值

preferences.shortcuts["openPalette"]
→ key 可能不存在
→ noUncheckedIndexedAccess 让结果成为 string | undefined
→ 使用 ?? 处理缺失
```

---

## 5. 起始状态

本课不复制 KP001 业务源码。

原因是本课主问题不是继续扩展投递摘要，而是从零证明：

> 一份新的 TypeScript 项目怎样建立可靠的命令与配置基线。

创建目录：

```bash
mkdir kp002-first-strict-project
cd kp002-first-strict-project
mkdir src
```

仓库目录中的源码是最终状态。学习时仍应按本 README 从空目录复刻一次。

---

## 6. 最终会有哪些文件

```text
kp002-first-strict-project/
├── README.md
├── package.json              # 固定版本与命令契约
├── tsconfig.json             # 显式 Strict 编译契约
├── verify.mjs                # 自动检查配置和 Runtime 结果
└── src/
    ├── index.ts              # 正常业务主线
    └── expected-errors.ts    # 必须持续产生诊断的负向类型测试
```

构建后生成但不提交：

```text
dist/
├── index.js
├── index.js.map
├── index.d.ts
├── index.d.ts.map
├── expected-errors.js
└── ...
```

---

## 7. Step 0：创建 package.json，先固定工具和命令

创建：

```text
package.json
```

写入：

```json
{
  "name": "@learn-frontend-web/ts-kp002-first-strict-project",
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

### 为什么固定 `typescript: 7.0.2`

```json
"typescript": "7.0.2"
```

这里没有写：

```json
"typescript": "^7.0.2"
```

课程项目强调实验可重复。精确版本意味着：

```text
今天运行
CI 运行
其他学习者运行
以后回看
```

都应尽可能使用同一个编译器行为。

真实生产仓库可以使用 Renovate、Dependabot 或人工升级流程更新版本，但升级本身必须成为可审查变更。

### 五个 Script 的职责

```text
clean
→ 删除旧 dist，避免陈旧文件伪装成新构建结果

check
→ tsc --noEmit，只做静态检查

build
→ clean 后真正 Emit

start
→ 只执行 dist/index.js，不让 Node.js 隐式替代构建步骤

verify
→ 把 Check、Build 和课程专属断言组成一个验收入口
```

安装依赖：

```bash
npm install
```

现在还不能执行 Type Check，因为 `tsconfig.json` 和源码尚未建立。

---

## 8. Step 1：创建显式 tsconfig.json

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

### 8.1 运行环境契约

```json
"target": "ES2022",
"lib": ["ES2022", "DOM"]
```

`target` 控制生成 JavaScript 所面向的语言级别。

`lib` 控制检查器认为当前环境具备哪些标准声明。本课加入 `DOM`，主要是让 `console` 等宿主 API 获得类型；这不等于当前程序必须在浏览器运行。

### 8.2 模块契约

```json
"module": "NodeNext",
"moduleResolution": "NodeNext",
"verbatimModuleSyntax": true
```

本项目通过：

```json
"type": "module"
```

声明 Node.js ESM 包，因此 TypeScript 也显式使用 NodeNext 语义检查模块。

`verbatimModuleSyntax` 要求我们认真区分：

```ts
import { runtimeValue } from "./module.js";
import type { OnlyAType } from "./module.js";
```

Module 08.08 会完整学习模块边界。本课只建立不含糊的起点。

### 8.3 Strict 基线

```json
"strict": true
```

它不是单一检查，而是一组严格选项的总开关，例如：

```text
noImplicitAny
strictNullChecks
strictFunctionTypes
strictPropertyInitialization
useUnknownInCatchVariables
...
```

课程仍显式写出若干特别重要的选项，因为它们是本阶段的直接教学证据，且不能依赖未来默认值。

### 8.4 索引安全

```json
"noUncheckedIndexedAccess": true
```

对于：

```ts
preferences.shortcuts["openPalette"]
```

即使 `shortcuts` 的 Value 声明为 `string`，这个 key 也可能不存在，所以结果应被视为：

```ts
string | undefined
```

### 8.5 可选属性精确语义

```json
"exactOptionalPropertyTypes": true
```

下面两种状态不再被无条件混为一谈：

```text
locale 属性不存在
locale 属性存在，但值是 undefined
```

对于：

```ts
locale?: string
```

允许：

```ts
{}
{ locale: "zh-CN" }
```

默认不允许：

```ts
{ locale: undefined }
```

除非类型明确写成：

```ts
locale?: string | undefined
```

### 8.6 源码和产物边界

```json
"rootDir": "src",
"outDir": "dist",
"include": ["src/**/*.ts"],
"exclude": ["dist"]
```

关系是：

```text
include 决定哪些文件进入 Project
rootDir 说明源码目录结构的根
outDir 决定 Emit 写到哪里
exclude 避免把产物再次当源码输入
```

### 8.7 为什么写 `types: []`

```json
"types": []
```

这表示不自动把环境里所有可见的 `@types/*` Package 注入全局作用域。

好处是让项目依赖的全局类型可审查，避免某台电脑因为安装了额外类型包而“神奇地能编译”。Node.js 专属 API 的声明会在后续 Node Stage 中通过明确依赖加入。

---

## 9. Step 2：创建正常业务主线

创建：

```text
src/index.ts
```

写入：

```ts
type Theme = "light" | "dark";

interface UserPreferences {
  displayName: string;
  theme: Theme;
  locale?: string;
  shortcuts: Record<string, string>;
}

function normalizeDisplayName(input: string): string {
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : "Anonymous";
}

function createPreferenceReport(preferences: UserPreferences): string {
  const displayName = normalizeDisplayName(preferences.displayName);
  const locale = preferences.locale ?? "zh-CN";
  const paletteShortcut = preferences.shortcuts["openPalette"] ?? "not configured";

  return [
    `Hello ${displayName}`,
    `theme=${preferences.theme}`,
    `locale=${locale}`,
    `palette=${paletteShortcut}`
  ].join(" · ");
}

const preferences: UserPreferences = {
  displayName: " Ada ",
  theme: "dark",
  shortcuts: {
    openPalette: "Ctrl+K"
  }
};

console.log(createPreferenceReport(preferences));
```

### 9.1 Theme 是 Literal Union

```ts
type Theme = "light" | "dark";
```

这不是说 Theme 在 Runtime 是一个对象，而是让 Checker 只接受两个字面量值。

### 9.2 Optional Property 的读取结果

```ts
locale?: string;
```

读取时必须考虑缺失：

```ts
const locale = preferences.locale ?? "zh-CN";
```

`??` 只在左侧为 `null` 或 `undefined` 时使用右侧默认值。

### 9.3 动态索引必须处理缺失

```ts
const paletteShortcut =
  preferences.shortcuts["openPalette"] ?? "not configured";
```

在 `noUncheckedIndexedAccess` 下，Checker 不允许我们假装任意 key 一定存在。

### 9.4 什么时候第一次运行 Check

现在已经达到第一个可检查状态：

```bash
npm run check
```

预期：

```text
退出码 0
终端没有 Type Error
dist 仍然不存在
```

如果此时出现找不到 `console`，检查 `lib` 是否包含 `DOM`；如果出现模块配置冲突，检查 `module` 与 `moduleResolution` 是否同时为 `NodeNext`。

---

## 10. Step 3：建立负向类型测试

创建：

```text
src/expected-errors.ts
```

写入：

```ts
type Theme = "light" | "dark";

interface UserPreferences {
  displayName: string;
  theme: Theme;
  locale?: string;
  shortcuts: Record<string, string>;
}

// strictNullChecks：null 不能赋给 string。
// @ts-expect-error -- title 必须是 string
const title: string = null;

// noImplicitAny 属于 strict 家族。
// @ts-expect-error -- value 缺少参数类型
function unsafeFormat(value) {
  return String(value);
}

const preferences: UserPreferences = {
  displayName: "Ada",
  theme: "light",
  shortcuts: {}
};

// noUncheckedIndexedAccess：动态索引读取可能不存在。
// @ts-expect-error -- 结果是 string | undefined
const missingShortcut: string = preferences.shortcuts["missing"];

// exactOptionalPropertyTypes：可选属性缺失不等于显式写 undefined。
// @ts-expect-error -- locale 声明为可缺失，但存在时必须是 string
const invalidOptional: UserPreferences = {
  displayName: "Ada",
  theme: "dark",
  shortcuts: {},
  locale: undefined
};

// @ts-expect-error -- sepia 不属于 Theme
const invalidTheme: Theme = "sepia";

void title;
void unsafeFormat;
void missingShortcut;
void invalidOptional;
void invalidTheme;
```

这里不是“把错误代码留在项目里不管”，而是建立一个明确合同：

> 每个 `@ts-expect-error` 后面的下一条语句，必须继续产生一个 TypeScript 诊断。

### 10.1 为什么负向测试仍能让 Check 通过

假设下面一行确实错误：

```ts
// @ts-expect-error -- sepia 不属于 Theme
const invalidTheme: Theme = "sepia";
```

Checker 会确认错误存在，然后把它视为“符合测试预期”。

如果未来有人错误地把 `Theme` 改成：

```ts
type Theme = string;
```

原来的错误消失，TypeScript 会反过来报告：

```text
Unused '@ts-expect-error' directive.
```

所以负向测试保护的是：

```text
某个非法调用必须持续非法
```

### 10.2 注释放置必须精确

`@ts-expect-error` 只作用于紧随其后的语句。

对象整体赋值错误通常报告在：

```ts
const invalidOptional: UserPreferences = {
```

因此注释必须放在 `const` 之前，而不是随意贴在 `locale` 属性之前。

错误示例：

```ts
const invalidOptional: UserPreferences = {
  // 注释可能没有覆盖真正诊断位置
  // @ts-expect-error
  locale: undefined
};
```

正确示例已经保存在当前文件中。

再次执行：

```bash
npm run check
```

预期仍然退出 0。

---

## 11. Step 4：构建并观察 dist

执行：

```bash
npm run build
```

预期生成：

```text
dist/
├── index.js
├── index.js.map
├── index.d.ts
├── index.d.ts.map
├── expected-errors.js
├── expected-errors.js.map
├── expected-errors.d.ts
└── expected-errors.d.ts.map
```

### Check 和 Build 的关键差异

```text
npm run check
→ 只问：类型关系是否成立？
→ 不写 dist

npm run build
→ 先做检查
→ 再生成 JavaScript、Declaration 和 Source Map
```

不要用“dist 里有文件”证明本次构建成功。旧文件可能来自上一次构建，所以 `build` 首先执行 `clean`。

---

## 12. Step 5：只运行生成后的 JavaScript

执行：

```bash
npm start
```

预期：

```text
Hello Ada · theme=dark · locale=zh-CN · palette=Ctrl+K
```

这里真正执行的是：

```text
dist/index.js
```

不是：

```text
src/index.ts
```

这条边界非常重要：

```text
TypeScript Compiler
→ 检查并生成

Node.js Runtime
→ 执行 JavaScript
```

后续即使采用能直接运行 `.ts` 的开发工具，也不能因此把“类型检查”和“运行”误认为同一件事。

---

## 13. Step 6：创建自动验收脚本

创建：

```text
verify.mjs
```

写入：

```js
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const config = JSON.parse(readFileSync("tsconfig.json", "utf8"));
const options = config.compilerOptions ?? {};

for (const key of [
  "strict",
  "noUncheckedIndexedAccess",
  "exactOptionalPropertyTypes",
  "useUnknownInCatchVariables",
  "noImplicitOverride",
  "noUncheckedSideEffectImports"
]) {
  assert(options[key] === true, `tsconfig 必须显式启用 ${key}`);
}

assert(options.module === "NodeNext", "module 必须显式设置为 NodeNext");
assert(options.moduleResolution === "NodeNext", "moduleResolution 必须显式设置为 NodeNext");
assert(options.rootDir === "src", "rootDir 必须显式设置为 src");
assert(options.outDir === "dist", "outDir 必须显式设置为 dist");

const output = spawnSync(process.execPath, ["dist/index.js"], {
  encoding: "utf8"
});

assert(output.status === 0, `运行失败：${output.stderr}`);
assert(
  output.stdout.trim() === "Hello Ada · theme=dark · locale=zh-CN · palette=Ctrl+K",
  `输出不符合预期：${output.stdout}`
);

console.log("✓ KP002 验证通过：strict 配置显式可审查，Check、Build 与 Runtime 职责分离。");
```

脚本做两类验证。

### 配置验证

它要求这些选项必须显式为 `true`：

```text
strict
noUncheckedIndexedAccess
exactOptionalPropertyTypes
useUnknownInCatchVariables
noImplicitOverride
noUncheckedSideEffectImports
```

这能阻止以后有人为了“让构建通过”悄悄删除严格配置。

### Runtime 验证

它执行：

```text
dist/index.js
```

并要求标准输出与预期完全一致。

执行完整验收：

```bash
npm run verify
```

预期末行：

```text
✓ KP002 验证通过：strict 配置显式可审查，Check、Build 与 Runtime 职责分离。
```

---

## 14. 完整命令与预期结果

| 命令 | 是否检查类型 | 是否写 dist | 是否运行程序 | 预期 |
| --- | --- | --- | --- | --- |
| `npm install` | 否 | 否 | 否 | 安装锁定依赖 |
| `npm run check` | 是 | 否 | 否 | 退出码 0 |
| `npm run build` | 是 | 是 | 否 | 生成新 dist |
| `npm start` | 否 | 否 | 是 | 输出偏好摘要 |
| `npm run verify` | 是 | 是 | 是 | 所有断言通过 |

建议学习时依次执行，不要一开始只跑最后一个命令。课程的目的包括观察每一步职责，而不只是得到绿色结果。

---

## 15. 图解：项目中的四个角色

```text
package.json
  │ 固定工具版本与命令入口
  ▼
tsconfig.json
  │ 定义 Project、检查和 Emit 契约
  ▼
TypeScript Compiler
  ├─ Check → 诊断
  └─ Emit  → dist/*.js + dist/*.d.ts + maps
                         │
                         ▼
                    Node.js Runtime
                         │
                         ▼
                       输出
```

再加入 CI：

```text
Developer IDE
     │
     ├── 使用同一 Project 配置提供即时诊断
     │
CI ──┴── npm run verify
             │
             ├── 类型契约
             ├── 构建契约
             └── Runtime 契约
```

---

## 16. 理论收束

### 16.1 TypeScript Project 是什么

当 TypeScript 找到 `tsconfig.json` 后，会根据：

```text
files / include / exclude
+ compilerOptions
+ import graph
```

建立一个 Program，也就是当前检查与构建的源码集合及其依赖关系。

### 16.2 Strict 不是“吹毛求疵模式”

它的价值是让不确定性出现在类型中：

```text
可能缺失
→ T | undefined

不知道是什么
→ unknown

没有参数类型
→ implicit any diagnostic
```

如果关闭这些证据，风险不会消失，只会重新回到 Runtime。

### 16.3 显式配置是架构决策

即使某个 TypeScript 版本默认已经开启某选项，核心项目仍可显式写出它，因为：

```text
读配置的人不需要猜版本默认值
升级差异可以被 Review
多个子项目更容易继承统一基线
CI 可以自动断言
```

---

## 17. Wrong Way 与故障排查

### Wrong Way 1：全局安装 TypeScript，却不写项目依赖

```bash
npm install -g typescript
```

全局工具可用于临时实验，但正式项目必须在 `devDependencies` 固定版本，否则不同开发者和 CI 可能使用不同 Checker。

### Wrong Way 2：`check` 也生成 dist

如果 Check 命令直接调用普通 `tsc`，编辑器保存或 CI 诊断可能污染产物目录。

正确职责：

```json
"check": "tsc --noEmit"
```

### Wrong Way 3：构建前不清理

删除或改名源码后，旧 JavaScript 可能继续留在 `dist`，让测试误执行已经不存在的模块。

### Wrong Way 4：遇到错误就关闭 strict

这相当于删除告警器，而不是修复输入、控制流或类型模型。

### Wrong Way 5：Expected Error 放错位置

症状：

```text
真实错误仍然出现
同时提示 Unused '@ts-expect-error'
```

处理：查看诊断实际指向哪一行，把注释放到产生诊断的完整语句前。

### Wrong Way 6：用 `@ts-ignore`

`@ts-ignore` 只负责忽略下一行，即使以后那一行不再错误，也不会提醒你。可验证教材和类型测试优先使用 `@ts-expect-error`。

---

## 18. 更深原理

`tsc --noEmit` 并不是“不编译”。它仍会完成建立 Program、解析、绑定和类型检查，只是跳过写出 JavaScript 文件。

大致关系：

```text
读取 tsconfig
→ 解析根文件
→ 沿 import 建立 Program
→ Bind Symbol
→ Check Type
→ noEmit=true：到此停止写文件
```

`npm run build` 则允许继续生成：

```text
JavaScript
Declaration
Source Map
Declaration Map
```

下一课会通过真实产物把这条 Pipeline 拆开观察。

---

## 19. Production Boundary

生产仓库通常还会增加：

```text
共享 tsconfig 基础包
Browser / Node / Test / Library 多套配置
Project Reference
Incremental Build
Lint 与 Format
Unit / Integration / E2E Test
Bundle Build
API Schema Validation
CI Cache
Type Performance Budget
```

这些能力不会在本课一次塞入。当前项目只建立后续所有工程能力依赖的最小可靠基线：

```text
版本固定
+ 配置显式
+ 命令分责
+ 正向与负向类型证据
+ Runtime 验收
```

---

## 20. 本课只记住 3 件事

1. `tsconfig.json` 是 TypeScript Project 的可审查编译契约，不是随手生成后永远不看的文件。
2. `check`、`build`、`start` 必须职责分离；有类型、产物、Runtime 三类不同证据。
3. Strict 让“不确定”进入类型模型；关闭诊断不会删除真实风险。

---

## 21. Challenge

为用户偏好增加：

```ts
timezone?: string;
```

要求：

1. 属性缺失时输出 `timezone=UTC`。
2. 属性存在时只接受 `string`。
3. 在 `expected-errors.ts` 中证明 `{ timezone: undefined }` 不合法。
4. `verify.mjs` 同时检查新输出。
5. 不关闭 `exactOptionalPropertyTypes`。

验收：

```bash
npm run verify
```

---

## 22. Mastery Check

请用当前项目回答：

1. `npm run check` 为什么不应生成 `dist`？
2. `strict: true` 与 `noUncheckedIndexedAccess: true` 是什么关系？
3. `locale?: string` 和 `locale: string | undefined` 有何差别？
4. 为什么 `Record<string, string>` 的动态索引仍可能缺失？
5. `rootDir`、`outDir`、`include` 各自控制什么？
6. 为什么项目依赖比全局 TypeScript 更可靠？
7. `@ts-expect-error` 为什么可以被看作负向测试？
8. 为什么编译通过后还要执行 Runtime 验收？

能够结合源码、诊断和产物回答，才算完成本课。

---

## 23. 最终源码与实验说明

正常主线：

```text
src/index.ts
```

严格选项负向证据：

```text
src/expected-errors.ts
```

配置与 Runtime 自动证据：

```text
verify.mjs
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Handbook：The TSConfig Reference
- TypeScript Handbook：Everyday Types
- TypeScript 7.0 官方发布说明
