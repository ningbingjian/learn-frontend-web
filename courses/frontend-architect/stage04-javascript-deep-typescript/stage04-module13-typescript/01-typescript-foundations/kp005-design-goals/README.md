# TS-KP005：TypeScript 的设计目标与非目标

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 TypeScript 主要想解决哪类开发阶段问题。
2. 知道 TypeScript 会尽量保持 JavaScript 的运行时语义，而不是发明另一套业务运行规则。
3. 知道“类型正确”不等于“业务一定正确”。
4. 知道 TypeScript 不是运行时校验器、测试框架、业务规则证明器或性能优化器。
5. 能根据问题类型判断应该交给 TypeScript、运行时校验、业务校验还是测试处理。

> **本节核心知识**：理解 TypeScript 的职责边界，而不是背一张设计目标清单。
>
> **实验辅助代码**：折扣计算案例和编译命令只是用来观察“类型正确但业务仍可能错误”的现象。

## 理论讲解

### 1. TypeScript 首先解决开发阶段的类型问题

TypeScript 最直接的价值是：

```text
代码还没真正运行
      ↓
先分析值之间的类型关系
      ↓
提前暴露一批明显不匹配
```

例如：

```ts
function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

formatPrice('499');
```

`string` 传给 `number` 参数，这类问题适合由 TypeScript 提前发现。

### 2. TypeScript 不想替换 JavaScript 的运行时语义

TypeScript 建立在 JavaScript 之上。绝大多数普通类型标注在编译后被擦除，最终运行的仍然是 JavaScript。

所以：

```text
TypeScript
负责开发期分析

JavaScript
负责运行时行为
```

如果 JavaScript 本身允许某种运行结果，TypeScript 不一定会把它改成另一套规则。

### 3. “类型正确”不等于“业务正确”

看下面的函数：

```ts
function discountedPrice(
  price: number,
  discountPercent: number
): number {
  return price * (1 - discountPercent / 100);
}
```

下面调用在类型上完全合理：

```ts
discountedPrice(200, 20);
```

但这个调用也同样满足 `number`：

```ts
discountedPrice(200, 150);
```

它可能得到负数。

TypeScript 只知道：

```text
200   是 number
150   也是 number
```

它并不知道你的业务规则是：

```text
折扣必须在 0～100 之间
```

这种规则需要业务校验、领域建模或运行时逻辑处理。

### 4. TypeScript 不会自动验证外部数据

上一节已经验证过：

```text
接口 JSON
环境变量
localStorage
用户输入
```

都属于运行时真实数据。

写一个 `type User` 并不会自动把这些值变成可信数据。

### 5. TypeScript 也不能替代测试

类型系统可以证明某些“形状和关系”成立，但它不会自动证明：

- 算法结果一定正确。
- 所有边界条件都覆盖。
- 页面交互符合产品需求。
- 网络超时与重试行为正确。
- 性能一定达标。

所以工程里通常是：

```text
TypeScript
+ 运行时校验
+ 业务规则
+ 测试
+ 监控
```

共同工作，而不是互相替代。

### 6. 一个实用的职责判断法

遇到问题时先问：

```text
这是“代码中已知值的类型关系”吗？
  → TypeScript

这是“运行时外部数据真实吗”？
  → Runtime Validation

这是“业务上允许吗”？
  → Business Validation / Domain Rule

这是“最终行为符合需求吗”？
  → Test / Runtime Verification
```

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

本节只验证一个核心结论：

> TypeScript 能约束“值是什么类型”，但普通 `number` 类型不会自动理解“业务上这个数字应该落在哪个范围”。

### 第 1 步：创建最小折扣函数

创建 `src/main.ts`：

```ts
function discountedPrice(
  price: number,
  discountPercent: number
): number {
  return price * (1 - discountPercent / 100);
}
```

这里两个参数都是 `number`。

### 第 2 步：加入正常业务调用

继续写：

```ts
console.log('正常折扣:', discountedPrice(200, 20));
```

预期得到：

```text
正常折扣: 160
```

### 第 3 步：先制造一个类型错误

临时加入：

```ts
discountedPrice('200', 20);
```

执行类型检查时，TypeScript 应指出：

```text
string 不能传给 number
```

说明“值的类型关系”属于 TypeScript 的职责。

观察后删除这行错误代码。

### 第 4 步：制造一个类型正确但业务可疑的调用

加入：

```ts
console.log('业务可疑:', discountedPrice(200, 150));
```

这个调用仍然能通过类型检查，因为 `150` 的确是 `number`。

### 第 5 步：运行程序观察真实结果

编译运行后会看到：

```text
正常折扣: 160
业务可疑: -100
```

现在可以清楚地区分：

```text
'200'
  ↓
类型不匹配
  ↓
TypeScript 可以提前发现

150
  ↓
类型是 number，但违反折扣业务范围
  ↓
需要业务规则处理
```

### 第 6 步：完成案例并对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节只记住两层：

- **核心知识**：TypeScript 主要检查静态可见的类型关系，不自动证明业务约束、运行时真实性和最终行为正确性。
- **实验辅助代码**：折扣函数、`150%` 调用与日志输出，用来制造“类型正确但业务错误”的对照。

## 运行案例

在 TypeScript 模块根目录首次执行：

```bash
npm install
```

类型检查：

```bash
npm run check -- ./01-typescript-foundations/kp005-design-goals/tsconfig.json
```

编译：

```bash
npm run build -- ./01-typescript-foundations/kp005-design-goals/tsconfig.json
```

运行：

```bash
node ./01-typescript-foundations/kp005-design-goals/dist/main.js
```

## 效果验证

你应该能够亲手确认：

1. `discountedPrice('200', 20)` 会产生类型错误。
2. `discountedPrice(200, 150)` 能通过普通 `number` 类型检查。
3. 运行后 `150%` 折扣会得到业务上可疑的负值。
4. 能解释为什么第二种问题不能只依赖 TypeScript 自动解决。
5. 能把“类型检查、运行时校验、业务规则、测试”分配到正确职责。
