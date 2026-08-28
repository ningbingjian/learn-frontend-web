# TS-KP028：`object`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释小写 `object` 表示非原始值。
2. 知道对象字面量、数组和函数都属于 `object` 可接受的范围。
3. 知道 `string`、`number`、`boolean`、`bigint`、`symbol`、`null`、`undefined` 等原始值不能直接赋给 `object`。
4. 区分小写 `object` 与大写 `Object` 的基本概念。
5. 为下一节 `{}` 与 `Object` 的差异建立基础。

> **本节核心代码**：`object` 参数及其对非原始值的约束。
>
> **实验辅助代码**：`Array.isArray()`、`Object.keys()` 和 `typeof` 只用于观察不同非原始值。

## 理论讲解

### 1. `object` 表示非原始值

TypeScript 中：

```ts
let value: object;
```

可以接收：

```ts
value = { name: 'Ada' };
value = [1, 2, 3];
value = () => 'ok';
```

但不能直接接收普通原始值：

```ts
// value = 'hello';
// value = 42;
// value = true;
```

### 2. 函数也属于 `object`

JavaScript 中函数不仅可以调用，也具有对象行为和属性。

因此 TypeScript 的小写 `object` 也接受函数值。

这个事实很重要，因为很多初学者会把 `object` 误解成“只能是 `{ ... }` 对象字面量”。

### 3. 数组同样是对象

```ts
const list: object = [1, 2, 3];
```

数组在 JavaScript 运行时也是对象的一种特殊形式。

### 4. `object` 不是大写 `Object`

官方建议日常类型建模优先使用小写：

```text
object
```

而不要把大写全局类型：

```text
Object
```

当成普通对象类型随意使用。

下一节 TS-KP029 会专门比较：

```text
object
{}
Object
```

本节先把 `object = 非原始值` 这个直觉建立牢固。

### 5. `object` 很宽，但不是具体对象结构

如果你只写：

```ts
value: object
```

TypeScript 只知道它不是原始值，并不知道它一定拥有：

```text
name
id
price
```

如果业务需要具体属性，应该使用对象类型、`type` 或 `interface` 建模，后续章节会系统学习。

---

## 动手编码：从 0 到 1

### 第 0 步：创建一个接受 `object` 的函数

创建 `src/main.ts`：

```ts
function describeObject(value: object): string {
  return `object keys=${Object.keys(value).length}`;
}
```

这里只要求参数必须是非原始值。

### 第 1 步：传入普通对象

```ts
console.log(describeObject({ name: 'Ada', role: 'admin' }));
```

对象有两个可枚举键，预期：

```text
object keys=2
```

### 第 2 步：识别数组

为了让输出更直观，先加入：

```ts
if (Array.isArray(value)) {
  return `array length=${value.length}`;
}
```

然后传入：

```ts
[1, 2, 3]
```

预期：

```text
array length=3
```

### 第 3 步：识别函数

加入：

```ts
if (typeof value === 'function') {
  return 'function object';
}
```

然后传入：

```ts
() => 'ok'
```

预期：

```text
function object
```

### 第 4 步：验证原始值会被阻止

临时加入：

```ts
// describeObject('hello');
// describeObject(42);
```

取消注释后执行类型检查，应该看到原始值不能传给 `object` 参数。

验证后恢复最终源码。

### 第 5 步：思考 `null`

虽然：

```text
typeof null === "object"
```

是 JavaScript 的历史行为，但 TypeScript 的小写 `object` 类型定义的是非原始值，`null` 并不能因为 `typeof` 的历史结果就直接当作 `object` 使用。

### 第 6 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`value: object` 对非原始值的约束。
- **实验辅助代码**：数组、函数和普通对象的分支只是为了观察 `object` 能接受哪些值。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp028-object/tsconfig.json
npm run build -- ./02-basic-types-inference/kp028-object/tsconfig.json
node ./02-basic-types-inference/kp028-object/dist/main.js
```

预期：

```text
object keys=2
array length=3
function object
```

## 效果验证

你应该能够确认：

- 小写 `object` 表示非原始值。
- 普通对象、数组和函数都可以赋给 `object`。
- 字符串、数字、布尔等原始值不能直接赋给 `object`。
- `object` 并不意味着一定存在某些业务属性。
- `object` 与 `Object`、`{}` 不是同一个概念，下一节会继续拆解。
