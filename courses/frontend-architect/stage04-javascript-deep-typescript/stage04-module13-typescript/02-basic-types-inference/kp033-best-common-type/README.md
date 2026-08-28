# TS-KP033：Best Common Type

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么数组、条件表达式等包含多个候选表达式时需要综合推断。
2. 理解 Best Common Type 会收集多个候选类型并寻找能够表达整体结果的类型。
3. 知道候选都兼容时可以得到单一公共类型，例如 `number[]`。
4. 知道候选之间没有单一可用公共候选时，结果可能体现为联合类型，例如 `(number | string)[]`。
5. 理解上下文类型也可能参与 Best Common Type 的推断。
6. 知道当业务真正需要某个更抽象的父类型时，可以主动提供类型标注，而不是完全依赖推断。

> **本节核心代码**：`scores` 与 `mixedValues` 两个数组，让 TypeScript 分别从同类候选和异类候选中推断元素类型。
>
> **实验辅助代码**：`describe()`、`map()`、`toFixed()` 和日志输出用于证明推断结果真实参与后续类型检查。

## 理论讲解

### 1. 一个值时，推断通常很直接

例如：

```ts
const count = 3;
```

TypeScript 只需要观察一个初始化表达式。

但数组里可能同时出现多个元素：

```ts
const values = [10, 20, 30];
```

这里类型系统要考虑的是：

```text
10
20
30
↓
这些候选应该组合成什么数组元素类型？
```

### 2. 多个表达式会形成候选类型集合

例如：

```ts
const scores = [10, 20, 30];
```

候选都属于数字相关类型，TypeScript 可以得到：

```ts
number[]
```

于是数组元素可以安全使用数字方法：

```ts
scores[0].toFixed(1);
```

### 3. 候选类型不一致时怎么办

再看：

```ts
const mixedValues = [10, '20', 30];
```

候选中同时出现：

```text
number
string
```

TypeScript 不能把字符串假装成数字，也不会在运行时替你转换值。

因此整体元素类型会体现为能够覆盖这些候选的类型：

```ts
(number | string)[]
```

这意味着取出一个元素时，不能直接假设它一定是数字：

```ts
// mixedValues[0].toFixed(1)
```

因为静态类型表示它可能是 `number`，也可能是 `string`。

### 4. Best Common Type 不是“随便找一个最宽的类型”

它的关键是综合候选之间的兼容关系。

可以建立这样的直觉：

```text
多个候选表达式
      ↓
收集候选类型
      ↓
寻找可以表达整体结果的公共类型
      ↓
必要时形成联合结果
```

所以不要把它简单理解成：

```text
不同类型出现
→ 直接变 any
```

TypeScript 会尽可能保留有用的类型信息。

### 5. 一个经典对象场景

假设存在：

```ts
class Animal {}
class Rhino extends Animal {}
class Elephant extends Animal {}
class Snake extends Animal {}
```

写：

```ts
const zoo = [new Rhino(), new Elephant(), new Snake()];
```

虽然三者都有 `Animal` 这个共同父类型，但如果推断候选里没有一个现成的 `Animal` 候选，TypeScript 不一定自动替你选择 `Animal[]`。

如果业务真正希望这个数组被视为动物集合，最清楚的写法反而是主动声明：

```ts
const zoo: Animal[] = [
  new Rhino(),
  new Elephant(),
  new Snake()
];
```

这说明：

> 类型推断负责从现有代码中推导信息；业务抽象意图仍然可以通过显式类型表达。

### 6. 上下文类型也可能参与推断

上一节学过 Contextual Typing：

```text
上下文
↓
表达式
```

Best Common Type 不只看表达式本身，明确的上下文类型也可以成为候选信息的一部分。

例如函数声明返回 `Animal[]` 时，返回的数组表达式会受到这个上下文约束。

### 7. Best Common Type 与 Union Types 的关系

本节会看到：

```ts
(number | string)[]
```

但这里的目标不是系统学习联合类型语法。

现阶段只需要知道：

> 当多个候选不能被一个更具体的单一结果完整表达时，TypeScript 可能保留多个可能性。

联合类型会在 Chapter 06 单独深入学习。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp033-best-common-type/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建同类候选数组

在 `src/main.ts` 写：

```ts
const scores = [10, 20, 30];
```

把鼠标放到 `scores` 上，观察 TypeScript 推断结果。

你应该看到它被理解为数字数组。

### 第 2 步：证明元素确实是数字

继续写：

```ts
console.log(
  scores.map((value) => value.toFixed(1)).join(', ')
);
```

这里 `value.toFixed(1)` 能通过检查，说明回调里的 `value` 已经被上下文理解成 `number`。

### 第 3 步：创建异类候选数组

加入：

```ts
const mixedValues = [10, '20', 30];
```

此时数组元素不再只有一种可能性。

### 第 4 步：临时直接调用数字方法

临时尝试：

```ts
mixedValues.map((value) => value.toFixed(1));
```

类型检查应该失败。

原因不是 TypeScript 不知道 `toFixed()`，而是：

```text
value
↓
number | string
↓
string 没有 toFixed()
```

验证后删除这行。

### 第 5 步：建立处理多个候选的函数

加入：

```ts
function describe(value: number | string): string {
  return typeof value === 'number'
    ? `number:${value.toFixed(1)}`
    : `string:${value.toUpperCase()}`;
}
```

这里通过运行时判断，把两种可能性分别处理。

### 第 6 步：处理整个混合数组

继续写：

```ts
console.log(mixedValues.map(describe).join(' | '));
```

预期：

```text
number:10.0 | string:20 | number:30.0
```

### 第 7 步：观察显式类型如何改变意图

可以临时增加：

```ts
const explicitValues: Array<number | string> = [1, '2', 3];
```

这里不再完全依赖推断，而是主动告诉 TypeScript：这个容器就是允许两种值。

本步只观察“推断”和“显式契约”的区别即可。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`scores` 与 `mixedValues` 展示多个候选类型如何形成数组元素类型。
- **实验辅助代码**：`describe()` 与日志输出用于证明推断结果，不是 Best Common Type 算法本身。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp033-best-common-type/tsconfig.json
npm run build -- ./02-basic-types-inference/kp033-best-common-type/tsconfig.json
node ./02-basic-types-inference/kp033-best-common-type/dist/main.js
```

预期：

```text
10.0, 20.0, 30.0
number:10.0 | string:20 | number:30.0
```

## 效果验证

你应该能够确认：

- `[10, 20, 30]` 能被推断为数字数组。
- `[10, '20', 30]` 会保留数字和字符串两种可能性。
- 混合数组元素不能在未判断时直接调用只属于 `number` 的方法。
- Best Common Type 会综合多个候选，而不是退化成 `any`。
- 当业务需要某个明确抽象类型时，可以主动提供显式类型标注。
