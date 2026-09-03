# Module 08.02：基础类型、Object、Array、Tuple 与 Literal 建模

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：🚧 建设中  
> 当前完成：KP011～KP015 / 12 课  
> 下一批：KP016～KP018  
> 技术基线：TypeScript 7.0.2、Node.js 20+

---

## 1. Module Teaching Contract

### 1.1 唯一主题

> 如何精确表示 JavaScript 值、对象形状、缺失状态、可变性和安全索引，而不让 any、宽泛类型或错误 Optional 语义污染业务模型？

08.01 已证明静态类型是编译期证据。本 Module 继续回答“用什么类型准确描述数据”，为函数、Generic、Union、API Contract 和 Runtime Schema 提供可靠输入。

### 1.2 完整拥有

- Primitive、Wrapper、bigint、symbol 与 unique symbol。
- null、undefined、strictNullChecks 与缺失语义。
- any、unknown、never 与 void。
- object、Object、`{}`、unknown 与 Record Boundary。
- Optional、Readonly 与 exactOptionalPropertyTypes。
- Array、ReadonlyArray、Tuple、Named Tuple、Optional / Rest Element。
- Literal Union、`as const`、enum 与对象常量选型。
- Index Signature、Record、noUncheckedIndexedAccess。
- Freshness、Excess Property Check 与 `satisfies`。

Generic 与推断控制由 08.03 教学；业务状态 Union 由 08.04 教学；Runtime Schema 由 08.10 教学。

### 1.3 能力分层

**Must**

- 正确选择基础类型并处理 null / undefined。
- 默认避免 any，在未知边界使用 unknown。
- 区分 Optional 与 `T | undefined`。
- 理解 readonly 是浅层静态约束。
- 选择 Array、ReadonlyArray 或 Tuple。

**Should**

- 使用 exactOptionalPropertyTypes 和 noUncheckedIndexedAccess 暴露风险。
- 比较 enum、对象常量和 Literal Union。
- 使用 `satisfies` 验证形状同时保留推断。
- 识别 Wrapper、动态索引和共享可变引用风险。

**Expert**

- 为配置、权限、Token 和事件常量建立单一事实来源。
- 制定 Nullability、Optional、Readonly 和 Dynamic Key 团队规则。
- 判断精确类型、声明体积、兼容性和 API 易用性 Trade-off。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP011 | [Primitive、Wrapper、bigint 与 unique symbol](./kp011-primitives-wrappers-bigint-symbol/) | Must | BUILD + TYPE-MECHANISM-LAB | ✅ |
| KP012 | [null、undefined 与 strictNullChecks](./kp012-null-undefined-strict-null-checks/) | Must | FAILURE + DOMAIN-MODELING-LAB | ✅ |
| KP013 | [any、unknown、never 与 void 的职责边界](./kp013-any-unknown-never-void/) | Must / Should | FAILURE + CONTROL-FLOW-LAB | ✅ |
| KP014 | [object、Object、{} 与 unknown 为什么不同](./kp014-object-object-braces-unknown/) | Should | TYPE-MECHANISM + BOUNDARY-LAB | ✅ |
| KP015 | [Optional、Readonly 与 exactOptionalPropertyTypes](./kp015-optional-readonly-exact-optional/) | Must / Should | FAILURE + DOMAIN-MODELING-LAB | ✅ |
| KP016 | Array、ReadonlyArray、共享引用与可变性风险 | Must / Should | FAILURE-LAB | ⏳ |
| KP017 | Tuple、Named Tuple、Optional 与 Rest Element | Must | BUILD-LAB | ⏳ |
| KP018 | Literal Union 与 `as const` | Must / Should | BUILD-LAB | ⏳ |
| KP019 | enum、const enum、对象常量与联合类型选型 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP020 | Index Signature、Record 与 noUncheckedIndexedAccess | Must / Should | FAILURE-LAB | ⏳ |
| KP021 | Freshness、Excess Property Check 与 satisfies | Should | TYPE-MECHANISM-LAB | ⏳ |
| KP022 | Module Project：Typed Configuration Model | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 当前已建立的能力链

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
```

下一批继续进入集合、位置数据和常量建模。

---

## 4. 统一运行与验证

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

故意错误只能通过 `@ts-expect-error` 或独立 Failure Fixture 保存，不能让最终项目处于不可验证状态。

---

## 5. 已完成 Failure Lab

- `String` Wrapper 不能作为普通 `string` 业务字段。
- bigint 与 number 不能直接混算，BigInt 不能直接 JSON 序列化。
- 描述相同的 Symbol 不是同一 unique symbol Token。
- 可空字段未经处理不能调用字符串成员。
- Optional 写入不等于显式 `undefined`。
- any 会让错误字段通过 Check 并在 Runtime 失败。
- unknown 必须 Narrow 后使用。
- 新增判别联合分支会让 assertNever 报错。
- object 会接受 Array / Function，`{}` 会接受 Primitive。
- readonly 属性不会自动冻结嵌套对象。

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

## 6. Production Policy 草案

### Primitive Policy

业务字段使用小写 Primitive；Wrapper Object 禁止进入 DTO、Domain 和公共 API。

### Boundary Policy

外部数据使用 unknown；普通键值对象必须经 isRecord Narrow，不能用 object、Object 或 `{}` 伪装已知结构。

### Nullability Policy

DTO 忠实表达外部 nullability，Adapter 统一转换为 Domain 缺失语义。默认开启 strictNullChecks 与 exactOptionalPropertyTypes。

### Any / Assertion Policy

业务 any 预算为 0。兼容旧库的 any 必须隔离、登记 Owner 和移除条件。禁止双重断言作为数据转换。

### Readonly Policy

说明是浅层引用保护还是深层不可变；集合需要 ReadonlyArray，必要时再补 Runtime Freeze 或不可变数据结构。

---

## 7. Module Project：Typed Configuration Model

KP022 最终实现环境、主题、权限、功能开关、区域覆盖和插件参数配置，处理：

- 缺失与显式 undefined。
- nullability 标准化。
- 只读与共享引用。
- Literal 常量推导。
- Dynamic Key 与安全索引。
- Excess Property 与 `satisfies`。
- enum / Literal Union 选型 ADR。

项目必须提交配置类型、Expected Error、Runtime Failure、ADR 和建模规范。

---

## 8. Module Definition of Done

完成 KP022 后，学习者必须：

- 解释 any、unknown、never、void 的职责差异。
- 区分缺失属性、显式 undefined 与 null。
- 区分 object、Object、`{}`、unknown 与 Record。
- 选择 Array、ReadonlyArray 或 Tuple。
- 使用常量数据派生 Literal Union。
- 诊断动态索引、共享可变引用和 Excess Property 风险。
- 完成 Typed Configuration Model 及故障矩阵。

下一批建设：KP016～KP018。
