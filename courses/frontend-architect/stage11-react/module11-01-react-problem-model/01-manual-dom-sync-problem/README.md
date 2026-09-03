# RE-1101-001：手工 DOM 同步为什么会失控

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 类型：问题复现 + 对照实验  
> 本课不使用 React。先亲手制造 React 要解决的那类问题。

---

## 1. 本课要解决的问题

使用原生 JavaScript 修改一个按钮、一个数字或一段文字并不难：

```js
countElement.textContent = '3';
```

真正困难的是：

> 当同一份业务状态同时影响标题、徽标、进度条、按钮、摘要和警告信息时，如何保证所有 DOM 永远一致？

本课会实现两个外观相同的发布面板：

1. **分散命令式更新版**：每个事件处理函数自己决定修改哪些 DOM，故意保留一个同步漏洞。
2. **集中渲染版**：事件只修改状态，再统一执行 `render()`，所有界面输出都从当前状态计算。

你会看到：功能数量并没有很多，但只要“状态来源”和“界面同步点”开始分散，Bug 就已经出现。

---

## 2. 学习目标

完成本课后，你应该能够：

- 区分业务状态与 DOM 中已经显示出来的状态。
- 解释“同一信息存在多个写入点”为什么危险。
- 复现一个状态与界面不一致的 Bug。
- 使用单一状态对象和集中 `render()` 降低同步点数量。
- 写出第一版心智公式：`UI = render(state)`。
- 说明集中渲染仍然不是 React，以及它继续面临哪些问题。

---

## 3. 起始状态

本课是独立 Lesson，不继承上一课源码。

进入目录：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/01-manual-dom-sync-problem
```

目录结构：

```text
01-manual-dom-sync-problem/
├── README.md
├── package.json
├── index.html
└── src/
    ├── main.js
    └── styles.css
```

安装依赖并启动：

```bash
npm install
npm run dev
```

终端会输出本地访问地址。打开页面后应看到左右两个“发布准备度”面板。

生产构建验证：

```bash
npm run build
```

构建成功后会生成 `dist/`，它不需要提交到 Git。

---

## 4. 先认识四类对象

### 4.1 业务状态

页面真正关心的数据：

```js
{
  approvedCount: 2,
  serviceOnline: true
}
```

它回答：

- 已经通过几项审批？
- 服务当前是否在线？

### 4.2 派生值

能够根据业务状态计算出来的数据：

```js
const remaining = MAX_APPROVALS - approvedCount;
const ready = serviceOnline && remaining === 0;
```

`remaining` 和 `ready` 没有必要再保存为独立可信来源，否则它们可能与原始状态不一致。

### 4.3 DOM 状态

浏览器页面当前已经显示的文本、属性、类名和宽度：

```js
countElement.textContent
statusElement.dataset.online
progressElement.style.width
releaseButton.disabled
```

DOM 是界面结果，不应该反过来成为业务真相的唯一来源。

### 4.4 同步逻辑

负责把业务状态写入 DOM 的代码：

```js
countElement.textContent = String(state.approvedCount);
progressElement.style.width = `${progress}%`;
releaseButton.disabled = !ready;
```

本课的关键不在于某一行 DOM API，而在于这些同步代码分散在哪里、会被执行几次、是否遗漏。

---

## 5. 实验一：复现分散同步 Bug

页面左侧是“分散命令式更新版”。

按以下顺序操作：

1. 点击一次“通过下一项审批”。
2. 观察“已完成审批”数字发生变化。
3. 观察进度条发生变化。
4. 观察底部摘要仍然保留旧数字。
5. 点击“检查一致性”。

页面会指出：

```text
业务状态中的审批数 ≠ DOM 摘要中的审批数
```

### 为什么发生

`bindImperativePanel()` 中的审批按钮回调修改了业务状态，也更新了部分 DOM：

```js
refs.approveButton.addEventListener('click', () => {
  state.approvedCount += 1;
  refs.count.textContent = String(state.approvedCount);
  refs.progress.style.width = `${progress}%`;
});
```

但它遗漏了摘要区域。

另一个事件处理函数可能更新另外几个节点。随着需求增长，会出现：

```text
事件 A 更新节点 1、2、3
事件 B 更新节点 2、4、5
事件 C 更新节点 1、3、5、6
异步响应 D 更新节点 2、3、6
```

系统正确性开始依赖“每个开发者在每条路径上都记得更新所有受影响节点”。这就是维护风险。

---

## 6. 同一份信息为什么不应该有多个可信来源

左侧面板中，审批数量同时存在于：

- `bindImperativePanel()` 闭包中的 `state.approvedCount`。
- 数字卡片的 `textContent`。
- 摘要文本的 `textContent`。
- 进度条宽度。
- 发布按钮的 `disabled` 状态。

这些 DOM 表达本来都应该由一份业务状态推导出来。但分散更新会让它们逐渐变成彼此独立的“事实副本”。

只要一个更新路径遗漏其中一份，页面就进入不一致状态。

这类问题常被称为：

- State Synchronization Problem。
- Multiple Sources of Truth。
- Derived State Drift。
- UI Inconsistency。

名称可以不同，本质相同：**一个事实被复制后，需要额外逻辑维持所有副本一致。**

---

## 7. 实验二：集中渲染

右侧面板采用另一种结构：

```js
refs.approveButton.addEventListener('click', () => {
  state.approvedCount = Math.min(state.approvedCount + 1, MAX_APPROVALS);
  render();
});
```

事件处理函数只做两件事：

1. 修改业务状态。
2. 请求根据最新状态重新描述页面。

所有 DOM 同步集中在：

```js
function render() {
  const view = deriveView(state);

  refs.count.textContent = String(view.approvedCount);
  refs.progress.style.width = `${view.progress}%`;
  refs.summary.textContent = view.summary;
  refs.releaseButton.toggleAttribute('disabled', !view.ready);
}
```

再次执行同样操作：

1. 点击“通过下一项审批”。
2. 点击“切换服务状态”。
3. 多次点击两个按钮。
4. 点击“检查一致性”。

所有受影响区域都会保持一致。

---

## 8. 第一版声明式心智模型

可以把右侧结构概括为：

```text
State
  ↓
deriveView(state)
  ↓
render(view)
  ↓
DOM
```

或者：

```text
UI = f(State)
```

这里的“声明式”不是完全不写 DOM，而是：

- 事件描述“状态发生了什么变化”。
- 渲染逻辑描述“当前状态下界面应该是什么样”。
- 不在每条业务路径里分别维护 UI 的局部补丁。

---

## 9. 这已经是 React 吗

不是。

右侧方案只是用原生 JavaScript模拟了一个非常小的状态驱动渲染模型。它仍然需要我们自己处理：

- 如何把大型页面拆成可组合的单元。
- 如何只更新必要的 DOM。
- 如何保留输入框、焦点和局部状态。
- 如何处理列表身份。
- 如何组织嵌套视图。
- 如何调度大量更新。
- 如何管理副作用和资源生命周期。
- 如何在开发模式发现不纯逻辑。

React 提供了组件模型、状态模型、协调过程和宿主渲染器来系统化处理这些问题，但 React 也会引入自己的成本和约束。

---

## 10. 阅读最终源码

打开：

```text
src/main.js
```

按以下顺序阅读：

1. `createInitialState()`：唯一业务状态起点。
2. `deriveView(state)`：所有派生值集中计算。
3. `bindImperativePanel()`：观察分散写 DOM 的风险。
4. `bindDeclarativePanel()`：观察事件只更新状态。
5. `bindDeclarativePanel()` 内部的 `render()`：观察 UI 如何统一从状态生成。
6. `checkConsistency()`：观察如何用断言验证 UI。

不要只关注语法。重点画出“数据从哪里来，经过什么计算，最终写到哪里”。

---

## 11. Debug 实验

### 实验 A：查看状态变化

在 `bindImperativePanel()` 中审批按钮的 `click` 回调第一行增加断点。

点击按钮后观察：

- 闭包中的 `state.approvedCount` 修改前是什么。
- 修改后是什么。
- 此时摘要 DOM 是否已经更新。

### 实验 B：查看同步点

在编辑器中搜索：

```text
textContent =
style.width =
disabled =
```

比较左右两种实现的写入位置数量。

### 实验 C：制造第二个遗漏

临时注释右侧 `bindDeclarativePanel()` 内部 `render()` 中更新按钮禁用状态的代码：

```js
// refs.releaseButton.toggleAttribute('disabled', !view.ready);
```

你会发现集中渲染也可能写错，但错误被限制在一个明确位置，而不是散落在所有事件路径中。

实验结束后恢复代码。

---

## 12. Wrong Way

### 从 DOM 读取业务真相

```js
const count = Number(countElement.textContent);
```

DOM 文本是展示结果，可能经过格式化、翻译或暂时不同步。业务逻辑不应依赖它作为唯一数据来源。

### 保存所有派生值

```js
const state = {
  approvedCount: 2,
  remaining: 3,
  progress: 40,
  ready: false
};
```

一次更新必须同时修改四个字段，任何遗漏都会产生漂移。

### 每个按钮都维护自己的 UI 补丁

短期代码看起来直接，长期会把页面正确性分散到大量事件和异步回调中。

---

## 13. 本课验收

在不看答案的情况下解释：

1. 业务状态和 DOM 状态有什么区别？
2. 为什么进度条宽度是派生值？
3. 左侧 Bug 的根本原因是什么？
4. 为什么“再补一行更新摘要的代码”不是长期解决方案？
5. `UI = f(State)` 表达了什么？
6. 集中 `render()` 相比 React 仍缺少哪些能力？
7. React 是否意味着以后不需要理解 DOM？为什么？

实际操作验收：

- 能运行项目。
- 能稳定复现左侧不一致。
- 能使用断点观察状态先变、DOM 后变。
- 能解释右侧为什么保持一致。
- `npm run build` 成功。

---

## 14. 下一课

下一课将正式加入 React，建立四个对象的关系：

```text
DOM Container
→ React Root
→ React Component
→ Render Output
```

进入：[RE-1101-002：创建第一个 React 应用](../02-first-react-application/README.md)
