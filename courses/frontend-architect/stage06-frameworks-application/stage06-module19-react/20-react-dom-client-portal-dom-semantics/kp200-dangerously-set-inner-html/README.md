# RE-KP200：dangerouslySetInnerHTML

> [返回 Chapter 20](../README.md)

## 学习目标

1. 理解 `dangerouslySetInnerHTML={{ __html: html }}` 会直接设置 DOM `innerHTML`。
2. 明确它绕过 React 默认文本转义，因此不可信 HTML 会带来 XSS 风险。
3. 建立工程规则：默认渲染 React children；只有可信或经过可靠净化的 HTML 才进入 raw HTML 边界。

## 理论讲解

React 默认把字符串当文本处理。例如用户输入 `<strong>Hello</strong>` 时，`<p>{text}</p>` 不会把它变成真实标签，而会显示字符本身。

`dangerouslySetInnerHTML` 则不同：

```jsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

它把字符串直接交给浏览器的 `innerHTML`。这意味着 HTML 标签会被解析，同时也意味着恶意事件属性、危险 URL 等内容可能进入页面。

本课最终代码只把源码中写死的 `TRUSTED_ARTICLE_HTML` 放进 raw HTML 边界。用户输入即使长得像 HTML，也只通过普通 JSX 文本渲染，绝不会执行。

## 动手编码：从 0 到 1

### 第 1 步：准备普通 Vite 页面

创建 `index.html`，只保留 `#root` 和模块入口。

预期：页面先有一个最小 React 挂载点。

### 第 2 步：定义可信 HTML 常量

```jsx
const TRUSTED_MARKUP = Object.freeze({
  __html: '<h2>课程公告</h2><p><strong>React</strong> 默认会转义文本。</p>',
});
```

这里的内容来自源码常量，不来自输入框或网络返回。

预期：我们清楚知道进入 raw HTML 的数据来源。

### 第 3 步：使用 dangerouslySetInnerHTML

```jsx
<div dangerouslySetInnerHTML={TRUSTED_MARKUP} />
```

预期：`h2`、`strong` 会成为真实 DOM 元素。

### 第 4 步：把“长得像 HTML”的用户输入按文本渲染

```jsx
<p>{userText}</p>
```

预期：输入 `<img ...>` 只显示字符，不执行任何 HTML。

### 第 5 步：建立安全边界

不要把用户输入直接传给 `dangerouslySetInnerHTML`。如果业务确实需要展示外部 HTML，应在进入 React 之前使用经过安全审计的 HTML Sanitizer，并建立明确的可信数据边界。

## 运行案例

在 React 模块根目录执行：

```bash
npm install
npm run dev -- --host 0.0.0.0
```

然后打开 Vite 给出的地址并进入本知识点页面。

## 效果验证

1. “可信 HTML”区域会真的出现标题和粗体。
2. 修改 textarea 为 `<h1>hello</h1>`，下面仍显示普通字符串。
3. 修改为看起来危险的 `<img src=x onerror="alert(1)">`，也只会作为文本显示。
4. 在 Elements 面板中可看到：可信区域有真实 `h2/strong`，用户输入区域只有文本节点。

## 本节核心代码

- `dangerouslySetInnerHTML` 直接映射到 DOM raw HTML 边界。
- React children 默认转义字符串，是更安全的默认选择。
- “可信”不是变量名，而是数据来源、净化流程与安全策略共同保证的属性。

## 实验辅助代码

- textarea 只是为了生成“不可信输入”并观察 React 的默认转义。
- 本课故意不提供“点击后执行不可信 HTML”的按钮，避免把 XSS payload 变成可执行实验。

[查看最终源码](./src/main.jsx)
