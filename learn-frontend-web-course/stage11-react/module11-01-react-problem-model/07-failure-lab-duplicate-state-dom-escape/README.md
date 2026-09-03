# RE-1101-007：Failure Lab——重复状态与 DOM 逃生

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Should  
> 类型：故障注入 + 一致性检查 + DOM 所有权实验  
> 前置课程：[RE-1101-006：Strict Mode 与第一套 Debug 基线](../06-strict-mode-debug-baseline/README.md)

---

## 1. 本课要解决的问题

React 页面能响应点击，不代表状态模型正确。

本课不继续增加新 API，而是主动制造两类常见故障：

```text
Failure A
同一个事实同时保存为多份 State
→ 更新路径遗漏
→ State 之间发生漂移

Failure B
React Root 外部代码直接修改 Root 内 DOM
→ React 的预期输出与真实 DOM 分离
→ 所有权冲突
```

这两类问题都来自同一个根因：

> 系统中没有清楚定义“谁拥有这份事实”和“谁有权写这个输出”。

---

## 2. 学习目标

完成本课后，你应该能够：

- 稳定复现 Derived State Drift。
- 编写一致性检查证明 State 已经互相矛盾。
- 说明为什么“再补一个 Setter”不是长期修复。
- 使用最小源 State 和 Render 派生值消除同步路径。
- 稳定复现外部代码篡改 React 管理 DOM 的问题。
- 解释为什么无关 Render 不保证修复外部 DOM 修改。
- 说明 React Root 的 DOM 所有权边界。
- 区分合法 Escape Hatch 与任意 `querySelector` 修改。
- 使用 State、React DevTools 和 Elements 三类证据定位问题。

---

## 3. 起始状态

进入：

```bash
cd learn-frontend-web-course/stage11-react/module11-01-react-problem-model/07-failure-lab-duplicate-state-dom-escape
```

目录：

```text
07-failure-lab-duplicate-state-dom-escape/
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

页面包含：

- Failure A：重复 State；
- Reference：派生值正确方案；
- Failure B：React DOM 所有权冲突。

---

# Part A：重复 State 漂移

## 4. Step 1：识别错误状态结构

`DuplicateStateLab` 保存：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
const [remaining, setRemaining] = useState(3);
const [progress, setProgress] = useState(40);
```

业务关系：

```text
remaining = MAX_APPROVALS - approvedCount
progress  = approvedCount / MAX_APPROVALS
```

因此 `remaining` 和 `progress` 都能由 `approvedCount` 计算。

当前却保存了三份可独立变化的 State：

```text
approvedCount
remaining
progress
```

它们不会因为数学关系而自动同步。

---

## 5. Step 2：执行带漏洞更新

点击：

```text
带漏洞审批
```

事件：

```tsx
function approveWithBug() {
  const nextCount = Math.min(approvedCount + 1, MAX_APPROVALS);

  setApprovedCount(nextCount);
  setProgress(Math.round((nextCount / MAX_APPROVALS) * 100));

  // 故意遗漏 setRemaining
}
```

页面预期变为：

```text
approvedCount：3
progress State：60%
remaining State：仍然是 3
```

正确 remaining 应为：

```text
5 - 3 = 2
```

此时 React 没有报错，页面也没有崩溃，但业务状态已经不一致。

---

## 6. Step 3：用断言而不是肉眼证明故障

点击：

```text
检查重复 State
```

检查器重新计算期望值：

```tsx
const expectedRemaining = MAX_APPROVALS - approvedCount;
const expectedProgress = Math.round(
  (approvedCount / MAX_APPROVALS) * 100,
);
```

再与保存的 State 比较：

```tsx
if (remaining !== expectedRemaining) {
  problems.push(...);
}
```

预期输出：

```text
remaining 应为 2，实际为 3
```

这一步很重要：

```text
症状
不是“页面看起来有点不对”

证据
是同一业务规则计算出的 expected 与 actual 不相等
```

生产排障应尽量把“感觉”转换为可验证断言。

---

## 7. Step 4：理解“临时重新同步”为什么不是根治

按钮：

```text
临时重新同步
```

执行：

```tsx
setRemaining(MAX_APPROVALS - approvedCount);
setProgress(Math.round((approvedCount / MAX_APPROVALS) * 100));
```

它可以修复当前快照，但没有删除问题结构。

下一次新增事件，例如：

- 批量通过；
- 撤回审批；
- 从服务端恢复；
- 切换环境；
- 重置草稿；
- 导入数据；

每一条路径都必须记得同步三份 State。

长期正确性仍然是：

```text
更新路径数量 × 重复状态数量
```

越多路径，遗漏概率越高。

---

## 8. Step 5：对照正确结构

`DerivedStateReference` 只保存：

```tsx
const [approvedCount, setApprovedCount] = useState(2);
```

派生：

```tsx
const remaining = MAX_APPROVALS - approvedCount;
const progress = Math.round(
  (approvedCount / MAX_APPROVALS) * 100,
);
```

现在不存在：

```text
setRemaining
setProgress
```

不是开发者“更仔细地同步”，而是系统结构上删除了同步需求。

正确思路：

```text
不要努力维护不必要的副本
而是尽量不创建副本
```

---

# Part B：直接修改 React 管理的 DOM

## 9. Step 6：建立正常 DOM 所有权

`DomEscapeLab` 声明：

```tsx
const expectedLabel = serviceOnline
  ? 'React 认为服务在线'
  : 'React 认为服务离线';
```

Render Output：

```tsx
<p data-role="react-owned-label">
  {expectedLabel}
</p>
```

正常所有权：

```text
serviceOnline State
→ expectedLabel
→ Render Output
→ React Commit
→ DOM textContent
```

DOM 是结果，不是另一个独立业务状态。

---

## 10. Step 7：越权篡改 DOM

点击：

```text
越权修改 DOM
```

故障代码：

```tsx
const label = document.querySelector(
  '[data-role="react-owned-label"]',
);

label.textContent = '外部代码已越权篡改这段 DOM';
```

现在：

```text
React 上一次 Render 记忆的输出
“React 认为服务在线”

真实 DOM
“外部代码已越权篡改这段 DOM”
```

两者已经分离。

这类代码可能来自：

- jQuery 插件；
- 第三方 SDK；
- 手写 DOM 操作；
- 浏览器扩展；
- 错误的遗留集成；
- 非 React 微前端；
- 测试代码或脚本。

---

## 11. Step 8：触发无关 Render

点击：

```text
触发无关 Render
```

它只更新：

```tsx
unrelatedRenderCount
```

`expectedLabel` 没有变化。

重要观察：

> React 不保证每次 Render 都重新读取并校正所有真实 DOM 属性。

React 通常比较前后两次 Render Output。如果它认为标签文本从上次到这次没有变化，就没有理由提交文本更新。

因此越权修改可能继续留在 DOM 中。

不要建立错误期待：

```text
“反正 React 下一次 Render 会自动帮我修复”
```

---

## 12. Step 9：改变真正影响标签的 State

点击：

```text
改变真实状态
```

`serviceOnline` 改变后：

```text
expectedLabel
在线 → 离线
```

前后 Render Output 不同，React 会提交新的文本，越权修改被覆盖。

这仍然不代表直接改 DOM 是安全的。它只说明相关输出后来发生了真实变化。

外部修改持续存在多久，取决于 React 后续是否对同一 Host 属性产生更新，行为不可作为业务契约。

---

## 13. Step 10：检查 React 预期与真实 DOM

点击：

```text
检查 DOM 所有权
```

检查器读取真实 DOM，并与 `expectedLabel` 比较：

```tsx
actual === expectedLabel
```

这只是 Failure Lab 的诊断工具，不是推荐业务实现。

正常 React 组件不应该靠不断读取自身 DOM 来维持业务状态。

---

## 14. 合法 Escape Hatch 是什么

React 应用仍然需要接触 DOM，例如：

- 聚焦输入框；
- 测量尺寸；
- 管理选区；
- 接入地图、编辑器、图表；
- 控制媒体；
- 与 Web Component 或第三方实例集成。

正确方式需要：

```text
明确的 DOM Ref
明确的生命周期
明确的读写范围
明确的 cleanup
不把 DOM 当成第二份业务 State
```

这些内容归 Module 11.08：Ref、Imperative Handle 与 DOM Escape Hatch。

本课结论不是“永远不能使用 DOM API”，而是：

> 不能让未知外部代码任意写 React 所有的 DOM，并假设 React 会自动保持一致。

---

## 15. Wrong Way

### 15.1 用 Effect 同步所有派生 State

```tsx
useEffect(() => {
  setRemaining(MAX_APPROVALS - approvedCount);
}, [approvedCount]);
```

这会产生：

```text
Render 旧 remaining
→ Commit
→ Effect
→ setRemaining
→ 第二次 Render
```

对于可以在 Render 中直接计算的值，这是额外状态、额外渲染和额外故障路径。

### 15.2 写更多一致性同步函数

同步函数只能降低遗漏概率，不能消除重复状态结构。

### 15.3 把 DOM 文本读回业务 State

```tsx
const count = Number(
  document.querySelector('.count')?.textContent,
);
```

DOM 可能经过格式化、翻译、动画、外部修改，不能作为唯一业务真相。

### 15.4 认为 React DevTools State 正确就够了

Failure B 中 React State 可以完全正确，但真实 DOM 已被外部篡改。

排障时需要同时看：

```text
State / Props
Render 预期
真实 DOM
外部写入者
```

---

## 16. Debug 证据矩阵

| 故障 | React DevTools | Elements | 一致性检查 |
|---|---|---|---|
| 重复 State | 能看到互相矛盾的 State | DOM 反映矛盾数据 | expected 与 State actual 不同 |
| DOM 越权 | State 仍然正确 | 文本被外部改写 | expectedLabel 与 DOM actual 不同 |

这说明单一工具不够：

```text
React DevTools
负责组件、Props、State

Elements
负责真实 DOM

业务断言
负责规则正确性
```

---

## 17. 本课验收

不看文档回答：

1. 为什么 `remaining` 不应该与 `approvedCount` 同时保存？
2. “临时重新同步”为什么不算根治？
3. 删除派生 State 后，系统少了哪些更新路径？
4. React State 正确时，真实 DOM 是否一定正确？
5. 为什么无关 Render 不保证修复外部 DOM 修改？
6. 什么情况下直接访问 DOM 是合理的？
7. 合法 Escape Hatch 应具备哪些边界？
8. 怎样用 expected/actual 证明一致性问题？

实际验收：

- 能稳定制造 remaining 漂移。
- 能使用检查器输出明确差异。
- 能对照最小源 State 方案。
- 能篡改 React 管理文本。
- 能观察无关 Render 与相关 State 变化的区别。
- `npm run typecheck` 成功。
- `npm run build` 成功。

---

## 18. 下一课

下一课完成 Module Project：同时保留迁移前基线和迁移后 React 版本，输出状态所有权、组件树、更新时序和迁移报告：

[RE-1101-008：Release Console Migration](../08-module-project-release-console-migration/README.md)
