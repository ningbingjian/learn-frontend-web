# Module 04.15：Design Token、Theme 与 CSS Architecture

## 模块目标

把“会写页面 CSS”提升为“能维护大型产品样式体系”，解决命名、边界、依赖、主题、Token、覆盖策略和长期迁移问题。

## Lesson 顺序

1. **04.15.01 CSS 为什么会随着项目增长失控**。
2. **04.15.02 Global / Component / Utility / State 样式边界**。
3. **04.15.03 Naming 与可预测性**。
4. **04.15.04 BEM：问题、规则、优点与成本**。
5. **04.15.05 OOCSS / SMACSS / ITCSS 的核心思想与历史价值**。
6. **04.15.06 Utility-first 的问题域、收益与代价**。
7. **04.15.07 CSS Modules 的局部作用域模型与边界**。
8. **04.15.08 CSS-in-JS 模型分类、运行时/编译时成本与适用边界**。
9. **04.15.09 Cascade Layer 作为架构工具**。
10. **04.15.10 Design Token：primitive / semantic / component token**。
11. **04.15.11 Token 不等于 CSS Variable**：概念层与实现层分离。
12. **04.15.12 Theme：light/dark/brand/high-contrast**。
13. **04.15.13 `data-theme` / class / media query / color-scheme 方案比较**。
14. **04.15.14 Custom Property 的局部覆盖与组件主题**。
15. **04.15.15 Stylelint / Formatting / CSS Quality Gate 的职责边界**。
16. **04.15.16 Third-party CSS、Reset、Normalize 与 Vendor Override 策略**。
17. **04.15.17 Migration：Legacy CSS → Layer/Token/Component Boundary**。
18. **04.15.18 Architecture Exercise：为 100 人前端团队制定 CSS Golden Path**。

## Definition of Done

能够针对具体团队规模和产品约束比较 BEM、Utility、CSS Modules、CSS-in-JS 等方案；能够设计 Token、Theme、Layer 和迁移边界，而不是只讨论语法偏好。
