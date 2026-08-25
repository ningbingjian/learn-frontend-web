# TS-KP009：安装 TypeScript 与版本管理

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 TypeScript 编译器通常通过 npm 安装。
2. 区分“项目本地安装”和“全局安装”的差异。
3. 能使用 `npx tsc --version` 确认当前项目真正使用的 TypeScript 版本。
4. 理解 `package.json` 与 lockfile 在版本管理中的不同职责。
5. 知道升级 TypeScript 应该是显式动作，而不是依赖开发机器上的偶然全局版本。

> **本节核心知识**：项目应该能够明确回答“现在到底在用哪个 TypeScript 版本，以及这个版本从哪里来”。  
> **实验辅助代码**：`src/main.ts` 只是安装完成后的最小烟雾测试；真正重点是 npm、本地依赖和版本确认命令。

## 理论讲解

### 1. TypeScript 编译器是项目工具链的一部分

TypeScript 通常以 npm 包的形式安装：

```text
项目
  ↓
node_modules/typescript
  ↓
tsc
```

因此编译器版本本身也是工程依赖，而不是一台电脑上“有一个 TypeScript 就够了”。

### 2. 为什么优先使用项目本地安装

项目本地安装通常写在：

```json
{
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

好处是：

```text
开发者 A
开发者 B
CI
      ↓
读取同一个项目依赖
      ↓
尽量使用同一个 TypeScript 版本
```

这样可以减少“我电脑能编译，你电脑不能编译”的版本漂移。

### 3. 全局安装不是完全不能用

全局安装通常类似：

```bash
npm install -g typescript
```

它适合临时体验，但长期工程不应该只依赖全局版本。

原因是：

```text
机器 A 的全局 tsc = 某版本
机器 B 的全局 tsc = 另一个版本
```

而项目代码并不知道两台机器差了什么。

### 4. `npx tsc` 为什么常用于项目

当项目已经本地安装 TypeScript 时：

```bash
npx tsc --version
```

会优先使用当前项目可用的 `tsc`。

在 npm scripts 中：

```json
{
  "scripts": {
    "check": "tsc --noEmit -p"
  }
}
```

npm 也会自动把项目本地 `node_modules/.bin` 放入命令查找路径。

所以课程后面统一通过模块根目录的本地 TypeScript 工具链运行。

### 5. `package.json` 与 lockfile 的职责不同

可以先建立下面的直觉：

```text
package.json
      ↓
声明项目希望使用什么依赖范围/版本

package-lock.json
      ↓
记录一次真实解析后的依赖树
```

本课程当前把 TypeScript 版本直接固定为：

```text
7.0.2
```

这样课程示例的工具链基线更加明确。

### 6. 升级 TypeScript 应该是一个可审查动作

不要把升级理解成：

```text
npm 自动变新了
```

更合理的过程是：

```text
明确目标版本
   ↓
修改依赖
   ↓
重新安装
   ↓
运行类型检查
   ↓
阅读 Release Notes
   ↓
处理行为变化
```

版本迁移会在后续专门章节深入学习。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

本节要亲手确认三件事：

1. TypeScript 是项目本地开发依赖。
2. 当前项目实际使用哪个版本可以被命令确认。
3. 安装完成后能够用这套工具链检查一个最小 `.ts` 文件。

### 第 1 步：进入 TypeScript 模块根目录

进入：

```text
courses/frontend-architect/
stage04-javascript-deep-typescript/
stage04-module13-typescript/
```

这里已经有共享：

```text
package.json
tsconfig.base.json
```

### 第 2 步：查看项目声明的 TypeScript 版本

打开模块根目录 `package.json`，观察：

```json
"devDependencies": {
  "typescript": "7.0.2"
}
```

这里表达的是：

```text
这个课程模块明确依赖 TypeScript 7.0.2
```

### 第 3 步：安装项目依赖

第一次学习本模块时运行：

```bash
npm install
```

安装完成后应该出现：

```text
node_modules/
```

以及 npm 使用的 lockfile。

> `node_modules/` 已由模块级 `.gitignore` 忽略，不提交到仓库。

### 第 4 步：确认真正使用的编译器版本

执行：

```bash
npx tsc --version
```

当前课程基线应显示 TypeScript 7.0.2 对应的版本信息。

再执行：

```bash
npm ls typescript
```

你应该能够看到 TypeScript 是当前项目依赖树中的开发依赖。

### 第 5 步：不要把全局版本误认为项目版本

如果你的机器已经有全局 `tsc`，可以执行：

```bash
tsc --version
```

然后和：

```bash
npx tsc --version
```

对比。

如果两者不同，不代表项目坏了，反而说明为什么工程要明确使用本地依赖。

### 第 6 步：创建一个最小 TypeScript 文件

当前知识点最终源码位于：

```text
src/main.ts
```

内容很简单：

```ts
const compilerBaseline: string = 'TypeScript project-local toolchain';

console.log(compilerBaseline);
```

这里的目的不是学习 `string`，而是确认安装好的工具链能够读取 TypeScript 文件。

### 第 7 步：使用项目本地工具链检查当前知识点

在模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
```

如果没有类型错误，命令应正常结束。

### 第 8 步：编译并运行烟雾测试

执行：

```bash
npm run build -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
```

然后：

```bash
node ./01-typescript-foundations/kp009-installation-version-management/dist/main.js
```

预期：

```text
TypeScript project-local toolchain
```

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节最后只需要分清两层：

- **核心知识**：TypeScript 版本属于项目工具链，应通过项目依赖和 `npx tsc --version` 明确确认。
- **实验辅助代码**：`src/main.ts` 与独立 `tsconfig.json` 只是用来验证安装后的编译链能工作。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm install
npx tsc --version
npm ls typescript
npm run check -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
npm run build -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
node ./01-typescript-foundations/kp009-installation-version-management/dist/main.js
```

## 效果验证

你应该能够回答：

1. 为什么团队项目更适合依赖本地 TypeScript，而不是只依赖全局 `tsc`？
2. `npx tsc --version` 和 `tsc --version` 为什么可能不同？
3. `package.json` 与 lockfile 分别解决什么问题？
4. 如果要升级 TypeScript，为什么应该显式修改版本并重新执行类型检查？
5. 为什么“我的电脑装了 TypeScript”不能等价于“这个项目的 TypeScript 版本是明确的”？
