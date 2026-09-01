# TS-KP007：结构化类型系统基本直觉

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001～006 |
| 本课主问题 | `customer` 和 `service` 明明不是同一种业务对象，为什么都能传给 `HasName`？ |
| Learning Artifact | `tsc` 通过结果 + Node Console |
| 本课暂时不用理解 | Excess Property Checking、名义类型、Variance |

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

1. TypeScript 兼容性主要看值拥有什么结构。
2. 一个值可以拥有目标类型之外的更多成员。
3. “业务类名不同”不自动意味着类型不兼容。

## 前置状态

目标类型只有一个要求：

```ts
type HasName = { name: string };
```

函数只使用 `name`：

```ts
function printName(value: HasName): void {
  console.log(value.name);
}
```

## 本课主问题

下面两个对象没有共同的“类名”或显式 `implements`：

```ts
const customer = { id: 1, name: 'Ada', email: 'ada@example.com' };
const service = { name: 'Billing Service', version: 'v2' };
```

它们为什么都能调用 `printName()`？

## 先预测

先判断：

```text
printName(customer) → 通过 / 失败？
printName(service)  → 通过 / 失败？
```

再写下你判断兼容性的依据：对象名字，还是成员结构？

## 动手编码：从 0 到 1

### Step 0：只要求 `name`

写 `HasName` 和 `printName()`，运行类型检查。

### Step 1：传入 customer

`customer` 多了 `id`、`email`，但仍有：

```ts
name: string
```

`tsc` 通过，运行输出：

```text
Ada
```

### 立即解释

调用点需要的是“至少具备 `name: string` 的值”，不是“必须恰好只有 name”。

---

### Step 2：换成完全不同的 service

继续：

```ts
printName(service);
```

同样通过，输出：

```text
Billing Service
```

这时给现象命名：**Structural Typing（结构化类型）**。

---

### Step 3：主动破坏结构

Challenge 前可临时试：

```ts
const broken = { name: 123 };
printName(broken);
```

这次失败，因为真正重要的结构 `name: string` 不成立。

## 图解与心智模型

```text
HasName
└─ name: string
       ↑
       │ 只检查需要的结构
customer ─ id + name + email
service  ─ name + version
```

## 理论收束

> TypeScript 的核心兼容模型是结构化的：值只要具备目标类型要求的成员及兼容类型，就可能被接受。

| 观察 | 对应理论 |
|---|---|
| 两个业务对象都能传入 | Structural Compatibility |
| 多余成员不妨碍变量传参 | 至少满足目标结构 |
| `name: number` 被拒绝 | 成员类型必须兼容 |

## Wrong Way 与边界

- **Wrong Way：**“类名不一样，所以类型一定不一样。”这是典型名义类型直觉。
- **边界：**对象字面量直接赋值还有 Excess Property Checking 等额外规则，后续专门学习；不要把本课简化成“多余字段永远都随便”。

## Production Boundary

结构化类型让 Mock、DTO、Adapter、函数式 API 很灵活，但公共 API 仍应设计清晰最小契约，避免依赖偶然存在的字段。

## 本课只记住 3 件事

1. **兼容性主要看结构，不看业务名字。**
2. **目标需要哪些成员，调用值至少要满足这些成员。**
3. **结构化灵活性不等于完全没有边界规则。**

## Challenge

新增：

```ts
const device = { name: 'TV', online: true };
```

先预测能否传给 `printName()`，再加一个 `name: number` 的反例验证。

## Mastery Check

### Must
- 能解释 customer / service 为什么都兼容 `HasName`。
### Should
- 能区分结构化直觉与名义类型直觉。
### Expert
- 能说明结构化兼容给大型 API 设计带来的灵活性与误兼容风险。

## 最终源码与代码边界

- **核心代码**：`HasName` 与两个不同结构对象的兼容调用。
- **实验辅助代码**：Console 仅用于观察调用结果。
- **最终源码**：[`src/main.ts`](./src/main.ts)
