# RE-1103-003：显式 Slots 与稳定组件 API

> Module：[11.03 Props、Children、Composition 与 API Design](../README.md)  
> 深度：Must / Should  
> 目标：当单个 `children` 无法表达多个业务区域时，使用命名 ReactNode props 建立清晰布局契约。

---

## 1. 为什么一个 children 有时不够

简单包装器通常只有一个内容区域：

```tsx
<Card>
  <ReleaseFacts />
</Card>
```

但生产组件经常包含多个语义位置：

```text
标题区
摘要区
主内容区
操作区
侧栏
页脚
```

如果仍然只暴露一个 children，调用方只能：

- 把整个内部布局复制出去。
- 通过复杂 CSS 猜位置。
- 让 Shell 组件硬编码业务内容。
- 添加越来越多布尔开关。

更清晰的方向是显式命名槽：

```tsx
<ReviewShell
  summary={<Summary />}
  actions={<Actions />}
  aside={<RiskPanel />}
  footer={<AuditNote />}
>
  <Checklist />
</ReviewShell>
```

---

## 2. 学习目标

完成本课后，应能够：

1. 判断单一 children 何时已经不足。
2. 使用命名 `ReactNode` props 表达多个 UI 区域。
3. 保留 children 作为主要内容槽。
4. 使用 required 与 optional slot 建立契约。
5. 根据槽是否存在决定是否创建 Host Region。
6. 解释为什么显式槽优于大量 `showXxx` 布尔值。
7. 说明 Shell 组件与业务内容组件的职责边界。
8. 使用组合实现控制反转。
9. 在 React DevTools 中检查 slot props。
10. 在 Elements 中验证省略槽不会产生空容器。

---

## 3. 运行课程

```bash
cd learn-frontend-web-course/stage11-react/module11-03-props-children-composition-api-design/03-explicit-slots-stable-api
npm install
npm run verify
npm run typecheck
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

---

## 4. 项目结构

```text
03-explicit-slots-stable-api/
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── scripts/
│   └── verify.mjs
└── src/
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

---

## 5. ReviewShell 的公共契约

源码定义：

```tsx
interface ReviewShellProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly summary?: ReactNode;
  readonly children: ReactNode;
  readonly actions: ReactNode;
  readonly aside?: ReactNode;
  readonly footer?: ReactNode;
}
```

它表达：

```text
title
→ 必须有

children
→ 必须有的主内容

actions
→ 必须有的操作区域

summary / aside / footer
→ 可选内容区域
```

为什么 `actions` 在本课设为 required？

因为这个 Shell 的业务定位是“审查与决策容器”。如果一个场景完全没有动作，调用方可以选择另一个更简单的展示组件。

这说明：

```text
required / optional
不是语法偏好
而是组件产品定位
```

---

## 6. children 作为 Primary Slot

组件主体：

```tsx
<section className="body-slot">{children}</section>
```

调用方：

```tsx
<ReviewShell ...>
  <ApprovalChecklist />
</ReviewShell>
```

children 仍然最适合表达：

```text
组件的主要内容
```

命名槽则表达围绕主内容的其他区域。

---

## 7. 命名 ReactNode Props

摘要：

```tsx
summary={<p>当前决定：pending</p>}
```

操作：

```tsx
actions={
  <>
    <button>阻断</button>
    <button>通过</button>
  </>
}
```

侧栏：

```tsx
aside={<RiskSummary />}
```

页脚：

```tsx
footer={<AuditNote />}
```

Shell 不需要知道：

```text
Summary 内部结构
按钮事件具体做什么
RiskSummary 怎样获取数据
AuditNote 如何排版
```

它只决定：

```text
这些内容出现在哪里
```

这是一种控制反转：

```text
Shell owns placement
Caller owns content and behavior
```

---

## 8. 为什么 actions 传 Element，而不是传一堆配置

另一种 API 可能是：

```tsx
<ReviewShell
  primaryActionLabel="通过"
  secondaryActionLabel="阻断"
  onPrimaryAction={...}
  onSecondaryAction={...}
  primaryActionLoading={false}
  secondaryActionDisabled={false}
/>
```

这在动作模型非常固定时可能合理。

但当动作内容经常变化：

```text
Button
Link
Menu
Permission Wrapper
Loading Indicator
Tooltip
Confirmation Trigger
```

把完整 ReactNode 交给调用方更灵活：

```tsx
actions={<ReleaseDecisionActions />}
```

Trade-off：

```text
ReactNode Slot
→ 灵活、组合性高
→ Shell 对动作一致性的控制较少

Structured Props
→ 约束强、便于统一
→ API 字段可能不断膨胀
```

真正的组件 API 设计不是固定答案，而是根据稳定变化轴选择。

---

## 9. 可选槽不应该创建空容器

源码：

```tsx
{aside ? <aside className="aside-slot">{aside}</aside> : null}
```

以及：

```tsx
{footer ? <footer className="footer-slot">{footer}</footer> : null}
```

调用方省略：

```tsx
<ReviewShell
  title="轻量只读审查"
  summary={<p>...</p>}
  actions={<a href="#details">查看详情</a>}
>
  <p id="details">...</p>
</ReviewShell>
```

最终 DOM 中不会出现空的：

```html
<aside></aside>
<footer></footer>
```

这比永远渲染空容器更清晰：

- 语义树更准确。
- CSS Grid 不会被空列影响。
- 可访问性树少一个无意义 landmark。
- 测试不需要忽略空区域。

---

## 10. Failure：Boolean Prop Explosion

脆弱 API：

```tsx
<ReviewShell
  showSummary
  showActions
  showAside
  showFooter
  compactActions
/>
```

问题不是“布尔 prop 本身错误”，而是它们开始编码大量组合状态。

五个独立布尔值理论上可以形成：

```text
2⁵ = 32
```

种组合。

实际只有少数组合有效，但类型没有表达约束：

```text
showActions = true
但动作内容从哪里来？

showAside = true
但 aside 数据是否存在？

showFooter = false
但 footer 文本是否仍被计算？
```

显式内容槽直接表达：

```text
有内容
→ 提供 ReactNode

没有内容
→ 省略 prop
```

---

## 11. 不是所有布尔 Props 都应该删除

合理布尔值：

```tsx
disabled
required
readOnly
open
selected
```

它们通常表达单一清晰状态。

危险信号：

```text
多个 showXxx
多个 useXxxLayout
多个 compactXxx
多个 enableXxxRegion
```

开始共同决定内部结构。

此时应考虑：

- Named Slots。
- Variant Union。
- 拆分组件。
- 结构化配置。
- 暴露受约束的子组件。

Variant Props 和 Discriminated Union 将在 RE-1103-005 完整学习。

---

## 12. Shell 与 Content 的职责分离

`ReviewShell` 负责：

- Landmark 语义。
- Header / Body / Aside / Footer 布局。
- 槽是否创建 Host Region。
- 响应式布局。
- 公共视觉结构。

调用方负责：

- 业务标题。
- 摘要内容。
- 操作按钮及事件。
- 风险数据。
- 主内容组件。
- 审计说明。

因此 Shell 可以复用，而不成为“知道所有业务”的巨型组件。

---

## 13. 组合如何减少条件分支

硬编码业务内容：

```tsx
function ReviewShell({ type }: { type: string }) {
  if (type === 'release') {
    return <ReleaseReview />;
  }

  if (type === 'security') {
    return <SecurityReview />;
  }

  // ...
}
```

组合式 API：

```tsx
<ReviewShell
  summary={<SecuritySummary />}
  actions={<SecurityActions />}
  aside={<PolicyEvidence />}
>
  <SecurityChecklist />
</ReviewShell>
```

新增业务场景时：

```text
调用方组合新内容
```

而不是：

```text
修改 Shell 内部所有条件
```

这有助于遵守稳定依赖方向：

```text
通用 Shell
不依赖
具体业务模块
```

---

## 14. Debug 实验

### 实验一：检查 Slot Props

1. 打开 React DevTools。
2. 选择第一个 `ReviewShell`。
3. 查看 `summary`、`actions`、`aside`、`footer` 和 `children`。
4. 识别它们是 React Element / Fragment 等描述。

### 实验二：检查省略槽

1. 选择第二个轻量 Shell。
2. 打开 Browser Elements。
3. 确认没有 `.aside-slot`。
4. 确认没有 `.footer-slot`。
5. 检查 Grid 自动回到单列。

### 实验三：验证行为所有权

1. 点击“通过”或“阻断”。
2. 观察摘要更新。
3. 找到按钮事件定义在调用方 `App`。
4. 确认 `ReviewShell` 没有 `onApprove`、`onBlock` 业务知识。

结论：

```text
Shell owns placement
Caller owns behavior
```

---

## 15. API 设计检查表

设计新的 Layout Component 时，回答：

1. 哪个区域是 primary children？
2. 哪些区域必须存在？
3. 哪些区域可选？
4. 槽位需要任意 ReactNode，还是受约束数据？
5. 调用方是否需要完全控制行为？
6. 省略槽是否应移除 Host Region？
7. 是否出现布尔组合爆炸？
8. Shell 是否开始依赖具体业务组件？
9. slot 名称是否表达业务语义？
10. 未来新增区域是否会破坏已有调用方？

---

## 16. 课程验收

不看文档回答：

1. 什么时候一个 children 已经不够？
2. Primary Slot 与 Named Slot 分别是什么？
3. 为什么 `actions` 可以设计为 required？
4. 命名 ReactNode props 带来什么控制反转？
5. 省略 aside 时为什么不应创建空 aside？
6. Boolean prop 一定是坏设计吗？
7. Boolean Explosion 的核心问题是什么？
8. ReactNode Slot 与 Structured Props 各有什么 Trade-off？
9. Shell 组件应该知道审批业务细节吗？
10. 如何用 React DevTools 和 Elements 分别验证 Slot？

---

## 17. 本课结论

```text
children
= 主要内容槽

named ReactNode props
= 多个明确 UI 区域

Shell
= 稳定位置与语义

Caller
= 具体内容与行为

Stable API
= 围绕真实变化轴建模
而不是不断增加内部开关
```

下一批：

```text
RE-1103-004
Callback Props 与 Intent-driven API

RE-1103-005
Variant Props、Boolean Explosion 与 Discriminated Union

RE-1103-006
API Evolution、Prop Forwarding 与兼容边界
```

---

## 18. 官方参考

- [React：Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React：Thinking in React](https://react.dev/learn/thinking-in-react)
- [React API Reference：Children alternatives](https://react.dev/reference/react/Children#alternatives)
