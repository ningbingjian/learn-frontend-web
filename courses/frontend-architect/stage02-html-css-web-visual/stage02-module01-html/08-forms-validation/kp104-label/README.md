# KP104：`label` 表单标签

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. 显式 for 与 id 关联](#1-显式-for-与-id-关联)
  - [2. 隐式包裹关联](#2-隐式包裹关联)
  - [3. 点击区域与可访问名称](#3-点击区域与可访问名称)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `label[for] + control[id]` 建立显式关联。
2. 使用 label 包裹控件建立隐式关联。
3. 理解 label 会扩大可点击区域，并帮助辅助技术理解控件用途。
4. 使用 `control.labels` 检查 DOM 中实际关联的标签。

## 理论讲解

### 1. 显式 `for` 与 `id` 关联

最常见、最清晰的写法：

```html
<label for="email">邮箱</label>
<input id="email" name="email" type="email">
```

关联条件是：

```text
label.for === input.id
```

`name` 负责表单提交键名，`id` 在这里负责让 label 找到具体控件。两者职责不同。

显式关联的优点是 label 和控件可以不是父子关系，布局更自由。

### 2. 隐式包裹关联

也可以直接把控件放进 label：

```html
<label>
  昵称
  <input name="nickname">
</label>
```

这时浏览器能根据包含关系建立标签关联，不需要 `for`。

真实项目中两种写法都可使用；大型表单通常更偏向显式 `for/id`，因为 DOM 结构和关联关系更直观。

### 3. 点击区域与可访问名称

点击 label 文本通常会把焦点或激活行为转交给对应控件。例如：

- 点击文本框的标签会聚焦文本框；
- 点击 checkbox 标签会切换 checkbox 状态。

因此 label 不只是视觉文字，还扩大了用户可操作区域。

辅助技术也会利用标签关联理解控件用途。不要用下面方式代替真正标签：

```html
<input placeholder="邮箱">
```

placeholder 会在用户输入后消失，也不承担 label 的完整语义职责。

在 DOM 中可以观察：

```js
input.labels
```

它返回与该可标记控件关联的 label 集合。

注意：实验脚本读取的是 DOM 关联关系，不等于自行实现浏览器完整的 Accessible Name 计算算法。需要最终验证时，应查看 DevTools Accessibility 面板并配合真实辅助技术测试。

## 动手编码：从 0 到 1

### 第 1 步：创建没有标签的输入框

```html
<input id="email" name="email" type="email">
```

**问题：** 用户看到输入框，却不能仅靠 HTML 结构稳定知道它的用途。

### 第 2 步：添加显式 label

```html
<label for="email">邮箱</label>
<input id="email" name="email" type="email">
```

**为什么这样写：** `for="email"` 指向控件 `id="email"`。

**运行后观察：** 点击“邮箱”文字，焦点进入输入框。

### 第 3 步：创建隐式包裹标签

```html
<label>
  昵称
  <input id="nickname" name="nickname">
</label>
```

**运行后观察：** 点击“昵称”文字同样会聚焦其内部 input。

### 第 4 步：读取 `labels`

```js
const labels = [...input.labels].map(label => label.textContent.trim());
```

**目标：** 直接验证浏览器已经建立了标签关联。

### 第 5 步：观察点击后的焦点

给 label 添加点击日志：

```js
label.addEventListener('click', () => {
  setTimeout(() => console.log(document.activeElement.id));
});
```

**为什么使用 `setTimeout`：** label 的默认激活行为会在事件处理流程中完成，延后观察可以看到最终焦点状态。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** `label[for]`、控件 `id`、隐式 label 包裹。

**实验辅助代码：** JavaScript 只负责读取 `labels` 和当前焦点，便于观察浏览器已经建立的关联。

## 运行案例

直接打开 `index.html`，依次：

1. 点击“邮箱地址”文字。
2. 点击“昵称”文字。
3. 点击“检查标签关联”。
4. 观察 `document.activeElement` 与 `input.labels`。

## 效果验证

你应该能确认：

- 显式 label 通过 `for` 与控件 `id` 关联。
- 隐式 label 可以通过包裹控件建立关联。
- `name` 与 label 关联无关，它负责表单数据键名。
- 点击标签会扩大控件可操作区域。
- `control.labels` 可以检查关联的标签集合。
- placeholder 不能替代持久 label。
