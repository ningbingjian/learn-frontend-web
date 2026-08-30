# KP095：`number` 与 `range`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 判断一个字段到底是“数值”还是“看起来由数字组成的文本”。
2. 使用 `input[type="number"]` 表达可计算的数值输入。
3. 使用 `min`、`max`、`step` 描述数值约束，并观察 `ValidityState`。
4. 使用 `input[type="range"]` 表达已知范围内的近似选择。
5. 理解 `value`、`valueAsNumber` 以及浮点精度边界。

## 理论讲解

### 1. `number` 适合真正参与计算的数字

典型场景：

- 数量
- 年龄
- 温度
- 比例
- 金额（仍需考虑精度与币种策略）

以下内容虽然由数字字符组成，却通常不是“数值”：

- 手机号
- 邮编
- 身份编号
- 银行卡号
- 验证码

这些值不应该参与加减乘除，并且可能包含前导 `0`，更适合 `type="text"` 配合 `inputmode`、`pattern` 等能力。

### 2. `min`、`max`、`step`

```html
<input type="number" min="0" max="100" step="0.5">
```

它表达三个约束：

- 最小值是 `0`
- 最大值是 `100`
- 合法步长是 `0.5`

浏览器会把这些约束纳入原生约束校验。

可观察的状态包括：

- `rangeUnderflow`
- `rangeOverflow`
- `stepMismatch`

注意：这些属性是客户端约束，不替代服务端校验。

### 3. `value` 和 `valueAsNumber`

输入元素的 `value` 始终便于按字符串观察：

```js
input.value
```

数值控件还提供：

```js
input.valueAsNumber
```

当当前值无法解释为有效数字时，`valueAsNumber` 可能得到 `NaN`。

### 4. 浮点数不是十进制精确存储

JavaScript 使用 IEEE 754 浮点数，因此：

```js
0.1 + 0.2
```

并不严格等于十进制的 `0.3`。

所以金额等需要严格十进制精度的业务，不能因为用了 `type="number"` 就认为精度问题已经解决。真实系统通常会采用“最小货币单位整数”或专门的十进制计算方案。

### 5. `range` 表达“范围内选择”

```html
<input type="range" min="0" max="100" step="5">
```

它更适合：

- 音量
- 亮度
- 模糊程度
- 偏好强度

`range` 的一个重要体验特征是：用户通常不能像文本框一样直接看到精确数值，因此如果精确值重要，应在旁边显示当前值。

### 6. `number` 和 `range` 的选择边界

使用 `number`：

- 用户需要输入或确认精确值
- 数字可能跨度很大
- 需要键盘直接录入

使用 `range`：

- 上下界明确
- 值更偏向“调节”
- 快速交互比精确键入更重要

## 动手编码：从 0 到 1

### 第 1 步：建立最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP095 number 与 range</title>
</head>
<body>
  <h1>number 与 range</h1>
</body>
</html>
```

**本步目标**：先保证页面独立可运行。

**运行后观察**：浏览器显示一级标题。

### 第 2 步：添加精确数值输入

```html
<label for="score">评分</label>
<input id="score" name="score" type="number" min="0" max="10" step="0.5" value="7.5">
```

**为什么这样写**：评分是真正可比较、可计算的数字，并且业务范围明确。

**运行后观察**：可以使用键盘或浏览器提供的步进控件修改值。

### 第 3 步：添加范围输入

```html
<label for="volume">音量：<output id="volume-value">40</output></label>
<input id="volume" name="volume" type="range" min="0" max="100" step="5" value="40">
```

**为什么这样写**：音量是典型的有界调节场景，同时用 `output` 把当前精确值显示出来。

### 第 4 步：观察数值 API 和校验状态

```js
const score = document.querySelector('#score');
const result = document.querySelector('#result');

function inspectScore() {
  result.textContent = JSON.stringify({
    value: score.value,
    valueAsNumber: score.valueAsNumber,
    valid: score.validity.valid,
    rangeUnderflow: score.validity.rangeUnderflow,
    rangeOverflow: score.validity.rangeOverflow,
    stepMismatch: score.validity.stepMismatch
  }, null, 2);
}
```

**运行后观察**：尝试输入 `7.3`，由于 `step="0.5"`，可以看到 `stepMismatch` 的变化。

### 第 5 步：同步 range 当前值

```js
volume.addEventListener('input', () => {
  volumeValue.value = volume.value;
});
```

**运行后观察**：拖动滑块时，旁边的数值实时变化。

### 第 6 步：验证“数字文本”边界

案例额外保留一个手机号字段：

```html
<input type="text" inputmode="numeric" name="phone" value="0013800138000">
```

**为什么不用 `number`**：手机号不是用于数学运算的数值，并且前导 `0` 可能有业务意义。

最终源码：[`index.html`](./index.html)

**本节核心代码**：`type="number"`、`type="range"`、`min`、`max`、`step`、`valueAsNumber`。

**实验辅助代码**：用于打印 `ValidityState`、同步 `output` 和展示字段差异的 JavaScript / CSS。

## 运行案例

直接用浏览器打开 `index.html`。

建议依次尝试：

1. 把评分改成 `11`。
2. 把评分改成 `7.3`。
3. 清空评分。
4. 拖动音量滑块。
5. 查看手机号前导 `0` 是否被保留。

## 效果验证

你应该能够验证：

- [ ] `number` 的 `value` 是字符串，`valueAsNumber` 提供数值视角。
- [ ] 超过 `max` 后 `rangeOverflow` 变为 `true`。
- [ ] 不符合 `step` 时 `stepMismatch` 变为 `true`。
- [ ] `range` 的当前值可以通过 `output` 明确展示。
- [ ] 手机号使用文本输入时可以保留前导 `0`。
- [ ] HTML 数值约束不能替代服务端业务校验。
