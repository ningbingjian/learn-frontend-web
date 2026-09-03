# Module 08.13：JavaScript 到 TypeScript 渐进迁移

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：10  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何在不中断业务交付、不一次性制造海量红线的前提下，按风险和边界逐步把 JavaScript 系统迁移到 strict TypeScript？

### 1.2 为什么必须现在学习

真实架构工作往往不是新建 greenfield 项目，而是迁移已有 JavaScript、CommonJS、全局变量和无类型插件。迁移必须建立顺序、指标、预算和退出策略。

### 1.3 本 Module 完整拥有

- 迁移前代码、构建、依赖与风险清单。
- `// @ts-check`、`checkJs` 与 JSDoc。
- `allowJs` 与逐文件迁移。
- Boundary-first Migration。
- Any Budget、Assertion Budget 与债务登记。
- 第三方 Shim 和 Anti-corruption Layer。
- `strict`、Nullability、Optional 分阶段开启。
- CommonJS → ESM 类型迁移。
- Codemod、CI Gate 与迁移指标。
- TypeScript 6 → 7 和旧配置迁移。

### 1.4 与其他 Module 的边界

- 通用 Codemod 平台由 Stage 16。
- 组织级大迁移治理由 Stage 28。
- 框架迁移由对应 Framework Stage。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 先建立可重复构建和回归基线。
- 使用 `checkJs` / `allowJs` 渐进引入检查。
- 从系统边界和叶子模块迁移。
- 记录而不是隐藏暂时保留的 `any`。

**Should**

- 分阶段开启 strict 选项。
- 隔离无类型第三方依赖。
- 建立 CI Type Gate 和迁移指标。
- 迁移 CommonJS / ESM 而不破坏 Runtime。

**Expert**

- 制定风险分层、并行开发和回滚策略。
- 使用 Codemod 处理机械变化，并保留人工语义审查。
- 规划 TypeScript 6 → 7 工具兼容和旧配置清理。

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
| KP142 | 迁移前如何建立代码、构建与风险清单 | Must | ARCHITECTURE-LAB | ⏳ |
| KP143 | // @ts-check、checkJs 与 JSDoc 类型 | Must | BUILD-LAB | ⏳ |
| KP144 | allowJs 与逐文件迁移 | Must | BUILD-LAB | ⏳ |
| KP145 | Boundary-first Migration | Must / Should | ARCHITECTURE-LAB | ⏳ |
| KP146 | Any Budget、Assertion Budget 与债务登记 | Should | FAILURE-LAB | ⏳ |
| KP147 | 第三方声明、Shim 与隔离层 | Should | BUILD-LAB | ⏳ |
| KP148 | strict、Nullability 与 Optional 分阶段开启 | Should | FAILURE-LAB | ⏳ |
| KP149 | CommonJS 到 ESM 的类型迁移 | Should / Expert | FAILURE-LAB | ⏳ |
| KP150 | Codemod、CI Gate 与迁移指标 | Should / Expert | PROJECT-LAB | ⏳ |
| KP151 | Module Project：Legacy Dashboard TS6 → TS7 Migration | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

全部课程围绕一套故意包含历史问题的 Legacy Dashboard 演进，但每课保存独立快照、基线命令和回滚点。

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

- 迁移前后 Type Error 数量
- `any` / Assertion 预算
- 构建和测试基线
- 模块图
- CI Gate
- TS6 / TS7 配置差异
- 回滚演练

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 批量把 `.js` 改成 `.ts`
- 先迁移最复杂中心模块
- 用 `any` 消除所有红线却不登记
- 同时改模块系统、业务逻辑和类型
- 升级编译器但忽略工具 API 依赖
- 迁移指标只看文件数量

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
Legacy Dashboard Migration
```

### 项目任务

迁移一个带全局变量、CommonJS、无类型插件、不可信 JSON 和旧 tsconfig 的控制台，最终通过 strict TypeScript 7。

### 必交产物

1. 风险清单
2. 阶段计划
3. 迁移提交序列
4. 债务台账
5. CI Gate
6. 回滚方案
7. 复盘报告

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

Stage 13、27、28 的框架和组织迁移会直接复用这套渐进策略，不再重复 JavaScript → TypeScript 基础。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能建立迁移基线和风险分层。
- 能使用 checkJs / JSDoc 过渡。
- 能控制 `any` 与 Assertion 债务。
- 能分阶段开启 strict。
- 能保持 Runtime 模块语义。
- 完成 Legacy Dashboard Migration 与回滚演练。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
