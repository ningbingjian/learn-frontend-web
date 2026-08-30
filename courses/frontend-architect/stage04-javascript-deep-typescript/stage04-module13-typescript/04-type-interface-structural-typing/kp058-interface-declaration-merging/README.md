# TS-KP058：接口声明合并

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解同一作用域中同名 `interface` 声明会被 TypeScript 合并。
2. 创建两个同名接口，并使用包含双方成员的最终接口。
3. 理解普通非函数同名成员重复声明时必须类型兼容。
4. 知道接口方法/函数成员的合并还能参与重载，但本节只建立基本认识。
5. 区分 `interface` 的开放式声明合并和 `type` 别名不能同名重复声明的行为。
6. 理解声明合并只影响类型系统，不会自动给运行时对象添加字段。
7. 知道声明合并既能用于扩展，也可能导致全局命名冲突，因此需要关注作用域。

> **本节核心代码**：两段同名 `interface Account` 合并为一个完整契约。
>
> **实验辅助代码**：`Object.keys()` 用于证明运行时对象只包含我们真实创建的属性，而不是由 interface 自动生成属性。

## 理论讲解

### 1. interface 是“开放”的声明

TypeScript 允许：

```ts
interface Account {
  id: number;
  name: string;
}

interface Account {
  email: string;
}
```

编译器会把它们视为同一个 `Account` 类型声明的组成部分。

最终效果可以先理解成：

```ts
interface Account {
  id: number;
  name: string;
  email: string;
}
```

### 2. 这叫 Declaration Merging

也就是“声明合并”。

核心不是把两个 JavaScript 对象合并，而是：

```text
两个同名类型声明
        ↓
TypeScript 编译器
        ↓
一个合并后的类型定义
```

### 3. 合并后所有成员都成为要求

如果最终 `Account` 包含：

```text
id
name
email
```

那么：

```ts
const account: Account = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};
```

三个成员都必须满足。

### 4. 同名非函数成员不能冲突

下面两个声明兼容：

```ts
interface Config {
  timeout: number;
}

interface Config {
  timeout: number;
}
```

但如果第二个变成：

```ts
// interface Config {
//   timeout: string;
// }
```

会产生错误。

因为合并后的同一个属性不能拥有冲突的声明类型。

### 5. 函数成员有额外的重载合并规则

同名函数成员可以参与函数重载集合。

这是声明合并更高级的能力之一。

本节先掌握普通属性合并；函数重载会在函数类型章节系统学习。

### 6. `type` 别名不能这样重复打开

下面不允许：

```ts
// type Account = { id: number };
// type Account = { email: string };
```

因为类型别名不是这种开放式声明。

这是 `interface` 和 `type` 的重要差异之一，TS-KP062 会正式比较。

### 7. 声明合并不会创建运行时属性

如果 interface 合并后要求：

```text
id
name
email
```

这些字段之所以存在于运行时对象，是因为我们实际写了：

```ts
const account = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};
```

不是因为 interface 帮我们生成了对象。

编译后 interface 本身仍然消失。

### 8. 声明合并为什么有工程价值

它可以让不同声明位置对同一个公共接口进行扩展。

TypeScript 生态中的类型扩展、模块增强和部分第三方库声明会利用这个能力。

但它也意味着：

> 在全局作用域随便使用过于通用的接口名，可能发生意外合并。

因此现代工程通常通过模块作用域、明确命名或 module augmentation 控制扩展边界。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp058-interface-declaration-merging/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明 Account 的第一部分

```ts
interface Account {
  id: number;
  name: string;
}
```

### 第 2 步：再次声明同名接口

```ts
interface Account {
  email: string;
}
```

这里不是覆盖前一段，而是参与合并。

### 第 3 步：创建完整对象

```ts
const account: Account = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};
```

如果漏掉第二次声明新增的 `email`，类型检查会失败。

### 第 4 步：输出完整信息

```ts
console.log(`${account.id}:${account.name}:${account.email}`);
```

预期：

```text
1:Ada:ada@example.com
```

### 第 5 步：观察真实运行时属性

```ts
console.log(Object.keys(account).join(','));
```

预期：

```text
id,name,email
```

这里的三个属性来自真实对象字面量，而不是 interface 运行时生成。

### 第 6 步：临时制造冲突声明

尝试：

```ts
// interface Account {
//   id: string;
// }
```

类型检查应该失败，因为已有 `id: number`。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：两个同名 `interface Account`。
- **实验辅助代码**：对象创建和 `Object.keys()`。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp058-interface-declaration-merging/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp058-interface-declaration-merging/tsconfig.json
node ./04-type-interface-structural-typing/kp058-interface-declaration-merging/dist/main.js
```

预期：

```text
1:Ada:ada@example.com
id,name,email
```

## 效果验证

你应该能够确认：

- 同一作用域中的同名 interface 会合并。
- 合并后的接口包含双方成员。
- 冲突的同名非函数成员不能合并。
- `type` 别名不能使用同名重复声明实现同样效果。
- interface 声明合并是类型系统能力，不会自动生成运行时字段。
