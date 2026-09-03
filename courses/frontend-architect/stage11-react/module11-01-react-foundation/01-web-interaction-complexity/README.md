# 01 - 网页交互为什么会越来越难维护

> Lesson ID：`RE-INTRO-001`  
> 学习深度：`Must`  
> 课程类型：问题域实验  
> 技术：HTML + CSS + 原生 JavaScript + DOM  
> React：**本课故意不引入 React**  
> 主问题：**网页功能变多以后，真正难维护的是 DOM API 本身，还是“状态、事件、多个 UI 区域必须始终保持一致”的同步关系？**  
> 起始状态：本课不继承任何上一课业务源码，从一个新的最小静态页面开始。  
> 设计来源：[Module 11.01 大纲](../../../../../learn-frontend-web-course/stage11-react/module11-01-react-foundation/README.md)

---

## 目录

- [1. 本课最终要看懂什么](#section-1)
- [2. 本课为什么先不写 React](#section-2)
- [3. 最终项目结构](#section-3)
- [4. 起始状态与运行方式](#section-4)
- [5. Step 0：创建空项目](#section-5)
- [6. Step 1：先做一个完全静态的商品页](#section-6)
- [7. Step 2：把商品数据交给 JavaScript 渲染](#section-7)
- [8. Step 3：加入第一份状态——搜索关键字](#section-8)
- [9. Step 4：加入第二份状态——只看有货](#section-9)
- [10. Step 5：同一份状态开始影响更多 UI](#section-10)
- [11. Step 6：加入购物车计数](#section-11)
- [12. Step 7：故意删掉一条同步语句](#section-12)
- [13. 画出现在真正维护的关系](#section-13)
- [14. 理论收束：问题叫“协调复杂度”](#section-14)
- [15. 原生 DOM 有问题吗](#section-15)
- [16. 生产环境边界](#section-16)
- [17. 最终源码验证](#section-17)
- [18. 常见跟做问题](#section-18)
- [19. 本课只记住 3 件事](#section-19)
- [20. Challenge](#section-20)
- [21. Mastery Check](#section-21)
- [22. 下一课](#section-22)

---

<a id="section-1"></a>
# 1. 本课最终要看懂什么

这一课最终只做一个很小的商品筛选页面：

```text
搜索框
+
“只看有货”复选框
+
重置按钮
+
当前筛选说明
+
当前可见商品数量
+
商品列表
+
购物车数量
```

功能并不复杂。

真正要观察的是：当 `query` 和 `onlyInStock` 两份状态发生变化以后，哪些 UI 必须跟着变化。

最终你会亲手看到：

```text
query
├── 商品列表
├── 可见商品数量
├── 筛选说明
└── Reset 按钮状态

onlyInStock
├── 商品列表
├── 可见商品数量
├── 筛选说明
└── Reset 按钮状态
```

只有两份筛选状态，就已经产生了多条同步关系。

如果未来继续加入：

```text
分类
价格区间
排序
分页
收藏
权限
Loading
Error
Server Data
URL
缓存
```

困难往往不是某一次 `document.querySelector()` 很难写，而是：

> **任何状态改变以后，所有依赖它的 UI 都必须被正确、及时、完整地更新。**

这就是本课的唯一主问题。

---

<a id="section-2"></a>
# 2. 本课为什么先不写 React

如果第一课直接写：

```jsx
const [query, setQuery] = useState('');
```

你当然可以很快看到页面变化，但很容易形成一个错误印象：

> React 只是另一种“绑定事件 + 改页面”的写法。

本课先用原生 DOM，是为了把 React 将来要解决的问题暴露出来。

我们暂时**不学习**：

- JSX；
- Component；
- Props；
- State Hook；
- Effect；
- Virtual DOM；
- Fiber。

这些都有自己的后续 Lesson。

本课只观察：

```text
用户事件
↓
JavaScript 状态变化
↓
开发者手工找到所有受影响 UI
↓
逐个修改 DOM
```

---

<a id="section-3"></a>
# 3. 最终项目结构

本课最终目录：

```text
01-web-interaction-complexity/
├── README.md
├── index.html
├── styles.css
└── app.js
```

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面结构和交互控件 |
| `styles.css` | 让实验页面清晰可观察；不是本课重点 |
| `app.js` | 商品数据、状态、事件处理器、DOM 同步逻辑 |

本课：

- 没有 npm 依赖；
- 没有 `package.json`；
- 没有构建步骤；
- 不需要 React；
- 不需要服务器 API。

项目故意保持最小。

---

<a id="section-4"></a>
# 4. 起始状态与运行方式

本课是独立 Lesson：

```text
本课不继承上一课业务源码。
本课从一个新的最小项目开始。
```

## 4.1 当前课程目录

仓库根目录下进入：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-foundation
```

本课目录是：

```text
01-web-interaction-complexity
```

## 4.2 安装依赖

本课没有第三方依赖，所以：

```text
不需要 npm install
不需要 pnpm install
```

## 4.3 启动方式

为了让浏览器通过 HTTP 打开页面，可以在本课目录执行：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

这里的 Python HTTP Server 只是**静态文件运行工具**，不是本课知识点。

如果你已经在 Stage 00 使用过其他静态 HTTP Server，也可以替换；但本课所有文件必须仍然从当前 Lesson 目录提供。

---

<a id="section-5"></a>
# 5. Step 0：创建空项目

当前状态：

```text
module11-01-react-foundation/
└── README.md
```

本步目标：只创建本课最小文件骨架。

创建目录：

```bash
mkdir -p 01-web-interaction-complexity
cd 01-web-interaction-complexity
```

创建文件：

```bash
touch index.html styles.css app.js
```

此时目录应该是：

```text
01-web-interaction-complexity/
├── index.html
├── styles.css
└── app.js
```

现在不要急着写 JavaScript 状态。

我们先从“没有交互”的页面开始。

---

<a id="section-6"></a>
# 6. Step 1：先做一个完全静态的商品页

## 当前问题

现在项目什么都没有。我们先建立页面中哪些区域将来需要被同步。

## 本步目标

创建搜索控件、筛选控件、摘要区域和商品列表容器。

## 修改文件

创建 / 完整填写：

```text
01-web-interaction-complexity/index.html
```

写入：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RE-INTRO-001 - UI 同步复杂度</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="page-shell">
      <header class="page-header">
        <p class="eyebrow">RE-INTRO-001</p>
        <h1>商品目录：原生 DOM 同步实验</h1>
        <p>
          这不是 React 页面。我们先观察功能增加后，状态和多个 UI 区域之间的同步关系为什么会快速增多。
        </p>
      </header>

      <section class="toolbar" aria-label="商品筛选">
        <label class="field">
          <span>搜索商品</span>
          <input id="search-input" type="search" placeholder="例如：键盘" autocomplete="off" />
        </label>

        <label class="checkbox-field">
          <input id="stock-only-input" type="checkbox" />
          <span>只看有货</span>
        </label>

        <button id="reset-button" type="button" disabled>重置筛选</button>
      </section>

      <section class="summary" aria-live="polite">
        <p id="filter-summary">当前：全部商品</p>
        <p>
          可见商品：<strong id="visible-count">0</strong>
          · 购物车：<strong id="cart-count">0</strong>
        </p>
      </section>

      <section>
        <h2>商品列表</h2>
        <div id="product-list" class="product-grid"></div>
      </section>
    </main>

    <script type="module" src="./app.js"></script>
  </body>
</html>
```

再完整填写：

```text
01-web-interaction-complexity/styles.css
```

写入：

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #1f2937;
  background: #f5f7fb;
}

button,
input {
  font: inherit;
}

.page-shell {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 80px;
}

.page-header,
.toolbar,
.summary,
.product-card,
.empty-state {
  background: #ffffff;
  border: 1px solid #dbe2ea;
  border-radius: 12px;
}

.page-header {
  padding: 24px;
}

.page-header h1 {
  margin: 4px 0 8px;
}

.eyebrow {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: end;
  margin-top: 20px;
  padding: 20px;
}

.field {
  display: grid;
  gap: 8px;
  min-width: 260px;
  flex: 1;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #9ca3af;
  border-radius: 8px;
}

.checkbox-field {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 42px;
}

button {
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding: 16px 20px;
}

.summary p {
  margin: 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.product-card {
  padding: 18px;
}

.product-card h3 {
  margin: 0 0 8px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 12px 0;
  font-size: 14px;
}

.stock-ok {
  font-weight: 700;
}

.stock-out {
  color: #6b7280;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 32px;
  text-align: center;
}
```

现在运行：

```bash
python3 -m http.server 4173
```

浏览器打开：

```text
http://localhost:4173
```

你现在应该看到：

- 页面标题；
- 搜索框；
- “只看有货”；
- 禁用状态的“重置筛选”；
- `可见商品：0`；
- 空的商品列表区域。

为什么还是 `0`？

因为到这里我们只有 HTML 结构，还没有把数据转换成 DOM。

---

<a id="section-7"></a>
# 7. Step 2：把商品数据交给 JavaScript 渲染

## 当前状态

HTML 已经定义了 UI 容器，但没有商品数据。

## 当前问题

我们需要让 JavaScript 把一组商品数据变成真实 DOM。

## 修改文件

完整填写：

```text
01-web-interaction-complexity/app.js
```

先写入下面这一版：

```js
const products = [
  { id: 1, name: "机械键盘", category: "外设", price: 399, inStock: true },
  { id: 2, name: "无线鼠标", category: "外设", price: 199, inStock: true },
  { id: 3, name: "4K 显示器", category: "显示设备", price: 2499, inStock: false },
  { id: 4, name: "USB-C 扩展坞", category: "配件", price: 459, inStock: true },
  { id: 5, name: "人体工学支架", category: "配件", price: 329, inStock: false },
  { id: 6, name: "桌面音箱", category: "音频", price: 699, inStock: true },
];

const productList = document.querySelector("#product-list");
const visibleCount = document.querySelector("#visible-count");

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  article.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.category}</p>
    <div class="product-meta">
      <span>¥${product.price}</span>
      <span class="${product.inStock ? "stock-ok" : "stock-out"}">
        ${product.inStock ? "有货" : "缺货"}
      </span>
    </div>
    <button
      type="button"
      data-add-product="${product.id}"
      ${product.inStock ? "" : "disabled"}
    >
      加入购物车
    </button>
  `;

  return article;
}

function renderProductList() {
  productList.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const product of products) {
    fragment.append(createProductCard(product));
  }

  productList.append(fragment);
}

function syncVisibleCount() {
  visibleCount.textContent = String(products.length);
}

renderProductList();
syncVisibleCount();
```

刷新浏览器。

现在应该看到 6 张商品卡片，并显示：

```text
可见商品：6
```

## 这一刻发生了什么

数据流是：

```text
products Array
↓
renderProductList()
↓
createElement / innerHTML
↓
真实 DOM
```

现在还不复杂，因为 `products` 从来没有变化。

真正的问题从“用户可以改变页面状态”开始。

---

<a id="section-8"></a>
# 8. Step 3：加入第一份状态——搜索关键字

## 当前问题

搜索框已经存在，但输入任何文字都不会改变商品列表。

我们需要：

```text
用户输入
↓
保存当前 query
↓
重新计算可见商品
↓
重新修改 DOM
```

## 修改文件

修改：

```text
01-web-interaction-complexity/app.js
```

在 `products` 数组下面新增：

```js
const state = {
  query: "",
  onlyInStock: false,
  cartCount: 0,
};
```

这里先把 `state` 理解为：

> **当前页面需要记住、并且可能随用户操作变化的数据。**

然后在 DOM 查询区域新增：

```js
const searchInput = document.querySelector("#search-input");
```

再增加函数：

```js
function getVisibleProducts() {
  const normalizedQuery = state.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    return matchesQuery;
  });
}
```

把 `renderProductList()` 改成使用可见数据：

```js
function renderProductList() {
  const visibleProducts = getVisibleProducts();
  productList.replaceChildren();

  if (visibleProducts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "没有符合条件的商品";
    productList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const product of visibleProducts) {
    fragment.append(createProductCard(product));
  }

  productList.append(fragment);
}
```

把 `syncVisibleCount()` 改为：

```js
function syncVisibleCount() {
  visibleCount.textContent = String(getVisibleProducts().length);
}
```

最后，在初始化调用之前加入事件处理器：

```js
function handleSearchInput(event) {
  state.query = event.target.value;

  renderProductList();
  syncVisibleCount();
}

searchInput.addEventListener("input", handleSearchInput);
```

刷新浏览器，输入：

```text
键盘
```

你应该看到：

```text
商品列表：只剩“机械键盘”
可见商品：1
```

## 第一个重要关系

现在一个事件至少负责两件事：

```text
query 改变
├── renderProductList()
└── syncVisibleCount()
```

如果只调用第一个函数，商品列表会正确，但数字会过期。

这一点稍后会故意复现。

---

<a id="section-9"></a>
# 9. Step 4：加入第二份状态——只看有货

## 当前问题

页面还有一个 `onlyInStock` 复选框。

它也会影响：

- 商品列表；
- 可见商品数量。

## 修改 `getVisibleProducts()`

找到：

```js
function getVisibleProducts() {
```

把整个函数替换为：

```js
function getVisibleProducts() {
  const normalizedQuery = state.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    const matchesStock = !state.onlyInStock || product.inStock;

    return matchesQuery && matchesStock;
  });
}
```

DOM 查询区域新增：

```js
const stockOnlyInput = document.querySelector("#stock-only-input");
```

增加事件处理器：

```js
function handleOnlyInStockChange(event) {
  state.onlyInStock = event.target.checked;

  renderProductList();
  syncVisibleCount();
}

stockOnlyInput.addEventListener("change", handleOnlyInStockChange);
```

刷新页面。

依次操作：

1. 不输入搜索内容；
2. 勾选“只看有货”。

应该看到 4 个有货商品。

再搜索：

```text
显示器
```

因为 `4K 显示器` 缺货，所以应该看到：

```text
没有符合条件的商品
可见商品：0
```

## 同步关系已经开始重复

搜索事件：

```js
renderProductList();
syncVisibleCount();
```

库存筛选事件：

```js
renderProductList();
syncVisibleCount();
```

两个不同事件，都必须记住同一份同步清单。

---

<a id="section-10"></a>
# 10. Step 5：同一份状态开始影响更多 UI

只有商品列表和数字还不够明显。

现在加入两个真实需求：

1. 显示当前筛选条件；
2. 没有任何筛选时，重置按钮必须禁用。

HTML 已经有：

```text
#filter-summary
#reset-button
```

## 10.1 查询 DOM

在 `app.js` DOM 查询区域加入：

```js
const filterSummary = document.querySelector("#filter-summary");
const resetButton = document.querySelector("#reset-button");
```

## 10.2 同步筛选说明

新增：

```js
function syncFilterSummary() {
  const parts = [];

  if (state.query.trim()) {
    parts.push(`搜索“${state.query.trim()}”`);
  }

  if (state.onlyInStock) {
    parts.push("只看有货");
  }

  filterSummary.textContent =
    parts.length === 0 ? "当前：全部商品" : `当前：${parts.join(" + ")}`;
}
```

## 10.3 同步 Reset 按钮

新增：

```js
function syncResetButton() {
  const hasActiveFilter = state.query.trim() !== "" || state.onlyInStock;
  resetButton.disabled = !hasActiveFilter;
}
```

## 10.4 修改两个已有事件处理器

搜索处理器现在必须变成：

```js
function handleSearchInput(event) {
  state.query = event.target.value;

  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}
```

库存处理器必须变成：

```js
function handleOnlyInStockChange(event) {
  state.onlyInStock = event.target.checked;

  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}
```

注意这里的重复是**故意保留**的。

现在不要急着抽一个 `syncEverything()`。

我们需要先看清问题。

## 10.5 实现 Reset

新增：

```js
function handleReset() {
  state.query = "";
  state.onlyInStock = false;

  searchInput.value = "";
  stockOnlyInput.checked = false;

  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}

resetButton.addEventListener("click", handleReset);
```

## 10.6 初始化时也必须同步

文件底部初始化调用改为：

```js
renderProductList();
syncVisibleCount();
syncFilterSummary();
syncResetButton();
```

刷新浏览器。

现在测试：

```text
输入“显示器”
↓
筛选说明出现“搜索‘显示器’”
↓
Reset 可点击
↓
勾选“只看有货”
↓
商品变成 0 个
↓
筛选说明同时包含两个条件
↓
点击 Reset
↓
所有 UI 一起恢复
```

## 现在维护的已经不是一个函数

每次过滤状态变化，都必须想起：

```text
[ ] 商品列表
[ ] 可见数量
[ ] 筛选说明
[ ] Reset disabled 状态
```

这就是同步清单。

---

<a id="section-11"></a>
# 11. Step 6：加入购物车计数

购物车状态和筛选状态不同。

`cartCount` 只影响：

```text
#cart-count
```

这正好让我们看到：不同 State 有不同 UI Consumer。

## 11.1 查询 DOM

新增：

```js
const cartCount = document.querySelector("#cart-count");
```

## 11.2 新增同步函数

```js
function syncCartCount() {
  cartCount.textContent = String(state.cartCount);
}
```

## 11.3 监听商品列表点击

商品卡片是 JavaScript 动态创建的。

这里使用列表容器统一监听点击：

```js
function handleProductListClick(event) {
  const button = event.target.closest("[data-add-product]");

  if (!button) {
    return;
  }

  state.cartCount += 1;
  syncCartCount();
}

productList.addEventListener("click", handleProductListClick);
```

当前只需要理解：

```text
点击“加入购物车”
↓
cartCount + 1
↓
syncCartCount()
↓
#cart-count DOM 文本改变
```

Event Delegation 的完整机制不是本课主问题。

## 11.4 初始化

文件底部再增加：

```js
syncCartCount();
```

现在你可以连续加入商品，购物车数量应该正确增长。

---

<a id="section-12"></a>
# 12. Step 7：故意删掉一条同步语句

这是本课最重要的实验。

最终源码是正确的，所以我们只**临时制造 Bug，观察以后必须恢复**。

## 12.1 找到函数

打开：

```text
01-web-interaction-complexity/app.js
```

找到：

```js
function handleOnlyInStockChange(event) {
  state.onlyInStock = event.target.checked;

  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}
```

临时注释掉：

```js
syncVisibleCount();
```

变成：

```js
function handleOnlyInStockChange(event) {
  state.onlyInStock = event.target.checked;

  renderProductList();
  // syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}
```

## 12.2 运行实验

刷新页面后：

1. 页面初始显示 6 个商品；
2. 勾选“只看有货”；
3. 商品列表只剩 4 个；
4. 看 `可见商品` 数字。

你会看到：

```text
商品列表：4 个
可见商品：仍然显示 6
```

没有报 JavaScript 异常。

页面也没有崩溃。

但是 UI 已经自相矛盾。

## 12.3 Bug 的根因是什么

不是：

```text
filter() 写错了
DOM API 写错了
checkbox 事件没有触发
```

而是：

> **状态已经改变，但开发者漏掉了一个依赖该状态的 UI 同步点。**

## 12.4 恢复最终源码

把这行恢复：

```js
syncVisibleCount();
```

最终源码必须保持正确状态。

---

<a id="section-13"></a>
# 13. 画出现在真正维护的关系

最终页面有三份状态：

```text
state.query
state.onlyInStock
state.cartCount
```

它们不是直接“等于 DOM”。

中间存在一张依赖关系图：

```text
state.query ───────────────┐
                           ├──> Product List
state.onlyInStock ─────────┘

state.query ───────────────┐
                           ├──> Visible Count
state.onlyInStock ─────────┘

state.query ───────────────┐
                           ├──> Filter Summary
state.onlyInStock ─────────┘

state.query ───────────────┐
                           ├──> Reset Button disabled
state.onlyInStock ─────────┘

state.cartCount ───────────────> Cart Count
```

事件又负责触发这些关系：

```text
Search input event
↓
state.query 改变
↓
必须记得更新 4 个 UI 区域

Stock checkbox event
↓
state.onlyInStock 改变
↓
必须记得更新同样 4 个 UI 区域

Reset click
↓
同时改变 query + onlyInStock
↓
还要先同步 input/checkbox DOM
↓
再同步 4 个结果 UI 区域
```

现在页面只有 6 个商品。

真正让代码开始难维护的不是数据规模，而是**关系数量**。

---

<a id="section-14"></a>
# 14. 理论收束：问题叫“协调复杂度”

本课用“协调复杂度（coordination complexity）”描述这个问题：

> 系统里存在多份会变化的数据和多个依赖这些数据的 UI 输出时，开发者必须确保所有相关更新在正确时机保持一致。

可以把当前模型简化为：

```text
State
↓
Derived Data
↓
UI
```

但在当前命令式实现中，我们实际写的是：

```text
Event A
↓
改 State
↓
手工改 UI-1
手工改 UI-2
手工改 UI-3
手工改 UI-4
```

另一个 Event B 又重复：

```text
Event B
↓
改 State
↓
手工改 UI-1
手工改 UI-2
手工改 UI-3
手工改 UI-4
```

于是维护风险取决于：

```text
有多少状态会变化
×
每份状态影响多少 UI
×
多少事件入口可以改变这些状态
```

这里不是严格的复杂度公式，而是一个工程直觉：

> **关系越多，靠人脑维护完整同步清单越脆弱。**

---

<a id="section-15"></a>
# 15. 原生 DOM 有问题吗

没有。

这一课绝不能得出：

> “原生 JavaScript 很差，所以必须 React。”

原生 DOM 完全可以写出正确、快速、稳定的应用。

我们甚至可以立刻重构当前代码：

```js
function syncFilterUI() {
  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}
```

然后事件里统一调用：

```js
state.query = event.target.value;
syncFilterUI();
```

这已经可以降低一部分遗漏风险。

但新的问题仍然存在：

```text
谁决定哪些 UI 属于 syncFilterUI？
以后增加 UI 要不要记得改这个函数？
一个页面有十组不同同步关系怎么办？
某些 DOM 应该更新、某些应该复用时怎么办？
Component 边界怎么表达？
```

所以 React 的价值不是：

```text
“帮我们把 querySelector 写短一点”
```

下一课会开始比较更根本的两个模型：

```text
命令式：状态变了以后，我应该怎么修改 DOM？

声明式：给定当前状态，UI 应该是什么？
```

---

<a id="section-16"></a>
# 16. 生产环境边界

什么时候原生 DOM 仍然很合理？

例如：

- 一个很小的嵌入式 Widget；
- 几乎没有状态变化的内容页；
- 一个独立 Web Component；
- 特定性能敏感的底层 DOM 操作；
- 渐进增强已有 HTML；
- 框架内部的 Host Integration。

什么时候协调复杂度开始明显？

例如：

```text
筛选条件很多
+ 多个组件共享状态
+ Server Data
+ Loading / Error
+ 表单编辑
+ Optimistic UI
+ Route / URL State
+ 权限
+ 多种异步结果
```

选择 React 之前，应该先知道自己在解决什么问题。

---

<a id="section-17"></a>
# 17. 最终源码验证

仓库已经保存本课完整最终源码：

```text
01-web-interaction-complexity/
├── README.md
├── index.html
├── styles.css
└── app.js
```

## 17.1 启动

进入：

```bash
cd courses/frontend-architect/stage11-react/module11-01-react-foundation/01-web-interaction-complexity
```

运行：

```bash
python3 -m http.server 4173
```

访问：

```text
http://localhost:4173
```

## 17.2 手工验收矩阵

### Case 1：初始状态

应该看到：

```text
6 个商品
可见商品：6
购物车：0
当前：全部商品
Reset disabled
```

### Case 2：搜索

输入：

```text
键盘
```

应该看到：

```text
1 个商品
可见商品：1
当前：搜索“键盘”
Reset enabled
```

### Case 3：只看有货

清空搜索，勾选：

```text
只看有货
```

应该看到：

```text
4 个商品
可见商品：4
当前：只看有货
```

### Case 4：组合条件

搜索：

```text
显示器
```

并保持“只看有货”。

应该看到：

```text
没有符合条件的商品
可见商品：0
```

### Case 5：Reset

点击：

```text
重置筛选
```

应该恢复 Case 1。

### Case 6：购物车

连续点击任意两个有货商品的“加入购物车”。

应该看到：

```text
购物车：2
```

本课没有构建产物，也没有测试框架；上述浏览器行为矩阵就是当前 Lesson 的验证证据。测试工具链会在后续 Owner Stage / Module 正式学习。

---

<a id="section-18"></a>
# 18. 常见跟做问题

## 18.1 页面打开后没有样式

确认三个文件处于同一目录：

```text
index.html
styles.css
app.js
```

并确认 HTML 中：

```html
<link rel="stylesheet" href="./styles.css" />
```

## 18.2 商品列表为空

打开 Browser DevTools → Console。

首先检查 `app.js` 是否加载失败。

HTML 中必须有：

```html
<script type="module" src="./app.js"></script>
```

## 18.3 搜索后列表变了，但数量没变

这恰好就是本课要理解的问题。

检查对应事件处理器是否同时调用：

```js
renderProductList();
syncVisibleCount();
```

## 18.4 点击 Reset 后筛选状态恢复了，但输入框还有文字

这说明 JavaScript State 与浏览器 Input DOM 又出现了不一致。

Reset 除了修改：

```js
state.query = "";
```

还必须手工修改：

```js
searchInput.value = "";
```

这也是协调复杂度的另一个例子。

---

<a id="section-19"></a>
# 19. 本课只记住 3 件事

第一：

> **状态变化以后，所有依赖它的 UI 都必须保持一致。**

第二：

> **命令式 DOM 的困难通常不是单个 API，而是状态 × UI × 事件形成的同步关系越来越多。**

第三：

> **React 的学习应该从“它为什么需要一种不同的 UI 更新模型”开始，而不是从背 `useState` 开始。**

---

<a id="section-20"></a>
# 20. Challenge

不要看答案，尝试新增一个排序控件：

```text
默认顺序
价格从低到高
价格从高到低
```

要求：

1. 新增 `state.sortOrder`；
2. 搜索和库存筛选仍然正确；
3. `可见商品` 数量不能被排序影响；
4. Reset 必须同时恢复排序；
5. 筛选说明要不要显示排序，由你先做设计决定；
6. 记录为了加入这一份 State，你最终修改了多少个同步点。

Challenge 的重点不是排序算法。

重点是回答：

> **新加一份状态以后，为什么你必须重新检查多处 UI 和多个事件处理器？**

---

<a id="section-21"></a>
# 21. Mastery Check

如果下面的问题不能脱离代码回答，建议重新做一次 Step 7。

1. `state.query` 改变以后，当前页面有哪些 UI 必须同步？
2. 为什么只更新商品列表、不更新 `visible-count` 不会抛异常，却仍然是 Bug？
3. `getVisibleProducts()` 属于 State 本身，还是由 State 推导出来的数据？
4. Reset 为什么既要改 JavaScript State，又要改 Input DOM？
5. `cartCount` 为什么不需要重新渲染商品列表？
6. 本课真正暴露的复杂度来自 DOM API 数量，还是依赖关系数量？
7. 把所有同步函数包进 `syncEverything()` 可以降低什么问题，又没有从根本上回答什么问题？
8. 为什么本课不能得出“原生 DOM 不适合生产环境”的结论？

通过标准：

> 能画出 `State → Derived Data → UI` 关系，并能解释一次遗漏同步为什么会产生“页面没有崩但 UI 已经不一致”的 Bug。

---

<a id="section-22"></a>
# 22. 下一课

下一课：

```text
RE-INTRO-002
命令式 UI 与声明式 UI 到底差在哪里
```

我们会使用**同一个问题**对比：

```text
命令式：
状态变化
→ 开发者决定应该怎么修改 DOM

声明式：
当前状态
→ 描述 UI 应该是什么
```

到那时再正式建立 React 最重要的第一层心智模型。

---

> [返回 Module 11.01](../README.md) · [返回 Stage 11](../../README.md)
