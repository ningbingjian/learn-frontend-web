# KP116：`progress` 元素

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 使用 `<progress>` 表示任务完成进度。
2. 正确使用 `value` 和 `max`，知道 `progress` 没有 `min` 属性。
3. 区分确定进度与不确定进度。
4. 为进度条提供可访问标签，而不是只依赖视觉条形。
5. 使用 `HTMLProgressElement.position` 观察标准化进度比例。

## 理论讲解

### 1. `progress` 表示“任务完成了多少”

典型场景：

- 上传完成度；
- 安装进度；
- 批处理任务；
- 表单向导整体完成度。

基础写法：

```html
<label for="upload-progress">文件上传进度</label>
<progress id="upload-progress" value="35" max="100">35%</progress>
```

### 2. `max` 定义总工作量，最小值固定为 0

```html
<progress value="35" max="100">35%</progress>
```

`max` 必须大于 0；省略时默认是 `1`。

与 `<meter>` 不同，`progress` 没有 `min` 属性，最小值固定为 0。

### 3. 有 `value` 是确定进度

```html
<progress value="35" max="100">35%</progress>
```

表示已知当前完成 35 / 100。

DOM 中：

```js
progress.position
```

会得到标准化比例，例如 `0.35`。

### 4. 省略 `value` 才是不确定状态

```html
<progress max="100">处理中</progress>
```

这不是“0%”，而是：任务正在进行，但目前无法给出完成比例。

如果一个已经有 `value` 的进度条要切回不确定状态，应删除 `value` 属性：

```js
progress.removeAttribute('value');
```

此时 `.position` 为 `-1`。

### 5. 标签和元素内容职责不同

推荐：

```html
<label for="task-progress">处理进度</label>
<progress id="task-progress" value="60" max="100">60%</progress>
```

不要只依赖进度条内部的“60%”文字充当可访问标签。

### 6. `progress` 和 `meter` 不可互换

- `progress`：任务完成过程；
- `meter`：已知范围中的当前度量，例如磁盘使用率、考试成绩。

## 动手编码：从 0 到 1

### 第 0 步：准备最小页面

```html
<h1>progress 实验</h1>
```

### 第 1 步：加入确定进度

```html
<label for="upload-progress">文件上传进度</label>
<progress id="upload-progress" value="35" max="100">35%</progress>
```

**本步目标**：表达已知完成比例的任务。  
**观察结果**：浏览器显示约 35% 的进度。

### 第 2 步：加入不确定进度

```html
<label for="background-progress">后台索引状态</label>
<progress id="background-progress">处理中</progress>
```

**为什么不写 `value="0"`**：0 表示明确知道“完成 0”，不是“暂时不知道比例”。

### 第 3 步：增加进度按钮

```js
progress.value = Math.min(progress.value + 10, progress.max);
```

**观察结果**：每次点击，进度按 10 增长。

### 第 4 步：观察 `position`

```js
console.log(progress.value, progress.max, progress.position);
```

确定进度返回 0～1 的比例；不确定进度返回 `-1`。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`progress[value][max]` 与省略 `value` 的不确定进度。
- **实验辅助代码**：按钮和 JavaScript 只用于动态改变、观察进度。

## 运行案例

直接浏览器打开 `index.html`。

## 效果验证

1. 确定进度条具有 `value="35"` 和 `max="100"`。
2. 不确定进度条没有 `value` 属性。
3. 每个进度条都有可访问标签。
4. 确定进度 `.position` 能得到标准化比例。
5. 不确定进度 `.position` 为 `-1`。
6. 能解释为什么进度场景不应使用 `<meter>`。

完成后继续 **KP117：`meter`**。
