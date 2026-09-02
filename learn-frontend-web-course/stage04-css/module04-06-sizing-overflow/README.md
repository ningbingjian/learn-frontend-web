# Module 04.06：Sizing、Intrinsic Size 与 Overflow

## 模块目标

解决 CSS 中最常见的一类故障：为什么元素不是你写的那个宽高、为什么内容撑破容器、为什么百分比高度失效。

## Lesson 顺序

1. **04.06.01 `width` / `height` / min/max constraints**。
2. **04.06.02 `auto` 到底意味着什么**。
3. **04.06.03 Percentage Width / Height 与 definite size**。
4. **04.06.04 Intrinsic Sizing：min-content / max-content / fit-content**。
5. **04.06.05 `min-width:auto` 与默认最小尺寸陷阱前置**。
6. **04.06.06 `aspect-ratio`**：自动尺寸与媒体卡片。
7. **04.06.07 Replaced Element、图片原始尺寸与 object-fit/object-position**。
8. **04.06.08 `overflow: visible/hidden/clip/auto/scroll`**。
9. **04.06.09 Scroll Container 与滚动区域**。
10. **04.06.10 Text Overflow / long word / `overflow-wrap`**。
11. **04.06.11 Failure Lab：`width:100% + padding` 为什么溢出**。
12. **04.06.12 Failure Lab：`height:100%` 为什么没有想象中那么高**。
13. **04.06.13 Failure Lab：超长文本、图片与不可压缩内容撑破布局**。
14. **04.06.14 综合实践：鲁棒卡片与内容容器**。

## Definition of Done

能够针对“元素太宽/太高/不收缩/不滚动/百分比失效”建立尺寸约束链，而不是依赖固定像素强行修正。
