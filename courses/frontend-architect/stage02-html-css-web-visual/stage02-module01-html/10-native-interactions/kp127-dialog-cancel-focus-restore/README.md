# KP127：`cancel`、`close` 与焦点恢复

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 dialog 的 `cancel` 与 `close` 事件。
2. 理解 `Esc` 等关闭请求会先产生可取消的 `cancel` 事件。
3. 使用 `preventDefault()` 在特定业务状态下阻止关闭请求。
4. 在 dialog 真正关闭后处理 `close`。
5. 把焦点恢复到打开 dialog 的触发元素，保持键盘操作连续性。

> **本节核心代码**：`cancel`、`close`、触发元素焦点恢复。  
> **实验辅助代码**：“阻止 Esc”复选框和事件日志。

## 理论讲解

### 1. `cancel` 是“关闭请求”事件

模态 dialog 在用户按 Esc 等平台关闭操作时会触发 `cancel`。

```js
dialog.addEventListener('cancel', event => {
  ...
});
```

这个事件可以取消：

```js
event.preventDefault();
```

取消后 dialog 保持打开。

### 2. `close` 表示“已经关闭”

当 dialog 真正关闭后会触发：

```js
dialog.addEventListener('close', () => {
  ...
});
```

如果 `cancel` 被阻止，当前关闭没有发生，因此不应把 `cancel` 和 `close` 当作同一个生命周期点。

### 3. 不要无理由禁用 Esc

Esc 是键盘用户关闭模态对话框的重要预期行为。只有在确实不能中断的流程中才考虑拦截，而且必须提供明确的替代退出/完成机制。

本节的“阻止 Esc”只是教学开关，用于观察事件差异，不是默认产品建议。

### 4. 关闭后恢复焦点

用户从一个按钮打开对话框，完成或取消后，通常应回到这个触发位置：

```js
let lastInvoker;
openButton.addEventListener('click', event => {
  lastInvoker = event.currentTarget;
  dialog.showModal();
});

dialog.addEventListener('close', () => {
  lastInvoker?.focus();
});
```

这样键盘用户不会突然失去当前位置。

## 动手编码：从 0 到 1

### 第 0 步：创建触发按钮和 dialog

```html
<button id="open">打开设置</button>
<dialog id="settings">...</dialog>
```

**本步目标**：建立触发来源。  
**为什么这样写**：后面要恢复到同一按钮。  
**运行后观察**：默认 dialog 隐藏。

### 第 1 步：保存触发元素

```js
let lastInvoker = null;
openButton.addEventListener('click', event => {
  lastInvoker = event.currentTarget;
  dialog.showModal();
});
```

**本步目标**：记录用户从哪里进入模态。  
**为什么这样写**：关闭时有明确恢复目标。  
**运行后观察**：打开后焦点进入 dialog。

### 第 2 步：监听 `cancel`

```js
dialog.addEventListener('cancel', event => {
  if (blockEscape.checked) event.preventDefault();
});
```

**本步目标**：观察 Esc 关闭请求。  
**为什么这样写**：展示该事件可取消。  
**运行后观察**：勾选开关时按 Esc 不关闭。

### 第 3 步：监听 `close` 并恢复焦点

```js
dialog.addEventListener('close', () => {
  lastInvoker?.focus();
});
```

**本步目标**：在真正关闭后恢复上下文。  
**为什么这样写**：键盘流程连续。  
**运行后观察**：关闭后外部按钮重新获得焦点。

### 第 4 步：提供显式关闭按钮

```js
closeButton.addEventListener('click', () => dialog.close('done'));
```

**本步目标**：不把 Esc 当唯一退出方式。  
**为什么这样写**：触摸与鼠标用户也有清晰动作。  
**运行后观察**：即使阻止 Esc，仍可点击“完成”。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`cancel` / `close`、`preventDefault()`、`.focus()`。
- **实验辅助代码**：复选框、事件日志和 CSS。

## 运行案例

直接打开 `index.html`，并重点用键盘测试。

## 效果验证

1. 打开 dialog 后按 Esc，日志先记录 `cancel`，随后实际关闭时记录 `close`。
2. 勾选“阻止 Esc”后按 Esc，dialog 保持打开。
3. 此时点击“完成”仍可关闭。
4. dialog 真正关闭后，焦点回到“打开设置”按钮。
5. 能解释为什么一般产品不应随意阻止 Esc。
