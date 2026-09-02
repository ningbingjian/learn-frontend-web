# Module 04.16：CSS Debugging、Performance、A11Y 与 Compatibility

## 模块目标

建立生产级 CSS 诊断能力：从现象出发，用证据找到选择器、层叠、尺寸、布局、层叠上下文、滚动、字体、动画或浏览器兼容中的真实原因。

## Lesson 顺序

1. **04.16.01 CSS Debugging 总方法：不要先改代码，先建立证据链**。
2. **04.16.02 Styles / Computed / Box Model 系统使用**。
3. **04.16.03 Flex / Grid Overlay 与 Layout Debug**。
4. **04.16.04 Force State、Pseudo-class 与交互态调试**。
5. **04.16.05 查找 overflow source 与 scroll container**。
6. **04.16.06 Stacking Context / Layers 问题诊断**。
7. **04.16.07 Font / Rendering / Layout Shift 的 CSS 侧诊断**。
8. **04.16.08 CSS 对 Style Calculation / Layout / Paint 的成本认知**。
9. **04.16.09 Selector 性能：避免过时迷信，关注真实规模与测量**。
10. **04.16.10 大型 DOM、复杂样式失效与 invalidation 高层认知**。
11. **04.16.11 Animation Performance 与 Long Frame 观察**。
12. **04.16.12 A11Y Review：focus、contrast、zoom、motion、visual order**。
13. **04.16.13 Browser Compatibility：Can I Use / MDN / Baseline / real device evidence**。
14. **04.16.14 Progressive Enhancement 与 fallback 测试**。
15. **04.16.15 Forced Colors / High Contrast / Reduced Motion 实验**。
16. **04.16.16 Failure Lab：十类经典 CSS 故障综合排查**。
17. **04.16.17 Production Review：从一个真实页面生成 CSS 诊断报告**。

## Definition of Done

能够把“页面看起来不对”转化成可验证的问题假设，用 DevTools 和浏览器证据定位根因，并给出修复、回归验证与兼容说明。
