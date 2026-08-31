# KP129：`popovertarget` 声明式触发关系

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `popovertarget` 把按钮与 popover 按 ID 关联。
2. 理解省略 `popovertargetaction` 时默认是 `toggle`。
3. 使用 `show`、`hide`、`toggle` 三种声明式动作。
4. 理解基础开关行为无需手工写 click JavaScript。
5. 使用 `beforetoggle` / `toggle` 只做增强观察，而不是重做原生状态机。

> **本节核心代码**：`popovertarget`、`popovertargetaction`。  
> **实验辅助代码**：toggle 事件日志。

## 理论讲解

### 1. `popovertarget` 通过 ID 建立控制关系

```html
<button popovertarget="help">帮助</button>
<div id="help" popover>帮助内容</div>
```

按钮无需 JavaScript 即可控制对应 popover。

这不仅减少代码，也让浏览器知道“谁控制谁”，从而获得原生 invoker 关系和相关交互行为。

### 2. 默认动作是 `toggle`

没有写：

```html
popovertargetaction
```

时，按钮重复激活会在显示和隐藏之间切换。

### 3. 三种动作

显式写法：

```html
<button popovertarget="help" popovertargetaction="show">显示</button>
<button popovertarget="help" popovertargetaction="hide">隐藏</button>
<button popovertarget="help" popovertargetaction="toggle">切换</button>
```

- `show`：隐藏时显示，已显示时不做额外切换；
- `hide`：显示时隐藏；
- `toggle`：显示/隐藏反转。

### 4. 事件只负责业务增强

popover 支持状态变化事件：

```js
popover.addEventListener('beforetoggle', ...);
popover.addEventListener('toggle', ...);
```

可以用于日志、埋点、同步额外 UI。基础显示/隐藏仍由声明式 HTML 完成。

## 动手编码：从 0 到 1

### 第 0 步：创建目标 popover

```html
<div id="course-help" popover>课程帮助内容</div>
```

**本步目标**：定义可控制目标。  
**为什么这样写**：先给目标稳定 ID。  
**运行后观察**：支持 Popover 的浏览器中默认隐藏。

### 第 1 步：加入默认 toggle invoker

```html
<button popovertarget="course-help">切换帮助</button>
```

**本步目标**：用最少 HTML 完成开关。  
**为什么这样写**：默认 action 就是 toggle。  
**运行后观察**：重复点击显示/隐藏。

### 第 2 步：加入 show/hide 按钮

```html
<button popovertarget="course-help" popovertargetaction="show">只显示</button>
<button popovertarget="course-help" popovertargetaction="hide">只隐藏</button>
```

**本步目标**：精确控制动作。  
**为什么这样写**：某些 UI 需要独立打开/关闭按钮。  
**运行后观察**：动作不会意外反转。

### 第 3 步：监听状态变化

```js
popover.addEventListener('toggle', event => {
  log.textContent = `${event.oldState} → ${event.newState}`;
});
```

**本步目标**：观察浏览器状态机。  
**为什么这样写**：事件用于增强而不是控制核心开关。  
**运行后观察**：日志显示 `closed → open` 或相反。

### 第 4 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：三个声明式 invoker。
- **实验辅助代码**：`beforetoggle/toggle` 日志和 CSS。

## 运行案例

使用现代浏览器打开 `index.html`。

## 效果验证

1. 默认按钮无需 JS 即可 toggle popover。
2. `show` 按钮不会把已经打开的 popover 关闭。
3. `hide` 按钮不会把已经关闭的 popover 打开。
4. 事件日志反映真实状态变化。
5. 能解释为什么声明式 invoker 优先于手工维护一套 `hidden` class。
