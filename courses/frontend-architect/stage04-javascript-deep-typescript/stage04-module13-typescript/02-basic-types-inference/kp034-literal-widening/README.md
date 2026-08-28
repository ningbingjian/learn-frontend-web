# TS-KP034：Literal Widening

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分基础类型 `string` 与字符串字面量类型 `'draft'`。
2. 理解 `const` 声明为什么能保留更具体的字面量信息。
3. 理解字面量信息进入可变 `let` 位置时为什么可能 widening 成更宽的基础类型。
4. 知道显式字面量类型标注可以保留非 widening 的精确信息。
5. 能解释为什么对象属性即使位于 `const` 对象中，仍可能被推断为较宽类型。
6. 知道 `as const` 可以抑制很多 widening，但其系统学习留到 TS-KP102。

> **本节核心代码**：`initialStatus`、`mutableStatus`、`fixedStatus`、`copiedFixedStatus` 四个变量形成 widening 对照。
>
> **实验辅助代码**：`acceptDraft()` 和临时错误调用用于证明静态类型，不是 widening 机制本身。

## 理论讲解

### 1. 字面量值也可以成为类型

普通基础类型：

```ts
string
```

表示很多可能的字符串。

而字面量类型：

```ts
'draft'
```

只表示一个具体字符串值。

可以建立集合直觉：

```text
string
├── 'draft'
├── 'published'
├── 'archived'
└── 其他任意字符串
```

所以：

```text
'draft'
比
string
更具体
```

### 2. `const` 能保存更具体的字面量信息

例如：

```ts
const status = 'draft';
```

因为变量本身不能重新赋值为另一个字符串，TypeScript 可以保留非常具体的字面量信息。

于是它可以传给只接受 `'draft'` 的函数：

```ts
function acceptDraft(value: 'draft') {}

acceptDraft(status);
```

### 3. 为什么复制到 `let` 后会 widening

看：

```ts
const initialStatus = 'draft';
let mutableStatus = initialStatus;
```

`mutableStatus` 是可变变量。

TypeScript 会考虑：

```ts
mutableStatus = 'published';
```

这类后续赋值是合理的，因此不会把它永久锁死为只有 `'draft'` 一个值。

它会 widening 到更宽的：

```ts
string
```

于是：

```ts
acceptDraft(mutableStatus);
```

不能通过检查，因为 `mutableStatus` 未来可能已经变成其他字符串。

### 4. widening 的核心目的

如果 TypeScript 把所有初始化字面量都永久锁死，会导致大量正常代码无法重新赋值。

例如：

```ts
let retryCount = 0;
retryCount = 1;
```

如果 `retryCount` 永远只有字面量类型 `0`，第二行就会错误。

因此可变位置通常需要从：

```text
具体字面量
↓
更宽基础类型
```

例如：

```text
'draft' → string
1       → number
true    → boolean
```

### 5. 显式字面量类型可以阻止这种扩宽

例如：

```ts
const fixedStatus: 'draft' = 'draft';
```

这里显式声明的就是字面量类型本身。

继续：

```ts
let copiedFixedStatus = fixedStatus;
```

这个来源不是普通的 widening 字面量，而是明确的 `'draft'` 类型契约，因此精确信息可以继续保留。

于是：

```ts
copiedFixedStatus = 'published';
```

会被 TypeScript 拒绝。

### 6. `const` 对象为什么不一定保存属性字面量

看：

```ts
const request = {
  method: 'GET'
};
```

虽然变量 `request` 自己不能重新指向别的对象，但对象属性仍然可以修改：

```ts
request.method = 'POST';
```

因此 `method` 通常不会自动永久锁成：

```ts
'GET'
```

而会保留更适合可变属性的字符串类型。

这说明：

```text
const 变量不可重新赋值
≠
对象内部属性全部只读
```

### 7. `as const` 先只建立直觉

后面会专门学习：

```ts
const request = {
  method: 'GET'
} as const;
```

它可以告诉 TypeScript 尽量不要把字面量扩宽，并让对象属性体现只读语义。

但 `as const` 会在 TS-KP102 单独深入，本节不提前展开。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp034-literal-widening/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建只接受字面量的函数

在 `src/main.ts` 写：

```ts
function acceptDraft(status: 'draft'): string {
  return `accepted:${status}`;
}
```

这个函数不接受任意字符串，只接受精确值 `'draft'`。

### 第 2 步：创建普通 `const`

加入：

```ts
const initialStatus = 'draft';
```

调用：

```ts
console.log(acceptDraft(initialStatus));
```

能够通过检查。

### 第 3 步：复制到 `let`

加入：

```ts
let mutableStatus = initialStatus;
```

然后允许：

```ts
mutableStatus = 'published';
```

这说明 `mutableStatus` 没有被永久锁定成 `'draft'`。

### 第 4 步：临时把可变值传给精确函数

在重新赋值前后都可以尝试：

```ts
acceptDraft(mutableStatus);
```

类型检查会拒绝，因为 `mutableStatus` 的静态类型已经扩宽成 `string`。

验证后删除这行。

### 第 5 步：创建显式字面量类型

加入：

```ts
const fixedStatus: 'draft' = 'draft';
```

这次不是让 TypeScript自行决定是否 widening，而是明确声明类型就是 `'draft'`。

### 第 6 步：把非 widening 字面量复制到 `let`

继续：

```ts
let copiedFixedStatus = fixedStatus;
```

调用：

```ts
console.log(acceptDraft(copiedFixedStatus));
```

能够通过。

### 第 7 步：临时尝试修改精确类型

尝试：

```ts
copiedFixedStatus = 'published';
```

应该得到类型错误。

这说明变量虽然使用 `let`，但它的类型契约仍然只有 `'draft'`。

验证后删除这行。

### 第 8 步：输出 widening 后的可变值

最终保留：

```ts
console.log(mutableStatus);
```

因为我们已经赋值：

```ts
mutableStatus = 'published';
```

所以运行时会输出：

```text
published
```

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：普通 `const` → 可变 `let` 的 widening，以及显式字面量类型如何保留精确类型。
- **实验辅助代码**：`acceptDraft()` 和临时错误赋值用于证明类型边界。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp034-literal-widening/tsconfig.json
npm run build -- ./02-basic-types-inference/kp034-literal-widening/tsconfig.json
node ./02-basic-types-inference/kp034-literal-widening/dist/main.js
```

预期：

```text
accepted:draft
accepted:draft
published
```

## 效果验证

你应该能够确认：

- `'draft'` 可以作为比 `string` 更具体的字面量类型。
- 普通 `const` 能保留精确字面量信息。
- 该值复制到可变 `let` 后可能 widening 为 `string`。
- 显式声明 `const fixedStatus: 'draft'` 可以保留非 widening 的精确类型。
- `const` 对象变量不代表内部属性自动只读。
- Literal Widening 是为了在“保留精确信息”和“允许正常可变代码”之间取得平衡。
