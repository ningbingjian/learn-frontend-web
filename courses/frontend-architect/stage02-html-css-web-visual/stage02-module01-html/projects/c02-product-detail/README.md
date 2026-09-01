# C02：跨设备商品详情页

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 项目目标

这个项目把链接、响应式图片、原生音频和 iframe 嵌入组合成一个跨设备商品详情页。完成后你应该能够：

1. 用自描述链接组织面包屑、页面片段和下载入口。
2. 用 `picture` + `source` 根据视口做艺术方向切换。
3. 理解 `img` 仍然负责回退和 `alt`。
4. 用原生 `audio controls` 提供可控媒体，而不是强制自动播放。
5. 为媒体提供文字稿替代。
6. 用有标题、有限权限的 `iframe` 嵌入尺码/规格说明。
7. 让所有资源自包含，不依赖第三方 CDN。

## 最终页面需求

商品为“Trail One 城市轻量背包”，页面包含：

- 面包屑导航；
- 商品主图；
- 商品标题、价格和卖点；
- 页面内片段导航；
- 一段可播放的产品提示音；
- 音频文字稿；
- iframe 尺码指南；
- 规格说明下载链接。

## 覆盖知识点

重点覆盖：

- KP057～KP064：链接地址、片段、下载、自描述文本；
- KP065～KP072：图片、alt、figure、picture/source；
- KP073～KP076：媒体 controls 和可访问替代；
- KP077～KP080：iframe 标题、尺寸、sandbox 与信任边界。

## 动手编码：从 0 到 1

### 第 1 步：先建立商品信息结构

用 `main` 包含商品内容，商品本身用 `article`：

```html
<main>
  <nav aria-label="面包屑">...</nav>
  <article>
    <h1>Trail One 城市轻量背包</h1>
  </article>
</main>
```

### 第 2 步：用 picture 做艺术方向

```html
<picture>
  <source media="(max-width: 600px)" srcset="...方形 SVG data URI...">
  <img src="...宽幅 SVG data URI..." alt="深绿色 Trail One 背包正面示意">
</picture>
```

小屏不是简单下载“小一点的同一张图”，而是切换为更适合窄屏的方形构图。

### 第 3 步：增加页面内链接

```html
<nav aria-label="商品详情导航">
  <a href="#features">产品特点</a>
  <a href="#audio-guide">音频说明</a>
  <a href="#size-guide">尺码指南</a>
</nav>
```

链接文字直接说明目标，不使用大量“点击这里”。

### 第 4 步：加入原生音频和文字稿

最终案例把一个短 WAV 数据直接放入 `src`：

```html
<audio controls preload="metadata" src="data:audio/wav;base64,..."></audio>
```

页面旁边仍然提供文字稿。媒体能播放不代表所有信息都只能通过声音获得。

### 第 5 步：使用 iframe 嵌入尺码指南

```html
<iframe
  title="Trail One 背包尺码指南"
  sandbox
  loading="lazy"
  srcdoc="..."
></iframe>
```

尺码指南只需要静态 HTML，因此使用不带许可令牌的 `sandbox` 即可。

### 第 6 步：提供真正有意义的下载入口

使用 data URL 生成规格文本：

```html
<a download="trail-one-spec.txt" href="data:text/plain;charset=utf-8,...">下载产品规格文本</a>
```

`download` 只是下载提示，最终行为仍由浏览器决定。

### 第 7 步：完成响应式布局

桌面端图片区和信息区两列，小屏回到单列。HTML 结构不随着布局变化而变化。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **项目核心 HTML**：自描述链接、`picture/source/img`、`audio`、文字稿、`iframe`、`download`。
- **实验辅助代码**：内联 SVG data URI、内联 WAV data URI、响应式 CSS 和 `currentSrc` 观察脚本。

## 运行案例

直接打开 `index.html` 即可。为方便观察 URL 和 iframe，也可以启动：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
python3 -m http.server 8080
```

打开：

```text
http://localhost:8080/projects/c02-product-detail/
```

## 效果验证

1. 把窗口缩到 600px 以下，商品主图切换为方形构图。
2. `img.currentSrc` 区域显示浏览器实际选中的资源。
3. 图片有明确 `alt`，没有把文件名写进替代文本。
4. 音频必须由用户主动播放，没有自动带声播放。
5. 即使不播放音频，文字稿仍能获得同等核心信息。
6. iframe 有可访问标题，并通过 `sandbox` 限制能力。
7. 片段链接能跳到产品特点、音频说明和尺码指南。
8. 下载链接给出明确文件用途和建议文件名。
