# TS-KP030：变量类型推断

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 可以根据变量初始化值自动推断类型。
2. 知道局部变量并不需要为了“看起来像 TypeScript”而机械添加显式类型标注。
3. 能通过后续赋值验证 TypeScript 已经为变量建立了类型约束。
4. 理解对象字面量初始化时，TypeScript 会继续推断属性类型。
5. 知道什么时候适合依赖推断，什么时候应该主动写类型标注。
6. 为后续 Literal Widening、Best Common Type 和 Contextual Typing 建立基础。

> **本节核心代码**：没有显式类型标注的变量初始化，以及 TypeScript 从右侧值推导出的静态类型。
>
> **实验辅助代码**：临时错误赋值、`console.log()` 和编辑器 Hover 用于观察推断结果。

## 理论讲解

### 1. TypeScript 不要求每个变量都写类型

例如：

```ts
let count = 0;
```

虽然没有写：

```ts
let count: number = 0;
```

TypeScript 仍然可以从右侧数字 `0` 推断 `count` 的类型。

因此后续：

```ts
count = 10;
```

可以通过，而：

```ts
// count = '10';
```

会得到类型错误。

### 2. 推断不是“没有类型”

这一点非常重要。

下面：

```ts
let label = 'pending';
```

没有显式标注，不代表 `label` 没有类型。

更准确的过程是：

```text
右侧初始值
   ↓
TypeScript 分析
   ↓
得到变量的静态类型
   ↓
后续赋值继续受检查
```

因此“类型推断”本身就是类型系统的一部分。

### 3. 最常见的变量初始化推断

```ts
let retryCount = 0;
let label = 'pending';
const enabled = true;
```

TypeScript 会根据值建立数字、字符串、布尔值相关的类型信息。

本节先关注最直观的推断结果。

`let`、`const` 和字面量之间更精确的“拓宽”规则会在 TS-KP034 `Literal Widening` 单独学习。

### 4. 对象字面量也会被推断

例如：

```ts
const config = {
  endpoint: '/api/products',
  timeoutMs: 3000
};
```

TypeScript 不只是知道 `config` 是某个对象，还会建立类似：

```text
endpoint → string
 timeoutMs → number
```

的属性关系。

因此：

```ts
config.timeoutMs = 5000;
```

可以，而：

```ts
// config.timeoutMs = '5000';
```

会失败。

### 5. 为什么不要给所有局部变量重复写类型

下面的代码：

```ts
const retryCount: number = 0;
const label: string = 'pending';
const enabled: boolean = true;
```

当然没有错。

但如果右侧已经非常明确，重复标注可能只是增加维护噪音。

通常更自然的是：

```ts
const retryCount = 0;
const label = 'pending';
const enabled = true;
```

类型系统仍然存在，只是由编译器推断出来。

### 6. 什么时候应该主动写类型

类型推断并不意味着“永远不要写类型标注”。

下面这些位置通常更值得显式表达：

- 函数参数边界。
- 对外公开的 API。
- 复杂数据模型。
- 需要比当前初始值更宽的目标类型。
- 你希望编译器反过来检查实现是否满足某个契约时。

例如：

```ts
let selectedId: number | null = null;
```

如果只根据初始值 `null` 推断，就无法表达“以后这里允许放 number”这一业务意图。

### 7. 推断与显式标注应该协作

可以建立这个工程直觉：

```text
明显的局部实现细节
      ↓
优先依赖推断

重要边界 / 业务契约
      ↓
主动提供类型
```

这样既能减少重复，又不会失去重要的类型设计信息。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp030-variable-type-inference/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建一个数字变量

在 `src/main.ts` 写：

```ts
let retryCount = 0;
```

没有写 `: number`。

继续：

```ts
retryCount += 1;
```

TypeScript 可以完成数字运算检查。

### 第 2 步：创建字符串变量

继续：

```ts
let label = 'pending';
label = label.toUpperCase();
```

TypeScript 能提供字符串方法补全，因为它已经知道 `label` 的类型信息。

### 第 3 步：创建布尔值

加入：

```ts
const enabled = true;
```

这里仍然不写显式类型。

更细的 `const` 字面量推断以后再展开，本节只确认 TypeScript 能从初始化值获得类型信息。

### 第 4 步：让 TypeScript 推断一个对象

继续：

```ts
const config = {
  endpoint: '/api/products',
  timeoutMs: 3000
};
```

把鼠标放到 `config`、`endpoint`、`timeoutMs` 上，可以观察编辑器给出的推断结果。

### 第 5 步：输出最终结果

加入：

```ts
console.log(`${label}:${retryCount}:${enabled}`);
console.log(`${config.endpoint}:${config.timeoutMs}`);
```

预期：

```text
PENDING:1:true
/api/products:3000
```

### 第 6 步：临时制造错误赋值

临时加入：

```ts
retryCount = '1';
```

再次类型检查，应该看到字符串不能赋给数字变量。

这证明：

```text
没有显式写 : number
≠
变量没有 number 约束
```

验证后删除错误行。

### 第 7 步：再验证对象属性

临时加入：

```ts
config.timeoutMs = '3000';
```

同样应该失败。

恢复为正确代码。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：通过初始化值让 TypeScript 推断变量和对象属性类型。
- **实验辅助代码**：临时错误赋值和 Hover 只用于证明推断出的类型真实参与后续检查。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp030-variable-type-inference/tsconfig.json
npm run build -- ./02-basic-types-inference/kp030-variable-type-inference/tsconfig.json
node ./02-basic-types-inference/kp030-variable-type-inference/dist/main.js
```

预期：

```text
PENDING:1:true
/api/products:3000
```

## 效果验证

你应该能够确认：

- 变量初始化时 TypeScript 可以自动获得类型信息。
- 没写显式标注的变量仍然会受到后续赋值检查。
- 字符串变量能获得字符串方法提示。
- 对象字面量的属性也会被推断。
- 明显局部变量通常不需要重复写显式类型。
- 重要边界、复杂模型或需要表达更宽意图时仍然应该主动提供类型。
