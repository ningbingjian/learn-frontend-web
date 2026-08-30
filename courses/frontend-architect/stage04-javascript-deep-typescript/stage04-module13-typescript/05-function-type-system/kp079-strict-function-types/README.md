# TS-KP079：`strictFunctionTypes`

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么函数参数类型的兼容方向和返回值方向不同。
2. 理解 `strictFunctionTypes` 为什么阻止“只能处理更具体输入”的函数冒充“能处理更宽输入”的函数。
3. 使用 `Animal` / `Dog` 关系判断普通函数类型的安全赋值方向。
4. 理解 `strict: true` 会包含 `strictFunctionTypes`。
5. 知道方法语法和构造器声明存在历史兼容例外，不要把它们和普通函数类型完全等同。
6. 不把“方法例外能编译”误解成“这种赋值一定具有运行时类型安全”。

> **本节核心代码**：`AnimalHandler` / `DogHandler` 的安全赋值，以及 `MethodHandler<T>` 展示的方法语法例外。
>
> **实验辅助代码**：`dog` 测试数据和日志用于观察最终调用结果。

## 理论讲解

### 1. 先从一个不安全场景开始

假设：

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

`Dog` 比 `Animal` 更具体：

```text
Animal
└── name

Dog
├── name
└── breed
```

现在有一个只会处理 `Dog` 的函数：

```ts
const onlyDog = (dog: Dog) => dog.breed;
```

如果把它当成：

```ts
(animal: Animal) => string
```

会有什么问题？

调用方看到的是 `AnimalHandler`，因此它有权传：

```ts
{ name: 'Mimi' }
```

这个值是合法 `Animal`，但没有 `breed`。

`onlyDog` 却依赖 `breed`。

这就是典型的不安全赋值。

### 2. `strictFunctionTypes` 要阻止的就是这种错误

声明：

```ts
type AnimalHandler = (animal: Animal) => string;
type DogHandler = (dog: Dog) => string;
```

下面方向不安全：

```ts
const onlyDog: DogHandler = (dog) => `dog:${dog.breed}`;

// const unsafe: AnimalHandler = onlyDog;
```

在 `strictFunctionTypes` 开启时，普通函数类型会拒绝这种赋值。

因为目标 `AnimalHandler` 的调用者可以传任意 `Animal`，而源函数只能处理 `Dog`。

### 3. 安全方向恰好相反

如果一个函数可以处理所有 `Animal`：

```ts
const handleAnimal: AnimalHandler = (animal) =>
  `animal:${animal.name}`;
```

那么把它用在 `DogHandler` 位置是安全的：

```ts
const handleDog: DogHandler = handleAnimal;
```

为什么？

目标 `DogHandler` 的调用方只会传 `Dog`。

而每一个 `Dog` 同时也是 `Animal`。

所以 `handleAnimal()` 一定处理得了。

可以建立方向直觉：

```text
目标只会给你更具体的 Dog
        ↓
源函数能处理更宽的 Animal
        ↓
安全
```

### 4. 参数位置为什么常被称为“逆变”

返回值上一节是：

```text
返回更具体
可以满足返回更宽
```

参数则恰好反方向：

```text
目标接收更具体 Dog
源函数接收更宽 Animal
        ↓
安全
```

这种方向在类型理论里叫做 Contravariance（逆变）。

当前课程不要求死记定义，但应该记住安全性问题：

> 调用方能传什么，源函数必须真的处理得了什么。

### 5. `strict: true` 已经包含 `strictFunctionTypes`

本模块基础配置启用了：

```json
{
  "strict": true
}
```

因此普通函数类型的严格参数检查默认已经生效。

如果单独关闭：

```json
{
  "strictFunctionTypes": false
}
```

一些本来不安全的函数参数赋值可能会重新被允许。

现代 TypeScript 工程通常不建议为了绕过类型设计问题去关闭它。

### 6. 为什么历史上会存在更宽松的函数参数检查

JavaScript 生态大量依赖回调、多态容器和方法结构。

为了兼容已有代码，TypeScript 在发展过程中保留了一些有意的非完全 sound 行为。

`strictFunctionTypes` 的意义就是：

```text
对普通函数类型
        ↓
尽量阻止明显的参数类型不安全赋值
```

### 7. 一个重要例外：方法与构造器声明

TypeScript 的 `strictFunctionTypes` 对普通函数类型表达式更严格，但对方法和构造器声明保留历史例外。

例如：

```ts
interface MethodHandler<T> {
  handle(value: T): string;
}
```

这里的：

```ts
handle(value: T): string
```

是**方法签名**。

它和属性形式：

```ts
interface FunctionPropertyHandler<T> {
  handle: (value: T) => string;
}
```

不是完全相同的兼容行为。

方法参数仍存在 bivariance（双变）历史兼容行为。

### 8. 最终案例为什么故意展示方法例外

本节代码写：

```ts
const dogMethod: MethodHandler<Dog> = {
  handle(value) {
    return `dog:${value.breed}`;
  }
};

const animalMethod: MethodHandler<Animal> = dogMethod;
```

这在当前 TypeScript 下可以通过。

但这不代表它在所有调用上都真正安全。

如果通过 `animalMethod` 传入一个不是 `Dog` 的普通 `Animal`，`dogMethod` 的实现仍然会假设存在 `breed`。

所以应该把它理解成：

```text
语言为了兼容性保留的方法规则
        ↓
不是鼓励你依赖这种不安全方向设计 API
```

### 9. 为什么 Array 等泛型接口受这个例外影响

方法例外最初的重要动机之一，是让大量现有泛型类 / 接口（例如数组方法）维持可用的兼容关系。

因此看到：

```text
普通函数属性
方法签名
```

时，不要默认它们的参数 variance 行为百分之百相同。

### 10. 工程上怎么做

比较稳妥的实践：

1. 保持 `strict: true`。
2. 不用 `as` 强行把窄参数函数伪装成宽参数函数。
3. 设计回调 API 时，从调用方真实可能传入的类型定义参数。
4. 如果函数必须接受所有 `Animal`，实现就不要只支持 `Dog`。
5. 知道方法语法存在例外，但不要把例外当成类型安全证明。

### 11. 和下一节 `void` 有什么关系

`strictFunctionTypes` 主要关注：

```text
参数类型如何兼容
```

下一节 TS-KP080 关注：

```text
为什么返回 number 的函数
可以赋给返回 void 的回调类型
```

这是另一个专门为 JavaScript 回调习惯设计的规则。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp079-strict-function-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明父子结构

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

### 第 2 步：声明两个普通函数类型

```ts
type AnimalHandler = (animal: Animal) => string;
type DogHandler = (dog: Dog) => string;
```

### 第 3 步：实现能处理所有 Animal 的函数

```ts
const handleAnimal: AnimalHandler = (animal) =>
  `animal:${animal.name}`;
```

### 第 4 步：把宽参数函数赋给窄参数目标

```ts
const handleDog: DogHandler = handleAnimal;
```

这是安全方向。

### 第 5 步：准备 Dog 数据并调用

```ts
const dog: Dog = {
  name: 'Buddy',
  breed: 'Corgi'
};

console.log(handleDog(dog));
```

预期：

```text
animal:Buddy
```

### 第 6 步：临时实验不安全反方向

```ts
const onlyDog: DogHandler = (value) => `dog:${value.breed}`;

// const unsafe: AnimalHandler = onlyDog;
```

在当前 `strict` 配置下应报错。

### 第 7 步：声明方法形式泛型接口

```ts
interface MethodHandler<T> {
  handle(value: T): string;
}
```

注意这是方法语法，不是函数属性。

### 第 8 步：创建 Dog 方法处理器

```ts
const dogMethod: MethodHandler<Dog> = {
  handle(value) {
    return `dog:${value.breed}`;
  }
};
```

### 第 9 步：观察方法语法例外

```ts
const animalMethod: MethodHandler<Animal> = dogMethod;
```

当前 TypeScript 允许这个赋值。

我们只用真正的 `Dog` 调用它：

```ts
console.log(animalMethod.handle(dog));
```

预期：

```text
dog:Corgi
```

不要因为这个案例可编译，就主动设计依赖这种不安全方向的 API。

### 第 10 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：普通函数类型下 `handleAnimal -> DogHandler` 的安全方向，以及方法签名的 bivariance 例外。
- **实验辅助代码**：`dog` 数据和日志用于验证调用结果。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp079-strict-function-types/tsconfig.json
npm run build -- ./05-function-type-system/kp079-strict-function-types/tsconfig.json
node ./05-function-type-system/kp079-strict-function-types/dist/main.js
```

预期输出：

```text
animal:Buddy
dog:Corgi
```

## 效果验证

完成本节后，你应该能够判断：

```text
AnimalHandler -> DogHandler
```

为什么安全：目标只会给 `Dog`，源函数能处理所有 `Animal`。

以及：

```text
DogHandler -> AnimalHandler
```

为什么在 `strictFunctionTypes` 下对普通函数类型不安全：目标调用者有权传不是 `Dog` 的其它 `Animal`。

最后还要记住方法签名存在历史兼容例外，**能编译不等于你应该主动依赖这种不安全行为设计公共 API**。
