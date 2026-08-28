# KP059：页面片段导航

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：理解 `#id` 片段目标、滚动与焦点行为，以及片段编码和浏览器历史记录之间的关系。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. `#id` 如何定位页面目标](#1-id-如何定位页面目标)
  - [2. 滚动与焦点不是完全一回事](#2-滚动与焦点不是完全一回事)
  - [3. URL 编码、`location.hash` 与历史记录](#3-url-编码locationhash-与历史记录)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 使用 `<a href="#target-id">` 跳转到同页目标。
2. 理解片段标识符与元素 `id` 的匹配关系。
3. 区分“页面滚动到目标”和“键盘焦点移动到目标”。
4. 通过 `location.hash` 与 `hashchange` 观察片段变化。
5. 理解包含空格、中文或特殊字符的片段在 URL 中可能被编码。
6. 使用浏览器前进 / 后退验证片段导航进入 session history。

## 理论讲解

### 1. `#id` 如何定位页面目标

同一个 HTML 页面内部可以通过 fragment 导航到指定元素：

```html
<a href="#install">跳到安装说明</a>

<h2 id="install">安装说明</h2>
```

这里：

```text
#install
```

是 URL fragment。

浏览器会在当前文档中寻找：

```html
id="install"
```

对应的目标，并把它滚动到合适的视口位置。

如果当前地址原本是：

```text
https://example.com/docs/index.html
```

点击后通常会变为：

```text
https://example.com/docs/index.html#install
```

fragment 属于 URL 的客户端部分。对于普通 HTTP 请求，`#install` 不会作为 HTTP 请求目标的一部分发送给服务器；浏览器在加载文档后处理片段定位。

### 2. 滚动与焦点不是完全一回事

很多初学者会把两件事混在一起：

1. 浏览器把目标滚动到视口中；
2. 键盘焦点移动到目标元素。

片段导航的核心行为是“定位 indicated part”。实际焦点结果与：

- 目标元素本身是否可聚焦；
- 浏览器实现；
- 辅助技术；
- 页面脚本；

都可能有关。

因此不能仅凭“页面滚动过去了”就断言“焦点一定已经移动”。

本节案例会同时打印：

```js
location.hash
```

和：

```js
document.activeElement
```

用于观察两者。

如果产品流程明确要求焦点进入目标，例如“跳到主要内容”的 skip link，要单独验证真实键盘与读屏体验；必要时可以让目标具备合适的可聚焦能力，并在脚本增强方案中显式调用 `focus()`。

> 不要为了让所有标题都能被脚本聚焦，就机械地给页面每个元素添加 `tabindex="0"`。这会改变正常 Tab 顺序。

### 3. URL 编码、`location.hash` 与历史记录

片段中如果包含中文、空格或其他特殊字符，浏览器地址栏可能显示经过百分号编码后的形式。

例如 JavaScript：

```js
encodeURIComponent('安装指南')
```

会得到类似：

```text
%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97
```

因此工程中通常更偏好稳定、可读、易引用的 ASCII `id`：

```html
<h2 id="install-guide">安装指南</h2>
```

当前片段可以通过：

```js
location.hash
```

读取。

片段变化还会触发：

```js
window.addEventListener('hashchange', handler)
```

普通的片段导航通常会形成 session history 记录，所以连续点击：

```text
#overview
#install
#faq
```

之后，可以使用浏览器后退 / 前进在这些片段之间移动。

这也是为什么很多文档页、FAQ、目录导航可以不依赖框架路由就拥有基本历史行为。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：创建长页面和目标区块

**目标**：准备多个能明显产生滚动的目标。

```html
<nav aria-label="页面目录">
  <a href="#overview">概览</a>
  <a href="#install">安装</a>
  <a href="#faq">常见问题</a>
</nav>

<section id="overview">
  <h2>概览</h2>
  <p>...</p>
</section>

<section id="install">
  <h2>安装</h2>
  <p>...</p>
</section>

<section id="faq">
  <h2>常见问题</h2>
  <p>...</p>
</section>
```

**为什么这样写**：`href="#..."` 与 `id="..."` 建立原生片段目标关系。

**运行后观察**：点击目录项后页面会滚动到对应区块。

### 第 2 步：增加足够的垂直空间

**目标**：让三个目标位置足够分散，便于观察滚动。

最终案例使用 CSS：

```css
section {
  min-height: 70vh;
  scroll-margin-top: 24px;
}
```

**为什么这样写**：`min-height` 只是为了实验可见性；`scroll-margin-top` 则用于给滚动定位留出视觉余量。

**运行后观察**：每次片段跳转都有明显位置变化。

### 第 3 步：监听 `hashchange`

**目标**：观察 fragment 与历史导航。

```html
<pre id="result"></pre>

<script>
  function renderState() {
    document.querySelector('#result').textContent = [
      `location.hash: ${location.hash || '(empty)'}`,
      `activeElement: ${document.activeElement.tagName.toLowerCase()}`
    ].join('\n');
  }

  window.addEventListener('hashchange', renderState);
  renderState();
</script>
```

**为什么这样写**：它只记录浏览器当前状态，不改变原生片段导航。

**运行后观察**：点击三个目录链接时 `location.hash` 会变化。

### 第 4 步：观察编码

**目标**：让编码概念可以直接看到。

```js
const text = '安装指南';
const encoded = encodeURIComponent(text);
```

最终页面会把两者都显示出来。

**为什么这样写**：片段并不总是只包含英文字母，了解 URL 编码可以避免看到 `%E5...` 时误以为链接损坏。

**运行后观察**：页面显示原始中文和编码后的字符串。

## 运行案例

直接打开：

```text
05-links-navigation/kp059-fragment-navigation/index.html
```

也可以使用：

```bash
python3 -m http.server 8080
```

通过 HTTP Server 运行。

## 效果验证

完成案例后检查：

1. 点击“概览”后 URL 末尾出现 `#overview`。
2. 点击“安装”后 URL 末尾变为 `#install`。
3. 页面滚动到对应 `id` 区域。
4. 状态面板能显示当前 `location.hash`。
5. 状态面板同时显示 `document.activeElement`，可以验证滚动和焦点不是同一个概念。
6. 连续点击几个片段后使用浏览器后退，能在历史片段间导航。
7. 页面能展示“安装指南”的百分号编码结果。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="#install">安装</a>
<section id="install">...</section>
```

核心是 fragment 与 `id` 目标的原生关系。

### 实验辅助代码

案例中的：

- 大高度 CSS 用于制造明显滚动距离；
- `hashchange` 用于记录片段变化；
- `document.activeElement` 用于观察焦点；
- `encodeURIComponent()` 用于展示 URL 编码。

这些都属于实验辅助，不替代原生 `href="#id"` 语义。