# KP119：动态结果与 live region 宣布策略

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解动态 DOM 更新为什么可能对屏幕阅读器用户不可见。
2. 使用 `aria-live="polite"` 或 `role="status"` 宣布普通状态变化。
3. 理解 `role="status"` 的用途，以及它不应主动抢焦点。
4. 知道高紧急错误可考虑 `role="alert"`，但不要滥用 assertive 通知。
5. 掌握“先建立 live region，再更新内容”的可靠实现方式。

## 理论讲解

### 1. 视觉更新不等于辅助技术会自动知道

JavaScript 可以直接修改：

```js
status.textContent = '已找到 18 条结果';
```

视觉用户很容易看到变化，但屏幕阅读器焦点可能在搜索框上，并不会自然移动到结果区域。

live region 用来告诉辅助技术：“这个区域后续变化需要被宣布”。

### 2. 普通状态优先使用 polite

```html
<p id="search-status" role="status"></p>
```

`role="status"` 适合：

- 保存成功；
- 搜索结果数量变化；
- 普通后台状态更新。

它属于建议性信息，不应该打断用户当前操作。

### 3. `status` 不需要为了宣布而移动焦点

错误方向：

```js
status.focus();
```

普通动态状态应该在用户保持当前上下文的同时被宣布。

如果业务要求用户必须立即处理某个控件或错误，焦点管理是另一套交互问题，不能只靠 live region 解决。

### 4. 高紧急消息才考虑 alert / assertive

```html
<p id="urgent-message" role="alert"></p>
```

`role="alert"` 通常具有更强的中断性，适合真正需要立即知道的错误。

不要把普通“保存成功”“加载完成”都设为 alert，否则会造成频繁打断。

### 5. live region 应在内容变化前已经存在

推荐：

```html
<p id="search-status" role="status"></p>
```

页面初始化时区域先存在，随后再：

```js
searchStatus.textContent = '已找到 18 条结果';
```

比“更新时才临时创建一个带 aria-live 的元素”更可靠。

### 6. 避免把过大的区域设为 live

错误方向：

```html
<main aria-live="polite">...</main>
```

如果整个主内容频繁变化，可能导致大量无关内容被重复宣布。

应该只标记真正需要通知的短状态文本。

### 7. `output` 与显式 live region 的关系

很多浏览器会把 `<output>` 作为动态结果区域处理，但对于重要业务状态，仍应该清楚设计动态宣布策略，而不是把所有更新都寄希望于默认行为。

## 动手编码：从 0 到 1

### 第 0 步：准备动态按钮

```html
<button id="search-button" type="button">模拟搜索</button>
```

### 第 1 步：预先建立 status 区域

```html
<p id="search-status" role="status"></p>
```

**本步目标**：让 live region 在内容更新之前就存在于 DOM 中。

### 第 2 步：更新普通状态

```js
searchStatus.textContent = '已找到 18 条结果';
```

**观察结果**：视觉上文本出现；在支持的屏幕阅读器中，状态通常会被以非打断方式宣布。

### 第 3 步：加入明确的 polite 区域

```html
<p id="save-status" aria-live="polite" aria-atomic="true"></p>
```

`aria-atomic="true"` 表达更新时倾向于把整个区域作为一个完整状态宣布。

### 第 4 步：加入紧急 alert 对照

```html
<p id="urgent-message" role="alert"></p>
```

只有点击“模拟严重错误”时才更新它。

### 第 5 步：不要改变用户焦点

更新状态时只修改文本：

```js
saveStatus.textContent = '草稿已保存';
```

不要调用 `.focus()`。

### 第 6 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：预先存在的 `role="status"`、`aria-live="polite"`、`role="alert"` 区域。
- **实验辅助代码**：按钮和计数器只负责制造动态变化。

## 运行案例

直接浏览器打开 `index.html`。若要真正验证宣布效果，应进一步使用 VoiceOver、NVDA、JAWS 等辅助技术测试。

## 效果验证

1. 页面初始 DOM 中已经存在空 status/live 区域。
2. 点击搜索后只更新短状态文本，不移动焦点。
3. 保存成功使用 polite 状态，而不是 alert。
4. 严重错误单独使用 `role="alert"`。
5. 页面没有把整个 `<main>` 标成 live region。
6. 能解释 live region 与焦点管理是两个不同问题。
7. 能解释为什么最终仍需要真实辅助技术测试，而不是只看 DOM。

完成后，第九章 **8/8 完成**。
