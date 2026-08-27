# TS-KP019：`boolean`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用小写 `boolean` 表达 `true` / `false`。
2. 用布尔参数和返回值表达条件判断。
3. 理解比较表达式、逻辑表达式通常会产生布尔结果。
4. 区分真实 `boolean` 值与字符串 `'true'` / `'false'`。
5. 理解布尔值适合表达简单二元状态，但复杂状态后续应使用更准确的类型模型。

> **本节核心代码**：`boolean` 变量、`&&` 逻辑以及返回 `boolean` 的权限函数。
>
> **实验辅助代码**：日志和 `typeof` 只用于观察结果。

## 理论讲解

### 1. `boolean` 只有两类值

```ts
const enabled: boolean = true;
const disabled: boolean = false;
```

字符串 `'false'` 不是真正的 `false`。

### 2. 条件判断经常产生 `boolean`

例如 `const isAdult = age >= 18;` 的比较结果就是布尔值。

### 3. 逻辑运算可以组合布尔条件

权限判断常见 `loggedIn && permitted`：两个条件都为真时结果才为真。

### 4. `boolean` 适合简单二元状态

“是否登录”“是否启用”“是否拥有权限”适合布尔值；如果状态其实是 `idle / loading / success / error`，后续应使用字面量类型和判别联合，而不是堆多个互相冲突的布尔变量。

---

## 动手编码：从 0 到 1

### 第 0 步：创建最小源码

创建 `src/main.ts`。

### 第 1 步：声明登录状态

```ts
const isLoggedIn: boolean = true;
```

### 第 2 步：让权限状态由 TypeScript 推断

```ts
const hasPermission = false;
```

### 第 3 步：创建权限函数

```ts
function canOpenAdmin(loggedIn: boolean, permitted: boolean): boolean {
  return loggedIn && permitted;
}
```

函数签名本身就表达了业务边界。

### 第 4 步：第一次调用

```ts
console.log(`first=${canOpenAdmin(isLoggedIn, hasPermission)}`);
```

结果为 `first=false`。

### 第 5 步：第二次调用

```ts
console.log(`second=${canOpenAdmin(isLoggedIn, true)}`);
```

预期 `second=true`。

### 第 6 步：观察运行时类型

```ts
console.log(typeof isLoggedIn);
```

得到 `boolean`。

### 第 7 步：故意传入字符串

临时尝试：

```ts
canOpenAdmin(isLoggedIn, 'true');
```

TypeScript 应指出字符串不能替代布尔值。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

- **本节核心代码**：`boolean`、逻辑与、布尔参数和返回值。
- **实验辅助代码**：两组输出用于对照不同条件组合。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp019-boolean/tsconfig.json
npm run build -- ./02-basic-types-inference/kp019-boolean/tsconfig.json
node ./02-basic-types-inference/kp019-boolean/dist/main.js
```

预期：

```text
first=false
second=true
boolean
```

## 效果验证

你应该能够确认：

- `true` / `false` 使用 `boolean`。
- `'true'` 是字符串，不是布尔值。
- 逻辑表达式可以返回布尔结果。
- 函数签名可以强制调用方传入真正的布尔值。
- `typeof` 在运行时能观察到 `boolean`。
