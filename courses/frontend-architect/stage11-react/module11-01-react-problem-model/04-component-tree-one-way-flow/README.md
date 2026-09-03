# RE-1101-004：Component Tree 与单向更新流

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must  
> 类型：组件树 + 状态所有权 + 单向数据流实验  
> 前置课程：[RE-1101-003：让状态声明 UI](../03-state-declares-ui/README.md)

---

## 1. 本课要解决的问题

上一课已经使用一份 State 同时驱动计数、进度、摘要和按钮。但是如果把整个页面都写在一个 `App` 函数中，随着功能增加会出现新的问题：

```text
一个组件同时负责
状态
业务规则
页面标题
审批区域
服务区域
决策摘要
按钮与交互
```

本课不追求“把代码拆得越碎越好”，而是回答三个问题：

1. 页面怎样形成 Component Tree？
2. 多个子组件需要协调时，State 应该由谁持有？
3. 用户在子组件中操作后，更新为什么仍然保持单向？

完成后的核心模型：

```text
父组件持有 State
    ↓ Props
子组件读取数据

子组件发生事件
    ↑ Callback Intent
父组件更新 State
    ↓ 新 Props
子组件得到下一次 Render Output
```

Props 的完整 API 设计归 Module 11.03；State 更新队列归 Module 11.04。本课只建立组件树与状态所有权的第一层模型。

---

## 2. 学习目标

完成本课后，你应该能够：

- 画出当前页面的 Component Tree。
- 判断一份共享 State 应该放在共同父组件还是某个叶子组件。
- 区分 State Owner、Derived Value、Props 与 Event Callback。
- 解释“数据向下、意图向上”的单向更新流。
- 说明子组件为什么不能直接修改父组件中的变量。
- 使用 React DevTools 查看父子组件、Props 和 State。
- 识别“每个子组件各保存一份相同数据”的错误方案。
- 解释组件拆分不是文件数量比赛，而是职责和变化边界设计。

---

## 3. 起始状态

本课保存完整独立源码，不在运行时依赖上一课目录。

进入：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/04-component-tree-one-way-flow
```

目录：

```text
04-component-tree-one-way-flow/
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

打开终端输出的本地地址，应看到：

- 页面顶部发布状态；
- 审批进度子组件；
- 发布服务子组件；
- 统一决策摘要；
- 当前 Component Tree 图。

验证生产构建：

```bash
npm run typecheck
npm run build
```

---

## 4. Step 1：先确认 Root 与 App 的边界

打开：

```text
src/main.tsx
```

入口只负责：

```tsx
const container = document.querySelector('#root');

if (!(container instanceof HTMLElement)) {
  throw new Error('无法启动 React：页面中缺少 #root 容器。');
}

createRoot(container).render(<App />);
```

此时对象关系是：

```text
index.html #root
→ React Root
→ App
→ App 返回的整个组件树
```

`main.tsx` 不保存业务 State，也不负责审批规则。入口文件只建立 React 与宿主页面的连接。

---

## 5. Step 2：由 App 持有共享 State

打开：

```text
src/App.tsx
```

找到 `App`：

```tsx
export function App() {
  const [approvedCount, setApprovedCount] = useState(2);
  const [serviceOnline, setServiceOnline] = useState(true);
  const [lastAction, setLastAction] = useState('载入初始状态');
```

为什么这些 State 位于 `App`？

因为三个区域都需要它们：

```text
ReleaseHeader
需要 ready

ApprovalPanel
需要 approvedCount / remaining

ServicePanel
需要 serviceOnline

ReleaseSummary
同时需要 approvedCount / serviceOnline / ready
```

共同需要的数据如果分别放进三个子组件，会形成三份彼此需要同步的状态。把它们放在最近的共同父组件，可以建立一个明确的 State Owner。

注意：

> Single Source of Truth 不表示所有应用 State 都必须放在根组件。它表示每一份独立事实应有一个明确所有者。

当前页面规模很小，所以最近共同父组件就是 `App`。

---

## 6. Step 3：在 State Owner 中计算派生值

`App` 中：

```tsx
const remaining = Math.max(MAX_APPROVALS - approvedCount, 0);
const ready = serviceOnline && remaining === 0;
```

`remaining` 与 `ready` 没有再次保存成 State。

它们的流向：

```text
approvedCount + serviceOnline
              ↓
       remaining + ready
              ↓
      作为 Props 传给子组件
```

这保证所有子组件看到的是同一次 `App` Render 对应的数据。

---

## 7. Step 4：将显示职责交给子组件

### ReleaseHeader

```tsx
interface ReleaseHeaderProps {
  ready: boolean;
}

function ReleaseHeader({ ready }: ReleaseHeaderProps) {
  return (
    <header>
      ...
      <span>{ready ? '可以发布' : '尚未就绪'}</span>
    </header>
  );
}
```

它只需要知道 `ready`，不需要知道审批数怎样计算，也不应该得到整个 App State 对象。

### ApprovalPanel

```tsx
interface ApprovalPanelProps {
  approvedCount: number;
  remaining: number;
  onApprove: () => void;
  onReset: () => void;
}
```

它负责：

- 展示审批数量；
- 展示剩余数量；
- 收集“通过下一项”和“重置”意图。

它不负责真正拥有审批状态。

### ServicePanel

它读取 `online`，并在点击时调用 `onToggle`。

### ReleaseSummary

它根据当前 Props 生成统一摘要与发布按钮。

这形成：

```text
App
├── ReleaseHeader
├── ApprovalPanel
├── ServicePanel
├── ReleaseSummary
└── ComponentTreeMap
```

---

## 8. Step 5：理解 Callback 不是“数据向上流”

审批按钮最终执行：

```tsx
<button type="button" onClick={onApprove}>
  通过下一项
</button>
```

`onApprove` 由父组件提供：

```tsx
<ApprovalPanel
  approvedCount={approvedCount}
  remaining={remaining}
  onApprove={approveNext}
  onReset={resetApprovals}
/>
```

`approveNext` 真正定义在 State Owner：

```tsx
function approveNext() {
  setApprovedCount((current) => Math.min(current + 1, MAX_APPROVALS));
  setLastAction('ApprovalPanel 请求通过下一项审批');
}
```

准确理解：

```text
不是子组件把 State 向上传递
而是父组件把一个“允许子组件表达意图的函数”向下传递
```

用户点击时，子组件调用这个函数。更新仍然发生在父组件拥有的 State 上。

因此单向流没有被破坏：

```text
Data       Parent → Child
Capability Parent → Child
Intent     Child invokes callback
Update     Parent owns and performs
New Data   Parent → Child
```

---

## 9. 运行实验：追踪一次审批更新

操作：

1. 打开 React DevTools。
2. 在 Components 面板选中 `App`。
3. 记录 `approvedCount` 当前值。
4. 选中 `ApprovalPanel`，查看 Props。
5. 点击“通过下一项”。
6. 再次查看 `App` State 和子组件 Props。

预期：

```text
App.approvedCount
2 → 3

ApprovalPanel.approvedCount
2 → 3

ApprovalPanel.remaining
3 → 2

ReleaseSummary
得到同一份新快照
```

页面上的多个区域一起变化，不是因为子组件互相通知，而是因为父组件产生下一次 Render，并为每个子组件生成新 Props。

---

## 10. Failure Lab：把共享 State 放进两个子组件

不要提交以下临时代码。只用于思考：

```tsx
function ApprovalPanel() {
  const [approvedCount, setApprovedCount] = useState(2);
  ...
}

function ReleaseSummary() {
  const [approvedCount, setApprovedCount] = useState(2);
  ...
}
```

现在两者有两个独立状态槽：

```text
ApprovalPanel.approvedCount
ReleaseSummary.approvedCount
```

点击 ApprovalPanel 只会更新第一份，摘要不会自动同步。

错误根因不是“缺少一个事件”，而是：

```text
同一个业务事实没有唯一 State Owner
```

正确方案不是让两个组件互相调用，而是把状态提升到最近共同父组件。

---

## 11. Wrong Way

### 11.1 所有 State 都放在应用最顶层

状态提升过高会导致：

- 组件接口变宽；
- 不相关区域被耦合；
- 状态生命周期过长；
- 后续重构困难。

规则不是“越高越好”，而是：

> 放在所有消费者的最近共同所有者。

### 11.2 给每个子组件传整个状态对象

```tsx
<ApprovalPanel appState={appState} />
```

这样子组件能看到大量无关数据，依赖边界不清晰。

优先传递它真正需要的最小 Props。

### 11.3 子组件直接修改传入对象

```tsx
props.release.approvedCount += 1;
```

Props 是当前 Render 的输入。直接突变不会建立正确的 State 更新，也会破坏纯渲染假设。

### 11.4 为了拆组件而拆组件

只有一行、没有职责边界、没有复用或变化理由的拆分，可能只增加跳转成本。

组件边界应该围绕：

- 独立职责；
- 独立变化；
- 可组合区域；
- 状态所有权；
- 测试和可访问性边界。

---

## 12. Debug 基线

### Components 面板

确认树结构与源码一致：

```text
App
  ReleaseHeader
  ApprovalPanel
  ServicePanel
  ReleaseSummary
  ComponentTreeMap
```

### Props 检查

分别查看：

- `ReleaseHeader.ready`
- `ApprovalPanel.approvedCount`
- `ApprovalPanel.remaining`
- `ServicePanel.online`
- `ReleaseSummary.ready`

### State 检查

只应在 `App` 中看到本课共享 State。

如果在多个兄弟组件中看到相同业务事实的独立 State，需要重新检查所有权。

---

## 13. 本课验收

不看文档回答：

1. Component Tree 与浏览器 DOM Tree 是同一个对象吗？
2. 为什么审批状态位于 `App`？
3. “最近共同父组件”是什么意思？
4. Callback 为什么没有破坏单向数据流？
5. 子组件点击后，真正执行 State 更新的是谁？
6. `remaining` 为什么不是 State？
7. Single Source of Truth 是否要求所有 State 都在根组件？
8. 哪些情况下应该把 State 下移到叶子组件？

实际验收：

- 三个子组件可以共同反映同一份状态。
- React DevTools 中能找到 State Owner。
- 能画出事件到新 Props 的完整时间线。
- `npm run typecheck` 成功。
- `npm run build` 成功。

---

## 14. 下一课

下一课不再假设 React 必须接管整个站点，而是在遗留宿主页中建立两个独立 Root：

[RE-1101-005：整体应用与局部接入边界](../05-whole-app-vs-partial-roots/README.md)
