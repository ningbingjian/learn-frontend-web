# TS-KP013：`--noEmit` 与只类型检查

> [返回 Chapter 01](../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 `noEmit` / `--noEmit` 的准确作用。
2. 知道“不生成 JavaScript”不等于“不做类型检查”。
3. 区分 `noEmit` 与 `noEmitOnError`。
4. 能建立一个只负责类型检查、不负责产物输出的 TypeScript 工程。
5. 理解为什么 Vite、Babel、SWC 等工具链中经常把“类型检查”和“代码转换”拆开。

> **本节核心代码**：`"noEmit": true` 与 `tsc --noEmit`，它们让 TypeScript 只做分析和诊断，不写出 JavaScript、source map 或声明文件。
>
> **实验辅助代码**：`outDir`、删除 `dist/`、临时制造类型错误等，只用于观察“是否产生文件”。

## 理论讲解

### 1. `noEmit` 到底关闭了什么

正常 `tsc` 可以同时做两件事：

```text
TypeScript 源码
      ↓
类型分析 / 诊断
      ↓
Emit JavaScript 等产物
```

打开 `noEmit` 后变成：

```text
TypeScript 源码
      ↓
类型分析 / 诊断
      ↓
停止，不写输出文件
```

因此 `noEmit` 的意思不是“什么都不做”，而是：

> **做类型检查，但不让 TypeScript 负责生成运行产物。**

### 2. 类型错误仍然会被报告

例如：

```ts
function connect(port: number) {
  return `connect:${port}`;
}

connect('8080');
```

即使配置：

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

TypeScript 仍然会报告 `string` 不能传给 `number`。

所以：

```text
noEmit
  ≠
关闭类型检查
```

### 3. `noEmit` 与 `noEmitOnError` 不一样

这两个选项很容易混淆：

```text
noEmit = true
无论有没有错误，都不生成文件

noEmitOnError = true
有错误时不生成文件
没有错误时仍然可以生成文件
```

课程共享配置显式开启了 `noEmitOnError`；本节自己的 `tsconfig.json` 再开启 `noEmit`，用来观察“永远只检查”的模式。

### 4. 为什么工程里经常这样拆职责

现代前端工程经常采用：

```text
TypeScript / tsc
负责类型检查

Vite / esbuild / SWC / Babel
负责代码转换与打包
```

这样可以让每个工具做自己擅长的事情。

但要注意：

> 如果构建工具只负责去掉类型而不做 TypeScript 类型检查，就必须确保 CI、编辑器或独立 `tsc --noEmit` 任务仍然真正执行类型检查。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要验证两件事：

1. 正确代码执行类型检查后，不产生 `dist/`。
2. 制造类型错误后，仍然能够看到诊断信息。

### 第 1 步：创建最小源码

创建 `src/main.ts`：

```ts
interface ServiceConfig {
  endpoint: string;
  timeoutMs: number;
}

const config: ServiceConfig = {
  endpoint: '/api/products',
  timeoutMs: 3000
};

function describeConfig(value: ServiceConfig): string {
  return `${value.endpoint} (${value.timeoutMs}ms)`;
}

console.log(describeConfig(config));
```

这里的类型信息完全正常。

### 第 2 步：创建只类型检查配置

创建 `tsconfig.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
```

注意这里故意同时写了：

```json
"outDir": "dist",
"noEmit": true
```

`outDir` 告诉我们“如果要输出，应该去哪里”；`noEmit` 则明确说“这次不要输出”。

### 第 3 步：执行类型检查

在 TypeScript 模块根目录运行：

```bash
npx tsc -p ./01-typescript-foundations/kp013-no-emit-type-checking/tsconfig.json
```

正确代码应当：

```text
没有类型错误
没有生成 dist/
```

你也可以显式从命令行覆盖：

```bash
npx tsc -p ./01-typescript-foundations/kp013-no-emit-type-checking/tsconfig.json --noEmit
```

### 第 4 步：故意制造一个类型错误

临时把：

```ts
timeoutMs: 3000
```

改成：

```ts
timeoutMs: '3000'
```

再次运行类型检查。

这次应该看到类似：

```text
Type 'string' is not assignable to type 'number'.
```

重点观察：

```text
虽然不 Emit
但类型诊断仍然正常工作
```

### 第 5 步：恢复正确代码

把 `timeoutMs` 恢复为数字，再次执行命令，确认没有错误。

### 第 6 步：对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节总结：

- **核心代码**：`noEmit: true` / `--noEmit`，表示只检查、不输出。
- **实验辅助代码**：`outDir` 和临时错误，只用于证明没有生成文件但诊断仍存在。

## 运行案例

本节的“运行”重点是执行类型检查，而不是运行 JavaScript：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript
npm install
npx tsc -p ./01-typescript-foundations/kp013-no-emit-type-checking/tsconfig.json
```

然后检查知识点目录，应该没有 `dist/` 输出。

## 效果验证

你应该能够确认：

- 正确源码通过类型检查。
- `noEmit: true` 时不会生成 JavaScript。
- 临时写错 `timeoutMs` 后仍然会得到类型错误。
- 能准确解释 `noEmit` 与 `noEmitOnError` 的区别。
- 能说明为什么“构建工具负责转换 + tsc 负责类型检查”是一种常见工程分工。

练习入口：[`exercise/README.md`](./exercise/README.md)。
