# RE-KP096：React 19 Ref Cleanup

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 React 19 支持 Callback Ref 返回 cleanup function。
2. 理解 cleanup 会在 Ref 被 detach 时执行。
3. 能用 setup / cleanup 对称管理与 DOM Node 绑定的资源。
4. 理解返回 cleanup 后，React 不再需要通过 `callback(null)` 完成这一次 detach 清理。
5. 知道为了向后兼容，没有返回 cleanup 的 Callback Ref 目前仍可能在 detach 时收到 `null`。
6. 知道 StrictMode 开发环境会额外执行一次 setup + cleanup 检查。

> **本节核心代码**：`ref={node => { ...; return () => { ... }; }}`。
>
> **实验辅助代码**：显示/隐藏 Input 的按钮与 Console 日志用于观察 attach / cleanup 生命周期。

## 理论讲解

### 1. React 19 以前常见的 Callback Ref 清理

典型写法：

```jsx
ref={node => {
  if (node) {
    // attach
  } else {
    // detach
  }
}}
```

也就是 React 在卸载时再次调用：

```js
callback(null)
```

### 2. React 19 新增 cleanup function

现在可以写：

```jsx
ref={node => {
  console.log('attach', node);

  return () => {
    console.log('cleanup');
  };
}}
```

语义和 Effect 很像：

```text
setup
  ↓
node attached
  ↓
cleanup
  ↓
node detached
```

### 3. cleanup 适合什么

如果 Ref Callback 在节点 attach 时建立了资源：

- 注册原生事件监听。
- 建立 Observer。
- 把节点加入外部 Registry。
- 与第三方 DOM 库建立实例关系。

那么 cleanup 应撤销它。

### 4. 本节为什么只做轻量 DOM 标记

为了避免提前混入大型外部 API，本节只做：

```js
node.dataset.refStatus = 'attached';
```

cleanup 时删除：

```js
delete node.dataset.refStatus;
```

同时在 Console 打印生命周期。

### 5. StrictMode 开发期额外检查

当前 React 文档说明，在 StrictMode 下会有一次额外的开发期 setup + cleanup cycle。

因此学习时可能看到：

```text
attach
cleanup
attach
```

这不是生产环境重复挂载的业务语义，而是在检查 cleanup 是否真的和 setup 对称。

### 6. 不要把 Cleanup 当作卸载通知业务系统的万能钩子

Ref Cleanup 应围绕：

```text
这个 Ref Callback 建立的节点级资源
```

进行对称释放。

业务网络请求、副作用生命周期通常属于 Effect 等更合适的边界。

## 动手编码：从 0 到 1

### 第 1 步：创建条件渲染

```jsx
const [showInput, setShowInput] = useState(true);
```

### 第 2 步：写 Callback Ref

```jsx
function attachInput(node) {
  console.log('ref setup:', node);
  node.dataset.refStatus = 'attached';

  return () => {
    console.log('ref cleanup:', node);
    delete node.dataset.refStatus;
  };
}
```

### 第 3 步：绑定 Ref

```jsx
{showInput && <input ref={attachInput} />}
```

### 第 4 步：切换节点存在状态

```jsx
<button onClick={() => setShowInput(show => !show)}>
  Toggle Input
</button>
```

### 第 5 步：观察生命周期

节点出现：

```text
setup
```

节点离开 Render Tree：

```text
cleanup
```

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

打开浏览器 Console，然后：

1. 初始页面观察 setup 日志。
2. 点击“Hide Input”。
3. 观察 cleanup 日志。
4. 点击“Show Input”。
5. 再次观察 setup。

如果启用 StrictMode，开发环境还可能有额外的 setup / cleanup 检查循环。

## 效果验证

本节后应建立：

```text
Callback Ref 可以建立节点级资源
React 19 可以直接 return cleanup
cleanup 必须撤销 setup
```

这使 Ref Callback 的生命周期表达更加对称。
