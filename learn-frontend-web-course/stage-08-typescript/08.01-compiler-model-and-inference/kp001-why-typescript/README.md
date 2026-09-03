# KP001：TypeScript 到底解决了 JavaScript 的什么问题

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| 所属 Stage | Stage 08 TypeScript |
| 所属 Module | 08.01 编译模型与类型推断 |
| 深度 | Must |
| Pattern | BUILD-LAB + FAILURE-LAB |
| 主问题 | JavaScript 代码可以运行，为什么还需要 TypeScript？ |
| 最终证据 | JavaScript Runtime 崩溃、TypeScript 编译诊断、Emit 后 JavaScript |
| 技术基线 | Node.js 20+、npm 10+、TypeScript 7.0.2 |

---

## 1. 本课最终要做出什么

你会得到两个实现相同业务的最小程序：

```text
unsafe.mjs
→ JavaScript 不检查输入形状
→ 错误数据进入函数
→ 运行到特定表达式才抛 TypeError

src/index.ts
→ TypeScript 声明输入契约
→ 错误数据在运行前被阻止
→ 正确数据构建后正常运行
```

还会得到：

- `src/expected-errors.ts`：保存“这些调用必须报错”的负向类型测试。
- `dist/index.js`：证明最终真正运行的仍然是 JavaScript。
- `dist/index.d.ts`：观察声明产物。
- `verify.mjs`：自动验证输出和类型擦除。

本课不是要证明“TypeScript 能消灭所有 Bug”，而是要建立一个更准确的结论：

> TypeScript 把一部分原本只能在运行时暴露的值关系错误，提前变成编辑器和编译器可以检查的静态证据。

---

## 2. 本课解决什么问题

下面的 JavaScript 在语法上完全合法：

```js
function createDeliverySummary(request) {
  return request.attempts.toFixed(0);
}

createDeliverySummary({
  attempts: "3"
});
```

问题是：

```text
"3" 是 string
string 没有 Number.prototype.toFixed
```

JavaScript 不会在函数定义处检查“调用者必须传 number”。它会照常执行，直到真正求值：

```js
request.attempts.toFixed(0)
```

才发现 `toFixed` 不是函数。

在小 Demo 中，这个错误很快出现；在真实系统中，它可能来自：

- 错误的接口响应；
- 调用者改了字段；
- 重构时漏改一处；
- 第三方 SDK 返回结构变化；
- 一个边界上的 `any` 扩散；
- 测试没有覆盖到的分支。

TypeScript 的第一项价值，就是把“函数期待什么”写进可检查的模型。

---

## 3. 前置知识与本课边界

### 已经需要知道

- 能在终端执行 `node` 和 `npm`。
- 知道 JavaScript 对象、函数、字符串和数字。
- 知道 Runtime Error 是程序运行时抛出的错误。

### 本课会学

- TypeScript 是 JavaScript 的静态类型层。
- Type Annotation 如何描述函数输入。
- 编译器怎样阻止明显不兼容的值。
- 类型在生成 JavaScript 时会被擦除。
- `@ts-expect-error` 如何保存预期错误。

### 本课暂不展开

- `tsconfig` 每个配置项：KP002 详细学习。
- Parse、Bind、Check、Emit：KP003 详细学习。
- `unknown` 与 Runtime Validation：KP004 详细学习。
- Union、Generic、高级类型：后续 Module 学习。

---

## 4. 本课项目介绍

业务场景是“生成消息投递摘要”。

输入应该满足：

```text
recipient：字符串
channel："email" 或 "sms"
attempts：数字
```

输出示例：

```text
team@example.com / email / attempts=3
```

我们会先故意使用错误数据：

```js
attempts: "3"
```

然后比较 JavaScript 和 TypeScript 的行为。

---

## 5. 起始状态

本课不继承上一课业务源码。

本课从一个新的空目录开始：

```text
kp001-why-typescript/
```

你可以在任意工作目录执行：

```bash
mkdir kp001-why-typescript
cd kp001-why-typescript
mkdir src
```

仓库已经保存最终源码，但请按照 README 从零输入和运行，不能只看最终文件得出“我懂了”。

---

## 6. 最终会有哪些文件

```text
kp001-why-typescript/
├── README.md                 # 当前教程
├── package.json              # 命令与 TypeScript 版本
├── tsconfig.json             # strict 编译配置
├── unsafe.mjs                # 未经静态检查的 JavaScript 故障基线
├── verify.mjs                # 自动验收
└── src/
    ├── index.ts              # 正常 TypeScript 主线
    └── expected-errors.ts    # 必须继续报错的负向类型测试
```

生成但不提交：

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

## 7. Step 0：创建 package.json

创建：

```text
package.json
```

写入：

```json
{
  "name": "@learn-frontend-web/ts-kp001-why-typescript",
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
    "start:unsafe": "node unsafe.mjs",
    "verify": "npm run check && npm run build && node verify.mjs"
  },
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

### 每个命令的职责

```text
npm run check
→ 只检查类型，不生成 dist

npm run build
→ 删除旧 dist，再生成 JavaScript、声明和 Source Map

npm start
→ 执行生成后的 JavaScript

npm run start:unsafe
→ 执行故意损坏的 JavaScript 基线

npm run verify
→ 组合 Check、Build 和课程专属断言
```

安装依赖：

```bash
npm install
```

现在还不能执行 `check`，因为 `tsconfig.json` 尚未创建。

---

## 8. Step 1：先运行未经检查的 JavaScript

创建：

```text
unsafe.mjs
```

写入：

```js
function createDeliverySummary(request) {
  return `${request.recipient} / ${request.channel} / attempts=${request.attempts.toFixed(0)}`;
}

const requestFromJavaScript = {
  recipient: "team@example.com",
  channel: "email",
  attempts: "3"
};

console.log(createDeliverySummary(requestFromJavaScript));
```

运行：

```bash
npm run start:unsafe
```

### 预期观察

程序会抛出类似错误：

```text
TypeError: request.attempts.toFixed is not a function
```

### 为什么发生

`request.attempts` 的真实值是字符串 `"3"`。

`toFixed` 是数字实例的方法：

```js
(3).toFixed(0)
```

字符串上没有这个方法：

```js
"3".toFixed
// undefined
```

当 JavaScript 尝试调用 `undefined` 时，抛出 `TypeError`。

### 这证明了什么

JavaScript 只知道“当前值在运行时是什么”，不会根据我们的业务意图自动检查：

```text
attempts 必须是 number
```

业务意图只存在于开发者脑中，尚未进入任何机器可检查的契约。

---

## 9. Step 2：建立显式 strict 配置

创建：

```text
tsconfig.json
```

写入：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
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
  "include": ["src/**/*.ts"],
  "exclude": ["dist"]
}
```

本课先只理解四件事：

```text
strict: true
→ 启用严格检查基线

rootDir: "src"
→ 源码从 src 读取

outDir: "dist"
→ 生成文件写入 dist

module / moduleResolution: "NodeNext"
→ 按现代 Node.js ESM 语义检查和输出
```

其他配置在 KP002、08.02 和 08.09 分别深入。

现在仍不能运行 `check`，因为还没有 `.ts` 文件。

---

## 10. Step 3：把业务契约写进 TypeScript

创建：

```text
src/index.ts
```

写入：

```ts
type DeliveryChannel = "email" | "sms";

interface DeliveryRequest {
  recipient: string;
  channel: DeliveryChannel;
  attempts: number;
}

function createDeliverySummary(request: DeliveryRequest): string {
  return `${request.recipient} / ${request.channel} / attempts=${request.attempts.toFixed(0)}`;
}

const request: DeliveryRequest = {
  recipient: "team@example.com",
  channel: "email",
  attempts: 3
};

console.log(createDeliverySummary(request));
```

### 新概念 1：Type Alias

```ts
type DeliveryChannel = "email" | "sms";
```

它描述允许的静态值集合：

```text
"email"
或
"sms"
```

它不会在运行时创建一个名叫 `DeliveryChannel` 的对象。

### 新概念 2：Interface

```ts
interface DeliveryRequest {
  recipient: string;
  channel: DeliveryChannel;
  attempts: number;
}
```

它描述对象必须具备的属性和属性类型。

### 新概念 3：Type Annotation

```ts
request: DeliveryRequest
```

这是参数类型标注。它告诉检查器：

> 所有对 `createDeliverySummary` 的调用，都必须提供一个可赋值给 `DeliveryRequest` 的值。

### 当前第一次类型检查

运行：

```bash
npm run check
```

预期：

```text
命令退出码为 0
没有类型错误
不生成 dist
```

查看目录：

```bash
ls
```

此时不应该因为 `check` 出现 `dist/`。

---

## 11. Step 4：让错误数据在运行前被阻止

暂时把：

```ts
attempts: 3
```

改成：

```ts
attempts: "3"
```

再次运行：

```bash
npm run check
```

预期出现类似诊断：

```text
Type 'string' is not assignable to type 'number'.
```

### 诊断怎么读

```text
实际值类型：string
目标位置要求：number
关系：不能赋值
```

这次程序甚至不需要运行到 `toFixed`。

错误已经在静态检查阶段变成可见证据。

恢复：

```ts
attempts: 3
```

再次执行：

```bash
npm run check
```

必须恢复通过。

---

## 12. Step 5：保存负向类型测试

如果我们只在 README 中说“改成字符串会报错”，未来源码变化后这个结论可能悄悄失效。

创建：

```text
src/expected-errors.ts
```

写入：

```ts
type DeliveryChannel = "email" | "sms";

interface DeliveryRequest {
  recipient: string;
  channel: DeliveryChannel;
  attempts: number;
}

const invalidRequest: DeliveryRequest = {
  recipient: "team@example.com",
  channel: "email",
  // @ts-expect-error -- attempts 必须是 number，不能是 string
  attempts: "3"
};

// @ts-expect-error -- push 不是允许的 DeliveryChannel
const invalidChannel: DeliveryChannel = "push";

void invalidRequest;
void invalidChannel;
```

运行：

```bash
npm run check
```

预期仍然通过。

### 为什么有错误反而通过

`@ts-expect-error` 的语义不是“无视一切”，而是：

> 下一行必须产生一个 TypeScript 错误；如果没有错误，`@ts-expect-error` 本身就要报错。

做一个实验，把：

```ts
attempts: "3"
```

改成：

```ts
attempts: 3
```

再次运行：

```bash
npm run check
```

预期出现：

```text
Unused '@ts-expect-error' directive.
```

这说明负向测试失效被检查器发现了。

恢复字符串 `"3"`。

### 为什么不使用 @ts-ignore

`@ts-ignore` 只负责静默下一行错误。

即使错误后来消失，它也不会主动提醒你，容易留下永久逃逸点。

课程负向测试优先使用：

```ts
@ts-expect-error
```

---

## 13. Step 6：构建并运行安全版本

执行：

```bash
npm run build
```

然后：

```bash
npm start
```

预期输出：

```text
team@example.com / email / attempts=3
```

查看：

```text
dist/index.js
```

你会发现类似：

```js
function createDeliverySummary(request) {
  return `${request.recipient} / ${request.channel} / attempts=${request.attempts.toFixed(0)}`;
}

const request = {
  recipient: "team@example.com",
  channel: "email",
  attempts: 3
};

console.log(createDeliverySummary(request));
export {};
```

找不到：

```text
type DeliveryChannel
interface DeliveryRequest
: DeliveryRequest
: string
```

### 这叫 Type Erasure

TypeScript 的类型语法服务于静态分析。

生成 JavaScript 时，这些类型通常会被移除，因为 JavaScript Runtime 不认识 TypeScript Interface 和 Type Alias。

最终真正执行的是：

```text
dist/index.js
```

不是 `src/index.ts` 中的类型模型。

---

## 14. Step 7：添加自动验收

创建：

```text
verify.mjs
```

写入仓库同目录中的完整内容。

它会验证：

1. `dist/index.js` 可以正常运行。
2. stdout 与预期一致。
3. Emit JavaScript 不包含 Interface 和 Type Alias。
4. Declaration 文件已经生成。

执行：

```bash
npm run verify
```

预期最后看到：

```text
✓ KP001 验证通过：静态类型阻止错误输入，运行时代码中类型已被擦除。
```

---

## 15. 完整运行与验收

从干净状态执行：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

再单独复现故障：

```bash
npm run start:unsafe
```

验收表：

```text
□ unsafe.mjs 在错误数据下抛 TypeError
□ npm run check 通过
□ expected-errors.ts 中错误必须继续存在
□ npm run build 生成 dist
□ npm start 输出正确摘要
□ dist/index.js 不包含 TypeScript 类型语法
□ npm run verify 通过
```

---

## 16. 图解：TypeScript 提前了什么

```text
未经检查的 JavaScript

调用者传入错误值
        ↓
程序继续执行
        ↓
运行到 request.attempts.toFixed
        ↓
TypeError
```

```text
TypeScript

调用者准备错误值
        ↓
检查器比较 string 与 number
        ↓
产生 Diagnostic
        ↓
错误在运行前可见
```

但不要误解为：

```text
通过 TypeScript Check
=
所有 Runtime 数据都正确
```

KP004 会专门破坏这个错误假设。

---

## 17. 理论收束

### TypeScript 是什么

TypeScript 是建立在 JavaScript 之上的语言和工具链。

它允许在 JavaScript 语法中增加类型信息，并使用这些信息完成：

- 静态检查；
- 类型推断；
- 编辑器 Hover；
- 自动补全；
- Rename；
- Go to Definition；
- 重构支持；
- 声明生成。

### TypeScript 不是什么

它不是：

- JVM 一样的新 Runtime；
- 自动验证 API JSON 的工具；
- 自动修复业务逻辑的工具；
- 证明程序绝对正确的形式化系统；
- 用类型代替测试、监控和安全校验的理由。

### 本课最准确的价值描述

```text
把部分值关系和调用契约
从“只存在于开发者脑中”
变成“编译器和编辑器可检查的静态模型”
```

---

## 18. Wrong Way 与排查

### Wrong Way 1：为了让错误消失直接写 any

```ts
function createDeliverySummary(request: any) {
  return request.attempts.toFixed(0);
}
```

这并没有修复输入，只是关闭了检查证据。

### Wrong Way 2：直接强制断言

```ts
const request = {
  attempts: "3"
} as unknown as DeliveryRequest;
```

这相当于告诉检查器“相信我”，并没有把字符串变成数字。

### Wrong Way 3：只看编辑器红线，不运行构建

编辑器使用的 TypeScript 版本、打开的 Project 和 CLI 可能不同。

正式验收至少保留：

```bash
npm run check
npm run build
npm start
```

### Wrong Way 4：认为没有红线就一定安全

外部数据、逻辑错误、竞态、网络失败和权限问题都不会因为 TypeScript 自动消失。

---

## 19. Production Boundary

在生产代码中，TypeScript 最适合提供：

```text
模块内部关系
函数调用契约
状态分支
公共 API
重构安全网
```

以下边界还需要 Runtime 机制：

```text
HTTP Response → Runtime Schema
用户输入 → Validation
权限 → Server-side Authorization
持久化数据 → Migration / Constraint
并发 → Runtime Coordination
性能 → Measurement
可靠性 → Retry / Timeout / Observability
```

一个成熟系统需要：

```text
静态类型
+
运行时验证
+
自动测试
+
监控与故障治理
```

---

## 20. 本课只记住 3 件事

1. TypeScript 把一部分 Runtime 前才能发现的值关系错误提前为静态诊断。
2. Type Alias、Interface 和 Type Annotation 通常不会保留在最终 JavaScript Runtime 中。
3. 类型检查是证据，不是对所有 Runtime 行为的保证。

---

## 21. Challenge

不看最终源码，新增一个字段：

```text
priority："normal" 或 "urgent"
```

要求：

- 正常请求能够生成摘要。
- `"critical"` 必须成为 Expected Error。
- Emit JavaScript 中不能出现 `type Priority`。
- `verify.mjs` 增加对最终输出的断言。

验收命令：

```bash
npm run verify
```

---

## 22. Mastery Check

请独立回答：

1. 为什么 `unsafe.mjs` 能在错误输入下通过“语法检查”？
2. TypeScript 在什么阶段阻止 `"3"` 赋给 `number`？
3. 为什么 Emit 后找不到 Interface？
4. `@ts-expect-error` 与 `@ts-ignore` 的核心差异是什么？
5. 把值写成 `as DeliveryRequest` 是否等于验证？
6. TypeScript 通过后，还需要哪些 Runtime 证据？

能用当前项目的代码和输出解释，而不是只背定义，才算完成本课。

---

## 23. 最终源码与实验说明

仓库中的最终源码处于“正常主线通过、负向错误被 Expected Error 保护”的状态。

故障基线：

```text
unsafe.mjs
```

正常主线：

```text
src/index.ts
```

负向证据：

```text
src/expected-errors.ts
```

完整验收：

```bash
npm run verify
```

参考资料：

- TypeScript Handbook：The Basics
- TypeScript Handbook：Everyday Types
- TypeScript 7.0 官方发布说明
