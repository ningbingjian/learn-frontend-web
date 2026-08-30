# RE-KP120：为什么开发环境看起来执行两次

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 精确解释“开发环境执行两次”到底指什么。
2. 区分组件 Render 的开发期检查与 Effect 的额外 setup/cleanup 周期。
3. 理解 React 希望组件能够承受 remount / re-synchronization。
4. 知道外部系统操作必须可重复 setup 并可完整 cleanup。
5. 避免把生产业务逻辑建立在“Effect 只会 setup 一次”的假设上。

> **本节核心代码**：一个可对称 start/stop 的 mock connection。  
> **实验辅助代码**：连接编号和 Console 日志只用于解释开发期行为。

## 理论讲解

### 1. “两次”不是生产生命周期承诺

常见说法：

```text
useEffect 会执行两次
```

这个说法过于粗糙。

更准确是：当 StrictMode 开启时，React 会在开发环境额外做一次 Effect setup + cleanup 压力测试。

### 2. 目的是验证可重新同步

理想 Effect 满足：

```text
setup
cleanup
setup
```

最终外部世界状态与只执行一次 setup 相同。

### 3. 为什么这对真实应用重要

真实应用中组件也可能：

```text
被隐藏
被移除
重新出现
依赖变化后重新连接
路由切换后再次进入
```

所以“只在第一次 mount 成功一次”不是健壮的资源管理模型。

### 4. 错误修复方式

不推荐：

```text
删除 StrictMode
用全局 flag 跳过第二次
用 ref 做 didRun 门闩
```

这些方式并没有让 cleanup 正确。

### 5. 正确修复方式

让 setup / cleanup 对称，并保证：

```text
重复建立连接前旧连接已经断开
重复注册监听前旧监听已经移除
重复启动 timer 前旧 timer 已清除
```

## 动手编码：从 0 到 1

### 第 0 步：创建 mock service

模块级 `nextConnectionId` 只用于生成日志编号。

### 第 1 步：Effect 中 start

```jsx
const connection = createConnection();
connection.connect();
```

### 第 2 步：Cleanup 中 stop

```jsx
return () => connection.disconnect();
```

### 第 3 步：观察 StrictMode

开发模式 Console 可能显示：

```text
connect #1
disconnect #1
connect #2
```

关键不是编号，而是任意时刻只留下当前有效连接。

### 第 4 步：不要加入 didRun 门闩

最终源码故意不使用阻止第二次 setup 的 Ref。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp120-why-effect-runs-twice-in-dev --config ./vite.config.js
```

## 效果验证

1. 能看到开发期 connect/disconnect/connect 日志。
2. 能说明额外周期只用于开发检查。
3. 能说明 cleanup 正确时不会留下重复有效连接。
4. 能解释为什么 `didRun` 不是正确解法。
5. 能用“可重新同步”而不是“只运行一次”设计 Effect。

完成后进入 **Chapter 13 / RE-KP121：You Might Not Need an Effect**。
