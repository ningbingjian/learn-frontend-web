# KP055：`section` 主题分区

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [`section` 表达主题分组](#section-表达主题分组)
  - [标题为什么重要](#标题为什么重要)
  - [页面章节组织](#页面章节组织)
  - [`section` 不是通用容器](#section-不是通用容器)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `section` 表示围绕一个主题形成的内容分区。
2. 为 `section` 提供能够说明主题的标题。
3. 使用嵌套 `section` 组织章节与子章节。
4. 理解“`section` 通常应该有标题”是语义设计建议，而不是简单的语法硬限制。
5. 避免把 `section` 当成替代所有 `div` 的万能容器。

## 理论讲解

### `section` 表达主题分组

`<section>` 适合把围绕同一个主题的一组内容组织起来。

例如课程详情页：

```html
<section>
  <h2>课程简介</h2>
  <p>...</p>
</section>

<section>
  <h2>课程大纲</h2>
  <p>...</p>
</section>
```

两个区域分别具有清晰主题，因此适合使用 `section`。

### 标题为什么重要

虽然 HTML 解析器不会要求每个 `section` 都必须包含标题，但从文档结构和可访问性角度，`section` 通常应该能够被一个标题清楚描述。

如果你很难回答：

> “这一节的标题应该是什么？”

那么这个容器可能只是为了布局或样式，此时 `div` 往往更合适。

### 页面章节组织

`section` 可以嵌套，用来表达子主题：

```html
<section>
  <h2>课程大纲</h2>

  <section>
    <h3>HTML</h3>
  </section>

  <section>
    <h3>CSS</h3>
  </section>
</section>
```

注意：HTML 不会自动调整标题级别，所以开发者仍需要主动设计 `h2 / h3` 层级。

### `section` 不是通用容器

如果只是为了：

- `display: flex`；
- 加边框；
- 加背景色；
- 做两列布局；

而这个区域没有独立主题，就不要因为“语义化 HTML”而强行使用 `section`。

语义化并不是：

> 所有 `div` 都换成语义标签。

而是：

> 有真实语义时使用对应元素，没有额外语义时使用普通容器。

## 动手编码：从 0 到 1

### 第 1 步：创建页面主标题

```html
<main>
  <h1>前端架构师课程</h1>
</main>
```

### 第 2 步：添加两个主题分区

```html
<section>
  <h2>课程简介</h2>
  <p>本课程从 Web 基础逐步进入工程化与架构设计。</p>
</section>

<section>
  <h2>课程大纲</h2>
  <p>课程分为 HTML、CSS 和 JavaScript 等阶段。</p>
</section>
```

### 第 3 步：为大纲添加子分区

```html
<section>
  <h2>课程大纲</h2>

  <section>
    <h3>HTML</h3>
    <p>学习结构和语义。</p>
  </section>

  <section>
    <h3>CSS</h3>
    <p>学习布局和视觉系统。</p>
  </section>
</section>
```

### 第 4 步：加入普通布局容器作对照

```html
<div class="actions">
  <button type="button">收藏</button>
  <button type="button">开始学习</button>
</div>
```

按钮工具栏没有新的文档主题，因此普通 `div` 更合适。

### 第 5 步：增加结构观察

```html
<pre id="output"></pre>
<script>
  const lines = [...document.querySelectorAll('section')].map((section, index) => {
    const directHeading = [...section.children].find((child) => /^H[1-6]$/.test(child.tagName));
    const parentSection = section.parentElement?.closest('section');
    return `section ${index + 1}: heading=${directHeading?.textContent || 'none'}, parent=${parentSection ? 'section' : 'none'}`;
  });
  document.querySelector('#output').textContent = lines.join('\n');
</script>
```

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- `<section>`；
- `h2 / h3` 标题；
- 主题分区嵌套。

**实验辅助代码**：

- `.actions` 普通布局容器；
- JavaScript 观察标题与父分区。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp055-thematic-section
python3 -m http.server 8000
```

访问 `http://localhost:8000/`。

## 效果验证

### 验证 1：每个主题都有可理解标题

“课程简介”“课程大纲”“HTML”“CSS”都应该能够单独解释所在分区的主题。

### 验证 2：子分区有清晰层级

“HTML”和“CSS”属于“课程大纲”，标题级别使用 `h3`。

### 验证 3：按钮工具栏没有使用 `section`

它只是布局和操作组合，没有新的内容主题。

### 验证 4：查看输出

输出应该能显示每个 `section` 的直接标题以及是否嵌套在另一个 `section` 中。

本节最终需要记住：

> `section` 的核心是“一个有主题的章节”，不是“比 div 更语义化的盒子”。
