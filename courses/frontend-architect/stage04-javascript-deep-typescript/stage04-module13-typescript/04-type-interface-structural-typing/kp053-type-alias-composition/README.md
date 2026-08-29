# TS-KP053：类型别名组合

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 让一个类型别名引用另一个类型别名。
2. 用多个小型业务类型组合出更大的对象结构。
3. 理解“组合”不等于复制粘贴成员。
4. 在嵌套对象和对象数组中复用已有别名。
5. 根据业务所有权拆分类型边界。
6. 知道交叉类型等更复杂组合机制会在后续章节单独学习。

> **本节核心代码**：`Address`、`Customer`、`OrderItem`、`Order` 四个相互引用的类型别名。
>
> **实验辅助代码**：`calculateTotal()` 和输出只用于验证组合后的结构能够被真实业务逻辑使用。

## 理论讲解

### 1. 一个大型对象类型可以直接写完

例如订单可以直接写成一个超长对象：

```ts
type Order = {
  id: number;
  customer: {
    id: number;
    name: string;
    address: {
      city: string;
      street: string;
    };
  };
  items: Array<{
    sku: string;
    quantity: number;
    price: number;
  }>;
};
```

技术上没有问题，但当 `Address`、`Customer`、`OrderItem` 在别处也要使用时，就会重复。

### 2. 组合的核心是引用已有类型名

先拆：

```ts
type Address = {
  city: string;
  street: string;
};
```

再：

```ts
type Customer = {
  id: number;
  name: string;
  address: Address;
};
```

这里 `Customer` 不再重复 `Address` 的两个成员，而是引用它。

### 3. 数组元素也可以复用类型别名

```ts
type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};
```

订单：

```ts
type Order = {
  id: number;
  customer: Customer;
  items: OrderItem[];
};
```

形成：

```text
Order
├── Customer
│   └── Address
└── OrderItem[]
```

### 4. 组合可以降低修改成本

假设地址新增：

```ts
postalCode: string;
```

只需要修改：

```ts
Address
```

所有引用 `Address` 的地方都会得到同一个新契约。

### 5. 类型拆分应该跟随业务边界

适合拆出来：

```text
Address
Customer
OrderItem
```

因为它们各自都有独立语义，而且可能复用。

不建议为了“类型很多看起来高级”而把：

```text
一个只出现一次的两字段内部小对象
```

也强行拆成十几个别名。

### 6. 本节的“组合”不等于交叉类型

后续会学：

```ts
A & B
```

但本节故意不提前展开。

这里的重点是最基础也最常用的工程方法：

> 一个类型通过成员引用另一个命名类型，把小结构组合成大结构。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp053-type-alias-composition/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建地址类型

```ts
type Address = {
  city: string;
  street: string;
};
```

这是最底层可复用结构。

### 第 2 步：创建客户类型并引用地址

```ts
type Customer = {
  id: number;
  name: string;
  address: Address;
};
```

现在地址结构只有一个定义来源。

### 第 3 步：创建订单项类型

```ts
type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};
```

### 第 4 步：组合完整订单

```ts
type Order = {
  id: number;
  customer: Customer;
  items: OrderItem[];
};
```

这里同时组合：

```text
普通成员引用 Customer
+
数组元素类型 OrderItem[]
```

### 第 5 步：创建真实订单值

```ts
const order: Order = {
  id: 1001,
  customer: {
    id: 1,
    name: 'Ada',
    address: {
      city: 'Shanghai',
      street: 'Century Avenue'
    }
  },
  items: [
    { sku: 'keyboard', quantity: 1, price: 499 },
    { sku: 'mouse', quantity: 2, price: 199 }
  ]
};
```

### 第 6 步：写一个使用组合类型的业务函数

```ts
function calculateTotal(order: Order): number {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}
```

回调里的 `item` 会被理解为 `OrderItem`。

### 第 7 步：输出嵌套信息与金额

```ts
console.log(`${order.customer.name}@${order.customer.address.city}`);
console.log(calculateTotal(order).toFixed(2));
```

预期：

```text
Ada@Shanghai
897.00
```

### 第 8 步：临时制造深层错误

尝试把：

```ts
city: 'Shanghai'
```

改成：

```ts
// city: 100
```

类型错误会沿着：

```text
Order → Customer → Address → city
```

准确定位。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：四个命名类型的引用和组合。
- **实验辅助代码**：订单金额计算与日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp053-type-alias-composition/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp053-type-alias-composition/tsconfig.json
node ./04-type-interface-structural-typing/kp053-type-alias-composition/dist/main.js
```

预期：

```text
Ada@Shanghai
897.00
```

## 效果验证

你应该能够确认：

- 类型别名可以相互引用。
- 大型对象可以由多个有业务意义的小类型组合而成。
- `OrderItem[]` 可以直接复用命名后的元素类型。
- 修改底层别名会统一影响所有引用位置。
- 类型拆分应该服务于复用与语义，而不是无意义增加层级。
