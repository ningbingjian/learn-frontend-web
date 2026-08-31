# TS-KP097：复杂状态机中的判别联合

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 把多个业务状态建模成 Discriminated Union，而不是“一个大对象 + 一堆可选字段”。
2. 理解 State Union 与 Event Union 分别负责描述“状态形状”和“事件形状”。
3. 使用 `status` / `type` 这样的字面量字段驱动 Narrowing。
4. 编写 `transition(state, event)` 集中管理状态转移规则。
5. 在不同状态分支中直接访问当前状态独有字段，而不依赖非空断言。
6. 使用 `never` 对 State Union 与 Event Union 做穷尽检查。
7. 理解“状态结构合法”和“状态转移合法”是两个不同层次的问题。
8. 理解 TypeScript 类型系统不会自动执行状态机，也不会替代运行时业务逻辑。

> **本节核心代码**：`CheckoutState`、`CheckoutEvent`、`transition()`、`describeState()` 与 `assertNever()`。
>
> **实验辅助代码**：底部依次发送 SUBMIT / REJECT / RETRY / RESOLVE / RESET 事件，只用于观察状态机转移结果。

## 理论讲解

### 1. 为什么复杂业务状态不能只靠一堆 optional 字段

很多代码一开始会这样设计：

```ts
type CheckoutState = {
  status: 'idle' | 'submitting' | 'success' | 'failed';
  orderId?: string;
  receiptId?: string;
  error?: string;
  attempt?: number;
};
```

看起来字段齐全，但它允许大量业务上根本不应该出现的对象：

```ts
const impossible: CheckoutState = {
  status: 'success',
  error: 'timeout'
};
```

类型系统没有办法知道：

```text
success 状态必须有 receiptId
failed 状态必须有 error
submitting 状态必须有 attempt
idle 状态不应该携带这些业务字段
```

问题不在于 optional 本身，而在于：

```text
一个对象类型
无法准确表达
多个互斥状态各自不同的数据约束
```

### 2. 用 Discriminated Union 建模每个状态

更精确的方式是让每个状态成为独立成员：

```ts
type CheckoutState =
  | { status: 'idle' }
  | { status: 'submitting'; orderId: string; attempt: number }
  | { status: 'success'; orderId: string; receiptId: string }
  | { status: 'failed'; orderId: string; error: string; attempt: number };
```

现在：

```text
status = idle
→ 只需要 idle 的字段

status = submitting
→ 必须有 orderId + attempt

status = success
→ 必须有 orderId + receiptId

status = failed
→ 必须有 orderId + error + attempt
```

这就是“让类型结构对应真实业务状态”。

### 3. `status` 是 State Union 的 discriminant

四个成员都有：

```ts
status
```

但值分别是：

```text
'idle'
'submitting'
'success'
'failed'
```

因此：

```ts
switch (state.status) {
  case 'success':
    // state 已经是 success member
}
```

在 `success` 分支里可以直接：

```ts
state.receiptId
```

不需要：

```ts
state.receiptId!
```

也不需要到处写：

```ts
if (state.receiptId !== undefined)
```

因为类型本身已经表达了正确的不变量。

### 4. 状态机不仅有 State，还需要 Event

状态变化通常由事件触发。

例如结账流程可能收到：

```text
SUBMIT
RESOLVE
REJECT
RETRY
RESET
```

因此事件也适合使用 Discriminated Union：

```ts
type CheckoutEvent =
  | { type: 'SUBMIT'; orderId: string }
  | { type: 'RESOLVE'; receiptId: string }
  | { type: 'REJECT'; error: string }
  | { type: 'RETRY' }
  | { type: 'RESET' };
```

这里：

```text
type
```

就是 Event Union 的 discriminant。

### 5. State Union 与 Event Union 解决的是两个不同问题

```text
CheckoutState
→ 当前系统可能处于哪些合法状态？

CheckoutEvent
→ 系统可能收到哪些合法事件？
```

它们并不自动回答：

```text
某一个事件
在当前这个状态下
是否允许发生？
```

例如：

```text
idle + RESOLVE
```

事件本身合法，状态本身也合法，但这个组合不是合理的业务转移。

因此还需要：

```ts
transition(state, event)
```

集中定义状态转移规则。

### 6. `transition()` 是状态机真正的业务核心

本节最终案例中：

```text
idle + SUBMIT
→ submitting

submitting + RESOLVE
→ success

submitting + REJECT
→ failed

failed + RETRY
→ submitting

任意状态 + RESET
→ idle
```

其它不支持的状态-事件组合采用当前案例的策略：

```text
保持原状态
```

这只是本案例的业务策略。

真实项目也可能选择：

```text
抛错
记录日志
上报监控
返回 Result
显式建模 invalid transition
```

### 7. 为什么 RETRY 可以直接读取 failed 状态字段

事件分支：

```ts
case 'RETRY':
```

还不足以知道当前 state 是 failed。

所以继续判断：

```ts
if (state.status !== 'failed') {
  return state;
}
```

经过这个 Early Return 后，剩余路径中：

```text
state → failed member
```

因此可以直接访问：

```ts
state.orderId
state.attempt
```

并构造：

```ts
{
  status: 'submitting',
  orderId: state.orderId,
  attempt: state.attempt + 1
}
```

这正是 Chapter 06 前面学习的 Control Flow Analysis 在综合业务中的真实应用。

### 8. 状态字段应该属于真正需要它的成员

例如：

```text
attempt
```

只存在于：

```text
submitting
failed
```

因为成功后并不需要用 attempt 表示 success 的业务含义。

同理：

```text
receiptId
```

只属于 success。

```text
error
```

只属于 failed。

这比所有字段都 optional 更能表达领域不变量。

### 9. `never` 同时保护 State 与 Event

本节使用：

```ts
function assertNever(value: never): never {
  throw new Error(...);
}
```

在事件 switch 结尾：

```ts
default:
  return assertNever(event);
```

如果以后给 `CheckoutEvent` 新增：

```ts
{ type: 'CANCEL' }
```

却忘记处理 `CANCEL`，那么 default 中的 `event` 不再是 `never`，编译会报错。

同样：

```ts
default:
  return assertNever(state);
```

可以保护 `CheckoutState` 的展示逻辑。

### 10. Exhaustiveness Checking 为什么适合状态机

状态机非常容易随业务扩展：

```text
idle
submitting
success
failed
↓
以后增加 canceled / expired / confirming
```

如果使用普通字符串和大量 `if`，新增状态后很容易漏掉：

```text
UI 展示
日志格式
状态迁移
埋点
按钮权限
```

Discriminated Union + `never` 的价值就在于：

```text
新增状态
        ↓
旧 switch 不再 exhaustive
        ↓
编译器提醒你补齐相关逻辑
```

### 11. 类型安全不等于“自动得到合法状态机”

必须建立一个非常重要的边界：

本节的：

```ts
CheckoutState
CheckoutEvent
```

可以阻止很多错误形状，例如：

```ts
// success 却没有 receiptId
// failed 却没有 error
// RETRY 却携带不存在的字段
```

但是当前非泛型设计并没有让类型系统在调用点直接禁止：

```ts
transition(
  { status: 'idle' },
  { type: 'RESOLVE', receiptId: 'R-1' }
);
```

因为：

```text
idle 是合法 CheckoutState
RESOLVE 是合法 CheckoutEvent
```

“这两个不能组合”属于更高一层的转移约束。

本节通过 `transition()` 的运行时业务规则处理它。

以后学习高级泛型、映射类型等能力后，可以进一步把部分状态-事件约束提升到类型层，但不应该为了追求技巧把基础状态机设计复杂化。

### 12. 状态机类型不会产生运行时框架

TypeScript 编译后：

```text
CheckoutState
CheckoutEvent
```

都会被擦除。

真正运行的是 JavaScript 中的：

```text
对象
switch
if
函数调用
```

所以本节不是在实现一个状态机框架，而是在学习：

```text
如何用 TypeScript
把状态机的业务不变量
表达得更精确、更容易维护
```

## 动手编码：从 0 到 1

### 第 1 步：创建状态 Union

创建：

```text
kp097-state-machine-discriminated-union/src/main.ts
```

先写：

```ts
type CheckoutState =
  | { status: 'idle' }
  | { status: 'submitting'; orderId: string; attempt: number }
  | { status: 'success'; orderId: string; receiptId: string }
  | { status: 'failed'; orderId: string; error: string; attempt: number };
```

本步目标：让每个状态只携带自己真正需要的数据。

### 第 2 步：创建事件 Union

加入：

```ts
type CheckoutEvent =
  | { type: 'SUBMIT'; orderId: string }
  | { type: 'RESOLVE'; receiptId: string }
  | { type: 'REJECT'; error: string }
  | { type: 'RETRY' }
  | { type: 'RESET' };
```

现在：

```text
state.status
```

负责区分状态，

```text
event.type
```

负责区分事件。

### 第 3 步：准备穷尽检查工具

加入：

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
```

这会在后续两个 `switch` 中保护 Union 的完整性。

### 第 4 步：创建 transition 函数

先写函数外壳：

```ts
function transition(
  state: CheckoutState,
  event: CheckoutEvent
): CheckoutState {
  switch (event.type) {
    // ...
  }
}
```

本步把所有状态变化集中到一个明确入口。

### 第 5 步：处理 SUBMIT

加入：

```ts
case 'SUBMIT':
  if (state.status !== 'idle') {
    return state;
  }

  return {
    status: 'submitting',
    orderId: event.orderId,
    attempt: 1
  };
```

这里同时发生两次 Narrowing：

```text
event.type === SUBMIT
→ event 拥有 orderId

state.status === idle
→ 当前允许创建 submitting 状态
```

### 第 6 步：处理成功和失败

成功：

```ts
case 'RESOLVE':
  if (state.status !== 'submitting') {
    return state;
  }

  return {
    status: 'success',
    orderId: state.orderId,
    receiptId: event.receiptId
  };
```

失败：

```ts
case 'REJECT':
  if (state.status !== 'submitting') {
    return state;
  }

  return {
    status: 'failed',
    orderId: state.orderId,
    error: event.error,
    attempt: state.attempt
  };
```

### 第 7 步：实现 RETRY

加入：

```ts
case 'RETRY':
  if (state.status !== 'failed') {
    return state;
  }

  return {
    status: 'submitting',
    orderId: state.orderId,
    attempt: state.attempt + 1
  };
```

这里体现了状态机的数据连续性：

```text
failed.orderId
→ retry 后仍然保留

failed.attempt
→ retry 后 +1
```

### 第 8 步：实现 RESET 和 Event Exhaustiveness

加入：

```ts
case 'RESET':
  return { status: 'idle' };

default:
  return assertNever(event);
```

### 第 9 步：实现状态展示函数

创建：

```ts
function describeState(state: CheckoutState): string {
  switch (state.status) {
    // ...
  }
}
```

分别返回：

```text
Idle
Submitting:...
Success:...
Failed:...
```

并在 default 中：

```ts
return assertNever(state);
```

这样 State Union 也获得穷尽保护。

### 第 10 步：运行完整状态序列

从：

```ts
let state: CheckoutState = { status: 'idle' };
```

开始，依次发送：

```text
SUBMIT
REJECT
RETRY
RESOLVE
RESET
```

得到完整流程：

```text
idle
→ submitting(attempt 1)
→ failed
→ submitting(attempt 2)
→ success
→ idle
```

### 第 11 步：添加 tsconfig

创建：

```text
kp097-state-machine-discriminated-union/tsconfig.json
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

**本节核心代码**：State Union、Event Union、`transition()`、两层 Discriminant Narrowing 与 `assertNever()`。

**实验辅助代码**：底部状态序列和 `console.log()` 只负责展示一次失败、重试、成功、重置流程。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp097-state-machine-discriminated-union/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp097-state-machine-discriminated-union/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp097-state-machine-discriminated-union/dist/main.js
```

预期输出：

```text
Idle
Submitting:O-1001:attempt=1
Failed:O-1001:attempt=1:payment timeout
Submitting:O-1001:attempt=2
Success:O-1001:R-9001
Idle
```

## 效果验证

完成本节后，应该能够回答：

1. 为什么复杂状态不应该简单设计成一个对象加大量 optional 字段？
2. State Union 和 Event Union 分别解决什么问题？
3. `status` 和 `type` 为什么适合作为 discriminant？
4. 为什么 success 分支可以直接读取 `receiptId`？
5. 为什么 RETRY 分支可以在检查 failed 后直接读取 `attempt`？
6. `transition()` 在状态机中承担什么职责？
7. 为什么合法 State + 合法 Event 不代表这个状态-事件组合一定是合法转移？
8. `assertNever(event)` 和 `assertNever(state)` 分别保护什么？
9. 新增 `CANCEL` 事件但忘记处理时，为什么 `never` 可以让编译器报错？
10. TypeScript 的 Discriminated Union 是否会在运行时自动生成状态机？
11. 本节如何综合使用 Literal Union、Discriminated Union、Control Flow Analysis 和 Exhaustiveness Checking？
