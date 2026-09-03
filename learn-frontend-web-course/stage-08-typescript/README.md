# Stage 08：TypeScript 从基础到高级类型、Schema、SDK 与类型架构

> 课程状态：建设中  
> 当前批次：14 个 Module Teaching Contract 已建立，08.01 的 KP001～KP006 已完成  
> 技术基线：TypeScript 7.0.2、Node.js 20+、npm 10+  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 08 是整套前端架构师课程中 **TypeScript 的唯一完整 Owner Stage**。

这里不会停留在“给变量加上 `: string`”，而是从 JavaScript 的动态运行模型出发，建立下面这条完整能力链：

```text
理解 TypeScript 为什么存在
→ 能建立 strict 工程
→ 能判断什么时候依赖推断、什么时候显式标注
→ 能使用 Union / Narrowing 建模合法业务状态
→ 能设计可推断、可复用、可维护的 Generic API
→ 能控制 Mapped / Conditional / Recursive Type 的复杂度
→ 能诊断 Module Resolution 与第三方声明问题
→ 能区分编译期类型与运行时不可信数据
→ 能用 Schema、OpenAPI 与 Codegen 管理契约
→ 能发布公共 SDK 并判断类型兼容性
→ 能渐进迁移大型 JavaScript 系统
→ 能治理大型代码库的类型边界、编译性能与演进规则
```

完成本阶段后，学习者不只会“让红线消失”，而是能够解释：

- 编译器为什么得到当前推断结果；
- 一个类型错误是在阻止真实缺陷，还是暴露了建模问题；
- 类型信息在哪里被扩大、丢失、污染或伪造；
- 外部 JSON 为什么不能因为写了 `as User` 就变得可信；
- 公共类型变化为什么可能构成 Breaking Change；
- 高级类型何时提升 API 体验，何时只是在制造不可维护的类型体操；
- 大型代码库如何控制 Type Check、编辑器延迟和跨包依赖。

---

## 2. 前置知识

开始本阶段前，应当已经完成：

- Stage 00：能够使用终端、Node.js、npm、Git、VS Code / IDE 和基础 Debug。
- Stage 05：理解 JavaScript 的值、对象、函数、Class、Module 与异常。
- Stage 06：理解 JavaScript Runtime、异步和内存的基础模型。
- Stage 07：能够编写原生浏览器应用，并理解外部输入和 DOM 边界。

本阶段会继续使用 JavaScript 运行时知识，但不会重复讲 JavaScript 语言本身。

---

## 3. 本阶段的唯一教学边界

### Stage 08 完整拥有

- TypeScript 编译模型、类型擦除、诊断、类型推断与上下文类型。
- Primitive、Object、Array、Tuple、Literal、Optional、Readonly 与 Index Safety。
- Function、Overload、Generic、Constraint、Inference Control 与 Variance。
- Union、Intersection、Control-flow Narrowing、Predicate、Assertion Function 与 Exhaustiveness。
- Interface、Class、Structural Typing、Brand / Opaque Type 与名义化需求。
- `keyof`、`typeof`、Indexed Access、Mapped、Conditional、`infer`、Template Literal 与 Recursive Type。
- ESM / CommonJS 类型互操作、Module Resolution、`.d.ts`、Ambient Declaration 与 Module Augmentation。
- `tsconfig`、Compiler Pipeline、Project Reference、Incremental Build 与 TypeScript 7 并行构建。
- Runtime Schema、Validation、External Data Boundary 与错误建模。
- OpenAPI / GraphQL / Event Contract、Codegen 与兼容治理。
- Library / SDK 的公共类型表面、声明发布、类型测试与 SemVer。
- JavaScript → TypeScript 渐进迁移。
- 大型代码库类型分层、Ownership、性能预算、RFC 与组织级治理。

### 后续 Stage 只做组合应用

- Stage 11 React 只讲 React 特有的 Props、Hook、Event、Ref、Reducer、Server Boundary 等类型。
- Stage 12 Vue 只讲 Vue SFC、Props / Emits、Template、Composable 等框架特有类型。
- Stage 16 深入 Compiler API、AST、Transformer、Bundler 与 Codemod 平台。
- Stage 17 建设完整静态分析、测试和质量工程。
- Stage 27 使用本阶段的类型边界能力完成大型前端架构。
- Stage 28 建设组织级迁移、平台与治理体系。

后续阶段不得再建立平行的“TypeScript 高级篇”“TypeScript 类型体操篇”“TypeScript 原理篇”或“TypeScript 架构篇”补课。

---

## 4. 技术基线与版本策略

### 4.1 主线：TypeScript 7

本课程主线锁定：

```json
{
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

课程显式声明关键 `tsconfig` 选项，不依赖版本默认值。原因是默认值会随大版本演进，而课程必须让学习者知道工程实际采用了什么语义。

TypeScript 7 的主线实验包括：

- 原生 `tsc`；
- LSP 编辑器体验；
- 多线程 Check / Build；
- 新 Watch 基础设施；
- TypeScript 6 → 7 迁移；
- TypeScript 7 新默认值与已移除旧配置；
- CLI 与大型工程性能。

### 4.2 兼容路线：TypeScript 6

TypeScript 7.0 尚未提供稳定的程序化 Compiler API。依赖 Compiler API、Language Service Plugin 或某些嵌入式框架工具链的实验，使用：

```text
TypeScript 7 CLI 主线
+
@typescript/typescript6 兼容路线
```

Stage 08 只建立编译流程、配置与诊断心智模型；完整 AST / Compiler API 开发归属 Stage 16。

### 4.3 Runtime 与包管理

- Node.js：20 LTS 或更高。
- npm：10 或更高。
- 每个 Lesson 独立安装依赖、类型检查、构建、运行和验证。
- 首批课程只有 TypeScript 开发依赖，不引入框架和运行时库。
- Runtime Schema 从手写 Type Guard 开始，再进入 Schema Library 和契约生成。

---

## 5. 学习路线

本阶段共规划 **14 个 Module、161 个 Lesson（包含 Module Project）和 1 个 Stage 综合项目**。

### 第一部分：编译模型与语言建模

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| [08.01 编译模型与类型推断](./08.01-compiler-model-and-inference/) | 10 | TypeScript 如何检查 JavaScript，又如何在运行前提供证据？ |
| [08.02 基础类型与数据建模](./08.02-basic-types-and-modeling/) | 12 | 如何准确表示值、缺失、可变性、索引和配置对象？ |
| [08.03 Function、Overload 与 Generic](./08.03-function-overload-and-generics/) | 13 | 如何设计可推断、可复用而不过度抽象的函数 API？ |
| [08.04 Union、Intersection 与 Narrowing](./08.04-union-intersection-and-narrowing/) | 11 | 如何让非法业务状态无法表示，并在控制流中安全缩小类型？ |
| [08.05 Interface、Class 与 Structural Typing](./08.05-interface-class-and-structural-typing/) | 12 | 结构兼容如何工作，什么时候需要名义化约束？ |

### 第二部分：类型派生与高级类型

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| [08.06 keyof、typeof 与 Mapped Type](./08.06-keyof-typeof-and-mapped-types/) | 10 | 如何从单一事实来源派生类型，避免重复和漂移？ |
| [08.07 Conditional、infer 与 Recursive Type](./08.07-conditional-infer-and-recursive-types/) | 13 | 如何表达类型关系，同时控制可读性、错误信息和编译成本？ |

### 第三部分：模块、编译器与运行时边界

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| [08.08 Module 与 Declaration](./08.08-modules-and-declarations/) | 12 | Runtime 文件、模块解析和声明文件如何保持一致？ |
| [08.09 tsconfig 与 Compiler Pipeline](./08.09-tsconfig-and-compiler-pipeline/) | 14 | 如何配置、诊断和扩展大型 TypeScript 构建？ |
| [08.10 Runtime Schema 与 Validation](./08.10-runtime-schema-and-validation/) | 11 | 如何让不可信运行时数据经过验证后进入领域模型？ |

### 第四部分：契约、SDK、迁移与治理

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| [08.11 API Contract 与 Codegen](./08.11-api-contract-and-codegen/) | 11 | 如何让前后端和事件契约可生成、可验证、可兼容演进？ |
| [08.12 Library 与 SDK 设计](./08.12-library-and-sdk-design/) | 12 | 如何设计稳定、好推断、可发布、可测试的公共类型 API？ |
| [08.13 JavaScript → TypeScript 迁移](./08.13-javascript-to-typescript-migration/) | 10 | 如何在不中断交付的前提下渐进消除类型风险？ |
| [08.14 类型架构与组织治理](./08.14-type-architecture-and-governance/) | 10 | 如何治理大型代码库的类型边界、性能、兼容和演进？ |

合计：

```text
10 + 12 + 13 + 11 + 12 + 10 + 13 + 12 + 14 + 11 + 11 + 12 + 10 + 10
= 161
```

---

## 6. 当前建设进度

| Module | 状态 | 已完成 |
| --- | --- | --- |
| [08.01 编译模型与类型推断](./08.01-compiler-model-and-inference/) | 🚧 建设中 | KP001～KP006 / 10 |
| [08.02 基础类型与数据建模](./08.02-basic-types-and-modeling/) | 📋 Teaching Contract 已建立 | 0 / 12 |
| [08.03 Function、Overload 与 Generic](./08.03-function-overload-and-generics/) | 📋 Teaching Contract 已建立 | 0 / 13 |
| [08.04 Union、Intersection 与 Narrowing](./08.04-union-intersection-and-narrowing/) | 📋 Teaching Contract 已建立 | 0 / 11 |
| [08.05 Interface、Class 与 Structural Typing](./08.05-interface-class-and-structural-typing/) | 📋 Teaching Contract 已建立 | 0 / 12 |
| [08.06 keyof、typeof 与 Mapped Type](./08.06-keyof-typeof-and-mapped-types/) | 📋 Teaching Contract 已建立 | 0 / 10 |
| [08.07 Conditional、infer 与 Recursive Type](./08.07-conditional-infer-and-recursive-types/) | 📋 Teaching Contract 已建立 | 0 / 13 |
| [08.08 Module 与 Declaration](./08.08-modules-and-declarations/) | 📋 Teaching Contract 已建立 | 0 / 12 |
| [08.09 tsconfig 与 Compiler Pipeline](./08.09-tsconfig-and-compiler-pipeline/) | 📋 Teaching Contract 已建立 | 0 / 14 |
| [08.10 Runtime Schema 与 Validation](./08.10-runtime-schema-and-validation/) | 📋 Teaching Contract 已建立 | 0 / 11 |
| [08.11 API Contract 与 Codegen](./08.11-api-contract-and-codegen/) | 📋 Teaching Contract 已建立 | 0 / 11 |
| [08.12 Library 与 SDK 设计](./08.12-library-and-sdk-design/) | 📋 Teaching Contract 已建立 | 0 / 12 |
| [08.13 JavaScript → TypeScript 迁移](./08.13-javascript-to-typescript-migration/) | 📋 Teaching Contract 已建立 | 0 / 10 |
| [08.14 类型架构与组织治理](./08.14-type-architecture-and-governance/) | 📋 Teaching Contract 已建立 | 0 / 10 |
| [Stage Project：Typed API SDK](./project-typed-api-sdk/) | 📋 项目合同已建立 | 0 / 14 Milestones |

当前 08.01 已完成：

1. [KP001：TypeScript 到底解决了 JavaScript 的什么问题](./08.01-compiler-model-and-inference/kp001-why-typescript/)
2. [KP002：从零建立第一个 strict TypeScript 项目](./08.01-compiler-model-and-inference/kp002-first-strict-project/)
3. [KP003：源文件如何经过 Parse、Check 与 Emit](./08.01-compiler-model-and-inference/kp003-compiler-pipeline/)
4. [KP004：编译期类型安全为什么不等于运行时安全](./08.01-compiler-model-and-inference/kp004-compile-time-vs-runtime/)
5. [KP005：什么时候显式标注，什么时候依赖推断](./08.01-compiler-model-and-inference/kp005-annotations-vs-inference/)
6. [KP006：Literal Widening 为什么会丢失精确信息](./08.01-compiler-model-and-inference/kp006-literal-widening/)

---

## 7. TypeScript 课程的统一实践方式

### 7.1 每课必须保留的证据

```text
编译器诊断码
Hover / Go to Definition / Rename 等 LSP 证据
tsc --noEmit 结果
Emit 后 JavaScript
Declaration 文件
Source Map
Runtime stdout / stderr
Expected Type Error
Module Resolution Trace
Build / Check 时间
类型测试
Runtime Validation Error Path
API Compatibility Diff
ADR / RFC / Type Policy
```

不同课程按主问题选择最小充分证据，不为“显得高级”堆叠工具。

### 7.2 统一命令

进入任意已完成 Lesson：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

其中：

- `check`：只进行类型检查，不生成文件。
- `build`：生成可运行 JavaScript，以及当前课程需要的声明和 Source Map。
- `start`：运行构建结果。
- `verify`：执行类型检查、构建、运行和课程专属断言。
- `clean`：删除生成目录。

### 7.3 正向与负向类型测试

正常代码必须通过：

```text
npm run check
```

故意演示错误的代码必须使用可验证形式：

```ts
// @ts-expect-error -- 当前行必须产生预期类型错误
```

这样可以同时验证：

1. 当前错误确实存在；
2. 将来如果代码变化导致错误消失，编译器会反过来报告“预期错误没有发生”。

禁止用无边界的 `@ts-ignore` 把课程核心错误静默掉。

### 7.4 运行时边界

每当数据来自以下位置，课程都必须问一次“它是否可信”：

```text
JSON.parse
fetch Response
localStorage
URL / FormData
postMessage
WebSocket / SSE
环境变量
第三方 SDK 回调
用户导入文件
数据库 / BFF 返回
```

TypeScript 类型不会自动验证这些值。后续课程统一使用：

```text
unknown
→ Parse / Validate
→ Validated DTO
→ Adapter
→ Domain Model
```

### 7.5 当前 CI 验证

仓库提供：

```text
.github/workflows/stage-08-typescript.yml
```

工作流对 KP001～KP006 建立独立 Matrix Job，在 Node.js 22 环境中逐课执行：

```bash
npm install --no-audit --no-fund
npm run verify
```

因此课程同时保留：

```text
本地可复刻验证
+
Pull Request / main 分支上的固定 TypeScript 7.0.2 CI 验证
```

后续新增 Lesson 时，必须同步加入 CI Matrix，不能只创建 README 和源码而没有可运行回归。

---

## 8. Stage 综合项目

项目名称：

```text
Typed API SDK
```

同时作为贯穿项目：

```text
Architect Workbench Typed Data Layer v1
```

项目合同详见：[project-typed-api-sdk/README.md](./project-typed-api-sdk/README.md)。

### 项目核心链路

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

### 必须注入的故障

```text
缺失字段
多余字段
错误字段类型
nullability 变化
旧版响应
不一致错误结构
未知事件
错误 package exports
Runtime 文件和 .d.ts 漂移
any 污染
不安全断言
Mega Union
Deep Recursive Utility
跨包循环类型依赖
Type Check 性能回退
```

### 强制非功能约束

- `strict` 全开并显式配置。
- 外部数据入口使用 `unknown`。
- Generated Type 与 Handwritten Domain Type 分离。
- 对外 API 有正向和负向类型测试。
- 声明文件可被独立 Consumer 验证。
- 提供 TypeScript 6 / 7 兼容说明。
- 提供冷构建、增量构建和编辑器延迟基线。
- 提交 API Compatibility Report、Type Architecture ADR 与 Migration Plan。

---

## 9. Stage Definition of Done

完成 Stage 08 时，学习者必须能够：

- 准确解释类型擦除、推断、上下文类型、可赋值性与控制流分析。
- 使用联合类型和穷尽检查建模合法业务状态。
- 设计可读、可推断、可维护的 Generic API。
- 使用高级类型解决真实问题，同时控制错误信息和编译成本。
- 诊断 ESM、CommonJS、`.d.ts`、`exports` 和 Module Resolution 故障。
- 为无类型或错误类型的第三方库补齐并测试声明。
- 设计 Browser、Node、Library、Test 多套 `tsconfig`。
- 使用 Project Reference 和 TypeScript 7 并行能力管理大型构建。
- 明确区分静态类型安全与运行时数据安全。
- 使用 Runtime Schema 隔离不可信数据。
- 从 API Contract 生成并治理客户端代码。
- 发布类型稳定、可兼容演进的公共 SDK。
- 分阶段迁移大型 JavaScript 项目。
- 诊断 `any` 扩散、断言滥用和复杂类型导致的性能问题。
- 设计 Domain、DTO、Schema、ViewModel 与 Public API 的边界。
- 制定团队级 Type Policy、Compatibility Policy 与 Type Complexity Budget。
- 完成 Typed API SDK 的故障、性能、兼容和架构答辩。

---

## 10. 目录约定

```text
stage-08-typescript/
├── README.md
├── 08.01-compiler-model-and-inference/
│   ├── README.md
│   ├── kp001-why-typescript/
│   ├── kp002-first-strict-project/
│   ├── kp003-compiler-pipeline/
│   ├── kp004-compile-time-vs-runtime/
│   ├── kp005-annotations-vs-inference/
│   └── kp006-literal-widening/
├── 08.02-basic-types-and-modeling/
│   └── README.md
├── ...
├── 08.14-type-architecture-and-governance/
│   └── README.md
└── project-typed-api-sdk/
    └── README.md
```

每个 Lesson README 是从零复刻教程；同目录源码是最终结果、Expected Error、运行证据和自动验证。未开始制作的 Lesson 不预建空目录，避免用目录数量代替课程质量。
