# TS-KP008：编译期错误与运行时错误的区别

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 TypeScript 类型诊断与 JavaScript 运行时异常。
2. 理解有些问题既不会产生类型错误，也不会抛异常，但业务结果仍然错误。
3. 知道 TypeScript 可以减少一部分运行前问题，但不能消灭所有运行时错误。
4. 知道是否允许“有类型错误仍生成 JavaScript”取决于编译配置，本课程当前使用 `noEmitOnError`。
5. 能把真实问题分类为：编译期类型问题、运行时异常、业务逻辑异常。

> **本节核心知识**：不要把“TypeScript 报错”“JavaScript 抛异常”“业务结果不合理”混成同一种错误。
>
> **实验辅助代码**：平均值计算和故意损坏的 JSON 用来制造三种不同故障类型。

## 理论讲解

### 1. 编译期类型错误发生在程序执行之前

例如：

```ts
function average(total: number, count: number): number {
  return total / count;
}

average('100', 4);
```

TypeScript 能从源码直接看到：

```text
参数要求 number
实际给了 string
```

所以可以在真正执行前给出诊断。

### 2. 运行时错误依赖真实执行过程

例如：

```ts
JSON.parse('{"name": }');
```

从静态类型上看，`JSON.parse()` 接受一个 `string`，传入值确实也是 `string`。

但是字符串内容不是合法 JSON。

只有运行解析器时才会抛出异常。

这属于：

```text
类型上合法
      ↓
运行时处理真实内容
      ↓
抛出 SyntaxError
```

### 3. 还有第三类：没有类型错误，也没有异常，但结果业务不合理

例如：

```ts
average(100, 0);
```

两个参数都是 `number`，TypeScript 不会报错。

JavaScript 执行除以零时通常得到：

```text
Infinity
```

它也没有抛异常。

但你的业务可能规定：

```text
count 必须 > 0
```

所以：

```text
类型正确
+ 程序没崩
≠
业务一定正确
```

### 4. 三类问题应该用不同手段解决

可以建立一个基本分类：

```text
编译期类型错误
→ TypeScript 类型系统

运行时异常
→ try/catch、校验、错误边界、容错逻辑

业务逻辑异常
→ 业务规则、测试、领域约束
```

### 5. 类型错误和“是否生成 JS”不是同一个概念

TypeScript 可以报告诊断；是否仍然产生 JavaScript 由配置决定。

本课程当前基础配置使用：

```json
"noEmitOnError": true
```

所以有类型错误时不会生成新的编译产物。

具体 Emit 行为会在 TS-KP012、TS-KP013 深入学习。

---

## 动手编码：从 0 到 1

### 第 0 步：准备一个类型明确的函数

创建 `src/main.ts`：

```ts
function average(total: number, count: number): number {
  return total / count;
}
```

### 第 1 步：加入正常调用

写：

```ts
console.log('正常平均值:', average(100, 4));
```

预期：

```text
正常平均值: 25
```

### 第 2 步：制造编译期类型错误

临时加入：

```ts
average('100', 4);
```

执行类型检查，应该在程序运行之前看到参数类型错误。

观察后删除这行。

### 第 3 步：制造“类型正确但业务异常”的结果

加入：

```ts
console.log('除以零:', average(100, 0));
```

这行可以通过类型检查。

运行后得到：

```text
除以零: Infinity
```

这里既没有 TypeScript 报错，也没有 JavaScript 异常，但业务可能不接受。

### 第 4 步：制造真正的运行时异常

继续写：

```ts
const brokenJson = '{"name": }';
```

类型上它只是一个正常 `string`。

然后：

```ts
JSON.parse(brokenJson);
```

只有运行时才知道字符串内容无法解析。

### 第 5 步：捕获运行时异常

为了让案例继续执行，把它放进：

```ts
try {
  JSON.parse(brokenJson);
} catch (error) {
  if (error instanceof Error) {
    console.log('运行时异常:', error.name);
  }
}
```

### 第 6 步：把三类问题放到同一张图里

现在你已经亲手制造：

```text
average('100', 4)
→ 编译期类型错误

average(100, 0)
→ 类型正确，运行不崩，但业务可疑

JSON.parse(brokenJson)
→ 类型正确，运行时抛异常
```

### 第 7 步：完成案例并对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节总结：

- **核心代码**：三组对照共同说明“类型诊断、运行时异常、业务错误”属于不同层次。
- **实验辅助代码**：损坏 JSON 和日志输出只用于制造可观察的错误场景。

## 运行案例

类型检查：

```bash
npm run check -- ./01-typescript-foundations/kp008-compile-time-vs-runtime-errors/tsconfig.json
```

编译：

```bash
npm run build -- ./01-typescript-foundations/kp008-compile-time-vs-runtime-errors/tsconfig.json
```

运行：

```bash
node ./01-typescript-foundations/kp008-compile-time-vs-runtime-errors/dist/main.js
```

## 效果验证

最终应能确认：

1. 临时加入 `average('100', 4)` 会在类型检查阶段失败。
2. `average(100, 0)` 能通过类型检查，运行得到 `Infinity`。
3. 损坏 JSON 在类型检查阶段没有问题，但运行解析时抛出异常。
4. 能解释为什么“没有类型错误”和“程序不会出错”不是同一个结论。
5. 能为三类问题分别选择 TypeScript、运行时错误处理和业务规则/测试。

配套练习见 [`exercise/README.md`](./exercise/README.md)。
