# TS-KP004：类型安全不是运行时数据校验

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP002～003：Static / Runtime Boundary 与 Type Erasure |
| 本课主问题 | 为什么 `const user: User = JSON.parse(...)` 看起来类型正确，运行时仍然会崩？ |
| Learning Artifact | 同一份 JSON 的 Unsafe / Safe 对照实验 |
| 本课暂时不用理解 | Zod / Valibot 等 Schema 库、自定义 Type Predicate 完整语法 |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. TypeScript Type 只能描述静态期相信的结构，不能自动检查网络 / JSON 的真实内容。
2. 外部数据从 `unknown` 开始更诚实，因为它迫使代码建立运行时证据。
3. Runtime Guard 的职责是检查真实值，而不是“让编译器闭眼相信”。

## 前置状态

定义业务类型：

```ts
type User = {
  id: number;
  name: string;
};
```

外部 JSON 却是：

```json
{"id":"not-a-number","name":"Ada"}
```

`id` 的真实值是 string。

## 本课主问题

为什么这行代码可能通过静态检查：

```ts
const unsafeUser: User = JSON.parse(rawJson);
```

但运行：

```ts
unsafeUser.id.toFixed(0)
```

却报错？

## 先预测

先回答：

```text
1. 写了 : User 会不会改写 rawJson？
2. JSON.parse 会不会根据 User 自动把 id 转成 number？
3. 如果先把结果放进 unknown，能不能直接访问 .id？
```

## 动手编码：从 0 到 1

### Step 0：先保留错误 JSON

```ts
const rawJson = '{"id":"not-a-number","name":"Ada"}';
```

这是故障输入，是本课最重要的实验材料。

---

### Step 1：先写一个“看起来很类型安全”的危险版本

```ts
const unsafeUser: User = JSON.parse(rawJson);
```

然后调用：

```ts
unsafeUser.id.toFixed(0);
```

静态检查可以通过。

现在真正运行。

实际输出包含：

```text
unsafe runtime error: unsafeUser.id.toFixed is not a function
```

### 立即解释

`: User` 没有执行任何 JSON 校验或类型转换。

真正的 Runtime Value 仍然是：

```text
id = "not-a-number"
```

---

### Step 2：把外部输入改成 `unknown` 边界

最终源码继续解析同一份 JSON：

```ts
const candidate: unknown = JSON.parse(rawJson);
```

现在 TypeScript 不允许直接假设：

```ts
candidate.id
```

因为 `unknown` 表达的是：**我现在还没有足够证据知道这个值是什么。**

---

### Step 3：一条一条建立 Runtime Evidence

当前源码检查：

```ts
typeof candidate === 'object'
candidate !== null
'id' in candidate
'name' in candidate
typeof candidate.id === 'number'
typeof candidate.name === 'string'
```

只有这些真实条件都成立，才进入安全分支。

对于当前错误 JSON，实际输出：

```text
runtime validation rejected invalid user
```

这次程序没有假装 `id` 是 number。

---

### Step 4：把 Unsafe / Safe 链路并排

```text
Unsafe
JSON
 ↓
JSON.parse
 ↓
直接相信 User
 ↓
运行时调用 number API
 ↓
崩溃

Safer Boundary
JSON
 ↓
JSON.parse
 ↓
unknown
 ↓
Runtime Checks
 ↓
通过后才使用业务能力
```

## 图解与心智模型

```text
Type Definition
User { id: number }
      │
      │ 只描述静态契约
      X
不会自动验证网络 / JSON
      │
External Value
      ↓
Runtime Validation
      ↓
可信的业务值
```

## 理论收束

### 一句话

> Static Type Safety 保护编译器能够证明的类型关系；Runtime Validation 负责证明外部真实数据是否满足业务结构。

### 代码变化 → 理论

| 代码 / 观察 | 对应理论 |
|---|---|
| `: User` 但运行时仍是 string id | Type Annotation 不做 Runtime Validation |
| `candidate: unknown` | Untrusted Boundary |
| `typeof` / `in` 检查 | Runtime Evidence + Narrowing |
| 错误输入被拒绝 | Runtime Validation |

## Wrong Way 与边界

### Wrong Way 1：`JSON.parse(...) as User`

这只是让编译器采用你的断言，不会校验 JSON。

### Wrong Way 2：到处使用 `any`

`any` 会让不可信数据静默穿过类型系统，风险更晚暴露。

### 边界

手写 Guard 适合本课理解机制；真实大型 Payload 更适合使用成熟 Schema Validation 工具并配合测试。

## Production Boundary

生产外部边界通常包括：

- HTTP Response；
- WebSocket / SSE Message；
- localStorage / IndexedDB；
- 环境变量；
- URL / Form Data；
- 第三方 SDK。

这些地方应该明确设计 Runtime Validation，而不是依赖 `interface` 或 `type` 自动生效。

## 本课只记住 3 件事

1. **Type Definition 不是 Runtime Validator。**
2. **外部数据从 `unknown` 开始通常比 `any` / 断言更诚实。**
3. **只有真实 Runtime Evidence 才能证明外部值满足结构。**

## Challenge

把 `rawJson` 改成：

```json
{"id":101,"name":123}
```

先预测当前 Guard 会在哪个条件拒绝它，再运行验证。

然后再改成：

```json
{"id":101,"name":"Ada"}
```

验证安全分支能够输出合法 User。

## Mastery Check

### Must

- 能解释为什么 `: User` 不会校验 JSON。
- 能说明 `unknown` 为什么适合作为外部边界。

### Should

- 能手写当前案例的最小 Runtime Guard。
- 能区分 Type Assertion、Type Annotation、Runtime Validation。

### Expert

- 能在 API / Storage / Config 架构中明确规划 Static Contract 与 Runtime Schema 的职责分工。

## 最终源码与代码边界

- **本节核心代码**：`unknown` + Runtime Checks 对不可信 JSON 建立证据。
- **实验辅助代码**：错误 JSON、Unsafe 分支和 `try/catch` 用于证明“错误做法为什么危险”。
- **最终源码**：[`src/main.ts`](./src/main.ts)
