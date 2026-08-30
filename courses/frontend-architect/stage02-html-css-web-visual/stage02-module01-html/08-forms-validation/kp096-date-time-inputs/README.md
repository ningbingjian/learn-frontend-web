# KP096：日期与时间输入控件

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 选择 `date`、`time`、`datetime-local`、`month`、`week`。
2. 区分浏览器本地化 UI 与表单提交值格式。
3. 理解 `datetime-local` 不携带时区信息。
4. 使用 `min`、`max`、`step` 表达日期时间约束。
5. 设计浏览器控件不支持或业务需要时的回退策略。

## 理论讲解

### 1. 不同类型表达不同的数据模型

| 类型 | 典型值 | 表达内容 |
|---|---|---|
| `date` | `2026-08-30` | 日历日期 |
| `time` | `14:30` | 一天中的时间 |
| `datetime-local` | `2026-08-30T14:30` | 本地日期 + 时间，不含时区 |
| `month` | `2026-08` | 年 + 月 |
| `week` | `2026-W35` | ISO 周 |

浏览器显示给用户的日期格式可能根据操作系统和语言本地化，但元素的 `value` 使用标准化格式。

### 2. `datetime-local` 没有时区

这是最容易误解的地方。

```html
<input type="datetime-local">
```

它表达的是“某地墙上时钟显示的日期时间”，值本身没有 `Z`、`+08:00` 等时区信息。

如果业务数据代表全球唯一时间点，例如：

- 航班起飞时间
- 日志发生时间
- 线上会议时间

就必须在业务层明确：用户所在时区是什么，以及如何转换成服务端统一时间。

### 3. 提交值和展示文本要分开理解

用户可能在中文系统里看到：

> 2026年8月30日

但 JavaScript 读取：

```js
input.value
```

通常得到：

```text
2026-08-30
```

这就是原生日期控件的重要价值：浏览器负责本地化输入体验，应用拿到相对稳定的机器格式。

### 4. 约束属性仍然适用

```html
<input
  type="date"
  min="2026-08-01"
  max="2026-08-31"
>
```

时间控件也可使用：

- `min`
- `max`
- `step`
- `required`

并通过 `ValidityState` 观察约束结果。

### 5. `step` 的单位需要理解

对于 `time`、`datetime-local` 等时间相关控件，`step` 通常以秒为基础。

例如：

```html
<input type="time" step="900">
```

`900` 秒即 15 分钟。

### 6. 浏览器与平台 UI 可能不同

同一份 HTML：

- 桌面 Chrome
- Safari
- Android
- iOS

可能显示完全不同的日期选择界面。

HTML 定义的是语义、值模型和约束，不应该依赖某个浏览器特定的日历外观。

### 7. 回退策略

现代浏览器普遍支持主要日期时间类型，但真实业务仍应考虑：

- 某些平台控件能力有限
- 复杂时区规则原生控件解决不了
- 业务可能要求禁止特定日期、工作日等

优先保留原生控件能提供的语义和移动端体验，再按业务需求渐进增强。

## 动手编码：从 0 到 1

### 第 1 步：建立页面

创建 `index.html`，加入标准 HTML 骨架和一个 `<form>`。

### 第 2 步：加入 `date` 与 `time`

```html
<label for="birthday">日期</label>
<input id="birthday" name="birthday" type="date" value="2026-08-30">

<label for="meeting-time">时间</label>
<input id="meeting-time" name="meetingTime" type="time" step="900" value="14:30">
```

**本步目标**：观察用户界面和实际 `value` 的区别。

### 第 3 步：加入 `datetime-local`

```html
<input
  id="appointment"
  name="appointment"
  type="datetime-local"
  value="2026-08-30T14:30"
>
```

**为什么这样写**：直接观察值中没有时区偏移量。

### 第 4 步：加入 `month` 与 `week`

```html
<input name="billingMonth" type="month" value="2026-08">
<input name="sprintWeek" type="week" value="2026-W35">
```

### 第 5 步：用 FormData 观察提交值

```js
const data = new FormData(form);
const values = Object.fromEntries(data.entries());
```

案例会把每种控件提交的机器格式输出到页面。

### 第 6 步：输出类型支持信息

JavaScript 同时输出每个输入的：

- `type`
- `value`
- `validity.valid`

这段代码只用于实验观察，不是日期控件的必需代码。

最终源码：[`index.html`](./index.html)

**本节核心代码**：五类日期时间 `input` 以及它们的 `value` / `min` / `max` / `step`。

**实验辅助代码**：拦截提交、输出 `FormData` 和控件状态的 JavaScript，以及用于排版的 CSS。

## 运行案例

直接打开 `index.html`，分别操作五类日期时间字段，然后点击“查看提交值”。

建议重点观察：

1. 页面控件显示格式是否与 `value` 文本完全相同。
2. `datetime-local` 是否包含时区。
3. `time` 是否按 15 分钟步长工作。
4. `week` 的值是否使用 `W` 周编号。

## 效果验证

你应该能够验证：

- [ ] `date` 的提交值采用 `YYYY-MM-DD`。
- [ ] `time` 的值不包含日期。
- [ ] `datetime-local` 不包含 `Z` 或时区偏移。
- [ ] `month` 与 `week` 有独立的机器值格式。
- [ ] 浏览器显示 UI 可以本地化，而提交格式仍保持稳定。
- [ ] 全球时间点必须在业务层补充时区语义。
