# TS-KP105：`satisfies` 与类型注解的差异

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 `const x: T = ...` 与 `const x = ... satisfies T`。
2. 理解显式类型注解会让变量从声明处按目标类型被观察。
3. 理解 `satisfies` 更偏向“校验兼容性，同时保留表达式自己的推断”。
4. 理解为什么配置对象中 `satisfies` 经常比直接注解获得更好的调用体验。
5. 知道并不是所有场景都应该用 `satisfies` 替代注解。
6. 能根据 API 边界、变量用途和推断需求选择写法。

> **本节核心代码**：并排对比 `annotated: ThemeConfig` 与 `checked satisfies ThemeConfig`。
>
> **实验辅助代码**：`requireDark()` 用来暴露两种写法在调用侧的静态类型差异。

## 理论讲解

### 1. 类型注解做了什么

```ts
const config: ThemeConfig = {
  mode: 'dark',
  spacing: 8
};
```

这里变量 `config` 的类型直接是：

```text
ThemeConfig
```

所以 `config.mode` 的静态类型是：

```text
'light' | 'dark'
```

即使当前值恰好写的是 `'dark'`。

### 2. `satisfies` 做了什么

```ts
const config = {
  mode: 'dark',
  spacing: 8
} satisfies ThemeConfig;
```

它先验证整个表达式能否满足 `ThemeConfig`，但不会简单把变量类型替换成 `ThemeConfig`。

因此在适当上下文下，表达式仍可以保留更具体的信息。

### 3. 为什么这个差异重要

本节定义：

```ts
function requireDark(mode: 'dark') {
  // ...
}
```

对于显式注解变量：

```ts
annotated.mode
```

静态类型是：

```text
'light' | 'dark'
```

不能直接传给只接受 `'dark'` 的函数。

而 `checked.mode` 保留了：

```text
'dark'
```

所以可以直接调用。

### 4. 类型注解并没有“错”

如果你就是希望：

```text
变量从声明开始就服从公共接口视图
```

那么注解非常合适。

例如：

- 公共变量。
- API 边界。
- 明确希望隐藏实现细节的位置。
- 不希望暴露更窄字面量的场景。

### 5. `satisfies` 常见于配置与常量表

因为这些场景经常希望：

```text
完整校验结构
+
保留 key 和具体值推断
```

所以 `satisfies` 往往能兼顾安全和开发体验。

## 动手编码：从 0 到 1

### 第 1 步：定义公共契约

```ts
type ThemeConfig = {
  mode: 'light' | 'dark';
  spacing: number;
};
```

### 第 2 步：使用类型注解

```ts
const annotated: ThemeConfig = {
  mode: 'dark',
  spacing: 8
};
```

### 第 3 步：使用 `satisfies`

```ts
const checked = {
  mode: 'dark',
  spacing: 8
} satisfies ThemeConfig;
```

### 第 4 步：定义一个只接受 `'dark'` 的函数

```ts
function requireDark(mode: 'dark'): string {
  return `mode=${mode}`;
}
```

### 第 5 步：观察调用差异

```ts
console.log(annotated.mode);
console.log(requireDark(checked.mode));
```

如果尝试：

```ts
// requireDark(annotated.mode);
```

会发现 `annotated.mode` 仍然是更宽的 union。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`annotated: ThemeConfig` 与 `checked satisfies ThemeConfig`。

**实验辅助代码**：`requireDark()` 和日志用于让静态差异变得可观察。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp105-satisfies-vs-annotation/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp105-satisfies-vs-annotation/tsconfig.json
node ./07-type-assertions-const-satisfies/kp105-satisfies-vs-annotation/dist/main.js
```

预期：

```text
dark
mode=dark
```

## 效果验证

1. 类型注解会如何影响变量的静态视图？
2. `satisfies` 为什么可以保留更具体的信息？
3. 为什么 `annotated.mode` 不能直接传给 `'dark'` 参数？
4. 为什么 `checked.mode` 可以？
5. 哪些场景更适合显式类型注解？
6. 哪些配置场景更适合 `satisfies`？
