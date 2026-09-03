# Module 08.12：Library、SDK 与公共类型设计

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：12  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何设计稳定、好推断、可取消、可扩展、可发布且能通过类型测试验证的公共 API，并把类型变化纳入 Semantic Versioning？

### 1.2 为什么必须现在学习

内部类型可以随代码一起修改，公共 SDK 一旦发布就成为消费者契约。完成模块、声明、构建和 Codegen 后，才能系统设计公共 Type Surface。

### 1.3 本 Module 完整拥有

- Public Type Surface 与最小导出。
- Configuration API 与判别式配置。
- Typed Event、Listener 与生命周期。
- Plugin Extension Point。
- Branded ID 与公共领域不变量。
- Async、`AbortSignal` 与可取消 API。
- Public Error Model。
- Fluent API、Builder 与推断体验。
- `exports`、`types`、Declaration 发布。
- ESM / CommonJS Consumer Matrix。
- 类型变化与 SemVer。
- Positive / Negative Type Test。

### 1.4 与其他 Module 的边界

- 包管理器和 Bundler 深入由 Stage 16。
- 完整 API Contract 生成由 08.11。
- 组织级发布平台由 Stage 28。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 只导出消费者真正需要的类型。
- 提供清晰配置、结果和错误类型。
- 发布可解析的 Declaration。
- 编写正向和负向类型测试。

**Should**

- 设计可取消异步 API 和生命周期。
- 保持推断友好而不过度暴露泛型。
- 验证 ESM / CJS / JS / TS Consumer。
- 判断类型变更是否 Breaking。

**Expert**

- 设计插件扩展和长期兼容策略。
- 控制公共类型依赖和声明泄漏。
- 制定 API Review、Deprecation 和 SemVer 规则。

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
| KP130 | Public Type Surface 与最小导出原则 | Must | ARCHITECTURE-LAB | ⏳ |
| KP131 | Configuration API 与判别式配置 | Must / Should | BUILD-LAB | ⏳ |
| KP132 | Typed Event、Listener 与生命周期 | Must / Should | BUILD-LAB | ⏳ |
| KP133 | Plugin Extension Point 与泛型扩展 | Should / Expert | BUILD-LAB | ⏳ |
| KP134 | Branded ID 与领域不变量 | Should | BUILD-LAB | ⏳ |
| KP135 | Async、AbortSignal 与可取消 SDK API | Must / Should | FAILURE-LAB | ⏳ |
| KP136 | 公共 Error Model 与错误兼容 | Should | BUILD-LAB | ⏳ |
| KP137 | Fluent API、Builder 与推断体验 | Should / Expert | BUILD-LAB | ⏳ |
| KP138 | exports、types 与声明文件发布 | Must / Should | BUILD-LAB | ⏳ |
| KP139 | ESM、CommonJS 与 Consumer Compatibility Matrix | Should / Expert | FAILURE-LAB | ⏳ |
| KP140 | 类型变化如何影响 Semantic Versioning | Expert | ARCHITECTURE-LAB | ⏳ |
| KP141 | Module Project：Public Typed SDK & Type Tests | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP130～KP137 围绕一个内部客户端逐步收敛公共 API；KP138～KP141 建立真实包和多 Consumer 验证。

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

- 生成 `.d.ts` Surface Diff
- Type Test
- JS / TS Consumer 构建
- Abort / Error Runtime 行为
- API Extract / Review 记录
- SemVer 变化案例

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 导出整个内部 `types.ts`
- 公共 API 泄漏生成器内部类型
- 泛型默认值变化破坏推断
- 返回类型看似扩大却破坏 Exhaustive Consumer
- CJS 类型能找但 Runtime 入口错
- 用 `@ts-ignore` 掩盖 Consumer 失败

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
Public Typed SDK
```

### 项目任务

发布可被 TypeScript、JavaScript、ESM 和 CommonJS 消费的 SDK，包含可取消请求、事件、插件、错误模型、声明和类型测试。

### 必交产物

1. SDK 包
2. Consumer Fixtures
3. Public API Report
4. Type Test
5. SemVer Casebook
6. 发布 Runbook

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

后续 Framework Adapter 和平台包只围绕该公共 Surface 扩展，不允许消费者跨越入口引用内部源码。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能最小化公共导出。
- 能设计推断友好的配置和结果。
- 能发布并验证声明。
- 能覆盖多 Consumer 矩阵。
- 能判断类型 Breaking Change。
- 完成 Public Typed SDK。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
