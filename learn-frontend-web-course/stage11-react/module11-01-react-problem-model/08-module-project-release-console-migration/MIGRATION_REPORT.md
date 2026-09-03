# Release Console Migration Report

## 1. 迁移目标

把一个依赖分散 DOM 写入的发布控制台，迁移为 React + TypeScript
声明式控制台，同时保留迁移前基线，用于证明变化而不是只展示最终结果。

## 2. 迁移前证据

遗留实现的业务状态只有：

```text
approvedCount
serviceOnline
```

但同一事实被复制到：

```text
count.textContent
progress.style.width
progressLabel.textContent
summary.textContent
releaseButton.disabled
releaseButton.textContent
```

审批事件故意遗漏 `summary.textContent`，因此一次点击后可以稳定复现：

```text
业务状态 approvedCount 已增加
计数与进度已经更新
摘要仍显示旧的 remaining
```

这说明正确性依赖每条事件路径都记得维护全部 DOM 副本。

## 3. 迁移后状态所有权

React `App` 只保存不能直接推导的事实：

```text
environment
serviceOnline
approvals
releaseMessage
```

以下值在每次 Render 中计算：

```text
completedCount
remaining
progress
ready
summary
```

它们不是第二份 State，因此没有额外同步路径。

## 4. 组件树

```text
App（State Owner）
├── EnvironmentSelector
├── ApprovalChecklist
└── ReleaseDecision
```

数据通过 Props 向下流动；子组件通过回调表达用户意图；真正的状态更新发生在
`App`。

## 5. 一次审批更新的时间线

```text
用户点击 checkbox
→ ApprovalChecklist 调用 onToggle(id)
→ App.toggleApproval(id)
→ setApprovals 使用不可变 map 创建下一份数组
→ React 触发下一次 Render
→ completedCount / remaining / progress / ready 重新计算
→ 子组件收到同一快照对应的 Props
→ React 提交必要 DOM 变化
```

## 6. 根边界

`#legacy-console` 仍由命令式代码管理，`#root` 内部由 React Root 管理。
迁移过程没有要求一次性重写整个页面，因此可以按业务区域渐进替换。

## 7. 对照结论

| 维度 | 迁移前 | 迁移后 |
|---|---|---|
| 可信状态来源 | 业务对象 + 多个 DOM 副本 | App 中的最小源 State |
| 更新方式 | 事件回调分散写 DOM | 事件更新 State，Render 声明 UI |
| 派生值 | 手工同步 | Render 中计算 |
| 组件边界 | 无明确边界 | Environment / Checklist / Decision |
| 故障定位 | 搜索所有 DOM 写入点 | 先查 State Owner 和派生规则 |
| 渐进迁移 | 原有实现 | 两个容器并存 |

## 8. React 没有自动解决的问题

迁移后仍然需要开发者设计：

- 真实发布 API、鉴权、幂等和错误契约。
- Server State、缓存、重试和请求取消。
- 复杂表单与 Schema 校验。
- 组件测试、端到端测试和可观测性。
- Design System、国际化、性能预算与部署策略。

这些主题会在后续 Owner Module 中学习，不能把“使用 React”误认为业务架构已经完成。

## 9. Module 11.01 结论

React 的第一层价值不是缩短 DOM API，而是：

```text
明确状态所有权
+ 用组件组织 UI
+ 用当前状态声明 Render Output
+ 让 React 管理 Root 内的 DOM 提交
```
