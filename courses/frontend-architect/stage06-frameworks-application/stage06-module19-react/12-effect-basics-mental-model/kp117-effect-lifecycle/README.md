# RE-KP117：Effect 生命周期

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 不再只用“组件 mount/update/unmount”解释 Effect。
2. 用“开始同步 / 停止同步”描述一个 Effect 自己的生命周期。
3. 理解依赖变化时旧 Effect 要先停止，再用新值重新同步。
4. 知道一个组件可以有多个彼此独立的 Effect 生命周期。
5. 能根据外部系统同步关系设计 setup 和 cleanup。

> **本节核心代码**：`roomId` 变化时 Effect 先 disconnect 旧房间，再 connect 新房间。  
> **实验辅助代码**：`createConnection()` 是本地 mock，只用于观察生命周期顺序。

## 理论讲解

### 1. 组件生命周期不是最精确的 Effect 模型

传统描述：

```text
mount
update
unmount
```

对理解组件还可以，但对 Effect 容易产生误导。

Effect 更关心的是一段独立同步过程：

```text
开始同步
停止同步
```

### 2. Reactive Value 变化会启动新同步

例如：

```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();

  return () => connection.disconnect();
}, [roomId]);
```

当 `roomId` 从 `general` 变成 `music`：

```text
disconnect general
connect music
```

而不是让旧连接和新连接同时存在。

### 3. Cleanup 对应的是当前这一次 Setup

每次 setup 都捕获当前 Render 的值。

所以 cleanup 也会清理这一次 setup 对应的值：

```text
setup(roomId = general)
cleanup(roomId = general)
setup(roomId = music)
```

### 4. 一个组件可以有多个 Effect

例如：

```text
Effect A：连接聊天室
Effect B：订阅 window resize
Effect C：控制第三方播放器
```

它们应根据各自同步对象拆分，而不是硬塞进一个大 Effect。

### 5. 设计 Effect 时先问同步对象

推荐先回答：

```text
我要和哪个外部系统同步？
什么值决定这次同步？
如何开始？
如何停止？
```

而不是先问：

```text
这个 Effect 应该 mount 时跑还是 update 时跑？
```

## 动手编码：从 0 到 1

### 第 0 步：创建房间选择器

```jsx
const [roomId, setRoomId] = useState('general');
```

### 第 1 步：创建 mock Connection

```jsx
function createConnection(roomId) {
  return {
    connect() {},
    disconnect() {},
  };
}
```

### 第 2 步：在 Effect 中启动同步

```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
}, [roomId]);
```

### 第 3 步：返回 Cleanup

```jsx
return () => {
  connection.disconnect();
};
```

### 第 4 步：切换房间观察顺序

从 `general` 切到 `music` 时，应看到旧 cleanup 先发生。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Effect 对 `roomId` 的同步生命周期。
- **实验辅助代码**：mock connection 只负责向 Console 输出 connect/disconnect。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp117-effect-lifecycle --config ./vite.config.js
```

## 效果验证

1. 初始房间建立连接。
2. 切换房间时旧房间先 disconnect。
3. 新房间随后 connect。
4. 能说明 Effect 生命周期是 synchronization lifecycle。
5. 能解释为什么 cleanup 捕获的是旧 Render 的值。

完成后继续 **RE-KP118：挂载、依赖变化与卸载**。
