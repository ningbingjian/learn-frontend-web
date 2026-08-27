# RE-KP039：原生 DOM 事件与 React 事件的边界

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 JSX 的 React Event Handler 与原生 DOM `addEventListener()`。
2. 知道 React 管理的 UI 交互通常优先使用 JSX 事件 Props。
3. 知道和 React 树之外的 DOM、第三方库或底层浏览器 API 集成时，可能需要原生事件。
4. 能从同一页面同时观察 React Event Object 与浏览器原生 `MouseEvent`。
5. 知道真实组件生命周期内注册原生监听器时需要清理；完整模式后续会结合 Effect / Ref 学习。

> **本节核心代码**：React `onClick={handler}` 与浏览器 `addEventListener('click', handler)` 的对照。  
> **实验辅助代码**：React root 外的原生按钮和 HMR 防重复绑定代码仅用于边界实验。

## 理论讲解

### 1. React 事件优先服务 React 树

React 组件中最常见：

```jsx
<button onClick={handleClick}>保存</button>
```

它的优势是：

```text
事件 API 和组件树放在一起
Props 可以传递 Handler
与 React 渲染模型一致
```

对于普通业务按钮，不需要为了“更底层”改写成 `querySelector + addEventListener`。

### 2. 原生事件仍然存在

浏览器本身提供：

```js
node.addEventListener('click', handleClick);
```

常见边界场景包括：

- React root 外的已有 DOM。
- 第三方组件或老系统节点。
- `window` / `document` 级事件。
- 需要直接接入某些浏览器 API。

所以两套 API 不是“React 出现以后 native event 就不用了”。

### 3. 事件对象不同

React Handler：

```text
React Event Object
  └─ nativeEvent
```

原生 `addEventListener` Handler：

```text
DOM Event / MouseEvent
```

本课会在同一页面分别打印它们。

### 4. 为什么不能在组件 Render 里随便 `addEventListener`

如果每次 Render 都执行：

```js
node.addEventListener(...)
```

就可能重复注册监听器。

真实组件需要考虑：

```text
何时注册
何时移除
目标 DOM 是否已经存在
组件卸载时如何 cleanup
```

这些问题会在 Effect、Ref 专章系统解决。

本课为了不提前混入 Effect，只把原生按钮放在 React root 外，并在模块初始化阶段做一个独立实验绑定。

## 动手编码：从 0 到 1

### 第 0 步：准备两个区域

`index.html` 中放：

```html
<button id="native-button">原生 DOM 按钮</button>
<div id="root"></div>
```

第一个按钮在 React root 外；第二部分交给 React。

### 第 1 步：给原生按钮绑定 `addEventListener`

```js
const nativeButton = document.getElementById('native-button');

function handleNativeClick(event) {
  console.log('[native]', event.constructor.name);
}

nativeButton.addEventListener('click', handleNativeClick);
```

### 第 2 步：React 中使用 `onClick`

```jsx
function App() {
  function handleReactClick(event) {
    console.log('[react]', event.constructor.name);
  }

  return <button onClick={handleReactClick}>React 按钮</button>;
}
```

### 第 3 步：分别打印底层事件

React Handler 中再观察：

```js
event.nativeEvent.constructor.name
```

你会看到 React Event Object 仍然能够指向底层浏览器事件。

### 第 4 步：避免开发热更新重复绑定

本案例会记住上一次实验 Handler，并在重新绑定前先移除：

```js
if (window.__kp039NativeHandler) {
  nativeButton.removeEventListener('click', window.__kp039NativeHandler);
}
```

这只是为了让 Vite 开发环境中的实验更稳定，不是推荐的组件生命周期管理方式。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React `onClick` 与 DOM `addEventListener` 的边界。
- **实验辅助代码**：React root 外按钮和全局临时 Handler 只为防止 HMR 重复绑定。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp039-react-vs-native-dom-events --config ./vite.config.js
```

分别点击页面上的“原生 DOM 按钮”和“React 按钮”，观察 Console。

## 效果验证

1. 能说清普通 React UI 为什么优先使用 JSX Handler。
2. 能看到原生按钮 Handler 直接收到浏览器事件。
3. 能看到 React Handler 收到 React Event Object，并可通过 `nativeEvent` 访问底层事件。
4. 能举出必须接触原生 DOM 事件的真实边界场景。
5. 知道组件内部注册 native listener 需要生命周期清理，后续会用 Effect / Ref 系统解决。

完成后继续 **RE-KP040：事件处理中的异步逻辑**。
