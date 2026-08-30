# RE-KP118：挂载、依赖变化与卸载

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 能按时间顺序描述 Effect 在首次出现、依赖变化、移除组件时发生什么。
2. 理解依赖变化不是“额外调用一次 setup”，而是旧 cleanup + 新 setup。
3. 理解卸载时只需要停止当前仍在运行的同步。
4. 能使用父组件条件渲染主动观察完整生命周期。
5. 区分生产生命周期与 StrictMode 开发期额外检查。

> **本节核心代码**：父组件控制 ChatRoom 是否存在；子组件 Effect 依赖 `roomId` 并返回 cleanup。  
> **实验辅助代码**：Console 日志用于把 mount / dependency change / unmount 映射到同步过程。

## 理论讲解

### 1. 首次提交后的 Setup

当组件第一次真正出现在页面并完成 Commit 后：

```text
setup(current dependencies)
```

### 2. 依赖变化

如果依赖改变：

```text
cleanup(previous dependencies)
setup(next dependencies)
```

注意不是：

```text
setup old
setup new
```

否则外部资源会叠加。

### 3. 组件被移除

当组件从树中消失：

```text
cleanup(current dependencies)
```

随后不再创建新的 setup。

### 4. 用同步过程理解三种时机

可以把它们统一为：

```text
首次出现：开始同步
依赖变化：停止旧同步 → 开始新同步
组件移除：停止当前同步
```

### 5. StrictMode 另有开发期检查

本节关注正常生命周期。

如果在开发模式 StrictMode 下看到额外 setup/cleanup，请把它理解为下一节的压力测试，而不是生产环境多出一个生命周期阶段。

## 动手编码：从 0 到 1

### 第 0 步：父组件控制是否显示 ChatRoom

```jsx
const [showChat, setShowChat] = useState(true);
```

### 第 1 步：子组件持有 roomId

```jsx
const [roomId, setRoomId] = useState('general');
```

### 第 2 步：Effect 连接当前房间

```jsx
useEffect(() => {
  console.log('setup', roomId);
  return () => console.log('cleanup', roomId);
}, [roomId]);
```

### 第 3 步：切换 roomId

观察：

```text
cleanup general
setup music
```

### 第 4 步：隐藏 ChatRoom

当前房间会执行最后一次 cleanup。

### 第 5 步：重新显示

这是一个新的组件实例，会重新建立同步。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp118-mount-dependency-unmount --config ./vite.config.js
```

## 效果验证

1. 能观察首次 setup。
2. 切换依赖能观察 cleanup old → setup new。
3. 隐藏组件能观察当前同步 cleanup。
4. 重新显示会建立新的同步。
5. 能画出完整时间线而不是只背“mount/update/unmount”。

完成后继续 **RE-KP119：StrictMode 下 Effect 重新执行**。
