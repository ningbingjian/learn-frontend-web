# Module 08.01：TypeScript 编译模型与类型推断

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：建设中  
> 当前完成：KP001～KP006 / 10 课  
> 技术基线：TypeScript 7.0.2、Node.js 20+

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> TypeScript 如何在不改变 JavaScript 运行时本质的前提下，通过解析、类型推断、静态检查、诊断与编辑器服务，帮助我们在运行前发现错误？

这个主题是后续所有高级类型、Schema、SDK 与类型架构的根。学习者必须先知道“类型信息在哪里、何时存在、谁在使用、运行时还剩下什么”，才能正确理解后面的类型语法。

### 1.2 为什么必须现在学习

如果一开始只背：

```ts
const name: string = "Ada";
```

学习者很容易形成四个错误心智模型：

1. 认为 TypeScript 类型会跟着 JavaScript 一起运行。
2. 认为写了类型断言就验证了数据。
3. 认为类型写得越多越安全。
4. 认为编辑器没有红线就代表生产运行一定安全。

因此本 Module 先用可运行实验建立：

```text
JavaScript Runtime
≠
TypeScript Static Model
```

后续每一个 TypeScript 主题都要回到这个关系。

### 1.3 与其他 Module 的边界

本 Module 完整拥有：

- TypeScript 与 JavaScript 的职责关系。
- `.ts` 源文件到 `.js`、`.d.ts` 与 Source Map 的基本流程。
- Parse、Bind、Check、Emit 的课程级心智模型。
- Type Annotation 与 Type Inference 的基本选择。
- Literal Widening 与信息丢失。
- Contextual Typing。
- Assignability、Compatibility 与类型“相等”的区别。
- Assertion、Non-null Assertion 和双重断言的风险。
- Compiler Diagnostic、编辑器 LSP 与基础排障。

本 Module 不展开：

- Primitive、Object、Tuple、Optional 等完整数据建模：由 08.02 教学。
- Generic、Overload 与 Variance：由 08.03 教学。
- Control-flow Narrowing 完整体系：由 08.04 教学。
- 高级 Mapped / Conditional Type：由 08.06～08.07 教学。
- 完整 `tsconfig` 与大型构建：由 08.09 教学。
- Runtime Schema：由 08.10 教学。
- Compiler API 与 AST 编程：由 Stage 16 教学。

### 1.4 Must / Should / Expert

**Must**

- 能解释 TypeScript 为什么不能替代运行时验证。
- 能从零建立一个 `strict` 项目。
- 能执行 Check、Build 与 Runtime。
- 能判断普通局部变量是否需要显式类型标注。
- 能解释最常见的字面量扩大现象。
- 能读懂一条基础编译器诊断。

**Should**

- 能通过 `.js`、`.d.ts` 和 Source Map 解释 Emit 结果。
- 能识别类型信息在变量、对象、函数和边界上何时丢失。
- 能使用 Expected Error 建立负向类型测试。
- 能区分推断失败、声明错误、模块错误和运行时错误。
- 能诊断不安全断言制造的“假安全”。

**Expert**

- 能解释 Parse、Bind、Check、Emit、Language Service 与 LSP 的职责边界。
- 能从 API 体验、错误可读性和维护成本判断“显式标注还是依赖推断”。
- 能设计团队的 Annotation Policy、Assertion Budget 与 Type Error Triage 流程。
- 能说明 TypeScript 7 原生工具链与 TypeScript 6 程序化 API 兼容路线。

### 1.5 如何保证一次学透

本 Module 不把“编译原理”“类型推断高级篇”和“错误诊断篇”留到未来补课。十课按下面的因果链完成闭环：

```text
先看 JavaScript 缺陷
→ 建立 strict 工程
→ 观察 Check / Emit / Runtime
→ 证明编译期与运行时边界
→ 学会标注与推断取舍
→ 观察 Literal Widening
→ 观察 Contextual Typing
→ 理解 Assignability
→ 破坏断言并诊断
→ 完成 Type Error Observatory
```

后续 Module 只引用这套基础模型。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [TypeScript 到底解决了 JavaScript 的什么问题](./kp001-why-typescript/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP002 | [从零建立第一个 strict TypeScript 项目](./kp002-first-strict-project/) | Must | BUILD-LAB | ✅ |
| KP003 | [源文件如何经过 Parse、Check 与 Emit](./kp003-compiler-pipeline/) | Must / Should | COMPILER-MECHANISM-LAB | ✅ |
| KP004 | [编译期类型安全为什么不等于运行时安全](./kp004-compile-time-vs-runtime/) | Must / Should | FAILURE + SECURITY-LAB | ✅ |
| KP005 | [什么时候显式标注，什么时候依赖推断](./kp005-annotations-vs-inference/) | Must / Should | BUILD-LAB | ✅ |
| KP006 | [Literal Widening 为什么会丢失精确信息](./kp006-literal-widening/) | Must / Should | TYPE-MECHANISM-LAB | ✅ |
| KP007 | Contextual Typing 如何从使用位置反向推断 | Must / Should | BUILD-LAB | ⏳ |
| KP008 | Assignability、Compatibility 与类型相等 | Should | FAILURE-LAB | ⏳ |
| KP009 | `as`、非空断言与双重断言如何制造假安全 | Should / Expert | FAILURE-LAB | ⏳ |
| KP010 | Module Project：Type Error Observatory 与诊断工作流 | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP001～KP006 全部从新的最小项目开始，不依赖上一课目录：

```text
KP001：零状态，比较未经检查的 JavaScript 与受检查的 TypeScript
KP002：零状态，从 package.json 和 tsconfig.json 建立 strict 项目
KP003：零状态，专门观察 .ts → .js / .d.ts / .map
KP004：零状态，模拟不可信 JSON 进入系统
KP005：零状态，建立局部推断与公共边界对照
KP006：零状态，建立相同运行时值与不同静态类型对照
```

这样设计是为了让每课只改变一个主要变量，并让学习者可以单独复现结论。

KP007～KP010 如果采用复制演进，README 必须写明来源、复制命令、基线运行、修改文件和独立最终源码。

---

## 4. 统一运行方式

进入任意已完成 Lesson：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

首批项目不依赖框架。`typescript` 是唯一开发依赖。

项目中的：

- `src/index.ts`：本课正常主线。
- `src/expected-errors.ts` 或 `src/type-probes.ts`：负向或精确推断证据。
- `unsafe.mjs` / `src/unsafe.ts`：故意制造的错误基线。
- `verify.mjs`：课程自动验收辅助代码。
- `dist/`：构建生成，不提交仓库。

---

## 5. 证据设计

本 Module 使用以下证据：

- `tsc --noEmit`：证明静态检查是否通过。
- Compiler Diagnostic：记录错误位置、消息和错误类别。
- Hover / Go to Definition：观察推断类型和符号关系。
- `dist/*.js`：证明 TypeScript 类型被擦除。
- `dist/*.d.ts`：证明对外类型表面被保留为声明。
- `dist/*.map`：证明生成代码可以映射回源文件。
- Runtime stdout / stderr：证明通过编译的代码仍可能在运行时失败。
- `@ts-expect-error`：证明指定错误必须存在。
- Type Probe：证明一个值被推断为 Literal、Union 还是宽泛类型。
- 自动验证脚本：保证课程结论和最终源码同步。

---

## 6. Failure Lab 分布

- JavaScript 接收错误字段类型，直到运行时才抛错。
- `strict` 配置缺失，让隐式 `any` 和空值风险进入项目。
- 误以为 Emit 后还存在 Interface 和 Type Alias。
- 对 `JSON.parse` 结果直接写 `as User`，运行时仍然崩溃。
- 给所有局部变量写宽泛标注，主动丢失推断信息。
- 对象属性因为可变性发生 Literal Widening。
- Contextual Typing 因脱离使用位置而丢失。
- 用结构“看起来一样”误判类型兼容。
- 用 `as unknown as T` 绕过所有真实证据。
- 大量编译错误同时出现时从最后一条开始乱修，导致诊断失焦。

---

## 7. Debug 与诊断流程

统一采用：

```text
先分类
→ 语法 / 类型 / 模块 / 配置 / Runtime

再缩小
→ 找到第一条根错误，而不是只看后续连锁错误

再取证
→ Hover、Diagnostic、Emit、Runtime、Trace

再建立最小复现
→ 删除与主问题无关的代码

再修复模型
→ 优先修正数据边界和类型声明，而不是增加断言

最后回归
→ 正向 Check + Expected Error + Runtime Verify
```

---

## 8. 性能、源码与兼容边界

### 性能

本 Module 只建立“Check、Emit、Language Service 是不同工作”的基础，不做大型性能调优。完整性能实验归属 08.09 和 08.14。

### 源码

本 Module 使用课程级 Compiler Pipeline 模型，不进入 TypeScript 源码逐行分析。Stage 16 再通过固定版本和断点进入 Parser、Checker、Emitter 或新 API。

### TypeScript 6 / 7

- CLI 主线使用 TypeScript 7。
- 需要稳定程序化 Compiler API 的工具暂时走 TypeScript 6 兼容路线。
- 课程源码避免无意依赖旧版已移除配置。
- `tsconfig` 显式写出关键语义，便于跨版本比较。

---

## 9. Module Project

项目名称：

```text
Type Error Observatory
```

项目必须提供一个可切换实验台，至少观察：

1. 同一段 JavaScript 在无检查、宽松检查和 strict 下的差异。
2. Annotation、Inference、Contextual Typing 和 Widening。
3. `.ts`、`.js`、`.d.ts` 与 Source Map 的对应关系。
4. `any`、`unknown` 和 Assertion 对错误传播的影响。
5. 一条根错误如何制造多条连锁诊断。
6. 编辑器 LSP 与 CLI 诊断是否一致。
7. TypeScript 6 与 7 的兼容差异和执行时间。
8. Expected Error 如何防止负向测试失效。

学习者提交：

- 实验矩阵；
- 诊断分类；
- 关键 Hover 截图或记录；
- Emit 对照；
- Runtime 对照；
- 根因分析；
- Annotation Policy；
- Assertion Budget；
- Type Error Triage Runbook。

---

## 10. 后续课程如何引用本 Module

后续课程可以直接使用下面的结论，不再重复教学：

```text
类型只在静态分析阶段提供证据
局部优先利用推断
公共边界按需要显式声明
外部输入先视为 unknown
断言不是验证
运行时正确性必须有运行时证据
```

后续涉及高级类型时，只需要说明“当前变换如何影响推断、诊断和 API 体验”。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须能够：

- 画出 `.ts → Parse → Bind → Check → Emit → .js` 的课程级流程图。
- 说明 TypeScript 与 JavaScript Runtime 的职责边界。
- 从空目录建立 strict 项目并解释关键配置。
- 分别执行 Check、Build 和 Runtime。
- 从 Emit 产物证明 Type Alias / Interface 已被擦除。
- 对不可信 JSON 使用 `unknown` 和最小 Type Guard。
- 判断局部变量、函数边界和公共 API 的标注策略。
- 准确解释 Literal Widening 的原因和修复方式。
- 使用 Expected Error 和 Type Probe 保存静态证据。
- 识别不安全 Assertion 并给出替代方案。
- 按诊断工作流定位第一条根错误。
- 完成 Type Error Observatory 的实现、实验和答辩。
