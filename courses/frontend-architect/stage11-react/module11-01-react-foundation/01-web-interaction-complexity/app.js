const products = [
  { id: 1, name: "机械键盘", category: "外设", price: 399, inStock: true },
  { id: 2, name: "无线鼠标", category: "外设", price: 199, inStock: true },
  { id: 3, name: "4K 显示器", category: "显示设备", price: 2499, inStock: false },
  { id: 4, name: "USB-C 扩展坞", category: "配件", price: 459, inStock: true },
  { id: 5, name: "人体工学支架", category: "配件", price: 329, inStock: false },
  { id: 6, name: "桌面音箱", category: "音频", price: 699, inStock: true },
];

const state = {
  query: "",
  onlyInStock: false,
  cartCount: 0,
};

const searchInput = document.querySelector("#search-input");
const stockOnlyInput = document.querySelector("#stock-only-input");
const resetButton = document.querySelector("#reset-button");
const filterSummary = document.querySelector("#filter-summary");
const visibleCount = document.querySelector("#visible-count");
const cartCount = document.querySelector("#cart-count");
const productList = document.querySelector("#product-list");

function getVisibleProducts() {
  const normalizedQuery = state.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    const matchesStock = !state.onlyInStock || product.inStock;

    return matchesQuery && matchesStock;
  });
}

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

function syncVisibleCount() {
  visibleCount.textContent = String(getVisibleProducts().length);
}

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

function syncResetButton() {
  const hasActiveFilter = state.query.trim() !== "" || state.onlyInStock;
  resetButton.disabled = !hasActiveFilter;
}

function syncCartCount() {
  cartCount.textContent = String(state.cartCount);
}

function handleSearchInput(event) {
  state.query = event.target.value;

  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}

function handleOnlyInStockChange(event) {
  state.onlyInStock = event.target.checked;

  // 这里故意保留重复的同步清单。
  // 本课要观察命令式 UI 中“漏掉一个同步点”为什么会产生不一致。
  renderProductList();
  syncVisibleCount();
  syncFilterSummary();
  syncResetButton();
}

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

function handleProductListClick(event) {
  const button = event.target.closest("[data-add-product]");

  if (!button) {
    return;
  }

  state.cartCount += 1;
  syncCartCount();
}

searchInput.addEventListener("input", handleSearchInput);
stockOnlyInput.addEventListener("change", handleOnlyInStockChange);
resetButton.addEventListener("click", handleReset);
productList.addEventListener("click", handleProductListClick);

renderProductList();
syncVisibleCount();
syncFilterSummary();
syncResetButton();
syncCartCount();
