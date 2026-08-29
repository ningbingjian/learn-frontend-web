# KP076：媒体的可访问替代

> 所属章节：06 · 图片、音视频和嵌入
>
> 本知识点目标：理解字幕、文字稿、音频描述和播放失败替代内容分别解决什么问题，并建立“不把所有替代都塞进一个 alt”的媒体可访问性思路。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

1. 知道字幕/说明文字适合解决听觉信息获取问题。
2. 为媒体提供可独立阅读的文字稿。
3. 理解音频描述用于补充仅靠画面传达的重要视觉信息。
4. 理解 `<video>` 内部 fallback 文本的局限。
5. 为加载失败、无法播放或不愿播放的用户提供独立替代路径。

## 理论讲解

### 1. 字幕与文字稿不是同一件事

字幕轨道跟随时间轴：

```html
<track kind="captions" src="./captions-zh.vtt" srclang="zh-CN" label="中文字幕" default>
```

文字稿是页面中可独立阅读、搜索、复制的内容。用户不必启动播放器也能获取核心信息。

因此实际产品常同时提供两者。

### 2. 音频描述

当画面中存在“仅视觉可知、但理解内容所必需”的信息时，需要考虑音频描述（audio description）。

HTML 文本轨道存在：

```html
<track kind="descriptions" src="./descriptions-zh.vtt" srclang="zh-CN" label="画面描述">
```

但浏览器对 `descriptions` 的直接播放/呈现支持并不统一。生产系统可能需要：

- 单独的描述音轨；
- 带描述版本的视频；
- 可访问播放器；
- 同步的文字描述。

不要仅因为写了 `kind="descriptions"` 就假定所有用户都能听到描述。

### 3. 无法播放时的替代

媒体元素内部可以有 fallback 文本，但它主要服务于“不支持该元素”的用户代理。

现代浏览器支持 `<video>` 却因网络、编码失败时，不保证自动显示内部文本。因此本案例额外提供：

- 页面上始终可访问的文字稿；
- `transcript.txt` 下载链接；
- JavaScript 监听 `error` 后显示明确错误状态。

## 动手编码：从 0 到 1

最终源码：[`index.html`](./index.html)

资源：`sample.mp4`、`captions-zh.vtt`、`descriptions-zh.vtt`、`transcript.txt`。

### 第 1 步：创建可控制的视频

```html
<video id="demo" controls preload="metadata" width="320" height="180">
  <source src="./sample.mp4" type="video/mp4">
  当前浏览器不支持 video 元素，请阅读下方文字稿。
</video>
```

### 第 2 步：加入 captions

```html
<track kind="captions" src="./captions-zh.vtt" srclang="zh-CN" label="中文字幕" default>
```

**为什么用 captions**：本案例把短音调和场景提示作为需要同步呈现的信息，强调“包含非对白听觉信息”的字幕轨道概念。

### 第 3 步：声明描述轨道

```html
<track kind="descriptions" src="./descriptions-zh.vtt" srclang="zh-CN" label="画面描述">
```

**观察**：DOM 和 `textTracks` 能看到该轨道；是否被浏览器直接呈现取决于支持情况。

### 第 4 步：增加页面文字稿

```html
<section aria-labelledby="transcript-title">
  <h2 id="transcript-title">文字稿</h2>
  <p>视频展示蓝色画面并播放一段短音调……</p>
</section>
```

**目标**：不依赖播放器即可阅读核心内容。

### 第 5 步：增加错误状态

监听媒体 `error`，在页面上显示“媒体无法播放，请阅读文字稿或下载 transcript.txt”。

## 运行案例

```bash
python3 -m http.server 8000
```

打开页面后分别测试：

- 正常播放；
- 开关字幕；
- 临时改错 `sample.mp4` 路径后的错误提示；
- 不播放视频，直接阅读文字稿。

## 效果验证

1. 页面有 captions 轨道。
2. 页面声明 descriptions 轨道并明确兼容性边界。
3. 页面始终显示独立文字稿。
4. 有可下载的 `transcript.txt`。
5. 媒体加载失败时有显式状态提示，而不是只依赖 `<video>` 内部 fallback 文本。
6. 不播放媒体也能获得案例的核心信息。

## 本节核心代码与实验辅助代码

### 本节核心代码

- `<track kind="captions">`；
- 文字稿正文；
- 合理设计的描述信息和失败替代路径。

### 实验辅助代码

本地短视频、VTT、下载文字稿和错误监听只用于形成完整可验证案例。
