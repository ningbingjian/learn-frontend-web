# RE-KP189：Activity visible/hidden 模式

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 准确解释 `visible` 与 `hidden` 两种 Activity mode。
2. 理解 hidden 时 DOM 被视觉隐藏，而 Effect 会执行 cleanup。
3. 理解恢复 visible 时 Effect 会重新 setup。
4. 知道 hidden 树的 State 可以保存，但活跃订阅不应继续占用资源。
5. 理解为什么 Activity 对 Effect cleanup 正确性有更高要求。

> **本节核心代码**：Activity mode 切换 + Effect `setup/cleanup` 对称资源管理。
>
> **实验辅助代码**：`setInterval` 只用于让 Effect 的停止与恢复更容易观察。

## 理论讲解

### 1. visible

```jsx
<Activity mode="visible">
  <Panel />
</Activity>
```

子树正常显示，Effects 正常挂载，更新按正常优先级处理。

### 2. hidden

```jsx
<Activity mode="hidden">
  <Panel />
</Activity>
```

React 会隐藏对应 UI，并清理子树中的 Effects。

从 Effect 的视角理解 hidden 很重要：可以把它“概念上”看作暂时卸载，但 React 仍保存子树 State，等待以后恢复。

### 3. 为什么要 cleanup Effect

如果一个隐藏页面仍然维持：

- WebSocket；
- window 事件监听；
- timer；
- 第三方订阅；

它就会在用户看不到 UI 时继续消耗资源。

Activity hidden 会主动 cleanup Effects，正是为了避免这种后台副作用。

### 4. 本课为什么不使用 StrictMode

StrictMode 在开发环境还会额外做一轮 Effect setup/cleanup 压力测试。为了把“Activity mode 切换”这一变量单独观察，本课刻意不包 StrictMode；StrictMode 的对应行为已经在 RE-KP185 学过。

## 动手编码：从 0 到 1

### 第 1 步：创建一个带 timer 的子组件

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setTicks(value => value + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

目标：让 Effect 是否运行具备可见结果。

### 第 2 步：增加 Console 时间线

```jsx
console.log('setup: start activity timer');
return () => {
  console.log('cleanup: stop activity timer');
  clearInterval(id);
};
```

### 第 3 步：切换 Activity mode

```jsx
<Activity mode={mode}>
  <LivePanel />
</Activity>
```

预期：hidden 时 timer 停止；visible 时 Effect 重新建立。

## 运行案例

```bash
npm run dev
```

打开：

```text
/19-built-in-components-fragment-strictmode-profiler-suspense-activity/kp189-activity-visible-hidden/
```

打开 Console，然后反复切换 visible/hidden。

## 效果验证

应观察到：

1. visible：出现 `setup`，秒数持续增加。
2. hidden：出现 `cleanup`，面板消失，timer 停止。
3. 再次 visible：重新出现 `setup`。
4. State 不因 hidden 被普通卸载，秒数从之前值继续。

最终源码：[`src/main.jsx`](./src/main.jsx)
