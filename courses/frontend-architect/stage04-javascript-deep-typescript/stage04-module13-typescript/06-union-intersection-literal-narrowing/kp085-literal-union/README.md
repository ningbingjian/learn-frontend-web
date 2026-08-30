# TS-KP085：Literal Union

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用多个 Literal Type 组成有限取值集合。
2. 理解 `'CNY' | 'USD' | 'EUR'` 和普通 `string` 的边界差异。
3. 使用 Literal Union 给业务字段建立明确的合法值集合。
4. 理解 Literal Union 本质上仍然是 Union Type，只是成员变成了精确字面量类型。
5. 知道 Literal Union 会在编译期阻止集合之外的值，但不会自动校验运行时外部输入。
6. 为下一节 Discriminated Union 建立“字面量可以作为状态标签”的基础。

> **本节核心代码**：`Currency = 'CNY' | 'USD' | 'EUR'` 以及 `formatMoney()` 对有限币种类型的使用。
>
> **实验辅助代码**：两个 `console.log()` 只用于观察合法 Literal Union 值的运行结果。

## 理论讲解

### 1. 单个 Literal Type 只能表达一个值

上一节已经学过：

```ts
type Currency = 'CNY';
```

它只能表示一个精确字符串：

```text
'CNY'
```

但真实业务经常不是“只允许一个值”，而是“只允许有限的几个值”。

例如支付系统可能只开放：

```text
CNY
USD
EUR
```

如果直接写：

```ts
type Currency = string;
```

那么：

```text
JPY
ABC
hello
任意 string
```

都会被静态类型接受。

### 2. Literal Union 把有限值组合起来

可以直接写：

```ts
type Currency = 'CNY' | 'USD' | 'EUR';
```

这里：

```text
'CNY'
'USD'
'EUR'
```

分别是三个 String Literal Types。

`|` 把它们组合成一个 Union Type。

因此 `Currency` 表示：

```text
值必须是
'CNY'
或
'USD'
或
'EUR'
```

### 3. Literal Union 仍然是 Union Type

不要把 Literal Union 理解成一种完全独立的新类型系统。

它的结构仍然是：

```text
Union Type
  ├── 'CNY'
  ├── 'USD'
  └── 'EUR'
```

只是普通 Union 可能是：

```ts
string | number
```

而 Literal Union 的成员更精确：

```ts
'CNY' | 'USD' | 'EUR'
```

### 4. Literal Union 比宽泛 primitive 更能表达业务约束

例如：

```ts
function formatMoney(value: number, currency: Currency): string {
  return `${currency} ${value.toFixed(2)}`;
}
```

调用：

```ts
formatMoney(499, 'CNY');
formatMoney(499, 'USD');
```

合法。

但是：

```ts
// formatMoney(499, 'JPY');
```

应该产生类型错误。

因为：

```text
'JPY'
不属于
'CNY' | 'USD' | 'EUR'
```

### 5. Literal Union 很适合有限业务域

常见场景包括：

```ts
type Theme = 'light' | 'dark';

type Direction = 'left' | 'right' | 'up' | 'down';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type OrderStatus = 'pending' | 'paid' | 'cancelled';
```

这些字段的共同特点是：

```text
不是任意 string
而是有限且已知的一组值
```

### 6. Literal Union 不会创建 JavaScript enum 对象

类型声明：

```ts
type Currency = 'CNY' | 'USD' | 'EUR';
```

属于 TypeScript 类型层。

编译到 JavaScript 后，`Currency` 不会变成：

```js
const Currency = {
  CNY: 'CNY',
  USD: 'USD',
  EUR: 'EUR'
};
```

所以：

```text
Literal Union
= 编译期有限值约束
≠ 自动生成运行时常量表
```

### 7. Literal Union 不能替代运行时输入校验

假设服务端返回：

```json
{
  "currency": "ABC"
}
```

即使你的程序内部声明了：

```ts
type Currency = 'CNY' | 'USD' | 'EUR';
```

TypeScript 也不会在网络请求完成后自动检查字符串是不是合法币种。

因此仍然要区分：

```text
静态类型
→ 编译期约束源码

运行时校验
→ 校验 JSON / 表单 / URL / localStorage 等外部数据
```

### 8. Literal Union 为判别联合提供基础

下一节会看到：

```ts
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'failed'; error: string };
```

这里：

```text
'loading'
'success'
'failed'
```

就是有限 Literal Values。

它们不仅限制取值，还可以帮助 TypeScript 判断当前 Union 成员到底是哪一种状态。

## 动手编码：从 0 到 1

### 第 1 步：创建最小源码文件

创建：

```text
kp085-literal-union/src/main.ts
```

先写：

```ts
type Currency = 'CNY' | 'USD' | 'EUR';
```

本步目标：建立一个有限币种类型。

### 第 2 步：写一个使用 Literal Union 的函数

继续加入：

```ts
function formatMoney(value: number, currency: Currency): string {
  return `${currency} ${value.toFixed(2)}`;
}
```

这里 `currency` 不再接受任意字符串。

### 第 3 步：创建合法值

加入：

```ts
const primary: Currency = 'CNY';
const backup: Currency = 'USD';
```

这两个变量都属于 `Currency`。

如果改成：

```ts
// const unsupported: Currency = 'JPY';
```

类型检查应该失败。

### 第 4 步：调用函数

加入：

```ts
console.log(formatMoney(499, primary));
console.log(formatMoney(499, backup));
```

运行后应该观察到：

```text
CNY 499.00
USD 499.00
```

### 第 5 步：添加 tsconfig

创建：

```text
kp085-literal-union/tsconfig.json
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

**本节核心代码**：`Currency` Literal Union、`formatMoney()` 的参数约束。

**实验辅助代码**：`primary`、`backup` 和日志输出用于验证有限取值可以正常运行。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp085-literal-union/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp085-literal-union/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp085-literal-union/dist/main.js
```

预期：

```text
CNY 499.00
USD 499.00
```

## 效果验证

完成本节后，应该能回答：

1. 为什么 `type Currency = string` 太宽？
2. `'CNY' | 'USD' | 'EUR'` 为什么仍属于 Union Type？
3. Literal Union 为什么适合状态、方向、主题、协议方法等有限业务域？
4. 为什么 Literal Union 不会自动生成 JavaScript 常量对象？
5. 为什么从服务端拿到的字符串仍然需要运行时校验？
6. Literal Union 和下一节 Discriminated Union 有什么关系？
