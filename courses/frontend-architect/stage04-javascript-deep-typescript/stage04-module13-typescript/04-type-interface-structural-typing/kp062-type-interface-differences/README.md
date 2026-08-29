# TS-KP062：`type` 与 `interface` 差异

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么 `type` 可以直接给 primitive、Union、Tuple、函数等类型表达式取名。
2. 理解 `interface` 主要用于声明对象形状与对象能力契约。
3. 说明 `interface` 支持同名声明合并，而 `type` 不能同名重复声明。
4. 知道两者都有扩展能力，但使用的语法和适用范围不同。
5. 避免把“哪一个更快”“哪一个永远更好”当成固定结论。
6. 能根据具体类型表达式选择更自然的声明方式。

> **本节核心代码**：`PublishStatus`、`HttpResult` 展示 `type` 的表达范围，两个同名 `Account` 接口展示 declaration merging。
>
> **实验辅助代码**：日志输出只用于证明这些声明在最终 JavaScript 中对应的仍然是普通值。

## 理论讲解

### 1. 最大差异之一：type 可以给任意类型表达式取名

例如原始类型别名：

```ts
type UserId = number;
```

Tuple：

```ts
type HttpResult = [number, string];
```

Union：

```ts
type PublishStatus = 'draft' | 'published';
```

这些都非常自然。

### 2. interface 主要描述对象形状

接口常见形式：

```ts
interface Account {
  id: number;
  name: string;
}
```

它特别适合：

- 普通对象契约。
- 可调用对象。
- 可构造对象。
- 可以继承或声明合并的开放结构。

不能直接写成：

```ts
interface Status = 'draft' | 'published'
```

因为这不是 interface 语法。

### 3. interface 支持 declaration merging

例如：

```ts
interface Account {
  id: number;
}

interface Account {
  name: string;
}
```

最终接口会合并。

而 `type`：

```ts
type AccountAlias = {
  id: number;
};
```

不能在同一作用域再次写同名：

```ts
// type AccountAlias = {
//   name: string;
// };
```

### 4. 两者都有“扩展”能力，但语法不同

接口使用：

```ts
interface Child extends Parent {
  // ...
}
```

类型别名通常通过组合类型表达式实现扩展，例如交叉类型。

交叉类型会在 Chapter 06 系统学习，本节只知道：

> `type` 并不是因为没有 `extends` 关键字就无法组合对象结构。

### 5. type 更适合表达封闭的类型运算结果

当你需要表达：

- Union。
- Tuple。
- 函数别名。
- 条件类型。
- 映射类型。
- 模板字面量类型。

`type` 通常是自然入口。

后面高级类型章节会大量使用它。

### 6. interface 更适合“可开放扩展的对象契约”

如果一个公共对象契约希望：

- 被继承。
- 被第三方模块增强。
- 参与 declaration merging。

interface 的开放性会非常有价值。

但“开放”不是永远的优点。

如果你不希望别人意外合并某个名称，反而要谨慎使用 interface。

### 7. 不要用过时的性能口号替代工程判断

历史版本中编译器实现细节、性能建议可能发生变化。

因此不要机械背：

```text
interface 永远更快
```

或者：

```text
type 永远更现代
```

真正稳定的差异应该关注语言能力：

```text
能否声明合并
能否直接表达 Union / Tuple / primitive alias
扩展语法
API 是否需要开放增强
```

### 8. 对象场景中二者仍然大量重叠

即使存在差异：

```ts
type Product = {
  id: number;
};

interface ProductShape {
  id: number;
}
```

两种仍然都可以完成普通对象建模。

因此选型不是“一个能、另一个完全不能”的二选一战争。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp062-type-interface-differences/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：用 type 表达 Union

```ts
type PublishStatus = 'draft' | 'published';
```

### 第 2 步：用 type 表达 Tuple

```ts
type HttpResult = [number, string];
```

这两种结构如果硬用 interface 直接替代，会失去自然的表达方式。

### 第 3 步：声明第一个 Account 接口

```ts
interface Account {
  id: number;
}
```

### 第 4 步：再次声明同名 interface

```ts
interface Account {
  name: string;
}
```

TypeScript 会合并两次声明。

### 第 5 步：创建符合合并后接口的对象

```ts
const account: Account = {
  id: 1,
  name: 'Ada'
};
```

两个成员都必须存在。

### 第 6 步：创建 type 对应的实际值

```ts
const publishStatus: PublishStatus = 'published';
const result: HttpResult = [200, 'OK'];
```

### 第 7 步：输出

```ts
console.log(publishStatus);
console.log(`${result[0]}:${result[1]}`);
console.log(`${account.id}:${account.name}`);
```

预期：

```text
published
200:OK
1:Ada
```

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：type 对 Union/Tuple 的直接命名能力，以及 interface 的声明合并能力。
- **实验辅助代码**：创建实际值和输出，只用于验证类型最终仍然约束普通 JavaScript 数据。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp062-type-interface-differences/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp062-type-interface-differences/tsconfig.json
node ./04-type-interface-structural-typing/kp062-type-interface-differences/dist/main.js
```

预期：

```text
published
200:OK
1:Ada
```

## 效果验证

你应该能够确认：

- `type` 能直接命名 Union、Tuple 和 primitive 等任意类型表达式。
- `interface` 更聚焦对象形状与对象能力。
- `interface` 支持 declaration merging。
- `type` 不能在同一作用域重复同名声明。
- 两者都有组合与扩展能力，但语法和适用场景不同。
- 选型应该依赖语言能力和 API 设计需求，而不是口号。
