const output = document.querySelector("#cssom-output");
function allStyleRules(ruleList) {
  const rules = [];
  for (const rule of ruleList) {
    if ("selectorText" in rule) rules.push(rule);
    if ("cssRules" in rule) rules.push(...allStyleRules(rule.cssRules));
  }
  return rules;
}
const stylesheet = [...document.styleSheets].find((sheet) => sheet.href?.endsWith("/styles.css"));
if (!stylesheet) {
  output.textContent = "没有找到 styles.css 对应的 CSSStyleSheet。";
} else {
  const rules = allStyleRules(stylesheet.cssRules);
  const widthRule = rules.find((rule) => rule.selectorText === ".width-target");
  const invalidValueRule = rules.find((rule) => rule.selectorText === ".invalid-value-demo");
  const unknownPropertyRule = rules.find((rule) => rule.selectorText === ".unknown-property-demo");
  const widthTarget = document.querySelector(".width-target");
  const computedChild = document.querySelector(".computed-child");
  const invalidValueTarget = document.querySelector(".invalid-value-demo");
  const invalidSelectorRetained = rules.some((rule) => rule.selectorText?.includes("definitely-not-a-pseudo"));
  const lines = [
    `CSSStyleSheet.href: ${stylesheet.href}`,
    `CSSStyleSheet.cssRules.length: ${stylesheet.cssRules.length}`,
    "",
    `width declared in CSSStyleRule: ${widthRule?.style.getPropertyValue("width") || "(not found)"}`,
    `width resolved by getComputedStyle(): ${getComputedStyle(widthTarget).width}`,
    "",
    `invalid-value rule serialized declarations: ${invalidValueRule?.style.cssText || "(not found)"}`,
    `invalid-value resolved color: ${getComputedStyle(invalidValueTarget).color}`,
    "",
    `unknown-property rule serialized declarations: ${unknownPropertyRule?.style.cssText || "(not found)"}`,
    `invalid selector retained in CSSOM: ${invalidSelectorRetained}`,
    "",
    `computed-child inherited/resolved font-size: ${getComputedStyle(computedChild).fontSize}`,
  ];
  output.textContent = lines.join("\n");
}
