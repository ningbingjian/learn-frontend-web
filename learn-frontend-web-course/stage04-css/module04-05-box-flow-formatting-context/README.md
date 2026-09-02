# Module 04.05：Box Model、Normal Flow 与 Formatting Context

## 模块目标

建立 CSS 布局的底层心智模型：DOM 元素如何生成盒子、盒子的尺寸由什么构成、普通流如何排列，以及 BFC/IFC 为什么会改变布局行为。

## Lesson 顺序

1. **04.05.01 Element、Box 与 Visual Formatting Model**。
2. **04.05.02 Content / Padding / Border / Margin**。
3. **04.05.03 `box-sizing: content-box` 与 `border-box`**。
4. **04.05.04 Block Box 与 Inline Box**。
5. **04.05.05 Normal Flow：block direction 与 inline direction**。
6. **04.05.06 Line Box、inline formatting 与 baseline 初识**。
7. **04.05.07 Margin Collapse**：产生条件、反直觉案例、修复方式。
8. **04.05.08 Block Formatting Context（BFC）**：创建条件与作用。
9. **04.05.09 Inline Formatting Context（IFC）**。
10. **04.05.10 `display` 外部/内部显示类型高层模型**。
11. **04.05.11 `display: flow-root` 与现代 clearfix**。
12. **04.05.12 Replaced Element 前置：img/input 等为何行为不同**。
13. **04.05.13 Failure Lab：margin 穿透、inline 间隙、盒子意外变大**。
14. **04.05.14 DevTools Box Model / Layout 面板验证**。
15. **04.05.15 综合实践：不用 Flex/Grid 完成文档流布局实验**。

## Definition of Done

能够在不背“技巧”的前提下解释盒子尺寸、margin collapse、BFC、inline baseline 等现象，并能用 DevTools Box Model 证明判断。
