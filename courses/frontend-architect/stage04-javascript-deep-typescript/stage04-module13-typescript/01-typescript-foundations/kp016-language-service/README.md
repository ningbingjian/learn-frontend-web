# TS-KP016：编辑器语言服务与语言服务体系概念

> [返回 Chapter 01](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 `tsc` 编译器与编辑器语言服务的职责。
2. 知道 Hover、补全、跳转、引用查找、重命名、快速修复等能力来自语言服务体系。
3. 理解传统 TypeScript 5.x/6.x 工具链中的 `tsserver` 基本角色。
4. 知道 TypeScript 7 的原生工具链转向 Language Server Protocol（LSP）。
5. 能使用一个多文件项目亲手验证 Go to Definition、Rename、Autocomplete 和实时诊断。
6. 知道编辑器诊断很有价值，但 CI 仍应执行独立类型检查。

> **本节核心代码**：通过真实多文件类型关系观察编辑器语言服务如何理解项目、符号和类型。
>
> **实验辅助代码**：临时拼错属性、重命名符号和编辑器命令，只用于触发语言服务能力。

## 理论讲解

### 1. `tsc` 和语言服务不是同一种使用方式

`tsc` 更像批处理：

```text
读取项目
  ↓
创建 Program
  ↓
类型检查
  ↓
诊断 / Emit
```

编辑器语言服务则是一个长期交互系统：

```text
编辑器打开文件
      ↓
语言服务维护项目状态
      ↓
不断响应请求
      ├─ Hover
      ├─ Completion
      ├─ Go to Definition
      ├─ Find References
      ├─ Rename
      └─ Diagnostics
```

### 2. 为什么编辑器能在你还没运行命令时标红

当你输入：

```ts
product.prcie
```

编辑器可以立刻告诉你属性不存在。

这并不是代码已经运行，而是语言服务正在基于项目类型信息持续分析当前编辑状态。

### 3. `tsserver` 是传统 TypeScript 编辑器体系的重要组件

在 TypeScript 5.x / 6.x 及大量既有工具中，编辑器常通过 `tsserver` 与 TypeScript 语言能力交互。

可以先把它理解成：

```text
编辑器
  ↓ TypeScript 专用协议
 tsserver
  ↓
TypeScript Language Service
```

本节只要求理解职责，不要求手写 `tsserver` 协议客户端。

### 4. TypeScript 7 转向 LSP 原生语言服务器

TypeScript 7 的原生实现不仅重写了编译器，也把编辑器体验建立在 Language Server Protocol（LSP）基础上。

可以建立新的直觉：

```text
现代编辑器
   ↓ 标准 LSP
TypeScript 7 Language Server
   ↓
原生 TypeScript 项目/类型分析
```

LSP 的价值之一，是让不同编辑器使用统一协议接入语言能力。

不同 IDE 对 TypeScript 7 的启用方式可能不同，所以真正使用时要查看对应编辑器的当前文档。

### 5. 编辑器检查不能替代 CI

语言服务给开发者快速反馈；CI 类型检查负责团队统一门禁。

推荐关系是：

```text
编辑器 Language Service
负责即时反馈

CI tsc / 类型检查任务
负责可重复的提交门禁
```

而不是二选一。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们建立两个文件：

```text
src/
├── product.ts
└── main.ts
```

然后不靠背定义，而是通过编辑器操作验证语言服务真的理解它们之间的符号关系。

### 第 1 步：创建模型与函数

创建 `src/product.ts`：

```ts
export type Product = {
  id: number;
  name: string;
  price: number;
};

export function formatProduct(product: Product): string {
  return `${product.name}: ¥${product.price.toFixed(2)}`;
}
```

### 第 2 步：创建调用方

创建 `src/main.ts`：

```ts
import { formatProduct, type Product } from './product';

const product: Product = {
  id: 1,
  name: 'Keyboard',
  price: 499
};

console.log(formatProduct(product));
```

### 第 3 步：验证 Hover

把鼠标停在：

```ts
product
```

或：

```ts
Product
```

编辑器应显示推断出的类型信息。

这说明语言服务不仅看到文本，还建立了符号与类型关系。

### 第 4 步：验证 Go to Definition

在 `main.ts` 中对 `Product` 或 `formatProduct` 使用“转到定义”。

编辑器应跳到 `product.ts` 对应声明。

### 第 5 步：验证属性补全

临时输入：

```ts
product.
```

编辑器应能提供类似：

```text
id
name
price
```

的成员补全。

### 第 6 步：故意写错属性观察实时诊断

临时加入：

```ts
console.log(product.prcie);
```

即使你没有执行 `tsc`，编辑器通常也会立即提示：

```text
Property 'prcie' does not exist on type 'Product'.
```

修复或删除这行代码。

### 第 7 步：验证 Rename

在 `product.ts` 中对：

```ts
Product
```

执行 Rename Symbol，例如改成：

```text
CatalogProduct
```

支持项目级重命名的语言服务会同步更新引用位置，而不是只做字符串查找替换。

观察后可以撤销，恢复最终源码。

### 第 8 步：再使用 CLI 做一次独立检查

在模块根目录执行：

```bash
npx tsc -p ./01-typescript-foundations/kp016-language-service/tsconfig.json
```

这一步用来强化：

```text
编辑器语言服务 = 即时交互反馈
CLI 类型检查     = 独立、可重复的工程检查
```

### 第 9 步：对照最终源码

最终源码：

- [`src/product.ts`](./src/product.ts)
- [`src/main.ts`](./src/main.ts)

本节总结：

- **核心知识**：语言服务维护项目语义并回答编辑器请求；TypeScript 7 以 LSP 作为新的编辑器协议基础。
- **实验辅助代码**：拼错属性、Rename、Hover 等操作，用于把语言服务能力变成可观察实验。

## 运行案例

本节主要是编辑器交互实验；CLI 侧使用：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript
npx tsc -p ./01-typescript-foundations/kp016-language-service/tsconfig.json
```

然后在你使用的 IDE 中完成 Hover、Definition、Completion、Rename 和实时诊断实验。

## 效果验证

你应该能够确认：

- 编辑器无需真正执行程序，就能提供类型相关功能。
- `Product` 的定义和引用能跨文件关联。
- 拼错 `prcie` 时编辑器可以即时发现。
- Rename 是基于符号关系，而不是简单文本替换。
- 能解释传统 `tsserver` 与 TypeScript 7 LSP 语言服务器在架构上的关系。
- 能说明为什么编辑器反馈不能替代 CI 中的独立类型检查。
