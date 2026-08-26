# TS-KP007：结构化类型系统基本直觉

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用一句话解释 TypeScript 的结构化类型直觉：主要看“对象具有什么结构”，而不是“类型叫什么名字”。
2. 理解一个拥有更多属性的对象通常可以传给只要求少量属性的函数。
3. 理解两个不同声明来源的类型，只要所需结构兼容，就可以互相赋值或传递。
4. 知道结构化类型不是“任何对象都兼容”，缺少必需成员或成员类型错误仍会失败。
5. 知道对象字面量额外属性检查、类私有成员等特殊规则会在后续课程展开。

> **本节核心知识**：先建立“看结构、不看名字”的直觉；具体兼容规则会在 TS-KP188 以后系统深入。
>
> **实验辅助代码**：Customer 和 Service 两个对象只是为了证明完全不同领域的对象可以共享同一个最小结构契约。

## 理论讲解

### 1. 先看一个最小结构

定义：

```ts
type HasName = {
  name: string;
};
```

它表达的不是“必须是某个叫 HasName 的类实例”，而是：

```text
这个值至少要有：
name: string
```

### 2. 不同来源的对象可以满足同一个结构

例如客户对象：

```ts
const customer = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};
```

以及服务对象：

```ts
const service = {
  name: 'Billing Service',
  version: 'v2'
};
```

它们领域完全不同，但都拥有：

```ts
name: string
```

所以都可以传给：

```ts
function printName(value: HasName) {
  console.log(value.name);
}
```

### 3. 类型名不同，不代表一定不兼容

例如：

```ts
type UserName = {
  name: string;
};

interface ProductName {
  name: string;
}
```

虽然声明方式和名字不同，但核心结构相同。

结构化类型系统更关心：

```text
目标要求什么成员？
来源是否拥有这些成员？
对应成员类型是否兼容？
```

### 4. 多出来的属性通常不会破坏已有结构

如果函数只需要：

```ts
{ name: string }
```

那么一个变量拥有：

```ts
{
  id: number;
  name: string;
  email: string;
}
```

通常仍然可以使用，因为它已经满足目标所需的最小结构。

### 5. 结构化不等于无限宽松

下面对象缺少 `name`：

```ts
const anonymous = {
  id: 2
};
```

它不能满足 `HasName`。

下面对象虽然有 `name`，但类型错误：

```ts
const wrong = {
  name: 123
};
```

同样不兼容。

### 6. 先不要把所有例外塞进这一课

TypeScript 的兼容规则还有很多细节：

- 对象字面量的 Excess Property Checking。
- 函数参数与返回值兼容。
- class 的 private / protected 成员。
- 泛型兼容。
- 协变、逆变、双变。

这些会在后续专门学习。本节只建立最重要的第一直觉。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验问题

我们要验证：

> 两个完全不同的对象，没有 `implements HasName`，为什么仍然可以传给 `printName()`？

### 第 1 步：定义最小结构

创建 `src/main.ts`：

```ts
type HasName = {
  name: string;
};
```

### 第 2 步：写一个只依赖这个结构的函数

加入：

```ts
function printName(value: HasName): void {
  console.log(value.name);
}
```

这个函数没有要求 `id`、`email`、`version`。

### 第 3 步：创建客户对象

加入：

```ts
const customer = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};
```

它比 `HasName` 多出两个属性。

### 第 4 步：创建完全不同领域的服务对象

加入：

```ts
const service = {
  name: 'Billing Service',
  version: 'v2'
};
```

### 第 5 步：把两个对象都传给同一个函数

加入：

```ts
printName(customer);
printName(service);
```

两次调用都能通过类型检查。

原因不是它们继承了同一个基类，而是：

```text
customer 有 name: string
service  也有 name: string
          ↓
都满足 HasName
```

### 第 6 步：制造缺少成员的错误

临时加入：

```ts
const anonymous = { id: 2 };
printName(anonymous);
```

TypeScript 应指出缺少 `name`。

观察后删除这两行。

### 第 7 步：制造成员类型错误

临时加入：

```ts
const wrong = { name: 123 };
printName(wrong);
```

此时 `name` 存在，但不是 `string`，仍然不兼容。

### 第 8 步：完成案例并对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节总结：

- **核心代码**：`HasName` 和 `printName(value: HasName)` 展示 TypeScript 主要按所需结构判断兼容性。
- **实验辅助代码**：customer、service 和临时错误对象只用于做兼容性对照。

## 运行案例

类型检查：

```bash
npm run check -- ./01-typescript-foundations/kp007-structural-typing-intuition/tsconfig.json
```

编译：

```bash
npm run build -- ./01-typescript-foundations/kp007-structural-typing-intuition/tsconfig.json
```

运行：

```bash
node ./01-typescript-foundations/kp007-structural-typing-intuition/dist/main.js
```

预期输出：

```text
Ada
Billing Service
```

## 效果验证

你应该能够解释：

1. customer 没有声明 `implements HasName`，为什么仍然兼容？
2. service 和 customer 完全不同，为什么都能传给同一个函数？
3. 多出来的 `id`、`email`、`version` 为什么没有妨碍这两个变量满足 `HasName`？
4. 缺少 `name` 或 `name` 不是 `string` 为什么会失败？
5. “看结构不看类型名字”这句话的适用范围是什么？
