# TS-KP094：用户自定义 Type Predicate

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解为什么内置 `typeof` / `in` 等 Type Guard 有时需要封装成可复用函数。
2. 写出 `parameter is Type` 形式的 Type Predicate。
3. 理解 Type Predicate 参数名必须对应当前函数签名中的参数。
4. 在 `if`、`filter()` 等调用位置利用 predicate 触发 Narrowing。
5. 理解 true 分支与剩余分支为什么会得到不同成员。
6. 理解 Type Predicate 是静态契约，函数实现必须自己保证判断真实可靠。
7. 区分 Predicate 与下一节 Assertion Function 的调用方式。

> **本节核心代码**：`isDownloadable(product): product is DownloadableProduct`。
>
> **实验辅助代码**：`products.filter(isDownloadable)` 与两个日志用于观察过滤后的精确数组类型。

## 理论讲解

### 1. 内置 Type Guard 可以解决局部问题

前面已经可以写：

```ts
if ('downloadUrl' in product) {
  // product 被收窄
}
```

如果只出现一次，这非常合适。

但大型项目里同一判断可能出现在：

- 页面渲染。
- 业务服务。
- 数组过滤。
- 状态转换。
- 权限判断。

如果每个地方都复制判断逻辑，就容易产生：

```text
重复代码
判断条件漂移
静态类型与运行时规则不一致
```

因此可以把判断封装成 User-defined Type Guard。

### 2. Type Predicate 的基本语法

普通 boolean 函数：

```ts
function isDownloadable(product: Product): boolean {
  return 'downloadUrl' in product;
}
```

它运行时能返回 true / false，但仅从返回类型 `boolean` 看，TypeScript 不一定把这个函数理解成“true 就证明 product 是某个具体类型”的公开契约。

Type Predicate 写成：

```ts
function isDownloadable(
  product: Product
): product is DownloadableProduct {
  return 'downloadUrl' in product;
}
```

其中：

```text
product is DownloadableProduct
```

就是 Type Predicate。

### 3. `parameter is Type` 到底表达什么

它的意思不是：

```text
把 product 强制转换成 DownloadableProduct
```

而是：

> 如果这个函数返回 true，那么调用位置可以把传入的那个变量视为 DownloadableProduct。

所以：

```ts
if (isDownloadable(product)) {
  product.downloadUrl;
}
```

true 分支中 TypeScript 会使用更具体类型。

### 4. 参数名必须对应函数参数

例如：

```ts
function isDownloadable(product: Product): product is DownloadableProduct
```

predicate 左侧的 `product` 就是当前函数参数名。

不能随便写一个当前签名里不存在的变量名。

原因是 TypeScript 必须知道：

```text
这个 predicate 到底在描述哪个传入值
```

### 5. Type Predicate 特别适合数组过滤

假设：

```ts
const products: Product[] = [...];
```

使用：

```ts
const downloads = products.filter(isDownloadable);
```

TypeScript 可以把结果理解成：

```text
DownloadableProduct[]
```

而不是继续停留在：

```text
Product[]
```

因此后面可以直接访问：

```ts
downloads[0].downloadUrl
```

这类能力在处理：

- API 混合结果。
- UI 状态集合。
- 事件列表。
- 可空值数组。

时非常常见。

### 6. Predicate 本身必须“说真话”

这是本节最重要的工程边界。

例如你写：

```ts
function isDownloadable(product: Product): product is DownloadableProduct {
  return true;
}
```

类型签名虽然合法，但实现显然不可靠。

TypeScript 不会替你完整证明：

```text
函数返回 true
是否真的等价于
值一定符合 DownloadableProduct
```

所以 Type Predicate 是：

```text
运行时判断
+
开发者向类型系统声明的语义契约
```

判断条件越复杂，越要配测试。

### 7. Predicate 与 Type Assertion 不一样

Type Assertion：

```ts
value as DownloadableProduct
```

只是告诉编译器相信你，并不会执行运行时检查。

Type Predicate 通常应该真正执行判断：

```ts
return 'downloadUrl' in product;
```

因此它更适合作为可复用边界判断。

### 8. Predicate 与 Assertion Function 不一样

Type Predicate：

```text
返回 boolean
调用者通常写 if / filter
```

Assertion Function：

```text
不满足条件就 throw
正常返回后直接完成收窄
```

下一节会专门学习：

```ts
asserts value is Type
```

### 9. Type Predicate 不会生成新的运行时类型

编译后：

```text
product is DownloadableProduct
```

会被擦除。

JavaScript 真正保留下来的仍然只是：

```js
'downloadUrl' in product
```

所以运行时安全仍来自你真正写出的判断代码。

## 动手编码：从 0 到 1

### 第 1 步：定义两个产品成员

创建：

```text
kp094-type-predicate/src/main.ts
```

写：

```ts
type DownloadableProduct = {
  name: string;
  downloadUrl: string;
};

type ShippableProduct = {
  name: string;
  weight: number;
};
```

### 第 2 步：组合为 Product Union

加入：

```ts
type Product = DownloadableProduct | ShippableProduct;
```

此时普通 `Product` 不能直接访问 `downloadUrl`。

### 第 3 步：封装 Type Predicate

加入：

```ts
function isDownloadable(product: Product): product is DownloadableProduct {
  return 'downloadUrl' in product;
}
```

核心不是函数名，而是返回类型：

```text
product is DownloadableProduct
```

### 第 4 步：创建混合数组

加入：

```ts
const products: Product[] = [
  { name: 'TypeScript Guide', downloadUrl: '/downloads/ts-guide.pdf' },
  { name: 'Keyboard', weight: 0.8 }
];
```

### 第 5 步：把 Predicate 交给 filter

加入：

```ts
const downloads = products.filter(isDownloadable);
```

此时 `downloads` 可以按 `DownloadableProduct[]` 使用。

### 第 6 步：访问被收窄后的成员

加入：

```ts
console.log(downloads[0].name);
console.log(downloads[0].downloadUrl);
```

预期：

```text
TypeScript Guide
/downloads/ts-guide.pdf
```

### 第 7 步：添加 tsconfig

创建：

```text
kp094-type-predicate/tsconfig.json
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

**本节核心代码**：Type Predicate 声明和真实的 `'downloadUrl' in product` 判断。

**实验辅助代码**：混合产品数组、`filter()` 与日志只是展示 predicate 的复用价值。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp094-type-predicate/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp094-type-predicate/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp094-type-predicate/dist/main.js
```

预期输出：

```text
TypeScript Guide
/downloads/ts-guide.pdf
```

## 效果验证

完成本节后，应该能回答：

1. `parameter is Type` 是什么？
2. Type Predicate 为什么比普通 boolean 返回类型提供更多静态信息？
3. 为什么 predicate 参数名必须对应当前函数参数？
4. `filter(isDownloadable)` 为什么能得到更精确的数组元素类型？
5. TypeScript 会不会自动证明 predicate 函数体一定写对？
6. Type Predicate 和 `as` Type Assertion 的差异是什么？
7. Type Predicate 与 Assertion Function 的调用模型有什么差异？
