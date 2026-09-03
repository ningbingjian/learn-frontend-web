# RE-1101-003：让状态声明 UI

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 本课会最小使用 `useState`，但 State 快照、更新队列和批处理将在 Module 11.04 完整学习。

---

## 1. 本课要解决的问题

第一课中，同一份审批状态影响：

- 已完成数量。
- 剩余数量。
- 进度条。
- 服务状态。
- 发布说明。
- 按钮是否可用。

命令式版本需要逐个维护 DOM。

本课使用 React 建立另一种结构：

```text
事件只描述状态变化
  ↓
组件根据最新 State 重新计算 Render Output
  ↓
审批数字、进度、摘要和按钮一起得到新结果
```

重点不是记住 `useState` 的语法，而是理解：**界面中的多个结果可以共同来自一份可信状态。**

---

## 2. 学习目标

完成本课后，你应该能够：

- 使用最小 `useState` 保存会随交互变化的数据。
- 区分 Source State 与 Derived Value。
- 不把 `remaining`、`progress`、`ready` 复制成额外 State。
- 解释事件、状态更新、组件重新执行和 DOM Commit 的基础时间线。
- 使用函数更新表达“基于上一次状态计算下一次状态”。
- 通过一份 State 同时驱动文本、样式、属性和可访问性提示。
- 复现“重复保存派生状态”导致的数据漂移。

---

## 3. 起始状态

本课目录包含完整最终源码，不依赖第二课运行。

进入目录：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/03-state-declares-ui
```

目录：

```text
03-state-declares-ui/
├── README.md
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```

运行：

```bash
npm install
npm run dev
```

页面应显示一个“发布准备度”控制台。初始状态：

```text
2 / 5 项审批完成
服务在线
准备度 40%
发布按钮不可用
```

构建验证：

```bash
npm run build
```

---

## 4. 识别真正需要保存的 State

打开：

```text
src/App.tsx
```

当前业务只有两个会独立变化的事实：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
const [serviceOnline, setServiceOnline] = useState(true);
```

### `approvedCount`

用户点击“通过下一项审批”后变化，不能只通过其他数据计算得到，因此需要 State。

### `serviceOnline`

用户点击“切换服务状态”后变化，也不能通过审批数量计算得到，因此需要 State。

---

## 5. 哪些值不应该保存成 State

下面这些值都能由当前两个 State 直接计算：

```tsx
const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);
const ready = serviceOnline && remaining === 0;
```

还有页面摘要：

```tsx
const summary = createSummary(approvedCount, serviceOnline);
```

它们属于 Derived Value。

### 为什么直接计算

如果额外写成：

```tsx
const [remaining, setRemaining] = useState(3);
const [progress, setProgress] = useState(40);
const [ready, setReady] = useState(false);
```

每次审批变化都必须同时更新四份 State。只要漏掉一次，React 页面仍然会发生第一课中的状态漂移。

React 能帮助根据 State 更新 UI，但不会阻止你建立多份互相冲突的 State。

---

## 6. Step 1：状态如何进入组件

组件函数执行时，`useState` 返回当前 Render 对应的状态值和更新函数：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
```

当前先理解：

- `approvedCount`：当前这次 Render 看到的值。
- `setApprovedCount`：请求 React 安排一次状态更新。
- `2`：首次挂载时使用的初始值。

不要把 Setter 理解为“立刻修改当前变量”。State 快照会在 11.04 通过连续更新实验完整证明。

---

## 7. Step 2：事件只描述状态变化

通过审批：

```tsx
function approveNext() {
  setApprovedCount((currentCount) =>
    Math.min(currentCount + 1, MAX_APPROVALS),
  );
}
```

切换服务状态：

```tsx
function toggleService() {
  setServiceOnline((currentOnline) => !currentOnline);
}
```

事件处理函数没有：

```tsx
countElement.textContent = ...
progressElement.style.width = ...
releaseButton.disabled = ...
```

它只表达业务变化。

### 为什么使用函数更新

```tsx
setApprovedCount((currentCount) => currentCount + 1);
```

表达“下一值依赖前一值”。更新队列如何处理多个函数更新归 11.04，本课只建立正确习惯。

---

## 8. Step 3：组件声明当前 UI

审批数字：

```tsx
<strong>{approvedCount}</strong>
```

剩余数字：

```tsx
<strong>{remaining}</strong>
```

进度条：

```tsx
<div style={{ width: `${progress}%` }} />
```

发布按钮：

```tsx
<button disabled={!ready}>开始发布</button>
```

状态摘要：

```tsx
<p aria-live="polite">{summary}</p>
```

它们没有各自保存独立真相，而是在当前 Render 中共同读取同一份状态和派生值。

---

## 9. 一次点击发生了什么

点击“通过下一项审批”时，先使用简化时间线理解：

```text
1. 浏览器触发 click
2. React 调用 approveNext
3. approveNext 请求 approvedCount 更新
4. React 安排组件重新 Render
5. App 再次执行，拿到新的 approvedCount
6. remaining、progress、ready、summary 重新计算
7. App 返回新的 Render Output
8. React 比较前后结果
9. React DOM 提交必要的真实 DOM 变化
10. 浏览器重新完成必要的样式、布局和绘制
```

重要区别：

```text
组件重新执行 ≠ 整个真实 DOM 被删除重建
```

具体比较算法、Fiber 和 Commit 会在 11.22 深入。

---

## 10. 运行观察

### 场景 A：连续通过审批

连续点击“通过下一项审批”：

- `approvedCount` 从 2 增加到 5。
- `remaining` 从 3 下降到 0。
- `progress` 从 40% 增加到 100%。
- 通过按钮在 5 项完成后禁用。
- 当服务在线时，发布按钮变为可用。

你只更新了 `approvedCount`，但多个 UI 结果保持一致。

### 场景 B：服务离线

在审批全部完成后点击“切换服务状态”：

- 审批数保持不变。
- 进度保持 100%。
- 服务显示离线。
- 发布摘要变化。
- 发布按钮重新禁用。

这说明 `ready` 是审批状态和服务状态的联合派生结果。

### 场景 C：再次在线

再次切换为在线，发布按钮自动恢复可用。没有事件处理函数直接操作按钮 DOM。

---

## 11. React DevTools 实验

打开 React DevTools → Components，选中 `App`。

观察 Hooks：

```text
State: 2
State: true
```

点击按钮后观察值变化。

本课目前只有一个业务组件。后续拆分组件后，DevTools 会显示组件树和每个组件的 Props/State。

---

## 12. 浏览器断点实验

在 `App()` 第一行设置断点：

```tsx
export function App() {
```

刷新页面，然后点击按钮。

每次断下时观察：

- `approvedCount`。
- `serviceOnline`。
- `remaining`。
- `progress`。
- `ready`。

你会看到派生值在组件执行期间重新计算。

### 开发模式提示

因为应用位于 Strict Mode 中，开发期可能观察到额外调用。不要用“调用次数猜测”代替对纯渲染的理解。RE-1101-006 会专门解释。

---

## 13. Failure Lab：复制派生状态

实验结束后恢复源码。

在 `App` 中临时增加：

```tsx
const [remainingCopy, setRemainingCopy] = useState(3);
```

把页面中的剩余值改成：

```tsx
<strong>{remainingCopy}</strong>
```

但不要在 `approveNext()` 中调用 `setRemainingCopy`。

运行后点击审批：

- `approvedCount` 会变化。
- 进度会变化。
- `remainingCopy` 永远停在 3。

React 正确执行了你的代码，但你的状态模型本身是错误的。

### 修复方式

删除 `remainingCopy`，恢复：

```tsx
const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
```

这叫“删除冗余 State”，而不是再添加一个 Effect 去同步它。

---

## 14. Failure Lab：直接修改 React 管理的 DOM

在 `approveNext()` 中临时加入：

```tsx
document.querySelector('[data-role="summary"]')!.textContent = '手工修改';
```

并给摘要节点增加 `data-role="summary"`。

点击后可能短暂看到手工文本，随后 React 下一次 Commit 会根据 Render Output 再次覆盖它。

这说明同一个 DOM 子树不应该同时由 React 和任意外部代码争夺所有权。

第三方库、焦点和测量等必要命令式场景会在 11.08 使用 Ref 建立边界。

---

## 15. Wrong Way

### 所有变量都放进 State

普通常量、当前 Render 可以计算的值和模块级配置不需要进入 State。

### 用 Effect 同步派生值

```tsx
useEffect(() => {
  setRemaining(MAX_APPROVALS - approvedCount);
}, [approvedCount]);
```

这会增加一次额外 Render 和新的同步风险。能在 Render 中直接计算，就不要用 Effect 维护副本。

### 在 Render 中调用 Setter

```tsx
if (approvedCount > MAX_APPROVALS) {
  setApprovedCount(MAX_APPROVALS);
}
```

Render 应保持纯净。无条件或错误条件下更新 State 可能造成渲染循环。

### 把 UI 结果写回业务 State

例如从进度条宽度反推审批数，会让展示细节污染业务模型。

---

## 16. State 最小建模检查表

加入一个 State 前，依次问：

1. 它会随时间或交互变化吗？
2. 它能否由当前 Props/State 直接计算？
3. 它是否只是另一份 State 的格式化结果？
4. 多保存一份后，谁负责保持一致？
5. 刷新组件时它需要被 React 记住吗？
6. 它属于 React State，还是 Server Cache、URL、Form 或外部 Store？

State 类型的完整分类归 11.11。

---

## 17. 本课验收

回答：

1. 本课真正的 Source State 有哪两个？
2. `remaining` 为什么不是 State？
3. `ready` 依赖哪些事实？
4. Setter 是否会直接修改当前 Render 中的变量？
5. 为什么组件重新执行不等于重建整个 DOM？
6. React 能否自动修复错误的状态模型？
7. 为什么不应该用 Effect 同步 `remaining`？
8. 为什么直接修改 React 管理的 DOM 会产生所有权冲突？

实际操作：

- 能运行项目并完成全部交互。
- 能在 DevTools 观察两个 State。
- 能在组件断点观察派生值重新计算。
- 能复现 `remainingCopy` 漂移。
- 能删除冗余 State 正确修复。
- `npm run build` 成功。

---

## 18. 第一批课程小结

三节课形成了完整的因果链：

```text
手工 DOM 同步会漂移
  ↓
React Root 把组件树连接到宿主 DOM
  ↓
State 变化后，组件重新声明当前 UI
```

当前你已经能够使用 React，但还没有真正学透：

- JSX 到底生成什么。
- 组件为什么必须纯。
- State 为什么像快照。
- 更新如何批处理。
- 组件拆分和 Props 如何设计。

下一课将在 Module 11.01 中继续建立 Component Tree 与单向更新流，再进入 Module 11.02 深入 JSX、Element 和 Render Output。
