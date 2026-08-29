# TS-KP026：`never`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 `never` 表示“永远不会被观察到的值”。
2. 区分 `never` 与 `void`。
3. 理解始终抛异常或永不结束的函数为什么可以返回 `never`。
4. 理解控制流被完全排除后为什么会得到 `never`。
5. 使用 `assertNever()` 为联合类型建立穷尽检查。

> **本节核心代码**：`never` 返回类型与 `assertNever()` 穷尽检查。
>
> **实验辅助代码**：`console.log()` 只用于运行两个合法状态。

## 理论讲解

### 1. `never` 表示不会出现的值

例如：

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

这个函数不会正常返回一个值，而是直接终止当前控制流。

所以：

```text
void
函数正常结束，但没有可使用的返回值

never
函数根本不会正常到达返回点
```

### 2. `never` 也会出现在控制流分析中

假设一个值只有两种可能：

```ts
type Status = 'draft' | 'published';
```

当代码已经分别处理：

```text
draft
published
```

剩余分支理论上没有任何合法值，于是 TypeScript 可以把它收窄为 `never`。

### 3. `never` 是很重要的穷尽检查工具

常见辅助函数：

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled: ${String(value)}`);
}
```

当一个联合类型所有成员都处理完以后，剩余值才能安全传给 `never` 参数。

如果未来联合类型增加一个新成员，但 `switch` 忘记处理，TypeScript 就会在 `assertNever(status)` 位置产生错误。

### 4. `never` 不是“空值”

不要把它和下面这些混在一起：

```text
null
undefined
void
```

`null` 和 `undefined` 都是真实运行时值。

`void` 常用于表示函数没有可用返回值。

而 `never` 表示这个位置不可能正常产生一个值。

### 5. 赋值关系直觉

可以先建立这个直觉：

```text
unknown  很宽，几乎什么都能进入
never    很窄，没有普通值可以进入
```

更完整的类型兼容关系会在后续兼容性章节系统学习。

---

## 动手编码：从 0 到 1

### 第 0 步：定义一个有限状态集合

创建 `src/main.ts`：

```ts
type PublishStatus = 'draft' | 'published';
```

现在合法状态只有两个。

### 第 1 步：写一个普通状态转换函数

```ts
function statusLabel(status: PublishStatus): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'published':
      return 'Published';
  }
}
```

当前两种状态都被处理。

### 第 2 步：增加 `assertNever()`

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled status: ${String(value)}`);
}
```

这个函数本身不会正常返回。

### 第 3 步：把默认分支接到 `never`

```ts
default:
  return assertNever(status);
```

因为 `draft` 和 `published` 都已经排除，所以这里的 `status` 可以被收窄为 `never`。

### 第 4 步：运行两个合法状态

```ts
console.log(statusLabel('draft'));
console.log(statusLabel('published'));
```

预期：

```text
Draft
Published
```

### 第 5 步：验证穷尽检查真的有用

临时把类型改成：

```ts
type PublishStatus = 'draft' | 'published' | 'archived';
```

但不要给 `switch` 增加 `archived`。

再次执行类型检查，`assertNever(status)` 应该出现错误，因为剩余值现在可能是 `'archived'`，已经不再是 `never`。

验证后恢复最终源码。

### 第 6 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`never` 和 `assertNever()`。
- **实验辅助代码**：临时添加 `archived` 用于验证穷尽检查。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp026-never/tsconfig.json
npm run build -- ./02-basic-types-inference/kp026-never/tsconfig.json
node ./02-basic-types-inference/kp026-never/dist/main.js
```

预期：

```text
Draft
Published
```

## 效果验证

你应该能够确认：

- `never` 不代表 `null` 或 `undefined`。
- 始终抛异常的函数可以返回 `never`。
- 联合类型全部排除后，剩余分支可以被收窄为 `never`。
- `assertNever()` 可以在新增联合成员时帮助发现漏处理分支。
- `never` 是构建可靠状态机和穷尽检查的重要基础。
