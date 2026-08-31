# TS-KP096：`never` 与穷尽检查

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 `never` 为什么表示“这里不应该再有任何可能值”。
2. 理解 Union 在逐个分支被排除后为什么最终会收窄成 `never`。
3. 使用 `never` 对 Discriminated Union 做 Exhaustiveness Checking。
4. 写出 `assertNever(value: never): never` 辅助函数。
5. 理解新增 Union 成员时，遗漏 `switch case` 为什么会产生编译错误。
6. 区分“返回 `never` 的函数”和“穷尽收窄后变量类型为 `never`”这两个常见场景。
7. 理解穷尽检查是编译期保护，不替代外部输入的运行时校验。

> **本节核心代码**：判别联合 `PaymentState`、完整 `switch` 和 `assertNever(state)`。
>
> **实验辅助代码**：三个日志分别触发 pending、paid、failed 三个合法状态。

## 理论讲解

### 1. `never` 表示什么

`never` 描述的是：

```text
永远不会出现的值
```

例如一个函数永远抛错：

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

这个函数没有正常返回值。

在 Narrowing 场景中，`never` 还有另一个非常重要的用途：

```text
一个 Union 的所有可能成员都已经被排除
→ 剩余没有任何可能值
→ never
```

### 2. 判别联合可以逐个消除成员

本节使用：

```ts
type PaymentState =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'failed'; reason: string };
```

进入：

```ts
switch (state.status) {
```

TypeScript 会根据每个 literal discriminant 收窄：

```text
pending case → pending member
paid case    → paid member
failed case  → failed member
```

如果三种都已经处理，理论上就不应该再剩任何成员。

### 3. `default` 分支里的 state 为什么能是 never

当所有成员都被处理后：

```ts
default:
  // state → never
```

这不是说 JavaScript 运行时真的创建了一个叫 `never` 的值。

而是 TypeScript 的静态结论：

> 根据当前声明类型与前面的分支，这个路径不应该有合法值能够到达。

### 4. 用 `never` 把“应该不可能”变成编译检查

可以写：

```ts
function assertNever(value: never): never {
  throw new Error('Unexpected payment state');
}
```

然后：

```ts
default:
  return assertNever(state);
```

关键不是 `throw` 本身，而是参数要求：

```text
value: never
```

只有当 `state` 已经真的被收窄成 `never` 时，调用才合法。

### 5. 新增 Union 成员时会发生什么

假设后来业务新增：

```ts
| { status: 'refunded'; refundId: string }
```

但是忘了增加：

```ts
case 'refunded':
```

此时到 `default` 时：

```text
state 不再是 never
state 仍可能是 refunded member
```

于是：

```ts
assertNever(state)
```

会报类型错误。

这正是 Exhaustiveness Checking 的价值：

```text
业务状态新增
↓
编译器提醒所有未覆盖分支
```

### 6. 为什么比“default 随便返回字符串”更可靠

如果写：

```ts
default:
  return 'Unknown';
```

那么新增一个业务成员后，代码仍可能正常编译。

结果就是：

```text
真实业务状态被悄悄吞进 Unknown
```

而 `never` 方案会把遗漏变成显式编译错误。

对于状态机、事件类型、API Result、Reducer Action 等有限状态集合，这非常有价值。

### 7. `never` 不是 `void`

不要混淆：

```text
void
```

通常表示调用方不关心返回值，或者函数正常结束但没有有意义的值。

而：

```text
never
```

表示正常控制流根本不会得到一个值。

例如：

```ts
function logMessage(): void {
  console.log('hello');
}

function crash(): never {
  throw new Error('boom');
}
```

语义完全不同。

### 8. `never` 也来自控制流分析

上一节已经学习：

```text
TypeScript 会追踪所有可达路径
```

`never` 穷尽检查就是这个机制的自然结果。

当所有合法路径都已经通过 discriminant 分支处理掉后，剩余路径的 observed type 就变成 `never`。

因此本节并不是一个孤立技巧，而是 Chapter 06 Narrowing 主线的收束。

### 9. 穷尽检查不替代运行时验证

如果某个外部 JSON 被你错误地直接断言成：

```ts
PaymentState
```

运行时仍可能出现一个声明之外的 `status`。

所以：

```text
Exhaustiveness Checking
保护的是“静态模型中的成员是否全部处理”
```

而不是：

```text
自动验证外部输入一定属于这个模型
```

外部边界仍需要 runtime validation。

## 动手编码：从 0 到 1

### 第 1 步：创建判别联合

创建：

```text
kp096-never-exhaustiveness/src/main.ts
```

写：

```ts
type PaymentState =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'failed'; reason: string };
```

### 第 2 步：创建 assertNever

加入：

```ts
function assertNever(value: never): never {
  throw new Error('Unexpected payment state');
}
```

注意两个 `never`：

```text
参数 never → 只接受理论上不存在的剩余成员
返回 never → 函数不会正常返回
```

### 第 3 步：创建 switch

加入：

```ts
function describePayment(state: PaymentState): string {
  switch (state.status) {
    case 'pending':
      return 'Pending';
    case 'paid':
      return `Paid:${state.receiptId}`;
    case 'failed':
      return `Failed:${state.reason}`;
    default:
      return assertNever(state);
  }
}
```

### 第 4 步：观察各分支中的精确成员

在 `paid` 中可以直接访问：

```ts
state.receiptId
```

在 `failed` 中可以直接访问：

```ts
state.reason
```

因为 discriminant 已经完成收窄。

### 第 5 步：覆盖所有合法状态

加入：

```ts
console.log(describePayment({ status: 'pending' }));
console.log(describePayment({ status: 'paid', receiptId: 'R-1001' }));
console.log(describePayment({ status: 'failed', reason: 'timeout' }));
```

预期：

```text
Pending
Paid:R-1001
Failed:timeout
```

### 第 6 步：做一个“新增状态”思维实验

临时想象加入：

```ts
| { status: 'refunded'; refundId: string }
```

但不增加 `case 'refunded'`。

此时：

```ts
assertNever(state)
```

应该出现编译错误。

这就是本节真正要掌握的保护机制。

### 第 7 步：添加 tsconfig

创建：

```text
kp096-never-exhaustiveness/tsconfig.json
```

内容：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`PaymentState` 判别联合、完整 `switch`、`assertNever(state)`。

**实验辅助代码**：三个合法状态调用只是展示正常运行结果；真正的价值是未来新增成员时的编译检查。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp096-never-exhaustiveness/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp096-never-exhaustiveness/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp096-never-exhaustiveness/dist/main.js
```

预期输出：

```text
Pending
Paid:R-1001
Failed:timeout
```

## 效果验证

完成本节后，应该能回答：

1. `never` 表示什么？
2. 为什么一个 Union 被完全排除后剩余类型是 `never`？
3. `assertNever(value: never)` 为什么能做穷尽检查？
4. 新增 Union 成员但漏掉 switch case 时为什么会报错？
5. `never` 与 `void` 有什么根本区别？
6. Exhaustiveness Checking 与 Control Flow Analysis 有什么关系？
7. 为什么静态穷尽检查仍然不能替代外部输入的运行时校验？
