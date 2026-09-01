# RE-KP118：挂载、依赖变化与卸载

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | `[]`、`[roomId]` 和不传依赖数组，分别让 Effect 在什么变化下重新同步？ |
| Learning Artifact | 三种 dependency 形式对照日志 |

## 动手对照
### Step 0：无依赖数组
每次 Commit 后 Effect 都有机会重新同步。
### Step 1：空数组 `[]`
Effect 不依赖 Render 中变化值，正常语义下只需初次 setup 和最终 cleanup；开发 StrictMode 另有检查。
### Step 2：`[roomId]`
只有 roomId 比较发生变化时重新同步。
### Step 3：组件卸载
所有形式都需要处理最终 cleanup（若提供）。

[查看最终源码](./src/main.jsx)

## 理论收束
依赖形式不是性能选项，而是描述 Effect 读取的 Reactive Values。生命周期由“同步输入是否变化”推导出来。

## Wrong Way
- 为减少执行次数无脑加 `[]`。
- 依赖数组与 Effect 实际读取值不一致。
- 把 StrictMode 开发检查误判为 production 生命周期。

## Production Boundary
依赖越准确，外部资源生命周期越可预测；不要通过缺依赖换“少执行”。

## 本课只记住 3 件事
1. 不传数组：每次 Commit 后重新考虑同步。
2. `[]`：没有 Reactive Dependency。
3. `[x]`：x 变化时重新同步。

## Challenge
给三个 Effect 分别选择正确依赖形式并解释。

## Mastery Check
- **Must**：会区分三种形式。
- **Should**：能从读取值推导依赖。
- **Expert**：能发现错误 `[]` 隐藏的生命周期 Bug。
