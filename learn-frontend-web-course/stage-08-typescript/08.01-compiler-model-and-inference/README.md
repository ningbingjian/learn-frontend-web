# Module 08.01：TypeScript 编译模型与类型推断

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：✅ 已完成  
> 当前完成：KP001～KP010 / 10 课  
> 技术基线：TypeScript 7.0.2、Node.js 20+

---

## 1. Module Teaching Contract

### 1.1 唯一主题

> TypeScript 如何在不改变 JavaScript Runtime 本质的前提下，通过解析、推断、静态检查、诊断和编辑器服务，帮助我们在运行前获得错误证据？

本 Module 是后续基础类型、Generic、高级类型、Schema 与 SDK 的心智模型根基。学习者必须先知道类型信息何时存在、谁在使用、Emit 后还剩什么，以及为什么断言不能创造真实证据。

### 1.2 完整拥有

- TypeScript 与 JavaScript Runtime 的职责关系。
- `.ts` 到 `.js`、`.d.ts` 与 Source Map 的课程级流程。
- Parse、Bind、Check、Emit、Language Service 与 LSP 的职责。
- Annotation、Inference、Literal Widening 与 Contextual Typing。
- Assignability、Structural Compatibility 与类型相等。
- `as`、非空断言、双重断言的风险。
- Compiler Diagnostic、Expected Error 和 Type Error Triage。

基础数据建模由 08.02 继续；Generic、Narrowing、高级类型和完整 Compiler Pipeline 分别由后续 Module 教学。

### 1.3 能力分层

**Must**：能建立 strict 项目，区分 Check、Emit、Runtime，解释推断与类型擦除。  
**Should**：能保存 Expected Error、Declaration 和 Runtime 证据，识别 Widening、Context 丢失与断言假安全。  
**Expert**：能设计 Annotation Policy、Assertion Budget 与团队诊断 Runbook。

---

## 2. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [TypeScript 到底解决了 JavaScript 的什么问题](./kp001-why-typescript/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP002 | [从零建立第一个 strict TypeScript 项目](./kp002-first-strict-project/) | Must | BUILD-LAB | ✅ |
| KP003 | [源文件如何经过 Parse、Check 与 Emit](./kp003-compiler-pipeline/) | Must / Should | COMPILER-MECHANISM-LAB | ✅ |
| KP004 | [编译期类型安全为什么不等于运行时安全](./kp004-compile-time-vs-runtime/) | Must / Should | SECURITY-LAB | ✅ |
| KP005 | [什么时候显式标注，什么时候依赖推断](./kp005-annotations-vs-inference/) | Must / Should | BUILD-LAB | ✅ |
| KP006 | [Literal Widening 为什么会丢失精确信息](./kp006-literal-widening/) | Must / Should | TYPE-MECHANISM-LAB | ✅ |
| KP007 | [Contextual Typing 如何从使用位置反向推断](./kp007-contextual-typing/) | Must / Should | BUILD + FAILURE-LAB | ✅ |
| KP008 | [Assignability、Compatibility 与类型相等](./kp008-assignability-and-compatibility/) | Should | TYPE-MECHANISM-LAB | ✅ |
| KP009 | [as、非空断言与双重断言如何制造假安全](./kp009-unsafe-assertions/) | Should / Expert | SECURITY + FAILURE-LAB | ✅ |
| KP010 | [Module Project：Type Error Observatory](./kp010-type-error-observatory/) | 全层级 | PROJECT + DIAGNOSTIC-LAB | ✅ |

---

## 3. 因果学习链

```text
先观察未经检查的 JavaScript 缺陷
→ 建立 strict 工程
→ 分离 Check / Emit / Runtime
→ 证明类型只在静态阶段提供证据
→ 决定 Annotation 与 Inference
→ 观察 Literal Widening
→ 观察 Contextual Typing
→ 判断 Source/Target 可赋值方向
→ 破坏断言并在 Runtime 复现
→ 用 Type Error Observatory 建立诊断流程
```

十课共同形成一个闭环，后续不再另设“编译模型高级篇”。

---

## 4. 统一运行方式

进入任意 Lesson：

```bash
npm install
npm run check
npm run build
npm start
npm run verify
```

项目中的正常源码、Expected Error、Declaration、Runtime 输出和自动验证分别回答不同问题，任何单一证据都不能替代其余证据。

---

## 5. Failure Lab 矩阵

| 故障 | 根因 | 第一证据 |
| --- | --- | --- |
| JavaScript 接收错误字段 | 无静态契约 | Runtime Fixture |
| strict 缺失 | 配置基线错误 | `tsc --showConfig` |
| 误以为 Interface 会运行 | 类型擦除误解 | Emit JavaScript |
| JSON 直接断言为 Domain | 无 Runtime Validation | Runtime Stack |
| 局部过度标注 | 主动丢失推断 | Declaration Emit |
| Literal 被扩大 | 可变位置 | Type Probe |
| 回调隐式 any | Context 丢失 | TS7006 + Hover |
| 赋值方向误判 | Source 不满足 Target | 最小赋值表达式 |
| 双重断言 / 非空断言 | 伪造证据 | Runtime Failure |
| 成批连锁诊断 | 未找第一根因 | Observatory Triage |

---

## 6. Module Project：Type Error Observatory

项目目录：[kp010-type-error-observatory](./kp010-type-error-observatory/)

必交成果：

- 九类故障场景与优先级矩阵。
- Syntax / Type / Module / Configuration / Runtime 分类。
- `TRIAGE_PLAYBOOK.md` 与 `OBSERVATORY_REPORT.md`。
- Unknown Build Event Runtime Guard。
- Annotation Policy 与 Assertion Budget。
- 正向 Check、Expected Error、Build、Runtime 和文档自动回归。

诊断流程：

```text
分类
→ 找第一条根错误
→ 获取第一证据
→ 建立最小复现
→ 修模型而不是压红线
→ 完整回归
```

---

## 7. Module Definition of Done

学习者必须能：

- 画出 `.ts → Parse → Bind → Check → Emit → .js` 的课程级流程。
- 说明 TypeScript 与 JavaScript Runtime 的职责边界。
- 从空目录建立 strict 项目并解释关键配置。
- 判断局部值、函数边界和公共 API 的标注策略。
- 解释 Widening、Contextual Typing 和 Assignability。
- 使用 Expected Error 和 Declaration 保存静态证据。
- 证明断言不会验证输入，并给出 unknown + Parse 替代方案。
- 按 Runbook 找到第一根因并完成回归。
- 独立完成 Type Error Observatory 答辩。

完成后进入 [Module 08.02 基础类型与数据建模](../08.02-basic-types-and-modeling/)。
