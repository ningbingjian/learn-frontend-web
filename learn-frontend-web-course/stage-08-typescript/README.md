# Stage 08：TypeScript 从基础到高级类型、Schema、SDK 与类型架构

> 课程状态：建设中  
> 当前进度：KP001～KP018 已完成，共 18 / 161 课  
> 当前 Module：08.02 基础类型与数据建模，已完成 8 / 12 课  
> 下一批：KP019～KP021  
> 技术基线：TypeScript 7.0.2、Node.js 20+、npm 10+  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 08 是整套前端架构师课程中 TypeScript 的唯一完整 Owner Stage。课程不止讲类型标注，而是形成下面的完整能力链：

```text
理解 TypeScript 编译模型
→ 建立 strict 工程
→ 掌握推断、上下文类型与可赋值性
→ 精确建模值、缺失、可变性、集合与位置协议
→ 从 Runtime 常量派生 Static Literal Union
→ 设计 Generic 与高级类型 API
→ 诊断模块、声明和 tsconfig
→ 用 Runtime Schema 隔离不可信数据
→ 用 OpenAPI / GraphQL / Event Contract 管理契约
→ 发布稳定公共 SDK
→ 迁移大型 JavaScript 项目
→ 治理大型代码库的类型边界与编译性能
```

完成本阶段后，学习者必须能解释：类型信息从哪里来、在哪里丢失、何时被扩大或伪造、为什么通过 Check 仍可能 Runtime 失败，以及公共类型变化如何构成 Breaking Change。

---

## 2. 前置知识

开始本阶段前，应完成或具备：

- Stage 00：终端、Node.js、npm、Git 与 IDE 基础。
- Stage 05：JavaScript 值、对象、函数、Class、Module 与异常。
- Stage 06：Runtime、异步和内存基础。
- Stage 07：浏览器边界、DOM 与外部输入基础。

本阶段会引用 JavaScript 运行模型，但不会重复讲 JavaScript 语言本身。

---

## 3. 教学边界

### Stage 08 完整拥有

- 编译模型、类型擦除、诊断、Inference、Contextual Typing 与 Assignability。
- Primitive、Object、Array、Tuple、Literal、Optional、Readonly 与 Index Safety。
- Shared Reference、Collection Ownership、Snapshot 与 Static / Runtime Immutability 边界。
- Function、Overload、Generic、Constraint、Inference Control 与 Variance。
- Union、Intersection、Control-flow Narrowing、Predicate、Assertion Function 与 Exhaustiveness。
- Interface、Class、Structural Typing、Brand / Opaque Type 与名义化需求。
- `keyof`、`typeof`、Indexed Access、Mapped、Conditional、`infer`、Template Literal 与 Recursive Type。
- ESM / CommonJS 类型互操作、Module Resolution、`.d.ts`、Ambient Declaration 与 Augmentation。
- `tsconfig`、Compiler Pipeline、Project Reference、Incremental Build 与并行构建。
- Runtime Schema、Validation、External Data Boundary 与错误建模。
- API Contract、Codegen、Library / SDK、SemVer、渐进迁移和组织治理。

### 后续 Stage 只做框架或平台组合

- React Stage 只讲 React 特有类型。
- Vue Stage 只讲 Vue SFC、Props、Emits、Template 和 Composable 类型。
- Stage 16 深入 Compiler API、AST、Transformer、Bundler 与 Codemod。
- Stage 17 建设完整测试与静态分析平台。
- Stage 27～28 做大型架构和组织治理组合应用。

后续不得再建立平行的“TypeScript 高级篇”或“TypeScript 原理篇”补课。

---

## 4. 技术基线与版本策略

主线固定：

```json
{
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

课程显式声明关键 `tsconfig`，不依赖大版本默认值。CLI、Check、Build 与 LSP 主线使用 TypeScript 7；需要稳定程序化 Compiler API 的实验采用 TypeScript 6 兼容路线，并归入 08.09 或 Stage 16。

每课必须在独立目录运行：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

---

## 5. 完整学习路线

本阶段共规划 14 个 Module、161 个 Lesson（含 Module Project）和 1 个 Stage 综合项目。

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| [08.01 编译模型与类型推断](./08.01-compiler-model-and-inference/) | 10 | TypeScript 如何检查 JavaScript，并在运行前提供证据？ |
| [08.02 基础类型与数据建模](./08.02-basic-types-and-modeling/) | 12 | 如何准确表示值、缺失、可变性、集合、位置和配置对象？ |
| [08.03 Function、Overload 与 Generic](./08.03-function-overload-and-generics/) | 13 | 如何设计可推断、可复用而不过度抽象的函数 API？ |
| [08.04 Union、Intersection 与 Narrowing](./08.04-union-intersection-and-narrowing/) | 11 | 如何让非法业务状态无法表示？ |
| [08.05 Interface、Class 与 Structural Typing](./08.05-interface-class-and-structural-typing/) | 12 | 结构兼容如何工作，什么时候需要名义化约束？ |
| [08.06 keyof、typeof 与 Mapped Type](./08.06-keyof-typeof-and-mapped-types/) | 10 | 如何从单一事实来源派生类型？ |
| [08.07 Conditional、infer 与 Recursive Type](./08.07-conditional-infer-and-recursive-types/) | 13 | 如何表达复杂类型关系并控制成本？ |
| [08.08 Module 与 Declaration](./08.08-modules-and-declarations/) | 12 | Runtime 文件、模块解析和声明如何保持一致？ |
| [08.09 tsconfig 与 Compiler Pipeline](./08.09-tsconfig-and-compiler-pipeline/) | 14 | 如何配置、诊断和扩展大型构建？ |
| [08.10 Runtime Schema 与 Validation](./08.10-runtime-schema-and-validation/) | 11 | 如何验证不可信 Runtime 数据？ |
| [08.11 API Contract 与 Codegen](./08.11-api-contract-and-codegen/) | 11 | 如何生成、验证和兼容演进契约？ |
| [08.12 Library 与 SDK 设计](./08.12-library-and-sdk-design/) | 12 | 如何发布稳定、好推断的公共 API？ |
| [08.13 JavaScript → TypeScript 迁移](./08.13-javascript-to-typescript-migration/) | 10 | 如何不中断交付地渐进消除风险？ |
| [08.14 类型架构与组织治理](./08.14-type-architecture-and-governance/) | 10 | 如何治理边界、性能、兼容和演进？ |

```text
10 + 12 + 13 + 11 + 12 + 10 + 13 + 12 + 14 + 11 + 11 + 12 + 10 + 10 = 161
```

---

## 6. 当前建设进度

| Module | 状态 | 已完成 |
| --- | --- | ---: |
| [08.01 编译模型与类型推断](./08.01-compiler-model-and-inference/) | ✅ 完成 | 10 / 10 |
| [08.02 基础类型与数据建模](./08.02-basic-types-and-modeling/) | 🚧 建设中 | 8 / 12 |
| 08.03～08.14 | 📋 Teaching Contract 已建立 | 0 |
| [Stage Project：Typed API SDK](./project-typed-api-sdk/) | 📋 项目合同已建立 | 0 / 14 Milestones |

当前阶段完成度：

```text
18 / 161 ≈ 11.2%
```

### 已完成：Module 08.01

1. [KP001：TypeScript 到底解决了 JavaScript 的什么问题](./08.01-compiler-model-and-inference/kp001-why-typescript/)
2. [KP002：从零建立第一个 strict TypeScript 项目](./08.01-compiler-model-and-inference/kp002-first-strict-project/)
3. [KP003：源文件如何经过 Parse、Check 与 Emit](./08.01-compiler-model-and-inference/kp003-compiler-pipeline/)
4. [KP004：编译期类型安全为什么不等于运行时安全](./08.01-compiler-model-and-inference/kp004-compile-time-vs-runtime/)
5. [KP005：什么时候显式标注，什么时候依赖推断](./08.01-compiler-model-and-inference/kp005-annotations-vs-inference/)
6. [KP006：Literal Widening 为什么会丢失精确信息](./08.01-compiler-model-and-inference/kp006-literal-widening/)
7. [KP007：Contextual Typing 如何从使用位置反向推断](./08.01-compiler-model-and-inference/kp007-contextual-typing/)
8. [KP008：Assignability、Compatibility 与类型相等](./08.01-compiler-model-and-inference/kp008-assignability-and-compatibility/)
9. [KP009：as、非空断言与双重断言如何制造假安全](./08.01-compiler-model-and-inference/kp009-unsafe-assertions/)
10. [KP010：Module Project——Type Error Observatory](./08.01-compiler-model-and-inference/kp010-type-error-observatory/)

### 已完成：Module 08.02 前八课

11. [KP011：Primitive、Wrapper、bigint 与 unique symbol](./08.02-basic-types-and-modeling/kp011-primitives-wrappers-bigint-symbol/)
12. [KP012：null、undefined 与 strictNullChecks](./08.02-basic-types-and-modeling/kp012-null-undefined-strict-null-checks/)
13. [KP013：any、unknown、never 与 void](./08.02-basic-types-and-modeling/kp013-any-unknown-never-void/)
14. [KP014：object、Object、{} 与 unknown](./08.02-basic-types-and-modeling/kp014-object-object-braces-unknown/)
15. [KP015：Optional、Readonly 与 exactOptionalPropertyTypes](./08.02-basic-types-and-modeling/kp015-optional-readonly-exact-optional/)
16. [KP016：Array、ReadonlyArray、共享引用与可变性风险](./08.02-basic-types-and-modeling/kp016-array-readonlyarray-shared-mutation/)
17. [KP017：Tuple、Named Tuple、Optional 与 Rest Element](./08.02-basic-types-and-modeling/kp017-tuple-named-optional-rest/)
18. [KP018：Literal Union、常量派生与 as const](./08.02-basic-types-and-modeling/kp018-literal-union-as-const/)

下一批从 KP019 开始：enum / const enum / Object Constant 选型、Index Safety、Excess Property 与 `satisfies`。

---

## 7. 本批新增能力

### KP016：Collection Mutability

```text
T[]
→ 可变集合

readonly T[]
→ 当前访问路径不能修改容器

readonly ReadonlyElement[]
→ 容器与元素静态只读

Defensive Copy
→ 独立 Snapshot
```

课程通过 Shared Alias Mutation 证明 readonly view 不等于 snapshot，也不等于 Runtime Freeze。

### KP017：Positional Contract

```text
Array
→ 同类元素集合

Tuple
→ 长度和位置都是协议

Named Tuple
→ 改善静态可读性

Optional / Rest Element
→ 末尾可省略 / 固定前缀加可变尾部
```

课程通过 `.d.ts` 和 Runtime `Array.isArray()` 同时证明静态协议与运行本质。

### KP018：Single Source of Truth

```text
Runtime Constant
→ typeof / keyof / Indexed Access
→ Literal Union
→ Runtime Guard
```

课程同时证明普通对象属性会 Widen，`as const` 不会 Runtime Freeze，也不会取得共享引用的独占所有权。

---

## 8. 统一证据模型

每课根据主问题保存最小充分证据：

```text
tsc --noEmit
Compiler Diagnostic
Hover / Go to Definition
@ts-expect-error
Declaration Emit
Source Map
Runtime stdout / stderr
Shared Reference Failure
Snapshot Comparison
Module Resolution Trace
Benchmark
Consumer Fixture
Compatibility Diff
ADR / RFC / Type Policy
```

### 正向与负向回归

正常实现必须通过 `npm run check`。故意错误使用：

```ts
// @ts-expect-error -- 说明该错误为什么必须存在
```

禁止用无边界 `@ts-ignore` 把课程结论静默掉。

### 外部数据边界

所有来自 JSON、fetch、Storage、URL、postMessage、WebSocket、环境变量或第三方 SDK 的输入，统一采用：

```text
unknown
→ Parse / Validate
→ Validated DTO
→ Adapter
→ Domain Model
```

类型断言、Literal Union 和 `as const` 都不是 Runtime Validation。

---

## 9. CI 验证

仓库工作流：

```text
.github/workflows/stage-08-typescript.yml
```

当前对 KP001～KP018 建立 18 个独立 Matrix Job，在 Node.js 22 中逐课执行：

```bash
npm install --no-audit --no-fund
npm run verify
```

新增 Lesson 必须同步加入 Matrix，不能只提交 README 或无法运行的片段。

---

## 10. Stage 综合项目

项目：[Typed API SDK](./project-typed-api-sdk/README.md)

核心链路：

```text
OpenAPI / Event Contract
→ Generated DTO
→ Runtime Schema
→ Transport Client
→ Error Mapping
→ Domain Adapter
→ Public SDK
→ JavaScript Legacy Consumer
```

项目必须注入缺失字段、错误字段类型、nullability 变化、旧版响应、错误 package exports、声明漂移、any 污染、断言滥用、共享引用、复杂类型性能回退和跨包循环依赖。

---

## 11. Stage Definition of Done

完成 Stage 08 时，学习者必须能够：

- 解释类型擦除、Inference、Contextual Typing、Assignability 与 Narrowing。
- 精确建模 Primitive、Nullability、Optional、Array、Tuple 和 Literal Union。
- 区分 Static Readonly、Shared View、Snapshot 与 Runtime Freeze。
- 使用 Union 与 Exhaustiveness 建模合法状态。
- 设计可读、可推断、可维护的 Generic 和高级类型 API。
- 诊断 ESM、CommonJS、`.d.ts`、`exports` 与 Module Resolution。
- 设计多套 tsconfig、Project Reference 和大型构建。
- 使用 Runtime Schema 隔离不可信数据。
- 从契约生成并治理客户端，发布兼容演进的 SDK。
- 渐进迁移 JavaScript，并治理 any、Assertion 和 Type Complexity Budget。
- 完成 Typed API SDK 的故障、性能、兼容和架构答辩。

---

## 12. 当前目录

```text
stage-08-typescript/
├── README.md
├── 08.01-compiler-model-and-inference/
│   ├── README.md
│   └── kp001 ... kp010
├── 08.02-basic-types-and-modeling/
│   ├── README.md
│   └── kp011 ... kp018
├── 08.03 ... 08.14/
│   └── README.md
└── project-typed-api-sdk/
    └── README.md
```

未开始制作的 Lesson 不预建空目录，避免用目录数量代替课程质量。
