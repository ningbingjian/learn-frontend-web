# Module 08.03：Function、Overload 与 Generic

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：13  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何设计既类型安全、又能被调用位置准确推断，并且不会因过度泛型化而难以理解和维护的函数与可复用 API？

### 1.2 为什么必须现在学习

数据形状已经能够准确建模，下一步要让类型信息穿过函数边界。函数是类型信息最容易丢失、泛型最容易滥用、公共 API 体验最直接暴露的地方。

### 1.3 本 Module 完整拥有

- 参数、返回值、Optional / Default / Rest Parameter 与函数类型。
- Call Signature、Construct Signature、Callback 和 `void` 兼容。
- Overload Signature、Implementation Signature 与实现约束。
- 显式 `this` 参数、`ThisType` 和上下文丢失。
- Generic Function、Constraint、`keyof` Constraint 与默认类型参数。
- 推断来源、推断失败、`NoInfer` 与推断控制。
- `const` Type Parameter 与字面量保留。
- Variance、`strictFunctionTypes` 与回调安全。
- 泛型 API 的可读性、错误信息和演进成本。

### 1.4 与其他 Module 的边界

- Class 泛型和 Polymorphic `this` 在 08.05 深入。
- Mapped / Conditional Type 的完整变换在 08.06～08.07。
- 公共 SDK 发布和 SemVer 在 08.12。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 正确标注参数、返回值和回调。
- 能使用最小 Generic 保持输入输出关系。
- 能使用 Constraint 限制允许的类型。
- 理解 Overload 与 Union 参数的基本选择。

**Should**

- 定位泛型推断从哪里成功或丢失。
- 使用 `NoInfer`、默认泛型和 `const` Type Parameter 控制调用体验。
- 理解函数参数方差和回调兼容风险。
- 识别“泛型参数只出现一次”等无价值泛型。

**Expert**

- 设计稳定的 Middleware、Pipeline、Factory 和 Parser API。
- 比较 Overload、Union、Generic 与 Conditional Return 的错误可读性。
- 制定公共函数 API 的泛型复杂度预算与兼容策略。

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
| KP023 | 参数、返回值与函数推断 | Must | BUILD-LAB | ⏳ |
| KP024 | Optional、Default、Rest 参数与参数数量 | Must | BUILD-LAB | ⏳ |
| KP025 | Function Type、Call Signature 与 Construct Signature | Must / Should | BUILD-LAB | ⏳ |
| KP026 | Callback Contextual Typing 与 void 返回值兼容 | Should | FAILURE-LAB | ⏳ |
| KP027 | Overload Signature 与 Implementation Signature | Must / Should | BUILD-LAB | ⏳ |
| KP028 | 显式 this 参数、ThisType 与 this 丢失 | Should | FAILURE-LAB | ⏳ |
| KP029 | 泛型函数与调用位置推断 | Must | BUILD-LAB | ⏳ |
| KP030 | Generic Constraint 与 keyof Constraint | Must / Should | BUILD-LAB | ⏳ |
| KP031 | 泛型参数从哪里推断，为什么推断失败 | Should | TYPE-MECHANISM-LAB | ⏳ |
| KP032 | Generic Default、NoInfer 与推断控制 | Should / Expert | BUILD-LAB | ⏳ |
| KP033 | const Type Parameter 与字面量保留 | Should | BUILD-LAB | ⏳ |
| KP034 | Variance、strictFunctionTypes 与回调兼容 | Should / Expert | FAILURE-LAB | ⏳ |
| KP035 | Module Project：Generic Pipeline Toolkit | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP023～KP030 使用独立最小函数实验；KP031～KP034 围绕同一 Pipeline API 复制演进；KP035 使用新的集成项目验证设计而不是拼接课堂答案。

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

- 函数 Hover 与调用位置推断
- 生成 `.d.ts` 的公共签名
- Expected Error 调用矩阵
- Overload 错误消息对照
- 方差故障的编译诊断
- Pipeline Runtime 输出

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 参数或返回值使用 `any` 造成污染
- 为每个函数都添加无意义 `<T>`
- 泛型参数只出现一次
- 实现签名比 Overload 暴露面更宽
- 回调参数方向错误却因宽松配置通过
- 用复杂 Conditional Return 替代可读 Overload

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
Generic Pipeline Toolkit
```

### 项目任务

实现同步 / 异步步骤组合、Parser、Middleware、Typed Factory 和错误传播；调用者不需要手工填写大部分泛型参数。

### 必交产物

1. Pipeline 源码与声明
2. 正向 / 负向类型测试
3. 推断失败案例
4. Overload / Generic 选型 ADR
5. 公共 API 复杂度评审

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

React Hook、数据客户端、Router 与 SDK 会应用本 Module 的函数和泛型设计原则，只补框架特有类型，不重复泛型基础。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能说明泛型参数的信息来源和流向。
- 能选择 Union、Overload 或 Generic。
- 能诊断推断失败并做最小修复。
- 能解释 `strictFunctionTypes` 的价值。
- 能设计不要求调用者频繁显式传泛型的 API。
- 完成 Generic Pipeline Toolkit 与类型测试。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
