# Module 08.11：API Contract、OpenAPI、GraphQL 与代码生成

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：11  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何把 HTTP、GraphQL、SSE、WebSocket 和事件契约变成可生成、可验证、可测试、可兼容演进的 TypeScript 客户端边界？

### 1.2 为什么必须现在学习

有了模块、构建和 Runtime Validation 后，才适合把类型与外部契约连接。否则 Codegen 只会生成大量未经理解、未经验证的 DTO。

### 1.3 本 Module 完整拥有

- Contract-first 与 Code-first。
- OpenAPI Schema、Request、Response、Component。
- TypeScript Model / Client Codegen。
- 生成类型与 Runtime Validation 的组合。
- Transport、Protocol、Domain Error 分层。
- Pagination、Filter、Sort 与 Query Type。
- API Versioning 与向后兼容。
- GraphQL Typed Document、Fragment 与 Variable。
- Typed RPC 的信任边界。
- SSE、WebSocket 与 Event Contract。
- Codegen Version、Determinism、Diff 与 Governance。

### 1.4 与其他 Module 的边界

- HTTP 协议完整体系由 Stage 10。
- 后端 API 设计由后端课程。
- SDK 公共发布由 08.12。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 能读取 OpenAPI / GraphQL Contract。
- 能生成并消费 DTO / Client。
- 能区分生成类型与运行时验证。
- 能建模 Request、Response 和错误。

**Should**

- 处理分页、过滤、版本和事件流。
- 在 CI 中检测 Contract Diff。
- 隔离 Transport DTO 与 Domain。
- 锁定生成器版本和产物。

**Expert**

- 设计组织级 Contract Ownership 和兼容策略。
- 评估 OpenAPI、GraphQL、Typed RPC 的约束与退出策略。
- 治理生成代码规模、Review 噪声和供应链风险。

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
| KP119 | Contract-first 与 Code-first 如何选择 | Must / Should | ARCHITECTURE-LAB | ⏳ |
| KP120 | OpenAPI Schema、Request、Response 与组件复用 | Must | BUILD-LAB | ⏳ |
| KP121 | 从契约生成 TypeScript Model 与 Client | Must / Should | BUILD-LAB | ⏳ |
| KP122 | 生成类型与运行时校验如何组合 | Should | FAILURE-LAB | ⏳ |
| KP123 | Transport、Protocol 与 Domain Error | Must / Should | BUILD-LAB | ⏳ |
| KP124 | Pagination、Filter、Sort 与 Query 类型 | Must | BUILD-LAB | ⏳ |
| KP125 | API Versioning 与向后兼容 | Should / Expert | FAILURE-LAB | ⏳ |
| KP126 | GraphQL Typed Document、Fragment 与变量 | Should | BUILD-LAB | ⏳ |
| KP127 | Typed RPC 的便利与信任边界 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP128 | SSE、WebSocket 与 Event Contract | Should | NETWORK-LAB | ⏳ |
| KP129 | Module Project：Codegen Governance & Compatibility | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

前四课围绕一份小型 OpenAPI；KP123～KP128 扩展同一业务；KP129 从契约 Breaking Change 基线开始。

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

- 生成前后 Git Diff
- Contract Compatibility Report
- Runtime Invalid Response
- HTTP / GraphQL / Event 类型测试
- 生成器版本锁
- Domain Adapter 测试

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 把 Generated DTO 直接当 Domain
- 后端删字段但前端缓存旧生成物
- 生成器升级导致大面积无语义 Diff
- 只生成类型不验证真实响应
- 所有错误都变成 `Error`
- 事件版本无法兼容旧 Consumer

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
Contract Generated Client
```

### 项目任务

从 OpenAPI 与 Event Contract 生成 DTO / Client，加入 Runtime Schema、Error Mapping、Domain Adapter 和 Compatibility Gate。

### 必交产物

1. 契约文件
2. 可重复 Codegen
3. 生成产物
4. Runtime Validator
5. Compatibility CI
6. 契约治理 ADR

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

08.12 在生成客户端外建立稳定公共 SDK；业务页面不得直接依赖生成目录内部细节。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能选择 Contract-first 或 Code-first。
- 能建立可重复 Codegen。
- 能让生成类型与 Runtime 验证协作。
- 能检测 Breaking Change。
- 能隔离 Transport Error 与 Domain Error。
- 完成 Contract Generated Client。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
