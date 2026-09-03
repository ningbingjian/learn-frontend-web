const output = document.querySelector("#selector-output");
const form = document.querySelector("#profile-form");
const decorated = document.querySelector(".decorated-status");

const selectors = [
  ":focus",
  ":focus-visible",
  ".focus-card:focus-within",
  "input:required",
  "input:invalid",
  "input:valid",
  "input:read-only",
  "input:checked",
  "button:disabled",
];

function safeCount(selector) {
  try {
    return document.querySelectorAll(selector).length;
  } catch {
    return "unsupported";
  }
}

function renderEvidence(eventName = "initial") {
  const active = document.activeElement;
  const pseudoContent = getComputedStyle(decorated, "::before").content;
  const lines = [
    `event=${eventName}`,
    `activeElement=${active?.tagName?.toLowerCase() ?? "(none)"}#${active?.id ?? ""}.${active?.className ?? ""}`,
    `form.checkValidity()=${form.checkValidity()}`,
    `decorated ::before computed content=${pseudoContent}`,
    "",
    ...selectors.map((selector) => `${selector} => ${safeCount(selector)}`),
    "",
    `DOM query for ::before => document.querySelector('.decorated-status::before') is invalid because pseudo-elements are not Element nodes.`,
  ];
  output.textContent = lines.join("\n");
}

for (const eventName of ["focusin", "focusout", "input", "change"]) {
  document.addEventListener(eventName, () => renderEvidence(eventName));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reportValidity();
  renderEvidence("submit");
});

renderEvidence();
