# Module 08.14：大型类型架构、性能与治理

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：10  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何在大型代码库中定义 Type Ownership、DTO / Schema / Domain / ViewModel 边界，控制依赖、编译性能和公共兼容，并通过 RFC、预算和审查长期治理？

### 1.2 为什么必须现在学习

单点类型技巧不能自动形成可演进系统。最后一个 Module 把前十三个 Module 组合成架构规则，并处理真实大型仓库中的边界漂移、Mega Union、循环依赖和性能回退。

### 1.3 本 Module 完整拥有

- Domain、DTO、Schema、ViewModel、Public SDK 分层。
- Type Ownership 与依赖方向。
- Generated Type 与 Handwritten Type 边界。
- 用类型表达不变量和合法状态。
- Monorepo Package Boundary 与 Project Reference。
- Barrel、Global Type 与循环类型依赖。
- Type Check / Editor 性能诊断。
- Mega Union、Deep Utility、Generic Explosion。
- Type RFC、API Review、Deprecation。
- Type Policy、Complexity Budget、Compatibility Policy 与组织治理。

### 1.4 与其他 Module 的边界

- 完整 DDD 与 Microfrontend 由 Stage 27。
- 研发平台和组织影响力由 Stage 28。
- Compiler / Bundler 内部由 Stage 16。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 明确外部 DTO 与内部 Domain 不应直接等同。
- 定义类型 Owner 和依赖方向。
- 避免全局 `types.ts` 与随意 Barrel。
- 保留公共 API 类型测试。

**Should**

- 建立包边界和 Project Reference。
- 诊断慢 Check、慢 Hover 和复杂错误。
- 隔离 Generated Code。
- 建立 Type RFC 与 Deprecation 流程。

**Expert**

- 制定组织级 Complexity / Compatibility / Any / Assertion Budget。
- 把类型性能和 API 兼容纳入 CI 与 Review。
- 为大型迁移和架构演进提供退出策略和可量化证据。

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
| KP152 | Domain、DTO、Schema、ViewModel 如何分层 | Must / Should | ARCHITECTURE-LAB | ⏳ |
| KP153 | Type Ownership 与依赖方向 | Should | ARCHITECTURE-LAB | ⏳ |
| KP154 | Generated Type 与 Handwritten Type 的边界 | Should | FAILURE-LAB | ⏳ |
| KP155 | 用类型表达不变量和合法状态 | Must / Should | BUILD-LAB | ⏳ |
| KP156 | Monorepo Package Boundary 与 Project Reference | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP157 | Barrel、Global Type 与循环类型依赖 | Should | FAILURE-LAB | ⏳ |
| KP158 | 如何定位 Type Check 和编辑器变慢 | Should / Expert | PERFORMANCE-LAB | ⏳ |
| KP159 | Mega Union、Deep Utility 与 Generic Explosion | Expert | PERFORMANCE-LAB | ⏳ |
| KP160 | Type RFC、Deprecation 与组织级治理 | Expert | ARCHITECTURE-LAB | ⏳ |
| KP161 | Module / Stage Project：Type Architecture Review 与答辩 | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP152～KP160 围绕一个故意设计错误的 Monorepo 演进；KP161 以独立审查任务验证学习者能否在没有逐步答案时做决策。

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

- 依赖图
- Public Type Surface
- Project Reference Build
- Check / Hover / Memory 基线
- 复杂类型 Trace
- API Compatibility Diff
- ADR / RFC / Policy

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 所有类型集中在一个 `types.ts`
- 数据库字段、API DTO、Domain 和 ViewModel 共用一份类型
- 生成文件被手工修改
- Barrel 制造循环依赖
- Deep Utility 横跨整个领域
- 性能下降却只通过升级机器解决

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
Type Architecture Review
```

### 项目任务

审查并重构一个包含类型混层、生成代码污染、循环依赖、Mega Union 和编译性能回退的 Monorepo，最终完成 Stage 答辩。

### 必交产物

1. 现状图
2. 问题证据
3. 目标架构
4. 重构序列
5. 性能对比
6. Type Policy
7. Compatibility Policy
8. 正式答辩材料

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

Stage 27 / 28 直接采用本 Module 的类型治理产物，将其与更广泛的系统和组织架构组合。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能画出 DTO → Schema → Domain → ViewModel / SDK 的依赖方向。
- 能分配 Type Ownership。
- 能诊断循环依赖和类型性能。
- 能限制高级类型复杂度。
- 能建立 RFC、Deprecation 和 Compatibility Gate。
- 完成 Type Architecture Review 与 Stage 答辩。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
