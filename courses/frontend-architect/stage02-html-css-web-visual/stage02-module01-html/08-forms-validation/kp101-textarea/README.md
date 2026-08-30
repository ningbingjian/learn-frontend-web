# KP101：`textarea` 多行文本

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. 初始值写在元素内容中](#1-初始值写在元素内容中)
  - [2. rows 与 cols 描述初始可视尺寸](#2-rows-与-cols-描述初始可视尺寸)
  - [3. 换行与长度限制](#3-换行与长度限制)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 正确给 `<textarea>` 设置初始值，并区分 `value` 与 `defaultValue`。
2. 理解 `rows`、`cols` 只是初始可视尺寸提示，不等于输入限制。
3. 观察多行文本中的换行、字符数和 `maxlength` 约束。
4. 使用 `FormData` 验证 `<textarea>` 最终提交的值。

## 理论讲解

### 1. 初始值写在元素内容中

`<input>` 常用 `value` 属性声明初始值，但 `<textarea>` 不一样：它的初始值写在开始标签和结束标签之间。

```html
<textarea name="bio">第一行
第二行</textarea>
```

不要把下面这种写法当成 `<textarea>` 的初始值：

```html
<textarea name="bio" value="错误示例"></textarea>
```

在 DOM 中：

- `textarea.value`：当前值，会随着用户编辑而变化。
- `textarea.defaultValue`：初始值，表单 reset 时可用于恢复默认状态。
- `FormData` 收集的是当前 `value`。

### 2. `rows` 与 `cols` 描述初始可视尺寸

```html
<textarea rows="5" cols="36"></textarea>
```

`rows` 和 `cols` 主要描述控件初始显示多少行、多少列字符宽度的近似空间。

它们不是：

- 最大行数限制；
- 最大字符数限制；
- 最终 CSS 像素宽高的强制值。

真实项目通常仍会用 CSS 控制布局，例如：

```css
textarea {
  width: 100%;
  max-width: 40rem;
}
```

### 3. 换行与长度限制

多行文本的 `.value` 会包含换行符，因此可以把内容拆成多行观察：

```js
const lines = textarea.value.split(/\r\n|\r|\n/);
```

`maxlength` 用来限制文本长度：

```html
<textarea maxlength="120"></textarea>
```

它限制的是文本长度，不是“最多 120 个视觉字符宽度”。不同字符在视觉上占用的空间并不相同。

如果业务需要更复杂的“字数”规则，例如按 Unicode 字符、词数、字节数或后端数据库长度限制计算，应明确业务算法，不要直接把 `maxlength` 当成所有场景的唯一规则。

## 动手编码：从 0 到 1

### 第 1 步：创建最小页面与表单

**目标：** 先得到一个真正能提交的多行文本控件。

```html
<form id="profile-form">
  <label for="bio">个人简介</label>
  <textarea id="bio" name="bio">第一行：HTML 学习记录
第二行：继续完善表单知识</textarea>
</form>
```

**为什么这样写：**

- `name="bio"` 决定提交键名。
- 初始文本直接写在 `<textarea>` 内容中。
- `label` 为控件提供可理解的名称。

**运行后观察：** 文本框一开始就有两行内容。

### 第 2 步：增加尺寸提示与长度限制

**目标：** 增加 `rows`、`cols`、`maxlength`。

```html
<textarea
  id="bio"
  name="bio"
  rows="5"
  cols="36"
  maxlength="120"
>第一行：HTML 学习记录
第二行：继续完善表单知识</textarea>
```

**为什么这样写：**

- `rows` / `cols` 提供原生初始尺寸提示。
- `maxlength` 才负责长度上限。

**运行后观察：** 文本框显示空间变大，但仍然可以输入多行；达到长度上限后浏览器会阻止继续输入。

### 第 3 步：观察当前值、默认值和换行

**目标：** 看清“当前状态”和“初始状态”的差异。

```js
const textarea = document.querySelector('#bio');

console.log(textarea.value);
console.log(textarea.defaultValue);
console.log(textarea.value.split(/\r\n|\r|\n/).length);
```

**为什么这样写：** 用户修改文本后，`value` 会变化，而 `defaultValue` 仍可反映原始默认内容。

**运行后观察：** 修改文本后重新检查，当前值变化，默认值仍保持初始内容。

### 第 4 步：用 `FormData` 验证提交值

**目标：** 确认表单真正收集的是哪个值。

```js
const data = new FormData(document.querySelector('#profile-form'));
console.log(data.get('bio'));
```

**为什么这样写：** 表单知识不能只看控件表面状态，还要验证最终提交数据。

**运行后观察：** `FormData` 中的 `bio` 等于当前文本框内容，并保留换行。

### 第 5 步：加入 reset 实验

**目标：** 验证重置会恢复初始文本。

```html
<button type="reset">恢复初始值</button>
```

点击后再观察 `textarea.value`。

**运行后观察：** 当前内容恢复为 `defaultValue`。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** `<textarea>`、元素内容初始值、`rows`、`cols`、`maxlength`、`name`。

**实验辅助代码：** JavaScript 只负责显示 `value`、`defaultValue`、行数、长度和 `FormData`，不是 `<textarea>` 本身的必需代码。

## 运行案例

可直接双击打开 `index.html`，也可以在模块目录启动静态服务器：

```bash
python3 -m http.server 8080
```

然后进入 KP101 页面。

建议依次进行：

1. 修改初始两行文本。
2. 添加和删除换行。
3. 点击“检查当前状态”。
4. 点击“恢复初始值”。
5. 再次检查 `FormData`。

## 效果验证

完成实验后应能确认：

- `<textarea>` 初始值来自元素内容，而不是 `value` 属性。
- `value` 表示当前值，`defaultValue` 表示初始默认值。
- `rows` / `cols` 是尺寸提示，不是内容数量限制。
- `maxlength` 才是原生长度约束。
- 多行文本的换行存在于当前 `value` 中。
- `FormData` 提交当前值。
- reset 会把当前值恢复到默认值。
