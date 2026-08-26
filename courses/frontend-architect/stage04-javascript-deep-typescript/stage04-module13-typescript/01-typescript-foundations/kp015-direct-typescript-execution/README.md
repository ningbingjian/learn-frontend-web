# TS-KP015：直接运行 TypeScript 的现代方式与限制

> [返回 Chapter 01](../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道现代 Node.js 可以直接执行一部分 TypeScript 文件。
2. 理解 Node 内建支持的本质是 Type Stripping，而不是完整 `tsc`。
3. 知道 Node 直接运行 `.ts` 时不会做 TypeScript 类型检查。
4. 知道 Node 不会读取 `tsconfig.json` 来执行路径别名、降级语法等编译行为。
5. 能识别“可擦除类型语法”和“需要生成 JavaScript 的 TypeScript 语法”之间的边界。
6. 知道什么时候应该继续使用 `tsc`、打包器或 `tsx` 等完整运行方案。

> **本节核心代码**：直接使用 Node 执行只包含 erasable TypeScript syntax 的 `.ts` 文件，并观察“能运行但不类型检查”的行为。
>
> **实验辅助代码**：故意错误的类型赋值和 `enum` 示例，用来证明 Node 内建支持的边界。

## 理论讲解

### 1. 现代 Node.js 的内建 TypeScript 支持

当前 Node.js 提供内建 Type Stripping：

```text
.ts 文件
  ↓
移除可擦除的 TypeScript 类型语法
  ↓
直接按 JavaScript 运行
```

例如：

```ts
function double(value: number): number {
  return value * 2;
}

console.log(double(21));
```

在支持当前内建 Type Stripping 的 Node.js 中，可以直接：

```bash
node main.ts
```

### 2. Node 不会替你做类型检查

这一点非常重要。

下面的代码在 TypeScript 看来是错误的：

```ts
const count: number = '3';
```

但 Node 的 Type Stripping 目标只是把类型语法移除：

```js
const count = '3';
```

然后继续执行。

所以：

```text
node file.ts
  ≠
tsc --noEmit file.ts
```

### 3. Node 不读取 `tsconfig.json` 来完成编译

Node 内建 TypeScript 支持不会因为你的 `tsconfig.json` 而自动完成：

- `paths` 路径别名转换。
- `target` 语法降级。
- JSX 转换。
- 完整 TypeScript 类型检查。

因此它适合轻量脚本和可擦除语法，不等于完整工程编译链。

### 4. 只支持可擦除语法是一个重要边界

像下面这种类型注解可以直接擦除：

```ts
const id: number = 1;
```

但是 `enum` 等语法需要生成真正的 JavaScript 代码：

```ts
enum Status {
  Ready,
  Done
}
```

在只做 strip 的模式中，这类语法不能简单“删掉就结束”。

### 5. 完整 TypeScript 支持仍然有价值

如果项目需要：

- 完整类型检查。
- JSX / Decorators 等完整工具链。
- `tsconfig` 模块解析规则。
- 将新语法降级到旧 JavaScript。
- 构建并发布 `.js` 文件。

就仍然应该使用 `tsc`、构建工具，或像 `tsx` 这样的 TypeScript runner。

---

## 动手编码：从 0 到 1

### 第 0 步：先确认 Node 版本

执行：

```bash
node --version
```

Node 的 TypeScript 内建能力在不同版本中经历过实验、默认启用和稳定化过程，因此不要只看网上旧教程。

本节以当前 Node 官方文档中的稳定 Type Stripping 行为为目标。

### 第 1 步：创建可直接擦除的 TypeScript

创建 `src/main.ts`：

```ts
type User = {
  id: number;
  name: string;
};

function label(user: User): string {
  return `${user.id}:${user.name}`;
}

const user: User = {
  id: 1,
  name: 'Ada'
};

console.log(label(user));
```

这些 `type` 和类型标注都属于可以直接移除的类型语法。

### 第 2 步：直接用 Node 运行

在当前支持稳定 Type Stripping 的 Node.js 上：

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/src/main.ts
```

预期输出：

```text
1:Ada
```

> 如果你使用的是较老的 Node 22 版本，行为可能仍需要实验标志；学习时优先升级到当前受支持版本，而不是把旧实验参数当成长期写法。

### 第 3 步：证明 Node 没有做类型检查

打开 [`examples/no-type-check.ts`](./examples/no-type-check.ts)：

```ts
const count: number = '3';
console.log(count + 1);
```

先运行 TypeScript 检查：

```bash
npx tsc --noEmit --strict --target ES2022 ./01-typescript-foundations/kp015-direct-typescript-execution/examples/no-type-check.ts
```

TypeScript 应该报错。

然后在当前支持 Type Stripping 的 Node.js 上直接执行：

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/examples/no-type-check.ts
```

你会看到运行时仍然执行 JavaScript 语义，结果类似：

```text
31
```

这证明 Node 直接运行 `.ts` 不代表类型检查已经通过。

### 第 4 步：观察需要转换的语法

打开 [`examples/enum-requires-transform.ts`](./examples/enum-requires-transform.ts)：

```ts
enum Status {
  Ready = 'ready',
  Done = 'done'
}

console.log(Status.Ready);
```

直接使用 Node 的 strip-only 能力执行时，这类需要生成 JavaScript 的 TypeScript 语法会触及边界，而不是像普通类型注解一样直接删除。

### 第 5 步：使用 `erasableSyntaxOnly` 对齐代码约束

本知识点的 `tsconfig.json` 使用：

```json
{
  "compilerOptions": {
    "noEmit": true,
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true
  }
}
```

目的不是让 Node 读取这个配置，而是让 TypeScript 工程本身尽量约束为适合直接 stripping 的语法子集。

### 第 6 步：对照最终源码

最终可直接运行案例为 [`src/main.ts`](./src/main.ts)。

本节总结：

- **核心知识**：Node Type Stripping 只负责轻量移除类型，不负责完整 TypeScript 编译和类型检查。
- **实验辅助代码**：错误类型赋值与 `enum`，用来展示“能直接跑”和“完整 TypeScript 工具链”之间的边界。

## 运行案例

先检查：

```bash
npx tsc -p ./01-typescript-foundations/kp015-direct-typescript-execution/tsconfig.json
```

再在当前支持内建 Type Stripping 的 Node.js 上执行：

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/src/main.ts
```

## 效果验证

你应该能够确认：

- `src/main.ts` 只包含可擦除 TypeScript 类型语法。
- Node 可以直接执行这类文件，但不会替你做类型检查。
- `examples/no-type-check.ts` 能证明“直接执行成功”和“类型正确”是两件事。
- `enum` 例子说明不是所有 TypeScript 专属语法都能靠简单 stripping 处理。
- 能解释为什么大型工程仍然需要 `tsc` / 构建工具 / 完整 runner。

练习入口：[`exercise/README.md`](./exercise/README.md)。
