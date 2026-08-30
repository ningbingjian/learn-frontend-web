# TS-KP080：回调中的 `void` 特殊规则

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确解释回调类型中的 `() => void`：调用方会忽略返回值，而不是要求实现运行时一定返回 `undefined`。
2. 理解为什么一个返回 `number` 的函数可以赋给返回 `void` 的回调类型。
3. 理解通过 `void` 类型引用调用函数时，调用结果在静态类型上仍然是 `void`。
4. 解释为什么 `Array.prototype.forEach()` 可以接受像 `array.push()` 这种实际会产生返回值的回调表达式。
5. 区分“上下文函数类型返回 `void`”与“函数声明显式写 `: void`”的行为差异。
6. 记住 `void` 和 `undefined` 不是完全相同的 TypeScript 类型概念。

> **本节核心代码**：返回 `number` 的 `pushValue()` 赋给 `Consumer = (value: string) => void`，以及通过 `consume()` 调用后的静态 `void` / 运行时返回值差异。
>
> **实验辅助代码**：`forEach()` 和日志用于复现真实 JavaScript 回调场景。

## 理论讲解

### 1. 最容易误解的一句话

很多人看到：

```ts
type Consumer = (value: string) => void;
```

会理解成：

> 这个回调实现绝对不能返回任何值。

这并不准确。

在 TypeScript 的**上下文函数类型**中，目标返回类型 `void` 更接近：

> 调用方不会使用这个返回值。

因此：

```ts
const fn: () => void = () => 123;
```

可以成立。

### 2. 为什么允许返回具体值的函数满足 `void` 回调

JavaScript 中很多常见函数会返回值。

例如：

```ts
const target: string[] = [];

const pushValue = (value: string): number => {
  return target.push(value);
};
```

`Array.prototype.push()` 返回新数组长度，因此 `pushValue()` 返回 `number`。

但如果一个 API 只想告诉回调：

```text
我会调用你
但我不关心你的返回结果
```

就可以声明：

```ts
type Consumer = (value: string) => void;
```

然后：

```ts
const consume: Consumer = pushValue;
```

这是 TypeScript 有意支持的回调习惯。

### 3. `void` 不会在运行时删除真实返回值

最终案例：

```ts
const ignored = consume('Keyboard');
```

静态上：

```text
ignored: void
```

因为 `consume` 的类型是：

```ts
(value: string) => void
```

但运行时真正执行的函数仍然是：

```ts
pushValue
```

它调用：

```ts
collected.push(value)
```

第一次 push 后数组长度是 `1`。

因此如果直接：

```ts
console.log(ignored);
```

运行时会看到：

```text
1
```

这是一个非常重要的分层：

```text
静态类型：void
        ↓
调用方不应依赖返回值

运行时真实值：1
        ↓
JavaScript 函数实际返回什么仍由实现决定
```

### 4. 那为什么不能使用 `ignored` 当 number

虽然运行时可能得到 `1`，但 TypeScript 只允许你依赖目标契约承诺的能力。

所以：

```ts
// ignored.toFixed(2);
```

不会通过类型检查。

因为当前静态视图是：

```text
void
```

调用方不应该依赖底层实现偶然返回的 `number`。

如果 API 真的要求使用返回值，就不应该把回调类型写成 `void`。

### 5. `forEach()` 为什么受益于这个规则

一个经典场景：

```ts
const src = ['Mouse', 'Monitor'];
const dst: string[] = [];

src.forEach((value) => dst.push(value));
```

表达式：

```ts
dst.push(value)
```

实际返回：

```text
number
```

而 `forEach` 的回调返回值从业务上没有意义。

TypeScript 允许它，就是因为 `void` 回调契约表示：

```text
你可以返回东西
但 forEach 不会用
```

否则 JavaScript 中大量简洁回调都要被迫写成：

```ts
src.forEach((value) => {
  dst.push(value);
});
```

仅仅为了手动消掉返回值。

### 6. 关键区别：上下文 `void` 与显式返回 `void`

下面是上下文函数类型：

```ts
type VoidFunc = () => void;

const fn: VoidFunc = () => 123;
```

合法。

但下面是函数自己明确声明：

```ts
function fn(): void {
  // return 123;
}
```

这里显式的 `: void` 是函数声明自己的返回契约。

直接返回具体值会产生错误。

同样：

```ts
const fn = function (): void {
  // return 123;
};
```

也不能直接返回具体值。

所以一定区分：

```text
目标 / 上下文类型是 () => void
        ↓
实现可以产生值，但调用方忽略

函数自己显式声明返回 : void
        ↓
实现不能 return 一个具体值
```

### 7. `void` 不等于 `undefined`

JavaScript 函数如果没有显式返回值，运行时通常得到：

```text
undefined
```

但 TypeScript 的：

```text
void
```

是一个更偏向“返回结果不应被使用”的类型概念。

不要机械写成：

```text
void === undefined
```

尤其在函数兼容性场景，两者行为并不一样。

### 8. API 设计时什么时候应该用 `void`

如果你的回调 API 只关心副作用：

```text
记录日志
更新数组
更新 UI
发送事件
```

而不会读取回调返回值，可以考虑：

```ts
(value: T) => void
```

它告诉调用者：

```text
返回值不是这个 API 协议的一部分
```

### 9. 什么时候不应该用 `void`

如果调用方会根据结果继续业务逻辑，例如：

```text
filter callback -> boolean
sort comparator -> number
map callback -> 新值
validator -> ValidationResult
```

就必须把真实返回类型写进契约。

不能用 `void` 把重要结果吃掉。

### 10. `void` 回调规则不是运行时机制

TypeScript 不会把：

```ts
const consume: Consumer = pushValue;
```

编译成一个新包装函数：

```js
const consume = (value) => {
  pushValue(value);
  return undefined;
};
```

它仍然只是普通函数引用。

因此本节最终案例才能在运行时观察到真实的 `1`。

### 11. Chapter 05 的最终函数兼容地图

到这里可以把函数兼容性整理成：

```text
函数兼容
├── 参数数量
│   └── 可以忽略调用方提供的额外参数
├── 普通返回值
│   └── 返回更具体结构可满足更宽目标
├── 参数类型宽窄
│   └── strictFunctionTypes 约束普通函数类型
└── void 回调
    └── 实现可返回值，但调用方忽略
```

这就是 Chapter 05 的最终收尾。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp080-void-callback-rule/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：准备目标数组

```ts
const collected: string[] = [];
```

### 第 2 步：声明返回 void 的回调契约

```ts
type Consumer = (value: string) => void;
```

这表示调用方不使用回调结果。

### 第 3 步：实现实际返回 number 的函数

```ts
const pushValue = (value: string): number => collected.push(value);
```

`push()` 返回数组新长度，所以函数返回 `number`。

### 第 4 步：赋给 void 回调类型

```ts
const consume: Consumer = pushValue;
```

应该通过类型检查。

### 第 5 步：通过 void 类型引用调用

```ts
const ignored = consume('Keyboard');
```

静态上：

```text
ignored: void
```

### 第 6 步：观察数组和运行时返回值

```ts
console.log(collected.join(' | '));
console.log(ignored);
```

运行时预期：

```text
Keyboard
1
```

`1` 来自 `push()` 的真实运行时返回值。

### 第 7 步：复现 forEach 真实场景

```ts
['Mouse', 'Monitor'].forEach((value) => collected.push(value));
```

这里箭头表达式实际返回 `push()` 的 `number`。

但 `forEach` 忽略它。

继续输出：

```ts
console.log(collected.join(' | '));
```

预期：

```text
Keyboard | Mouse | Monitor
```

### 第 8 步：临时实验显式 void 的不同

```ts
// function wrong(): void {
//   return 123;
// }
```

这个函数自己明确写了 `: void`，因此不能直接返回 `123`。

再对比：

```ts
const okay: () => void = () => 123;
```

这是上下文 `void`，实现返回值会被调用方忽略，所以允许。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`Consumer`、返回 `number` 的 `pushValue()`、以及 `consume = pushValue` 的特殊返回值兼容关系。
- **实验辅助代码**：`forEach()` 和日志用于观察真实 JavaScript 返回值没有被 TypeScript 删除。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp080-void-callback-rule/tsconfig.json
npm run build -- ./05-function-type-system/kp080-void-callback-rule/tsconfig.json
node ./05-function-type-system/kp080-void-callback-rule/dist/main.js
```

预期输出：

```text
Keyboard
1
Keyboard | Mouse | Monitor
```

## 效果验证

完成本节后，你应该能够准确解释：

```ts
const fn: () => void = () => 123;
```

为什么合法。

正确答案不是“123 被编译器改成 undefined”，而是：

```text
目标类型告诉调用方：不要依赖返回值
实现仍然可以在 JavaScript 运行时产生返回值
```

如果函数自己显式声明 `: void`，则又是另一条规则：实现不能直接 `return` 一个具体值。

至此 Chapter 05 的函数类型系统基础完整闭环。
