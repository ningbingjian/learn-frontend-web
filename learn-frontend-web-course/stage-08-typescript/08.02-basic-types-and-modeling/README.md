# Module 08.02：基础类型、Object、Array、Tuple 与 Literal 建模

> Stage：[Stage 08 TypeScript 完整体系](../README.md)
> 状态：🚧 建设中
> 当前完成：KP011～KP021 / 12 课
> 下一批：KP022～KP024（完成本 Module Project，并启动 08.03 前两课）
> 技术基线：TypeScript 7.0.2、Node.js 20+

---

## 1. Module Teaching Contract

### 1.1 唯一主题

> 如何精确表示 JavaScript 值、对象形状、缺失状态、可变性、位置协议、有限值集合和动态键，而不让 `any`、宽泛类型、错误 Optional 语义、共享引用或虚假的完整性污染业务模型？

08.01 已证明静态类型是编译期证据。本 Module 继续回答“用什么类型准确描述数据”，为 Function、Generic、Union、API Contract 和 Runtime Schema 提供可靠输入。

### 1.2 完整拥有

- Primitive、Wrapper、`bigint`、`symbol` 与 `unique symbol`。
- `null`、`undefined`、`strictNullChecks` 与缺失语义。
- `any`、`unknown`、`never` 与 `void`。
- `object`、`Object`、`{}`、`unknown` 与 Record Boundary。
- Optional、Readonly 与 `exactOptionalPropertyTypes`。
- Array、ReadonlyArray、共享引用、元素可变性与 Defensive Copy。
- Tuple、Named Tuple、Optional / Rest Element 与位置协议。
- Literal Union、`as const`、常量派生与 Runtime Freeze 边界。
- `enum`、`const enum`、对象常量与 Literal Union 选型。
- Index Signature、Record、Partial Record 与 `noUncheckedIndexedAccess`。
- Freshness、Excess Property Check、Type Annotation、Assertion 与 `satisfies`。
- Typed Configuration Model 综合项目。

Generic 与推断控制由 08.03 教学；业务状态 Union 由 08.04 教学；高级类型派生由 08.06～08.07 教学；Runtime Schema 由 08.10 教学。

### 1.3 能力分层

**Must**

- 正确选择基础类型并处理 `null` / `undefined`。
- 默认避免 `any`，在未知边界使用 `unknown`。
- 区分 Optional 与 `T | undefined`。
- 理解 readonly 是静态权限，不是 Runtime Freeze。
- 选择 Array、ReadonlyArray、Tuple 或 Object。
- 使用 Literal Union 表达有限值集合。
- 让动态索引读取保留 `undefined`。

**Should**

- 使用 `exactOptionalPropertyTypes` 和 `noUncheckedIndexedAccess` 暴露风险。
- 识别 Wrapper、Dynamic Index、Shared Reference 和 Mutable Alias 风险。
- 使用 Defensive Copy 建立稳定 Snapshot。
- 使用 Named / Optional / Rest Tuple 表达位置协议。
- 从 `as const` 常量派生 Union，同时保留 Runtime 数据。
- 比较 enum、对象常量、Literal Union 与 const enum 的发布影响。
- 使用 `satisfies` 验证形状同时保留精确推断。
- 区分 Fresh Literal 检查和普通 Structural Assignability。

**Expert**

- 为配置、权限、Token、事件、路由和渠道常量建立单一事实来源。
- 制定 Nullability、Optional、Readonly、Collection Ownership、Tuple、Enum 与 Dynamic Key 团队规则。
- 判断精确类型、声明体积、Emit、兼容性和 API 易用性的 Trade-off。
- 区分 Static Readonly、Snapshot、Runtime Freeze 与 Ownership Transfer。
- 审查公共 SDK 中的 enum / const enum 风险。
- 设计 Complete / Partial / Open Key Space。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP011 | [Primitive、Wrapper、bigint 与 unique symbol](./kp011-primitives-wrappers-bigint-symbol/) | Must | BUILD + TYPE-MECHANISM-LAB | ✅ |
| KP012 | [null、undefined 与 strictNullChecks](./kp012-null-undefined-strict-null-checks/) | Must | FAILURE + DOMAIN-MODELING-LAB | ✅ |
| KP013 | [any、unknown、never 与 void 的职责边界](./kp013-any-unknown-never-void/) | Must / Should | FAILURE + CONTROL-FLOW-LAB | ✅ |
| KP014 | [object、Object、{} 与 unknown 为什么不同](./kp014-object-object-braces-unknown/) | Should | TYPE-MECHANISM + BOUNDARY-LAB | ✅ |
| KP015 | [Optional、Readonly 与 exactOptionalPropertyTypes](./kp015-optional-readonly-exact-optional/) | Must / Should | FAILURE + DOMAIN-MODELING-LAB | ✅ |
| KP016 | [Array、ReadonlyArray、共享引用与可变性风险](./kp016-array-readonlyarray-shared-mutation/) | Must / Should | FAILURE + MUTABILITY-LAB | ✅ |
| KP017 | [Tuple、Named Tuple、Optional 与 Rest Element](./kp017-tuple-named-optional-rest/) | Must / Should | BUILD + POSITIONAL-CONTRACT-LAB | ✅ |
| KP018 | [Literal Union、常量派生与 as const](./kp018-literal-union-as-const/) | Must / Should | BUILD + TYPE-DERIVATION-LAB | ✅ |
| KP019 | [enum、const enum、对象常量与 Literal Union 选型](./kp019-enum-const-enum-object-constant/) | Should / Expert | ARCHITECTURE + EMIT-LAB | ✅ |
| KP020 | [Index Signature、Record 与 noUncheckedIndexedAccess](./kp020-index-signature-record-no-unchecked-indexed-access/) | Must / Should | FAILURE + INDEX-SAFETY-LAB | ✅ |
| KP021 | [Freshness、Excess Property Check 与 satisfies](./kp021-freshness-excess-property-satisfies/) | Should / Expert | TYPE-MECHANISM + CONFIG-LAB | ✅ |
| KP022 | Module Project：Typed Configuration Model | 全层级 | PROJECT-LAB | ⏳ |

当前完成度：

```text
11 / 12 = 91.7%
```

---

## 3. 当前能力链

```text
Primitive 与 Wrapper Runtime 边界
→ bigint 运算与序列化边界
→ unique symbol Token
→ null / undefined / Optional 语义
→ DTO 到 Domain 标准化
→ any 污染与 unknown Narrow
→ never 穷尽检查与 void 回调
→ object / {} / unknown / Record 边界
→ exact Optional 写入语义
→ 浅层 readonly 与深层只读视图
→ Array / ReadonlyArray 与 Shared Reference
→ Readonly Collection / Readonly Element / Snapshot
→ Tuple 位置、长度、Optional 与 Rest Contract
→ Runtime Constant 派生 Literal Union
→ as const、Widening 与 Runtime Freeze 边界
→ Literal Union / Object Constant / enum / const enum 选型
→ Runtime Object / Emit / Consumer Compatibility
→ Open / Complete / Partial Key Space
→ noUncheckedIndexedAccess 与 Missing State
→ Freshness / Excess Property Check
→ Annotation / satisfies / as const satisfies
```

现在只剩下 KP022，把这些机制组合成真实配置系统。

---

## 4. KP019～KP021 的因果链

```text
KP019
有限值集合应该选 Type-only、Runtime Constant、enum 还是 const enum？
↓
KP020
当对象的 Key Space 是开放、完整或部分存在时，如何让索引读取与 Runtime 对齐？
↓
KP021
对象字面量如何验证目标形状，同时保留精确 Literal 推断？
```

三课共同解决：

```text
有限值表示
+ Runtime Emit
+ Consumer API
+ Key Space
+ Missing State
+ Object Shape Validation
+ Precise Inference
```

---

## 5. 统一运行与验证

进入任意已完成 Lesson：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

KP019 额外提供：

```bash
npm run build:inline
```

用于对比 `const enum` 在不同编译策略下的 Emit。

故意错误只能通过 `@ts-expect-error` 或独立 Failure Fixture 保存，不能让最终项目处于不可验证状态。

每课至少保留：

```text
README.md
package.json
tsconfig.json
verify.mjs
src/index.ts
src/expected-errors.ts
```

---

## 6. Learning Evidence

本 Module 使用：

- Compiler Diagnostic 与 `@ts-expect-error`。
- Hover 和 Declaration Emit 中的精确类型。
- Optional 缺失与显式 `undefined` 对照。
- Shared Reference / Alias Mutation Runtime。
- Readonly View 与 Defensive Snapshot Runtime。
- Named、Optional、Rest Tuple 声明。
- `as const` readonly Tuple 与 Object Literal 声明。
- enum Runtime Object 与 Numeric Reverse Mapping。
- `const enum` 双配置 Emit Diff。
- Dynamic Index 的 `V | undefined`。
- Complete / Partial Record 的缺键与多键测试。
- Fresh Literal 的 Excess Property Check。
- Annotation 与 `satisfies` 的 Declaration Surface Diff。
- Runtime Extra Field 与 Static View 差异。
- Runtime Guard 证明 Static Type 不能验证 JSON。

关键结论不得只依赖编辑器截图；必须能通过源码和自动脚本重复执行。

---

## 7. Failure Lab 索引

### Value 与 Boundary

- `String` Wrapper 不能作为普通 `string` 业务字段。
- bigint 与 number 不能直接混算，BigInt 不能直接 JSON 序列化。
- 描述相同的 Symbol 不是同一 `unique symbol` Token。
- 可空字段未经处理不能调用字符串成员。
- `any` 会让错误字段通过 Check 并在 Runtime 失败。
- `unknown` 必须 Narrow 后使用。
- `object` 会接受 Array / Function，`{}` 会接受 Primitive。

### Optional、Readonly 与 Collection

- Optional 写入不等于显式 `undefined`。
- readonly 属性不会自动冻结嵌套对象。
- ReadonlyArray 仍会观察到可变别名的 push。
- ReadonlyArray 中的可变元素字段仍可修改。
- Readonly View 不等于 Snapshot / Ownership Transfer。

### Tuple 与 Literal

- 普通 Array 无法证明 Tuple 长度和位置协议。
- readonly Tuple 不能直接交给 mutable Tuple API。
- 普通对象属性 Widen 成 `string`，不能直接作为 Literal Union。
- `as const` 不会 Runtime Freeze，也不能取得共享引用的独占所有权。

### Enum、Index 与 Object Shape

- 原始字符串不能直接冒充 String enum Member。
- Numeric enum 产生反向映射。
- `const enum` Emit 随编译策略变化。
- 开放 Index Signature 不保证任意键存在。
- Complete Record 缺键或多键会失败。
- Partial Record 读取仍然可能是 `undefined`。
- Fresh Object Literal 会检查多余字段。
- 变量中转后额外字段仍存在于 Runtime。
- `satisfies` 不会校验 JSON。

统一流程：

```text
正常基线
→ 只注入一个故障
→ 保存 Diagnostic / Runtime 症状
→ 获取最小证据
→ 修正类型模型或边界
→ 正向 + 负向 + Runtime 回归
```

---

## 8. Production Policy

### Primitive Policy

业务字段使用小写 Primitive；Wrapper Object 禁止进入 DTO、Domain 和公共 API。

### Boundary Policy

外部数据使用 `unknown`；普通键值对象必须经 `isRecord` Narrow，不能用 `object`、`Object` 或 `{}` 伪装已知结构。

### Nullability Policy

DTO 忠实表达外部 nullability，Adapter 统一转换为 Domain 缺失语义。默认开启 `strictNullChecks` 与 `exactOptionalPropertyTypes`。

### Any / Assertion Policy

业务 `any` 预算为 0。兼容旧库的 any 必须隔离、登记 Owner 和移除条件。禁止双重断言作为数据转换。

### Collection Ownership Policy

不修改输入的函数接收 `readonly T[]`。缓存、Store、SDK 和异步任务若需要稳定状态，应在边界建立 Copy / Snapshot。Readonly View、Snapshot、Transfer 与 Runtime Freeze 必须在接口文档中明确区分。

### Tuple Policy

Tuple 只用于天然位置协议；每个位置必须有 Named Label。超过 3～4 项、可选项较多或字段会独立演进时，优先使用 Object。公共 Tuple 默认 readonly。

### Literal / Enum Policy

有限字符串默认使用 Literal Union 或 `as const` Constant + Derived Union。`enum` 必须说明 Runtime Namespace 需求；Numeric enum 的成员值进入协议后按兼容合同管理；公共 SDK 默认禁止 ambient const enum。

### Dynamic Key Policy

```text
开放键
→ Index Signature / Map

有限且完整
→ Record<K, V>

有限但可缺失
→ Partial<Record<K, V>>
```

动态读取必须保留 `undefined`，除非当前控制流已经证明存在。

### Config Validation Policy

静态配置常量优先：

```ts
as const satisfies Contract
```

外部配置仍然必须：

```text
unknown
→ Runtime Guard / Schema
→ Validated Config
```

---

## 9. 下一课：KP022 Typed Configuration Model

KP022 将实现：

```text
Environment
Theme
Permissions
Feature Flags
Region Overrides
Plugin Options
Route / Endpoint Tuple
Runtime Inputs
```

并组合：

- 缺失与显式 `undefined`；
- Nullability 标准化；
- 只读、集合所有权和 Snapshot；
- Tuple 位置配置；
- Literal 常量派生；
- enum / Literal Union 选型 ADR；
- Complete / Partial / Open Key Space；
- `noUncheckedIndexedAccess`；
- Excess Property 与 `satisfies`；
- Runtime Validation Boundary。

项目必须提交：

1. 配置类型与 Runtime 示例。
2. Expected Error 套件。
3. Shared Mutation 与 Index Failure Report。
4. enum / Literal Union 选型 ADR。
5. 配置建模规范。
6. 独立 `verify` 自动验收。

---

## 10. Module Definition of Done

完成 KP022 后，学习者必须：

- 解释 `any`、`unknown`、`never`、`void` 的职责差异。
- 区分缺失属性、显式 `undefined` 与 `null`。
- 区分 `object`、`Object`、`{}`、`unknown` 与 Record。
- 区分 Static Readonly、Readonly View、Snapshot 与 Runtime Freeze。
- 选择 Array、ReadonlyArray、Tuple 或 Object。
- 使用常量数据派生 Literal Union。
- 比较 enum、对象常量和 Literal Union 的 Runtime / Emit / 发布影响。
- 诊断动态索引、共享可变引用和 Excess Property 风险。
- 使用 `satisfies` 验证形状同时保留精确推断。
- 完成 Typed Configuration Model 及故障矩阵。

下一批建设：

```text
KP022：Typed Configuration Model
KP023：参数、返回值与函数推断
KP024：Optional、Default、Rest 参数与参数数量
```
