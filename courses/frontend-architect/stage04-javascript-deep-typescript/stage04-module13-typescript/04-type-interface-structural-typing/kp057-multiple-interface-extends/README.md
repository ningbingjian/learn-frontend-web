# TS-KP057：多接口继承

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `interface X extends A, B` 同时继承多个接口。
2. 理解最终接口需要满足所有父接口成员和自己的成员。
3. 使用多个小型能力接口组合完整业务契约。
4. 理解父接口出现同名兼容成员和同名冲突成员时的差异。
5. 知道多接口继承仍然只是类型层组合，不会产生 JavaScript 多重继承。
6. 能判断什么时候多接口继承比“巨型基础接口”更清晰。

> **本节核心代码**：`Product extends Identifiable, Timestamped`。
>
> **实验辅助代码**：日期字符串和日志输出只用于观察组合后的完整结构。

## 理论讲解

### 1. 一个对象往往拥有多种独立能力

例如产品既可能：

```text
有唯一 ID
```

又可能：

```text
有创建时间
```

这两项并不天然属于同一个巨大父接口。

可以拆成：

```ts
interface Identifiable {
  id: number;
}

interface Timestamped {
  createdAt: string;
}
```

### 2. 一个接口可以继承多个接口

语法：

```ts
interface Product extends Identifiable, Timestamped {
  name: string;
  price: number;
}
```

可以理解成：

```text
Identifiable ─┐
              ├─> Product
Timestamped ──┘
```

最终 `Product` 需要拥有：

```text
id
createdAt
name
price
```

### 3. 多继承很适合能力拆分

比如：

```text
Identifiable
Timestamped
Serializable
Auditable
```

可以根据业务契约组合需要的能力，而不是让所有对象都继承一个塞满字段的 `BaseObject`。

### 4. 多接口继承不是 JavaScript 多重继承

TypeScript 的接口会被擦除。

所以：

```ts
interface Product extends A, B {}
```

不会在运行时产生：

```text
两个 prototype 父链
```

它只是告诉类型系统：

> `Product` 必须同时满足 `A` 和 `B` 的结构。

### 5. 父接口有同名成员时必须能同时满足

例如：

```ts
interface A {
  id: number;
}

interface B {
  id: number;
}
```

这种要求一致，组合是可理解的。

但如果：

```ts
interface A {
  id: number;
}

interface B {
  id: string;
}
```

再尝试：

```ts
// interface C extends A, B {}
```

会产生冲突。

因为 `C.id` 不可能同时按接口继承规则既满足 `number` 又满足冲突的 `string` 契约。

### 6. 多接口继承与职责拆分

比较：

```text
方案 A：一个巨型 BaseEntity
```

和：

```text
方案 B：多个小接口按需组合
```

如果能力彼此独立，方案 B 往往更容易复用和理解。

但不要为了“组件化”把每一个字段都拆成一个接口；接口拆分仍然应该服务业务语义。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp057-multiple-interface-extends/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义第一个公共能力

```ts
interface Identifiable {
  id: number;
}
```

### 第 2 步：定义第二个独立能力

```ts
interface Timestamped {
  createdAt: string;
}
```

两个接口互不依赖。

### 第 3 步：同时继承两个接口

```ts
interface Product extends Identifiable, Timestamped {
  name: string;
  price: number;
}
```

现在 `Product` 同时获得两个父接口成员。

### 第 4 步：创建完整值

```ts
const product: Product = {
  id: 101,
  createdAt: '2026-08-29',
  name: 'Keyboard',
  price: 499
};
```

如果缺少 `id` 或 `createdAt`，都不能满足 `Product`。

### 第 5 步：观察结果

```ts
console.log(`${product.id}:${product.createdAt}:${product.name}`);
```

预期：

```text
101:2026-08-29:Keyboard
```

### 第 6 步：临时制造父接口冲突

尝试：

```ts
// interface HasNumericId {
//   id: number;
// }
//
// interface HasStringId {
//   id: string;
// }
//
// interface Broken extends HasNumericId, HasStringId {}
```

类型检查应该失败。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：逗号分隔的多个父接口。
- **实验辅助代码**：产品数据和输出。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp057-multiple-interface-extends/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp057-multiple-interface-extends/tsconfig.json
node ./04-type-interface-structural-typing/kp057-multiple-interface-extends/dist/main.js
```

预期：

```text
101:2026-08-29:Keyboard
```

## 效果验证

你应该能够确认：

- 一个接口可以同时继承多个接口。
- 最终接口必须满足所有父接口成员。
- 多接口继承适合组合彼此独立的结构能力。
- 冲突的同名父成员会导致继承失败。
- 这种“多继承”是类型层能力，不是 JavaScript prototype 多继承。
