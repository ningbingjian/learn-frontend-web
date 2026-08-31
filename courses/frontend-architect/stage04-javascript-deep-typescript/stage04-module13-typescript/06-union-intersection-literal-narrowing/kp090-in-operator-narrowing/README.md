# TS-KP090：`in` Operator Narrowing

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 JavaScript `in` 运算符的运行时含义。
2. 使用 `'property' in value` 对对象 Union 进行收窄。
3. 理解 true 分支如何保留拥有该属性的 Union 成员。
4. 理解 false 分支如何排除必定拥有该属性的成员。
5. 理解可选属性为什么可能同时出现在 true / false 两个分支。
6. 区分 `in` Narrowing 与属性值 Truthiness 检查。
7. 理解 `in` 是运行时对象属性存在性检查，不是 TypeScript 专属语法。

> **本节核心代码**：`'email' in contact` 把 `EmailContact | PhoneContact` 收窄成对应对象成员。
>
> **实验辅助代码**：email / phone 两个测试对象和日志输出只用于覆盖两个分支。

## 理论讲解

### 1. JavaScript 的 `in` 运算符先存在

JavaScript 可以写：

```js
'email' in object
```

它检查的是：

```text
对象自身属性
或
原型链上的属性
```

是否存在名为 `email` 的属性。

因此：

```ts
'email' in value
```

首先是一个真实的运行时 JavaScript 判断。

TypeScript 只是进一步利用这个结果做静态收窄。

### 2. `in` 很适合区分“属性集合不同”的对象 Union

例如：

```ts
type EmailContact = {
  email: string;
  verified: boolean;
};

type PhoneContact = {
  phone: string;
  countryCode: string;
};
```

Union：

```ts
type Contact = EmailContact | PhoneContact;
```

在没有更多证据之前：

```ts
contact.email
```

不能直接访问。

因为 `PhoneContact` 没有 `email`。

### 3. `'email' in contact` 会建立属性存在性证据

写：

```ts
if ('email' in contact) {
```

TypeScript 会分析每个 Union 成员：

```text
EmailContact
email 是 required ✅

PhoneContact
没有 email ❌
```

所以 true 分支可以缩小为：

```text
EmailContact
```

于是可以安全访问：

```ts
contact.email
contact.verified
```

### 4. false 分支也会被收窄

如果 `Contact` 只有：

```text
EmailContact | PhoneContact
```

并且 `EmailContact` 必定存在 `email`，那么：

```ts
if ('email' in contact) {
  // EmailContact
}

// 剩余路径：PhoneContact
```

因此 false / remaining branch 可以直接使用：

```ts
contact.phone
contact.countryCode
```

### 5. 可选属性是最重要的边界

假设再有：

```ts
type Human = {
  swim?: () => void;
  fly?: () => void;
};
```

检查：

```ts
if ('swim' in value) {
```

`Human` 并不会只出现在 true 分支。

为什么？

因为：

```text
swim?: ...
```

表示这个属性可能存在，也可能缺失。

所以一个带可选属性的成员可能同时保留在：

```text
true branch
和
false branch
```

这点非常重要。

### 6. `in` 与属性值是否 truthy 不是一回事

例如：

```ts
const config = {
  enabled: false
};
```

此时：

```ts
'enabled' in config
```

是：

```text
true
```

但：

```ts
Boolean(config.enabled)
```

是：

```text
false
```

所以：

```text
in
检查属性是否存在

truthiness
检查属性值转换成 boolean 后是否为 true
```

两者不能混淆。

### 7. `in` 的右侧必须是可执行对象属性检查的值

不要把：

```ts
'email' in value
```

理解成 TypeScript 可以安全地对任意 `null` / primitive 做这种操作。

JavaScript 运行时仍然有自己的要求。

如果输入类型还可能包含：

```text
null
undefined
primitive
```

应该先建立相应 guard，再使用对象属性检查。

### 8. `in` 不会给对象新增属性

执行：

```ts
'email' in contact
```

不会：

- 创建 `email`。
- 修改对象。
- 复制对象。
- 运行 schema 校验。

它只是查询运行时属性存在性。

TypeScript 再基于这个结果更新静态类型视图。

### 9. 什么时候适合 `in`

非常适合这种对象 Union：

```text
A 有 email
B 有 phone
```

或者：

```text
成功结果有 data
错误结果有 error
```

如果已经存在一个稳定、明确的 literal discriminant，例如：

```ts
status: 'success' | 'failed'
```

通常直接使用 discriminated union 会更清晰。

`in` 更适合已有对象结构并没有专门的判别字段，但成员拥有不同属性集合的情况。

## 动手编码：从 0 到 1

### 第 1 步：定义 EmailContact

创建：

```text
kp090-in-operator-narrowing/src/main.ts
```

写：

```ts
type EmailContact = {
  email: string;
  verified: boolean;
};
```

### 第 2 步：定义 PhoneContact

继续：

```ts
type PhoneContact = {
  phone: string;
  countryCode: string;
};
```

### 第 3 步：让函数接收对象 Union

写：

```ts
function formatContact(
  contact: EmailContact | PhoneContact
): string {
  // ...
}
```

此时不能直接假设 contact 有 `email` 或 `phone`。

### 第 4 步：用 `in` 收窄 email 分支

加入：

```ts
if ('email' in contact) {
  const status = contact.verified
    ? 'verified'
    : 'unverified';

  return `email:${contact.email}:${status}`;
}
```

true 分支中 `contact` 已经是 `EmailContact`。

### 第 5 步：处理剩余 PhoneContact

继续：

```ts
return `phone:${contact.countryCode}-${contact.phone}`;
```

由于另一个成员已经被排除，这里 `contact` 是 `PhoneContact`。

### 第 6 步：加入两个测试值

加入：

```ts
console.log(
  formatContact({
    email: 'ada@example.com',
    verified: true
  })
);

console.log(
  formatContact({
    phone: '13800138000',
    countryCode: '+86'
  })
);
```

### 第 7 步：添加 tsconfig

创建：

```text
kp090-in-operator-narrowing/tsconfig.json
```

内容：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`'email' in contact` 以及 true / remaining branch 的对象 Union 收窄。

**实验辅助代码**：两个测试对象用于分别进入 email / phone 分支。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp090-in-operator-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp090-in-operator-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp090-in-operator-narrowing/dist/main.js
```

预期：

```text
email:ada@example.com:verified
phone:+86-13800138000
```

## 效果验证

完成本节后，应该能回答：

1. JavaScript `in` 运算符实际检查的是什么？
2. 为什么 `'email' in contact` 能收窄对象 Union？
3. false 分支为什么能变成另一个对象成员？
4. 可选属性为什么可能同时出现在 true / false 两边？
5. `'enabled' in config` 和 `if (config.enabled)` 有什么区别？
6. 为什么 `in` 不是运行时 schema 校验？
7. 已有 discriminant 时，为什么通常优先判别联合而不是人为改用 `in`？
