# KP056：`section` 与 `div` 的选择边界

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [`section` 有主题语义](#section-有主题语义)
  - [`div` 是普通容器](#div-是普通容器)
  - [标题与地标影响](#标题与地标影响)
  - [选择流程](#选择流程)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 明确 `section` 与 `div` 的核心区别不是默认样式，而是语义。
2. 在有明确主题的内容分区中使用 `section`。
3. 在纯布局、样式或脚本挂载场景中使用 `div`。
4. 理解命名后的 `section` 可能在可访问性树中成为 `region` 地标，而普通 `div` 不会自动产生这种语义。
5. 建立一个稳定的 `section` / `div` 选择流程。

## 理论讲解

### `section` 有主题语义

`section` 表示围绕某个主题形成的内容分区。

例如：

```html
<section aria-labelledby="features-title">
  <h2 id="features-title">产品功能</h2>
  <p>...</p>
</section>
```

这里的“产品功能”本身就是文档中的一个章节。

### `div` 是普通容器

`div` 本身没有额外内容语义。

它非常适合：

- 布局包裹；
- Flex / Grid 容器；
- 背景和边框；
- CSS class 挂载；
- JavaScript 组件根节点。

例如：

```html
<div class="button-row">
  <button>取消</button>
  <button>保存</button>
</div>
```

这只是两个按钮的布局容器，不代表一个新的文档章节。

### 标题与地标影响

`section` 属于有语义的分区元素。

一个有可访问名称的 `section`，例如通过 `aria-labelledby` 命名，在常见浏览器和辅助技术中可能映射为 `region` 地标。

```html
<section aria-labelledby="features-title">
  <h2 id="features-title">产品功能</h2>
</section>
```

因此不要为了样式随意增加大量命名 `section`，否则可能让页面的地标结构变得嘈杂。

普通 `div` 不会因为有 `class` 或边框就自动获得章节或地标语义。

### 选择流程

遇到一个容器时，可以按下面顺序判断：

1. 它是不是另一个更具体的元素？例如 `article`、`nav`、`aside`、`main`？
2. 如果不是，它是否围绕一个可以明确命名的主题？
3. 如果是主题分区，考虑 `section`。
4. 如果只是布局、样式或脚本容器，使用 `div`。

一个很实用的问题是：

> “如果去掉所有 CSS，我还希望浏览器和辅助技术知道这里是一个独立章节吗？”

如果答案是“否”，往往更接近 `div`。

## 动手编码：从 0 到 1

### 第 1 步：创建一个主题分区

```html
<section aria-labelledby="features-title">
  <h2 id="features-title">产品功能</h2>
  <p>支持实时协作和版本历史。</p>
</section>
```

它拥有明确主题，因此选择 `section`。

### 第 2 步：加入纯布局容器

```html
<div class="feature-grid">
  <div class="card">实时协作</div>
  <div class="card">版本历史</div>
</div>
```

`feature-grid` 和 `card` 在这个例子中只是视觉布局结构，没有新增章节主题，因此使用 `div`。

### 第 3 步：加入另一个有主题的 `section`

```html
<section aria-labelledby="faq-title">
  <h2 id="faq-title">常见问题</h2>
  <p>这里回答购买和部署问题。</p>
</section>
```

### 第 4 步：增加语义观察

```html
<pre id="output"></pre>
<script>
  const sections = [...document.querySelectorAll('section')];
  const divs = [...document.querySelectorAll('div')];

  document.querySelector('#output').textContent = [
    `section count: ${sections.length}`,
    `div count: ${divs.length}`,
    ...sections.map((section) => `section label source: ${section.getAttribute('aria-labelledby') || 'none'}`),
  ].join('\n');
</script>
```

这段脚本只统计 DOM 元素。要观察 `region` 等可访问性角色，应使用浏览器 DevTools 的 Accessibility 面板。

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- 有主题的 `<section aria-labelledby="...">`；
- 纯布局 `<div class="...">`；
- `h2` 标题。

**实验辅助代码**：

- CSS Grid；
- DOM 数量统计；
- Accessibility 面板检查步骤。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp056-section-vs-div
python3 -m http.server 8000
```

访问 `http://localhost:8000/`。

## 效果验证

### 验证 1：两个主题使用 `section`

“产品功能”和“常见问题”都是页面章节，因此使用 `section`。

### 验证 2：卡片网格使用 `div`

网格和卡片在本例中只是视觉布局结构，因此保留 `div`。

### 验证 3：查看 DOM 统计

输出应该显示页面中存在 `section` 与多个 `div`，两者承担不同职责。

### 验证 4：查看可访问性树

在 DevTools Accessibility 面板中检查命名后的 `section`。根据浏览器映射，它们可以表现为带名称的 region；普通布局 `div` 不会仅因为 CSS class 获得这样的章节语义。

本节最终需要记住：

> `section` 用来表达主题，`div` 用来组织结构；语义化不是消灭 `div`，而是把真实语义放到正确元素上。
