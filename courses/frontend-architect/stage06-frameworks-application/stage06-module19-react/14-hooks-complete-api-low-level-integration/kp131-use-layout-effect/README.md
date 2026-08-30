# RE-KP131：useLayoutEffect

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useLayoutEffect` 在 DOM Commit 后、浏览器 Paint 前运行。
2. 会使用 DOM Ref + `getBoundingClientRect()` 做布局测量。
3. 理解 Layout Effect 中的代码和同步 State 更新会阻塞浏览器绘制。
4. 知道大多数场景应优先 `useEffect`，只有必须在 Paint 前完成的视觉工作才考虑 `useLayoutEffect`。
5. 理解服务器端没有真实布局，因此 Layout Effect 是客户端能力。

> **本节核心代码**：DOM 已存在后通过 `useLayoutEffect` 测量卡片高度，并在浏览器显示首帧前完成基于测量结果的第二次 Render。  
> **实验辅助代码**：宽度滑块与 textarea 用于持续改变布局，方便观察测量结果。

## 理论讲解

### 1. useLayoutEffect 的时机

普通 Render 不能读取“刚刚渲染出来的 DOM 的真实尺寸”，因为 Render 阶段应该保持纯净，而且此时新的 DOM 还没有完成 Commit。

`useLayoutEffect` 的关键时间线：

```text
Render
→ Commit DOM
→ useLayoutEffect
→ 必要时同步 setState 再 Render / Commit
→ Browser Paint
```

这就是它能做“先测量、再决定最终布局、用户只看到最终画面”的原因。

### 2. 典型场景：测量布局

```jsx
const ref = useRef(null);
const [height, setHeight] = useState(0);

useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setHeight(rect.height);
}, []);
```

常见用途包括：

- tooltip / popover 定位；
- 在 Paint 前读取尺寸并修正位置；
- 某些需要避免视觉跳动的布局集成。

### 3. 为什么不是所有 Effect 都换成 Layout Effect

`useLayoutEffect` 会阻塞 Paint。

如果在里面做昂贵计算、网络请求、大量同步 State 更新，用户会更晚看到页面。

所以默认原则是：

```text
能用 useEffect → 用 useEffect
必须在 Paint 前完成视觉测量/修正 → useLayoutEffect
```

### 4. 它仍然遵守 Effect 的依赖规则

```jsx
useLayoutEffect(() => {
  // 读取了 width 和 text 对应 DOM
}, [width, text]);
```

依赖数组仍然由实际读取的 Reactive Value 决定，不能通过空数组强行模拟生命周期。

### 5. 服务端没有布局

SSR 阶段没有浏览器 Layout Engine，`getBoundingClientRect()` 没有可读的真实页面几何信息。

因此依赖 Layout Effect 决定首屏布局的组件需要认真考虑客户端边界或可接受的 fallback。

## 动手编码：从 0 到 1

### 第 0 步：准备可变化的卡片

```jsx
function MeasuredCard() {
  const [width, setWidth] = useState(280);
  const [text, setText] = useState('React layout measurement');
}
```

### 第 1 步：创建 DOM Ref

```jsx
const cardRef = useRef(null);
```

绑定到真实节点：

```jsx
<div ref={cardRef}>...</div>
```

### 第 2 步：保存测量结果

```jsx
const [height, setHeight] = useState(0);
```

高度参与 UI 展示，因此它是 State，而不是 Ref。

### 第 3 步：Paint 前测量

```jsx
useLayoutEffect(() => {
  const rect = cardRef.current.getBoundingClientRect();
  setHeight(Math.round(rect.height));
}, [width, text]);
```

### 第 4 步：改变宽度和内容

宽度变窄或文字变多，会改变换行和真实高度。

### 第 5 步：观察同步测量结果

页面显示：

```text
Measured height: N px
```

每次布局输入改变后都会更新。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useLayoutEffect + DOM Ref + getBoundingClientRect()`。
- **实验辅助代码**：滑块和 textarea 用于制造不同布局。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp131-use-layout-effect --config ./vite.config.js
```

## 效果验证

1. 调整卡片宽度后，高度测量会随换行变化。
2. 修改文字内容后，真实 DOM 高度会重新测量。
3. 能说明为什么测量不能放在 Render 中。
4. 能画出 Render → Commit → Layout Effect → Paint 的时序。
5. 能解释为什么不应把所有 `useEffect` 机械替换成 `useLayoutEffect`。

完成后继续 **RE-KP132：useEffect 与 useLayoutEffect 的选择**。
