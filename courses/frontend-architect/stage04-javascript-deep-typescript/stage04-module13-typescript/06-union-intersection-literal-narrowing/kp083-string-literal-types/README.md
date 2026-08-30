# TS-KP083：String Literal Types

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `'value'` 在类型位置声明 String Literal Type。
2. 理解 `'CNY'` 比 `string` 更具体，只允许一个精确字符串值。
3. 理解 String Literal Type 是 `string` 的更窄子集。
4. 区分运行时字符串值和编译期字符串字面量类型。
5. 理解 `const` 与 Literal Inference 的基本关系。
6. 知道 `let` 变量可能因为可变性被拓宽为 `string`。
7. 不把单个 String Literal Type 与后面的 Literal Union 混为一课。

> **本节核心代码**：`type Currency = 'CNY'`。
>
> **实验辅助代码**：格式化函数和相等比较用于观察这个精确值在运行时仍只是普通字符串。

## 理论讲解

### 1. `string` 和 `'CNY'` 不一样

`string` 表示大量可能值：

```text
'CNY'
'USD'
'hello'
'anything'
...
```

而：

```ts
type Currency = 'CNY';
```

只允许一个值：

```text
'CNY'
```

因此：

```text
'CNY' 是 string 的更具体类型
string 不是 'CNY'
```

### 2. Literal Type 把“值”提升为类型约束

JavaScript 值：

```ts
'CNY'
```

TypeScript 类型位置：

```ts
type Currency = 'CNY';
```

语法看起来相同，但位置不同：

```text
值位置 → 运行时字符串
类型位置 → 编译期精确类型
```

### 3. 合法与非法赋值

合法：

```ts
const currency: Currency = 'CNY';
```

非法：

```ts
// const currency: Currency = 'USD';
```

因为 `'USD'` 不是 `'CNY'`。

### 4. 为什么 Literal Type 有价值

如果 API 只接受某一个精确协议值：

```ts
function request(method: 'GET') {
  // ...
}
```

它比：

```ts
function request(method: string) {
  // ...
}
```

更精确。

TypeScript 可以在调用前就发现错误字符串。

### 5. `const` 常常会保留字面量信息

例如：

```ts
const currency = 'CNY';
```

因为 `currency` 不能重新绑定到别的字符串，编译器通常可以保留更具体的 `'CNY'` 信息。

而：

```ts
let currency = 'CNY';
```

变量以后可能改成：

```ts
currency = 'USD';
```

因此常常会推断成更宽的 `string`。

Literal Widening 已在 TS-KP034 学过，本节只把它与 String Literal Type 重新连接起来。

### 6. String Literal Type 仍然是普通 JavaScript string

下面：

```ts
const currency: Currency = 'CNY';
```

运行时：

```ts
typeof currency
```

仍然是：

```text
string
```

不会出现新的 JavaScript `Currency` 类型。

### 7. 本节为什么不写 `'CNY' | 'USD'`

因为：

```ts
'CNY' | 'USD'
```

已经进入 Literal Union。

课程把它放在 TS-KP085，那里会专门讨论“有限精确值集合”。

本节只需要把最基本的概念钉牢：

> 一个具体字符串本身也可以成为类型。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp083-string-literal-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义一个精确字符串类型

```ts
type Currency = 'CNY';
```

这不是 `string` 的别名，而是只允许 `'CNY'` 的类型。

### 第 2 步：让函数只接收这个精确值

```ts
function formatCurrency(currency: Currency, amount: number): string {
  return `${currency} ${amount.toFixed(2)}`;
}
```

### 第 3 步：创建符合 Literal Type 的变量

```ts
const currency: Currency = 'CNY';
```

### 第 4 步：调用函数

```ts
console.log(formatCurrency(currency, 499));
```

预期：

```text
CNY 499.00
```

### 第 5 步：观察运行时仍是普通值

```ts
console.log(currency === 'CNY');
```

预期：

```text
true
```

### 第 6 步：临时制造错误

```ts
// const wrong: Currency = 'USD';
```

应该产生类型错误。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`type Currency = 'CNY'`。
- **实验辅助代码**：格式化和日志。

## 运行案例

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp083-string-literal-types/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp083-string-literal-types/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp083-string-literal-types/dist/main.js
```

预期：

```text
CNY 499.00
true
```

## 效果验证

你应该能解释：

1. 为什么 `'CNY'` 比 `string` 更窄。
2. 为什么 `'USD'` 不能赋给 `'CNY'` 类型。
3. Literal Type 为什么不会产生新的运行时类型。
4. `const` 为什么更容易保留精确字面量信息。
5. 单个 String Literal Type 与 Literal Union 的课程边界。
