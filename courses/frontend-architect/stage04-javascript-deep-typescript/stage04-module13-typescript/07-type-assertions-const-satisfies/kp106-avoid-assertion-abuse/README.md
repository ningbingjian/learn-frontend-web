# TS-KP106：避免滥用断言掩盖模型错误

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 识别“为了消除红线而使用 `as T`”的危险模式。
2. 理解类型断言可以掩盖真实的数据模型错误。
3. 理解外部数据为什么应该从 `unknown` 开始。
4. 使用 Type Guard 建立真实运行时证据。
5. 区分“静态信任”与“运行时验证”。
6. 建立断言使用前的排查清单。
7. 为团队代码评审建立可操作的 assertion 治理原则。

> **本节核心代码**：错误 payload 被 `as User` 掩盖，以及 `isUser()` 对同一 payload 的真实验证。
>
> **实验辅助代码**：`typeof asserted.id` 用于证明类型断言没有改变运行时数据。

## 理论讲解

### 1. 最危险的断言写法

```ts
const user = payload as User;
```

如果 `payload` 真的是 `User`，这段代码可能没有立即问题。

真正的问题是：

```text
谁证明 payload 真的是 User？
```

如果答案只是：

```text
“我觉得是”
```

那么断言就是在跳过类型系统，而不是增强类型安全。

### 2. 外部输入不是 TypeScript 类型

来自下面这些地方的数据：

- HTTP 响应。
- localStorage。
- 文件。
- 数据库驱动。
- postMessage。
- 用户表单。

运行时都只是 JavaScript 值。

TypeScript 的 `User` interface 不会自动进入网络协议或数据库内容中。

### 3. 从 `unknown` 开始更诚实

```ts
const payload: unknown = getExternalData();
```

`unknown` 的意义是：

> 当前确实不知道这个值是什么，请先建立证据。

这会迫使调用方执行：

```text
typeof
in
Array.isArray
schema validator
Type Guard
Assertion Function
```

等真实检查。

### 4. 本节故意构造错误模型

静态目标：

```ts
type User = {
  id: number;
  name: string;
};
```

实际数据：

```ts
{ id: '101', name: 'Ada' }
```

`id` 是字符串。

如果直接：

```ts
payload as User
```

TypeScript 会允许后续把 `id` 当 number 使用，但运行时它仍然是 string。

### 5. Type Guard 建立的是可执行证据

```ts
function isUser(value: unknown): value is User {
  // runtime checks
}
```

这个函数真正读取运行时值并判断：

```text
value 是对象吗？
id 真的是 number 吗？
name 真的是 string 吗？
```

只有判断通过后，才在该控制流中收窄为 `User`。

### 6. 断言治理优先级

看到断言时建议按下面顺序思考：

```text
模型能不能改准确？
  ↓
能不能用 Narrowing？
  ↓
边界是否应该做 runtime validation？
  ↓
能不能用 Type Predicate / Assertion Function？
  ↓
最后才考虑 assertion
```

## 动手编码：从 0 到 1

### 第 1 步：定义 User

```ts
type User = {
  id: number;
  name: string;
};
```

### 第 2 步：编写运行时 Type Guard

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.name === 'string';
}
```

这里对 `Record` 的局部断言只是为了读取未知对象属性，真正的 `User` 结论仍由运行时字段检查建立。

### 第 3 步：构造错误外部 payload

```ts
const unsafePayload: unknown = { id: '101', name: 'Ada' };
```

### 第 4 步：演示断言如何掩盖错误

```ts
const asserted = unsafePayload as User;
console.log(typeof asserted.id);
```

虽然静态上 `asserted.id` 是 number，但输出是：

```text
string
```

### 第 5 步：让 Type Guard 判断同一份数据

```ts
console.log(isUser(unsafePayload));
```

结果：

```text
false
```

### 第 6 步：验证正确 payload

```ts
const validPayload: unknown = { id: 101, name: 'Ada' };

if (isUser(validPayload)) {
  console.log(validPayload.name.toUpperCase());
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`unsafePayload as User` 与 `isUser()` 的对比。

**实验辅助代码**：`typeof` 和日志用于暴露运行时真实值。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp106-avoid-assertion-abuse/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp106-avoid-assertion-abuse/tsconfig.json
node ./07-type-assertions-const-satisfies/kp106-avoid-assertion-abuse/dist/main.js
```

预期：

```text
string
false
ADA
```

## 效果验证

1. 为什么 `as User` 不能证明 payload 真的是 User？
2. 为什么错误的 `id: '101'` 仍能被断言成 `number`？
3. `unknown` 为什么比 `any` 更适合作为外部边界入口？
4. Type Guard 建立了什么真实证据？
5. 哪些问题应该优先通过模型调整解决？
6. Code Review 中看到 Double Assertion / Non-null Assertion 时应该追问什么？
