# TS-KP102：`as const`

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `as const` 是 Const Assertion，而不是普通 `as SomeType`。
2. 理解它会阻止 literal widening。
3. 理解对象字面量属性会得到 readonly 视图。
4. 理解数组字面量会推断为 readonly tuple。
5. 区分 `const variable = ...` 与 `... as const`。
6. 明确 `as const` 不等于 `Object.freeze()`，不会自动冻结运行时对象。
7. 知道它为什么常用于配置、动作类型、路由表、协议常量等有限值建模。

> **本节核心代码**：对象字面量末尾的 `as const`。
>
> **实验辅助代码**：`send()` 验证精确 literal 可以直接满足 `'GET' | 'POST'`；`Object.isFrozen()` 用于证明没有运行时冻结。

## 理论讲解

### 1. 为什么普通对象属性容易被拓宽

例如：

```ts
const request = {
  method: 'GET',
  path: '/products'
};
```

虽然变量 `request` 本身不能重新绑定，但对象属性仍可修改：

```ts
request.method = 'POST';
```

因此 TypeScript 通常把：

```text
method
```

推断为：

```text
string
```

而不是精确的：

```text
'GET'
```

### 2. `as const` 请求最精确的字面量推断

写：

```ts
const request = {
  method: 'GET',
  path: '/products'
} as const;
```

TypeScript 会把它看得更精确。

核心效果：

```text
literal 不再 widening
对象属性 readonly
数组字面量 → readonly tuple
```

### 3. 本节对象里的 method 变成 `'GET'`

所以可以直接传给：

```ts
function send(method: 'GET' | 'POST', path: string) {
  // ...
}
```

不需要再写：

```ts
request.method as 'GET'
```

这正是 `as const` 在配置对象中的价值。

### 4. `const` 声明和 `as const` 不一样

```ts
const request = {
  method: 'GET'
};
```

`const` 只保证：

```text
request 变量不能重新赋值
```

不代表：

```text
request.method 一定是 readonly 'GET'
```

而：

```ts
const request = {
  method: 'GET'
} as const;
```

会影响对象表达式内部属性的静态推断。

### 5. `as const` 不会冻结 JavaScript 对象

本节故意执行：

```ts
Object.isFrozen(request)
```

输出：

```text
false
```

说明 TypeScript 的 readonly 与 JavaScript runtime freeze 是不同层次。

### 6. readonly 是静态写入限制

如果尝试：

```ts
// request.method = 'POST';
```

TypeScript 会报错。

但这并不意味着编译器自动插入：

```js
Object.freeze(request)
```

### 7. `as const` 常见使用场景

#### HTTP 方法配置

```ts
const request = {
  method: 'GET'
} as const;
```

#### Action / Event 常量

```ts
const event = {
  type: 'SUBMIT'
} as const;
```

#### 路由配置

```ts
const routes = ['/home', '/settings'] as const;
```

#### enum-like 对象

```ts
const Status = {
  ready: 'READY',
  failed: 'FAILED'
} as const;
```

### 8. `as const` 不是 runtime validation

如果数据来自网络：

```ts
const payload = externalValue as const;
```

并不能自动证明 payload 合法。

Const Assertion 主要控制的是：

```text
Type Inference
```

不是：

```text
Runtime Data Validation
```

### 9. 使用时不要把“更窄”误解成“永远更好”

过度精确也可能让 API 难以复用。

是否使用 `as const` 应看你的业务意图：

```text
这个值应该是固定协议常量？
还是后续确实允许变化？
```

## 动手编码：从 0 到 1

### 第 1 步：创建请求对象

```ts
const request = {
  method: 'GET',
  path: '/products'
} as const;
```

### 第 2 步：定义只接受有限方法的函数

```ts
function send(method: 'GET' | 'POST', path: string): string {
  return `${method} ${path}`;
}
```

### 第 3 步：直接传入 request.method

```ts
console.log(send(request.method, request.path));
```

预期：

```text
GET /products
```

`request.method` 已经是精确 `'GET'`，自然兼容 `'GET' | 'POST'`。

### 第 4 步：检查运行时是否冻结

```ts
console.log(Object.isFrozen(request));
```

预期：

```text
false
```

### 第 5 步：添加 tsconfig

使用模块统一 strict 配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`{ ... } as const` 及其“不拓宽 + readonly”静态推断。

**实验辅助代码**：`send()` 用来验证 literal 精度，`Object.isFrozen()` 用来观察类型 readonly 不等于运行时冻结。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp102-as-const/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp102-as-const/tsconfig.json
node ./07-type-assertions-const-satisfies/kp102-as-const/dist/main.js
```

预期：

```text
GET /products
false
```

## 效果验证

完成本节后，应该能回答：

1. `as const` 的三个核心推断效果是什么？
2. `const request = {...}` 与 `{...} as const` 有什么区别？
3. 为什么 request.method 能保持 `'GET'` 而不是 `string`？
4. 对象 readonly 是否意味着运行时被冻结？
5. 为什么 `Object.isFrozen(request)` 输出 false？
6. `as const` 为什么适合协议常量和配置对象？
7. `as const` 能验证网络数据吗？
