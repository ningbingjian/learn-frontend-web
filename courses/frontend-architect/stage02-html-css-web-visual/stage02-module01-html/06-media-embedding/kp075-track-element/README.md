# KP075：`track` 字幕轨道

> 所属章节：06 · 图片、音视频和嵌入
>
> 本知识点目标：理解 `<track>` 的轨道类型、`srclang` / `label` / `default`，以及 WebVTT cue 如何与媒体时间轴关联。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

1. 使用 `<track>` 为 `<video>` 关联文本轨道。
2. 区分常见 `kind`：`subtitles`、`captions`、`descriptions`、`chapters`、`metadata`。
3. 正确设置 `srclang` 和 `label`。
4. 理解 `default` 是默认轨道提示，并可能受用户/浏览器设置影响。
5. 读懂最基本的 WebVTT cue。

## 理论讲解

### 1. track 的基本结构

```html
<track
  kind="subtitles"
  src="./subtitles-zh.vtt"
  srclang="zh-CN"
  label="中文"
  default
>
```

`<track>` 本身是空元素，真实文本内容在 `.vtt` 文件中。

### 2. srclang 与 label

- `srclang`：轨道内容的语言标签；
- `label`：给用户看的轨道名称；
- 对 `subtitles` 来说应提供准确的 `srclang`。

### 3. WebVTT cue

```text
WEBVTT

00:00:00.000 --> 00:00:00.500
开始播放教学视频。

00:00:00.500 --> 00:00:01.000
这是第二条字幕。
```

每个 cue 由时间范围和文本组成，播放器根据 `currentTime` 激活对应 cue。

## 动手编码：从 0 到 1

最终源码：[`index.html`](./index.html)

资源：[`sample.mp4`](./sample.mp4)、[`subtitles-zh.vtt`](./subtitles-zh.vtt)、[`subtitles-en.vtt`](./subtitles-en.vtt)

### 第 1 步：创建视频

```html
<video id="demo" controls preload="metadata" width="320" height="180">
  <source src="./sample.mp4" type="video/mp4">
</video>
```

### 第 2 步：增加中文字幕轨道

```html
<track kind="subtitles" src="./subtitles-zh.vtt" srclang="zh-CN" label="中文" default>
```

### 第 3 步：增加第二语言

```html
<track kind="subtitles" src="./subtitles-en.vtt" srclang="en" label="English">
```

**观察**：播放器字幕菜单应能看到多个语言轨道（具体 UI 由浏览器决定）。

### 第 4 步：读取 textTracks

JavaScript 输出每个轨道的：

- `kind`；
- `language`；
- `label`；
- `mode`；
- 已加载 cue 数量。

**目标**：理解 `<track>` 会进入 `HTMLMediaElement.textTracks`。

## 运行案例

必须优先使用 HTTP Server，而不是直接 `file://` 打开，以减少字幕文件加载策略差异：

```bash
python3 -m http.server 8000
```

## 效果验证

1. 视频可以播放约 1 秒的本地演示片段。
2. 控件中可选择中文/英文字幕（浏览器 UI 可能不同）。
3. `textTracks.length` 为 2。
4. 中文字幕 VTT 含两个时间 cue。
5. 切换字幕轨道时 `mode` 会在 `disabled/hidden/showing` 等状态间变化。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<track kind="subtitles" src="...vtt" srclang="zh-CN" label="中文" default>
```

### 实验辅助代码

MP4、VTT 示例和 JavaScript 状态输出只用于验证字幕轨道生命周期。
