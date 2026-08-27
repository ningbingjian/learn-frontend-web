# TS-KP023：`undefined`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `undefined` 是 JavaScript 的原始值和 TypeScript 的独立类型。
2. 理解 `strictNullChecks` 下 `undefined` 不会自动属于普通业务类型。
3. 使用 `T | undefined` 表达“可能没有提供值”。
4. 在使用值之前通过显式判断收窄 `undefined`。
5. 区分 `undefined` 与 `null` 的常见建模语义。

> **本节核心代码**：`undefined`、`number | undefined`、`value === undefined`。
>
> **实验辅助代码**：`typeof` 用来确认运行时真正看到的是 `undefined` 原始值。

## 理论讲解

### 1. `undefined` 是真实 JavaScript 原始值

JavaScript 中：

```ts
const missing = undefined;
```

运行时：

```ts
typeof missing
```

得到：

```text
undefined
```

TypeScript 使用 `undefined` 类型描述这个值。

### 2. `strictNullChecks` 下要明确表达可能缺失

本课程开启严格空值检查，因此：

```ts
let timeout: number = 3000;
timeout = undefined;
```

不能通过类型检查。

如果业务允许没有自定义超时时间，应明确写：

```ts
let timeout: number | undefined;
```

这使“缺失”成为函数或数据模型契约的一部分。

### 3. `undefined` 常见于“未提供”语义

JavaScript 中很多场景可能产生 `undefined`，例如：

- 变量尚未得到有效值。
- 函数没有返回业务结果。
- 对象可选属性缺失。
- 可选参数没有传入。
- 查找操作没有找到结果。

本节先建立值模型，可选属性和可选参数会在后续相应章节继续学习。

### 4. 使用前先判断

例如：

```ts
function resolveTimeout(useCustomTimeout: boolean): number | undefined {
  return useCustomTimeout ? 3000 : undefined;
}
```

调用后：

```ts
const timeout = resolveTimeout(false);
```

不能直接假设它是数字。先判断：

```ts
if (timeout === undefined) {
  // 使用默认配置
} else {
  // timeout 已收窄为 number
}
```

### 5. `null` 和 `undefined` 是不同值

在严格模式下，二者应该分别思考：

```text
null
通常表达“明确设置为空”

undefined
通常表达“没有提供 / 尚未定义”
```

这是一种推荐的建模直觉，而不是语言强制业务语义。真正设计 API 时，应保持团队约定一致，不要在同一个字段上随意混用两套空值表达。

---

## 动手编码：从 0 到 1

### 第 0 步：创建文件结构

```text
kp023-undefined/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建一个可能没有结果的函数

在 `src/main.ts` 写：

```ts
function resolveTimeout(useCustomTimeout: boolean): number | undefined {
  if (useCustomTimeout) {
    return 3000;
  }

  return undefined;
}
```

函数签名清楚表达：可能返回数字，也可能没有自定义值。

### 第 2 步：取得 `undefined`

继续写：

```ts
const timeout = resolveTimeout(false);
```

当前真实值是 `undefined`。

### 第 3 步：判断缺失值

加入：

```ts
if (timeout === undefined) {
  console.log('timeout=default');
} else {
  console.log(`timeout=${timeout}`);
}
```

`else` 分支中的 `timeout` 已经是 `number`。

### 第 4 步：观察运行时类型

继续写：

```ts
console.log(typeof timeout);
```

预期：

```text
undefined
```

### 第 5 步：临时制造类型错误

临时写：

```ts
const requiredTimeout: number = undefined;
```

在当前严格配置下应报错。观察后删除。

### 第 6 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`number | undefined` 与显式 `undefined` 判断。
- **实验辅助代码**：日志和 `typeof` 用于观察实际值。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp023-undefined/tsconfig.json
npm run build -- ./02-basic-types-inference/kp023-undefined/tsconfig.json
node ./02-basic-types-inference/kp023-undefined/dist/main.js
```

预期：

```text
timeout=default
undefined
```

## 效果验证

你应该能够确认：

- `undefined` 是 JavaScript 原始值。
- 严格空值检查下，普通 `number` 不自动接受 `undefined`。
- `number | undefined` 能明确表达可缺失结果。
- 判断以后 TypeScript 能把非 `undefined` 分支收窄为 `number`。
- `null` 和 `undefined` 应在业务模型中保持清晰、一致的使用约定。
