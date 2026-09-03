# RE-1101-005：整体应用与局部接入边界

> Module：11.01 React 的问题模型与声明式 UI  
> 深度：Should  
> 类型：Root Boundary + 遗留系统渐进接入实验  
> 前置课程：[RE-1101-004：Component Tree 与单向更新流](../04-component-tree-one-way-flow/README.md)

---

## 1. 本课要解决的问题

很多 React 教程只有一个结构：

```html
<div id="root"></div>
```

然后整页交给：

```tsx
createRoot(container).render(<App />);
```

真实企业系统不一定可以一次性重写。常见现场包括：

- 服务端模板页面；
- jQuery 或旧框架页面；
- CMS 页面；
- 多团队维护的门户；
- 只希望迁移一个复杂业务区域；
- 第三方宿主提供固定挂载点。

本课要回答：

1. React Root 的 DOM 所有权边界在哪里？
2. 一个页面能否存在多个 React Root？
3. 整体 React 应用与局部“岛状接入”如何选择？
4. 宿主移除挂载点时为什么要调用 `root.unmount()`？

最终页面同时存在：

```text
Host-owned DOM
React Root A：发布审批组件
React Root B：健康检查组件
```

它们在同一个 document 中，但不是同一棵 React Component Tree。

---

## 2. 学习目标

完成本课后，你应该能够：

- 解释 DOM Container、React Root 和 Component Tree 的所有权关系。
- 在同一页面创建两个独立 React Root。
- 说明多个 Root 为什么不会自动共享 State、Context 或生命周期。
- 从宿主 DOM 的 `data-*` 属性读取初始参数并传给 React 组件。
- 判断一个系统适合整页接管还是渐进式局部接入。
- 在宿主移除区域前调用 `root.unmount()`。
- 解释 Portal 与“再创建一个 Root”解决的问题不同。
- 列出多 Root 架构的通信、样式、版本和资源治理成本。

---

## 3. 起始状态

本课是独立 Lesson。

进入：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-problem-model/05-whole-app-vs-partial-roots
```

目录：

```text
05-whole-app-vs-partial-roots/
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

页面应出现：

- 深色遗留宿主 Header；
- 宿主导航与宿主内容卡片；
- React Root A 发布审批组件；
- React Root B 健康检查组件；
- “卸载健康组件”按钮。

---

## 4. Step 1：识别宿主拥有的 DOM

打开：

```text
index.html
```

宿主页面直接定义：

```html
<header class="legacy-header">...</header>
<nav class="legacy-nav">...</nav>
<article class="legacy-card">...</article>
```

这些节点不位于任何 React Root 内。

宿主还提供两个空容器：

```html
<section
  id="release-widget-root"
  data-environment="staging"
></section>

<div id="health-widget-root"></div>
```

边界图：

```text
document
├── legacy-header                 Host owned
├── legacy-nav                    Host owned
├── legacy-card                   Host owned
├── #release-widget-root
│   └── React Root A              React owned inside
└── #health-widget-root
    └── React Root B              React owned inside
```

React 不会自动接管 `document`，也不会管理 Root 容器外的节点。

---

## 5. Step 2：为不同挂载点创建独立 Root

打开：

```text
src/main.tsx
```

发布组件：

```tsx
const releaseRoot = createRoot(releaseContainer);

releaseRoot.render(
  <ReleaseWidget
    initialEnvironment={releaseContainer.dataset.environment ?? 'unknown'}
  />,
);
```

健康组件：

```tsx
const healthRoot = createRoot(healthContainer);
healthRoot.render(<HealthWidget />);
```

这不是一个 Root 中的兄弟组件，而是两棵完全独立的 React 树。

```text
Root A
└── ReleaseWidget
    └── approvedCount State

Root B
└── HealthWidget
    └── checkCount State
```

操作 Root A 不会触发 Root B 的 State 更新；卸载 Root B 也不会销毁 Root A。

---

## 6. Step 3：通过显式契约传入宿主参数

HTML：

```html
<section
  id="release-widget-root"
  data-environment="staging"
></section>
```

入口读取：

```tsx
releaseContainer.dataset.environment ?? 'unknown'
```

再通过 Props 交给组件：

```tsx
<ReleaseWidget initialEnvironment={...} />
```

这是最小宿主契约：

```text
Host DOM attribute
→ Bootstrap code
→ React Component Props
```

生产系统可以使用更正式的契约：

- JSON 初始化配置；
- 版本化 Schema；
- 自定义事件；
- URL 参数；
- 宿主提供的 SDK；
- 明确的 mount / update / unmount API。

不要让 React 组件在任意位置搜索宿主全局变量，否则边界会重新变得隐式。

---

## 7. Step 4：证明 Root 外仍由宿主管理

宿主按钮：

```tsx
legacyCounter.addEventListener('click', () => {
  legacyClicks += 1;
  legacyCounter.textContent = `宿主点击次数：${legacyClicks}`;
  hostLog.textContent = '宿主按钮只修改 React Root 之外的 DOM。';
});
```

它使用命令式 DOM API，但修改对象位于 React Root 外。

这是合法的所有权划分：

```text
宿主代码管理 Host-owned DOM
React 管理各自 Root 内 DOM
```

危险的不是页面同时存在两种技术，而是两个运行时同时写同一个 DOM 子树。

---

## 8. Step 5：卸载一个独立 Root

点击“卸载健康组件”执行：

```tsx
healthRoot.unmount();
```

预期：

- `HealthWidget` 从页面移除；
- Root B 中的事件和 State 生命周期结束；
- Root A 仍然可以继续审批；
- 宿主 Header 和导航不受影响。

`unmount()` 的意义不是简单地：

```js
container.innerHTML = '';
```

而是通知 React：

> 这棵树不再由你管理，请完成组件卸载和资源清理。

在旧系统切换 Tab、删除弹窗容器、替换局部页面时，这个边界尤其重要。

---

## 9. 整体应用与局部接入如何选择

### 选择一个整体 Root

适合：

- 新建 React 应用；
- 页面大部分交互需要共享路由、状态和上下文；
- 团队与发布流程统一；
- 希望保持一棵清晰 Component Tree；
- 需要跨区域协调 Suspense、Error Boundary 或数据层。

通常结构：

```text
#root
└── App
    ├── Router
    ├── Providers
    ├── Layout
    └── Features
```

### 选择局部多个 Root

适合：

- 遗留页面渐进迁移；
- CMS 或服务端模板中的独立 Widget；
- 不同区域生命周期由宿主控制；
- 暂时无法统一技术栈和发布节奏；
- 各 Widget 几乎不需要共享应用状态。

### 多 Root 的成本

需要明确处理：

- React 与依赖版本是否重复加载；
- Design Token 和全局样式是否冲突；
- 路由和 URL 所有权；
- 认证信息怎样共享；
- Widget 间通信协议；
- 错误监控和日志关联；
- `useId` 等跨 Root 标识冲突；
- 宿主销毁容器时的卸载；
- 多团队发布兼容性。

多个 Root 是迁移工具，不应默认成为最终架构。

---

## 10. Portal 与新 Root 的区别

假设同一应用需要把 Modal DOM 放到 `body` 下。

此时通常使用 Portal，而不是新建 Root：

```text
同一 React Component Tree
同一 State / Context
DOM 被提交到另一个宿主位置
```

新 Root 则是：

```text
另一棵 React Component Tree
独立 State / Context / 生命周期
```

因此：

```text
视觉上放到别处
→ Portal

技术上建立独立应用边界
→ createRoot
```

Portal 的完整使用会在 UI Engineering 与相关组件课程中学习。

---

## 11. Failure Lab

### 11.1 在同一个容器重复 createRoot

错误思路：

```tsx
createRoot(releaseContainer).render(<ReleaseWidget />);
createRoot(releaseContainer).render(<AnotherWidget />);
```

一个 DOM Container 应由一个 Root 管理。需要更新同一个 Root 时，保存 Root 对象并使用组件 State，或者在明确场景再次调用该 Root 的 `render`。

### 11.2 宿主直接改 Root 内部 DOM

```js
releaseContainer.querySelector('button').textContent = '宿主已修改';
```

这会让 React 的预期输出与真实 DOM 分离。

### 11.3 删除容器但不 unmount

旧框架直接移除包含 React Root 的节点，却不通知 React，可能让组件无法正常完成清理。

### 11.4 用多个 Root 代替正常组件拆分

同一个完整 React 应用内部，Header、Sidebar 和 Content 通常应该是同一棵组件树，而不是三个 Root。

---

## 12. Debug 实验

### Elements 面板

确认：

- `.legacy-card` 位于 Root 外；
- `ReleaseWidget` DOM 位于 `#release-widget-root` 内；
- `HealthWidget` DOM 位于 `#health-widget-root` 内。

### React DevTools

Components 面板会看到两个独立 Root。分别修改两个 Widget 的 State，观察它们互不影响。

### 卸载检查

点击卸载后：

- Health Root 从 Components 面板消失；
- Release Root 保留；
- 再点击卸载按钮不会重复执行，因为按钮被禁用。

---

## 13. 本课验收

不看文档回答：

1. 一个 HTML 页面能否有多个 React Root？
2. 多个 Root 是否共享 Context？
3. React 管理的是 Root 容器本身还是其内部内容？
4. 为什么遗留宿主仍可以修改 Root 外 DOM？
5. 什么情况下必须调用 `root.unmount()`？
6. Portal 和第二个 Root 的区别是什么？
7. 多 Root 为什么适合渐进迁移但不一定适合作为最终架构？
8. 宿主给 React Widget 传参应该建立什么契约？

实际验收：

- Root A 和 Root B 的 State 独立。
- 卸载 Root B 后 Root A 继续工作。
- 宿主按钮只改变 Root 外 DOM。
- React DevTools 能看到两个 Root。
- `npm run typecheck` 成功。
- `npm run build` 成功。

---

## 14. 下一课

下一课开启 Strict Mode，使用 Console 和 React DevTools 区分 Event、Render、Effect setup 与 cleanup：

[RE-1101-006：Strict Mode 与第一套 Debug 基线](../06-strict-mode-debug-baseline/README.md)
