# KP091：表单控件的 name 与 value

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `name` 是表单提交数据的键，而 `value` 是当前提交值。
2. 判断哪些控件会成为成功控件并进入 `FormData`。
3. 正确处理同名字段，使用 `FormData.getAll()` 获取多值。
4. 区分 `id` 与 `name`：`id` 主要服务 DOM / label / CSS 等关联，不能替代提交字段名。

## 理论讲解

### 1. `name` 决定提交键

```html
<input name="username" value="alice">
```

会形成类似：

```text
username=alice
```

如果只有：

```html
<input id="username" value="alice">
```

但没有 `name`，它通常不会作为普通字段进入表单提交数据。

因此：

- `id`：页面内唯一标识、label 关联、DOM 查询等。
- `name`：提交给服务器的数据字段名，也用于 radio 分组等行为。

二者职责不同，可以同时存在。

### 2. `value` 是提交时的当前值

文本框的 `value` 会随着用户输入变化。

对于 checkbox / radio：

```html
<input type="checkbox" name="skill" value="html">
```

只有在选中时，`skill=html` 才会成为成功控件数据。

如果 checkbox 没写 `value`，默认提交值通常是 `on`，所以业务表单通常应显式写出有意义的 `value`。

### 3. 同名字段可以形成多值

例如技能多选：

```html
<input type="checkbox" name="skill" value="html" checked>
<input type="checkbox" name="skill" value="css" checked>
```

`FormData` 中会出现两个 `skill` 条目。

不要只使用：

```js
formData.get('skill')
```

然后误以为只有一个值。要获取全部：

```js
formData.getAll('skill')
```

### 4. “成功控件”不是“表单里的全部元素”

常见不会进入提交数据的情况包括：

- 没有 `name` 的普通输入控件。
- `disabled` 控件。
- 未选中的 checkbox / radio。
- 某些不是当前提交触发器的按钮值。

所以服务器接收到的是一组满足提交规则的键值对，而不是 DOM 快照。

### 5. `FormData` 是最直接的观察工具

```js
const data = new FormData(form);
console.log([...data.entries()]);
```

它能帮助你在前端调试“这次表单到底准备提交哪些字段”。

## 动手编码：从 0 到 1

### 第 1 步：创建带 name 的文本字段

```html
<form id="profile-form">
  <label>
    用户名
    <input id="username" name="username" value="alice">
  </label>
</form>
```

**为什么这样写**：同时保留 `id` 和 `name`，观察二者不同职责。

**运行后观察**：`FormData` 中会出现 `username`。

### 第 2 步：加入只有 id、没有 name 的字段

```html
<label>
  页面备注（故意没有 name）
  <input id="ui-note" value="只在前端使用">
</label>
```

**为什么这样写**：验证 `id` 不等于提交字段名。

**运行后观察**：`ui-note` 不会出现在 `FormData` entries 中。

### 第 3 步：加入同名 checkbox

```html
<label><input type="checkbox" name="skill" value="html" checked> HTML</label>
<label><input type="checkbox" name="skill" value="css" checked> CSS</label>
<label><input type="checkbox" name="skill" value="js"> JavaScript</label>
```

**为什么这样写**：同一个逻辑集合使用相同 `name`，具体选项用不同 `value`。

**运行后观察**：默认只有 `html`、`css` 两个值进入数据，未选中的 `js` 不会进入。

### 第 4 步：用 FormData 检查键值对

```js
const data = new FormData(form);
const entries = [...data.entries()];
const allSkills = data.getAll('skill');
```

输出：

```js
document.querySelector('#result').textContent = [
  `entries: ${JSON.stringify(entries)}`,
  `skill.getAll(): ${JSON.stringify(allSkills)}`,
  `是否包含 ui-note: ${data.has('ui-note')}`
].join('\n');
```

**为什么这样写**：同时验证普通键值、多值字段和无 name 字段。

**运行后观察**：勾选状态变化后再次点击检查，`skill` 数组会实时变化。

### 本节核心代码

- `name="字段名"`
- `value="提交值"`
- 同名 checkbox
- `FormData.getAll()`

### 实验辅助代码

- “检查 FormData”按钮：避免真的提交。
- JSON 输出：帮助观察 entries。
- `data.has()`：验证没有 `name` 的 UI 输入不会提交。

最终源码：[`index.html`](./index.html)

## 运行案例

打开 `index.html` 后：

1. 点击“检查 FormData”。
2. 勾选 JavaScript 或取消 CSS。
3. 修改用户名。
4. 再次点击检查。

## 效果验证

你应该能够验证：

- [ ] `username` 以当前输入值进入 FormData。
- [ ] `ui-note` 虽然有 `id` 和 value，但没有 `name`，不会进入 FormData。
- [ ] checkbox 只有选中项进入 FormData。
- [ ] `getAll('skill')` 可以得到全部同名值。
- [ ] 能解释 `id` 与 `name` 不是同一个概念，也不能互相替代。
