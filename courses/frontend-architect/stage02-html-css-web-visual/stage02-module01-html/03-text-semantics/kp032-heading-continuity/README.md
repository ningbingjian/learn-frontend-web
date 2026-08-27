# KP032：标题层级连续性

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解标题层级应尽量按内容结构连续递进。
2. 识别从 `h2` 直接跳到 `h4` 一类常见结构问题。
3. 知道“跳级”不是单纯语法错误，而是内容关系可能表达不清的信号。
4. 能通过脚本或浏览器辅助功能检查页面标题大纲。

> **本节核心知识是标题结构连续性。**  
> JavaScript 只用于扫描标题级别并提示跳级位置，属于实验辅助代码。

## 理论讲解

### 1. 标题级别应该反映嵌套关系

理想结构：

```text
h1 页面主题
├─ h2 一级分区
│  ├─ h3 子分区
│  └─ h3 子分区
└─ h2 一级分区
```

从父主题进入子主题时，通常逐级下降：

```text
h1 → h2 → h3
```

### 2. 常见问题：直接跳级

例如：

```html
<h2>账户设置</h2>
<h4>修改密码</h4>
```

这里 `h4` 前面没有对应的 `h3` 层级。

这会让读者产生疑问：

```text
修改密码究竟是账户设置的直接子主题？
还是漏掉了一个中间分组？
```

### 3. 不要机械理解“绝对不能跳级”

HTML 并不会因为 `h2 → h4` 就拒绝解析页面。

真正的问题是：

> 跳级往往意味着内容层级表达不清。

所以工程实践中应该把它当成需要检查的结构信号，而不是简单背一个“语法禁止”。

### 4. 向上回退是正常的

下面是合理的：

```text
h1
  h2
    h3
  h2
```

从 `h3` 回到新的 `h2`，表示结束前一个子主题并开始新的同级分区。

需要重点检查的是向下深入时一次跨越多个层级，例如：

```text
h2 → h4
h1 → h3
```

### 5. 页面大纲检查

标题结构可以通过：

- 浏览器开发者工具查看 DOM。
- 无障碍树或 Accessibility 面板。
- 专门的 heading outline 工具。
- 自己写一个简单脚本扫描标题级别。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP032：标题层级连续性</title>
</head>
<body>
</body>
</html>
```

### 第 1 步：先故意写一个跳级结构

加入：

```html
<h1>账户中心</h1>
<h2>安全设置</h2>
<h4>修改密码</h4>
```

这里故意从 `h2` 跳到 `h4`。

### 第 2 步：加入一个正常分支

继续加入：

```html
<h2>个人资料</h2>
<h3>头像</h3>
<h3>昵称</h3>
```

这一部分是连续的 `h2 → h3`。

### 第 3 步：加入扫描结果区域

```html
<pre id="result"></pre>
```

### 第 4 步：收集所有标题

```html
<script>
  const headings = Array.from(
    document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );
</script>
```

### 第 5 步：提取标题数字

继续加入：

```js
const levelOf = heading => Number(heading.tagName.slice(1));
```

例如：

```text
H2 → 2
H4 → 4
```

### 第 6 步：检测向下跳级

```js
const lines = headings.map((heading, index) => {
  const level = levelOf(heading);
  const previous = headings[index - 1];

  if (previous) {
    const previousLevel = levelOf(previous);
    if (level > previousLevel + 1) {
      return `⚠ ${previous.tagName} → ${heading.tagName}：${heading.textContent}`;
    }
  }

  return `✓ ${heading.tagName}：${heading.textContent}`;
});
```

### 第 7 步：输出检查结果

```js
document.querySelector('#result').textContent = lines.join('\n');
```

页面中应该明确看到：

```text
⚠ H2 → H4：修改密码
```

### 第 8 步：修正结构做对照

把：

```html
<h4>修改密码</h4>
```

临时改成：

```html
<h3>修改密码</h3>
```

刷新后警告应该消失。

然后为了保留实验现象，再恢复 `h4`。

### 第 9 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：页面中的标题层级结构。
- **实验辅助代码**：标题扫描与跳级检测脚本。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- `h2 → h4` 会被实验脚本识别为跳级。
- `h2 → h3` 不会产生警告。
- 从 `h3` 回到 `h2` 是正常的同级分区切换。
- 能解释“标题跳级需要检查”比“标题跳级绝对非法”更准确。
