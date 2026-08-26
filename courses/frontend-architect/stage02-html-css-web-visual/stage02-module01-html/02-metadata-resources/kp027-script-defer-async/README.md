# KP027：普通脚本、`defer` 与 `async`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释普通外部脚本为什么会暂停 HTML 解析。
2. 解释 `defer` 的下载、执行时机和顺序保证。
3. 解释 `async` 的执行时机和“无顺序保证”。
4. 根据脚本依赖关系选择普通、`defer` 或 `async`。
5. 使用事件日志验证执行阶段，同时知道一次观察结果不能证明 `async` 的固定顺序。

> **本节核心代码是 `<script>` 上的加载属性。**  
> 事件日志函数只是实验辅助设施。

## 理论讲解

### 1. 普通外部脚本

解析器遇到：

```html
<script src="./app.js"></script>
```

典型流程是：

```text
暂停 HTML 解析
→ 获取脚本
→ 执行脚本
→ 继续解析 HTML
```

因此放在 `head` 的同步脚本可能阻塞后续文档解析。

### 2. `defer`

```html
<script src="./a.js" defer></script>
<script src="./b.js" defer></script>
```

特点：

- 下载可以与 HTML 解析并行。
- 等文档解析完成后执行。
- 多个 defer 脚本按文档顺序执行。
- 通常在 `DOMContentLoaded` 之前执行完毕。

因此对存在依赖关系的页面脚本，`defer` 是非常常见的选择。

### 3. `async`

```html
<script src="./analytics.js" async></script>
```

特点：

- 下载与 HTML 解析并行。
- 下载完成后尽快执行，执行时可能暂停解析器。
- 多个 async 脚本之间不保证文档顺序。

适合相互独立的脚本，例如某些统计、广告或第三方能力。

### 4. 关键差异

```text
普通：下载和执行都会挡住解析

defer：并行下载，解析后按文档顺序执行

async：并行下载，谁准备好谁执行，不保证顺序
```

### 5. 不要只凭一次实验判断 async 顺序

本地文件很小，浏览器可能连续几次都观察到：

```text
async A
async B
```

但这不代表规范保证 A 在 B 前面。

真实网络下请求完成顺序可能改变。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：准备日志容器

在 `head` 最前面建立一个最小记录函数：

```html
<script>
  window.events = [];
  window.record = message => events.push(message);
</script>
```

它只用于记录脚本执行时间点。

### 第 1 步：创建两个 defer 脚本

`defer-a.js`：

```js
record('defer A：content=' + Boolean(document.querySelector('#content')));
```

`defer-b.js`：

```js
record('defer B：content=' + Boolean(document.querySelector('#content')));
```

### 第 2 步：在 `head` 中按顺序声明 defer

```html
<script src="./defer-a.js" defer></script>
<script src="./defer-b.js" defer></script>
```

预期：两者执行时正文已经完成解析，并且 A 在 B 前执行。

### 第 3 步：创建两个 async 脚本

`async-a.js` 与 `async-b.js` 都记录：

- 自己什么时候执行。
- 当时 `#content` 是否已经存在。

然后声明：

```html
<script src="./async-a.js" async></script>
<script src="./async-b.js" async></script>
```

### 第 4 步：在正文中记录解析器到达的位置

创建：

```html
<main id="content">
  <h1>defer 与 async 实验</h1>
</main>

<script>
  record('body 尾部：解析器已到达正文末尾');
</script>
```

如果 async 脚本在正文解析完成前就下载结束，它可能在这个记录之前执行。

### 第 5 步：记录 DOMContentLoaded 和 load

继续加入：

```js
document.addEventListener('DOMContentLoaded', () => {
  record('DOMContentLoaded');
  render();
});

window.addEventListener('load', () => {
  record('load');
  render();
});
```

`load` 发生时，本案例的外部资源已完成加载，可以看到最终完整日志。

### 第 6 步：验证 defer 的可靠规则

无论网络快慢，都应该依赖这两个规则：

1. defer A 在 defer B 前执行。
2. defer 脚本在文档解析完成后执行。

不要依赖“具体第几行日志”，因为 async 可能穿插其中。

### 第 7 步：验证 async 的不确定性

刷新多次，或在 DevTools Network 中开启限速。

观察 async A/B 可能出现不同时间点。

即使顺序始终没变，也只能说明“这几次网络条件下如此”，不能把它当作程序依赖。

### 第 8 步：选择策略

可以使用这个判断：

```text
脚本依赖 DOM 且彼此有顺序依赖 → defer
脚本完全独立、越早执行越好 → async
必须立刻执行并影响后续解析 → 普通同步脚本（谨慎使用）
```

### 第 9 步：完成案例并对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`defer-a.js`](./defer-a.js)
- [`defer-b.js`](./defer-b.js)
- [`async-a.js`](./async-a.js)
- [`async-b.js`](./async-b.js)

本节总结：

- **本节核心代码**：`defer`、`async` 属性和脚本声明顺序。
- **实验辅助代码**：`record()`、事件日志和页面输出。

## 运行案例

必须通过 HTTP 服务运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

推荐打开 DevTools → Network → Throttling 重复刷新。

## 效果验证

你应该能够确认：

- defer A 始终早于 defer B。
- defer 脚本执行时 `#content` 已经存在。
- async 脚本不能承担彼此的顺序依赖。
- `DOMContentLoaded` 与 `load` 都会被记录。
- 能解释为什么“我本机 async 每次都是 A→B”仍然不能作为代码正确性的依据。
