# RE-1101-003：让状态声明 UI

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 类型：最小 State + 声明式更新实验  
> 前置课程：[RE-1101-002：创建第一个 React 应用](../02-first-react-application/README.md)

---

## 1. 本课要解决的问题

第一课已经证明：同一份事实被写进多个 DOM 区域后，分散同步非常容易遗漏。第二课建立了 React Root，但页面仍然是静态的。

本课只引入两份最小源状态：

```text
approvedCount
serviceOnline
```

其他显示内容都从它们计算：

```text
remaining
progress
ready
summary
button disabled
status label
```

目标不是一次学完 `useState`，而是亲自验证：

> 事件只修改源状态，组件重新执行后，所有 UI 区域会从同一个状态快照重新得到一致结果。

`useState` 的更新队列、批处理、对象更新和完整生命周期归 Module 11.04。本课只建立声明式 UI 的第一层模型。

---

## 2. 学习目标

完成本课后，你应该能够：

- 使用最小 `useState` 保存源状态。
- 区分源状态、派生值和 DOM 输出。
- 避免把 `remaining`、`progress`、`ready` 重复保存为 State。
- 让事件处理函数只表达状态变化意图。
- 解释一次点击后的 Event → State Update → Render → Commit 基础时间线。
- 说明同一次 Render 中的 UI 来自同一个状态快照。
- 解释为什么本课不需要 Effect、`useMemo` 或全局状态库。
- 使用 React DevTools 观察 State。
- 复现派生状态漂移、直接改 DOM 和 Render 中更新 State 三类错误。

---

## 3. 起始状态

本课是独立 Lesson，保存完整最终源码。

进入目录：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/03-state-declares-ui
```

最终目录：

```text
03-state-declares-ui/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    └── styles.css
```

安装并启动：

```bash
npm install
npm run dev
```

打开终端给出的地址，应看到“声明式发布控制台”。

---

## 4. Step 1：建立独立 React 项目

`package.json`、`tsconfig.json`、`vite.config.ts` 与上一课保持相同技术基线，但本课不能在运行时引用上一课目录。

当前关键依赖：

```text
React / React DOM 19.2.8
TypeScript 6.0.x
Vite 8.2.x
Node.js 22.12+
```

入口 HTML 只负责提供：

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

React Root 的职责与上一课相同。

---

## 5. Step 2：识别最小源状态

业务规则：

- 最多有 5 项审批。
- 当前完成数量可以增加到 5。
- 服务可能在线或离线。
- 只有服务在线且全部审批完成时，发布按钮才可用。

真正需要保存的事实只有：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
const [serviceOnline, setServiceOnline] = useState(true);
```

### 为什么只保存这两个

因为它们不能由其他当前数据直接计算出来：

- 用户点击会改变审批数量。
- 用户操作会改变服务状态。

它们是 Source of Truth。

不要先写成：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
const [remaining, setRemaining] = useState(3);
const [progress, setProgress] = useState(40);
const [ready, setReady] = useState(false);
```

这样一次审批更新必须维护四份 State，又回到了第一课的同步问题。

---

## 6. Step 3：在 Render 中计算派生值

在 `App` 函数中、`return` 之前计算：

```tsx
const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);
const ready = serviceOnline && remaining === 0;
```

摘要同样是派生输出：

```tsx
const summary = serviceOnline
  ? remaining === 0
    ? '全部审批完成，可以开始发布。'
    : `服务在线，仍有 ${remaining} 项审批未完成。`
  : `服务离线，当前还有 ${remaining} 项审批未完成。`;
```

每次 `App` 执行时，这些值都使用当前 Render 看到的 `approvedCount` 与 `serviceOnline` 计算。

第一版心智模型：

```text
State Snapshot
  ↓
Derived Values
  ↓
Render Output
```

---

## 7. Step 4：让事件只表达状态变化

审批按钮：

```tsx
function approveNext() {
  setApprovedCount((current) => Math.min(current + 1, MAX_APPROVALS));
}
```

服务状态按钮：

```tsx
onClick={() => setServiceOnline((online) => !online)}
```

事件中没有：

```text
querySelector
textContent
style.width
setAttribute('disabled')
```

事件只告诉 React：“源状态要改变”。页面应该显示什么，仍由下一次 Render 决定。

这里使用函数更新形式，是为了明确“下一个值基于上一个值”。更新队列的完整语义后续在 11.04 学习。

---

## 8. Step 5：从同一快照声明多个 UI 区域

审批数量：

```tsx
<strong>{approvedCount}</strong>
```

剩余数量：

```tsx
<strong>{remaining}</strong>
```

进度：

```tsx
<strong>{progress}%</strong>
<div className="progress-bar" style={{ width: `${progress}%` }} />
```

服务标签：

```tsx
<span className="status">
  {serviceOnline ? '服务在线' : '服务离线'}
</span>
```

发布按钮：

```tsx
<button type="button" className="release" disabled={!ready}>
  {ready ? '开始发布' : '尚未满足发布条件'}
</button>
```

这些区域没有互相调用，也没有分别维护自己的数据。它们只是读取同一次 Render 中的值。

---

## 9. Step 6：加入可访问状态表达

进度条不是只改变视觉宽度，还提供：

```tsx
<div
  className="progress-track"
  role="progressbar"
  aria-label="发布准备度"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={progress}
>
```

动态摘要提供：

```tsx
<p className="summary" aria-live="polite">
  {summary}
</p>
```

React 负责把属性提交给 DOM，但语义和可访问性仍需要开发者设计。框架不会自动把无语义结构变成好产品。

---

## 10. Step 7：运行并观察一致性

执行：

```bash
npm run dev
```

按顺序操作：

1. 点击“通过下一项审批”。
2. 观察已完成数量增加。
3. 观察剩余数量减少。
4. 观察进度百分比和宽度一起变化。
5. 观察摘要数字同步变化。
6. 达到 5 项后，审批按钮禁用。
7. 服务在线时发布按钮启用。
8. 切换为离线，状态、摘要和发布按钮一起变化。

这次没有单独的 `renderSummary()`、`renderProgress()` 或 `syncReleaseButton()`。

---

## 11. 基础更新时间线

点击“通过下一项审批”后，可以先按下面的表层模型理解：

```text
Browser Event
→ onClick Handler
→ setApprovedCount(...)
→ React 安排一次更新
→ React 再次执行 App
→ 得到新的 remaining/progress/ready/summary
→ 比较前后 Render Output
→ Commit 必要 DOM 变化
→ Browser Paint
```

本课重点：

- Event Handler 与 Render 是两个阶段。
- Setter 不是直接修改某一个 DOM 节点。
- App 重新执行，不等于所有 DOM 都一定被替换。
- Fiber、Reconciliation 和 Commit 细节后续完整学习。

---

## 12. React DevTools 观察

打开 React DevTools 的 Components 面板：

1. 选择 `App`。
2. 找到两个 State 值。
3. 点击审批按钮。
4. 观察 `approvedCount` 从 2 变为 3。
5. 切换服务状态。
6. 观察 `serviceOnline` 从 true 变为 false。

Elements 面板只能看到最终 DOM 和属性；Components 面板能看到 React 组件和 Hook State。二者提供不同证据。

在 `App` 第一行设置断点，可以观察每次更新时组件函数再次执行。

---

## 13. 为什么不使用 Effect

错误想法：

```tsx
useEffect(() => {
  setProgress((approvedCount / MAX_APPROVALS) * 100);
}, [approvedCount]);
```

`progress` 完全可以在 Render 中直接计算。使用 Effect 会引入：

```text
先 Render 旧 progress
→ Commit
→ Effect 执行
→ 再更新 progress
→ 再 Render
```

这既增加一次更新，又重新制造重复状态。

Effect 用于 React 与外部系统同步，不是派生普通 UI 数据的默认工具。

---

## 14. 为什么不使用 `useMemo`

当前计算只是几个减法、除法和条件判断，没有性能证据表明它昂贵。

直接计算更简单：

```tsx
const progress = Math.round((approvedCount / MAX_APPROVALS) * 100);
```

不要把 `useMemo` 当作“派生值语法”。它属于性能优化工具，必须在建立性能证据以后使用；React Compiler 与完整性能治理归 11.20。

---

## 15. 为什么不使用全局状态库

当前状态只被 `App` 这一小棵树使用。引入 Redux、Zustand 或其他 Store 会增加概念和依赖，却没有解决新的问题。

技术选型原则：

```text
先明确状态所有者与消费范围
→ 再判断是否需要共享机制
→ 最后选择工具
```

不是看到 State 就默认引入全局状态库。

---

## 16. Failure Lab

### A：把派生值复制为 State

临时增加：

```tsx
const [remainingCopy, setRemainingCopy] = useState(3);
```

只更新 `approvedCount`，不要更新 `remainingCopy`。页面马上可以显示两个相互矛盾的剩余数量。

结论：可以直接计算的值不应无理由复制为另一份可信 State。

### B：事件中直接修改 DOM

临时在 `approveNext()` 中加入：

```tsx
document.querySelector('.summary')!.textContent = '手工写入';
```

这段修改绕过 React。下一次 Render/Commit 可能覆盖它，组件状态也不知道它发生过。

结论：不要建立 React State 和手工 DOM 两套并行真相。

### C：Render 中调用 Setter

错误写法：

```tsx
if (approvedCount < 2) {
  setApprovedCount(2);
}
```

Render 应描述 UI，不应无条件触发新更新，否则可能造成重复渲染甚至循环。

实验完成后恢复最终源码。

---

## 17. Wrong Way

### 把所有变量都放进 State

局部常量、派生值和模块数据不因为出现在组件里就必须成为 State。

### 用 Effect 修补 State 之间的一致性

如果一个 State 能由另一个 State 计算，优先删除重复 State，而不是增加同步 Effect。

### Setter 后立刻把变量当成已改变

当前事件闭包读到的是当前 Render 的状态快照。完整快照与更新队列语义归 11.04，本课先记住 Setter 请求下一次 Render。

### 认为组件重执行等于整页 DOM 重建

Render 是计算输出；Commit 才修改 DOM。React 会根据前后输出决定必要变更。

---

## 18. 构建验证

执行：

```bash
npm run typecheck
npm run build
```

通过标准：

- TypeScript 严格检查通过。
- Vite 构建成功。
- 页面操作结果一致。
- Console 无错误。
- Failure Lab 恢复后再次构建通过。

---

## 19. 本课验收

不看文档回答：

1. 本课的两份源状态是什么？
2. `remaining`、`progress` 和 `ready` 为什么不是 State？
3. 点击按钮后 Setter 是否直接修改进度条 DOM？
4. Event Handler 和 Render 分别负责什么？
5. 为什么同一次 Render 的多个区域更容易保持一致？
6. 为什么本课不需要 Effect？
7. 为什么没有使用 `useMemo`？
8. 为什么没有使用全局状态库？
9. Components 与 Elements 面板分别能证明什么？
10. 初级更新链路如何描述？

实际验收：

- 项目可以独立安装、运行和构建。
- 能从 2 项审批操作到 5 项并解释每个区域变化。
- 能切换服务状态并解释 `ready`。
- 能复现和修复三类 Failure Lab。
- 能画出 `State → Derived Values → Render Output → DOM`。

---

## 20. 第一批课程闭环

前三课建立了 Module 11.01 的第一层因果链：

```text
手工 DOM 同步会遗漏
→ React Root 建立管理边界
→ State 让多个 UI 区域从同一快照声明
```

下一批将继续学习 Component Tree、单向更新流、局部接入边界和 Strict Mode，而不是立刻堆叠更多 Hook。
