# KP001：HTML 标准声明

> 节点：`node-02-01-01-01-01-01-01-01`  
> [返回模块索引](../../README.md) · [打开源码](./index.html)

## 文档目录

- [理论讲解](#理论讲解)
- [源码讲解](#源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 理论讲解

### 1. 标准声明语法

现代 HTML 文档使用下面的声明：

```html
<!doctype html>
```

它是文档类型声明，不是普通 HTML 标签，因此没有结束标签。HTML 解析对大小写比较宽容，但项目中应统一使用简短的小写写法。

### 2. 声明的放置位置

DOCTYPE 应位于完整 HTML 文档的最前部、`html` 根元素之前。组件模板和 HTML 片段不需要重复声明；真正返回给浏览器的完整文档只声明一次。

### 3. DOM 节点与文档模式

浏览器会把声明表示为 `DocumentType` 节点，通过 `document.doctype` 读取。标准声明还会让浏览器进入标准模式：

```js
document.doctype.name; // "html"
document.compatMode;   // "CSS1Compat"
```

缺少声明时页面仍可能显示，但通常会进入怪异模式，因此“能够显示”不能证明文档入口正确。

## 源码讲解

[`index.html`](./index.html) 第一行就是本知识点的核心声明。页面脚本读取三项真实结果：

1. `document.compatMode` 显示当前文档模式。
2. `document.doctype.name` 显示声明名称。
3. `document.doctype.constructor.name` 显示其 DOM 节点类型。

源码没有加入无关界面，通过删除和恢复第一行即可完成对照。

## 运行案例

直接使用浏览器打开 [`index.html`](./index.html)。如果希望通过本地服务器访问，可在当前目录运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/index.html`。观察一次结果后，删除第一行 DOCTYPE、保存并刷新；最后恢复声明。

## 效果验证

保留声明时应观察到：

- `document.compatMode = CSS1Compat`
- `document.doctype.name = html`
- DOCTYPE 节点类型为 `DocumentType`

删除声明后应观察到 `BackCompat`，并且 DOCTYPE 名称与节点类型显示“不存在”。
