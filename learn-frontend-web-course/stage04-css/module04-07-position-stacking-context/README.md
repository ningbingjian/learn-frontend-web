# Module 04.07：Position、Containing Block、Stacking Context 与 Scroll

## 模块目标

一次解决定位与层叠最容易产生的错觉：元素究竟相对谁定位、为什么 z-index 很大仍在下面、为什么 sticky/fixed 会失效或改变参照。

## Lesson 顺序

1. **04.07.01 `position: static/relative`**。
2. **04.07.02 Absolute Positioning 与 inset 属性**。
3. **04.07.03 Containing Block 规则**。
4. **04.07.04 Fixed Positioning 与 viewport**。
5. **04.07.05 Sticky Positioning 与 scroll container**。
6. **04.07.06 `z-index` 基础**。
7. **04.07.07 Stacking Context 创建条件**。
8. **04.07.08 Stacking Order 与嵌套层叠上下文**。
9. **04.07.09 transform / opacity / filter 对 stacking context 的影响**。
10. **04.07.10 transform 对 fixed containing block 的影响**。
11. **04.07.11 Scroll Container、scrollbar 与 overscroll 基础**。
12. **04.07.12 Logical inset 与书写模式前置**。
13. **04.07.13 Failure Lab：`z-index:999999` 为什么没用**。
14. **04.07.14 Failure Lab：sticky 为什么不吸顶**。
15. **04.07.15 DevTools Layers / Layout 辅助定位**。
16. **04.07.16 综合实践：Header + Drawer + Modal + Sticky Table Header**。

## Definition of Done

能够画出包含块和 stacking context 树，并据此解释定位、遮挡、sticky 与 fixed 行为。
