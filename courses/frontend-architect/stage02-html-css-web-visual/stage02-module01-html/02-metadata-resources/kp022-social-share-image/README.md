# KP022：社交分享图片

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `og:image` 为社交分享卡片声明图片。
2. 理解为什么分享图片通常应该使用可公开访问的绝对 URL。
3. 理解图片尺寸、比例和格式需要结合目标平台验证。
4. 知道分享抓取缓存可能导致“代码已经改了，但卡片图片仍旧”的现象。

> **本节核心代码是 `og:image` 及其图片地址设计。**  
> 页面中的预览信息和 JavaScript 仅用于教学观察，不会模拟真实社交平台抓取器。

## 理论讲解

### 1. 声明分享图片

```html
<meta
  property="og:image"
  content="https://example.com/assets/share/html-metadata-card.jpg"
>
```

分享抓取器需要从网络访问图片，因此真实项目中应使用外部可访问的 URL。

### 2. 为什么推荐绝对 URL

下面的地址依赖当前页面 URL 才能解析：

```html
<meta property="og:image" content="./share.jpg">
```

分享抓取器、代理、预渲染系统的处理环境可能与浏览器不同。

更明确的写法是：

```text
https://www.example.com/assets/share/article.jpg
```

### 3. 尺寸、比例和格式

不同平台对分享卡片有各自的裁切、尺寸和文件限制。

工程上常见的做法是准备接近宽屏卡片比例的高质量图片，例如 1200×630 一类尺寸，但不要把某一个尺寸误认为 HTML 标准。

需要关注：

- 主体不要贴边，避免裁切。
- 文字不要太小。
- 图片体积不要失控。
- JPEG、PNG 等常见格式通常兼容性更稳妥；目标平台仍需单独验证。

### 4. 图片必须真的可抓取

真实项目还要检查：

- URL 返回成功状态。
- 不要求登录。
- robots / 鉴权 / 防盗链没有阻止平台抓取器。
- Content-Type 与实际文件匹配。
- HTTPS 证书正常。

### 5. 抓取缓存

很多平台会缓存已经抓取过的分享卡片。

因此你修改：

```html
<meta property="og:image" content="...new.jpg">
```

之后，旧图片仍可能短时间存在。

排查顺序应是：

```text
HTML 是否更新
  ↓
线上 URL 是否更新
  ↓
图片是否公开可访问
  ↓
平台是否仍在使用抓取缓存
```

需要时使用目标平台自己的调试/重新抓取入口。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：准备社交标题

```html
<meta property="og:title" content="HTML 元信息指南">
```

### 第 1 步：加入 `og:image`

```html
<meta
  property="og:image"
  content="https://example.com/assets/share/html-metadata-card.jpg"
>
```

示例使用 `example.com`，重点是观察绝对 URL 结构；它不是本课程实际托管的图片资源。

### 第 2 步：补充图片说明

为了给支持该字段的平台提供图片文字说明，可以加入：

```html
<meta
  property="og:image:alt"
  content="HTML 元信息指南分享卡片"
>
```

本节重点仍然是 `og:image` 本身。

### 第 3 步：把元信息打印到正文

```html
<pre id="result"></pre>
```

```js
function getMeta(property) {
  return document.querySelector(
    `meta[property="${property}"]`
  )?.content || '(缺失)';
}
```

### 第 4 步：检查是否为绝对 URL

```js
const image = getMeta('og:image');
const isAbsolute = /^https?:\/\//.test(image);
```

输出：

```text
og:image：https://example.com/...
绝对 URL：是
```

### 第 5 步：区分“HTML 正确”和“平台抓取成功”

本地案例能验证：

- meta 已被浏览器解析。
- 地址是绝对 URL。

但不能证明第三方平台能够成功抓取该示例图片。真实项目必须再检查线上图片和目标平台调试结果。

### 第 6 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`og:image` 的绝对图片地址。
- **实验辅助代码**：读取 meta、判断绝对 URL，只用于本地验证声明结构。

## 运行案例

直接打开 [`index.html`](./index.html)，或者执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 页面声明了 `og:image`。
- `og:image` 使用 `https://` 绝对 URL。
- 页面能显示 `og:image` 和 `og:image:alt` 的当前值。
- 能解释为什么本地声明正确仍不等于社交平台一定抓取成功。
- 遇到旧分享图时会检查平台缓存，而不是只反复改 HTML。
