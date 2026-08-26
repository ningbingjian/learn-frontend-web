# KP028：`type="module"` 模块脚本

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<script type="module">` 加载 JavaScript ES Module。
2. 使用 `export` / `import` 拆分模块。
3. 理解模块拥有独立作用域，不会自动把顶层变量挂到 `window`。
4. 理解模块脚本默认采用严格模式，并具有类似 `defer` 的解析后执行特征。
5. 理解模块依赖图和跨域 CORS 要求。

> **本节核心代码是 `type="module"`、`import` 和 `export`。**  
> 页面结果输出只是为了验证模块作用域与执行时机。

## 理论讲解

### 1. 模块脚本入口

HTML：

```html
<script type="module" src="./main.js"></script>
```

`type="module"` 告诉浏览器把这个文件按 ES Module 解析，而不是传统脚本。

### 2. `export` 与 `import`

`math.js`：

```js
export const add = (a, b) => a + b;
```

`main.js`：

```js
import { add } from './math.js';
```

浏览器会根据 import 继续解析模块依赖图。

### 3. 模块拥有自己的作用域

传统脚本中的某些顶层声明可能影响全局环境。

模块中：

```js
const moduleSecret = 'only-in-module';
```

不会自动变成：

```js
window.moduleSecret
```

这减少了不同脚本之间的全局命名冲突。

### 4. 模块默认严格模式

ES Module 天然运行在 strict mode。

不需要再写：

```js
'use strict';
```

因此一些传统脚本中被宽松接受的错误，在模块中会更早暴露。

### 5. 模块的执行时机

外部模块脚本默认不会像普通同步脚本一样立即阻塞后续 HTML 解析。

可以把它理解为具有类似 `defer` 的行为：

- 依赖资源可以并行获取。
- 等文档解析完成后执行模块。

因此案例中的 `main.js` 可以直接查询正文里的 `#result`。

### 6. 模块请求与 CORS

跨源加载模块时，浏览器要求满足 CORS。

不能假设传统脚本能加载的跨域地址，换成 `type="module"` 后仍然可以无条件加载。

模块的每个依赖请求都要遵守对应的模块获取和 CORS 规则。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：建立 HTML 入口

创建：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP028：模块脚本</title>
  <script type="module" src="./main.js"></script>
</head>
<body>
  <h1>ES Module 实验</h1>
  <pre id="result"></pre>
</body>
</html>
```

注意 `main.js` 在 `head`，但稍后仍可以访问正文节点。

### 第 1 步：创建被依赖模块

创建 `math.js`：

```js
export const add = (a, b) => a + b;

export const formatResult = value => `结果：${value}`;
```

本步目标：让函数通过明确的模块接口暴露，而不是挂到 `window`。

### 第 2 步：创建入口模块

创建 `main.js`：

```js
import { add, formatResult } from './math.js';

const value = add(20, 22);
```

浏览器会先解析 `main.js` 的依赖，再执行入口模块。

### 第 3 步：创建模块私有变量

继续加入：

```js
const moduleSecret = 'only-in-module';
```

它只存在于当前模块作用域中。

### 第 4 步：输出验证结果

```js
document.querySelector('#result').textContent = [
  formatResult(value),
  '正文节点存在：' + Boolean(document.querySelector('#result')),
  'window.moduleSecret：' + String(window.moduleSecret)
].join('\n');
```

预期：

```text
结果：42
正文节点存在：true
window.moduleSecret：undefined
```

### 第 5 步：验证模块作用域

在 DevTools Console 输入：

```js
window.moduleSecret
```

应该得到 `undefined`。

这证明模块顶层变量没有自动泄露到 `window`。

### 第 6 步：理解依赖 URL

这里使用：

```js
import { add } from './math.js';
```

浏览器原生模块导入通常需要可解析的 URL 路径。

裸模块名：

```js
import react from 'react';
```

在没有 import map、打包器或其他解析机制时，不能简单等同于相对文件路径。

### 第 7 步：通过 HTTP 服务运行

ES Module 应通过 HTTP 环境学习和验证，避免 `file://` 下不同浏览器的安全策略干扰实验。

### 第 8 步：完成案例并对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`main.js`](./main.js)
- [`math.js`](./math.js)

本节总结：

- **本节核心代码**：`type="module"`、`export`、`import`。
- **实验辅助代码**：结果输出和 `window.moduleSecret` 检查。

## 运行案例

在当前目录执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

打开 Network 面板还能看到 `main.js` 继续请求 `math.js`。

## 效果验证

你应该能够确认：

- `main.js` 通过 `import` 使用 `math.js` 的导出。
- 页面最终计算结果为 `42`。
- 模块在 `head` 声明，但执行时正文节点已经存在。
- `moduleSecret` 不会自动出现在 `window`。
- Network 中能观察到模块依赖请求。
- 能解释为什么跨域模块加载需要关注 CORS。
