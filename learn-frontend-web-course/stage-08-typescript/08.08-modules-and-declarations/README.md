# Module 08.08：Module、Declaration 与第三方类型

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：12  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> JavaScript 运行时模块、TypeScript 类型空间、包导出和 `.d.ts` 声明如何保持同一事实，出现不一致时如何系统诊断和修复？

### 1.2 为什么必须现在学习

类型在单文件中正确不代表项目能构建。真实故障经常来自 ESM / CommonJS、扩展名、`exports`、声明入口和第三方包不一致，必须在进入大型构建和 SDK 发布前完整掌握。

### 1.3 本 Module 完整拥有

- Value Space、Type Space 与 JavaScript Module。
- `import type`、`export type`、`verbatimModuleSyntax`。
- ESM / CommonJS 类型互操作。
- NodeNext 与 Bundler Module Resolution。
- `package.json` `exports`、`imports` 与 Subpath Export。
- `.d.ts` 的职责和声明可执行边界。
- Ambient Declaration、Global、Namespace 与 Triple-slash。
- 无类型第三方包的 `declare module`。
- Module / Global Augmentation。
- `@types`、`typesVersions` 与 Conditional Type Entry。
- Declaration Emit、Declaration Map 与 DefinitelyTyped 工作流。
- Dual Package Hazard。

### 1.4 与其他 Module 的边界

- `tsconfig` 全面配置和 Project Reference 由 08.09。
- Library 发布矩阵和 SemVer 由 08.12。
- Bundler 内部和 Package Manager 算法由 Stage 16。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 区分值导入和类型导入。
- 能建立正确的 ESM 项目。
- 能读懂 `.d.ts`。
- 能为简单无类型模块补声明。

**Should**

- 诊断 NodeNext / Bundler Resolution 差异。
- 配置 package `exports` 与声明入口。
- 正确使用 Module Augmentation。
- 验证 Runtime 文件与声明文件一致。

**Expert**

- 设计 Dual ESM / CJS 包的类型入口和退出策略。
- 评审第三方声明是否真实描述 Runtime。
- 制定 Declaration Ownership、测试和发布规则。

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
| KP082 | JavaScript Module、Type Space 与 Value Space | Must | BUILD-LAB | ⏳ |
| KP083 | import type、export type 与 verbatimModuleSyntax | Must / Should | BUILD-LAB | ⏳ |
| KP084 | ESM、CommonJS 与类型互操作 | Must / Should | FAILURE-LAB | ⏳ |
| KP085 | NodeNext 与 Bundler Module Resolution | Should | NETWORK-LAB | ⏳ |
| KP086 | package.json exports、imports 与 Subpath Export | Should / Expert | FAILURE-LAB | ⏳ |
| KP087 | .d.ts 文件到底描述什么 | Must | DECLARATION-LAB | ⏳ |
| KP088 | Ambient Declaration、Global、Namespace 与 Triple-slash | Should | BUILD-LAB | ⏳ |
| KP089 | 为无类型第三方包编写 declare module | Must / Should | BUILD-LAB | ⏳ |
| KP090 | Module Augmentation 与 Global Augmentation | Should | FAILURE-LAB | ⏳ |
| KP091 | @types、typesVersions 与 Conditional Type Entry | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP092 | Declaration Emit、Declaration Map 与 DefinitelyTyped | Should / Expert | SOURCE-LAB | ⏳ |
| KP093 | Module Project：Dual Package Declaration Rescue | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

前七课独立模块实验；KP089～KP093 使用一个故意损坏的第三方包复制演进。

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

- `--traceResolution` 输出
- Runtime import 成功 / 失败
- Emit 后保留或移除的 import
- `.d.ts` 与实际导出对照
- Consumer 类型测试
- package exports 解析矩阵

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- IDE 能跳转但 Node 运行失败
- Runtime 有导出而声明没有
- 声明声称返回 string，Runtime 返回 object
- 类型导入被错误保留为 Runtime import
- 模块增强写成新的孤立模块
- ESM / CJS 双包加载出两个实例

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
Dual Package Declaration Rescue
```

### 项目任务

修复一个 Runtime、`exports` 和 `.d.ts` 不一致的第三方插件，补齐 Consumer 测试和 ESM / CJS 兼容矩阵。

### 必交产物

1. 修复后的包结构
2. 声明文件与 Map
3. Resolution Trace
4. Consumer Matrix
5. 发布 / 迁移 ADR

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

08.12 发布 SDK 时直接使用本 Module 的模块和声明规则；框架课程只处理框架特有构建限制。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能区分 Type Space 和 Value Space。
- 能诊断模块解析而不是盲改扩展名。
- 能编写和增强第三方声明。
- 能验证 `.d.ts` 与 Runtime 一致。
- 能设计 package exports / types 入口。
- 完成 Dual Package Declaration Rescue。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
