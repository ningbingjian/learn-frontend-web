# TS-KP004：类型安全不是运行时数据校验

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么写了 `User` 类型也不能证明网络、JSON、存储中的真实数据符合 `User`。
2. 理解 TypeScript 类型只描述静态模型，不会自动检查运行时字节或对象内容。
3. 亲手验证“一段代码能通过类型检查，但错误 JSON 仍然可以在运行时制造异常”。
4. 知道外部数据应先被当作不可信输入，再做运行时校验。
5. 区分 TypeScript 类型建模和运行时 Schema/Guard 校验的职责。

> **本节核心知识**：`type User` 描述“我们希望数据是什么”，运行时检查负责确认“数据实际上是什么”。
>
> **实验辅助代码**：`unknown`、`typeof`、`in` 等检查语法用于完成最小运行时验证；这些语法后面会在类型收窄章节深入学习。

## 理论讲解

### 1. 类型声明不会修改真实数据

假设我们定义：

```ts
type User = {
  id: number;
  name: string;
};
```

它告诉 TypeScript：程序中的 `User` 应该具有数字 `id` 和字符串 `name`。

但如果外部实际返回：

```json
{
  "id": "not-a-number",
  "name": "Ada"
}
```

TypeScript 不会因为源码里存在 `User`，就在运行时把字符串 `id` 自动变成数字，也不会自动拒绝这段 JSON。

### 2. 为什么这种代码很危险

例如：

```ts
const user: User = JSON.parse(rawJson);
```

它看起来像是在“把 JSON 验证成 User”，但实际上不是。

这里发生的事情只是：

```text
JSON.parse(rawJson)
      ↓
得到运行时 JavaScript 值
      ↓
代码把它交给一个 User 类型的位置
```

如果数据来源本身没有可靠类型信息，静态声明不能替代真实校验。

### 3. 静态类型和运行时校验解决不同问题

```text
TypeScript 类型
回答：按照代码模型，这个值应该是什么？

运行时校验
回答：此刻真正拿到的值到底是什么？
```

两者不是竞争关系，而是互补关系。

### 4. 外部输入应该有“信任边界”

典型外部数据包括：

- HTTP API 响应。
- `JSON.parse()` 的结果。
- localStorage / sessionStorage。
- 表单输入。
- 环境变量。
- WebSocket / SSE 消息。
- 第三方 SDK 回调。

更安全的思路是：

```text
外部数据
   ↓
先视为未知 / 不可信
   ↓
运行时验证
   ↓
确认结构正确
   ↓
再进入业务类型世界
```

后续 Chapter 29 会系统学习 Schema Validation；本节只建立最关键的边界意识。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们会故意准备一份错误 JSON：

```json
{"id":"not-a-number","name":"Ada"}
```

然后分别体验：

1. 只写 TypeScript 类型时发生什么。
2. 增加运行时检查以后发生什么。

### 第 1 步：定义我们希望得到的业务类型

创建 `src/main.ts`：

```ts
type User = {
  id: number;
  name: string;
};
```

这个模型表达：

```text
User.id   → number
User.name → string
```

### 第 2 步：准备一份真实内容错误的 JSON

继续写：

```ts
const rawJson = '{"id":"not-a-number","name":"Ada"}';
```

注意：错误发生在真实数据内容中，`id` 是字符串。

### 第 3 步：只依赖静态类型声明

继续写：

```ts
const unsafeUser: User = JSON.parse(rawJson);
```

执行：

```bash
npm run check -- ./01-typescript-foundations/kp004-types-vs-runtime-validation/tsconfig.json
```

这段代码可以通过类型检查。

这正是本节要观察的重点：

> `: User` 并没有执行一次运行时 JSON 校验。

### 第 4 步：尝试按 number 使用错误的 id

继续加入：

```ts
try {
  console.log(unsafeUser.id.toFixed(0));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`unsafe runtime error: ${message}`);
}
```

编译并运行：

```bash
npm run build -- ./01-typescript-foundations/kp004-types-vs-runtime-validation/tsconfig.json
node ./01-typescript-foundations/kp004-types-vs-runtime-validation/dist/main.js
```

应该看到类似：

```text
unsafe runtime error: unsafeUser.id.toFixed is not a function
```

这证明：

```text
类型检查通过
   ≠
运行时数据已经验证正确
```

### 第 5 步：把外部输入先放在不可信边界

接下来重新解析：

```ts
const candidate: unknown = JSON.parse(rawJson);
```

`unknown` 的深入语义会在 TS-KP025 学习。现在只需要理解：

> 我们暂时不假设这个外部值一定符合 User。

### 第 6 步：加入最小运行时检查

继续写：

```ts
const isValidUser =
  typeof candidate === 'object' &&
  candidate !== null &&
  'id' in candidate &&
  'name' in candidate &&
  typeof candidate.id === 'number' &&
  typeof candidate.name === 'string';
```

这里真正检查的是运行时值本身：

```text
candidate 是对象吗？
id 存在吗？
id 真的是 number 吗？
name 存在吗？
name 真的是 string 吗？
```

### 第 7 步：只有验证成功才进入业务逻辑

继续写：

```ts
if (isValidUser) {
  console.log(`safe user id=${candidate.id.toFixed(0)}, name=${candidate.name}`);
} else {
  console.log('runtime validation rejected invalid user');
}
```

再次编译运行。

这次错误 JSON 不会被当作合法用户继续使用，而是得到：

```text
runtime validation rejected invalid user
```

### 第 8 步：把 JSON 改正确再验证

临时把数据改成：

```ts
const rawJson = '{"id":42,"name":"Ada"}';
```

重新运行，应进入安全分支并看到：

```text
safe user id=42, name=Ada
```

观察后恢复错误 JSON，保留仓库中的“失败样本”。

### 第 9 步：完成案例并对照最终源码

最终代码查看 [`src/main.ts`](./src/main.ts)。

本节总结：

- **核心知识**：`User` 类型负责静态建模；真正来自外部的数据必须经过运行时检查才能建立信任。
- **实验辅助代码**：`unknown`、`typeof`、`in` 和 `try/catch` 用于做最小验证实验，后面会继续系统学习。

最终源码以 [`src/main.ts`](./src/main.ts) 为准，README 不再重复完整文件。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp004-types-vs-runtime-validation/tsconfig.json
npm run build -- ./01-typescript-foundations/kp004-types-vs-runtime-validation/tsconfig.json
node ./01-typescript-foundations/kp004-types-vs-runtime-validation/dist/main.js
```

练习入口：[`exercise/README.md`](./exercise/README.md)。

## 效果验证

你应该能亲手证明：

1. 错误 JSON 可以被赋给 `User` 位置而没有自动发生运行时验证。
2. 按 `number` 使用真实字符串 `id` 时会产生 JavaScript 运行时问题。
3. 把外部值当作未知输入并检查其真实结构后，可以拒绝错误数据。
4. TypeScript 类型建模和运行时校验解决的是两个不同阶段的问题。

最终边界：

```text
外部真实数据
      ↓
运行时验证
      ↓
建立信任
      ↓
TypeScript 业务类型
      ↓
后续静态开发获得类型保护
```
