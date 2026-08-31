# KP131：原生交互的渐进增强与回退

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 从无脚本也可理解的 HTML 内容开始构建交互。
2. 对 Popover API 和 Dialog API 做功能检测，而不是只看 User-Agent。
3. 设计“不支持时内容仍可见”的回退结构。
4. 区分核心内容、原生能力和 JavaScript 增强层。
5. 为 `details`、popover、dialog 选择合理的降级策略。

> **本节核心代码**：无脚本基础内容 + 原生元素。  
> **实验辅助代码**：功能检测、条件隐藏/启用与状态输出。

## 理论讲解

### 1. 渐进增强的顺序

推荐思路：

```text
可读 HTML 内容
    ↓
浏览器原生语义与交互
    ↓
功能检测
    ↓
JavaScript 增强
```

不要从“JS 必须成功运行，否则页面空白”开始。

### 2. `details` 天然适合基础回退

```html
<details>
  <summary>帮助</summary>
  <p>帮助内容。</p>
</details>
```

即使没有业务 JavaScript，它仍然可以使用。对于 `details[name]`，更老的环境即使不支持互斥分组，也通常还能退化成多个独立披露项。

### 3. Popover 可以做能力检测

```js
const supportsPopover = Object.hasOwn(HTMLElement.prototype, 'popover');
```

一个很实用的回退特征是：不支持 `popover` 属性的旧浏览器会把带未知属性的普通元素按普通内容渲染。只要 CSS 没有额外把它强制隐藏，帮助内容仍然可见。

因此可以让“现代浏览器是浮层，旧浏览器是普通文档内容”。

### 4. Dialog 需要更明确的无脚本回退

可检测：

```js
const supportsDialog =
  typeof HTMLDialogElement !== 'undefined' &&
  'showModal' in HTMLDialogElement.prototype;
```

如果支持，则启用 modal dialog；否则保留一个普通 `<section>` 确认区域或跳转到独立确认页。

不要在不支持时简单让关键确认功能消失。

### 5. 功能检测优于浏览器名称判断

不要写：

```js
if (navigator.userAgent.includes('Chrome')) { ... }
```

因为同一浏览器不同版本、WebView、嵌入环境能力不同。真正需要判断的是：**当前运行环境有没有这个 API**。

## 动手编码：从 0 到 1

### 第 0 步：先写无脚本可用的 details

```html
<details>
  <summary>基础帮助</summary>
  <p>这段内容不依赖 JavaScript。</p>
</details>
```

**本步目标**：确保核心说明始终可达。  
**为什么这样写**：渐进增强从 HTML 开始。  
**运行后观察**：禁用 JS 仍可展开。

### 第 1 步：加入 popover，但让旧环境看到普通内容

```html
<button popovertarget="quick-help">快速帮助</button>
<div id="quick-help" popover>帮助内容</div>
```

**本步目标**：现代环境获得浮层。  
**为什么这样写**：旧环境不识别属性时，div 仍是普通内容。  
**运行后观察**：支持环境中默认隐藏并由按钮控制。

### 第 2 步：准备 dialog 的普通 section 回退

```html
<section id="confirm-fallback">
  <h2>删除确认</h2>
  <p>当前环境使用普通页面确认区域。</p>
</section>
```

**本步目标**：无脚本/旧环境仍有关键内容。  
**为什么这样写**：不可逆操作不能因为 API 缺失而消失。  
**运行后观察**：默认可见。

### 第 3 步：功能检测后启用 dialog

```js
if (supportsDialog) {
  fallback.hidden = true;
  openButton.hidden = false;
}
```

**本步目标**：只在能力存在时切换到增强 UI。  
**为什么这样写**：避免运行时异常和不可用入口。  
**运行后观察**：现代浏览器显示“打开确认对话框”按钮。

### 第 4 步：输出检测结果

```js
status.textContent = `Popover=${supportsPopover}, Dialog=${supportsDialog}`;
```

**本步目标**：让能力判断可观察。  
**为什么这样写**：教学中区分“浏览器名称”和“实际能力”。  
**运行后观察**：现代浏览器通常两项为 true。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：始终可读的 HTML 回退内容。
- **实验辅助代码**：Popover/Dialog 功能检测和增强切换。

## 运行案例

1. 正常打开 `index.html`。
2. 在 DevTools 中禁用 JavaScript 后刷新，再观察基础帮助和普通确认区域。
3. 在现代浏览器中恢复 JavaScript，观察 popover 与 dialog 增强。

## 效果验证

1. 禁用 JavaScript 后 `details` 仍可使用。
2. 普通确认 section 在无 JS 情况下仍然可见。
3. 支持 Dialog API 时才显示打开 modal 的按钮。
4. 能解释 Popover 不支持时为什么不应再用 CSS 无条件隐藏其内容。
5. 代码没有依赖 User-Agent 字符串判断功能。
6. 能为一个新原生 Web API 设计“基础内容 → 功能检测 → 增强”的结构。
