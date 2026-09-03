# RE-1102-003：Component 何时调用，Render Output 到底是什么

> Module：11.02 JSX、Element、Component 与 Render Output  
> 深度：Must  
> 类型：Component Invocation Timeline + Render Output 实验  
> 前置课程：[RE-1102-002：React Element](../02-react-element-description/README.md)

---

## 1. 本课要解决的问题

上一课创建：

```tsx
const componentElement = <RiskBadge level="medium" />;
```

但还有一个关键问题：

> 写出 `<ReleaseCard />` 时，`ReleaseCard()` 是不是立刻执行了？

答案：

```text
创建 Component Element
≠ 手工调用 Component Function
```

本课通过 Console 时间线证明 React 什么时候真正调用组件，以及组件调用后可以返回什么。

---

## 2. 学习目标

完成后应能够：

- 区分 Component Type、Component Element 与 Component Invocation。
- 证明创建 `<ReleaseCard />` 时组件函数还没有执行。
- 解释 React 如何根据 `element.type` 决定继续调用组件。
- 理解组件返回值属于 Render Output / React Node。
- 识别字符串、数字、Element、数组、null 等可渲染输出。
- 解释为什么 `isValidElement` 不能用于判断全部 Render Output。
- 说明为什么不能手工调用 React 组件。
- 建立 Component Render 与 DOM Commit 的第一层边界。

---

## 3. 起始状态

进入：

```bash
cd learn-frontend-web-course/stage11-react/module11-02-jsx-element-component-render-output/03-component-call-render-output
```

运行：

```bash
npm install
npm run dev
```

启动前打开浏览器 DevTools Console。

---

## 4. Step 1：创建 Element，但先不调用组件

模块顶层：

```tsx
const describedCard = (
  <ReleaseCard title="支付服务发布" status="blocked" />
);
```

紧接着：

```tsx
console.log(
  'ReleaseCard calls before root.render =',
  releaseCardCallCount,
);
```

此时预期：

```text
0
```

因为创建 Element 做的事情更接近：

```text
创建一份描述：

type = ReleaseCard
props = {
  title: ...,
  status: ...
}
```

而不是：

```tsx
ReleaseCard({...});
```

---

## 5. Step 2：root.render 以后 React 开始读取描述

入口：

```tsx
createRoot(container).render(<App />);
```

React 开始处理 `<App />`。

发现：

```text
element.type = App
```

所以在 Render 工作中调用 `App`。

`App` 的输出中又遇到 `describedCard`，React 读取：

```text
describedCard.type = ReleaseCard
```

然后才调用 `ReleaseCard(props)`。

稳定时间线：

```text
module evaluation
→ create <ReleaseCard />
→ React Element exists

root.render(<App />)
→ React calls App
→ React reaches ReleaseCard Element
→ React calls ReleaseCard
→ ReleaseCard returns Render Output
→ React continues expanding
→ later Commit host changes
```

---

## 6. 为什么“组件本质上是函数”仍然不能手工调用

Component Function 在 JavaScript 层面确实是函数。

但 React 组件不是“随便什么时候都应该直接执行的普通 helper”。

错误思路：

```tsx
const output = ReleaseCard({
  title: '支付服务发布',
  status: 'blocked',
});
```

这样绕开了 React 的组件调用协议。

今天 `ReleaseCard` 没有 Hook，表面可能返回 JSX。

明天加入：

```tsx
useState(...)
```

手工调用就会破坏 Hook 调用上下文。

更重要的是，即使没有 Hook，手工调用也会把：

```text
组件边界
DevTools 组件树
生命周期
调度边界
React 对组件身份的管理
```

全部混成普通函数展开。

正确方式：

```tsx
<ReleaseCard ... />
```

让 React 决定何时调用组件。

---

## 7. Component Type 与 Host Type

React Element 的 type 两种最重要情况：

### Host

```tsx
<section />
```

概念：

```text
type = "section"
```

React DOM 后续负责它与 DOM 的关系。

### Component

```tsx
<ReleaseCard />
```

概念：

```text
type = ReleaseCard
```

React 需要先调用这个 Component，得到下一层 Render Output。

所以组件树会不断展开：

```text
Component Element
→ Component Call
→ more Elements / Nodes
→ ...
→ Host Elements
```

---

## 8. Render Output 不只有 React Element

源码提供：

### String

```tsx
function TextOutput() {
  return '组件可以返回字符串 React Node';
}
```

### Number

```tsx
function NumberOutput() {
  return 42;
}
```

### null

```tsx
function EmptyOutput() {
  return null;
}
```

### Array

```tsx
function ArrayOutput() {
  return [
    <span key="first">A</span>,
    ' + ',
    <span key="second">B</span>,
  ];
}
```

因此：

```text
Component Render Output
```

比：

```text
React Element
```

范围更大。

这也是上一课：

```tsx
isValidElement(42) === false
```

却不代表 `42` 不能渲染的原因。

---

## 9. Array 为什么出现 key

本课数组示例给 Element 加：

```tsx
key="first"
key="second"
```

这里只是为了避免 Node 集合警告。

不要在这里提前背 Key 规则。

完整内容归：

```text
Module 11.06：List、Key 与 Identity
```

---

## 10. Component Call 与 Commit 不是同一阶段

Console 看到：

```text
[Component Call] ReleaseCard
```

只能证明组件函数执行。

它不能证明：

```text
DOM 一定新增一次
DOM 一定更新一次
浏览器一定 Paint 一次
```

React 可以：

- 调用组件计算结果；
- 发现 Host Output 没有需要提交的变化；
- 在开发检查中额外调用；
- 未来在并发渲染中暂停或丢弃 Render 工作。

所以必须先建立：

```text
Render
= 计算 UI Description

Commit
= 把必要 Host 变化提交给宿主环境
```

完整 Fiber/Commit 源码归 11.22 / 11.23。

---

## 11. Failure Lab

### A：手工调用组件

临时把：

```tsx
{describedCard}
```

改成：

```tsx
{ReleaseCard({
  title: '支付服务发布',
  status: 'blocked',
})}
```

观察 React DevTools 的 Component Tree，然后恢复。

结论：

> 不要通过手工调用组件来复用 UI。

需要复用普通计算时，把计算提取成普通函数。

### B：把组件名写成小写

错误：

```tsx
<releaseCard />
```

小写 JSX tag 被解释为 Host tag 名称，而不是变量 `releaseCard`。

自定义 React Component 必须使用大写开头。

### C：把 Render 日志当 DOM 次数

开启开发 Strict Mode 或触发 Fast Refresh 后，组件调用次数可能变化。

不要写：

```text
组件执行 2 次
所以 DOM 一定提交 2 次
```

必须去 Elements / Profiler / DOM 证据确认。

---

## 12. Debug 证据顺序

先看：

```text
Console
→ Component 是否被调用

React DevTools Components
→ Component Boundary 是否存在

Elements
→ 最终 DOM 是什么
```

这三层分别对应：

```text
JavaScript execution
React Component model
Host DOM
```

---

## 13. 本课验收

不看文档回答：

1. `<ReleaseCard />` 创建时是否调用组件？
2. React 在什么时候调用 `ReleaseCard`？
3. `ReleaseCard` 返回 JSX 后是否已经有 DOM？
4. 为什么组件不能当普通函数手工调用？
5. Component Element 的 `type` 是什么？
6. Host Element 的 `type` 是什么？
7. string / number / null 能作为 Render Output 吗？
8. `isValidElement(42)` 为什么是 false？
9. Component Call 次数是否等于 Commit 次数？
10. 小写自定义标签为什么错误？

运行：

```bash
npm run typecheck
npm run build
```

---

## 14. 官方参考

- React：createElement  
  <https://react.dev/reference/react/createElement>
- React：Describing the UI  
  <https://react.dev/learn/describing-the-ui>
- React：Components and Hooks must be pure  
  <https://react.dev/reference/rules/components-and-hooks-must-be-pure>

---

## 15. 第一批课程闭环

现在已经形成：

```text
JSX Source
→ transform
→ React Element
→ element.type
→ Component Invocation
→ Render Output
```

下一批继续把 Render Output 展开到：

```text
Expression / Fragment / Empty Node
→ Pure Render
→ Render vs Commit
```

即 RE-1102-004 ～ RE-1102-006。
