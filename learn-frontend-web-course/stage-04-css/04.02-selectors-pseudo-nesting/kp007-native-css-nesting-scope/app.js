const output = document.querySelector("#evidence-output");
const scopeRoot = document.querySelector("#scope-root");
const component = document.querySelector(".component-card");
const toggleButton = document.querySelector("#toggle-state");
const refreshButton = document.querySelector("#refresh-evidence");

function collectEvidence() {
  const allScopeItems = scopeRoot.querySelectorAll(".scope-item");
  const directScopeItems = scopeRoot.querySelectorAll(":scope > .scope-item");
  const nestedItem = scopeRoot.querySelector(".nested-scope-item");
  const title = component.querySelector(".component-card__title");

  const lines = [
    `Native nesting support (selector(&)): ${CSS.supports("selector(&)")}`,
    `:scope selector support: ${CSS.supports("selector(:scope)")}`,
    "",
    `.scope-item count: ${allScopeItems.length}`,
    `:scope > .scope-item count: ${directScopeItems.length}`,
    `nested item matches ".scope-item": ${nestedItem.matches(".scope-item")}`,
    `nested item matches ":scope > .scope-item" through scopeRoot query: ${[...directScopeItems].includes(nestedItem)}`,
    "",
    `component data-state: ${component.dataset.state}`,
    `component border color: ${getComputedStyle(component).borderColor}`,
    `direct title color: ${getComputedStyle(title).color}`,
    "",
    "结论：:scope 把 scoped query 的引用根明确写进 selector；它不是 @scope at-rule。",
  ];

  output.textContent = lines.join("\n");
}

toggleButton.addEventListener("click", () => {
  component.dataset.state = component.dataset.state === "active" ? "idle" : "active";
  collectEvidence();
});

refreshButton.addEventListener("click", collectEvidence);

collectEvidence();
