# RE-1102-006：Render vs Commit——从描述到 Host DOM

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Should  
> 类型：Render 日志 + Host MutationObserver 证据实验  
> 前置课程：[RE-1102-005：Pure Render、Idempotency 与 Render-time Mutation](../05-pure-render-idempotency-mutation/README.md)

---

## 1. 本课要解决的问题

前几课已经知道：

```text
Component Function
→ Render Output
```

但最常见的误解之一仍然是：

> “组件重新执行了，所以 DOM 一定重新改了一遍。”

这不对。

本课把两个阶段明确拆开：

```text
Render
= React 计算下一份 UI 描述

Commit
= React 把必要变化同步到 Host 环境
```

在浏览器 React DOM Renderer 中，Host 环境就是 Browser DOM。

---

## 2. 为什么本课不用 Effect 观察 Commit

`useEffect` 的完整语义属于 Module 11.07，`ref` 属于 11.08。

为了不提前侵入后续 Owner，本课使用已经学过的浏览器平台能力：

```text
MutationObserver
```

而且 Observer 放在 React Root **外部宿主代码** 中。

这样可以同时观察：

```text
Console
→ 组件 Render 何时发生

MutationObserver
→ Root 内真实 DOM 何时发生变化
```

这是一个非常清楚的证据对照。

---

## 3. 学习目标

完成本课后，你应该能够：

- 区分 Render 阶段与 Commit 阶段。
- 解释组件函数执行并不自动等于 DOM mutation。
- 使用 Console 记录 Render 证据。
- 使用 MutationObserver 记录真实 DOM mutation。
- 稳定制造“发生 Render，但 Root DOM 没变化”的实验。
- 稳定制造“发生 Render，而且文本 DOM 真正变化”的实验。
- 解释 Host-owned DOM 与 React-owned DOM 的观察边界。
- 说明 Render/Commit 表层模型与后续 Fiber/Reconciler 源码模块的关系。

---

## 4. 起始状态

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/06-render-vs-commit-host-dom
npm install
npm run dev
```

打开：

- 页面；
- DevTools Console；
- Elements。

---

## 5. 页面边界

`index.html` 中：

```html
<div id="root"></div>
<aside id="host-log"></aside>
```

边界：

```text
#root
→ React 管理

#host-log
→ 宿主实验代码管理
```

`MutationObserver` 只观察 `#root`，但把结果写到 `#host-log`。

这不会和 React 抢同一 DOM 所有权。

---

## 6. Step 1：在 React 之前建立 DOM Observer

入口先执行：

```tsx
const observer = new MutationObserver((records) => {
  // 把真实 DOM mutation 记录到 Root 外
});

observer.observe(container, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
});
```

然后才：

```tsx
createRoot(container).render(<App />);
```

因此初次挂载时，你会看到：

```text
[Commit evidence] childList ...
```

说明 Root 内真实 DOM 被创建。

---

## 7. Step 2：Render 日志来自组件函数

`App`：

```tsx
console.log(
  `[Render] App renderTick=${renderTick}, visibleCount=${visibleCount}`,
);
```

每次 React 调用 `App`，Console 都会留下证据。

注意：

```text
console.log 出现
只能证明 Component Function 被执行
```

它不能单独证明：

```text
DOM 一定变化
```

---

## 8. Step 3：制造“Render 发生，但 DOM 不变”

State：

```tsx
const [renderTick, setRenderTick] = useState(0);
const [visibleCount, setVisibleCount] = useState(0);
```

关键点：

```text
renderTick
只参与 Console 日志
不进入 JSX Render Output
```

按钮：

```tsx
setRenderTick((value) => value + 1)
```

点击后：

1. Event Handler 执行。
2. State 变化。
3. `App` 再 Render。
4. Console 出现新的 `[Render]`。
5. 但可见 JSX 结果保持相同。
6. MutationObserver 不应该记录与该操作对应的 Root DOM 内容变化。

这证明：

```text
Render Work
≠
Commit Mutation
```

---

## 9. Step 4：制造“Render + Commit”

第二个按钮：

```tsx
setVisibleCount((value) => value + 1)
```

`visibleCount` 真正进入 JSX：

```tsx
<strong>{visibleCount}</strong>
```

点击后：

```text
Event
→ Render
→ 下一份 Render Output 中数字变化
→ React 需要同步 Host Text
→ MutationObserver 记录 DOM mutation
```

这次你会同时得到两类证据。

---

## 10. 证据时间线

### Render-only 按钮

典型：

```text
[Event] request render-only update
[Render] App renderTick=1, visibleCount=0
```

但 Host Log 没有对应 Root mutation。

### Visible update 按钮

典型：

```text
[Event] request visible update
[Render] App renderTick=1, visibleCount=1
[Commit evidence] characterData ...
```

MutationObserver 回调发生在 DOM mutation 之后的浏览器微任务检查阶段，所以它是“Host DOM 已经变了”的证据，而不是 React 内部 Commit 源码钩子。

这个区别要说清楚。

---

## 11. Render 阶段第一层职责

本 Module 的课程级模型：

```text
读取当前 Props / State / Context
→ 调用组件
→ 得到 React Element / React Node
→ 形成下一份 UI Description
```

这里强调：

```text
计算
```

而不是：

```text
直接写 DOM
```

---

## 12. Commit 阶段第一层职责

当 React 判断 Host 环境需要变化时：

```text
更新文本
设置/删除属性
插入节点
删除节点
移动节点
处理其他 Host 操作
```

这些才属于浏览器可观察的 DOM mutation。

完整 DOM Renderer / Host Config 源码归 11.23，本课只建立边界。

---

## 13. 为什么“整个组件重新 Render”不代表“整个 DOM 重建”

错误心智模型：

```text
Component Function 再执行
→ innerHTML 整页覆盖
```

React 不是这样工作的。

正确第一层模型：

```text
Component 再执行
→ 得到下一份描述
→ React 协调前后描述
→ Commit 必要 Host Changes
```

Reconciliation 和 Fiber 细节以后学习。

现在只需要通过实验接受这个可观察事实：

> 组件可以重新 Render，而 MutationObserver 完全看不到 DOM mutation。

---

## 14. Failure Lab

### Failure A：把 Render 日志当 DOM 更新次数

只看：

```text
[Render]
```

然后得出“DOM 更新太多”。

这是证据不足。

需要继续看：

- Elements；
- Performance；
- Mutation/Profiler 等对应证据。

### Failure B：为了“少 Render”把 State 偷偷移到 DOM

错误方向：

```tsx
document.querySelector(...).textContent = ...
```

这重新破坏 React DOM Ownership。

### Failure C：在 Render 中写 Host Log

不要在组件函数中：

```tsx
hostLog.textContent += 'render';
```

因为那会把本来要观察的 Render 和外部 DOM side effect 混在一起。

本课 Render 只写 Console；Host DOM Log 由 Event Handler / MutationObserver 在 Root 外维护。

---

## 15. Debug 证据矩阵

| 层 | 工具 | 能证明什么 |
|---|---|---|
| Component Invocation | Console | 组件函数被调用 |
| Component Tree | React DevTools | 当前组件和 State |
| Host DOM | Elements | 当前真实 DOM |
| DOM Mutation | MutationObserver | Root 内发生了真实 DOM 修改 |

一条日志不应该承担所有结论。

---

## 16. 与后续源码课的边界

本课不讲：

```text
Fiber alternate
beginWork
completeWork
Lane
flags
commitMutationEffects
HostConfig
```

这些会在 11.22 / 11.23 进入源码。

本课先保证你已经有正确问题：

```text
什么时候只是计算？
什么时候真正写 Host？
为什么两者次数可以不同？
```

有了这些问题，读源码才有意义。

---

## 17. 本课验收

不看文档回答：

1. Render 和 Commit 分别是什么？
2. `[Render]` 日志能否证明 DOM 修改？
3. 为什么改变 `renderTick` 会重新执行组件，却可能没有 DOM mutation？
4. 为什么改变 `visibleCount` 会产生 Commit？
5. MutationObserver 是 React Commit Hook 吗？
6. 为什么把 Host Log 写在 Root 外？
7. React 重新 Render 是否等于整棵 DOM 重建？
8. Fiber/Reconciliation 的细节应该在哪个 Module 学？

实际验收：

```bash
npm run typecheck
npm run build
```

并完成两组浏览器行为实验。

---

## 18. 下一批

Module 11.02 已完成前 6 / 8。

下一批将收束：

```text
RE-1102-007
Failure Lab：错误标签、Element Mutation 与手工调用组件

RE-1102-008
Module Project：Render Model Inspector
```
