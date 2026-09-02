# Module 11.05：React Event System

> [← Module 11.04：Conditional Rendering、List、Key 与 Identity](../module11-04-conditional-list-key-identity/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.06：State Fundamentals、Render Snapshot、Update Queue 与 Batching →](../module11-06-state-snapshot-queue-batching/README.md)

本 Module 从最基础的点击事件一路学习到 SyntheticEvent、传播模型、默认行为、键盘/指针/输入事件、IME、事件委托、TypeScript 事件类型和 React Event Priority 前置模型。目标不是背 `onClick`，而是能够解释浏览器事件如何进入 React，再如何驱动状态更新。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（18 课）</strong></summary>

- [RE-EVENT-001：React 事件处理器和普通函数调用有什么区别](#lesson-re-event-001)
- [RE-EVENT-002：第一个 Click Event 到底经历了什么](#lesson-re-event-002)
- [RE-EVENT-003：SyntheticEvent 是什么，为什么 React 不直接把所有细节暴露成原生事件](#lesson-re-event-003)
- [RE-EVENT-004：target 与 currentTarget 为什么经常被混淆](#lesson-re-event-004)
- [RE-EVENT-005：Capture、Target、Bubble 三个阶段如何工作](#lesson-re-event-005)
- [RE-EVENT-006：stopPropagation 到底停止了什么](#lesson-re-event-006)
- [RE-EVENT-007：preventDefault 与“阻止事件传播”完全不是一回事](#lesson-re-event-007)
- [RE-EVENT-008：React 为什么常常不需要手工做 Event Delegation](#lesson-re-event-008)
- [RE-EVENT-009：Keyboard Event 如何设计可用交互](#lesson-re-event-009)
- [RE-EVENT-010：Mouse、Pointer、Touch 应该怎么选](#lesson-re-event-010)
- [RE-EVENT-011：Input、Change、BeforeInput 到底有什么差异](#lesson-re-event-011)
- [RE-EVENT-012：中文输入法为什么会让“实时搜索”出 Bug](#lesson-re-event-012)
- [RE-EVENT-013：事件处理器里的异步代码会遇到什么状态问题](#lesson-re-event-013)
- [RE-EVENT-014：React Event Priority 先建立什么心智模型](#lesson-re-event-014)
- [RE-EVENT-015：TypeScript 如何正确标注 React Event](#lesson-re-event-015)
- [RE-EVENT-016：事件 API 设计——组件到底应该暴露 onClick 还是业务动作](#lesson-re-event-016)
- [RE-EVENT-017：事件故障综合——重复触发、冒泡冲突、默认行为与 IME](#lesson-re-event-017)
- [RE-EVENT-018：综合实现——给 Product Catalog 加入第一批真实交互](#lesson-re-event-018)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-event-001"></a>
### Lesson RE-EVENT-001：React 事件处理器和普通函数调用有什么区别

从 `onClick={handleClick}`、`onClick={handleClick()}` 和内联箭头函数对比开始，理解“传递函数”与“立即调用函数”的区别，以及为什么初学者经常在 Render 阶段误触发事件逻辑。

<a id="lesson-re-event-002"></a>
### Lesson RE-EVENT-002：第一个 Click Event 到底经历了什么

从用户点击 DOM 开始，观察浏览器 Native Event、React Event Handler、Component 代码之间的调用链，建立浏览器事件进入 React 的第一张时序图。

<a id="lesson-re-event-003"></a>
### Lesson RE-EVENT-003：SyntheticEvent 是什么，为什么 React 不直接把所有细节暴露成原生事件

查看 SyntheticEvent 常用字段、`nativeEvent` 和跨浏览器抽象，理解 React 事件对象与 DOM Event 的关系以及哪些场景需要回到原生事件。

<a id="lesson-re-event-004"></a>
### Lesson RE-EVENT-004：target 与 currentTarget 为什么经常被混淆

通过嵌套按钮/列表点击实验观察 `target` 与 `currentTarget`，建立事件真正发生位置和当前处理器挂载位置的区别。

<a id="lesson-re-event-005"></a>
### Lesson RE-EVENT-005：Capture、Target、Bubble 三个阶段如何工作

先回顾浏览器传播模型，再在 React 中分别注册 Capture / Bubble Handler，通过日志验证事件传播顺序。

<a id="lesson-re-event-006"></a>
### Lesson RE-EVENT-006：stopPropagation 到底停止了什么

主动加入父子事件处理器，比较不停止、停止传播以及错误滥用 `stopPropagation` 的行为，理解它为何可能破坏组件组合和全局交互。

<a id="lesson-re-event-007"></a>
### Lesson RE-EVENT-007：preventDefault 与“阻止事件传播”完全不是一回事

使用 Link、Form、Checkbox 等默认行为案例区分 Default Action 与 Event Propagation，并观察 `defaultPrevented`。

<a id="lesson-re-event-008"></a>
### Lesson RE-EVENT-008：React 为什么常常不需要手工做 Event Delegation

通过大列表点击场景理解 React DOM 的事件委托高层模型，同时学习什么时候业务层自己的 delegation 仍然有价值。

<a id="lesson-re-event-009"></a>
### Lesson RE-EVENT-009：Keyboard Event 如何设计可用交互

覆盖 key/code、Enter、Escape、Arrow、Modifier，结合按钮/菜单/快捷键场景讨论重复按键、输入焦点和 A11Y 边界。

<a id="lesson-re-event-010"></a>
### Lesson RE-EVENT-010：Mouse、Pointer、Touch 应该怎么选

比较 MouseEvent、PointerEvent、Touch 兼容模型，理解 Pointer Capture、pressure、pointerId，并避免为桌面和触屏维护两套交互逻辑。

<a id="lesson-re-event-011"></a>
### Lesson RE-EVENT-011：Input、Change、BeforeInput 到底有什么差异

通过文本输入、删除、粘贴实验观察浏览器输入事件和 React `onChange` 的行为，为 Form Module 建立正确前置知识。

<a id="lesson-re-event-012"></a>
### Lesson RE-EVENT-012：中文输入法为什么会让“实时搜索”出 Bug

使用 CompositionStart / CompositionUpdate / CompositionEnd 复现中文/日文 IME 场景，理解不能把每一次 input 都当成最终用户输入。

<a id="lesson-re-event-013"></a>
### Lesson RE-EVENT-013：事件处理器里的异步代码会遇到什么状态问题

在事件处理器中加入 Promise / setTimeout，先观察事件参数、闭包和未来 State 的关系，为 Render Snapshot / Stale State Module 建立前置问题。

<a id="lesson-re-event-014"></a>
### Lesson RE-EVENT-014：React Event Priority 先建立什么心智模型

通过点击、输入与 Transition 的高层比较认识离散/连续事件的优先级概念，只建立“不同交互更新紧急程度不同”的模型，源码细节留到 Lane / Scheduler Module。

<a id="lesson-re-event-015"></a>
### Lesson RE-EVENT-015：TypeScript 如何正确标注 React Event

系统练习 MouseEvent、KeyboardEvent、ChangeEvent、FormEvent、PointerEvent，以及从 handler 参数推导类型，避免到处写 `any`。

<a id="lesson-re-event-016"></a>
### Lesson RE-EVENT-016：事件 API 设计——组件到底应该暴露 onClick 还是业务动作

从 Button、Dialog、ProductCard 等案例比较 DOM-oriented API 与 domain-oriented callback，学习组件公共 API 的语义边界。

<a id="lesson-re-event-017"></a>
### Lesson RE-EVENT-017：事件故障综合——重复触发、冒泡冲突、默认行为与 IME

组合制造四类常见事件 Bug，用 DevTools、日志和最小复现逐个解释根因并修复。

<a id="lesson-re-event-018"></a>
### Lesson RE-EVENT-018：综合实现——给 Product Catalog 加入第一批真实交互

在不使用 State Manager、Router、Query、Effect 的前提下，为当前项目加入可由 Props/Callback 驱动的操作和键盘交互，为下一 Module 的 State 做自然过渡。

---

> [← Module 11.04：Conditional Rendering、List、Key 与 Identity](../module11-04-conditional-list-key-identity/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.06：State Fundamentals、Render Snapshot、Update Queue 与 Batching →](../module11-06-state-snapshot-queue-batching/README.md)
