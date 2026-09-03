# RE-1101-006：Strict Mode 与第一套 Debug 基线

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Should  
> 类型：开发模式检查 + Console + React DevTools 调试实验  
> 前置课程：[RE-1101-005：整体应用与局部接入边界](../05-whole-app-vs-partial-roots/README.md)

---

## 1. 本课要解决的问题

初学 React 时，经常遇到下面的现象：

```text
“为什么组件函数打印了两次？”
“为什么 Effect setup 后立刻 cleanup，又 setup？”
“是不是 React 执行了两次业务请求？”
“删掉 StrictMode 以后就正常了，要不要直接删？”
```

这些问题不能靠背一句“开发环境会执行两次”结束。

本课建立第一套可重复使用的 Debug 基线，区分：

```text
Event Handler
Render
Commit
Effect setup
Effect cleanup
真实卸载
开发模式额外检查
生产运行
```

同时强调：

> Strict Mode 不是制造 Bug，而是用开发阶段的额外检查，让原本已经存在的不纯渲染和资源清理问题更容易暴露。

`useEffect` 的完整语义、依赖、竞态和资源生命周期归 Module 11.07。本课只使用一个最小 Effect 观察 setup / cleanup。

---

## 2. 学习目标

完成本课后，你应该能够：

- 正确在 Root 处启用 `<StrictMode>`。
- 解释开发模式额外 Render 检查的目的。
- 区分 Event 日志、Render 日志和 Effect 日志。
- 通过真实挂载/卸载观察 cleanup。
- 使用 React DevTools 查看 Props、State 和组件更新。
- 比较 `npm run dev` 与生产预览的行为。
- 判断“两次日志”是否真的代表两次网络请求或两次用户事件。
- 说明为什么删除 Strict Mode 不是修复方案。
- 建立后续 React 故障排查的固定证据顺序。

---

## 3. 起始状态

进入：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/06-strict-mode-debug-baseline
```

目录：

```text
06-strict-mode-debug-baseline/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    └── styles.css
```

安装并启动：

```bash
npm install
npm run dev
```

打开页面后，先打开浏览器 DevTools Console，再刷新一次。

---

## 4. Step 1：在 Root 处启用 Strict Mode

打开：

```text
src/main.tsx
```

核心代码：

```tsx
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

边界：

```text
React Root
└── StrictMode
    └── App
        └── DebugProbe
```

`StrictMode` 不渲染额外可见 DOM。它为内部组件树启用开发阶段的检查。

当前课程将它放在 Root 处，因此 `App` 和所有后代都在检查范围内。

---

## 5. Step 2：给不同阶段使用不同日志前缀

打开：

```text
src/App.tsx
```

`App` 函数体中的日志：

```tsx
console.log(
  `[Render] App 读取 count=${count}, showProbe=${showProbe}`,
);
```

`DebugProbe` 函数体中的日志：

```tsx
console.log(`[Render] DebugProbe 读取 count=${count}`);
```

事件处理函数中的日志：

```tsx
function increment() {
  console.log('[Event] 用户请求 count + 1');
  setCount((current) => current + 1);
}
```

最小 Effect：

```tsx
useEffect(() => {
  console.log('[Effect setup] DebugProbe 连接外部资源（演示）');

  return () => {
    console.log('[Effect cleanup] DebugProbe 断开外部资源（演示）');
  };
}, []);
```

统一前缀的价值：

```text
[Event]
[Render]
[Effect setup]
[Effect cleanup]
```

当日志很多时，先按执行阶段分类，比只看日志数量更重要。

---

## 6. 实验一：刷新开发页面

执行：

```bash
npm run dev
```

打开 Console 后刷新页面。

在 Root 启用 Strict Mode 的开发环境中，应观察到类似序列：

```text
[Render] App ...
[Render] App ...
[Render] DebugProbe ...
[Render] DebugProbe ...
[Effect setup] ...
[Effect cleanup] ...
[Effect setup] ...
```

具体 DevTools 展示顺序和日志样式可能受浏览器、Fast Refresh 与 React DevTools 设置影响，但核心观察是：

- Render 相关纯函数会被额外调用；
- Effect 会经历额外 setup + cleanup 检查；
- 这些检查只用于开发；
- 页面最终只保留一次真实提交结果。

不要从“两次 Render 日志”直接推出“DOM 插入了两份”。

---

## 7. 实验二：点击 count + 1

操作：

1. 清空 Console。
2. 点击一次 `count + 1`。
3. 观察 Event 日志数量。
4. 观察 Render 日志数量。
5. 查看页面计数。

预期：

```text
[Event] 用户请求 count + 1
```

只来自一次真实用户点击。

随后可能看到额外 Render 调用，但页面计数只从：

```text
0 → 1
```

不是：

```text
0 → 2
```

这说明要区分：

```text
事件处理函数执行次数
≠
组件函数在开发检查中的调用次数
≠
最终 DOM 变化次数
```

事件处理函数不会因为 Strict Mode 的纯渲染检查而自动执行两次。

---

## 8. 实验三：真实卸载 DebugProbe

点击：

```text
卸载 DebugProbe
```

这次不是开发模式模拟，而是 State 导致组件从树中消失。

预期：

```text
showProbe
true → false

DebugProbe
从 Component Tree 中移除

Effect cleanup
执行真实卸载清理
```

再次点击“重新挂载 DebugProbe”时，会重新建立组件实例及 Effect 生命周期。

这可以帮助区分：

```text
Strict Mode 的额外 setup/cleanup 检查
与
用户操作造成的真实 mount/unmount
```

---

## 9. Step 4：使用 React DevTools

### Components 面板

找到：

```text
App
└── DebugProbe
```

选中 `App`，观察：

```text
count
showProbe
```

选中 `DebugProbe`，观察：

```text
Props
└── count
```

点击 `count + 1` 后，确认：

- App State 改变；
- DebugProbe Props 改变；
- DOM 文本最终更新为新值。

### Highlight updates

在 React DevTools 设置中开启更新高亮，再点击按钮。

高亮表示 React 提交到页面的组件区域，不等于组件函数只执行了一次。

### 日志变暗

React DevTools 可能把第二次开发检查产生的 Console 日志显示得更淡，也可能提供抑制重复日志的设置。不要把 UI 样式当成执行证据，仍然按日志前缀和操作时间线判断。

---

## 10. Step 5：比较生产预览

先构建：

```bash
npm run build
```

再启动生产预览：

```bash
npm run preview
```

打开预览地址并刷新 Console。

预期：

- 开发阶段的 Strict Mode 额外检查不再运行；
- 一次初始挂载不会出现同样的额外 Render 与 Effect 检查序列；
- 用户功能与最终 UI 应保持一致。

这一步用于证明：

```text
Strict Mode extra checks
= development-only diagnostic behavior
```

但不要因此只测试生产版本。开发检查存在的目的就是提前暴露生产中可能变成真实故障的问题。

---

## 11. 为什么 Strict Mode 会检查纯渲染

React 期望组件对于同一组输入：

```text
Props
State
Context
```

返回一致的 Render Output。

错误示例：

```tsx
function ImpureList({ items }: { items: string[] }) {
  items.push('临时项');
  return <p>{items.length}</p>;
}
```

它直接修改 Props 数组。同一函数再次执行时，结果会继续增长。

Strict Mode 的额外 Render 可以让这类问题更快显现。

正确方向：

```tsx
const nextItems = [...items, '临时项'];
```

不要在 Render 中修改外部对象、全局变量、Props 或 DOM。

---

## 12. 为什么 Strict Mode 会检查 Effect cleanup

假设 Effect 建立：

- WebSocket；
- Event Listener；
- Timer；
- 第三方实例；
- Observer；
- 外部订阅。

只有 setup 没有 cleanup：

```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);
```

重新挂载、依赖变化或页面切换后，旧资源可能继续存在。

正确结构：

```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

本课只观察这个生命周期。依赖数组、闭包、竞态和取消会在 Effect Owner Module 完整学习。

---

## 13. Wrong Way

### 13.1 看到两次日志就删除 Strict Mode

这只会隐藏证据，不会让不纯渲染、重复订阅或缺少 cleanup 自动正确。

### 13.2 用全局变量阻止 Effect 第二次运行

```tsx
let hasRun = false;
```

这可能掩盖生命周期错误，并且会破坏多组件实例、热更新和真实重新挂载。

### 13.3 把 Render 日志当成 Commit 次数

组件函数可以执行，但最终没有对应 DOM 变化。后续 Fiber 和 Concurrent Rendering 中这种区别更重要。

### 13.4 在 Render 中调用 Setter

```tsx
function App() {
  setCount(1);
  return ...;
}
```

这会在 Render 阶段安排更新，可能形成循环。事件更新应放在事件处理函数；外部同步放在正确 Effect 边界。

### 13.5 只靠 Console 猜性能

Console 是调试入口，不是完整性能证据。性能 Owner Module 会使用 Profiler、Performance、RUM 和基线对照。

---

## 14. 第一套故障排查顺序

以后遇到“组件执行异常”时，先记录：

```text
1. 当前是 development 还是 production？
2. Root 是否启用了 StrictMode？
3. 日志来自 Event、Render、Effect 还是 cleanup？
4. 用户实际操作了几次？
5. State 从什么值变成什么值？
6. DOM 最终提交了什么？
7. 是否发生 Fast Refresh、真实卸载或路由切换？
8. 外部资源是否有对称 cleanup？
```

不要只截图两条相同日志就下结论。

---

## 15. 本课验收

不看文档回答：

1. Strict Mode 会不会渲染一个真实 DOM 元素？
2. 为什么开发环境可能额外调用组件函数？
3. Event Handler 会因为 Strict Mode 自动执行两次吗？
4. Render 两次是否表示 DOM 一定更新两次？
5. Effect 的 setup/cleanup 检查在找什么问题？
6. 如何区分模拟检查和真实卸载？
7. 为什么生产预览与开发模式日志不同？
8. 为什么删除 Strict Mode 不是修复？

实际验收：

- 能在 Console 标出 Event、Render、Effect setup、cleanup。
- 能用 React DevTools 查看 `App` State 与 `DebugProbe` Props。
- 能卸载和重新挂载 `DebugProbe`。
- 能比较开发与生产预览。
- `npm run typecheck` 成功。
- `npm run build` 成功。

---

## 16. 官方参考

- React StrictMode：<https://react.dev/reference/react/StrictMode>
- React Render and Commit：<https://react.dev/learn/render-and-commit>
- React Developer Tools：<https://react.dev/learn/react-developer-tools>

---

## 17. 下一课

下一课主动制造两类典型故障：重复保存派生 State，以及越过 React 直接修改它管理的 DOM：

[RE-1101-007：Failure Lab——重复状态与 DOM 逃生](../07-failure-lab-duplicate-state-dom-escape/README.md)
