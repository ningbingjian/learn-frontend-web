# RE-KP117：Effect 生命周期

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | Effect 的生命周期为什么应围绕“一次同步过程”理解，而不是机械背 mount/update/unmount？ |
| Learning Artifact | roomId 连接 setup/cleanup 时间轴 |

## 先预测
房间 A 已连接，Props 切成 B。React 应先连 B 再断 A，还是先断 A 再连 B？

## 动手实验
### Step 0：setup A
记录 `connect A`。
### Step 1：依赖变 B
观察 `disconnect A → connect B`。
### Step 2：依赖再变 C
再次观察同一同步循环。
### Step 3：组件离开
只剩最终 cleanup C。

[查看最终源码](./src/main.jsx)

## 心智模型
```text
start syncing A
↓ dependency changes
stop syncing A
start syncing B
↓ unmount
stop syncing B
```

## 理论收束
每个 Effect 更适合看作独立同步进程：setup 开始同步，cleanup 停止对应同步；依赖变化意味着用新输入重新建立这条同步关系。

## Wrong Way
- 把所有逻辑按“mounted/updated”塞进同一个 Effect。
- cleanup 撤销不了对应 setup。
- 依赖变化时只做新 setup 不处理旧资源。

## Production Boundary
一条 Effect 尽量同步一个独立外部系统，便于推理和测试。

## 本课只记住 3 件事
1. Effect 是同步进程。
2. cleanup 停止旧进程。
3. 依赖变化意味着重新同步。

## Challenge
画出 A→B→C→Unmount 的 setup/cleanup 日志顺序。

## Mastery Check
- **Must**：会预测生命周期。
- **Should**：能拆分多条独立同步进程。
- **Expert**：能用同步模型而非 class lifecycle 迁移思维。
