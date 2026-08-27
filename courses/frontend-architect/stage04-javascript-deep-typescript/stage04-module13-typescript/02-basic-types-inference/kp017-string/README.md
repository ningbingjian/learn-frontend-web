# TS-KP017：`string`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用小写 `string` 描述 JavaScript 字符串值。
2. 理解字符串字面量、模板字符串和函数参数中的 `string` 类型。
3. 区分 `string` 与大写包装类型 `String` 的使用场景。
4. 理解 TypeScript 可以根据字符串初始值做类型推断。
5. 能通过真实代码观察 `string` 的静态类型与运行时 `typeof` 结果。

> **本节核心代码**：`string` 类型标注、字符串参数、字符串返回值。
>
> **实验辅助代码**：`console.log()` 与 `typeof` 只用于观察结果。

## 理论讲解

### 1. `string` 对应 JavaScript 字符串值

TypeScript 使用：

```ts
const message: string = 'Hello';
```

描述普通 JavaScript 字符串。单引号、双引号和模板字符串都可以产生字符串值。

### 2. 优先使用小写 `string`

日常业务代码应该写：

```ts
let name: string;
```

而不是：

```ts
let name: String;
```

`String` 是 JavaScript 内建包装对象相关类型；普通字符串值应使用小写 `string`。

### 3. 类型标注不是每次都必须写

下面代码：

```ts
const category = 'Accessories';
```

TypeScript 可以从初始值推断它与字符串有关。显式类型标注适合表达边界和意图，类型推断适合避免重复信息。更系统的推断规则会在 TS-KP030 继续学习。

### 4. 字符串方法受类型约束

当参数是 `string`：

```ts
function normalizeLabel(value: string): string {
  return value.trim().toUpperCase();
}
```

TypeScript 知道 `trim()`、`toUpperCase()` 是字符串能力。如果错误传入数字，类型检查会在运行前阻止。

---

## 动手编码：从 0 到 1

### 第 0 步：创建最小文件

创建：

```text
kp017-string/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明第一个 `string`

在 `src/main.ts` 写：

```ts
const productName: string = 'Mechanical Keyboard';
```

这里显式告诉 TypeScript：`productName` 必须是字符串。

### 第 2 步：加入一个由 TypeScript 推断的字符串

继续写：

```ts
const category = 'Accessories';
```

没有写 `: string`，但 TypeScript 仍能从右侧值推断。

### 第 3 步：建立字符串函数边界

加入：

```ts
function normalizeLabel(value: string): string {
  return value.trim().toUpperCase();
}
```

参数和返回值都明确使用 `string`。

### 第 4 步：组合字符串

继续写：

```ts
const label = `${normalizeLabel(productName)} / ${normalizeLabel(category)}`;
```

模板字符串最终也是字符串值。

### 第 5 步：输出结果并观察运行时类型

加入：

```ts
console.log(label);
console.log(typeof productName);
```

预期：

```text
MECHANICAL KEYBOARD / ACCESSORIES
string
```

### 第 6 步：临时制造类型错误

临时把正确调用改成：

```ts
normalizeLabel(123)
```

执行类型检查，应看到 `number` 不能传给 `string` 参数。验证后恢复正确源码。

### 第 7 步：配置当前知识点

`tsconfig.json` 继承模块级基础配置，并把 `src/` 编译到 `dist/`。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`string`、字符串参数/返回值、字符串推断。
- **实验辅助代码**：`typeof` 和日志输出，用于确认 JavaScript 运行时看到的仍然是字符串值。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp017-string/tsconfig.json
npm run build -- ./02-basic-types-inference/kp017-string/tsconfig.json
node ./02-basic-types-inference/kp017-string/dist/main.js
```

预期：

```text
MECHANICAL KEYBOARD / ACCESSORIES
string
```

## 效果验证

你应该能够确认：

- 普通文本值使用小写 `string`。
- TypeScript 可以推断明显的字符串初始值。
- `string` 参数只能接受兼容的字符串值。
- 模板字符串的结果属于字符串。
- JavaScript 运行时 `typeof productName` 得到 `string`。
