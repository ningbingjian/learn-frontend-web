# Module 04.04：CSS Value、Unit、Function 与 Custom Property

## 模块目标

理解 CSS 声明右侧的值如何表达长度、比例、颜色、计算与变量关系，并建立响应式布局需要的数值基础。

## Lesson 顺序

1. **04.04.01 Keyword / Number / Integer / Dimension / Percentage**。
2. **04.04.02 Absolute Length**：px、物理单位及屏幕语义。
3. **04.04.03 Font-relative Unit**：em、rem、ch、ex、cap 等。
4. **04.04.04 Viewport Unit**：vw/vh、svh/lvh/dvh 与移动端地址栏问题。
5. **04.04.05 Percentage 的参照物**：为什么不同属性百分比基准不同。
6. **04.04.06 CSS Function**：`calc()`、`min()`、`max()`、`clamp()`。
7. **04.04.07 `var()` 与 Custom Property**：声明、读取、fallback。
8. **04.04.08 Custom Property 的 Cascade / Inheritance 特性**。
9. **04.04.09 Invalid at Computed-value Time**：变量组合为何可能在计算阶段失败。
10. **04.04.10 `@property` typed custom property**：类型、初始值、继承与动画。
11. **04.04.11 Environment Variable `env()` 与 safe-area**。
12. **04.04.12 Wrong Way：魔法数字、单位混乱、层层 calc、变量滥用**。
13. **04.04.13 综合实践：用 `clamp()` + Custom Property 构建 fluid spacing/type scale**。

## Definition of Done

能够为字体、间距、容器和 viewport 选择合适单位；能够解释百分比和 custom property 的计算上下文，并构建不依赖预处理器的基础变量体系。
