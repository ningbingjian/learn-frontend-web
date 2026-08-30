# TS-KP045：可选属性

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `property?: Type` 声明对象可选属性。
2. 理解“属性可以缺失”和“读取时可能得到 `undefined`”之间的关系。
3. 使用条件判断、可选链 `?.` 和空值处理安全消费可选属性。
4. 区分 `nickname?: string` 与 `nickname: string | undefined` 的结构含义。
5. 理解 `exactOptionalPropertyTypes` 会进一步区分“属性缺失”和“属性显式为 undefined”。
6. 知道可选属性是对象结构协议的一部分，不是绕过数据建模的手段。

> **本节核心代码**：`nickname?: string` 及其安全读取。
>
> **实验辅助代码**：`?.trim()`、回退到 `name` 和日志输出用于展示可选值路径。

## 理论讲解

### 1. 默认属性是必需的

下面结构：

```ts
{
  id: number;
  name: string;
}
```

要求两个属性都存在。

如果业务允许某个字段不存在，就可以写：

```ts
{
  id: number;
  name: string;
  nickname?: string;
}
```

`?` 表示：

> `nickname` 这个属性在对象中可以不存在。

### 2. 可选属性读取时需要考虑 `undefined`

假设：

```ts
function printUser(
  user: {
    name: string;
    nickname?: string;
  }
) {
  // ...
}
```

直接读取：

```ts
user.nickname
```

不能无条件把它当作 `string` 使用。

因为运行时可能传入：

```ts
{
  name: 'Ada'
}
```

此时：

```js
user.nickname
```

得到 `undefined`。

因此在当前常见配置下，可以建立：

```text
读取 nickname
    ↓
string | undefined
```

的直觉。

### 3. 可选链适合处理可选属性

例如：

```ts
const normalized = user.nickname?.trim();
```

如果 `nickname` 存在：

```text
执行 trim()
```

如果不存在：

```text
整个表达式得到 undefined
```

这比直接：

```ts
user.nickname.trim()
```

安全。

### 4. 可以提供业务回退值

例如本节最终代码：

```ts
const displayName = user.nickname?.trim() || user.name;
```

业务规则是：

```text
nickname 有非空文本
→ 使用 nickname

否则
→ 使用 name
```

注意这里用了 `||`，所以空字符串也会回退。

如果你只想把 `null` / `undefined` 当作缺失，可以根据语义选择 `??`。

### 5. `?` 和 `T | undefined` 不是完全相同的结构

比较：

```ts
type A = {
  nickname?: string;
};
```

与：

```ts
type B = {
  nickname: string | undefined;
};
```

`A` 允许：

```ts
const a: A = {};
```

因为属性本身可以缺失。

但 `B` 要求属性存在：

```ts
const b: B = {
  nickname: undefined
};
```

不能直接省略 `nickname`。

所以：

```text
?: 
→ 属性是否存在也具有可选性

T | undefined
→ 属性必须存在，但值允许 undefined
```

### 6. `exactOptionalPropertyTypes` 会让规则更精确

当前课程共享配置没有显式开启：

```text
exactOptionalPropertyTypes
```

因此普通配置下：

```ts
nickname?: string
```

通常还允许显式赋：

```ts
nickname: undefined
```

如果项目开启：

```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true
  }
}
```

那么：

```ts
nickname?: string
```

会更严格地表达：

```text
属性不存在
或者
属性存在且值是 string
```

此时若想明确允许存在且值为 `undefined`，需要把 `undefined` 写入类型。

这个开关很重要，因为 JavaScript 运行时：

```js
'nickname' in obj
```

能够区分：

```text
属性不存在
```

与：

```text
属性存在，但值是 undefined
```

### 7. 可选属性不等于“可以随便访问”

下面代码：

```ts
// user.nickname.toUpperCase()
```

会有风险。

正确思路是先建立：

```text
可能缺失
   ↓
判断 / 可选链 / 默认值
   ↓
再使用具体能力
```

### 8. 可选属性适合真实业务“不一定存在”的字段

常见场景：

- 用户昵称。
- HTTP 请求中的可选筛选条件。
- 配置覆盖项。
- 表单可选字段。
- API 某些条件下才返回的扩展字段。

但如果一个字段业务上必须存在，不应该为了“少报错”就随手加 `?`。

类型应该表达真实业务约束。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp045-optional-properties/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建带可选属性的函数参数

```ts
function describeUser(
  user: {
    id: number;
    name: string;
    nickname?: string;
  }
): string {
}
```

现在：

```text
id
name
```

必需，

而：

```text
nickname
```

可以没有。

### 第 2 步：先尝试直接使用

临时尝试：

```ts
user.nickname.toUpperCase();
```

类型检查应该提醒：

```text
nickname 可能是 undefined
```

验证后删除。

### 第 3 步：使用可选链

写：

```ts
const normalizedNickname = user.nickname?.trim();
```

现在即使属性缺失也不会直接调用 `trim()`。

### 第 4 步：建立回退逻辑

最终写：

```ts
const displayName = user.nickname?.trim() || user.name;
```

返回：

```ts
return `${user.id}:${displayName}`;
```

### 第 5 步：传入不带可选属性的对象

```ts
console.log(
  describeUser({
    id: 1,
    name: 'Ada'
  })
);
```

预期：

```text
1:Ada
```

### 第 6 步：传入带 nickname 的对象

```ts
console.log(
  describeUser({
    id: 2,
    name: 'Lin',
    nickname: 'L'
  })
);
```

预期：

```text
2:L
```

### 第 7 步：比较必需 `| undefined`

可以临时观察：

```ts
const value: {
  nickname: string | undefined;
} = {
  nickname: undefined
};
```

此结构的 `nickname` 不能直接省略。

这和：

```ts
nickname?: string
```

表达的对象形状并不相同。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`nickname?: string`。
- **实验辅助代码**：可选链和回退逻辑。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp045-optional-properties/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp045-optional-properties/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp045-optional-properties/dist/main.js
```

预期：

```text
1:Ada
2:L
```

## 效果验证

你应该能够确认：

- `nickname?: string` 允许对象完全不包含 `nickname`。
- 读取可选属性时必须处理它可能不存在的情况。
- `?.` 可以安全访问可选属性能力。
- `property?: T` 和 `property: T | undefined` 的对象结构含义不同。
- `exactOptionalPropertyTypes` 可以进一步严格区分“缺失”和“显式 undefined”。
