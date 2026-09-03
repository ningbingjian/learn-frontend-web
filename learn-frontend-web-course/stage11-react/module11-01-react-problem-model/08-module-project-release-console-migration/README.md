# RE-1101-008：Module Project——Release Console Migration

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Must / Should  
> 类型：模块综合项目 + 渐进迁移 + 架构复盘  
> 前置课程：[RE-1101-007：Failure Lab——重复状态与 DOM 逃生](../07-failure-lab-duplicate-state-dom-escape/README.md)

---

## 1. 项目目标

本项目不是再做一个新的计数器，而是把 Module 11.01 的全部关键问题串起来：

```text
手工 DOM 同步失控
→ React Root
→ State 声明 UI
→ Component Tree
→ 单向数据流
→ 局部渐进接入
→ Strict Mode / Debug
→ 重复 State 与 DOM 所有权故障
→ 可验证的迁移结果
```

页面同时运行两个版本：

```text
左侧：命令式遗留发布控制台
右侧：React + TypeScript 发布控制台
```

左侧故意保留一个可复现的摘要同步漏洞。右侧不靠“把遗漏代码补齐”，而是改变状态所有权和更新模型。

---

## 2. 项目必须交付什么

本目录包含：

```text
08-module-project-release-console-migration/
├── README.md
├── MIGRATION_REPORT.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── scripts/
│   └── verify.mjs
└── src/
    ├── main.tsx
    ├── legacy.ts
    ├── App.tsx
    └── styles.css
```

交付物分别负责：

- `legacy.ts`：迁移前命令式基线与真实故障。
- `App.tsx`：迁移后 React 状态和组件树。
- `main.tsx`：两个技术边界的启动与挂载。
- `MIGRATION_REPORT.md`：迁移证据、组件树、时序和剩余问题。
- `verify.mjs`：不依赖浏览器的结构化项目检查。
- `README.md`：完整复刻、实验、验收和架构答辩。

---

## 3. 起始状态

进入：

```bash
cd learn-frontend-web-course/stage11-react/module11-01-react-problem-model/08-module-project-release-console-migration
```

先运行不依赖 npm 安装的项目结构检查：

```bash
npm run verify
```

预期：

```text
RE-1101-008 verification passed.
```

再安装并启动：

```bash
npm install
npm run dev
```

打开终端地址，应看到左右两套控制台。

完整验证：

```bash
npm run typecheck
npm run build
npm run verify
```

---

# Part A：建立迁移前基线

## 4. Step 1：先保留问题，不要先重写

打开：

```text
src/legacy.ts
```

遗留业务状态：

```ts
interface LegacyState {
  approvedCount: number;
  serviceOnline: boolean;
}
```

真正业务事实只有两项，但它们影响：

```text
审批数字
剩余审批摘要
进度条宽度
进度百分比
服务状态
发布按钮 disabled
发布按钮文本
```

命令式实现把这些结果分别写入 DOM。

迁移前必须先回答：

- 有多少 DOM 写入点？
- 哪些事件路径会触发它们？
- 哪一份数据是真正业务状态？
- 哪些 DOM 文本只是派生展示？
- 当前能否稳定复现错误？

如果没有迁移前证据，迁移后只能说“代码变成 React 了”，不能证明系统正确性提高。

---

## 5. Step 2：复现遗留同步漏洞

左侧执行：

1. 点击一次“通过下一项”。
2. 观察审批数字从 2 变成 3。
3. 观察进度从 50% 变成 75%。
4. 观察摘要仍写“还有 2 项”。
5. 点击“检查一致性”。

预期输出：

```text
摘要应为“服务在线，仍有 1 项审批未完成。”
实际仍为“服务在线，仍有 2 项审批未完成。”
```

原因位于审批事件：

```ts
count.textContent = String(state.approvedCount);
progress.style.width = `${progressValue}%`;
progressLabel.textContent = `${progressValue}%`;
releaseButton.toggleAttribute('disabled', !ready);

// 故意遗漏 summary.textContent
```

这证明遗留实现的正确性依赖每条事件路径手工维护全部输出。

---

## 6. Step 3：记录迁移前同步点

在 `legacy.ts` 搜索：

```text
textContent =
style.width =
toggleAttribute(
```

将它们分类：

```text
审批事件写入
服务切换事件写入
初始化写入
一致性检查写入
```

注意，一致性检查本身不是业务修复。它只是发现问题。

迁移目标不是把所有 DOM 写入搬进另一个函数，而是重新定义：

```text
Source State
Derived Values
State Owner
Render Output
DOM Owner
```

---

# Part B：建立 React 迁移版本

## 7. Step 4：只保存最小源 State

打开：

```text
src/App.tsx
```

`App` 保存：

```tsx
const [environment, setEnvironment] =
  useState<Environment>('staging');

const [serviceOnline, setServiceOnline] =
  useState(true);

const [approvals, setApprovals] =
  useState(initialApprovals);

const [releaseMessage, setReleaseMessage] =
  useState('尚未执行发布。');
```

为什么它们需要保存：

- `environment`：用户选择后会持续存在。
- `serviceOnline`：外部状态的本课模拟值。
- `approvals`：每个检查项是否完成。
- `releaseMessage`：最近一次发布动作结果。

它们不能仅由其他当前值直接推导。

---

## 8. Step 5：删除重复派生 State

React 版本没有：

```text
remaining State
progress State
ready State
summary State
```

而是在 Render 中计算：

```tsx
const completedCount =
  approvals.filter((approval) => approval.completed).length;

const remaining = approvals.length - completedCount;

const progress =
  Math.round((completedCount / approvals.length) * 100);

const ready =
  serviceOnline && remaining === 0;
```

摘要位于 `ReleaseDecision`，同样根据当前 Props 计算。

删除的不是功能，而是同步负担。

---

## 9. Step 6：建立 Component Tree

迁移后组件树：

```text
App（State Owner）
├── EnvironmentSelector
├── ApprovalChecklist
└── ReleaseDecision
```

### EnvironmentSelector

只负责：

- 显示环境选项；
- 表达环境选择意图。

### ApprovalChecklist

只负责：

- 渲染检查项；
- 通过 `onToggle(id)` 表达切换意图。

### ReleaseDecision

只负责：

- 根据当前快照显示决策摘要；
- 显示发布按钮和结果。

State 仍由 `App` 统一拥有。

这不是为了追求组件数量，而是形成三个可解释的职责边界。

---

## 10. Step 7：用不可变更新处理审批列表

点击检查项执行：

```tsx
setApprovals((current) =>
  current.map((approval) =>
    approval.id === id
      ? { ...approval, completed: !approval.completed }
      : approval,
  ),
);
```

当前先理解：

```text
不要直接修改 current 中已有对象
而是为发生变化的项创建新对象
```

数组 State、Identity 与更新队列的完整机制会在后续 Module 学习。

本项目需要这个最小规则，确保 State 更新能被清楚表达和追踪。

---

## 11. Step 8：让 UI 从同一快照生成

同一次 Render 中：

```text
completedCount
remaining
progress
ready
```

都来自同一份 `approvals` 和 `serviceOnline`。

它们分别驱动：

- 进度数字；
- 进度条宽度；
- 发布摘要；
- 发布按钮禁用状态；
- 按钮文本；
- A11Y `aria-valuenow`。

没有任何事件处理函数需要逐个更新这些 DOM 区域。

---

# Part C：渐进迁移边界

## 12. Step 9：同页保留 Legacy 与 React

`index.html` 提供两个容器：

```html
<div id="legacy-console"></div>
<div id="root"></div>
```

`main.tsx`：

```tsx
mountLegacyConsole(legacyContainer);
createRoot(reactContainer).render(<App />);
```

边界：

```text
#legacy-console
由 legacy.ts 命令式管理

#root
由 React Root 管理
```

迁移并不要求一次性删除整个旧页面。

可以按以下方式演进：

```text
先选一个边界清楚、故障频繁的区域
→ 建立输入输出契约
→ 在独立容器实现 React 版本
→ 并行验证
→ 切换流量或入口
→ 移除旧实现
→ 继续下一个区域
```

---

## 13. Step 10：执行同业务对照

### 左侧

1. 通过下一项审批。
2. 检查一致性。
3. 记录摘要漂移。

### 右侧

1. 勾选剩余检查项。
2. 切换服务状态。
3. 切换 Staging / Production。
4. 观察进度、摘要和按钮。
5. 满足条件后执行发布。

右侧不应该出现：

```text
进度已经 100%
但摘要仍说有剩余审批
```

原因不是 React 自动理解了业务，而是：

```text
App 保存最小事实
→ 业务规则集中派生
→ UI 从当前快照声明
```

业务规则写错仍然会产生 Bug，React 不会替开发者设计正确规则。

---

# Part D：验证与报告

## 14. Step 11：运行自动结构检查

执行：

```bash
npm run verify
```

脚本检查：

- 必要文件是否存在；
- `main.tsx` 是否同时挂载 Legacy 与 React；
- React 版本是否使用不可变列表更新；
- `App.tsx` 是否直接查询 DOM；
- 遗留版本是否保留命令式 DOM 证据；
- 迁移报告是否包含组件树和更新时序；
- `package.json` 是否提供验证命令。

这不是 UI 自动化测试，也不能替代真实浏览器实验。

它的价值是把一部分课程交付约束变成机器可检查规则。

---

## 15. Step 12：阅读迁移报告

打开：

```text
MIGRATION_REPORT.md
```

报告必须包含：

1. 迁移目标。
2. 迁移前故障证据。
3. 迁移后状态所有权。
4. Component Tree。
5. 一次更新的时间线。
6. Root 边界。
7. Before / After 对照。
8. React 尚未解决的问题。
9. Module 结论。

不要只看最终源码。架构能力要求能够说明：

```text
为什么迁移
迁移改变了什么
哪些风险下降
哪些问题仍存在
如何验证
```

---

## 16. Project Review：React 没有自动解决什么

当前项目没有真实实现：

- 登录和权限；
- 发布 API；
- 幂等键；
- 请求超时、取消与重试；
- Server State 缓存；
- 错误边界；
- 路由；
- 表单 Schema；
- 自动化组件测试；
- RUM 与日志；
- 灰度发布；
- SSR / Hydration。

这些不是遗漏，而是 Owner Boundary。

Module 11.01 的目标是建立声明式 UI、Root、Component Tree、State Owner 和渐进迁移模型。

后续模块会在正确位置补齐其他能力。

---

## 17. Wrong Way

### 17.1 把 Legacy DOM 同步函数原样放进 Effect

这只是把命令式复杂度包进 React，不等于建立声明式模型。

### 17.2 为每个显示字段创建 State

会重新制造：

```text
progress State
remaining State
ready State
summary State
```

### 17.3 一次性重写整个遗留系统

没有边界、回滚和并行验证的大爆炸迁移，风险通常高于渐进替换。

### 17.4 用 React 名义掩盖业务规则分散

即使使用 JSX，如果发布规则分别存在于多个组件和事件中，仍然会产生规则漂移。

### 17.5 把页面可运行当成迁移完成

迁移完成至少需要：

```text
功能对照
状态所有权
故障回归
可访问性
构建验证
迁移报告
剩余风险
回滚方案
```

---

## 18. Module Project 验收

### 运行验收

```bash
npm run verify
npm install
npm run dev
npm run typecheck
npm run build
```

### 行为验收

- 左侧同步 Bug 可以稳定复现。
- 右侧同样操作保持一致。
- 切换环境不会复制新的 ready State。
- 服务离线时发布按钮禁用。
- 全部审批完成且服务在线时可以模拟发布。
- 重置后回到初始状态。
- 键盘可以操作 radio、checkbox 和 button。

### 解释验收

不看文档回答：

1. Legacy 版本真正的 Source State 是什么？
2. 哪些 DOM 只是派生输出？
3. 为什么补一行 `summary.textContent` 不是架构修复？
4. React `App` 为什么是当前 State Owner？
5. `remaining`、`progress`、`ready` 为什么不保存？
6. `ApprovalChecklist` 怎样请求父组件更新？
7. 两个容器为什么可以在迁移期共存？
8. React 没有自动解决哪些生产问题？
9. 如果真实系统有 20 个 Legacy Widget，应如何制定迁移顺序？
10. 如何证明迁移结果，而不是只声称代码更现代？

---

## 19. Module 11.01 最终心智模型

完成 8 节课后，应能够画出：

```text
Host Document
└── DOM Container
    └── React Root
        └── Component Tree
            └── State Owner
                ├── Source State
                ├── Derived Values
                ├── Props Down
                ├── Callback Intent
                └── Render Output
                    └── React Commit
                        └── Managed DOM
```

并明确：

```text
React 负责
组件模型
状态驱动的 Render
Root 内 DOM 协调与提交

开发者仍负责
业务状态建模
组件边界
副作用边界
数据正确性
可访问性
性能
测试
生产治理
```

---

## 20. 下一阶段

Module 11.01 至此完成。

下一模块：

```text
Module 11.02
JSX、Element、Component 与 Render Output
```

它将深入回答：

- JSX 最终转换成什么？
- React Element 是 DOM 节点吗？
- Component 函数何时被调用？
- Render Output 有哪些合法类型？
- 纯渲染边界如何被破坏？
- JSX、Element、Fiber 与 Host DOM 的关系是什么？
