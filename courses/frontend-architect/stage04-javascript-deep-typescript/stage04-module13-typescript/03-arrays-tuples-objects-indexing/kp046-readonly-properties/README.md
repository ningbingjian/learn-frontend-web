# TS-KP046：`readonly` 属性

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `readonly property: Type` 阻止通过某个对象类型重新赋值属性。
2. 区分普通可写属性和只读属性。
3. 理解 TypeScript `readonly` 是静态检查约束，不会自动冻结 JavaScript 对象。
4. 理解 `readonly` 默认是浅层约束，嵌套对象内部成员仍可能可写。
5. 区分 `const` 变量绑定和 `readonly` 对象属性。
6. 知道只读属性适合表达创建后身份不应被替换的字段。

> **本节核心代码**：`readonly id: number`。
>
> **实验辅助代码**：继续修改 `name` 和 `metadata.category`，用于证明 `readonly` 的边界。

## 理论讲解

### 1. 普通对象属性默认可写

例如：

```ts
const product: {
  id: number;
  name: string;
} = {
  id: 101,
  name: 'Keyboard'
};
```

虽然变量本身使用：

```ts
const
```

但仍然可以：

```ts
product.id = 102;
product.name = 'Mouse';
```

为什么？

因为：

```text
const
→ 不能把 product 变量重新绑定到另一个对象

但
→ 不代表对象内部属性自动 readonly
```

### 2. `readonly` 用于限制属性重新赋值

可以写：

```ts
const product: {
  readonly id: number;
  name: string;
} = {
  id: 101,
  name: 'Keyboard'
};
```

此时：

```ts
product.name = 'Mouse';
```

仍然允许。

但：

```ts
// product.id = 102;
```

会在类型检查阶段失败。

### 3. `readonly` 是 TypeScript 静态约束

非常重要：

```ts
readonly id: number
```

不会让 JavaScript 自动执行：

```js
Object.freeze(product)
```

编译以后 `readonly` 类型信息会被擦除。

所以：

```text
readonly
→ 编译期写入限制

Object.freeze()
→ JavaScript 运行时冻结机制
```

两者职责不同。

### 4. `readonly` 默认是浅层的

本节对象：

```ts
const product: {
  readonly id: number;
  name: string;
  metadata: {
    category: string;
  };
} = {
  // ...
};
```

`id` 不能重新赋值。

但：

```ts
product.metadata.category = 'Accessories';
```

仍然可以。

因为 `metadata` 内部的：

```ts
category
```

没有声明 `readonly`。

即使写：

```ts
readonly metadata: { category: string }
```

也主要阻止：

```ts
product.metadata = anotherObject;
```

并不会自动递归把 `category` 变只读。

### 5. `readonly` 不等于深度不可变

如果业务真正需要深层不可变，需要：

- 每一层都表达只读约束。
- 或后续使用映射类型设计 DeepReadonly。
- 同时如果还要求运行时不可变，需要额外运行时机制。

后面映射类型章节会继续讨论深层只读。

### 6. `const` 与 `readonly` 关注点不同

对比：

```ts
const product = {
  id: 101
};
```

`const` 约束：

```text
product 这个变量绑定
```

而：

```ts
{
  readonly id: number
}
```

约束：

```text
id 这个属性通过该类型引用不能被重新写入
```

所以：

```text
const
→ 变量层面

readonly
→ 属性/结构层面
```

### 7. 什么时候适合 readonly 属性

常见场景：

- 数据库主键。
- 创建后不应变化的订单号。
- 配置对象中的稳定标识。
- 坐标、事件、快照等只读视图。
- 函数不应该修改的输入结构。

`readonly` 可以让“这个字段不应该被改”成为类型契约，而不是依赖团队口头约定。

### 8. readonly 不等于真正安全边界

因为 TypeScript 类型在运行时消失。

如果外部 JavaScript、反射式代码或类型断言绕开静态检查，运行时对象本身并不会自动保护该字段。

因此仍然要区分：

```text
类型设计
vs
运行时防御
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp046-readonly-properties/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建带 readonly id 的对象类型

在 `src/main.ts`：

```ts
const product: {
  readonly id: number;
  name: string;
  metadata: { category: string };
} = {
  id: 101,
  name: 'Keyboard',
  metadata: { category: 'Input' }
};
```

### 第 2 步：修改普通属性

```ts
product.name = 'Mechanical Keyboard';
```

可以通过。

这说明：

```text
readonly id
```

不会顺带把其它字段变只读。

### 第 3 步：临时尝试修改 id

加入：

```ts
// product.id = 102;
```

取消注释后类型检查应该失败：

```text
Cannot assign to 'id' because it is a read-only property.
```

验证后恢复注释。

### 第 4 步：修改嵌套对象

```ts
product.metadata.category = 'Accessories';
```

可以通过。

这一步用于证明 `readonly` 不是深度递归的。

### 第 5 步：输出最终结果

```ts
console.log(
  `${product.id}:${product.name}:${product.metadata.category}`
);
```

预期：

```text
101:Mechanical Keyboard:Accessories
```

### 第 6 步：思考 `const`

当前本来就写：

```ts
const product = ...
```

但我们仍然成功修改了：

```ts
product.name
product.metadata.category
```

因此可以再次确认：

```text
const 变量
≠
对象所有属性 readonly
```

### 第 7 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`readonly id`。
- **实验辅助代码**：修改其它属性用于验证浅层边界。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp046-readonly-properties/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp046-readonly-properties/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp046-readonly-properties/dist/main.js
```

预期：

```text
101:Mechanical Keyboard:Accessories
```

## 效果验证

你应该能够确认：

- `readonly id` 可以读取，但不能通过该类型引用重新赋值。
- `readonly` 不会影响未标记的 `name`。
- 嵌套对象内部属性默认仍然可以修改。
- `readonly` 不会自动执行 `Object.freeze()`。
- `const` 和 `readonly` 分别约束变量绑定与属性写入。
