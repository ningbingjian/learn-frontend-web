# TS-KP073：函数重载

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么同一个 JavaScript 函数有时需要多种静态调用签名。
2. 使用多个 Overload Signatures 描述一个函数的不同合法调用形态。
3. 为重载函数编写一个统一的函数实现。
4. 理解调用者看到的是重载签名，而不是“随便什么参数都能进实现体”。
5. 根据参数类型变化保留不同的返回值类型。
6. 知道什么时候 Union 参数比函数重载更简单、更合适。
7. 避免为了展示技巧而滥用重载。

> **本节核心代码**：`normalize(string): string` 与 `normalize(string[]): string[]` 两个重载签名。
>
> **实验辅助代码**：字符串清理、数组 `map()` 和日志输出用于验证两种调用得到不同的静态返回类型。

## 理论讲解

### 1. 一个函数可能存在多种合法调用方式

JavaScript API 经常允许同一个函数根据输入形态做不同事情。

例如我们希望：

```ts
normalize(' keyboard ')
```

得到：

```ts
string
```

同时：

```ts
normalize([' mouse ', ' monitor '])
```

得到：

```ts
string[]
```

运行时当然可以写成一个函数：

```ts
function normalize(value: string | string[]) {
  // ...
}
```

但如果直接把返回类型写成：

```ts
string | string[]
```

那么调用者可能失去“输入是什么，输出就精确是什么”的关联信息。

函数重载就是用来公开多种调用契约的工具之一。

### 2. 最基本的重载结构

TypeScript 的重载函数通常包含：

```text
Overload Signature 1
Overload Signature 2
...
Implementation Signature + 函数体
```

例如：

```ts
function normalize(value: string): string;
function normalize(value: string[]): string[];
function normalize(value: string | string[]): string | string[] {
  // 实际实现
}
```

前两行没有函数体。

它们负责告诉调用者：

```text
传 string
→ 得 string

传 string[]
→ 得 string[]
```

最后一行才是真正的 JavaScript 实现入口。

### 3. 重载的价值在于保留调用关系

如果写：

```ts
const single = normalize(' keyboard ');
```

TypeScript 可以根据第一个 overload 确定：

```text
single → string
```

因此：

```ts
single.toUpperCase();
```

是安全的。

而：

```ts
const multiple = normalize([' mouse ', ' monitor ']);
```

会匹配第二个 overload：

```text
multiple → string[]
```

所以：

```ts
multiple.join(' | ');
```

也可以直接调用。

### 4. 一个函数只有一个真正实现

不要误以为：

```ts
function normalize(value: string): string;
function normalize(value: string[]): string[];
```

会生成两个 JavaScript 函数。

不会。

真正存在于运行时代码里的只有：

```ts
function normalize(value: string | string[]): string | string[] {
  // ...
}
```

Overload Signatures 属于 TypeScript 类型层能力，编译后会被擦除。

### 5. 实现必须覆盖所有 overload

因为两个重载分别允许：

```text
string
string[]
```

实现必须能够处理两类输入。

所以我们写：

```ts
if (typeof value === 'string') {
  return value.trim().toUpperCase();
}

return value.map((item) => item.trim().toUpperCase());
```

控制流收窄让两个分支分别得到正确类型。

### 6. 不要把 overload 当作输入运行时校验

即使 TypeScript 静态声明了：

```ts
normalize(value: string)
normalize(value: string[])
```

这些声明编译后也会消失。

如果 JavaScript 调用者、网络数据或 `any` 在运行时传进错误值：

```text
TypeScript overload
不会自动替你验证
```

需要真实运行时校验时仍要自己实现。

### 7. 能用 Union 清楚表达时，不一定需要 overload

假设函数无论输入是什么都返回同一个类型：

```ts
function length(value: string | unknown[]): number {
  return value.length;
}
```

这种情况下，直接 Union 往往更简单。

不要机械改成：

```ts
function length(value: string): number;
function length(value: unknown[]): number;
```

如果 Union 参数已经能自然表达 API，重载只会增加维护成本。

可以建立一个实用判断：

```text
多个调用形态
且
参数组合 / 返回类型之间有明显对应关系
        ↓
考虑 overload

单个 Union 参数已经足够清晰
        ↓
优先简单 Union
```

### 8. 重载顺序也是 API 的一部分

当多个 overload 都可能和某个调用接近时，TypeScript 需要从声明集合中选择匹配项。

所以公共 API 中的 overload：

- 不要大量重复。
- 不要写高度重叠、难以预测的签名。
- 从调用者视角设计，而不是从实现体视角堆类型技巧。

更复杂的 overload 解析和泛型组合会在后续课程继续出现。

### 9. 下一节要解决一个核心疑问

看到：

```ts
function normalize(value: string): string;
function normalize(value: string[]): string[];
function normalize(value: string | string[]): string | string[] {
  // ...
}
```

很自然会问：

> 为什么最后这个 implementation signature 不能直接作为第三种外部调用方式？

这正是下一节 TS-KP074 的主题。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp073-function-overloads/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先写字符串版本的需求

在 `src/main.ts` 中先写第一个 overload：

```ts
function normalize(value: string): string;
```

本步只声明：

```text
string → string
```

还没有函数体。

### 第 2 步：增加数组版本

继续：

```ts
function normalize(value: string[]): string[];
```

现在公开 API 有两个合法调用形态：

```text
string   → string
string[] → string[]
```

### 第 3 步：编写统一实现签名

加入：

```ts
function normalize(value: string | string[]): string | string[] {
}
```

实现必须能覆盖两个 overload。

### 第 4 步：先处理字符串分支

```ts
if (typeof value === 'string') {
  return value.trim().toUpperCase();
}
```

此时分支内：

```text
value → string
```

### 第 5 步：处理数组分支

剩余分支中：

```ts
return value.map((item) => item.trim().toUpperCase());
```

TypeScript 已经知道：

```text
value → string[]
item  → string
```

### 第 6 步：分别调用两种 overload

```ts
const single = normalize(' keyboard ');
const multiple = normalize([' mouse ', ' monitor ']);
```

TypeScript 会分别得到：

```text
single   → string
multiple → string[]
```

### 第 7 步：使用各自特有能力

```ts
console.log(single);
console.log(multiple.join(' | '));
```

这里不需要重新判断：

```ts
Array.isArray(...)
```

因为 overload 已经把调用结果精确化。

### 第 8 步：临时制造非法输入

可以临时尝试：

```ts
// normalize(123);
```

类型检查应该失败。

因为公开 overload 中不存在：

```text
number → ?
```

验证后保持注释或删除。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：两个 overload signatures 和一个统一实现。
- **实验辅助代码**：字符串格式化、数组映射与日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp073-function-overloads/tsconfig.json
npm run build -- ./05-function-type-system/kp073-function-overloads/tsconfig.json
node ./05-function-type-system/kp073-function-overloads/dist/main.js
```

预期输出：

```text
KEYBOARD
MOUSE | MONITOR
```

## 效果验证

你应该能够确认：

- 一个 TypeScript 函数可以公开多个 Overload Signatures。
- `string` 输入得到精确 `string` 返回类型。
- `string[]` 输入得到精确 `string[]` 返回类型。
- 多个 overload 最终仍然只有一个 JavaScript 实现。
- 实现必须能够处理所有公开的 overload 调用形态。
- 如果一个 Union 参数已经足够自然，不应该为了“高级”而强行使用 overload。
