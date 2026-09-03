const output = document.querySelector("#selector-output");
const healthPanel = document.querySelector("#health-panel");

const selectors = [
  ":is(.message.info, .message.warning, .message.success)",
  ".specificity-is :is(.message, #never-used)",
  ".specificity-where :where(.message, #never-used)",
  ".action:not(.archived, [aria-disabled='true'])",
  ".panel:has(.status-error)",
  ".step:has(+ .step.current)",
  ".status-error:has(.panel)",
];

function label(element) {
  return element.id || element.textContent.trim().replace(/\s+/g, " ");
}

function renderEvidence() {
  const support = CSS.supports("selector(:has(*))");
  const lines = [`selector(:has(*)) support=${support}`];

  for (const selector of selectors) {
    const matched = [...document.querySelectorAll(selector)].map(label);
    lines.push(`${selector}\n  count=${matched.length}\n  matches=${matched.join(" | ") || "(none)"}`);
  }

  output.textContent = lines.join("\n\n");
}

document.querySelector("#toggle-error").addEventListener("click", () => {
  const existing = healthPanel.querySelector(".status-error");
  if (existing) {
    existing.className = "status-ok";
    existing.textContent = "All checks pass.";
  } else {
    const status = healthPanel.querySelector(".status-ok");
    status.className = "status-error";
    status.textContent = "Health check failed.";
  }
  renderEvidence();
});

renderEvidence();
