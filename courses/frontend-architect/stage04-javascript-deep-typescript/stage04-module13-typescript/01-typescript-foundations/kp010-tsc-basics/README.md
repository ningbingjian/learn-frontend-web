# TS-KP010：`tsc` 基本使用

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `tsc` 既可以按项目配置工作，也可以直接接收源文件参数。
2. 会使用 `-p` / `--project` 指定 `tsconfig.json`。
3. 会使用 `--noEmit` 做“只检查、不输出”。
4. 会使用 `--showConfig` 查看 TypeScript 最终合并后的配置。
5. 理解“命令行直接传入源文件时，项目 `tsconfig.json` 不参与这次编译”这一重要规则。

> **本节核心知识**：先分清“项目模式”和“直接文件模式”，再学习具体 CLI 参数。  
> **实验辅助代码**：`examples/standalone.ts` 故意保留隐式 `any`，只用于证明不同调用方式会使用不同配置来源。

## 理论讲解

### 1. `tsc` 是 TypeScript 编译器命令行入口

最常见的工作模式是：

```text
tsc
 ↓
找到项目 tsconfig.json
 ↓
读取文件集合与 compilerOptions
 ↓
类型检查 / Emit
```

也可以显式指定项目：

```bash
npx tsc -p path/to/tsconfig.json
```

### 2. `-p` / `--project`

`-p` 用于告诉 `tsc`：

```text
使用哪一个 tsconfig.json 作为项目入口
```

例如课程共享脚本：

```bash
npm run check -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
```

最终等价思路是：

```text
tsc --noEmit -p <这个知识点的 tsconfig>
```

### 3. `--noEmit`

`--noEmit` 表示：

```text
参与解析
参与类型检查
但是不生成 JavaScript 等输出文件
```

所以它很适合：

- CI 类型检查。
- 编辑前验证。
- “只想知道类型是否正确”的任务。

Emit 会在 TS-KP012 详细学习。

### 4. `--showConfig`

当配置存在继承时：

```text
tsconfig.base.json
       ↓ extends
当前知识点 tsconfig.json
```

肉眼可能不容易判断最终配置是什么。

可以执行：

```bash
npx tsc -p <tsconfig> --showConfig
```

查看解析、继承之后 TypeScript 真正采用的配置。

### 5. 直接传文件和项目模式不是一回事

这是本节最重要的 CLI 规则之一。

下面这种调用：

```bash
npx tsc src/main.ts
```

显式提供了输入文件。

这种情况下，TypeScript 不会再把附近的 `tsconfig.json` 当作这次调用的项目配置。

所以：

```text
npx tsc -p tsconfig.json
        ↓
项目模式

npx tsc file.ts
        ↓
直接文件模式
```

不要把两种方式混为一谈。

### 6. `-p` 和直接文件参数不要混用

如果你已经选择：

```text
一个 tsconfig 项目
```

文件集合应该由 `files` / `include` / import 图等项目配置决定。

如果你选择直接文件模式，则需要通过 CLI 自己补充本次需要的编译选项。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要通过同一个 `tsc` 比较两种入口：

```text
项目模式
vs
直接文件模式
```

并观察为什么它们可能得到不同诊断结果。

### 第 1 步：创建项目模式源码

创建：

```text
src/main.ts
```

写入：

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet('TypeScript'));
```

### 第 2 步：创建项目配置

当前知识点 `tsconfig.json`：

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

它继承模块级严格配置。

### 第 3 步：执行项目模式类型检查

在模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
```

正确源码应通过检查，并且因为共享脚本包含 `--noEmit`，不会生成 `dist/`。

### 第 4 步：查看最终配置

执行：

```bash
npx tsc -p ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json --showConfig
```

重点观察：

```text
strict
rootDir
outDir
include / files
```

你会看到继承后的真实配置，而不是只看到当前小文件中写出的几项。

### 第 5 步：准备一个“直接文件模式”实验

知识点还提供：

```text
examples/standalone.ts
```

里面故意写：

```ts
function echo(value) {
  return value;
}
```

`value` 没有类型标注。

这个文件故意不在项目 `include` 中，因此不会破坏正常项目编译。

### 第 6 步：不加严格选项，直接检查这个文件

执行：

```bash
npx tsc ./01-typescript-foundations/kp010-tsc-basics/examples/standalone.ts --noEmit --target ES2022
```

你可能发现它没有因为隐式 `any` 报错。

原因不是项目的 `strict` 失效了，而是：

```text
这次直接传入了源文件
      ↓
项目 tsconfig 没有参与
```

### 第 7 步：在直接文件模式中显式打开 strict

再执行：

```bash
npx tsc ./01-typescript-foundations/kp010-tsc-basics/examples/standalone.ts --noEmit --strict --target ES2022
```

现在应该出现隐式 `any` 相关诊断。

这证明：

```text
CLI 入口不同
   ↓
配置来源可能不同
   ↓
检查结果也可能不同
```

### 第 8 步：真正构建项目源码

执行：

```bash
npm run build -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
```

生成：

```text
dist/main.js
```

再运行：

```bash
node ./01-typescript-foundations/kp010-tsc-basics/dist/main.js
```

预期：

```text
Hello, TypeScript
```

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **核心知识**：`tsc -p` 走项目配置；直接传文件进入另一种调用方式，项目 `tsconfig.json` 不会自动参与。
- **实验辅助代码**：`examples/standalone.ts` 的隐式 `any` 只是为了制造可观察差异。

## 运行案例

```bash
npm run check -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
npx tsc -p ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json --showConfig
npx tsc ./01-typescript-foundations/kp010-tsc-basics/examples/standalone.ts --noEmit --target ES2022
npx tsc ./01-typescript-foundations/kp010-tsc-basics/examples/standalone.ts --noEmit --strict --target ES2022
npm run build -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
node ./01-typescript-foundations/kp010-tsc-basics/dist/main.js
```

## 效果验证

你应该能够解释：

1. `tsc -p` 中 `-p` 指向什么？
2. `--noEmit` 是否意味着不做类型检查？
3. 为什么 `--showConfig` 对有 `extends` 的项目很有价值？
4. 为什么直接执行 `tsc some-file.ts` 可能和项目正常检查得到不同结果？
5. 为什么团队脚本应该明确到底采用项目模式还是直接文件模式？
