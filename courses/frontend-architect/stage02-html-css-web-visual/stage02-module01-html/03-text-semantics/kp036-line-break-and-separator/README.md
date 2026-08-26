# KP036：`br` 换行与 `hr` 主题分隔

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<br>` 表达内容本身要求的强制换行。
2. 使用 `<hr>` 表达同一上下文中的主题切换或段落级分隔。
3. 区分语义换行与纯视觉间距。
4. 避免用多个 `<br>` 代替 CSS margin / gap。

> **本节核心代码是 `<br>` 与 `<hr>` 的语义使用边界。**  
> CSS 只用于让实验效果更容易观察，属于展示辅助代码。

## 理论讲解

### 1. `br` 表达内容内部必须换行

适合场景包括：

- 地址。
- 诗歌。
- 歌词或需要保留人工断行的文本。

例如地址：

```html
<address>
  OpenAI Office<br>
  123 Example Street<br>
  San Francisco, CA
</address>
```

这里换行本身就是内容表达的一部分。

### 2. 不要用多个 br 制造布局间距

不推荐：

```html
<p>第一段</p>
<br><br><br>
<p>第二段</p>
```

这种写法把视觉间距混进内容结构。

应该用：

```css
section {
  margin-block: 2rem;
}
```

或者布局容器的 `gap`。

### 3. `hr` 不只是“一条横线”

`hr` 表达的是：

> 当前内容发生主题级切换。

例如文章从“问题背景”切换到“解决方案”：

```html
<p>前面讨论问题背景。</p>
<hr>
<p>下面开始讨论解决方案。</p>
```

浏览器默认画出横线只是默认视觉表现。

### 4. hr 的视觉完全可以改掉

例如：

```css
hr {
  border: 0;
  height: 8px;
}
```

即使它不再看起来像传统横线，HTML 语义仍然是主题分隔。

### 5. 如何选择

可以按下面判断：

```text
内容内部必须换行？ → br
主题发生切换？       → hr
只是想多一点空白？   → CSS margin / gap
开始新的普通段落？   → p
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP036：br 与 hr</title>
</head>
<body>
</body>
</html>
```

### 第 1 步：用 br 表达地址换行

```html
<h1>联系我们</h1>
<address>
  Example Studio<br>
  88 Web Road<br>
  Shanghai
</address>
```

这些断行属于地址内容的一部分。

### 第 2 步：加入两个普通段落

```html
<section class="article">
  <p>第一部分介绍项目当前遇到的问题。</p>
  <p>问题主要集中在加载速度和资源体积。</p>
</section>
```

段落之间不添加额外 `br`。

### 第 3 步：用 hr 表达主题切换

继续加入：

```html
<hr>

<section class="article">
  <p>第二部分开始讨论优化方案。</p>
  <p>优先处理首屏关键资源和缓存策略。</p>
</section>
```

### 第 4 步：用 CSS 控制视觉间距

```html
<style>
  .article {
    margin-block: 2rem;
  }

  hr {
    margin-block: 2rem;
  }
</style>
```

注意：间距需求交给 CSS，而不是写多个 `br`。

### 第 5 步：改变 hr 外观做语义实验

继续把 `hr` 样式改成：

```css
hr {
  border: 0;
  height: 8px;
  background: currentColor;
  opacity: 0.15;
  margin-block: 2rem;
}
```

它不再是默认细横线，但仍然是 `hr`。

### 第 6 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：地址中的 `<br>`、主题切换位置的 `<hr>`。
- **展示辅助代码**：CSS 间距和 `hr` 外观修改。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 地址中的三行由 `<br>` 强制换行。
- 普通段落之间没有使用 `<br>` 造间距。
- 两个主题部分之间使用 `<hr>`。
- CSS 可以改变 `hr` 的视觉样式，但不会改变它的主题分隔语义。
- 能根据“内容换行 / 主题切换 / 纯视觉间距”选择正确方案。
