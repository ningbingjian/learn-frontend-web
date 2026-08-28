# TS-KP042：Readonly Tuple

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `readonly [A, B]` 声明只读 Tuple。
2. 理解只读 Tuple 不能通过当前引用重新赋值固定位置或调用可变数组方法。
3. 知道可变 Tuple 可以安全赋给只读 Tuple 引用，而反方向通常不允许。
4. 理解 Readonly Tuple 是静态约束，不等价于 JavaScript 运行时冻结。
5. 知道 Tuple 的 `readonly` 默认也是浅层约束，不自动让嵌套对象属性只读。
6. 为后续 `as const` 和更复杂的只读类型建立基础。

> **本节核心代码**：`readonly [number, number]` 和“可变 Tuple → 只读视图”的赋值关系。
>
> **实验辅助代码**：嵌套对象修改、`Array.isArray()` 与日志输出用于证明只读 Tuple 的静态和浅层边界。

## 理论讲解

### 1. 普通 Tuple 默认允许修改位置

例如：

```ts
const point: [number, number] = [10, 20];
point[0] = 30;
```

这是合法的，因为普通 Tuple 仍然属于可变数组结构。

### 2. 给 Tuple 加上 `readonly`

可以写：

```ts
type Coordinate = readonly [number, number];
```

此时：

```ts
const point: Coordinate = [10, 20];
```

读取没问题：

```ts
point[0];
point[1];
```

但重新赋值会失败：

```ts
// point[0] = 30;
```

### 3. Readonly Tuple 也没有可变数组方法

例如：

```ts
// point.push(30);
```

会被 TypeScript 阻止。

这和前面的 `ReadonlyArray<T>` 很相似，只不过 Tuple 仍然保留固定位置类型。

### 4. 可变 Tuple 可以赋给只读 Tuple

例如：

```ts
const mutable: [number, number] = [10, 20];
const readonlyPoint: readonly [number, number] = mutable;
```

这个方向是合理的：

```text
原值允许修改
↓
当前引用只承诺读取
```

只读引用不会要求原始对象本身在所有地方都被冻结。

### 5. 只读 Tuple 不能随意变回可变 Tuple

反方向通常不允许：

```ts
const source: readonly [number, number] = [10, 20];
// const mutable: [number, number] = source;
```

原因是如果允许：

```text
readonly 引用
↓
变成 mutable 引用
↓
就可能绕过只读承诺进行修改
```

### 6. `readonly` 不等于 `Object.freeze()`

TypeScript 的 `readonly` 主要发生在静态检查阶段。

它不会自动生成：

```js
Object.freeze(...)
```

所以运行时并没有新增一个“ReadonlyTuple”对象。

### 7. Readonly Tuple 仍然是浅只读

例如：

```ts
type Snapshot = readonly [
  { name: string },
  number
];
```

Tuple 的第 0 位不能换成另一个对象：

```ts
// snapshot[0] = { name: 'Mouse' };
```

但第 0 位对象自身的属性如果没有 `readonly`，仍然可以修改：

```ts
snapshot[0].name = 'Mechanical Keyboard';
```

所以：

```text
readonly tuple
≠
deep readonly
```

### 8. Tuple 在运行时仍然是 Array

即使类型是：

```ts
readonly [number, number]
```

运行时：

```ts
Array.isArray(value)
```

仍然得到 `true`。

类型修饰符不会创造新的 JavaScript 数据结构。

### 9. `as const` 会和 Readonly Tuple 发生联系

后面学习 `as const` 时，会看到数组字面量可以推断为更精确的 readonly tuple。

本节暂时只建立：

```text
readonly tuple
→ 固定位置 + 静态不可写
```

不要提前把 `as const` 的推断规则全部混进来。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp042-readonly-tuple/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明坐标 Tuple

在 `src/main.ts` 写：

```ts
type Coordinate = readonly [number, number];
```

### 第 2 步：先创建一个可变 Tuple

```ts
const mutableCoordinate: [number, number] = [120.5, 30.2];
```

### 第 3 步：创建只读视图

```ts
const coordinate: Coordinate = mutableCoordinate;
```

这个赋值合法，因为只读引用只减少修改能力。

### 第 4 步：创建只读参数函数

```ts
function formatCoordinate(value: Coordinate): string {
  return `${value[0].toFixed(1)},${value[1].toFixed(1)}`;
}
```

函数只需要读取坐标，所以参数使用只读 Tuple 更清楚。

### 第 5 步：临时尝试修改位置

尝试：

```ts
// coordinate[0] = 0;
```

类型检查应该失败。

### 第 6 步：加入嵌套对象，观察浅只读

继续写：

```ts
type Snapshot = readonly [{ name: string }, number];

const snapshot: Snapshot = [
  { name: 'Keyboard' },
  1
];

snapshot[0].name = 'Mechanical Keyboard';
```

这行能够通过，因为对象内部 `name` 属性本身不是 readonly。

### 第 7 步：输出运行时结果

```ts
console.log(formatCoordinate(coordinate));
console.log(snapshot[0].name);
console.log(Array.isArray(coordinate));
```

预期：

```text
120.5,30.2
Mechanical Keyboard
true
```

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`readonly [number, number]`、可变 Tuple 到只读 Tuple 的赋值方向。
- **实验辅助代码**：嵌套对象修改和 `Array.isArray()` 用于观察浅只读与运行时边界。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp042-readonly-tuple/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp042-readonly-tuple/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp042-readonly-tuple/dist/main.js
```

预期：

```text
120.5,30.2
Mechanical Keyboard
true
```

## 效果验证

你应该能够确认：

- `readonly [A, B]` 仍保留 Tuple 的位置类型信息。
- 只读 Tuple 不能通过当前引用重新赋值位置。
- 可变 Tuple 可以被当成只读 Tuple 使用。
- readonly Tuple 不能安全地直接赋回可变 Tuple。
- `readonly` 是静态约束，不会自动执行 `Object.freeze()`。
- 嵌套对象属性不会因为 Tuple readonly 自动变成深度只读。
