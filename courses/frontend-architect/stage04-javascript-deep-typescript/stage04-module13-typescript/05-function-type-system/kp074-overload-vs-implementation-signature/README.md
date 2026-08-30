# TS-KP074：Overload Signature 与 Implementation Signature

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 Overload Signature 和 Implementation Signature 的职责。
2. 理解外部调用者只能根据 Overload Signatures 调用重载函数。
3. 理解 Implementation Signature 虽然写在源码中，但不会自动成为一个公开 overload。
4. 判断实现参数类型是否能够兼容所有 overload。
5. 判断实现返回类型是否能够覆盖 overload 的返回要求。
6. 解释为什么一个 `string | number` 变量可能不能直接调用只有 `string` / `number` 两个 overload 的函数。
7. 避免把“实现体能处理”误解成“外部就一定允许这样调用”。

> **本节核心代码**：`convert(string): string`、`convert(number): number` 与实现签名 `convert(string | number): string | number`。
>
> **实验辅助代码**：`typeof` 和日志输出用于观察两个 overload 分别获得精确返回类型。

## 理论讲解

### 1. 重载函数里其实有两类签名

观察：

```ts
function convert(value: string): string;
function convert(value: number): number;
function convert(value: string | number): string | number {
  // ...
}
```

这里不是三个地位完全一样的签名。

前两个是：

```text
Overload Signatures
```

最后一个是：

```text
Implementation Signature
```

职责完全不同。

### 2. Overload Signature 是给调用者看的

调用者写：

```ts
convert(' keyboard ')
```

TypeScript 会尝试匹配：

```ts
function convert(value: string): string;
```

因此返回类型是：

```text
string
```

调用：

```ts
convert(3.6)
```

匹配：

```ts
function convert(value: number): number;
```

结果是：

```text
number
```

### 3. Implementation Signature 是给实现体看的

真正的函数体只有这一份：

```ts
function convert(value: string | number): string | number {
  // ...
}
```

它需要提供足够宽的参数范围来实现所有 overload。

所以内部可以写：

```ts
if (typeof value === 'string') {
  // string 分支
} else {
  // number 分支
}
```

### 4. Implementation Signature 对外不可见

这是最容易误解的一点。

虽然实现写成：

```ts
value: string | number
```

但它不会自动额外公开：

```text
(string | number) → string | number
```

这种调用签名。

例如：

```ts
const mixed: string | number = Math.random() > 0.5
  ? 'keyboard'
  : 3.6;

// convert(mixed);
```

即使实现体理论上能处理 `mixed`，这个调用仍可能报错。

原因是调用点要匹配某一个公开 overload：

```text
mixed 是 string | number

不是确定的 string
也不是确定的 number

因此不能匹配单个 overload
```

如果 API 需要允许 Union 值直接调用，就应该明确设计对应签名，或者重新考虑是否直接使用 Union 参数函数更合适。

### 5. 为什么 Implementation Signature 必须更宽

假设写：

```ts
function convert(value: string): string;
function convert(value: number): number;
```

但实现却是：

```ts
function convert(value: string): string {
  return value;
}
```

那么：

```text
number overload
无法被实现签名处理
```

TypeScript 会拒绝这种重载定义。

### 6. 返回类型也要兼容

如果 overload 声明：

```ts
function convert(value: string): string;
function convert(value: number): number;
```

实现必须有能力返回：

```text
string 或 number
```

不能写成一个永远只返回：

```text
boolean
```

的实现。

### 7. 实现签名不是第三个 overload

可以建立一个非常重要的模型：

```text
源码中看到三行函数头

前两行
→ API surface

最后一行
→ implementation detail
```

这也解释了为什么：

```ts
function fn(value: string): void;
function fn(value?: string) {
  // ...
}

// fn(); // 仍然可能不允许
```

即使实现体的参数写成可选，也不能直接推导出“调用者可以不传”。

调用能力必须由 overload signatures 明确表达。

### 8. 外部契约和内部实现要分开设计

好的重载 API 通常先问：

```text
调用者应该看到哪些合法调用？
```

然后再问：

```text
一个实现体怎么同时处理这些情况？
```

不要反过来：

```text
实现体写得很宽
→ 就把所有内部可能性都暴露给外部
```

这是 API 设计里非常重要的边界意识。

### 9. 为什么这会影响后续函数兼容性学习

后续 TS-KP077～080 会讨论：

- 参数数量兼容。
- 返回值兼容。
- `strictFunctionTypes`。
- `void` 回调规则。

这些知识都依赖一个共同前提：

> 先分清“一个函数对外承诺的类型”和“它内部是怎么实现的”。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp074-overload-vs-implementation-signature/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明字符串 overload

```ts
function convert(value: string): string;
```

表示：

```text
string → string
```

### 第 2 步：声明数字 overload

```ts
function convert(value: number): number;
```

表示：

```text
number → number
```

### 第 3 步：写 Implementation Signature

```ts
function convert(value: string | number): string | number {
}
```

这里的 Union 是为了覆盖前面两个公开调用。

### 第 4 步：实现字符串逻辑

```ts
if (typeof value === 'string') {
  return value.trim().toUpperCase();
}
```

### 第 5 步：实现数字逻辑

```ts
return Math.round(value);
```

因为字符串分支已经返回，剩余位置中 `value` 已经收窄为 `number`。

### 第 6 步：从调用侧观察返回类型

```ts
const text = convert(' keyboard ');
const count = convert(3.6);
```

此时：

```text
text  → string
count → number
```

不是统一的：

```text
string | number
```

因为调用匹配了不同的 Overload Signature。

### 第 7 步：输出类型观察结果

```ts
console.log(`${text}:${typeof text}`);
console.log(`${count}:${typeof count}`);
```

预期：

```text
KEYBOARD:string
4:number
```

### 第 8 步：验证 Implementation Signature 不可直接调用

临时加入：

```ts
const mixed: string | number = Math.random() > 0.5
  ? 'keyboard'
  : 3.6;

// convert(mixed);
```

取消最后一行注释时应该看到类型错误。

原因不是实现体不能处理，而是没有单个公开 overload 接收 `string | number`。

验证后恢复注释或删除实验代码。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：两个 Overload Signatures 与一个 Implementation Signature。
- **实验辅助代码**：`typeof` 和输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp074-overload-vs-implementation-signature/tsconfig.json
npm run build -- ./05-function-type-system/kp074-overload-vs-implementation-signature/tsconfig.json
node ./05-function-type-system/kp074-overload-vs-implementation-signature/dist/main.js
```

预期输出：

```text
KEYBOARD:string
4:number
```

## 效果验证

你应该能够确认：

- Overload Signatures 决定外部合法调用形态。
- Implementation Signature 负责容纳并实现所有 overload。
- Implementation Signature 不会自动成为外部可见调用签名。
- 每次调用根据匹配的 overload 获得精确返回类型。
- “实现体能处理”与“API 对外允许”是两个不同问题。
