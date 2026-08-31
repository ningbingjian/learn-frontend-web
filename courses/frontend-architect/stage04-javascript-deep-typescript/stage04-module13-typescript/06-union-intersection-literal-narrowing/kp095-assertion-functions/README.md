# TS-KP095：Assertion Functions

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Assertion Function 为什么适合“失败就终止当前流程”的边界校验。
2. 写出 `asserts condition` 与 `asserts value is Type` 两类 assertion signature。
3. 理解 assertion 正常返回后，TypeScript 为什么能继续使用更精确的类型。
4. 用 `unknown` + 真实运行时检查把外部数据收窄成业务类型。
5. 区分 Assertion Function、Type Predicate 与普通 Type Assertion。
6. 理解 assertion function 的实现必须真的在失败时阻止控制流继续。
7. 避免把 `asserts` 当成“无检查的强制转换”。

> **本节核心代码**：`assertIsProduct(value): asserts value is Product` 与真实字段校验。
>
> **实验辅助代码**：`payload` 和日志只是模拟外部输入进入系统边界后的使用过程。

## 理论讲解

### 1. 有些判断不是“返回 false”，而是“失败就不能继续”

Type Predicate 的调用模式通常是：

```ts
if (isProduct(value)) {
  // narrowed
}
```

但在很多系统边界中，业务语义其实是：

```text
这个值必须满足条件
否则立即报错
```

例如：

- 配置启动校验。
- API payload 进入核心业务前的断言。
- 必需环境变量。
- 测试中的 invariant。
- 内部状态不变量。

这时 Assertion Function 更贴近真实控制流。

### 2. 第一类语法：`asserts condition`

可以写：

```ts
function assert(condition: unknown): asserts condition {
  if (!condition) {
    throw new Error('Assertion failed');
  }
}
```

调用：

```ts
assert(value !== null);
```

如果函数正常返回，TypeScript 可以把：

```text
value !== null
```

作为后续控制流事实。

### 3. 第二类语法：`asserts value is Type`

更直接的类型断言函数：

```ts
function assertIsProduct(value: unknown): asserts value is Product {
  // runtime checks
}
```

语义是：

> 只要这个函数正常返回，后续路径就可以认为 `value` 是 Product。

如果不满足条件，函数应该：

```text
throw
或以其它方式让正常控制流无法继续
```

### 4. 为什么最终案例从 `unknown` 开始

外部输入如果没有被验证，不应该一上来就写：

```ts
const payload: Product = externalValue;
```

因为 TypeScript 无法在运行时替你确认 JSON 是否真的符合接口。

更合理的边界模型是：

```text
外部数据
↓
unknown
↓
运行时验证 / assertion
↓
业务类型 Product
```

因此本节最终案例故意使用：

```ts
const payload: unknown = ...;
```

### 5. Assertion Function 真正依赖的是控制流

假设：

```ts
assertIsProduct(payload);
```

函数内部如果验证失败：

```ts
throw new TypeError(...);
```

如果代码还能继续执行到下一行，就意味着 assertion 已经通过。

所以 TypeScript 可以在后续路径中收窄：

```text
payload
unknown
↓ assertion returns normally
Product
```

这与上一节学习的 Reachability / Control Flow Analysis 是同一条主线。

### 6. 最终案例到底验证了什么

Product 需要：

```ts
type Product = {
  id: number;
  name: string;
};
```

Assertion Function 依次验证：

```text
必须是 object
不能是 null
必须存在 id
id 必须是 number
必须存在 name
name 必须是 string
```

只有全部满足，函数才正常返回。

### 7. Assertion Function 和 `as Product` 完全不是一回事

Type Assertion：

```ts
const product = value as Product;
```

特点：

```text
没有运行时检查
错误数据也能被你“说成” Product
```

Assertion Function：

```ts
assertIsProduct(value);
```

应该真实执行：

```text
runtime validation
```

失败则中止流程。

因此两者风险模型完全不同。

### 8. Assertion Function 和 Type Predicate 的差异

Type Predicate：

```ts
function isProduct(value): value is Product
```

通常：

```text
返回 true / false
由调用者选择分支
```

Assertion Function：

```ts
function assertIsProduct(value): asserts value is Product
```

通常：

```text
成功：继续
失败：throw
```

选择依据是业务语义，而不是哪种语法“更高级”。

### 9. Assertion Function 也可能写错

如果你声明：

```ts
asserts value is Product
```

却根本没有验证 `name`，那么类型系统仍可能相信你的签名。

所以工程上必须记住：

```text
assertion signature
不是自动生成的 validator
```

复杂 schema 仍可能需要专门的 validation library 或系统化校验方案。

### 10. `asserts` 不等于 import assertions

这里的：

```ts
asserts value is Product
```

是 TypeScript Assertion Signature。

不要和模块导入历史语法中的 `assert { type: ... }` 混淆，它们属于完全不同的问题域。

## 动手编码：从 0 到 1

### 第 1 步：声明业务类型

创建：

```text
kp095-assertion-functions/src/main.ts
```

写：

```ts
type Product = {
  id: number;
  name: string;
};
```

### 第 2 步：创建 Assertion Function 骨架

加入：

```ts
function assertIsProduct(value: unknown): asserts value is Product {
  // runtime validation
}
```

关键是：

```text
asserts value is Product
```

### 第 3 步：验证 object 与 null

加入：

```ts
if (
  typeof value !== 'object' ||
  value === null
) {
  throw new TypeError('Invalid product payload');
}
```

### 第 4 步：验证字段存在和字段类型

扩展条件：

```ts
!('id' in value) ||
typeof value.id !== 'number' ||
!('name' in value) ||
typeof value.name !== 'string'
```

最终所有失败情况统一抛错。

### 第 5 步：模拟 unknown 外部数据

加入：

```ts
const payload: unknown = {
  id: 101,
  name: 'Keyboard'
};
```

在 assertion 之前不能直接把它当 Product 使用。

### 第 6 步：执行 assertion

加入：

```ts
assertIsProduct(payload);
```

如果代码能继续执行，后面 `payload` 已被收窄为 Product。

### 第 7 步：直接使用业务字段

加入：

```ts
console.log(payload.id);
console.log(payload.name.toUpperCase());
```

预期：

```text
101
KEYBOARD
```

### 第 8 步：添加 tsconfig

创建：

```text
kp095-assertion-functions/tsconfig.json
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

**本节核心代码**：Assertion Signature 与真实运行时字段验证。

**实验辅助代码**：`payload` 是模拟外部输入，两个日志用于证明 assertion 后的静态类型。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp095-assertion-functions/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp095-assertion-functions/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp095-assertion-functions/dist/main.js
```

预期输出：

```text
101
KEYBOARD
```

## 效果验证

完成本节后，应该能回答：

1. `asserts condition` 表达什么？
2. `asserts value is Product` 表达什么？
3. 为什么 assertion 正常返回后 TypeScript 可以收窄？
4. 为什么外部数据更适合先作为 unknown？
5. Assertion Function 与 Type Predicate 的控制流差异是什么？
6. Assertion Function 与 `as Product` 的安全性差异是什么？
7. 为什么 assertion signature 本身不能替代真实 runtime validation？
