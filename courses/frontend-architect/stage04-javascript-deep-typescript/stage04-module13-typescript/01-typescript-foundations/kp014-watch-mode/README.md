# TS-KP014：Watch Mode

> [返回 Chapter 01](../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `tsc --watch` / `tsc -w` 持续监听 TypeScript 项目。
2. 理解 Watch Mode 与单次 `tsc` 的区别。
3. 能通过“制造错误 → 保存 → 修复 → 保存”观察实时诊断变化。
4. 知道 `watchOptions` 用于调整文件系统监听策略。
5. 知道 Watch Mode 适合开发反馈循环，但不能替代最终 CI 类型检查。

> **本节核心代码**：`tsc -p <tsconfig> --watch`，它让 TypeScript 进程保持运行并在文件变化后重新检查项目。
>
> **实验辅助代码**：`noEmit: true`、临时错误和 `watchOptions` 说明，只用于观察诊断变化并避免生成无关产物。

## 理论讲解

### 1. 单次检查与持续监听

普通命令：

```bash
npx tsc -p tsconfig.json
```

执行一次后进程结束：

```text
读取项目
  ↓
检查
  ↓
结束
```

Watch Mode：

```bash
npx tsc -p tsconfig.json --watch
```

会保持进程：

```text
第一次检查
  ↓
等待文件变化
  ↓
重新检查
  ↓
继续等待
```

### 2. Watch Mode 解决的是开发反馈速度

开发时，如果每改一行代码都手动重新执行 `tsc`，反馈链路很慢。

Watch Mode 把流程改成：

```text
保存文件
  ↓
TypeScript 自动发现变化
  ↓
重新计算诊断
  ↓
终端立即显示结果
```

### 3. Watch Mode 不是另一个类型系统

`--watch` 只是改变“什么时候重新运行检查”。

它不会改变：

- `strict` 等类型规则。
- 项目包含哪些文件。
- 模块解析语义。
- `noEmit` / `outDir` 等编译选项。

### 4. `watchOptions` 是监听策略配置

不同操作系统、容器、网络文件系统的文件监听行为不同。

TypeScript 提供：

```json
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents"
  }
}
```

用来控制监听方式。

本节不要求记住所有策略；先知道：

> Watch Mode 出现 CPU 高、文件变化不触发、文件监听数量不足时，除了业务代码，也要考虑文件系统监听策略。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要让一个 TypeScript 进程保持运行，然后连续经历：

```text
0 errors
  ↓
保存错误代码
  ↓
出现类型错误
  ↓
修复并保存
  ↓
回到 0 errors
```

### 第 1 步：创建源码

创建 `src/main.ts`：

```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
};

function summarize(task: Task): string {
  return `${task.id}. ${task.title} [${task.done ? 'done' : 'todo'}]`;
}

const task: Task = {
  id: 1,
  title: 'learn watch mode',
  done: false
};

console.log(summarize(task));
```

### 第 2 步：配置只监听、不输出

创建 `tsconfig.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
```

这里使用 `noEmit`，是因为本节只关注持续类型诊断。

### 第 3 步：启动 Watch Mode

在模块根目录执行：

```bash
npx tsc -p ./01-typescript-foundations/kp014-watch-mode/tsconfig.json --watch
```

或简写：

```bash
npx tsc -p ./01-typescript-foundations/kp014-watch-mode/tsconfig.json -w
```

第一次检查应该显示 0 个错误，并保持进程运行。

### 第 4 步：制造错误

保持 Watch 进程不要退出，把：

```ts
done: false
```

临时改成：

```ts
done: 'no'
```

保存文件。

你不需要重新输入命令，终端应该自动出现类型错误。

### 第 5 步：修复错误

把代码恢复为：

```ts
done: false
```

再次保存。

Watch Mode 应重新检查，并恢复到 0 errors。

### 第 6 步：退出监听

按：

```text
Ctrl + C
```

结束长驻进程。

### 第 7 步：对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节总结：

- **核心代码**：`tsc --watch` / `-w`，负责持续监听并重新检查。
- **实验辅助代码**：`noEmit` 和故意写错 `done`，用于制造清晰的诊断变化。

## 运行案例

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript
npx tsc -p ./01-typescript-foundations/kp014-watch-mode/tsconfig.json --watch
```

然后按“制造错误 → 保存 → 修复 → 保存”的顺序操作，最后 `Ctrl + C` 退出。

## 效果验证

你应该能够确认：

- Watch 进程不会像普通 `tsc` 一样检查一次就退出。
- 文件保存后不需要手动重新执行命令。
- 类型错误出现和消失都能被自动感知。
- `--watch` 改变的是反馈方式，不改变类型规则本身。
- 知道 `watchOptions` 是处理特殊文件系统监听问题的入口。

练习入口：[`exercise/README.md`](./exercise/README.md)。
