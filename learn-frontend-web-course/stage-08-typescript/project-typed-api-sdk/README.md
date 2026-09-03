# Stage 08 综合项目：Typed API SDK

> 所属 Stage：[Stage 08 TypeScript 完整体系](../README.md)  
> 项目状态：项目合同已建立，正式实现将在各 Module 完成后持续演进  
> 贯穿项目版本：Architect Workbench Typed Data Layer v1  
> 技术基线：TypeScript 7.0.2、Node.js 20+、npm 10+

---

## 1. 项目目的

这个项目不是为了再写一遍 TypeScript 语法，而是验证学习者能否把 Stage 08 的全部能力组合成一条可信、可发布、可演进的数据链路：

```text
外部契约
→ 生成 DTO
→ 运行时验证
→ Transport Client
→ Error Mapping
→ Domain Adapter
→ Public SDK
→ Consumer
```

最终必须证明：

1. 类型信息在编译期能够阻止非法调用。
2. 外部不可信数据在运行时能够被拒绝。
3. Runtime 实现与 `.d.ts` 声明一致。
4. 公共 API 能够在版本演进中检测 Breaking Change。
5. 大型工程的 Check、Build 与编辑器体验可被测量和治理。
6. Legacy JavaScript Consumer 可以渐进迁移，而不是一次性重写。

---

## 2. 业务背景

`Architect Workbench` 需要访问一组工作台 API：

- 用户与组织。
- Project / Workspace。
- Feature Flag。
- Notification。
- Audit Event。
- Build / Deployment Status。
- Plugin Registry。

后端并不总是完美。项目会故意提供多组响应：

```text
正常响应
缺失必填字段
多余字段
错误字段类型
nullability 变化
旧版响应
未知 enum / event
不一致错误结构
分页字段漂移
时间字段格式错误
```

SDK 不能因为生成了 TypeScript 类型就假设这些响应一定正确。

---

## 3. 强制架构

```text
packages/contracts
    OpenAPI、JSON Schema、Event Contract
            ↓
packages/generated
    自动生成 DTO 与底层 Client
            ↓
packages/schemas
    Runtime Parse / Validate
            ↓
packages/transport
    HTTP / SSE / WebSocket、重试、取消、错误归一
            ↓
packages/domain
    Brand、Entity、Value Object、Domain Error
            ↓
packages/sdk
    稳定公共 API
            ↓
consumers/typescript-app
consumers/javascript-legacy
```

依赖方向只能向下，不允许：

```text
domain → generated
sdk Consumer → generated/internal
generated → handwritten domain
schema → UI component
```

---

## 4. 推荐目录

```text
project-typed-api-sdk/
├── README.md
├── package.json
├── tsconfig.base.json
├── tsconfig.build.json
├── packages/
│   ├── contracts/
│   │   ├── openapi/
│   │   └── events/
│   ├── generated/
│   ├── schemas/
│   ├── transport/
│   ├── domain/
│   └── sdk/
├── consumers/
│   ├── typescript-app/
│   ├── javascript-legacy/
│   ├── esm-node/
│   └── commonjs-node/
├── fixtures/
│   ├── valid/
│   └── invalid/
├── type-tests/
│   ├── positive/
│   └── negative/
├── runtime-tests/
├── compatibility/
├── performance/
├── docs/
│   ├── ADR/
│   ├── API_COMPATIBILITY.md
│   ├── TYPE_POLICY.md
│   └── MIGRATION_PLAN.md
└── scripts/
```

这只是目标结构。正式建设时每个 Milestone 都必须从最小可运行状态开始，不能第一步就一次性创建所有包。

---

## 5. 14 个 Milestone

### Milestone 01：建立 strict TypeScript 7 基线

建立：

- `package.json`；
- 显式 `tsconfig`；
- Check、Build、Test、Verify；
- TypeScript 版本检查；
- 最小 Project Reference。

验收：

```text
干净环境可安装
所有包可 Check
最小 Runtime 可运行
版本和配置可追踪
```

### Milestone 02：设计 DTO、Schema、Domain 与 Public Type 边界

从一份故意混层的 `User` 类型开始，拆分：

```text
UserResponseDto
UserSchema
User
PublicUser
```

输出 Type Boundary ADR。

### Milestone 03：建立 External Data Firewall

验证 HTTP Fixture：

- 正常数据通过；
- 缺失、错误类型和错误日期被拒绝；
- Validation Error 包含字段路径；
- 无 `as User` 逃逸。

### Milestone 04：实现 Transport Client

实现：

- Request / Response；
- `AbortSignal`；
- Timeout；
- 基础重试边界；
- Transport Error；
- Protocol Error。

HTTP 韧性完整体系归 Stage 10，本项目只实现足以验证 Type Contract 的最小能力。

### Milestone 05：建立 Result 与错误模型

区分：

```text
TransportError
ProtocolError
ValidationError
AuthenticationError
PermissionError
NotFoundError
ConflictError
DomainError
```

消费者必须能够穷尽处理公开错误分类。

### Milestone 06：从 OpenAPI 生成 DTO 与 Client

要求：

- 锁定规范和生成器版本；
- 生成命令可重复；
- 生成目录不可手工修改；
- CI 能检测未提交生成差异；
- Generated Type 不直接成为 Domain。

### Milestone 07：加入 GraphQL 与 Event Contract 对照

选择一个查询和一个实时事件，比较：

- OpenAPI；
- GraphQL Typed Document；
- Event Contract；
- Typed RPC。

输出 Trade-off ADR，不要求所有方案成为生产主线。

### Milestone 08：发布公共 SDK

公共入口只导出：

- 配置；
- Client；
- 必要 DTO / Domain View；
- Error；
- Event；
- Plugin Hook。

禁止暴露内部生成目录和 Schema 实现细节。

### Milestone 09：建立 Consumer Matrix

至少验证：

```text
TypeScript + ESM
JavaScript + ESM
Node.js + CommonJS
Browser Bundler
```

每个 Consumer 都是独立 Fixture，不能只在 SDK 仓库内部 import 源码。

### Milestone 10：迁移 JavaScript Consumer

迁移路线：

```text
无检查 JavaScript
→ // @ts-check
→ JSDoc
→ allowJs
→ 边界文件转 TypeScript
→ strict Consumer
```

保留 Any / Assertion Debt 台账。

### Milestone 11：TypeScript 6 / 7 兼容与构建性能

测量：

- TypeScript 6 Check；
- TypeScript 7 Check；
- 冷构建；
- 增量构建；
- 不同 Project Reference 粒度；
- TypeScript 7 并行参数。

记录机器、版本、命令、多轮数据和结论边界。

### Milestone 12：故障注入

主动注入：

- Runtime 与声明漂移；
- package `exports` 错误；
- Generated DTO 被手工修改；
- `any` 从 Transport 扩散；
- 不安全双重断言；
- 新增事件但漏处理；
- Mega Union；
- Deep Recursive Utility；
- 循环类型依赖；
- Check 性能回退。

每个故障保留症状、证据、根因、最小修复和回归。

### Milestone 13：兼容性与迁移演练

模拟：

- 新增可选字段；
- 删除字段；
- 必填改可选；
- 可选改必填；
- `string` 改 Literal Union；
- Error Union 新增成员；
- Generic 默认值变化；
- 包入口移动。

输出：

```text
Runtime Compatibility
Compile Compatibility
Inference Compatibility
Semantic Version
Migration Action
Rollback Action
```

### Milestone 14：架构答辩

学习者必须回答：

- 为什么生成类型仍不等于可信数据？
- 为什么 DTO 不能直接成为 Domain？
- 哪些公共类型变化属于 Breaking Change？
- 为什么当前包边界这样划分？
- 高级类型复杂度预算是什么？
- Check 性能回退如何定位？
- TypeScript 7 与 TypeScript 6 为什么需要并行策略？
- Legacy Consumer 如何继续迁移？
- 当前方案的替代方案和退出策略是什么？

---

## 6. 统一命令合同

最终项目至少提供：

```bash
npm install
npm run check
npm run build
npm run test:type
npm run test:runtime
npm run test:consumers
npm run contract:generate
npm run contract:diff
npm run benchmark
npm run verify
```

命令名称可以随 Workspace 工具调整，但职责不能合并成一个无法定位问题的“万能脚本”。

---

## 7. 类型测试合同

### 正向测试

证明合法调用：

- 能得到预期精确返回类型；
- 默认泛型推断正确；
- Event Payload 与 Event Name 对应；
- Error 分支可 Narrow；
- Plugin 扩展后类型可见。

### 负向测试

使用 `@ts-expect-error` 或专用类型测试工具证明：

- 不同 Brand ID 不能互传；
- 非法配置组合不能创建；
- 未声明事件不能发布；
- 错误 Payload 不能发送；
- 内部类型不能从公共入口导入；
- 非法状态迁移不能编译；
- Breaking Consumer Fixture 确实失败。

禁止使用 `@ts-ignore` 作为最终测试。

---

## 8. Runtime 测试合同

至少覆盖：

- 正常 Fixture；
- 每个字段错误；
- 深层错误路径；
- 旧版本响应；
- 未知事件；
- Abort；
- Timeout；
- Error Mapping；
- DTO → Domain Transform；
- 声明与 Runtime Surface 一致性。

---

## 9. 性能合同

性能结论必须包含：

```text
环境
Node.js 版本
TypeScript 版本
CPU / 内存
仓库规模
命令
冷 / 热状态
运行次数
原始数据
中位数或分位数
单变量变化
结论边界
```

不接受：

> “TypeScript 7 肯定快很多，所以不用测。”

项目要测量自己的代码库，而不是引用通用宣传数据替代本地证据。

---

## 10. 安全与信任边界

本项目不把 TypeScript 当成安全边界。

以下来源必须视为不可信：

- 网络响应；
- Storage；
- Message Channel；
- Event Stream；
- 环境变量；
- Plugin；
- 用户文件；
- Legacy Consumer 传入对象。

必须通过 Runtime Validation、权限判断或隔离层获得相应证据。

---

## 11. 必交架构产物

1. `TYPE_BOUNDARY.md`：DTO、Schema、Domain、ViewModel、Public SDK 边界。
2. `TYPE_POLICY.md`：strict、Optional、Nullability、Readonly、Any、Assertion 规则。
3. `API_COMPATIBILITY.md`：变更分类和 SemVer。
4. `MODULE_RESOLUTION.md`：ESM / CJS / exports / types 矩阵。
5. `PERFORMANCE_BASELINE.md`：Check / Build / Editor 数据。
6. `MIGRATION_PLAN.md`：Legacy Consumer 迁移。
7. ADR：Codegen、Schema、Error、Package、Generic Complexity 的关键决策。
8. Failure Runbook：常见类型、模块、Runtime 和性能故障。

---

## 12. Definition of Done

项目完成必须同时满足：

- 所有正常源码通过 strict Check。
- 所有预期错误由负向类型测试保护。
- 所有外部数据入口经过 Runtime Validation。
- Generated、Schema、Domain 和 SDK 分层清楚。
- Runtime 与 `.d.ts` Surface 一致。
- Consumer Matrix 全部可独立安装和验证。
- Contract Breaking Change 可被 CI 检测。
- Public Type Change 有 SemVer 判断。
- Legacy Consumer 有可执行迁移路线。
- Check / Build 性能有基线和预算。
- 所有注入故障完成症状、根因、修复和回归。
- README、源码、命令和预期结果一致。
- 完成正式架构答辩。
