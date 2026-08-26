# TS-KP009 练习：确认项目真正使用的 TypeScript 版本

## 任务

在 TypeScript 模块根目录完成：

```bash
npm install
npx tsc --version
npm ls typescript
```

然后再尝试：

```bash
tsc --version
```

如果系统没有全局 `tsc`，记录“未安装全局 TypeScript”即可；如果有，则比较全局版本和项目版本是否相同。

接着检查 [`main.ts`](./main.ts)：

```bash
npx tsc ./01-typescript-foundations/kp009-installation-version-management/exercise/main.ts --noEmit --strict --target ES2022
```

## 你需要回答

1. 项目本地 TypeScript 从哪里声明版本？
2. `npx tsc` 为什么比直接依赖全局 `tsc` 更适合课程项目？
3. 如果两位开发者全局版本不同，但项目使用本地固定版本，会减少哪类问题？
4. 升级 TypeScript 后最少应该重新执行哪些检查？

参考答案见 [`../solution/README.md`](../solution/README.md)。
