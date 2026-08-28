# TS-KP029：`{}` 与 `Object` 的差异

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释小写 `object`、空对象类型 `{}` 和全局 `Object` 不是同一个类型概念。
2. 知道 `{}` 并不表示“只能传空对象”，在严格空值检查下它可以接受几乎所有非 `null` / `undefined` 的值。
3. 知道 `Object` 是 JavaScript 全局 `Object` 相关的类型，日常业务类型通常不应该使用它。
4. 理解为什么 `string`、`number` 等原始值在很多场景下可以赋给 `{}` 和 `Object`，却不能赋给小写 `object`。
5. 能根据需求选择 `object`、具体对象结构，而不是误用 `{}` 或 `Object`。

> **本节核心代码**：三个函数分别使用 `{}`、`Object`、`object` 接收参数，并用实际调用比较它们的赋值边界。
>
> **实验辅助代码**：`typeof`、`Array.isArray()`、`toString()` 和日志输出只用于观察差异。

## 理论讲解

### 1. 先复习小写 `object`

上一节已经学习：

```ts
function acceptObject(value: object) {
  // ...
}
```

小写 `object` 表示**非原始值**。

因此下面这些可以传入：

```ts
acceptObject({ id: 1 });
acceptObject([1, 2, 3]);
acceptObject(() => 'ok');
```

而下面这些原始值不能直接传入：

```ts
// acceptObject('text');
// acceptObject(42);
// acceptObject(true);
```

这个边界非常明确：

```text
object
  ↓
非 primitive
```

### 2. `{}` 不是“空对象值”

很多初学者看到：

```ts
{}
```

会直觉认为它表示：

> “一个没有任何属性的普通对象”。

但 TypeScript 中的空对象类型 `{}` 不是这个意思。

在开启严格空值检查时，下面这些值都可以赋给 `{}`：

```ts
const a: {} = 'text';
const b: {} = 42;
const c: {} = true;
const d: {} = { id: 1 };
const e: {} = [1, 2, 3];
```

而：

```ts
// const x: {} = null;
// const y: {} = undefined;
```

会失败。

所以可以先建立这个实用直觉：

```text
{}
≈ 非 null / undefined 的值
```

> 这里的“≈”表示学习直觉，不是在定义完整的类型系统等价关系。

### 3. 为什么字符串和数字也能赋给 `{}`

例如：

```ts
const value: {} = 'hello';
```

TypeScript 并没有把字符串变成普通对象。

运行时它仍然是：

```text
typeof value === 'string'
```

`{}` 只是没有要求任何自定义属性，因此大量非空值都满足这个宽泛约束。

因此不要看到 `{}` 就理解成：

```text
JavaScript 空对象 {}
```

它们只是写法相同，所处的位置和语义完全不同。

### 4. 全局 `Object` 又是什么

大写：

```ts
Object
```

是 JavaScript 全局 `Object` 相关的 TypeScript 类型。

它描述了所有对象包装体系共有的一些能力，例如：

```ts
value.toString();
```

日常赋值中，很多原始值也可以赋给 `Object`：

```ts
const text: Object = 'hello';
const count: Object = 42;
```

因为 JavaScript 对原始值访问对象方法时存在装箱行为，TypeScript 的全局类型声明也反映了这种关系。

但这并不意味着业务代码应该大量使用 `Object`。

TypeScript 官方文档明确建议普通代码避免大写包装类型，并优先使用小写类型；如果想表达“非原始值”，应该使用：

```ts
object
```

而不是：

```ts
Object
```

### 5. `{}` 和 `Object` 到底差在哪

这一节最需要避免的是制造一个过度简化的结论。

在大量常见的赋值场景中：

```text
{}
Object
```

表现非常接近：

- 都可以接受字符串、数字等非空原始值。
- 都可以接受普通对象、数组、函数。
- 在严格空值检查下都不会接受 `null` / `undefined`。

但它们的**来源和表达意图不同**：

```text
{}
空对象类型语法
没有声明额外必需成员

Object
JavaScript 全局 Object 对应的类型
来自全局对象类型体系
```

所以这节课真正需要记住的不是“找一个神奇案例证明二者完全不同”，而是：

> **这两个类型都非常宽，通常都不是描述业务对象结构的好选择。**

### 6. 业务代码应该怎么选

如果你的意图是：

#### 只允许非原始值

使用：

```ts
object
```

#### 要求具体属性

使用具体对象结构：

```ts
type Product = {
  id: number;
  name: string;
};
```

#### 要求某种键值表

应该使用明确的索引结构或 `Record`，后续章节会专门学习。

#### 只是想写“任意非空值”

`{}` 在某些底层类型工具或泛型约束中可能有意义，但不应被误认为“任意对象”。

### 7. 三个类型放在一起看

```text
object
只接受非原始值

{}
非常宽，常见情况下接受所有非 null / undefined 的值

Object
全局 Object 类型，也非常宽，日常业务代码通常避免使用
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建本节目录

```text
kp029-empty-object-vs-object/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先观察 `{}`

创建 `src/main.ts`，先写：

```ts
function acceptsEmptyObject(value: {}): string {
  return `{}:${typeof value}`;
}
```

然后调用：

```ts
console.log(acceptsEmptyObject('text'));
console.log(acceptsEmptyObject(42));
```

这两行都可以通过类型检查。

运行时则分别仍然是：

```text
string
number
```

### 第 2 步：加入大写 `Object`

继续写：

```ts
function acceptsUpperObject(value: Object): string {
  return `Object:${value.toString()}`;
}
```

然后：

```ts
console.log(acceptsUpperObject('text'));
console.log(acceptsUpperObject(42));
```

它们同样能通过检查。

这一步说明：

```text
Object 也不是“只接受普通对象字面量”
```

### 第 3 步：加入小写 `object`

继续写：

```ts
function acceptsNonPrimitive(value: object): string {
  return Array.isArray(value)
    ? `object:array(${value.length})`
    : `object:${typeof value}`;
}
```

正确调用：

```ts
console.log(acceptsNonPrimitive({ id: 1 }));
console.log(acceptsNonPrimitive([1, 2, 3]));
```

### 第 4 步：临时验证小写 `object` 的边界

临时加入：

```ts
acceptsNonPrimitive('text');
```

执行类型检查，应看到 `string` 不能传给 `object`。

验证后删除这行。

### 第 5 步：临时验证空值边界

临时加入：

```ts
acceptsEmptyObject(null);
acceptsUpperObject(undefined);
```

在本课程的 `strict: true` 配置下都应该得到类型错误。

验证完成后删除。

### 第 6 步：运行最终案例

最终输出：

```text
{}:string
{}:number
Object:text
Object:42
object:object
object:array(3)
```

### 第 7 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`{}`、`Object`、`object` 三种参数类型及其可接受值的差异。
- **实验辅助代码**：`typeof`、`toString()`、`Array.isArray()` 只用于把边界打印出来。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp029-empty-object-vs-object/tsconfig.json
npm run build -- ./02-basic-types-inference/kp029-empty-object-vs-object/tsconfig.json
node ./02-basic-types-inference/kp029-empty-object-vs-object/dist/main.js
```

预期：

```text
{}:string
{}:number
Object:text
Object:42
object:object
object:array(3)
```

## 效果验证

你应该能够确认：

- `{}` 不表示“只能传空对象”。
- `Object` 不是小写 `object` 的另一种拼写。
- `{}` 与 `Object` 在很多普通赋值场景中都非常宽。
- 小写 `object` 明确排除 `string`、`number`、`boolean` 等原始值。
- 业务对象应优先写具体结构，而不是依赖 `{}` 或 `Object`。
- 如果只是想表达非原始值，优先使用小写 `object`。
