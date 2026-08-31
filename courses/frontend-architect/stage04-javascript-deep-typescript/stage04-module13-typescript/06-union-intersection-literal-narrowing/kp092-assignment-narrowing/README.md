# TS-KP092：赋值导致的收窄

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解赋值本身也可以让 TypeScript 缩小变量在当前位置上的类型。
2. 区分变量的 declared type 与 observed type。
3. 理解为什么赋值为 `number` 后可以立即调用 number 专属方法。
4. 理解为什么随后仍然可以再赋值一个 `string`。
5. 理解后续赋值是否合法始终根据 declared type 判断。
6. 理解为什么 Union 变量不能赋值一个声明类型之外的成员。
7. 为下一节 Control Flow Analysis 建立“类型随程序位置变化”的核心直觉。

> **本节核心代码**：显式声明 `string | number` 后分别赋值 number / string，观察当前类型随赋值变化。
>
> **实验辅助代码**：两次日志只用于证明每次赋值之后都能直接使用当前成员的专属能力。

## 理论讲解

### 1. Narrowing 不只来自 `if`

前面已经看到：

```text
typeof
truthiness
equality
in
instanceof
```

都可以提供控制流证据。

但 TypeScript 还有一个非常直接的证据来源：

```text
赋值右侧本身
```

例如变量声明：

```ts
let value: string | number = 'pending';
```

declared type 是：

```text
string | number
```

### 2. 赋值 number 后 observed type 会变成 number

如果：

```ts
value = 200;
```

TypeScript 在紧随其后的程序位置知道：

```text
value 当前一定是 number
```

所以可以直接：

```ts
value.toFixed(2);
```

不需要额外写：

```ts
if (typeof value === 'number')
```

因为赋值本身已经是足够强的证据。

### 3. 为什么下一行还能重新赋值 string

继续：

```ts
value = 'done';
```

仍然合法。

看起来好像前面：

```text
value → number
```

为什么还可以赋 string？

关键是区分两个概念。

### 4. Declared Type：变量允许的总体集合

声明：

```ts
let value: string | number
```

定义的是：

```text
Declared Type
= string | number
```

它回答：

> 这个变量在整个声明生命周期中允许被赋什么类型？

因此：

```ts
value = 200;      // ✅ number 属于 declared type
value = 'done';   // ✅ string 属于 declared type
// value = true;  // ❌ boolean 不属于 declared type
```

### 5. Observed Type：当前程序位置能确定的更窄类型

赋值：

```ts
value = 200;
```

之后：

```text
Observed Type
= number
```

再赋值：

```ts
value = 'done';
```

之后：

```text
Observed Type
= string
```

因此可以建立这个模型：

```text
Declared Type
决定允许的总边界

Observed Type
决定当前代码位置能安全使用什么能力
```

### 6. 赋值是否合法检查的是 declared type

这是本节最重要的规则。

即使：

```ts
value = 200;
```

让当前 observed type 成为 number，下一次赋值仍然不是只允许 number。

TypeScript 会回到变量最初声明的类型：

```text
string | number
```

检查新的右侧值是否允许。

所以 string 仍然合法，而 boolean 不合法。

### 7. 显式 Union annotation 在本实验里的作用

本节写：

```ts
let result: string | number = 'pending';
```

这里特意显式声明：

```text
string | number
```

否则如果只写：

```ts
let result = 'pending';
```

普通 `let` 会根据推断 / widening 得到更宽的 string 类型，而不是自动得到：

```text
string | number
```

之后赋值 number 就不会符合声明类型。

### 8. 赋值收窄与“变量永久改类型”不是一回事

不要说：

```text
result 的类型永久从 string | number 改成了 number
```

更准确的是：

```text
声明类型仍是 string | number
当前位置观察类型暂时是 number
```

程序继续运行、发生新的赋值或进入其他控制流路径后，observed type 还能继续变化。

### 9. 这正是 Control Flow Analysis 的基础

现实代码不会只是连续赋值：

```ts
value = 1;
value = 'done';
```

还会出现：

- `if / else`
- `return`
- `throw`
- `break`
- 多个赋值点
- 提前退出
- 循环

TypeScript 会综合所有可达路径分析一个程序位置上的最具体类型。

这就是下一节：

```text
Control Flow Analysis
```

本节先把最基础的“赋值改变 observed type”单独吃透。

### 10. Assignment Narrowing 仍然只是静态分析

TypeScript 不会在运行时维护：

```text
observed type 标签
```

JavaScript 真正执行的只是：

```js
result = 200;
result = 'done';
```

编译器在开发阶段根据这些赋值语句推导安全操作。

## 动手编码：从 0 到 1

### 第 1 步：显式声明 Union 变量

创建：

```text
kp092-assignment-narrowing/src/main.ts
```

写：

```ts
let result: string | number = 'pending';
```

此时 declared type：

```text
string | number
```

### 第 2 步：赋值 number

加入：

```ts
result = 200;
```

当前 observed type：

```text
number
```

### 第 3 步：立即使用 number 专属能力

写：

```ts
console.log(result.toFixed(2));
```

可以通过类型检查。

### 第 4 步：重新赋值 string

加入：

```ts
result = 'done';
```

为什么合法？

因为 declared type 仍然是：

```text
string | number
```

### 第 5 步：立即使用 string 专属能力

写：

```ts
console.log(result.toUpperCase());
```

此时 observed type 已经是 string。

### 第 6 步：保留一个非法赋值实验

可以观察：

```ts
// result = true;
```

如果取消注释，会报错，因为 boolean 不属于 declared type。

### 第 7 步：添加 tsconfig

创建：

```text
kp092-assignment-narrowing/tsconfig.json
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

**本节核心代码**：Union declared type + number/string 两次赋值产生的 observed type 变化。

**实验辅助代码**：两次日志和被注释的 boolean 非法赋值用于验证规则。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp092-assignment-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp092-assignment-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp092-assignment-narrowing/dist/main.js
```

预期：

```text
200.00
DONE
```

## 效果验证

完成本节后，应该能回答：

1. 什么是 declared type？
2. 什么是 observed type？
3. 为什么赋值 200 后可以直接调用 `toFixed()`？
4. 为什么后面还能重新赋值 string？
5. 后续赋值是否合法根据 declared type 还是 observed type？
6. 为什么 `result = true` 不合法？
7. 赋值收窄和下一节 Control Flow Analysis 有什么关系？
