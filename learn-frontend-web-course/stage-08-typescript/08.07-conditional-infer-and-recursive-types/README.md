# Module 08.07：Conditional、infer、Template Literal 与 Recursive Type

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：13  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何表达输入类型之间的条件关系、提取嵌套信息和解析类型级字符串，同时控制分发、递归深度、错误可读性与编译性能？

### 1.2 为什么必须现在学习

只有在掌握基础派生后才进入条件类型。此时每个高级类型都必须服务真实 API 问题，并接受“能否用更简单模型解决”的审查。

### 1.3 本 Module 完整拥有

- Conditional Type 判断模型。
- Distributive Conditional Type 与方括号阻止分发。
- `any`、`unknown`、`never` 在条件类型中的行为。
- `infer` 提取函数、数组、Promise、构造器信息。
- 多位置和受约束 `infer`。
- Variadic Tuple。
- Template Literal Type 与字符串 Intrinsic。
- Recursive Type 与终止条件。
- Route / Path Parameter 类型解析。
- Union-to-Intersection 等常见高级变换的原理与边界。
- Overload 推断限制与 Instantiation Expression。
- Type Complexity Budget 与慢类型诊断。

### 1.4 与其他 Module 的边界

- 不把竞赛式类型体操作为课程目标。
- Compiler 内部性能源码由 Stage 16。
- 组织级性能治理由 08.14。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 能阅读基础 Conditional Type。
- 理解分发发生在裸类型参数。
- 能使用 `infer` 提取常见结构。
- 能编写有限递归类型。

**Should**

- 使用 Variadic Tuple 和 Template Literal 设计可推断 API。
- 识别 `any` / `never` 导致的意外结果。
- 控制递归和联合展开。
- 比较高级类型与 Overload / Codegen 的可读性。

**Expert**

- 为公共 API 建立 Type Complexity Budget。
- 通过 Trace、最小复现和简化策略定位慢类型。
- 拒绝无业务价值但显著增加编译成本的类型体操。

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
| KP069 | Conditional Type 的判断模型 | Must | BUILD-LAB | ⏳ |
| KP070 | Distributive Conditional Type | Must / Should | TYPE-MECHANISM-LAB | ⏳ |
| KP071 | any、unknown、never 在条件类型中的行为 | Should | FAILURE-LAB | ⏳ |
| KP072 | infer 提取函数、数组、Promise 与构造器信息 | Must / Should | BUILD-LAB | ⏳ |
| KP073 | 多位置 infer、约束 infer 与候选合并 | Should | BUILD-LAB | ⏳ |
| KP074 | Variadic Tuple Type | Should | BUILD-LAB | ⏳ |
| KP075 | Template Literal Type | Must / Should | BUILD-LAB | ⏳ |
| KP076 | 字符串 Intrinsic Type 与 Unicode 边界 | Should / Expert | FAILURE-LAB | ⏳ |
| KP077 | Recursive Type 与递归终止 | Should | BUILD-LAB | ⏳ |
| KP078 | 类型安全 Route / Path Parameter Parser | Should / Expert | PROJECT-LAB | ⏳ |
| KP079 | Union-to-Intersection 等高级变换 | Expert | TYPE-MECHANISM-LAB | ⏳ |
| KP080 | Overload 推断限制与 Instantiation Expression | Should / Expert | FAILURE-LAB | ⏳ |
| KP081 | Module Project：Type Complexity Budget 与慢类型实验 | 全层级 | PERFORMANCE-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP069～KP077 独立最小实验；KP078～KP081 使用同一 Route DSL 演进，并逐步增加递归和性能压力。

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

- 类型探针与 Expected Error
- 分发前后结果对照
- Template Literal 参数推断
- TypeScript 7 Check 时间
- Trace / Diagnostic 输出
- 简化前后错误消息

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 意外对 Union 分发
- 递归缺少终止条件
- 把 `any` 传入高级类型后得到不可信结果
- 解析字符串类型与真实 Runtime Parser 不一致
- Union 爆炸
- 公共 API 错误消息只剩巨型展开类型

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
Typed Route DSL & Type Complexity Lab
```

### 项目任务

从 Route 字符串推导路径参数，配套真实 Runtime Parser，并逐步制造递归深度、联合爆炸和错误可读性问题。

### 必交产物

1. Route DSL 类型与 Runtime 实现
2. 一致性测试
3. 性能基线
4. 复杂度预算
5. 简化 ADR

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

框架 Router 和 SDK 可以使用经审查的高级类型，但不得把本 Module 的复杂变换复制到多个业务包。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能解释条件类型分发。
- 能使用 `infer` 和 Variadic Tuple。
- 能让 Template Literal 类型与 Runtime 行为一致。
- 能为递归类型设计终止条件。
- 能测量并简化慢类型。
- 完成 Route DSL 与 Complexity Budget。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
