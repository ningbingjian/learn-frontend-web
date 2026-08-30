# TS-KP084：Numeric / Boolean Literal Types

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用具体数字声明 Numeric Literal Type。
2. 使用 `true` / `false` 声明 Boolean Literal Type。
3. 理解 `200` 比 `number` 更具体。
4. 理解 `true` 比 `boolean` 更具体。
5. 使用 Numeric / Boolean Literal Type 表达固定协议值或不变量。
6. 理解这些类型不会改变 JavaScript 运行时 primitive。
7. 知道 Literal Union 会在下一节把多个精确值组合成有限集合。

> **本节核心代码**：`SuccessStatus = 200`、`FeatureEnabled = true`、`RetryLimit = 3`。
>
> **实验辅助代码**：`summarize()` 与日志用于观察精确类型对应的运行时值。

## 理论讲解

### 1. Numeric Literal Type

普通：

```ts
number
```

允许大量数字。

而：

```ts
type SuccessStatus = 200;
```

只允许：

```text
200
```

因此：

```text
200 是 number 的更具体类型
```

### 2. Numeric Literal 很适合固定协议值

例如 HTTP 成功状态：

```ts
type SuccessStatus = 200;
```

或固定重试次数：

```ts
type RetryLimit = 3;
```

它们可以表达：

```text
这里不是任意 number
这里必须是这个精确 number
```

### 3. Boolean Literal Type

普通：

```ts
boolean
```

允许：

```text
true
false
```

而：

```ts
type FeatureEnabled = true;
```

只允许：

```text
true
```

同理：

```ts
type FeatureDisabled = false;
```

只允许 `false`。

### 4. Boolean Literal 的集合非常小

`boolean` 本身就只有两个字面量成员：

```text
true
false
```

所以 Boolean Literal Type 在状态建模中非常直观。

不过，如果某个字段本身就是普通开关，直接使用 `boolean` 往往已经足够。

只有当业务契约明确要求“必须为 true”或“必须为 false”时，Boolean Literal 才更有意义。

### 5. Literal Type 不是运行时常量保护

```ts
const status: SuccessStatus = 200;
```

TypeScript 会静态限制赋值。

但类型系统本身不会验证来自网络的未知 JSON：

```text
{ status: 500 }
```

是否真的是 200。

外部输入仍需要运行时校验。

### 6. Numeric Literal 与 `const` 推断

例如：

```ts
const retryLimit = 3;
```

因为变量不能重新绑定，TypeScript 可以保留非常具体的字面量信息。

而：

```ts
let retryLimit = 3;
```

通常需要允许以后变成其它 number，因此会倾向更宽的 `number`。

### 7. `true` 不是数字 1

JavaScript 某些历史语境里会发生真值转换，但 TypeScript 类型系统中：

```text
true
```

和：

```text
1
```

是不同的字面量类型。

不要把 Boolean Literal 和 Numeric Literal 混在一起。

### 8. 下一节会组合多个 Literal

例如：

```ts
200 | 201 | 204
```

或者：

```ts
'draft' | 'published'
```

属于 Literal Union。

本节只解决：

```text
单个精确 number / boolean
如何成为类型
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp084-numeric-boolean-literal-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明 Numeric Literal Type

```ts
type SuccessStatus = 200;
```

### 第 2 步：声明 Boolean Literal Type

```ts
type FeatureEnabled = true;
```

### 第 3 步：再声明一个固定数字约束

```ts
type RetryLimit = 3;
```

### 第 4 步：在函数参数里使用

```ts
function summarize(status: SuccessStatus, enabled: FeatureEnabled): string {
  return `${status}:${enabled ? 'enabled' : 'disabled'}`;
}
```

这里只允许：

```text
status = 200
enabled = true
```

### 第 5 步：创建固定重试次数

```ts
const retryLimit: RetryLimit = 3;
```

### 第 6 步：运行

```ts
console.log(summarize(200, true));
console.log(`retry=${retryLimit}`);
```

预期：

```text
200:enabled
retry=3
```

### 第 7 步：临时制造错误

```ts
// summarize(201, true);
// summarize(200, false);
// const wrongRetry: RetryLimit = 5;
```

这些都应该被类型系统拒绝。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：三个精确字面量类型。
- **实验辅助代码**：`summarize()` 和日志。

## 运行案例

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp084-numeric-boolean-literal-types/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp084-numeric-boolean-literal-types/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp084-numeric-boolean-literal-types/dist/main.js
```

预期：

```text
200:enabled
retry=3
```

## 效果验证

你应该能解释：

1. `200` 与 `number` 的区别。
2. `true` 与 `boolean` 的区别。
3. 哪些场景适合 Numeric / Boolean Literal Type。
4. 为什么 Literal Type 不能替代运行时 JSON 校验。
5. 为什么下一节 Literal Union 是“多个精确值的组合”，而不是本节的重复。
