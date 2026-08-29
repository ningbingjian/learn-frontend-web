# TS-KP050：对象字面量的新鲜度直觉

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“fresh object literal”直觉解释直接对象字面量为什么会得到更严格的额外属性检查。
2. 理解“新鲜度”不是 TypeScript 语法，也不是 JavaScript 运行时状态。
3. 解释对象字面量先保存到变量后，再参与结构化赋值时为什么行为可能不同。
4. 区分“额外属性仍然真实存在”与“目标类型是否暴露该属性”。
5. 知道通过变量传递并不会关闭 TypeScript 的结构检查。
6. 避免把这条规则错误概括成“只要先赋值给变量就能绕过所有类型检查”。

> **本节核心代码**：`candidate` 同时拥有 `name` 与 `role`，随后作为只要求 `{ name: string }` 的值传入函数。
>
> **实验辅助代码**：`console.log(candidate.role)` 用来证明额外属性在运行时和变量自身类型上仍然存在。

## 理论讲解

### 1. 先复习上一节现象

直接写：

```ts
printCard({
  name: 'Ada',
  role: 'admin'
});
```

如果 `printCard()` 参数只要求：

```ts
{
  name: string;
}
```

那么直接对象字面量里的 `role` 可能触发 Excess Property Checking。

但：

```ts
const candidate = {
  name: 'Ada',
  role: 'admin'
};

printCard(candidate);
```

却可以通过。

### 2. “fresh object literal”是一种非常有用的理解方式

TypeScript 历史文档和编译器讨论中常使用“fresh object literal”来解释这种特殊检查。

可以建立直觉：

```text
刚刚直接写出来的对象字面量
          ↓
目标类型就在旁边
          ↓
编译器有机会检查：
是否出现了可疑的未知属性？
```

这就是所谓“新鲜对象字面量”直觉。

### 3. 它不是一种新的 TypeScript 语法

代码里没有：

```ts
fresh { ... }
```

也没有：

```ts
object.isFresh
```

所以“freshness”不是你能在运行时读取的标记。

它是理解编译器在某些对象字面量上下文中采用更严格检查的一种模型。

### 4. 直接赋给目标类型同样会触发

不只是函数参数。

例如：

```ts
const card: UserCard = {
  name: 'Ada',
  role: 'admin'
};
```

如果 `UserCard` 没有 `role`，这里也会执行额外属性检查。

因为对象字面量正在直接面对目标类型 `UserCard`。

### 5. 先推断变量，再赋给目标类型

现在改成：

```ts
const candidate = {
  name: 'Ada',
  role: 'admin'
};
```

TypeScript 先推断：

```text
candidate
→ {
    name: string;
    role: string;
  }
```

随后：

```ts
const card: UserCard = candidate;
```

此时主要走普通结构化兼容：

```text
candidate 有没有 UserCard 需要的 name: string？
→ 有
→ 可以赋值
```

额外的 `role` 不会让结构兼容失败。

### 6. 额外属性没有消失

非常重要：

```ts
printCard(candidate);
```

通过以后，`candidate.role` 仍然存在。

运行时也仍然存在。

只是在 `printCard()` 内部，参数静态类型是：

```ts
UserCard
```

所以函数内部只被承诺可以安全依赖 `UserCard` 中声明的成员。

### 7. 目标类型不会“删除”对象属性

TypeScript 类型标注不会执行：

```js
delete candidate.role;
```

编译后对象仍然是原来的 JavaScript 对象。

这再次体现 TypeScript 是擦除型静态类型系统。

### 8. 不能把规则记成“先放变量就能绕过一切”

错误理解：

```text
对象字面量报错
↓
永远先放变量
↓
所有错误都消失
```

这是危险的。

如果基本结构就不兼容：

```ts
const candidate = {
  role: 'admin'
};
```

目标需要：

```ts
{ name: string }
```

仍然不能通过。

类型系统照样检查必需成员和成员类型。

### 9. 这条规则的真正价值

它在两种目标之间取得平衡：

```text
直接配置对象
→ 更严格，帮助抓拼写错误

已有复杂对象
→ 保持结构化兼容，允许拥有更多成员
```

因此 TypeScript 不需要把所有对象都变成“精确类型”，也能对最常见的对象字面量错误提供保护。

### 10. 为什么单独把 freshness 作为一节

因为如果只背：

```text
对象字面量多属性会报错
变量不会
```

很容易形成机械记忆。

理解“直接字面量处于目标类型上下文中，编译器执行额外检查”的直觉后，后续遇到：

- 配置对象。
- Props。
- API 参数。
- `satisfies`。
- 泛型推断。

会更容易理解为什么诊断位置和行为发生变化。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp050-object-literal-freshness/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明最小目标结构

```ts
type UserCard = {
  name: string;
};
```

### 第 2 步：创建只依赖目标结构的函数

```ts
function printCard(card: UserCard): string {
  return card.name.toUpperCase();
}
```

### 第 3 步：临时直接传带额外属性的对象字面量

尝试：

```ts
printCard({
  name: 'Ada',
  role: 'admin'
});
```

应该触发额外属性检查。

验证后删除。

### 第 4 步：先创建普通变量

```ts
const candidate = {
  name: 'Ada',
  role: 'admin'
};
```

TypeScript 会先推断变量自身完整结构。

### 第 5 步：把变量传给函数

```ts
console.log(printCard(candidate));
```

能够通过，因为 `candidate` 拥有 `UserCard` 需要的 `name: string`。

### 第 6 步：证明额外属性还在

```ts
console.log(candidate.role);
```

预期：

```text
admin
```

### 第 7 步：临时尝试缺少必需成员

```ts
const invalidCandidate = {
  role: 'admin'
};

// printCard(invalidCandidate);
```

仍然应该报错。

这证明变量并不会关闭结构检查。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：对象字面量先形成变量类型，再按结构化兼容传给较窄目标类型。
- **实验辅助代码**：输出 `role` 只用于证明属性并未被类型系统删除。

## 运行案例

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp050-object-literal-freshness/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp050-object-literal-freshness/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp050-object-literal-freshness/dist/main.js
```

预期：

```text
ADA
admin
```

## 效果验证

你应该能够确认：

- 直接对象字面量面对目标类型时可能触发更严格的额外属性检查。
- “freshness”是理解编译器行为的直觉，不是运行时状态或语法。
- 变量会先形成自己的完整推断类型，再参与结构兼容。
- 通过较窄目标类型不会删除对象真实存在的额外属性。
- 先放变量不会绕过必需属性、成员类型等普通类型检查。
