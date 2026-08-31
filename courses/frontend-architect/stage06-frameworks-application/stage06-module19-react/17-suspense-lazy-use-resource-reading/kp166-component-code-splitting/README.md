# RE-KP166：组件级代码分割

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 dynamic `import()` 为什么能成为 Bundler 的代码分割边界。
2. 使用多个 `lazy` Component 把不同时机使用的 UI 拆成独立加载单元。
3. 理解 Component Boundary、Chunk Boundary、Suspense Boundary 三者不是同一个概念。
4. 根据首次加载成本和用户路径选择合理的分割粒度。
5. 避免把每个小组件都机械拆成 lazy chunk。

> **本节核心代码**：两个独立 `lazy(() => import(...))` 形成按需加载的 Component Boundary。  
> **实验辅助代码**：`delayImport()` 用固定延迟帮助观察不同 chunk 首次加载。

## 理论讲解

### 1. 为什么需要组件级代码分割

如果一个后台页面包含：

```text
Overview
Analytics
Settings
Audit Log
```

但用户首次只访问 Overview，就没有必要把所有低频页面代码都变成首屏必需成本。

组件级代码分割的目标是：

```text
把某部分 JS 的下载 / 解析 / 执行推迟到真正需要它时
```

### 2. dynamic import 给 Bundler 一个异步模块边界

```jsx
const AnalyticsPanel = lazy(() => import('./panels/AnalyticsPanel.jsx'));
```

Bundler 可以把异步 import 的模块放到独立 chunk。

React `lazy` 再把这个 Promise 与 Component Render / Suspense 协调起来。

### 3. 三种 Boundary 不要混淆

**Component Boundary**：React 组件抽象边界。

**Chunk Boundary**：Bundler 产物拆分边界。

**Suspense Boundary**：加载期间 UI fallback / Reveal 边界。

它们可以重叠，但概念不同。

### 4. 粒度太粗和太细都有成本

太粗：

```text
首页必须加载大量低频代码
```

太细：

```text
产生大量小 chunk
请求、调度、缓存与维护复杂度增加
UI 到处出现局部 loading
```

通常更适合按：

- route/page
- modal/editor
- dashboard heavy panel
- 低频管理工具

等较自然的用户行为边界拆分。

### 5. lazy 的缓存意味着“首次成本”最重要

每个 lazy Component 的 load 结果会缓存。

因此常见体验是：

```text
第一次进入 Analytics → 加载 chunk
切到 Settings → 加载另一个 chunk
再回 Analytics → 使用已加载模块
```

### 6. 真实项目还要结合 Bundler / Framework

本课只展示 React 层面的 lazy boundary。

真正生产优化还需要关注：

- 构建产物大小
- route prefetch
- chunk cache
- CDN
- framework 自动代码分割

不能只靠“多写几个 lazy”判断性能好坏。

## 动手编码：从 0 到 1

### 第 1 步：创建两个独立 Panel

```text
src/panels/AnalyticsPanel.jsx
src/panels/SettingsPanel.jsx
```

分别 `export default`。

### 第 2 步：声明两个 lazy Component

```jsx
const AnalyticsPanel = lazy(() => import('./panels/AnalyticsPanel.jsx'));
const SettingsPanel = lazy(() => import('./panels/SettingsPanel.jsx'));
```

现在两个动态 import 可以形成两个独立的异步模块边界。

### 第 3 步：使用 Tab 决定真正 Render 哪一个

```jsx
{tab === 'analytics' ? <AnalyticsPanel /> : <SettingsPanel />}
```

只有被尝试 Render 的 lazy Component 才会开始加载。

### 第 4 步：给动态区域提供 Suspense

```jsx
<Suspense fallback={<p>Panel chunk loading…</p>}>
  {tab === 'analytics' ? <AnalyticsPanel /> : <SettingsPanel />}
</Suspense>
```

### 第 5 步：用延迟帮助观察首次 chunk 成本

最终源码使用：

```jsx
function delayImport(promise, milliseconds) {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, milliseconds)),
  ]).then(([module]) => module);
}
```

Analytics 和 Settings 使用不同延迟，方便观察首次加载。

### 第 6 步：对照最终源码

最终入口：[`src/main.jsx`](./src/main.jsx)。  
Analytics：[`src/panels/AnalyticsPanel.jsx`](./src/panels/AnalyticsPanel.jsx)。  
Settings：[`src/panels/SettingsPanel.jsx`](./src/panels/SettingsPanel.jsx)。

- **本节核心代码**：多个 dynamic import + `lazy` + Suspense。
- **实验辅助代码**：Tab、延迟函数和演示文案。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp166-component-code-splitting --config ./vite.config.js
```

## 效果验证

1. 首次进入 Analytics 可以看到对应 fallback。
2. 首次进入 Settings 会加载另一个 Component Chunk。
3. 再次切回已经加载的 Panel 时通常无需重新等待模块加载。
4. 能解释 Component、Chunk、Suspense 三种 Boundary 的区别。
5. 能说明为什么代码分割粒度不是越细越好。

完成后继续 **RE-KP167：Suspense 与路由框架的关系**。
