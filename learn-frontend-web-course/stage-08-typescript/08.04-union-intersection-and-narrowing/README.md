# Module 08.04：Union、Intersection 与 Control-flow Narrowing

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：11  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何使用联合类型和控制流分析表达合法业务状态、缩小不确定值，并通过穷尽检查阻止状态分支被遗漏？

### 1.2 为什么必须现在学习

真实业务不是“一个对象有很多可选字段”，而是状态随流程变化。若不先学会判别联合和 Narrowing，后续 API 错误、异步状态、Reducer 和事件模型都会产生非法组合。

### 1.3 本 Module 完整拥有

- Union 与 Intersection 的值集合心智模型。
- `typeof`、Truthiness、Equality、`in`、`instanceof` Narrowing。
- 赋值、分支、提前返回和回调中的 Control-flow Analysis。
- Discriminated Union 与合法状态建模。
- `never`、Exhaustiveness 与不可达分支。
- User-defined Type Predicate 与自动谓词推断。
- Assertion Function 与边界验证。
- Intersection 冲突和不可能类型。
- Result、Command、Event 与状态机模型。

### 1.4 与其他 Module 的边界

- Runtime Schema 的完整校验由 08.10 教学。
- Reducer / State Framework 的框架实现由 React / Vue Stage 教学。
- 分布式数据一致性由 Stage 10 / 27 教学。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 使用内置 Guard 缩小 Union。
- 使用判别字段建模状态。
- 通过 `never` 完成穷尽检查。
- 避免用大量可选字段表示互斥状态。

**Should**

- 理解 Narrowing 在赋值、异步回调和可变属性中何时失效。
- 编写 Predicate 和 Assertion Function。
- 识别 Intersection 产生的 `never` 字段。
- 用 Result Model 表达成功与失败。

**Expert**

- 把业务流程转换为可审查的状态机和事件模型。
- 设计可演进的 Discriminant、错误分类和 Command API。
- 评估类型状态机与运行时状态机的职责边界。

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
| KP036 | Union 应该建模状态，而不是堆叠可选字段 | Must | BUILD-LAB | ⏳ |
| KP037 | typeof、Truthiness 与 Equality Narrowing | Must | TYPE-MECHANISM-LAB | ⏳ |
| KP038 | in、instanceof 与属性判别 | Must | BUILD-LAB | ⏳ |
| KP039 | Control-flow Analysis、赋值与重新扩大 | Should | FAILURE-LAB | ⏳ |
| KP040 | Discriminated Union 建模业务状态 | Must / Should | BUILD-LAB | ⏳ |
| KP041 | never 与 Exhaustive Check | Must / Should | FAILURE-LAB | ⏳ |
| KP042 | User-defined Type Predicate 与自动谓词推断 | Should | BUILD-LAB | ⏳ |
| KP043 | Assertion Function 与边界验证 | Should | FAILURE-LAB | ⏳ |
| KP044 | Intersection Type 与不可能交叉类型 | Should | TYPE-MECHANISM-LAB | ⏳ |
| KP045 | Result、Command 与状态机建模 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP046 | Module Project：Order Workflow State Machine | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

前四课使用独立 Guard 实验；KP040～KP045 围绕订单流程复制演进；Module Project 从一份可选字段堆叠的坏模型开始重构。

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

- 分支内 Hover 的 Narrowed Type
- 新增 Union 分支触发的 Exhaustive Error
- 异步回调前后类型变化
- Predicate 的过滤结果
- Runtime 状态迁移日志
- 非法状态负向类型测试

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 用 Truthiness 意外排除空字符串或 0
- 异步回调中继续依赖旧 Narrowing
- 判别字段不是稳定 Literal
- 新增状态但漏改 switch
- 通过 `as never` 假装穷尽
- Intersection 合并冲突字段得到 `never`

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
Order Workflow State Machine
```

### 项目任务

将 Draft、Submitted、Reviewing、Approved、Rejected、Executing、Completed、Failed、Cancelled 建模为可审查状态，并限制每个 Command 允许的来源状态。

### 必交产物

1. 状态与事件类型
2. 迁移函数
3. 非法迁移负向测试
4. 状态图
5. 新增状态兼容演练
6. 建模 ADR

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

框架 State、Reducer、API Result、事件总线和工作流只复用判别联合与穷尽检查，不再重讲 Narrowing 基础。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能从值集合解释 Union 与 Intersection。
- 能使用内置 Guard 和自定义 Predicate。
- 能判断 Narrowing 何时会失效。
- 能用 Discriminated Union 消除非法状态组合。
- 能通过 `never` 让遗漏分支变成编译错误。
- 完成 Order Workflow State Machine 及演进演练。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
