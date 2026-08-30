# KP103：`datalist` 建议输入

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. list 关联 datalist](#1-list-关联-datalist)
  - [2. datalist 是建议不是强制选项](#2-datalist-是建议不是强制选项)
  - [3. 与 select 的边界](#3-与-select-的边界)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `input[list]` 关联 `<datalist>`。
2. 用 `<option value>` 提供浏览器原生输入建议。
3. 理解 datalist 允许用户输入建议列表之外的值。
4. 判断什么时候应该使用 `select` 而不是 `datalist`。

## 理论讲解

### 1. `list` 关联 `datalist`

```html
<input name="framework" list="framework-options">

<datalist id="framework-options">
  <option value="React"></option>
  <option value="Vue"></option>
</datalist>
```

关联关系来自：

- `<input list="framework-options">`
- `<datalist id="framework-options">`

两边的值必须对应。

`<datalist>` 自己不是一个独立提交控件；真正被提交的仍然是 `<input name="framework">` 的当前值。

### 2. `datalist` 是建议，不是强制选项

这是本节最重要的边界。

用户可以：

- 选择 React；
- 选择 Vue；
- 直接输入 Svelte；
- 输入列表中完全不存在的其它文本。

浏览器不会因为值不在 datalist 中，就自动把输入判定为无效。

如果业务规则要求“必须从后台允许的枚举中选一个”，应使用 `select`、radio 等强约束控件，或者额外增加真正的校验规则。

### 3. 与 `select` 的边界

`datalist` 更适合：

- 用户可以自由输入；
- 只是提供常用值建议；
- 希望减少输入成本，但不限制答案集合。

`select` 更适合：

- 值必须来自固定列表；
- 选项本身是业务枚举；
- 后端只接受受控值。

另外，datalist 的建议弹层外观、匹配方式和具体交互由浏览器实现，不要依赖某个浏览器的精确 UI 作为业务逻辑。

## 动手编码：从 0 到 1

### 第 1 步：创建普通输入框

```html
<label for="framework">常用框架</label>
<input id="framework" name="framework">
```

**目标：** 先得到一个允许自由输入的文本框。

### 第 2 步：创建 datalist

```html
<datalist id="framework-options">
  <option value="React"></option>
  <option value="Vue"></option>
  <option value="Angular"></option>
</datalist>
```

**目标：** 定义候选建议值。

### 第 3 步：使用 list 建立关联

```html
<input id="framework" name="framework" list="framework-options">
```

**运行后观察：** 聚焦输入框并输入字符时，浏览器会提供匹配建议。

### 第 4 步：验证列表外的值仍然可用

输入：

```text
Svelte
```

即使当前 datalist 没有 Svelte，输入框仍可以保留这个值。

### 第 5 步：用 JavaScript 区分“当前值”和“是否命中建议”

```js
const values = [...datalist.options].map(option => option.value);
const matched = values.includes(input.value);
```

**为什么这样写：** 这是实验观察代码，用来证明“命中建议”和“输入是否合法”是两个不同概念。

不要因此把前端的 `includes()` 当成服务端业务校验。

### 第 6 步：验证 FormData

```js
const data = new FormData(form);
console.log(data.get('framework'));
```

不管当前值是否来自建议列表，只要输入框是成功控件，当前值都会进入表单数据。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** `input[list]`、`datalist[id]`、`option[value]`。

**实验辅助代码：** JavaScript 负责显示当前值、建议命中情况和 FormData，不是 datalist 工作所必需的代码。

## 运行案例

直接打开 `index.html` 即可。

建议测试：

1. 输入 `Re`，观察建议。
2. 选择 `React`。
3. 点击“检查当前值”。
4. 改成 `Svelte`。
5. 再次检查。

## 效果验证

你应该能确认：

- `list` 的值通过 id 关联一个 datalist。
- datalist 的 option 提供建议候选。
- 真正提交的是 input 的当前值。
- 用户可以输入列表之外的文本。
- “出现在建议列表中”不等于“浏览器判定合法”。
- 固定枚举业务更适合 `select` / radio，而不是依赖 datalist 强制选择。
