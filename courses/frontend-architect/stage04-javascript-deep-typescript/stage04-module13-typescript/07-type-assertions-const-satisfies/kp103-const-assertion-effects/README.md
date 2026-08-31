# TS-KP103：Const Assertion 对对象、数组和字面量的影响

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 分别解释 Const Assertion 对 primitive literal、object literal、array literal 的影响。
2. 理解 `let value = 'CNY' as const` 会得到精确 literal type。
3. 理解数组字面量为什么会变成 readonly tuple。
4. 理解对象字面量属性为什么会变成 readonly 并尽量保留 literal type。
5. 理解直接嵌套 literal 与“引用已有可变对象”的差异。
6. 理解 `as const` 不是 deep runtime immutability。
7. 能识别什么时候应该使用真正的 runtime freeze / immutable data strategy。

> **本节核心代码**：literal、数组和对象三种 `as const` 推断效果，以及外部 `string[]` 引用仍保持可变类型。
>
> **实验辅助代码**：`externalTags.push('web')` 用于观察 `as const` 不会把已经存在的外部数组自动变成运行时不可变对象。

## 理论讲解

### 1. Primitive Literal：阻止 widening

普通：

```ts
let currency = 'CNY';
```

因为 `let` 后续可能改成其它字符串，通常推断为：

```text
string
```

加入：

```ts
let currency = 'CNY' as const;
```

静态类型变成：

```text
'CNY'
```

于是后续不能再写：

```ts
// currency = 'USD';
```

### 2. Array Literal：变成 readonly tuple

例如：

```ts
const retries = [1, 2] as const;
```

不再只是：

```text
number[]
```

而更接近：

```text
readonly [1, 2]
```

这同时保留：

- 元素位置。
- 元素 literal type。
- readonly 约束。

### 3. Object Literal：属性 readonly + literal 精度

例如：

```ts
const config = {
  mode: 'production',
  retries: [1, 2]
} as const;
```

其中：

```text
mode → readonly 'production'
retries → readonly [1, 2]
```

### 4. 直接嵌套 literal 会进入 const context

在：

```ts
const config = {
  retries: [1, 2]
} as const;
```

`[1, 2]` 是这次 literal expression 的直接组成部分，所以它得到 readonly tuple 推断。

### 5. 但引用一个已有可变数组是另一回事

本节准备：

```ts
const externalTags = ['stable'];
```

它的类型是：

```text
string[]
```

然后：

```ts
const config = {
  tags: externalTags
} as const;
```

`config.tags` 这个属性本身不能重新指向另一个数组，但被引用进去的值类型仍然来自：

```text
string[]
```

因此已有数组仍可能被修改：

```ts
externalTags.push('web');
```

随后：

```ts
config.tags
```

也能观察到变化。

### 6. 为什么这说明 `as const` 不是深度运行时冻结

如果你真正需要 runtime immutability，需要考虑：

```text
Object.freeze
不可变数据结构
复制而不是共享可变引用
业务层 mutation 约束
```

TypeScript readonly 与 JavaScript runtime object mutation 是两个层次。

### 7. `as const` 的“递归效果”要准确理解

对一个直接写出的 nested literal：

```ts
{
  nested: {
    status: 'ready'
  }
} as const
```

TypeScript 会沿这个 const context 保留非常精确的 readonly/literal 推断。

但如果属性值来自之前已经声明的变量：

```ts
const mutable = [];
const value = { mutable } as const;
```

Const Assertion 不会重新发明 `mutable` 原本的类型，也不会在运行时把它冻结。

### 8. Array Const Assertion 为什么特别有价值

它可以很自然地表达：

```ts
const roles = ['admin', 'editor', 'viewer'] as const;
```

这类固定序列之后经常可以用于：

- 固定配置。
- tuple 参数。
- 有限值集合推导。
- 路由片段。
- 状态定义。

后续章节会继续用 `typeof`、Indexed Access 等工具从这些值推导类型。

### 9. 不要为了 readonly 到处 `as const`

如果数据本来就是可编辑表单：

```text
用户可以改变字段
```

强行把所有对象 `as const` 可能反而增加不必要的类型摩擦。

使用前仍然要先问：

```text
业务语义上它是不是常量？
```

## 动手编码：从 0 到 1

### 第 1 步：创建 primitive literal

```ts
let currency = 'CNY' as const;
```

这里即使是 `let`，静态类型也被限制为 `'CNY'`。

### 第 2 步：创建外部可变数组

```ts
const externalTags = ['stable'];
```

这是普通 `string[]`。

### 第 3 步：创建 const asserted object

```ts
const config = {
  mode: 'production',
  retries: [1, 2],
  tags: externalTags
} as const;
```

观察三类属性：

```text
mode → literal
retries → readonly tuple
tags → 引用原本的 string[]
```

### 第 4 步：修改外部数组

```ts
externalTags.push('web');
```

这是合法 JavaScript，也是合法 TypeScript，因为 `externalTags` 原本就是可变 `string[]`。

### 第 5 步：输出最终状态

```ts
console.log(currency);
console.log(config.mode);
console.log(config.retries.join(','));
console.log(config.tags.join('|'));
```

预期：

```text
CNY
production
1,2
stable|web
```

### 第 6 步：添加 tsconfig

使用模块统一 strict 配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：三种 Const Assertion 推断，以及直接 literal 与已有可变引用之间的差异。

**实验辅助代码**：`externalTags.push('web')` 用于证明类型层 const context 不等于运行时深冻结。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp103-const-assertion-effects/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp103-const-assertion-effects/tsconfig.json
node ./07-type-assertions-const-satisfies/kp103-const-assertion-effects/dist/main.js
```

预期：

```text
CNY
production
1,2
stable|web
```

## 效果验证

完成本节后，应该能回答：

1. `'CNY' as const` 对 primitive literal 有什么效果？
2. `[1, 2] as const` 为什么不是普通 `number[]`？
3. 对象字面量 `as const` 会怎样影响属性？
4. 为什么 `config.retries` 和 `config.tags` 的可变性表现不同？
5. `as const` 是否等于深度 `Object.freeze()`？
6. 为什么 `externalTags.push('web')` 仍然合法？
7. 什么时候真正需要 runtime immutability，而不仅仅是 TypeScript readonly？
