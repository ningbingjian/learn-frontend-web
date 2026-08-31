# TS-KP093：控制流分析 Control Flow Analysis

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 TypeScript 为什么不只是“看某一个 if”，而是会分析整个程序路径。
2. 理解可达性 Reachability 如何影响 Union 的剩余类型。
3. 理解 `return`、`throw`、分支和赋值都会参与控制流类型分析。
4. 看懂同一个变量为什么在不同程序位置拥有不同 observed type。
5. 理解分支拆分后还可能重新合流，合流点的类型由所有仍可达路径共同决定。
6. 区分 Control Flow Analysis 与运行时数据转换。

> **本节核心代码**：`null` 提前返回、`number` 分支提前返回，以及最终剩余路径自动得到 `string`。
>
> **实验辅助代码**：三个 `console.log()` 只是分别触发三条控制流路径。

## 理论讲解

### 1. Narrowing 背后其实是一整套控制流分析

前面已经分别学习过：

- `typeof` Narrowing。
- Truthiness Narrowing。
- Equality Narrowing。
- `in` Narrowing。
- `instanceof` Narrowing。
- Assignment Narrowing。

这些能力看起来像很多零散规则，但 TypeScript 背后真正做的事情是：

```text
读取程序结构
  ↓
分析可能的执行路径
  ↓
记录每条路径上已经证明的事实
  ↓
在当前位置计算最具体的可观察类型
```

这就是 Control Flow Analysis。

### 2. 类型会随着“程序位置”变化

假设参数声明为：

```ts
value: string | number | null
```

函数刚进入时：

```text
value
= string | number | null
```

如果写：

```ts
if (value === null) {
  return 'MISSING';
}
```

那么后面的代码只可能在：

```text
value !== null
```

时执行。

因此后续静态类型变成：

```text
string | number
```

注意：不是变量声明被永久修改，而是当前程序位置的 observed type 更精确了。

### 3. `return` 会制造“不可达路径”

本节最终源码第二个判断：

```ts
if (typeof value === 'number') {
  return value.toFixed(2);
}
```

在这个分支中：

```text
value → number
```

而该分支又直接 `return`。

所以走到最后一行时，TypeScript 已经知道：

```text
null 路径已经返回
number 路径已经返回
剩余只能是 string
```

于是：

```ts
return value.trim().toUpperCase();
```

可以直接使用 string API。

### 4. 这比“机械写很多 else”更重要

当然也可以写：

```ts
if (value === null) {
  // ...
} else if (typeof value === 'number') {
  // ...
} else {
  // string
}
```

但大型项目里常见的是 Early Return：

```text
非法情况先退出
特殊情况先退出
主流程留在最后
```

TypeScript 能根据可达性继续正确收窄，所以你不必为了类型系统强行把所有逻辑套进巨大 `else`。

### 5. Control Flow 可以拆分，也可以重新合流

例如：

```ts
let value: string | number;

if (Math.random() > 0.5) {
  value = 'ready';
} else {
  value = 200;
}
```

分支内部分别可以观察到：

```text
string
number
```

但分支结束重新汇合后：

```text
string | number
```

因为两条路径仍然都可能到达合流点。

所以控制流分析不是：

```text
一旦变窄就永远保持
```

而是：

```text
根据当前位置所有可达路径重新计算
```

### 6. `throw` 也会影响可达性

例如：

```ts
if (value === null) {
  throw new Error('missing');
}
```

只要执行到下一行，就已经证明：

```text
value !== null
```

因此 assertion functions 能参与 Narrowing，本质上也是建立在控制流和不可达路径之上。下一节之后会继续学习这类能力。

### 7. Control Flow Analysis 不会改变运行时值

TypeScript 不会因为静态分析：

- 把 number 自动转换成 string。
- 删除 null。
- 自动补默认值。
- 自动执行 schema validation。

它只是根据 JavaScript 程序本来就会执行的控制流，维护一套更精确的静态类型视图。

## 动手编码：从 0 到 1

### 第 1 步：定义包含三种可能的参数

创建：

```text
kp093-control-flow-analysis/src/main.ts
```

写：

```ts
function formatInput(value: string | number | null): string {
  // ...
}
```

此时 `value` 有三种可能。

### 第 2 步：先排除 null

加入：

```ts
if (value === null) {
  return 'MISSING';
}
```

运行到后面时，`null` 已经被排除。

### 第 3 步：处理 number 并提前返回

继续：

```ts
if (typeof value === 'number') {
  return value.toFixed(2);
}
```

分支内部 `value` 是 number。

### 第 4 步：使用剩余路径的 string 能力

继续：

```ts
return value.trim().toUpperCase();
```

这里不需要第三次显式判断。

原因是：

```text
null 已退出
number 已退出
→ 剩余 string
```

### 第 5 步：覆盖三条路径

加入：

```ts
console.log(formatInput(null));
console.log(formatInput(499));
console.log(formatInput('  Keyboard  '));
```

预期：

```text
MISSING
499.00
KEYBOARD
```

### 第 6 步：添加 tsconfig

创建：

```text
kp093-control-flow-analysis/tsconfig.json
```

内容：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：两个 Early Return 如何通过可达性分析逐步消除 Union 成员。

**实验辅助代码**：三个输入只是为了触发 null、number、string 三条路径。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp093-control-flow-analysis/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp093-control-flow-analysis/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp093-control-flow-analysis/dist/main.js
```

预期输出：

```text
MISSING
499.00
KEYBOARD
```

## 效果验证

完成本节后，应该能回答：

1. 什么是 Control Flow Analysis？
2. 为什么第一个 `return` 后 `value` 不再包含 null？
3. 为什么第二个 `return` 后最终路径可以直接按 string 使用？
4. Reachability 为什么会影响 Narrowing？
5. 分支重新汇合后类型为什么可能再次变宽？
6. `throw` 为什么同样能帮助 TypeScript 收窄后续路径？
7. Control Flow Analysis 会不会改变真实 JavaScript 值？
