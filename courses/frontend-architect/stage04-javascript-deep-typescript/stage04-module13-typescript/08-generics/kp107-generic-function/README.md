# TS-KP107：Generic Function

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解为什么仅靠具体类型会导致重复函数。
2. 理解为什么 `any` 虽然通用，却会丢失输入输出类型关系。
3. 编写最基本的 Generic Function。
4. 理解 `function identity<T>(value: T): T` 中输入与输出共享同一个类型参数。
5. 使用同一个泛型函数处理不同类型并保留精确能力。
6. 理解泛型是编译期类型机制，不会在 JavaScript 中生成多份函数。

> **本节核心代码**：`identity<T>(value: T): T`。
>
> **实验辅助代码**：字符串与数字两次调用用于验证同一个函数在不同调用点保留不同类型。

## 理论讲解

### 1. 从具体函数开始

如果只处理 number：

```ts
function identityNumber(value: number): number {
  return value;
}
```

处理 string 又需要：

```ts
function identityString(value: string): string {
  return value;
}
```

实现完全一样，只是类型不同。

### 2. `any` 为什么不是理想答案

```ts
function identityAny(value: any): any {
  return value;
}
```

它确实可以接收 string、number、object。

但返回值也是 `any`：

```text
输入信息进入函数
      ↓
被 any 吃掉
      ↓
输出失去精确类型
```

调用方可能写出不存在的方法而不报错。

### 3. 泛型保存“关系”

```ts
function identity<T>(value: T): T {
  return value;
}
```

这里表达：

```text
参数 value 的类型 = T
返回值类型       = 同一个 T
```

所以：

```ts
identity('Keyboard')
```

返回 string；

```ts
identity(499)
```

返回 number。

### 4. 这不是函数重载

Generic Function 不需要为每一个可能类型写 overload。

它描述的是一个可以在每次调用时实例化不同类型参数的统一类型关系。

### 5. 运行时仍然只有普通函数

编译后的 JavaScript 不会保留：

```ts
<T>
```

也不会为 string / number 分别生成一份函数。

泛型主要服务于 TypeScript 静态类型检查。

## 动手编码：从 0 到 1

### 第 1 步：创建最小函数

```ts
function identity<T>(value: T): T {
  return value;
}
```

### 第 2 步：传入字符串

```ts
const productName = identity('Keyboard');
```

此时返回值保留 string 能力。

### 第 3 步：传入数字

```ts
const price = identity(499);
```

返回值保留 number 能力。

### 第 4 步：分别使用成员能力

```ts
console.log(productName.toUpperCase());
console.log(price.toFixed(2));
```

同一个函数在两个调用点获得了不同但精确的类型。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：Generic Function `identity<T>()`。

**实验辅助代码**：两次调用和日志用于验证类型关系。

## 运行案例

```bash
npm run check -- ./08-generics/kp107-generic-function/tsconfig.json
npm run build -- ./08-generics/kp107-generic-function/tsconfig.json
node ./08-generics/kp107-generic-function/dist/main.js
```

预期：

```text
KEYBOARD
499.00
```

## 效果验证

1. `any` 与 Generic Function 的主要区别是什么？
2. `T` 在 identity 中保存了什么关系？
3. 为什么同一个函数调用两次可以得到不同返回类型？
4. 泛型是不是函数重载？
5. `<T>` 会不会出现在最终 JavaScript 运行时？
6. Generic Function 的价值为什么不仅是“少写几个函数”？
