# Module 04.03：Cascade、Specificity 与 Inheritance

## 模块目标

解决 CSS 最核心的问题：**当多个声明同时作用于同一个属性时，为什么最终是这个值。**

## Lesson 顺序

1. **04.03.01 同一个属性为什么会出现多个候选声明**。
2. **04.03.02 Origin**：UA / User / Author 的来源模型。
3. **04.03.03 Importance 与 `!important`**：作用、反转与滥用成本。
4. **04.03.04 Specificity 计算规则**：ID / class-like / type-like。
5. **04.03.05 复杂 selector specificity**：`:is()`、`:not()`、`:has()`、`:where()`。
6. **04.03.06 Source Order**：相同优先级时谁获胜。
7. **04.03.07 Inheritance**：哪些属性继承、为什么继承。
8. **04.03.08 `initial` / `inherit` / `unset` / `revert` / `revert-layer`**。
9. **04.03.09 Cascade Layer `@layer`**：显式管理样式层级。
10. **04.03.10 Scoped Styling 与 `@scope` 基础模型**。
11. **04.03.11 Declared → Cascaded → Specified → Computed Value 高层链路**。
12. **04.03.12 Wrong Way：Specificity War 与 `!important` War**。
13. **04.03.13 DevTools：划线声明、Inherited、Matched CSS Rules 的证据链**。
14. **04.03.14 Failure Lab：为什么 `!important` 也可能没有得到你想要的结果**。
15. **04.03.15 综合实践：不用提高 specificity 重构一套冲突样式**。

## Definition of Done

看到任意一条被覆盖的声明，学习者能够按 Origin → Importance → Layer → Specificity → Scope/Order 的思路解释最终胜者，而不是靠不断加选择器或 `!important` 试错。
