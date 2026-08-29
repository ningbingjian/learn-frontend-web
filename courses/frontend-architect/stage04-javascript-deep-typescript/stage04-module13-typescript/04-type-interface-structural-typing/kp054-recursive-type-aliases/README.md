# TS-KP054：递归类型别名

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解递归类型是“类型结构中再次引用自己”。
2. 使用递归类型描述树、菜单、评论、文件夹等层级结构。
3. 区分合法的结构递归与无意义的直接循环别名。
4. 区分“类型递归”和“运行时递归函数”。
5. 理解递归类型不会自动保证运行时对象没有循环引用。
6. 能为递归数据编写类型安全的遍历函数。

> **本节核心代码**：`Category` 的 `children: Category[]` 自引用。
>
> **实验辅助代码**：`countCategories()` 与 `flattenNames()` 是运行时递归函数，用于真实消费递归结构。

## 理论讲解

### 1. 什么数据天然是递归结构

典型例子：

```text
分类
└── 子分类
    └── 子分类
```

以及：

- 树节点。
- 菜单。
- 评论回复。
- 文件夹。
- AST。

共同特点是：

> 子节点和父节点拥有同一种结构。

### 2. 类型别名可以在成员中引用自己

```ts
type Category = {
  name: string;
  children: Category[];
};
```

这里：

```text
Category
  ↓
children
  ↓
Category[]
  ↓
每个子元素仍然是 Category
```

这就是递归类型。

### 3. 递归并不代表必须无限有子节点

叶子节点可以是：

```ts
{
  name: 'typescript',
  children: []
}
```

空数组提供了实际数据结构的终止点。

类型描述的是：

```text
如果存在子节点
它们仍然必须满足 Category
```

并不是要求每个节点无限继续。

### 4. 直接循环别名没有有效结构

不要写：

```ts
// type Loop = Loop;
```

这种声明没有通过属性、数组或其它结构提供任何有效信息，TypeScript 会把它视为循环引用错误。

有意义的递归通常通过结构发生：

```ts
type Node = {
  children: Node[];
};
```

### 5. 类型递归与函数递归是两件事

类型：

```ts
type Category = {
  name: string;
  children: Category[];
};
```

只在编译期描述结构。

运行时遍历仍然要写真正的 JavaScript 函数：

```ts
function countCategories(category: Category): number {
  // runtime recursion
}
```

因此：

```text
递归类型
→ 静态数据形状

递归函数
→ 运行时执行流程
```

### 6. 类型系统不会阻止运行时循环引用

JavaScript 可以构造：

```text
A.children 包含 B
B.children 又包含 A
```

它们在结构上仍可能满足递归类型。

如果运行时递归函数没有 visited 集合等保护，就可能无限递归。

所以递归类型不是运行时图算法安全保证。

### 7. 递归类型适合表达结构，不等于所有嵌套都要递归

如果业务只有固定三层：

```text
Order → Customer → Address
```

不应该为了“高级”把它设计成自引用。

只有“同类节点可继续包含同类节点”时，递归类型才自然。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp054-recursive-type-aliases/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建递归分类类型

```ts
type Category = {
  name: string;
  children: Category[];
};
```

关键就是：

```ts
children: Category[]
```

### 第 2 步：先创建叶子节点

```ts
const leaf: Category = {
  name: 'typescript',
  children: []
};
```

`children: []` 是合法终止点。

### 第 3 步：把叶子装进父节点

最终案例会构造：

```text
frontend
└── language
    ├── javascript
    └── typescript
```

每一层都使用同一个 `Category`。

### 第 4 步：创建递归计数函数

```ts
function countCategories(category: Category): number {
  return 1 + category.children.reduce(
    (count, child) => count + countCategories(child),
    0
  );
}
```

`child` 会被理解成 `Category`。

### 第 5 步：创建递归扁平化函数

```ts
function flattenNames(category: Category): string[] {
  return [
    category.name,
    ...category.children.flatMap(flattenNames)
  ];
}
```

它返回整个树的名称列表。

### 第 6 步：创建完整树

```ts
const root: Category = {
  name: 'frontend',
  children: [
    {
      name: 'language',
      children: [
        { name: 'javascript', children: [] },
        { name: 'typescript', children: [] }
      ]
    }
  ]
};
```

### 第 7 步：运行验证

```ts
console.log(countCategories(root));
console.log(flattenNames(root).join(' > '));
```

预期：

```text
4
frontend > language > javascript > typescript
```

### 第 8 步：临时制造深层结构错误

例如：

```ts
// { name: 'typescript', children: 'none' }
```

应该失败，因为任何层级的 `children` 都必须是 `Category[]`。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`children: Category[]`。
- **实验辅助代码**：两个运行时递归遍历函数。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp054-recursive-type-aliases/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp054-recursive-type-aliases/tsconfig.json
node ./04-type-interface-structural-typing/kp054-recursive-type-aliases/dist/main.js
```

预期：

```text
4
frontend > language > javascript > typescript
```

## 效果验证

你应该能够确认：

- 类型别名可以通过成员安全地引用自己。
- `children: Category[]` 能约束任意深度的子节点。
- 叶子节点可以用空数组结束结构。
- 递归类型和递归函数属于编译期与运行时两个不同层面。
- 递归类型不会自动处理运行时循环引用问题。
