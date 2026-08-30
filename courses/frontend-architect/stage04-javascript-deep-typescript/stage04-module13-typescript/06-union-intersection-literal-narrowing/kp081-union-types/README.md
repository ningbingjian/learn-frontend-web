# TS-KP081：Union Types

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `A | B` 声明 Union Type。
2. 理解 Union 表示“值可能属于多个成员类型中的任意一个”。
3. 理解能赋给任一 Union Member 的值通常可以赋给整个 Union。
4. 理解 Union 值在未收窄前不能直接使用只属于某一个成员的能力。
5. 知道为什么使用成员专属能力前通常需要 Narrowing。
6. 区分 Union Type 与 `any`。
7. 理解 Union 只存在于静态类型系统，不会在运行时包装或转换值。

> **本节核心代码**：`type ProductId = string | number` 与 `normalizeProductId()` 的 Union 参数。
>
> **实验辅助代码**：`typeof` 分支只是为了让案例能够安全处理两个成员；完整 Narrowing 规则留到 TS-KP087。

## 理论讲解

### 1. 为什么需要 Union

真实业务里，同一个输入经常允许多种合法形态，例如产品 ID 可能来自：

```text
数据库数字 ID
101

外部系统字符串 ID
kb-001
```

如果写成 `any`：

```ts
function normalizeProductId(id: any) {
  // ...
}
```

TypeScript 几乎无法保护函数体。

Union 可以明确表达：

```ts
type ProductId = string | number;
```

含义是：

```text
ProductId
= string
或 number
```

不是“任意类型”。

### 2. Union Member

在：

```ts
string | number
```

中：

- `string` 是一个 Union Member。
- `number` 是另一个 Union Member。

下面都合法：

```ts
const a: string | number = 'kb-001';
const b: string | number = 101;
```

但：

```ts
const c: string | number = true;
```

不合法，因为 `boolean` 不属于这个 Union。

### 3. Union 不是同时拥有两边所有能力

如果：

```ts
function normalize(id: string | number) {
  // ...
}
```

在进入任何判断前，TypeScript 只知道：

```text
id 可能是 string
也可能是 number
```

因此不能直接写：

```ts
id.toUpperCase();
```

因为 `number` 没有 `toUpperCase()`。

也不能直接写：

```ts
id.toFixed(0);
```

因为 `string` 没有 `toFixed()`。

安全原则是：

> 在不知道当前到底是哪一个 Union Member 时，只能使用所有可能成员都能安全支持的操作，或者先通过控制流证据缩小类型范围。

### 4. 为什么最终案例出现 `typeof`

最终案例写：

```ts
if (typeof id === 'number') {
  return `#${id.toFixed(0)}`;
}

return id.toUpperCase();
```

在第一条分支中，TypeScript 能把 `id` 缩小为 `number`。

剩余分支中，`id` 就只剩 `string`。

本节只建立这个直觉：

```text
Union
  ↓
当前有多个可能
  ↓
需要运行时证据
  ↓
Narrowing
```

完整 `typeof` Narrowing 会在 TS-KP087 单独展开。

### 5. Union 与 `any` 的区别

`any` 更接近：

```text
关闭这里的大部分类型检查
```

Union 则是：

```text
明确告诉编译器：
只有这些可能
```

所以：

```ts
string | number
```

仍然保留非常强的类型信息。

### 6. Union 不会产生新的运行时容器

下面：

```ts
const id: string | number = 101;
```

运行时仍然只是 JavaScript number。

TypeScript 不会创建：

```text
UnionValue {
  type: 'number',
  value: 101
}
```

除非你的业务代码自己这样设计。

### 7. Union 很适合描述“有限的多形态输入”

常见场景包括：

- `string | number` ID。
- `File | URL` 输入来源。
- 成功结果 | 失败结果。
- 多种事件对象。
- 多种组件 Props 形态。

后面的 Literal Union 与 Discriminated Union 会让这套建模能力更强。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp081-union-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义产品 ID Union

在 `src/main.ts` 写：

```ts
type ProductId = string | number;
```

现在 `ProductId` 允许：

```text
string
number
```

但不允许 boolean。

### 第 2 步：创建处理函数

```ts
function normalizeProductId(id: ProductId): string {
  // ...
}
```

这时函数体里的 `id` 是：

```text
string | number
```

### 第 3 步：先处理 number 分支

```ts
if (typeof id === 'number') {
  return `#${id.toFixed(0)}`;
}
```

在这个分支内，`id` 已经是 `number`。

### 第 4 步：处理剩余 string 分支

继续写：

```ts
return id.toUpperCase();
```

因为 number 已在前面返回，所以剩余的 `id` 是 string。

### 第 5 步：分别传入两个 Union Member

```ts
console.log(normalizeProductId(101));
console.log(normalizeProductId('kb-001'));
```

预期：

```text
#101
KB-001
```

### 第 6 步：观察错误调用

临时尝试：

```ts
// normalizeProductId(true);
```

TypeScript 应该拒绝它，因为 `boolean` 不是 `ProductId` 的成员。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：Union 别名和 Union 参数。
- **实验辅助代码**：`typeof` 分支和日志。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp081-union-types/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp081-union-types/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp081-union-types/dist/main.js
```

预期输出：

```text
#101
KB-001
```

## 效果验证

完成后你应该能解释：

1. `string | number` 与 `any` 的本质区别。
2. 为什么 `boolean` 不能赋给 `string | number`。
3. 为什么 Union 值不能直接使用某一个成员独有的方法。
4. 为什么使用成员专属能力前通常需要 Narrowing。
5. 为什么 Union 不会改变 JavaScript 运行时值。
