# TS-KP076：回调函数参数设计

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 从“谁调用回调”这一视角设计 callback function type。
2. 理解回调参数类型描述的是调用方承诺提供的参数。
3. 知道为什么“回调实现可以少写参数”不等于“回调类型里的参数应该写成可选”。
4. 避免错误写出 `(value, index?) => void` 这类常见类型。
5. 理解可选回调参数意味着调用方真的可能不传该参数。
6. 使用必须参数类型同时支持只声明一个参数或声明多个参数的回调实现。
7. 为下一节函数参数数量兼容建立直觉。

> **本节核心代码**：`callback: (product: string, index: number) => void`。
>
> **实验辅助代码**：简单 `for` 循环和两组回调日志用于观察“类型声明两个参数，但回调实现可以只写一个参数”。

## 理论讲解

### 1. 回调类型最容易从错误视角设计

很多人写回调类型时会想：

```text
使用这个 API 的人
可能只写一个回调参数
也可能写两个
```

于是写成：

```ts
callback: (product: string, index?: number) => void
```

看起来很合理，但语义其实变了。

### 2. 回调类型应该描述“调用方会怎么调用它”

假设我们写一个 API：

```ts
function forEachProduct(
  products: string[],
  callback: (product: string, index: number) => void
): void {
  // ...
}
```

这里真正的承诺是：

```text
每次调用 callback
一定会传 product
一定会传 index
```

所以：

```ts
index: number
```

应该是必需参数。

### 3. `index?: number` 表达的是另一件事

如果写：

```ts
callback: (product: string, index?: number) => void
```

真正意思是：

> `forEachProduct` 的实现有权只传 `product`，不传 `index`。

也就是这种实现应该被类型允许：

```ts
callback(product);
```

因此回调接收方必须把 `index` 当成：

```text
number | undefined
```

处理。

如果实际 API 每次都会传 index，这种 `?` 就是在错误降低契约强度。

### 4. 回调实现少写参数，不需要 `?`

最终类型仍然是：

```ts
callback: (product: string, index: number) => void
```

但调用者可以写：

```ts
forEachProduct(products, (product) => {
  console.log(product);
});
```

为什么可以？

因为这个回调实现根本不需要使用第二个参数。

JavaScript 运行时多传一个实参不会阻止只声明一个形参的函数工作。

TypeScript 的函数兼容规则也允许这种常见模式。

这个规则会在下一节 TS-KP077「函数参数数量兼容」系统展开。

### 5. 想使用 index 时仍然得到确定的 number

也可以写：

```ts
forEachProduct(products, (product, index) => {
  console.log(index.toFixed(0));
});
```

因为回调类型明确承诺：

```text
index 一定存在
```

所以这里的：

```text
index → number
```

而不是：

```text
number | undefined
```

### 6. API 实现也会被回调类型约束

当参数类型是：

```ts
callback: (product: string, index: number) => void
```

实现写：

```ts
callback(products[index], index);
```

符合契约。

如果实现改成：

```ts
// callback(products[index]);
```

TypeScript 会提醒：缺少一个调用参数。

也就是说 callback type 同时约束：

```text
API 实现者怎么调用 callback
        +
API 使用者能提供什么 callback
```

### 7. 什么情况下回调参数才应该是可选的

只有当 API 实现真的可能这样调用：

```ts
callback(value);
```

也可能这样调用：

```ts
callback(value, metadata);
```

才考虑：

```ts
metadata?: Metadata
```

此时回调实现就必须接受：

```text
metadata 可能不存在
```

这个 `?` 才表达了真实契约。

### 8. 不要根据“用户愿不愿意写这个形参”决定可选性

错误判断：

```text
有些人回调只写 value
→ index 应该标 ?
```

正确判断：

```text
库的实现是否可能不传 index？

如果永远传
→ index: number

如果可能不传
→ index?: number
```

可选性描述调用事实，不描述使用者是否关心这个值。

### 9. 这和 `Array.prototype.forEach()` 很像

JavaScript 数组回调常见形式：

```ts
array.forEach((value, index) => {
  // ...
});
```

使用者也完全可以：

```ts
array.forEach((value) => {
  // ...
});
```

不需要因此把 index 设计成“调用时可能不存在”。

### 10. 下一节继续解释“为什么少参数函数可以兼容”

本节先记住工程规则：

> 当编写一个函数类型来描述 callback 时，除非调用方真的会省略某个实参，否则不要把那个 callback 参数标记成可选。

至于为什么：

```ts
(product) => void
```

能够用于需要：

```ts
(product, index) => void
```

的位置，下一节会系统从函数参数数量兼容解释。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp076-callback-parameter-design/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建 API 骨架

```ts
function forEachProduct(
  products: string[],
  callback: (product: string, index: number) => void
): void {
}
```

这里已经声明：

```text
每次 callback 调用都提供 product + index
```

### 第 2 步：遍历产品

```ts
for (let index = 0; index < products.length; index += 1) {
}
```

### 第 3 步：按契约调用 callback

```ts
callback(products[index], index);
```

现在 API 实现和 callback type 保持一致。

### 第 4 步：传入只关心 product 的回调

```ts
forEachProduct(['Keyboard', 'Mouse'], (product) => {
  console.log(product.toUpperCase());
});
```

虽然 callback type 描述两个参数，这个实现只声明一个参数仍然可以使用。

### 第 5 步：传入同时使用 index 的回调

```ts
forEachProduct(['Keyboard', 'Mouse'], (product, index) => {
  console.log(`${index}:${product}`);
});
```

这里 `index` 是确定的 `number`。

### 第 6 步：观察两种写法都能工作

第一组输出：

```text
KEYBOARD
MOUSE
```

第二组输出：

```text
0:Keyboard
1:Mouse
```

### 第 7 步：临时把 index 改成可选

临时修改：

```ts
callback: (product: string, index?: number) => void
```

然后在第二个回调里尝试：

```ts
index.toFixed(0)
```

会发现 `index` 变成可能为 `undefined`。

这正是在提醒你：

```text
? 改变的是 API 调用契约
不是“使用者可不可以不写这个形参”
```

实验后恢复为必需参数。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`callback: (product: string, index: number) => void`。
- **实验辅助代码**：循环、两组回调和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp076-callback-parameter-design/tsconfig.json
npm run build -- ./05-function-type-system/kp076-callback-parameter-design/tsconfig.json
node ./05-function-type-system/kp076-callback-parameter-design/dist/main.js
```

预期输出：

```text
KEYBOARD
MOUSE
0:Keyboard
1:Mouse
```

## 效果验证

你应该能够确认：

- Callback type 应从“调用方怎么调用它”的视角设计。
- `index: number` 表示调用方保证每次都传 index。
- `index?: number` 表示调用方可能完全不传 index。
- 回调实现可以只声明自己真正需要的较少参数。
- 不需要为了允许 `(product) => void` 而把 `index` 错误标成可选。
- 本节已经为下一课的函数参数数量兼容建立实际案例。
