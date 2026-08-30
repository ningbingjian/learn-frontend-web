# TS-KP077：函数参数数量兼容

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么一个声明较少参数的函数可以赋给需要更多参数的回调类型。
2. 从“谁调用谁”的角度判断函数参数数量兼容关系。
3. 理解“少声明参数”不等于“把参数写成可选参数”。
4. 区分函数值之间的兼容检查与直接调用某个函数时的参数数量检查。
5. 理解为什么 `forEach`、事件处理器等 JavaScript API 经常依赖这种规则。
6. 知道反方向通常不安全：一个要求更多必需参数的函数不能替代只承诺传较少参数的目标函数类型。

> **本节核心代码**：`ProductVisitor`、`visitProducts()` 以及只声明一个参数的 `printName()` 仍可以作为三参数回调使用。
>
> **实验辅助代码**：第二次 `visitProducts()` 调用用于观察 `index`，日志只负责展示运行效果。

## 理论讲解

### 1. 为什么会出现“参数数量不一样还能兼容”

先看一个函数类型：

```ts
type ProductVisitor = (
  product: string,
  index: number,
  allProducts: string[]
) => void;
```

它描述的是调用方会这样调用回调：

```ts
visitor(product, index, allProducts);
```

现在有一个更简单的函数：

```ts
const printName = (product: string): void => {
  console.log(product.toUpperCase());
};
```

`printName` 只声明了一个参数。

但它仍然可以作为 `ProductVisitor` 使用。

原因来自 JavaScript 的正常调用行为：

```text
调用方传 3 个实参
          ↓
函数只声明 1 个形参
          ↓
后两个实参被函数忽略
```

这在 JavaScript 里非常常见。

### 2. TypeScript 比较的是“源函数能不能安全完成目标函数的工作”

设：

```ts
const one = (a: number) => 0;
const two = (a: number, b: string) => 0;
```

如果目标位置需要：

```text
(number, string) => number
```

而我们提供：

```text
(number) => number
```

通常是安全的。

因为调用方无论传：

```ts
fn(1, 'hello');
```

还是其它合法的第二个 `string` 参数，源函数都只使用第一个 `number`，不会因为第二个参数存在而失败。

可以建立直觉：

```text
源函数需要的参数更少
        ↓
调用方提供得更多
        ↓
多出来的参数可以忽略
        ↓
通常安全
```

### 3. 反方向为什么不安全

如果目标只承诺：

```ts
(value: number) => void
```

但源函数要求：

```ts
(value: number, label: string) => void
```

那调用方可能只会这样调用：

```ts
callback(100);
```

源函数却依赖第二个必需参数 `label`。

因此：

```text
目标承诺只传 1 个
源函数却要求 2 个
        ↓
不能保证第二个参数存在
        ↓
不安全
```

这就是参数数量兼容不是“双向随便兼容”的原因。

### 4. 这和“可选参数”不是一回事

上一节已经强调过：

```ts
index?: number
```

真正表示的是：

> 调用方可能不传 `index`。

而本节讲的是另一件事：

```ts
type Visitor = (value: string, index: number) => void;

const callback = (value: string) => {
  // 不关心 index
};
```

这里调用方仍然承诺每次都会传 `index`。

只是回调实现选择不声明、不使用它。

所以：

```text
少声明参数
≠
把目标参数标成 optional
```

### 5. 为什么数组回调经常这样写

例如数组遍历时，API 可能提供：

```text
value
index
array
```

但很多业务只需要：

```ts
items.forEach((item) => {
  console.log(item);
});
```

如果 TypeScript 强迫每个回调都写：

```ts
(item, index, array) => {
  // 即使根本不用 index / array
}
```

代码会非常冗余。

因此允许“只接自己关心的前几个参数”是非常实用的 JavaScript 兼容规则。

### 6. 直接调用和函数类型赋值要区分

假设：

```ts
const printName = (product: string): void => {};
```

它可以赋给一个三参数回调类型。

但如果你直接写：

```ts
// printName('Keyboard', 0);
```

TypeScript 会根据 `printName` 自己的声明签名检查直接调用。

它只声明一个参数，因此直接调用时额外写第二个参数会产生静态错误。

这两个场景不要混淆：

```text
函数值能否赋给另一个函数类型
        ↓
函数兼容性规则

直接调用某个具体函数
        ↓
按该函数自己的调用签名检查
```

### 7. 参数名字不参与兼容性判断

例如：

```ts
type A = (product: string) => void;
type B = (value: string) => void;
```

`product` 和 `value` 只是为了阅读。

真正影响兼容关系的是参数的：

- 位置。
- 类型。
- 必需 / 可选 / Rest 等特征。

不是形参名字本身。

### 8. 与后续知识点的关系

本节只讨论：

```text
参数“数量”如何影响函数兼容
```

接下来还要继续学习：

- TS-KP078：返回值类型如何影响函数兼容。
- TS-KP079：参数“类型宽窄”在 `strictFunctionTypes` 下怎么检查。
- TS-KP080：返回 `void` 的回调为什么存在特殊规则。

这四节组合起来，才是完整的函数兼容性基础。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp077-parameter-count-compatibility/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：准备产品数组

在 `src/main.ts` 写：

```ts
const products = ['Keyboard', 'Mouse'];
```

这是后续回调调用的数据源。

### 第 2 步：声明三参数回调契约

```ts
type ProductVisitor = (
  product: string,
  index: number,
  allProducts: string[]
) => void;
```

这里调用方承诺：每次调用回调时都会提供三个参数。

### 第 3 步：实现调用方

```ts
function visitProducts(items: string[], visitor: ProductVisitor): void {
  items.forEach((item, index) => visitor(item, index, items));
}
```

注意真正发生的调用：

```ts
visitor(item, index, items);
```

三个参数每次都传。

### 第 4 步：实现只声明一个参数的函数

```ts
const printName = (product: string): void => {
  console.log(product.toUpperCase());
};
```

它不关心：

```text
index
allProducts
```

所以没有必要把它们写出来。

### 第 5 步：把一参数函数传给三参数回调位置

```ts
visitProducts(products, printName);
```

这应该通过类型检查。

运行时 `visitProducts()` 仍然会传三个参数，只是 `printName()` 忽略后两个。

预期输出：

```text
KEYBOARD
MOUSE
```

### 第 6 步：再写一个声明两个参数的回调

```ts
visitProducts(products, (product, index) => {
  console.log(`${index}:${product}`);
});
```

它使用前两个参数，忽略第三个 `allProducts`。

同样合法。

预期：

```text
0:Keyboard
1:Mouse
```

### 第 7 步：理解反方向错误

可以临时实验：

```ts
const needsTwo = (product: string, index: number): void => {
  console.log(product, index);
};

type NameOnly = (product: string) => void;

// const wrong: NameOnly = needsTwo;
```

目标 `NameOnly` 的调用方只承诺传一个参数。

`needsTwo` 却要求第二个参数，所以不能安全替代。

### 第 8 步：理解直接调用的区别

再尝试：

```ts
// printName('Keyboard', 0);
```

虽然 `printName` 能作为多参数回调使用，但它自己的调用签名仍然只有一个参数。

验证后保持注释或删除实验代码。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`ProductVisitor`、`visitProducts()`、`printName()` 的函数参数数量兼容关系。
- **实验辅助代码**：日志输出和第二个回调用于观察被使用的参数。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp077-parameter-count-compatibility/tsconfig.json
npm run build -- ./05-function-type-system/kp077-parameter-count-compatibility/tsconfig.json
node ./05-function-type-system/kp077-parameter-count-compatibility/dist/main.js
```

预期输出：

```text
KEYBOARD
MOUSE
0:Keyboard
1:Mouse
```

## 效果验证

完成本节后，你应该可以解释：

```text
为什么：
(product: string) => void

可以放到：
(product: string, index: number, all: string[]) => void
```

核心原因不是“TypeScript 不检查参数”，而是：

```text
调用方提供的参数更多
源函数依赖的参数更少
多余实参可以安全忽略
```

同时也应该记住反方向不成立：如果源函数要求调用方没有承诺提供的额外必需参数，就不能安全替代目标函数类型。
