const mode = document.body.dataset.mode;
const output = document.querySelector("#project-evidence");
const scopeZone = document.querySelector("#scope-zone");
const statusPanel = document.querySelector(".status-panel");
const releaseList = document.querySelector(".release-list");
const refreshButton = document.querySelector("#refresh-evidence");
const toggleErrorButton = document.querySelector("#toggle-error");
const insertReleaseButton = document.querySelector("#insert-release-note");

function colorOf(selector) {
  const element = document.querySelector(selector);
  return element ? getComputedStyle(element).color : "(missing)";
}

function collectEvidence() {
  const adminSelector = mode === "solution" ? '[data-role="admin"]' : '[data-role*="admin"]';
  const currentSelector =
    mode === "solution"
      ? '.release-row[data-state="current"]'
      : '.release-list > :nth-child(2)';
  const panelSelector =
    mode === "solution"
      ? '.status-panel:has(.status-error)'
      : '.status-error:has(.panel)';
  const scopeSelector =
    mode === "solution"
      ? ':scope > .scope-row'
      : '.scope-row';

  const lines = [
    `mode: ${mode}`,
    `:has support: ${CSS.supports("selector(:has(*))")}`,
    `native nesting support: ${CSS.supports("selector(&)")}`,
    "",
    `S01 target border width: ${getComputedStyle(document.querySelector(".selector-list-target")).borderTopWidth}`,
    `S02 selector ${adminSelector} match count: ${document.querySelectorAll(adminSelector).length}`,
    `S03 ".dashboard .title" match count: ${document.querySelectorAll(".dashboard .title").length}`,
    `S04 selector ${currentSelector} match count: ${document.querySelectorAll(currentSelector).length}`,
    `S05 action computed color: ${colorOf(".action.is-safe")}`,
    `S06 selector ${panelSelector} match count: ${document.querySelectorAll(panelSelector).length}`,
    `S09 button textContent: "${document.querySelector(".danger-action").textContent.trim()}"`,
    `S10 notice label computed color: ${colorOf(".notice__label")}`,
    `S11 scoped selector ${scopeSelector} count: ${scopeZone.querySelectorAll(scopeSelector).length}`,
    "",
    "请把自动结果与 DevTools Matched Rules、querySelectorAll() 和键盘操作一起记录。",
  ];

  output.textContent = lines.join("\n");
}

toggleErrorButton.addEventListener("click", () => {
  const current = statusPanel.querySelector(".status-error");
  if (current) {
    current.className = "status-ok";
    current.textContent = "服务正常";
  } else {
    const ok = statusPanel.querySelector(".status-ok");
    ok.className = "status-error";
    ok.textContent = "服务异常";
  }
  collectEvidence();
});

insertReleaseButton.addEventListener("click", () => {
  const note = document.createElement("li");
  note.className = "release-note";
  note.textContent = `动态提示 ${releaseList.querySelectorAll(".release-note").length + 1}`;
  releaseList.insertBefore(note, releaseList.children[1] ?? null);
  collectEvidence();
});

refreshButton.addEventListener("click", collectEvidence);

collectEvidence();
