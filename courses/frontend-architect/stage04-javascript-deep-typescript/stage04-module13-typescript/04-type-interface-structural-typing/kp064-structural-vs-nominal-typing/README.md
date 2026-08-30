# TS-KP064：结构化类型与名义类型的区别

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 TypeScript 为什么主要采用结构化类型系统。
2. 理解“类型名字不同”并不必然导致两个对象类型不兼容。
3. 根据目标类型所要求的成员判断普通对象之间的结构兼容关系。
4. 区分 TypeScript 的结构化类型思路与 Java / C# 常见的名义类型思路。
5. 理解 class 的 `private` / `protected` 成员为什么会让兼容关系带上“声明来源”要求。
6. 正确描述 TypeScript：它默认是结构化类型系统，但并不是“任何情况下都只比较公开字段名称”。
7. 知道品牌化 / opaque type 是工程上人为制造名义区分的一类高级技巧，但本节不提前展开其实现细节。

> **本节核心代码**：`UserToken` / `OrderToken` 的结构兼容，以及 `UserId` / `OrderId` 私有成员来源导致的不兼容。
>
> **实验辅助代码**：`readOrderToken()`、相等比较和 `constructor.name` 日志只是用于观察结果。

## 理论讲解

### 1. 什么叫“结构化类型”

TypeScript 判断一个值能否赋给目标类型时，核心问题通常不是：

```text
你声明时叫什么名字？
```

而是：

```text
你有没有目标类型要求的成员？
这些成员的类型兼容吗？
```

例如：

```ts
interface UserToken {
  value: string;
}

interface OrderToken {
  value: string;
}
```

虽然：

```text
UserToken
OrderToken
```

名字完全不同，但结构都是：

```text
{
  value: string
}
```

因此它们之间可以兼容。

这种以成员结构为主要依据的类型关系，就是 Structural Typing / Structural Subtyping 的核心直觉。

### 2. 名字不同，不代表自动形成不同类型身份

在某些名义类型系统里，两个类型即使字段完全一样，只要声明身份不同，默认仍可能不是同一个类型。

例如可以建立这样的对比直觉：

```text
名义类型系统
类型身份 / 显式声明关系很重要

结构化类型系统
值拥有什么成员更重要
```

TypeScript 为了适应 JavaScript 的对象字面量、匿名对象、函数对象和第三方库生态，默认采用结构化兼容思路。

### 3. TypeScript 只要求目标结构需要的成员

例如：

```ts
interface NamedValue {
  value: string;
}

const source = {
  value: 'token-001',
  createdAt: '2026-08-29'
};

const target: NamedValue = source;
```

通常可以成立。

检查重点是：

```text
NamedValue 需要 value: string
source 有 value: string ✅
```

`createdAt` 是额外成员，不会因为普通结构赋值就自动破坏兼容。

这里要和 Chapter 03 的 fresh object literal / Excess Property Checking 区分：直接对象字面量面对目标类型时存在额外属性检查，但普通结构兼容本身仍然是结构化的。

### 4. `type` 与 `interface` 的名字都不会自动制造名义隔离

例如：

```ts
type UserCode = {
  value: string;
};

type OrderCode = {
  value: string;
};
```

或者：

```ts
interface UserCode {
  value: string;
}

interface OrderCode {
  value: string;
}
```

只要结构一致，单纯换一个名称并不会让它们自动互斥。

所以：

```text
type UserId = number
type OrderId = number
```

也不会自动获得 Java / C# 风格的强类型身份隔离。

### 5. 为什么 JavaScript 生态很适合结构化类型

JavaScript 中大量代码直接创建匿名值：

```js
const user = {
  name: 'Ada',
  age: 30
};
```

这个对象没有必须先声明：

```text
class User
implements Person
```

才能使用。

TypeScript 如果要求所有 JavaScript 对象都建立显式名义关系，会和 JavaScript 原本的使用方式冲突。

因此结构化类型非常适合表达：

```text
只要像这个结构
就能在这里使用
```

### 6. 结构化不等于“完全不看来源”

这是本节最重要的边界。

TypeScript 的 class 在大多数情况下也会按实例成员结构比较。

例如两个 class 都只有：

```ts
value: number
```

即使没有继承关系，它们也可能互相兼容。

但是如果目标 class 类型包含：

```ts
private
```

或：

```ts
protected
```

成员，规则会发生变化。

TypeScript 会要求对应私有 / 受保护成员必须来自同一个 class 声明来源。

这是一种明显的“来源敏感”兼容规则。

### 7. 两个同名 `private` 成员仍然不代表同一来源

本节最终案例声明：

```ts
class UserId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}

class OrderId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}
```

表面看：

```text
UserId
├── value: number
└── private __brand

OrderId
├── value: number
└── private __brand
```

成员名字甚至都相同。

但两个 `__brand` 分别声明在两个不同 class 中。

所以：

```ts
const userId = new UserId(101);

// const orderId: OrderId = userId;
```

应该产生类型错误。

原因不是公开 `value` 不一致，而是私有成员来源不同。

### 8. 这是不是说明 TypeScript 变成了名义类型系统

不是。

更准确的说法是：

> TypeScript 默认采用结构化类型系统，但某些语言规则会引入名义化 / 来源敏感的约束。

不要把它简化成：

```text
TypeScript = 100% 纯结构化，没有任何例外
```

也不要反过来说：

```text
有 private，所以 TypeScript 就是名义类型系统
```

主模型仍然是结构化兼容。

### 9. `private` 的主要目的不是专门做 Brand

本节为了观察兼容边界，使用：

```ts
private readonly __brand!: void;
```

它能很好地展示“声明来源影响兼容性”。

但工程中不要因此形成错误结论：

```text
以后所有 ID 都必须创建 class + private
```

这只是一个学习兼容规则的清晰实验。

真实项目中如果需要：

```text
UserId(number)
不能和
OrderId(number)
混用
```

还可能使用：

- `unique symbol` 品牌化。
- branded / opaque type 模式。
- class 封装。
- 运行时包装对象。

这些方案有不同成本，后续高级类型章节再展开。

### 10. 结构化兼容不等于运行时数据校验

即使 TypeScript 静态上认为两个结构兼容，也不表示它会在运行时：

- 检查 JSON。
- 删除多余字段。
- 自动转换对象。
- 写入类型标签。

编译以后接口和类型别名仍然会被擦除。

因此：

```text
Structural Typing
是编译期兼容规则
不是运行时 schema validator
```

### 11. 应该建立的最终判断顺序

以后看到两个类型能否互相赋值，不要只看名称。

可以按下面顺序思考：

```text
1. 目标类型需要哪些成员？
        ↓
2. 源值是否拥有兼容成员？
        ↓
3. 是否存在特殊规则？
   - private / protected
   - fresh object literal
   - 函数参数兼容
   - 其它专门规则
        ↓
4. 再判断最终 assignability
```

这比背：

```text
“长得一样就一定能赋值”
```

更准确。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp064-structural-vs-nominal-typing/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明两个名字不同但结构相同的接口

在 `src/main.ts` 写：

```ts
interface UserToken {
  value: string;
}

interface OrderToken {
  value: string;
}
```

当前两个接口名字不同，但要求完全相同。

### 第 2 步：创建只接受 `OrderToken` 的函数

继续：

```ts
function readOrderToken(token: OrderToken): string {
  return token.value;
}
```

从名字上看，它要求的是 `OrderToken`。

### 第 3 步：创建一个明确标注为 `UserToken` 的值

```ts
const userToken: UserToken = {
  value: 'token-001'
};
```

### 第 4 步：把 `UserToken` 传给 `OrderToken` 参数

加入：

```ts
console.log(`structural=${readOrderToken(userToken)}`);
```

类型检查能够通过。

为什么？

```text
OrderToken 需要 value: string
UserToken 也有 value: string
```

TypeScript 比较的是结构。

运行预期：

```text
structural=token-001
```

### 第 5 步：创建两个公开结构相同的 class

先创建：

```ts
class UserId {
  constructor(public readonly value: number) {}
}

class OrderId {
  constructor(public readonly value: number) {}
}
```

如果只有公开 `value`，这两个 class 的实例结构非常接近，TypeScript 仍然主要按结构处理。

### 第 6 步：分别加入 `private` 品牌成员

修改为：

```ts
class UserId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}

class OrderId {
  private readonly __brand!: void;

  constructor(public readonly value: number) {}
}
```

现在两个 class 都有名为 `__brand` 的 private 成员，但来源不同。

### 第 7 步：创建两个实例

```ts
const userId = new UserId(101);
const orderId = new OrderId(101);
```

它们的公开值相等：

```ts
console.log(`same-value=${userId.value === orderId.value}`);
```

预期：

```text
same-value=true
```

### 第 8 步：临时测试跨类型赋值

尝试：

```ts
// const invalidOrderId: OrderId = userId;
```

类型检查应该失败。

关键不是：

```text
value
```

而是：

```text
private __brand 的声明来源不同
```

验证后保持注释。

### 第 9 步：观察两个运行时 class 仍然真实存在

加入：

```ts
console.log(
  `classes=${userId.constructor.name}/${orderId.constructor.name}`
);
```

预期：

```text
classes=UserId/OrderId
```

注意这次 class 和前面的 interface 不同：

- interface 会被擦除。
- class 本身是 JavaScript 运行时结构。

但“private 成员影响 TypeScript assignability”仍然是静态类型规则。

### 第 10 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：相同结构 interface 的兼容，以及不同声明来源 private 成员阻止 class 实例互相赋值。
- **实验辅助代码**：日志、相等比较和 `constructor.name` 用于观察静态兼容规则与运行时值之间的区别。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp064-structural-vs-nominal-typing/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp064-structural-vs-nominal-typing/tsconfig.json
node ./04-type-interface-structural-typing/kp064-structural-vs-nominal-typing/dist/main.js
```

预期输出：

```text
structural=token-001
same-value=true
classes=UserId/OrderId
```

## 效果验证

你应该能够确认：

- TypeScript 的默认兼容模型主要比较结构，而不是类型名称。
- `UserToken` 和 `OrderToken` 名字不同，只要结构相同就可以兼容。
- 普通 `type` / `interface` 命名不会自动获得名义类型身份。
- class 大多数情况下同样参与结构化比较。
- `private` / `protected` 成员会让 class 兼容检查要求声明来源一致。
- 这种来源敏感规则是 TypeScript 结构化模型中的重要例外，而不是整个语言变成纯名义类型系统。
- branded / opaque type 可以进一步人为制造领域隔离，但本节只建立概念边界。
- TypeScript 的类型兼容仍然属于编译期能力，不替代运行时输入校验。
