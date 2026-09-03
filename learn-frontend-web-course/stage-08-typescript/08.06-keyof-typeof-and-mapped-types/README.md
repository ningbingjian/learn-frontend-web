# Module 08.06：keyof、typeof、Indexed Access 与 Mapped Type

> Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 状态：Teaching Contract 已建立，正式 Lesson 待建设  
> 计划课数：10  
> 技术基线：TypeScript 7.0.2；需要稳定 Compiler API 的实验使用 TypeScript 6 兼容路线

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 如何从运行时常量和已有类型派生新的类型，让事件、权限、配置与 Handler 保持单一事实来源，而不是手工维护多份容易漂移的声明？

### 1.2 为什么必须现在学习

基础模型、函数和结构类型已经建立。此时开始学习类型派生，可以解决真实的“声明重复”问题，而不是为了类型体操提前引入高级语法。

### 1.3 本 Module 完整拥有

- 类型位置中的 `typeof`。
- `keyof` 与属性键联合。
- Indexed Access Type。
- Mapped Type 遍历模型。
- Readonly / Optional Modifier 的增加与移除。
- Key Remapping 与 `as` 子句。
- `Partial`、`Required`、`Pick`、`Omit`、`Record` 的实现和语义。
- 从常量注册表派生 Name、Payload、Handler 与 Permission。
- Deep Utility 的递归边界和错误语义。

### 1.4 与其他 Module 的边界

- Conditional / `infer` / Template Literal 由 08.07 深入。
- Runtime Schema 派生由 08.10。
- 完整 Codegen 由 08.11。

后续 Module 可以组合应用本 Module 的能力，但不得再创建同名“高级篇”“原理篇”补前面的缺口。

### 1.5 Must / Should / Expert

**Must**

- 能使用 `typeof`、`keyof` 和 Indexed Access。
- 能阅读和编写基础 Mapped Type。
- 能理解常见 Utility Type 的语义。
- 能从一份常量数据派生键和值类型。

**Should**

- 使用 Key Remapping 生成 Handler / Getter API。
- 判断 `Partial` 是否破坏业务不变量。
- 识别 Deep Utility 对数组、函数、Map、Date 等对象的错误处理。
- 保存类型派生的正向和负向测试。

**Expert**

- 设计事件、权限、字段注册表等单一事实来源。
- 制定类型派生层次和可读性边界。
- 评估手写派生、Schema 推断和 Codegen 的 Trade-off。

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
| KP059 | typeof 如何从运行时声明派生类型 | Must | BUILD-LAB | ⏳ |
| KP060 | keyof 如何得到属性键联合 | Must | BUILD-LAB | ⏳ |
| KP061 | Indexed Access Type 与安全属性读取 | Must | BUILD-LAB | ⏳ |
| KP062 | Mapped Type 的遍历模型 | Must / Should | TYPE-MECHANISM-LAB | ⏳ |
| KP063 | +readonly、-readonly、+? 与 -? | Should | BUILD-LAB | ⏳ |
| KP064 | Key Remapping 与 as 子句 | Should | BUILD-LAB | ⏳ |
| KP065 | 从零实现 Partial、Required、Pick、Omit 与 Record | Must / Should | SOURCE-LAB | ⏳ |
| KP066 | 从常量数据派生单一事实来源 | Should | ARCHITECTURE-LAB | ⏳ |
| KP067 | Deep Utility 的递归边界与错误语义 | Should / Expert | FAILURE-LAB | ⏳ |
| KP068 | Module Project：Derived Type Registry | 全层级 | PROJECT-LAB | ⏳ |

---

## 3. 起始状态与复制链

KP059～KP065 为独立派生实验；KP066～KP068 围绕事件注册表复制演进并增加故障。

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

- Hover 的键联合和索引结果
- Utility Type 等价性测试
- Mapped Modifier 前后对照
- Key Remapping 声明文件
- 注册表新增事件后的自动联动
- Deep Utility 编译和错误信息

证据必须直接回答当前 Lesson 的主问题。Hover 截图不能替代可重复类型测试，文字结论也不能替代 Runtime 或 Compiler 输出。

---

## 6. Failure Lab

本 Module 必须主动复现并修复：

- 手工复制同一字段联合导致漂移
- 对任意 `string` 索引精确对象
- 把所有更新都写成 `Partial<T>`
- DeepPartial 错误递归函数和内建对象
- Key Remapping 生成重复键
- 派生链过长导致错误不可读

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
Derived Type Registry
```

### 项目任务

从事件定义派生 EventName、Payload、HandlerMap、Publish、Subscribe、Permission 和 Validation Hook，并验证新增事件只修改一处。

### 必交产物

1. 运行时事件注册表
2. 全部派生类型
3. 类型测试
4. 新增 / 删除事件演练
5. 派生层次 ADR

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

高级类型、API Contract 和 SDK 会复用单一事实来源原则，不再重复 `keyof` / Mapped 基础。

---

## 11. Module Definition of Done

完成本 Module 后，学习者必须：

- 能从值和类型派生键、值和新对象类型。
- 能实现并解释常见 Utility Type。
- 能判断 Modifier 对可变性和 Optional 的影响。
- 能避免无边界 Deep Utility。
- 能设计一处定义、多处自动联动的注册表。
- 完成 Derived Type Registry。

还必须通过 Mastery Check：能够在没有照抄课堂代码的情况下，解释一个新的同类问题、建立最小复现、保存证据并给出生产级决策。
