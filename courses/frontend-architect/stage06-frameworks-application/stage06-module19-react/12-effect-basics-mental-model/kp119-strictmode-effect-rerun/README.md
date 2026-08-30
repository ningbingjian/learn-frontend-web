# RE-KP119：StrictMode 下 Effect 重新执行

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 知道 StrictMode 会在开发环境对 Effect 做额外 setup + cleanup 检查。
2. 理解目的不是制造重复副作用，而是发现 cleanup 不完整。
3. 能写出对称的 `addEventListener` / `removeEventListener`。
4. 不通过删除 StrictMode 或 `useRef` 门闩掩盖资源泄漏。
5. 明确生产环境不会因为 StrictMode 而执行这次额外压力测试。

> **本节核心代码**：window `resize` 监听器的 setup / cleanup 完全对称。  
> **实验辅助代码**：Console 日志让开发期额外检查可见。

## 理论讲解

### 1. 为什么开发环境会多一轮

在 StrictMode 中，React 会在第一次真实 setup 之前做一次额外的开发期检查：

```text
setup (development check)
cleanup (development check)
setup (real synchronization)
```

这是压力测试。

### 2. 目标是验证 cleanup 能否撤销 setup

如果：

```jsx
window.addEventListener('resize', handleResize);
```

却没有：

```jsx
window.removeEventListener('resize', handleResize);
```

开发期额外执行会更快暴露重复订阅问题。

### 3. 正确代码应该看不出“多执行”的业务差异

如果 setup / cleanup 对称，那么：

```text
setup → cleanup → setup
```

与用户最终只拥有一份有效订阅的结果一致。

### 4. 不要关闭 StrictMode 来“修复”问题

删除 StrictMode 只是隐藏检查。

真正应该修复的是：

```text
连接没有断开
订阅没有取消
计时器没有清理
DOM 第三方实例没有销毁
```

### 5. 不要用 didRun Ref 欺骗检查

`didRun.current` 只会让第二次 setup 被跳过，却不会让组件真正支持未来的卸载和重新挂载。

## 动手编码：从 0 到 1

### 第 0 步：创建宽度 State

```jsx
const [width, setWidth] = useState(window.innerWidth);
```

### 第 1 步：定义 resize handler

```jsx
function handleResize() {
  setWidth(window.innerWidth);
}
```

### 第 2 步：订阅窗口事件

```jsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);
```

### 第 3 步：补齐 Cleanup

```jsx
return () => {
  window.removeEventListener('resize', handleResize);
};
```

### 第 4 步：加入日志

开发模式下观察额外 setup / cleanup。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp119-strictmode-effect-rerun --config ./vite.config.js
```

## 效果验证

1. 开发模式 Console 能看到 StrictMode 的额外检查。
2. 实际窗口只保留一份有效 resize 监听。
3. 调整窗口宽度，页面正常更新。
4. 能解释这是 dev-only stress test。
5. 能说明为什么正确 cleanup 比关闭 StrictMode 更重要。

完成后继续 **RE-KP120：为什么开发环境看起来执行两次**。
