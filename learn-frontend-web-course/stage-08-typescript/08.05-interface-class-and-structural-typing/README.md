# Module 08.05：Interface、Class、Structural Typing 与名义化需求

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：12  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> TypeScript 的结构类型兼容如何工作，Class 的类型侧与运行时侧如何关联，以及什么时候必须通过 Brand、私有成员或封装引入名义化约束？

### 1.2 为什么必须现在学习

函数和状态已经能够建模，但大型系统还需要实体、服务、构造器、插件和扩展边界。若把 TypeScript Class 当成 Java Class，或忽略结构兼容，就会对封装和身份产生错误预期。

### 1.3 本 Module 完整拥有

- `interface` 与 `type` 的能力和边界。
- Structural Typing、Duck Typing 与 Compatibility。
- Interface Extension、Declaration Merging。
- Class Instance Side、Static Side 与 Constructor Type。
- `implements`、`extends`、Abstract Class 与 Override。
- `public`、`protected`、TypeScript `private` 与 ECMAScript `#private`。
- Parameter Property、`noImplicitOverride`。
- Generic Class、Polymorphic `this` 与 F-bounded 思想。
- Mixin、组合与多继承需求。
- 标准 Decorator、Legacy Decorator 与 Metadata 边界。
- Brand / Opaque Type 与 Domain Identity。

### 1.4 与其他 Module 的边界

- 声明文件的 Module Augmentation 在 08.08 深入。
- 公共插件 SDK 设计在 08.12 深入。
- 领域架构和 DDD 在 Stage 27 深入。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 区分 `interface`、`type`、Class 和运行时构造器。
- 理解结构相同的对象默认可兼容。
- 正确使用 `implements`、Abstract Class 与访问修饰符。
- 理解 `private` 与 `#private` 的运行时差异。

**Should**

- 设计 Constructor Type、Factory 和 Generic Class。
- 使用 Brand 防止不同领域 ID 误传。
- 选择组合、Mixin 或继承。
- 理解标准 Decorator 不等于自动产生类型 Metadata。

**Expert**

- 设计稳定的领域身份和扩展点。
- 评估结构类型给公共 API 带来的灵活性与误兼容风险。
- 制定 Class、Interface、Brand、Decorator 的团队选型规则。

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
| KP047 | interface 与 type alias 的边界 | Must | BUILD-LAB | ⏳ |
| KP048 | Structural Typing 与结构兼容 | Must / Should | FAILURE-LAB | ⏳ |
| KP049 | Interface Extension 与 Declaration Merging | Should | BUILD-LAB | ⏳ |
| KP050 | Class Instance Side 与 Static Side | Must / Should | TYPE-MECHANISM-LAB | ⏳ |
| KP051 | implements、extends 与 abstract class | Must | BUILD-LAB | ⏳ |
| KP052 | public、protected、private 与 #private | Must / Should | FAILURE-LAB | ⏳ |
| KP053 | Parameter Property、override 与 noImplicitOverride | Must / Should | BUILD-LAB | ⏳ |
| KP054 | Constructor Type 与 Abstract Construct Signature | Should | BUILD-LAB | ⏳ |
| KP055 | Generic Class、Polymorphic this 与 F-bounded 思想 | Should / Expert | BUILD-LAB | ⏳ |
| KP056 | Mixin、组合与多继承需求 | Should / Expert | ARCHITECTURE-LAB | ⏳ |
| KP057 | 标准 Decorator、Legacy Decorator 与 Metadata 边界 | Should / Expert | FAILURE-LAB | ⏳ |
| KP058 | Module Project：Domain Identity & Extension Model | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

前七课独立实验；KP054～KP057 围绕插件实体模型演进；KP058 从结构相同 ID 被误传的故障基线开始。

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

- 结构兼容的正向 / 负向类型测试
- Instance / Static Side 的声明文件
- `private` 与 `#private` 的 Emit 对照
- Override 诊断
- Brand ID 误传错误
- Decorator Runtime 日志

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 认为 `implements` 会生成运行时校验
- 把静态成员误认为实例成员
- 用 TypeScript `private` 当作真正运行时隐私
- 不同 ID 因结构相同被误传
- 复杂继承层级难以替换
- 混用 Legacy 与标准 Decorator 配置

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
Domain Identity & Extension Model
```

### 项目任务

构建带 Brand ID、实体、值对象、抽象服务、插件构造器和标准 Decorator 的最小领域模型，并验证结构兼容的边界。

### 必交产物

1. 领域模型与扩展点
2. Brand 类型测试
3. Class Emit 对照
4. Decorator 兼容说明
5. 继承 / 组合选型 ADR

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

08.12 SDK 与 Stage 27 Architecture 会直接使用这些身份和扩展模式，不再另建 Class / Interface 高级课。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能区分值空间、类型空间、实例侧和静态侧。
- 能解释结构兼容及其风险。
- 能选择 Interface、Type Alias、Class 或 Brand。
- 能比较 `private` 与 `#private`。
- 能设计可替换的 Factory / Plugin 边界。
- 完成 Domain Identity & Extension Model。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
