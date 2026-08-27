# TS-KP020：`bigint`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用小写 `bigint` 描述 JavaScript BigInt 值。
2. 使用 `123n` 和 `BigInt(...)` 创建 BigInt。
3. 理解 `bigint` 与普通 `number` 是不同的运行时数值类型。
4. 知道普通算术不能直接混合 `number` 与 `bigint`。
5. 知道 BigInt 适合超出安全整数范围的整数场景，而不是普通小数金额计算。

> **本节核心代码**：`bigint`、`n` 字面量、BigInt 加法与函数签名。
>
> **实验辅助代码**：`toString()` 与 `typeof` 用于显示结果。

## 理论讲解

### 1. `bigint` 是独立的 JavaScript 基本类型

从 ES2020 开始，JavaScript 提供 BigInt 来表达非常大的整数。TypeScript 对应类型：

```ts
const value: bigint = 100n;
```

也可以使用 `BigInt(100)` 创建。

### 2. 为什么需要 BigInt

JavaScript `number` 的整数精确表示存在安全范围。当业务确实需要处理超大整数，例如某些计数器、数据库大整数 ID、精确整数协议字段时，BigInt 可以避免把超大整数继续塞进普通 Number。

本节使用 `9_007_199_254_740_993n` 明确展示 BigInt 字面量。

### 3. `number` 与 `bigint` 不能随意混算

下面不是合法的普通算术组合：

```ts
// 1n + 1
```

需要让两边属于兼容的 BigInt 值，例如 `1n + 1n`。

### 4. BigInt 只处理整数

BigInt 不是 `number` 的“更高级版本”，也不能写 `1.5n`。金额小数、比例等场景仍然需要根据业务精度策略设计。

### 5. 编译目标需要支持 BigInt

BigInt 是 ES2020 之后的运行时能力。本 TypeScript 模块基础配置当前使用 ES2022，因此本节可以直接使用 `100n` 字面量。

---

## 动手编码：从 0 到 1

### 第 0 步：创建文件

创建 `README.md + src/main.ts + tsconfig.json`。

### 第 1 步：创建一个超大整数

```ts
const requestCount: bigint = 9_007_199_254_740_993n;
```

末尾 `n` 表明这是 BigInt 字面量。

### 第 2 步：加入另一个 BigInt

```ts
const retryCount = 7n;
```

这里让 TypeScript 根据字面量推断。

### 第 3 步：建立 BigInt 函数边界

```ts
function addCounts(left: bigint, right: bigint): bigint {
  return left + right;
}
```

### 第 4 步：计算总数

```ts
const total = addCounts(requestCount, retryCount);
```

### 第 5 步：输出结果

```ts
console.log(total.toString());
console.log(typeof total);
```

预期：

```text
9007199254741000
bigint
```

### 第 6 步：尝试混合 `number`

临时尝试：

```ts
const invalid = requestCount + 1;
```

执行类型检查，应看到不能把 BigInt 和普通 Number 直接用于这种算术组合。验证后恢复最终源码。

### 第 7 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

- **本节核心代码**：`bigint`、`n` 字面量、BigInt 算术。
- **实验辅助代码**：`toString()` 只用于方便输出，`typeof` 用于确认运行时类型。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp020-bigint/tsconfig.json
npm run build -- ./02-basic-types-inference/kp020-bigint/tsconfig.json
node ./02-basic-types-inference/kp020-bigint/dist/main.js
```

预期：

```text
9007199254741000
bigint
```

## 效果验证

你应该能够解释：

- `100n` 为什么不是普通 `number`。
- 为什么 `bigint` 与 `number` 不能直接混合做普通算术。
- 为什么 BigInt 主要解决大整数，而不是普通小数。
- 为什么当前课程 ES2022 编译目标可以直接使用 BigInt 字面量。
- 为什么 `typeof total` 在运行时得到 `bigint`。
