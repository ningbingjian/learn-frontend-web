# KP105：帮助文本与 `aria-describedby`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. 持久说明文字](#1-持久说明文字)
  - [2. aria-describedby 建立描述关联](#2-aria-describedby-建立描述关联)
  - [3. placeholder 的使用边界](#3-placeholder-的使用边界)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 为需要额外解释的表单字段提供持久可见帮助文本。
2. 使用 `aria-describedby` 把控件与一段或多段说明关联。
3. 区分 label、帮助文本和 placeholder 的职责。
4. 检查 `aria-describedby` 中的 ID 是否真实存在。

## 理论讲解

### 1. 持久说明文字

label 回答“这个字段是什么”：

```html
<label for="username">用户名</label>
```

帮助文本回答“应该怎么填、有什么限制”：

```html
<p id="username-help">用于公开个人主页，不要填写邮箱。</p>
```

当规则对用户完成任务很重要时，应让说明持续可见，而不是只藏在 placeholder 或 hover 提示里。

### 2. `aria-describedby` 建立描述关联

```html
<input
  id="username"
  name="username"
  aria-describedby="username-help username-format"
>
```

`aria-describedby` 的值是一个或多个元素 ID，以空格分隔。

浏览器与辅助技术可以据此把这些内容作为控件的补充描述。

它是“描述”，不是“标签”。因此常见组合是：

```text
label → 字段名称
aria-describedby → 帮助/格式/补充说明
```

不要因为有 `aria-describedby` 就删除 label。

### 3. placeholder 的使用边界

placeholder 可以提供短示例：

```html
<input placeholder="例如 nick_2026">
```

但不适合承担唯一的字段名称或关键规则，因为：

- 用户输入后 placeholder 消失；
- 它容易与真实值混淆；
- 长规则不适合塞进输入框内部；
- 它不能替代清晰、持久的 label 和帮助文本。

## 动手编码：从 0 到 1

### 第 1 步：创建 label + input

```html
<label for="username">用户名</label>
<input id="username" name="username">
```

**目标：** 先建立字段名称。

### 第 2 步：添加持久帮助文本

```html
<p id="username-help">用于公开个人主页，不要填写邮箱。</p>
```

**目标：** 页面上始终能看到关键说明。

### 第 3 步：用 aria-describedby 建立关联

```html
<input
  id="username"
  name="username"
  aria-describedby="username-help"
>
```

**运行后观察：** DOM 中 input 已明确引用这段说明。

### 第 4 步：关联多段说明

```html
<p id="username-format">4～20 个字符，可使用字母、数字和下划线。</p>

<input aria-describedby="username-help username-format">
```

**为什么这样写：** 一个字段可以同时拥有用途说明和格式说明，不需要把所有文字合并到 label 中。

### 第 5 步：用 placeholder 提供短示例

```html
<input placeholder="例如 nick_2026">
```

它只提供示例，不替代前面的 label 和持久帮助文本。

### 第 6 步：检查引用 ID 是否存在

```js
const ids = input.getAttribute('aria-describedby').split(/\s+/);
const nodes = ids.map(id => document.getElementById(id));
```

**目标：** 避免拼错 ID 导致关联静默失效。

实验脚本只解析 DOM 引用，不自行宣称等价于浏览器完整的 Accessible Description 计算。最终应配合 Accessibility 面板和辅助技术验证。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** label、持久说明元素、`aria-describedby`、placeholder 示例。

**实验辅助代码：** JavaScript 用于解析被引用的 ID、检查缺失节点并输出对应文本。

## 运行案例

直接打开 `index.html`，点击“检查描述关联”。

还可以在 DevTools Elements / Accessibility 中选择用户名输入框，观察其名称和描述信息。

## 效果验证

你应该能确认：

- label 与帮助文本职责不同。
- 关键帮助内容应持久可见。
- `aria-describedby` 可以引用一个或多个说明元素。
- 被引用 ID 拼错时关联会失效，因此值得检查。
- placeholder 适合短示例，不应代替字段名称和关键帮助规则。
