# RE-1102-005：Pure Render、Idempotency 与 Render-time Mutation

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Should  
> 类型：纯渲染 + Strict Mode 故障实验  
> 前置课程：[RE-1102-004：JSX Expression、Fragment、Conditional 与 Empty Node](../04-jsx-expression-fragment-empty-node/README.md)

---

## 1. 本课要解决的问题

React 组件是 JavaScript 函数，但不代表组件函数体里“什么都能做”。

一个非常重要的边界是：

> Render 阶段应该尽量只根据当前输入计算 Render Output，而不是在计算过程中修改外部世界。

本课要回答：

- 什么叫 Pure Render？
- 什么叫 Idempotency？
- 为什么读取并修改模块级变量、数组、DOM、随机值会让 Render 难以推理？
- Strict Mode 为什么会让这类问题更明显？
- 为什么“生产环境只执行一次”也不能证明不纯 Render 是正确的？

---

## 2. 学习目标

完成本课后，你应该能够：

- 把 React Render 理解为“计算 UI 描述”的阶段。
- 解释同一组输入应产生可预测输出的原因。
- 区分读取 immutable input 与修改 external mutable value。
- 稳定复现 render-time mutation。
- 使用 Strict Mode 暴露依赖调用次数的错误逻辑。
- 解释 `Date.now()`、`Math.random()`、DOM 写入等为什么会破坏可重复计算。
- 将外部写操作从 Render 中移出。
- 说明纯渲染与 React 可重试、可放弃、可重复执行 Render 工作之间的关系。

---

## 3. 起始状态

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/05-pure-render-idempotency-mutation
npm install
npm run dev
```

打开 Console，保留日志。

---

## 4. 先定义 Pure Function

普通纯函数示例：

```ts
function buildSummary(completed: number, total: number) {
  const remaining = total - completed;
  return {
    remaining,
    ready: remaining === 0,
  };
}
```

对于相同参数：

```ts
buildSummary(3, 5)
buildSummary(3, 5)
```

你期望得到语义相同的结果。

它没有：

```text
修改外部数组
修改全局变量
写 DOM
发请求
启动定时器
```

这是一种容易推理的计算。

---

## 5. React Render 的第一层纯度模型

先建立课程级模型：

```text
Props / State / Context
        ↓
Component Function
        ↓
Render Output
```

在 Render 过程中，组件应该把当前输入当作只读事实。

这里先不深入 Concurrent Rendering 实现，但要知道：

```text
React 可能调用组件函数
→ 得到 Render Output
→ 因为开发检查、优先级或其他原因再次计算
```

因此代码不能依赖：

> “这个函数在每次用户操作中绝对只执行一次”。

---

## 6. Step 1：正确版本——只读取基线数据

源码：

```tsx
const baselineChecks = [
  'Schema validated',
  'Traffic budget checked',
];

function PurePreview() {
  const visibleChecks = [...baselineChecks, 'Render preview'];

  return <strong>{visibleChecks.length}</strong>;
}
```

这里虽然创建了新数组，但没有修改 `baselineChecks`。

每次 Render：

```text
baselineChecks.length = 2
visibleChecks.length = 3
```

输入不变时，输出稳定。

---

## 7. Step 2：错误版本——Render 中修改外部数组

本课故意写：

```tsx
const sharedMutableChecks = [
  'Schema validated',
  'Traffic budget checked',
];

function ImpurePreview() {
  sharedMutableChecks.push('Render wrote here');

  return <strong>{sharedMutableChecks.length}</strong>;
}
```

第一次调用可能：

```text
2 → 3
```

再次调用：

```text
3 → 4
```

这意味着：

```text
同一组件
同一外部输入
只因为 Render 被再次调用
结果就不同
```

这是典型 render-time mutation。

---

## 8. Step 3：用 Strict Mode 放大问题

入口：

```tsx
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

开发环境中 React 会对部分纯度问题进行额外检查，包括额外调用组件函数。

因此 Console 可能看到：

```text
[Render] PurePreview
[Render] PurePreview
[Render] ImpurePreview
[Render] ImpurePreview
```

纯组件：

```text
每次都计算同一个逻辑结果
```

不纯组件：

```text
每次执行都继续污染 sharedMutableChecks
```

页面最终可能直接暴露“为什么第一次打开就已经比预期多”的异常。

---

## 9. Step 4：手动触发新的 Render

本课 `App` 有一个：

```tsx
const [renderTick, setRenderTick] = useState(0);
```

按钮：

```tsx
<button onClick={() => setRenderTick((value) => value + 1)}>
  请求父组件再 Render
</button>
```

`renderTick` 的完整 State Queue 机制归 11.04，本课只把它作为“再次发生 Render”的触发器。

每点一次：

```text
App 再执行
→ PurePreview 再执行
→ ImpurePreview 再执行
```

观察：

- Pure Preview 始终报告稳定值。
- Impure Preview 持续增长。

这就是可重复实验，而不是理论口号。

---

## 10. 为什么 `Math.random()` 也有问题

错误：

```tsx
function Badge() {
  return <span>{Math.random()}</span>;
}
```

相同输入，两次 Render 得到不同输出。

问题不是随机数 API “不能用”，而是：

> 随机事实的产生不应该偷偷发生在一个要求可重复计算的 Render 中。

类似还有：

```tsx
Date.now()
crypto.randomUUID()
++globalCounter
array.push(...)
document.title = ...
```

不同 API 的正确归属后续会在 State、Effect、Ref 等 Owner Module 学习。

---

## 11. 为什么 DOM 写入不能放 Render

错误：

```tsx
function App() {
  document.title = 'Release Console';
  return <main>...</main>;
}
```

这段代码在“计算 UI 描述”的同时修改了外部系统。

它把：

```text
Render Calculation
```

和：

```text
External Side Effect
```

混成了一个阶段。

当 React 重复、放弃或重新执行 Render 工作时，外部写入已经无法被“撤销成没发生过”。

---

## 12. Pure 不代表什么

### Pure 不代表永远没有新对象

```tsx
const next = [...items]
```

创建新值不等于副作用。

### Pure 不代表组件永远输出同样 UI

State / Props 不同，输出当然可以不同。

### Pure 不代表不能调用函数

可以调用纯计算函数。

### Pure 不代表 React 应用没有副作用

真实应用当然需要请求、订阅、DOM 集成、日志等。

关键是：

> 不要把这些不可重复的外部操作塞进 Render 计算本身。

---

## 13. Idempotency 的课程级理解

这里不用数学定义过度复杂化。

在 React Render 心智模型中，你至少要能保证：

```text
同一组输入
→ 多次执行 Render 计算
→ 不因为“执行次数”本身污染业务数据或外部世界
```

如果第二次调用只是因为 React 想重新验证，却导致订单数组多一条、请求多发送一次、DOM 被额外改一次，这种代码就不可安全重算。

---

## 14. Failure Lab

### Failure A：外部数组 push

已内置在 `ImpurePreview`。

观察第一次加载和每次点击后的长度。

### Failure B：取消 Strict Mode

临时去掉 `<StrictMode>`。

你可能发现“增长没那么快”。

但这不是修复。

因为：

```text
sharedMutableChecks 仍然会在每次真实 Render 时增长
```

Strict Mode 只是更早暴露它。

### Failure C：改成局部新数组

把：

```tsx
sharedMutableChecks.push(...)
```

改为：

```tsx
const visibleChecks = [...sharedMutableChecks, 'Render preview'];
```

但如果 `sharedMutableChecks` 已经被污染，你还需要先恢复正确 Source of Truth。

---

## 15. Debug 证据矩阵

| 证据 | PurePreview | ImpurePreview |
|---|---|---|
| Console 多次 Render | 可能 | 可能 |
| 外部数组变化 | 不变 | 持续增长 |
| 相同输入输出稳定 | 是 | 否 |
| Strict Mode 是否只是暴露问题 | 是 | 是 |

重点：

> Render 日志多不是 Bug；Render 引起了不该发生的外部变化才是问题。

---

## 16. Wrong Way

- 为了消除两次日志而删除 Strict Mode。
- 使用 `let hasRendered = false` 屏蔽第二次执行。
- 把模块级变量当成组件私有 State。
- 在 Render 中直接发请求、写 DOM、注册监听器。
- 认为生产环境调用次数少，所以不纯代码就安全。

---

## 17. 本课验收

不看文档回答：

1. Pure Render 的第一层定义是什么？
2. 创建新数组为什么不一定是不纯？
3. 修改模块级数组为什么是不纯？
4. Strict Mode 为什么会更容易暴露这类问题？
5. 删除 Strict Mode 是否修复了 mutation？
6. `Math.random()` 为什么会破坏相同输入下的可预测输出？
7. DOM 写入为什么不属于 Render 计算？
8. React 为什么需要允许 Render 被重复执行？

实际验收：

```bash
npm run typecheck
npm run build
```

---

## 18. 下一课

下一课继续沿着这个边界向下：

> 组件函数已经执行完了，为什么浏览器 DOM 仍然可能完全没变化？

[RE-1102-006：Render vs Commit——从描述到 Host DOM](../06-render-vs-commit-host-dom/README.md)
