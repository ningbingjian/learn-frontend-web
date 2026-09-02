# Module 04.08：Flexbox 完整体系

## 模块目标

从算法心智模型而不是“记属性”掌握一维布局：主轴、交叉轴、base size、free space、grow/shrink、alignment 与 min-size trap。

## Lesson 顺序

1. **04.08.01 为什么需要 Flexbox：一维布局问题**。
2. **04.08.02 Flex Container / Flex Item / Main Axis / Cross Axis**。
3. **04.08.03 `flex-direction` 与书写方向**。
4. **04.08.04 `justify-content`**。
5. **04.08.05 `align-items` / `align-self` / baseline**。
6. **04.08.06 `gap`**。
7. **04.08.07 `flex-wrap` / `align-content`**。
8. **04.08.08 `flex-basis` 与 hypothetical size**。
9. **04.08.09 `flex-grow`：正自由空间如何分配**。
10. **04.08.10 `flex-shrink`：负自由空间如何收缩**。
11. **04.08.11 `flex` shorthand：`auto` / `none` / `1` 的真实含义**。
12. **04.08.12 `min-width:auto` Trap 与 `min-width:0`**。
13. **04.08.13 `order` 与视觉顺序/A11Y 风险**。
14. **04.08.14 Nested Flex 与常见页面骨架**。
15. **04.08.15 Failure Lab：文本为什么把 flex item 撑爆**。
16. **04.08.16 Failure Lab：为什么 `justify-content` 看起来没效果**。
17. **04.08.17 DevTools Flex Overlay 与尺寸证据**。
18. **04.08.18 综合实践：后台管理 Shell + Toolbar + Card Row**。

## Definition of Done

能够先判断轴和自由空间，再解释 grow/shrink/alignment；能够修复常见 min-size、溢出、换行与 A11Y 问题。
