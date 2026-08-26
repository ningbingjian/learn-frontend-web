# RE-KP009：React DevTools 安装与基础使用

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 安装并打开 React Developer Tools。
2. 知道 React DevTools 关注的是 React 组件树，而不是普通 DOM 树。
3. 会在 Components 面板定位组件并查看 Props、State。
4. 会用页面选择器把屏幕上的区域定位到 React 组件。
5. 知道 Profiler 面板用于分析组件渲染性能，但本节只建立入口认知。
6. 能区分浏览器 Elements 面板与 React Components 面板各自回答什么问题。

> **本节核心操作**：打开 React DevTools 的 Components 面板，定位 `ProfileCard`，观察它的 Props `name/role` 与 State `visits` 如何变化。
>
> **实验辅助代码**：`ProfileCard`、`StatusBadge` 和计数按钮只是为了构造一棵容易检查的组件树。

## 理论讲解

### 1. 为什么有浏览器 DevTools 还需要 React DevTools

浏览器原生 Elements 面板看到的是：

```text
DOM Element
DOM attributes
CSS
layout
```

但 React 开发时常常想问：

```text
这个 DOM 是哪个组件渲染的？
组件收到了什么 Props？
当前 Hook State 是什么？
父子组件关系是什么？
是哪次更新导致重新渲染？
```

这些属于 React 语义层问题。

React DevTools 就是为了检查这层信息。

### 2. 两个最基础的面板

安装 React DevTools 浏览器扩展后，使用 React 的页面通常会出现：

```text
Components
Profiler
```

**Components** 主要用于：

- 浏览 React 组件树。
- 选择组件。
- 查看 Props。
- 查看 State / Hooks。
- 在调试场景中编辑部分 Props / State 观察结果。

**Profiler** 主要用于：

- 录制渲染。
- 查看哪些组件发生更新。
- 分析组件渲染耗时。

本节只认识 Profiler 入口，真正的性能分析会在后面的性能 Chapter 系统学习。

### 3. 安装方式

Chrome、Firefox、Edge 可以使用 React Developer Tools 浏览器扩展。

Safari 或不方便安装浏览器扩展的环境，可以使用独立的 `react-devtools` 包连接页面。

课程优先建议使用浏览器扩展，因为 Components / Profiler 会直接集成到浏览器开发者工具。

### 4. Components 面板看到的是组件身份

本节页面的 React 树大致是：

```text
App
└── ProfileCard
    └── StatusBadge
```

而浏览器 DOM 可能更像：

```text
main
└── section
    ├── strong
    ├── h2
    ├── p
    └── button
```

这两棵树不是同一层次。

因此以后排错时要先判断：

```text
我要看 DOM/CSS？
→ Elements

我要看组件 Props/State/渲染？
→ React DevTools
```

### 5. Props 与 State 是最值得先看的信息

`ProfileCard` 调用：

```jsx
<ProfileCard name="Ada" role="Frontend Engineer" />
```

所以在 DevTools 中应该能观察到 Props：

```text
name = "Ada"
role = "Frontend Engineer"
```

组件内部还有：

```jsx
const [visits, setVisits] = useState(0);
```

点击按钮后：

```text
visits: 0 → 1 → 2 ...
```

这能把“组件输入”和“组件内部状态”直接对应到页面行为。

### 6. DevTools 不是生产监控系统

DevTools 适合开发期定位问题，但它不能替代：

- 线上错误监控。
- Web Vitals / 性能监控。
- 日志平台。
- 用户行为分析。
- 自动化测试。

后面进入稳定性与可观测性阶段时会再建立完整工具边界。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

构造一棵最小组件树，让 DevTools 中同时出现：

```text
父组件
子组件
Props
State
一次 State 更新
```

### 第 1 步：创建最小页面入口

创建 `index.html`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 2 步：先创建叶子组件

在 `src/main.jsx` 写：

```jsx
function StatusBadge({ status }) {
  return <strong>{status}</strong>;
}
```

此时 DevTools 后面应该能看到组件名 `StatusBadge`。

### 第 3 步：创建带 Props 和 State 的组件

继续加入：

```jsx
function ProfileCard({ name, role }) {
  const [visits, setVisits] = useState(0);

  return (
    <section>
      <StatusBadge status="Active" />
      <h2>{name}</h2>
      <p>{role}</p>
      <p>visits: {visits}</p>
      <button onClick={() => setVisits((value) => value + 1)}>
        visits + 1
      </button>
    </section>
  );
}
```

### 第 4 步：从 App 传入 Props

加入：

```jsx
<ProfileCard name="Ada" role="Frontend Engineer" />
```

现在已经具备清晰的 Props 与 State 检查目标。

### 第 5 步：启动案例并打开 React DevTools

```bash
npm run dev -- ./01-react-foundations/kp009-react-devtools --config ./vite.config.js
```

打开浏览器开发者工具，切到：

```text
Components
```

如果看不到 Components，先确认扩展已经安装且当前页面确实加载了 React。

### 第 6 步：定位 `ProfileCard`

在组件树选择：

```text
App → ProfileCard
```

观察 Props：

```text
name
role
```

再找到它的 Hooks / State，记录 `visits` 当前值。

### 第 7 步：点击按钮观察 State

点击页面按钮几次：

```text
visits + 1
```

保持 `ProfileCard` 选中，观察 State 同步变化。

### 第 8 步：认识 Profiler 入口

切到 Profiler 面板，先只确认：

```text
这里可以录制并分析 React 渲染
```

本节不要提前研究所有 flamegraph 指标，后面会专门学习。

### 第 9 步：对照最终源码

最终源码见 [`src/main.jsx`](./src/main.jsx)。

- **本节核心操作**：通过 React DevTools 查看组件树、Props、State，并观察交互更新。
- **实验辅助代码**：`ProfileCard`、`StatusBadge`、按钮和示例文案仅用于制造清晰的调试目标。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./01-react-foundations/kp009-react-devtools --config ./vite.config.js
```

## 效果验证

请确认你能完成：

1. 在浏览器 DevTools 看到 React 的 Components 和 Profiler 面板。
2. 在 Components 中找到 `App → ProfileCard → StatusBadge`。
3. 查看 `ProfileCard` 的 `name`、`role` Props。
4. 点击按钮后观察 `visits` State 改变。
5. 能解释 Elements 面板与 Components 面板的区别。
6. 知道 Profiler 是性能分析入口，但不会把它和普通组件树检查混在一起。
