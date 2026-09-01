# TS-KP014：Watch Mode

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ENGINEERING` |
| 学习深度 | **Must** |
| 本课主问题 | 为什么开发阶段不应该每改一行都手工重新启动一次完整 `tsc`？ |
| Learning Artifact | 持续运行的 Watch Console：成功 → 错误 → 修复 |
| 暂不理解 | Watch Compiler 内部缓存、增量图算法 |

## 这节课只需要搞懂什么

1. Watch Mode 持续监听项目文件变化。
2. 每次保存后自动重新检查/编译并给反馈。
3. Watch 是开发反馈机制，不是生产 Runtime。

## 前置状态

最终源码输出：

```text
1. learn watch mode [todo]
```

## 本课主问题与先预测

启动 Watch 后，把 `done: false` 临时改成 `done: 'no'`，不重启命令，Console 会不会自动出现 Type Error？恢复后会不会自动变绿？

## 动手实验

### Step 0：启动 Watch

在模块根目录执行：

```bash
npm exec tsc -- --watch -p ./01-typescript-foundations/kp014-watch-mode/tsconfig.json
```

观察初次编译完成提示。

### Step 1：制造错误并保存

临时改：

```ts
done: 'no'
```

不要重启 `tsc`。保存后观察 Watch 自动重新检查并报告错误。

### Step 2：修复并保存

恢复：

```ts
done: false
```

观察同一个 Watch 进程自动报告 0 errors。

### Step 3：退出 Watch，再运行产物

按 `Ctrl+C` 结束；构建/运行后输出最终任务摘要。

## 心智模型

```text
编辑文件 → save → Watch Compiler → 增量反馈 → 继续编辑
```

## Wrong Way 与 Production Boundary

- Watch 不是“线上常驻的 TypeScript 服务”；它服务开发反馈。
- 大型工程还会结合增量构建、Project References、Bundler HMR；本课不混在一起。

## 本课只记住 3 件事

1. **Watch 让类型反馈跟着保存自动发生。**
2. **无需每次手工重启 Compiler。**
3. **它是开发工具，不是 Runtime。**

## Challenge

保持 Watch 运行，连续制造两个不同字段错误并修复，记录每次保存后的 Diagnostic 变化。

## Mastery Check

### Must
会启动、观察、停止 Watch。
### Should
能解释 Watch 与一次性 `tsc` 的开发体验差异。
### Expert
能说明大型仓库为什么还需要 incremental/project references，而不是把 Watch 当万能性能方案。

## 最终源码与代码边界

- **核心能力**：Watch 的持续反馈循环。
- **辅助代码**：Task 示例只用于制造保存变化。
- **最终源码**：[`src/main.ts`](./src/main.ts)
