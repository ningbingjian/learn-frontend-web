# KP107：分步表单

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用一个 `<form>` 组织多步骤数据，而不是为每一步创建互相割裂的表单。
2. 用明确的步骤标题、当前步骤和总步骤数帮助用户理解进度。
3. 理解 `hidden` 只控制当前步骤是否显示，不会自动清空已经输入的控件值。
4. 正确区分“上一步/下一步”按钮与最终提交按钮的 `type`。
5. 理解多步骤表单中的“返回后保留数据”和“跨刷新保存草稿”是两个不同问题。

> **本节核心代码**：一个 `<form>` 中的多个步骤区域、`type="button"` 的前后导航、最终 `type="submit"`。  
> **实验辅助代码**：步骤切换、进度文字、`sessionStorage` 草稿保存与 FormData 输出。

## 理论讲解

### 1. 分步表单仍然可以是一份表单

注册、结算、申请流程经常被拆成多步，例如：

```text
第 1 步：账号信息
第 2 步：联系方式
第 3 步：确认提交
```

如果这些字段最终属于一次业务提交，最自然的 HTML 结构通常仍是一份 `<form>`：

```html
<form>
  <section data-step="1">...</section>
  <section data-step="2" hidden>...</section>
  <section data-step="3" hidden>...</section>
</form>
```

不要嵌套 `<form>`。HTML 不允许表单嵌套，浏览器解析器还可能修正 DOM，导致提交范围和预期不同。

### 2. 步骤结构需要可识别的标题

每一步不是只有一堆输入框，还应该告诉用户当前在做什么：

```html
<section data-step="1">
  <h2>账号信息</h2>
  ...
</section>
```

步骤标题负责说明当前区域的主题。

页面还可以提供整体进度：

```html
<p id="progress">第 1 步，共 3 步：账号信息</p>
```

“1/3”比只有“下一步”更能帮助用户建立流程预期。

### 3. `hidden` 隐藏步骤不会自动清空值

如果控件仍然留在 DOM 中，只是它所在的步骤被设置为：

```html
<section hidden>
```

用户之前填写的 `.value` 通常仍然存在。

因此：

```text
第 1 步填写姓名
→ 下一步
→ 再返回第 1 步
```

姓名可以继续保留。

这属于“同一页面生命周期内保留状态”。

它和刷新页面以后仍要恢复数据不是一回事。

### 4. 跨刷新保存需要额外状态机制

如果页面刷新后还要恢复草稿，可以使用：

- `sessionStorage`
- `localStorage`
- IndexedDB
- 后端草稿接口

本节实验使用 `sessionStorage`，只是为了观察状态保存流程，不代表生产环境应把所有业务数据都存浏览器。

敏感信息尤其不能随意长期存入 Web Storage。

### 5. 上一步和下一步不应该误提交

表单中的 `<button>` 默认类型是 `submit`。

所以步骤导航按钮应该显式写：

```html
<button type="button">上一步</button>
<button type="button">下一步</button>
```

真正结束流程时才使用：

```html
<button type="submit">确认提交</button>
```

### 6. 每一步是否立即校验取决于产品流程

常见做法是点击“下一步”时只检查当前步骤，再允许进入后续步骤。

但不要把“分步”误解成必须绕过浏览器原生校验。

本节主要学习结构、状态和返回行为，完整约束校验会在 KP108～KP110 展开。

## 动手编码：从 0 到 1

### 第 0 步：创建最小文件

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP107 分步表单</title>
</head>
<body>
  <main>
    <h1>创建学习账号</h1>
  </main>
</body>
</html>
```

**本步目标**：先得到最小可运行 HTML。  
**为什么这样写**：分步逻辑仍建立在正常文档骨架上。  
**运行后观察**：浏览器只显示标题。

### 第 1 步：创建一份 form 和三个步骤

```html
<form id="signup-form">
  <section data-step="1">
    <h2>账号信息</h2>
  </section>

  <section data-step="2" hidden>
    <h2>联系方式</h2>
  </section>

  <section data-step="3" hidden>
    <h2>确认提交</h2>
  </section>
</form>
```

**本步目标**：让所有字段属于同一表单。  
**为什么这样写**：最终可以一次构造完整 FormData。  
**运行后观察**：只显示第一步。

### 第 2 步：加入字段和步骤导航

第一步加入：

```html
<label>
  昵称
  <input name="nickname" autocomplete="nickname">
</label>
<button type="button" data-next>下一步</button>
```

第二步加入：

```html
<label>
  邮箱
  <input name="email" type="email" autocomplete="email">
</label>
<button type="button" data-prev>上一步</button>
<button type="button" data-next>下一步</button>
```

第三步最后使用：

```html
<button type="submit">确认提交</button>
```

**本步目标**：明确步骤导航不是提交。  
**为什么这样写**：避免按钮默认 `submit` 导致流程提前结束。  
**运行后观察**：当前还没有 JS，所以步骤不会自动切换。

### 第 3 步：增加进度提示

```html
<p id="progress" aria-live="polite"></p>
```

JS 根据当前步骤写入：

```js
progress.textContent = `第 ${currentStep} 步，共 ${steps.length} 步：${title}`;
```

**本步目标**：让用户知道当前位置。  
**为什么这样写**：多步骤流程需要方向感。  
**运行后观察**：切换步骤时进度文字同步变化。

### 第 4 步：实现前后步骤切换

核心逻辑：

```js
function showStep(nextStep) {
  currentStep = nextStep;

  steps.forEach((step, index) => {
    step.hidden = index + 1 !== currentStep;
  });
}
```

下一步：

```js
showStep(Math.min(currentStep + 1, steps.length));
```

上一步：

```js
showStep(Math.max(currentStep - 1, 1));
```

**本步目标**：只展示当前步骤。  
**为什么这样写**：字段仍留在同一 form 中，返回时原值不会因为 DOM 被销毁而丢失。  
**运行后观察**：可以前后移动，输入值仍保留。

### 第 5 步：增加草稿保存与恢复

保存：

```js
const draft = Object.fromEntries(new FormData(form));
sessionStorage.setItem('kp107-draft', JSON.stringify(draft));
```

恢复：

```js
const draft = JSON.parse(sessionStorage.getItem('kp107-draft') || '{}');

for (const [name, value] of Object.entries(draft)) {
  const control = form.elements.namedItem(name);
  if (control) control.value = value;
}
```

**本步目标**：观察跨刷新状态恢复。  
**为什么这样写**：同页返回保留与跨刷新保存属于两层机制。  
**运行后观察**：保存草稿后刷新，再点击恢复可以重新填回字段。

### 第 6 步：提交时观察完整 FormData

```js
form.addEventListener('submit', event => {
  event.preventDefault();

  const data = new FormData(form);
  output.textContent = JSON.stringify(Object.fromEntries(data), null, 2);
});
```

**本步目标**：确认多步字段最终仍属于同一次提交。  
**为什么这样写**：步骤只是 UI 分段，不应破坏最终业务数据集合。  
**运行后观察**：提交结果同时包含第一步和第二步字段。

### 第 7 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：单一 form、步骤 section、`hidden`、`type="button"` 和最终 submit。
- **实验辅助代码**：步骤切换、进度提示、sessionStorage、FormData 输出。

## 运行案例

直接打开 `index.html` 即可运行。

如果希望通过 HTTP 方式运行：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/08-forms-validation/kp107-multi-step-form
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 效果验证

1. 第一次打开只显示“账号信息”。
2. “下一步”和“上一步”不会提交表单。
3. 从第二步返回第一步时，之前填写的昵称仍然存在。
4. 顶部进度提示会随步骤变化。
5. 保存草稿、刷新并恢复后，字段值可以重新出现。
6. 最终提交结果同时包含多个步骤中的字段。
7. 能解释“同页返回保留值”和“跨刷新保存草稿”的区别。
8. 能解释为什么多步骤业务不应该嵌套多个 `<form>`。

完成后继续 **KP108：required、minlength、maxlength、pattern**。
