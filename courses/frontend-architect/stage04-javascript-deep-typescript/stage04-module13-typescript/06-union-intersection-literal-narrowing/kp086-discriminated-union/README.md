# TS-KP086：判别联合 Discriminated Union

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释什么是 Discriminated Union。
2. 使用共同的 Literal Property 区分多个 Union 成员。
3. 根据 `status` / `kind` / `type` 等判别字段安全访问成员专属属性。
4. 理解为什么“不同状态拆成不同对象类型”通常优于“一个大对象 + 大量 optional 字段”。
5. 使用 `switch` 或条件判断让 TypeScript 缩小当前 Union 成员。
6. 理解判别联合仍然是普通 JavaScript 对象，不会产生额外运行时包装。
7. 知道 `never` 穷尽检查属于后续 TS-KP096，本节只建立判别与收窄直觉。

> **本节核心代码**：`RequestState` 的三个独立成员以及 `state.status` 对成员的判别。
>
> **实验辅助代码**：三个 `console.log()` 只是模拟 loading / success / failed 三种运行状态。

## 理论讲解

### 1. 先看一个容易失控的状态模型

请求状态如果直接写成：

```ts
type RequestState = {
  status: 'loading' | 'success' | 'failed';
  data?: string[];
  error?: string;
};
```

看起来很简单，但它允许很多没有业务意义的组合：

```text
status = loading
同时有 data

status = success
却没有 data

status = failed
却没有 error
```

因为从类型结构看：

```text
data 可选
error 可选
```

它们和 `status` 之间没有建立强关联。

### 2. 把每一种状态拆成独立成员

更精确的方式是：

```ts
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'failed'; error: string };
```

现在每个成员都有共同字段：

```text
status
```

但每个成员的 `status` 又是不同的 Literal Type：

```text
loading member → status: 'loading'
success member → status: 'success'
failed member  → status: 'failed'
```

这就是典型的判别联合。

### 3. 什么是 discriminant property

在这个模型里：

```text
status
```

就是判别字段，也常叫：

```text
discriminant
tag
tagged field
```

字段名不要求必须叫 `status`。

常见命名还有：

```text
kind
type
action
state
variant
```

关键在于：

1. Union 的每个成员都拥有共同字段。
2. 这个字段在不同成员上使用不同的精确字面量值。

### 4. TypeScript 可以根据判别字段缩小 Union 成员

例如：

```ts
if (state.status === 'success') {
  state.data;
}
```

在这个分支里，TypeScript 能排除：

```text
loading
failed
```

只保留：

```text
{ status: 'success'; data: string[] }
```

于是 `state.data` 就成为确定存在的 `string[]`。

### 5. `switch` 很适合处理多个离散状态

最终案例使用：

```ts
switch (state.status) {
  case 'loading':
    // ...
  case 'success':
    // ...
  case 'failed':
    // ...
}
```

在每个 `case` 中，`state` 都会被缩小到对应成员。

因此：

```text
success case
→ 可以访问 data

failed case
→ 可以访问 error
```

不需要：

```ts
state.data!
state.error!
```

也不需要为了消除报错写不安全的类型断言。

### 6. 判别联合让“不合法状态”更难表示

好的类型模型经常追求：

> Make invalid states unrepresentable.

也就是尽量让不合法业务状态根本无法通过类型系统被构造出来。

例如：

```ts
const success: RequestState = {
  status: 'success',
  data: ['Keyboard']
};
```

合法。

但是：

```ts
// const invalid: RequestState = {
//   status: 'success',
//   error: 'timeout'
// };
```

不符合 success 成员的结构。

### 7. 判别联合比“optional everywhere”更适合状态机

如果状态之间拥有明确的互斥关系：

```text
loading
success
failed
```

通常更适合建模成：

```text
独立成员
 +
共同判别字段
 +
Union
```

而不是：

```text
一个超大接口
 +
大量 ? 属性
```

后者容易让类型系统无法知道字段之间的业务依赖关系。

### 8. 判别联合仍然是普通对象

TypeScript 不会把：

```ts
{ status: 'success', data: [...] }
```

包装成特殊的运行时 Union 对象。

JavaScript 运行时仍然只是：

```js
{
  status: 'success',
  data: ['Keyboard']
}
```

真正发生在运行时的是普通的：

```js
state.status
```

比较。

TypeScript 只是利用这段运行时控制流做静态分析。

### 9. 本节先不做 `never` 穷尽检查

当前 `switch` 覆盖了三个成员。

后面 TS-KP096 会专门学习：

```text
如果以后新增一种状态
如何让编译器提醒 switch 没有处理完整？
```

那时会引入：

```ts
never
```

进行 Exhaustiveness Checking。

本节只聚焦：

```text
如何构造判别联合
如何通过判别字段缩小成员
```

## 动手编码：从 0 到 1

### 第 1 步：创建三种业务状态

创建：

```text
kp086-discriminated-union/src/main.ts
```

先写：

```ts
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'failed'; error: string };
```

本步目标：让三种状态拥有独立结构。

### 第 2 步：创建统一处理函数

继续写：

```ts
function renderState(state: RequestState): string {
  // ...
}
```

这个函数接收整个 Union，而不是某一个固定成员。

### 第 3 步：根据判别字段分支

写入：

```ts
switch (state.status) {
  case 'loading':
    return 'Loading...';
  case 'success':
    return `Loaded ${state.data.length} items`;
  case 'failed':
    return `Error: ${state.error}`;
}
```

观察：

```text
success 分支可以直接使用 state.data
failed 分支可以直接使用 state.error
```

### 第 4 步：构造三种合法状态

加入：

```ts
console.log(renderState({ status: 'loading' }));
console.log(renderState({ status: 'success', data: ['Keyboard', 'Mouse'] }));
console.log(renderState({ status: 'failed', error: 'timeout' }));
```

预期：

```text
Loading...
Loaded 2 items
Error: timeout
```

### 第 5 步：添加 tsconfig

创建 `tsconfig.json`：

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

**本节核心代码**：`RequestState` 判别联合和 `switch (state.status)`。

**实验辅助代码**：三个状态字面量与日志只用于观察各成员运行结果。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp086-discriminated-union/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp086-discriminated-union/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp086-discriminated-union/dist/main.js
```

预期：

```text
Loading...
Loaded 2 items
Error: timeout
```

## 效果验证

完成本节后，应该能回答：

1. 什么条件下一个 Union 可以被称为 Discriminated Union？
2. `status` 为什么可以帮助 TypeScript 判断当前成员？
3. 为什么 success 成员应该让 `data` 必填，而不是把它放进统一对象里设成 optional？
4. 判别联合为什么适合请求状态和状态机？
5. `switch` 分支里为什么可以访问不同成员的专属属性？
6. 判别联合在 JavaScript 运行时是不是特殊对象？
7. 为什么本节暂时不需要 `never`？
