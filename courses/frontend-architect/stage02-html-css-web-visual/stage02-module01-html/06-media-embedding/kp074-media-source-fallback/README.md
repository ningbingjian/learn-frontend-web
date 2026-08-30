# KP074：媒体多资源回退

> 所属章节：06 · 图片、音视频和嵌入
>
> 本知识点目标：掌握 `<video>/<audio>` 中多个 `<source>` 的顺序、格式兼容判断以及最终文本回退。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

1. 在媒体元素中按优先顺序声明多个 `<source>`。
2. 使用 `type` 帮助浏览器判断格式支持。
3. 理解浏览器选择可播放候选后不会继续加载后续候选。
4. 使用 `currentSrc` 确认最终资源。
5. 正确认识媒体元素内部文本回退的适用边界。

## 理论讲解

### 1. 多个 source 按源码顺序尝试

```html
<video controls>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
</video>
```

浏览器会根据 `type` 支持情况、资源可用性等选择能播放的候选。一般把希望优先使用的格式放前面。

### 2. type 能减少无效尝试

如果浏览器明确不支持 `video/webm`，看到 `type="video/webm"` 就可跳过该候选。

这不意味着 MIME 声明可以随便写：服务器实际响应类型和文件内容仍应正确。

### 3. 最终提示内容

可以在媒体元素内部放文本：

```html
<video controls>
  ...
  你的浏览器不支持 video 元素。
</video>
```

注意：这主要是 **不支持该 HTML 元素的旧环境回退**。现代浏览器如果支持 `<video>` 但所有媒体资源加载失败，并不保证自动显示这段文本。因此生产系统还应设计明确的加载错误 UI、下载链接或文字稿。

## 动手编码：从 0 到 1

最终源码：[`index.html`](./index.html)

本地资源：[`sample.webm`](./sample.webm)、[`sample.mp4`](./sample.mp4)

### 第 1 步：声明两个真实格式

```html
<video id="demo" controls preload="metadata" width="320" height="180">
  <source src="./sample.webm" type="video/webm">
  <source src="./sample.mp4" type="video/mp4">
  当前浏览器不支持 video 元素。
</video>
```

**观察**：支持 WebM 的浏览器通常会优先选择第一个资源；否则可继续尝试 MP4。

### 第 2 步：查看 canPlayType

```js
video.canPlayType('video/webm')
video.canPlayType('video/mp4')
```

返回值通常是空字符串、`maybe` 或 `probably`。

### 第 3 步：查看 currentSrc

在 `loadedmetadata` 后打印 `video.currentSrc`。

**目标**：把“支持判断”和“最终选中的 URL”对应起来。

## 运行案例

```bash
python3 -m http.server 8000
```

建议打开 DevTools Network，并禁用缓存后刷新。

## 效果验证

1. 页面含两个真实媒体 source。
2. `canPlayType()` 能看到浏览器对格式的支持判断。
3. `currentSrc` 显示实际命中资源。
4. 调换两个 `<source>` 的顺序后重新测试。
5. 临时把第一个 `src` 改成不存在文件，观察浏览器继续寻找后续可播放资源的行为。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<video controls>
  <source src="...webm" type="video/webm">
  <source src="...mp4" type="video/mp4">
  回退文本
</video>
```

### 实验辅助代码

本地 WebM / MP4 与 `canPlayType/currentSrc` 输出用于验证格式选择。
