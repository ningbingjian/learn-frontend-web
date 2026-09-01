# TS-KP002：静态类型检查与 JavaScript 运行时的边界

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001：TypeScript 与 JavaScript 的关系 |
| 本课主问题 | 为什么源码里的错误类型能被 `tsc` 拦住，但一段错误 JSON 仍然能在运行时把程序弄崩？ |
| Learning Artifact | `tsc` Diagnostic + 受控 Runtime Error |
| 本课暂时不用理解 | 完整 Runtime Type Guard、Schema Validation、`unknown` 设计策略 |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. `tsc` 依据源码中的静态类型信息工作。
2. JavaScript 运行时面对的是此刻真实存在的值。
3. 静态检查不是一个永久包住所有外部数据的运行时保护罩。

## 前置状态

上一课已经确认：

```text
.ts
 ↓ 静态检查 / 编译
.js
 ↓
JavaScript Runtime
```

现在要故意让“静态世界”和“运行时真实值”发生冲突。

## 本课主问题

函数要求：

```ts
function formatCount(count: number): string
```

源码里直接写：

```ts
formatCount('2');
```

会被 TypeScript 拦住。

但如果 `'2'` 来自 `JSON.parse()`，为什么最终还能出现：

```text
count.toFixed is not a function
```

## 先预测

先判断三件事：

```text
A. formatCount('2') 能否通过 tsc？
B. JSON.parse('"2"') 得到的真实值是什么？
C. 如果 tsc 没拦住，Node 会不会自动把 '2' 变成 2？
```

## 动手编码：从 0 到 1

### Step 0：建立静态契约

```ts
function formatCount(count: number): string {
  return `count=${count.toFixed(0)}`;
}
```

正确调用：

```ts
console.log(formatCount(2));
```

运行类型检查，应通过。

---

### Step 1：制造一个 `tsc` 看得见的错误

临时加入：

```ts
formatCount('2');
```

执行：

```bash
npm run check -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
```

应看到参数类型不匹配。

### 立即解释

这里 TypeScript 掌握了完整静态证据：

```text
参数要求 number
实际表达式类型 string
```

所以不需要运行程序就能拒绝调用。

验证后删除错误调用。

---

### Step 2：把同一个错误值藏到运行时输入里

加入：

```ts
const runtimeValue = JSON.parse('"2"');
```

最终实验故意继续调用：

```ts
formatCount(runtimeValue);
```

再次运行 `tsc`，当前案例可以通过。

现在不要急着下结论，继续真正运行。

---

### Step 3：编译并观察 Runtime Error

执行：

```bash
npm run build -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
node ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/dist/main.js
```

实际输出：

```text
count=2
runtime error: count.toFixed is not a function
```

### 立即解释

运行时拿到的真实值是：

```text
"2" → string
```

JavaScript Runtime 不会因为源代码某处写过 `number` 就自动转换数据。

---

### Step 4：把两阶段放在同一张图里

```text
源码直接传 '2'
   ↓
tsc 看见 string
   ↓
编译前失败

JSON.parse 在运行时产生 '2'
   ↓
静态阶段没有真实验证数据
   ↓
JavaScript 运行
   ↓
调用 string.toFixed
   ↓
Runtime Error
```

## 图解与心智模型

```text
Static World
Type Annotation / Inference / Diagnostic
            │
            │ 编译 / 擦除
            ↓
Runtime World
真实 JSON / DOM / Network / Storage 值
```

两个世界有关联，但不是同一个阶段。

## 理论收束

### 一句话

> Static Type Checking 根据编译器当前拥有的类型信息分析程序；JavaScript Runtime 则根据真实值执行代码。

### 代码变化 → 理论

| 证据 | 理论 |
|---|---|
| `'2'` 直接传入时报编译错误 | Static Type Checking |
| `JSON.parse()` 后运行时报错 | Runtime Value Boundary |
| `try/catch` 捕获真实异常 | JavaScript Runtime Error |

## Wrong Way 与边界

### Wrong Way 1：认为 TypeScript 会验证所有 JSON

TypeScript 不会自动读取网络响应或 JSON 内容并证明它真的满足某个业务 Type。

### Wrong Way 2：认为运行时会遵守 TS Annotation

JavaScript 运行时不会把 `'2'` 自动变成 `2`。

### 边界

当前源码刻意利用 `JSON.parse()` 的宽松类型让问题通过静态阶段，这是**教学故障开关**，不是推荐生产写法。

## Production Boundary

外部边界的数据应先视为不可信，例如：

- API Response；
- localStorage；
- URL 参数；
- 文件 /消息；
- 第三方 JS。

生产代码通常应该从 `unknown` / Schema Validation / Runtime Guard 建立证据，而不是期待 Annotation 自动保护运行时。TS-KP004 会立即做这个对照。

## 本课只记住 3 件事

1. **`tsc` 分析静态类型信息。**
2. **Runtime 执行真实值。**
3. **静态通过不代表外部数据已经完成运行时验证。**

## Challenge

把：

```ts
const runtimeValue = JSON.parse('"2"');
```

临时改成：

```ts
const runtimeValue: unknown = JSON.parse('"2"');
```

再直接传给 `formatCount()`。

先预测 `tsc` 会不会允许，再运行类型检查。思考：为什么把不可信边界声明成 `unknown` 后，编译器反而更能迫使你处理风险？

## Mastery Check

### Must

- 能区分 Compile-time Error 和 Runtime Error。
- 能解释本案例为什么静态检查通过后仍然发生异常。

### Should

- 知道外部数据边界不能靠 Annotation 自动验证。
- 能说明 `JSON.parse()` 在本实验中只是制造边界问题的辅助工具。

### Expert

- 能把“静态证据是否充分”作为 API / 数据边界设计问题，而不是把所有运行时故障归咎于 TypeScript 不安全。

## 最终源码与代码边界

- **本节核心代码**：`count: number` 契约与 Static / Runtime 两阶段对照。
- **实验辅助代码**：`JSON.parse()`、`try/catch` 用于受控制造并观察 Runtime Error。
- **最终源码**：[`src/main.ts`](./src/main.ts)
