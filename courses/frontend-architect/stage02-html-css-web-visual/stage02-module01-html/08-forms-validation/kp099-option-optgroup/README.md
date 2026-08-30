# KP099：`option` 与 `optgroup`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `option` 定义 `<select>` 的可选值。
2. 区分 option 的显示文本和提交 `value`。
3. 使用 `optgroup` 为长选项列表建立语义分组。
4. 理解 `selected`、`disabled` 的初始与当前状态。
5. 使用 `selectedOptions` 和 FormData 观察实际选择结果。

## 理论讲解

### 1. option 的文本和 value 可以不同

```html
<option value="cn-shanghai">上海</option>
```

用户看到：

```text
上海
```

表单提交：

```text
cn-shanghai
```

这允许业务使用稳定 ID，而不是依赖会变化的展示文本。

### 2. 不写 value 时会退回到文本内容

```html
<option>上海</option>
```

此时 option 的值通常来自其文本内容。

生产系统如果后端需要稳定枚举值，最好显式写 `value`。

### 3. `selected` 表示默认选中状态

```html
<option value="frontend" selected>前端</option>
```

HTML 属性表达初始默认值。

JavaScript 中：

```js
option.selected
```

表示当前交互状态。

用户切换后，property 会变化。

### 4. `optgroup` 为相关选项分组

```html
<optgroup label="亚洲">
  <option value="tokyo">东京</option>
  <option value="seoul">首尔</option>
</optgroup>
```

`label` 是组名。

它适合：

- 国家按洲分组
- 商品按类别分组
- 团队成员按部门分组

`optgroup` 不是可选值本身，真正提交的仍然是内部 option。

### 5. 可以禁用 option 或整个 optgroup

```html
<option disabled>暂不可选</option>
```

或者：

```html
<optgroup label="维护中" disabled>
  ...
</optgroup>
```

禁用项不能作为正常用户选择结果。

### 6. placeholder 风格首项不是原生 placeholder 属性

select 没有和文本输入完全相同的 `placeholder` 属性。

常见写法：

```html
<option value="" selected disabled>请选择城市</option>
```

如果字段是 required，则空 value 可以配合原生校验要求用户作出选择。

### 7. 多选 select

```html
<select name="skill" multiple>
```

可同时选多个 option。

读取时应注意：

```js
select.selectedOptions
formData.getAll('skill')
```

但多选 select 的交互发现性和移动端体验并不总是理想，下一节 KP100 会重点讨论选型边界。

## 动手编码：从 0 到 1

### 第 1 步：创建普通 select

```html
<select id="city" name="city" required>
  <option value="" selected disabled>请选择城市</option>
  <option value="beijing">北京</option>
  <option value="shanghai">上海</option>
</select>
```

**运行后观察**：页面显示中文名称，FormData 得到稳定英文枚举值。

### 第 2 步：加入 optgroup

```html
<select name="office">
  <optgroup label="中国">
    <option value="shanghai">上海</option>
    <option value="shenzhen">深圳</option>
  </optgroup>
  <optgroup label="海外">
    <option value="singapore">新加坡</option>
    <option value="tokyo">东京</option>
  </optgroup>
</select>
```

### 第 3 步：加入 disabled 分组

```html
<optgroup label="筹备中" disabled>
  <option value="sydney">悉尼</option>
</optgroup>
```

### 第 4 步：加入 multiple 示例

```html
<select id="skills" name="skill" multiple size="4">
  <option value="html" selected>HTML</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
</select>
```

### 第 5 步：观察当前 selectedOptions

```js
[...select.selectedOptions].map(option => ({
  text: option.textContent,
  value: option.value
}));
```

### 第 6 步：观察 FormData 多值

```js
data.getAll('skill')
```

最终源码：[`index.html`](./index.html)

**本节核心代码**：`option` 的 `value` / `selected` / `disabled`，`optgroup label`，以及 `multiple`。

**实验辅助代码**：用于展示 selectedOptions、FormData 和 validity 的 JavaScript / CSS。

## 运行案例

直接打开 `index.html`：

1. 选择不同城市。
2. 查看 optgroup 分组效果。
3. 尝试选择 disabled 组中的选项。
4. 在多选框中选择多个技能。

## 效果验证

你应该能够验证：

- [ ] 用户看到的 option 文本可以与提交 value 不同。
- [ ] optgroup 提供组语义，但自己不是提交值。
- [ ] disabled 选项 / 分组不能正常选择。
- [ ] selected 属性定义初始选择。
- [ ] multiple select 可以产生多个同名 FormData 值。
- [ ] `selectedOptions` 可以读取当前选中的 option 集合。
