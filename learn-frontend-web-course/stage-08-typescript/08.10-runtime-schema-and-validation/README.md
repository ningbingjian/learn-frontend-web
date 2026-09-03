# Module 08.10：Runtime Schema 与 Validation

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：11  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何把来自网络、存储、消息和用户输入的不可信值转换为经过运行时证明的 DTO，并在错误路径、转换、性能和 Bundle 成本之间做取舍？

### 1.2 为什么必须现在学习

静态类型只能检查我们写下的程序，不能证明外部数据。完成 Compiler 与基础类型后，必须正式建立数据防火墙，否则 API Contract 和 SDK 只会提供虚假安全。

### 1.3 本 Module 完整拥有

- `unknown` Boundary 与手写 Type Guard。
- Schema 的 Primitive、Object、Array、Optional、Nullable。
- Default、Coercion、Refinement、Transform、Pipeline。
- Union、Discriminated Union Schema。
- Recursive / Lazy Schema。
- Async Validation 与外部约束。
- Validation Error Path、格式化和国际化。
- Schema 推断、手写类型与漂移。
- Bundle、执行性能和信任边界。
- External DTO → Domain Adapter。

### 1.4 与其他 Module 的边界

- 具体 Form UX 由 UI / Framework Stage。
- 完整 OpenAPI Codegen 由 08.11。
- 安全威胁建模由 Stage 25。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 所有不可信入口先用 `unknown`。
- 能手写基础 Type Guard。
- 能使用 Schema 验证对象和数组。
- 能区分 Optional、Nullable、Default 与 Coercion。

**Should**

- 设计可解释的 Validation Error。
- 使用 Transform / Refinement 而不隐藏副作用。
- 处理 Recursive 和 Async Validation。
- 隔离 DTO 与 Domain。

**Expert**

- 评估 Schema 推断、Codegen 和手写类型的一致性。
- 测量 Bundle / Runtime 成本并按信任边界部署验证。
- 制定外部数据防火墙和错误观测标准。

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
| KP108 | TypeScript 为什么无法证明 JSON.parse 的结果 | Must | FAILURE-LAB | ⏳ |
| KP109 | unknown Boundary 与手写 Type Guard | Must | BUILD-LAB | ⏳ |
| KP110 | Schema 的 Primitive、Object 与 Array | Must | BUILD-LAB | ⏳ |
| KP111 | Optional、Nullable、Default 与 Coercion | Must / Should | FAILURE-LAB | ⏳ |
| KP112 | Union 与 Discriminated Union Schema | Should | BUILD-LAB | ⏳ |
| KP113 | Refinement、Transform 与 Pipeline | Should | BUILD-LAB | ⏳ |
| KP114 | Recursive Schema 与 Lazy Definition | Should | BUILD-LAB | ⏳ |
| KP115 | Async Validation 与外部约束 | Should / Expert | FAILURE-LAB | ⏳ |
| KP116 | Validation Error Path、格式化与国际化 | Should | BUILD-LAB | ⏳ |
| KP117 | Schema 推断漂移、Bundle 与性能取舍 | Expert | PERFORMANCE-LAB | ⏳ |
| KP118 | Module Project：External Data Firewall | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP108～KP110 从手写 Guard 逐步过渡；KP111～KP117 复制同一外部消息模型；KP118 使用多个信任边界的新项目。

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

- 无验证断言导致的 Runtime 崩溃
- Validation Success / Failure
- 字段级 Error Path
- Schema 推断类型
- DTO → Domain 转换日志
- Bundle / Benchmark 数据

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 对 `JSON.parse` 直接 `as T`
- 把 Coercion 当成无损转换
- Schema Optional 与业务 Optional 不一致
- Transform 中偷偷访问外部系统
- 错误只返回“invalid”无路径
- 前后端重复验证但规则漂移

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
External Data Firewall
```

### 项目任务

统一保护 fetch、localStorage、URL、postMessage、WebSocket、环境变量和用户导入 JSON，并将通过验证的 DTO 映射为 Domain。

### 必交产物

1. 边界清单
2. Schema / Guard
3. Error Model
4. Domain Adapter
5. 性能与 Bundle 报告
6. Validation Policy

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

08.11 Contract 和 08.12 SDK 必须通过这里的数据防火墙进入 Domain；框架层不允许绕过。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能证明断言不是验证。
- 能为未知值编写 Guard 或 Schema。
- 能表达 Optional / Nullable / Coercion。
- 能输出可观测 Error Path。
- 能隔离 DTO 与 Domain。
- 完成 External Data Firewall。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
