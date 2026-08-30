# RE-KP132：useEffect 与 useLayoutEffect 的选择

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“是否必须阻止浏览器 Paint”判断 `useEffect` 与 `useLayoutEffect`。
2. 理解普通外部系统同步默认使用 `useEffect`。
3. 理解视觉测量/定位如果必须在用户看到前完成，可以使用 `useLayoutEffect`。
4. 知道 `useLayoutEffect` 会阻塞 Paint，因此性能成本更高。
5. 避免根据“哪个更早”机械升级所有 Effect。

> **本节核心代码**：同一组件中 `useEffect` 同步 `document.title`，`useLayoutEffect` 测量 DOM 宽度，职责按时机与视觉要求拆分。  
> **实验辅助代码**：宽度输入用于持续制造布局变化。

## 理论讲解

### 1. 默认选择：useEffect

如果工作不要求在 Paint 前完成，例如：

- 网络连接；
- 浏览器事件订阅；
- `document.title` 等非布局关键同步；
- 日志、分析、第三方非视觉系统；

通常使用：

```jsx
useEffect(() => {
  document.title = title;
}, [title]);
```

这样 React 通常可以先让浏览器绘制，再进行外部同步。

### 2. 特殊选择：useLayoutEffect

如果流程是：

```text
必须先拿到真实 DOM 几何信息
→ 根据测量值修正最终视觉结果
→ 用户不能看到中间错误位置
```

才考虑 `useLayoutEffect`。

典型例子是 tooltip 位置计算。

### 3. 核心差异不是“功能强弱”

两个 Hook 都可以执行 setup / cleanup，也都遵守 Reactive Dependency 规则。

真正重要的是 Paint：

```text
useEffect
Render → Commit → Browser may Paint → Effect

useLayoutEffect
Render → Commit → Layout Effect → Browser Paint
```

Layout Effect 阻塞绘制，所以不能因为“更早、更强”就滥用。

### 4. 选择清单

先问：

```text
这个逻辑是否同步外部系统？
```

不是：可能根本不需要 Effect。

是：继续问：

```text
如果浏览器先 Paint 一帧，用户会看到错误布局或明显闪烁吗？
```

- 不会 → `useEffect`；
- 会，而且必须在 Paint 前测量/修正 → `useLayoutEffect`。

### 5. useLayoutEffect 不能解决业务数据流问题

不要用 Layout Effect 修复：

- 派生 State；
- 用户点击流程；
- 请求竞态；
- 错误依赖；
- 普通异步逻辑。

这些问题与 Paint 时机无关。

## 动手编码：从 0 到 1

### 第 0 步：准备一个宽度 State

```jsx
const [width, setWidth] = useState(320);
```

### 第 1 步：普通同步用 useEffect

```jsx
useEffect(() => {
  document.title = `Panel ${width}px`;
}, [width]);
```

浏览器标题不需要阻塞页面 Paint。

### 第 2 步：布局测量用 DOM Ref

```jsx
const panelRef = useRef(null);
```

### 第 3 步：Paint 前读取布局

```jsx
useLayoutEffect(() => {
  const rect = panelRef.current.getBoundingClientRect();
  setMeasuredWidth(Math.round(rect.width));
}, [width]);
```

### 第 4 步：并排观察职责

调整宽度后：

- DOM 尺寸由 Layout Effect 读取；
- 页面标题由普通 Effect 同步。

### 第 5 步：不要交换只是为了“统一”

把 `document.title` 放进 Layout Effect 没有必要，只会把非关键工作提前到 Paint 前。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同组件内根据视觉时序选择两个 Effect Hook。
- **实验辅助代码**：range 输入与展示文字用于观察同步结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp132-useeffect-vs-uselayouteffect --config ./vite.config.js
```

## 效果验证

1. 改变宽度后，页面标题会同步为新宽度。
2. DOM 实际宽度由 Layout Effect 读取并展示。
3. 能说明标题同步为什么不需要阻塞 Paint。
4. 能说明布局测量为什么可能需要在 Paint 前完成。
5. 能给出“默认 useEffect，必要时才 useLayoutEffect”的判断依据。

完成后继续 **RE-KP133：useInsertionEffect 的库作者场景**。
