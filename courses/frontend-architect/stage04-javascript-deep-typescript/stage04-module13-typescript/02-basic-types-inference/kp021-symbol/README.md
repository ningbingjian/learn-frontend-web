# TS-KP021：`symbol`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `symbol` 是 JavaScript 的原始类型之一。
2. 使用 `Symbol()` 创建唯一标识，并理解“描述文字相同”不代表值相同。
3. 使用 symbol 作为对象属性键，避免与普通字符串键发生名字冲突。
4. 建立 `symbol` 与 `unique symbol` 的基本区别。
5. 通过 `typeof` 观察 symbol 在 JavaScript 运行时的真实类型。

> **本节核心代码**：`Symbol()`、`symbol`、`unique symbol`、symbol 计算属性键。
>
> **实验辅助代码**：日志输出和键比较只用于观察唯一性与运行时结果。

## 理论讲解

### 1. `symbol` 是 JavaScript 原始类型

从 ES2015 开始，JavaScript 提供 `symbol` 原始值。TypeScript 使用同名小写类型描述它：

```ts
const key: symbol = Symbol('key');
```

运行时：

```ts
typeof key
```

得到：

```text
symbol
```

### 2. 每次 `Symbol()` 都创建新的唯一值

下面两个 symbol 的描述完全相同：

```ts
const first: symbol = Symbol('productId');
const second: symbol = Symbol('productId');
```

但它们不是同一个值：

```ts
first === second // false
```

`'productId'` 只是调试描述，不是 symbol 的身份本身。

### 3. symbol 可以作为对象属性键

除了字符串和数字相关属性键，JavaScript 对象也可以使用 symbol 作为属性键：

```ts
const productIdKey = Symbol('productId');

const product = {
  [productIdKey]: 'product-001'
};
```

读取时必须拿到同一个 symbol：

```ts
product[productIdKey]
```

这类键很适合表达框架协议、内部扩展点或避免普通属性名碰撞。

> symbol 键不是安全意义上的“私有字段”。只要调用方拿到了对应 symbol，仍然可以读取该属性。

### 4. `unique symbol` 表达“这一枚具体 symbol”

普通 `symbol` 表示一类 symbol 值；`unique symbol` 则把身份绑定到某一个声明：

```ts
const productIdKey: unique symbol = Symbol('productId');
```

可以先建立这样的直觉：

```text
symbol
  ↓
任意 symbol 值

unique symbol
  ↓
这一枚特定 symbol 的唯一类型身份
```

`unique symbol` 只能用于 `const` 声明或只读静态属性等能够保持身份稳定的位置。更复杂的字面量类型和类型操作会在后续章节继续展开。

### 5. `Symbol()` 与 `Symbol.for()` 不完全一样

`Symbol()` 每次创建新值；`Symbol.for(key)` 使用全局 symbol 注册表，重复使用同一个 key 时可以取得同一个注册 symbol。

本节核心先掌握 `Symbol()` 的唯一性，注册表场景作为扩展认识即可。

---

## 动手编码：从 0 到 1

### 第 0 步：创建最小文件结构

```text
kp021-symbol/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建一枚具有唯一类型身份的 key

在 `src/main.ts` 写：

```ts
const productIdKey: unique symbol = Symbol('productId');
```

这里既创建运行时 symbol，也让 TypeScript 记住这枚 key 的唯一类型身份。

### 第 2 步：创建另一个普通 `symbol`

继续写：

```ts
const fallbackKey: symbol = Symbol('productId');
```

虽然描述也是 `productId`，它仍然是另一个真实 symbol 值。

### 第 3 步：把 symbol 用作对象键

继续写：

```ts
const product = {
  name: 'Mechanical Keyboard',
  [productIdKey]: 'product-001'
};
```

`name` 是普通字符串键，`productIdKey` 对应的是 symbol 键，两者可以共存。

### 第 4 步：让函数明确依赖这枚 key

加入：

```ts
function readProductId(value: { [productIdKey]: string }): string {
  return value[productIdKey];
}
```

这里的计算属性类型表达：传进来的对象必须拥有由 `productIdKey` 这枚 symbol 标识的字符串属性。

### 第 5 步：观察唯一性与运行时类型

加入：

```ts
console.log(readProductId(product));
console.log(productIdKey === fallbackKey);
console.log(typeof productIdKey);
```

预期：

```text
product-001
false
symbol
```

### 第 6 步：临时制造类型错误

可以临时尝试：

```ts
const sameKey: typeof productIdKey = fallbackKey;
```

`fallbackKey` 只是普通 `symbol`，不能冒充 `productIdKey` 这一枚 `unique symbol`。观察错误后删除这行。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`Symbol()`、`symbol`、`unique symbol`、symbol 属性键。
- **实验辅助代码**：相等比较和 `typeof`，只用于证明不同 symbol 的运行时身份不同。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp021-symbol/tsconfig.json
npm run build -- ./02-basic-types-inference/kp021-symbol/tsconfig.json
node ./02-basic-types-inference/kp021-symbol/dist/main.js
```

预期：

```text
product-001
false
symbol
```

## 效果验证

你应该能够确认：

- `symbol` 是原始类型，不是普通字符串别名。
- 两次 `Symbol('productId')` 仍会创建两个不同值。
- symbol 可以作为对象属性键。
- `unique symbol` 表达某一枚具体 symbol 的唯一类型身份。
- JavaScript 运行时 `typeof` symbol 的结果是 `symbol`。
