# TS-KP010 练习：分别使用项目模式和直接文件模式

## 任务一：项目模式

使用当前知识点的 `tsconfig.json`：

```bash
npx tsc -p ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json --noEmit
```

再使用：

```bash
npx tsc -p ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json --showConfig
```

找出最终的 `strict`、`target`、`rootDir` 和 `outDir`。

## 任务二：直接文件模式

先执行：

```bash
npx tsc ./01-typescript-foundations/kp010-tsc-basics/exercise/main.ts --noEmit --target ES2022
```

再执行：

```bash
npx tsc ./01-typescript-foundations/kp010-tsc-basics/exercise/main.ts --noEmit --strict --target ES2022
```

解释为什么第二条命令会对隐式 `any` 更严格。

参考答案：[`../solution/README.md`](../solution/README.md)。
