# TS-KP051：嵌套对象类型设计

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用嵌套对象类型描述真实业务中的层级数据。
2. 在不同层级分别表达必需属性、可选属性和数组元素结构。
3. 理解嵌套类型应该尽量反映业务边界，而不是为了“复杂”而无限嵌套。
4. 能安全读取多层属性，并利用前面学过的可选属性规则处理可缺失字段。
5. 知道当某个子结构重复出现或拥有独立语义时，后续可以提取为 `type` / `interface`。
6. 区分静态嵌套类型设计与运行时 JSON 校验。
7. 通过一个完整订单模型串联 Chapter 03 的对象建模知识。

> **本节核心代码**：`Order` 中嵌套的 `customer`、`contact`、`shipping` 和 `items` 对象结构。
>
> **实验辅助代码**：`summarizeOrder()` 和 `calculateTotal()` 用于验证各层属性类型能被安全使用。

## 理论讲解

### 1. 真实业务对象通常不是扁平结构

最简单对象：

```ts
{
  id: number;
  name: string;
}
```

但订单可能包含：

```text
Order
├── customer
│   └── contact
├── shipping
└── items[]
```

这时类型也应该表达这些层级。

### 2. 嵌套对象类型的基本写法

例如：

```ts
type User = {
  id: number;
  profile: {
    displayName: string;
  };
};
```

访问：

```ts
user.profile.displayName
```

TypeScript 会沿着每一层结构检查。

### 3. 每一层都可以继续拥有自己的属性规则

例如联系信息：

```ts
contact: {
  email: string;
  phone?: string;
};
```

这里：

```text
email
→ 必需

phone
→ 可选
```

嵌套层级并不会改变 `?` 的基本语义。

### 4. 嵌套数组同样可以描述元素对象

订单项：

```ts
items: Array<{
  sku: string;
  quantity: number;
  price: number;
}>;
```

这表示：

```text
items
→ Array

每个元素
→ 必须有 sku / quantity / price
```

因此 `reduce()` 回调里的 `item` 能直接获得这些成员类型。

### 5. 嵌套层级应该反映业务语义

不要为了减少字段数量强行扁平：

```text
customerName
customerEmail
customerPhone
shippingCity
shippingAddress
```

如果这些字段天然属于不同子结构，分组后通常更容易理解：

```text
customer.contact.email
shipping.city
```

但也不要走向另一个极端：为了显示“架构”而制造十几层没有业务意义的包装对象。

### 6. 什么时候应该提取子类型

本节为了完整展示嵌套结构，把各层直接写在 `Order` 里。

如果后续发现：

```text
Contact
ShippingAddress
OrderItem
```

会在多个地方复用，那么继续重复内联对象类型会越来越难维护。

下一章开始学习：

- `type`
- `interface`

之后就可以把这些子结构提取为独立命名类型。

### 7. 本节使用 type 只是承载结构

前面 Tuple 课程已经见过 `type` 写法，本节继续用：

```ts
type Order = { ... }
```

只是为了给整个订单结构一个方便引用的名字。

`type` 自身的组合能力、递归、和 `interface` 的区别，会在 Chapter 04 正式系统学习。

### 8. 嵌套类型不会校验外部 JSON

假设：

```ts
const order: Order = JSON.parse(text);
```

仅仅写 `: Order` 并不能让运行时数据自动变正确。

如果 JSON 来自网络，仍然需要：

- Schema 校验。
- 手工检查。
- 运行时验证库。

Chapter 01 已经建立过这个边界，本节继续保持一致。

### 9. 设计时先问“这是谁的字段”

一个实用方法：

```text
字段属于订单本身？
→ Order 顶层

字段属于客户？
→ customer

字段属于客户联系方式？
→ customer.contact

字段属于配送？
→ shipping

字段会重复出现多次？
→ Array<...>
```

先按业务所有权分组，再写类型，通常比先想 TypeScript 语法更稳。

### 10. Chapter 03 到这里完成了什么

从 Chapter 03 开始时的：

```text
T[]
```

一路走到：

```text
Array
Tuple
Readonly
Optional
Object
Index Signature
Excess Property Checking
Nested Object
```

现在已经具备描述中等复杂业务数据结构的基础能力。

下一章会解决新的问题：

> 当这些结构需要重复、组合、继承和公开复用时，应该如何命名和组织类型？

这就是 Chapter 04 的 `type`、`interface` 与结构化类型。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp051-nested-object-type-design/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建 Order 顶层

```ts
type Order = {
  id: number;
};
```

先只保留最核心标识。

### 第 2 步：加入 customer

```ts
customer: {
  name: string;
};
```

现在订单明确拥有一个客户子结构。

### 第 3 步：继续嵌套 contact

```ts
customer: {
  name: string;
  contact: {
    email: string;
    phone?: string;
  };
};
```

这里复习了可选属性。

### 第 4 步：加入 shipping

```ts
shipping: {
  city: string;
  address: string;
};
```

订单的配送信息和客户信息被分开建模。

### 第 5 步：加入对象数组 items

```ts
items: Array<{
  sku: string;
  quantity: number;
  price: number;
}>;
```

现在每个订单项都有完整结构。

### 第 6 步：创建完整订单值

```ts
const order: Order = {
  id: 1001,
  customer: {
    name: 'Ada',
    contact: {
      email: 'ada@example.com'
    }
  },
  shipping: {
    city: 'Shanghai',
    address: 'Pudong'
  },
  items: [
    { sku: 'keyboard', quantity: 2, price: 499 },
    { sku: 'mouse', quantity: 1, price: 200 }
  ]
};
```

### 第 7 步：跨层读取结构

```ts
function summarizeOrder(order: Order): string {
  return `order=${order.id} customer=${order.customer.name} city=${order.shipping.city}`;
}
```

TypeScript 会沿着每层对象检查。

### 第 8 步：处理对象数组

```ts
function calculateTotal(order: Order): number {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}
```

回调中的 `item` 自动拥有订单项结构。

### 第 9 步：输出结果

```ts
console.log(summarizeOrder(order));
console.log(calculateTotal(order).toFixed(2));
```

预期：

```text
order=1001 customer=Ada city=Shanghai
1198.00
```

### 第 10 步：临时制造深层错误

例如把：

```ts
quantity: '2'
```

TypeScript 应该在具体的嵌套位置指出字符串不能赋给数字。

验证后恢复。

### 第 11 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：多层对象、可选子属性和对象数组的组合结构。
- **实验辅助代码**：汇总和总价函数用于证明嵌套类型真实传播到业务代码。

## 运行案例

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp051-nested-object-type-design/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp051-nested-object-type-design/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp051-nested-object-type-design/dist/main.js
```

预期：

```text
order=1001 customer=Ada city=Shanghai
1198.00
```

## 效果验证

你应该能够确认：

- 对象类型可以任意嵌套描述真实业务层级。
- 每一层都可以独立使用必需属性和可选属性。
- `Array<{ ... }>` 可以描述一组结构一致的嵌套对象。
- TypeScript 能把深层成员类型传播到属性访问和数组回调中。
- 嵌套类型应该服务业务结构，而不是追求层级数量。
- 重复子结构后续适合提取成 `type` / `interface`。
- Chapter 03 已完成，下一步进入 Chapter 04 的 TS-KP052「`type` 基础」。
