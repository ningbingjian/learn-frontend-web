# KP117：`meter` 元素

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 使用 `<meter>` 表示已知范围中的标量或比例值。
2. 正确使用 `min`、`max`、`value`。
3. 理解 `low`、`high`、`optimum` 如何描述区间含义。
4. 区分 `<meter>` 与 `<progress>` 的业务语义。
5. 能通过 DOM API 观察 meter 的全部数值边界。

## 理论讲解

### 1. `meter` 表示“当前测量值处在什么范围”

适合：

- 磁盘使用率；
- 考试成绩；
- 信号强度；
- 已知范围的温度或评分。

例如：

```html
<label for="score">质量评分</label>
<meter id="score" min="0" max="100" value="72">72 / 100</meter>
```

### 2. `min` / `max` / `value`

```html
<meter min="0" max="100" value="72">72%</meter>
```

- `min`：范围下界，默认 0；
- `max`：范围上界，默认 1；
- `value`：当前测量值。

如果业务值不是 0～1，应明确给出合适范围。

### 3. `low` 和 `high` 描述区间边界

```html
<meter
  min="0"
  max="100"
  low="40"
  high="80"
  optimum="90"
  value="72"
>72</meter>
```

可以把 0～100 划分为低、中、高区域。

### 4. `optimum` 表示更理想的值位于哪里

如果：

```text
optimum = 90
```

说明高值区域更理想。

浏览器可能根据 low/high/optimum 改变视觉呈现，但具体颜色不应作为业务逻辑或唯一信息来源。

### 5. `meter` 不是任务进度条

错误方向：

```html
<meter value="60" max="100">上传 60%</meter>
```

上传是一个正在完成的任务，应使用：

```html
<progress value="60" max="100">60%</progress>
```

### 6. 给 meter 提供标签

```html
<label for="storage">磁盘使用率</label>
<meter id="storage" min="0" max="100" value="68">68%</meter>
```

不要只靠颜色告诉用户“好/坏”。

## 动手编码：从 0 到 1

### 第 0 步：准备页面

```html
<h1>meter 实验</h1>
```

### 第 1 步：加入基础度量

```html
<label for="quality-meter">质量评分</label>
<meter id="quality-meter" min="0" max="100" value="72">72 / 100</meter>
```

### 第 2 步：定义低、高和最优区间

```html
<meter
  id="quality-meter"
  min="0"
  max="100"
  low="40"
  high="80"
  optimum="90"
  value="72"
>72 / 100</meter>
```

**本步目标**：不仅声明数字范围，还声明业务上哪个区域更理想。

### 第 3 步：用 range 动态改变测量值

```html
<input id="quality-input" type="range" min="0" max="100" value="72">
```

```js
meter.value = Number(input.value);
```

**观察结果**：meter 随输入值变化。

### 第 4 步：观察 DOM 数值

```js
console.log({
  min: meter.min,
  max: meter.max,
  value: meter.value,
  low: meter.low,
  high: meter.high,
  optimum: meter.optimum,
});
```

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`meter` 的范围、当前值与区间属性。
- **实验辅助代码**：range 输入和 JS 用于动态观察，不是 meter 必需结构。

## 运行案例

直接浏览器打开 `index.html`。

## 效果验证

1. meter 明确声明 0～100 的范围。
2. `low=40`、`high=80`、`optimum=90` 都能从 DOM 读取。
3. range 改变时 meter 的 `value` 同步变化。
4. 页面使用文字标签解释测量对象。
5. 不依赖固定颜色判断优劣。
6. 能解释 meter 和 progress 的根本区别。

完成后继续 **KP118：`output`**。
