# KP073：音视频 controls、autoplay、muted、playsinline 与 preload

> 所属章节：06 · 图片、音视频和嵌入
>
> 本知识点目标：理解原生媒体控件、自动播放限制、静音与移动端内联播放，以及 `preload` 的加载策略提示。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

1. 使用 `controls` 提供浏览器原生播放控件。
2. 理解 `autoplay` 不是“保证自动播放”。
3. 理解为什么自动播放视频常与 `muted` 搭配。
4. 理解 `playsinline` 的移动端用途。
5. 区分 `preload="none"`、`metadata`、`auto` 的意图。

## 理论讲解

### 1. controls

```html
<audio controls src="./tone.wav"></audio>
```

`controls` 让浏览器提供播放、暂停、进度、音量等原生交互。除非产品有明确理由，否则不要轻易用自定义控件替代完整原生能力。

### 2. autoplay 与 muted

```html
<video autoplay muted playsinline>
```

现代浏览器普遍限制带声音的自动播放。静音媒体更可能获准自动播放，但：

> `autoplay` 是请求，不是跨浏览器、跨用户设置的绝对保证。

用户偏好、省流量策略、权限或浏览器规则都可能阻止自动播放。

### 3. playsinline

`playsinline` 常用于移动端视频，表达“允许在页面当前区域内播放”，而不是强制进入全屏播放环境。

### 4. preload

常见值：

- `none`：尽量不要预加载媒体；
- `metadata`：优先只取时长、尺寸等元数据；
- `auto`：浏览器可更积极加载。

`preload` 同样是提示，浏览器可以根据网络、策略和 `autoplay` 等条件调整实际行为。

## 动手编码：从 0 到 1

最终源码：[`index.html`](./index.html)

本地媒体：[`tone.wav`](./tone.wav)、[`sample.mp4`](./sample.mp4)

### 第 1 步：创建带原生控件的音频

```html
<audio id="audio-demo" controls preload="none">
  <source src="./tone.wav" type="audio/wav">
</audio>
```

**观察**：页面出现音频原生控件；初始策略为 `none`。

### 第 2 步：创建内联静音视频

```html
<video
  id="video-demo"
  controls
  autoplay
  muted
  playsinline
  preload="metadata"
  width="320"
  height="180"
>
  <source src="./sample.mp4" type="video/mp4">
</video>
```

**观察**：浏览器会尝试静音自动播放，但不要把成功与否当作规范保证。

### 第 3 步：读取属性和运行状态

JavaScript 输出：

- `autoplay` / `muted` / `playsInline`；
- `preload`；
- `paused`；
- `readyState`。

**目标**：区分 HTML 声明和浏览器当前播放状态。

## 运行案例

建议使用 HTTP Server：

```bash
python3 -m http.server 8000
```

打开页面后查看 Network，比较音频 `preload="none"` 和视频 `preload="metadata"` 的请求行为。

## 效果验证

1. 音频和视频都有原生 controls。
2. 视频声明了 `autoplay muted playsinline`。
3. 页面输出能看到 `preload` 与 `paused/readyState`。
4. 手动暂停/播放后状态会更新。
5. 不把“当前浏览器自动播放成功”错误推广成所有浏览器必然行为。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<video controls autoplay muted playsinline preload="metadata">...</video>
<audio controls preload="none">...</audio>
```

### 实验辅助代码

小型 WAV / MP4 仅用于本地可播放实验；JavaScript 只读取状态。
