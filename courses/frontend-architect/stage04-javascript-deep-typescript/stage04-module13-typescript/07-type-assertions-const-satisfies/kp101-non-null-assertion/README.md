# TS-KP101：Non-null Assertion `!`

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解表达式后缀 `!` 的 Non-null Assertion 含义。
2. 理解它如何从静态类型中移除 `null | undefined`。
3. 明确它不会增加任何运行时存在性检查。
4. 能识别 `Array.find()`、DOM 查询、依赖注入等场景中常见的 `!`。
5. 理解何时可以合理使用 `!`，何时应该优先 Narrowing、默认值、可选链或 Assertion Function。
6. 理解 `!` 与逻辑非 `!value`、Boolean 强转 `!!value` 的区别。

> **本节核心代码**：`users.find(...)!`。
>
> **实验辅助代码**：固定用户数组确保最终运行案例存在 id=1；这只是为了展示语法，不意味着真实业务查询永远安全。

## 理论讲解

### 1. `find()` 为什么会返回 `T | undefined`

例如：

```ts
const user = users.find((item) => item.id === 1);
```

即使你“相信”数据里一定有 id=1，类型系统仍然必须考虑：

```text
可能找不到
```

所以结果通常是：

```text
User | undefined
```

### 2. Non-null Assertion 的语法

在表达式后写：

```ts
value!
```

意思是：

```text
“我断言这里不是 null，也不是 undefined。”
```

例如：

```ts
const user = users.find((item) => item.id === 1)!;
```

之后静态类型就是：

```text
User
```

### 3. `!` 不会生成 runtime check

最终 JavaScript 不会多出：

```js
if (user == null) throw ...
```

它只是被编译器擦除。

因此如果查询真的失败：

```ts
const user = users.find(... )!;
console.log(user.name);
```

运行时依然可能得到：

```text
Cannot read properties of undefined
```

### 4. `!` 和 Assertion Function 的差异

Non-null Assertion：

```ts
const user = result!;
```

只告诉编译器“相信我”。

Assertion Function：

```ts
assertUser(result);
```

如果实现正确，可以真正：

- 在运行时检查。
- 失败时抛错。
- 正常返回后完成静态收窄。

所以面对外部不确定性，Assertion Function 往往更可靠。

### 5. 更安全的替代方案

#### Narrowing

```ts
if (!user) {
  return;
}

console.log(user.name);
```

#### 默认值

```ts
const name = user?.name ?? 'Unknown';
```

#### 可选链

```ts
console.log(user?.name);
```

#### 明确抛错

```ts
if (!user) {
  throw new Error('user not found');
}
```

这些方式都比“无证据的 `!`”提供更多运行时安全性。

### 6. 什么场景可能合理使用 `!`

例如：

- 测试夹具明确构造了目标数据。
- 初始化顺序由框架契约严格保证。
- 前面已经有运行时检查，但类型信息跨边界丢失。
- DOM 节点由同一模块模板静态保证存在。

即便如此，也应该让这个不变量容易被读者看懂。

### 7. 三种 `!` 不要混淆

逻辑非：

```ts
!enabled
```

两次逻辑非：

```ts
!!value
```

Non-null Assertion：

```ts
value!
```

它们语法相似，但用途完全不同。

### 8. `strictNullChecks` 是理解本节的基础

在严格空值检查下：

```text
User
```

和：

```text
User | undefined
```

不是同一个类型。

Non-null Assertion 的本质就是：

```text
从当前静态类型里去掉 null 和 undefined
```

## 动手编码：从 0 到 1

### 第 1 步：定义 User

创建：

```text
kp101-non-null-assertion/src/main.ts
```

写：

```ts
type User = {
  id: number;
  name: string;
};
```

### 第 2 步：准备用户数组

```ts
const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Linus' }
];
```

### 第 3 步：先理解 find 的返回类型

如果写：

```ts
const user = users.find((item) => item.id === 1);
```

那么：

```text
user: User | undefined
```

### 第 4 步：加入 Non-null Assertion

```ts
const user = users.find((item) => item.id === 1)!;
```

现在当前案例中静态类型为 `User`。

### 第 5 步：直接访问成员

```ts
console.log(user.name.toUpperCase());
console.log(user.id);
```

预期：

```text
ADA
1
```

### 第 6 步：添加 tsconfig

使用模块统一 strict 配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`find(...)!` 以及 `!` 移除 `undefined` 的静态效果。

**实验辅助代码**：固定数组中确实存在 id=1，仅用于保证教学案例可运行；真实查询条件不能因此默认安全。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp101-non-null-assertion/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp101-non-null-assertion/tsconfig.json
node ./07-type-assertions-const-satisfies/kp101-non-null-assertion/dist/main.js
```

预期：

```text
ADA
1
```

## 效果验证

完成本节后，应该能回答：

1. 为什么 `find()` 返回 `T | undefined`？
2. `value!` 会如何改变静态类型？
3. Non-null Assertion 会生成运行时空值检查吗？
4. 如果你的断言错了，会发生什么？
5. 哪些方案通常比 `!` 更安全？
6. `value!`、`!value` 和 `!!value` 分别是什么？
7. Code Review 中看到大量 `!` 为什么应该警惕？
