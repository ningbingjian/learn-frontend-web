const queue = document.querySelector("#deployment-queue");
const output = document.querySelector("#selector-output");
const initialQueue = queue.innerHTML;

const selectors = [
  ".mixed-children > :first-child",
  ".mixed-children > :last-child",
  ".mixed-children > article:nth-child(2)",
  ".mixed-children > article:nth-of-type(2)",
  ".deployment-queue > .job:nth-child(odd)",
  ".deployment-queue > :nth-child(2 of .eligible)",
  ".single-host > :only-child",
];

function describe(element) {
  return element.dataset.name ?? element.textContent.trim().replace(/\s+/g, " ");
}

function renderEvidence() {
  const lines = selectors.map((selector) => {
    const matched = [...document.querySelectorAll(selector)].map(describe);
    return `${selector}\n  count=${matched.length}\n  matches=${matched.join(" | ") || "(none)"}`;
  });
  output.textContent = lines.join("\n\n");
}

document.querySelector("#prepend-eligible").addEventListener("click", () => {
  const item = document.createElement("li");
  item.className = "job eligible";
  item.dataset.name = "New Job";
  item.textContent = "New Job · eligible";
  queue.prepend(item);
  renderEvidence();
});

document.querySelector("#reset-queue").addEventListener("click", () => {
  queue.innerHTML = initialQueue;
  renderEvidence();
});

renderEvidence();
