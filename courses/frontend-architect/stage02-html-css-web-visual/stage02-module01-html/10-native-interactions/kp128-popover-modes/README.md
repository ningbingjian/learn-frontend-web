# KP128：Popover 的 `auto` 与 `manual` 模式

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用全局 `popover` 属性创建原生浮层。
2. 理解省略值的 `popover` 等价于 `popover="auto"`。
3. 理解 `auto` 支持 light dismiss，而 `manual` 需要显式关闭。
4. 理解 popover 打开时进入 top layer，但并不会像 modal dialog 一样让页面其余内容 inert。
5. 使用 `:popover-open` 或 DOM API 观察浮层状态。

> **本节核心代码**：`popover`、`popover="manual"`。  
> **实验辅助代码**：声明式控制按钮、`:popover-open` 状态输出。

## 理论讲解

### 1. `auto` 是默认模式

```html
<div id="help" popover>帮助内容</div>
```

等价于：

```html
<div id="help" popover="auto">帮助内容</div>
```

`auto` popover 支持 light dismiss：常见情况下点击浮层外部或按 Esc 会关闭它；打开另一个不相关的 auto popover 也会参与浏览器的原生关闭规则。

### 2. `manual` 不会自动 light dismiss

```html
<div id="notice" popover="manual">...</div>
```

它需要通过声明式 show/hide 控件或 JavaScript API 显式关闭。多个独立 manual popover 可以同时保持打开。

适合需要用户主动处理、但又不需要模态阻塞背景的轻量浮层。

### 3. Popover 进入 top layer

打开的 popover 不受祖先 `overflow: hidden` 等普通层叠裁剪方式控制，并会进入浏览器 top layer。

但这不意味着它是 modal：页面其它控件通常仍然可交互。

### 4. `auto` 与 `manual` 是交互策略，不是视觉样式

选择模式时问：

- 点击外部应该自动关吗？→ `auto`
- 是否必须明确点击关闭/完成？→ `manual`

不要根据“这个浮层长得像卡片还是菜单”来决定模式。

## 动手编码：从 0 到 1

### 第 0 步：创建 auto popover

```html
<button popovertarget="auto-help">打开自动帮助</button>
<div id="auto-help" popover>点击外部可以关闭。</div>
```

**本步目标**：使用默认 `auto`。  
**为什么这样写**：声明式 HTML 已能完成基础交互。  
**运行后观察**：按钮可打开/关闭；点击外部可 light dismiss。

### 第 1 步：创建 manual popover

```html
<button popovertarget="manual-note" popovertargetaction="show">打开通知</button>
<div id="manual-note" popover="manual">...</div>
```

**本步目标**：建立不会自动 light dismiss 的浮层。  
**为什么这样写**：通知需要显式结束动作。  
**运行后观察**：点击外部不会关闭。

### 第 2 步：给 manual 配关闭按钮

```html
<button popovertarget="manual-note" popovertargetaction="hide">关闭</button>
```

**本步目标**：保证用户有明确退出方式。  
**为什么这样写**：manual 不应成为无法关闭的 UI。  
**运行后观察**：点击关闭按钮后消失。

### 第 3 步：用 `:popover-open` 观察状态

```js
popover.matches(':popover-open')
```

**本步目标**：读取真实打开状态。  
**为什么这样写**：不自行维护重复布尔变量。  
**运行后观察**：状态文字跟随 toggle 更新。

### 第 4 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：auto/manual popover 属性。
- **实验辅助代码**：状态日志和样式。

## 运行案例

使用最新现代浏览器直接打开 `index.html`。

## 效果验证

1. auto popover 可通过外部点击等 light-dismiss 行为关闭。
2. manual popover 点击外部不会自动关闭。
3. manual 有明确关闭按钮。
4. 两种 popover 打开后页面背景按钮仍可操作。
5. 能根据交互规则而不是视觉外观选择 auto/manual。
