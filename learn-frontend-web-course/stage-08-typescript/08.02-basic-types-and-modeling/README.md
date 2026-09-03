# Module 08.02：基础类型、Object、Array、Tuple 与 Literal 建模

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：12  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何使用 TypeScript 精确表示 JavaScript 值、对象形状、缺失状态、可变性和安全索引，而不让 `any`、宽泛类型或错误可选语义污染业务模型？

### 1.2 为什么必须现在学习

08.01 已经建立“静态类型是编译期证据”的心智模型。下一步必须先学会准确描述数据，后续函数、泛型、联合状态和 API 契约才有可靠输入。若基础模型含糊，越高级的类型只会把错误放大。

### 1.3 本 Module 完整拥有

- Primitive、Wrapper、`bigint`、`symbol` 与 `unique symbol` 的类型边界。
- `null`、`undefined`、`strictNullChecks` 与缺失状态。
- `any`、`unknown`、`never`、`void`、`object`、`Object` 与 `{}` 的语义。
- 对象属性、Optional、Readonly 与 `exactOptionalPropertyTypes`。
- Array、ReadonlyArray、Tuple、Named Tuple、Optional / Rest Element。
- Literal Type、Literal Union、`as const` 与常量数据建模。
- `enum`、对象常量和联合类型的选择。
- Index Signature、`Record`、`noUncheckedIndexedAccess` 与动态键。
- Freshness、Excess Property Check 与 `satisfies`。

### 1.4 与其他 Module 的边界

- 函数泛型和推断控制由 08.03 教学。
- 业务状态的 Discriminated Union 由 08.04 教学。
- Mapped / Conditional Type 由 08.06～08.07 教学。
- Runtime Schema 由 08.10 教学。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 正确选择基础类型并处理 `null` / `undefined`。
- 能建模对象、数组和固定位置 Tuple。
- 理解 Optional 与 `T | undefined` 不完全相同。
- 默认避免 `any`，在未知边界使用 `unknown`。
- 能解释 `readonly` 是浅层静态约束而不是深度运行时冻结。

**Should**

- 使用 `exactOptionalPropertyTypes` 和 `noUncheckedIndexedAccess` 暴露隐藏风险。
- 比较 `enum`、对象常量和 Literal Union 的运行时与发布差异。
- 使用 `satisfies` 验证形状同时保留推断。
- 识别不安全索引、共享可变数组和宽泛配置对象。

**Expert**

- 为配置、权限、Token、事件常量设计单一事实来源。
- 制定 Optional、Nullability、Readonly 和 Dynamic Key 的团队建模规则。
- 分析精确类型、安全性、声明文件大小和 API 易用性的 Trade-off。

### 1.6 一次学透的闭环

本 Module 必须按下面的顺序形成完整闭环：

```text
建立最小正常模型
→ 观察 TypeScript 推断与诊断
→ 增加一个真实业务关系
→ 制造错误或边界
→ 保存静态与运行时证据
→ 解释机制
→ 比较替代方案
→ 完成 Module Project
→ 输出生产规则与架构决策
```

不以“语法都出现过”为完成标准，而以学习者能否建模、Debug、测量、取舍和治理为标准。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP011 | Primitive、Wrapper、bigint 与 unique symbol | Must | BUILD-LAB | ⏳ |
| KP012 | null、undefined 与 strictNullChecks | Must | FAILURE-LAB | ⏳ |
| KP013 | any、unknown、never 与 void 的职责边界 | Must / Should | FAILURE-LAB | ⏳ |
| KP014 | object、Object、{} 与 unknown 为什么不同 | Should | TYPE-MECHANISM-LAB | ⏳ |
| KP015 | Optional、Readonly 与 exactOptionalPropertyTypes | Must / Should | FAILURE-LAB | ⏳ |
| KP016 | Array、ReadonlyArray、共享引用与可变性风险 | Must / Should | FAILURE-LAB | ⏳ |
| KP017 | Tuple、Named Tuple、Optional 与 Rest Element | Must | BUILD-LAB | ⏳ |
| KP018 | Literal Union 与 as const | Must / Should | BUILD-LAB | ⏳ |
| KP019 | enum、const enum、对象常量与联合类型选型 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP020 | Index Signature、Record 与 noUncheckedIndexedAccess | Must / Should | FAILURE-LAB | ⏳ |
| KP021 | Freshness、Excess Property Check 与 satisfies | Should | TYPE-MECHANISM-LAB | ⏳ |
| KP022 | Module Project：Typed Configuration Model | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP011～KP014 从独立最小值实验开始；KP015～KP021 允许复制同一配置模型逐步演进，但每课必须保存独立最终源码；KP022 从明确的损坏配置基线开始。

无论采用零状态还是复制演进，每个 Lesson 最终都必须：

- 保存完整独立源码；
- 写清完整来源和复制命令；
- 能在干净环境执行安装、Check、Build、Runtime 和 Verify；
- 不依赖上一课目录、上一课 Dev Server 或作者机器上的全局配置。

---

## 4. 统一运行与验证

正式 Lesson 默认提供：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

故意错误必须通过 `@ts-expect-error`、独立 failure fixture 或明确的 expected-failure script 保存，不允许让整个最终项目处于不可验证状态。

---

## 5. Learning Artifact 与证据

本 Module 主要使用：

- Hover 中的精确类型与 widened 类型
- `@ts-expect-error` 负向测试
- 对象缺失与显式 `undefined` 的对照
- 数组共享引用的 Runtime 输出
- 索引读取得到 `T | undefined` 的诊断
- 声明文件中的 Optional / Readonly 表面

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 把 `String` 当成 `string`
- 把外部数据写成 `any`
- 把 `name?: string` 当成总是存在的字符串
- 认为 `readonly` 会冻结嵌套对象
- 用 `Record<string, T>` 假装所有键都存在
- 对象先赋给变量后绕过 Excess Property Check
- `as const` 过度冻结导致公共 API 难用

统一流程：

```text
正常基线
→ 只注入一个故障
→ 记录 Diagnostic / Runtime 症状
→ 提出假设
→ 获取最小证据
→ 修正类型模型或边界
→ 正向 Check + 负向类型测试 + Runtime 回归
```

---

## 7. Performance、Security 与 Compatibility

### Performance

需要测量的课程必须固定 Node.js、TypeScript、机器条件和命令，记录冷启动、热构建或增量数据。不能凭主观感觉宣称“更快”。

### Security / Trust Boundary

只要数据来自外部边界，就不能通过断言伪造可信度。涉及输入的课程必须说明：

```text
来源
→ 当前静态类型
→ Runtime 是否经过验证
→ 错误如何呈现和观测
```

### Compatibility

公共类型、模块入口、声明文件或生成产物发生变化时，必须同时考虑：

- 编译兼容；
- Runtime 兼容；
- 推断兼容；
- 错误行为兼容；
- Consumer 升级和回滚。

---

## 8. Debug 工具

按 Lesson 主问题选择：

```text
tsc --noEmit
Compiler Diagnostic
Hover / Go to Definition / Find References
@ts-expect-error
Type Probe
Emit JavaScript / Declaration / Source Map
--showConfig
--explainFiles
--traceResolution
Runtime stdout / stderr
Build / Check Benchmark
Consumer Fixture
API Compatibility Diff
```

不得通过连续增加 `as`、`any` 或关闭 strict 选项来“修复”根因。

---

## 9. Module Project

项目名称：

```text
Typed Configuration Model
```

### 项目任务

实现环境、主题、权限、功能开关、区域覆盖和插件参数配置；同时处理缺失、显式 `undefined`、只读、动态键、常量推导和配置校验边界。

### 必交产物

1. 配置类型与示例数据
2. Expected Error 套件
3. 可变性与索引故障记录
4. `enum` / Literal Union 选型 ADR
5. 配置建模规范

### 项目验收

- 功能和 Runtime 行为可重复。
- 正常调用通过类型检查。
- 非法调用由负向类型测试稳定阻止。
- README 能让第一次打开项目的人从起始状态复刻。
- 至少包含一个真实 Failure、修复和回归。
- 适用时提供性能、兼容、安全或架构证据。
- 关键 Trade-off 通过 ADR / RFC 留档。

---

## 10. 后续课程如何引用本 Module

后续所有 DTO、Domain、Schema 和公共 SDK 都直接复用本 Module 的 Nullability、Optional、Readonly 与 Index Safety 规则，不再补一套“基础类型高级篇”。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能解释 `any`、`unknown`、`never`、`void` 的职责差异。
- 能准确区分缺失属性、显式 `undefined` 与 `null`。
- 能选择 Array、ReadonlyArray 或 Tuple。
- 能用常量数据派生精确 Literal Union。
- 能诊断动态索引和共享可变引用风险。
- 能完成 Typed Configuration Model 及其故障矩阵。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
