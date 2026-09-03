# Module 08.09：tsconfig、Compiler Pipeline 与大型构建

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：14  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何显式配置 TypeScript 的检查、模块、环境、Emit 和项目边界，并使用 TypeScript 7、Project Reference 与诊断工具管理大型构建？

### 1.2 为什么必须现在学习

单个 Lesson 的配置不能直接扩展到 Browser、Node、Library、Test 和 Monorepo。进入 Schema、Codegen 和 SDK 前，必须能够解释每个配置影响的是类型环境、模块语义、输出还是构建图。

### 1.3 本 Module 完整拥有

- `tsconfig` 查找、继承、`files`、`include`、`exclude`。
- TypeScript 7 默认值与显式配置原则。
- `strict` 家族配置。
- `target`、`lib` 与真实运行环境。
- `module`、`moduleResolution`、`rootDir`、`outDir`、`types`、`paths`。
- `noEmit`、Bundler、`isolatedModules`。
- Declaration、Declaration Map、`isolatedDeclarations`。
- `incremental`、`composite`、`.tsbuildinfo`。
- Project Reference 与 `tsc --build`。
- Watch、Editor Project 与文件监听。
- `showConfig`、`explainFiles`、`traceResolution` 和诊断工具。
- Parser、Binder、Checker、Emitter、Language Service 与 LSP 职责。
- TypeScript 7 多线程 Check / Build 与 TypeScript 6 兼容。

### 1.4 与其他 Module 的边界

- AST / Transformer 编程由 Stage 16。
- 完整 Monorepo 平台由 Stage 16 / 28。
- 组织级类型性能治理由 08.14。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 能从零写出明确的 Browser 或 Node `tsconfig`。
- 能解释 `target`、`lib`、`module`、`moduleResolution`。
- 能使用 `strict` 和安全配置。
- 能区分 Check-only 与 Emit。

**Should**

- 建立多配置继承和 Project Reference。
- 使用诊断命令解释文件为何进入项目、模块如何解析。
- 生成可消费 Declaration。
- 测量冷构建和增量构建。

**Expert**

- 利用 TypeScript 7 并行能力做受控性能实验。
- 设计大型仓库项目边界与构建图。
- 制定 TS6 / TS7 工具链兼容和升级策略。

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
| KP094 | tsconfig 查找、继承、files、include 与 exclude | Must | BUILD-LAB | ⏳ |
| KP095 | TypeScript 7 默认配置与显式配置原则 | Must / Should | FAILURE-LAB | ⏳ |
| KP096 | strict 家族配置逐项实验 | Must / Should | FAILURE-LAB | ⏳ |
| KP097 | target、lib 与真实运行环境 | Must | COMPILER-MECHANISM-LAB | ⏳ |
| KP098 | module 与 moduleResolution 组合 | Must / Should | FAILURE-LAB | ⏳ |
| KP099 | rootDir、outDir、types、typeRoots 与 paths | Should | BUILD-LAB | ⏳ |
| KP100 | noEmit、Bundler 与 isolatedModules | Should | ARCHITECTURE-LAB | ⏳ |
| KP101 | declaration、declarationMap 与 isolatedDeclarations | Should / Expert | BUILD-LAB | ⏳ |
| KP102 | incremental、composite 与 tsBuildInfo | Should | PERFORMANCE-LAB | ⏳ |
| KP103 | Project Reference 与 tsc --build | Should / Expert | BUILD-LAB | ⏳ |
| KP104 | Watch Mode、Editor Project 与文件监听 | Should | PERFORMANCE-LAB | ⏳ |
| KP105 | showConfig、explainFiles、traceResolution 与诊断 | Should / Expert | FAILURE-LAB | ⏳ |
| KP106 | Parser、Binder、Checker、Emitter、Language Service 与 LSP | Expert | SOURCE-LAB | ⏳ |
| KP107 | TypeScript 7 并行构建、TS6 兼容与性能项目 | 全层级 | PERFORMANCE-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP094～KP101 使用独立配置实验；KP102～KP107 在四包 Workspace 中复制演进并保存每次性能基线。

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

- `--showConfig`
- `--explainFiles`
- `--traceResolution`
- `.d.ts` / `.map` / `.tsbuildinfo`
- 冷构建与增量时间
- 线程参数对照
- TS6 / TS7 诊断差异

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 依赖新版默认值导致升级后语义变化
- 把 `target` 当成 Polyfill
- `paths` 让编辑器能解析但 Runtime 不能
- `include` 意外收进生成目录
- Project Reference 方向错误
- 盲目增加线程造成内存压力

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
TypeScript Configuration & Performance Lab
```

### 项目任务

建立 Browser、Node、Library、Test 四套配置和 Project Reference 图，对 TypeScript 6 / 7、冷构建、增量构建与并行参数做可重复测量。

### 必交产物

1. 配置继承树
2. Project Reference 图
3. 诊断命令记录
4. 性能数据
5. 兼容矩阵
6. 升级 Runbook

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

后续所有 Stage 08 项目直接继承这里的配置基线，不再在每个项目随意复制一份不一致 `tsconfig`。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能解释项目中每个文件为何被纳入。
- 能匹配 Runtime 与 module / lib 配置。
- 能生成和验证 Declaration。
- 能建立 Project Reference。
- 能使用 TypeScript 7 做可重复性能测量。
- 完成 Configuration & Performance Lab。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
