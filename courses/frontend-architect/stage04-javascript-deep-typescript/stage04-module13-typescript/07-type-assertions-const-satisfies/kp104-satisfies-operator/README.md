# TS-KP104：`satisfies` Operator

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `expression satisfies Type` 的基本语义。
2. 理解 `satisfies` 会检查表达式是否满足目标契约。
3. 理解它与 `as Type` 的方向完全不同：一个是校验，一个是断言。
4. 理解 `satisfies` 不会在运行时生成校验逻辑。
5. 理解为什么它特别适合配置对象、路由表、映射表等结构。
6. 理解目标类型可以检查 key、value 和属性形状。
7. 为下一节“`satisfies` 与类型注解的差异”建立基础。

> **本节核心代码**：对象字面量后使用 `satisfies Record<RouteName, RouteConfig>`。
>
> **实验辅助代码**：`homePath` 与日志用于观察校验通过后仍可继续使用具体值。

## 理论讲解

### 1. 为什么需要 `satisfies`

配置对象经常同时需要两件事：

```text
要求 1：必须满足一个公共契约
要求 2：不要无缘无故丢掉表达式自己的具体信息
```

TypeScript 4.9 引入 `satisfies`，就是为这个场景提供一个直接工具。

基本形式：

```ts
const value = expression satisfies TargetType;
```

它表达的是：

> 请检查左侧表达式能否赋给 `TargetType`。

### 2. `satisfies` 首先是“检查”

例如：

```ts
type RouteConfig = {
  path: `/${string}`;
  secure: boolean;
};
```

配置：

```ts
const route = {
  path: '/products',
  secure: true
} satisfies RouteConfig;
```

TypeScript 会检查：

- `path` 是否满足模板字面量类型。
- `secure` 是否为 boolean。
- 对象结构是否符合目标契约。

### 3. `satisfies` 不是类型断言

下面两句目的不同：

```ts
value as RouteConfig
```

含义更接近：

> 开发者告诉编译器，请把这个值按 RouteConfig 看。

而：

```ts
value satisfies RouteConfig
```

含义更接近：

> 编译器，请验证这个表达式确实满足 RouteConfig。

因此 `satisfies` 不是用来“强行让错误代码通过”的。

### 4. `satisfies` 很适合映射表

本节使用：

```ts
type RouteName = 'home' | 'products';
```

配合：

```ts
Record<RouteName, RouteConfig>
```

就可以同时约束：

```text
必须存在 home
必须存在 products
每个 value 必须符合 RouteConfig
```

如果 key 拼错、漏掉 key、value 类型错误，都会在声明处暴露。

### 5. 它仍然只是编译期能力

`satisfies` 不会编译成：

```js
validateRouteConfig(...)
```

运行时收到 JSON、数据库字段、用户输入时，仍然需要真实验证。

## 动手编码：从 0 到 1

### 第 1 步：定义允许的路由名称

创建：

```text
kp104-satisfies-operator/src/main.ts
```

写入：

```ts
type RouteName = 'home' | 'products';
```

### 第 2 步：定义路由配置契约

```ts
type RouteConfig = {
  path: `/${string}`;
  secure: boolean;
};
```

### 第 3 步：创建路由表

```ts
const routes = {
  home: { path: '/', secure: false },
  products: { path: '/products', secure: true }
} satisfies Record<RouteName, RouteConfig>;
```

本步同时检查 key 集合与 value 结构。

### 第 4 步：观察具体 path

```ts
const homePath: '/' = routes.home.path;
```

这一行能够通过，说明 `routes.home.path` 仍然保留了精确的 `'/'` 信息。

### 第 5 步：输出运行结果

```ts
console.log(routes.home.path);
console.log(routes.products.secure);
```

### 第 6 步：添加 tsconfig

创建：

```text
kp104-satisfies-operator/tsconfig.json
```

最终配置继承模块公共严格配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`satisfies Record<RouteName, RouteConfig>`。

**实验辅助代码**：`homePath` 以及两条日志用于验证推断和运行结果。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp104-satisfies-operator/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp104-satisfies-operator/tsconfig.json
node ./07-type-assertions-const-satisfies/kp104-satisfies-operator/dist/main.js
```

预期：

```text
/
true
```

## 效果验证

完成本节后，应该能回答：

1. `satisfies` 的主要职责是什么？
2. 它和 `as` 的方向有什么不同？
3. 为什么映射表适合使用 `satisfies`？
4. 它会不会产生运行时 schema validation？
5. `Record<RouteName, RouteConfig>` 可以同时约束哪些内容？
6. 为什么 `routes.home.path` 仍能保留具体字面量信息？
