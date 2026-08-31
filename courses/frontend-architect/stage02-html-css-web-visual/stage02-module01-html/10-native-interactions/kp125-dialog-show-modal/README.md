# KP125：`dialog.showModal()` 与模态交互

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `showModal()` 打开真正的模态对话框。
2. 理解模态 dialog 会进入 top layer，并让页面其它内容变为不可交互状态。
3. 使用 `::backdrop` 设置模态背景。
4. 为 dialog 提供清晰的标题、关闭按钮和合理初始焦点。
5. 理解 `Esc` 是常见关闭机制，但不能因此省略可见关闭按钮。

> **本节核心代码**：`showModal()`、`close()`、`autofocus`。  
> **实验辅助代码**：`::backdrop`、焦点和背景点击观察。

## 理论讲解

### 1. `showModal()` 与 `show()` 的核心差异

```js
dialog.showModal();
```

打开的是模态对话框。浏览器会把它放进 top layer，并使对话框之外的文档内容处于 inert 状态，背景交互被阻止。

`show()` 则是非模态，背景仍可交互。

### 2. 模态适合真正需要中断流程的任务

例如：

- 删除确认；
- 关键权限说明；
- 必须先完成的身份验证步骤。

不要把所有提示都做成模态。普通帮助、轻量说明更适合 popover 或 `details`。

### 3. 初始焦点要有目的

浏览器会为模态 dialog 管理焦点进入。可以用：

```html
<button autofocus>取消</button>
```

明确初始焦点位置。

`autofocus` 不应该机械加在“最危险的确认按钮”上。删除类对话框通常把焦点放在安全的取消/关闭动作更稳妥。

### 4. 必须提供可见关闭机制

键盘用户通常可以按 `Esc` 请求关闭模态 dialog，但触摸设备没有物理 Esc；同时产品也不应让关闭机制依赖用户猜测。

因此应提供明确按钮，例如“取消”“关闭”。

### 5. `::backdrop`

模态 dialog 可以通过：

```css
dialog::backdrop {
  background: rgb(0 0 0 / 0.45);
}
```

突出当前任务。视觉样式不会改变模态语义本身。

## 动手编码：从 0 到 1

### 第 0 步：创建确认对话框

```html
<dialog id="delete-dialog">
  <h2>删除项目？</h2>
  <p>删除后无法恢复。</p>
</dialog>
```

**本步目标**：先建立有标题的对话框内容。  
**为什么这样写**：用户需要知道当前模态任务是什么。  
**运行后观察**：dialog 默认不显示。

### 第 1 步：添加安全关闭按钮

```html
<button id="cancel" type="button" autofocus>取消</button>
<button id="confirm" type="button">确认删除</button>
```

**本步目标**：确保有明确关闭入口。  
**为什么这样写**：不依赖 Esc。  
**运行后观察**：打开后取消按钮优先获得焦点。

### 第 2 步：用 `showModal()` 打开

```js
openButton.addEventListener('click', () => dialog.showModal());
```

**本步目标**：进入真正模态状态。  
**为什么这样写**：删除确认需要阻止背景操作。  
**运行后观察**：背景按钮无法点击。

### 第 3 步：关闭 dialog

```js
cancelButton.addEventListener('click', () => dialog.close('cancel'));
confirmButton.addEventListener('click', () => dialog.close('confirm'));
```

**本步目标**：使用对话框 API 退出模态。  
**为什么这样写**：同时可以携带简单结果值。  
**运行后观察**：dialog 关闭，页面恢复交互。

### 第 4 步：加入 `::backdrop`

```css
dialog::backdrop {
  background: rgb(0 0 0 / 0.45);
}
```

**本步目标**：视觉上强调模态层级。  
**为什么这样写**：使用浏览器提供的 backdrop，而不是手工创建遮罩 div。  
**运行后观察**：背景变暗。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`showModal()`、`close()`、`autofocus`。
- **实验辅助代码**：背景点击计数、`::backdrop` 和焦点状态输出。

## 运行案例

直接打开 `index.html`。

## 效果验证

1. 点击“删除项目”后 dialog 以模态方式打开。
2. 打开期间背景按钮不可点击。
3. 初始焦点位于“取消”。
4. 点击取消或确认会关闭 dialog。
5. 关闭后背景恢复可交互。
6. 按 Esc 可以请求关闭模态对话框，但页面仍提供显式取消按钮。
7. 能解释什么时候应该使用 `show()`，什么时候才应该使用 `showModal()`。
